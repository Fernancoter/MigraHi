import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduccionService, ExtrusoraProducto, Extrusora, Producto } from '../../../core/services/produccion';
import { InventarioService, AuditLog } from '../../../core/services/inventario';
import { NotificationService } from '../../../core/services/notification.service';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-extrusora-producto-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-fade-in" (click)="closeAllDropdowns()">
      <!-- HEADER PRINCIPAL -->
      <div class="page-header-premium">
        <div class="title-section">
          <h1 class="premium-title">{{ viewState === 'list' ? 'Extrusora Producto' : 'Gestionar Extrusora Producto' }}</h1>
          <nav class="breadcrumb-modern">
            <span class="root">Extrusión</span>
            <span class="sep">&rsaquo;</span>
            <span (click)="goToList()" style="cursor:pointer; text-decoration:underline;" *ngIf="viewState !== 'list'">Extrusora Producto</span>
            <span class="active" *ngIf="viewState === 'list'">Extrusora Producto</span>
            <span class="active" *ngIf="viewState !== 'list'"> &rsaquo; {{ viewState === 'view' ? 'Visualizar Extrusora Producto' : 'Gestionar Extrusora Producto' }}</span>
          </nav>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════
           VISTA LISTADO GENERAL
      ═══════════════════════════════════════════ -->
      <div class="card-premium" *ngIf="viewState === 'list'">
        <!-- Barra de Acciones Legacy -->
        <div class="toolbar-premium" (click)="$event.stopPropagation()">
          <div class="toolbar-left">
            <!-- Botón Exportar -->
            <div class="export-dropdown-wrapper">
              <button class="btn-export-qa" (click)="toggleExportDropdown($event)" title="Exportar datos">
                📥 Exportar <span class="chevron-down-qa">▾</span>
              </button>
              <div class="export-popover-qa shadow-premium" *ngIf="showExportOptions" (click)="$event.stopPropagation()">
                <button class="export-item-qa" (click)="exportarExcel()">
                  <span class="export-icon">📊</span> Excel (CSV)
                </button>
                <button class="export-item-qa" (click)="exportarPDF()">
                  <span class="export-icon">📕</span> PDF
                </button>
              </div>
            </div>

            <!-- Botón Agregar -->
            <button class="btn-premium" (click)="openCreate()">
              <span>Agregar</span>
            </button>

            <!-- Selector de Columnas -->
            <div class="dropdown-wrapper">
              <button class="btn-premium-secondary" (click)="toggleColumnDropdown($event)">
                <span>Selecciona columnas</span>
                <span class="chevron-down">▾</span>
              </button>
              
              <div class="col-popover advanced-col-selector animate-slide-up" *ngIf="showColumnSelector" (click)="$event.stopPropagation()">
                <div class="col-search-box">
                  <input type="text" placeholder="Buscar columna..." [(ngModel)]="colSearch" class="col-search-input" />
                </div>
                <div class="col-groups-container">
                  <div class="col-group">
                    <div class="col-group-header" (click)="colFijasIzqExpanded = !colFijasIzqExpanded">
                      <label><input type="checkbox" checked disabled> Fijas a la izquierda</label>
                      <span class="chev" [class.rotated]="colFijasIzqExpanded">▾</span>
                    </div>
                    <div class="col-group-body" *ngIf="colFijasIzqExpanded">
                      <label class="col-item"><input type="checkbox" checked disabled> (Ninguna)</label>
                    </div>
                  </div>
                  <div class="col-group">
                    <div class="col-group-header" (click)="colNoFijasExpanded = !colNoFijasExpanded">
                      <label><input type="checkbox" checked disabled> No fijas</label>
                      <span class="chev" [class.rotated]="colNoFijasExpanded">▾</span>
                    </div>
                    <div class="col-group-body" *ngIf="colNoFijasExpanded">
                      <label class="col-item" *ngIf="!colSearch || 'extrusora'.includes(colSearch.toLowerCase())">
                        <input type="checkbox" [(ngModel)]="tempVisibleCols.extrusora"> Extrusora
                      </label>
                      <label class="col-item" *ngIf="!colSearch || 'producto nombre'.includes(colSearch.toLowerCase())">
                        <input type="checkbox" [(ngModel)]="tempVisibleCols.productoNombre"> Producto Nombre
                      </label>
                      <label class="col-item" *ngIf="!colSearch || 'producto calibre'.includes(colSearch.toLowerCase())">
                        <input type="checkbox" [(ngModel)]="tempVisibleCols.calibre"> Producto Calibre
                      </label>
                      <label class="col-item" *ngIf="!colSearch || 'producto ancho'.includes(colSearch.toLowerCase())">
                        <input type="checkbox" [(ngModel)]="tempVisibleCols.ancho"> Producto Ancho
                      </label>
                      <label class="col-item" *ngIf="!colSearch || 'producto longitud'.includes(colSearch.toLowerCase())">
                        <input type="checkbox" [(ngModel)]="tempVisibleCols.longitud"> Producto Longitud
                      </label>
                      <label class="col-item" *ngIf="!colSearch || 'reposo'.includes(colSearch.toLowerCase())">
                        <input type="checkbox" [(ngModel)]="tempVisibleCols.reposo"> Reposo (min)
                      </label>
                      <label class="col-item" *ngIf="!colSearch || 'proceso'.includes(colSearch.toLowerCase())">
                        <input type="checkbox" [(ngModel)]="tempVisibleCols.proceso"> Proceso (min)
                      </label>
                    </div>
                  </div>
                  <div class="col-group">
                    <div class="col-group-header" (click)="colFijasDerExpanded = !colFijasDerExpanded">
                      <label><input type="checkbox" checked disabled> Fijas a la derecha</label>
                      <span class="chev" [class.rotated]="colFijasDerExpanded">▾</span>
                    </div>
                    <div class="col-group-body" *ngIf="colFijasDerExpanded">
                      <label class="col-item"><input type="checkbox" checked disabled> (Ninguna)</label>
                    </div>
                  </div>
                </div>
                <div class="col-selector-footer">
                  <button class="btn-icon-green" (click)="resetColumns()" title="Restablecer">↺</button>
                  <button class="btn btn-success flex-1" (click)="applyColumns()">Actualizar</button>
                </div>
              </div>
            </div>
          </div>

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
                <div *ngIf="isFilterMenuOpen" style="position: absolute; top: 100%; right: 0; background: white; border: 1px solid #e2e8f0; border-radius: 4px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); z-index: 99999; width: 210px; padding: 0.5rem;" (click)="$event.stopPropagation()">
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
                <input type="text" placeholder="Buscar..." [(ngModel)]="searchTerm" (input)="onSearch()">
              </div>
            </div>
          </div>
        </div>

        <!-- Tabla de Datos -->
        <div class="table-modern-container">
          <table class="table-modern">
            <thead>
              <tr>
                <th class="actions-col"></th>
                <th *ngIf="visibleCols.extrusora">Extrusora &nbsp;▾</th>
                <th *ngIf="visibleCols.productoNombre">Producto Nombre &nbsp;▾</th>
                <th *ngIf="visibleCols.calibre">Producto Calibre &nbsp;▾</th>
                <th *ngIf="visibleCols.ancho">Producto Ancho &nbsp;▾</th>
                <th *ngIf="visibleCols.longitud">Producto Longitud &nbsp;▾</th>
                <th *ngIf="visibleCols.reposo">Reposo (min) &nbsp;▾</th>
                <th *ngIf="visibleCols.proceso">Proceso (min) &nbsp;▾</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let ep of paginatedItems">
                <td class="actions-cell">
                  <button class="btn-premium-secondary" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;" (click)="openView(ep)">Visualizar</button>
                  <button class="btn-premium-secondary ml-3" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;" (click)="openEdit(ep)">Modificar</button>
                  <button class="btn-premium-danger ml-3" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;" (click)="eliminar(ep)">Eliminar</button>
                </td>
                <td class="ext-name-cell" *ngIf="visibleCols.extrusora">{{ ep.extrusora?.nombre || '' }}</td>
                <td *ngIf="visibleCols.productoNombre">{{ ep.producto?.nombre || '' }}</td>
                <td *ngIf="visibleCols.calibre">{{ ep.defaultCalibre || 0.015 | number:'1.3-3' }}</td>
                <td *ngIf="visibleCols.ancho">{{ ep.defaultAncho || 2315 }}</td>
                <td *ngIf="visibleCols.longitud">{{ ep.defaultLongitud || 17950 | number:'1.0-0' }}</td>
                <td *ngIf="visibleCols.reposo">{{ ep.defaultMinutosReposo || 720 }}</td>
                <td *ngIf="visibleCols.proceso">90</td>
              </tr>
              <tr *ngIf="filteredItems.length === 0">
                <td [attr.colspan]="getColspanCount()" class="empty-row-premium">No hay registros de configuración de extrusora-producto.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Paginación estilo QA (Imagen 2) -->
        <div class="pagination-container-premium">
          <span class="pagination-info">Página {{ currentPage }} de {{ totalPages }}</span>
          <div class="pagination-controls">
            <button class="btn-page" [disabled]="currentPage === 1" (click)="prevPage()">Ant</button>
            <button class="btn-page" *ngFor="let p of getPagesList()" [class.active]="currentPage === p" (click)="setPage(p)">
              {{ p }}
            </button>
            <button class="btn-page" [disabled]="currentPage === totalPages" (click)="nextPage()">Sig</button>
          </div>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════
           VISTA CREAR / EDITAR (Gestionar Extrusora Producto)
      ═══════════════════════════════════════════ -->
      <div class="inner-page-form" *ngIf="viewState === 'add' || viewState === 'edit'">
        <div class="card-premium shadow-sm">
          <div class="toolbar-premium">
            <div class="toolbar-left">
              <span class="subtitle-text">Información General</span>
            </div>
          </div>
          <div style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
            <!-- Extrusora -->
            <div class="form-group-premium">
              <label>Extrusora</label>
              <select class="input-premium" [(ngModel)]="form.extrusoraId">
                <option value="" disabled selected>-- Seleccionar --</option>
                <option *ngFor="let ext of extrusoras" [value]="ext.id">{{ ext.nombre }}</option>
              </select>
            </div>

            <!-- Producto -->
            <div class="form-group-premium">
              <label>Producto</label>
              <select class="input-premium" [(ngModel)]="form.productoId">
                <option value="" disabled selected>-- Seleccionar --</option>
                <option *ngFor="let prod of productos" [value]="prod.id">{{ prod.nombre }}</option>
              </select>
            </div>

            <!-- Producto Calibre -->
            <div class="form-group-premium">
              <label>Producto Calibre</label>
              <input class="input-premium" type="number" step="0.001" [(ngModel)]="form.defaultCalibre" />
            </div>

            <!-- Producto Ancho -->
            <div class="form-group-premium">
              <label>Producto Ancho</label>
              <input class="input-premium" type="number" [(ngModel)]="form.defaultAncho" />
            </div>

            <!-- Reposo (min) -->
            <div class="form-group-premium">
              <label>Reposo (min)</label>
              <input class="input-premium" type="number" [(ngModel)]="form.defaultMinutosReposo" />
            </div>

            <!-- Proceso (min) -->
            <div class="form-group-premium">
              <label>Proceso (min)</label>
              <input class="input-premium" type="number" [(ngModel)]="procesoMin" />
            </div>

            <!-- Producto Longitud -->
            <div class="form-group-premium">
              <label>Producto Longitud</label>
              <input class="input-premium" type="number" [(ngModel)]="form.defaultLongitud" />
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
          <button class="btn-premium" (click)="save()">CONFIRMAR</button>
          <button class="btn-premium-secondary" (click)="goToList()">CANCELAR</button>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════
           VISTA VISUALIZAR (Detalles y Auditoría)
      ═══════════════════════════════════════════ -->
      <div class="inner-page-form" *ngIf="viewState === 'view'">
        <div class="card-premium shadow-sm">
          <div class="toolbar-premium">
            <div class="toolbar-left">
              <span class="subtitle-text">Información General</span>
            </div>
          </div>
          <div style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
            <div class="form-group-premium">
              <label>Extrusora</label>
              <div class="readonly-text" style="padding: 0.6rem 0.85rem; background: #f1f5f9; border-radius: 8px; font-weight: 600;">{{ form.extrusora?.nombre }}</div>
            </div>
            <div class="form-group-premium">
              <label>Producto</label>
              <div class="readonly-text" style="padding: 0.6rem 0.85rem; background: #f1f5f9; border-radius: 8px; font-weight: 600;">{{ form.producto?.nombre }}</div>
            </div>
            <div class="form-group-premium">
              <label>Producto Calibre</label>
              <div class="readonly-text" style="padding: 0.6rem 0.85rem; background: #f1f5f9; border-radius: 8px; font-weight: 600;">{{ form.defaultCalibre | number:'1.3-3' }}</div>
            </div>
            <div class="form-group-premium">
              <label>Producto Ancho</label>
              <div class="readonly-text" style="padding: 0.6rem 0.85rem; background: #f1f5f9; border-radius: 8px; font-weight: 600;">{{ form.defaultAncho }}</div>
            </div>
            <div class="form-group-premium">
              <label>Reposo (min)</label>
              <div class="readonly-text" style="padding: 0.6rem 0.85rem; background: #f1f5f9; border-radius: 8px; font-weight: 600;">{{ form.defaultMinutosReposo }}</div>
            </div>
            <div class="form-group-premium">
              <label>Proceso (min)</label>
              <div class="readonly-text" style="padding: 0.6rem 0.85rem; background: #f1f5f9; border-radius: 8px; font-weight: 600;">90</div>
            </div>
            <div class="form-group-premium">
              <label>Producto Longitud</label>
              <div class="readonly-text" style="padding: 0.6rem 0.85rem; background: #f1f5f9; border-radius: 8px; font-weight: 600;">{{ form.defaultLongitud }}</div>
            </div>
          </div>
        </div>

        <div style="margin-top:1rem; margin-bottom:1.5rem;">
          <button class="btn-premium-secondary" (click)="goToList()">CANCELAR</button>
        </div>

        <!-- Panel Historial Auditoría -->
        <div class="card-premium shadow-sm" style="margin-top:1.5rem;">
          <div class="toolbar-premium">
            <div class="toolbar-left">
              <span class="subtitle-text">Historial Auditoria</span>
            </div>
          </div>
          <div class="audit-grid">
            <!-- Columna Change Log -->
            <div class="audit-col">
              <div class="audit-col-header">
                📝 Change Log
              </div>
              <table class="audit-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>User</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngIf="auditHistory.length === 0">
                    <td colspan="2" class="empty-state-sm">Sin registros.</td>
                  </tr>
                  <tr *ngFor="let log of paginatedAudit" 
                      [class.selected]="selectedAuditLog === log" 
                      (click)="selectAuditLog(log)">
                    <td>{{ log.timestamp | date:'dd/MM/yyyy HH:mm:ss' }}</td>
                    <td>{{ log.username || 'Sistema' }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="audit-pag" *ngIf="auditTotalPages > 1">
                <button class="audit-pag-btn" [disabled]="auditCurrentPage === 1" (click)="prevAuditPage()">Ant</button>
                <button class="audit-pag-btn" [disabled]="auditCurrentPage === auditTotalPages" (click)="nextAuditPage()">Sig</button>
              </div>
            </div>

            <!-- Columna Detail -->
            <div class="audit-col">
              <div class="audit-col-header">
                🔎 Detail
              </div>
              <div class="audit-detail-box">
                <div *ngIf="selectedAuditLog">
                  <div class="audit-detail-header">
                    <strong>Acción:</strong> <span class="badge-action" [class]="selectedAuditLog.action.toLowerCase()">{{ selectedAuditLog.action }}</span><br/>
                    <strong>Usuario:</strong> {{ selectedAuditLog.username || 'Sistema' }}<br/>
                    <strong>Fecha:</strong> {{ selectedAuditLog.timestamp | date:'dd/MM/yyyy HH:mm:ss' }}
                  </div>
                  <table class="detail-changes-table">
                    <thead>
                      <tr>
                        <th>Campo</th>
                        <th>Valor Anterior</th>
                        <th>Valor Nuevo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr *ngFor="let change of parsedChanges">
                        <td><strong>{{ change.Property }}</strong></td>
                        <td class="text-danger">{{ change.Old || '—' }}</td>
                        <td class="text-success">{{ change.New || '—' }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div *ngIf="!selectedAuditLog" class="empty-state-sm">
                  Seleccione un registro.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- MODAL DE CONFIRMACIÓN DE ELIMINACIÓN -->
      <div class="modal-overlay-premium" *ngIf="mostrarConfirmarEliminar" (click)="cancelarEliminar()">
        <div class="modal-card-premium animate-scale-in" style="max-width: 450px;" (click)="$event.stopPropagation()">
          <div class="modal-header-premium" style="background: #ef4444; color: white;">
            <h3 style="margin: 0; font-size: 1.15rem; font-weight: 700; color: white; display: flex; align-items: center; gap: 0.5rem;">⚠️ Confirmar Eliminación</h3>
            <button class="btn-icon-premium" (click)="cancelarEliminar()" style="color: white; background: transparent; border: none; font-size: 1rem; cursor: pointer; padding: 0;">✖️</button>
          </div>
          <div class="modal-body-premium" style="padding: 1.5rem; text-align: center;">
            <p style="font-size: 1.05rem; margin-bottom: 1.5rem; color: #334155;">
              ¿Está seguro de que desea eliminar la configuración de Extrusora: <strong>{{ itemAEliminar?.extrusora?.nombre || '' }}</strong> y Producto: <strong>{{ itemAEliminar?.producto?.nombre || '' }}</strong>? Esta acción no se puede deshacer.
            </p>
          </div>
          <div class="modal-footer-premium">
            <button class="btn-premium-danger" (click)="confirmarEliminar()">SÍ, ELIMINAR</button>
            <button class="btn-premium-secondary" (click)="cancelarEliminar()">NO, CANCELAR</button>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .module-page { padding: 3rem; }
    .ml-3 { margin-left: 0.75rem; }
    .ext-name-cell { font-size: 0.85rem; color: #0f172a; font-weight: bold; }

    /* Dropdowns & Popovers */
    .dropdown-wrapper { position: relative; display: inline-block; }
    .opciones-export-popover { 
      position: absolute; left: 0; top: 110%; 
      background: white; border: 1px solid #cbd5e1; border-radius: 4px; 
      box-shadow: 0 6px 16px rgba(0,0,0,.12); z-index: 200; min-width: 160px; 
      display: flex; flex-direction: column; padding: 0.4rem 0; 
    }
    .btn-export-option { 
      background: transparent; border: none; text-align: left; 
      padding: 0.6rem 1rem; font-size: 0.85rem; color: #1e3f66; 
      font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; 
      width: 100%;
    }
    .btn-export-option:hover { background: #f1f5f9; }

    /* Selector de columnas avanzado */
    .col-popover { position: absolute; left: 0; top: 110%; background: white; border: 1px solid #cbd5e1; border-radius: 4px; box-shadow: 0 6px 16px rgba(0,0,0,.12); z-index: 200; }
    .advanced-col-selector { width: 270px; padding: 0; display: flex; flex-direction: column; }
    .col-search-box { padding: 0.5rem; border-bottom: 1px solid #e2e8f0; }
    .col-search-input { width: 100%; border: 1px solid #cbd5e1; border-radius: 4px; padding: 0.45rem 0.5rem; font-size: 0.8rem; box-sizing: border-box; outline: none; }
    .col-groups-container { max-height: 260px; overflow-y: auto; padding: 0.5rem 0; }
    .col-group { display: flex; flex-direction: column; }
    .col-group-header { display: flex; align-items: center; justify-content: space-between; padding: 0.4rem 0.8rem; cursor: pointer; font-size: 0.85rem; color: #475569; }
    .col-group-header:hover { background: #f8fafc; }
    .col-group-header label { display: flex; align-items: center; gap: 0.4rem; cursor: pointer; margin: 0; font-weight: 600; }
    .col-group-body { display: flex; flex-direction: column; padding-left: 1.5rem; }
    .col-item { display: flex; align-items: center; gap: 0.4rem; padding: 0.35rem 0.8rem; font-size: 0.8rem; color: #334155; cursor: pointer; margin: 0; }
    .col-item:hover { background: #f1f5f9; }
    .col-selector-footer { display: flex; gap: 0.5rem; padding: 0.6rem; border-top: 1px solid #e2e8f0; background: #f8fafc; align-items: center; }
    .btn-icon-green { background: #10b981; color: white; border: none; border-radius: 4px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; font-size: 1rem; }
    .btn-icon-green:hover { background: #059669; }
    .flex-1 { flex: 1; }
    .chev { transition: transform .2s; font-size: .85rem; }
    .chev.rotated { transform: rotate(180deg); }

    /* Panel Historial Auditoría */
    .audit-grid { display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid #cbd5e1; }
    .audit-col { display: flex; flex-direction: column; }
    .audit-col:first-child { border-right: 1px solid #cbd5e1; }
    .audit-col-header { background: #f8fafc; padding: 0.65rem 1.25rem; font-size: 0.8rem; font-weight: 700; color: #166534; border-bottom: 1px solid #cbd5e1; display: flex; align-items: center; gap: 0.35rem; }
    
    .audit-table { width: 100%; border-collapse: collapse; }
    .audit-table th { text-align: left; padding: 0.65rem 1.25rem; font-size: 0.75rem; color: #64748b; border-bottom: 1px solid #cbd5e1; }
    .audit-table td { padding: 0.65rem 1.25rem; font-size: 0.85rem; color: #334155; border-bottom: 1px solid #edf2f7; cursor: pointer; }
    .audit-table tr.selected td { background: #f0fdf4; font-weight: 600; color: #166534; }
    .audit-table tr:hover:not(.selected) td { background: #f8fafc; }
    
    .audit-pag { display: flex; justify-content: flex-end; gap: 0.35rem; padding: 0.65rem 1.25rem; border-top: 1px solid #cbd5e1; }
    .audit-pag-btn { padding: 0.3rem 0.75rem; font-size: 0.8rem; color: #475569; border: 1px solid #cbd5e1; background: white; border-radius: 4px; cursor: pointer; font-weight: 700; }
    .audit-pag-btn:disabled { opacity: 0.5; cursor: not-allowed; }

    .audit-detail-box { flex: 1; min-height: 100px; padding: 1.25rem; background: #f8fafc; }
    .audit-detail-header { border-bottom: 1.5px solid #cbd5e1; padding-bottom: 0.75rem; margin-bottom: 0.75rem; font-size: 0.85rem; line-height: 1.5; color: #334155; }
    .badge-action { padding: 0.15rem 0.4rem; border-radius: 4px; font-size: 0.72rem; font-weight: 700; color: white; display: inline-block; text-transform: uppercase; }
    .badge-action.insert { background-color: #10b981; }
    .badge-action.update { background-color: #f59e0b; }
    .badge-action.delete { background-color: #ef4444; }

    .detail-changes-table { width: 100%; border-collapse: collapse; margin-top: 0.5rem; background: white; border: 1px solid #e2e8f0; border-radius: 4px; overflow: hidden; }
    .detail-changes-table th { text-align: left; padding: 0.5rem 0.75rem; font-size: 0.75rem; font-weight: 700; color: #475569; background: #f1f5f9; border-bottom: 1px solid #e2e8f0; }
    .detail-changes-table td { padding: 0.5rem 0.75rem; font-size: 0.8rem; border-bottom: 1px solid #f1f5f9; }
    
    .text-danger { color: #dc2626; }
    .text-success { color: #16a34a; }
    .empty-state-sm { text-align: center; padding: 1rem; color: #94a3b8; font-style: italic; font-size: 0.8rem; }

    .animate-fade-in  { animation: fadeIn .25s ease-out; }
    .animate-slide-up { animation: slideUp .15s ease-out; }
    @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class ExtrusoraProductoListComponent implements OnInit {
  private prodService = inject(ProduccionService);
  private auditSvc = inject(InventarioService);
  private cdr = inject(ChangeDetectorRef);
  private notify = inject(NotificationService);

  // Estados de la vista
  viewState: 'list' | 'add' | 'edit' | 'view' = 'list';
  mostrarConfirmarEliminar = false;
  itemAEliminar: ExtrusoraProducto | null = null;

  // Colecciones e Items
  items: ExtrusoraProducto[] = [];
  filteredItems: ExtrusoraProducto[] = [];
  extrusoras: Extrusora[] = [];
  productos: Producto[] = [];

  // Formulario
  form: Partial<ExtrusoraProducto> = {};
  procesoMin: number = 90;

  // Búsqueda y Paginación
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 8;

  // Popover de Exportación
  showExportOptions = false;
  isFilterMenuOpen = false;
  savedFilters: any[] = [];

  // Selector de columnas
  showColumnSelector = false;
  visibleCols = { extrusora: true, productoNombre: true, calibre: true, ancho: true, longitud: true, reposo: true, proceso: true };
  tempVisibleCols = { ...this.visibleCols };
  colSearch = '';
  colFijasIzqExpanded = true;
  colNoFijasExpanded = true;
  colFijasDerExpanded = true;

  // Auditoría
  auditHistory: AuditLog[] = [];
  selectedAuditLog: AuditLog | null = null;
  parsedChanges: any[] = [];
  auditCurrentPage = 1;
  auditPageSize = 5;

  ngOnInit() {
    this.loadSavedFiltersFromStorage();
    this.loadData();
    this.loadCatalogos();
  }

  loadData() {
    this.prodService.getExtrusoraProductos().subscribe({
      next: (data) => {
        this.items = data;
        this.applyFilter();
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar extrusora-productos:', err)
    });
  }

  loadCatalogos() {
    this.prodService.getExtrusoras().subscribe({
      next: (data) => { this.extrusoras = data; this.cdr.detectChanges(); },
      error: (err) => console.error('Error al cargar extrusoras:', err)
    });

    this.prodService.getProductos().subscribe({
      next: (data) => { this.productos = data; this.cdr.detectChanges(); },
      error: (err) => console.error('Error al cargar productos:', err)
    });
  }

  onSearch() {
    this.currentPage = 1;
    this.applyFilter();
  }

  applyFilter() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredItems = this.items;
    } else {
      this.filteredItems = this.items.filter(ep => 
        (ep.extrusora?.nombre || '').toLowerCase().includes(term) || 
        (ep.producto?.nombre || '').toLowerCase().includes(term)
      );
    }
  }

  // Paginación Principal
  get paginatedItems(): ExtrusoraProducto[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredItems.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredItems.length / this.pageSize) || 1;
  }

  getPagesList(): number[] {
    const list: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) list.push(i);
    return list;
  }

  prevPage() { if (this.currentPage > 1) this.currentPage--; }
  nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; }
  setPage(p: number) { this.currentPage = p; }

  // Gestores de Dropdowns
  closeAllDropdowns() {
    this.showColumnSelector = false;
    this.showExportOptions = false;
    this.isFilterMenuOpen = false;
  }

  toggleColumnDropdown(event: Event) {
    event.stopPropagation();
    this.showExportOptions = false;
    this.isFilterMenuOpen = false;
    this.tempVisibleCols = { ...this.visibleCols };
    this.showColumnSelector = !this.showColumnSelector;
  }

  toggleExportDropdown(event: Event) {
    event.stopPropagation();
    this.showColumnSelector = false;
    this.isFilterMenuOpen = false;
    this.showExportOptions = !this.showExportOptions;
  }

  toggleFilterMenu(event: Event) {
    event.stopPropagation();
    this.showExportOptions = false;
    this.showColumnSelector = false;
    this.isFilterMenuOpen = !this.isFilterMenuOpen;
  }

  loadSavedFiltersFromStorage() {
    const raw = localStorage.getItem('hicone_saved_filters_ext_prod_list');
    this.savedFilters = raw ? JSON.parse(raw) : [];
  }

  clearFilters() {
    this.searchTerm = '';
    this.isFilterMenuOpen = false;
    this.onSearch();
  }

  saveFilter() {
    this.isFilterMenuOpen = false;
    const filterName = prompt('Ingrese el nombre para este filtro:', 'Filtro Extrusora Producto ' + new Date().toLocaleDateString());
    if (!filterName) return;
    const newFilter = {
      id: 'F-' + Date.now(),
      name: filterName,
      state: { searchTerm: this.searchTerm }
    };
    this.savedFilters.push(newFilter);
    localStorage.setItem('hicone_saved_filters_ext_prod_list', JSON.stringify(this.savedFilters));
    this.notify.success('Filtro guardado con éxito.');
  }

  loadSavedFilter(f: any) {
    this.searchTerm = f.state?.searchTerm || '';
    this.currentPage = 1;
    this.isFilterMenuOpen = false;
    this.onSearch();
  }

  deleteSavedFilter(f: any, event: MouseEvent) {
    event.stopPropagation();
    this.savedFilters = this.savedFilters.filter(item => item.id !== f.id);
    localStorage.setItem('hicone_saved_filters_ext_prod_list', JSON.stringify(this.savedFilters));
  }

  resetColumns() {
    this.tempVisibleCols = { extrusora: true, productoNombre: true, calibre: true, ancho: true, longitud: true, reposo: true, proceso: true };
  }

  applyColumns() {
    this.visibleCols = { ...this.tempVisibleCols };
    this.showColumnSelector = false;
  }

  getColspanCount(): number {
    let count = 1; // Columna de acciones
    if (this.visibleCols.extrusora) count++;
    if (this.visibleCols.productoNombre) count++;
    if (this.visibleCols.calibre) count++;
    if (this.visibleCols.ancho) count++;
    if (this.visibleCols.longitud) count++;
    if (this.visibleCols.reposo) count++;
    if (this.visibleCols.proceso) count++;
    return count;
  }

  // Exportación
  exportarExcel() {
    const dataToExport = this.filteredItems.map(ep => ({
      'Extrusora': ep.extrusora?.nombre || '',
      'Producto': ep.producto?.nombre || '',
      'Calibre': ep.defaultCalibre || 0.015,
      'Ancho': ep.defaultAncho || 2315,
      'Longitud': ep.defaultLongitud || 17950,
      'Reposo (min)': ep.defaultMinutosReposo || 720,
      'Proceso (min)': 90
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'ExtrusoraProductos');
    XLSX.writeFile(workbook, 'ExtrusoraProductos.xlsx');
    this.showExportOptions = false;
  }

  exportarPDF() {
    const doc = new jsPDF();
    doc.text('Listado Extrusora Producto', 14, 15);
    
    const headers = [['Extrusora', 'Producto', 'Calibre', 'Ancho', 'Longitud', 'Reposo (min)', 'Proceso (min)']];
    const data = this.filteredItems.map(ep => [
      ep.extrusora?.nombre || '',
      ep.producto?.nombre || '',
      (ep.defaultCalibre || 0.015).toString(),
      (ep.defaultAncho || 2315).toString(),
      (ep.defaultLongitud || 17950).toString(),
      (ep.defaultMinutosReposo || 720).toString(),
      '90'
    ]);

    autoTable(doc, {
      head: headers,
      body: data,
      startY: 20
    });

    doc.save('ExtrusoraProductos.pdf');
    this.showExportOptions = false;
  }

  // Navegación
  goToList() {
    this.viewState = 'list';
    this.loadData();
  }

  openCreate() {
    this.form = {
      defaultCalibre: 0.015,
      defaultAncho: 2315,
      defaultLongitud: 17950,
      defaultMinutosReposo: 720,
      defaultVirgenKg: 0,
      defaultMolidoKg: 0,
      defaultRevHusilloVirgen: 0,
      defaultRevHusilloMolido: 0,
      defaultMetaKg: 0,
      isActive: true
    };
    this.procesoMin = 90;
    this.viewState = 'add';
  }

  openEdit(ep: ExtrusoraProducto) {
    this.form = { ...ep };
    this.procesoMin = 90;
    this.viewState = 'edit';
  }

  openView(ep: ExtrusoraProducto) {
    this.form = ep;
    this.viewState = 'view';
    this.auditHistory = [];
    this.selectedAuditLog = null;
    this.parsedChanges = [];
    this.loadAudit(ep.id);
  }

  // Auditoría (Change Log)
  loadAudit(entityId: string) {
    this.auditSvc.getAuditHistory('ExtrusoraProducto', entityId).subscribe({
      next: (logs) => {
        this.auditHistory = logs || [];
        if (logs && logs.length > 0) {
          this.selectAuditLog(logs[0]);
        }
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar historial auditoría:', err)
    });
  }

  get paginatedAudit(): AuditLog[] {
    const start = (this.auditCurrentPage - 1) * this.auditPageSize;
    return this.auditHistory.slice(start, start + this.auditPageSize);
  }

  get auditTotalPages(): number {
    return Math.ceil(this.auditHistory.length / this.auditPageSize) || 1;
  }

  prevAuditPage() { if (this.auditCurrentPage > 1) this.auditCurrentPage--; }
  nextAuditPage() { if (this.auditCurrentPage < this.auditTotalPages) this.auditCurrentPage++; }

  selectAuditLog(log: AuditLog) {
    this.selectedAuditLog = log;
    this.parsedChanges = [];
    if (log.changesJson) {
      try {
        this.parsedChanges = JSON.parse(log.changesJson);
      } catch (e) {
        console.error('Error al parsear ChangesJson', e);
      }
    }
  }

  save() {
    if (!this.form.extrusoraId || !this.form.productoId) {
      this.notify.warning('Debe seleccionar la Extrusora y el Producto');
      return;
    }

    const selectedProd = this.productos.find(p => p.id === this.form.productoId);
    const payload = {
      extrusoraId: this.form.extrusoraId,
      productoNombre: selectedProd?.nombre || '',
      productoCalibre: Number(this.form.defaultCalibre || 0),
      productoAncho: String(this.form.defaultAncho || '0'),
      productoLongitud: Number(this.form.defaultLongitud || 0),
      reposoMin: Number(this.form.defaultMinutosReposo || 0),
      procesoMin: Number(this.procesoMin || 90)
    };

    if (this.viewState === 'add') {
      this.prodService.createExtrusoraProducto(payload as any).subscribe({
        next: () => {
          this.notify.success('Configuración agregada correctamente');
          this.goToList();
        },
        error: (err) => this.notify.error('Error al agregar configuración: ' + (err.error?.message || err.message))
      });
    } else {
      this.prodService.updateExtrusoraProducto(this.form.id!, payload as any).subscribe({
        next: () => {
          this.notify.success('Configuración modificada correctamente');
          this.goToList();
        },
        error: (err) => this.notify.error('Error al modificar configuración: ' + (err.error?.message || err.message))
      });
    }
  }

  eliminar(ep: ExtrusoraProducto) {
    this.itemAEliminar = ep;
    this.mostrarConfirmarEliminar = true;
    this.cdr.detectChanges();
  }

  cancelarEliminar() {
    this.mostrarConfirmarEliminar = false;
    this.itemAEliminar = null;
    this.cdr.detectChanges();
  }

  confirmarEliminar() {
    if (!this.itemAEliminar) return;
    this.prodService.deleteExtrusoraProducto(this.itemAEliminar.id).subscribe({
      next: () => {
        this.notify.success('Configuración eliminada correctamente');
        this.mostrarConfirmarEliminar = false;
        this.itemAEliminar = null;
        this.loadData();
      },
      error: (err) => {
        this.notify.error('Error al eliminar configuración');
        this.mostrarConfirmarEliminar = false;
        this.itemAEliminar = null;
        this.cdr.detectChanges();
      }
    });
  }
}


