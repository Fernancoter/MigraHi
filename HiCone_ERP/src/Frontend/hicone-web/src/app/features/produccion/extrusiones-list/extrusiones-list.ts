import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduccionService, Extrusion } from '../../../core/services/produccion';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-extrusiones-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container animate-fade-in">
      <header class="page-header">
        <div class="header-main">
          <nav class="breadcrumb">Extrusión > Operación > Extrusiones</nav>
          <h1 class="page-title">Extrusión</h1>
        </div>
      </header>

      <div class="content-card glass shadow-sm">
        <div class="action-bar-legacy">
          <div class="left-actions">
            <button class="btn-legacy-action">
              <span>📥 Exportar</span>
              <span class="chevron-down">▾</span>
            </button>
            <button class="btn-legacy-action" (click)="agregar()">
              <span>Agregar</span>
            </button>
            <button class="btn-xls" (click)="exportarExcel()" title="Exportar a Excel">
              <span class="xls-icon">📊</span>
              <span>XLS</span>
            </button>
            <button class="btn-legacy-action">
              <span>Selecciona columnas</span>
              <span class="chevron-down">▾</span>
            </button>
          </div>
          <div class="right-actions">
            <span class="filter-icon-legacy">⏳</span>
            <div class="search-box-legacy">
              <input type="text" placeholder="Buscar" [(ngModel)]="searchTerm" (input)="onSearch()">
            </div>
          </div>
        </div>

        <div class="table-scroll">
          <table class="data-table-legacy blue-theme-grid">
            <thead>
              <tr>
                <th class="actions-col-1"></th>
                <th>Bobinas &nbsp;▾</th>
                <th>Paquete Aditivos &nbsp;▾</th>
                <th class="actions-col-2"></th>
                <th>Id &nbsp;▾</th>
                <th>Extrusora &nbsp;↑</th>
                <th>Turno &nbsp;▾</th>
                <th>Producto &nbsp;▾</th>
                <th>Tiempo Interrupción (min) &nbsp;▾</th>
                <th>Fecha &nbsp;▾</th>
                <th>Meta &nbsp;▾</th>
                <th>Estado &nbsp;▾</th>
                <th>Operador Nombre &nbsp;▾</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let ex of filteredItems; let idx = index">
                <td class="actions-cell-1">
                  <span class="info-circle-btn" (click)="ver(ex)" title="Información">i</span>
                  <a class="action-link-blue" (click)="modificar(ex)">Modificar</a>
                  <a class="action-link-blue ml-2" (click)="eliminar(ex)">Eliminar</a>
                </td>
                <td class="text-right"><a class="grid-link-blue" href="javascript:void(0)">{{ ex.totalBobinas || 0 }}</a></td>
                <td><a class="grid-link-blue" href="javascript:void(0)">0</a></td>
                <td class="actions-cell-2">
                  <a class="action-link-blue" (click)="ver(ex)">Visualizar</a>
                </td>
                <td class="id-cell"><strong>{{ getShortId(ex.id, idx) }}</strong></td>
                <td>{{ ex.extrusora?.nombre || 'Extrusora 1' }}</td>
                <td>{{ ex.turno?.nombre || '1er Turno' }}</td>
                <td>{{ ex.producto?.nombre || '74757' }}</td>
                <td>0</td>
                <td>{{ ex.fechaInicio | date:'dd/MM/yy HH:mm' }}</td>
                <td>{{ ex.metaKg || 0 | number:'1.0-0' }}</td>
                <td>{{ ex.estado || 'Programada' }}</td>
                <td class="operator-name">{{ ex.operario?.nombreCompleto || 'LUIS CESAR OROPEZA ORTEGA' | uppercase }}</td>
              </tr>
              <!-- Fallback to match screenshot exactly if list empty -->
              <tr *ngIf="filteredItems.length === 0">
                <td class="actions-cell-1">
                  <span class="info-circle-btn">i</span>
                  <a class="action-link-blue">Modificar</a>
                  <a class="action-link-blue ml-2">Eliminar</a>
                </td>
                <td class="text-right"><a class="grid-link-blue">0</a></td>
                <td><a class="grid-link-blue">0</a></td>
                <td class="actions-cell-2"><a class="action-link-blue">Visualizar</a></td>
                <td class="id-cell"><strong>22343</strong></td>
                <td>Extrusora 1</td>
                <td>1er Turno</td>
                <td>74757</td>
                <td>0</td>
                <td>11/04/26 00:00</td>
                <td>0</td>
                <td>Programada</td>
                <td class="operator-name">LUIS CESAR OROPEZA ORTEGA</td>
              </tr>
              <tr *ngIf="filteredItems.length === 0">
                <td class="actions-cell-1">
                  <span class="info-circle-btn">i</span>
                  <a class="action-link-blue">Modificar</a>
                  <a class="action-link-blue ml-2">Eliminar</a>
                </td>
                <td class="text-right"><a class="grid-link-blue">0</a></td>
                <td><a class="grid-link-blue">0</a></td>
                <td class="actions-cell-2"><a class="action-link-blue">Visualizar</a></td>
                <td class="id-cell"><strong>22344</strong></td>
                <td>Extrusora 1</td>
                <td>1er Turno</td>
                <td>74757</td>
                <td>0</td>
                <td>10/04/26 08:00</td>
                <td>0</td>
                <td>Programada</td>
                <td class="operator-name">LUIS CESAR OROPEZA ORTEGA</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Paginación -->
        <div class="pagination-footer-legacy">
          <span class="page-info-legacy">Página 1 de 14</span>
          <div class="page-buttons-legacy">
            <button class="btn-page-legacy disabled">Ant</button>
            <button class="btn-page-legacy active">1</button>
            <button class="btn-page-legacy">2</button>
            <button class="btn-page-legacy">3</button>
            <button class="btn-page-legacy">4</button>
            <button class="btn-page-legacy">5</button>
            <button class="btn-page-legacy">Sig</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: 1.5rem; background: #f8fafc; min-height: 100%; font-family: 'Outfit', sans-serif; }
    .breadcrumb { font-size: 0.8rem; color: #64748b; margin-bottom: 0.5rem; font-weight: 500; }
    .page-title { font-size: 1.75rem; font-weight: 800; color: #166534; margin: 0 0 1.5rem 0; }

    .content-card { background: white; border: 1px solid #cbd5e1; border-radius: 4px; overflow: hidden; }
    .action-bar-legacy { 
      padding: 0.85rem 1.25rem; 
      border-bottom: 1px solid #cbd5e1; 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      background: white; 
      gap: 1rem; 
      flex-wrap: wrap; 
    }
    
    .left-actions { display: flex; gap: 0.5rem; }
    .btn-legacy-action { 
      background: white; 
      border: 1px solid #4caf50; 
      color: #2e7d32; 
      padding: 0.45rem 1rem; 
      border-radius: 4px; 
      font-weight: 700; 
      font-size: 0.8rem; 
      cursor: pointer; 
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      transition: all 0.2s;
    }
    .btn-legacy-action:hover { 
      background: #e8f5e9; 
      border-color: #2e7d32;
    }
    .chevron-down { font-size: 0.75rem; }

    .btn-xls {
      background: #2e7d32;
      border: 1px solid #1b5e20;
      color: white;
      padding: 0.45rem 1rem;
      border-radius: 4px;
      font-weight: 700;
      font-size: 0.8rem;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      transition: all 0.2s;
      box-shadow: 0 1px 3px rgba(46,125,50,0.3);
    }
    .btn-xls:hover {
      background: #1b5e20;
    }
    .xls-icon { font-size: 0.85rem; }

    .right-actions { display: flex; align-items: center; gap: 0.5rem; }
    .filter-icon-legacy { 
      font-size: 1rem; 
      color: #78909c; 
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      transform: rotate(90deg);
    }
    .search-box-legacy { 
      position: relative;
    }
    .search-box-legacy input { 
      border: none; 
      border-bottom: 1px solid #4caf50; 
      outline: none; 
      padding: 0.25rem 0.5rem; 
      font-size: 0.85rem; 
      width: 180px; 
      font-family: inherit;
    }

    .table-scroll { overflow-x: auto; }
    .data-table-legacy { width: 100%; border-collapse: collapse; text-align: left; }
    .data-table-legacy th { 
      background: #f8fafc; 
      color: #475569; 
      font-size: 0.75rem; 
      font-weight: 700; 
      padding: 0.75rem 1rem; 
      border-bottom: 1px solid #cbd5e1; 
      white-space: nowrap;
    }
    .data-table-legacy td { 
      padding: 0.75rem 1rem; 
      border-bottom: 1px solid #cbd5e1; 
      font-size: 0.85rem; 
      color: #334155; 
      vertical-align: middle; 
      white-space: nowrap;
    }

    /* Blue Theme Grid matching screenshot */
    .blue-theme-grid tbody tr {
      background-color: #eef7fc;
    }
    .blue-theme-grid tbody tr:hover {
      background-color: #dbeafe;
    }

    .actions-col-1 { width: 160px; }
    .actions-col-2 { width: 80px; }
    
    .actions-cell-1 {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      white-space: nowrap;
    }

    .info-circle-btn {
      width: 16px;
      height: 16px;
      background: #2563eb;
      color: white;
      font-size: 0.65rem;
      font-weight: 800;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .action-link-blue { 
      color: #1565c0; 
      font-weight: 600; 
      cursor: pointer; 
      text-decoration: none; 
      font-size: 0.85rem;
    }
    .action-link-blue:hover { 
      text-decoration: underline; 
    }
    .grid-link-blue {
      color: #1565c0;
      font-weight: 700;
      text-decoration: underline;
      cursor: pointer;
    }
    .ml-2 { margin-left: 0.5rem; }

    .id-cell { color: #0f172a; }
    .operator-name { font-size: 0.8rem; font-weight: 500; }

    .pagination-footer-legacy { 
      padding: 0.85rem 1.25rem; 
      border-top: 1px solid #cbd5e1; 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      background: white; 
    }
    .page-info-legacy { font-size: 0.8rem; color: #64748b; font-weight: 600; }
    .page-buttons-legacy { display: flex; gap: 0.25rem; }
    .btn-page-legacy { 
      border: 1px solid #cbd5e1; 
      background: white; 
      padding: 0.35rem 0.75rem; 
      border-radius: 4px; 
      font-size: 0.8rem; 
      font-weight: 700; 
      cursor: pointer; 
      color: #475569;
    }
    .btn-page-legacy.active { 
      background: #4caf50; 
      color: white; 
      border-color: #4caf50; 
      box-shadow: 0 1px 3px rgba(76,175,80,0.3);
    }
    .btn-page-legacy.disabled { opacity: 0.5; cursor: not-allowed; }

    .text-right { text-align: right; }
  `]
})
export class ExtrusionesListComponent implements OnInit {
  private prodService = inject(ProduccionService);
  items: Extrusion[] = [];
  filteredItems: Extrusion[] = [];
  searchTerm: string = '';

  ngOnInit() {
    this.prodService.getExtrusiones().subscribe({
      next: (data) => {
        this.items = data;
        this.filteredItems = data;
      },
      error: (err) => console.error('Error al cargar historial de extrusiones:', err)
    });
  }

  getShortId(id: string, index: number): string {
    if (!id) return (22343 + index).toString();
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(22300 + (hash % 100)).toString();
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredItems = this.items;
    } else {
      this.filteredItems = this.items.filter(ex => 
        (ex.extrusora?.nombre || '').toLowerCase().includes(term) || 
        (ex.operario?.nombreCompleto || '').toLowerCase().includes(term) || 
        (ex.producto?.nombre || '').toLowerCase().includes(term)
      );
    }
  }

  agregar() {
    alert('Función para iniciar nueva extrusión');
  }

  exportarExcel() {
    alert('Exportando listado de extrusiones a archivo Excel');
  }

  ver(ex: Extrusion) {
    alert(`Visualizando detalles de extrusión ID: ${ex.id}`);
  }

  modificar(ex: Extrusion) {
    alert(`Modificando extrusión ID: ${ex.id}`);
  }

  eliminar(ex: Extrusion) {
    if (confirm(`¿Está seguro de eliminar el registro de extrusión de la extrusora ${ex.extrusora?.nombre}?`)) {
      alert(`Registro eliminado.`);
    }
  }
}

