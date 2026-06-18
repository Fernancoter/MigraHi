import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduccionConfigService } from '../../../../core/services/produccion-config.service';
import * as XLSX from 'xlsx';

interface CausaInterrupcion {
  id: string | number;
  nombre: string;
  prensa: boolean;
  extrusora: boolean;
}

@Component({
  selector: 'app-causas-interrupcion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up">
      <!-- Encabezado del Módulo -->
      <header class="module-header-container" style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
        <div class="title-area">
          <nav class="breadcrumb">Reportes HC › Observaciones › Causas Interrupción</nav>
          <h1 class="page-title">Causa Interrupcion</h1>
        </div>

        <!-- Barra de Acciones -->
        <div class="actions-toolbar" style="display: flex; width: 100%; align-items: center;">

          <!-- LEFT SIDE -->
          <div class="toolbar-left" style="display: flex; gap: 0.75rem; align-items: center;">
            <!-- Botón Agregar (Square Dark Button with document-plus icon) -->
            <button class="btn-add" (click)="openCreate()" title="Agregar Causa de Interrupción">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-plus"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
            </button>

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

            <!-- Selector de Columnas (Img2 design) -->
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
                          @if (!colSearch || 'nombre'.includes(colSearch.toLowerCase())) {
                            <label class="col-item"><input type="checkbox" [checked]="isTempColVisible('nombre')" (change)="toggleTempCol('nombre')" class="green-cb"> Nombre</label>
                          }
                          @if (!colSearch || 'prensa'.includes(colSearch.toLowerCase())) {
                            <label class="col-item"><input type="checkbox" [checked]="isTempColVisible('prensa')" (change)="toggleTempCol('prensa')" class="green-cb"> Prensa</label>
                          }
                          @if (!colSearch || 'extrusora'.includes(colSearch.toLowerCase())) {
                            <label class="col-item"><input type="checkbox" [checked]="isTempColVisible('extrusora')" (change)="toggleTempCol('extrusora')" class="green-cb"> Extrusora</label>
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
            <button class="btn-filter" (click)="toggleFilterDropdown($event)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #475569;"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
              <span style="font-size: 0.7rem; color: #475569; margin-left: 0.2rem;">▼</span>
            </button>
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
              @if (isColVisible('nombre')) {
                <th (click)="toggleSort('nombre')" style="cursor: pointer; user-select: none;">
                  Nombre @if (sortColumn() === 'nombre') { <span>{{ sortDirection() === 'asc' ? '▲' : '▼' }}</span> }
                </th>
              }
              @if (isColVisible('prensa')) {
                <th>Prensa</th>
              }
              @if (isColVisible('extrusora')) {
                <th>Extrusora</th>
              }
            </tr>
          </thead>
          <tbody>
            @if (loading()) {
              <tr>
                <td [attr.colspan]="visibleColumnCount() + 2" class="empty-state">Cargando registros...</td>
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
                  @if (isColVisible('nombre')) {
                    <td class="col-nombre">{{ item.nombre }}</td>
                  }
                  @if (isColVisible('prensa')) {
                    <td>
                      <input type="checkbox" [checked]="item.prensa" disabled style="cursor: not-allowed; accent-color: #5cb85c;" />
                    </td>
                  }
                  @if (isColVisible('extrusora')) {
                    <td>
                      <input type="checkbox" [checked]="item.extrusora" disabled style="cursor: not-allowed; accent-color: #5cb85c;" />
                    </td>
                  }
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

      <!-- Modal Crear/Editar (Img1 faithful replication) -->
      @if (showModal()) {
        <div class="modal-overlay" (click)="closeModal()">
          <div class="modal-card" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <div class="modal-title-area">
                <nav class="breadcrumb">Reportes HC › Observaciones › Causas Interrupción</nav>
                <h1 class="modal-title">Causa Interrupcion</h1>
              </div>
              <button class="modal-close" (click)="closeModal()">✕</button>
            </div>
            
            <div class="modal-body">
              <div class="panel-section">
                <div class="panel-header">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tag" style="margin-right: 0.4rem;"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                  Información General
                </div>
                <div class="panel-content">
                  <div class="form-row">
                    <label class="field-label">Nombre</label>
                    <input 
                      class="field-input-line" 
                      type="text" 
                      [(ngModel)]="form.nombre" 
                      placeholder="" 
                    />
                  </div>
                  
                  <div class="checkbox-row">
                    <div class="form-row" style="flex: 1;">
                      <label class="field-label">Extrusora</label>
                      <input 
                        type="checkbox" 
                        [(ngModel)]="form.extrusora" 
                        class="green-cb" 
                      />
                    </div>
                    <div class="form-row" style="flex: 1;">
                      <label class="field-label">Prensa</label>
                      <input 
                        type="checkbox" 
                        [(ngModel)]="form.prensa" 
                        class="green-cb" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <button class="btn btn-confirm" (click)="save()">CONFIRMAR</button> 
              <button class="btn btn-cancel" (click)="closeModal()">CANCELAR</button>
            </div>
          </div>
        </div>
      }

      <!-- Modal de Archivar/Borrar -->
      @if (showArchiveModal()) {
        <div class="modal-overlay" style="z-index: 1100;" (click)="closeArchiveModal()">
          <div class="modal-card archive-modal" (click)="$event.stopPropagation()">
            <button class="modal-close-abs" (click)="closeArchiveModal()">✕</button>
            <div class="modal-body archive-body">
              <p>¿Está seguro de archivar la causa de interrupción?</p>
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
    
    .btn-add {
      background: #334155;
      color: white;
      border: none;
      border-radius: 4px;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-add:hover { background: #1e293b; }
    
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
    
    /* Checkbox Styling */
    .green-cb {
      width: 18px;
      height: 18px;
      accent-color: #5cb85c;
      cursor: pointer;
    }
    
    /* Column Selector Popover */
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
    
    /* Modal styles (Img1 layout) */
    .modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.4); display: flex; align-items: center; justify-content: center; z-index: 1000; animation: fadeIn 0.2s ease; }
    .modal-card { background: white; border-radius: 8px; width: 680px; max-width: 90%; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); overflow: hidden; animation: zoomIn 0.2s ease; border: 1px solid #e2e8f0; position: relative; }
    .modal-header { padding: 1rem 1.5rem 0.5rem 1.5rem; display: flex; justify-content: space-between; align-items: flex-start; background: white; }
    .modal-title-area { display: flex; flex-direction: column; }
    .modal-title { margin: 0; font-size: 1.8rem; font-weight: 800; color: #5cb85c; }
    .modal-close { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #94a3b8; }
    .modal-body { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
    
    .panel-section { background: white; border: 1px solid #e2e8f0; border-radius: 4px; overflow: hidden; }
    .panel-header { background: white; border-bottom: 1px solid #e2e8f0; padding: 0.75rem 1rem; font-size: 0.85rem; font-weight: 700; color: #5cb85c; display: flex; align-items: center; }
    .panel-content { padding: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; }
    
    .form-row { display: flex; flex-direction: column; gap: 0.3rem; }
    .checkbox-row { display: flex; gap: 4rem; }
    
    .field-label { font-size: .85rem; font-weight: 600; color: #475569; }
    .field-input-line {
      width: 100%;
      border: none;
      border-bottom: 1px solid #cbd5e1;
      padding: 0.5rem 0;
      font-size: 1rem;
      outline: none;
      box-sizing: border-box;
      transition: border-color 0.2s;
    }
    .field-input-line:focus { border-bottom-color: #5cb85c; }
    
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
export class CausasInterrupcionComponent implements OnInit {
  private svc = inject(ProduccionConfigService);

  items = signal<CausaInterrupcion[]>([]);
  loading = signal(true);

  // Modal State
  showModal = signal(false);
  modalReadOnly = signal(false);
  form = {
    id: '' as string | number,
    nombre: '',
    prensa: true,
    extrusora: true
  };

  showArchiveModal = signal(false);
  itemToArchive = signal<CausaInterrupcion | null>(null);

  // Search & Filters
  searchText = signal<string>('');
  showFilterOptions = signal<boolean>(false);

  // Columns Selection (Img2 design)
  showColumnSelector = signal<boolean>(false);
  visibleColumns = signal<string[]>(['nombre', 'prensa', 'extrusora']);
  tempVisibleColumns = signal<string[]>(['nombre', 'prensa', 'extrusora']);
  colSearch = '';
  colFijasIzqExpanded = true;
  colNoFijasExpanded = true;
  colFijasDerExpanded = true;

  // Export
  showExportOptions = signal<boolean>(false);

  // Sorting
  sortColumn = signal<string>('');
  sortDirection = signal<'asc' | 'desc'>('asc');

  // Pagination
  currentPage = signal<number>(1);
  pageSize = signal<number>(8);

  visibleColumnCount = computed(() => this.visibleColumns().length);

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.svc.getCausasInterrupcion().subscribe({
      next: data => {
        this.items.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  filteredItems = computed(() => {
    let list = [...this.items()];
    const search = this.searchText().trim().toLowerCase();
    if (search) {
      list = list.filter(item => item.nombre.toLowerCase().includes(search));
    }
    // Apply sorting
    const col = this.sortColumn();
    const dir = this.sortDirection();
    if (col === 'nombre') {
      list.sort((a, b) => {
        const cmp = a.nombre.localeCompare(b.nombre);
        return dir === 'asc' ? cmp : -cmp;
      });
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

  /* ------------------- SORTING ------------------- */
  toggleSort(column: string) {
    if (this.sortColumn() === column) {
      this.sortDirection.update(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
  }

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
    this.tempVisibleColumns.set(['nombre', 'prensa', 'extrusora']);
  }

  applyColumns() {
    this.visibleColumns.set([...this.tempVisibleColumns()]);
    this.showColumnSelector.set(false);
  }

  /* ------------------- MODALS (Create/Edit/Archive) ------------------- */
  openCreate() {
    this.form = {
      id: '',
      nombre: '',
      prensa: true,
      extrusora: true
    };
    this.modalReadOnly.set(false);
    this.showModal.set(true);
    this.closeAllDropdowns();
  }

  openEditModal(item: CausaInterrupcion) {
    this.form = { ...item };
    this.modalReadOnly.set(false);
    this.showModal.set(true);
    this.closeAllDropdowns();
  }

  closeModal() {
    this.showModal.set(false);
  }

  confirmArchive(item: CausaInterrupcion) {
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
    this.svc.deleteCausaInterrupcion(item.id.toString()).subscribe(() => {
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

    const payload = {
      nombre: this.form.nombre.trim(),
      prensa: this.form.prensa,
      extrusora: this.form.extrusora,
      tenantId: '00000000-0000-0000-0000-000000000000'
    };

    if (!this.form.id) {
      this.svc.createCausaInterrupcion(payload).subscribe(() => {
        this.closeModal();
        this.load();
      });
    } else {
      this.svc.updateCausaInterrupcion(this.form.id.toString(), payload).subscribe(() => {
        this.closeModal();
        this.load();
      });
    }
  }

  /* ------------------- EXPORT LOGIC ------------------- */
  exportExcel() {
    this.showExportOptions.set(false);

    const dataToExport = this.filteredItems().map(item => {
      const row: any = {};
      if (this.isColVisible('nombre')) row['Nombre'] = item.nombre;
      if (this.isColVisible('prensa')) row['Prensa'] = item.prensa ? 'Sí' : 'No';
      if (this.isColVisible('extrusora')) row['Extrusora'] = item.extrusora ? 'Sí' : 'No';
      return row;
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Causas Interrupcion');

    XLSX.writeFile(wb, `causas_interrupcion_${new Date().toISOString().slice(0,10)}.xlsx`);
  }

  exportPDF() {
    this.showExportOptions.set(false);
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    let headers = '';
    if (this.isColVisible('nombre')) headers += `<th>Nombre</th>`;
    if (this.isColVisible('prensa')) headers += `<th>Prensa</th>`;
    if (this.isColVisible('extrusora')) headers += `<th>Extrusora</th>`;

    let tableRows = '';
    this.filteredItems().forEach(item => {
      tableRows += `<tr>`;
      if (this.isColVisible('nombre')) tableRows += `<td>${item.nombre}</td>`;
      if (this.isColVisible('prensa')) tableRows += `<td>${item.prensa ? 'Sí' : 'No'}</td>`;
      if (this.isColVisible('extrusora')) tableRows += `<td>${item.extrusora ? 'Sí' : 'No'}</td>`;
      tableRows += `</tr>`;
    });

    printWindow.document.write(`
      <html>
        <head>
          <title>Reporte de Causas de Interrupción</title>
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
          <h1>Reporte de Causas de Interrupción</h1>
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
