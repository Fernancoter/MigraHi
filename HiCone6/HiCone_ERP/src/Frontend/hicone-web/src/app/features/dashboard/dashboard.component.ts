import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="inicio-page animate-fade-in">
      <header class="page-header">
        <h1 class="page-title">Inicio</h1>
        <nav class="breadcrumb">Inventario / Inicio</nav>
      </header>

      <div class="welcome-container">
        <div class="welcome-card">
          <div class="welcome-icon">👋</div>
          <div class="welcome-text">
            <h2>Bienvenido a HiCone ERP</h2>
            <p>Utiliza el menú superior para navegar entre los módulos o la barra lateral para opciones de inventario.</p>
          </div>
        </div>
      </div>

      <div class="info-grid">
        <!-- Espacio para widgets rápidos en el futuro -->
        <div class="info-card">
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
    .inicio-page {
      padding: 1.5rem;
    }

    .page-header {
      margin-bottom: 2rem;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 1rem;
    }

    .page-title {
      font-size: 1.5rem;
      color: #7f8c8d;
      margin-bottom: 0.25rem;
    }

    .breadcrumb {
      font-size: 0.8rem;
      color: #bdc3c7;
    }

    .welcome-container {
      margin-top: 2rem;
    }

    .welcome-card {
      background: white;
      border-radius: 8px;
      padding: 2.5rem;
      display: flex;
      align-items: center;
      gap: 2rem;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      border: 1px solid var(--border-color);
    }

    .welcome-icon {
      font-size: 3.5rem;
    }

    .welcome-text h2 {
      margin-bottom: 0.5rem;
      color: var(--text-main);
    }

    .welcome-text p {
      color: var(--text-muted);
    }

    .info-grid {
      margin-top: 2rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .info-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      border: 1px solid var(--border-color);
    }

    .info-card h3 {
      font-size: 1rem;
      margin-bottom: 1rem;
      color: var(--text-muted);
    }

    .status-indicator {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 600;
      color: var(--primary);
    }

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }

    .dot.online {
      background: var(--primary);
      box-shadow: 0 0 10px var(--primary);
    }
  `]
})
export class DashboardComponent {}
