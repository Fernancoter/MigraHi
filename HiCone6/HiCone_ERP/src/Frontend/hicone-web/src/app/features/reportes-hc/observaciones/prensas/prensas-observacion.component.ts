import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduccionConfigService } from '../../../../core/services/produccion-config.service';

interface PrensaObservacion {
  id: string | number;
  fecha: string;
  prensa: string;
  turno: string;
  interrupcion: string;
  tiempo: string;
  descripcion: string;
}

@Component({
  selector: 'app-prensas-observacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up">
      <!-- Encabezado del Módulo -->
      <header class="module-header-container" style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
        <div class="title-area">
          <nav class="breadcrumb">Reportes HC › Observaciones › Prensas</nav>
          <h1>Prensa Observacion</h1>
        </div>

        <!-- Barra de Acciones -->
        <div class="actions-toolbar" style="display: flex; width: 100%; align-items: center;">

          <!-- LEFT SIDE -->
          <div class="toolbar-left" style="display: flex; gap: 0.75rem; align-items: center;">
            <!-- Botón Agregar -->
            <button class="btn btn-primary" (click)="closeAllDropdowns()">+</button>

            <!-- Dropdown de Exportar -->
            <div class="dropdown-wrapper">
              <button class="btn btn-secondary" (click)="toggleExportDropdown($event)" style="display: flex; align-items: center; gap: 0.4rem;">
                <span>⬇️</span> Exportar
              </button>
              @if (showExportOptions()) {
                <div class="column-selector-popover animate-slide-up">
                  <div class="dropdown-item" (click)="showExportOptions.set(false)">Excel</div>
                  <div class="dropdown-item" (click)="showExportOptions.set(false)">PDF</div>
                </div>
              }
            </div>

            <!-- Selector de Columnas -->
            <div class="dropdown-wrapper">
              <button class="btn btn-success" (click)="toggleColumnDropdown($event)" style="display: flex; align-items: center; gap: 0.4rem;">
                Selecciona columnas <span>▾</span>
              </button>
              @if (showColumnSelector()) {
                <div class="column-selector-popover advanced-column-selector animate-slide-up" (click)="$event.stopPropagation()">
                  <div class="col-search-box">
                    <input type="text" placeholder="Buscar columna..." [(ngModel)]="colSearch" class="field-input col-search-input" />
                  </div>

                  <div class="col-groups-container">
                    <div class="col-group">
                      <div class="col-group-header" (click)="colFijasIzqExpanded = !colFijasIzqExpanded">
                        <label><input type="checkbox" checked disabled> Fijas a la izquierda</label>
                        <span class="chevron" [class.rotated]="colFijasIzqExpanded">▾</span>
                      </div>
                      @if (colFijasIzqExpanded) {
                        <div class="col-group-body">
                          <label class="col-item"><input type="checkbox" checked disabled> (Ninguna)</label>
                        </div>
                      }
                    </div>

                    <div class="col-group">
                      <div class="col-group-header" (click)="colNoFijasExpanded = !colNoFijasExpanded">
                        <label><input type="checkbox" checked disabled> No fijas</label>
                        <span class="chevron" [class.rotated]="colNoFijasExpanded">▾</span>
                      </div>
                      @if (colNoFijasExpanded) {
                        <div class="col-group-body">
                          @for (col of allColumns; track col.key) {
                            @if (!colSearch || col.label.toLowerCase().includes(colSearch.toLowerCase())) {
                              <label class="col-item">
                                <input type="checkbox" [checked]="isTempColVisible(col.key)" (change)="toggleTempCol(col.key)"> {{ col.label }}
                              </label>
                            }
                          }
                        </div>
                      }
                    </div>

                    <div class="col-group">
                      <div class="col-group-header" (click)="colFijasDerExpanded = !colFijasDerExpanded">
                        <label><input type="checkbox" checked disabled> Fijas a la derecha</label>
                        <span class="chevron" [class.rotated]="colFijasDerExpanded">▾</span>
                      </div>
                      @if (colFijasDerExpanded) {
                        <div class="col-group-body">
                          <label class="col-item"><input type="checkbox" checked disabled> (Ninguna)</label>
                        </div>
                      }
                    </div>
                  </div>

                  <div class="col-selector-footer">
                    <button class="btn-icon reset-btn" (click)="resetColumns()" title="Restablecer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                    </button>
                    <button class="btn btn-success flex-1" (click)="applyColumns()">Actualizar</button>
                  </div>
                </div>
              }
            </div>

            <!-- Botón Filtro -->
            <button class="btn-filter" (click)="toggleFilterDropdown($event)">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.4rem;"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
              Filtro
            </button>
          </div>

          <!-- RIGHT SIDE -->
          <div class="toolbar-right" style="margin-left: auto;">
            <div class="search-box">
              <span class="search-icon">🔍</span>
              <input type="text" placeholder="Buscar..." [ngModel]="searchText()" (ngModelChange)="searchText.set($event); currentPage.set(1)" class="field-input" />
            </div>
          </div>

        </div>
      </header>

      <!-- Tabla de Datos -->
      <div class="content-card">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 50px;"></th>
              <th style="width: 50px;"></th>
              @if (isColVisible('fecha')) { <th>Fecha</th> }
              @if (isColVisible('prensa')) { <th>Prensa</th> }
              @if (isColVisible('turno')) { <th>Turno</th> }
              @if (isColVisible('interrupcion')) { <th>Interrupción (Hr)</th> }
              @if (isColVisible('tiempo')) { <th>Tiempo (Hr)</th> }
              @if (isColVisible('descripcion')) { <th>Descripción</th> }
            </tr>
          </thead>
          <tbody>
            @if (loading()) {
              <tr>
                <td [attr.colspan]="visibleColumnCount() + 2" class="empty-state">Cargando observaciones...</td>
              </tr>
            } @else if (paginatedItems().length === 0) {
              <tr>
                <td [attr.colspan]="visibleColumnCount() + 2" class="empty-state">No se encontraron registros</td>
              </tr>
            } @else {
              @for (item of paginatedItems(); track item.id) {
                <tr>
                  <td>
                    <button class="action-btn edit" title="Editar">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                    </button>
                  </td>
                  <td>
                    <button class="action-btn delete" title="Eliminar">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                  </td>
                  @if (isColVisible('fecha')) { <td>{{ item.fecha | date:'dd/MM/yy' }}</td> }
                  @if (isColVisible('prensa')) { <td class="col-nombre">{{ item.prensa }}</td> }
                  @if (isColVisible('turno')) { <td>{{ item.turno }}</td> }
                  @if (isColVisible('interrupcion')) { <td>{{ item.interrupcion }}</td> }
                  @if (isColVisible('tiempo')) { <td>{{ item.tiempo }}</td> }
                  @if (isColVisible('descripcion')) { <td>{{ item.descripcion }}</td> }
                </tr>
              }
            }
          </tbody>
        </table>
      </div>

      <!-- Paginación -->
      <div class="pagination-container">
        <div class="pag-info">
          Página {{ currentPage() }} de {{ totalPages() }}
        </div>
        <div class="pag-buttons">
          <button class="pag-btn" [disabled]="currentPage() === 1" (click)="prevPage()">Ant</button>
          
          @for (p of getPages(currentPage(), totalPages()); track p) {
            @if (p === '...') {
              <span class="pag-dots">...</span>
            } @else {
              <button class="pag-btn" [class.active]="currentPage() === p" (click)="setPage(+p)">{{ p }}</button>
            }
          }

          <button class="pag-btn" [disabled]="currentPage() === totalPages()" (click)="nextPage()">Sig</button>
        </div>
      </div>

      <!-- Footer -->
      <footer class="page-footer">
        <div class="footer-left">
          <span>Consultas a partir de la siguiente fecha:</span>
          <span class="footer-date">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            16/03/26
          </span>
        </div>
        <div class="footer-right">Copyright 2023</div>
      </footer>

    </div>
  `,
  styles: [`
    .module-page { padding: 1.5rem 2.5rem; }
    .breadcrumb { font-size: .75rem; color: #94a3b8; font-weight: 600; text-transform: uppercase; margin-bottom: .25rem; }
    h1 { font-size: 1.8rem; font-weight: 800; color: #1e293b; margin: 0; }
    .actions-toolbar { display: flex; gap: 0.75rem; align-items: center; }

    .btn { padding: .55rem 1.25rem; border-radius: 6px; border: none; cursor: pointer; font-size: .85rem; font-weight: 600; transition: all .2s; }
    .btn-primary { background: #1e40af; color: white; box-shadow: 0 2px 4px rgba(30, 64, 175, 0.2); }
    .btn-primary:hover { background: #1e3a8a; }
    .btn-secondary { background: white; color: #475569; border: 1px solid #cbd5e1; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
    .btn-secondary:hover { background: #f8fafc; border-color: #94a3b8; }
    .btn-success { background: #5cb85c; color: white; border: 1px solid #4cae4c; }
    .btn-success:hover { background: #449d44; border-color: #398439; }

    .btn-filter { background: white; color: #475569; border: 1px solid #e2e8f0; padding: 0.55rem 0.75rem; border-radius: 6px; display: flex; align-items: center; box-shadow: 0 1px 2px rgba(0,0,0,0.05); cursor: pointer; }
    .btn-filter:hover { background: #f8fafc; }

    .search-box { position: relative; }
    .search-icon { position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: #94a3b8; font-size: 0.9rem; }
    .search-box .field-input { padding-left: 2.2rem; width: 220px; border-radius: 0; border: none; border-bottom: 1px solid #cbd5e1; background: transparent; padding-top: 0.5rem; padding-bottom: 0.5rem; }
    .search-box .field-input:focus { border-bottom-color: #1e40af; box-shadow: none; outline: none; }

    .content-card { background: white; border-radius: 8px; border: 1px solid #e2e8f0; overflow: visible; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }

    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th { text-align: left; padding: 1rem; background: #f8fafc; color: #64748b; font-size: .75rem; font-weight: 800; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; position: relative; }
    .data-table td { padding: .85rem 1rem; border-bottom: 1px solid #f1f5f9; font-size: .875rem; color: #334155; }
    .data-table tr:hover td { background: #f8fafc; }
    .empty-state { text-align: center; padding: 3.5rem; color: #94a3b8; font-style: italic; }

    .action-btn { padding: 0; border: none; cursor: pointer; font-size: .8rem; font-weight: 600; background: transparent; text-decoration: none; transition: color 0.15s; }
    .action-btn.edit { color: #d97706; }
    .action-btn.edit:hover { color: #b45309; }
    .action-btn.delete { color: #ef4444; }
    .action-btn.delete:hover { color: #dc2626; }

    .dropdown-wrapper { position: relative; }
    .column-selector-popover { position: absolute; left: 0; top: 110%; background: white; border: 1px solid #cbd5e1; border-radius: 4px; box-shadow: 0 6px 16px rgba(0,0,0,0.12); z-index: 100; min-width: 150px; }

    /* Advanced Column Selector */
    .advanced-column-selector { width: 260px; padding: 0; display: flex; flex-direction: column; }
    .col-search-box { padding: 0.5rem; border-bottom: 1px solid #e2e8f0; }
    .col-search-input { width: 100%; border: 1px solid #cbd5e1; border-radius: 4px; padding: 0.4rem 0.5rem; font-size: 0.8rem; }
    .col-groups-container { max-height: 250px; overflow-y: auto; padding: 0.5rem 0; }
    .col-group { display: flex; flex-direction: column; }
    .col-group-header { display: flex; align-items: center; justify-content: space-between; padding: 0.4rem 0.8rem; cursor: pointer; color: #475569; font-size: 0.85rem; }
    .col-group-header:hover { background: #f8fafc; }
    .col-group-header label { display: flex; align-items: center; gap: 0.4rem; cursor: pointer; margin: 0; font-weight: 600; }
    .col-group-body { display: flex; flex-direction: column; padding-left: 1.5rem; margin-bottom: 0.2rem; }
    .col-item { display: flex; align-items: center; gap: 0.4rem; padding: 0.3rem 0.8rem; font-size: 0.8rem; color: #334155; cursor: pointer; margin: 0; }
    .col-item:hover { background: #f1f5f9; }
    .col-selector-footer { display: flex; gap: 0.5rem; padding: 0.6rem; border-top: 1px solid #e2e8f0; background: #f8fafc; align-items: center; }
    .btn-icon { background: #5cb85c; color: white; border: none; border-radius: 4px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
    .btn-icon:hover { background: #449d44; }
    .flex-1 { flex: 1; }
    .chevron { transition: transform 0.2s; font-size: 0.9rem; }
    .chevron.rotated { transform: rotate(180deg); }

    .dropdown-item { padding: 0.65rem 1rem; font-size: 0.85rem; color: #334155; cursor: pointer; transition: background 0.15s; font-weight: 500; display: flex; align-items: center; gap: 0.5rem; }
    .dropdown-item:hover { background: #f1f5f9; color: #0f172a; }

    .field-input { width: 100%; padding: .55rem .75rem; border-radius: 4px; border: 1px solid #cbd5e1; font-size: .875rem; outline: none; box-sizing: border-box; transition: all 0.2s; }
    .field-input:focus { border-color: #1e40af; }

    .pagination-container { display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; padding: 0 0.5rem; }
    .pag-info { font-size: 0.85rem; color: #64748b; font-weight: 500; }
    .pag-buttons { display: flex; gap: 0.4rem; align-items: center; }
    .pag-btn { height: 2.1rem; min-width: 2.1rem; padding: 0 0.5rem; border-radius: 4px; border: 1px solid #cbd5e1; background: white; color: #475569; font-weight: 600; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
    .pag-btn:hover:not(:disabled) { background: #f8fafc; color: #0f172a; }
    .pag-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .pag-btn.active { background: #1e40af; border-color: #1e40af; color: white; }
    .pag-dots { font-size: 0.85rem; color: #94a3b8; font-weight: 700; padding: 0 0.2rem; }

    /* Footer */
    .page-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; padding: 1rem 0.5rem; border-top: 1px solid #e2e8f0; font-size: 0.8rem; color: #94a3b8; }
    .footer-left { display: flex; align-items: center; gap: 0.5rem; }
    .footer-date { display: flex; align-items: center; gap: 0.3rem; color: #64748b; font-weight: 600; }
    .footer-right { font-size: 0.75rem; }

    .animate-move-up { animation: moveUp .3s ease-out; }
    .animate-slide-up { animation: slideUp .15s ease-out; }
    @keyframes moveUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class PrensasObservacionComponent implements OnInit {
  private svc = inject(ProduccionConfigService);

  readonly allColumns = [
    { key: 'fecha', label: 'Fecha' },
    { key: 'prensa', label: 'Prensa' },
    { key: 'turno', label: 'Turno' },
    { key: 'interrupcion', label: 'Interrupción (Hr)' },
    { key: 'tiempo', label: 'Tiempo (Hr)' },
    { key: 'descripcion', label: 'Descripción' },
  ];

  items = signal<PrensaObservacion[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.svc.getPrensasObservaciones().subscribe({
      next: data => {
        this.items.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  // Search & Filters
  searchText = signal<string>('');
  showFilterOptions = signal<boolean>(false);

  // Columns
  showColumnSelector = signal<boolean>(false);
  visibleColumns = signal<string[]>(['fecha', 'prensa', 'turno', 'interrupcion', 'tiempo', 'descripcion']);
  tempVisibleColumns = signal<string[]>(['fecha', 'prensa', 'turno', 'interrupcion', 'tiempo', 'descripcion']);
  colSearch = '';
  colFijasIzqExpanded = true;
  colNoFijasExpanded = true;
  colFijasDerExpanded = true;

  // Export
  showExportOptions = signal<boolean>(false);

  // Pagination
  currentPage = signal<number>(1);
  pageSize = signal<number>(8);

  visibleColumnCount = computed(() => this.visibleColumns().length);

  filteredItems = computed(() => {
    let list = [...this.items()];
    const search = this.searchText().trim().toLowerCase();
    if (search) {
      list = list.filter(item =>
        item.descripcion.toLowerCase().includes(search) ||
        item.prensa.toLowerCase().includes(search) ||
        item.turno.toLowerCase().includes(search)
      );
    }
    return list;
  });

  paginatedItems = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredItems().slice(start, start + this.pageSize());
  });

  totalPages = computed(() => {
    return Math.ceil(this.filteredItems().length / this.pageSize()) || 1;
  });

  /* ------------------- DROPDOWNS ------------------- */
  toggleColumnDropdown(event: Event) {
    event.stopPropagation();
    if (!this.showColumnSelector()) {
      this.tempVisibleColumns.set([...this.visibleColumns()]);
      this.colSearch = '';
    }
    this.showColumnSelector.update(v => !v);
    this.showExportOptions.set(false);
    this.showFilterOptions.set(false);
  }

  toggleExportDropdown(event: Event) {
    event.stopPropagation();
    this.showExportOptions.update(v => !v);
    this.showColumnSelector.set(false);
    this.showFilterOptions.set(false);
  }

  toggleFilterDropdown(event: Event) {
    event.stopPropagation();
    this.showFilterOptions.update(v => !v);
    this.showColumnSelector.set(false);
    this.showExportOptions.set(false);
  }

  /* ------------------- COLUMN SELECTOR LOGIC ------------------- */
  isColVisible(colName: string): boolean {
    return this.visibleColumns().includes(colName);
  }

  isTempColVisible(colName: string): boolean {
    return this.tempVisibleColumns().includes(colName);
  }

  toggleTempCol(colName: string) {
    this.tempVisibleColumns.update(cols => {
      if (cols.includes(colName)) return cols.filter(c => c !== colName);
      return [...cols, colName];
    });
  }

  resetColumns() {
    this.tempVisibleColumns.set(['fecha', 'prensa', 'turno', 'interrupcion', 'tiempo', 'descripcion']);
  }

  applyColumns() {
    this.visibleColumns.set([...this.tempVisibleColumns()]);
    this.showColumnSelector.set(false);
  }

  /* ------------------- FILTERS LOGIC ------------------- */
  clearFilters() {
    this.searchText.set('');
    this.currentPage.set(1);
    this.showFilterOptions.set(false);
  }

  /* ------------------- PAGINATION ------------------- */
  prevPage() { if (this.currentPage() > 1) this.currentPage.update(p => p - 1); }
  nextPage() { if (this.currentPage() < this.totalPages()) this.currentPage.update(p => p + 1); }
  setPage(p: number) { this.currentPage.set(p); }

  getPages(current: number, total: number): (number | string)[] {
    if (total <= 1) return [1];
    const pages: (number | string)[] = [1];
    if (current > 3) pages.push('...');
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (current < total - 2) pages.push('...');
    if (total > 1) pages.push(total);
    return pages;
  }

  closeAllDropdowns() {
    this.showColumnSelector.set(false);
    this.showExportOptions.set(false);
    this.showFilterOptions.set(false);
  }
}
