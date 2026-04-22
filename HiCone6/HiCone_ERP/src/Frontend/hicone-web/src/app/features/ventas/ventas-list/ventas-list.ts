import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasService, Venta } from '../../../core/services/ventas';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ventas-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container animate-fade-in">
      <header class="page-header">
        <div class="header-main">
          <h1 class="page-title">Módulo de Ventas</h1>
          <p class="page-subtitle">Registro y seguimiento de transacciones comerciales.</p>
        </div>
        <button class="btn-primary">
          <span class="icon">🛒</span> Nueva Venta
        </button>
      </header>

      <div class="stats-cards">
        <div class="mini-card sales">
          <span class="card-label">Ventas Hoy</span>
          <span class="card-value">$12,450.00</span>
        </div>
        <div class="mini-card pending">
          <span class="card-label">Por Cobrar</span>
          <span class="card-value">5</span>
        </div>
      </div>

      <div class="table-container glass">
        <table class="data-table">
          <thead>
            <tr>
              <th>Folio</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Estado</th>
              <th class="text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of (ventas$ | async)">
              <td class="font-bold">{{ item.folio }}</td>
              <td>{{ item.fecha | date:'dd/MM/yyyy HH:mm' }}</td>
              <td>
                <div class="client-cell">
                  <span class="client-name">{{ item.cliente?.nombre }}</span>
                  <span class="client-code">{{ item.cliente?.codigo }}</span>
                </div>
              </td>
              <td class="font-bold text-primary">{{ item.total | currency:'USD' }}</td>
              <td>
                <span class="status-chip completed">Completada</span>
              </td>
              <td class="text-right">
                <div class="action-buttons">
                  <button class="icon-btn view">👁️</button>
                  <button class="icon-btn print">🖨️</button>
                </div>
              </td>
            </tr>
            <tr *ngIf="!(ventas$ | async)?.length">
              <td colspan="6" class="empty-state">
                No hay ventas registradas recientemente.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem; }
    .page-title { font-size: 1.85rem; margin-bottom: 0.25rem; }
    .page-subtitle { color: var(--text-muted); }

    .btn-primary {
      background: var(--primary);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: var(--radius-md);
      font-weight: 600;
      cursor: pointer;
      display: flex; align-items: center; gap: 0.5rem;
    }

    .stats-cards { display: flex; gap: 1rem; margin-bottom: 1.5rem; }
    .mini-card {
      background: var(--bg-card);
      padding: 1rem 1.5rem;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-color);
      display: flex; flex-direction: column; min-width: 180px;
    }
    .card-label { font-size: 0.75rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; }
    .card-value { font-size: 1.25rem; font-weight: 700; color: var(--text-main); }

    .table-container { border-radius: var(--radius-lg); overflow: hidden; }
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th { background: rgba(0,0,0,0.02); padding: 1rem 1.5rem; text-align: left; font-size: 0.75rem; color: var(--text-muted); }
    .data-table td { padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border-color); }

    .client-cell { display: flex; flex-direction: column; }
    .client-name { font-weight: 600; }
    .client-code { font-size: 0.75rem; color: var(--text-muted); font-family: monospace; }

    .status-chip {
      padding: 0.2rem 0.6rem;
      border-radius: 20px;
      font-size: 0.7rem;
      font-weight: 700;
      background: #d1fae5;
      color: #065f46;
    }

    .action-buttons { display: flex; gap: 0.5rem; justify-content: flex-end; }
    .icon-btn { 
      width: 32px; height: 32px; border-radius: 8px; border: 1px solid var(--border-color);
      background: white; cursor: pointer; display: flex; align-items: center; justify-content: center;
    }
    .empty-state { padding: 4rem; text-align: center; color: var(--text-muted); }
  `]
})
export class VentasListComponent implements OnInit {
  private ventasService = inject(VentasService);
  ventas$!: Observable<Venta[]>;

  ngOnInit() {
    this.ventas$ = this.ventasService.getVentas();
  }
}
