import { Component, OnInit, signal, computed, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';

interface UserDto {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  isActive: boolean;
  isLockedOut: boolean;
  mustChangePassword: boolean;
  lastLoginAt?: string;
  operadorId?: string;
  gender?: string;
  authenticationType?: string;
  companyId?: number;
  namespace?: string;
  externalId?: string;
  birthday?: string;
  activationDate?: string;
  receivesInformation: boolean;
  cannotChangePassword: boolean;
  passwordNeverExpires: boolean;
  securityPolicyId?: string;
  isRepositoryEnabled: boolean;
  avatarUrl?: string;
  roles: string[];
}

interface RoleDto {
  id: string;
  name: string;
}

interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
}

interface ColumnDef {
  id: string;
  label: string;
  visible: boolean;
}

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  private apiUrl = 'http://localhost:5007/api';

  users = signal<UserDto[]>([]);
  filteredUsers = signal<UserDto[]>([]);
  availableRoles: RoleDto[] = [];
  selectedRoleIds = signal<string[]>([]);

  // Paginación
  currentPage = signal(1);
  itemsPerPage = signal(20);

  // UI State
  isLoading = signal(true);
  isSaving = signal(false);
  showModal = signal(false);
  errorMsg = signal<string | null>(null);
  successMsg = signal<string | null>(null);
  editingUser: UserDto | null = null;
  isViewMode = signal(false);

  // Custom Modals State
  deletingUser = signal<UserDto | null>(null);
  changingPasswordUser = signal<UserDto | null>(null);
  passwordForm: FormGroup;

  // Menus State
  showImportMenu = signal(false);
  showColumnMenu = signal(false);
  showGroupMenu = signal(false);
  showFilterPanel = signal(false);

  // Sub-views State
  viewState = signal<'main' | 'permisos'>('main');
  selectedUserContext = signal<UserDto | null>(null);
  searchPermisosQuery = signal('');

  // Columnas dinámicas
  availableColumns: ColumnDef[] = [
    { id: 'roles', label: 'Roles', visible: true },
    { id: 'permisos', label: 'Permisos', visible: true },
    { id: 'contrasena', label: 'Contraseña', visible: true },
    { id: 'login', label: 'Login', visible: true },
    { id: 'nombre', label: 'Nombre', visible: true },
    { id: 'apellido', label: 'Apellido', visible: true },
    { id: 'email', label: 'Email', visible: false },
    { id: 'genero', label: 'Género', visible: false },
    { id: 'auth', label: 'Autenticación', visible: false }
  ];

  // Filtros Robustos
  activeFilters = signal({
    search: '',
    status: '', // '', 'active', 'inactive', 'locked'
    gender: '', // '', 'M', 'F', 'O'
    auth: '', // '', 'Local', 'GAM', 'LDAP'
    role: '',
    mustChangePwd: '', // '', 'true', 'false'
    operadorId: ''
  });

  // Agrupación
  currentGrouping = signal<'none' | 'gender' | 'auth' | 'role'>('none');

  userForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthService) {
    this.userForm = this.fb.group({
      username:          ['', Validators.required],
      password:          ['', [Validators.required, Validators.minLength(6)]],
      email:             ['', [Validators.required, Validators.email]],
      firstName:         ['', Validators.required],
      lastName:          ['', Validators.required],
      phoneNumber:       [''],
      operadorId:        [null],
      gender:            [''],
      authenticationType:['Local'],
      companyId:         [null],
      namespace:         [''],
      externalId:        [''],
      birthday:          [null],
      activationDate:    [null],
      receivesInformation: [true],
      cannotChangePassword: [false],
      passwordNeverExpires: [false],
      securityPolicyId:  [''],
      isRepositoryEnabled: [true],
      isActive:          [true],
      isLockedOut:       [false],
      mustChangePassword:[true],
      avatarUrl:         ['']
    });

    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadUsers();
    this.loadRoles();
  }

  onFileSelected(event: any) {
    if (this.isViewMode()) return;
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userForm.patchValue({ avatarUrl: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-container')) {
      this.closeAllDropdownMenus();
    }
  }

  private headers(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  loadUsers() {
    this.isLoading.set(true);
    this.http.get<UserDto[]>(`${this.apiUrl}/users`, { headers: this.headers() }).subscribe({
      next: (data) => { 
        this.users.set(data); 
        this.applyFilters();
        this.isLoading.set(false); 
      },
      error: () => { 
        this.errorMsg.set('Error al cargar usuarios.'); 
        this.isLoading.set(false); 
      }
    });
  }

  loadRoles() {
    this.http.get<PaginatedResult<RoleDto>>(`${this.apiUrl}/roles?page=1&pageSize=1000`, { headers: this.headers() }).subscribe({
      next: (data) => { this.availableRoles = data.items; },
      error: () => { this.errorMsg.set('Error al cargar roles para usuarios.'); }
    });
  }

  // ─── Menús y Dropdowns ───────────────────────────────────────────────────

  toggleImportMenu() { this.closeAllDropdownMenus(); this.showImportMenu.set(!this.showImportMenu()); }
  toggleColumnMenu() { this.closeAllDropdownMenus(); this.showColumnMenu.set(!this.showColumnMenu()); }
  toggleGroupMenu() { this.closeAllDropdownMenus(); this.showGroupMenu.set(!this.showGroupMenu()); }
  toggleFilterPanel() { this.showFilterPanel.set(!this.showFilterPanel()); }
  
  closeAllDropdownMenus() {
    this.showImportMenu.set(false);
    this.showColumnMenu.set(false);
    this.showGroupMenu.set(false);
  }

  // ─── Lógica de Columnas ──────────────────────────────────────────────────

  toggleColumn(col: ColumnDef) {
    col.visible = !col.visible;
  }

  isColVisible(id: string): boolean {
    return this.availableColumns.find(c => c.id === id)?.visible ?? false;
  }

  visibleColumnCount(): number {
    return this.availableColumns.filter(c => c.visible).length + 3; // +3 de los iconos fijos de acciones
  }

  // ─── Filtros Robustos ────────────────────────────────────────────────────

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.activeFilters.update(f => ({ ...f, search: value }));
    this.applyFilters();
  }

  onFilterChange(field: keyof typeof this.activeFilters.prototype, event: Event) {
    const value = (event.target as HTMLSelectElement | HTMLInputElement).value;
    this.activeFilters.update(f => ({ ...f, [field]: value }));
    this.applyFilters();
  }

  clearFilters() {
    this.activeFilters.set({
      search: this.activeFilters().search, // Keep search text
      status: '',
      gender: '',
      auth: '',
      role: '',
      mustChangePwd: '',
      operadorId: ''
    });
    this.applyFilters();
  }

  applyFilters() {
    this.currentPage.set(1); // Reset page on filter change
    const filters = this.activeFilters();
    const q = filters.search.toLowerCase();
    
    let result = this.users().filter(u => {
      // Búsqueda (Login/Name/Email)
      const matchSearch = !q || 
        u.username.toLowerCase().includes(q) || 
        u.email.toLowerCase().includes(q) || 
        `${u.firstName} ${u.lastName}`.toLowerCase().includes(q);

      // Status
      let matchStatus = true;
      if (filters.status === 'active') matchStatus = u.isActive && !u.isLockedOut;
      else if (filters.status === 'inactive') matchStatus = !u.isActive;
      else if (filters.status === 'locked') matchStatus = u.isLockedOut;

      // Gender
      const matchGender = !filters.gender || (filters.gender === 'none' ? !u.gender : u.gender === filters.gender);

      // Auth
      const matchAuth = !filters.auth || u.authenticationType === filters.auth;

      // Role (Exact match from the dropdown)
      const matchRole = !filters.role || 
        (filters.role === 'Sin rol' ? u.roles.length === 0 : u.roles.includes(filters.role));

      // Must Change Pwd
      let matchPwd = true;
      if (filters.mustChangePwd === 'true') matchPwd = u.mustChangePassword;
      if (filters.mustChangePwd === 'false') matchPwd = !u.mustChangePassword;

      // Operador ID
      const matchOpId = !filters.operadorId || (u.operadorId?.toString() === filters.operadorId);

      return matchSearch && matchStatus && matchGender && matchAuth && matchRole && matchPwd && matchOpId;
    });

    this.filteredUsers.set(result);
  }

  // ─── Paginación ──────────────────────────────────────────────────────────

  paginatedUsers = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    const end = start + this.itemsPerPage();
    return this.filteredUsers().slice(start, end);
  });

  totalPages = computed(() => {
    return Math.ceil(this.filteredUsers().length / this.itemsPerPage()) || 1;
  });

  nextPage() {
    if (this.currentPage() < this.totalPages()) this.currentPage.update(p => p + 1);
  }

  prevPage() {
    if (this.currentPage() > 1) this.currentPage.update(p => p - 1);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) this.currentPage.set(page);
  }

  // ─── Lógica de Agrupación ────────────────────────────────────────────────

  setGrouping(type: 'none' | 'gender' | 'auth' | 'role') {
    this.currentGrouping.set(type);
    this.closeAllDropdownMenus();
  }

  groupedUsers() {
    const users = this.filteredUsers();
    const groupType = this.currentGrouping();
    
    if (groupType === 'none') return [];

    const map = new Map<string, UserDto[]>();

    users.forEach(u => {
      let key = 'Otros';
      if (groupType === 'gender') {
        if (u.gender === 'M') key = 'Masculino';
        else if (u.gender === 'F') key = 'Femenino';
        else key = 'Sin especificar';
      }
      if (groupType === 'auth') key = u.authenticationType || 'Local';
      if (groupType === 'role') {
        key = u.roles.length > 0 ? u.roles.join(', ') : 'Sin rol';
      }

      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(u);
    });

    return Array.from(map, ([key, value]) => ({ key, users: value }));
  }

  // ─── Acciones Stub (Excel) ───────────────────────────────────────────────

  importExcel() {
    this.closeAllDropdownMenus();
    alert("Funcionalidad 'Importar Excel' en preparación (Paso 2 de la especificación).");
  }

  exportExcel() {
    this.closeAllDropdownMenus();
    alert("Funcionalidad 'Exportar Excel' en preparación (Paso 2 de la especificación).");
  }

  // ─── CRUD Modal ──────────────────────────────────────────────────────────

  openModal(user?: UserDto, viewMode: boolean = false) {
    this.editingUser = user ?? null;
    this.isViewMode.set(viewMode);
    this.errorMsg.set(null);
    this.successMsg.set(null);
    this.selectedRoleIds.set(user?.roles
      ? this.availableRoles.filter(r => user.roles.includes(r.name)).map(r => r.id)
      : []);

    if (user) {
      this.userForm.patchValue({ ...user });
      this.userForm.get('username')?.disable();
      
      if (viewMode) {
        this.userForm.disable(); // Deshabilita todos los campos
      } else {
        this.userForm.enable();
        this.userForm.get('username')?.disable(); // El username nunca se edita
      }
    } else {
      this.userForm.reset({ 
        isActive: true, 
        isLockedOut: false, 
        mustChangePassword: true,
        authenticationType: 'Local',
        gender: '',
        namespace: '',
        externalId: '',
        birthday: null,
        activationDate: null,
        receivesInformation: true,
        cannotChangePassword: false,
        passwordNeverExpires: false,
        isRepositoryEnabled: true,
        avatarUrl: ''
      });
      this.userForm.enable();
    }

    const pwdControl = this.userForm.get('password');
    if (!user && !viewMode) {
      pwdControl?.setValidators([Validators.required, Validators.minLength(6)]);
    } else {
      pwdControl?.clearValidators();
      pwdControl?.setValidators([Validators.minLength(6)]);
    }
    pwdControl?.updateValueAndValidity();

    this.showModal.set(true);
  }

  closeModal() { this.showModal.set(false); }

  closeModalOnOverlay(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) this.closeModal();
  }

  toggleRole(id: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const current = this.selectedRoleIds();
    this.selectedRoleIds.set(checked ? [...current, id] : current.filter(r => r !== id));
  }

  isInvalid(field: string): boolean {
    const c = this.userForm.get(field);
    return !!(c && c.invalid && (c.dirty || c.touched));
  }

  onSubmit() {
    if (this.userForm.invalid) { this.userForm.markAllAsTouched(); return; }
    this.isSaving.set(true);
    this.errorMsg.set(null);

    const payload = { ...this.userForm.getRawValue(), roleIds: this.selectedRoleIds() };

    const req = this.editingUser
      ? this.http.put(`${this.apiUrl}/users/${this.editingUser.id}`, payload, { headers: this.headers() })
      : this.http.post(`${this.apiUrl}/users`, payload, { headers: this.headers() });

    req.subscribe({
      next: () => {
        this.isSaving.set(false);
        this.successMsg.set(this.editingUser ? 'Usuario actualizado correctamente.' : 'Usuario creado correctamente.');
        this.closeModal();
        this.loadUsers();
      },
      error: (err) => {
        this.isSaving.set(false);
        this.errorMsg.set(err.error?.message || 'Error al guardar el usuario.');
      }
    });
  }

  // ─── Custom Delete Modal ──────────────────────────────────────────────────
  openDeleteModal(user: UserDto) {
    this.deletingUser.set(user);
  }

  closeDeleteModal() {
    this.deletingUser.set(null);
  }

  confirmDeleteUser() {
    const user = this.deletingUser();
    if (!user) return;
    this.http.delete(`${this.apiUrl}/users/${user.id}`, { headers: this.headers() }).subscribe({
      next: () => { 
        this.successMsg.set('Usuario eliminado.'); 
        this.loadUsers(); 
        this.closeDeleteModal(); 
      },
      error: () => { 
        this.errorMsg.set('Error al eliminar el usuario.'); 
        this.closeDeleteModal();
      }
    });
  }

  // ─── Custom Password Modal ────────────────────────────────────────────────
  openPasswordModal(user: UserDto) {
    this.changingPasswordUser.set(user);
    this.passwordForm.reset();
  }

  closePasswordModal() {
    this.changingPasswordUser.set(null);
  }

  isPasswordInvalid(field: string): boolean {
    const c = this.passwordForm.get(field);
    return !!(c && c.invalid && (c.dirty || c.touched));
  }

  submitPasswordChange() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }
    const user = this.changingPasswordUser();
    if (!user) return;

    const { newPassword, confirmPassword } = this.passwordForm.value;
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    this.isSaving.set(true);
    // Assuming backend endpoint: PUT /api/users/{id}/change-password
    this.http.put(`${this.apiUrl}/users/${user.id}/change-password`, { newPassword }, { headers: this.headers() }).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.successMsg.set('Contraseña actualizada correctamente.');
        this.closePasswordModal();
      },
      error: (err) => {
        this.isSaving.set(false);
        this.errorMsg.set(err.error?.message || 'Error al cambiar la contraseña.');
        this.closePasswordModal();
      }
    });
  }

  // ─── Sub-vistas ───────────────────────────────────────────────────────────
  openPermisos(user: UserDto) {
    this.selectedUserContext.set(user);
    this.viewState.set('permisos');
    this.searchPermisosQuery.set('');
  }

  closeSubView() {
    this.viewState.set('main');
    this.selectedUserContext.set(null);
  }
}
