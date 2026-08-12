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
            <div class="export-dropdown-wrapper">
              <button class="btn-export-qa" (click)="toggleExportDropdown($event)" title="Exportar datos">
                📥 Exportar <span class="chevron-down-qa">▾</span>
              </button>
              @if (showExportOptions()) {
                <div class="export-popover-qa shadow-premium" (click)="$event.stopPropagation()">
                  <button class="export-item-qa" (click)="exportCSV()">
                    <span class="export-icon">📊</span> Excel (CSV)
                  </button>
                  <button class="export-item-qa" (click)="exportPDF()">
                    <span class="export-icon">📕</span> PDF
                  </button>
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
            <div class="filter-search-group-qa">
              <!-- Botón Filtro Avanzado -->
              <div class="dropdown-wrapper">
                <button class="btn-filter-funnel-qa" (click)="$event.stopPropagation(); toggleFilterMenu($event)" title="Filtros avanzados">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>
                  <span class="chevron-down-funnel">▾</span>
                </button>
                
                <!-- Filter Dropdown -->
                <div *ngIf="isFilterMenuOpen()" style="position: absolute; top: 100%; right: 0; background: white; border: 1px solid #e2e8f0; border-radius: 4px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); z-index: 99999; width: 210px; padding: 0.5rem;" (click)="$event.stopPropagation()">
                  <button (click)="clearFilters(); $event.stopPropagation()" style="display: block; width: 100%; text-align: left; padding: 0.5rem; border: none; background: none; cursor: pointer; color: #334155; font-size: 0.85rem;">Limpiar Filtros</button>
                  <button (click)="saveFilter(); $event.stopPropagation()" style="display: block; width: 100%; text-align: left; padding: 0.5rem; border: none; background: none; cursor: pointer; color: #334155; font-size: 0.85rem;">Guardar Filtro como...</button>
                  <div *ngIf="savedFilters.length > 0">
                    <div style="height: 1px; background: #e2e8f0; margin: 0.5rem 0;"></div>
                    <div style="font-size: 0.7rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; padding: 0.25rem 0.5rem;">Filtros Guardados</div>
                    <div *ngFor="let f of savedFilters" (click)="loadSavedFilter(f); $event.stopPropagation()" style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; font-size: 0.85rem; color: #334155; cursor: pointer;">
                      <span>📁 {{ f.name }}</span>
                      <span (click)="deleteSavedFilter(f, $event); $event.stopPropagation()" style="cursor: pointer; opacity: 0.6; padding: 2px;">🗑️</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Campo de Búsqueda Subrayado -->
              <div class="search-modern-underline-qa">
                <input type="text" placeholder="Buscar..." [ngModel]="searchText()" (ngModelChange)="onSearchChange($event)" />
              </div>
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
                <td class="col-acciones">
                  <a class="row-action" (click)="visualizar(item)">Visualizar</a>
                  <a class="row-action" (click)="modificar(item)">Modificar</a>
                  <a class="row-action row-action-danger" (click)="eliminar(item)">Eliminar</a>
                </td>
                @if (isColVisible('noSerie')) { <td class="col-nombre">{{ item.noSerie }}</td> }
                @if (isColVisible('productoNombre')) { <td>{{ item.productoNombre }}</td> }
                @if (isColVisible('prensaNombre')) { <td>{{ item.prensaNombre }}</td> }
                @if (isColVisible('operarioNombre')) { <td>{{ item.operarioNombre }}</td> }
                @if (isColVisible('totalCarretes')) { <td><strong>{{ item.totalCarretes }}</strong> / {{ item.capacidad }}</td> }
                @if (isColVisible('tipo')) { <td>{{ item.tipo === 1 ? 'Normal' : 'Externo' }}</td> }
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
                <td [attr.colspan]="visibleCount() + 1" class="empty-state">No se encontraron palets.</td>
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
              <h2>Detalle de Palet</h2>
              <button class="modal-close" (click)="cerrarVisualizar()"><svg class="close-icon-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            </div>
            <div class="modal-body">
              <div class="detail-grid">
                <div class="detail-item"><span class="d-label">No. Serie</span><span class="d-value">{{ v.noSerie }}</span></div>
                <div class="detail-item"><span class="d-label">Estatus</span><span class="d-value">{{ getEstatusLabel(v.estatus) }}</span></div>
                <div class="detail-item"><span class="d-label">Producto</span><span class="d-value">{{ v.productoNombre }}</span></div>
                <div class="detail-item"><span class="d-label">Tipo</span><span class="d-value">{{ v.tipo === 1 ? 'Normal' : 'Externo' }}</span></div>
                <div class="detail-item"><span class="d-label">Prensa</span><span class="d-value">{{ v.prensaNombre }}</span></div>
                <div class="detail-item"><span class="d-label">Operador</span><span class="d-value">{{ v.operarioNombre }}</span></div>
                <div class="detail-item"><span class="d-label">Carretes / Capacidad</span><span class="d-value">{{ v.totalCarretes }} / {{ v.capacidad }}</span></div>
                <div class="detail-item"><span class="d-label">Inicio Ensamble</span><span class="d-value">{{ v.horaInicioEnsamble | date:'dd/MM/yyyy HH:mm' }}</span></div>
                <div class="detail-item"><span class="d-label">Fin Ensamble</span><span class="d-value">{{ v.horaFinEnsamble ? (v.horaFinEnsamble | date:'dd/MM/yyyy HH:mm') : '—' }}</span></div>
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
              <h2>Modificar Palet</h2>
              <button class="modal-close" (click)="cerrarModal()"><svg class="close-icon-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            </div>
            <div class="modal-body">
              <div class="form-grid">
                <div class="form-field">
                  <label>Tipo</label>
                  <select [(ngModel)]="f.tipo">
                    <option [ngValue]="1">Normal</option>
                    <option [ngValue]="2">Externo</option>
                  </select>
                </div>
                <div class="form-field">
                  <label>Estatus</label>
                  <select [(ngModel)]="f.estatus">
                    <option [ngValue]="1">En Ensamble</option>
                    <option [ngValue]="2">Terminado</option>
                    <option [ngValue]="3">Embarcado</option>
                    <option [ngValue]="4">Rechazado</option>
                    <option [ngValue]="5">Aprobado</option>
                  </select>
                </div>
                <div class="form-field">
                  <label>Capacidad</label>
                  <input type="number" [(ngModel)]="f.capacidad" />
                </div>
                <div class="form-field">
                  <label>Total Carretes</label>
                  <input type="number" [(ngModel)]="f.totalCarretes" />
                </div>
                <div class="form-field">
                  <label>Producto</label>
                  <select [(ngModel)]="f.productoId">
                    <option [ngValue]="null">-- Sin producto --</option>
                    @for (p of productos(); track p.id) { <option [ngValue]="p.id">{{ p.nombre }}</option> }
                  </select>
                </div>
                <div class="form-field">
                  <label>Operador</label>
                  <select [(ngModel)]="f.operarioId">
                    <option [ngValue]="null">-- Sin operador --</option>
                    @for (o of operarios(); track o.id) { <option [ngValue]="o.id">{{ o.nombreCompleto }}</option> }
                  </select>
                </div>
                <div class="form-field">
                  <label>Prensa</label>
                  <select [(ngModel)]="f.prensaId">
                    <option [ngValue]="null">-- Sin prensa --</option>
                    @for (pr of prensas(); track pr.id) { <option [ngValue]="pr.id">{{ pr.nombre }}</option> }
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
              <h2>Eliminar Palet</h2>
              <button class="modal-close" (click)="cancelarEliminar()"><svg class="close-icon-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            </div>
            <div class="modal-body">
              <p>¿Está seguro de que desea eliminar el palet <strong>{{ del.noSerie }}</strong>? Esta acción no se puede deshacer.</p>
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
    .status-2 { background:#ecfdf5; color:#059669; } /* Terminado */
    .status-3 { background:#eff6ff; color:#2563eb; } /* Embarcado */
    .status-4 { background:#fef2f2; color:#dc2626; } /* Rechazado */
    .status-5 { background:#f0fdf4; color:#16a34a; } /* Aprobado */

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
export class PaletsListComponent implements OnInit {
  private svc = inject(ProduccionService);

  viewingItem = signal<any | null>(null);
  editForm = signal<any | null>(null);
  editingId: string | null = null;
  saving = signal(false);
  saveError = signal('');
  itemToDelete = signal<any | null>(null);
  deleting = signal(false);

  productos = signal<any[]>([]);
  operarios = signal<any[]>([]);
  prensas = signal<any[]>([]);

  items = signal<any[]>([]);
  searchText = signal('');
  currentPage = signal(1);
  pageSize = signal(10);

  onSearchChange(value: string) {
    this.searchText.set(value);
    this.currentPage.set(1);
  }

  showColumnSelector = signal(false);
  showExportOptions = signal(false);
  isFilterMenuOpen = signal(false);
  savedFilters: any[] = [];

  visibleColumns = signal<string[]>(['noSerie', 'productoNombre', 'prensaNombre', 'operarioNombre', 'totalCarretes', 'tipo', 'estatus']);

  ngOnInit() {
    this.loadSavedFiltersFromStorage();
    this.load();
    this.svc.getProductos().subscribe({ next: (data) => this.productos.set(data), error: (err) => console.error(err) });
    this.svc.getOperarios().subscribe({ next: (data) => this.operarios.set(data), error: (err) => console.error(err) });
    this.svc.getPrensas().subscribe({ next: (data) => this.prensas.set(data), error: (err) => console.error(err) });
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
      case 2: return 'Terminado';
      case 3: return 'Embarcado';
      case 4: return 'Rechazado';
      case 5: return 'Aprobado';
      default: return 'Desconocido';
    }
  }

  toggleColumnDropdown(e: Event) {
    e.stopPropagation();
    this.showColumnSelector.update(v => !v);
    this.showExportOptions.set(false);
    this.isFilterMenuOpen.set(false);
  }

  toggleExportDropdown(e: Event) {
    e.stopPropagation();
    this.showExportOptions.update(v => !v);
    this.showColumnSelector.set(false);
    this.isFilterMenuOpen.set(false);
  }

  toggleFilterMenu(e: Event) {
    e.stopPropagation();
    this.showColumnSelector.set(false);
    this.showExportOptions.set(false);
    this.isFilterMenuOpen.update(v => !v);
  }

  closeAllDropdowns() {
    this.showColumnSelector.set(false);
    this.showExportOptions.set(false);
    this.isFilterMenuOpen.set(false);
  }

  visualizar(item: any) {
    this.svc.getPalet(item.id).subscribe({
      next: (detail) => this.viewingItem.set(detail),
      error: (err) => { console.error(err); alert('No se pudo cargar el detalle del palet.'); }
    });
  }
  cerrarVisualizar() { this.viewingItem.set(null); }

  modificar(item: any) {
    this.saveError.set('');
    this.svc.getPalet(item.id).subscribe({
      next: (detail) => { this.editingId = detail.id; this.editForm.set({ ...detail }); },
      error: (err) => { console.error(err); alert('No se pudo cargar el palet para modificar.'); }
    });
  }

  cerrarModal() { this.editForm.set(null); this.editingId = null; this.saveError.set(''); }

  guardar() {
    const f = this.editForm();
    if (!f || !this.editingId) return;

    this.saving.set(true);
    this.saveError.set('');

    const request = {
      tipo: Number(f.tipo),
      estatus: Number(f.estatus),
      capacidad: f.capacidad,
      totalCarretes: f.totalCarretes,
      productoId: f.productoId || null,
      operarioId: f.operarioId || null,
      prensaId: f.prensaId || null
    };

    this.svc.updatePalet(this.editingId, request).subscribe({
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
    this.svc.deletePalet(item.id).subscribe({
      next: () => { this.deleting.set(false); this.itemToDelete.set(null); this.load(); },
      error: (err) => { this.deleting.set(false); console.error(err); alert('No se pudo eliminar el palet.'); }
    });
  }

  loadSavedFiltersFromStorage() {
    const raw = localStorage.getItem('hicone_saved_filters_palets');
    this.savedFilters = raw ? JSON.parse(raw) : [];
  }

  clearFilters() {
    this.searchText.set('');
    this.isFilterMenuOpen.set(false);
  }

  saveFilter() {
    this.isFilterMenuOpen.set(false);
    const filterName = prompt('Ingrese el nombre para este filtro:', 'Filtro Palets ' + new Date().toLocaleDateString());
    if (!filterName) return;
    const newFilter = {
      id: 'F-' + Date.now(),
      name: filterName,
      state: { searchText: this.searchText() }
    };
    this.savedFilters.push(newFilter);
    localStorage.setItem('hicone_saved_filters_palets', JSON.stringify(this.savedFilters));
    alert('Filtro guardado con éxito.');
  }

  loadSavedFilter(f: any) {
    this.searchText.set(f.state?.searchText || '');
    this.currentPage.set(1);
    this.isFilterMenuOpen.set(false);
  }

  deleteSavedFilter(f: any, event: MouseEvent) {
    event.stopPropagation();
    this.savedFilters = this.savedFilters.filter(item => item.id !== f.id);
    localStorage.setItem('hicone_saved_filters_palets', JSON.stringify(this.savedFilters));
  }

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
      if (this.isColVisible('tipo')) row.push(item.tipo === 1 ? 'Normal' : 'Externo');
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
      if (this.isColVisible('tipo')) rows += `<td>${item.tipo === 1 ? 'Normal' : 'Externo'}</td>`;
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
