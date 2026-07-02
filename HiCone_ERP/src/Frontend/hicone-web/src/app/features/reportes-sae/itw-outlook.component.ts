import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaeService, ItwOutlookRow } from '../../core/services/sae';

@Component({
  selector: 'app-itw-outlook',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-container">
      <header class="page-header">
        <div class="header-left">
          <h1>ITW Outlook</h1>
          <p class="subtitle">Tablero Gerencial: Proyección de inventario contra demanda SAE</p>
        </div>
        <div class="header-right">
          <button class="btn-legacy" (click)="loadData()">🔄 Actualizar Datos</button>
        </div>
      </header>

      <div class="card-table">
        <div class="table-toolbar">
          <div class="search-wrapper">
            <input type="text" placeholder="Filtrar por producto o grupo..." [(ngModel)]="searchTerm" (input)="filterData()">
          </div>
          <div class="toolbar-info">
            <span class="badge badge-warn">{{ getCriticalCount() }} Críticos</span>
            <span class="badge">{{ filteredRows.length }} Total</span>
          </div>
        </div>
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Grupo Consolidado</th>
                <th class="right-align">Stock Actual</th>
                <th class="right-align">Pedidos SAE</th>
                <th class="right-align">Presupuesto Restante</th>
                <th class="center-align">Cobertura %</th>
                <th class="center-align">Estatus</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let row of filteredRows">
                <td class="cell-bold">{{ row.productNumber }}</td>
                <td>{{ row.consolidatedName }}</td>
                <td class="right-align cell-number">{{ row.currentStock | number }}</td>
                <td class="right-align cell-number">{{ row.pendingOrders | number }}</td>
                <td class="right-align cell-number">{{ row.budgetRemaining | number }}</td>
                <td class="center-align">
                  <div class="progress-wrapper">
                    <div class="progress-bar" 
                         [class.bg-danger]="row.coveragePercent < 50"
                         [class.bg-warning]="row.coveragePercent >= 50 && row.coveragePercent < 80"
                         [class.bg-success]="row.coveragePercent >= 80"
                         [style.width.%]="Math.min(row.coveragePercent, 100)">
                    </div>
                    <span class="progress-text">{{ row.coveragePercent | number:'1.0-0' }}%</span>
                  </div>
                </td>
                <td class="center-align">
                  <span class="pill" 
                        [class.pill-danger]="row.status === 'CRITICAL'"
                        [class.pill-warning]="row.status === 'WARNING'"
                        [class.pill-success]="row.status === 'OK'">
                    {{ row.status === 'CRITICAL' ? 'CRÍTICO' : (row.status === 'WARNING' ? 'PRECAUCIÓN' : 'OK') }}
                  </span>
                </td>
              </tr>
              <tr *ngIf="filteredRows.length === 0">
                <td colspan="7" class="empty-row">No hay datos de proyección ITW Outlook.</td>
              </tr>
            </tbody>
          </table>
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

    .card-table {
      background: #fff; border: 1px solid #e2e8f0; border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04); overflow: hidden;
    }

    .table-toolbar {
      display: flex; justify-content: space-between; align-items: center;
      padding: 1rem 1.25rem; border-bottom: 1px solid #f1f5f9;
    }
    .search-wrapper { position: relative; width: 350px; }
    .search-wrapper input {
      width: 100%; padding: 0.5rem 0.75rem; border: 1px solid #e2e8f0; border-radius: 6px;
      font-size: 0.85rem; outline: none; transition: border-color 0.2s;
    }
    .search-wrapper input:focus { border-color: #16a34a; }
    
    .toolbar-info { display: flex; gap: 0.5rem; }
    .badge {
      padding: 0.3rem 0.75rem; border-radius: 20px; font-size: 0.75rem; font-weight: 700;
      background: #f1f5f9; color: #475569;
    }
    .badge-warn { background: #fee2e2; color: #991b1b; }

    .table-scroll { overflow-x: auto; }

    table { width: 100%; border-collapse: collapse; }
    thead th {
      text-align: left; padding: 0.75rem 1.25rem; font-size: 0.8rem; font-weight: 700;
      color: #475569; background: #f8fafc; border-bottom: 1px solid #e2e8f0; white-space: nowrap;
    }
    tbody td {
      padding: 0.7rem 1.25rem; font-size: 0.85rem; color: #334155;
      border-bottom: 1px solid #f1f5f9;
    }
    tbody tr:hover { background: #f8fafc; }
    
    .right-align { text-align: right; }
    .center-align { text-align: center; }

    .cell-bold { font-weight: 700; color: #1e293b; }
    .cell-number { font-weight: 600; font-variant-numeric: tabular-nums; }
    .empty-row { text-align: center; padding: 2.5rem !important; color: #94a3b8; font-style: italic; }

    /* Progress Bar */
    .progress-wrapper { position: relative; height: 16px; background: #f1f5f9; border-radius: 8px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
    .progress-bar { position: absolute; left: 0; top: 0; height: 100%; border-radius: 8px; transition: width 0.3s; }
    .bg-danger { background: #ef4444; }
    .bg-warning { background: #f59e0b; }
    .bg-success { background: #22c55e; }
    .progress-text { position: relative; z-index: 1; font-size: 0.65rem; font-weight: 700; color: #1e293b; }

    .pill {
      display: inline-block; padding: 0.2rem 0.6rem; border-radius: 20px; font-size: 0.7rem;
      font-weight: 700;
    }
    .pill-danger { background: #fee2e2; color: #991b1b; }
    .pill-warning { background: #fef3c7; color: #92400e; }
    .pill-success { background: #dcfce7; color: #166534; }
  `]
})
export class ItwOutlookComponent implements OnInit {
  private saeService = inject(SaeService);
  Math = Math;

  rows: ItwOutlookRow[] = [];
  filteredRows: ItwOutlookRow[] = [];
  searchTerm = '';

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.saeService.getItwOutlook().subscribe(data => {
      this.rows = data;
      this.filterData();
    });
  }

  filterData() {
    if (!this.searchTerm) {
      this.filteredRows = this.rows;
      return;
    }
    const term = this.searchTerm.toLowerCase();
    this.filteredRows = this.rows.filter(r => 
      r.productNumber.toLowerCase().includes(term) ||
      r.consolidatedName.toLowerCase().includes(term)
    );
  }

  getCriticalCount(): number {
    return this.rows.filter(r => r.status === 'CRITICAL').length;
  }
}
