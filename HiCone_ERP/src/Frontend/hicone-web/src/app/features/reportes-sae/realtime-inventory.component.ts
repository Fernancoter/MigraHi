import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaeService, RealtimeInventoryRow } from '../../core/services/sae';

@Component({
  selector: 'app-realtime-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-container">
      <header class="page-header">
        <div class="header-left">
          <h1>Inventario en Tiempo Real (SAE vs Producción)</h1>
          <p class="subtitle">Análisis del inventario físico en planta frente a la demanda pendiente de SAE</p>
        </div>
        <div class="header-right">
          <button class="btn-legacy" (click)="loadData()">🔄 Actualizar Datos</button>
        </div>
      </header>

      <div class="card-table">
        <div class="table-toolbar">
          <div class="search-wrapper">
            <input type="text" placeholder="Filtrar por producto..." [(ngModel)]="searchTerm" (input)="filterData()">
          </div>
          <div class="toolbar-info">
            <span class="badge badge-warn">{{ getDeficitCount() }} En Déficit</span>
            <span class="badge">{{ filteredRows.length }} Total</span>
          </div>
        </div>
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Clave</th>
                <th>Producto</th>
                <th class="right-align">Stock Silos (kg)</th>
                <th class="right-align">Stock Bobinas (kg)</th>
                <th class="right-align col-highlight">Stock Total</th>
                <th class="right-align col-demand">Demanda SAE</th>
                <th class="right-align">Balance (Stock - Demanda)</th>
                <th class="center-align">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let row of filteredRows">
                <td class="cell-bold">{{ row.productNumber }}</td>
                <td>{{ row.productName }}</td>
                <td class="right-align cell-number">{{ row.silosTotal | number }}</td>
                <td class="right-align cell-number">{{ row.bobinasTotal | number }}</td>
                <td class="right-align cell-number col-highlight">{{ row.totalStock | number }}</td>
                <td class="right-align cell-number col-demand">{{ row.saeDemand | number }}</td>
                <td class="right-align cell-number" [class.text-danger]="row.balance < 0" [class.text-success]="row.balance >= 0">
                  {{ row.balance > 0 ? '+' : '' }}{{ row.balance | number }}
                </td>
                <td class="center-align">
                  <span class="pill" 
                        [class.pill-danger]="row.balance < 0"
                        [class.pill-success]="row.balance >= 0">
                    {{ row.balance < 0 ? 'DÉFICIT' : 'CUBIERTO' }}
                  </span>
                </td>
              </tr>
              <tr *ngIf="filteredRows.length === 0">
                <td colspan="8" class="empty-row">No hay datos de inventario.</td>
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

    .col-highlight { background: #f0fdf4 !important; font-weight: 700; color: #166534; }
    .col-demand { background: #fef2f2 !important; font-weight: 700; color: #991b1b; }
    
    .text-danger { color: #dc2626 !important; font-weight: 700; }
    .text-success { color: #16a34a !important; font-weight: 700; }

    .cell-bold { font-weight: 700; color: #1e293b; }
    .cell-number { font-weight: 600; font-variant-numeric: tabular-nums; }
    .empty-row { text-align: center; padding: 2.5rem !important; color: #94a3b8; font-style: italic; }

    .pill {
      display: inline-block; padding: 0.2rem 0.6rem; border-radius: 20px; font-size: 0.7rem;
      font-weight: 700;
    }
    .pill-danger { background: #fee2e2; color: #991b1b; }
    .pill-success { background: #dcfce7; color: #166534; }
  `]
})
export class RealtimeInventoryComponent implements OnInit {
  private saeService = inject(SaeService);

  rows: RealtimeInventoryRow[] = [];
  filteredRows: RealtimeInventoryRow[] = [];
  searchTerm = '';

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.saeService.getRealtimeInventory().subscribe(data => {
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
      r.productName.toLowerCase().includes(term)
    );
  }

  getDeficitCount(): number {
    return this.rows.filter(r => r.balance < 0).length;
  }
}
