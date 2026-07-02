import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaeService, SaePedido, SaeBudgetSummary, SaeKPIs } from '../../core/services/sae';

@Component({
  selector: 'app-reportes-sae',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-container">
      <header class="page-header">
        <div class="header-left">
          <h1>Reportes Ejecutivos SAE</h1>
          <p class="subtitle">Indicadores financieros y operativos sincronizados desde Aspel SAE</p>
        </div>
        <div class="header-right">
          <button class="btn-legacy" (click)="onSync()">🔄 Sincronizar Ahora</button>
        </div>
      </header>

      <!-- KPIs Row -->
      <div class="kpi-row">
        <div class="kpi-card">
          <span class="kpi-icon">💰</span>
          <div class="kpi-info">
            <span class="kpi-label">Ventas Totales Mes</span>
            <span class="kpi-value">{{ kpis.ventasTotalesMes | currency:'MXN':'symbol':'1.0-0' }}</span>
            <span class="kpi-sub" [class.positive]="kpis.crecimientoVsMesAnterior >= 0" [class.negative]="kpis.crecimientoVsMesAnterior < 0">
              {{ kpis.crecimientoVsMesAnterior >= 0 ? '▲' : '▼' }} {{ kpis.crecimientoVsMesAnterior }}% vs mes anterior
            </span>
          </div>
        </div>
        <div class="kpi-card">
          <span class="kpi-icon warn">📋</span>
          <div class="kpi-info">
            <span class="kpi-label">Pedidos Pendientes</span>
            <span class="kpi-value">{{ kpis.pedidosPendientes }}</span>
            <span class="kpi-sub">De {{ kpis.totalPedidos }} pedidos totales</span>
          </div>
        </div>
        <div class="kpi-card">
          <span class="kpi-icon success">📊</span>
          <div class="kpi-info">
            <span class="kpi-label">Cumplimiento FTB</span>
            <span class="kpi-value">{{ avgCompliance | number:'1.1-1' }}%</span>
            <span class="kpi-sub">Promedio general planta</span>
          </div>
        </div>
        <div class="kpi-card">
          <span class="kpi-icon">📦</span>
          <div class="kpi-info">
            <span class="kpi-label">Pedidos del Mes</span>
            <span class="kpi-value">{{ kpis.totalPedidos }}</span>
            <span class="kpi-sub">Pedidos registrados en SAE</span>
          </div>
        </div>
      </div>

      <!-- Grid: FTB + Pedidos -->
      <div class="report-grid">
        <!-- FTB Budget Compliance -->
        <div class="report-card">
          <div class="card-title-bar">
            <h3>📈 Cumplimiento de Presupuesto (FTB)</h3>
            <div class="filter-row">
              <select [(ngModel)]="ftbYear" (change)="loadFTB()">
                <option [value]="2024">2024</option>
                <option [value]="2025">2025</option>
                <option [value]="2026">2026</option>
              </select>
              <select [(ngModel)]="ftbMonth" (change)="loadFTB()">
                <option *ngFor="let m of meses; let i = index" [value]="i + 1">{{ m }}</option>
              </select>
            </div>
          </div>
          <div class="card-body">
            <div class="budget-item" *ngFor="let b of presupuestos">
              <div class="budget-top">
                <span class="budget-name">{{ b.productNumber }} — {{ b.consolidatedName }}</span>
                <span class="budget-pct" [class.over]="b.compliancePercent >= 100">{{ b.compliancePercent | number:'1.1-1' }}%</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill" [style.width.%]="Math.min(b.compliancePercent, 100)" [class.over]="b.compliancePercent >= 100"></div>
              </div>
              <div class="budget-bottom">
                <span>Real: {{ b.totalReal | number }}</span>
                <span>Objetivo: {{ b.totalEstimated | number }}</span>
              </div>
            </div>
            <div *ngIf="presupuestos.length === 0" class="empty-msg">
              No hay datos de presupuesto FTB para el periodo seleccionado.
            </div>
          </div>
        </div>

        <!-- Pedidos Pendientes -->
        <div class="report-card">
          <div class="card-title-bar">
            <h3>📋 Pedidos Pendientes de Surtir</h3>
          </div>
          <div class="card-body no-pad">
            <table>
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
                  <td class="cell-bold">{{ p.orderDoc }}</td>
                  <td>{{ p.customerName || p.customerCode }}</td>
                  <td>{{ p.orderDate | date:'dd/MM/yyyy' }}</td>
                  <td class="cell-number">{{ p.totalAmount | currency:'MXN' }}</td>
                  <td>
                    <span class="pill pill-pending">PENDIENTE</span>
                  </td>
                </tr>
                <tr *ngIf="pedidos.length === 0">
                  <td colspan="5" class="empty-row">No hay pedidos pendientes en SAE.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .module-container { padding: 1.5rem 2rem; }

    .page-header {
      display: flex; justify-content: space-between; align-items: flex-start;
      margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 2px solid #e2e8f0;
    }
    .page-header h1 { font-size: 1.5rem; font-weight: 800; color: #1e293b; margin: 0 0 0.25rem 0; }
    .subtitle { color: #64748b; font-size: 0.85rem; margin: 0; }

    .btn-legacy {
      background: linear-gradient(135deg, #16a34a, #15803d); color: white; border: none;
      padding: 0.6rem 1.4rem; border-radius: 6px; font-weight: 700; font-size: 0.85rem;
      cursor: pointer; box-shadow: 0 2px 8px rgba(22,163,74,0.3); transition: all 0.2s;
    }
    .btn-legacy:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(22,163,74,0.4); }

    /* KPIs */
    .kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; margin-bottom: 1.5rem; }
    .kpi-card {
      background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1.25rem;
      display: flex; gap: 1rem; align-items: flex-start;
      box-shadow: 0 2px 6px rgba(0,0,0,0.03);
    }
    .kpi-icon {
      font-size: 1.75rem; background: #f0fdf4; width: 48px; height: 48px;
      display: flex; align-items: center; justify-content: center; border-radius: 10px;
    }
    .kpi-icon.warn { background: #fef3c7; }
    .kpi-icon.success { background: #dbeafe; }
    .kpi-info { display: flex; flex-direction: column; }
    .kpi-label { font-size: 0.7rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
    .kpi-value { font-size: 1.5rem; font-weight: 800; color: #1e293b; margin: 0.15rem 0; }
    .kpi-sub { font-size: 0.7rem; color: #94a3b8; }
    .kpi-sub.positive { color: #16a34a; }
    .kpi-sub.negative { color: #dc2626; }

    /* Report Grid */
    .report-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    .report-card {
      background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;
      box-shadow: 0 2px 6px rgba(0,0,0,0.03);
    }
    .card-title-bar {
      display: flex; justify-content: space-between; align-items: center;
      padding: 1rem 1.25rem; border-bottom: 1px solid #f1f5f9; background: #f8fafc;
    }
    .card-title-bar h3 { font-size: 0.95rem; font-weight: 700; color: #1e293b; margin: 0; }
    .filter-row { display: flex; gap: 0.5rem; }
    .filter-row select {
      padding: 0.35rem 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;
      font-size: 0.8rem; background: white; color: #334155;
    }

    .card-body { padding: 1.25rem; display: flex; flex-direction: column; gap: 1.5rem; }
    .card-body.no-pad { padding: 0; }

    /* Budget bars */
    .budget-item { }
    .budget-top { display: flex; justify-content: space-between; margin-bottom: 0.4rem; }
    .budget-name { font-size: 0.85rem; font-weight: 600; color: #334155; }
    .budget-pct { font-size: 0.85rem; font-weight: 700; color: #16a34a; }
    .budget-pct.over { color: #2563eb; }
    .progress-track { height: 10px; background: #f1f5f9; border-radius: 5px; overflow: hidden; }
    .progress-fill {
      height: 100%; background: linear-gradient(90deg, #16a34a, #22c55e); border-radius: 5px;
      transition: width 0.5s ease;
    }
    .progress-fill.over { background: linear-gradient(90deg, #2563eb, #3b82f6); }
    .budget-bottom { display: flex; justify-content: space-between; margin-top: 0.3rem; font-size: 0.7rem; color: #94a3b8; }

    .empty-msg { text-align: center; color: #94a3b8; font-size: 0.85rem; padding: 2rem 0; }

    /* Table */
    table { width: 100%; border-collapse: collapse; }
    thead th {
      text-align: left; padding: 0.75rem 1.25rem; font-size: 0.75rem; font-weight: 700;
      color: #475569; background: #f8fafc; border-bottom: 1px solid #e2e8f0;
    }
    tbody td {
      padding: 0.7rem 1.25rem; font-size: 0.85rem; color: #334155;
      border-bottom: 1px solid #f1f5f9;
    }
    tbody tr:hover { background: #f8fafc; }
    .cell-bold { font-weight: 700; color: #1e293b; }
    .cell-number { font-weight: 600; }
    .empty-row { text-align: center; padding: 2rem !important; color: #94a3b8; font-style: italic; }

    .pill {
      display: inline-block; padding: 0.2rem 0.6rem; border-radius: 20px; font-size: 0.65rem;
      font-weight: 700;
    }
    .pill-pending { background: #fef3c7; color: #92400e; }
  `]
})
export class ReportesSaeComponent implements OnInit {
  private saeService = inject(SaeService);
  Math = Math;

  pedidos: SaePedido[] = [];
  presupuestos: SaeBudgetSummary[] = [];
  kpis: SaeKPIs = { ventasTotalesMes: 0, pedidosPendientes: 0, totalPedidos: 0, crecimientoVsMesAnterior: 0 };
  avgCompliance = 0;

  ftbYear = new Date().getFullYear();
  ftbMonth = new Date().getMonth() + 1;
  meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  ngOnInit() {
    this.loadKPIs();
    this.loadPedidos();
    this.loadFTB();
  }

  loadKPIs() {
    this.saeService.getKPIs().subscribe(data => {
      this.kpis = data;
    });
  }

  loadPedidos() {
    this.saeService.getPedidos().subscribe(data => this.pedidos = data);
  }

  loadFTB() {
    this.saeService.getReporteFTB(this.ftbYear, this.ftbMonth).subscribe(data => {
      this.presupuestos = data;
      this.avgCompliance = data.length > 0
        ? data.reduce((sum, b) => sum + b.compliancePercent, 0) / data.length
        : 0;
    });
  }

  onSync() {
    this.saeService.sincronizar().subscribe(() => {
      alert('Sincronización con SAE iniciada correctamente');
      this.loadKPIs();
      this.loadPedidos();
      this.loadFTB();
    });
  }
}
