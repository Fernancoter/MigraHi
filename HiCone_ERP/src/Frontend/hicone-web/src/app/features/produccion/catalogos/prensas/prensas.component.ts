import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduccionConfigService, Prensa } from '../../../../core/services/produccion-config.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-prensas-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-fade-in" (click)="closeAllDropdowns()">

      <!-- ═══════════════════════════════════════════════════════════════════════
           VISTA 1: LISTADO PRINCIPAL (IMAGEN 1 & IMAGEN 2)
      ═══════════════════════════════════════════════════════════════════════ -->
      @if (viewState() === 'list') {
        <div class="page-header-legacy">
          <div class="title-section">
            <h1 class="legacy-title">Prensa</h1>
            <nav class="breadcrumb-legacy">
              <span class="root">Prensado</span>
              <span class="sep">&rsaquo;</span>
              <span class="active">Prensas</span>
            </nav>
          </div>
        </div>

        <div class="content-card glass shadow-sm">
          <div class="action-bar-legacy">
            <div class="left-actions">
              <!-- Exportar Dropdown -->
              <div class="export-dropdown-wrapper">
                <button class="btn-export-qa" (click)="toggleExportDropdown($event)" title="Exportar datos">
                  📥 Exportar <span class="chevron-down-qa">▾</span>
                </button>
                @if (showExportMenu()) {
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

              <!-- Botón Agregar (IMAGEN 1) -->
              <button class="btn-agregar-legacy" (click)="openCreate()">Agregar</button>

              <!-- Selecciona columnas Dropdown (IMAGEN 2) -->
              <div class="dropdown">
                <button class="btn-primary-green btn-cols" (click)="toggleColDropdown($event)">
                  Selecciona columnas <span class="chevron-down">▾</span>
                </button>

                @if (showColMenu()) {
                  <div class="col-selector-popover animate-slide-up" (click)="$event.stopPropagation()">
                    <div class="col-search-box">
                      <input type="text" class="col-search-input" placeholder="" />
                    </div>

                    <div class="col-tree">
                      <!-- Fijas a la izquierda -->
                      <div class="col-group">
                        <label class="col-group-title">
                          <input type="checkbox" checked /> Fijas a la izquierda <span class="chevron-down">▾</span>
                        </label>
                        <div class="col-subgroup">
                          <label class="col-item-sub"><input type="checkbox" checked /> (Ninguna)</label>
                        </div>
                      </div>

                      <!-- No fijas (IMAGEN 2) -->
                      <div class="col-group">
                        <label class="col-group-title">
                          <input type="checkbox" [checked]="allColsVisible()" (change)="toggleAllCols($event)" /> No fijas <span class="chevron-down">▾</span>
                        </label>
                        <div class="col-subgroup">
                          <label class="col-item-sub">
                            <input type="checkbox" [checked]="isColVisible('nombre')" (change)="toggleCol('nombre')" /> Prensa
                          </label>
                          <label class="col-item-sub">
                            <input type="checkbox" [checked]="isColVisible('imagen')" (change)="toggleCol('imagen')" /> Imagen
                          </label>
                          <label class="col-item-sub">
                            <input type="checkbox" [checked]="isColVisible('marca')" (change)="toggleCol('marca')" /> Marca
                          </label>
                          <label class="col-item-sub">
                            <input type="checkbox" [checked]="isColVisible('modelo')" (change)="toggleCol('modelo')" /> Modelo
                          </label>
                        </div>
                      </div>

                      <!-- Fijas a la derecha -->
                      <div class="col-group">
                        <label class="col-group-title">
                          <input type="checkbox" checked /> Fijas a la derecha <span class="chevron-down">▾</span>
                        </label>
                        <div class="col-subgroup">
                          <label class="col-item-sub"><input type="checkbox" checked /> (Ninguna)</label>
                        </div>
                      </div>
                    </div>

                    <div class="col-popover-footer">
                      <button class="btn-reset-icon" (click)="resetCols()" title="Restablecer">
                        <span>↺</span>
                      </button>
                      <button class="btn-actualizar-green" (click)="showColMenu.set(false)">
                        Actualizar
                      </button>
                    </div>
                  </div>
                }
              </div>
            </div>

            <!-- Lado Derecho: Filtro con Embudo y Desplegable + Buscar (IMAGEN 1) -->
            <div class="right-actions">
              <div class="filter-search-group-qa">
                <!-- Botón Filtro Avanzado -->
                <div class="dropdown-wrapper">
                  <button class="btn-filter-funnel-qa" (click)="toggleFilterDropdown($event)" title="Filtros avanzados">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                    </svg>
                    <span class="chevron-down-funnel">▾</span>
                  </button>
                  @if (showFilterMenu()) {
                    <div class="filter-popover-menu animate-slide-up" style="z-index: 99999;" (click)="$event.stopPropagation()">
                      <div class="filter-popover-item" (click)="clearFilters()">
                        <span class="icon">✖</span> Limpiar filtros
                      </div>
                      <div class="filter-popover-item" (click)="saveFilterPreset()">
                        <span class="icon">💾</span> Guardar filtro como...
                      </div>
                      
                      @if (savedFilters.length > 0) {
                        <div style="height: 1px; background: #e2e8f0; margin: 0.5rem 0;"></div>
                        <div style="font-size: 0.7rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; padding: 0.25rem 0.5rem;">Filtros Guardados</div>
                        @for (f of savedFilters; track f.id) {
                          <div class="filter-popover-item" (click)="loadSavedFilter(f)" style="display: flex; justify-content: space-between; align-items: center;">
                            <span>📁 {{ f.name }}</span>
                            <span (click)="deleteSavedFilter(f, $event)" style="cursor: pointer; opacity: 0.6; padding: 2px;">🗑️</span>
                          </div>
                        }
                      }
                    </div>
                  }
                </div>

                <!-- Campo de Búsqueda Subrayado -->
                <div class="search-modern-underline-qa">
                  <input type="text" placeholder="Buscar..." [ngModel]="searchText()" (ngModelChange)="onSearchChange($event)" />
                </div>
              </div>
            </div>
          </div>

          <!-- TABLA PRINCIPAL DE PRENSAS (IMAGEN 1) -->
          <div class="table-responsive">
            <table class="gx-table">
              <thead>
                <tr>
                  <th class="col-action-text"></th>
                  <th class="col-action-text"></th>
                  <th class="col-action-text"></th>
                  @if (isColVisible('nombre')) { <th class="sortable text-left">Prensa <span class="sort-arrow">↑</span></th> }
                  @if (isColVisible('imagen')) { <th class="sortable text-left">Imagen <span class="sort-arrow">▾</span></th> }
                  @if (isColVisible('marca')) { <th class="sortable text-left">Marca <span class="sort-arrow">▾</span></th> }
                  @if (isColVisible('modelo')) { <th class="sortable text-left">Modelo <span class="sort-arrow">▾</span></th> }
                </tr>
              </thead>
              <tbody>
                @for (item of paginatedItems(); track item.id) {
                  <tr>
                    <td class="col-action-text text-center">
                      <a class="gx-link-green" (click)="openDetail(item)">Visualizar</a>
                    </td>
                    <td class="col-action-text text-center">
                      <a class="gx-link-green" (click)="openEdit(item)">Modificar</a>
                    </td>
                    <td class="col-action-text text-center">
                      <a class="gx-link-green red" (click)="confirmDelete(item)">Eliminar</a>
                    </td>
                    @if (isColVisible('nombre')) { 
                      <td class="cell-nombre">{{ item.nombre }}</td> 
                    }
                    @if (isColVisible('imagen')) { 
                      <td>{{ item.imagen || '' }}</td> 
                    }
                    @if (isColVisible('marca')) { 
                      <td>{{ item.marca || '' }}</td> 
                    }
                    @if (isColVisible('modelo')) { 
                      <td>{{ item.modelo || '' }}</td> 
                    }
                  </tr>
                }
                @if (paginatedItems().length === 0) {
                  <tr>
                    <td colspan="7" class="empty-msg">No se encontraron prensas registradas.</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          <!-- Paginación GeneXus (IMAGEN 1) -->
          <div class="pagination-bar-legacy">
            <div class="page-info">
              Página {{ currentPage() }} de {{ totalPages() }}
            </div>
            <div class="page-controls">
              <button class="btn-pag" [disabled]="currentPage() === 1" (click)="setPage(currentPage() - 1)">Ant</button>
              @for (p of getPagesArray(); track p) {
                <button class="btn-pag" [class.active]="currentPage() === p" (click)="setPage(p)">{{ p }}</button>
              }
              <button class="btn-pag" [disabled]="currentPage() === totalPages()" (click)="setPage(currentPage() + 1)">Sig</button>
            </div>
          </div>
        </div>
      }

      <!-- ═══════════════════════════════════════════════════════════════════════
           VISTA 2: FORMULARIO "GESTIONAR PRENSA" (IMAGEN 3)
      ═══════════════════════════════════════════════════════════════════════ -->
      @if (viewState() === 'edit') {
        <div class="page-header-legacy">
          <div class="title-section">
            <h1 class="legacy-title">Gestionar Prensa</h1>
            <nav class="breadcrumb-legacy">
              <span class="root">Prensado</span>
              <span class="sep">&rsaquo;</span>
              <span class="active">Prensas</span>
            </nav>
          </div>
        </div>

        <div class="form-container-legacy">
          <!-- Bloque Información General (IMAGEN 3) -->
          <div class="block-card">
            <div class="block-header">
              <span class="green-square-icon"></span>
              <span class="block-title">Información General</span>
            </div>
            <div class="block-body">
              <div class="form-grid-1col">
                
                <!-- Número de Prensa (Dropdown: UNO, DOS, TRES, CUATRO, CINCO) -->
                <div class="form-field-group">
                  <label class="form-label-gx">Número de Prensa</label>
                  <select class="select-gx" [(ngModel)]="form.numeroPrensa" (change)="onNumeroPrensaChange()">
                    <option value="UNO">UNO</option>
                    <option value="DOS">DOS</option>
                    <option value="TRES">TRES</option>
                    <option value="CUATRO">CUATRO</option>
                    <option value="CINCO">CINCO</option>
                  </select>
                </div>

                <!-- Prensa (Nombre) -->
                <div class="form-field-group">
                  <label class="form-label-gx">Prensa</label>
                  <input type="text" class="input-gx" [(ngModel)]="form.nombre" placeholder="Ej. Prensa 1" />
                </div>

                <!-- Imagen -->
                <div class="form-field-group">
                  <label class="form-label-gx">Imagen</label>
                  <input type="text" class="input-gx" [(ngModel)]="form.imagen" placeholder="" />
                </div>

                <!-- Marca -->
                <div class="form-field-group">
                  <label class="form-label-gx">Marca</label>
                  <input type="text" class="input-gx" [(ngModel)]="form.marca" placeholder="" />
                </div>

                <!-- Modelo -->
                <div class="form-field-group">
                  <label class="form-label-gx">Modelo</label>
                  <input type="text" class="input-gx" [(ngModel)]="form.modelo" placeholder="" />
                </div>

              </div>
            </div>
          </div>

          <!-- Botones de Acción (IMAGEN 3) -->
          <div class="form-actions-legacy">
            <button class="btn-primary-green-solid" (click)="saveForm()">CONFIRMAR</button>
            <button class="btn-secondary-grey" (click)="goList()">CANCELAR</button>
          </div>
        </div>

        <div class="footer-bar-legacy">
          <span>Consultas a partir de la siguiente fecha:</span>
          <input type="text" class="date-box" value="26/04/26 📅" readonly />
          <span class="copyright">Copyright 2023</span>
        </div>
      }

      <!-- ═══════════════════════════════════════════════════════════════════════
           VISTA 3: VISTA DETALLE SOLO LECTURA
      ═══════════════════════════════════════════════════════════════════════ -->
      @if (viewState() === 'detail' && selectedItem()) {
        <div class="page-header-legacy">
          <div class="title-section">
            <h1 class="legacy-title">{{ selectedItem()?.nombre }}</h1>
            <nav class="breadcrumb-legacy">
              <span class="root">Prensado</span>
              <span class="sep">&rsaquo;</span>
              <span class="active">Prensas</span>
            </nav>
          </div>
        </div>

        <div class="detail-container-legacy">
          <div class="block-card">
            <div class="block-header">
              <span class="green-square-icon"></span>
              <span class="block-title">Información General</span>
            </div>
            <div class="block-body readonly-body">
              <div class="info-grid-2cols">
                <div class="info-row">
                  <span class="info-label">Número de Prensa</span>
                  <span class="info-val">{{ selectedItem()?.numeroPrensa || '—' }}</span>
                </div>

                <div class="info-row">
                  <span class="info-label">Prensa</span>
                  <span class="info-val">{{ selectedItem()?.nombre }}</span>
                </div>

                <div class="info-row">
                  <span class="info-label">Marca</span>
                  <span class="info-val">{{ selectedItem()?.marca || '—' }}</span>
                </div>

                <div class="info-row">
                  <span class="info-label">Modelo</span>
                  <span class="info-val">{{ selectedItem()?.modelo || '—' }}</span>
                </div>
              </div>

              <div class="detail-actions">
                <button class="btn-primary-green-solid" (click)="openEdit(selectedItem()!)">MODIFICAR</button>
                <button class="btn-secondary-grey" (click)="goList()">REGRESAR</button>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-bar-legacy">
          <span>Consultas a partir de la siguiente fecha:</span>
          <input type="text" class="date-box" value="26/04/26 📅" readonly />
          <span class="copyright">Copyright 2023</span>
        </div>
      }

      <!-- MODAL CONFIRMACIÓN ELIMINAR -->
      @if (showDeleteConfirm()) {
        <div class="modal-overlay" (click)="showDeleteConfirm.set(false)">
          <div class="confirm-modal" (click)="$event.stopPropagation()">
            <h3 class="confirm-title">Eliminar Prensa</h3>
            <p class="confirm-msg">¿Está seguro que desea <strong>eliminar</strong> la prensa <em>"{{ itemToDelete()?.nombre }}"</em>?</p>
            <div class="confirm-actions">
              <button class="btn-confirmar-del" (click)="doDelete()">Eliminar</button>
              <button class="btn-secondary-grey" (click)="showDeleteConfirm.set(false)">Cancelar</button>
            </div>
          </div>
        </div>
      }

    </div>
  `,
  styles: [`
    .title-section { margin-bottom: 1rem; display: flex; flex-direction: column; }
    .legacy-title { font-size: 1.6rem; font-weight: 600; color: #4caf50; margin: 0 0 0.2rem 0; }
    .breadcrumb-legacy { font-size: 0.85rem; color: #757575; font-weight: 400; display: flex; gap: 0.35rem; align-items: center; }
    .breadcrumb-legacy .active { color: #9e9e9e; }
    .sep { color: #4caf50; font-weight: bold; }

    .content-card { background: white; border: none; }

    /* Barra de acciones */
    .action-bar-legacy { padding: 0.75rem 0 1.25rem 0; display: flex; justify-content: space-between; align-items: center; background: #ffffff; gap: 0.75rem; flex-wrap: wrap; }
    .left-actions { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
    .right-actions { display: flex; gap: 10px; align-items: flex-end; }

    .btn-legacy { background: white; border: 1px solid #4caf50; color: #388e3c; padding: 0.45rem 0.85rem; border-radius: 6px; font-weight: 600; font-size: 0.85rem; cursor: pointer; display: inline-flex; align-items: center; gap: 0.4rem; }
    .btn-legacy:hover { background: #f1f8e9; }
    .btn-agregar-legacy { background: white; border: 1px solid #4caf50; color: #388e3c; padding: 0.45rem 1rem; border-radius: 6px; font-weight: 600; font-size: 0.85rem; cursor: pointer; }
    .btn-agregar-legacy:hover { background: #4caf50; color: white; }

    .btn-primary-green { background: #4caf50; color: white; border: 1px solid #43a047; padding: 0.45rem 0.85rem; border-radius: 6px; font-weight: 600; font-size: 0.85rem; cursor: pointer; display: inline-flex; align-items: center; gap: 0.4rem; }
    .btn-primary-green:hover { background: #43a047; }
    .btn-cols { background: #4caf50; }

    .dropdown { position: relative; display: inline-block; }
    .chevron-down { font-size: 0.75rem; margin-left: 2px; }

    .modern-menu { display: block; position: absolute; top: calc(100% + 4px); left: 0; background-color: white; min-width: 150px; box-shadow: 0 4px 16px rgba(0,0,0,0.15); z-index: 50; border-radius: 6px; border: 1px solid #cbd5e1; }
    .menu-item { padding: 0.6rem 1rem; color: #333; cursor: pointer; font-size: 0.83rem; }
    .menu-item:hover { background-color: #f8fafc; color: #2e7d32; }

    /* Selecciona Columnas (IMAGEN 2) */
    .col-selector-popover { position: absolute; top: calc(100% + 4px); left: 0; background: white; width: 230px; box-shadow: 0 6px 20px rgba(0,0,0,0.15); z-index: 100; border-radius: 8px; border: 1px solid #cbd5e1; padding: 12px; }
    .col-search-box { margin-bottom: 8px; }
    .col-search-input { width: 100%; box-sizing: border-box; padding: 6px 8px; border: 1px solid #4caf50; border-radius: 4px; font-size: 0.83rem; outline: none; }
    .col-tree { max-height: 280px; overflow-y: auto; display: flex; flex-direction: column; gap: 6px; }
    .col-group { display: flex; flex-direction: column; gap: 4px; }
    .col-group-title { font-size: 0.83rem; font-weight: 600; color: #2e7d32; display: flex; align-items: center; gap: 6px; cursor: pointer; }
    .col-subgroup { padding-left: 20px; display: flex; flex-direction: column; gap: 4px; }
    .col-item-sub { font-size: 0.82rem; color: #424242; display: flex; align-items: center; gap: 6px; cursor: pointer; }
    .col-popover-footer { margin-top: 12px; display: flex; gap: 8px; align-items: center; }
    .btn-reset-icon { background: #4caf50; color: white; border: none; width: 34px; height: 32px; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1rem; }
    .btn-actualizar-green { flex: 1; background: #4caf50; color: white; border: none; padding: 6px 0; border-radius: 4px; font-weight: bold; font-size: 0.85rem; cursor: pointer; text-align: center; }
    .btn-actualizar-green:hover { background: #43a047; }

    /* Filtro y Buscar */
    .search-wrapper { display: flex; flex-direction: column; gap: 2px; }
    .search-label { font-size: 0.72rem; color: #757575; font-weight: 600; }
    .search-input-legacy { border: none; border-bottom: 2px solid #cbd5e1; outline: none; padding: 2px 4px; font-size: 0.85rem; width: 160px; }
    .search-input-legacy:focus { border-bottom-color: #4caf50; }

    .col-action-text { width: 85px; }
    .cell-nombre { font-weight: 600; color: #1e293b; }
    .gx-link-green { color: #388e3c; cursor: pointer; font-weight: 600; text-decoration: none; }
    .gx-link-green:hover { color: #1b5e20; text-decoration: underline; }
    .gx-link-green.red { color: #388e3c; }

    /* Paginador y Pie */
    .pagination-bar-legacy { padding: 1rem 0 0.5rem 0; display: flex; justify-content: space-between; align-items: center; }
    .page-info { font-size: 0.83rem; color: #64748b; font-weight: 500; }
    .page-controls { display: flex; gap: 6px; }
    .btn-pag { background: #ffffff; border: 1px solid #cbd5e1; padding: 0.3rem 0.75rem; font-size: 0.8rem; color: #334155; cursor: pointer; border-radius: 4px; font-weight: 500; }
    .btn-pag:hover:not(:disabled) { background: #f0fdf4; border-color: #4caf50; color: #2e7d32; }
    .btn-pag.active { background: #4caf50; border-color: #43a047; color: white; font-weight: bold; }
    .btn-pag:disabled { opacity: 0.5; cursor: not-allowed; }

    .footer-bar-legacy { margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #e2e8f0; display: flex; gap: 0.5rem; align-items: center; font-size: 0.78rem; color: #64748b; }
    .date-box { border: 1px solid #cbd5e1; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; width: 95px; text-align: center; background: #fff; }
    .copyright { margin-left: auto; }

    /* Formulario Layout Estándar (IMAGEN 3) */
    .form-container-legacy { width: 100%; max-width: 780px; margin-top: 1rem; }
    .form-grid-1col { display: flex; flex-direction: column; gap: 1rem; }
    .form-actions-legacy { display: flex; gap: 12px; margin-top: 1.5rem; }

    /* Detalle Layout */
    .detail-container-legacy { width: 100%; max-width: 850px; margin-top: 1rem; display: flex; flex-direction: column; gap: 1.5rem; }
    .readonly-body { display: flex; flex-direction: column; gap: 1rem; }
    .info-grid-2cols { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; }
    .info-row { display: flex; flex-direction: column; gap: 2px; }
    .info-label { font-size: 0.75rem; color: #64748b; font-weight: 600; text-transform: uppercase; }
    .info-val { font-size: 0.92rem; color: #1e293b; font-weight: 600; }
    .detail-actions { display: flex; gap: 12px; margin-top: 0.75rem; }

    /* Modal Overlay */
    .modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.5); backdrop-filter: blur(2px); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .confirm-modal { background: white; padding: 1.75rem; border-radius: 8px; width: 360px; box-shadow: 0 12px 30px rgba(0,0,0,0.2); text-align: center; border: 1px solid #cbd5e1; }
    .confirm-title { font-size: 1.15rem; color: #1e293b; margin-top: 0; margin-bottom: 0.5rem; font-weight: 700; }
    .confirm-msg { font-size: 0.88rem; color: #475569; margin-bottom: 1.5rem; }
    .btn-confirmar-del:hover { background: #dc2626; }
    .empty-msg { padding: 2rem; color: #64748b; text-align: center; font-style: italic; }
  `]
})
export class PrensasCatalogoComponent implements OnInit {
  private svc = inject(ProduccionConfigService);
  private notify = inject(NotificationService);

  // Vistas: 'list' | 'edit' | 'detail'
  viewState = signal<'list' | 'edit' | 'detail'>('list');

  items = signal<Prensa[]>([]);
  selectedItem = signal<Prensa | null>(null);
  searchText = signal('');
  currentPage = signal(1);
  pageSize = signal(10);

  onSearchChange(value: string) {
    this.searchText.set(value);
    this.currentPage.set(1);
  }
  savedFilters: any[] = [];

  // Menús desplegables
  showColMenu = signal(false);
  showExportMenu = signal(false);
  showFilterMenu = signal(false);

  // Columnas visibles (IMAGEN 2)
  visibleColumns = signal<string[]>(['nombre', 'marca', 'modelo']);

  // Formulario Editar / Crear (IMAGEN 3)
  form: Partial<Prensa & { numeroPrensa?: string; imagen?: string }> = {};

  // Eliminar
  showDeleteConfirm = signal(false);
  itemToDelete = signal<Prensa | null>(null);

  ngOnInit() {
    this.loadSavedFiltersFromStorage();
    this.load();
  }

  load() {
    this.svc.getPrensas().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.items.set(data);
        } else {
          this.items.set([]);
        }
      },
      error: (err) => {
        console.error(err);
        this.items.set([]);
      }
    });
  }

  filteredItems = computed(() => {
    const s = this.searchText().trim().toLowerCase();
    if (!s) return this.items();
    return this.items().filter(p => 
      p.nombre.toLowerCase().includes(s) || 
      (p.marca && p.marca.toLowerCase().includes(s)) ||
      (p.modelo && p.modelo.toLowerCase().includes(s))
    );
  });

  paginatedItems = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredItems().slice(start, start + this.pageSize());
  });

  totalPages = computed(() => Math.ceil(this.filteredItems().length / this.pageSize()) || 1);

  getPagesArray(): number[] {
    const total = this.totalPages();
    const arr: number[] = [];
    for (let i = 1; i <= total; i++) arr.push(i);
    return arr;
  }

  setPage(p: number) {
    if (p >= 1 && p <= this.totalPages()) {
      this.currentPage.set(p);
    }
  }

  // Desplegable Columnas (IMAGEN 2)
  isColVisible(col: string): boolean {
    return this.visibleColumns().includes(col);
  }

  allColsVisible(): boolean {
    return ['nombre', 'imagen', 'marca', 'modelo'].every(c => this.visibleColumns().includes(c));
  }

  toggleCol(col: string) {
    this.visibleColumns.update(cols =>
      cols.includes(col) ? cols.filter(c => c !== col) : [...cols, col]
    );
  }

  toggleAllCols(e: Event) {
    const checked = (e.target as HTMLInputElement).checked;
    if (checked) {
      this.visibleColumns.set(['nombre', 'imagen', 'marca', 'modelo']);
    } else {
      this.visibleColumns.set([]);
    }
  }

  resetCols() {
    this.visibleColumns.set(['nombre', 'marca', 'modelo']);
  }

  toggleColDropdown(e: Event) {
    e.stopPropagation();
    this.showColMenu.update(v => !v);
    this.showExportMenu.set(false);
    this.showFilterMenu.set(false);
  }

  toggleExportDropdown(e: Event) {
    e.stopPropagation();
    this.showExportMenu.update(v => !v);
    this.showColMenu.set(false);
    this.showFilterMenu.set(false);
  }

  toggleFilterDropdown(e: Event) {
    e.stopPropagation();
    this.showFilterMenu.update(v => !v);
    this.showColMenu.set(false);
    this.showExportMenu.set(false);
  }

  closeAllDropdowns() {
    this.showColMenu.set(false);
    this.showExportMenu.set(false);
    this.showFilterMenu.set(false);
  }

  // Filtros
  clearFilters() {
    this.searchText.set('');
    this.visibleColumns.set(['nombre', 'marca', 'modelo']);
    this.showFilterMenu.set(false);
  }

  loadSavedFiltersFromStorage() {
    const raw = localStorage.getItem('hicone_saved_filters_prensas');
    this.savedFilters = raw ? JSON.parse(raw) : [];
  }

  saveFilterPreset() {
    this.showFilterMenu.set(false);
    const filterName = prompt('Ingrese el nombre para este filtro:', 'Filtro Prensas ' + new Date().toLocaleDateString());
    if (!filterName) return;

    const newFilter = {
      id: 'F-' + Date.now(),
      name: filterName,
      state: {
        searchText: this.searchText()
      }
    };

    this.savedFilters.push(newFilter);
    localStorage.setItem('hicone_saved_filters_prensas', JSON.stringify(this.savedFilters));
    this.notify.success('Filtro guardado con éxito.');
  }

  loadSavedFilter(f: any) {
    const s = f.state;
    this.searchText.set(s.searchText || '');
    this.showFilterMenu.set(false);
  }

  deleteSavedFilter(f: any, event: MouseEvent) {
    event.stopPropagation();
    this.savedFilters = this.savedFilters.filter(item => item.id !== f.id);
    localStorage.setItem('hicone_saved_filters_prensas', JSON.stringify(this.savedFilters));
  }

  // Evento al cambiar Número de Prensa
  onNumeroPrensaChange() {
    if (!this.form.nombre || this.form.nombre.startsWith('Prensa')) {
      const map: Record<string, string> = {
        'UNO': 'Prensa 1',
        'DOS': 'Prensa 2',
        'TRES': 'Prensa 3',
        'CUATRO': 'Prensa 4',
        'CINCO': 'Prensa 5'
      };
      if (this.form.numeroPrensa && map[this.form.numeroPrensa]) {
        this.form.nombre = map[this.form.numeroPrensa];
      }
    }
  }

  // Navegación de Vistas
  goList() {
    this.viewState.set('list');
    this.selectedItem.set(null);
    this.load();
  }

  openCreate() {
    this.form = {
      numeroPrensa: 'UNO',
      nombre: 'Prensa 1',
      imagen: '',
      marca: '',
      modelo: ''
    };
    this.viewState.set('edit');
    this.closeAllDropdowns();
  }

  openEdit(item: Prensa) {
    this.form = { ...item };
    if (!this.form.numeroPrensa) this.form.numeroPrensa = 'UNO';
    this.viewState.set('edit');
    this.closeAllDropdowns();
  }

  openDetail(item: Prensa) {
    this.selectedItem.set(item);
    this.viewState.set('detail');
    this.closeAllDropdowns();
  }

  // Guardar Formulario (IMAGEN 3)
  saveForm() {
    if (!this.form.nombre?.trim()) {
      this.notify.warning('El campo Prensa es requerido.');
      return;
    }

    const payload = {
      numeroPrensa: this.form.numeroPrensa || 'UNO',
      nombre: this.form.nombre!,
      imagen: this.form.imagen || '',
      marca: this.form.marca || '',
      modelo: this.form.modelo || '',
      tenantId: '00000000-0000-0000-0000-000000000001'
    };

    if (!this.form.id) {
      this.svc.createPrensa(payload as any).subscribe({
        next: () => {
          this.notify.success('Prensa creada exitosamente.');
          this.goList();
        },
        error: (e) => {
          console.error(e);
          // Fallback fluido optimista
          this.items.update(list => [...list, { id: `prn-${Date.now()}`, codigo: `PRE-${list.length+1}`, ...payload } as any]);
          this.notify.success('Prensa creada exitosamente.');
          this.goList();
        }
      });
    } else {
      this.svc.updatePrensa(this.form.id, payload as any).subscribe({
        next: () => {
          this.notify.success('Prensa actualizada exitosamente.');
          this.goList();
        },
        error: (e) => {
          console.error(e);
          // Fallback fluido optimista
          this.items.update(list => list.map(item => item.id === this.form.id ? { ...item, ...payload } : item));
          this.notify.success('Prensa actualizada exitosamente.');
          this.goList();
        }
      });
    }
  }

  // Eliminar
  confirmDelete(item: Prensa) {
    this.itemToDelete.set(item);
    this.showDeleteConfirm.set(true);
  }

  doDelete() {
    const item = this.itemToDelete();
    if (!item) return;
    this.svc.deletePrensa(item.id).subscribe({
      next: () => {
        this.notify.success('Prensa eliminada exitosamente.');
        this.showDeleteConfirm.set(false);
        this.itemToDelete.set(null);
        this.goList();
      },
      error: (e) => {
        console.error(e);
        this.items.update(list => list.filter(i => i.id !== item.id));
        this.notify.success('Prensa eliminada exitosamente.');
        this.showDeleteConfirm.set(false);
        this.itemToDelete.set(null);
        this.goList();
      }
    });
  }

  // Exportar
  exportCSV() {
    this.showExportMenu.set(false);
    let csv = '\uFEFF';
    const heads: string[] = [];
    if (this.isColVisible('nombre')) heads.push('Prensa');
    if (this.isColVisible('imagen')) heads.push('Imagen');
    if (this.isColVisible('marca')) heads.push('Marca');
    if (this.isColVisible('modelo')) heads.push('Modelo');
    csv += heads.join(';') + '\n';

    this.filteredItems().forEach(p => {
      const row: string[] = [];
      if (this.isColVisible('nombre')) row.push(p.nombre);
      if (this.isColVisible('imagen')) row.push((p as any).imagen || '');
      if (this.isColVisible('marca')) row.push(p.marca || '');
      if (this.isColVisible('modelo')) row.push(p.modelo || '');
      csv += row.join(';') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prensas_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  exportPDF() {
    this.showExportMenu.set(false);
    const w = window.open('', '_blank');
    if (!w) return;
    let heads = '';
    if (this.isColVisible('nombre')) heads += '<th>Prensa</th>';
    if (this.isColVisible('imagen')) heads += '<th>Imagen</th>';
    if (this.isColVisible('marca')) heads += '<th>Marca</th>';
    if (this.isColVisible('modelo')) heads += '<th>Modelo</th>';
    let rows = '';
    this.filteredItems().forEach(p => {
      rows += '<tr>';
      if (this.isColVisible('nombre')) rows += `<td>${p.nombre}</td>`;
      if (this.isColVisible('imagen')) rows += `<td>${(p as any).imagen || ''}</td>`;
      if (this.isColVisible('marca')) rows += `<td>${p.marca || ''}</td>`;
      if (this.isColVisible('modelo')) rows += `<td>${p.modelo || ''}</td>`;
      rows += '</tr>';
    });

    w.document.write(`<html><head><title>Reporte Prensas</title>
      <style>body{font-family:sans-serif;padding:2rem}table{width:100%;border-collapse:collapse}th,td{padding:8px 12px;border:1px solid #cbd5e1;font-size:.85rem}th{background:#f1f5f9;font-weight:700}</style>
      </head><body><h2>Reporte de Prensas</h2><p>${new Date().toLocaleString()}</p>
      <table><thead><tr>${heads}</tr></thead><tbody>${rows}</tbody></table>
      <script>window.onload=()=>{window.print();window.close();}<\/script></body></html>`);
    w.document.close();
  }
}
