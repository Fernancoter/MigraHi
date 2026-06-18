import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduccionConfigService, Prensa, Turno } from '../../../../core/services/produccion-config.service';
import * as XLSX from 'xlsx';

interface PrensaObservacion {
  id: string | number;
  fecha: string;
  prensa: string;
  turno: string;
  interrupcion: string;
  tiempo: string;
  descripcion: string;
}

interface CausaInterrupcion {
  id: string | number;
  nombre: string;
}

@Component({
  selector: 'app-prensas-observacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up">
      <!-- Encabezado del Módulo -->
      <header class="module-header-container" style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
        <div class="title-area">
          <nav class="breadcrumb">Reportes HC › Observaciones › Prensas</nav>
          <h1 class="page-title">Prensa Observacion</h1>
        </div>

        <!-- Barra de Acciones -->
        <div class="actions-toolbar" style="display: flex; width: 100%; align-items: center;">

          <!-- LEFT SIDE -->
          <div class="toolbar-left" style="display: flex; gap: 0.75rem; align-items: center;">
            <!-- Botón Agregar -->
            <button class="btn btn-primary" (click)="openCreate()">Agregar</button>

            <!-- Dropdown de Exportar -->
            <div class="dropdown-wrapper">
              <button class="btn-export" (click)="toggleExportDropdown($event)">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Exportar <span style="font-size: 0.7rem;">▼</span>
              </button>
              @if (showExportOptions()) {
                <div class="column-selector-popover animate-slide-up">
                  <div class="dropdown-item" (click)="exportExcel()">Excel</div>
                  <div class="dropdown-item" (click)="exportPDF()">PDF</div>
                </div>
              }
            </div>

            <!-- Selector de Columnas -->
            <div class="dropdown-wrapper">
              <button class="btn-columns" (click)="toggleColumnDropdown($event)">
                Selecciona columnas <span style="font-size: 0.7rem;">▼</span>
              </button>
              @if (showColumnSelector()) {
                <div class="column-selector-popover advanced-column-selector animate-slide-up" (click)="$event.stopPropagation()">
                  <div class="col-search-box">
                    <input type="text" placeholder="" [(ngModel)]="colSearch" class="col-search-input" />
                  </div>

                  <div class="col-groups-container">
                    <!-- Fijas a la izquierda -->
                    <div class="col-group">
                      <div class="col-group-header" (click)="colFijasIzqExpanded = !colFijasIzqExpanded">
                        <label><input type="checkbox" checked disabled class="green-cb"> Fijas a la izquierda</label>
                        <span class="chevron" [class.rotated]="colFijasIzqExpanded">▾</span>
                      </div>
                      @if (colFijasIzqExpanded) {
                        <div class="col-group-body">
                          <label class="col-item"><input type="checkbox" checked disabled class="green-cb"> (Ninguna)</label>
                        </div>
                      }
                    </div>

                    <!-- No fijas -->
                    <div class="col-group">
                      <div class="col-group-header" (click)="colNoFijasExpanded = !colNoFijasExpanded">
                        <label><input type="checkbox" checked disabled class="green-cb"> No fijas</label>
                        <span class="chevron" [class.rotated]="colNoFijasExpanded">▾</span>
                      </div>
                      @if (colNoFijasExpanded) {
                        <div class="col-group-body">
                          @for (col of allColumns; track col.key) {
                            @if (!colSearch || col.label.toLowerCase().includes(colSearch.toLowerCase())) {
                              <label class="col-item">
                                <input type="checkbox" [checked]="isTempColVisible(col.key)" (change)="toggleTempCol(col.key)" class="green-cb"> {{ col.label }}
                              </label>
                            }
                          }
                        </div>
                      }
                    </div>

                    <!-- Fijas a la derecha -->
                    <div class="col-group">
                      <div class="col-group-header" (click)="colFijasDerExpanded = !colFijasDerExpanded">
                        <label><input type="checkbox" checked disabled class="green-cb"> Fijas a la derecha</label>
                        <span class="chevron" [class.rotated]="colFijasDerExpanded">▾</span>
                      </div>
                      @if (colFijasDerExpanded) {
                        <div class="col-group-body">
                          <label class="col-item"><input type="checkbox" checked disabled class="green-cb"> (Ninguna)</label>
                        </div>
                      }
                    </div>
                  </div>

                  <div class="col-selector-footer">
                    <button class="btn-icon reset-btn" (click)="resetColumns()" title="Restablecer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-rotate-ccw"><polyline points="1 4 1 10 7 10"></polyline><path d="M35.1 15a9 9 0 1 0-2.13 6H16.2" transform="scale(0.6)"></path></svg>
                    </button>
                    <button class="btn btn-success flex-1" (click)="applyColumns()">Actualizar</button>
                  </div>
                </div>
              }
            </div>

            <!-- Botón Filtro -->
            <div class="dropdown-wrapper">
              <button class="btn-filter" (click)="toggleFilterDropdown($event)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #475569;"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                <span style="font-size: 0.7rem; color: #475569; margin-left: 0.2rem;">▼</span>
              </button>
              @if (showFilterOptions()) {
                <div class="column-selector-popover filter-popover animate-slide-up" style="width: 200px; right: 0; left: auto; padding: 0.25rem 0;">
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
          </div>

          <!-- RIGHT SIDE -->
          <div class="toolbar-right" style="margin-left: auto;">
            <div class="search-box">
              <span class="search-label">Buscar</span>
              <input type="text" [ngModel]="searchText()" (ngModelChange)="searchText.set($event); currentPage.set(1)" class="field-input" />
            </div>
          </div>
        </div>
      </header>

      <!-- Tabla de Datos -->
      <div class="content-card">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 50px;"></th>
              <th style="width: 50px;"></th>
              @if (isColVisible('fecha')) { <th>Fecha</th> }
              @if (isColVisible('prensa')) { <th>Prensa</th> }
              @if (isColVisible('turno')) { <th>Turno</th> }
              @if (isColVisible('interrupcion')) { <th>Interrupción (Hr)</th> }
              @if (isColVisible('tiempo')) { <th>Tiempo (Hr)</th> }
              @if (isColVisible('descripcion')) { <th>Descripción</th> }
            </tr>
          </thead>
          <tbody>
            @if (loading()) {
              <tr>
                <td [attr.colspan]="visibleColumnCount() + 2" class="empty-state">Cargando observaciones...</td>
              </tr>
            } @else if (paginatedItems().length === 0) {
              <tr>
                <td [attr.colspan]="visibleColumnCount() + 2" class="empty-state">No se encontraron registros</td>
              </tr>
            } @else {
              @for (item of paginatedItems(); track item.id) {
                <tr>
                  <td>
                    <button class="action-btn edit" title="Editar" (click)="openEditModal(item)">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                    </button>
                  </td>
                  <td>
                    <button class="action-btn delete" title="Eliminar" (click)="confirmArchive(item)">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                  </td>
                  @if (isColVisible('fecha')) { <td>{{ item.fecha | date:'dd/MM/yy' }}</td> }
                  @if (isColVisible('prensa')) { <td class="col-nombre">{{ item.prensa }}</td> }
                  @if (isColVisible('turno')) { <td>{{ item.turno }}</td> }
                  @if (isColVisible('interrupcion')) { <td>{{ item.interrupcion }}</td> }
                  @if (isColVisible('tiempo')) { <td>{{ item.tiempo }}</td> }
                  @if (isColVisible('descripcion')) { <td>{{ item.descripcion }}</td> }
                </tr>
              }
            }
          </tbody>
        </table>
      </div>

      <!-- Paginación -->
      <div class="pagination-container">
        <div class="pag-info">
          Página {{ currentPage() }} de {{ totalPages() }}
        </div>
        <div class="pag-buttons">
          <button class="pag-btn" [disabled]="currentPage() === 1" (click)="prevPage()">Ant</button>
          
          @for (p of getPages(currentPage(), totalPages()); track p) {
            @if (p === '...') {
              <span class="pag-dots">...</span>
            } @else {
              <button class="pag-btn" [class.active]="currentPage() === p" (click)="setPage(+p)">{{ p }}</button>
            }
          }

          <button class="pag-btn" [disabled]="currentPage() === totalPages()" (click)="nextPage()">Sig</button>
        </div>
      </div>

      <!-- Footer -->
      <footer class="page-footer">
        <div class="footer-left">
          <span>Consultas a partir de la siguiente fecha:</span>
          <span class="footer-date">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            16/03/26
          </span>
        </div>
        <div class="footer-right">Copyright 2023</div>
      </footer>

      <!-- Modal Agregar / Editar (Img2 detailed layout) -->
      @if (showModal()) {
        <div class="modal-overlay" (click)="closeModal()">
          <div class="modal-card detailed-modal" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <div class="modal-title-area">
                <nav class="breadcrumb">Reportes HC › Observaciones › Prensas</nav>
                <h1 class="modal-title">Prensa Observacion</h1>
              </div>
              <button class="modal-close" (click)="closeModal()">✕</button>
            </div>
            
            <div class="modal-body scrollable-modal-body">
              <!-- Información General Panel -->
              <div class="panel-section">
                <div class="panel-header">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tag" style="margin-right: 0.4rem;"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                  Información General
                </div>
                <div class="panel-content">
                  <div class="modal-grid-2">
                    <div class="form-row">
                      <label class="field-label">Fecha</label>
                      <input type="date" [(ngModel)]="form.fecha" class="field-input-line" />
                    </div>
                    <div class="form-row">
                      <label class="field-label">Tiempo (Hr)</label>
                      <input type="number" step="0.01" [(ngModel)]="form.tiempo" class="field-input-line" />
                    </div>
                  </div>

                  <div class="modal-grid-2">
                    <div class="form-row">
                      <label class="field-label">Prensa</label>
                      <select [(ngModel)]="form.prensaId" class="field-input-line select-arrow">
                        <option value="">-- Seleccionar Prensa --</option>
                        @for (pr of prensasList(); track pr.id) {
                          <option [value]="pr.id">{{ pr.nombre }}</option>
                        }
                      </select>
                    </div>
                    <div class="form-row">
                      <label class="field-label">Turno</label>
                      <select [(ngModel)]="form.turnoId" class="field-input-line select-arrow">
                        <option value="">-- Seleccionar Turno --</option>
                        @for (turno of turnosList(); track turno.id) {
                          <option [value]="turno.id">{{ turno.nombre }}</option>
                        }
                      </select>
                    </div>
                  </div>

                  <div class="form-row" style="margin-top: 0.5rem;">
                    <label class="field-label">Descripción</label>
                    <textarea [(ngModel)]="form.descripcion" class="field-textarea-line" placeholder=""></textarea>
                  </div>
                </div>
              </div>

              <!-- Causas / Motivo Panel -->
              <div class="panel-section" style="margin-top: 1rem;">
                <div class="panel-header">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tag" style="margin-right: 0.4rem;"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                  Causas / Motivo (Interrupción)
                </div>
                <div class="panel-content" style="padding: 1rem;">
                  <table class="motivos-table">
                    <thead>
                      <tr>
                        <th style="padding-left: 0;">Nombre</th>
                        <th style="width: 40px;"></th>
                      </tr>
                    </thead>
                    <tbody>
                      @for (mot of form.motivos; track $index) {
                        <tr>
                          <td style="padding-left: 0;">
                            <select [(ngModel)]="mot.causaId" class="field-input-line select-arrow">
                              <option value="">-- Seleccionar Causa --</option>
                              @for (causa of causesList(); track causa.id) {
                                <option [value]="causa.id">{{ causa.nombre }}</option>
                              }
                            </select>
                          </td>
                          <td>
                            <button class="remove-row-btn" (click)="removeMotivo($index)" title="Eliminar fila">✕</button>
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                  
                  <div style="margin-top: 0.75rem; text-align: center;">
                    <a href="javascript:void(0)" class="new-row-link" (click)="addMotivo()">[[Nueva fila]]</a>
                  </div>
                </div>
              </div>
            </div>

            <div class="modal-footer" style="padding-top: 0.5rem;">
              <button class="btn btn-confirm" (click)="save()">CONFIRMAR</button> 
              <button class="btn btn-cancel" (click)="closeModal()">CANCELAR</button>
            </div>
          </div>
        </div>
      }

      <!-- Modal de Confirmar Eliminación -->
      @if (showArchiveModal()) {
        <div class="modal-overlay" style="z-index: 1100;" (click)="closeArchiveModal()">
          <div class="modal-card archive-modal" (click)="$event.stopPropagation()">
            <button class="modal-close-abs" (click)="closeArchiveModal()">✕</button>
            <div class="modal-body archive-body">
              <p>¿Está seguro de archivar la observación de prensa?</p>
            </div>
            <div class="modal-footer archive-footer">
              <button class="btn btn-confirm" (click)="executeArchive()">Sí</button>
              <button class="btn btn-cancel" (click)="closeArchiveModal()">No</button>
            </div>
          </div>
        </div>
      }

    </div>
  `,
  styles: [`
    .module-page { padding: 1.5rem 2.5rem; }
    .breadcrumb { font-size: .75rem; color: #94a3b8; font-weight: 600; text-transform: uppercase; margin-bottom: .25rem; }
    .page-title { font-size: 1.8rem; font-weight: 800; color: #5cb85c; margin: 0; }
    .actions-toolbar { display: flex; gap: 0.75rem; align-items: center; margin-top: 1rem; }

    /* Buttons */
    .btn { padding: .55rem 1.25rem; border-radius: 6px; border: none; cursor: pointer; font-size: .85rem; font-weight: 600; transition: all .2s; }
    .btn-primary { background: #5cb85c; color: white; border: 1px solid #4cae4c; }
    .btn-primary:hover { background: #449d44; }

    .btn-export, .btn-columns {
      background: white;
      color: #5cb85c;
      border: 1px solid #5cb85c;
      border-radius: 4px;
      padding: 0.55rem 1rem;
      font-size: 0.85rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-export:hover, .btn-columns:hover {
      background: #f8fafc;
      border-color: #4cae4c;
      color: #449d44;
    }

    .btn-filter {
      background: white;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 0.55rem 0.65rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      height: 36px;
    }
    .btn-filter:hover { background: #f8fafc; }

    /* Search Box */
    .search-box { display: flex; flex-direction: column; position: relative; }
    .search-label { font-size: 0.75rem; color: #94a3b8; font-weight: 600; margin-bottom: 0.1rem; }
    .search-box .field-input {
      border: none;
      border-bottom: 1px solid #cbd5e1;
      border-radius: 0;
      padding: 0.4rem 0;
      font-size: 0.9rem;
      background: transparent;
      width: 180px;
      outline: none;
      transition: border-color 0.2s;
    }
    .search-box .field-input:focus {
      border-bottom-color: #5cb85c;
    }

    /* Data Table */
    .content-card { background: white; border-radius: 8px; border: 1px solid #e2e8f0; overflow: visible; box-shadow: 0 1px 3px rgba(0,0,0,0.02); margin-top: 1rem; }
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th { text-align: left; padding: 1rem; background: #f8fafc; color: #64748b; font-size: .75rem; font-weight: 800; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; }
    .data-table td { padding: .85rem 1rem; border-bottom: 1px solid #f1f5f9; font-size: .875rem; color: #334155; }
    .data-table tr:hover td { background: #f8fafc; }
    .empty-state { text-align: center; padding: 3.5rem; color: #94a3b8; font-style: italic; }

    .col-nombre { font-weight: 700; color: #5cb85c; }

    /* Action Buttons */
    .action-btn { padding: 0; border: none; cursor: pointer; font-size: .8rem; font-weight: 600; background: transparent; transition: color 0.15s; }
    .action-btn.edit { color: #d97706; margin-right: 0.5rem; }
    .action-btn.edit:hover { color: #b45309; }
    .action-btn.delete { color: #ef4444; }
    .action-btn.delete:hover { color: #dc2626; }

    .green-cb {
      width: 18px;
      height: 18px;
      accent-color: #5cb85c;
      cursor: pointer;
    }

    /* Popovers */
    .dropdown-wrapper { position: relative; }
    .column-selector-popover {
      position: absolute;
      left: 0;
      top: 110%;
      background: white;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      box-shadow: 0 6px 16px rgba(0,0,0,0.12);
      z-index: 100;
      min-width: 150px;
    }

    /* Advanced Column Selector */
    .advanced-column-selector { width: 260px; padding: 0; display: flex; flex-direction: column; }
    .col-search-box { padding: 0.5rem; border-bottom: 1px solid #e2e8f0; }
    .col-search-input {
      width: 100%;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 0.4rem 0.5rem;
      font-size: 0.8rem;
      box-sizing: border-box;
      outline: none;
    }
    .col-search-input:focus {
      border-color: #5cb85c;
    }
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
    .btn-success { background: #5cb85c; color: white; border: 1px solid #4cae4c; padding: 0.45rem 1rem; border-radius: 4px; font-weight: 600; font-size: 0.85rem; cursor: pointer; }
    .btn-success:hover { background: #449d44; }

    .flex-1 { flex: 1; }
    .chevron { transition: transform 0.2s; font-size: 0.9rem; }
    .chevron.rotated { transform: rotate(180deg); }

    .dropdown-item { padding: 0.65rem 1rem; font-size: 0.85rem; color: #334155; cursor: pointer; transition: background 0.15s; font-weight: 500; display: flex; align-items: center; gap: 0.5rem; }
    .dropdown-item:hover { background: #f1f5f9; color: #0f172a; }

    /* Pagination */
    .pagination-container { display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; padding: 0 0.5rem; }
    .pag-info { font-size: 0.85rem; color: #64748b; font-weight: 500; }
    .pag-buttons { display: flex; gap: 0.4rem; align-items: center; }
    .pag-btn { height: 2.1rem; min-width: 2.1rem; padding: 0 0.5rem; border-radius: 4px; border: 1px solid #cbd5e1; background: white; color: #475569; font-weight: 600; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
    .pag-btn:hover:not(:disabled) { background: #f8fafc; color: #0f172a; }
    .pag-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .pag-btn.active { background: #5cb85c; border-color: #5cb85c; color: white; }
    .pag-dots { font-size: 0.85rem; color: #94a3b8; font-weight: 700; padding: 0 0.2rem; }

    /* Footer */
    .page-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; padding: 1rem 0.5rem; border-top: 1px solid #e2e8f0; font-size: 0.8rem; color: #94a3b8; }
    .footer-left { display: flex; align-items: center; gap: 0.5rem; }
    .footer-date { display: flex; align-items: center; gap: 0.3rem; color: #64748b; font-weight: 600; }
    .footer-right { font-size: 0.75rem; }

    /* Detailed Modal styles (Img2 layout) */
    .modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.4); display: flex; align-items: center; justify-content: center; z-index: 1000; animation: fadeIn 0.2s ease; }
    .detailed-modal { background: white; border-radius: 8px; width: 750px; max-width: 90%; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); overflow: hidden; animation: zoomIn 0.2s ease; border: 1px solid #e2e8f0; position: relative; }
    .modal-header { padding: 1rem 1.5rem 0.5rem 1.5rem; display: flex; justify-content: space-between; align-items: flex-start; background: white; }
    .modal-title-area { display: flex; flex-direction: column; }
    .modal-title { margin: 0; font-size: 1.8rem; font-weight: 800; color: #5cb85c; }
    .modal-close { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #94a3b8; }
    
    .scrollable-modal-body { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; max-height: 70vh; overflow-y: auto; }
    
    .panel-section { background: white; border: 1px solid #e2e8f0; border-radius: 4px; overflow: hidden; }
    .panel-header { background: white; border-bottom: 1px solid #e2e8f0; padding: 0.75rem 1rem; font-size: 0.85rem; font-weight: 700; color: #5cb85c; display: flex; align-items: center; }
    .panel-content { padding: 1.25rem; display: flex; flex-direction: column; gap: 1.25rem; }

    .modal-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
    
    .form-row { display: flex; flex-direction: column; gap: 0.3rem; }
    .field-label { font-size: .85rem; font-weight: 600; color: #475569; }
    
    .field-input-line {
      width: 100%;
      border: none;
      border-bottom: 1px solid #cbd5e1;
      padding: 0.4rem 0;
      font-size: 0.95rem;
      outline: none;
      box-sizing: border-box;
      transition: border-color 0.2s;
      background: transparent;
    }
    .field-input-line:focus { border-bottom-color: #5cb85c; }
    
    .select-arrow {
      appearance: none;
      background-image: url("data:image/svg+xml;utf8,<svg fill='%2364748b' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
      background-repeat: no-repeat;
      background-position: right 2px top 50%;
      background-size: 18px;
      padding-right: 1.5rem;
      cursor: pointer;
    }

    .field-textarea-line {
      width: 100%;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 0.5rem;
      font-size: 0.95rem;
      outline: none;
      min-height: 80px;
      box-sizing: border-box;
      resize: vertical;
      transition: border-color 0.2s;
    }
    .field-textarea-line:focus { border-color: #5cb85c; }
    
    /* Motivos Table */
    .motivos-table { width: 100%; border-collapse: collapse; margin-top: 0.5rem; }
    .motivos-table th { text-align: left; padding: 0.5rem; font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; }
    .motivos-table td { padding: 0.5rem; border-bottom: 1px solid #f1f5f9; }
    .remove-row-btn { background: none; border: none; color: #ef4444; font-size: 0.9rem; cursor: pointer; font-weight: bold; }
    .remove-row-btn:hover { color: #dc2626; }
    
    .new-row-link { color: #5cb85c; font-size: 0.85rem; font-weight: bold; text-decoration: none; }
    .new-row-link:hover { text-decoration: underline; }

    .modal-footer { padding: 0.5rem 1.5rem 1.5rem 1.5rem; display: flex; gap: 1rem; justify-content: flex-start; background: white; }
    .btn-confirm { background: #5cb85c; color: white; border: 1px solid #4cae4c; padding: 0.6rem 2rem; font-size: 0.9rem; font-weight: 600; text-transform: uppercase; cursor: pointer; border-radius: 4px; transition: background 0.2s; }
    .btn-confirm:hover { background: #449d44; }
    .btn-cancel { background: #8c8c8c; color: white; border: none; padding: 0.6rem 2rem; font-size: 0.9rem; font-weight: 600; text-transform: uppercase; cursor: pointer; border-radius: 4px; transition: background 0.2s; }
    .btn-cancel:hover { background: #737373; }
    
    /* Archive Modal */
    .archive-modal { width: 400px; text-align: center; }
    .modal-close-abs { position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #94a3b8; }
    .archive-body { padding: 3rem 2rem 1.5rem; }
    .archive-body p { margin: 0; font-size: 0.95rem; color: #334155; }
    .archive-footer { padding: 1rem 2rem 1.5rem; border: none; justify-content: center; gap: 1rem; background: white; }

    .animate-move-up { animation: moveUp .3s ease-out; }
    .animate-slide-up { animation: slideUp .15s ease-out; }
    @keyframes moveUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes zoomIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
  `]
})
export class PrensasObservacionComponent implements OnInit {
  private svc = inject(ProduccionConfigService);

  readonly allColumns = [
    { key: 'fecha', label: 'Fecha' },
    { key: 'prensa', label: 'Prensa' },
    { key: 'turno', label: 'Turno' },
    { key: 'interrupcion', label: 'Interrupción (Hr)' },
    { key: 'tiempo', label: 'Tiempo (Hr)' },
    { key: 'descripcion', label: 'Descripción' },
  ];

  items = signal<PrensaObservacion[]>([]);
  loading = signal(true);

  // Dropdown catalogs
  prensasList = signal<Prensa[]>([]);
  turnosList = signal<Turno[]>([]);
  causesList = signal<CausaInterrupcion[]>([]);

  // Modal State
  showModal = signal(false);
  modalReadOnly = signal(false);
  form = {
    id: '' as string | number,
    fecha: '',
    tiempo: 0.00,
    prensaId: '',
    turnoId: '',
    descripcion: '',
    motivos: [] as { causaId: string }[]
  };

  showArchiveModal = signal(false);
  itemToArchive = signal<PrensaObservacion | null>(null);

  // Search & Filters
  searchText = signal<string>('');
  showFilterOptions = signal<boolean>(false);

  // Columns
  showColumnSelector = signal<boolean>(false);
  visibleColumns = signal<string[]>(['fecha', 'prensa', 'turno', 'interrupcion', 'tiempo', 'descripcion']);
  tempVisibleColumns = signal<string[]>(['fecha', 'prensa', 'turno', 'interrupcion', 'tiempo', 'descripcion']);
  colSearch = '';
  colFijasIzqExpanded = true;
  colNoFijasExpanded = true;
  colFijasDerExpanded = true;

  // Export
  showExportOptions = signal<boolean>(false);

  // Pagination
  currentPage = signal<number>(1);
  pageSize = signal<number>(8);

  visibleColumnCount = computed(() => this.visibleColumns().length);

  ngOnInit() {
    this.load();
    this.loadCatalogs();
  }

  load() {
    this.loading.set(true);
    this.svc.getPrensasObservaciones().subscribe({
      next: data => {
        this.items.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  loadCatalogs() {
    this.svc.getPrensas().subscribe(data => this.prensasList.set(data));
    this.svc.getTurnos().subscribe(data => this.turnosList.set(data));
    this.svc.getCausasInterrupcion().subscribe(data => {
      this.causesList.set(data.map(c => ({ id: c.id, nombre: c.nombre })));
    });
  }

  filteredItems = computed(() => {
    let list = [...this.items()];
    const search = this.searchText().trim().toLowerCase();
    if (search) {
      list = list.filter(item =>
        item.descripcion.toLowerCase().includes(search) ||
        item.prensa.toLowerCase().includes(search) ||
        item.turno.toLowerCase().includes(search)
      );
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
    this.tempVisibleColumns.set(['fecha', 'prensa', 'turno', 'interrupcion', 'tiempo', 'descripcion']);
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

  /* ------------------- MODALS ------------------- */
  openCreate() {
    const today = new Date().toISOString().split('T')[0];
    this.form = {
      id: '',
      fecha: today,
      tiempo: 0.00,
      prensaId: '',
      turnoId: '',
      descripcion: '',
      motivos: [{ causaId: '' }]
    };
    this.modalReadOnly.set(false);
    this.showModal.set(true);
    this.closeAllDropdowns();
  }

  openEditModal(item: PrensaObservacion) {
    const prensaObj = this.prensasList().find(p => p.nombre.toLowerCase() === item.prensa.toLowerCase());
    const turnoObj = this.turnosList().find(t => t.nombre.toLowerCase() === item.turno.toLowerCase());
    
    const itemDate = item.fecha ? new Date(item.fecha).toISOString().split('T')[0] : '';

    this.form = {
      id: item.id,
      fecha: itemDate,
      tiempo: parseFloat(item.tiempo) || 0.00,
      prensaId: prensaObj ? prensaObj.id : '',
      turnoId: turnoObj ? turnoObj.id : '',
      descripcion: item.descripcion,
      motivos: [{ causaId: '' }] // Mocked motives list for edit
    };
    this.modalReadOnly.set(false);
    this.showModal.set(true);
    this.closeAllDropdowns();
  }

  closeModal() {
    this.showModal.set(false);
  }

  confirmArchive(item: PrensaObservacion) {
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
    
    // In-memory delete from Signals array
    this.items.update(list => list.filter(x => x.id !== item.id));
    this.closeArchiveModal();
    if (this.currentPage() > this.totalPages()) this.currentPage.set(this.totalPages());
  }

  /* ------------------- MOTIVOS DYNAMIC LIST ------------------- */
  addMotivo() {
    this.form.motivos.push({ causaId: '' });
  }

  removeMotivo(index: number) {
    this.form.motivos.splice(index, 1);
  }

  /* ------------------- SAVE ------------------- */
  save() {
    if (!this.form.prensaId) {
      alert('Debe seleccionar una Prensa.');
      return;
    }
    if (!this.form.turnoId) {
      alert('Debe seleccionar un Turno.');
      return;
    }

    const prensaNombre = this.prensasList().find(p => p.id === this.form.prensaId)?.nombre || '';
    const turnoNombre = this.turnosList().find(t => t.id === this.form.turnoId)?.nombre || '';

    if (!this.form.id) {
      // In-memory insert
      const newObj: PrensaObservacion = {
        id: Date.now(),
        fecha: this.form.fecha,
        prensa: prensaNombre,
        turno: turnoNombre,
        interrupcion: '0.00',
        tiempo: this.form.tiempo.toFixed(2),
        descripcion: this.form.descripcion
      };
      this.items.update(list => [newObj, ...list]);
    } else {
      // In-memory update
      this.items.update(list => list.map(item => item.id === this.form.id ? {
        ...item,
        fecha: this.form.fecha,
        prensa: prensaNombre,
        turno: turnoNombre,
        tiempo: this.form.tiempo.toFixed(2),
        descripcion: this.form.descripcion
      } : item));
    }

    this.closeModal();
  }

  /* ------------------- EXPORT LOGIC ------------------- */
  exportExcel() {
    this.showExportOptions.set(false);

    const dataToExport = this.filteredItems().map(item => {
      const row: any = {};
      if (this.isColVisible('fecha')) row['Fecha'] = new Date(item.fecha).toLocaleDateString();
      if (this.isColVisible('prensa')) row['Prensa'] = item.prensa;
      if (this.isColVisible('turno')) row['Turno'] = item.turno;
      if (this.isColVisible('interrupcion')) row['Interrupción'] = item.interrupcion;
      if (this.isColVisible('tiempo')) row['Tiempo'] = item.tiempo;
      if (this.isColVisible('descripcion')) row['Descripción'] = item.descripcion;
      return row;
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Observaciones Prensas');

    XLSX.writeFile(wb, `observaciones_prensas_${new Date().toISOString().slice(0,10)}.xlsx`);
  }

  exportPDF() {
    this.showExportOptions.set(false);
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    let headers = '';
    if (this.isColVisible('fecha')) headers += `<th>Fecha</th>`;
    if (this.isColVisible('prensa')) headers += `<th>Prensa</th>`;
    if (this.isColVisible('turno')) headers += `<th>Turno</th>`;
    if (this.isColVisible('interrupcion')) headers += `<th>Interrupción (Hr)</th>`;
    if (this.isColVisible('tiempo')) headers += `<th>Tiempo (Hr)</th>`;
    if (this.isColVisible('descripcion')) headers += `<th>Descripción</th>`;

    let tableRows = '';
    this.filteredItems().forEach(item => {
      tableRows += `<tr>`;
      if (this.isColVisible('fecha')) tableRows += `<td>${new Date(item.fecha).toLocaleDateString()}</td>`;
      if (this.isColVisible('prensa')) tableRows += `<td>${item.prensa}</td>`;
      if (this.isColVisible('turno')) tableRows += `<td>${item.turno}</td>`;
      if (this.isColVisible('interrupcion')) tableRows += `<td>${item.interrupcion}</td>`;
      if (this.isColVisible('tiempo')) tableRows += `<td>${item.tiempo}</td>`;
      if (this.isColVisible('descripcion')) tableRows += `<td>${item.descripcion}</td>`;
      tableRows += `</tr>`;
    });

    printWindow.document.write(`
      <html>
        <head>
          <title>Reporte de Observaciones de Prensas</title>
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
          <h1>Reporte de Observaciones de Prensas</h1>
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

  /* ------------------- PAGINATION ------------------- */
  prevPage() { if (this.currentPage() > 1) this.currentPage.update(p => p - 1); }
  nextPage() { if (this.currentPage() < this.totalPages()) this.currentPage.update(p => p + 1); }
  setPage(p: number) { this.currentPage.set(p); }

  getPages(current: number, total: number): (number | string)[] {
    if (total <= 1) return [1];
    const pages: (number | string)[] = [1];
    if (current > 3) pages.push('...');
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (current < total - 2) pages.push('...');
    if (total > 1) pages.push(total);
    return pages;
  }

  closeAllDropdowns() {
    this.showColumnSelector.set(false);
    this.showExportOptions.set(false);
    this.showFilterOptions.set(false);
  }
}
