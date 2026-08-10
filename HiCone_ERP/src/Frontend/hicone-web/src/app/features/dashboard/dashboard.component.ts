import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="module-page animate-fade-in">
      <div class="page-header-premium">
        <div class="title-section">
          <h1 class="premium-title">Inicio</h1>
          <nav class="breadcrumb-modern">
            <span class="root">Inventarios</span>
            <span class="sep">&rsaquo;</span>
            <span class="active">Inicio</span>
          </nav>
        </div>
      </div>

      <div class="welcome-container">
        <div class="welcome-card card-section-rounded">
          <div class="welcome-icon">👋</div>
          <div class="welcome-text">
            <h2>Bienvenido a HiCone ERP</h2>
            <p>Utiliza el menú superior para navegar entre los módulos o la barra lateral para opciones de inventario.</p>
          </div>
        </div>
      </div>

      <div class="info-grid">
        <div class="info-card card-section-rounded">
          <h3>Estado del Sistema</h3>
          <div class="status-indicator">
            <span class="dot online"></span>
            <span>En línea</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .module-page {
      padding: 0;
    }

    .welcome-container {
      margin-top: 1.5rem;
    }

    .welcome-card {
      background: white;
      border-radius: 12px;
      padding: 2.5rem;
      display: flex;
      align-items: center;
      gap: 2rem;
      box-shadow: 0 4px 20px rgba(0,0,0,0.04);
      border: 1px solid #e2e8f0;
    }

    .welcome-icon {
      font-size: 3.5rem;
    }

    .welcome-text h2 {
      margin-bottom: 0.5rem;
      color: #166534;
      font-size: 1.5rem;
      font-weight: 800;
    }

    .welcome-text p {
      color: #475569;
      font-size: 0.95rem;
    }

    .info-grid {
      margin-top: 1.5rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .info-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 20px rgba(0,0,0,0.04);
    }

    .info-card h3 {
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
      color: #64748b;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .status-indicator {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 700;
      color: #166534;
    }

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }

    .dot.online {
      background: #166534;
      box-shadow: 0 0 10px #166534;
    }
  `]
})
export class DashboardComponent {}
