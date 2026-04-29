import { Component, OnInit, signal } from '@angular/core';
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
  operadorId?: number;
  roles: string[];
}

interface RoleDto {
  id: string;
  name: string;
}

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="module-page animate-fade-in">
      <!-- Header -->
      <header class="module-header">
        <div class="title-area">
          <nav class="breadcrumb">Seguridad › Usuarios</nav>
          <h1>👥 Gestión de Usuarios</h1>
          <p>Administra las cuentas de acceso al sistema Hi-Cone ERP.</p>
        </div>
        <button class="btn-primary" (click)="openModal()">+ Nuevo Usuario</button>
      </header>

      <!-- Alerta de error global -->
      <div class="alert alert-error" *ngIf="errorMsg()">⚠️ {{ errorMsg() }}</div>
      <div class="alert alert-success" *ngIf="successMsg()">✅ {{ successMsg() }}</div>

      <!-- Tabla -->
      <div class="table-card">
        <div class="table-toolbar">
          <input type="text" placeholder="Buscar usuario..." class="search-input"
            (input)="onSearch($event)" id="search-usuarios">
          <span class="record-count">{{ filteredUsers().length }} registros</span>
        </div>

        <div class="loading-state" *ngIf="isLoading()">
          <span class="spinner"></span> Cargando usuarios...
        </div>

        <table *ngIf="!isLoading()" class="data-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Email</th>
              <th>Nombre Completo</th>
              <th>Roles</th>
              <th>Estado</th>
              <th>Último Acceso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let u of filteredUsers()">
              <td><span class="username-badge">{{ u.username }}</span></td>
              <td class="text-muted">{{ u.email }}</td>
              <td>{{ u.firstName }} {{ u.lastName }}</td>
              <td>
                <span class="role-tag" *ngFor="let r of u.roles">{{ r }}</span>
                <span class="text-muted" *ngIf="u.roles.length === 0">—</span>
              </td>
              <td>
                <span class="status-badge" [class.active]="u.isActive" [class.inactive]="!u.isActive">
                  {{ u.isActive ? 'Activo' : 'Inactivo' }}
                </span>
                <span class="status-badge locked" *ngIf="u.isLockedOut">Bloqueado</span>
              </td>
              <td class="text-muted text-sm">{{ u.lastLoginAt ? (u.lastLoginAt | date:'dd/MM/yy HH:mm') : 'Nunca' }}</td>
              <td class="actions-cell">
                <button class="btn-icon edit" (click)="openModal(u)" title="Editar">✏️</button>
                <button class="btn-icon delete" (click)="deleteUser(u.id)" title="Eliminar">🗑️</button>
              </td>
            </tr>
            <tr *ngIf="filteredUsers().length === 0 && !isLoading()">
              <td colspan="7" class="empty-row">No se encontraron usuarios.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal CRUD -->
    <div class="modal-overlay" *ngIf="showModal()" (click)="closeModalOnOverlay($event)">
      <div class="modal-box animate-scale-up" id="user-modal">
        <div class="modal-header">
          <h2>{{ editingUser ? 'Editar Usuario' : 'Nuevo Usuario' }}</h2>
          <button class="modal-close" (click)="closeModal()">✕</button>
        </div>

        <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="modal-form">
          <div class="form-grid">
            <div class="form-group" *ngIf="!editingUser">
              <label>Nombre de Usuario *</label>
              <input type="text" formControlName="username" placeholder="usuario123" id="username-input">
              <span class="field-error" *ngIf="isInvalid('username')">Requerido</span>
            </div>

            <div class="form-group" *ngIf="!editingUser">
              <label>Contraseña Inicial *</label>
              <input type="password" formControlName="password" placeholder="••••••••" id="password-input">
              <span class="field-error" *ngIf="isInvalid('password')">Mínimo 6 caracteres</span>
            </div>

            <div class="form-group">
              <label>Email *</label>
              <input type="email" formControlName="email" placeholder="email@hicone.com" id="email-input">
              <span class="field-error" *ngIf="isInvalid('email')">Email inválido</span>
            </div>

            <div class="form-group">
              <label>Nombre *</label>
              <input type="text" formControlName="firstName" placeholder="Juan" id="firstname-input">
            </div>

            <div class="form-group">
              <label>Apellido *</label>
              <input type="text" formControlName="lastName" placeholder="Pérez" id="lastname-input">
            </div>

            <div class="form-group">
              <label>Teléfono</label>
              <input type="text" formControlName="phoneNumber" placeholder="+52 55..." id="phone-input">
            </div>

            <div class="form-group">
              <label>ID Operador (Legado)</label>
              <input type="number" formControlName="operadorId" placeholder="ej. 42" id="operador-input">
            </div>

            <div class="form-group" *ngIf="editingUser">
              <label>Estado</label>
              <select formControlName="isActive" id="status-select">
                <option [value]="true">Activo</option>
                <option [value]="false">Inactivo</option>
              </select>
            </div>

            <div class="form-group" *ngIf="editingUser">
              <label>Bloqueado</label>
              <select formControlName="isLockedOut" id="locked-select">
                <option [value]="false">No</option>
                <option [value]="true">Sí</option>
              </select>
            </div>

            <div class="form-group" *ngIf="editingUser">
              <label>Debe cambiar contraseña</label>
              <select formControlName="mustChangePassword" id="mustchange-select">
                <option [value]="true">Sí</option>
                <option [value]="false">No</option>
              </select>
            </div>
          </div>

          <!-- Roles -->
          <div class="form-group full-width">
            <label>Roles Asignados</label>
            <div class="roles-checklist">
              <label class="role-check" *ngFor="let role of availableRoles">
                <input type="checkbox" [value]="role.id"
                  [checked]="selectedRoleIds().includes(role.id)"
                  (change)="toggleRole(role.id, $event)">
                <span>{{ role.name }}</span>
              </label>
              <span class="text-muted" *ngIf="availableRoles.length === 0">Sin roles disponibles.</span>
            </div>
          </div>

          <div class="modal-actions">
            <button type="button" class="btn-secondary" (click)="closeModal()">Cancelar</button>
            <button type="submit" class="btn-primary" [disabled]="isSaving()">
              {{ isSaving() ? 'Guardando...' : (editingUser ? 'Guardar Cambios' : 'Crear Usuario') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .module-page { padding: 1.5rem 2.5rem; background: #f8fafc; min-height: 100%; }
    .module-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; }
    .breadcrumb { font-size: 0.7rem; color: #94a3b8; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.4rem; }
    h1 { font-size: 1.6rem; font-weight: 800; color: #1e293b; margin: 0 0 0.2rem; }
    h1 + p { color: #64748b; font-size: 0.85rem; margin: 0; }

    .alert { padding: 0.75rem 1.25rem; border-radius: 10px; margin-bottom: 1rem; font-weight: 600; font-size: 0.875rem; }
    .alert-error   { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }
    .alert-success { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; }

    .table-card { background: white; border-radius: 14px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.04); }
    .table-toolbar { padding: 1rem 1.5rem; display: flex; align-items: center; gap: 1rem; border-bottom: 1px solid #f1f5f9; }
    .search-input { flex: 1; max-width: 300px; padding: 0.5rem 0.875rem; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 0.875rem; color: #334155; }
    .search-input:focus { outline: none; border-color: #2e7d32; box-shadow: 0 0 0 3px rgba(46,125,50,0.1); }
    .record-count { margin-left: auto; font-size: 0.78rem; color: #94a3b8; font-weight: 600; }

    .loading-state { padding: 3rem; text-align: center; color: #94a3b8; display: flex; align-items: center; justify-content: center; gap: 0.75rem; }
    .spinner { width: 18px; height: 18px; border: 2px solid #e2e8f0; border-top-color: #2e7d32; border-radius: 50%; animation: spin 0.8s linear infinite; display: inline-block; }
    @keyframes spin { to { transform: rotate(360deg); } }

    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th { padding: 0.75rem 1rem; text-align: left; font-size: 0.72rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 2px solid #f1f5f9; background: #fafafa; }
    .data-table td { padding: 0.875rem 1rem; font-size: 0.875rem; color: #334155; border-bottom: 1px solid #f8fafc; vertical-align: middle; }
    .data-table tr:last-child td { border-bottom: none; }
    .data-table tr:hover td { background: #fafafa; }
    .empty-row { text-align: center; color: #94a3b8; padding: 3rem !important; }

    .username-badge { background: #eff6ff; color: #1d4ed8; font-weight: 700; padding: 0.25rem 0.6rem; border-radius: 6px; font-size: 0.78rem; font-family: monospace; }
    .role-tag { background: #f0fdf4; color: #166534; font-size: 0.72rem; font-weight: 700; padding: 0.2rem 0.5rem; border-radius: 20px; border: 1px solid #bbf7d0; margin-right: 0.25rem; }
    .status-badge { font-size: 0.72rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 20px; margin-right: 0.25rem; }
    .status-badge.active   { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; }
    .status-badge.inactive { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }
    .status-badge.locked   { background: #fefce8; color: #92400e; border: 1px solid #fde68a; }
    .text-muted { color: #94a3b8; }
    .text-sm { font-size: 0.78rem; }

    .actions-cell { display: flex; gap: 0.4rem; }
    .btn-icon { background: none; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.35rem 0.55rem; cursor: pointer; font-size: 0.9rem; transition: all 0.2s; }
    .btn-icon.edit:hover   { background: #eff6ff; border-color: #3b82f6; }
    .btn-icon.delete:hover { background: #fef2f2; border-color: #ef4444; }

    .btn-primary { background: #2e7d32; color: white; border: none; padding: 0.65rem 1.25rem; border-radius: 10px; font-weight: 700; cursor: pointer; font-size: 0.875rem; transition: all 0.2s; }
    .btn-primary:hover:not(:disabled) { background: #166534; }
    .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
    .btn-secondary { background: white; color: #334155; border: 1px solid #e2e8f0; padding: 0.65rem 1.25rem; border-radius: 10px; font-weight: 700; cursor: pointer; font-size: 0.875rem; transition: all 0.2s; }
    .btn-secondary:hover { background: #f8fafc; }

    /* Modal */
    .modal-overlay { position: fixed; inset: 0; background: rgba(15,23,42,0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(4px); }
    .modal-box { background: white; border-radius: 20px; width: 680px; max-height: 90vh; overflow-y: auto; box-shadow: 0 25px 60px rgba(0,0,0,0.3); }
    .modal-header { padding: 1.5rem 2rem; border-bottom: 1px solid #f1f5f9; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; background: white; z-index: 1; }
    .modal-header h2 { font-size: 1.25rem; font-weight: 800; color: #1e293b; margin: 0; }
    .modal-close { background: none; border: none; font-size: 1.1rem; cursor: pointer; color: #94a3b8; padding: 0.25rem; border-radius: 6px; }
    .modal-close:hover { background: #f1f5f9; color: #334155; }

    .modal-form { padding: 1.75rem 2rem; }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
    .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
    .form-group.full-width { grid-column: span 2; }
    label { font-size: 0.78rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
    input, select { padding: 0.625rem 0.875rem; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 0.875rem; color: #334155; transition: all 0.2s; }
    input:focus, select:focus { outline: none; border-color: #2e7d32; box-shadow: 0 0 0 3px rgba(46,125,50,0.1); }
    .field-error { font-size: 0.72rem; color: #ef4444; font-weight: 600; }

    .roles-checklist { display: flex; flex-wrap: wrap; gap: 0.5rem; padding: 0.75rem; background: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0; min-height: 60px; }
    .role-check { display: flex; align-items: center; gap: 0.4rem; background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.35rem 0.75rem; cursor: pointer; font-size: 0.82rem; font-weight: 600; color: #334155; transition: all 0.2s; }
    .role-check:has(input:checked) { background: #f0fdf4; border-color: #2e7d32; color: #166534; }
    .role-check input { margin: 0; accent-color: #2e7d32; }

    .modal-actions { display: flex; justify-content: flex-end; gap: 0.75rem; padding-top: 1rem; border-top: 1px solid #f1f5f9; margin-top: 1rem; }

    @keyframes scale-up { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
    .animate-scale-up { animation: scale-up 0.25s ease-out; }
  `]
})
export class UsuariosComponent implements OnInit {
  private apiUrl = 'http://localhost:5007/api';

  users = signal<UserDto[]>([]);
  filteredUsers = signal<UserDto[]>([]);
  availableRoles: RoleDto[] = [];
  selectedRoleIds = signal<string[]>([]);

  isLoading = signal(true);
  isSaving = signal(false);
  showModal = signal(false);
  errorMsg = signal<string | null>(null);
  successMsg = signal<string | null>(null);
  editingUser: UserDto | null = null;

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
      isActive:          [true],
      isLockedOut:       [false],
      mustChangePassword:[true],
    });
  }

  ngOnInit() {
    this.loadUsers();
    this.loadRoles();
  }

  private headers(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  loadUsers() {
    this.isLoading.set(true);
    this.http.get<UserDto[]>(`${this.apiUrl}/users`, { headers: this.headers() }).subscribe({
      next: (data) => { this.users.set(data); this.filteredUsers.set(data); this.isLoading.set(false); },
      error: () => { this.errorMsg.set('Error al cargar usuarios.'); this.isLoading.set(false); }
    });
  }

  loadRoles() {
    this.http.get<RoleDto[]>(`${this.apiUrl}/roles`, { headers: this.headers() }).subscribe({
      next: (data) => { this.availableRoles = data; }
    });
  }

  onSearch(event: Event) {
    const q = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredUsers.set(this.users().filter(u =>
      u.username.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      `${u.firstName} ${u.lastName}`.toLowerCase().includes(q)
    ));
  }

  openModal(user?: UserDto) {
    this.editingUser = user ?? null;
    this.errorMsg.set(null);
    this.successMsg.set(null);
    this.selectedRoleIds.set(user?.roles
      ? this.availableRoles.filter(r => user.roles.includes(r.name)).map(r => r.id)
      : []);

    if (user) {
      this.userForm.patchValue({ ...user });
      this.userForm.get('username')?.disable();
      this.userForm.get('password')?.disable();
    } else {
      this.userForm.reset({ isActive: true, isLockedOut: false, mustChangePassword: true });
      this.userForm.get('username')?.enable();
      this.userForm.get('password')?.enable();
    }
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

  deleteUser(id: string) {
    if (!confirm('¿Estás seguro de que deseas eliminar este usuario? Se realizará una desactivación segura.')) return;
    this.http.delete(`${this.apiUrl}/users/${id}`, { headers: this.headers() }).subscribe({
      next: () => { this.successMsg.set('Usuario eliminado.'); this.loadUsers(); },
      error: () => { this.errorMsg.set('Error al eliminar el usuario.'); }
    });
  }
}
