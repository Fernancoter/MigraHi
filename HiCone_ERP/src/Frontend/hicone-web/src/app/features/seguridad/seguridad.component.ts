import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-seguridad',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="module-page animate-move-up">
      <header class="module-header">
        <div class="title-area">
          <nav class="breadcrumb">Administración > Seguridad</nav>
          <h1>🛡️ Seguridad y Operadores</h1>
          <p>Control de acceso, gestión de roles y auditoría de sesiones.</p>
        </div>
        <div class="header-actions">
          <button class="btn-premium">➕ Nuevo Usuario</button>
        </div>
      </header>

      <div class="content-card shadow-xl">
        <table class="legacy-table">
          <thead>
            <tr>
              <th>Operador</th>
              <th>Email</th>
              <th>Empresa</th>
              <th>Estado</th>
              <th>Último Acceso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of users" [class.row-blocked]="user.isBlocked">
              <td>
                <div class="user-cell">
                  <div class="avatar-mini">{{ getInitials(user.firstName + ' ' + user.lastName) }}</div>
                  <div class="name-box">
                    <span class="full-name">{{ user.firstName }} {{ user.lastName }}</span>
                    <span class="oper-id">ID: {{ user.operadorId || 'N/A' }}</span>
                  </div>
                </div>
              </td>
              <td>{{ user.email }}</td>
              <td><span class="badge-company">C-{{ user.companyId }}</span></td>
              <td>
                <span class="status-badge" [class.status-active]="user.isActive && !user.isBlocked" [class.status-blocked]="user.isBlocked">
                  {{ user.isBlocked ? 'BLOQUEADO' : (user.isActive ? 'ACTIVO' : 'INACTIVO') }}
                </span>
              </td>
              <td class="text-muted">{{ user.lastLoginAt ? (user.lastLoginAt | date:'short') : 'Nunca' }}</td>
              <td>
                <div class="action-row">
                  <button class="action-btn edit" title="Editar">✏️</button>
                  <button class="action-btn block" 
                          [title]="user.isBlocked ? 'Desbloquear' : 'Bloquear'"
                          (click)="toggleBlock(user)">
                    {{ user.isBlocked ? '🔓' : '🚫' }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .module-page { padding: 1.5rem 2.5rem; }
    .module-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem; }
    .breadcrumb { font-size: 0.75rem; color: #94a3b8; margin-bottom: 0.5rem; font-weight: 600; text-transform: uppercase; }
    h1 { font-size: 1.8rem; font-weight: 800; color: #1e293b; margin: 0; }
    p { color: #64748b; font-size: 0.9rem; }
    
    .btn-premium { background: #166534; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 700; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 10px rgba(22, 101, 52, 0.3); }
    .btn-premium:hover { background: #15803d; transform: translateY(-2px); }

    .content-card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; }

    .legacy-table { width: 100%; border-collapse: collapse; }
    .legacy-table th { background: #f8fafc; padding: 1rem 1.5rem; text-align: left; font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; border-bottom: 2px solid #f1f5f9; }
    .legacy-table td { padding: 1rem 1.5rem; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }

    .user-cell { display: flex; align-items: center; gap: 1rem; }
    .avatar-mini { width: 36px; height: 36px; background: #e2e8f0; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.7rem; color: #475569; }
    .name-box { display: flex; flex-direction: column; }
    .full-name { font-weight: 700; color: #1e293b; font-size: 0.9rem; }
    .oper-id { font-size: 0.7rem; color: #94a3b8; }

    .badge-company { background: #f1f5f9; color: #475569; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 700; }
    .status-badge { font-size: 0.7rem; font-weight: 800; padding: 0.25rem 0.6rem; border-radius: 20px; }
    .status-active { background: #dcfce7; color: #166534; }
    .status-blocked { background: #fee2e2; color: #b91c1c; }

    .row-blocked { background: #fffcfc; }

    .action-row { display: flex; gap: 0.5rem; }
    .action-btn { background: transparent; border: 1px solid #e2e8f0; padding: 0.4rem; border-radius: 6px; cursor: pointer; transition: all 0.2s; }
    .action-btn:hover { background: #f8fafc; border-color: #cbd5e1; }
    .action-btn.block:hover { background: #fff1f2; }

    .text-muted { color: #94a3b8; font-size: 0.85rem; }
  `]
})
export class SeguridadComponent implements OnInit {
  private http = inject(HttpClient);
  users: any[] = [];
  apiUrl = `${environment.apiUrl}/v1/users`;

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<any[]>(this.apiUrl).subscribe(res => {
      this.users = res;
    });
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  }

  toggleBlock(user: any) {
    this.http.post(`${this.apiUrl}/${user.id}/toggle-block`, {}).subscribe(() => {
      user.isBlocked = !user.isBlocked;
    });
  }
}
