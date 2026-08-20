import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduccionConfigService, Extrusora, ExtrusoraOperarioRow, Operario, Turno } from '../../../../core/services/produccion-config.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-extrusoras-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up" (click)="closeAllDropdowns()">

      <div class="page-header-premium">
        <div class="title-section">
          <h1 class="premium-title">Catálogo de Extrusoras</h1>
          <nav class="breadcrumb-modern">
            <span class="root">Producción</span>
            <span class="sep">&rsaquo;</span>
            <span class="root">Catálogos</span>
            <span class="sep">&rsaquo;</span>
            <span class="active">Extrusoras</span>
          </nav>
        </div>
      </div>

      <div style="display:flex;width:100%;align-items:center;margin-bottom:1.5rem;">
          <!-- LEFT -->
          <div style="display:flex;gap:.75rem;align-items:center;">

            <!-- Exportar -->
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

            <!-- Agregar -->
            <button class="btn btn-primary" (click)="openCreate()">+ Agregar</button>

            <!-- Selector de Columnas -->
            <div class="dropdown-wrapper">
              <button class="btn btn-success" (click)="toggleColumnDropdown($event)">
                Selecciona columnas <span>▾</span>
              </button>
              @if (showColumnSelector()) {
                <div class="col-popover advanced-col-selector animate-slide-up" (click)="$event.stopPropagation()">
                  <div class="col-search-box">
                    <input type="text" placeholder="Buscar columna..." [(ngModel)]="colSearch" class="col-search-input" />
                  </div>
                  <div class="col-groups-container">
                    <div class="col-group">
                      <div class="col-group-header" (click)="colFijasIzqExpanded = !colFijasIzqExpanded">
                        <label><input type="checkbox" checked disabled> Fijas a la izquierda</label>
                        <span class="chev" [class.rotated]="colFijasIzqExpanded">▾</span>
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
                        <span class="chev" [class.rotated]="colNoFijasExpanded">▾</span>
                      </div>
                      @if (colNoFijasExpanded) {
                        <div class="col-group-body">
                          @if (!colSearch || 'extrusora'.includes(colSearch.toLowerCase())) {
                            <label class="col-item">
                              <input type="checkbox" [checked]="isTempColVisible('nombre')" (change)="toggleTempCol('nombre')"> Extrusora
                            </label>
                          }
                          @if (!colSearch || 'imagen'.includes(colSearch.toLowerCase())) {
                            <label class="col-item">
                              <input type="checkbox" [checked]="isTempColVisible('imagen')" (change)="toggleTempCol('imagen')"> Imagen
                            </label>
                          }
                        </div>
                      }
                    </div>
                    <div class="col-group">
                      <div class="col-group-header" (click)="colFijasDerExpanded = !colFijasDerExpanded">
                        <label><input type="checkbox" checked disabled> Fijas a la derecha</label>
                        <span class="chev" [class.rotated]="colFijasDerExpanded">▾</span>
                      </div>
                      @if (colFijasDerExpanded) {
                        <div class="col-group-body">
                          <label class="col-item"><input type="checkbox" checked disabled> (Ninguna)</label>
                        </div>
                      }
                    </div>
                  </div>
                  <div class="col-selector-footer">
                    <button class="btn-icon-green" (click)="resetColumns()" title="Restablecer">↺</button>
                    <button class="btn btn-success flex-1" (click)="applyColumns()">Actualizar</button>
                  </div>
                </div>
              }
            </div>
          </div>

          <div style="flex:1;"></div>

          <!-- RIGHT -->
          <div style="display:flex;gap:.5rem;align-items:center;">
            <div class="filter-search-group-qa">
              <!-- Botón Filtro Avanzado -->
              <div class="dropdown-wrapper">
                <button class="btn-filter-funnel-qa" (click)="toggleFilterDropdown($event)" title="Filtros avanzados">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>
                  <span class="chevron-down-funnel">▾</span>
                </button>
                @if (showFilterOptions()) {
                  <div class="col-popover animate-slide-up" style="width:210px;right:0;left:auto;z-index:99999;" (click)="$event.stopPropagation()">
                    <div class="dd-item" (click)="clearFilters()">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                      Limpiar filtros
                    </div>
                    <div class="dd-item" (click)="saveFilter()">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                      Guardar filtro como...
                    </div>
                    
                    @if (savedFilters.length > 0) {
                      <div style="height:1px; background:#e2e8f0; margin:0.5rem 0;"></div>
                      <div style="font-size:0.7rem; font-weight:700; color:#94a3b8; text-transform:uppercase; padding:0.25rem 0.5rem;">Filtros Guardados</div>
                      @for (f of savedFilters; track f.id) {
                        <div class="dd-item" (click)="loadSavedFilter(f)" style="display:flex; justify-content:space-between; align-items:center;">
                          <span>📁 {{ f.name }}</span>
                          <span (click)="deleteSavedFilter(f, $event)" style="cursor:pointer; opacity:0.6; padding:2px;">🗑️</span>
                        </div>
                      }
                    }
                  </div>
                }
              </div>

              <!-- Campo de Búsqueda Subrayado -->
              <div class="search-modern-underline-qa">
                <input type="text" placeholder="Buscar..."
                  [ngModel]="searchText()" (ngModelChange)="searchText.set($event); currentPage.set(1)" />
              </div>
            </div>
          </div>
        </div>

      <!-- Tabla -->
      <div class="content-card">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width:80px;"></th>
              <th style="width:80px;"></th>
              <th style="width:80px;"></th>
              @if (isColVisible('nombre')) { <th>Extrusora</th> }
              @if (isColVisible('imagen')) { <th>Imagen</th> }
            </tr>
          </thead>
          <tbody>
            @if (loading()) {
              <tr><td colspan="5" class="empty-state">Cargando extrusoras...</td></tr>
            } @else if (paginatedItems().length === 0) {
              <tr><td colspan="5" class="empty-state">No se encontraron extrusoras registradas</td></tr>
            } @else {
              @for (item of paginatedItems(); track item.id) {
                <tr>
                  <td><button class="action-btn view"   (click)="openViewModal(item)">Visualizar</button></td>
                  <td><button class="action-btn edit"   (click)="openEditModal(item)">Modificar</button></td>
                  <td><button class="action-btn delete" (click)="confirmDelete(item)">Eliminar</button></td>
                  @if (isColVisible('nombre')) { <td class="col-bold">{{ item.nombre }}</td> }
                  @if (isColVisible('imagen')) { <td>{{ item.imagen || '—' }}</td> }
                </tr>
              }
            }
          </tbody>
        </table>
      </div>

      <!-- Paginación -->
      @if (totalPages() > 1) {
        <div class="pagination-container">
          <button class="pag-btn" [disabled]="currentPage() === 1" (click)="prevPage()">‹</button>
          @for (p of getPages(currentPage(), totalPages()); track $index) {
            @if (p === '...') { <span class="pag-dots">...</span> }
            @else { <button class="pag-btn" [class.active]="currentPage() === p" (click)="setPage($any(p))">{{ p }}</button> }
          }
          <button class="pag-btn" [disabled]="currentPage() === totalPages()" (click)="nextPage()">›</button>
        </div>
      }

      <!-- ═══════════════════════════════════════════
           MODAL CREAR / MODIFICAR  (Gestionar Extrusora)
      ═══════════════════════════════════════════ -->
      @if (showModal() && !modalReadOnly()) {
        <div class="modal-overlay" (click)="closeModal()">
          <div class="modal-card erp-modal" (click)="$event.stopPropagation()">

            <!-- Cabecera -->
            <div class="gestionar-header">
              <div>
                <h2 class="gestionar-title">Gestionar Extrusora</h2>
                <div class="gestionar-breadcrumb">Producción &rsaquo; Catálogos &rsaquo; Extrusoras</div>
              </div>
            </div>

            <!-- Panel Información General -->
            <div class="erp-panel">
              <div class="erp-panel-header">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                Información General
              </div>
              <div class="erp-panel-body">

                <!-- Número de Extrusora -->
                <div class="erp-field">
                  <label class="erp-label">Número de Extrusora</label>
                  <div class="erp-select-wrapper">
                    <select class="erp-select" [(ngModel)]="form.numeroExtrusora">
                      <option value="">-- Seleccionar --</option>
                      @for (c of claves(); track c.id) {
                        <option [value]="c.valor">{{ c.valor }}</option>
                      }
                    </select>
                  </div>
                </div>

                <div class="erp-separator"></div>

                <!-- Extrusora (nombre) -->
                <div class="erp-field">
                  <label class="erp-label erp-label-blue">Extrusora</label>
                  <input class="erp-input erp-input-blue" type="text" [(ngModel)]="form.nombre" placeholder="Ej. Extrusora 1" />
                </div>

                <!-- Imagen -->
                <div class="erp-field">
                  <label class="erp-label">Imagen</label>
                  <input class="erp-input" type="text" [(ngModel)]="form.imagen" placeholder="URL o nombre de imagen" />
                </div>

              </div>
            </div>

            <!-- Tabla Turno / Operador Predeterminado -->
            <div class="erp-panel" style="margin-top:.75rem;">
              <table class="inner-table">
                <thead>
                  <tr>
                    <th style="width:16px;"></th>
                    <th>Turno</th>
                    <th>Operador Predeterminado</th>
                  </tr>
                </thead>
                <tbody>
                  @if (operariosRows().length === 0) {
                    <tr><td colspan="3" class="empty-state-sm">Sin turnos configurados.</td></tr>
                  }
                  @for (row of operariosRows(); track row.turnoId) {
                    <tr>
                      <td style="width:16px;"></td>
                      <td>{{ row.turno }}</td>
                      <td>
                        <select class="inner-select" [(ngModel)]="row.operarioId">
                          <option value="">-- Sin asignar --</option>
                          @for (op of operariosList(); track op.id) {
                            <option [value]="op.id">{{ op.nombre }}</option>
                          }
                        </select>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
              <div class="inner-table-footer">
                <span class="new-row-btn" (click)="addOperarioRow()">[[Nueva fila]]</span>
              </div>
            </div>

            <div class="erp-footer">
              <button class="btn-erp-confirm" (click)="save()">CONFIRMAR</button>
              <button class="btn-erp-cancel"  (click)="closeModal()">CANCELAR</button>
            </div>
          </div>
        </div>
      }

      <!-- ═══════════════════════════════════════════
           MODAL VISUALIZAR
      ═══════════════════════════════════════════ -->
      @if (showModal() && modalReadOnly()) {
        <div class="modal-overlay" (click)="closeModal()">
          <div class="modal-card viz-modal" (click)="$event.stopPropagation()">

            <!-- Cabecera -->
            <div class="gestionar-header">
              <div>
                <h2 class="gestionar-title">Gestionar Extrusora</h2>
                <div class="gestionar-breadcrumb">Producción &rsaquo; Catálogos &rsaquo; Extrusoras</div>
              </div>
            </div>

            <!-- Info General read-only -->
            <div class="erp-panel">
              <div class="erp-panel-header">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                Información General
              </div>
              <div class="erp-panel-body">
                <div class="erp-field">
                  <label class="erp-label">Número de Extrusora</label>
                  <div class="erp-readonly-value">{{ form.numeroExtrusora || '—' }}</div>
                </div>
                <div class="erp-separator"></div>
                <div class="erp-field">
                  <label class="erp-label erp-label-blue">Extrusora</label>
                  <div class="erp-readonly-value erp-value-blue">{{ form.nombre }}</div>
                </div>
                <div class="erp-field">
                  <label class="erp-label">Imagen</label>
                  <div class="erp-readonly-value">{{ form.imagen || '—' }}</div>
                </div>
              </div>
            </div>

            <!-- Tabla Turno / Operador (read-only) -->
            <div class="erp-panel" style="margin-top:.75rem;">
              <table class="inner-table">
                <thead>
                  <tr>
                    <th style="width:16px;"></th>
                    <th>Turno</th>
                    <th>Operador Predeterminado</th>
                  </tr>
                </thead>
                <tbody>
                  @if (operariosRows().length === 0) {
                    <tr><td colspan="3" class="empty-state-sm">Sin configuración registrada.</td></tr>
                  }
                  @for (row of operariosRows(); track row.turnoId) {
                    <tr>
                      <td style="width:16px;"></td>
                      <td class="inner-td-blue">{{ row.turno }}</td>
                      <td class="inner-td-blue">{{ row.operario || '—' }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>

            <div class="erp-panel-footer" style="margin-top:.75rem; background:white; border:1px solid #d1d5db; border-radius:4px;">
              <button class="btn-erp-cancel" (click)="closeModal()">CANCELAR</button>
            </div>

            <!-- Historial Auditoría -->
            <div class="erp-panel" style="margin-top:1.25rem;">
              <div class="erp-panel-header">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                Historial Auditoria
              </div>
              <div class="audit-grid">
                <div class="audit-col">
                  <div class="audit-col-header">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                    Change Log
                  </div>
                  <table class="audit-table">
                    <thead><tr><th>Date</th><th>User</th></tr></thead>
                    <tbody><tr><td colspan="2" class="empty-state-sm">Sin registros.</td></tr></tbody>
                  </table>
                  <div class="audit-pag">
                    <button class="audit-pag-btn" disabled>Ant</button>
                    <button class="audit-pag-btn" disabled>Sig</button>
                  </div>
                </div>
                <div class="audit-col">
                  <div class="audit-col-header">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    Detail
                  </div>
                  <div class="audit-detail-box">
                    <div class="empty-state-sm">Seleccione un registro.</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      }

      <!-- Modal Eliminar -->
      @if (showDeleteModal()) {
        <div class="modal-overlay" style="z-index:1100;" (click)="closeDeleteModal()">
          <div class="modal-card confirm-modal" (click)="$event.stopPropagation()">
            <button class="modal-close-abs" (click)="closeDeleteModal()">✕</button>
            <div class="confirm-body"><p>¿Está seguro de eliminar la extrusora?</p></div>
            <div class="confirm-footer">
              <button class="btn-erp-confirm" (click)="executeDelete()">Sí</button>
              <button class="btn-erp-cancel"  (click)="closeDeleteModal()">No</button>
            </div>
          </div>
        </div>
      }

    </div>
  `,
  styles: [`
    .module-page { padding: 3rem; }
    .breadcrumb  { font-size:.75rem; color:#94a3b8; font-weight:600; text-transform:uppercase; margin-bottom:.25rem; }
    h1 { font-size:1.8rem; font-weight:800; color:#1e293b; margin:0; }

    .btn { padding:.55rem 1.25rem; border-radius:6px; border:none; cursor:pointer; font-size:.85rem; font-weight:600; transition:all .2s; display:inline-flex; align-items:center; gap:.4rem; }
    .btn-primary   { background:#1e40af; color:white; }
    .btn-primary:hover { background:#1e3a8a; }
    .btn-secondary { background:white; color:#475569; border:1px solid #cbd5e1; }
    .btn-secondary:hover { background:#f8fafc; }
    .btn-success   { background:#5cb85c; color:white; border:1px solid #4cae4c; }
    .btn-success:hover { background:#449d44; }

    .btn-filter { background:white; color:#475569; border:1px solid #e2e8f0; padding:.55rem .75rem; border-radius:6px; display:flex; align-items:center; box-shadow:0 1px 2px rgba(0,0,0,.05); cursor:pointer; }

    .search-box { position:relative; }
    .search-icon { position:absolute; left:.75rem; top:50%; transform:translateY(-50%); color:#94a3b8; }
    .search-input { padding-left:2.2rem; width:220px; border:none; border-bottom:1px solid #cbd5e1; background:transparent; font-size:.875rem; outline:none; }
    .search-input:focus { border-bottom-color:#1e40af; }

    .content-card { background:white; border-radius:8px; border:1px solid #e2e8f0; overflow:visible; box-shadow:0 1px 3px rgba(0,0,0,.02); margin-top:1rem; }
    .data-table   { width:100%; border-collapse:collapse; }
    .data-table th { text-align:left; padding:.75rem 1rem; background:#f8fafc; color:#64748b; font-size:.75rem; font-weight:800; text-transform:uppercase; border-bottom:1px solid #e2e8f0; }
    .data-table td { padding:.85rem 1rem; border-bottom:1px solid #f1f5f9; font-size:.875rem; color:#334155; }
    .data-table tr:hover td { background:#f8fafc; }
    .empty-state  { text-align:center; padding:3.5rem; color:#94a3b8; font-style:italic; }
    .empty-state-sm { text-align:center; padding:1.2rem; color:#94a3b8; font-size:.8rem; font-style:italic; }
    .col-bold     { font-weight:700; color:#1e293b; }

    .action-btn { padding:0; border:none; cursor:pointer; font-size:.8rem; font-weight:600; background:transparent; transition:color .15s; }
    .action-btn.view   { color:#0284c7; } .action-btn.view:hover   { color:#0369a1; text-decoration:underline; }
    .action-btn.edit   { color:#d97706; } .action-btn.edit:hover   { color:#b45309; text-decoration:underline; }
    .action-btn.delete { color:#dc2626; } .action-btn.delete:hover { color:#b91c1c; text-decoration:underline; }

    .dropdown-wrapper { position:relative; }
    .col-popover { position:absolute; left:0; top:110%; background:white; border:1px solid #cbd5e1; border-radius:4px; box-shadow:0 6px 16px rgba(0,0,0,.12); z-index:200; min-width:150px; }
    .dd-item { padding:.65rem 1rem; font-size:.85rem; color:#334155; cursor:pointer; display:flex; align-items:center; gap:.5rem; }
    .dd-item:hover { background:#f1f5f9; }

    .advanced-col-selector { width:270px; padding:0; display:flex; flex-direction:column; }
    .col-search-box { padding:.5rem; border-bottom:1px solid #e2e8f0; }
    .col-search-input { width:100%; border:1px solid #cbd5e1; border-radius:4px; padding:.4rem .5rem; font-size:.8rem; box-sizing:border-box; outline:none; }
    .col-groups-container { max-height:260px; overflow-y:auto; padding:.5rem 0; }
    .col-group { display:flex; flex-direction:column; }
    .col-group-header { display:flex; align-items:center; justify-content:space-between; padding:.35rem .8rem; cursor:pointer; font-size:.85rem; color:#475569; }
    .col-group-header:hover { background:#f8fafc; }
    .col-group-header label { display:flex; align-items:center; gap:.4rem; cursor:pointer; margin:0; font-weight:600; }
    .col-group-body { display:flex; flex-direction:column; padding-left:1.5rem; }
    .col-item { display:flex; align-items:center; gap:.4rem; padding:.28rem .8rem; font-size:.8rem; color:#334155; cursor:pointer; margin:0; }
    .col-item:hover { background:#f1f5f9; }
    .col-selector-footer { display:flex; gap:.5rem; padding:.6rem; border-top:1px solid #e2e8f0; background:#f8fafc; align-items:center; }
    .btn-icon-green { background:#5cb85c; color:white; border:none; border-radius:4px; width:32px; height:32px; display:flex; align-items:center; justify-content:center; cursor:pointer; flex-shrink:0; font-size:1rem; }
    .btn-icon-green:hover { background:#449d44; }
    .flex-1 { flex:1; }
    .chev { transition:transform .2s; font-size:.85rem; }
    .chev.rotated { transform:rotate(180deg); }

    .pagination-container { display:flex; justify-content:center; align-items:center; gap:.4rem; margin-top:1.5rem; }
    .pag-btn { height:2.1rem; min-width:2.1rem; padding:0 .5rem; border-radius:4px; border:1px solid #cbd5e1; background:white; color:#475569; font-weight:600; font-size:.85rem; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all .2s; }
    .pag-btn:hover:not(:disabled) { background:#f8fafc; color:#0f172a; }
    .pag-btn:disabled { opacity:.4; cursor:not-allowed; }
    .pag-btn.active { background:#1e40af; border-color:#1e40af; color:white; }
    .pag-dots { font-size:.85rem; color:#94a3b8; font-weight:700; padding:0 .2rem; }

    .modal-overlay { position:fixed; inset:0; background:rgba(15,23,42,.4); display:flex; align-items:center; justify-content:center; z-index:1000; animation:fadeIn .2s ease; }
    .modal-card { background:transparent; animation:zoomIn .2s ease; }

    .erp-modal  { width:750px; max-width:95vw; display:flex; flex-direction:column; gap:0; }
    .viz-modal  { width:95%; max-width:1050px; max-height:90vh; overflow-y:auto; display:flex; flex-direction:column; gap:0; }

    /* Gestionar header */
    .gestionar-header { background:#2d9c52; padding:.65rem 1rem; border-radius:4px 4px 0 0; margin-bottom:.5rem; }
    .gestionar-title  { color:white; font-size:1.1rem; font-weight:700; margin:0 0 .15rem; }
    .gestionar-breadcrumb { color:rgba(255,255,255,.8); font-size:.75rem; }

    .erp-panel { background:white; border:1px solid #d1d5db; border-radius:4px; overflow:hidden; }
    .erp-panel-header { background:white; border-bottom:1px solid #d1d5db; padding:.5rem .9rem; font-size:.8rem; font-weight:700; color:#16a34a; display:flex; align-items:center; gap:.4rem; }
    .erp-panel-body   { padding:.25rem 0 0; display:flex; flex-direction:column; }
    .erp-panel-footer { padding:.6rem .9rem; border-top:1px solid #e2e8f0; background:white; }

    .erp-field { display:flex; flex-direction:column; border-bottom:1px solid #e5e7eb; padding:.45rem .9rem; }
    .erp-field:last-child { border-bottom:none; }
    .erp-label      { font-size:.75rem; color:#6b7280; margin-bottom:.15rem; }
    .erp-label-blue { color:#4b96d1; }
    .erp-separator  { height:0; border:none; border-top:1px solid #e5e7eb; margin:0; }

    .erp-select-wrapper { position:relative; display:flex; align-items:center; }
    .erp-select { width:100%; border:none; border-bottom:2px solid #d1d5db; padding:.3rem 1.5rem .3rem 0; font-size:.9rem; font-weight:600; color:#1e293b; background:white; outline:none; cursor:pointer; }
    .erp-select:focus { border-bottom-color:#16a34a; }
    .erp-select-wrapper::after { content:'▾'; position:absolute; right:.4rem; color:#6b7280; pointer-events:none; }

    .erp-input       { border:none; border-bottom:1px solid #d1d5db; padding:.3rem 0; font-size:.9rem; color:#1e293b; outline:none; background:white; width:100%; }
    .erp-input:focus { border-bottom-color:#16a34a; }
    .erp-input-blue  { color:#4b96d1; }

    .erp-readonly-value   { font-size:.9rem; color:#1e293b; padding:.3rem 0; }
    .erp-value-blue       { color:#4b96d1; }

    .erp-footer { display:flex; gap:.75rem; padding-top:.9rem; }
    .btn-erp-confirm { padding:.5rem 1.5rem; background:#5cb85c; color:white; border:1px solid #4cae4c; font-size:.8rem; font-weight:700; letter-spacing:.05em; cursor:pointer; border-radius:3px; }
    .btn-erp-confirm:hover { background:#449d44; }
    .btn-erp-cancel  { padding:.5rem 1.5rem; background:#888; color:white; border:1px solid #777; font-size:.8rem; font-weight:700; letter-spacing:.05em; cursor:pointer; border-radius:3px; }
    .btn-erp-cancel:hover  { background:#777; }

    /* Inner table */
    .inner-table { width:100%; border-collapse:collapse; }
    .inner-table th { text-align:left; padding:.5rem .9rem; font-size:.78rem; font-weight:700; color:#334155; border-bottom:1px solid #e2e8f0; background:#f8fafc; }
    .inner-table td { padding:.45rem .9rem; font-size:.85rem; color:#334155; border-bottom:1px solid #f1f5f9; }
    .inner-td-blue { color:#4b96d1; }
    .inner-select { border:none; background:transparent; font-size:.85rem; color:#4b96d1; outline:none; cursor:pointer; width:100%; }
    .inner-table-footer { padding:.5rem .9rem; border-top:1px solid #e2e8f0; }
    .new-row-btn { color:#1e40af; font-size:.8rem; cursor:pointer; text-decoration:underline; }
    .new-row-btn:hover { color:#1e3a8a; }

    /* Audit */
    .audit-grid { display:grid; grid-template-columns:1fr 1fr; border-top:1px solid #e2e8f0; }
    .audit-col  { display:flex; flex-direction:column; }
    .audit-col:first-child { border-right:1px solid #e2e8f0; }
    .audit-col-header { background:white; padding:.45rem .9rem; font-size:.78rem; font-weight:700; color:#16a34a; border-bottom:1px solid #e2e8f0; display:flex; align-items:center; gap:.35rem; }
    .audit-table { width:100%; border-collapse:collapse; }
    .audit-table th { text-align:left; padding:.45rem .9rem; font-size:.75rem; color:#64748b; border-bottom:1px solid #e2e8f0; }
    .audit-table td { padding:.45rem .9rem; font-size:.8rem; color:#334155; }
    .audit-pag  { display:flex; justify-content:flex-end; gap:.35rem; padding:.45rem .9rem; border-top:1px solid #e2e8f0; }
    .audit-pag-btn { padding:.25rem .6rem; font-size:.75rem; color:#475569; border:1px solid #d1d5db; background:white; border-radius:3px; cursor:pointer; }
    .audit-pag-btn:disabled { opacity:.5; cursor:not-allowed; }
    .audit-detail-box { flex:1; min-height:100px; padding:1rem; }

    .confirm-modal { background:white; border:1px solid #e2e8f0; border-radius:4px; width:380px; position:relative; box-shadow:0 20px 25px -5px rgba(0,0,0,.1); }
    .modal-close-abs { position:absolute; top:8px; right:10px; background:none; border:none; font-size:1.1rem; cursor:pointer; color:#94a3b8; }
    .confirm-body  { padding:2.5rem 2rem 1rem; text-align:center; }
    .confirm-body p { margin:0; font-size:.95rem; color:#334155; }
    .confirm-footer { padding:.75rem 2rem 1.5rem; display:flex; justify-content:center; gap:1rem; background:white; }

    .animate-move-up  { animation:moveUp .3s ease-out; }
    .animate-slide-up { animation:slideUp .15s ease-out; }
    @keyframes moveUp  { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
    @keyframes slideUp { from { opacity:0; transform:translateY(8px);  } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
    @keyframes zoomIn  { from { opacity:0; transform:scale(.97); } to { opacity:1; transform:scale(1); } }
  `]
})
export class ExtrusorasCatalogoComponent implements OnInit {
  private svc = inject(ProduccionConfigService);
  private notify = inject(NotificationService);

  items = signal<Extrusora[]>([]);
  claves = signal<{id: string, valor: string}[]>([]);
  operariosList = signal<Operario[]>([]);
  turnosList    = signal<Turno[]>([]);
  operariosRows = signal<ExtrusoraOperarioRow[]>([]);

  loading  = signal(true);

  showModal     = signal(false);
  modalReadOnly = signal(false);
  form: Partial<Extrusora & { imagen?: string }> = {};

  showDeleteModal = signal(false);
  itemToDelete    = signal<Extrusora | null>(null);

  searchText        = signal<string>('');
  showFilterOptions = signal<boolean>(false);
  savedFilters: any[] = [];
  showExportOptions = signal<boolean>(false);
  showColumnSelector = signal<boolean>(false);
  visibleColumns     = signal<string[]>(['nombre', 'imagen']);
  tempVisibleColumns = signal<string[]>(['nombre', 'imagen']);
  colSearch          = '';
  colFijasIzqExpanded = true;
  colNoFijasExpanded  = true;
  colFijasDerExpanded = true;

  currentPage = signal<number>(1);
  pageSize    = signal<number>(8);

  ngOnInit() {
    this.loadSavedFiltersFromStorage();
    this.load();
  }

  load() {
    this.loading.set(true);

    this.svc.getCatalogosClaves().subscribe({
      next: c => this.claves.set(c),
      error: e => console.error('Error cargando claves', e)
    });

    this.svc.getOperarios().subscribe({
      next: ops => this.operariosList.set(ops),
      error: e => console.error(e)
    });

    this.svc.getTurnos().subscribe({
      next: t => this.turnosList.set(t),
      error: e => console.error(e)
    });

    this.svc.getExtrusoras().subscribe({
      next: data => { this.items.set(data); this.loading.set(false); },
      error: ()   => this.loading.set(false)
    });
  }

  loadOperarios() {
    this.svc.getOperarios().subscribe({ next: d => this.operariosList.set(d), error: () => {} });
  }

  filteredItems = computed(() => {
    let list = this.items();
    const s = this.searchText().trim().toLowerCase();
    if (s) list = list.filter(e => e.nombre.toLowerCase().includes(s));
    return list;
  });

  paginatedItems = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredItems().slice(start, start + this.pageSize());
  });

  totalPages = computed(() => Math.ceil(this.filteredItems().length / this.pageSize()) || 1);

  /* ── Dropdowns ────────────────────────────────────── */
  closeAllDropdowns() {
    this.showColumnSelector.set(false);
    this.showExportOptions.set(false);
    this.showFilterOptions.set(false);
  }

  toggleColumnDropdown(event: Event) {
    event.stopPropagation();
    if (!this.showColumnSelector()) this.tempVisibleColumns.set([...this.visibleColumns()]);
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

  clearFilters() { 
    this.searchText.set(''); 
    this.currentPage.set(1); 
    this.showFilterOptions.set(false); 
  }

  loadSavedFiltersFromStorage() {
    const raw = localStorage.getItem('hicone_saved_filters_extrusoras');
    this.savedFilters = raw ? JSON.parse(raw) : [];
  }

  saveFilter() {
    this.showFilterOptions.set(false);
    const filterName = prompt('Ingrese el nombre para este filtro:', 'Filtro Extrusoras ' + new Date().toLocaleDateString());
    if (!filterName) return;

    const newFilter = {
      id: 'F-' + Date.now(),
      name: filterName,
      state: {
        searchText: this.searchText()
      }
    };

    this.savedFilters.push(newFilter);
    localStorage.setItem('hicone_saved_filters_extrusoras', JSON.stringify(this.savedFilters));
    this.notify.success('Filtro guardado con éxito.');
  }

  loadSavedFilter(f: any) {
    const s = f.state;
    this.searchText.set(s.searchText || '');
    this.currentPage.set(1);
    this.showFilterOptions.set(false);
  }

  deleteSavedFilter(f: any, event: MouseEvent) {
    event.stopPropagation();
    this.savedFilters = this.savedFilters.filter(item => item.id !== f.id);
    localStorage.setItem('hicone_saved_filters_extrusoras', JSON.stringify(this.savedFilters));
  }

  /* ── Columns ──────────────────────────────────────── */
  isColVisible(col: string)     { return this.visibleColumns().includes(col); }
  isTempColVisible(col: string) { return this.tempVisibleColumns().includes(col); }
  toggleTempCol(col: string) {
    this.tempVisibleColumns.update(cols =>
      cols.includes(col) ? cols.filter(c => c !== col) : [...cols, col]
    );
  }
  resetColumns() { this.tempVisibleColumns.set(['nombre', 'imagen']); }
  applyColumns() { this.visibleColumns.set([...this.tempVisibleColumns()]); this.showColumnSelector.set(false); }

  /* ── Pagination ───────────────────────────────────── */
  prevPage() { if (this.currentPage() > 1) this.currentPage.update(p => p - 1); }
  nextPage() { if (this.currentPage() < this.totalPages()) this.currentPage.update(p => p + 1); }
  setPage(p: number) { this.currentPage.set(p); }

  getPages(current: number, total: number): (number | string)[] {
    if (total <= 1) return [];
    const pages: (number | string)[] = [1];
    if (current > 3) pages.push('...');
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
    if (current < total - 2) pages.push('...');
    if (total > 1) pages.push(total);
    return pages;
  }

  /* ── Modals ───────────────────────────────────────── */
  private populateDefaultTurnoRows(existingRows: ExtrusoraOperarioRow[] = []) {
    const turnos = this.turnosList();
    const rows: ExtrusoraOperarioRow[] = turnos.map(t => {
      const existing = existingRows.find(r => r.turnoId === t.id);
      return existing || {
        turnoId: t.id,
        turno: t.nombre,
        operarioId: '',
        operario: ''
      };
    });
    this.operariosRows.set(rows);
  }

  openCreate() {
    this.form = { nombre: '', numeroExtrusora: '', imagen: '' };
    this.modalReadOnly.set(false);
    this.showModal.set(true);
    this.closeAllDropdowns();
    this.populateDefaultTurnoRows();
  }

  openEditModal(item: Extrusora) {
    this.form = { ...item };
    this.modalReadOnly.set(false);
    this.showModal.set(true);
    this.closeAllDropdowns();
    if (item.id) {
      this.svc.getExtrusoraOperarios(item.id).subscribe({ 
        next: d => this.populateDefaultTurnoRows(d || []), 
        error: () => this.populateDefaultTurnoRows([]) 
      });
    } else {
      this.populateDefaultTurnoRows([]);
    }
  }

  openViewModal(item: Extrusora) {
    this.form = { ...item };
    this.modalReadOnly.set(true);
    this.showModal.set(true);
    this.closeAllDropdowns();
    if (item.id) {
      this.svc.getExtrusoraOperarios(item.id).subscribe({ 
        next: d => this.populateDefaultTurnoRows(d || []), 
        error: () => this.populateDefaultTurnoRows([]) 
      });
    } else {
      this.populateDefaultTurnoRows([]);
    }
  }

  closeModal() { this.showModal.set(false); this.form = {}; this.operariosRows.set([]); }

  addOperarioRow() {
    this.populateDefaultTurnoRows(this.operariosRows());
  }

  /* ── Delete ───────────────────────────────────────── */
  confirmDelete(item: Extrusora) {
    this.itemToDelete.set(item);
    this.showDeleteModal.set(true);
    this.closeAllDropdowns();
  }
  closeDeleteModal() { this.showDeleteModal.set(false); this.itemToDelete.set(null); }
  executeDelete() {
    const item = this.itemToDelete();
    if (!item) return;
    this.svc.deleteExtrusora(item.id).subscribe(() => {
      this.closeDeleteModal();
      this.load();
      if (this.currentPage() > this.totalPages()) this.currentPage.set(this.totalPages());
    });
  }

  /* ── Save ─────────────────────────────────────────── */
  save() {
    if (!this.form.nombre?.trim())           { this.notify.warning('El campo Extrusora es requerido.'); return; }
    if (!this.form.numeroExtrusora?.trim())   { this.notify.warning('El Número de Extrusora es requerido.'); return; }

    const dto = {
      nombre:          this.form.nombre!,
      numeroExtrusora: this.form.numeroExtrusora!,
      imagen:          this.form.imagen,
      tenantId:        '00000000-0000-0000-0000-000000000001'
    };
    if (!this.form.id) {
      this.svc.createExtrusora(dto).subscribe({
        next: (id: string) => {
          // Save operario rows
          this.saveOperarioRows(id);
          this.notify.success('Extrusora creada exitosamente.');
          this.closeModal();
          this.load();
        },
        error: (e) => { console.error(e); this.notify.error('Error al guardar la extrusora.'); }
      });
    } else {
      this.svc.updateExtrusora(this.form.id, dto).subscribe({
        next: () => {
          this.saveOperarioRows(this.form.id!);
          this.notify.success('Extrusora actualizada exitosamente.');
          this.closeModal();
          this.load();
        },
        error: (e) => { console.error(e); this.notify.error('Error al actualizar la extrusora.'); }
      });
    }
  }

  private saveOperarioRows(extrusoraId: string) {
    const rows = this.operariosRows();
    rows.forEach(row => {
      if (row.turnoId) {
        this.svc.upsertExtrusoraOperario(extrusoraId, row.turnoId, {
          operarioId: row.operarioId || undefined,
          tenantId: '00000000-0000-0000-0000-000000000001'
        }).subscribe();
      }
    });
  }

  /* ── Export ───────────────────────────────────────── */
  exportCSV() {
    this.showExportOptions.set(false);
    const cols: string[] = [];
    if (this.isColVisible('nombre')) cols.push('Extrusora');
    if (this.isColVisible('imagen')) cols.push('Imagen');
    let csv = '\uFEFF' + cols.join(';') + '\n';
    this.filteredItems().forEach(e => {
      const row: string[] = [];
      if (this.isColVisible('nombre')) row.push(e.nombre);
      if (this.isColVisible('imagen')) row.push(e.imagen || '');
      csv += row.join(';') + '\n';
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `extrusoras_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  exportPDF() {
    this.showExportOptions.set(false);
    const win = window.open('', '_blank');
    if (!win) return;
    let heads = '';
    if (this.isColVisible('nombre')) heads += '<th>Extrusora</th>';
    if (this.isColVisible('imagen')) heads += '<th>Imagen</th>';
    let rows = '';
    this.filteredItems().forEach(e => {
      rows += '<tr>';
      if (this.isColVisible('nombre')) rows += `<td>${e.nombre}</td>`;
      if (this.isColVisible('imagen')) rows += `<td>${e.imagen || '—'}</td>`;
      rows += '</tr>';
    });
    win.document.write(`<html><head><title>Extrusoras</title>
      <style>body{font-family:Arial,sans-serif;padding:2rem;}h1{color:#5cb85c;}table{width:100%;border-collapse:collapse;margin-top:1rem;}th,td{padding:10px;border-bottom:1px solid #e2e8f0;text-align:left;font-size:.875rem;}th{background:#f8fafc;font-size:.75rem;text-transform:uppercase;}</style>
      </head><body><h1>Reporte de Extrusoras</h1><p>Generado: ${new Date().toLocaleString()}</p>
      <table><thead><tr>${heads}</tr></thead><tbody>${rows}</tbody></table>
      <script>window.onload=()=>{window.print();window.close();}<\/script></body></html>`);
    win.document.close();
  }
}
