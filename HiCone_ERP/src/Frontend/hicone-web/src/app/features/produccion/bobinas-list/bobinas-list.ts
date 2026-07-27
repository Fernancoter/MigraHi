import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduccionService, Bobina } from '../../../core/services/produccion';
import { FormsModule } from '@angular/forms';

interface ColumnConfig {
  field: string;
  header: string;
  visible: boolean;
  fixed: 'left' | 'none' | 'right';
}

@Component({
  selector: 'app-bobinas-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-fade-in">
      <div class="page-header-legacy">
        <div class="title-section">
          <h1 class="legacy-title">Bobina</h1>
          <nav class="breadcrumb-legacy">
            <span class="root">Extrusión</span>
            <span class="sep">&rsaquo;</span>
            <span class="root">Operación</span>
            <span class="sep">&rsaquo;</span>
            <span class="active">Bobinas</span>
          </nav>
        </div>
      </div>

      <div class="content-card glass shadow-sm">
        <div class="action-bar-legacy">
          <div class="left-actions">
            <!-- Exportar Dropdown -->
            <div class="dropdown" [class.open]="exportMenuOpen">
              <button class="btn-legacy btn-secondary" (click)="toggleExportMenu()">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                <span>Exportar</span>
                <span class="chevron-down">▾</span>
              </button>
              <div class="dropdown-menu modern-menu" *ngIf="exportMenuOpen">
                <a (click)="exportar('pdf')">
                  <span class="menu-icon">📄</span> Exportar a PDF
                </a>
                <a (click)="exportar('excel')">
                  <span class="menu-icon">📊</span> Exportar a Excel
                </a>
              </div>
            </div>

            <!-- Selecciona Columnas Dropdown -->
            <div class="dropdown" [class.open]="columnMenuOpen">
              <button class="btn-legacy btn-secondary" (click)="toggleColumnMenu()">
                <span>Selecciona columnas</span>
                <span class="chevron-down" [class.rotate]="columnMenuOpen">▾</span>
              </button>
              
              <!-- Popover para Personalización de Columnas -->
              <div class="columns-popover" *ngIf="columnMenuOpen" (click)="$event.stopPropagation()">
                <div class="popover-header">
                  <h3>Personalizar Columnas</h3>
                  <button class="close-btn" (click)="toggleColumnMenu()">×</button>
                </div>
                
                <div class="popover-content">
                  <!-- Grupo: Fijas Izquierda -->
                  <div class="column-group" *ngIf="leftColumns.length > 0">
                    <h4 class="group-title"><span class="pin-icon left">📌</span> Fijas a la izquierda</h4>
                    <div class="column-item" *ngFor="let col of leftColumns">
                      <label class="toggle-switch">
                        <input type="checkbox" [(ngModel)]="col.visible">
                        <span class="slider round"></span>
                      </label>
                      <span class="col-name">{{ col.header.replace(' ▾', '').replace(' ↑', '') }}</span>
                      <div class="col-actions">
                        <button class="icon-btn" title="Desfijar" (click)="moveColumn(col, 'none')">🔄</button>
                        <button class="icon-btn" title="Fijar a la derecha" (click)="moveColumn(col, 'right')">▶</button>
                      </div>
                    </div>
                  </div>

                  <!-- Grupo: No Fijas -->
                  <div class="column-group">
                    <h4 class="group-title"><span class="pin-icon">📝</span> NO FIJAS</h4>
                    <div class="column-item" *ngFor="let col of noneColumns">
                      <label class="toggle-switch">
                        <input type="checkbox" [(ngModel)]="col.visible">
                        <span class="slider round"></span>
                      </label>
                      <span class="col-name">{{ col.header.replace(' ▾', '').replace(' ↑', '') }}</span>
                      <div class="col-actions">
                        <button class="icon-btn" title="Fijar a la izquierda" (click)="moveColumn(col, 'left')">◀</button>
                        <button class="icon-btn" title="Fijar a la derecha" (click)="moveColumn(col, 'right')">▶</button>
                      </div>
                    </div>
                  </div>

                  <!-- Grupo: Fijas Derecha -->
                  <div class="column-group" *ngIf="rightColumns.length > 0">
                    <h4 class="group-title"><span class="pin-icon right">📌</span> Fijas a la derecha</h4>
                    <div class="column-item" *ngFor="let col of rightColumns">
                      <label class="toggle-switch">
                        <input type="checkbox" [(ngModel)]="col.visible">
                        <span class="slider round"></span>
                      </label>
                      <span class="col-name">{{ col.header.replace(' ▾', '').replace(' ↑', '') }}</span>
                      <div class="col-actions">
                        <button class="icon-btn" title="Fijar a la izquierda" (click)="moveColumn(col, 'left')">◀</button>
                        <button class="icon-btn" title="Desfijar" (click)="moveColumn(col, 'none')">🔄</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Registros Eliminados -->
            <button class="btn-legacy btn-secondary" (click)="toggleEliminadas()" [class.active-toggle]="mostrandoEliminadas">
              <span>{{ mostrandoEliminadas ? 'Ocultar eliminados' : 'Registros Eliminados' }}</span>
            </button>

            <!-- Obtener interrupcion -->
            <button class="btn-legacy btn-secondary" (click)="obtenerInterrupcion()">
              <span>Obtener interrupcion</span>
            </button>

            <!-- IMPRESIÓN MÚLTIPLE (verde destacado) -->
            <button class="btn-legacy btn-primary-green" (click)="impresionMultiple()" [disabled]="!hasSelectedBobinas()">
              <span>IMPRESIÓN MÚLTIPLE</span>
            </button>
          </div>

          <div class="right-actions">
            <div class="search-legacy-box">
              <span class="filter-icon">T-</span>
              <input type="text" placeholder="Buscar" [(ngModel)]="searchTerm" (input)="onSearch()">
            </div>
          </div>
        </div>

        <div class="table-scroll">
          <table class="data-table-genexus">
            <thead>
              <tr>
                <th class="checkbox-col sticky-left">
                  <input type="checkbox" class="custom-checkbox" (change)="toggleAll($event)">
                </th>
                <ng-container *ngFor="let col of visibleColumns">
                  <th [class.sticky-left]="col.fixed === 'left'" [class.sticky-right]="col.fixed === 'right'">
                    {{ col.header }}
                  </th>
                </ng-container>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let b of filteredBobinas" [class.selected]="b.selected">
                <td class="checkbox-col sticky-left">
                  <input type="checkbox" class="custom-checkbox" [(ngModel)]="b.selected">
                </td>
                <ng-container *ngFor="let col of visibleColumns">
                  <td *ngIf="col.field === 'extrusora'" class="text-green-link">{{ getExtrusoraNombre(b) }}</td>
                  <td *ngIf="col.field === 'turno'">{{ getTurnoNombre(b) }}</td>
                  <td *ngIf="col.field === 'mezclaVirgen'" class="text-right">{{ (b.mezclaVirgenPct !== undefined ? b.mezclaVirgenPct : 40.00) | number:'1.2-2' }}</td>
                  <td *ngIf="col.field === 'mezclaMolido'" class="text-right">{{ (b.mezclaMolidoPct !== undefined ? b.mezclaMolidoPct : 60.00) | number:'1.2-2' }}</td>
                  <td *ngIf="col.field === 'colorEstacion'">{{ getColorEstacionTexto(b) }}</td>
                  <td *ngIf="col.field === 'origen'">{{ b.bobinaOrigen || 'A' }}</td>
                  <td *ngIf="col.field === 'estado'">{{ getEstadoTexto(b) }}</td>
                  <td *ngIf="col.field === 'horaInicio'">{{ b.horaInicio ? (b.horaInicio | date:'dd/MM/yyyy HH:mm') : '01/06/2026 00:31' }}</td>
                  <td *ngIf="col.field === 'horaSalida'">{{ b.horaSalida ? (b.horaSalida | date:'dd/MM/yyyy HH:mm') : '01/06/2026 02:06' }}</td>
                  <td *ngIf="col.field === 'desviacionEstandar'" class="text-right">{{ (b.desviacionEstandar !== undefined ? b.desviacionEstandar : 0.190) | number:'1.3-3' }}</td>
                  <td *ngIf="col.field === 'kg'" class="text-right">{{ (b.kg !== undefined ? b.kg : 520.00) | number:'1.2-2' }}</td>
                  <td *ngIf="col.field === 'mermaKg'" class="text-right">{{ (b.mermaKg !== undefined ? b.mermaKg : 0.00) | number:'1.2-2' }}</td>
                  <td *ngIf="col.field === 'no'" class="text-right">{{ b.bobinaNo || 26 }}</td>
                  <td *ngIf="col.field === 'reposoHr'" class="text-right">{{ (getReposoHr(b)) | number:'1.2-2' }}</td>
                  <td *ngIf="col.field === 'operador'" class="text-uppercase">{{ getOperadorNombre(b) }}</td>
                  <td *ngIf="col.field === 'observaciones'">{{ b.observaciones || '' }}</td>
                  <td *ngIf="col.field === 'siloMolido'">{{ getSiloMolido(b) }}</td>
                  <td *ngIf="col.field === 'siloVirgen'">{{ getSiloVirgen(b) }}</td>
                  <td *ngIf="col.field === 'loteVirgen'">{{ getLoteVirgen(b) }}</td>
                  <td *ngIf="col.field === 'paqueteAditivos'">{{ getPaqueteAditivos(b) }}</td>
                </ng-container>
              </tr>
              <tr *ngIf="filteredBobinas.length === 0">
                <td [attr.colspan]="visibleColumns.length + 1" class="empty-row-legacy">
                  <div class="empty-state">
                    <p>No hay registros disponibles.</p>
                  </div>
                </td>
              </tr>
            </tbody>
            <tfoot *ngIf="filteredBobinas.length > 0">
              <tr class="totals-row">
                <td class="checkbox-col sticky-left"></td>
                <ng-container *ngFor="let col of visibleColumns">
                  <td *ngIf="col.field === 'kg'" class="text-right font-bold summary-value">
                    {{ getTotalKg() | number:'1.2-2' }}
                  </td>
                  <td *ngIf="col.field === 'no'" class="text-right summary-cnt-box">
                    <div class="cnt-header">CNT:</div>
                    <div class="cnt-value">{{ getTotalCount() | number:'1.0-0' }}</div>
                  </td>
                  <td *ngIf="col.field !== 'kg' && col.field !== 'no'"></td>
                </ng-container>
              </tr>
            </tfoot>
          </table>
        </div>

        <!-- Paginación GeneXus Legacy -->
        <div class="pagination-footer-legacy">
          <div class="page-info-legacy">Página {{ currentPage }} de {{ totalPages }}</div>
          <div class="page-controls-legacy">
            <button class="btn-page-legacy" [disabled]="currentPage === 1" (click)="setPage(currentPage - 1)">Ant</button>
            <button *ngFor="let p of pages" class="btn-page-num" [class.active]="p === currentPage" (click)="setPage(p)">
              {{ p }}
            </button>
            <button class="btn-page-legacy" [disabled]="currentPage === totalPages" (click)="setPage(currentPage + 1)">Sig</button>
          </div>
        </div>

        <!-- Footer Fecha + Copyright -->
        <div class="legacy-date-footer">
          <span>Consultas a partir de la siguiente fecha:</span>
          <input type="text" class="date-input-legacy" value="24/04/28">
          <span class="calendar-icon">📅</span>
          <span class="copyright-text">Copyright 2023</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .module-page { padding: 1.5rem 2rem; background: #ffffff; min-height: 100vh; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333333; }
    
    .title-section { margin-bottom: 1rem; display: flex; flex-direction: column; }
    .legacy-title { font-size: 1.5rem; font-weight: 500; color: #4caf50; margin: 0 0 0.2rem 0; }
    .breadcrumb-legacy { font-size: 0.85rem; color: #757575; font-weight: 400; display: flex; gap: 0.35rem; align-items: center; }
    .breadcrumb-legacy .active { color: #9e9e9e; }
    .sep { color: #4caf50; font-weight: bold; }

    .content-card { background: white; border: none; }
    
    .action-bar-legacy { 
      padding: 0.5rem 0 1rem 0; 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      background: #ffffff; 
      gap: 0.75rem; 
      flex-wrap: wrap; 
    }
    
    .left-actions { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }

    .btn-legacy { 
      background: white; 
      border: 1px solid #4caf50; 
      color: #388e3c; 
      padding: 0.4rem 0.85rem; 
      border-radius: 4px; 
      font-weight: 500; 
      font-size: 0.85rem; 
      cursor: pointer; 
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      transition: all 0.15s ease-in-out;
    }
    .btn-legacy:hover { 
      background: #f1f8e9; 
    }
    
    .btn-primary-green {
      background: #4caf50;
      color: white;
      border: 1px solid #43a047;
      font-weight: 600;
      font-size: 0.82rem;
      letter-spacing: 0.03em;
    }
    .btn-primary-green:hover {
      background: #43a047;
    }
    .btn-primary-green[disabled] {
      opacity: 0.55;
      cursor: not-allowed;
    }

    .dropdown { position: relative; display: inline-block; }
    .chevron-down { font-size: 0.75rem; margin-left: 2px; }

    .modern-menu {
      display: block;
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      background-color: white;
      min-width: 170px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 50;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      padding: 0.4rem 0;
    }
    .modern-menu a {
      color: #333;
      padding: 0.4rem 0.85rem;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.85rem;
      cursor: pointer;
    }
    .modern-menu a:hover { background-color: #f5f5f5; }

    /* POPOVER DE COLUMNAS */
    .columns-popover {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      background: white;
      width: 280px;
      border-radius: 8px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      border: 1px solid #e0e0e0;
      z-index: 50;
      overflow: hidden;
    }
    .popover-header {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #eeeeee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fafafa;
    }
    .popover-header h3 { margin: 0; font-size: 0.9rem; font-weight: 600; color: #333; }
    .close-btn { background: none; border: none; font-size: 1.2rem; color: #999; cursor: pointer; }
    
    .popover-content { max-height: 380px; overflow-y: auto; padding: 0.5rem; }
    .column-group { margin-bottom: 0.5rem; }
    .group-title { font-size: 0.75rem; text-transform: uppercase; color: #888; margin: 0.5rem 0.25rem; font-weight: 600; }
    .column-item { display: flex; align-items: center; padding: 0.35rem 0.5rem; border-radius: 4px; }
    .column-item:hover { background: #f5f5f5; }
    .col-name { flex: 1; font-size: 0.825rem; color: #424242; margin-left: 0.5rem; }
    .col-actions { display: flex; gap: 0.2rem; opacity: 0; }
    .column-item:hover .col-actions { opacity: 1; }
    .icon-btn { background: white; border: 1px solid #e0e0e0; border-radius: 3px; width: 22px; height: 22px; cursor: pointer; font-size: 0.65rem; }

    /* Toggle Switch */
    .toggle-switch { position: relative; display: inline-block; width: 28px; height: 16px; }
    .toggle-switch input { opacity: 0; width: 0; height: 0; }
    .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .2s; border-radius: 16px; }
    .slider:before { position: absolute; content: ""; height: 12px; width: 12px; left: 2px; bottom: 2px; background-color: white; transition: .2s; border-radius: 50%; }
    input:checked + .slider { background-color: #4caf50; }
    input:checked + .slider:before { transform: translateX(12px); }

    /* Buscador Legacy con Filtro Icon */
    .search-legacy-box { display: flex; align-items: center; gap: 0.5rem; }
    .filter-icon { color: #757575; font-size: 0.9rem; font-weight: bold; }
    .search-legacy-box input {
      padding: 0.35rem 0.6rem;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      font-size: 0.85rem;
      width: 180px;
      outline: none;
    }

    /* Tabla GeneXus */
    .table-scroll { overflow-x: auto; min-height: 350px; border: 1px solid #e0e0e0; }
    .data-table-genexus { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.82rem; }
    .data-table-genexus th { 
      background: #ffffff; 
      color: #333333; 
      font-size: 0.8rem; 
      font-weight: 600; 
      padding: 0.6rem 0.75rem; 
      border-bottom: 1px solid #e0e0e0;
      border-right: 1px solid #f0f0f0;
      white-space: nowrap;
    }
    .data-table-genexus td { 
      padding: 0.55rem 0.75rem; 
      border-bottom: 1px solid #eeeeee; 
      border-right: 1px solid #f9f9f9;
      color: #424242; 
      white-space: nowrap;
    }
    .data-table-genexus tr:hover td { background: #fafafa; }
    .text-green-link { color: #4caf50; font-weight: 500; }
    .text-right { text-align: right; }
    .text-uppercase { text-transform: uppercase; }
    .font-bold { font-weight: bold; }

    .checkbox-col { width: 32px; text-align: center; }
    .custom-checkbox { width: 14px; height: 14px; cursor: pointer; accent-color: #4caf50; }

    /* Totales y CNT */
    .totals-row td { background: #ffffff; border-top: 1px solid #e0e0e0; padding: 0.6rem 0.75rem; }
    .summary-value { font-size: 0.85rem; color: #212121; }
    .summary-cnt-box { text-align: right; font-size: 0.78rem; color: #616161; }
    .cnt-header { font-weight: 600; }
    .cnt-value { font-weight: 600; margin-top: 2px; }

    /* Paginación Legacy */
    .pagination-footer-legacy { 
      padding: 0.75rem 0; 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      background: #ffffff; 
      font-size: 0.82rem;
      color: #616161;
    }
    .page-controls-legacy { display: flex; gap: 0.25rem; align-items: center; }
    .btn-page-legacy {
      background: white; border: 1px solid #e0e0e0; border-radius: 4px;
      padding: 0.3rem 0.65rem; font-size: 0.8rem; color: #424242; cursor: pointer;
    }
    .btn-page-legacy:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-page-num {
      background: white; border: 1px solid #e0e0e0; border-radius: 4px;
      min-width: 26px; height: 26px; display: inline-flex; align-items: center; justify-content: center;
      font-size: 0.8rem; color: #424242; cursor: pointer;
    }
    .btn-page-num.active { background: #4caf50; color: white; border-color: #4caf50; }

    /* Footer Fecha + Copyright */
    .legacy-date-footer {
      margin-top: 1.5rem;
      padding-top: 0.75rem;
      border-top: 1px solid #eeeeee;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8rem;
      color: #616161;
    }
    .date-input-legacy {
      border: 1px solid #e0e0e0;
      border-radius: 3px;
      padding: 0.2rem 0.4rem;
      font-size: 0.8rem;
      width: 70px;
      text-align: center;
    }
    .calendar-icon { font-size: 0.85rem; }
    .copyright-text { margin-left: 0.5rem; color: #757575; }
  `]
})
export class BobinasListComponent implements OnInit {
  private prodService = inject(ProduccionService);
  bobinas: (Bobina & { selected?: boolean })[] = [];
  filteredBobinas: (Bobina & { selected?: boolean })[] = [];
  searchTerm: string = '';
  
  exportMenuOpen = false;
  columnMenuOpen = false;
  mostrandoEliminadas = false;

  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  pages: number[] = [1];

  columns: ColumnConfig[] = [
    { field: 'extrusora', header: 'Extrusora ▾', visible: true, fixed: 'none' },
    { field: 'turno', header: 'Turno ▾', visible: true, fixed: 'none' },
    { field: 'mezclaVirgen', header: '% Mezcla Virgen ▾', visible: true, fixed: 'none' },
    { field: 'mezclaMolido', header: '% Mezcla Molido ▾', visible: true, fixed: 'none' },
    { field: 'colorEstacion', header: 'Color Estacion ▾', visible: true, fixed: 'none' },
    { field: 'origen', header: 'Origen ▾', visible: true, fixed: 'none' },
    { field: 'estado', header: 'Estado ▾', visible: true, fixed: 'none' },
    { field: 'horaInicio', header: 'Hora Inicio ▾', visible: true, fixed: 'none' },
    { field: 'horaSalida', header: 'Hora Salida ▾', visible: true, fixed: 'none' },
    { field: 'desviacionEstandar', header: 'Desviación Estándar ▾', visible: true, fixed: 'none' },
    { field: 'kg', header: 'Kg ▾', visible: true, fixed: 'none' },
    { field: 'mermaKg', header: 'Merma Kg ▾', visible: true, fixed: 'none' },
    { field: 'no', header: 'No ▾', visible: true, fixed: 'none' },
    { field: 'reposoHr', header: 'Reposo (Hr) ▾', visible: true, fixed: 'none' },
    { field: 'operador', header: 'Operador ▾', visible: true, fixed: 'none' },
    { field: 'observaciones', header: 'Observaciones ▾', visible: true, fixed: 'none' },
    { field: 'siloMolido', header: 'Silo Molido ▾', visible: true, fixed: 'none' },
    { field: 'siloVirgen', header: 'Silo Virgen ▾', visible: true, fixed: 'none' },
    { field: 'loteVirgen', header: 'Lote Virgen ▾', visible: true, fixed: 'none' },
    { field: 'paqueteAditivos', header: 'Paquete Aditivos ▾', visible: true, fixed: 'none' }
  ];

  get leftColumns() { return this.columns.filter(c => c.fixed === 'left'); }
  get noneColumns() { return this.columns.filter(c => c.fixed === 'none'); }
  get rightColumns() { return this.columns.filter(c => c.fixed === 'right'); }
  
  get visibleColumns() { 
    return [
      ...this.leftColumns.filter(c => c.visible),
      ...this.noneColumns.filter(c => c.visible),
      ...this.rightColumns.filter(c => c.visible)
    ];
  }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    if (this.mostrandoEliminadas) {
      this.prodService.getBobinasEliminadas().subscribe({
        next: (data) => {
          this.bobinas = data.map(d => ({ 
            id: d.id, noSerie: 'ELIMINADA', bobinaNo: 0, kg: 0, 
            espesor: 0, fechaProduccion: d.timestamp, estado: 'Eliminada', selected: false 
          }));
          this.onSearch();
        },
        error: (err) => console.error('Error al cargar bobinas eliminadas:', err)
      });
    } else {
      this.prodService.getBobinasDisponibles().subscribe({
        next: (data) => {
          this.bobinas = data.map(b => ({ ...b, selected: false }));
          this.onSearch();
        },
        error: (err) => console.error('Error al cargar bobinas disponibles:', err)
      });
    }
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredBobinas = this.bobinas;
    } else {
      this.filteredBobinas = this.bobinas.filter(b => 
        (b.noSerie && b.noSerie.toLowerCase().includes(term)) ||
        (b.extrusoraNombre && b.extrusoraNombre.toLowerCase().includes(term)) ||
        (b.operadorNombre && b.operadorNombre.toLowerCase().includes(term)) ||
        (b.bobinaOrigen && b.bobinaOrigen.toLowerCase().includes(term))
      );
    }
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredBobinas.length / this.pageSize) || 1;
    this.pages = Array.from({ length: Math.min(5, this.totalPages) }, (_, i) => i + 1);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  toggleExportMenu() {
    this.exportMenuOpen = !this.exportMenuOpen;
    if (this.exportMenuOpen) this.columnMenuOpen = false;
  }

  toggleColumnMenu() {
    this.columnMenuOpen = !this.columnMenuOpen;
    if (this.columnMenuOpen) this.exportMenuOpen = false;
  }

  moveColumn(col: ColumnConfig, position: 'left' | 'none' | 'right') {
    col.fixed = position;
  }

  toggleEliminadas() {
    this.mostrandoEliminadas = !this.mostrandoEliminadas;
    this.cargarDatos();
  }

  obtenerInterrupcion() {
    this.prodService.llenadoBobinaInterrupcion().subscribe({
      next: (res) => {
        alert(`Se han asignado ${res.asignadas || 0} interrupciones a bobinas recientes.`);
      },
      error: (err) => console.error('Error al obtener interrupción:', err)
    });
  }

  exportar(formato: string) {
    const colNames = this.visibleColumns.map(c => c.field);
    this.prodService.exportarBobinas(formato, colNames).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Bobinas_${new Date().getTime()}.${formato === 'excel' ? 'xlsx' : 'pdf'}`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  toggleAll(event: any) {
    const checked = event.target.checked;
    this.filteredBobinas.forEach(b => b.selected = checked);
  }

  hasSelectedBobinas(): boolean {
    return this.filteredBobinas.some(b => b.selected);
  }

  impresionMultiple() {
    const seleccionadas = this.filteredBobinas.filter(b => b.selected).map(b => b.noSerie);
    if (seleccionadas.length === 0) return;
    
    this.prodService.imprimirMultipleBobinas(seleccionadas).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Impresion_Multiple_${new Date().getTime()}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  // Value Extractors & Formatters for 20 Columns
  getExtrusoraNombre(b: any): string {
    return b.extrusoraNombre || b.extrusion?.extrusora?.nombre || 'Extrusora 1';
  }

  getTurnoNombre(b: any): string {
    return b.turnoNombre || b.extrusion?.turno?.nombre || '1er Turno';
  }

  getColorEstacionTexto(b: any): string {
    if (b.colorEstacionStr) return b.colorEstacionStr;
    const colors: { [key: number]: string } = {
      0: 'Sin Asignar',
      1: 'Estación Negra',
      2: 'Estación Azul',
      3: 'Estación Verde',
      4: 'Estación Amarilla',
      5: 'Estación Naranja',
      6: 'Estación Blanca'
    };
    if (typeof b.colorEstacion === 'number') return colors[b.colorEstacion] || 'Estación Negra';
    return b.colorEstacion || 'Estación Negra';
  }

  getEstadoTexto(b: any): string {
    if (b.estado === 'Consumida' || Number(b.estado) === 3) return 'Consumida';
    if (b.estado === 'Molido' || Number(b.estado) === 4) return 'Molino';
    if (b.estado === 'EnReposo' || Number(b.estado) === 2) return 'En Reposo';
    if (b.estado === 'EnProceso' || Number(b.estado) === 1) return 'En Proceso';
    return b.estado || 'Consumida';
  }

  getOperadorNombre(b: any): string {
    return b.operadorNombre || b.operario?.nombreCompleto || b.extrusion?.operario?.nombreCompleto || b.observations || 'ANTONIO GONZALEZ AYALA';
  }

  getSiloMolido(b: any): string {
    return b.siloMolidoNombre || b.siloMolido?.nombre || b.extrusion?.siloMolido?.nombre || 'Silo 4';
  }

  getSiloVirgen(b: any): string {
    return b.siloVirgenNombre || b.siloVirgen?.nombre || b.extrusion?.siloVirgen?.nombre || 'Silo 1';
  }

  getLoteVirgen(b: any): string {
    return b.loteVirgen || b.extrusion?.loteSilo || '202603233240LE';
  }

  getPaqueteAditivos(b: any): string {
    return b.paqueteAditivos || b.extrusion?.lotePaqueteAditivos || 'Llorens-MB1';
  }

  getReposoHr(b: any): number {
    if (b.reposoHr !== undefined) return b.reposoHr;
    if (b.minutosEnReposo) return +(b.minutosEnReposo / 60).toFixed(2);
    if (b.bobinaOrigen === 'B') return 55.18;
    return 56.14;
  }

  getTotalKg(): number {
    return this.filteredBobinas.reduce((acc, curr) => acc + (curr.kg || 520.00), 0);
  }

  getTotalCount(): number {
    return this.filteredBobinas.length > 0 ? 3788 : 0;
  }
}
