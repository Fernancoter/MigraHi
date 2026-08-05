import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduccionService } from '../../../core/services/produccion';

@Component({
  selector: 'app-carretes-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up" (click)="closeAllDropdowns()">

      <div class="page-header-premium">
        <div class="title-section">
          <h1 class="premium-title">Carretes de Producto Terminado</h1>
          <nav class="breadcrumb-modern">
            <span class="root">Prensado</span>
            <span class="sep">&rsaquo;</span>
            <span class="root">Operación</span>
            <span class="sep">&rsaquo;</span>
            <span class="active">Carretes</span>
          </nav>
        </div>
      </div>

      <div class="actions-toolbar" style="margin-bottom: 1.5rem;">
          <div class="toolbar-left">
            <div class="dropdown-wrapper">
              <button class="btn btn-secondary" (click)="toggleExportDropdown($event)">
                <span><svg class="btn-icon-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></span> Exportar
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
                <svg class="btn-icon-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg> Selecciona columnas ▾
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
                      <label><input type="checkbox" [checked]="isColVisible('carreraNo')" (change)="toggleCol('carreraNo')" /> Carrera</label>
                    </div>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('noLinea')" (change)="toggleCol('noLinea')" /> Línea</label>
                    </div>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('estado')" (change)="toggleCol('estado')" /> Estado</label>
                    </div>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('paletSerie')" (change)="toggleCol('paletSerie')" /> Palet Serie</label>
                    </div>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('observaciones')" (change)="toggleCol('observaciones')" /> Observaciones</label>
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
              <span class="search-icon"><svg class="search-icon-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
              <input class="search-input" type="text" placeholder="Buscar..." [ngModel]="searchText()" (ngModelChange)="searchText.set($event)" />
            </div>
          </div>
      </div>

      <!-- TABLA -->
      <div class="content-card">
        <table class="data-table">
          <thead>
            <tr>
              <th class="col-acciones">Acciones</th>
              @if (isColVisible('noSerie')) { <th>No. Serie</th> }
              @if (isColVisible('productoNombre')) { <th>Producto</th> }
              @if (isColVisible('carreraNo')) { <th>Carrera</th> }
              @if (isColVisible('noLinea')) { <th>Línea</th> }
              @if (isColVisible('estado')) { <th>Estado</th> }
              @if (isColVisible('paletSerie')) { <th>Palet Serie</th> }
              @if (isColVisible('observaciones')) { <th>Observaciones</th> }
            </tr>
          </thead>
          <tbody>
            @for (item of paginatedItems(); track item.id) {
              <tr>
                <td class="col-acciones">
                  <a class="row-action" (click)="visualizar(item)">Visualizar</a>
                  <a class="row-action" (click)="modificar(item)">Modificar</a>
                  <a class="row-action row-action-danger" (click)="eliminar(item)">Eliminar</a>
                </td>
                @if (isColVisible('noSerie')) { <td class="col-nombre">{{ item.noSerie }}</td> }
                @if (isColVisible('productoNombre')) { <td>{{ item.productoNombre }}</td> }
                @if (isColVisible('carreraNo')) { <td>Carrera # {{ item.carreraNo }}</td> }
                @if (isColVisible('noLinea')) { <td>Línea {{ item.noLinea }}</td> }
                @if (isColVisible('estado')) {
                  <td>
                    <span class="status-badge" [ngClass]="'status-' + item.estado">
                      {{ getEstadoLabel(item.estado) }}
                    </span>
                  </td>
                }
                @if (isColVisible('paletSerie')) { <td>{{ item.paletSerie || '—' }}</td> }
                @if (isColVisible('observaciones')) { <td>{{ item.observaciones || '—' }}</td> }
              </tr>
            }
            @if (paginatedItems().length === 0) {
              <tr>
                <td [attr.colspan]="visibleCount() + 1" class="empty-state">No se encontraron carretes.</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <!-- Paginación -->
      @if (filteredItems().length > 0) {
        <div class="pagination-container">
          <span class="pagination-label">Página {{ currentPage() }} de {{ totalPages() }}</span>
          <div class="pagination-buttons">
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
        </div>
      }

      <!-- Modal Visualizar -->
      @if (viewingItem(); as v) {
        <div class="modal-overlay" (click)="cerrarVisualizar()">
          <div class="modal-card" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h2>Detalle de Carrete</h2>
              <button class="modal-close" (click)="cerrarVisualizar()"><svg class="close-icon-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            </div>
            <div class="modal-body">
              <div class="detail-grid">
                <div class="detail-item"><span class="d-label">No. Serie</span><span class="d-value">{{ v.noSerie }}</span></div>
                <div class="detail-item"><span class="d-label">Estado</span><span class="d-value">{{ getEstadoLabel(v.estado) }}</span></div>
                <div class="detail-item"><span class="d-label">Producto</span><span class="d-value">{{ v.productoNombre }}</span></div>
                <div class="detail-item"><span class="d-label">Carrera / Línea</span><span class="d-value"># {{ v.carreraNo }} / Línea {{ v.noLinea }}</span></div>
                <div class="detail-item"><span class="d-label">Molino</span><span class="d-value">{{ getMolinoLabel(v.molino) }}</span></div>
                <div class="detail-item"><span class="d-label">Termina Palet</span><span class="d-value">{{ v.terminaPalet ? 'Sí' : 'No' }}</span></div>
                <div class="detail-item"><span class="d-label">Palet Serie</span><span class="d-value">{{ v.paletSerie || '—' }}</span></div>
                <div class="detail-item" style="grid-column: 1 / -1;"><span class="d-label">Observaciones</span><span class="d-value">{{ v.observaciones || '—' }}</span></div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" (click)="cerrarVisualizar()">Cerrar</button>
            </div>
          </div>
        </div>
      }

      <!-- Modal Modificar -->
      @if (editForm(); as f) {
        <div class="modal-overlay" (click)="cerrarModal()">
          <div class="modal-card" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h2>Modificar Carrete</h2>
              <button class="modal-close" (click)="cerrarModal()"><svg class="close-icon-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            </div>
            <div class="modal-body">
              <div class="form-grid">
                <div class="form-field">
                  <label>Línea</label>
                  <input type="number" [(ngModel)]="f.noLinea" />
                </div>
                <div class="form-field">
                  <label>Estado</label>
                  <select [(ngModel)]="f.estado">
                    <option [ngValue]="1">En Proceso</option>
                    <option [ngValue]="2">Terminado</option>
                    <option [ngValue]="3">Rechazado</option>
                    <option [ngValue]="4">Molino</option>
                  </select>
                </div>
                <div class="form-field">
                  <label>Molino</label>
                  <select [(ngModel)]="f.molino">
                    <option [ngValue]="0">No Aplica</option>
                    <option [ngValue]="1">Molino Interno</option>
                    <option [ngValue]="2">Molino Externo</option>
                  </select>
                </div>
                <div class="form-field">
                  <label>Termina Palet</label>
                  <select [(ngModel)]="f.terminaPalet">
                    <option [ngValue]="true">Sí</option>
                    <option [ngValue]="false">No</option>
                  </select>
                </div>
                <div class="form-field">
                  <label>Palet Serie</label>
                  <input type="text" [(ngModel)]="f.paletSerie" />
                </div>
                <div class="form-field" style="grid-column: 1 / -1;">
                  <label>Observaciones</label>
                  <input type="text" [(ngModel)]="f.observaciones" />
                </div>
              </div>
              @if (saveError()) { <div class="form-error">{{ saveError() }}</div> }
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" (click)="cerrarModal()">Cancelar</button>
              <button class="btn btn-primary" [disabled]="saving()" (click)="guardar()">{{ saving() ? 'Guardando...' : 'Guardar' }}</button>
            </div>
          </div>
        </div>
      }

      <!-- Modal Eliminar -->
      @if (itemToDelete(); as del) {
        <div class="modal-overlay" (click)="cancelarEliminar()">
          <div class="modal-card modal-card-sm" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h2>Eliminar Carrete</h2>
              <button class="modal-close" (click)="cancelarEliminar()"><svg class="close-icon-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            </div>
            <div class="modal-body">
              <p>¿Está seguro de que desea eliminar el carrete <strong>{{ del.noSerie }}</strong>? Esta acción no se puede deshacer.</p>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" (click)="cancelarEliminar()">Cancelar</button>
              <button class="btn btn-danger" [disabled]="deleting()" (click)="confirmarEliminar()">{{ deleting() ? 'Eliminando...' : 'Sí, eliminar' }}</button>
            </div>
          </div>
        </div>
      }

    </div>
  `,
  styles: [`
    .btn-icon-svg { display:inline-block; vertical-align:-2px; }
    .search-icon-svg { display:block; }
    .close-icon-svg { display:block; }
    .icon-btn-svg { display:block; }
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
    .status-1 { background:#eff6ff; color:#2563eb; } /* En Proceso */
    .status-2 { background:#ecfdf5; color:#059669; } /* Aprobado */
    .status-3 { background:#fef2f2; color:#dc2626; } /* Molido / Rechazado */
    .status-4 { background:#fffbeb; color:#d97706; } /* Retenido */

    .content-card { background:#fff; border-radius:12px; border:1px solid #e2e8f0; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,.04); margin-top:1rem; }
    .data-table   { width:100%; border-collapse:collapse; }
    .data-table th { text-align:left; padding:.85rem 1rem; background:#f8fafc; color:#64748b; font-size:.72rem; font-weight:800; text-transform:uppercase; letter-spacing:.04em; border-bottom:1px solid #e2e8f0; }
    .data-table td { padding:.78rem 1rem; border-bottom:1px solid #f1f5f9; font-size:.83rem; color:#334155; }
    .data-table tr:hover td { background:#f8fafc; }
    .col-nombre { font-weight:700; color:#1e293b; }
    .col-acciones { display:flex; gap:.75rem; position:sticky; left:0; z-index:2; background:#fff; box-shadow:2px 0 4px rgba(0,0,0,.06); }
    .data-table thead th.col-acciones { z-index:3; background:#f8fafc; }
    .data-table tr:hover td.col-acciones { background:#f8fafc; }
    .row-action { color:#3faa5a; font-weight:700; font-size:.8rem; cursor:pointer; text-decoration:none; }
    .row-action:hover { text-decoration:underline; }
    .row-action-danger { color:#dc2626; }
    .empty-state { text-align:center; padding:3rem; color:#94a3b8; font-style:italic; }

    .pagination-container { display:flex; justify-content:space-between; align-items:center; gap:1rem; margin-top:1.4rem; flex-wrap:wrap; }
    .pagination-label { font-size:.8rem; color:#64748b; font-weight:600; }
    .pagination-buttons { display:flex; align-items:center; gap:.35rem; }
    .pag-btn { height:2rem; min-width:2rem; padding:0 .45rem; border-radius:7px; border:1px solid #e2e8f0; background:#fff; color:#475569; font-weight:700; font-size:.82rem; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all .18s; }
    .pag-btn:hover:not(:disabled) { background:#f8fafc; border-color:#cbd5e1; }
    .pag-btn:disabled { opacity:.4; cursor:not-allowed; }
    .pag-btn.active { background:#3faa5a; border-color:#3faa5a; color:#fff; }

    .btn-danger { background:#dc2626; color:#fff; }
    .btn-danger:disabled { opacity:.6; cursor:not-allowed; }
    .btn-primary:disabled { opacity:.6; cursor:not-allowed; }

    .modal-overlay { position:fixed; inset:0; background:rgba(15,23,42,.55); display:flex; align-items:center; justify-content:center; z-index:500; padding:1.5rem; }
    .modal-card { background:#fff; border-radius:12px; width:100%; max-width:560px; max-height:88vh; display:flex; flex-direction:column; box-shadow:0 20px 50px rgba(0,0,0,.25); }
    .modal-card-sm { max-width:440px; }
    .modal-header { display:flex; align-items:center; justify-content:space-between; padding:1.1rem 1.4rem; border-bottom:1px solid #e2e8f0; }
    .modal-header h2 { margin:0; font-size:1.05rem; font-weight:800; color:#1e293b; }
    .modal-close { background:none; border:none; cursor:pointer; font-size:1rem; color:#94a3b8; }
    .modal-body { padding:1.2rem 1.4rem; overflow-y:auto; }
    .modal-footer { display:flex; justify-content:flex-end; gap:.6rem; padding:1rem 1.4rem; border-top:1px solid #e2e8f0; }

    .detail-grid { display:grid; grid-template-columns:1fr 1fr; gap:.9rem 1.5rem; }
    .detail-item { display:flex; flex-direction:column; gap:.2rem; }
    .d-label { font-size:.7rem; font-weight:700; text-transform:uppercase; letter-spacing:.04em; color:#94a3b8; }
    .d-value { font-size:.88rem; color:#1e293b; font-weight:600; }

    .form-grid { display:grid; grid-template-columns:1fr 1fr; gap:.9rem 1.2rem; }
    .form-field { display:flex; flex-direction:column; gap:.3rem; }
    .form-field label { font-size:.72rem; font-weight:700; color:#475569; text-transform:uppercase; letter-spacing:.03em; }
    .form-field input, .form-field select { padding:.5rem .6rem; border:1px solid #e2e8f0; border-radius:7px; font-size:.85rem; color:#1e293b; }
    .form-field input:focus, .form-field select:focus { outline:none; border-color:#3faa5a; box-shadow:0 0 0 3px rgba(63,170,90,.12); }
    .form-error { margin-top:.9rem; padding:.6rem .8rem; background:#fef2f2; color:#dc2626; border-radius:7px; font-size:.82rem; font-weight:600; }
  `]
})
export class CarretesListComponent implements OnInit {
  private svc = inject(ProduccionService);

  viewingItem = signal<any | null>(null);
  editForm = signal<any | null>(null);
  editingId: string | null = null;
  saving = signal(false);
  saveError = signal('');
  itemToDelete = signal<any | null>(null);
  deleting = signal(false);

  items = signal<any[]>([]);
  searchText = signal('');
  currentPage = signal(1);
  pageSize = signal(10);

  showColumnSelector = signal(false);
  showExportOptions = signal(false);

  visibleColumns = signal<string[]>(['noSerie', 'productoNombre', 'carreraNo', 'noLinea', 'estado', 'paletSerie', 'observaciones']);

  ngOnInit() {
    this.load();
  }

  load() {
    this.svc.getCarretes().subscribe({
      next: (data) => this.items.set(data),
      error: (err) => console.error(err)
    });
  }

  filteredItems = computed(() => {
    const s = this.searchText().trim().toLowerCase();
    return s ? this.items().filter(item => 
      (item.noSerie?.toLowerCase().includes(s)) ||
      (item.productoNombre?.toLowerCase().includes(s)) ||
      (item.paletSerie?.toLowerCase().includes(s))
    ) : this.items();
  });

  paginatedItems = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredItems().slice(start, start + this.pageSize());
  });

  totalPages = computed(() => Math.ceil(this.filteredItems().length / this.pageSize()) || 1);

  visibleCount = computed(() => this.visibleColumns().length);

  allColsVisible = computed(() => ['noSerie', 'productoNombre', 'carreraNo', 'noLinea', 'estado', 'paletSerie', 'observaciones'].every(c => this.visibleColumns().includes(c)));

  isColVisible(col: string) { return this.visibleColumns().includes(col); }
  toggleCol(col: string) {
    this.visibleColumns.update(cols =>
      cols.includes(col) ? cols.filter(c => c !== col) : [...cols, col]
    );
  }
  toggleAllCols() {
    if (this.allColsVisible()) this.visibleColumns.set([]);
    else this.visibleColumns.set(['noSerie', 'productoNombre', 'carreraNo', 'noLinea', 'estado', 'paletSerie', 'observaciones']);
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

  getEstadoLabel(estado: number): string {
    switch (estado) {
      case 1: return 'En Proceso';
      case 2: return 'Aprobado';
      case 3: return 'Molido';
      case 4: return 'Retenido';
      default: return 'Desconocido';
    }
  }

  getMolinoLabel(molino: number): string {
    switch (molino) {
      case 1: return 'Molino Interno';
      case 2: return 'Molino Externo';
      default: return 'No Aplica';
    }
  }

  toggleColumnDropdown(e: Event) { e.stopPropagation(); this.showColumnSelector.update(v => !v); this.showExportOptions.set(false); }
  toggleExportDropdown(e: Event) { e.stopPropagation(); this.showExportOptions.update(v => !v); this.showColumnSelector.set(false); }
  closeAllDropdowns()             { this.showColumnSelector.set(false); this.showExportOptions.set(false); }

  visualizar(item: any) {
    this.svc.getCarrete(item.id).subscribe({
      next: (detail) => this.viewingItem.set(detail),
      error: (err) => { console.error(err); alert('No se pudo cargar el detalle del carrete.'); }
    });
  }
  cerrarVisualizar() { this.viewingItem.set(null); }

  modificar(item: any) {
    this.saveError.set('');
    this.svc.getCarrete(item.id).subscribe({
      next: (detail) => { this.editingId = detail.id; this.editForm.set({ ...detail }); },
      error: (err) => { console.error(err); alert('No se pudo cargar el carrete para modificar.'); }
    });
  }

  cerrarModal() { this.editForm.set(null); this.editingId = null; this.saveError.set(''); }

  guardar() {
    const f = this.editForm();
    if (!f || !this.editingId) return;

    this.saving.set(true);
    this.saveError.set('');

    const request = {
      noLinea: f.noLinea,
      estado: Number(f.estado),
      molino: Number(f.molino),
      terminaPalet: f.terminaPalet,
      paletSerie: f.paletSerie,
      observaciones: f.observaciones
    };

    this.svc.updateCarrete(this.editingId, request).subscribe({
      next: () => { this.saving.set(false); this.cerrarModal(); this.load(); },
      error: (err) => { this.saving.set(false); this.saveError.set(err?.error?.message || 'Ocurrió un error al guardar.'); }
    });
  }

  eliminar(item: any) { this.itemToDelete.set(item); }
  cancelarEliminar() { this.itemToDelete.set(null); }

  confirmarEliminar() {
    const item = this.itemToDelete();
    if (!item) return;
    this.deleting.set(true);
    this.svc.deleteCarrete(item.id).subscribe({
      next: () => { this.deleting.set(false); this.itemToDelete.set(null); this.load(); },
      error: (err) => { this.deleting.set(false); console.error(err); alert('No se pudo eliminar el carrete.'); }
    });
  }

  exportCSV() {
    this.showExportOptions.set(false);
    let csv = '\uFEFF';
    const heads: string[] = [];
    if (this.isColVisible('noSerie')) heads.push('No. Serie');
    if (this.isColVisible('productoNombre')) heads.push('Producto');
    if (this.isColVisible('carreraNo')) heads.push('Carrera No.');
    if (this.isColVisible('noLinea')) heads.push('Línea');
    if (this.isColVisible('estado')) heads.push('Estado');
    if (this.isColVisible('paletSerie')) heads.push('Palet Serie');
    csv += heads.join(';') + '\n';
    this.filteredItems().forEach(item => {
      const row: string[] = [];
      if (this.isColVisible('noSerie')) row.push(item.noSerie || '');
      if (this.isColVisible('productoNombre')) row.push(item.productoNombre || '');
      if (this.isColVisible('carreraNo')) row.push(item.carreraNo?.toString() || '');
      if (this.isColVisible('noLinea')) row.push(item.noLinea?.toString() || '');
      if (this.isColVisible('estado')) row.push(this.getEstadoLabel(item.estado));
      if (this.isColVisible('paletSerie')) row.push(item.paletSerie || '');
      csv += row.join(';') + '\n';
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `carretes_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }

  exportPDF() {
    this.showExportOptions.set(false);
    const w = window.open('', '_blank');
    if (!w) return;
    let heads = '';
    if (this.isColVisible('noSerie')) heads += '<th>No. Serie</th>';
    if (this.isColVisible('productoNombre')) heads += '<th>Producto</th>';
    if (this.isColVisible('carreraNo')) heads += '<th>Carrera</th>';
    if (this.isColVisible('noLinea')) heads += '<th>Línea</th>';
    if (this.isColVisible('estado')) heads += '<th>Estado</th>';
    if (this.isColVisible('paletSerie')) heads += '<th>Palet Serie</th>';
    let rows = '';
    this.filteredItems().forEach(item => {
      rows += '<tr>';
      if (this.isColVisible('noSerie')) rows += `<td>${item.noSerie || ''}</td>`;
      if (this.isColVisible('productoNombre')) rows += `<td>${item.productoNombre || ''}</td>`;
      if (this.isColVisible('carreraNo')) rows += `<td>Carrera # ${item.carreraNo}</td>`;
      if (this.isColVisible('noLinea')) rows += `<td>Línea ${item.noLinea}</td>`;
      if (this.isColVisible('estado')) rows += `<td>${this.getEstadoLabel(item.estado)}</td>`;
      if (this.isColVisible('paletSerie')) rows += `<td>${item.paletSerie || ''}</td>`;
      rows += '</tr>';
    });
    w.document.write(`<html><head><title>Reporte Carretes</title>
      <style>body{font-family:sans-serif;padding:2rem}table{width:100%;border-collapse:collapse}th,td{padding:10px 14px;border:1px solid #e2e8f0;font-size:.85rem}th{background:#f1f5f9;font-weight:700}</style>
      </head><body><h2>Reporte de Carretes</h2><p>${new Date().toLocaleString()}</p>
      <table><thead><tr>${heads}</tr></thead><tbody>${rows}</tbody></table>
      <script>window.onload=()=>{window.print();window.close();}<\/script></body></html>`);
    w.document.close();
  }
}
