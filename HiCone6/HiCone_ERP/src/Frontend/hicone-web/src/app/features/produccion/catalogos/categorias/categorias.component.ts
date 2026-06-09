import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduccionConfigService, Categoria } from '../../../../core/services/produccion-config.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-categorias-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up">
      <!-- Encabezado del Módulo -->
      <header class="module-header-container" style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
        <div class="title-area">
          <nav class="breadcrumb">Producción › Catálogos › Categorías</nav>
          <h1>Catálogo de Categorías</h1>
        </div>
        
        <!-- Barra de Acciones Premium -->
        <div class="actions-toolbar" style="display: flex; width: 100%; align-items: center;">
          
          <!-- LEFT SIDE -->
          <div class="toolbar-left" style="display: flex; gap: 0.75rem; align-items: center;">
            <!-- Dropdown de Exportar -->
            <div class="dropdown-wrapper">
              <button class="btn btn-secondary" (click)="toggleExportDropdown($event)" style="display: flex; align-items: center; gap: 0.4rem;">
                <span>⬇️</span> Exportar
              </button>
              @if (showExportOptions()) {
                <div class="column-selector-popover animate-slide-up">
                  <div class="dropdown-item" (click)="exportCSV()">Excel</div>
                  <div class="dropdown-item" (click)="exportPDF()">PDF</div>
                </div>
              }
            </div>

            <!-- Botón Agregar -->
            <button class="btn btn-primary" (click)="openCreate()">+ Agregar</button>

            <!-- Selector de Columnas Avanzado -->
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
                    <!-- Fijas a la izquierda -->
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

                    <!-- No fijas -->
                    <div class="col-group">
                      <div class="col-group-header" (click)="colNoFijasExpanded = !colNoFijasExpanded">
                        <label><input type="checkbox" checked disabled> No fijas</label>
                        <span class="chevron" [class.rotated]="colNoFijasExpanded">▾</span>
                      </div>
                      @if (colNoFijasExpanded) {
                        <div class="col-group-body">
                          @if (!colSearch || 'nombre'.includes(colSearch.toLowerCase())) {
                            <label class="col-item">
                              <input type="checkbox" [checked]="isTempColVisible('nombre')" (change)="toggleTempCol('nombre')"> Nombre
                            </label>
                          }
                        </div>
                      }
                    </div>

                    <!-- Fijas a la derecha -->
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
          </div>

          <!-- FLEXIBLE SPACE -->
          <div class="toolbar-spacer" style="flex: 1;"></div>

          <!-- RIGHT SIDE -->
          <div class="toolbar-right" style="display: flex; gap: 0.5rem; align-items: center;">
            
            <!-- Botón de Filtros Extras -->
            <div class="dropdown-wrapper">
              <button class="btn btn-filter" (click)="toggleFilterDropdown($event)" title="Filtros avanzados">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                <span class="chevron" style="font-size: 0.7rem; margin-left: 0.2rem;">▾</span>
              </button>
              @if (showFilterOptions()) {
                <div class="column-selector-popover filter-popover animate-slide-up" style="width: 200px; right: 0; left: auto;">
                  <div class="dropdown-item" (click)="clearFilters()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                    Limpiar filtros
                  </div>
                  <div class="dropdown-item" (click)="saveFilter()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                    Guardar filtro como...
                  </div>
                </div>
              }
            </div>

            <!-- Filtro de Búsqueda -->
            <div class="search-box">
              <span class="search-icon">🔍</span>
              <input 
                class="field-input" 
                type="text" 
                placeholder="Buscar..." 
                [ngModel]="searchText()" 
                (ngModelChange)="searchText.set($event); currentPage.set(1)"
              />
            </div>
          </div>
        </div>
      </header>

      <!-- Tabla de Datos Premium -->
      <div class="content-card" style="margin-top: 1rem; position: relative; min-height: 300px;">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 70px;"></th> <!-- Ver -->
              <th style="width: 70px;"></th> <!-- Editar -->
              <th style="width: 70px;"></th> <!-- Borrar -->
              @if (isColVisible('nombre')) {
                <th>Nombre</th>
              }
            </tr>
          </thead>
          <tbody>
            @if (loading()) { 
              <tr><td colspan="4" class="empty-state">Cargando categorías...</td></tr> 
            }
            @else if (paginatedItems().length === 0) { 
              <tr><td colspan="4" class="empty-state">No se encontraron categorías registradas</td></tr> 
            }
            @else {
              @for (item of paginatedItems(); track item.id) {
                <tr>
                  <td style="width: 70px;">
                    <button class="action-btn view" (click)="openViewModal(item)">Visualizar</button>
                  </td>
                  <td style="width: 70px;">
                    <button class="action-btn edit" (click)="openEditModal(item)">Modificar</button>
                  </td>
                  <td style="width: 70px;">
                    <button class="action-btn delete" (click)="confirmArchive(item)">Archivar</button>
                  </td>
                  @if (isColVisible('nombre')) { 
                    <td class="col-nombre">{{ item.nombre }}</td> 
                  }
                </tr>
              }
            }
          </tbody>
        </table>
      </div>

      <!-- Paginación Premium -->
      @if (totalPages() > 1) {
        <div class="pagination-container animate-move-up">
          <button class="pag-btn" [disabled]="currentPage() === 1" (click)="prevPage()">‹</button>
          
          @for (p of getPages(currentPage(), totalPages()); track $index) {
            @if (p === '...') {
              <span class="pag-dots">...</span>
            } @else {
              <button 
                class="pag-btn page-num" 
                [class.active]="currentPage() === p" 
                (click)="setPage($any(p))"
              >
                {{ p }}
              </button>
            }
          }
          
          <button class="pag-btn" [disabled]="currentPage() === totalPages()" (click)="nextPage()">›</button>
        </div>
      }

      <!-- Modal Crear/Editar -->
      @if (showModal() && !modalReadOnly()) {
        <div class="modal-overlay" (click)="closeModal()">
          <div class="modal-card" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h3>Categoría</h3>
              <button class="modal-close" (click)="closeModal()">✕</button>
            </div>
            
            <div class="modal-body">
              <div class="form-row">
                <label class="field-label">Nombre *</label>
                <input 
                  class="field-input" 
                  type="text" 
                  [(ngModel)]="form.nombre" 
                  placeholder="Nombre de la categoría..." 
                />
              </div>
            </div>

            <div class="modal-footer">
              <button class="btn btn-primary" (click)="save()">Confirmar</button> 
              <button class="btn btn-secondary" (click)="closeModal()">Cancelar</button>
            </div>
          </div>
        </div>
      }

      <!-- Modal de Visualización a Pantalla Completa (Modo Detalle) -->
      @if (showModal() && modalReadOnly()) {
        <div class="modal-overlay" (click)="closeModal()">
          <div class="modal-card visualization-modal" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h3>Detalle de Categoría</h3>
              <button class="modal-close" (click)="closeModal()">✕</button>
            </div>
            
            <div class="modal-body" style="background: #f8fafc; padding: 1.5rem;">
              
              <!-- Información General Panel -->
              <div class="panel-section">
                <div class="panel-header">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                  Información General
                </div>
                <div class="panel-content">
                  <div class="readonly-form-row">
                    <label>Id</label>
                    <div class="readonly-value">{{ form.id || 'N/A' }}</div>
                  </div>
                  <div class="readonly-form-row">
                    <label>Nombre</label>
                    <div class="readonly-value">{{ form.nombre }}</div>
                  </div>
                </div>
                <div class="panel-footer">
                  <button class="btn btn-secondary btn-sm" (click)="closeModal()">CANCELAR</button>
                </div>
              </div>

              <!-- Historial Auditoria Panel -->
              <div class="panel-section" style="margin-top: 1.5rem;">
                <div class="panel-header">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  Historial Auditoria
                </div>
                <div class="panel-content audit-grid">
                  
                  <div class="audit-col">
                    <div class="audit-col-header">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      Change Log
                    </div>
                    <div class="audit-table-wrapper">
                      <table class="audit-table">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>User</th>
                          </tr>
                        </thead>
                        <tbody>
                          <!-- Empty state mock -->
                          <tr>
                            <td colspan="2" class="empty-state-sm">No hay registros de cambios recientes.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="audit-pagination">
                      <button class="btn-sm" disabled>Ant</button>
                      <button class="btn-sm" disabled>Sig</button>
                    </div>
                  </div>

                  <div class="audit-col">
                    <div class="audit-col-header">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                      Detail
                    </div>
                    <div class="audit-detail-box">
                      <div class="empty-state-sm">Seleccione un registro del Change Log para ver los detalles.</div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      }

      <!-- Modal de Archivar -->
      @if (showArchiveModal()) {
        <div class="modal-overlay" style="z-index: 1100;" (click)="closeArchiveModal()">
          <div class="modal-card archive-modal" (click)="$event.stopPropagation()">
            <button class="modal-close-abs" (click)="closeArchiveModal()">✕</button>
            <div class="modal-body archive-body">
              <p>¿Está seguro de archivar la categoría?</p>
            </div>
            <div class="modal-footer archive-footer">
              <button class="btn btn-primary" (click)="executeArchive()">Sí</button>
              <button class="btn btn-secondary" (click)="closeArchiveModal()">No</button>
            </div>
          </div>
        </div>
      }

    </div>
  `,
  styles: [`
    .module-page { padding: 1.5rem 2.5rem; }
    .breadcrumb { font-size: .75rem; color: #94a3b8; font-weight: 600; text-transform: uppercase; margin-bottom: .25rem; }
    h1 { font-size: 1.8rem; font-weight: 800; color: #1e293b; margin: 0; }
    .actions-toolbar { display: flex; gap: 0.75rem; align-items: center; }
    
    .btn { padding: .55rem 1.25rem; border-radius: 6px; border: none; cursor: pointer; font-size: .85rem; font-weight: 600; transition: all .2s; }
    .btn-sm { padding: .35rem .8rem; font-size: .75rem; }
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
    .empty-state-sm { text-align: center; padding: 1.5rem; color: #94a3b8; font-size: 0.8rem; font-style: italic; }
    
    .col-nombre { font-weight: 700; color: #1e293b; }
    
    .action-btn { padding: 0; border: none; cursor: pointer; font-size: .8rem; font-weight: 600; background: transparent; text-decoration: none; transition: color 0.15s; }
    .action-btn.view { color: #0284c7; }
    .action-btn.view:hover { color: #0369a1; text-decoration: underline; }
    .action-btn.edit { color: #d97706; }
    .action-btn.edit:hover { color: #b45309; text-decoration: underline; }
    .action-btn.delete { color: #16a34a; } /* Archivar suele ser verde o gris, usamos verde corporativo */
    .action-btn.delete:hover { color: #15803d; text-decoration: underline; }
    
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
    
    .modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.4); display: flex; align-items: center; justify-content: center; z-index: 1000; animation: fadeIn 0.2s ease; }
    .modal-card { background: white; border-radius: 8px; width: 450px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); overflow: hidden; animation: zoomIn 0.2s ease; border: 1px solid #e2e8f0; position: relative; }
    .modal-header { padding: 1rem 1.5rem; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; background: white; }
    .modal-header h3 { margin: 0; font-size: 1.1rem; font-weight: 600; color: #1e293b; }
    .modal-close { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #94a3b8; }
    .modal-body { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
    .form-row { display: flex; flex-direction: column; gap: 0.3rem; }
    .field-label { font-size: .8rem; font-weight: 600; color: #475569; }
    .field-input { width: 100%; padding: .55rem .75rem; border-radius: 4px; border: 1px solid #cbd5e1; font-size: .875rem; outline: none; box-sizing: border-box; transition: all 0.2s; }
    .field-input:focus { border-color: #1e40af; }
    .modal-footer { padding: 1rem 1.5rem; border-top: 1px solid #e2e8f0; display: flex; gap: .75rem; justify-content: flex-end; background: white; }
    
    /* Visualization Modal */
    .visualization-modal { width: 95%; max-width: 1100px; height: 90vh; display: flex; flex-direction: column; }
    .visualization-modal .modal-body { flex: 1; overflow-y: auto; }
    .panel-section { background: white; border: 1px solid #e2e8f0; border-radius: 4px; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.02); }
    .panel-header { background: #f8fafc; border-bottom: 1px solid #e2e8f0; padding: 0.75rem 1rem; font-size: 0.85rem; font-weight: 700; color: #16a34a; display: flex; align-items: center; gap: 0.5rem; }
    .panel-content { padding: 1rem; display: flex; flex-direction: column; gap: 0.8rem; }
    .readonly-form-row { border-bottom: 1px solid #f1f5f9; padding-bottom: 0.5rem; }
    .readonly-form-row label { display: block; font-size: 0.75rem; color: #94a3b8; margin-bottom: 0.2rem; }
    .readonly-value { font-size: 0.85rem; color: #334155; font-weight: 500; }
    .panel-footer { background: #f8fafc; padding: 0.75rem 1rem; border-top: 1px solid #e2e8f0; }
    
    /* Audit Grid */
    .audit-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; padding: 0; }
    .audit-col { border-right: 1px solid #e2e8f0; display: flex; flex-direction: column; }
    .audit-col:last-child { border-right: none; }
    .audit-col-header { background: #f8fafc; padding: 0.5rem 1rem; font-size: 0.8rem; font-weight: 600; color: #16a34a; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; gap: 0.4rem; }
    .audit-table-wrapper { flex: 1; min-height: 120px; }
    .audit-table { width: 100%; border-collapse: collapse; }
    .audit-table th { text-align: left; padding: 0.5rem 1rem; font-size: 0.75rem; color: #64748b; border-bottom: 1px solid #e2e8f0; }
    .audit-table td { padding: 0.5rem 1rem; font-size: 0.8rem; color: #334155; }
    .audit-pagination { padding: 0.5rem 1rem; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; gap: 0.4rem; }
    .audit-detail-box { flex: 1; min-height: 120px; padding: 1rem; }

    /* Archive Modal */
    .archive-modal { width: 400px; text-align: center; }
    .modal-close-abs { position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #94a3b8; }
    .archive-body { padding: 3rem 2rem 1.5rem; }
    .archive-body p { margin: 0; font-size: 0.95rem; color: #334155; }
    .archive-footer { padding: 1rem 2rem 1.5rem; border: none; justify-content: center; gap: 1rem; background: white; }
    .archive-footer .btn { min-width: 80px; }
    
    .pagination-container { display: flex; justify-content: center; align-items: center; gap: 0.4rem; margin-top: 1.5rem; }
    .pag-btn { height: 2.1rem; min-width: 2.1rem; padding: 0 0.5rem; border-radius: 4px; border: 1px solid #cbd5e1; background: white; color: #475569; font-weight: 600; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
    .pag-btn:hover:not(:disabled) { background: #f8fafc; color: #0f172a; }
    .pag-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .pag-btn.active { background: #1e40af; border-color: #1e40af; color: white; }
    .pag-dots { font-size: 0.85rem; color: #94a3b8; font-weight: 700; padding: 0 0.2rem; }
    
    .animate-move-up { animation: moveUp .3s ease-out; }
    .animate-slide-up { animation: slideUp .15s ease-out; }
    @keyframes moveUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes zoomIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
  `]
})
export class CategoriasComponent implements OnInit {
  private svc = inject(ProduccionConfigService);
  
  items = signal<Categoria[]>([]);
  loading = signal(true);
  
  // Modals state
  showModal = signal(false);
  modalReadOnly = signal(false);
  form: Partial<Categoria> = {};

  showArchiveModal = signal(false);
  itemToArchive = signal<Categoria | null>(null);

  // Search & Filters
  searchText = signal<string>('');
  showFilterOptions = signal<boolean>(false);
  
  // Columns
  showColumnSelector = signal<boolean>(false);
  visibleColumns = signal<string[]>(['nombre']);
  tempVisibleColumns = signal<string[]>(['nombre']);
  colSearch = '';
  colFijasIzqExpanded = true;
  colNoFijasExpanded = true;
  colFijasDerExpanded = true;

  // Export
  showExportOptions = signal<boolean>(false);

  // Pagination
  currentPage = signal<number>(1);
  pageSize = signal<number>(8);

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.svc.getCategorias().subscribe({
      next: data => {
        this.items.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  filteredItems = computed(() => {
    let list = this.items();
    const search = this.searchText().trim().toLowerCase();
    if (search) {
      list = list.filter(op => op.nombre.toLowerCase().includes(search));
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
    this.tempVisibleColumns.set(['nombre']); // default
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

  saveFilter() {
    alert('Filtro guardado (Funcionalidad pendiente de conexión al backend).');
    this.showFilterOptions.set(false);
  }

  /* ------------------- PAGINATION ------------------- */
  prevPage() { if (this.currentPage() > 1) this.currentPage.update(p => p - 1); }
  nextPage() { if (this.currentPage() < this.totalPages()) this.currentPage.update(p => p + 1); }
  setPage(p: number) { this.currentPage.set(p); }

  getPages(current: number, total: number): (number | string)[] {
    if (total <= 1) return [];
    const pages: (number | string)[] = [1];
    if (current > 3) pages.push('...');
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (current < total - 2) pages.push('...');
    if (total > 1) pages.push(total);
    return pages;
  }

  /* ------------------- MODALS (Create/Edit/View) ------------------- */
  openViewModal(item: Categoria) {
    this.form = { ...item };
    this.modalReadOnly.set(true);
    this.showModal.set(true);
    this.closeAllDropdowns();
  }

  openEditModal(item: Categoria) {
    this.form = { ...item };
    this.modalReadOnly.set(false);
    this.showModal.set(true);
    this.closeAllDropdowns();
  }

  openCreate() {
    this.form = { nombre: '' };
    this.modalReadOnly.set(false);
    this.showModal.set(true);
    this.closeAllDropdowns();
  }

  closeModal() {
    this.showModal.set(false);
    this.form = {};
  }

  /* ------------------- ARCHIVE MODAL ------------------- */
  confirmArchive(item: Categoria) {
    this.itemToArchive.set(item);
    this.showArchiveModal.set(true);
    this.closeAllDropdowns();
  }

  closeArchiveModal() {
    this.showArchiveModal.set(false);
    this.itemToArchive.set(null);
  }

  executeArchive() {
    const item = this.itemToArchive();
    if (!item) return;

    // Llamamos a deleteCategoria (comportamiento de archivar en backend por ahora)
    this.svc.deleteCategoria(item.id).subscribe(() => {
      this.closeArchiveModal();
      this.load();
      if (this.currentPage() > this.totalPages()) this.currentPage.set(this.totalPages());
    });
  }

  /* ------------------- SAVE ------------------- */
  save() {
    if (!this.form.nombre || !this.form.nombre.trim()) {
      alert('El campo Nombre es requerido.');
      return;
    }
    
    if (!this.form.id) {
      this.svc.createCategoria(this.form).subscribe(() => {
        this.closeModal();
        this.load();
      });
    } else {
      this.svc.updateCategoria(this.form.id, this.form).subscribe(() => {
        this.closeModal();
        this.load();
      });
    }
  }

  closeAllDropdowns() {
    this.showColumnSelector.set(false);
    this.showExportOptions.set(false);
    this.showFilterOptions.set(false);
  }

  /* ------------------- EXPORT ------------------- */
  exportCSV() {
    this.showExportOptions.set(false);
    
    const dataToExport = this.filteredItems().map(item => ({
      ID: item.id,
      Nombre: item.nombre
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Categorias');

    XLSX.writeFile(wb, `categorias_${new Date().toISOString().slice(0,10)}.xlsx`);
  }

  exportPDF() {
    this.showExportOptions.set(false);
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    let tableRows = '';
    this.filteredItems().forEach(op => {
      tableRows += `<tr>`;
      if (this.isColVisible('nombre')) tableRows += `<td>${op.nombre}</td>`;
      tableRows += `</tr>`;
    });

    let headers = '';
    if (this.isColVisible('nombre')) headers += `<th>Nombre</th>`;

    printWindow.document.write(`
      <html>
        <head>
          <title>Reporte de Categorías</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 2rem; color: #1e293b; background-color: #f8fafc; }
            h1 { color: #1e40af; margin-bottom: 0.2rem; font-size: 1.8rem; }
            p { color: #64748b; font-size: 0.9rem; margin-bottom: 1.5rem; }
            table { width: 100%; border-collapse: collapse; margin-top: 1rem; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
            th, td { padding: 12px 16px; border-bottom: 1px solid #e2e8f0; text-align: left; font-size: 0.875rem; }
            th { background: #f1f5f9; font-weight: bold; color: #475569; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em; }
            tr:last-child td { border-bottom: none; }
          </style>
        </head>
        <body>
          <h1>Reporte de Categorías</h1>
          <p>Generado el: ${new Date().toLocaleString()}</p>
          <table>
            <thead><tr>${headers}</tr></thead>
            <tbody>${tableRows}</tbody>
          </table>
          <script>window.onload = function() { window.print(); window.close(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }
}
