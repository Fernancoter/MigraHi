import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaeService, SaePedido, SaePresupuesto } from '../../core/services/sae';

@Component({
  selector: 'app-reportes-sae',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="module-page animate-fade-in">
      <header class="module-header">
        <div class="title-area">
          <h1>📊 Reportes Ejecutivos SAE</h1>
          <p>Indicadores financieros y operativos sincronizados en tiempo real</p>
        </div>
        <div class="actions">
          <button class="btn btn-outline" (click)="onSync()">🔄 Sincronizar Ahora</button>
        </div>
      </header>

      <div class="kpi-row">
        <div class="kpi-card" *ngFor="let k of metrics">
          <span class="kpi-label">{{ k.label }}</span>
          <span class="kpi-value" [class.danger]="k.trend === 'down'">{{ k.value }}</span>
          <span class="kpi-subtext">{{ k.subtext }}</span>
        </div>
      </div>

      <div class="grid-container">
        <div class="content-card">
          <div class="card-header">
            <h3>📈 Cumplimiento de Presupuesto (FTB)</h3>
          </div>
          <div class="budget-chart">
            <div class="budget-item" *ngFor="let b of presupuestos">
              <div class="budget-header">
                <span class="prod-name">{{ b.producto }} - {{ b.cliente }}</span>
                <span class="pct">{{ (b.cantidadReal / b.cantidadEstimada * 100) | number:'1.1-1' }}%</span>
              </div>
              <div class="progress-track">
                <div class="progress-bar" [style.width.%]="(b.cantidadReal / b.cantidadEstimada * 100)" 
                     [class.over]="(b.cantidadReal / b.cantidadEstimada) >= 1"></div>
              </div>
              <div class="budget-footer">
                <span>Real: {{ b.cantidadReal | number }}</span>
                <span>Obj: {{ b.cantidadEstimada | number }}</span>
              </div>
            </div>
            <div *ngIf="presupuestos.length === 0" style="text-align: center; color: #94a3b8;">
              No hay datos de presupuesto FTB para el periodo actual.
            </div>
          </div>
        </div>

        <div class="content-card">
          <div class="card-header">
            <h3>🚚 Pedidos Pendientes de Surtir</h3>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Folio</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Importe</th>
                <th>Estatus</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let p of pedidos">
                <td><strong>{{ p.orderDoc }}</strong></td>
                <td>{{ p.clientCode }}</td>
                <td>{{ p.date | date:'shortDate' }}</td>
                <td class="bold">{{ p.totalAmount | currency }}</td>
                <td>
                  <span class="status-dot o"></span>
                  <span>PENDIENTE</span>
                </td>
              </tr>
              <tr *ngIf="pedidos.length === 0">
                <td colspan="5" style="text-align: center; padding: 2rem; color: #94a3b8;">No hay pedidos pendientes en SAE.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .module-page { padding: 2rem; }
    .module-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem; }
    h1 { font-size: 1.75rem; color: var(--text-main); margin: 0; }
    p { color: var(--text-muted); font-size: 0.875rem; }

    .kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 2rem; }
    .kpi-card { background: white; padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border-color); box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .kpi-label { font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; display: block; }
    .kpi-value { font-size: 1.75rem; font-weight: 800; color: var(--primary); display: block; margin: 0.5rem 0; }
    .kpi-value.danger { color: #ef4444; }
    .kpi-subtext { font-size: 0.75rem; color: #94a3b8; }

    .grid-container { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
    .content-card { background: white; border-radius: 12px; border: 1px solid var(--border-color); overflow: hidden; }
    .card-header { padding: 1.25rem; border-bottom: 1px solid var(--border-color); background: #f8fafc; }
    .card-header h3 { font-size: 1rem; font-weight: 700; color: var(--text-main); margin: 0; }

    .budget-chart { padding: 1.5rem; display: flex; flex-direction: column; gap: 2rem; }
    .budget-item { }
    .budget-header { display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 600; }
    .progress-track { height: 10px; background: #f1f5f9; border-radius: 5px; overflow: hidden; }
    .progress-bar { height: 100%; background: var(--primary); border-radius: 5px; transition: width 0.5s ease; }
    .progress-bar.over { background: #22c55e; }
    .budget-footer { display: flex; justify-content: space-between; margin-top: 0.5rem; font-size: 0.75rem; color: #94a3b8; }

    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th { text-align: left; padding: 1rem; background: #f8fafc; font-size: 0.75rem; color: #64748b; font-weight: 700; }
    .data-table td { padding: 1rem; border-top: 1px solid var(--border-color); font-size: 0.85rem; }
    
    .status-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 0.5rem; }
    .status-dot.o { background: var(--primary); }
    .status-dot.p { background: #f59e0b; }

    .btn-outline { border: 1px solid var(--border-color); background: white; padding: 0.5rem 1rem; border-radius: 6px; font-weight: 600; cursor: pointer; }
    .btn-outline:hover { background: #f8fafc; }
    .bold { font-weight: 700; }
  `]
})
export class ReportesSaeComponent implements OnInit {
  private saeService = inject(SaeService);
  pedidos: SaePedido[] = [];
  presupuestos: SaePresupuesto[] = [];
  metrics = [
    { label: 'Ventas Totales Mes', value: '$2,450,000', subtext: '+12% vs mes anterior', trend: 'up' },
    { label: 'Pedidos Pendientes', value: '45', subtext: 'Requieren atención inmediata', trend: 'down' },
    { label: 'Cumplimiento Presupuesto', value: '92.4%', subtext: 'Promedio general planta', trend: 'up' },
    { label: 'Margen Operativo', value: '18.5%', subtext: 'Dentro del rango objetivo', trend: 'up' }
  ];

  ngOnInit() {
    this.saeService.getPedidos().subscribe(data => this.pedidos = data);
    this.saeService.getReporteFTB(2024, 4).subscribe(
      data => this.presupuestos = data,
      err => this.presupuestos = [] // Graceful handle if not implemented
    );
  }

  onSync() {
    this.saeService.sincronizar().subscribe(() => {
      alert('Sincronización con SAE iniciada correctamente');
    });
  }
}
