import { Component, OnInit, signal, computed, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';

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

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  private apiUrl = 'http://localhost:5007/api';

  // View State
  viewState = signal<'main' | 'hijos' | 'permisos' | 'suscripciones' | 'add-permisos'>('main');
  selectedRoleContext = signal<RoleDto | null>(null);
  selectedApp = signal<string>('GAM');
  selectedPermsToAdd = signal<string[]>([]);
  currentPageToAdd = signal(1);
  pageSizeToAdd = 20;

  roles = signal<RoleDto[]>([]);
  filteredRoles = signal<RoleDto[]>([]);
  allPermissions = signal<PermissionDto[]>([]);
  selectedPermIds = signal<string[]>([]);
  
  // Search states for subviews
  searchPermisosQuery = signal('');
  searchSuscripcionesQuery = signal('');

  // Dummy data for Suscripciones
  dummySuscripciones = signal(['Embarque', 'Existencia', 'PrensadoBobina']);

  // Paginación Global (20 items por defecto)
  pageSize = 20;
  
  currentPageRoles = signal(1);
  currentPageHijos = signal(1);
  currentPagePermisos = signal(1);
  currentPageSuscripciones = signal(1);

  isLoading = signal(true);
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
    this.loadPermissions();
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

  loadRoles() {
    this.isLoading.set(true);
    this.http.get<RoleDto[]>(`${this.apiUrl}/roles`, { headers: this.headers() }).subscribe({
      next: (data) => { this.roles.set(data); this.filteredRoles.set(data); this.isLoading.set(false); },
      error: () => { this.errorMsg.set('Error al cargar roles.'); this.isLoading.set(false); }
    });
  }

  loadPermissions() {
    this.http.get<PermissionDto[]>(`${this.apiUrl}/roles/permissions`, { headers: this.headers() }).subscribe({
      next: (data) => { this.allPermissions.set(data); }
    });
  }

  onAppChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.selectedApp.set(val);
    this.currentPagePermisos.set(1);
    this.currentPageToAdd.set(1);
  }

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

  onSearch(event: Event) {
    const q = (event.target as HTMLInputElement).value.toLowerCase();
    this.currentPageRoles.set(1);
    this.filteredRoles.set(this.roles().filter(r =>
      r.name.toLowerCase().includes(q) || (r.description ?? '').toLowerCase().includes(q)
    ));
  }

  onSearchPermisos(event: Event) {
    this.searchPermisosQuery.set((event.target as HTMLInputElement).value.toLowerCase());
    this.currentPagePermisos.set(1);
  }

  filteredPermisos = computed(() => {
    const role = this.selectedRoleContext();
    if (!role) return [];
    const q = this.searchPermisosQuery();
    const app = this.selectedApp();
    let perms = role.permissions;
    
    // Filter by Application
    if (app) {
      perms = perms.filter(p => p.module === app);
    }

    if (q) {
      perms = perms.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.code.toLowerCase().includes(q) || 
        (p.description ?? '').toLowerCase().includes(q)
      );
    }
    return perms;
  });

  // --- Computed Paginados ---

  // Roles (Main)
  paginatedRoles = computed(() => {
    const start = (this.currentPageRoles() - 1) * this.pageSize;
    return this.filteredRoles().slice(start, start + this.pageSize);
  });
  totalPagesRoles = computed(() => Math.ceil(this.filteredRoles().length / this.pageSize) || 1);

  // Permisos (View)
  paginatedPermisos = computed(() => {
    const start = (this.currentPagePermisos() - 1) * this.pageSize;
    return this.filteredPermisos().slice(start, start + this.pageSize);
  });
  totalPagesPermisos = computed(() => Math.ceil(this.filteredPermisos().length / this.pageSize) || 1);

  // Suscripciones
  paginatedSuscripciones = computed(() => {
    const start = (this.currentPageSuscripciones() - 1) * this.pageSize;
    return this.filteredSuscripciones().slice(start, start + this.pageSize);
  });
  totalPagesSuscripciones = computed(() => Math.ceil(this.filteredSuscripciones().length / this.pageSize) || 1);

  onSearchSuscripciones(event: Event) {
    this.searchSuscripcionesQuery.set((event.target as HTMLInputElement).value.toLowerCase());
    this.currentPageSuscripciones.set(1);
  }

  filteredSuscripciones = computed(() => {
    const q = this.searchSuscripcionesQuery();
    if (!q) return this.dummySuscripciones();
    return this.dummySuscripciones().filter(s => s.toLowerCase().includes(q));
  });

  openModal(role?: RoleDto) {
    this.editingRole = role ?? null;
    this.errorMsg.set(null);
    this.successMsg.set(null);
    this.selectedPermIds.set(role?.permissions.map(p => p.id) ?? []);
    this.roleForm.reset({ name: role?.name ?? '', description: role?.description ?? '' });
    this.showModal.set(true);
  }

  copyRole(role: RoleDto) {
    this.editingRole = null; // null to ensure we create a new role, not edit
    this.errorMsg.set(null);
    this.successMsg.set(null);
    this.selectedPermIds.set(role.permissions.map(p => p.id) ?? []);
    this.roleForm.reset({ 
      name: `${role.name} - Copia`, 
      description: role.description 
    });
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

  openHijosView(role: RoleDto) {
    this.selectedRoleContext.set(role);
    this.currentPageHijos.set(1);
    this.viewState.set('hijos');
  }

  openPermisosView(role: RoleDto) {
    this.selectedRoleContext.set(role);
    this.currentPagePermisos.set(1);
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

  // --- Helpers Paginación ---
  prevPageRoles() { if (this.currentPageRoles() > 1) this.currentPageRoles.update(p => p - 1); }
  nextPageRoles() { if (this.currentPageRoles() < this.totalPagesRoles()) this.currentPageRoles.update(p => p + 1); }
  
  prevPagePermisos() { if (this.currentPagePermisos() > 1) this.currentPagePermisos.update(p => p - 1); }
  nextPagePermisos() { if (this.currentPagePermisos() < this.totalPagesPermisos()) this.currentPagePermisos.update(p => p + 1); }

  prevPageSuscripciones() { if (this.currentPageSuscripciones() > 1) this.currentPageSuscripciones.update(p => p - 1); }
  nextPageSuscripciones() { if (this.currentPageSuscripciones() < this.totalPagesSuscripciones()) this.currentPageSuscripciones.update(p => p + 1); }

  // --- Add Permisos View ---

  availableApps = computed(() => {
    const modules = this.allPermissions().map(p => p.module);
    const apps = [...new Set(modules)];
    if (!apps.includes('GAM')) apps.push('GAM');
    if (!apps.includes('HICONE')) apps.push('HICONE');
    return apps;
  });

  filteredPermsToAdd = computed(() => {
    const app = this.selectedApp();
    const role = this.selectedRoleContext();
    if (!role) return [];
    
    // Filter by selected module/app
    let perms = this.allPermissions().filter(p => p.module === app);
     // Fallback Mock data for GAM if backend seeder hasn't run yet
    if (app === 'GAM' && perms.length === 0) {
      perms = [
        { id: 'm1', module: 'GAM', name: 'Change current Repository', code: 'gam_changerepository_Execute' },
        { id: 'm2', module: 'GAM', name: 'Dashboard', code: 'gam_dashboard_Execute' },
        { id: 'm3', module: 'GAM', name: 'GAM configuration settings', code: 'gam_gamconfiguration_Execute' },
        { id: 'm4', module: 'GAM', name: 'General settings', code: 'gam_gamgeneral_Execute' },
        { id: 'm5', module: 'GAM', name: 'Work with Applications', code: 'gam_wwapplications_Execute' },
        { id: 'm6', module: 'GAM', name: 'Work with Authentication Types', code: 'gam_wwauthtypes_Execute' },
        { id: 'm7', module: 'GAM', name: 'Work with Connections', code: 'gam_wwconnections_Execute' },
        { id: 'm8', module: 'GAM', name: 'Work with Event Subscriptions', code: 'gam_wweventsubscriptions_Execute' },
        { id: 'm9', module: 'GAM', name: 'Work with Repositories', code: 'gam_wwrepositories_Execute' },
        { id: 'm10', module: 'GAM', name: 'Work with Roles', code: 'gam_wwroles_Execute' },
        { id: 'm11', module: 'GAM', name: 'Work with Security Policy', code: 'gam_wwsecuritypolicies_Execute' },
        { id: 'm12', module: 'GAM', name: 'Work with Sessions', code: 'gam_wwsessions_Execute' },
        { id: 'm13', module: 'GAM', name: 'Work with Users', code: 'gam_wwusers_Execute' }
      ];
    }
    
    // Fallback Mock data for HICONE
    if (app === 'HICONE' && perms.length === 0) {
      perms = [
        { id: 'm14', module: 'HICONE', name: 'Change My Password', code: 'gamchangeyourpassword_Execute' },
        { id: 'm15', module: 'HICONE', name: 'Home', code: 'gamhome_Execute' },
        { id: 'm16', module: 'HICONE', name: 'Role Entry', code: 'gamroleentry_Execute' },
        { id: 'm17', module: 'HICONE', name: 'Select Permissions Role', code: 'gamrolepermissionselect_Execute' },
        { id: 'm18', module: 'HICONE', name: 'Select Roles Role', code: 'gamroleselect_Execute' },
        { id: 'm19', module: 'HICONE', name: 'Set New Password', code: 'gamsetpassword_Execute' },
        { id: 'm20', module: 'HICONE', name: 'User Entry', code: 'gamuserentry_Execute' },
        { id: 'm21', module: 'HICONE', name: 'Select Permissions User', code: 'gamuserpermissionselect_Execute' },
        { id: 'm22', module: 'HICONE', name: 'Select Roles User', code: 'gamuserroleselect_Execute' },
        { id: 'm23', module: 'HICONE', name: 'Role Permissions', code: 'gamwwrolepermissions_Execute' },
        { id: 'm24', module: 'HICONE', name: 'Roles Role', code: 'gamwwroleroles_Execute' },
        { id: 'm25', module: 'HICONE', name: 'Roles', code: 'gamwwroles_Execute' },
        { id: 'm26', module: 'HICONE', name: 'User Permissions', code: 'gamwwuserpermissions_Execute' },
        { id: 'm27', module: 'HICONE', name: 'User Roles', code: 'gamwwuserroles_Execute' },
        { id: 'm28', module: 'HICONE', name: 'Users', code: 'gamwwusers_Execute' },
        { id: 'h1', module: 'HICONE', name: 'Audit WWGet Filter Data Services', code: 'auditww_Services_Execute' },
        { id: 'h2', module: 'HICONE', name: 'Bar Code Delete', code: 'barcode_Delete' },
        { id: 'h3', module: 'HICONE', name: 'Bar Code', code: 'barcode_Execute' },
        { id: 'h4', module: 'HICONE', name: 'Bar Code FullControl', code: 'barcode_FullControl' },
        { id: 'h5', module: 'HICONE', name: 'Bar Code Insert', code: 'barcode_Insert' },
        { id: 'h6', module: 'HICONE', name: 'Bar Code Update', code: 'barcode_Update' },
        { id: 'h7', module: 'HICONE', name: 'Bobina Delete', code: 'bobina_Delete' },
        { id: 'h8', module: 'HICONE', name: 'Bobina', code: 'bobina_Execute' },
        { id: 'h9', module: 'HICONE', name: 'Bobina FullControl', code: 'bobina_FullControl' },
        { id: 'h10', module: 'HICONE', name: 'Bobina Insert', code: 'bobina_Insert' },
        { id: 'h11', module: 'HICONE', name: 'Bobina Update', code: 'bobina_Update' },
        { id: 'h12', module: 'HICONE', name: 'Address Display Map', code: 'addressdisplay_Execute' },
        { id: 'h13', module: 'HICONE', name: 'Agregar Bobinas', code: 'agregarbobinas_Execute' },
        { id: 'h14', module: 'HICONE', name: 'Audit Delete', code: 'audit_Delete' },
        { id: 'h15', module: 'HICONE', name: 'Audit', code: 'audit_Execute' },
        { id: 'h16', module: 'HICONE', name: 'Audit FullControl', code: 'audit_FullControl' },
        { id: 'h17', module: 'HICONE', name: 'Audit Insert', code: 'audit_Insert' },
        { id: 'h18', module: 'HICONE', name: 'Audit Update', code: 'audit_Update' },
        { id: 'h19', module: 'HICONE', name: 'Audit Deleted', code: 'auditdeleted_Execute' },
        { id: 'h20', module: 'HICONE', name: 'Audit View', code: 'auditview_Execute' },
        { id: 'h21', module: 'HICONE', name: 'Audit WW', code: 'auditww_Execute' },
        { id: 'h22', module: 'HICONE', name: 'Bobina Disponible DP', code: 'bobinadisponibledp_Execute' },
        { id: 'h23', module: 'HICONE', name: 'Bobina Disponible DP Services', code: 'bobinadisponibledp_Services_Execute' },
        { id: 'h24', module: 'HICONE', name: 'Bobina DP', code: 'bobinadp_Execute' },
        { id: 'h25', module: 'HICONE', name: 'Bobina DP Services', code: 'bobinadp_Services_Execute' },
        { id: 'h26', module: 'HICONE', name: 'Bobina Medicion DP', code: 'bobinamediciondp_Execute' },
        { id: 'h27', module: 'HICONE', name: 'Bobina Medicion DP Services', code: 'bobinamediciondp_Services_Execute' },
        { id: 'h28', module: 'HICONE', name: 'Select Bobina', code: 'bobinaprompt_Execute' },
        { id: 'h29', module: 'HICONE', name: 'Palet Report Main', code: 'bobinareportmain_Execute' },
        { id: 'h30', module: 'HICONE', name: 'Bobina Report Main Multi Services', code: 'bobinareportmain_Services_Execute' },
        { id: 'h31', module: 'HICONE', name: 'Bobinas En Medicion Services', code: 'bobinasenmedicion_Services_Execute' },
        { id: 'h32', module: 'HICONE', name: 'Bobina Validada DP', code: 'bobinavalidadadp_Execute' },
        { id: 'h33', module: 'HICONE', name: 'Bobina Validada DP Services', code: 'bobinavalidadadp_Services_Execute' },
        { id: 'h34', module: 'HICONE', name: 'Bobina View', code: 'bobinaview_Execute' },
        { id: 'h35', module: 'HICONE', name: 'Bobina Prensado WCGet Filter Services', code: 'bobinaview_Services_Execute' },
        { id: 'h36', module: 'HICONE', name: 'Bobina WW', code: 'bobinaww_Execute' },
        { id: 'h37', module: 'HICONE', name: 'Bobina WWGet Filter Services', code: 'bobinaww_Services_Execute' },
        { id: 'h38', module: 'HICONE', name: 'Browser URL', code: 'browserurl_Execute' },
        { id: 'h39', module: 'HICONE', name: 'Budget Delete', code: 'budget_Delete' },
        { id: 'h40', module: 'HICONE', name: 'Budget', code: 'budget_Execute' },
        { id: 'h41', module: 'HICONE', name: 'Budget FullControl', code: 'budget_FullControl' },
        { id: 'h42', module: 'HICONE', name: 'Budget Insert', code: 'budget_Insert' },
        { id: 'h43', module: 'HICONE', name: 'Budget Update', code: 'budget_Update' },
        { id: 'h44', module: 'HICONE', name: 'Select Budget', code: 'budgetprompt_Execute' },
        { id: 'h45', module: 'HICONE', name: 'Budget View', code: 'budgetview_Execute' },
        { id: 'h46', module: 'HICONE', name: 'Budget WW', code: 'budgetww_Execute' },
        { id: 'h47', module: 'HICONE', name: 'Budget WWGet Filter Services', code: 'budgetww_Services_Execute' },
        { id: 'h48', module: 'HICONE', name: 'Cargar Embarque', code: 'cargarembarque_Execute' },
        { id: 'h49', module: 'HICONE', name: 'Carrera Delete', code: 'carrera_Delete' },
        { id: 'h50', module: 'HICONE', name: 'Carrera', code: 'carrera_Execute' },
        { id: 'h51', module: 'HICONE', name: 'Carrera FullControl', code: 'carrera_FullControl' },
        { id: 'h52', module: 'HICONE', name: 'Carrera Insert', code: 'carrera_Insert' },
        { id: 'h53', module: 'HICONE', name: 'Carrera Update', code: 'carrera_Update' },
        { id: 'h54', module: 'HICONE', name: 'Carrera DP', code: 'carreradp_Execute' },
        { id: 'h55', module: 'HICONE', name: 'Carrera DP Services', code: 'carreradp_Services_Execute' },
        { id: 'h56', module: 'HICONE', name: 'Select Carrera', code: 'carreraprompt_Execute' },
        { id: 'h57', module: 'HICONE', name: 'Carreras Terminadas Services', code: 'carrerasterminadas_Services_Execute' },
        { id: 'h58', module: 'HICONE', name: 'Carrera View', code: 'carreraview_Execute' },
        { id: 'h59', module: 'HICONE', name: 'Carrera WW', code: 'carreraww_Execute' },
        { id: 'h60', module: 'HICONE', name: 'Carrera WWGet Filter Services', code: 'carreraww_Services_Execute' },
        { id: 'h61', module: 'HICONE', name: 'Carrete Delete', code: 'carrete_Delete' },
        { id: 'h62', module: 'HICONE', name: 'Carrete', code: 'carrete_Execute' },
        { id: 'h63', module: 'HICONE', name: 'Carrete FullControl', code: 'carrete_FullControl' },
        { id: 'h64', module: 'HICONE', name: 'Carrete Insert', code: 'carrete_Insert' },
        { id: 'h65', module: 'HICONE', name: 'Carrete Update', code: 'carrete_Update' },
        { id: 'h66', module: 'HICONE', name: 'Carrete Defecto Delete', code: 'carretedefecto_Delete' },
        { id: 'h67', module: 'HICONE', name: 'Carrete Defecto', code: 'carretedefecto_Execute' },
        { id: 'h68', module: 'HICONE', name: 'Carrete Defecto FullControl', code: 'carretedefecto_FullControl' },
        { id: 'h69', module: 'HICONE', name: 'Carrete Defecto Insert', code: 'carretedefecto_Insert' },
        { id: 'h70', module: 'HICONE', name: 'Carrete Defecto Update', code: 'carretedefecto_Update' },
        { id: 'h71', module: 'HICONE', name: 'Select Carrete Defecto', code: 'carretedefectoprompt_Execute' },
        { id: 'h72', module: 'HICONE', name: 'Carrete Defecto View', code: 'carretedefectoview_Execute' },
        { id: 'h73', module: 'HICONE', name: 'Carrete Defecto WW', code: 'carretedefectoww_Execute' },
        { id: 'h74', module: 'HICONE', name: 'Carrete Defecto WWGet Filter Services', code: 'carretedefectoww_Services_Execute' },
        { id: 'h75', module: 'HICONE', name: 'Carrete DP', code: 'carretedp_Execute' },
        { id: 'h76', module: 'HICONE', name: 'Palet Carrete', code: 'carreteenpallet_Execute' },
        { id: 'h77', module: 'HICONE', name: 'Carrete En Pallet Filter Services', code: 'carreteenpallet_Services_Execute' },
        { id: 'h78', module: 'HICONE', name: 'Carrete Externo DP', code: 'carreteexternodp_Execute' },
        { id: 'h79', module: 'HICONE', name: 'Carrete Externo DP Services', code: 'carreteexternodp_Services_Execute' },
        { id: 'h80', module: 'HICONE', name: 'Carrete Molino', code: 'carretemolino_Execute' },
        { id: 'h81', module: 'HICONE', name: 'Select Carrete', code: 'carreteprompt_Execute' },
        { id: 'h82', module: 'HICONE', name: 'Carrete Report Main Services', code: 'carretereportmain_Services_Execute' },
        { id: 'h83', module: 'HICONE', name: 'Carrete Report Main PCR Services', code: 'carretereportmainpcr_Services_Execute' },
        { id: 'h84', module: 'HICONE', name: 'Carrete Revision DP', code: 'carreterevisiondp_Execute' },
        { id: 'h85', module: 'HICONE', name: 'Carrete Revision DP Services', code: 'carreterevisiondp_Services_Execute' },
        { id: 'h86', module: 'HICONE', name: 'Carrete View', code: 'carreteview_Execute' },
        { id: 'h87', module: 'HICONE', name: 'Carrete WW', code: 'carreteww_Execute' },
        { id: 'h88', module: 'HICONE', name: 'Carrete WWGet Filter Services', code: 'carreteww_Services_Execute' },
        { id: 'h89', module: 'HICONE', name: 'Causa Extrusora DP', code: 'causaextrusoradp_Execute' },
        { id: 'h90', module: 'HICONE', name: 'Causa Interrupcion Delete', code: 'causainterrupcion_Delete' },
        { id: 'h91', module: 'HICONE', name: 'Causa Interrupcion', code: 'causainterrupcion_Execute' },
        { id: 'h92', module: 'HICONE', name: 'Causa Interrupcion FullControl', code: 'causainterrupcion_FullControl' },
        { id: 'h93', module: 'HICONE', name: 'Causa Interrupcion Insert', code: 'causainterrupcion_Insert' },
        { id: 'h94', module: 'HICONE', name: 'Causa Interrupcion Update', code: 'causainterrupcion_Update' },
        { id: 'h95', module: 'HICONE', name: 'Select Causa Interrupcion', code: 'causainterrupcionprompt_Execute' },
        { id: 'h96', module: 'HICONE', name: 'Causa Interrupcion View', code: 'causainterrupcionview_Execute' },
        { id: 'h97', module: 'HICONE', name: 'Causa Interrupcion WW', code: 'causainterrupcionww_Execute' },
        { id: 'h98', module: 'HICONE', name: 'Causa Interrupcion WWGet Filter Services', code: 'causainterrupcionww_Services_Execute' },
        { id: 'h99', module: 'HICONE', name: 'Causa Prensa DP', code: 'causaprensadp_Execute' },
        { id: 'h100', module: 'HICONE', name: 'Company Delete', code: 'company_Delete' },
        { id: 'h101', module: 'HICONE', name: 'Company', code: 'company_Execute' },
        { id: 'h102', module: 'HICONE', name: 'Company FullControl', code: 'company_FullControl' },
        { id: 'h103', module: 'HICONE', name: 'Company Insert', code: 'company_Insert' },
        { id: 'h104', module: 'HICONE', name: 'Company Update', code: 'company_Update' },
        { id: 'h105', module: 'HICONE', name: 'Select Company', code: 'companyprompt_Execute' },
        { id: 'h106', module: 'HICONE', name: 'Company View', code: 'companyview_Execute' },
        { id: 'h107', module: 'HICONE', name: 'Company WW', code: 'companyww_Execute' },
        { id: 'h108', module: 'HICONE', name: 'Company WWGet Filter Services', code: 'companyww_Services_Execute' },
        { id: 'h109', module: 'HICONE', name: 'Configuracion Delete', code: 'configuracion_Delete' },
        { id: 'h110', module: 'HICONE', name: 'Configuracion', code: 'configuracion_Execute' },
        { id: 'h111', module: 'HICONE', name: 'Configuracion FullControl', code: 'configuracion_FullControl' },
        { id: 'h112', module: 'HICONE', name: 'Configuracion Insert', code: 'configuracion_Insert' },
        { id: 'h113', module: 'HICONE', name: 'Configuracion Update', code: 'configuracion_Update' },
        { id: 'h114', module: 'HICONE', name: 'Consolidated Delete', code: 'consolidated_Delete' },
        { id: 'h115', module: 'HICONE', name: 'Consolidated', code: 'consolidated_Execute' },
        { id: 'h116', module: 'HICONE', name: 'Consolidated FullControl', code: 'consolidated_FullControl' },
        { id: 'h117', module: 'HICONE', name: 'Consolidated Insert', code: 'consolidated_Insert' },
        { id: 'h118', module: 'HICONE', name: 'Consolidated Update', code: 'consolidated_Update' },
        { id: 'h119', module: 'HICONE', name: 'Select Consolidated', code: 'consolidatedprompt_Execute' },
        { id: 'h120', module: 'HICONE', name: 'Consolidated View', code: 'consolidatedview_Execute' },
        { id: 'h121', module: 'HICONE', name: 'Consolidated WW', code: 'consolidatedww_Execute' },
        { id: 'h122', module: 'HICONE', name: 'Consolidated WWGet Filter Services', code: 'consolidatedww_Services_Execute' },
        { id: 'h123', module: 'HICONE', name: 'Consultar Carrete', code: 'consultarcarrete_Execute' },
        { id: 'h124', module: 'HICONE', name: 'Consultar Extrusiones Query', code: 'consultarextrusionesquery_Execute' },
        { id: 'h125', module: 'HICONE', name: 'Count Carretes Services', code: 'countcarretes_Services_Execute' },
        { id: 'h126', module: 'HICONE', name: 'Crear Extrusion Services', code: 'crearextrusion_Services_Execute' },
        { id: 'h127', module: 'HICONE', name: 'Crear Interrupcion Services', Code: 'crearinterrupcion_Services_Execute' },
        { id: 'h128', module: 'HICONE', name: 'Crear Orden Etiquetado Services', code: 'crearordenetiquetado_Services_Execute' },
        { id: 'h129', module: 'HICONE', name: 'Crear Prensado Services', code: 'crearprensado_Services_Execute' },
        { id: 'h130', module: 'HICONE', name: 'Crear Prensado Bobina Services', code: 'crearprensadobobina_Services_Execute' },
        { id: 'h131', module: 'HICONE', name: 'Clientes Delete', code: 'customer_Delete' },
        { id: 'h132', module: 'HICONE', name: 'Clientes', code: 'customer_Execute' },
        { id: 'h133', module: 'HICONE', name: 'Clientes FullControl', code: 'customer_FullControl' },
        { id: 'h134', module: 'HICONE', name: 'Clientes Insert', code: 'customer_Insert' },
        { id: 'h135', module: 'HICONE', name: 'Clientes Update', code: 'customer_Update' },
        { id: 'h136', module: 'HICONE', name: 'Select Customer', code: 'customerprompt_Execute' },
        { id: 'h137', module: 'HICONE', name: 'Customer View', code: 'customerview_Execute' },
        { id: 'h138', module: 'HICONE', name: 'Clientes WW', code: 'customerww_Execute' },
        { id: 'h139', module: 'HICONE', name: 'Customer WWGet Filter Services', code: 'customerww_Services_Execute' },
        { id: 'h140', module: 'HICONE', name: 'Directions Service Request Services', code: 'directionsservicerequest_Services_Execute' },
        { id: 'h141', module: 'HICONE', name: 'Document Delete', code: 'document_Delete' },
        { id: 'h142', module: 'HICONE', name: 'Document', code: 'document_Execute' },
        { id: 'h143', module: 'HICONE', name: 'Document FullControl', code: 'document_FullControl' },
        { id: 'h144', module: 'HICONE', name: 'Document Insert', code: 'document_Insert' },
        { id: 'h145', module: 'HICONE', name: 'Document Update', code: 'document_Update' },
        { id: 'h146', module: 'HICONE', name: 'Documento Delete', code: 'documento_Delete' },
        { id: 'h147', module: 'HICONE', name: 'Documento', code: 'documento_Execute' },
        { id: 'h148', module: 'HICONE', name: 'Documento FullControl', code: 'documento_FullControl' },
        { id: 'h149', module: 'HICONE', name: 'Documento Insert', code: 'documento_Insert' },
        { id: 'h150', module: 'HICONE', name: 'Documento Update', code: 'documento_Update' },
        { id: 'h151', module: 'HICONE', name: 'Down Time Code Delete', code: 'downtimecode_Delete' },
        { id: 'h152', module: 'HICONE', name: 'Down Time Code', code: 'downtimecode_Execute' },
        { id: 'h153', module: 'HICONE', name: 'Down Time Code FullControl', code: 'downtimecode_FullControl' },
        { id: 'h154', module: 'HICONE', name: 'Down Time Code Insert', code: 'downtimecode_Insert' },
        { id: 'h155', module: 'HICONE', name: 'Down Time Code Update', code: 'downtimecode_Update' },
        { id: 'h156', module: 'HICONE', name: 'Select Down Time Code', code: 'downtimecodeprompt_Execute' },
        { id: 'h157', module: 'HICONE', name: 'Down Time Code View', code: 'downtimecodeview_Execute' },
        { id: 'h158', module: 'HICONE', name: 'Down Time Code WW', code: 'downtimecodeww_Execute' },
        { id: 'h159', module: 'HICONE', name: 'Down Time Code WWGet Filter Services', code: 'downtimecodeww_Services_Execute' },
        { id: 'h160', module: 'HICONE', name: 'DPBobina Por Extrusion', code: 'dpbobinaporextrusion_Execute' },
        { id: 'h161', module: 'HICONE', name: 'DPCarrete Carrera', code: 'dpcarretecarrera_Execute' },
        { id: 'h162', module: 'HICONE', name: 'DPCarrete Info', code: 'dpcarreteinfo_Execute' },
        { id: 'h163', module: 'HICONE', name: 'DP Dynamic Combo Box Opeardor', code: 'dpcbopeardor_Execute' },
        { id: 'h164', module: 'HICONE', name: 'DP Dynamic Combo Box Producto', code: 'dpcproducto_Execute' },
        { id: 'h165', module: 'HICONE', name: 'DP Dynamic Combo Box Producto Base', code: 'dpcproductobase_Execute' },
        { id: 'h166', module: 'HICONE', name: 'DPDown Time Code', code: 'dpdowntimecode_Execute' },
        { id: 'h167', module: 'HICONE', name: 'DPExtrusion Resultado', code: 'dpextrusionresultado_Execute' },
        { id: 'h168', module: 'HICONE', name: 'DPExtrusora Turno', code: 'dpextrusoraturno_Execute' },
        { id: 'h169', module: 'HICONE', name: 'DPInterrupciones Por Extrusion', code: 'dpinterrupcionesporextrusion_Execute' },
        { id: 'h170', module: 'HICONE', name: 'DPPrensado Bobina SDT', code: 'dpprensadobobinasdt_Execute' },
        { id: 'h171', module: 'HICONE', name: 'DPPrensado Resultado', code: 'dpprensadoresultado_Execute' },
        { id: 'h172', module: 'HICONE', name: 'DPProducto Terminado', code: 'dpproductoterminado_Execute' },
        { id: 'h173', module: 'HICONE', name: 'DPSDTPrensado Bobina', code: 'dpsdtprensadobobina_Execute' },
        { id: 'h174', module: 'HICONE', name: 'DPSDTProducto Por Troquel', code: 'dpsdtproductoportroquel_Execute' },
        { id: 'h175', module: 'HICONE', name: 'DPSDTRpt Extrusion', code: 'dpsdtrptextrusion_Execute' },
        { id: 'h176', module: 'HICONE', name: 'DPSDTRpt Prensado', code: 'dpsdtrptprensado_Execute' },
        { id: 'h177', module: 'HICONE', name: 'DPSDTTrazabilidad', code: 'dpsdttrazabilidad_Execute' },
        { id: 'h178', module: 'HICONE', name: 'Dynamic Form Sample', code: 'dynamicformsample_Execute' },
        { id: 'h179', module: 'HICONE', name: 'Editar Reclamo Detalle', code: 'editarreclamodetalle_Execute' },
        { id: 'h180', module: 'HICONE', name: 'Edit Budget', code: 'editbudget_Execute' },
        { id: 'h181', module: 'HICONE', name: 'Embarque Delete', code: 'embarque_Delete' },
        { id: 'h182', module: 'HICONE', name: 'Embarque', code: 'embarque_Execute' },
        { id: 'h183', module: 'HICONE', name: 'Embarque FullControl', code: 'embarque_FullControl' },
        { id: 'h184', module: 'HICONE', name: 'Embarque Insert', code: 'embarque_Insert' },
        { id: 'h185', module: 'HICONE', name: 'Embarque Update', code: 'embarque_Update' },
        { id: 'h186', module: 'HICONE', name: 'Embarque Detalle Delete', code: 'embarquedetalle_Delete' },
        { id: 'h187', module: 'HICONE', name: 'Embarque Detalle', code: 'embarquedetalle_Execute' },
        { id: 'h188', module: 'HICONE', name: 'Embarque Detalle FullControl', code: 'embarquedetalle_FullControl' },
        { id: 'h189', module: 'HICONE', name: 'Embarque Detalle Insert', code: 'embarquedetalle_Insert' },
        { id: 'h190', module: 'HICONE', name: 'Embarque Detalle Update', code: 'embarquedetalle_Update' },
        { id: 'h191', module: 'HICONE', name: 'Embarque Detalle DP', code: 'embarquedetalledp_Execute' },
        { id: 'h192', module: 'HICONE', name: 'Select Detalle', code: 'embarquedetalleprompt_Execute' },
        { id: 'h193', module: 'HICONE', name: 'Embarque Detalle View', code: 'embarquedetalleview_Execute' },
        { id: 'h194', module: 'HICONE', name: 'Formatos de Embarques', code: 'embarqueformato_Execute' },
        { id: 'h195', module: 'HICONE', name: 'Embarque Pallet Delete', code: 'embarquepallet_Delete' },
        { id: 'h196', module: 'HICONE', name: 'Embarque Pallet', code: 'embarquepallet_Execute' },
        { id: 'h197', module: 'HICONE', name: 'Embarque Pallet FullControl', code: 'embarquepallet_FullControl' },
        { id: 'h198', module: 'HICONE', name: 'Embarque Pallet Insert', code: 'embarquepallet_Insert' },
        { id: 'h199', module: 'HICONE', name: 'Embarque Pallet Update', code: 'embarquepallet_Update' },
        { id: 'h200', module: 'HICONE', name: 'Select Embarque Pallet', code: 'embarquepalletprompt_Execute' },
        { id: 'h201', module: 'HICONE', name: 'Embarque Pallet View', code: 'embarquepalletview_Execute' },
        { id: 'h202', module: 'HICONE', name: 'Embarque Pallet WW', code: 'embarquepalletww_Execute' },
        { id: 'h203', module: 'HICONE', name: 'Embarque Pallet WWGet Filter Services', code: 'embarquepalletww_Services_Execute' },
        { id: 'h204', module: 'HICONE', name: 'Select Embarque', code: 'embarqueprompt_Execute' },
        { id: 'h205', module: 'HICONE', name: 'Embarque Reporte', code: 'embarquereporte_Execute' },
        { id: 'h206', module: 'HICONE', name: 'Embarque View', code: 'embarqueview_Execute' },
        { id: 'h207', module: 'HICONE', name: 'Embarque WP', code: 'embarquewp_Execute' },
        { id: 'h208', module: 'HICONE', name: 'Embarque WW', code: 'embarqueww_Execute' },
        { id: 'h209', module: 'HICONE', name: 'Embarque WWGet Filter Services', code: 'embarqueww_Services_Execute' },
        { id: 'h210', module: 'HICONE', name: 'Escaneo Palet Externo Services', code: 'escaneopaletexterno_Services_Execute' },
        { id: 'h211', module: 'HICONE', name: 'Es Carrete En Pallet Services', code: 'escarreteenpallet_Services_Execute' },
        { id: 'h212', module: 'HICONE', name: 'Etiquetado Formato', code: 'etiquetadoformato_Execute' },
        { id: 'h213', module: 'HICONE', name: 'Etiquetado Operador Delete', code: 'etiquetadooperador_Delete' },
        { id: 'h214', module: 'HICONE', name: 'Etiquetado Operador', code: 'etiquetadooperador_Execute' },
        { id: 'h215', module: 'HICONE', name: 'Etiquetado Operador FullControl', code: 'etiquetadooperador_FullControl' },
        { id: 'h216', module: 'HICONE', name: 'Etiquetado Operador Insert', code: 'etiquetadooperador_Insert' },
        { id: 'h217', module: 'HICONE', name: 'Etiquetado Operador Update', code: 'etiquetadooperador_Update' },
        { id: 'h218', module: 'HICONE', name: 'Select Etiquetado Operador', code: 'etiquetadooperadorprompt_Execute' },
        { id: 'h219', module: 'HICONE', name: 'Etiquetado Operador View', code: 'etiquetadooperadorview_Execute' },
        { id: 'h220', module: 'HICONE', name: 'Etiquetado Operador WW', code: 'etiquetadooperadorww_Execute' },
        { id: 'h221', module: 'HICONE', name: 'Etiquetado Operador WWGet Filter Services', code: 'etiquetadooperadorww_Services_Execute' },
        { id: 'h222', module: 'HICONE', name: 'Exclusion Del Dia', code: 'exclusiondeldia_Execute' },
        { id: 'h223', module: 'HICONE', name: 'Existencia Delete', code: 'existencia_Delete' },
        { id: 'h224', module: 'HICONE', name: 'Existencia', code: 'existencia_Execute' },
        { id: 'h225', module: 'HICONE', name: 'Existencia FullControl', code: 'existencia_FullControl' },
        { id: 'h226', module: 'HICONE', name: 'Existencia Insert', code: 'existencia_Insert' },
        { id: 'h227', module: 'HICONE', name: 'Existencia Update', code: 'existencia_Update' },
        { id: 'h228', module: 'HICONE', name: 'Existencia Producto Delete', code: 'existenciaproducto_Delete' },
        { id: 'h229', module: 'HICONE', name: 'Existencia Producto', code: 'existenciaproducto_Execute' },
        { id: 'h230', module: 'HICONE', name: 'Existencia Producto FullControl', code: 'existenciaproducto_FullControl' },
        { id: 'h231', module: 'HICONE', name: 'Existencia Producto Insert', code: 'existenciaproducto_Insert' },
        { id: 'h232', module: 'HICONE', name: 'Existencia Producto Update', code: 'existenciaproducto_Update' },
        { id: 'h233', module: 'HICONE', name: 'Select Existencia', code: 'existenciaprompt_Execute' },
        { id: 'h234', module: 'HICONE', name: 'Existencia Silo Delete', code: 'existenciasilo_Delete' },
        { id: 'h235', module: 'HICONE', name: 'Existencia Silo', code: 'existenciasilo_Execute' },
        { id: 'h236', module: 'HICONE', name: 'Existencia Silo FullControl', code: 'existenciasilo_FullControl' },
        { id: 'h237', module: 'HICONE', name: 'Existencia Silo Insert', code: 'existenciasilo_Insert' },
        { id: 'h238', module: 'HICONE', name: 'Existencia Silo Update', code: 'existenciasilo_Update' },
        { id: 'h239', module: 'HICONE', name: 'Existencia View', code: 'existenciaview_Execute' },
        { id: 'h240', module: 'HICONE', name: 'Existencia WW', code: 'existenciaww_Execute' },
        { id: 'h241', module: 'HICONE', name: 'Existencia WWGet Filter Services', code: 'existenciaww_Services_Execute' },
        { id: 'h242', module: 'HICONE', name: 'Exportar Permisos Por Rol', code: 'exportarpermisosporrol_Execute' },
        { id: 'h243', module: 'HICONE', name: 'WWP Export Options Description', code: 'exportoptions_Execute' },
        { id: 'h244', module: 'HICONE', name: 'Extrusion Delete', code: 'extrusion_Delete' },
        { id: 'h245', module: 'HICONE', name: 'Extrusion', code: 'extrusion_Execute' },
        { id: 'h246', module: 'HICONE', name: 'Extrusion FullControl', code: 'extrusion_FullControl' },
        { id: 'h247', module: 'HICONE', name: 'Extrusion Insert', code: 'extrusion_Insert' },
        { id: 'h248', module: 'HICONE', name: 'Extrusion Update', code: 'extrusion_Update' },
        { id: 'h249', module: 'HICONE', name: 'Produccion de Bobinas', code: 'extrusiondeldiabobinas_Execute' },
        { id: 'h250', module: 'HICONE', name: 'Extrusion Del Dia DP', code: 'extrusiondeldiadp_Execute' },
        { id: 'h251', module: 'HICONE', name: 'Extrusion Del Dia DP Services', code: 'extrusiondeldiadp_Services_Execute' },
        { id: 'h252', module: 'HICONE', name: 'Extrusion DP', code: 'extrusiondp_Execute' },
        { id: 'h253', module: 'HICONE', name: 'Extrusion DP Services', code: 'extrusiondp_Services_Execute' },
        { id: 'h254', module: 'HICONE', name: 'Extrusiones En Operacion', code: 'extrusionesenoperacion_Execute' },
        { id: 'h255', module: 'HICONE', name: 'Extrusion Interrupcion Delete', code: 'extrusioninterrupcion_Delete' },
        { id: 'h256', module: 'HICONE', name: 'Extrusion Interrupcion', code: 'extrusioninterrupcion_Execute' },
        { id: 'h257', module: 'HICONE', name: 'Extrusion Interrupcion FullControl', code: 'extrusioninterrupcion_FullControl' },
        { id: 'h258', module: 'HICONE', name: 'Extrusion Interrupcion Insert', code: 'extrusioninterrupcion_Insert' },
        { id: 'h259', module: 'HICONE', name: 'Extrusion Interrupcion Update', code: 'extrusioninterrupcion_Update' },
        { id: 'h260', module: 'HICONE', name: 'Select Extrusion Interrupcion', code: 'extrusioninterrupcionprompt_Execute' },
        { id: 'h261', module: 'HICONE', name: 'Extrusion Interrupcion View', code: 'extrusioninterrupcionview_Execute' },
        { id: 'h262', module: 'HICONE', name: 'Extrusion Interrupcion WW', code: 'extrusioninterrupcionww_Execute' },
        { id: 'h263', module: 'HICONE', name: 'Select Extrusion', code: 'extrusionprompt_Execute' },
        { id: 'h264', module: 'HICONE', name: 'Extrusion Resultado Delete', code: 'extrusionresultado_Delete' },
        { id: 'h265', module: 'HICONE', name: 'Extrusion Resultado', code: 'extrusionresultado_Execute' },
        { id: 'h266', module: 'HICONE', name: 'Extrusion Resultado FullControl', code: 'extrusionresultado_FullControl' },
        { id: 'h267', module: 'HICONE', name: 'Extrusion Resultado Insert', code: 'extrusionresultado_Insert' },
        { id: 'h268', module: 'HICONE', name: 'Extrusion Resultado Update', code: 'extrusionresultado_Update' },
        { id: 'h269', module: 'HICONE', name: 'Extrusion Terminada DP', code: 'extrusionterminadadp_Execute' },
        { id: 'h270', module: 'HICONE', name: 'Extrusion Terminada DP Services', code: 'extrusionterminadadp_Services_Execute' },
        { id: 'h271', module: 'HICONE', name: 'Extrusion View', code: 'extrusionview_Execute' },
        { id: 'h272', module: 'HICONE', name: 'Extrusion WW', code: 'extrusionww_Execute' },
        { id: 'h273', module: 'HICONE', name: 'Extrusion WWGet Filter Services', code: 'extrusionww_Services_Execute' },
        { id: 'h274', module: 'HICONE', name: 'Extrusora Delete', code: 'extrusora_Delete' },
        { id: 'h275', module: 'HICONE', name: 'Extrusora', code: 'extrusora_Execute' },
        { id: 'h276', module: 'HICONE', name: 'Extrusora FullControl', code: 'extrusora_FullControl' },
        { id: 'h277', module: 'HICONE', name: 'Extrusora Insert', code: 'extrusora_Insert' },
        { id: 'h278', module: 'HICONE', name: 'Extrusora Update', code: 'extrusora_Update' },
        { id: 'h279', module: 'HICONE', name: 'Extrusora Bobina Delete', code: 'extrusorabobina_Delete' },
        { id: 'h280', module: 'HICONE', name: 'Extrusora Bobina', code: 'extrusorabobina_Execute' },
        { id: 'h281', module: 'HICONE', name: 'Extrusora Bobina FullControl', code: 'extrusorabobina_FullControl' },
        { id: 'h282', module: 'HICONE', name: 'Extrusora Bobina Insert', code: 'extrusorabobina_Insert' },
        { id: 'h283', module: 'HICONE', name: 'Extrusora Bobina Update', code: 'extrusorabobina_Update' },
        { id: 'h284', module: 'HICONE', name: 'Extrusora Detenida', code: 'extrusoradetenida_Execute' },
        { id: 'h285', module: 'HICONE', name: 'Extrusora DP', code: 'extrusoradp_Execute' },
        { id: 'h286', module: 'HICONE', name: 'Extrusora Mezcladora Delete', code: 'extrusoramezcladora_Delete' },
        { id: 'h287', module: 'HICONE', name: 'Extrusora Mezcladora', code: 'extrusoramezcladora_Execute' },
        { id: 'h288', module: 'HICONE', name: 'Extrusora Mezcladora FullControl', code: 'extrusoramezcladora_FullControl' },
        { id: 'h289', module: 'HICONE', name: 'Extrusora Mezcladora Insert', code: 'extrusoramezcladora_Insert' },
        { id: 'h290', module: 'HICONE', name: 'Extrusora Mezcladora Update', code: 'extrusoramezcladora_Update' },
        { id: 'h291', module: 'HICONE', name: 'Select Extrusora Mezcladora', code: 'extrusoramezcladoraprompt_Execute' },
        { id: 'h292', module: 'HICONE', name: 'Extrusora Mezcladora View', code: 'extrusoramezcladoraview_Execute' },
        { id: 'h293', module: 'HICONE', name: 'Extrusora Mezcladora WW', code: 'extrusoramezcladoraww_Execute' },
        { id: 'h294', module: 'HICONE', name: 'Extrusora Mezcladora WWGet Filter Services', code: 'extrusoramezcladoraww_Services_Execute' },
        { id: 'h295', module: 'HICONE', name: 'Extrusora Observacion Delete', code: 'extrusoraobservacion_Delete' },
        { id: 'h296', module: 'HICONE', name: 'Extrusora Observacion', code: 'extrusoraobservacion_Execute' },
        { id: 'h297', module: 'HICONE', name: 'Extrusora Observacion FullControl', code: 'extrusoraobservacion_FullControl' },
        { id: 'h298', module: 'HICONE', name: 'Extrusora Observacion Insert', code: 'extrusoraobservacion_Insert' },
        { id: 'h299', module: 'HICONE', name: 'Extrusora Observacion Update', code: 'extrusoraobservacion_Update' },
        { id: 'h300', module: 'HICONE', name: 'Select Causa Interrupcion', code: 'extrusoraobservacioncausainterrupcionprompt_Execute' },
        { id: 'h301', module: 'HICONE', name: 'Select Extrusora Observacion', code: 'extrusoraobservacionprompt_Execute' },
        { id: 'h302', module: 'HICONE', name: 'Extrusora Observacion View', code: 'extrusoraobservacionview_Execute' },
        { id: 'h303', module: 'HICONE', name: 'Extrusora Observacion WW', code: 'extrusoraobservacionww_Execute' },
        { id: 'h304', module: 'HICONE', name: 'Extrusora Observacion WWGet Filter Services', code: 'extrusoraobservacionww_Services_Execute' },
        { id: 'h305', module: 'HICONE', name: 'Extrusora Producto Delete', code: 'extrusoraproducto_Delete' },
        { id: 'h306', module: 'HICONE', name: 'Extrusora Producto', code: 'extrusoraproducto_Execute' },
        { id: 'h307', module: 'HICONE', name: 'Extrusora Producto FullControl', code: 'extrusoraproducto_FullControl' },
        { id: 'h308', module: 'HICONE', name: 'Extrusora Producto Insert', code: 'extrusoraproducto_Insert' },
        { id: 'h309', module: 'HICONE', name: 'Extrusora Producto Update', code: 'extrusoraproducto_Update' },
        { id: 'h310', module: 'HICONE', name: 'Extrusoras', code: 'extrusoras_Execute' },
        { id: 'h311', module: 'HICONE', name: 'Extrusoras En Operacion', code: 'extrusorasenoperacion_Execute' },
        { id: 'h312', module: 'HICONE', name: 'Extrusoras En Operacion Services', code: 'extrusorasenoperacion_Services_Execute' },
        { id: 'h313', module: 'HICONE', name: 'SDFinalizar Extrusion Services', code: 'finalizarextrusion_Services_Execute' },
        { id: 'h314', module: 'HICONE', name: 'SDFinalizar Prensado Services', code: 'finalizarprensado_Services_Execute' },
        { id: 'h315', module: 'HICONE', name: 'FTB Delete', code: 'ftb_Delete' },
        { id: 'h316', module: 'HICONE', name: 'FTB', code: 'ftb_Execute' },
        { id: 'h317', module: 'HICONE', name: 'FTB FullControl', code: 'ftb_FullControl' },
        { id: 'h318', module: 'HICONE', name: 'FTB Insert', code: 'ftb_Insert' },
        { id: 'h319', module: 'HICONE', name: 'FTB Update', code: 'ftb_Update' },
        { id: 'h320', module: 'HICONE', name: 'Select FTB', code: 'ftbprompt_Execute' },
        { id: 'h321', module: 'HICONE', name: 'FTBView', code: 'ftbview_Execute' },
        { id: 'h322', module: 'HICONE', name: 'FTB WW', code: 'ftbww_Execute' },
        { id: 'h323', module: 'HICONE', name: 'FTBWGet Filter Services', code: 'ftbww_Services_Execute' },
        { id: 'h324', module: 'HICONE', name: 'FTBYTD', code: 'ftbytd_Execute' },
        { id: 'h325', module: 'HICONE', name: 'Generar Bobina No Services', code: 'generarbobinano_Services_Execute' },
        { id: 'h326', module: 'HICONE', name: 'Gestionar Extrusora', code: 'gestionarextrusora_Execute' },
        { id: 'h327', module: 'HICONE', name: 'gestionar Extrusora Mezcladora', code: 'gestionarextrusoramezcladora_Execute' },
        { id: 'h328', module: 'HICONE', name: 'Gestionar Extrusora Producto', code: 'gestionarextrusoraproducto_Execute' },
        { id: 'h329', module: 'HICONE', name: 'Gestionar Inventario', code: 'gestionarinventario_Execute' },
        { id: 'h330', module: 'HICONE', name: 'Gestionar Lote', code: 'gestionarlote_Execute' },
        { id: 'h331', module: 'HICONE', name: 'gestionar Operador', code: 'gestionaroperador_Execute' },
        { id: 'h332', module: 'HICONE', name: 'Gestionar Prensa', code: 'gestionarprensa_Execute' },
        { id: 'h333', module: 'HICONE', name: 'Gestionar Prensa Producto', code: 'gestionarprensaproducto_Execute' },
        { id: 'h334', module: 'HICONE', name: 'gestionar Producto', code: 'gestionarproducto_Execute' },
        { id: 'h335', module: 'HICONE', name: 'gestionar Producto Categoria', code: 'gestionarproductocategoria_Execute' },
        { id: 'h336', module: 'HICONE', name: 'gestionar Producto Terminado', code: 'gestionarproductoterminado_Execute' },
        { id: 'h337', module: 'HICONE', name: 'Gestionar Silo', code: 'gestionarsilo_Execute' },
        { id: 'h338', module: 'HICONE', name: 'gestionar Troquel', code: 'gestionartroquel_Execute' },
        { id: 'h339', module: 'HICONE', name: 'Gestionar Turno', code: 'gestionarturno_Execute' },
        { id: 'h340', module: 'HICONE', name: 'Get Home Modules Sample', code: 'gethomemodulessample_Execute' },
        { id: 'h341', module: 'HICONE', name: 'Get Home Sample Data', code: 'gethomesampledata_Execute' },
        { id: 'h342', module: 'HICONE', name: 'Get Home Sample Data Service', code: 'gethomesampledataservice_Execute' },
        { id: 'h343', module: 'HICONE', name: 'Get Home Sample Data Service Services', code: 'gethomesampledataservice_Services_Execute' },
        { id: 'h344', module: 'HICONE', name: 'Get Home Sample Name Value Data', code: 'gethomesamplenamevaluedata_Execute' },
        { id: 'h345', module: 'HICONE', name: 'Get Home Sample Name Value Data Services', code: 'gethomesamplenamevaluedata_Services_Execute' },
        { id: 'h346', module: 'HICONE', name: 'Get Main Home Modules Sample', code: 'getmainhomemodulessample_Execute' },
        { id: 'h347', module: 'HICONE', name: 'Get Some Home Modules Sample', code: 'getsomehomemodulessample_Execute' },
        { id: 'h348', module: 'HICONE', name: 'Guardar Extrusion Services', code: 'guardarextrusion_Services_Execute' },
        { id: 'h349', module: 'HICONE', name: 'Guardar Extrusion Resultado Services', code: 'guardarextrusionresultado_Services_Execute' },
        { id: 'h350', module: 'HICONE', name: 'Guardar Orden Etiquetado Services', code: 'guardarordenetiquetado_Services_Execute' },
        { id: 'h351', module: 'HICONE', name: 'Guardar Prensado Services', code: 'guardarprensado_Services_Execute' },
        { id: 'h352', module: 'HICONE', name: 'Guardar Prensado Resultado Services', code: 'guardarprensadoresultado_Services_Execute' },
        { id: 'h353', module: 'HICONE', name: 'Gx After Event Replicator Services', code: 'gxaftereventreplicator_Services_Execute' },
        { id: 'h354', module: 'HICONE', name: 'Gx Before Event Replicator Services', code: 'gxbeforeeventreplicator_Services_Execute' },
        { id: 'h355', module: 'HICONE', name: 'Gx On Pending Event Failed Services', code: 'gxonpendingeventfailed_Services_Execute' },
        { id: 'h356', module: 'HICONE', name: 'HICONE_SDCambio Troquel', code: 'hicone_sdcambiotroquel_Execute' },
        { id: 'h357', module: 'HICONE', name: 'HICONE_SDCarrete Molino', code: 'hicone_sdcarretemolino_Execute' },
        { id: 'h358', module: 'HICONE', name: 'HICONE_SDCierre Orden Etiquetado', code: 'hicone_sdcierreordenetiquetado_Execute' },
        { id: 'h359', module: 'HICONE', name: 'HICONE_SDCorregir Pallet', code: 'hicone_sdcorregirpallet_Execute' },
        { id: 'h360', module: 'HICONE', name: 'Etiquetado Pallet', code: 'hicone_sdetiquetadopallet_Execute' },
        { id: 'h361', module: 'HICONE', name: 'HICONE_SDEtiquetar Carrete', code: 'hicone_sdetiquetarcarrete_Execute' },
        { id: 'h362', module: 'HICONE', name: 'Cierre Productivo', code: 'hicone_sdextrusioncierreproductivo_Execute' },
        { id: 'h363', module: 'HICONE', name: 'HICONE_SDExtrusion Intermedia', code: 'hicone_sdextrusionintermedia_Execute' },
        { id: 'h364', module: 'HICONE', name: 'Reporte de Extrusion', code: 'hicone_sdextrusionreporte_Execute' },
        { id: 'h365', module: 'HICONE', name: 'HICONE_SDFinalizar Bobina', code: 'hicone_sdfinalizarbobina_Execute' }
      ];
    }
    
    // Filter out permissions already assigned to the role
    const assignedIds = role.permissions.map(p => p.id);
    return perms.filter(p => !assignedIds.includes(p.id));
  });

  totalPagesToAdd = computed(() => {
    const total = this.filteredPermsToAdd().length;
    return Math.ceil(total / this.pageSizeToAdd) || 1;
  });

  paginatedPermsToAdd = computed(() => {
    const start = (this.currentPageToAdd() - 1) * this.pageSizeToAdd;
    return this.filteredPermsToAdd().slice(start, start + this.pageSizeToAdd);
  });

  openAddPermisosView() {
    this.selectedPermsToAdd.set([]);
    this.currentPageToAdd.set(1);
    this.viewState.set('add-permisos');
  }

  closeAddPermisosView() {
    this.viewState.set('permisos');
  }

  prevPageToAdd() {
    if (this.currentPageToAdd() > 1) {
      this.currentPageToAdd.update(p => p - 1);
    }
  }

  nextPageToAdd() {
    if (this.currentPageToAdd() < this.totalPagesToAdd()) {
      this.currentPageToAdd.update(p => p + 1);
    }
  }

  togglePermToAdd(id: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const current = this.selectedPermsToAdd();
    this.selectedPermsToAdd.set(checked ? [...current, id] : current.filter(p => p !== id));
  }

  isAllPermsToAddSelected() {
    const filtered = this.filteredPermsToAdd();
    if (filtered.length === 0) return false;
    return filtered.every(p => this.selectedPermsToAdd().includes(p.id));
  }

  toggleAllPermsToAdd(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedPermsToAdd.set(this.filteredPermsToAdd().map(p => p.id));
    } else {
      this.selectedPermsToAdd.set([]);
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
        this.loadRoles(); // Refresh roles to get updated permissions
        // Update context
        this.http.get<RoleDto>(`${this.apiUrl}/roles/${role.id}`, { headers: this.headers() }).subscribe(updated => {
          this.selectedRoleContext.set(updated);
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
