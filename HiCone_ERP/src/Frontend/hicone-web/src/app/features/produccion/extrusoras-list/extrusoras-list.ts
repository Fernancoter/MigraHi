import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduccionConfigService, Extrusora, ExtrusoraOperarioRow, Operario, Turno } from '../../../core/services/produccion-config.service';
import { InventarioService, AuditLog } from '../../../core/services/inventario';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-extrusoras-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-fade-in" (click)="closeAllDropdowns()">
      
      <!-- HEADER PRINCIPAL (Se adapta según vista actual) -->
      <div class="page-header-premium">
        <div class="title-section">
          <nav class="breadcrumb-modern">
            <span class="root">Extrusión</span>
            <span class="sep">&rsaquo;</span>
            <span (click)="goToList()" style="cursor:pointer; text-decoration:underline;" *ngIf="viewState !== 'list'">Extrusoras</span>
            <span class="active" *ngIf="viewState === 'list'">Extrusoras</span>
            <span class="active" *ngIf="viewState !== 'list'"> &rsaquo; Gestionar Extrusora</span>
          </nav>
          <h1 class="premium-title">{{ viewState === 'list' ? 'Extrusora' : 'Gestionar Extrusora' }}</h1>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════
           VISTA LISTADO GENERAL
      ═══════════════════════════════════════════ -->
      <div class="card-premium" *ngIf="viewState === 'list'">
        
        <!-- Barra de Acciones -->
        <div class="toolbar-premium" (click)="$event.stopPropagation()">
          <div class="toolbar-left">
            <!-- Botón Exportar -->
            <div class="dropdown-wrapper">
              <button class="btn-premium-secondary" (click)="toggleExportDropdown($event)">
                <span>📥 Exportar</span>
                <span class="chevron-down">▾</span>
              </button>
              <div class="opciones-export-popover animate-slide-up" *ngIf="showExportOptions">
                <button class="btn-export-option" (click)="exportarExcel()">
                  <span>📊 Exportar a XLSX</span>
                </button>
                <button class="btn-export-option" (click)="exportarPDF()">
                  <span>📄 Exportar a PDF</span>
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
                        <input type="checkbox" [(ngModel)]="tempVisibleCols.nombre"> Extrusora
                      </label>
                      <label class="col-item" *ngIf="!colSearch || 'imagen'.includes(colSearch.toLowerCase())">
                        <input type="checkbox" [(ngModel)]="tempVisibleCols.imagen"> Imagen
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
            <div class="search-modern-underline">
              <input type="text" placeholder="Buscar..." [(ngModel)]="searchTerm" (input)="onSearch()">
            </div>
          </div>
        </div>

        <!-- Tabla de Datos -->
        <div class="table-modern-container">
          <table class="table-modern">
            <thead>
              <tr>
                <th class="actions-col"></th>
                <th *ngIf="visibleCols.nombre">Extrusora &nbsp;↑</th>
                <th *ngIf="visibleCols.imagen">Imagen</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let ext of paginatedExtrusoras">
                <td class="actions-cell">
                  <button class="btn-premium-secondary" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;" (click)="openView(ext)">Visualizar</button>
                  <button class="btn-premium-secondary ml-3" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;" (click)="openEdit(ext)">Modificar</button>
                  <button class="btn-premium-danger ml-3" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;" (click)="eliminar(ext)">Eliminar</button>
                </td>
                <td class="ext-name-cell" *ngIf="visibleCols.nombre">{{ ext.nombre }}</td>
                <td *ngIf="visibleCols.imagen">{{ ext.imagen || '—' }}</td>
              </tr>
              <tr *ngIf="filteredExtrusoras.length === 0">
                <td [attr.colspan]="getColspanCount()" class="empty-row-premium">No hay extrusoras registradas.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Paginación -->
        <div class="pagination-container-premium" *ngIf="totalPages > 1">
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
           VISTA CREAR / EDITAR (Gestionar Extrusora)
      ═══════════════════════════════════════════ -->
      <div class="inner-page-form" *ngIf="viewState === 'add' || viewState === 'edit'">
        
        <!-- Panel Información General -->
        <div class="card-premium shadow-sm">
          <div class="toolbar-premium">
            <div class="toolbar-left">
              <span class="subtitle-text">Información General</span>
            </div>
          </div>
          <div style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
            <!-- Número de Extrusora -->
            <div class="form-group-premium">
              <label>Número de Extrusora</label>
              <select class="input-premium" [(ngModel)]="form.numeroExtrusora">
                <option value="" disabled selected>-- Seleccionar --</option>
                <option *ngFor="let c of claves" [value]="c.valor">{{ c.valor }}</option>
              </select>
            </div>

            <!-- Extrusora (Nombre) -->
            <div class="form-group-premium">
              <label style="color: #1e3f66;">Extrusora</label>
              <input class="input-premium" style="color: #1e3f66; font-weight: 600;" type="text" [(ngModel)]="form.nombre" placeholder="Ej. Extrusora 1" />
            </div>

            <!-- Imagen -->
            <div class="form-group-premium">
              <label>Imagen</label>
              <input class="input-premium" type="text" [(ngModel)]="form.imagen" placeholder="Nombre de imagen o URL" />
            </div>
          </div>
        </div>

        <!-- Tabla Asignación de Turnos y Operadores Predeterminados -->
        <div class="card-premium shadow-sm" style="margin-top:0.75rem;">
          <table class="table-modern">
            <thead>
              <tr>
                <th style="width:32px;"></th>
                <th>Turno</th>
                <th>Operador Predeterminado</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngIf="operariosRows.length === 0">
                <td colspan="3" class="empty-row-premium">Sin turnos configurados. Pulse [[Nueva fila]] para agregar.</td>
              </tr>
              <tr *ngFor="let row of operariosRows; let i = index">
                <td style="width:32px; text-align:center;">
                  <button class="btn-row-delete" (click)="deleteOperarioRow(i)" title="Eliminar fila">×</button>
                </td>
                <td>
                  <select class="input-premium" [(ngModel)]="row.turnoId" (change)="onTurnoChange(row)">
                    <option value="" disabled selected>-- Seleccione Turno --</option>
                    <option *ngFor="let t of turnosList" [value]="t.id">{{ t.nombre }}</option>
                  </select>
                </td>
                <td>
                  <select class="input-premium" [(ngModel)]="row.operarioId">
                    <option value="">-- Sin asignar --</option>
                    <option *ngFor="let op of operariosList" [value]="op.id">{{ op.nombre }}</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="inner-table-footer" style="padding: 1rem 1.5rem; background: #f8fafc; border-top: 1px solid #e2e8f0;">
            <span class="new-row-btn" style="color: #10b981; font-weight: 700; cursor: pointer; text-decoration: underline;" (click)="addOperarioRow()">[[Nueva fila]]</span>
          </div>
        </div>

        <!-- Botones de Acción -->
        <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
          <button class="btn-premium" (click)="save()">CONFIRMAR</button>
          <button class="btn-premium-secondary" (click)="goToList()">CANCELAR</button>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════
           VISTA VISUALIZAR (Detalles y Auditoría)
      ═══════════════════════════════════════════ -->
      <div class="inner-page-form" *ngIf="viewState === 'view'">
        
        <!-- Panel Información General (Read Only) -->
        <div class="card-premium shadow-sm">
          <div class="toolbar-premium">
            <div class="toolbar-left">
              <span class="subtitle-text">Información General</span>
            </div>
          </div>
          <div style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
            <div class="form-group-premium">
              <label>Número de Extrusora</label>
              <div class="readonly-text" style="padding: 0.6rem 0.85rem; background: #f1f5f9; border-radius: 8px; font-weight: 600;">{{ form.numeroExtrusora || '—' }}</div>
            </div>
            <div class="form-group-premium">
              <label style="color: #1e3f66;">Extrusora</label>
              <div class="readonly-text" style="padding: 0.6rem 0.85rem; background: #f1f5f9; border-radius: 8px; font-weight: 600; color: #1e3f66;">{{ form.nombre }}</div>
            </div>
            <div class="form-group-premium">
              <label>Imagen</label>
              <div class="readonly-text" style="padding: 0.6rem 0.85rem; background: #f1f5f9; border-radius: 8px; font-weight: 600;">{{ form.imagen || '—' }}</div>
            </div>
          </div>
        </div>

        <!-- Tabla Asignaciones (Read Only) -->
        <div class="card-premium shadow-sm" style="margin-top:0.75rem;">
          <table class="table-modern">
            <thead>
              <tr>
                <th style="width:16px;"></th>
                <th>Turno</th>
                <th>Operador Predeterminado</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngIf="operariosRows.length === 0">
                <td colspan="3" class="empty-row-premium">Sin configuración registrada.</td>
              </tr>
              <tr *ngFor="let row of operariosRows">
                <td style="width:16px;"></td>
                <td style="color: #1e3f66; font-weight: 600;">{{ row.turno }}</td>
                <td style="color: #1e3f66; font-weight: 600;">{{ row.operario || '—' }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="margin-top:1rem; margin-bottom:1.5rem;">
          <button class="btn-premium-secondary" (click)="goToList()">CANCELAR</button>
        </div>

        <!-- Panel Historial Auditoría (Fiel a Imagen 4) -->
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
              ¿Está seguro de que desea eliminar la extrusora <strong>{{ itemAEliminar?.nombre }}</strong>? Esta acción no se puede deshacer.
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

    /* Selector de columnas avanzado (Imagen 2) */
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

    .btn-row-delete { 
      background: transparent; border: none; color: #ef4444; 
      font-size: 1.3rem; font-weight: bold; cursor: pointer; 
      display: flex; align-items: center; justify-content: center; 
      width: 24px; height: 24px; border-radius: 50%; transition: background 0.2s; 
    }
    .btn-row-delete:hover { background: #fee2e2; }

    /* Panel Historial Auditoría (Fiel a Imagen 4) */
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
    .badge-action.update_shifts { background-color: #3b82f6; }

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
export class ExtrusorasListComponent implements OnInit {
  private svc = inject(ProduccionConfigService);
  private auditSvc = inject(InventarioService);
  private cdr = inject(ChangeDetectorRef);

  // Estados de Vista
  viewState: 'list' | 'add' | 'edit' | 'view' = 'list';
  mostrarConfirmarEliminar = false;
  itemAEliminar: Extrusora | null = null;

  // Catálogos e Items
  extrusoras: Extrusora[] = [];
  filteredExtrusoras: Extrusora[] = [];
  claves: { id: string; valor: string }[] = [];
  operariosList: Operario[] = [];
  turnosList: Turno[] = [];

  // Variables de Formulario
  form: Partial<Extrusora> = {};
  operariosRows: ExtrusoraOperarioRow[] = [];

  // Paginación y Búsqueda (Principal)
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 8;

  // Selector de Columnas (Fiel a Imagen 2)
  showColumnSelector = false;
  visibleCols = { nombre: true, imagen: true };
  tempVisibleCols = { nombre: true, imagen: true };
  colSearch = '';
  colFijasIzqExpanded = true;
  colNoFijasExpanded = true;
  colFijasDerExpanded = true;

  // Popover de Exportar
  showExportOptions = false;

  // Historial de Auditoría (Fiel a Imagen 4)
  auditHistory: AuditLog[] = [];
  selectedAuditLog: AuditLog | null = null;
  parsedChanges: any[] = [];
  auditCurrentPage = 1;
  auditPageSize = 5;

  ngOnInit() {
    this.loadCatalogos();
    this.loadData();
  }

  loadCatalogos() {
    this.svc.getCatalogosClaves().subscribe({
      next: c => { this.claves = c; this.cdr.detectChanges(); },
      error: e => console.error('Error cargando claves', e)
    });

    this.svc.getOperarios().subscribe({
      next: ops => { this.operariosList = ops; this.cdr.detectChanges(); },
      error: e => console.error('Error cargando operarios', e)
    });

    this.svc.getTurnos().subscribe({
      next: t => { this.turnosList = t; this.cdr.detectChanges(); },
      error: e => console.error('Error cargando turnos', e)
    });
  }

  loadData() {
    this.svc.getExtrusoras().subscribe({
      next: data => {
        this.extrusoras = data || [];
        this.applyFilter();
        this.cdr.detectChanges();
      },
      error: e => console.error('Error al cargar extrusoras', e)
    });
  }

  // Filtrado y Búsqueda
  onSearch() {
    this.currentPage = 1;
    this.applyFilter();
  }

  applyFilter() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredExtrusoras = this.extrusoras;
    } else {
      this.filteredExtrusoras = this.extrusoras.filter(e =>
        e.nombre.toLowerCase().includes(term) || 
        (e.numeroExtrusora && e.numeroExtrusora.toLowerCase().includes(term))
      );
    }
  }

  // Paginación Principal
  get paginatedExtrusoras(): Extrusora[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredExtrusoras.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredExtrusoras.length / this.pageSize) || 1;
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
  }

  toggleColumnDropdown(event: Event) {
    event.stopPropagation();
    this.showExportOptions = false;
    this.tempVisibleCols = { ...this.visibleCols };
    this.showColumnSelector = !this.showColumnSelector;
  }

  toggleExportDropdown(event: Event) {
    event.stopPropagation();
    this.showColumnSelector = false;
    this.showExportOptions = !this.showExportOptions;
  }

  // Lógica Selector Columnas (Imagen 2)
  resetColumns() {
    this.tempVisibleCols = { nombre: true, imagen: true };
  }

  applyColumns() {
    this.visibleCols = { ...this.tempVisibleCols };
    this.showColumnSelector = false;
  }

  getColspanCount(): number {
    let count = 1; // Columna de acciones
    if (this.visibleCols.nombre) count++;
    if (this.visibleCols.imagen) count++;
    return count;
  }

  // Navegación Interna
  goToList() {
    this.viewState = 'list';
    this.form = {};
    this.operariosRows = [];
    this.auditHistory = [];
    this.selectedAuditLog = null;
    this.parsedChanges = [];
    this.loadData();
  }

  // CRUD — Insert / Update (Gestionar Extrusora)
  openCreate() {
    this.closeAllDropdowns();
    this.form = { nombre: '', numeroExtrusora: '', imagen: '' };
    this.operariosRows = [];
    this.viewState = 'add';
  }

  openEdit(item: Extrusora) {
    this.closeAllDropdowns();
    this.form = { ...item };
    this.operariosRows = [];
    this.viewState = 'edit';
    if (item.id) {
      this.svc.getExtrusoraOperarios(item.id).subscribe({
        next: rows => { this.operariosRows = rows || []; this.cdr.detectChanges(); },
        error: e => console.error(e)
      });
    }
  }

  // CRUD — Visualizar y Auditoría
  openView(item: Extrusora) {
    this.closeAllDropdowns();
    this.form = { ...item };
    this.operariosRows = [];
    this.viewState = 'view';
    if (item.id) {
      // Cargar operarios
      this.svc.getExtrusoraOperarios(item.id).subscribe({
        next: rows => { this.operariosRows = rows || []; this.cdr.detectChanges(); },
        error: e => console.error(e)
      });

      // Cargar historial de auditoría real del backend
      this.auditHistory = [];
      this.selectedAuditLog = null;
      this.parsedChanges = [];
      this.auditCurrentPage = 1;
      this.loadAuditHistory(item.id);
    }
  }

  loadAuditHistory(extrusoraId: string) {
    this.auditSvc.getAuditHistory('Extrusora', extrusoraId).subscribe({
      next: history => {
        this.auditHistory = history || [];
        this.cdr.detectChanges();
      },
      error: e => console.error('Error al cargar historial de auditoría', e)
    });
  }

  // Paginación del Historial de Auditoría (Fiel a Imagen 4)
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
        const changes = JSON.parse(log.changesJson);
        this.parsedChanges = Array.isArray(changes) ? changes : [changes];
      } catch (e) {
        this.parsedChanges = [{ Property: 'Cambio', Old: 'N/A', New: 'Cambios no estructurados o error al parsear' }];
      }
    }
  }

  // Manejo de la Tabla Dinámica de Turno vs Operador
  addOperarioRow() {
    this.operariosRows.push({
      turnoId: '',
      turno: '',
      operarioId: '',
      operario: ''
    });
  }

  deleteOperarioRow(index: number) {
    this.operariosRows.splice(index, 1);
  }

  onTurnoChange(row: ExtrusoraOperarioRow) {
    const match = this.turnosList.find(t => t.id === row.turnoId);
    if (match) {
      row.turno = match.nombre;
    }
  }

  // Guardar (Confirmar)
  save() {
    if (!this.form.nombre?.trim()) {
      alert('El nombre de la extrusora es requerido.');
      return;
    }
    if (!this.form.numeroExtrusora?.trim()) {
      alert('El número de extrusora es requerido.');
      return;
    }

    const dto = {
      nombre: this.form.nombre.trim(),
      numeroExtrusora: this.form.numeroExtrusora.trim(),
      imagen: this.form.imagen || '',
      tenantId: '00000000-0000-0000-0000-000000000001'
    };

    if (this.viewState === 'add') {
      this.svc.createExtrusora(dto).subscribe({
        next: (id: string) => {
          this.saveOperariosBatch(id);
        },
        error: e => {
          console.error(e);
          alert('Error al guardar la extrusora.');
        }
      });
    } else {
      this.svc.updateExtrusora(this.form.id!, dto).subscribe({
        next: () => {
          this.saveOperariosBatch(this.form.id!);
        },
        error: e => {
          console.error(e);
          alert('Error al actualizar la extrusora.');
        }
      });
    }
  }

  private saveOperariosBatch(extrusoraId: string) {
    // Generar el listado de lote
    const batchItems = this.operariosRows
      .filter(row => row.turnoId)
      .map(row => ({
        turnoId: row.turnoId,
        operarioId: row.operarioId || null,
        tenantId: '00000000-0000-0000-0000-000000000001'
      }));

    this.svc.saveExtrusoraOperariosBatch(extrusoraId, batchItems).subscribe({
      next: () => {
        this.goToList();
      },
      error: e => {
        console.error(e);
        alert('Se guardó la extrusora pero ocurrió un error al guardar los operadores por turno.');
        this.goToList();
      }
    });
  }

  // Eliminar
  eliminar(item: Extrusora) {
    this.itemAEliminar = item;
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
    this.svc.deleteExtrusora(this.itemAEliminar.id).subscribe({
      next: () => {
        this.mostrarConfirmarEliminar = false;
        this.itemAEliminar = null;
        this.loadData();
        if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
        this.cdr.detectChanges();
      },
      error: e => {
        console.error(e);
        alert('Error al eliminar la extrusora.');
        this.mostrarConfirmarEliminar = false;
        this.itemAEliminar = null;
        this.cdr.detectChanges();
      }
    });
  }

  // Exportación Funcional
  exportarExcel() {
    this.showExportOptions = false;
    const dataToExport = this.filteredExtrusoras.map(e => {
      const row: any = {};
      if (this.visibleCols.nombre) row['Extrusora'] = e.nombre;
      if (this.visibleCols.imagen) row['Imagen'] = e.imagen || '';
      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Extrusoras');
    
    // Ancho de columnas automático
    const maxLen = this.filteredExtrusoras.reduce((acc, val) => {
      acc.nombre = Math.max(acc.nombre, val.nombre ? val.nombre.length : 0);
      acc.imagen = Math.max(acc.imagen, val.imagen ? val.imagen.length : 0);
      return acc;
    }, { nombre: 10, imagen: 10 });
    worksheet['!cols'] = [
      { wch: maxLen.nombre + 5 },
      { wch: maxLen.imagen + 5 }
    ];

    XLSX.writeFile(workbook, `Extrusoras_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }

  exportarPDF() {
    this.showExportOptions = false;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'letter' });
    
    doc.setFontSize(18);
    doc.text('Catálogo de Extrusoras', 40, 40);
    doc.setFontSize(10);
    doc.text(`Generado el: ${new Date().toLocaleString()}`, 40, 55);

    const headers: string[] = [];
    if (this.visibleCols.nombre) headers.push('Extrusora');
    if (this.visibleCols.imagen) headers.push('Imagen');

    const rows = this.filteredExtrusoras.map(e => {
      const row: string[] = [];
      if (this.visibleCols.nombre) row.push(e.nombre);
      if (this.visibleCols.imagen) row.push(e.imagen || '');
      return row;
    });

    autoTable(doc, {
      startY: 70,
      head: [headers],
      body: rows,
      theme: 'striped',
      headStyles: { fillColor: [30, 63, 102], textColor: 255 }, // Azul Oscuro #1e3f66
      margin: { left: 40, right: 40 }
    });

    doc.save(`Extrusoras_${new Date().toISOString().slice(0, 10)}.pdf`);
  }
}
