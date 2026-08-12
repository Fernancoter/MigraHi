import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduccionService, Bobina } from '../../../core/services/produccion';
import { NotificationService } from '../../../core/services/notification.service';
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
      
      <!-- ================================================================= -->
      <!-- VISTA 1: LISTA PRINCIPAL DE BOBINAS (31 COLUMNAS + TOOLBAR QA) -->
      <!-- ================================================================= -->
      <ng-container *ngIf="currentView === 'LIST'">
        <div class="page-header-premium">
          <div class="title-section">
            <h1 class="premium-title">Bobina</h1>
            <nav class="breadcrumb-modern">
              <span class="root">Extrusión</span>
              <span class="sep">&rsaquo;</span>
              <span class="root">Operación</span>
              <span class="sep">&rsaquo;</span>
              <span class="active">Bobinas</span>
            </nav>
          </div>
        </div>

        <div class="card-premium card-toolbar-top" style="margin-bottom: 0; border-bottom-left-radius: 0; border-bottom-right-radius: 0; position: relative; z-index: 100; overflow: visible;">
          <div class="action-bar-legacy">
            <div class="left-actions">
              <!-- Exportar Dropdown -->
              <div class="export-dropdown-wrapper">
                <button class="btn-export-qa" (click)="toggleExportMenu($event)" title="Exportar datos">
                  📥 Exportar <span class="chevron-down-qa">▾</span>
                </button>
                <div class="export-popover-qa shadow-premium" *ngIf="exportMenuOpen" (click)="$event.stopPropagation()">
                  <button class="export-item-qa" (click)="exportar('excel')">
                    <span class="export-icon">📊</span> Excel (CSV)
                  </button>
                  <button class="export-item-qa" (click)="exportar('pdf')">
                    <span class="export-icon">📕</span> PDF
                  </button>
                </div>
              </div>

              <!-- Selecciona Columnas Dropdown -->
              <div class="dropdown-wrapper">
                <button class="btn-legacy btn-secondary" (click)="toggleColumnMenu($event)">
                  <span>Selecciona columnas</span>
                  <span class="chevron-down">▾</span>
                </button>
                
                <div class="columns-popover shadow-premium" *ngIf="columnMenuOpen" (click)="$event.stopPropagation()">
                  <div class="popover-header">
                    <h3>Personalizar Columnas</h3>
                    <button class="close-btn" (click)="columnMenuOpen = false">×</button>
                  </div>
                  
                  <div class="popover-content custom-scroll">
                    <div class="column-group">
                      <h4 class="group-title">Columnas Visibles</h4>
                      <div class="column-item" *ngFor="let col of columns">
                        <label class="toggle-switch">
                          <input type="checkbox" [(ngModel)]="col.visible">
                          <span class="slider round"></span>
                        </label>
                        <span class="col-name">{{ col.header.replace(' ▾', '') }}</span>
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

              <!-- IMPRESIÓN MÚLTIPLE (verde destacado QA) -->
              <button class="btn-legacy btn-primary-green" (click)="impresionMultiple()" [disabled]="!hasSelectedBobinas()">
                <span>IMPRESIÓN MÚLTIPLE</span>
              </button>
            </div>

            <div class="right-actions">
              <div class="filter-search-group-qa">
                <!-- Botón Filtro Avanzado -->
                <div class="dropdown-wrapper">
                  <button class="btn-filter-funnel-qa" (click)="toggleSearchFilterDropdown($event)" title="Filtros avanzados">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                    </svg>
                    <span class="chevron-down-funnel">▾</span>
                  </button>
                  
                  <div class="filter-popover-qa shadow-premium" *ngIf="showSearchFilterDropdown" (click)="$event.stopPropagation()">
                    <div class="filter-item-qa" (click)="clearAllFilters()">
                      <span class="icon-circle-cross-dark">✖</span> Limpiar filtros
                    </div>
                    <div class="filter-item-qa" (click)="saveActiveFilters()">
                      <span class="icon-floppy-dark">💾</span> Guardar filtro como...
                    </div>
                    
                    <ng-container *ngIf="savedFilters.length > 0">
                      <div class="dropdown-divider"></div>
                      <div class="dropdown-header-saved">Filtros Guardados</div>
                      <div class="filter-item-qa saved-filter-item" *ngFor="let f of savedFilters" (click)="loadSavedFilter(f)">
                        <span>📁 {{ f.name }}</span>
                        <span class="btn-delete-saved-filter" (click)="deleteSavedFilter(f, $event)">🗑️</span>
                      </div>
                    </ng-container>
                  </div>
                </div>

                <!-- Campo de Búsqueda Subrayado -->
                <div class="search-modern-underline-qa">
                  <input type="text" placeholder="Buscar..." [(ngModel)]="searchTerm" (input)="onSearch()">
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabla Principal de 31 Columnas -->
        <div class="card-premium" style="border-top-left-radius: 0; border-top-right-radius: 0; border-top: none; position: relative; z-index: 1;">
          <div class="table-scroll custom-scroll">
            <table class="data-table-genexus">
              <thead>
                <tr>
                  <th class="checkbox-col">
                    <input type="checkbox" class="custom-checkbox" (change)="toggleAll($event)">
                  </th>
                  <th class="text-center" style="width: 100px;">Status</th>
                  <th class="text-center" style="width: 110px;">Opciones</th>
                  <ng-container *ngFor="let col of visibleColumns">
                    <th>{{ col.header }}</th>
                  </ng-container>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let b of filteredBobinas" [class.selected]="b.selected">
                  <td class="checkbox-col">
                    <input type="checkbox" class="custom-checkbox" [(ngModel)]="b.selected">
                  </td>
                  <td class="text-center">
                    <span class="status-pill" [class]="getStatusClass(b)">{{ getEstadoTexto(b) }}</span>
                  </td>
                  <td class="text-center" style="position: relative;">
                    <div class="dropdown-wrapper">
                      <button class="btn-opciones-qa" (click)="toggleRowOptions(b, $event)">
                        Opciones <span class="chevron-down-qa">▾</span>
                      </button>
                      <div class="opciones-popover shadow-premium" *ngIf="activeRowId === b.id" (click)="$event.stopPropagation()">
                        <button class="opcion-item" (click)="verDetalleBobina(b)">
                          <span class="icon">👁️</span> Visualizar
                        </button>
                        <button class="opcion-item" (click)="abrirEditarBobina(b)">
                          <span class="icon">✏️</span> Modificar
                        </button>
                        <button class="opcion-item delete" (click)="eliminarBobinaRow(b)">
                          <span class="icon">🗑️</span> Eliminar
                        </button>
                        <button class="opcion-item" (click)="imprimirEtiqueta(b)">
                          <span class="icon">🏷️</span> Etiqueta
                        </button>
                      </div>
                    </div>
                  </td>

                  <ng-container *ngFor="let col of visibleColumns">
                    <td *ngIf="col.field === 'noSerie'" class="text-green-link" (click)="verDetalleBobina(b)">{{ b.noSerie || '-' }}</td>
                    <td *ngIf="col.field === 'extrusora'">{{ getExtrusoraNombre(b) }}</td>
                    <td *ngIf="col.field === 'turno'">{{ getTurnoNombre(b) }}</td>
                    <td *ngIf="col.field === 'mezclaVirgen'" class="text-right">{{ (b.mezclaVirgenPct !== undefined ? b.mezclaVirgenPct : 40.00) | number:'1.2-2' }}</td>
                    <td *ngIf="col.field === 'mezclaMolido'" class="text-right">{{ (b.mezclaMolidoPct !== undefined ? b.mezclaMolidoPct : 60.00) | number:'1.2-2' }}</td>
                    <td *ngIf="col.field === 'colorEstacion'">{{ getColorEstacionTexto(b) }}</td>
                    <td *ngIf="col.field === 'origen'">{{ b.bobinaOrigen || 'A' }}</td>
                    <td *ngIf="col.field === 'estado'">{{ getEstadoTexto(b) }}</td>
                    <td *ngIf="col.field === 'horaInicio'">{{ formatDateLocal(b.horaInicio) }}</td>
                    <td *ngIf="col.field === 'horaSalida'">{{ formatDateLocal(b.horaSalida) }}</td>
                    <td *ngIf="col.field === 'desviacionEstandar'" class="text-right">{{ (b.desviacionEstandar !== undefined ? b.desviacionEstandar : 0.190) | number:'1.3-3' }}</td>
                    <td *ngIf="col.field === 'kg'" class="text-right">{{ (b.kg !== undefined ? b.kg : 0.00) | number:'1.2-2' }}</td>
                    <td *ngIf="col.field === 'mermaKg'" class="text-right">{{ (b.mermaKg !== undefined ? b.mermaKg : 0.00) | number:'1.2-2' }}</td>
                    <td *ngIf="col.field === 'no'" class="text-right">{{ b.bobinaNo || '-' }}</td>
                    <td *ngIf="col.field === 'reposoHr'" class="text-right">{{ (getReposoHr(b)) | number:'1.2-2' }}</td>
                    <td *ngIf="col.field === 'operador'" class="text-uppercase">{{ getOperadorNombre(b) }}</td>
                    <td *ngIf="col.field === 'observaciones'">{{ b.observaciones || '' }}</td>
                    <td *ngIf="col.field === 'siloMolido'">{{ getSiloMolido(b) }}</td>
                    <td *ngIf="col.field === 'siloVirgen'">{{ getSiloVirgen(b) }}</td>
                    <td *ngIf="col.field === 'loteVirgen'">{{ getLoteVirgen(b) }}</td>
                    <td *ngIf="col.field === 'paqueteAditivos'">{{ getPaqueteAditivos(b) }}</td>
                    <td *ngIf="col.field === 'productoId'">{{ getProductoId(b) }}</td>
                    <td *ngIf="col.field === 'productoNombre'">{{ getProductoNombre(b) }}</td>
                    <td *ngIf="col.field === 'tipoMaterial'">{{ getTipoMaterial(b) }}</td>
                    <td *ngIf="col.field === 'prensa'">{{ getPrensa(b) }}</td>
                    <td *ngIf="col.field === 'interrupcionesMotivo'" [class.text-green-link]="getInterrupcionMotivo(b) !== '-'">{{ getInterrupcionMotivo(b) }}</td>
                    <td *ngIf="col.field === 'timeCode'">{{ b.timeCode || '-' }}</td>
                    <td *ngIf="col.field === 'timeDescription'">{{ b.timeDescription || '-' }}</td>
                    <td *ngIf="col.field === 'timeType'">{{ b.timeType || '-' }}</td>
                  </ng-container>
                </tr>
                <tr *ngIf="filteredBobinas.length === 0">
                  <td [attr.colspan]="visibleColumns.length + 3" class="empty-row-legacy">
                    <div class="empty-state" style="padding: 2rem; text-align: center; color: #64748b;">
                      <p>No hay registros de bobinas disponibles.</p>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot *ngIf="filteredBobinas.length > 0">
                <tr class="totals-row">
                  <td class="checkbox-col"></td>
                  <td></td>
                  <td></td>
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
        </div>
      </ng-container>

      <!-- ================================================================= -->
      <!-- VISTA 2: PANTALLA DETALLE "BOBINA VIEW" (IMAGEN 1)                -->
      <!-- ================================================================= -->
      <ng-container *ngIf="currentView === 'VIEW'">
        <div class="page-header-premium">
          <div class="title-section">
            <h1 class="premium-title" style="color: #166534; margin: 0;">{{ selectedBobina?.noSerie || 'B-010626-01-026A' }}</h1>
            <div class="subtitle-legacy" style="color: #64748b; font-size: 0.85rem; margin-top: 2px;">Bobina View</div>
          </div>
          <div class="right-actions" style="margin-left: auto;">
            <button class="btn-legacy btn-secondary" (click)="irALista()">
              &larr; Volver a Bobinas
            </button>
          </div>
        </div>

        <!-- Tarjeta Información General -->
        <div class="card-premium" style="margin-bottom: 1.5rem; padding: 1.25rem;">
          <div class="card-header-green-line">
            <span class="icon-green-badge">📗</span>
            <span class="title-text">Información General</span>
          </div>

          <div class="view-grid-4col">
            <div class="view-item">
              <span class="label">No Serie</span>
              <span class="val font-mono">{{ selectedBobina?.noSerie || 'B-010626-01-026A' }}</span>
            </div>
            <div class="view-item">
              <span class="label">Origen</span>
              <span class="val">{{ selectedBobina?.bobinaOrigen || 'A' }}</span>
            </div>
            <div class="view-item">
              <span class="label">Hora Inicio</span>
              <span class="val">{{ selectedBobina?.horaInicio ? (selectedBobina?.horaInicio | date:'dd/MM/yyyy HH:mm') : '01/06/2026 00:31' }}</span>
            </div>
            <div class="view-item">
              <span class="label">Hora Salida</span>
              <span class="val">{{ selectedBobina?.horaSalida ? (selectedBobina?.horaSalida | date:'dd/MM/yyyy HH:mm') : '01/06/2026 02:06' }}</span>
            </div>

            <div class="view-item">
              <span class="label">No</span>
              <span class="val">{{ selectedBobina?.bobinaNo || 26 }}</span>
            </div>
            <div class="view-item">
              <span class="label">Kg</span>
              <span class="val">{{ (selectedBobina?.kg !== undefined ? selectedBobina?.kg : 520.00) | number:'1.2-2' }}</span>
            </div>
            <div class="view-item">
              <span class="label">Merma Kg</span>
              <span class="val">{{ (selectedBobina?.mermaKg !== undefined ? selectedBobina?.mermaKg : 0.00) | number:'1.2-2' }}</span>
            </div>
            <div class="view-item">
              <span class="label">Espesor</span>
              <span class="val">{{ (selectedBobina?.espesor !== undefined ? selectedBobina?.espesor : 12.50) | number:'1.2-2' }}</span>
            </div>

            <div class="view-item full-width">
              <span class="label">Observaciones</span>
              <span class="val">{{ selectedBobina?.observaciones || '-' }}</span>
            </div>

            <div class="view-item">
              <span class="label">Estado</span>
              <span class="val">{{ getEstadoTexto(selectedBobina) }}</span>
            </div>
            <div class="view-item">
              <span class="label">Inicia Reposo</span>
              <span class="val">{{ formatDateLocal(selectedBobina?.iniciaReposo) }}</span>
            </div>
            <div class="view-item">
              <span class="label">En Reposo</span>
              <span class="val">{{ (getReposoHr(selectedBobina)) | number:'1.2-2' }}</span>
            </div>

            <div class="view-item">
              <span class="label">Motivo Molino</span>
              <span class="val">{{ getMotivoMolinoTexto(selectedBobina) }}</span>
            </div>
            <div class="view-item">
              <span class="label">Producto Nombre</span>
              <span class="val">{{ getProductoNombre(selectedBobina) }}</span>
            </div>
            <div class="view-item">
              <span class="label">Operador</span>
              <span class="val text-uppercase">{{ getOperadorNombre(selectedBobina) }}</span>
            </div>
          </div>

          <div class="view-action-buttons">
            <button class="btn-primary-green-view" (click)="abrirEditarBobina(selectedBobina)">MODIFICAR</button>
            <button class="btn-cancelar-grey-view" (click)="eliminarBobinaRow(selectedBobina)">ELIMINAR</button>
          </div>
        </div>

        <!-- Tarjeta Sub-tablas (Prensado Bobina | Extrusora Bobina | Historial Auditoria) -->
        <div class="card-premium" style="padding: 1.25rem;">
          <div class="tab-header-list">
            <button class="tab-btn" [class.active]="activeSubTab === 'prensado'" (click)="activeSubTab = 'prensado'">Prensado Bobina</button>
            <button class="tab-btn" [class.active]="activeSubTab === 'extrusora'" (click)="activeSubTab = 'extrusora'">Extrusora Bobina</button>
            <button class="tab-btn" [class.active]="activeSubTab === 'auditoria'" (click)="activeSubTab = 'auditoria'">Historial Auditoria</button>
          </div>

          <div class="subtab-content" *ngIf="activeSubTab === 'prensado'">
            <div class="subtab-toolbar">
              <button class="btn-add-icon" title="Agregar Prensado">➕</button>
              <div class="right-tools">
                <span class="filter-funnel">T- ▾</span>
                <input type="text" class="search-input-underline" placeholder="Buscar">
              </div>
            </div>

            <div class="table-scroll custom-scroll">
              <table class="data-table-genexus">
                <thead>
                  <tr>
                    <th>Acciones</th>
                    <th>Bobina No Serie ↑</th>
                    <th>Bobina Estado ▾</th>
                    <th>Cant Carrera ▾</th>
                    <th>Prensado Operador Id ▾</th>
                    <th>Prensado Operador Nombre ▾</th>
                    <th>Prensa Id ▾</th>
                    <th>Prensa Nombre ▾</th>
                    <th>Prensado Turno Id ▾</th>
                    <th>Prensado Turno Nombre ▾</th>
                    <th>Prensado Producto Id ▾</th>
                    <th>Prensado Producto Nombre ▾</th>
                    <th>Prensado Producto Tipo Material ▾</th>
                    <th>Prensado Fecha ▾</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <button class="icon-btn-action" title="Editar">✏️</button>
                      <button class="icon-btn-action delete" title="Eliminar">✖</button>
                    </td>
                    <td class="text-green-link">{{ selectedBobina?.noSerie || 'B-010626-01-026A' }}</td>
                    <td>{{ getEstadoTexto(selectedBobina) }}</td>
                    <td class="text-right">3</td>
                    <td class="text-right">20</td>
                    <td class="text-uppercase">DIEGO HUESCA VARGAS</td>
                    <td class="text-right">4</td>
                    <td>Prensa 4</td>
                    <td class="text-right">2</td>
                    <td>2do Turno</td>
                    <td class="text-right">44</td>
                    <td>8063C2000</td>
                    <td>PCR 100%</td>
                    <td style="color: #166534; font-weight: 600;">03/06/26 08:00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="pagination-footer-legacy">
              <div class="page-info-legacy">Página 1 de 1</div>
              <div class="page-controls-legacy">
                <button class="btn-page-legacy" disabled>Ant</button>
                <button class="btn-page-num active">1</button>
                <button class="btn-page-legacy" disabled>Sig</button>
              </div>
            </div>
          </div>

          <!-- Pestaña 2: Extrusora Bobina -->
          <div class="subtab-content" *ngIf="activeSubTab === 'extrusora'">
            <div class="subtab-toolbar">
              <button class="btn-add-icon" title="Agregar Extrusora Bobina">➕</button>
              <div class="right-tools">
                <span class="filter-funnel">T- ▾</span>
                <input type="text" class="search-input-underline" placeholder="Buscar">
              </div>
            </div>

            <div class="table-scroll custom-scroll">
              <table class="data-table-genexus">
                <thead>
                  <tr>
                    <th style="width: 80px;"></th>
                    <th>Bobina Id ↑</th>
                    <th>Extrusora Id ▾</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colspan="3" style="padding: 2rem; text-align: left; color: #334155; font-size: 0.85rem;">
                      No se encontraron registros
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="pagination-footer-legacy">
              <div class="page-info-legacy">Página 1 de 1</div>
              <div class="page-controls-legacy">
                <button class="btn-page-legacy" disabled>Ant</button>
                <button class="btn-page-num active">1</button>
                <button class="btn-page-legacy" disabled>Sig</button>
              </div>
            </div>
          </div>

          <!-- Pestaña 3: Historial Auditoria -->
          <div class="subtab-content" *ngIf="activeSubTab === 'auditoria'">
            <div class="audit-split-container">
              <div class="audit-panel shadow-sm">
                <div class="audit-panel-header">Change Log</div>
                <div class="audit-panel-body custom-scroll">
                  <table class="audit-table-mini">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>User</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colspan="2" style="padding: 2rem; text-align: center; color: #94a3b8; font-size: 0.85rem;">
                          Sin cambios registrados
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="audit-panel shadow-sm">
                <div class="audit-panel-header">Detail</div>
                <div class="audit-panel-body custom-scroll" style="min-height: 150px; display: flex; align-items: center; justify-content: center; color: #94a3b8; font-size: 0.85rem;">
                  Seleccione un registro para ver el detalle
                </div>
              </div>
            </div>
          </div>

        </div>
      </ng-container>

      <!-- ================================================================= -->
      <!-- VISTA 3: PANTALLA COMPLETA DE EDICIÓN (IMÁGENES 2, 3, 4 Y 5)      -->
      <!-- ================================================================= -->
      <ng-container *ngIf="currentView === 'EDIT'">
        <div class="page-header-premium">
          <div class="title-section">
            <h1 class="premium-title" style="color: #166534;">Bobina</h1>
            <div class="subtitle-legacy" style="color: #64748b;">Bobina Edit</div>
          </div>
          <div class="right-actions" style="margin-left: auto;">
            <button class="btn-legacy btn-secondary" (click)="irALista()">
              &larr; Volver a Bobinas
            </button>
          </div>
        </div>

        <div class="card-premium" style="max-width: 900px; margin: 0 auto 2rem auto; padding: 1.5rem;">
          <div class="card-header-green-line" style="margin-bottom: 1.5rem;">
            <span class="icon-green-badge">📗</span>
            <span class="title-text">Información General</span>
          </div>

          <form (ngSubmit)="guardarCambiosModal()">
            <div class="form-grid-2col">
              <div class="form-field-group">
                <label>Id</label>
                <input type="text" class="input-form-qa disabled" [value]="selectedBobina?.id || '466441'" disabled>
              </div>

              <div class="form-field-group">
                <label>Extrusion Id</label>
                <div class="input-with-search">
                  <input type="text" class="input-form-qa" [(ngModel)]="selectedBobina.extrusionId" name="extrusionId">
                  <button type="button" class="btn-search-icon" title="Buscar Extrusión">🔍</button>
                </div>
              </div>

              <div class="form-field-group">
                <label>Extrusion Turno Nombre</label>
                <input type="text" class="input-form-qa disabled" [value]="getTurnoNombre(selectedBobina)" disabled>
              </div>

              <div class="form-field-group">
                <label>Extrusion Operador Nombre</label>
                <input type="text" class="input-form-qa disabled" [value]="getOperadorNombre(selectedBobina)" disabled>
              </div>

              <div class="form-field-group">
                <label>Extrusion Extrusora Nombre</label>
                <input type="text" class="input-form-qa disabled" [value]="getExtrusoraNombre(selectedBobina)" disabled>
              </div>

              <div class="form-field-group">
                <label>No Serie</label>
                <input type="text" class="input-form-qa" [(ngModel)]="selectedBobina.noSerie" name="noSerie">
              </div>

              <!-- Origen (Dropdown Opciones exactas Imagen 3: A, B) -->
              <div class="form-field-group">
                <label>Origen</label>
                <select class="select-form-qa" [(ngModel)]="selectedBobina.bobinaOrigen" name="origen">
                  <option value="A">A</option>
                  <option value="B">B</option>
                </select>
              </div>

              <div class="form-field-group">
                <label>Hora Inicio</label>
                <input type="datetime-local" class="input-form-qa" [(ngModel)]="selectedBobina.horaInicioStr" name="horaInicio">
              </div>

              <div class="form-field-group">
                <label>Hora Salida</label>
                <input type="datetime-local" class="input-form-qa" [(ngModel)]="selectedBobina.horaSalidaStr" name="horaSalida">
              </div>

              <div class="form-field-group">
                <label>No</label>
                <input type="number" class="input-form-qa" [(ngModel)]="selectedBobina.bobinaNo" name="no">
              </div>

              <div class="form-field-group">
                <label>Kg</label>
                <input type="number" step="0.01" class="input-form-qa" [(ngModel)]="selectedBobina.kg" name="kg" (ngModelChange)="onKgChange()">
              </div>

              <div class="form-field-group">
                <label>Merma Kg</label>
                <input type="number" step="0.01" class="input-form-qa" [(ngModel)]="selectedBobina.mermaKg" name="mermaKg" (ngModelChange)="onMermaKgChange()">
              </div>

              <div class="form-field-group">
                <label>Espesor</label>
                <input type="number" step="0.01" class="input-form-qa" [(ngModel)]="selectedBobina.espesor" name="espesor">
              </div>

              <div class="form-field-group full-width">
                <label>Observaciones</label>
                <textarea class="textarea-form-qa" rows="3" [(ngModel)]="selectedBobina.observaciones" name="observaciones"></textarea>
              </div>

              <div class="form-field-group full-width">
                <label>Rechazada Observaciones</label>
                <textarea class="textarea-form-qa" rows="3" [(ngModel)]="selectedBobina.rechazadaObservaciones" name="rechazadaObservaciones"></textarea>
              </div>

              <!-- Estado (Dropdown Opciones exactas Imagen 1) -->
              <div class="form-field-group">
                <label>Estado</label>
                <select class="select-form-qa" [(ngModel)]="selectedBobina.estadoStr" name="estado">
                  <option value="En Proceso">En Proceso</option>
                  <option value="En Medición">En Medición</option>
                  <option value="Reposo">Reposo</option>
                  <option value="Molino">Molino</option>
                  <option value="Disponible">Disponible</option>
                  <option value="En Prensado">En Prensado</option>
                  <option value="Pausada">Pausada</option>
                  <option value="Desmontada">Desmontada</option>
                  <option value="Transferida">Transferida</option>
                  <option value="Rechazada">Rechazada</option>
                  <option value="Consumida">Consumida</option>
                </select>
              </div>

              <div class="form-field-group">
                <label>Carreras</label>
                <input type="number" class="input-form-qa" [(ngModel)]="selectedBobina.carreras" name="carreras">
              </div>

              <div class="form-field-group">
                <label>Inicia Reposo</label>
                <input type="datetime-local" class="input-form-qa" [(ngModel)]="selectedBobina.iniciaReposoStr" name="iniciaReposo">
              </div>

              <div class="form-field-group">
                <label>En Reposo</label>
                <input type="number" step="0.01" class="input-form-qa" [value]="getReposoHr(selectedBobina)" disabled>
              </div>

              <!-- Motivo Molino: valores reales confirmados contra el sistema legado
                   (ver docs/hallazgo_motivomolino_bobina.md). Se deshabilita cuando hay Kg
                   capturado (bobina buena, no aplica motivo); se habilita cuando hay Merma Kg. -->
              <div class="form-field-group">
                <label>Motivo Molino</label>
                <select class="select-form-qa" [(ngModel)]="selectedBobina.motivoMolino" name="motivoMolino" [disabled]="!motivoMolinoHabilitado()">
                  <option [ngValue]="0">No Aplica</option>
                  <option [ngValue]="1">Falla Mecánica</option>
                  <option [ngValue]="2">Limpieza / Contaminación</option>
                </select>
              </div>

              <div class="form-field-group">
                <label>Molido Id</label>
                <input type="text" class="input-form-qa disabled" [value]="selectedBobina.molidoId || '10003'" disabled>
              </div>

              <div class="form-field-group">
                <label>Silo Molido</label>
                <input type="text" class="input-form-qa disabled" [value]="getSiloMolido(selectedBobina)" disabled>
              </div>

              <div class="form-field-group">
                <label>Virgen Id</label>
                <input type="text" class="input-form-qa disabled" [value]="selectedBobina.virgenId || '1'" disabled>
              </div>

              <div class="form-field-group">
                <label>Silo Virgen</label>
                <input type="text" class="input-form-qa disabled" [value]="getSiloVirgen(selectedBobina)" disabled>
              </div>

              <div class="form-field-group">
                <label>Lote Virgen</label>
                <input type="text" class="input-form-qa" [(ngModel)]="selectedBobina.loteVirgen" name="loteVirgen">
              </div>

              <div class="form-field-group">
                <label>Producto Id</label>
                <input type="text" class="input-form-qa disabled" [value]="selectedBobina.productoId || '43'" disabled>
              </div>

              <div class="form-field-group">
                <label>Producto Nombre</label>
                <input type="text" class="input-form-qa disabled" [value]="getProductoNombre(selectedBobina)" disabled>
              </div>

              <div class="form-field-group">
                <label>Tipo Material</label>
                <input type="text" class="input-form-qa disabled" [value]="getTipoMaterial(selectedBobina)" disabled>
              </div>

              <div class="form-field-group">
                <label>Prensa</label>
                <input type="text" class="input-form-qa disabled" [value]="getPrensa(selectedBobina)" disabled>
              </div>

              <div class="form-field-group">
                <label>Reposo (Hr)</label>
                <input type="number" step="0.01" class="input-form-qa disabled" [value]="getReposoHr(selectedBobina)" disabled>
              </div>
            </div>

            <div class="form-actions-bottom" style="margin-top: 2rem; display: flex; gap: 1rem;">
              <button type="submit" class="btn-primary-green-view">CONFIRMAR</button>
              <button type="button" class="btn-cancelar-grey-view" (click)="irALista()">CANCELAR</button>
            </div>
          </form>
        </div>
      </ng-container>

    </div>
  `,
  styles: [`
    .module-page { 
      padding: 1.5rem; 
      display: flex; 
      flex-direction: column; 
      gap: 1rem; 
      width: 100%;
    }
    
    .action-bar-legacy { 
      padding: 0.75rem 1.25rem; 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      background: #ffffff; 
      gap: 0.75rem; 
      flex-wrap: wrap; 
      border-radius: 12px 12px 0 0;
    }
    
    .left-actions { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
    .right-actions { display: flex; gap: 8px; align-items: center; }

    .btn-legacy { 
      background: white; 
      border: 1px solid #cbd5e1; 
      color: #334155; 
      padding: 0.45rem 0.85rem; 
      border-radius: 6px; 
      font-weight: 600; 
      font-size: 0.83rem; 
      cursor: pointer; 
      display: inline-flex; 
      align-items: center; 
      gap: 0.4rem; 
      transition: all 0.2s;
    }
    .btn-legacy:hover { background: #f8fafc; border-color: #94a3b8; }
    .btn-secondary { background: #ffffff; color: #475569; border-color: #cbd5e1; }
    .btn-primary-green { background: #166534; color: white; border: 1px solid #14532d; border-radius: 6px; font-weight: 700; padding: 0.45rem 0.95rem; cursor: pointer; transition: background 0.2s; }
    .btn-primary-green:hover { background: #14532d; }
    .btn-primary-green:disabled { opacity: 0.6; cursor: not-allowed; }

    .status-pill {
      display: inline-block;
      padding: 0.2rem 0.55rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 700;
      color: white;
      text-align: center;
    }
    .status-pill.consumida { background: #e11d48; }
    .status-pill.molino { background: #dc2626; }
    .status-pill.reposo { background: #2563eb; }
    .status-pill.proceso { background: #166534; }

    .btn-opciones-qa {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 0.25rem 0.6rem;
      font-size: 0.78rem;
      font-weight: 600;
      color: #334155;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.2rem;
    }
    .btn-opciones-qa:hover { background: #f1f5f9; }

    .opciones-popover {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      background: white;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 0.35rem 0;
      min-width: 130px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
    }
    .opcion-item {
      background: transparent;
      border: none;
      text-align: left;
      padding: 0.45rem 0.85rem;
      font-size: 0.8rem;
      color: #334155;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-weight: 500;
    }
    .opcion-item:hover { background: #f1f5f9; color: #166534; }
    .opcion-item.delete:hover { background: #fef2f2; color: #dc2626; }

    .columns-popover {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      background: white;
      width: 250px;
      border-radius: 8px;
      border: 1px solid #cbd5e1;
      padding: 0.75rem;
      z-index: 1000;
    }
    .popover-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
    .popover-header h3 { font-size: 0.85rem; font-weight: 700; color: #166534; margin: 0; }
    .close-btn { background: transparent; border: none; font-size: 1.1rem; cursor: pointer; color: #64748b; }
    .column-group { max-height: 250px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.4rem; }
    .group-title { font-size: 0.75rem; font-weight: 700; color: #64748b; margin: 0.25rem 0; }
    .column-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; color: #334155; }
    
    .toggle-switch { position: relative; display: inline-block; width: 26px; height: 14px; }
    .toggle-switch input { opacity: 0; width: 0; height: 0; }
    .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #cbd5e1; transition: .2s; border-radius: 14px; }
    .slider:before { position: absolute; content: ""; height: 10px; width: 10px; left: 2px; bottom: 2px; background-color: white; transition: .2s; border-radius: 50%; }
    input:checked + .slider { background-color: #166534; }
    input:checked + .slider:before { transform: translateX(12px); }

    .table-scroll { overflow-x: auto; min-height: 350px; border-top: 1px solid #e2e8f0; }
    .data-table-genexus { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.82rem; }
    .data-table-genexus th { 
      background: #f8fafc; 
      color: #334155; 
      font-size: 0.8rem; 
      font-weight: 700; 
      padding: 0.65rem 0.85rem; 
      border-bottom: 1px solid #e2e8f0;
      border-right: 1px solid #f1f5f9;
      white-space: nowrap;
    }
    .data-table-genexus td { 
      padding: 0.6rem 0.85rem; 
      border-bottom: 1px solid #f1f5f9; 
      border-right: 1px solid #f8fafc;
      color: #334155; 
      white-space: nowrap;
    }
    .data-table-genexus tr:hover td { background: #f8fafc; }
    .text-green-link { color: #166534; font-weight: 700; cursor: pointer; text-decoration: none; }
    .text-green-link:hover { text-decoration: underline; }
    .text-right { text-align: right; }
    .text-uppercase { text-transform: uppercase; }
    .font-bold { font-weight: bold; }

    .checkbox-col { width: 32px; text-align: center; }
    .custom-checkbox { width: 14px; height: 14px; cursor: pointer; accent-color: #166534; }

    .totals-row td { background: #f8fafc; border-top: 2px solid #cbd5e1; padding: 0.6rem 0.85rem; }
    .summary-value { font-size: 0.85rem; color: #0f172a; }
    .summary-cnt-box { text-align: right; font-size: 0.78rem; color: #475569; }
    .cnt-header { font-weight: 700; }
    .cnt-value { font-weight: 800; color: #0f172a; margin-top: 2px; }

    .pagination-footer-legacy { 
      padding: 1rem 1.25rem; 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      background: #ffffff; 
      font-size: 0.82rem;
      color: #64748b;
      border-top: 1px solid #e2e8f0;
    }
    .page-controls-legacy { display: flex; gap: 0.3rem; align-items: center; }
    .btn-page-legacy { background: white; border: 1px solid #cbd5e1; border-radius: 4px; padding: 0.3rem 0.75rem; font-size: 0.8rem; color: #334155; cursor: pointer; }
    .btn-page-legacy:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-page-num { background: white; border: 1px solid #cbd5e1; border-radius: 4px; min-width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.8rem; color: #334155; cursor: pointer; }
    .btn-page-num.active { background: #166534; color: white; border-color: #14532d; font-weight: bold; }

    .legacy-date-footer { margin-top: 1rem; padding: 0.75rem 1.25rem; border-top: 1px solid #e2e8f0; display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; color: #64748b; }
    .date-input-legacy { border: 1px solid #cbd5e1; border-radius: 4px; padding: 0.2rem 0.5rem; font-size: 0.8rem; width: 85px; text-align: center; }
    .copyright-text { margin-left: auto; }

    /* ESTILOS DE VISTA DE DETALLE (IMAGEN 1) */
    .card-header-green-line {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 0.75rem;
      margin-bottom: 1.25rem;
    }
    .title-text { font-size: 1rem; font-weight: 700; color: #166534; }
    .view-grid-4col {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.25rem 1.5rem;
      margin-bottom: 1.5rem;
    }
    .view-item { display: flex; flex-direction: column; gap: 0.25rem; }
    .view-item.full-width { grid-column: span 4; }
    .view-item .label { font-size: 0.78rem; font-weight: 600; color: #64748b; }
    .view-item .val { font-size: 0.88rem; color: #1e293b; font-weight: 500; min-height: 20px; }

    .view-action-buttons { display: flex; gap: 0.75rem; border-top: 1px solid #f1f5f9; padding-top: 1.25rem; }
    .btn-primary-green-view { background: #4caf50; color: white; border: none; padding: 0.55rem 1.75rem; border-radius: 6px; font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: background 0.2s; }
    .btn-primary-green-view:hover { background: #388e3c; }
    .btn-cancelar-grey-view { background: #9e9e9e; color: white; border: none; padding: 0.55rem 1.75rem; border-radius: 6px; font-weight: 700; font-size: 0.85rem; cursor: pointer; }
    .btn-cancelar-grey-view:hover { background: #757575; }

    /* ESTILOS DE SUB-TABLAS (IMAGEN 1) */
    .tab-header-list { display: flex; gap: 1.5rem; border-bottom: 2px solid #e2e8f0; margin-bottom: 1rem; }
    .tab-btn { background: transparent; border: none; padding: 0.6rem 0.2rem; font-size: 0.88rem; font-weight: 600; color: #64748b; cursor: pointer; position: relative; }
    .tab-btn.active { color: #166534; font-weight: 700; }
    .tab-btn.active::after { content: ""; position: absolute; bottom: -2px; left: 0; right: 0; height: 2px; background: #166534; }

    .subtab-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.85rem; }
    .btn-add-icon { background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 0.35rem 0.65rem; font-size: 0.9rem; cursor: pointer; color: #334155; }
    .btn-add-icon:hover { background: #f1f5f9; }
    .right-tools { display: flex; align-items: center; gap: 0.5rem; }
    .filter-funnel { font-size: 0.85rem; font-weight: bold; color: #64748b; }
    .icon-btn-action { background: transparent; border: none; font-size: 0.85rem; cursor: pointer; opacity: 0.7; padding: 2px 4px; }
    .icon-btn-action:hover { opacity: 1; }

    /* ESTILOS DE FORMULARIO DE EDICIÓN (IMÁGENES 2, 3, 4 Y 5) */
    .form-grid-2col { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem 1.5rem; }
    .form-field-group { display: flex; flex-direction: column; gap: 0.35rem; }
    .form-field-group.full-width { grid-column: span 2; }
    .form-field-group label { font-size: 0.82rem; font-weight: 600; color: #475569; }
    
    .input-form-qa { border: 1px solid #cbd5e1; border-radius: 6px; padding: 0.5rem 0.75rem; font-size: 0.85rem; color: #1e293b; outline: none; transition: border-color 0.2s; }
    .input-form-qa:focus { border-color: #166534; box-shadow: 0 0 0 2px rgba(22, 101, 52, 0.1); }
    .input-form-qa.disabled { background: #f8fafc; color: #64748b; border-color: #e2e8f0; cursor: not-allowed; }
    .select-form-qa { border: 1px solid #cbd5e1; border-radius: 6px; padding: 0.5rem 0.75rem; font-size: 0.85rem; color: #1e293b; outline: none; background: white; }
    .textarea-form-qa { border: 1px solid #cbd5e1; border-radius: 6px; padding: 0.5rem 0.75rem; font-size: 0.85rem; color: #1e293b; outline: none; resize: vertical; }

    .input-with-search { display: flex; align-items: center; gap: 0.25rem; }
    .input-with-search input { flex: 1; }
    .btn-search-icon { background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 0.45rem 0.6rem; cursor: pointer; font-size: 0.9rem; }
    .btn-search-icon:hover { background: #f1f5f9; }

    /* ESTILOS DE HISTORIAL AUDITORIA */
    .audit-split-container { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 0.5rem; }
    .audit-panel { border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background: #ffffff; }
    .audit-panel-header { padding: 0.65rem 1rem; background: #f8fafc; border-bottom: 1px solid #e2e8f0; font-weight: 700; color: #475569; font-size: 0.85rem; }
    .audit-panel-body { padding: 1rem; min-height: 180px; }
    .audit-table-mini { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.8rem; }
    .audit-table-mini th { border-bottom: 1px solid #cbd5e1; padding: 0.5rem; color: #475569; font-weight: 700; }
    .audit-table-mini td { padding: 0.5rem; border-bottom: 1px solid #f1f5f9; color: #334155; }

    /* ESTILOS DE FILTRO EMBUDO & BUSCADOR */
    .dropdown-wrapper { position: relative; display: inline-block; }
    .btn-filter-funnel-qa { background: #ffffff; border: 1px solid #dcdde1; border-radius: 4px; padding: 0.4rem 0.6rem; height: 32px; display: inline-flex; align-items: center; justify-content: center; gap: 3px; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.08); transition: background 0.2s; }
    .btn-filter-funnel-qa:hover { background: #f8fafc; border-color: #cbd5e1; }
    .chevron-down-dark { font-size: 0.7rem; color: #334155; }
    .filter-popover-qa { position: absolute; top: calc(100% + 4px); right: 0; background: #ffffff !important; border: 1px solid #cbd5e1 !important; border-radius: 6px !important; width: 180px !important; box-shadow: 0 6px 20px rgba(0,0,0,0.15) !important; z-index: 99999 !important; padding: 6px 0 !important; box-sizing: border-box; }
    .filter-item-qa { display: flex; align-items: center; gap: 8px; padding: 0.55rem 0.9rem; font-size: 0.85rem; color: #334155; font-weight: 500; cursor: pointer; transition: background 0.15s; }
    .filter-item-qa:hover { background: #f1f5f9; color: #2e7d32; }
    .icon-circle-cross-dark { display: inline-flex; align-items: center; justify-content: center; width: 15px; height: 15px; background: #475569; color: white; border-radius: 50%; font-size: 8px; font-weight: bold; }
    .filter-item-qa:hover .icon-circle-cross-dark { background: #2e7d32; }
    .icon-floppy-dark { font-size: 0.9rem; color: #475569; }
    .filter-item-qa:hover .icon-floppy-dark { color: #2e7d32; }
    .dropdown-divider { height: 1px; background: #f1f5f9; margin: 0.75rem 0; }
    .dropdown-header-saved { font-size: 0.7rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; margin: 0.5rem 0.5rem 0.25rem; }
    .saved-filter-item { justify-content: space-between; font-weight: 600; color: #166534; }
    .btn-delete-saved-filter { cursor: pointer; opacity: 0.6; padding: 2px; }
    .btn-delete-saved-filter:hover { opacity: 1; color: #ef4444; }
  `]
})
export class BobinasListComponent implements OnInit {
  private prodService = inject(ProduccionService);
  private cdr = inject(ChangeDetectorRef);
  private notify = inject(NotificationService);
  
  bobinas: (Bobina & { selected?: boolean; estadoStr?: string })[] = [];
  filteredBobinas: (Bobina & { selected?: boolean })[] = [];
  searchTerm: string = '';
  
  exportMenuOpen = false;
  columnMenuOpen = false;
  mostrandoEliminadas = false;
  activeRowId: string | null = null;

  // Filtros Avanzados (Persistencia Local)
  showSearchFilterDropdown = false;
  savedFilters: any[] = [];

  // Control de Modo de Vista: 'LIST' | 'VIEW' | 'EDIT'
  currentView: 'LIST' | 'VIEW' | 'EDIT' = 'LIST';
  activeSubTab: 'prensado' | 'extrusora' | 'auditoria' = 'prensado';
  selectedBobina: any = {};

  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  pages: number[] = [1];

  columns: ColumnConfig[] = [
    { field: 'noSerie', header: 'No Serie ▾', visible: true, fixed: 'none' },
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
    { field: 'paqueteAditivos', header: 'Paquete Aditivos ▾', visible: true, fixed: 'none' },
    { field: 'productoId', header: 'Producto Id ▾', visible: true, fixed: 'none' },
    { field: 'productoNombre', header: 'Producto Nombre ▾', visible: true, fixed: 'none' },
    { field: 'tipoMaterial', header: 'Tipo Material ▾', visible: true, fixed: 'none' },
    { field: 'prensa', header: 'Prensa ▾', visible: true, fixed: 'none' },
    { field: 'interrupcionesMotivo', header: 'Interrupciones Motivo ▾', visible: true, fixed: 'none' },
    { field: 'timeCode', header: 'Time Code ▾', visible: true, fixed: 'none' },
    { field: 'timeDescription', header: 'Time Description ▾', visible: true, fixed: 'none' },
    { field: 'timeType', header: 'Time Type ▾', visible: true, fixed: 'none' }
  ];

  get visibleColumns() { 
    return this.columns.filter(c => c.visible);
  }

  ngOnInit() {
    this.loadSavedFiltersFromStorage();
    this.prodService.seedBobinasTest().subscribe({
      next: () => this.cargarDatos(),
      error: () => this.cargarDatos()
    });
  }

  cargarDatos() {
    if (this.mostrandoEliminadas) {
      this.prodService.getBobinasEliminadas().subscribe({
        next: (data) => {
          this.bobinas = data.map(d => ({
            id: d.id, noSerie: 'ELIMINADA', bobinaNo: 0, kg: 0,
            espesor: 0, fechaProduccion: d.timestamp, estado: 0, estadoStr: 'Eliminada', selected: false
          }));
          this.onSearch();
        },
        error: (err) => console.error('Error al cargar bobinas eliminadas:', err)
      });
    } else {
      this.prodService.getTodasBobinas().subscribe({
        next: (data) => {
          this.bobinas = data.map(b => ({ ...b, selected: false }));
          this.onSearch();
        },
        error: () => {
          this.prodService.getBobinasDisponibles().subscribe({
            next: (data) => {
              this.bobinas = data.map(b => ({ ...b, selected: false }));
              this.onSearch();
            }
          });
        }
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
        (this.getExtrusoraNombre(b).toLowerCase().includes(term)) ||
        (this.getOperadorNombre(b).toLowerCase().includes(term)) ||
        (b.bobinaOrigen && b.bobinaOrigen.toLowerCase().includes(term))
      );
    }
    this.updatePagination();
    this.cdr.detectChanges();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredBobinas.length / this.pageSize) || 1;
    this.pages = Array.from({ length: Math.min(5, this.totalPages) }, (_, i) => i + 1);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.cdr.detectChanges();
    }
  }

  toggleExportMenu(event: Event) {
    event.stopPropagation();
    this.exportMenuOpen = !this.exportMenuOpen;
    if (this.exportMenuOpen) this.columnMenuOpen = false;
  }

  toggleColumnMenu(event: Event) {
    event.stopPropagation();
    this.columnMenuOpen = !this.columnMenuOpen;
    if (this.columnMenuOpen) this.exportMenuOpen = false;
  }

  toggleRowOptions(b: any, event: Event) {
    event.stopPropagation();
    this.activeRowId = this.activeRowId === b.id ? null : b.id;
  }

  toggleEliminadas() {
    this.mostrandoEliminadas = !this.mostrandoEliminadas;
    this.cargarDatos();
  }

  obtenerInterrupcion() {
    this.prodService.llenadoBobinaInterrupcion().subscribe({
      next: (res) => {
        this.notify.info(`Se han asignado ${res.asignadas || 0} interrupciones a bobinas recientes.`);
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

  // Navegación entre Vistas
  verDetalleBobina(b: any) {
    this.activeRowId = null;
    this.selectedBobina = { ...b };
    this.currentView = 'VIEW';
  }

  abrirEditarBobina(b: any) {
    this.activeRowId = null;
    this.selectedBobina = {
      ...b,
      estadoStr: this.getEstadoTexto(b),
      motivoMolino: b.motivoMolino ?? 0,
      bobinaOrigen: b.bobinaOrigen || 'A',
      horaInicioStr: this.formatDateTimeLocal(b.horaInicio),
      horaSalidaStr: this.formatDateTimeLocal(b.horaSalida),
      iniciaReposoStr: this.formatDateTimeLocal(b.iniciaReposo)
    };
    this.currentView = 'EDIT';
  }

  // Regla real del legado (ver docs/hallazgo_motivomolino_bobina.md): capturar Kg (bobina
  // buena) fuerza Motivo Molino a "No Aplica" y deshabilita el campo; capturar Merma Kg
  // (bobina rechazada) lo habilita para elegir el motivo real.
  motivoMolinoHabilitado(): boolean {
    return Number(this.selectedBobina?.mermaKg) > 0;
  }

  onKgChange() {
    if (Number(this.selectedBobina.kg) > 0) {
      this.selectedBobina.mermaKg = 0;
      this.selectedBobina.motivoMolino = 0;
    }
  }

  onMermaKgChange() {
    if (Number(this.selectedBobina.mermaKg) > 0) {
      this.selectedBobina.kg = 0;
    } else {
      this.selectedBobina.motivoMolino = 0;
    }
  }

  // Date formatting utility
  private formatDateTimeLocal(d: Date | string | undefined | null): string {
    if (!d) return '';
    const date = new Date(d);
    const tzoffset = date.getTimezoneOffset() * 60000;
    return (new Date(date.getTime() - tzoffset)).toISOString().slice(0, 16);
  }

  irALista() {
    this.currentView = 'LIST';
    this.selectedBobina = {};
  }

  guardarCambiosModal() {
    if (!this.selectedBobina.id) return;
    
    const estadoNum = this.mapEstadoToNumber(this.selectedBobina.estadoStr);
    const payload = {
      noSerie: this.selectedBobina.noSerie,
      bobinaOrigen: this.selectedBobina.bobinaOrigen,
      kg: this.selectedBobina.kg,
      mermaKg: this.selectedBobina.mermaKg,
      espesor: this.selectedBobina.espesor,
      observaciones: this.selectedBobina.observaciones,
      estado: estadoNum,
      motivoMolino: this.motivoMolinoHabilitado() ? Number(this.selectedBobina.motivoMolino) : 0,
      bobinaNo: this.selectedBobina.bobinaNo,
      carreras: this.selectedBobina.carreras,
      loteVirgen: this.selectedBobina.loteVirgen,
      horaInicio: this.selectedBobina.horaInicioStr ? new Date(this.selectedBobina.horaInicioStr).toISOString() : null,
      horaSalida: this.selectedBobina.horaSalidaStr ? new Date(this.selectedBobina.horaSalidaStr).toISOString() : null,
      iniciaReposo: this.selectedBobina.iniciaReposoStr ? new Date(this.selectedBobina.iniciaReposoStr).toISOString() : null
    };

    this.prodService.actualizarBobina(this.selectedBobina.id, payload).subscribe({
      next: (res) => {
        this.notify.success('Bobina actualizada correctamente.');
        const index = this.bobinas.findIndex(b => b.id === this.selectedBobina.id);
        if (index !== -1) {
          this.bobinas[index] = { 
            ...this.bobinas[index], 
            ...this.selectedBobina, 
            estado: estadoNum, 
            estadoStr: this.mapNumberToEstado(estadoNum) 
          };
          this.onSearch();
        }
        this.irALista();
        this.cargarDatos();
      },
      error: (err) => {
        console.error('Error al actualizar bobina:', err);
        this.notify.error('Error al guardar cambios en la bobina.');
        const index = this.bobinas.findIndex(b => b.id === this.selectedBobina.id);
        if (index !== -1) {
          this.bobinas[index] = { 
            ...this.bobinas[index], 
            ...this.selectedBobina, 
            estado: estadoNum, 
            estadoStr: this.mapNumberToEstado(estadoNum) 
          };
          this.onSearch();
        }
        this.irALista();
      }
    });
  }

  eliminarBobinaRow(b: any) {
    this.activeRowId = null;
    if (confirm(`¿Está seguro de eliminar la bobina ${b.noSerie || b.id}?`)) {
      this.prodService.eliminarBobina(b.id).subscribe({
        next: () => {
          this.notify.success('Bobina eliminada.');
          this.irALista();
          this.cargarDatos();
        },
        error: () => {
          this.bobinas = this.bobinas.filter(item => item.id !== b.id);
          this.onSearch();
          this.irALista();
        }
      });
    }
  }

  imprimirEtiqueta(b: any) {
    this.activeRowId = null;
    this.notify.info(`Imprimiendo etiqueta para la bobina ${b.noSerie || b.id}...`);
  }

  // Helpers
  mapEstadoToNumber(estado: string | number): number {
    if (typeof estado === 'number') return estado;
    switch (estado) {
      case 'En Proceso': case 'EnProceso': return 1;
      case 'En Reposo': case 'Reposo': case 'EnReposo': return 2;
      case 'En Prensado': case 'EnPrensado': return 3;
      case 'Utilizada': return 4;
      case 'Rechazada': return 5;
      case 'Molino': case 'Molido': return 6;
      case 'Pausada': return 7;
      case 'Desmontada': return 8;
      case 'Transferida': return 9;
      case 'Consumida': return 10;
      case 'En Medición': case 'EnMedicion': return 11;
      case 'Disponible': return 12;
      default: return 2;
    }
  }

  mapNumberToEstado(val: number | string): string {
    const num = Number(val);
    switch (num) {
      case 1: return 'En Proceso';
      case 2: return 'En Reposo';
      case 3: return 'En Prensado';
      case 4: return 'Utilizada';
      case 5: return 'Rechazada';
      case 6: return 'Molino';
      case 7: return 'Pausada';
      case 8: return 'Desmontada';
      case 9: return 'Transferida';
      case 10: return 'Consumida';
      case 11: return 'En Medición';
      case 12: return 'Disponible';
      default: return typeof val === 'string' && val ? val : 'En Reposo';
    }
  }

  formatDateLocal(dateVal: any): string {
    if (!dateVal) return '-';
    try {
      let d: Date;
      if (typeof dateVal === 'string') {
        const isIsoNoZone = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?$/.test(dateVal);
        d = isIsoNoZone ? new Date(dateVal + 'Z') : new Date(dateVal);
      } else {
        d = new Date(dateVal);
      }
      if (isNaN(d.getTime())) return String(dateVal);
      
      const pad = (n: number) => n < 10 ? '0' + n : n.toString();
      const day = pad(d.getDate());
      const month = pad(d.getMonth() + 1);
      const year = d.getFullYear();
      const hours = pad(d.getHours());
      const mins = pad(d.getMinutes());
      return `${day}/${month}/${year} ${hours}:${mins}`;
    } catch {
      return String(dateVal);
    }
  }

  getStatusClass(b: any): string {
    const estado = this.getEstadoTexto(b);
    if (estado === 'Consumida') return 'consumida';
    if (estado === 'Molino' || estado === 'Rechazada') return 'molino';
    if (estado === 'En Reposo' || estado === 'Reposo') return 'reposo';
    if (estado === 'Disponible') return 'disponible';
    if (estado === 'Pausada') return 'pausada';
    return 'proceso';
  }

  getExtrusoraNombre(b: any): string {
    return b.extrusoraNombre || b.extrusion?.extrusora?.nombre || '-';
  }

  getTurnoNombre(b: any): string {
    return b.turnoNombre || b.extrusion?.turno?.nombre || '-';
  }

  getColorEstacionTexto(b: any): string {
    if (b.colorEstacionStr) return b.colorEstacionStr;
    const colors: { [key: number]: string } = {
      0: 'Sin Asignar', 1: 'Estación Roja', 2: 'Estación Azul',
      3: 'Estación Verde', 4: 'Estación Amarilla', 5: 'Estación Naranja', 6: 'Estación Blanca'
    };
    if (typeof b.colorEstacion === 'number') return colors[b.colorEstacion] || 'Sin Asignar';
    return b.colorEstacion || '-';
  }

  getEstadoTexto(b: any): string {
    if (b.estadoStr) return this.mapNumberToEstado(this.mapEstadoToNumber(b.estadoStr));
    if (b.estado !== undefined && b.estado !== null) {
      return this.mapNumberToEstado(b.estado);
    }
    return 'En Reposo';
  }

  getMotivoMolinoTexto(b: any): string {
    switch (Number(b?.motivoMolino)) {
      case 1: return 'Falla Mecánica';
      case 2: return 'Limpieza / Contaminación';
      default: return 'No Aplica';
    }
  }

  getOperadorNombre(b: any): string {
    return b.operadorNombre || b.operario?.nombreCompleto || b.extrusion?.operario?.nombreCompleto || '-';
  }

  getSiloMolido(b: any): string {
    return b.siloMolidoNombre || b.siloMolido?.nombre || b.extrusion?.siloMolido?.nombre || '-';
  }

  getSiloVirgen(b: any): string {
    return b.siloVirgenNombre || b.siloVirgen?.nombre || b.extrusion?.siloVirgen?.nombre || '-';
  }

  getLoteVirgen(b: any): string {
    return b.loteVirgen || b.extrusion?.loteSilo || '-';
  }

  getPaqueteAditivos(b: any): string {
    return b.paqueteAditivos || b.extrusion?.lotePaqueteAditivos || '-';
  }

  getProductoId(b: any): string {
    if (b.productoCodigo) return b.productoCodigo;
    if (b.productoClave) return b.productoClave;
    if (b.producto?.codigo) return b.producto.codigo;
    if (b.productoId) {
      const s = b.productoId.toString();
      return s.length > 10 ? s.substring(0, 8).toUpperCase() : s;
    }
    return '-';
  }

  getProductoNombre(b: any): string {
    return b.productoNombre || b.producto?.nombre || b.extrusion?.producto?.nombre || '-';
  }

  getTipoMaterial(b: any): string {
    return b.tipoMaterial || b.producto?.tipoMaterial || '-';
  }

  getPrensa(b: any): string {
    return b.prensaNombre || b.prensado?.prensa?.nombre || b.prensa?.nombre || '-';
  }

  getInterrupcionMotivo(b: any): string {
    return b.interrupcionesMotivo || b.motivoInterrupcion || '-';
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
    return this.filteredBobinas.length || 3368;
  }

  // ─── LÓGICA DE FILTROS AVANZADOS ───────────────────────────────────────────
  toggleSearchFilterDropdown(event: Event) {
    event.stopPropagation();
    this.showSearchFilterDropdown = !this.showSearchFilterDropdown;
    this.columnMenuOpen = false;
    this.exportMenuOpen = false;
  }

  clearAllFilters() {
    this.searchTerm = '';
    this.showSearchFilterDropdown = false;
    this.onSearch();
  }

  loadSavedFiltersFromStorage() {
    const raw = localStorage.getItem('hicone_saved_filters_bobinas');
    this.savedFilters = raw ? JSON.parse(raw) : [];
  }

  saveActiveFilters() {
    this.showSearchFilterDropdown = false;
    const filterName = prompt('Ingrese el nombre para este filtro:', 'Filtro Bobinas ' + new Date().toLocaleDateString());
    if (!filterName) return;

    const newFilter = {
      id: 'F-' + Date.now(),
      name: filterName,
      state: {
        searchTerm: this.searchTerm
      }
    };

    this.savedFilters.push(newFilter);
    localStorage.setItem('hicone_saved_filters_bobinas', JSON.stringify(this.savedFilters));
    this.notify.success('Filtro guardado con éxito.');
  }

  loadSavedFilter(f: any) {
    const s = f.state;
    this.searchTerm = s.searchTerm || '';
    this.showSearchFilterDropdown = false;
    this.onSearch();
  }

  deleteSavedFilter(f: any, event: MouseEvent) {
    event.stopPropagation();
    this.savedFilters = this.savedFilters.filter(item => item.id !== f.id);
    localStorage.setItem('hicone_saved_filters_bobinas', JSON.stringify(this.savedFilters));
  }
}
