import { Component, OnInit, signal, computed, HostListener, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';

// ─── Interfaces ──────────────────────────────────────────────────────────────

interface PermissionDto {
  id: string;
  module: string;
  name: string;
  code: string;
  description?: string;
}

interface RoleDto {
  id: string;
  name: string;
  description?: string;
  isSystem: boolean;
  permissions: PermissionDto[];
}

/** Respuesta paginada del servidor */
interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

// ─── Component ───────────────────────────────────────────────────────────────

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  private apiUrl = 'http://localhost:5007/api';

  // ── View State ──────────────────────────────────────────────────────────
  viewState = signal<'main' | 'hijos' | 'permisos' | 'suscripciones' | 'add-permisos'>('main');
  selectedRoleContext = signal<RoleDto | null>(null);

  // ── Roles (server-side paginated) ──────────────────────────────────────
  roles = signal<RoleDto[]>([]);
  totalRoles = signal(0);
  totalPagesRoles = signal(1);
  currentPageRoles = signal(1);
  searchRolesQuery = signal('');
  readonly pageSize = 20;

  // ── Permisos del rol seleccionado ──────────────────────────────────────
  allRolePermissions = signal<PermissionDto[]>([]);   // todos los permisos ya asignados al rol
  selectedApp = signal<string>('GAM');
  searchPermisosQuery = signal('');
  currentPagePermisos = signal(1);

  filteredPermisos = computed(() => {
    const q = this.searchPermisosQuery();
    const app = this.selectedApp();
    let perms = this.allRolePermissions();
    if (app) perms = perms.filter(p => p.module === app);
    if (q) {
      const term = q.toLowerCase();
      perms = perms.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.code.toLowerCase().includes(term) ||
        (p.description ?? '').toLowerCase().includes(term)
      );
    }
    return perms;
  });

  paginatedPermisos = computed(() => {
    const start = (this.currentPagePermisos() - 1) * this.pageSize;
    return this.filteredPermisos().slice(start, start + this.pageSize);
  });

  totalPagesPermisos = computed(() =>
    Math.ceil(this.filteredPermisos().length / this.pageSize) || 1
  );

  // ── Agregar Permisos (server-side paginated) ───────────────────────────
  permsToAdd = signal<PermissionDto[]>([]);
  totalPermsToAdd = signal(0);
  totalPagesToAdd = signal(1);
  currentPageToAdd = signal(1);
  selectedPermsToAdd = signal<string[]>([]);
  readonly pageSizeToAdd = 20;

  // ── Suscripciones ──────────────────────────────────────────────────────
  dummySuscripciones = signal(['Embarque', 'Existencia', 'PrensadoBobina']);
  searchSuscripcionesQuery = signal('');
  currentPageSuscripciones = signal(1);

  filteredSuscripciones = computed(() => {
    const q = this.searchSuscripcionesQuery();
    if (!q) return this.dummySuscripciones();
    return this.dummySuscripciones().filter(s => s.toLowerCase().includes(q.toLowerCase()));
  });
  paginatedSuscripciones = computed(() => {
    const start = (this.currentPageSuscripciones() - 1) * this.pageSize;
    return this.filteredSuscripciones().slice(start, start + this.pageSize);
  });
  totalPagesSuscripciones = computed(() =>
    Math.ceil(this.filteredSuscripciones().length / this.pageSize) || 1
  );

  // ── Permisos en modal de creación/edición ─────────────────────────────
  allPermissions = signal<PermissionDto[]>([]);
  selectedPermIds = signal<string[]>([]);

  // ── UI State ───────────────────────────────────────────────────────────
  isLoading = signal(true);
  isLoadingPerms = signal(false);
  isSaving = signal(false);
  showModal = signal(false);
  showExportMenu = signal(false);
  errorMsg = signal<string | null>(null);
  successMsg = signal<string | null>(null);
  editingRole: RoleDto | null = null;

  roleForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthService) {
    this.roleForm = this.fb.group({
      name:        ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit() {
    this.loadRoles();
    this.loadAllPermissionsForModal();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-container')) {
      this.showExportMenu.set(false);
    }
  }

  private headers(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  // ── Load Roles (server-side) ─────────────────────────────────────────

  loadRoles() {
    this.isLoading.set(true);
    this.errorMsg.set(null);

    let params = new HttpParams()
      .set('page', this.currentPageRoles().toString())
      .set('pageSize', this.pageSize.toString());

    const q = this.searchRolesQuery();
    if (q) params = params.set('searchTerm', q);

    this.http.get<PaginatedResult<RoleDto>>(`${this.apiUrl}/roles`, {
      headers: this.headers(),
      params
    }).subscribe({
      next: (result) => {
        this.roles.set(result.items);
        this.totalRoles.set(result.totalCount);
        this.totalPagesRoles.set(result.totalPages);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMsg.set('Error al cargar roles.');
        this.isLoading.set(false);
      }
    });
  }

  /** Carga todos los permisos (sin paginar) para el modal de crear/editar rol. */
  loadAllPermissionsForModal() {
    let params = new HttpParams()
      .set('page', '1')
      .set('pageSize', '500');  // trae todos para el panel de checkboxes

    this.http.get<PaginatedResult<PermissionDto>>(`${this.apiUrl}/roles/permissions`, {
      headers: this.headers(),
      params
    }).subscribe({
      next: (result) => this.allPermissions.set(result.items)
    });
  }

  // ── Load Permissions para "Agregar Permisos" (server-side) ─────────────

  loadPermsToAdd() {
    this.isLoadingPerms.set(true);
    const role = this.selectedRoleContext();
    if (!role) return;

    let params = new HttpParams()
      .set('page', this.currentPageToAdd().toString())
      .set('pageSize', this.pageSizeToAdd.toString())
      .set('module', this.selectedApp());

    this.http.get<PaginatedResult<PermissionDto>>(`${this.apiUrl}/roles/permissions`, {
      headers: this.headers(),
      params
    }).subscribe({
      next: (result) => {
        // Filtra los ya asignados localmente para no tener que hacer otro endpoint
        const assignedIds = new Set(role.permissions.map(p => p.id));
        const filtered = result.items.filter(p => !assignedIds.has(p.id));
        this.permsToAdd.set(filtered);
        this.totalPermsToAdd.set(result.totalCount);
        this.totalPagesToAdd.set(result.totalPages);
        this.isLoadingPerms.set(false);
      },
      error: () => this.isLoadingPerms.set(false)
    });
  }

  // ── Search ────────────────────────────────────────────────────────────

  onSearch(event: Event) {
    const q = (event.target as HTMLInputElement).value;
    this.searchRolesQuery.set(q);
    this.currentPageRoles.set(1);
    this.loadRoles();
  }

  onSearchPermisos(event: Event) {
    this.searchPermisosQuery.set((event.target as HTMLInputElement).value.toLowerCase());
    this.currentPagePermisos.set(1);
  }

  onSearchSuscripciones(event: Event) {
    this.searchSuscripcionesQuery.set((event.target as HTMLInputElement).value.toLowerCase());
    this.currentPageSuscripciones.set(1);
  }

  onAppChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.selectedApp.set(val);
    this.currentPagePermisos.set(1);
    this.currentPageToAdd.set(1);
    if (this.viewState() === 'add-permisos') {
      this.loadPermsToAdd();
    }
  }

  // ── Modal CRUD ────────────────────────────────────────────────────────

  permissionsByModule() {
    const map = new Map<string, { module: string; permissions: PermissionDto[] }>();
    for (const p of this.allPermissions()) {
      if (!map.has(p.module)) map.set(p.module, { module: p.module, permissions: [] });
      map.get(p.module)!.permissions.push(p);
    }
    return Array.from(map.values());
  }

  isModuleFullySelected(mod: { permissions: PermissionDto[] }) {
    return mod.permissions.every(p => this.selectedPermIds().includes(p.id));
  }

  isModulePartiallySelected(mod: { permissions: PermissionDto[] }) {
    const sel = this.selectedPermIds();
    return mod.permissions.some(p => sel.includes(p.id)) && !this.isModuleFullySelected(mod);
  }

  toggleModule(mod: { permissions: PermissionDto[] }, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const ids = mod.permissions.map(p => p.id);
    const current = this.selectedPermIds();
    this.selectedPermIds.set(checked
      ? [...new Set([...current, ...ids])]
      : current.filter(id => !ids.includes(id)));
  }

  togglePerm(id: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const current = this.selectedPermIds();
    this.selectedPermIds.set(checked ? [...current, id] : current.filter(p => p !== id));
  }

  openModal(role?: RoleDto) {
    this.editingRole = role ?? null;
    this.errorMsg.set(null);
    this.successMsg.set(null);
    this.selectedPermIds.set(role?.permissions.map(p => p.id) ?? []);
    this.roleForm.reset({ name: role?.name ?? '', description: role?.description ?? '' });
    this.showModal.set(true);
  }

  copyRole(role: RoleDto) {
    this.editingRole = null;
    this.errorMsg.set(null);
    this.successMsg.set(null);
    this.selectedPermIds.set(role.permissions.map(p => p.id) ?? []);
    this.roleForm.reset({ name: `${role.name} - Copia`, description: role.description });
    this.showModal.set(true);
  }

  closeModal() { this.showModal.set(false); }

  closeModalOnOverlay(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) this.closeModal();
  }

  isInvalid(field: string): boolean {
    const c = this.roleForm.get(field);
    return !!(c && c.invalid && (c.dirty || c.touched));
  }

  onSubmit() {
    if (this.roleForm.invalid) { this.roleForm.markAllAsTouched(); return; }
    this.isSaving.set(true);
    this.errorMsg.set(null);

    const payload = { ...this.roleForm.value, permissionIds: this.selectedPermIds() };

    const req = this.editingRole
      ? this.http.put(`${this.apiUrl}/roles/${this.editingRole.id}`, payload, { headers: this.headers() })
      : this.http.post(`${this.apiUrl}/roles`, payload, { headers: this.headers() });

    req.subscribe({
      next: () => {
        this.isSaving.set(false);
        this.successMsg.set(this.editingRole ? 'Rol actualizado.' : 'Rol creado.');
        this.closeModal();
        this.loadRoles();
      },
      error: (err) => {
        this.isSaving.set(false);
        this.errorMsg.set(err.error?.message || 'Error al guardar el rol.');
      }
    });
  }

  deleteRole(id: string) {
    if (!confirm('¿Eliminar este rol? Los usuarios que lo tengan asignado perderán sus permisos.')) return;
    this.http.delete(`${this.apiUrl}/roles/${id}`, { headers: this.headers() }).subscribe({
      next: () => { this.successMsg.set('Rol eliminado.'); this.loadRoles(); },
      error: (err) => { this.errorMsg.set(err.error?.message || 'Error al eliminar.'); }
    });
  }

  // ── Sub-views ──────────────────────────────────────────────────────────

  openHijosView(role: RoleDto) {
    this.selectedRoleContext.set(role);
    this.viewState.set('hijos');
  }

  openPermisosView(role: RoleDto) {
    this.selectedRoleContext.set(role);
    this.allRolePermissions.set(role.permissions);
    this.currentPagePermisos.set(1);
    this.searchPermisosQuery.set('');
    this.selectedApp.set('GAM');
    this.viewState.set('permisos');
  }

  openSuscripcionesView(role: RoleDto) {
    this.selectedRoleContext.set(role);
    this.currentPageSuscripciones.set(1);
    this.viewState.set('suscripciones');
  }

  closeSubView() {
    this.viewState.set('main');
    this.selectedRoleContext.set(null);
    this.showExportMenu.set(false);
  }

  toggleExportMenu() {
    this.showExportMenu.update(v => !v);
  }

  // ── Pagination helpers ─────────────────────────────────────────────────

  prevPageRoles() {
    if (this.currentPageRoles() > 1) {
      this.currentPageRoles.update(p => p - 1);
      this.loadRoles();
    }
  }

  nextPageRoles() {
    if (this.currentPageRoles() < this.totalPagesRoles()) {
      this.currentPageRoles.update(p => p + 1);
      this.loadRoles();
    }
  }

  prevPagePermisos() { if (this.currentPagePermisos() > 1) this.currentPagePermisos.update(p => p - 1); }
  nextPagePermisos() { if (this.currentPagePermisos() < this.totalPagesPermisos()) this.currentPagePermisos.update(p => p + 1); }

  prevPageSuscripciones() { if (this.currentPageSuscripciones() > 1) this.currentPageSuscripciones.update(p => p - 1); }
  nextPageSuscripciones() { if (this.currentPageSuscripciones() < this.totalPagesSuscripciones()) this.currentPageSuscripciones.update(p => p + 1); }

  // ── Add Permisos View ─────────────────────────────────────────────────

  availableApps = computed(() => {
    const modules = this.allPermissions().map(p => p.module);
    const apps = [...new Set(modules)];
    if (!apps.includes('GAM')) apps.push('GAM');
    if (!apps.includes('HICONE')) apps.push('HICONE');
    return apps;
  });

  openAddPermisosView() {
    this.selectedPermsToAdd.set([]);
    this.currentPageToAdd.set(1);
    this.viewState.set('add-permisos');
    this.loadPermsToAdd();
  }

  closeAddPermisosView() {
    this.viewState.set('permisos');
  }

  prevPageToAdd() {
    if (this.currentPageToAdd() > 1) {
      this.currentPageToAdd.update(p => p - 1);
      this.loadPermsToAdd();
    }
  }

  nextPageToAdd() {
    if (this.currentPageToAdd() < this.totalPagesToAdd()) {
      this.currentPageToAdd.update(p => p + 1);
      this.loadPermsToAdd();
    }
  }

  togglePermToAdd(id: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const current = this.selectedPermsToAdd();
    this.selectedPermsToAdd.set(checked ? [...current, id] : current.filter(p => p !== id));
  }

  isAllPermsToAddSelected() {
    const filtered = this.permsToAdd();
    if (filtered.length === 0) return false;
    return filtered.every(p => this.selectedPermsToAdd().includes(p.id));
  }

  toggleAllPermsToAdd(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      const allIds = this.permsToAdd().map(p => p.id);
      this.selectedPermsToAdd.set([...new Set([...this.selectedPermsToAdd(), ...allIds])]);
    } else {
      const pageIds = new Set(this.permsToAdd().map(p => p.id));
      this.selectedPermsToAdd.set(this.selectedPermsToAdd().filter(id => !pageIds.has(id)));
    }
  }

  addSelectedPermissions() {
    const role = this.selectedRoleContext();
    if (!role) return;

    const newPermIds = this.selectedPermsToAdd();
    if (newPermIds.length === 0) return;

    this.isSaving.set(true);
    const currentPermIds = role.permissions.map(p => p.id);
    const payload = {
      name: role.name,
      description: role.description,
      permissionIds: [...currentPermIds, ...newPermIds]
    };

    this.http.put(`${this.apiUrl}/roles/${role.id}`, payload, { headers: this.headers() }).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.successMsg.set('Permisos agregados correctamente.');
        this.loadRoles();
        // Refrescar el contexto del rol para la vista de permisos
        this.http.get<RoleDto>(`${this.apiUrl}/roles/${role.id}`, { headers: this.headers() }).subscribe(updated => {
          this.selectedRoleContext.set(updated);
          this.allRolePermissions.set(updated.permissions);
          this.viewState.set('permisos');
        });
      },
      error: (err) => {
        this.isSaving.set(false);
        this.errorMsg.set(err.error?.message || 'Error al agregar permisos.');
      }
    });
  }
}
