import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seguridad',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="module-page animate-move-up">
      <header class="module-header">
        <div class="title-area">
          <nav class="breadcrumb">Administración > Seguridad</nav>
          <h1>🛡️ Seguridad y Permisos</h1>
          <p>Gestión de usuarios, roles y accesos al sistema.</p>
        </div>
      </header>

      <div class="content-card">
        <div class="empty-state">
          <span class="icon">🔒</span>
          <h3>Módulo en Desarrollo</h3>
          <p>La integración con GAM (GeneXus Access Manager) para el control detallado de permisos está siendo configurada.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .module-page { padding: 1.5rem 2.5rem; }
    .breadcrumb { font-size: 0.75rem; color: #94a3b8; margin-bottom: 0.5rem; font-weight: 600; text-transform: uppercase; }
    .module-header { margin-bottom: 2rem; }
    h1 { font-size: 1.8rem; font-weight: 800; color: #1e293b; margin: 0; }
    p { color: #64748b; font-size: 0.9rem; }
    
    .content-card { 
      background: white; 
      border-radius: 12px; 
      border: 1px solid #e2e8f0; 
      padding: 4rem;
      display: flex;
      justify-content: center;
      text-align: center;
    }
    
    .empty-state .icon { font-size: 4rem; display: block; margin-bottom: 1rem; }
    .empty-state h3 { font-size: 1.25rem; font-weight: 700; color: #1e293b; margin-bottom: 0.5rem; }
    .empty-state p { color: #64748b; max-width: 400px; margin: 0 auto; }
  `]
})
export class SeguridadComponent {}
