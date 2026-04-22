import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-page animate-fade-in">
      <header class="page-header">
        <h1 class="page-title">Vista General</h1>
        <p class="page-subtitle">Bienvenido de nuevo, esto es lo que está pasando hoy.</p>
      </header>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-icon sales">💰</span>
            <span class="stat-trend positive">+12.5%</span>
          </div>
          <p class="stat-label">Ventas Totales</p>
          <h3 class="stat-value">$128,430</h3>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-icon inventory">📦</span>
            <span class="stat-trend negative">-2.4%</span>
          </div>
          <p class="stat-label">Stock de Artículos</p>
          <h3 class="stat-value">1,420</h3>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-icon clients">👥</span>
            <span class="stat-trend positive">+4%</span>
          </div>
          <p class="stat-label">Clientes Activos</p>
          <h3 class="stat-value">842</h3>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-icon alerts">⚠️</span>
          </div>
          <p class="stat-label">Alertas de Stock</p>
          <h3 class="stat-value">12</h3>
        </div>
      </div>

      <div class="content-grid">
        <div class="data-card main-chart">
          <h3 class="card-title">Tendencia de Ventas</h3>
          <div class="chart-placeholder">
            <!-- Simulación de gráfico con CSS -->
            <div class="bar-chart">
              <div class="bar" style="height: 40%"></div>
              <div class="bar" style="height: 60%"></div>
              <div class="bar" style="height: 75%"></div>
              <div class="bar" style="height: 50%"></div>
              <div class="bar" style="height: 90%"></div>
              <div class="bar" style="height: 70%"></div>
              <div class="bar" style="height: 85%"></div>
            </div>
          </div>
        </div>

        <div class="data-card recent-activity">
          <h3 class="card-title">Artículos Recientes</h3>
          <div class="activity-list">
            <div class="activity-item">
              <div class="activity-icon">🍎</div>
              <div class="activity-info">
                <p class="activity-text"><strong>Producto A</strong> agregado al inventario</p>
                <p class="activity-time">Hace 5 minutos</p>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-icon">🔧</div>
              <div class="activity-info">
                <p class="activity-text"><strong>Herramienta B</strong> stock bajo: 5 unidades</p>
                <p class="activity-time">Hace 2 horas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-header { margin-bottom: 2rem; }
    .page-title { font-size: 2rem; color: var(--text-main); margin-bottom: 0.25rem; }
    .page-subtitle { color: var(--text-muted); }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: var(--bg-card);
      padding: 1.5rem;
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-sm);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-md);
    }

    .stat-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }

    .stat-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }

    .stat-icon.sales { background: #e0e7ff; color: #4f46e5; }
    .stat-icon.inventory { background: #ecfdf5; color: #059669; }
    .stat-icon.clients { background: #fef3c7; color: #d97706; }
    .stat-icon.alerts { background: #fee2e2; color: #dc2626; }

    .stat-trend {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.5rem;
      border-radius: 20px;
    }
    .stat-trend.positive { background: #d1fae5; color: #065f46; }
    .stat-trend.negative { background: #fee2e2; color: #991b1b; }

    .stat-label { color: var(--text-muted); font-size: 0.875rem; margin-bottom: 0.25rem; }
    .stat-value { font-size: 1.75rem; font-weight: 700; }

    .content-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 1.5rem;
    }

    .data-card {
      background: var(--bg-card);
      padding: 1.5rem;
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-color);
      min-height: 400px;
    }

    .card-title { margin-bottom: 1.5rem; font-size: 1.125rem; }

    .chart-placeholder {
      height: 300px;
      display: flex;
      align-items: flex-end;
      padding-top: 2rem;
    }

    .bar-chart {
      display: flex;
      align-items: flex-end;
      gap: 1rem;
      width: 100%;
      height: 100%;
    }

    .bar {
      flex: 1;
      background: var(--primary);
      border-radius: 4px 4px 0 0;
      opacity: 0.8;
      transition: opacity 0.2s;
    }
    .bar:hover { opacity: 1; }

    .activity-list { display: flex; flex-direction: column; gap: 1.5rem; }
    .activity-item { display: flex; gap: 1rem; }
    .activity-icon {
      width: 40px;
      height: 40px;
      background: var(--bg-main);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .activity-text { font-size: 0.875rem; color: var(--text-main); margin-bottom: 0.25rem; }
    .activity-time { font-size: 0.75rem; color: var(--text-muted); }
  `]
})
export class DashboardComponent {}
