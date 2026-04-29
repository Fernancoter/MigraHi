import { Component, OnInit, signal } from '@angular/core';
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
  template: `
    <div class="module-page animate-fade-in">
      <!-- Header -->
      <header class="module-header">
        <div class="title-area">
          <nav class="breadcrumb">Seguridad › Roles</nav>
          <h1>🔑 Gestión de Roles</h1>
          <p>Define perfiles de acceso y asigna permisos por módulo.</p>
        </div>
        <button class="btn-primary" (click)="openModal()">+ Nuevo Rol</button>
      </header>

      <div class="alert alert-error"   *ngIf="errorMsg()">⚠️ {{ errorMsg() }}</div>
      <div class="alert alert-success" *ngIf="successMsg()">✅ {{ successMsg() }}</div>

      <!-- Tabla -->
      <div class="table-card">
        <div class="table-toolbar">
          <input type="text" placeholder="Buscar rol..." class="search-input"
            (input)="onSearch($event)" id="search-roles">
          <span class="record-count">{{ filteredRoles().length }} registros</span>
        </div>

        <div class="loading-state" *ngIf="isLoading()">
          <span class="spinner"></span> Cargando roles...
        </div>

        <table *ngIf="!isLoading()" class="data-table">
          <thead>
            <tr>
              <th>Rol</th>
              <th>Descripción</th>
              <th>Permisos</th>
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let r of filteredRoles()">
              <td><span class="role-name-badge">{{ r.name }}</span></td>
              <td class="text-muted">{{ r.description || '—' }}</td>
              <td>
                <span class="perm-count">{{ r.permissions.length }} permiso{{ r.permissions.length !== 1 ? 's' : '' }}</span>
              </td>
              <td>
                <span class="type-badge" [class.system]="r.isSystem">
                  {{ r.isSystem ? '🔒 Sistema' : '✏️ Personalizado' }}
                </span>
              </td>
              <td class="actions-cell">
                <button class="btn-icon edit" (click)="openModal(r)" title="Editar" [disabled]="r.isSystem">✏️</button>
                <button class="btn-icon delete" (click)="deleteRole(r.id)" title="Eliminar" [disabled]="r.isSystem">🗑️</button>
              </td>
            </tr>
            <tr *ngIf="filteredRoles().length === 0 && !isLoading()">
              <td colspan="5" class="empty-row">No se encontraron roles.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal CRUD -->
    <div class="modal-overlay" *ngIf="showModal()" (click)="closeModalOnOverlay($event)">
      <div class="modal-box animate-scale-up" id="role-modal">
        <div class="modal-header">
          <h2>{{ editingRole ? 'Editar Rol' : 'Nuevo Rol' }}</h2>
          <button class="modal-close" (click)="closeModal()">✕</button>
        </div>

        <form [formGroup]="roleForm" (ngSubmit)="onSubmit()" class="modal-form">
          <div class="form-group">
            <label>Nombre del Rol *</label>
            <input type="text" formControlName="name" placeholder="ej. Supervisor de Planta" id="role-name-input">
            <span class="field-error" *ngIf="isInvalid('name')">Requerido</span>
          </div>
          <div class="form-group">
            <label>Descripción</label>
            <input type="text" formControlName="description" placeholder="Descripción opcional" id="role-desc-input">
          </div>

          <!-- Permisos agrupados por módulo -->
          <div class="form-group">
            <label>Permisos Asignados</label>
            <div class="permissions-panel">
              <div class="perm-module" *ngFor="let mod of permissionsByModule()">
                <div class="perm-module-header">
                  <input type="checkbox"
                    [id]="'mod-' + mod.module"
                    [checked]="isModuleFullySelected(mod)"
                    [indeterminate]="isModulePartiallySelected(mod)"
                    (change)="toggleModule(mod, $event)">
                  <label [for]="'mod-' + mod.module" class="perm-module-label">{{ mod.module }}</label>
                </div>
                <div class="perm-items">
                  <label class="perm-check" *ngFor="let perm of mod.permissions">
                    <input type="checkbox"
                      [checked]="selectedPermIds().includes(perm.id)"
                      (change)="togglePerm(perm.id, $event)">
                    <div class="perm-info">
                      <span class="perm-name">{{ perm.name }}</span>
                      <span class="perm-code">{{ perm.code }}</span>
                    </div>
                  </label>
                </div>
              </div>
              <p class="text-muted" *ngIf="allPermissions.length === 0">Sin permisos disponibles en el sistema.</p>
            </div>
          </div>

          <div class="modal-actions">
            <button type="button" class="btn-secondary" (click)="closeModal()">Cancelar</button>
            <button type="submit" class="btn-primary" [disabled]="isSaving()">
              {{ isSaving() ? 'Guardando...' : (editingRole ? 'Guardar Cambios' : 'Crear Rol') }}
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

    .role-name-badge { font-weight: 700; color: #1e293b; }
    .perm-count { background: #eff6ff; color: #1d4ed8; font-size: 0.72rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 20px; border: 1px solid #bfdbfe; }
    .type-badge { font-size: 0.72rem; font-weight: 600; padding: 0.2rem 0.6rem; border-radius: 20px; background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; }
    .type-badge.system { background: #fef9c3; color: #854d0e; border-color: #fde68a; }
    .text-muted { color: #94a3b8; }

    .actions-cell { display: flex; gap: 0.4rem; }
    .btn-icon { background: none; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.35rem 0.55rem; cursor: pointer; font-size: 0.9rem; transition: all 0.2s; }
    .btn-icon:disabled { opacity: 0.35; cursor: not-allowed; }
    .btn-icon.edit:hover:not(:disabled)   { background: #eff6ff; border-color: #3b82f6; }
    .btn-icon.delete:hover:not(:disabled) { background: #fef2f2; border-color: #ef4444; }

    .btn-primary { background: #2e7d32; color: white; border: none; padding: 0.65rem 1.25rem; border-radius: 10px; font-weight: 700; cursor: pointer; font-size: 0.875rem; transition: all 0.2s; }
    .btn-primary:hover:not(:disabled) { background: #166534; }
    .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
    .btn-secondary { background: white; color: #334155; border: 1px solid #e2e8f0; padding: 0.65rem 1.25rem; border-radius: 10px; font-weight: 700; cursor: pointer; font-size: 0.875rem; }
    .btn-secondary:hover { background: #f8fafc; }

    /* Modal */
    .modal-overlay { position: fixed; inset: 0; background: rgba(15,23,42,0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(4px); }
    .modal-box { background: white; border-radius: 20px; width: 680px; max-height: 90vh; overflow-y: auto; box-shadow: 0 25px 60px rgba(0,0,0,0.3); }
    .modal-header { padding: 1.5rem 2rem; border-bottom: 1px solid #f1f5f9; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; background: white; z-index: 1; }
    .modal-header h2 { font-size: 1.25rem; font-weight: 800; color: #1e293b; margin: 0; }
    .modal-close { background: none; border: none; font-size: 1.1rem; cursor: pointer; color: #94a3b8; border-radius: 6px; }
    .modal-close:hover { background: #f1f5f9; color: #334155; }

    .modal-form { padding: 1.75rem 2rem; display: flex; flex-direction: column; gap: 1.25rem; }
    .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
    label { font-size: 0.78rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
    input[type="text"] { padding: 0.625rem 0.875rem; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 0.875rem; color: #334155; }
    input[type="text"]:focus { outline: none; border-color: #2e7d32; box-shadow: 0 0 0 3px rgba(46,125,50,0.1); }
    .field-error { font-size: 0.72rem; color: #ef4444; font-weight: 600; }

    .permissions-panel { border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; max-height: 300px; overflow-y: auto; }
    .perm-module { border-bottom: 1px solid #f1f5f9; }
    .perm-module:last-child { border-bottom: none; }
    .perm-module-header { padding: 0.6rem 1rem; background: #f8fafc; display: flex; align-items: center; gap: 0.6rem; }
    .perm-module-label { font-size: 0.78rem; font-weight: 800; color: #334155; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; }
    .perm-items { padding: 0.5rem 1rem 0.75rem 2.25rem; display: flex; flex-direction: column; gap: 0.4rem; }
    .perm-check { display: flex; align-items: center; gap: 0.6rem; cursor: pointer; padding: 0.35rem 0; }
    .perm-check input { accent-color: #2e7d32; flex-shrink: 0; }
    .perm-info { display: flex; flex-direction: column; }
    .perm-name { font-size: 0.82rem; font-weight: 600; color: #334155; }
    .perm-code { font-size: 0.68rem; color: #94a3b8; font-family: monospace; }

    .modal-actions { display: flex; justify-content: flex-end; gap: 0.75rem; padding-top: 0.5rem; border-top: 1px solid #f1f5f9; }

    @keyframes scale-up { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
    .animate-scale-up { animation: scale-up 0.25s ease-out; }
  `]
})
export class RolesComponent implements OnInit {
  private apiUrl = 'http://localhost:5007/api';

  roles = signal<RoleDto[]>([]);
  filteredRoles = signal<RoleDto[]>([]);
  allPermissions: PermissionDto[] = [];
  selectedPermIds = signal<string[]>([]);

  isLoading = signal(true);
  isSaving = signal(false);
  showModal = signal(false);
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
      next: (data) => { this.allPermissions = data; }
    });
  }

  permissionsByModule() {
    const map = new Map<string, { module: string; permissions: PermissionDto[] }>();
    for (const p of this.allPermissions) {
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
    this.filteredRoles.set(this.roles().filter(r =>
      r.name.toLowerCase().includes(q) || (r.description ?? '').toLowerCase().includes(q)
    ));
  }

  openModal(role?: RoleDto) {
    this.editingRole = role ?? null;
    this.errorMsg.set(null);
    this.successMsg.set(null);
    this.selectedPermIds.set(role?.permissions.map(p => p.id) ?? []);
    this.roleForm.reset({ name: role?.name ?? '', description: role?.description ?? '' });
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
}
