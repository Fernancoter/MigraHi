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
  applications: string[];
  accessType: number; // 0=Allow, 1=Deny, 2=Restricted
}

interface RoleDto {
  id: string;
  name: string;
  description?: string;
  isSystem: boolean;
  permissions: PermissionDto[];
}

interface ApplicationDto {
  id: string;
  name: string;
  description?: string;
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
  applications = signal<ApplicationDto[]>([]);
  selectedApp = signal<string>('GAM Backoffice');
  searchPermisosQuery = signal('');
  currentPagePermisos = signal(1);

  filteredPermisos = computed(() => {
    const q = this.searchPermisosQuery();
    const app = this.selectedApp();
    let perms = this.allRolePermissions();
    if (app) perms = perms.filter(p => p.applications.includes(app));
    if (q) {
      const term = q.toLowerCase();
      perms = perms.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.code.toLowerCase().includes(term) ||
        (p.description ?? '').toLowerCase().includes(term)
      );
    }
    // Sort by module then name
    return perms.sort((a, b) => {
      const modCmp = a.module.localeCompare(b.module);
      return modCmp !== 0 ? modCmp : a.name.localeCompare(b.name);
    });
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
  searchToAddQuery = signal('');
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
  selectedPermsWithAccess = signal<{id: string, accessType: number}[]>([]); // Para el modal
  
  selectedPermIdsForAssignment = computed(() => this.selectedPermsWithAccess().map(p => p.id));

  // ── UI Checkboxes (Independientes de la asignación) ───────────────────
  checkboxSelectedIds = signal<string[]>([]);

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
    this.loadApplications();
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

  loadApplications() {
    this.http.get<ApplicationDto[]>(`${this.apiUrl}/roles/applications`, {
      headers: this.headers()
    }).subscribe({
      next: (apps) => {
        this.applications.set(apps);
        if (apps.length > 0 && !apps.find(a => a.name === this.selectedApp())) {
          this.selectedApp.set(apps[0].name);
        }
      }
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

    const q = this.searchToAddQuery();
    if (q) params = params.set('searchTerm', q);

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

  onSearchToAdd(event: Event) {
    const q = (event.target as HTMLInputElement).value;
    this.searchToAddQuery.set(q);
    this.currentPageToAdd.set(1);
    this.loadPermsToAdd();
  }

  // ── Modal CRUD ────────────────────────────────────────────────────────

  permissionsByModule() {
    const map = new Map<string, { module: string; permissions: PermissionDto[] }>();
    for (const p of this.allPermissions()) {
      if (!map.has(p.module)) map.set(p.module, { module: p.module, permissions: [] });
      map.get(p.module)!.permissions.push(p);
    }
    // Sort modules alphabetically and then their permissions by name
    return Array.from(map.values())
      .sort((a, b) => a.module.localeCompare(b.module))
      .map(m => ({
        ...m,
        permissions: m.permissions.sort((a, b) => a.name.localeCompare(b.name))
      }));
  }

  isModuleFullySelected(mod: { permissions: PermissionDto[] }) {
    return mod.permissions.every(p => this.checkboxSelectedIds().includes(p.id));
  }

  isModulePartiallySelected(mod: { permissions: PermissionDto[] }) {
    const sel = this.checkboxSelectedIds();
    return mod.permissions.some(p => sel.includes(p.id)) && !this.isModuleFullySelected(mod);
  }

  toggleModule(mod: { permissions: PermissionDto[] }, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const ids = mod.permissions.map(p => p.id);
    const current = this.checkboxSelectedIds();
    if (checked) {
      const newItems = ids.filter(id => !current.includes(id));
      this.checkboxSelectedIds.set([...current, ...newItems]);
    } else {
      this.checkboxSelectedIds.set(current.filter(id => !ids.includes(id)));
    }
  }

  togglePerm(id: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const current = this.checkboxSelectedIds();
    if (checked) {
      this.checkboxSelectedIds.set([...current, id]);
    } else {
      this.checkboxSelectedIds.set(current.filter(cid => cid !== id));
    }
  }

  getPermAccessType(id: string): number {
    return this.selectedPermsWithAccess().find(p => p.id === id)?.accessType ?? 0;
  }

  setPermAccessType(id: string, event: Event) {
    const val = parseInt((event.target as HTMLSelectElement).value);
    this.selectedPermsWithAccess.update(curr => {
      const exists = curr.find(p => p.id === id);
      if (exists) {
        return curr.map(p => p.id === id ? { ...p, accessType: val } : p);
      } else {
        return [...curr, { id, accessType: val }];
      }
    });
  }

  openModal(role?: RoleDto) {
    this.editingRole = role ?? null;
    this.errorMsg.set(null);
    this.successMsg.set(null);
    this.selectedPermsWithAccess.set(role?.permissions.map(p => ({ id: p.id, accessType: p.accessType })) ?? []);
    this.checkboxSelectedIds.set(role?.permissions.map(p => p.id) ?? []);
    this.roleForm.reset({ name: role?.name ?? '', description: role?.description ?? '' });
    this.showModal.set(true);
  }

  copyRole(role: RoleDto) {
    this.editingRole = null;
    this.errorMsg.set(null);
    this.successMsg.set(null);
    this.selectedPermsWithAccess.set(role.permissions.map(p => ({ id: p.id, accessType: p.accessType })) ?? []);
    this.checkboxSelectedIds.set(role.permissions.map(p => p.id) ?? []);
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
  
    const payload = { 
      ...this.roleForm.value, 
      permissions: this.selectedPermsWithAccess().map(p => ({ permissionId: p.id, accessType: p.accessType }))
    };

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
    // No forzamos a 'GAM', dejamos la app seleccionada actual o la primera disponible
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

  getPages(current: number, total: number): (number | string)[] {
    if (total <= 1) return [];
    const pages: (number | string)[] = [];
    const windowSize = 1; // Un paso a cada lado para que no sea muy ancho en movil

    // Siempre la primera
    pages.push(1);

    if (current > windowSize + 2) {
      pages.push('...');
    }

    const start = Math.max(2, current - windowSize);
    const end = Math.min(total - 1, current + windowSize);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < total - (windowSize + 1)) {
      pages.push('...');
    }

    // Siempre la última
    pages.push(total);

    return pages;
  }

  setPageRoles(p: number | string) {
    if (typeof p === 'number') {
      this.currentPageRoles.set(p);
      this.loadRoles();
    }
  }

  setPagePermisos(p: number | string) {
    if (typeof p === 'number') this.currentPagePermisos.set(p);
  }

  setPageSuscripciones(p: number | string) {
    if (typeof p === 'number') this.currentPageSuscripciones.set(p);
  }

  setPageToAdd(p: number | string) {
    if (typeof p === 'number') {
      this.currentPageToAdd.set(p);
      this.loadPermsToAdd();
    }
  }

  // ── Add Permisos View ─────────────────────────────────────────────────

  availableApps = computed(() => {
    return this.applications().map(a => a.name);
  });

  openAddPermisosView() {
    this.selectedPermsToAdd.set([]);
    this.checkboxSelectedIds.set([]);
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

  // ── Add Permisos View ─────────────────────────────────────────────────
  selectedPermsToAdd = signal<{id: string, accessType: number}[]>([]);
  
  togglePermToAdd(id: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const current = this.checkboxSelectedIds();
    if (checked) {
      this.checkboxSelectedIds.set([...current, id]);
    } else {
      this.checkboxSelectedIds.set(current.filter(cid => cid !== id));
    }
  }

  setPermToAddAccessType(id: string, event: Event) {
    const val = parseInt((event.target as HTMLSelectElement).value);
    this.selectedPermsToAdd.update(curr => {
      const exists = curr.find(p => p.id === id);
      if (exists) {
        return curr.map(p => p.id === id ? { ...p, accessType: val } : p);
      } else {
        return [...curr, { id, accessType: val }];
      }
    });
  }

  getPermToAddAccessType(id: string): number {
    return this.selectedPermsToAdd().find(p => p.id === id)?.accessType ?? 0;
  }

  isPermToAddSelected(id: string): boolean {
    return this.checkboxSelectedIds().includes(id);
  }

  isAllPermsToAddSelected() {
    const filtered = this.permsToAdd();
    if (filtered.length === 0) return false;
    return filtered.every(p => this.isPermToAddSelected(p.id));
  }

  toggleAllPermsToAdd(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const current = this.checkboxSelectedIds();
    const pageIds = this.permsToAdd().map(p => p.id);
    if (checked) {
      const newIds = pageIds.filter(id => !current.includes(id));
      this.checkboxSelectedIds.set([...current, ...newIds]);
    } else {
      this.checkboxSelectedIds.set(current.filter(id => !pageIds.includes(id)));
    }
  }

  addSelectedPermissions() {
    const role = this.selectedRoleContext();
    if (!role) return;

    const newPerms = this.selectedPermsToAdd();
    if (newPerms.length === 0) return;

    this.isSaving.set(true);
    const currentPerms = role.permissions.map(p => ({ permissionId: p.id, accessType: p.accessType }));
    const payload = {
      name: role.name,
      description: role.description,
      permissions: [...currentPerms, ...newPerms.map(p => ({ permissionId: p.id, accessType: p.accessType }))]
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

  updatePermissionAccess(permissionId: string, event: Event) {
    const role = this.selectedRoleContext();
    if (!role) return;

    const accessType = parseInt((event.target as HTMLSelectElement).value);
    
    // Optimistic update
    this.allRolePermissions.update(perms => 
      perms.map(p => p.id === permissionId ? { ...p, accessType } : p)
    );

    const payload = {
      name: role.name,
      description: role.description,
      permissions: this.allRolePermissions().map(p => ({ permissionId: p.id, accessType: p.accessType }))
    };

    this.http.put(`${this.apiUrl}/roles/${role.id}`, payload, { headers: this.headers() }).subscribe({
      next: () => {
        this.successMsg.set('Tipo de acceso actualizado.');
        setTimeout(() => this.successMsg.set(null), 3000);
      },
      error: (err) => {
        this.errorMsg.set('Error al actualizar el tipo de acceso.');
        this.loadRoles(); // Revert on error
      }
    });
  }
}
