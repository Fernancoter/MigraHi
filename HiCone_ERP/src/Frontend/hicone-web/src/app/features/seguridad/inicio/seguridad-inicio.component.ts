import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-seguridad-inicio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="module-page animate-fade-in">
      <header class="module-header">
        <div class="title-area">
          <nav class="breadcrumb">Administración › Seguridad</nav>
          <h1>🛡️ Seguridad y Permisos</h1>
          <p>Gestión centralizada de usuarios, roles y accesos al sistema Hi-Cone ERP.</p>
        </div>
      </header>

      <!-- KPIs rápidos -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-icon users">👥</div>
          <div class="kpi-info">
            <span class="kpi-label">Usuarios Activos</span>
            <span class="kpi-value">—</span>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon roles">🔑</div>
          <div class="kpi-info">
            <span class="kpi-label">Roles Definidos</span>
            <span class="kpi-value">—</span>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon perms">🛡️</div>
          <div class="kpi-info">
            <span class="kpi-label">Permisos en Sistema</span>
            <span class="kpi-value">—</span>
          </div>
        </div>
      </div>

      <!-- Accesos rápidos -->
      <div class="quick-access-grid">
        <a routerLink="/seguridad/usuarios" class="quick-card">
          <div class="qc-icon">👥</div>
          <div class="qc-body">
            <h3>Gestión de Usuarios</h3>
            <p>Crear, editar y desactivar cuentas de acceso al sistema.</p>
          </div>
          <span class="qc-arrow">→</span>
        </a>
        <a routerLink="/seguridad/roles" class="quick-card">
          <div class="qc-icon">🔑</div>
          <div class="qc-body">
            <h3>Gestión de Roles</h3>
            <p>Definir perfiles de acceso y asignar permisos por módulo.</p>
          </div>
          <span class="qc-arrow">→</span>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .module-page { padding: 1.5rem 2.5rem; background: #f8fafc; min-height: 100%; }
    .module-header { margin-bottom: 2rem; }
    .breadcrumb { font-size: 0.7rem; color: #94a3b8; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.4rem; }
    h1 { font-size: 1.75rem; font-weight: 800; color: #1e293b; margin: 0 0 0.25rem; }
    h1 + p { color: #64748b; font-size: 0.9rem; margin: 0; }

    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.25rem;
      margin-bottom: 2rem;
    }

    .kpi-card {
      background: white;
      border-radius: 14px;
      border: 1px solid #e2e8f0;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    }

    .kpi-icon { font-size: 2rem; width: 52px; height: 52px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
    .kpi-icon.users { background: #eff6ff; }
    .kpi-icon.roles  { background: #f0fdf4; }
    .kpi-icon.perms  { background: #fdf4ff; }
    .kpi-info { display: flex; flex-direction: column; gap: 0.15rem; }
    .kpi-label { font-size: 0.78rem; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
    .kpi-value { font-size: 1.75rem; font-weight: 800; color: #1e293b; line-height: 1; }

    .quick-access-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }

    .quick-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 1.75rem;
      display: flex;
      align-items: center;
      gap: 1.25rem;
      text-decoration: none;
      color: inherit;
      transition: all 0.2s;
      box-shadow: 0 1px 4px rgba(0,0,0,0.04);
      cursor: pointer;
    }
    .quick-card:hover {
      border-color: #2e7d32;
      box-shadow: 0 4px 16px rgba(46, 125, 50, 0.15);
      transform: translateY(-2px);
    }
    .qc-icon { font-size: 2rem; flex-shrink: 0; }
    .qc-body { flex: 1; }
    .qc-body h3 { margin: 0 0 0.3rem; font-size: 1rem; font-weight: 700; color: #1e293b; }
    .qc-body p  { margin: 0; font-size: 0.82rem; color: #64748b; }
    .qc-arrow { font-size: 1.25rem; color: #94a3b8; transition: transform 0.2s; }
    .quick-card:hover .qc-arrow { transform: translateX(4px); color: #2e7d32; }
  `]
})
export class SeguridadInicioComponent implements OnInit {
  ngOnInit() {}
}
