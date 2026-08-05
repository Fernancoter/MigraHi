import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduccionService } from '../../../../core/services/produccion';

const ALL_COLUMNS = ['terminadoPalets', 'carreteMiliar', 'paletMiliar', 'terminadoPeso', 'pesoCarrete', 'pesoPalet', 'conEtiqueta', 'etiquetable', 'producto', 'codigoSap', 'mrd'];

@Component({
  selector: 'app-producto-terminado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up" (click)="closeAllDropdowns()">

      <div class="page-header-premium">
        <div class="title-section">
          <h1 class="premium-title">Producto Terminado</h1>
          <nav class="breadcrumb-modern">
            <span class="root">Prensado</span>
            <span class="sep">&rsaquo;</span>
            <span class="active">Producto Terminado</span>
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
              </div>
            }
          </div>

          <button class="btn btn-primary" (click)="abrirAgregar()">+ Agregar</button>

          <div class="dropdown-wrapper">
            <button class="btn btn-secondary btn-cols" (click)="toggleColumnDropdown($event)">
              <svg class="btn-icon-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg> Selecciona columnas ▾
            </button>
            @if (showColumnSelector()) {
              <div class="col-sel-popover animate-slide-up" (click)="$event.stopPropagation()">
                <div class="col-subitem"><label><input type="checkbox" [checked]="isColVisible('terminadoPalets')" (change)="toggleCol('terminadoPalets')" /> Terminado Palets</label></div>
                <div class="col-subitem"><label><input type="checkbox" [checked]="isColVisible('carreteMiliar')" (change)="toggleCol('carreteMiliar')" /> Carrete Millar</label></div>
                <div class="col-subitem"><label><input type="checkbox" [checked]="isColVisible('paletMiliar')" (change)="toggleCol('paletMiliar')" /> Palet Millar</label></div>
                <div class="col-subitem"><label><input type="checkbox" [checked]="isColVisible('terminadoPeso')" (change)="toggleCol('terminadoPeso')" /> Terminado Peso</label></div>
                <div class="col-subitem"><label><input type="checkbox" [checked]="isColVisible('pesoCarrete')" (change)="toggleCol('pesoCarrete')" /> Peso Carrete</label></div>
                <div class="col-subitem"><label><input type="checkbox" [checked]="isColVisible('pesoPalet')" (change)="toggleCol('pesoPalet')" /> Peso Palet</label></div>
                <div class="col-subitem"><label><input type="checkbox" [checked]="isColVisible('conEtiqueta')" (change)="toggleCol('conEtiqueta')" /> Con Etiqueta</label></div>
                <div class="col-subitem"><label><input type="checkbox" [checked]="isColVisible('etiquetable')" (change)="toggleCol('etiquetable')" /> Etiquetable</label></div>
                <div class="col-subitem"><label><input type="checkbox" [checked]="isColVisible('producto')" (change)="toggleCol('producto')" /> Producto</label></div>
                <div class="col-subitem"><label><input type="checkbox" [checked]="isColVisible('codigoSap')" (change)="toggleCol('codigoSap')" /> Código SAP</label></div>
                <div class="col-subitem"><label><input type="checkbox" [checked]="isColVisible('mrd')" (change)="toggleCol('mrd')" /> MRD</label></div>
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

      <div class="content-card">
        <table class="data-table">
          <thead>
            <tr>
              <th class="col-acciones">Acciones</th>
              @if (isColVisible('terminadoPalets')) { <th>Terminado Palets</th> }
              @if (isColVisible('carreteMiliar')) { <th>Carrete Millar</th> }
              @if (isColVisible('paletMiliar')) { <th>Palet Millar</th> }
              @if (isColVisible('terminadoPeso')) { <th>Terminado Peso</th> }
              @if (isColVisible('pesoCarrete')) { <th>Peso Carrete</th> }
              @if (isColVisible('pesoPalet')) { <th>Peso Palet</th> }
              @if (isColVisible('conEtiqueta')) { <th>Con Etiqueta</th> }
              @if (isColVisible('etiquetable')) { <th>Etiquetable</th> }
              @if (isColVisible('producto')) { <th>Producto</th> }
              @if (isColVisible('codigoSap')) { <th>Código SAP</th> }
              @if (isColVisible('mrd')) { <th>MRD</th> }
            </tr>
          </thead>
          <tbody>
            @if (isLoading()) {
              <tr><td [attr.colspan]="visibleCount() + 1" class="empty-state">Cargando...</td></tr>
            } @else {
              @for (item of paginatedItems(); track item.id) {
                <tr>
                  <td class="col-acciones">
                    <a class="row-action" (click)="visualizar(item)">Visualizar</a>
                    <a class="row-action" (click)="modificar(item)">Modificar</a>
                    <a class="row-action row-action-danger" (click)="eliminar(item)">Eliminar</a>
                  </td>
                  @if (isColVisible('terminadoPalets')) { <td>{{ item.terminadoPalets }}</td> }
                  @if (isColVisible('carreteMiliar')) { <td>{{ item.carreteMiliar }}</td> }
                  @if (isColVisible('paletMiliar')) { <td>{{ item.paletMiliar }}</td> }
                  @if (isColVisible('terminadoPeso')) { <td>{{ item.terminadoPeso }}</td> }
                  @if (isColVisible('pesoCarrete')) { <td>{{ item.pesoCarrete }}</td> }
                  @if (isColVisible('pesoPalet')) { <td>{{ item.pesoPalet }}</td> }
                  @if (isColVisible('conEtiqueta')) { <td>{{ item.conEtiqueta ? 'Sí' : 'No' }}</td> }
                  @if (isColVisible('etiquetable')) { <td>{{ item.etiquetable ? 'Sí' : 'No' }}</td> }
                  @if (isColVisible('producto')) { <td class="col-nombre">{{ item.producto }}</td> }
                  @if (isColVisible('codigoSap')) { <td>{{ item.codigoSap }}</td> }
                  @if (isColVisible('mrd')) { <td>{{ item.mrd }}</td> }
                </tr>
              }
              @if (paginatedItems().length === 0) {
                <tr><td [attr.colspan]="visibleCount() + 1" class="empty-state">No se encontraron registros.</td></tr>
              }
            }
          </tbody>
        </table>
      </div>

      @if (filteredItems().length > 0) {
        <div class="pagination-container">
          <span class="pagination-label">Página {{ currentPage() }} de {{ totalPages() }}</span>
          <div class="pagination-buttons">
            <button class="pag-btn" [disabled]="currentPage() === 1" (click)="prevPage()">&laquo;</button>
            @for (p of getPages(currentPage(), totalPages()); track p) {
              @if (p === '...') { <span class="pag-dots">...</span> }
              @else { <button class="pag-btn" [class.active]="currentPage() === p" (click)="setPage(p)">{{ p }}</button> }
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
              <h2>Detalle Producto Terminado</h2>
              <button class="modal-close" (click)="cerrarVisualizar()"><svg class="close-icon-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            </div>
            <div class="modal-body">
              <div class="detail-grid">
                <div class="detail-item"><span class="d-label">Producto</span><span class="d-value">{{ v.producto || '—' }}</span></div>
                <div class="detail-item"><span class="d-label">Código SAP</span><span class="d-value">{{ v.codigoSap || '—' }}</span></div>
                <div class="detail-item"><span class="d-label">Terminado Palets</span><span class="d-value">{{ v.terminadoPalets }}</span></div>
                <div class="detail-item"><span class="d-label">Terminado Peso</span><span class="d-value">{{ v.terminadoPeso }}</span></div>
                <div class="detail-item"><span class="d-label">Carrete Millar / Palet Millar</span><span class="d-value">{{ v.carreteMiliar }} / {{ v.paletMiliar }}</span></div>
                <div class="detail-item"><span class="d-label">Peso Carrete / Peso Palet</span><span class="d-value">{{ v.pesoCarrete }} / {{ v.pesoPalet }}</span></div>
                <div class="detail-item"><span class="d-label">Con Etiqueta</span><span class="d-value">{{ v.conEtiqueta ? 'Sí' : 'No' }}</span></div>
                <div class="detail-item"><span class="d-label">Etiquetable</span><span class="d-value">{{ v.etiquetable ? 'Sí' : 'No' }}</span></div>
                <div class="detail-item"><span class="d-label">MRD</span><span class="d-value">{{ v.mrd }}</span></div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" (click)="cerrarVisualizar()">Cerrar</button>
            </div>
          </div>
        </div>
      }

      <!-- Modal Agregar/Modificar -->
      @if (editForm(); as f) {
        <div class="modal-overlay" (click)="cerrarModal()">
          <div class="modal-card" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h2>{{ editingId ? 'Modificar' : 'Agregar' }} Producto Terminado</h2>
              <button class="modal-close" (click)="cerrarModal()"><svg class="close-icon-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            </div>
            <div class="modal-body">
              <div class="form-grid">
                <div class="form-field" style="grid-column: 1 / -1;">
                  <label>Producto</label>
                  <input type="text" [(ngModel)]="f.producto" placeholder="Código o descripción del producto" />
                </div>
                <div class="form-field">
                  <label>Código SAP</label>
                  <input type="text" [(ngModel)]="f.codigoSap" />
                </div>
                <div class="form-field">
                  <label>MRD</label>
                  <input type="number" [(ngModel)]="f.mrd" />
                </div>
                <div class="form-field">
                  <label>Terminado Palets</label>
                  <input type="number" [(ngModel)]="f.terminadoPalets" />
                </div>
                <div class="form-field">
                  <label>Terminado Peso</label>
                  <input type="number" [(ngModel)]="f.terminadoPeso" />
                </div>
                <div class="form-field">
                  <label>Carrete Millar</label>
                  <input type="number" [(ngModel)]="f.carreteMiliar" />
                </div>
                <div class="form-field">
                  <label>Palet Millar</label>
                  <input type="number" [(ngModel)]="f.paletMiliar" />
                </div>
                <div class="form-field">
                  <label>Peso Carrete</label>
                  <input type="number" [(ngModel)]="f.pesoCarrete" />
                </div>
                <div class="form-field">
                  <label>Peso Palet</label>
                  <input type="number" [(ngModel)]="f.pesoPalet" />
                </div>
                <div class="form-field">
                  <label>Con Etiqueta</label>
                  <select [(ngModel)]="f.conEtiqueta">
                    <option [ngValue]="true">Sí</option>
                    <option [ngValue]="false">No</option>
                  </select>
                </div>
                <div class="form-field">
                  <label>Etiquetable</label>
                  <select [(ngModel)]="f.etiquetable">
                    <option [ngValue]="true">Sí</option>
                    <option [ngValue]="false">No</option>
                  </select>
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
              <h2>Eliminar Producto Terminado</h2>
              <button class="modal-close" (click)="cancelarEliminar()"><svg class="close-icon-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            </div>
            <div class="modal-body">
              <p>¿Está seguro de que desea eliminar <strong>{{ del.producto || 'este registro' }}</strong>? Esta acción no se puede deshacer.</p>
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
    h1           { font-size:1.75rem; font-weight:800; color:#1e293b; margin:0 0 .25rem; }
    .actions-toolbar { display:flex; width:100%; align-items:center; gap:.5rem; }
    .toolbar-left    { display:flex; gap:.6rem; align-items:center; }
    .toolbar-right   { display:flex; gap:.6rem; align-items:center; }

    .btn { padding:.52rem 1.1rem; border-radius:7px; border:none; cursor:pointer; font-size:.82rem; font-weight:700; transition:all .18s; display:flex; align-items:center; gap:.35rem; }
    .btn-primary   { background:#3faa5a; color:#fff; }
    .btn-primary:disabled { opacity:.6; cursor:not-allowed; }
    .btn-secondary { background:#fff; color:#475569; border:1px solid #e2e8f0; }
    .btn-secondary:hover { background:#f8fafc; border-color:#cbd5e1; }
    .btn-danger { background:#dc2626; color:#fff; }
    .btn-danger:disabled { opacity:.6; cursor:not-allowed; }
    .btn-cols { font-size:.78rem; padding:.48rem .9rem; }

    .search-box   { position:relative; }
    .search-icon  { position:absolute; left:.7rem; top:50%; transform:translateY(-50%); color:#94a3b8; }
    .search-input { padding:.48rem .75rem .48rem 2rem; border:1px solid #e2e8f0; border-radius:7px; font-size:.82rem; outline:none; width:200px; color:#334155; }
    .search-input:focus { border-color:#3faa5a; box-shadow:0 0 0 3px rgba(63,170,90,.12); }

    .dropdown-wrapper { position:relative; }
    .dd-popover  { position:absolute; left:0; top:110%; background:#fff; border:1px solid #e2e8f0; border-radius:10px; box-shadow:0 8px 20px rgba(0,0,0,.1); z-index:200; min-width:140px; overflow:hidden; }
    .dd-item     { padding:.6rem 1rem; font-size:.82rem; font-weight:600; color:#334155; cursor:pointer; }
    .dd-item:hover { background:#f1f5f9; }

    .col-sel-popover { position:absolute; left:0; top:110%; background:#fff; border:1px solid #e2e8f0; border-radius:10px; box-shadow:0 8px 24px rgba(0,0,0,.12); z-index:200; width:220px; padding:.75rem; max-height:320px; overflow-y:auto; }
    .col-subitem { display:flex; flex-direction:column; gap:.2rem; }
    .col-subitem label { display:flex; align-items:center; gap:.4rem; font-size:.8rem; color:#475569; cursor:pointer; padding:.15rem 0; }

    .content-card { background:#fff; border-radius:12px; border:1px solid #e2e8f0; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,.04); margin-top:1rem; overflow-x:auto; }
    .data-table   { width:100%; border-collapse:collapse; }
    .data-table th { text-align:left; padding:.85rem 1rem; background:#f8fafc; color:#64748b; font-size:.72rem; font-weight:800; text-transform:uppercase; letter-spacing:.04em; border-bottom:1px solid #e2e8f0; white-space:nowrap; }
    .data-table td { padding:.78rem 1rem; border-bottom:1px solid #f1f5f9; font-size:.83rem; color:#334155; white-space:nowrap; }
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

    .modal-overlay { position:fixed; inset:0; background:rgba(15,23,42,.55); display:flex; align-items:center; justify-content:center; z-index:500; padding:1.5rem; }
    .modal-card { background:#fff; border-radius:12px; width:100%; max-width:620px; max-height:88vh; display:flex; flex-direction:column; box-shadow:0 20px 50px rgba(0,0,0,.25); }
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
export class ProductoTerminadoComponent implements OnInit {
  private svc = inject(ProduccionService);

  items = signal<any[]>([]);
  isLoading = signal(false);
  searchText = signal('');
  currentPage = signal(1);
  pageSize = signal(10);

  showColumnSelector = signal(false);
  showExportOptions = signal(false);
  visibleColumns = signal<string[]>([...ALL_COLUMNS]);

  viewingItem = signal<any | null>(null);

  editForm = signal<any | null>(null);
  editingId: string | null = null;
  saving = signal(false);
  saveError = signal('');

  itemToDelete = signal<any | null>(null);
  deleting = signal(false);

  ngOnInit() {
    this.load();
  }

  load() {
    this.isLoading.set(true);
    this.svc.getProductosTerminados().subscribe({
      next: (data) => { this.items.set(data); this.isLoading.set(false); },
      error: (err) => { console.error(err); this.isLoading.set(false); }
    });
  }

  filteredItems = computed(() => {
    const s = this.searchText().trim().toLowerCase();
    return s ? this.items().filter(item =>
      item.producto?.toLowerCase().includes(s) ||
      item.codigoSap?.toLowerCase().includes(s)
    ) : this.items();
  });

  paginatedItems = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredItems().slice(start, start + this.pageSize());
  });

  totalPages = computed(() => Math.ceil(this.filteredItems().length / this.pageSize()) || 1);
  visibleCount = computed(() => this.visibleColumns().length);

  isColVisible(col: string) { return this.visibleColumns().includes(col); }
  toggleCol(col: string) {
    this.visibleColumns.update(cols => cols.includes(col) ? cols.filter(c => c !== col) : [...cols, col]);
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

  toggleColumnDropdown(e: Event) { e.stopPropagation(); this.showColumnSelector.update(v => !v); this.showExportOptions.set(false); }
  toggleExportDropdown(e: Event) { e.stopPropagation(); this.showExportOptions.update(v => !v); this.showColumnSelector.set(false); }
  closeAllDropdowns() { this.showColumnSelector.set(false); this.showExportOptions.set(false); }

  visualizar(item: any) {
    this.svc.getProductoTerminado(item.id).subscribe({
      next: (detail) => this.viewingItem.set(detail),
      error: (err) => { console.error(err); alert('No se pudo cargar el detalle.'); }
    });
  }
  cerrarVisualizar() { this.viewingItem.set(null); }

  abrirAgregar() {
    this.editingId = null;
    this.saveError.set('');
    this.editForm.set({
      producto: '', codigoSap: '',
      terminadoPalets: 0, terminadoPeso: 0,
      carreteMiliar: 0, paletMiliar: 0,
      pesoCarrete: 0, pesoPalet: 0,
      conEtiqueta: false, etiquetable: true,
      mrd: 0
    });
  }

  modificar(item: any) {
    this.saveError.set('');
    this.svc.getProductoTerminado(item.id).subscribe({
      next: (detail) => { this.editingId = detail.id; this.editForm.set({ ...detail }); },
      error: (err) => { console.error(err); alert('No se pudo cargar el registro.'); }
    });
  }

  cerrarModal() { this.editForm.set(null); this.editingId = null; this.saveError.set(''); }

  guardar() {
    const f = this.editForm();
    if (!f) return;

    this.saving.set(true);
    this.saveError.set('');

    const request = {
      producto: f.producto,
      codigoSap: f.codigoSap,
      terminadoPalets: f.terminadoPalets,
      terminadoPeso: f.terminadoPeso,
      carreteMiliar: f.carreteMiliar,
      paletMiliar: f.paletMiliar,
      pesoCarrete: f.pesoCarrete,
      pesoPalet: f.pesoPalet,
      conEtiqueta: f.conEtiqueta,
      etiquetable: f.etiquetable,
      mrd: f.mrd,
      tenantId: '00000000-0000-0000-0000-000000000001'
    };

    const done = () => { this.saving.set(false); this.cerrarModal(); this.load(); };
    const onError = (err: any) => { this.saving.set(false); this.saveError.set(err?.error?.message || 'Ocurrió un error al guardar.'); };

    if (this.editingId) {
      this.svc.updateProductoTerminado(this.editingId, request).subscribe({ next: done, error: onError });
    } else {
      this.svc.createProductoTerminado(request).subscribe({ next: done, error: onError });
    }
  }

  eliminar(item: any) { this.itemToDelete.set(item); }
  cancelarEliminar() { this.itemToDelete.set(null); }

  confirmarEliminar() {
    const item = this.itemToDelete();
    if (!item) return;
    this.deleting.set(true);
    this.svc.deleteProductoTerminado(item.id).subscribe({
      next: () => { this.deleting.set(false); this.itemToDelete.set(null); this.load(); },
      error: (err) => { this.deleting.set(false); console.error(err); alert('No se pudo eliminar el registro.'); }
    });
  }

  exportCSV() {
    this.showExportOptions.set(false);
    let csv = '﻿Producto;Código SAP;Terminado Palets;Terminado Peso;Carrete Millar;Palet Millar;Peso Carrete;Peso Palet;Con Etiqueta;Etiquetable;MRD\n';
    this.filteredItems().forEach(item => {
      csv += [
        item.producto, item.codigoSap, item.terminadoPalets, item.terminadoPeso,
        item.carreteMiliar, item.paletMiliar, item.pesoCarrete, item.pesoPalet,
        item.conEtiqueta ? 'Sí' : 'No', item.etiquetable ? 'Sí' : 'No', item.mrd
      ].join(';') + '\n';
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `producto_terminado_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }
}
