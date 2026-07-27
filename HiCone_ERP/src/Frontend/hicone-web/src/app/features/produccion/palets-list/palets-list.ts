import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduccionService } from '../../../core/services/produccion';

@Component({
  selector: 'app-palets-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up" (click)="closeAllDropdowns()">

      <div class="page-header-premium">
        <div class="title-section">
          <h1 class="premium-title">Palets de Producto Terminado</h1>
          <nav class="breadcrumb-modern">
            <span class="root">Prensado</span>
            <span class="sep">&rsaquo;</span>
            <span class="root">Operación</span>
            <span class="sep">&rsaquo;</span>
            <span class="active">Palets</span>
          </nav>
        </div>
      </div>

      <div class="actions-toolbar" style="margin-bottom: 1.5rem;">
          <div class="toolbar-left">
            <div class="dropdown-wrapper">
              <button class="btn btn-secondary" (click)="toggleExportDropdown($event)">
                <span>⬇</span> Exportar
              </button>
              @if (showExportOptions()) {
                <div class="dd-popover animate-slide-up" (click)="$event.stopPropagation()">
                  <div class="dd-item" (click)="exportCSV()">Excel (CSV)</div>
                  <div class="dd-item" (click)="exportPDF()">PDF</div>
                </div>
              }
            </div>

            <div class="dropdown-wrapper">
              <button class="btn btn-secondary btn-cols" (click)="toggleColumnDropdown($event)">
                ☰ Selecciona columnas ▾
              </button>
              @if (showColumnSelector()) {
                <div class="col-sel-popover animate-slide-up" (click)="$event.stopPropagation()">
                  <div class="col-group">
                    <label class="col-group-label">
                      <input type="checkbox" [checked]="allColsVisible()" (change)="toggleAllCols()" /> Mostrar Columnas ▾
                    </label>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('noSerie')" (change)="toggleCol('noSerie')" /> No. Serie</label>
                    </div>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('productoNombre')" (change)="toggleCol('productoNombre')" /> Producto</label>
                    </div>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('prensaNombre')" (change)="toggleCol('prensaNombre')" /> Prensa</label>
                    </div>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('operarioNombre')" (change)="toggleCol('operarioNombre')" /> Operador</label>
                    </div>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('totalCarretes')" (change)="toggleCol('totalCarretes')" /> Carretes</label>
                    </div>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('tipo')" (change)="toggleCol('tipo')" /> Tipo</label>
                    </div>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('estatus')" (change)="toggleCol('estatus')" /> Estatus</label>
                    </div>
                  </div>
                  <button class="btn-actualizar" (click)="showColumnSelector.set(false)">↺ Actualizar</button>
                </div>
              }
            </div>
          </div>

          <div style="flex:1"></div>

          <div class="toolbar-right">
            <div class="search-box">
              <span class="search-icon">🔍</span>
              <input class="search-input" type="text" placeholder="Buscar..." [ngModel]="searchText()" (ngModelChange)="searchText.set($event)" />
            </div>
          </div>
      </div>

      <!-- TABLA -->
      <div class="content-card">
        <table class="data-table">
          <thead>
            <tr>
              @if (isColVisible('noSerie')) { <th>No. Serie</th> }
              @if (isColVisible('productoNombre')) { <th>Producto</th> }
              @if (isColVisible('prensaNombre')) { <th>Prensa</th> }
              @if (isColVisible('operarioNombre')) { <th>Operador</th> }
              @if (isColVisible('totalCarretes')) { <th>Carretes / Capacidad</th> }
              @if (isColVisible('tipo')) { <th>Tipo</th> }
              @if (isColVisible('estatus')) { <th>Estatus</th> }
            </tr>
          </thead>
          <tbody>
            @for (item of paginatedItems(); track item.id) {
              <tr>
                @if (isColVisible('noSerie')) { <td class="col-nombre">{{ item.noSerie }}</td> }
                @if (isColVisible('productoNombre')) { <td>{{ item.productoNombre }}</td> }
                @if (isColVisible('prensaNombre')) { <td>{{ item.prensaNombre }}</td> }
                @if (isColVisible('operarioNombre')) { <td>{{ item.operarioNombre }}</td> }
                @if (isColVisible('totalCarretes')) { <td><strong>{{ item.totalCarretes }}</strong> / {{ item.capacidad }}</td> }
                @if (isColVisible('tipo')) { <td>{{ item.tipo === 1 ? 'Normal' : 'Especial' }}</td> }
                @if (isColVisible('estatus')) { 
                  <td>
                    <span class="status-badge" [ngClass]="'status-' + item.estatus">
                      {{ getEstatusLabel(item.estatus) }}
                    </span>
                  </td> 
                }
              </tr>
            }
            @if (paginatedItems().length === 0) {
              <tr>
                <td [attr.colspan]="visibleCount()" class="empty-state">No se encontraron palets.</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <!-- Paginación -->
      @if (totalPages() > 1) {
        <div class="pagination-container">
          <button class="pag-btn" [disabled]="currentPage() === 1" (click)="prevPage()">&laquo;</button>
          @for (p of getPages(currentPage(), totalPages()); track p) {
            @if (p === '...') {
              <span class="pag-dots">...</span>
            } @else {
              <button class="pag-btn" [class.active]="currentPage() === p" (click)="setPage(p)">{{ p }}</button>
            }
          }
          <button class="pag-btn" [disabled]="currentPage() === totalPages()" (click)="nextPage()">&raquo;</button>
        </div>
      }

    </div>
  `,
  styles: [`
    .module-page { padding: 3rem; font-family: 'Inter', sans-serif; }
    .breadcrumb  { font-size:.72rem; color:#94a3b8; font-weight:700; text-transform:uppercase; letter-spacing:.05em; }
    h1           { font-size:1.75rem; font-weight:800; color:#1e293b; margin:0 0 .25rem; }
    .actions-toolbar { display:flex; width:100%; align-items:center; gap:.5rem; }
    .toolbar-left    { display:flex; gap:.6rem; align-items:center; }
    .toolbar-right   { display:flex; gap:.6rem; align-items:center; }
    
    .btn { padding:.52rem 1.1rem; border-radius:7px; border:none; cursor:pointer; font-size:.82rem; font-weight:700; transition:all .18s; display:flex; align-items:center; gap:.35rem; }
    .btn-primary   { background:#3faa5a; color:#fff; }
    .btn-secondary { background:#fff; color:#475569; border:1px solid #e2e8f0; }
    .btn-secondary:hover { background:#f8fafc; border-color:#cbd5e1; }
    .btn-cols { font-size:.78rem; padding:.48rem .9rem; }

    .search-box   { position:relative; }
    .search-icon  { position:absolute; left:.7rem; top:50%; transform:translateY(-50%); color:#94a3b8; }
    .search-input { padding:.48rem .75rem .48rem 2rem; border:1px solid #e2e8f0; border-radius:7px; font-size:.82rem; outline:none; width:200px; color:#334155; }
    .search-input:focus { border-color:#3faa5a; box-shadow:0 0 0 3px rgba(63,170,90,.12); }

    .dropdown-wrapper { position:relative; }
    .dd-popover  { position:absolute; left:0; top:110%; background:#fff; border:1px solid #e2e8f0; border-radius:10px; box-shadow:0 8px 20px rgba(0,0,0,.1); z-index:200; min-width:140px; overflow:hidden; }
    .dd-item     { padding:.6rem 1rem; font-size:.82rem; font-weight:600; color:#334155; cursor:pointer; }
    .dd-item:hover { background:#f1f5f9; }

    .col-sel-popover { position:absolute; left:0; top:110%; background:#fff; border:1px solid #e2e8f0; border-radius:10px; box-shadow:0 8px 24px rgba(0,0,0,.12); z-index:200; width:240px; padding:.75rem; }
    .col-group { margin-bottom:.25rem; }
    .col-group-label { display:flex; align-items:center; gap:.4rem; font-size:.82rem; font-weight:700; color:#334155; cursor:pointer; padding:.2rem 0; }
    .col-subitem { padding-left:1.4rem; display:flex; flex-direction:column; gap:.2rem; }
    .col-subitem label { display:flex; align-items:center; gap:.4rem; font-size:.8rem; color:#475569; cursor:pointer; padding:.15rem 0; }
    .btn-actualizar { width:100%; margin-top:.5rem; padding:.45rem; background:#3faa5a; color:#fff; border:none; border-radius:6px; font-size:.8rem; font-weight:700; cursor:pointer; }

    .status-badge { padding:.2rem .5rem; border-radius:12px; font-size:.72rem; font-weight:700; text-transform:uppercase; }
    .status-1 { background:#fffbeb; color:#d97706; } /* En Ensamble */
    .status-2 { background:#ecfdf5; color:#059669; } /* Completo */
    .status-3 { background:#eff6ff; color:#2563eb; } /* Embarcado */

    .content-card { background:#fff; border-radius:12px; border:1px solid #e2e8f0; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,.04); margin-top:1rem; }
    .data-table   { width:100%; border-collapse:collapse; }
    .data-table th { text-align:left; padding:.85rem 1rem; background:#f8fafc; color:#64748b; font-size:.72rem; font-weight:800; text-transform:uppercase; letter-spacing:.04em; border-bottom:1px solid #e2e8f0; }
    .data-table td { padding:.78rem 1rem; border-bottom:1px solid #f1f5f9; font-size:.83rem; color:#334155; }
    .data-table tr:hover td { background:#f8fafc; }
    .col-nombre { font-weight:700; color:#1e293b; }
    .empty-state { text-align:center; padding:3rem; color:#94a3b8; font-style:italic; }

    .pagination-container { display:flex; justify-content:center; align-items:center; gap:.35rem; margin-top:1.4rem; }
    .pag-btn { height:2rem; min-width:2rem; padding:0 .45rem; border-radius:7px; border:1px solid #e2e8f0; background:#fff; color:#475569; font-weight:700; font-size:.82rem; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all .18s; }
    .pag-btn:hover:not(:disabled) { background:#f8fafc; border-color:#cbd5e1; }
    .pag-btn:disabled { opacity:.4; cursor:not-allowed; }
    .pag-btn.active { background:#3faa5a; border-color:#3faa5a; color:#fff; }
  `]
})
export class PaletsListComponent implements OnInit {
  private svc = inject(ProduccionService);

  items = signal<any[]>([]);
  searchText = signal('');
  currentPage = signal(1);
  pageSize = signal(10);

  showColumnSelector = signal(false);
  showExportOptions = signal(false);

  visibleColumns = signal<string[]>(['noSerie', 'productoNombre', 'prensaNombre', 'operarioNombre', 'totalCarretes', 'tipo', 'estatus']);

  ngOnInit() {
    this.load();
  }

  load() {
    this.svc.getPalets().subscribe({
      next: (data) => this.items.set(data),
      error: (err) => console.error(err)
    });
  }

  filteredItems = computed(() => {
    const s = this.searchText().trim().toLowerCase();
    return s ? this.items().filter(item => 
      (item.noSerie?.toLowerCase().includes(s)) ||
      (item.productoNombre?.toLowerCase().includes(s)) ||
      (item.operarioNombre?.toLowerCase().includes(s))
    ) : this.items();
  });

  paginatedItems = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredItems().slice(start, start + this.pageSize());
  });

  totalPages = computed(() => Math.ceil(this.filteredItems().length / this.pageSize()) || 1);

  visibleCount = computed(() => this.visibleColumns().length);

  allColsVisible = computed(() => ['noSerie', 'productoNombre', 'prensaNombre', 'operarioNombre', 'totalCarretes', 'tipo', 'estatus'].every(c => this.visibleColumns().includes(c)));

  isColVisible(col: string) { return this.visibleColumns().includes(col); }
  toggleCol(col: string) {
    this.visibleColumns.update(cols =>
      cols.includes(col) ? cols.filter(c => c !== col) : [...cols, col]
    );
  }
  toggleAllCols() {
    if (this.allColsVisible()) this.visibleColumns.set([]);
    else this.visibleColumns.set(['noSerie', 'productoNombre', 'prensaNombre', 'operarioNombre', 'totalCarretes', 'tipo', 'estatus']);
  }

  prevPage() { if (this.currentPage() > 1) this.currentPage.update(p => p - 1); }
  nextPage() { if (this.currentPage() < this.totalPages()) this.currentPage.update(p => p + 1); }
  setPage(p: number | string) { if (typeof p === 'number') this.currentPage.set(p); }

  getPages(current: number, total: number): (number | string)[] {
    if (total <= 1) return [];
    const pages: (number | string)[] = [1];
    if (current > 3) pages.push('...');
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
    if (current < total - 2) pages.push('...');
    if (total > 1) pages.push(total);
    return pages;
  }

  getEstatusLabel(estatus: number): string {
    switch (estatus) {
      case 1: return 'En Ensamble';
      case 2: return 'Completo';
      case 3: return 'Embarcado';
      default: return 'Desconocido';
    }
  }

  toggleColumnDropdown(e: Event) { e.stopPropagation(); this.showColumnSelector.update(v => !v); this.showExportOptions.set(false); }
  toggleExportDropdown(e: Event) { e.stopPropagation(); this.showExportOptions.update(v => !v); this.showColumnSelector.set(false); }
  closeAllDropdowns()             { this.showColumnSelector.set(false); this.showExportOptions.set(false); }

  exportCSV() {
    this.showExportOptions.set(false);
    let csv = '\uFEFF';
    const heads: string[] = [];
    if (this.isColVisible('noSerie')) heads.push('No. Serie');
    if (this.isColVisible('productoNombre')) heads.push('Producto');
    if (this.isColVisible('prensaNombre')) heads.push('Prensa');
    if (this.isColVisible('operarioNombre')) heads.push('Operador');
    if (this.isColVisible('totalCarretes')) heads.push('Total Carretes');
    if (this.isColVisible('tipo')) heads.push('Tipo');
    if (this.isColVisible('estatus')) heads.push('Estatus');
    csv += heads.join(';') + '\n';
    this.filteredItems().forEach(item => {
      const row: string[] = [];
      if (this.isColVisible('noSerie')) row.push(item.noSerie || '');
      if (this.isColVisible('productoNombre')) row.push(item.productoNombre || '');
      if (this.isColVisible('prensaNombre')) row.push(item.prensaNombre || '');
      if (this.isColVisible('operarioNombre')) row.push(item.operarioNombre || '');
      if (this.isColVisible('totalCarretes')) row.push(item.totalCarretes?.toString() || '0');
      if (this.isColVisible('tipo')) row.push(item.tipo === 1 ? 'Normal' : 'Especial');
      if (this.isColVisible('estatus')) row.push(this.getEstatusLabel(item.estatus));
      csv += row.join(';') + '\n';
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `palets_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }

  exportPDF() {
    this.showExportOptions.set(false);
    const w = window.open('', '_blank');
    if (!w) return;
    let heads = '';
    if (this.isColVisible('noSerie')) heads += '<th>No. Serie</th>';
    if (this.isColVisible('productoNombre')) heads += '<th>Producto</th>';
    if (this.isColVisible('prensaNombre')) heads += '<th>Prensa</th>';
    if (this.isColVisible('operarioNombre')) heads += '<th>Operador</th>';
    if (this.isColVisible('totalCarretes')) heads += '<th>Total Carretes</th>';
    if (this.isColVisible('tipo')) heads += '<th>Tipo</th>';
    if (this.isColVisible('estatus')) heads += '<th>Estatus</th>';
    let rows = '';
    this.filteredItems().forEach(item => {
      rows += '<tr>';
      if (this.isColVisible('noSerie')) rows += `<td>${item.noSerie || ''}</td>`;
      if (this.isColVisible('productoNombre')) rows += `<td>${item.productoNombre || ''}</td>`;
      if (this.isColVisible('prensaNombre')) rows += `<td>${item.prensaNombre || ''}</td>`;
      if (this.isColVisible('operarioNombre')) rows += `<td>${item.operarioNombre || ''}</td>`;
      if (this.isColVisible('totalCarretes')) rows += `<td>${item.totalCarretes} / ${item.capacidad}</td>`;
      if (this.isColVisible('tipo')) rows += `<td>${item.tipo === 1 ? 'Normal' : 'Especial'}</td>`;
      if (this.isColVisible('estatus')) rows += `<td>${this.getEstatusLabel(item.estatus)}</td>`;
      rows += '</tr>';
    });
    w.document.write(`<html><head><title>Reporte Palets</title>
      <style>body{font-family:sans-serif;padding:2rem}table{width:100%;border-collapse:collapse}th,td{padding:10px 14px;border:1px solid #e2e8f0;font-size:.85rem}th{background:#f1f5f9;font-weight:700}</style>
      </head><body><h2>Reporte de Palets</h2><p>${new Date().toLocaleString()}</p>
      <table><thead><tr>${heads}</tr></thead><tbody>${rows}</tbody></table>
      <script>window.onload=()=>{window.print();window.close();}<\/script></body></html>`);
    w.document.close();
  }
}
