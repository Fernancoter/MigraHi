import { Component, OnInit, inject, HostListener, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CalidadService } from '../../core/services/calidad';

import { LucidePencil, LucideX, LucideTrash2, LucideFolder, LucideSave, LucideFileText, LucideDownload } from '@lucide/angular';

@Component({
  selector: 'app-defectos-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LucidePencil, LucideX, LucideTrash2, LucideFolder, LucideSave, LucideFileText, LucideDownload],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">Carrete Defecto</h1>
        <div class="breadcrumb">
          <span class="breadcrumb-item">Calidad</span>
          <span class="breadcrumb-separator">›</span>
          <span class="breadcrumb-item active">Defectos</span>
        </div>
      </div>
      
      <div class="page-content">
        <div class="toolbar">
          <div class="toolbar-left" style="display:flex; gap: 10px;">
            <button class="btn-icon-dark" title="Nuevo" (click)="abrirModalReportar()"><i class="fa fa-file-o"></i> +</button>
            <div class="dropdown-container" style="position:relative;">
              <button class="btn-legacy secondary" (click)="toggleExport($event)"><svg lucideDownload [size]="14"></svg> Exportar <span class="caret">▼</span></button>
              <div class="column-selector-dropdown" *ngIf="showExportSelector">
                <div class="column-list">
                  <label class="export-item" (click)="exportToCSV()"><svg lucideFileText [size]="14"></svg> Excel (CSV)</label>
                  <label class="export-item" (click)="exportToPDF()"><svg lucideFileText [size]="14"></svg> PDF</label>
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
            <div class="filter-search-group-qa">
              <div class="dropdown-wrapper">
                <button class="btn-filter-funnel-qa" (click)="toggleSearchFilterDropdown($event)" title="Filtros avanzados">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>
                  <span class="chevron-down-funnel">▾</span>
                </button>
                
                <div class="filter-popover-qa shadow-premium" *ngIf="showSearchFilterDropdown" (click)="$event.stopPropagation()">
                  <div class="filter-item-qa" (click)="clearAllFilters()">
                    <span class="icon-circle-cross-dark"><svg lucideX [size]="12"></svg></span> Limpiar filtros
                  </div>
                  <div class="filter-item-qa" (click)="saveActiveFilters()">
                    <span class="icon-floppy-dark"><svg lucideSave [size]="14"></svg></span> Guardar filtro como...
                  </div>
                  
                  <ng-container *ngIf="savedFilters.length > 0">
                    <div class="dropdown-divider"></div>
                    <div class="dropdown-header-saved">Filtros Guardados</div>
                    <div class="filter-item-qa saved-filter-item" *ngFor="let f of savedFilters" (click)="loadSavedFilter(f)">
                      <span><svg lucideFolder [size]="14"></svg> {{ f.name }}</span>
                      <span class="btn-delete-saved-filter" (click)="deleteSavedFilter(f, $event)"><svg lucideTrash2 [size]="14"></svg></span>
                    </div>
                  </ng-container>
                </div>
              </div>

              <input type="text" class="search-input" placeholder="Buscar" [(ngModel)]="filterSerie" (keyup)="aplicarFiltros()">
            </div>
          </div>
        </div>

        <table class="gx-table">
          <thead>
            <tr>
              <th class="action-col"></th>
              <th class="action-col"></th>
              <th *ngIf="isColVisible('nombre')">Nombre ↑</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let def of paginatedDefectos; let i = index">
              <td class="action-cell"><span class="icon-edit"><svg lucidePencil [size]="14"></svg></span></td>
              <td class="action-cell"><span class="icon-delete"><svg lucideX [size]="14"></svg></span></td>
              <td class="text-green" *ngIf="isColVisible('nombre')">{{ getDefectoNombre(def.tipoDefecto) }}</td>
            </tr>
            <tr *ngIf="filteredDefectos.length === 0">
              <td colspan="3" class="text-center">No hay datos</td>
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

      <!-- Modal de Registro de Falla (Oculto en captura, pero necesario funcionalmente) -->
      <div class="modal-overlay" *ngIf="mostrarModalReportar">
        <div class="modal-card">
          <h3>Registrar Falla</h3>
          <div class="form-group">
            <label>No. Serie</label>
            <input type="text" [(ngModel)]="nuevoReporte.noSerieCarrete">
          </div>
          <div class="form-group">
            <label>Tipo Defecto</label>
            <select [(ngModel)]="nuevoReporte.tipo">
              <option [value]="1">Calibre</option>
              <option [value]="2">Peso</option>
              <option [value]="3">Espesor</option>
              <option [value]="4">Daño Físico</option>
              <option [value]="5">Contaminación</option>
              <option [value]="6">Otro</option>
            </select>
          </div>
          <div class="form-group">
            <label>Descripción</label>
            <textarea [(ngModel)]="nuevoReporte.descripcion"></textarea>
          </div>
          <div class="modal-actions">
            <button (click)="cerrarModalReportar()">Cancelar</button>
            <button class="btn-green" (click)="reportarFalla()">Guardar</button>
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

    
    .filter-search-group-qa { display: flex; gap: 0.6rem; align-items: center; }
    .dropdown-wrapper { position: relative; }
    .btn-filter-funnel-qa { background: #ffffff; border: 1px solid #dcdde1; border-radius: 4px; padding: 0.4rem 0.6rem; height: 32px; display: inline-flex; align-items: center; justify-content: center; gap: 3px; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.08); transition: background 0.2s; }
    .btn-filter-funnel-qa:hover { background: #f8fafc; border-color: #cbd5e1; }
    .chevron-down-funnel { font-size: 0.65rem; color: #334155; }
    .filter-popover-qa { position: absolute; top: calc(100% + 4px); right: 0; background: #ffffff !important; border: 1px solid #cbd5e1 !important; border-radius: 6px !important; width: 185px !important; box-shadow: 0 6px 20px rgba(0,0,0,0.15) !important; z-index: 99999 !important; padding: 6px 0 !important; box-sizing: border-box; }
    .filter-item-qa { display: flex; align-items: center; gap: 8px; padding: 0.55rem 0.9rem; font-size: 0.85rem; color: #334155; font-weight: 500; cursor: pointer; transition: background 0.15s; }
    .filter-item-qa:hover { background: #f1f5f9; color: #2e7d32; }
    .icon-circle-cross-dark { display: inline-flex; align-items: center; justify-content: center; width: 15px; height: 15px; background: #475569; color: white; border-radius: 50%; font-size: 8px; font-weight: bold; }
    .filter-item-qa:hover .icon-circle-cross-dark { background: #2e7d32; }
    .icon-floppy-dark { font-size: 0.9rem; color: #475569; }
    .filter-item-qa:hover .icon-floppy-dark { color: #2e7d32; }
    .dropdown-divider { height: 1px; background: #e2e8f0; margin: 4px 0; }
    .dropdown-header-saved { font-size: 0.7rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; padding: 4px 12px; }
    .saved-filter-item { justify-content: space-between; }
    .btn-delete-saved-filter { cursor: pointer; opacity: 0.7; font-size: 0.8rem; }
    .btn-delete-saved-filter:hover { opacity: 1; }

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
    }
    .gx-table td {
      border: 1px solid #ddd;
      padding: 10px 12px;
      font-size: 14px;
    }
    .action-col { width: 40px; text-align: center; }
    .action-cell { text-align: center; cursor: pointer; color: #777; }
    .text-green { color: #5cb85c; }
    .text-center { text-align: center; }

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
export class DefectosListComponent implements OnInit {
  private calidadService = inject(CalidadService);
  private cdr = inject(ChangeDetectorRef);

  defectos: any[] = [];
  filteredDefectos: any[] = [];

  filterSerie = '';

  currentPage: number = 1;
  pageSize: number = 10;

  get totalPages(): number {
    return Math.ceil(this.filteredDefectos.length / this.pageSize) || 1;
  }

  get paginatedDefectos(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredDefectos.slice(start, start + this.pageSize);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.cdr.detectChanges();
    }
  }

  mostrarModalReportar = false;
  nuevoReporte = {
    noSerieCarrete: '',
    tipo: 1,
    descripcion: ''
  };

  showExportSelector = false;
  showColumnSelector = false;
  showSearchFilterDropdown = false;
  savedFilters: any[] = [];

  columns = [
    { id: 'nombre', label: 'Nombre', visible: true }
  ];

  @HostListener('document:click')
  onDocumentClick() {
    this.showExportSelector = false;
    this.showColumnSelector = false;
    this.showSearchFilterDropdown = false;
  }

  toggleSearchFilterDropdown(e: Event) {
    e.stopPropagation();
    this.showSearchFilterDropdown = !this.showSearchFilterDropdown;
    this.showExportSelector = false;
    this.showColumnSelector = false;
  }

  clearAllFilters() {
    this.filterSerie = '';
    this.aplicarFiltros();
    this.showSearchFilterDropdown = false;
  }

  saveActiveFilters() {
    const name = prompt('Nombre para este filtro guardado:');
    if (name) {
      this.savedFilters.push({ id: Date.now(), name, term: this.filterSerie });
    }
    this.showSearchFilterDropdown = false;
  }

  loadSavedFilter(f: any) {
    this.filterSerie = f.term || '';
    this.aplicarFiltros();
    this.showSearchFilterDropdown = false;
  }

  deleteSavedFilter(f: any, e: Event) {
    e.stopPropagation();
    this.savedFilters = this.savedFilters.filter(item => item.id !== f.id);
  }

  ngOnInit() {
    this.cargarDefectos();
  }

  cargarDefectos() {
    this.calidadService.getDefectos().subscribe({
      next: (data) => {
        this.defectos = data;
        this.aplicarFiltros();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar defectos:', err);
        this.cdr.detectChanges();
      }
    });
  }

  aplicarFiltros() {
    this.filteredDefectos = this.defectos.filter(d => {
      const matchSerie = d.noSerieCarrete.toLowerCase().includes(this.filterSerie.trim().toLowerCase());
      return matchSerie;
    });
    this.currentPage = 1;
  }

  abrirModalReportar() {
    this.nuevoReporte = { noSerieCarrete: '', tipo: 1, descripcion: '' };
    this.mostrarModalReportar = true;
    this.cdr.detectChanges();
  }

  cerrarModalReportar() {
    this.mostrarModalReportar = false;
    this.cdr.detectChanges();
  }

  reportarFalla() {
    if (!this.nuevoReporte.noSerieCarrete) return;
    this.calidadService.reportarDefecto(this.nuevoReporte).subscribe({
      next: () => {
        this.mostrarModalReportar = false;
        this.cargarDefectos();
      },
      error: (err) => {
        console.error('Error al reportar defecto:', err);
        this.cdr.detectChanges();
      }
    });
  }

  getDefectoNombre(tipo: number): string {
    switch (Number(tipo)) {
      case 1: return 'calibre';
      case 2: return 'peso';
      case 3: return 'espesor';
      case 4: return 'daño fisico';
      case 5: return 'contaminacion';
      case 6: return 'otro';
      default: return 'otro';
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
