import { Component, OnInit, inject, HostListener, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CalidadService, Reclamo } from '../../core/services/calidad';

@Component({
  selector: 'app-reclamos-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">Reclamo</h1>
        <div class="breadcrumb">
          <span class="breadcrumb-item">Calidad</span>
          <span class="breadcrumb-separator">›</span>
          <span class="breadcrumb-item active">Reclamos</span>
        </div>
      </div>
      
      <div class="page-content">
        <div class="toolbar">
          <div class="toolbar-left" style="display:flex; gap: 10px;">
            <button class="btn-icon-dark" title="Nuevo" (click)="abrirModalCrear()"><i class="fa fa-file-o"></i> +</button>
            <div class="dropdown-container" style="position:relative;">
              <button class="btn-legacy secondary" (click)="toggleExport($event)">📥 Exportar <span class="caret">▼</span></button>
              <div class="column-selector-dropdown" *ngIf="showExportSelector">
                <div class="column-list">
                  <label class="export-item" (click)="exportToCSV()">📄 Excel (CSV)</label>
                  <label class="export-item" (click)="exportToPDF()">📕 PDF</label>
                </div>
              </div>
            </div>
            <div class="dropdown-container" style="position:relative;">
              <button class="btn-legacy" (click)="toggleColumns($event)">Selecciona columnas <span class="caret">▼</span></button>
              <div class="column-selector-dropdown" *ngIf="showColumnSelector" (click)="$event.stopPropagation()">
                <div class="column-list">
                  <label *ngFor="let col of columns" class="column-item">
                    <input type="checkbox" [(ngModel)]="col.visible"> {{ col.label }}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="toolbar-right">
            <span class="filter-icon">▼</span>
            <input type="text" class="search-input" placeholder="Buscar" [(ngModel)]="filterCodigo" (keyup)="aplicarFiltros()">
          </div>
        </div>

        <table class="gx-table">
          <thead>
            <tr>
              <th class="action-col"></th>
              <th class="action-col"></th>
              <th class="action-col"></th>
              <th class="action-col"></th>
              <th *ngIf="isColVisible('fecha')">Fecha ↑</th>
              <th *ngIf="isColVisible('codigo')">Código ▼</th>
              <th *ngIf="isColVisible('cliente')">Cliente ▼</th>
              <th *ngIf="isColVisible('planta')">Planta ▼</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let r of paginatedReclamos; let i = index">
              <td class="action-cell"><span class="icon-edit">✏️</span></td>
              <td class="action-cell"><span class="icon-delete">✖</span></td>
              <td class="action-cell"><span class="icon-gear">⚙️</span></td>
              <td class="action-cell">
                <a [routerLink]="['/calidad/reclamos', r.id]" class="icon-info">ℹ️</a>
              </td>
              <td *ngIf="isColVisible('fecha')">{{ r.fecha | date:'dd/MM/yy' }}</td>
              <td *ngIf="isColVisible('codigo')">{{ r.codigo }}</td>
              <td *ngIf="isColVisible('cliente')">{{ r.cliente }}</td>
              <td *ngIf="isColVisible('planta')">{{ r.orderDoc || 'N/A' }}</td>
              <td>
                <span class="status-tag" [class]="getEstatusClass(r.estatus)">
                  {{ getEstatusNombre(r.estatus) }}
                </span>
              </td>
            </tr>
            <tr *ngIf="filteredReclamos.length === 0">
              <td colspan="9" class="text-center">No hay datos</td>
            </tr>
          </tbody>
        </table>

        <div class="pagination-bar">
          <div class="page-info">Página {{ currentPage }} de {{ totalPages }}</div>
          <div class="page-controls">
            <button class="page-btn" [disabled]="currentPage === 1" (click)="setPage(currentPage - 1)">Ant</button>
            <button class="page-btn active">{{ currentPage }}</button>
            <button class="page-btn" [disabled]="currentPage === totalPages" (click)="setPage(currentPage + 1)">Sig</button>
          </div>
        </div>
      </div>

      <!-- Modal de Creación (Oculto en captura) -->
      <div class="modal-overlay" *ngIf="mostrarModal">
        <div class="modal-card">
          <h3>Nuevo Reclamo</h3>
          <div class="form-group">
            <label>Cliente</label>
            <input type="text" [(ngModel)]="nuevoReclamo.cliente">
          </div>
          <div class="form-group">
            <label>Planta / Documento</label>
            <input type="text" [(ngModel)]="nuevoReclamo.orderDoc">
          </div>
          <div class="form-group">
            <label>Descripción</label>
            <textarea [(ngModel)]="nuevoReclamo.descripcion"></textarea>
          </div>
          <div class="modal-actions">
            <button (click)="cerrarModalCrear()">Cancelar</button>
            <button class="btn-green" (click)="guardarReclamo()">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      background-color: #ffffff;
      min-height: calc(100vh - 60px);
      display: flex;
      flex-direction: column;
    }
    .page-header {
      padding: 15px 20px 5px 20px;
      border-bottom: 1px solid #e0e0e0;
    }
    .page-title {
      color: #5cb85c;
      font-size: 22px;
      font-weight: 500;
      margin: 0 0 5px 0;
    }
    .breadcrumb {
      font-size: 13px;
      color: #999;
      display: flex;
      align-items: center;
      gap: 5px;
      margin-bottom: 10px;
    }
    .breadcrumb-item { color: #999; }
    .breadcrumb-separator { font-size: 14px; color: #4caf50; font-weight: bold; }
    .breadcrumb-item.active { color: #777; }
    
    .page-content {
      padding: 20px;
      flex: 1;
    }

    .toolbar {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
    }
    .toolbar-left {
      display: flex;
      gap: 5px;
    }
    .btn-icon-dark {
      background: #555;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 3px;
      cursor: pointer;
    }
    .btn-legacy {
      padding: 0.6rem 1.2rem; border-radius: 8px; font-size: 0.95rem; cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); border: 1px solid #dcdde1; 
      background: #fff; color: #2f3640; font-weight: 600;
      display: flex; align-items: center; gap: 0.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .btn-legacy:hover { 
      transform: translateY(-2px); 
      box-shadow: 0 4px 12px rgba(0,0,0,0.1); 
      border-color: #5cb85c;
    }
    .btn-outline-green {
      background: white;
      color: #5cb85c;
      border: 1px solid #5cb85c;
      padding: 5px 10px;
      border-radius: 3px;
      cursor: pointer;
    }
    .caret { font-size: 10px; margin-left: 5px; }

    .column-selector-dropdown {
      position: absolute; top: calc(100% + 5px); left: 0; background: white;
      border: 1px solid #ddd; border-radius: 8px; z-index: 100;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15); min-width: 180px;
    }
    .column-list { padding: 10px 0; display: flex; flex-direction: column; }
    .export-item, .column-item {
      padding: 8px 15px; cursor: pointer; font-size: 14px;
      transition: background 0.2s; display: flex; align-items: center; gap: 8px;
    }
    .export-item:hover, .column-item:hover { background: #f5f5f5; color: #5cb85c; }

    
    .toolbar-right {
      display: flex;
      align-items: flex-end;
      gap: 5px;
    }
    .filter-icon { color: #555; font-size: 12px; padding-bottom: 5px; }
    .search-input {
      border: none;
      border-bottom: 2px solid #5cb85c;
      padding: 5px;
      outline: none;
      width: 200px;
    }

    .gx-table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid #ddd;
    }
    .gx-table th {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: left;
      font-weight: 600;
      color: #333;
      font-size: 15px;
      background: #f9f9f9;
    }
    .gx-table td {
      border: 1px solid #ddd;
      padding: 10px 12px;
      font-size: 14px;
    }
    .action-col { width: 35px; text-align: center; }
    .action-cell { text-align: center; cursor: pointer; color: #777; }
    .action-cell a { text-decoration: none; color: inherit; }
    .text-center { text-align: center; }

    .status-tag {
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 2px;
      color: white;
    }
    .status-abierto { background-color: #f39c12; }
    .status-proceso { background-color: #3498db; }
    .status-resuelto { background-color: #2ecc71; }
    .status-cerrado { background-color: #95a5a6; }

    .pagination-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border: 1px solid #ddd;
      border-top: none;
      background: #f9f9f9;
      padding: 10px 15px;
    }
    .page-info { font-size: 13px; color: #777; }
    .page-controls { display: flex; border: 1px solid #ddd; border-radius: 3px; overflow: hidden; }
    .page-btn {
      background: white;
      border: none;
      border-right: 1px solid #ddd;
      padding: 5px 12px;
      cursor: pointer;
      color: #555;
    }
    .page-btn:last-child { border-right: none; }
    .page-btn.active { background: #5cb85c; color: white; }

    /* Modal basico */
    .modal-overlay { position: fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:flex; justify-content:center; align-items:center; z-index: 1000;}
    .modal-card { background: white; padding: 20px; border-radius: 5px; width: 400px; }
    .form-group { margin-bottom: 15px; }
    .form-group label { display: block; margin-bottom: 5px; }
    .form-group input, .form-group select, .form-group textarea { width: 100%; padding: 8px; border: 1px solid #ccc; }
    .modal-actions { display: flex; justify-content: flex-end; gap: 10px; }
    .btn-green { background: #5cb85c; color: white; border: none; padding: 8px 15px; cursor: pointer; }
  `]
})
export class ReclamosListComponent implements OnInit {
  private calidadService = inject(CalidadService);
  private cdr = inject(ChangeDetectorRef);

  reclamos: Reclamo[] = [];
  filteredReclamos: Reclamo[] = [];

  filterCodigo = '';

  currentPage: number = 1;
  pageSize: number = 10;

  get totalPages(): number {
    return Math.ceil(this.filteredReclamos.length / this.pageSize) || 1;
  }

  get paginatedReclamos(): Reclamo[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredReclamos.slice(start, start + this.pageSize);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.cdr.detectChanges();
    }
  }

  mostrarModal = false;
  nuevoReclamo = {
    cliente: '',
    orderDoc: '',
    descripcion: ''
  };

  showExportSelector = false;
  showColumnSelector = false;
  columns = [
    { id: 'fecha', label: 'Fecha', visible: true },
    { id: 'codigo', label: 'Código', visible: true },
    { id: 'cliente', label: 'Cliente', visible: true },
    { id: 'planta', label: 'Planta', visible: true }
  ];

  @HostListener('document:click')
  onDocumentClick() {
    this.showExportSelector = false;
    this.showColumnSelector = false;
  }

  ngOnInit() {
    this.cargarReclamos();
  }

  cargarReclamos() {
    this.calidadService.getReclamos().subscribe({
      next: (data) => {
        this.reclamos = data;
        this.aplicarFiltros();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener reclamos:', err);
        this.cdr.detectChanges();
      }
    });
  }

  aplicarFiltros() {
    this.filteredReclamos = this.reclamos.filter(r => {
      const matchCodigo = r.codigo.toLowerCase().includes(this.filterCodigo.trim().toLowerCase());
      return matchCodigo;
    });
    this.currentPage = 1;
  }

  abrirModalCrear() {
    this.nuevoReclamo = { cliente: '', orderDoc: '', descripcion: '' };
    this.mostrarModal = true;
    this.cdr.detectChanges();
  }

  cerrarModalCrear() {
    this.mostrarModal = false;
    this.cdr.detectChanges();
  }

  guardarReclamo() {
    if (!this.nuevoReclamo.cliente) return;
    this.calidadService.abrirReclamo(this.nuevoReclamo).subscribe({
      next: () => {
        this.mostrarModal = false;
        this.cargarReclamos();
      },
      error: (err) => {
        console.error('Error al abrir reclamo:', err);
        this.cdr.detectChanges();
      }
    });
  }

  getEstatusClass(estatus: any): string {
    const val = Number(estatus);
    switch (val) {
      case 1: return 'status-abierto';
      case 2: return 'status-proceso';
      case 3: return 'status-resuelto';
      case 4: return 'status-cerrado';
      default: return 'status-cerrado';
    }
  }

  getEstatusNombre(estatus: any): string {
    const val = Number(estatus);
    switch (val) {
      case 1: return 'Abierto';
      case 2: return 'En Proceso';
      case 3: return 'Resuelto';
      case 4: return 'Cerrado';
      default: return 'Cerrado';
    }
  }

  toggleExport(event: Event) {
    event.stopPropagation();
    this.showExportSelector = !this.showExportSelector;
    this.showColumnSelector = false;
  }

  toggleColumns(event: Event) {
    event.stopPropagation();
    this.showColumnSelector = !this.showColumnSelector;
    this.showExportSelector = false;
  }

  exportToCSV() {
    alert('Exportando a CSV (Simulación)...');
    this.showExportSelector = false;
  }

  exportToPDF() {
    alert('Exportando a PDF (Simulación)...');
    this.showExportSelector = false;
  }

  isColVisible(id: string): boolean {
    return this.columns.find(c => c.id === id)?.visible ?? true;
  }
}
