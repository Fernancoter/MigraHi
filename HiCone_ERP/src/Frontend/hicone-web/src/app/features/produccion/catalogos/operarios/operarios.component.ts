import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduccionConfigService, Operario } from '../../../../core/services/produccion-config.service';
import { ClickOutsideDirective } from '../../../../shared/directives/click-outside.directive';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-operarios-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule, ClickOutsideDirective],
  template: `
    <div class="module-page animate-move-up">
      <div class="page-header-premium">
        <div class="title-section">
          <nav class="breadcrumb-modern">
            <span class="root">Producción</span>
            <span class="sep">&rsaquo;</span>
            <span class="root">Catálogos</span>
            <span class="sep">&rsaquo;</span>
            <span class="active">Operarios</span>
          </nav>
          <h1 class="premium-title">Catálogo de Operarios</h1>
        </div>
      </div>
        
      <!-- Barra de Acciones Premium -->
      <div class="actions-toolbar" style="display: flex; width: 100%; align-items: center; margin-bottom: 1.5rem;">
          
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

            <!-- Selector de Columnas -->
            <div class="dropdown-wrapper" (clickOutside)="closeColumnDropdown()">
              <button class="btn btn-secondary" (click)="toggleColumnDropdown($event)" style="display: flex; align-items: center; gap: 0.4rem; background: #5cb85c; color: white; border-color: #4cae4c;">
                Selecciona columnas <span style="font-size: 0.7rem; color: white;">▼</span>
              </button>
              @if (showColumnSelector()) {
                <div class="column-selector-popover animate-slide-up" (click)="$event.stopPropagation()" style="width: 220px; padding: 0.75rem;">
                  <input type="text" placeholder="" style="width: 100%; border: 1px solid #10b981; border-radius: 4px; padding: 0.4rem; margin-bottom: 0.75rem; outline: none; box-sizing: border-box;" />
                  
                  <div class="column-list" style="gap: 0.2rem;">
                    <!-- Fijas a la izquierda -->
                    <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem; color: #475569;">
                      <label style="display: flex; align-items: center; gap: 0.4rem; font-weight: normal; cursor: pointer;">
                        <input type="checkbox" checked />
                        Fijas a la izquierda
                      </label>
                      <span style="font-size: 0.6rem; cursor: pointer;">▼</span>
                    </div>
                    <div style="padding-left: 1.5rem; margin-bottom: 0.4rem;">
                      <label style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; color: #475569; font-weight: normal; cursor: pointer;">
                        <input type="checkbox" checked />
                        <span style="color: #3b82f6;">(Ninguna)</span>
                      </label>
                    </div>

                    <!-- No fijas -->
                    <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem; color: #475569;">
                      <label style="display: flex; align-items: center; gap: 0.4rem; font-weight: normal; cursor: pointer;">
                        <input type="checkbox" />
                        No fijas
                      </label>
                      <span style="font-size: 0.6rem; cursor: pointer;">▼</span>
                    </div>
                    <div style="padding-left: 1.5rem; margin-bottom: 0.4rem; display: flex; flex-direction: column; gap: 0.3rem;">
                      <label style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; color: #475569; font-weight: normal; cursor: pointer;">
                        <input type="checkbox" [checked]="isColVisible('nombre')" (change)="toggleCol('nombre')" />
                        Nombre
                      </label>
                      <label style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; color: #475569; font-weight: normal; cursor: pointer;">
                        <input type="checkbox" [checked]="isColVisible('fotografia')" (change)="toggleCol('fotografia')" />
                        Fotografia
                      </label>
                      <label style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; color: #475569; font-weight: normal; cursor: pointer;">
                        <input type="checkbox" [checked]="isColVisible('activo')" (change)="toggleCol('activo')" />
                        Activo
                      </label>
                    </div>

                    <!-- Fijas a la derecha -->
                    <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem; color: #475569;">
                      <label style="display: flex; align-items: center; gap: 0.4rem; font-weight: normal; cursor: pointer;">
                        <input type="checkbox" checked />
                        Fijas a la derecha
                      </label>
                      <span style="font-size: 0.6rem; cursor: pointer;">▼</span>
                    </div>
                    <div style="padding-left: 1.5rem; margin-bottom: 0.4rem;">
                      <label style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; color: #475569; font-weight: normal; cursor: pointer;">
                        <input type="checkbox" checked />
                        <span style="color: #3b82f6;">(Ninguna)</span>
                      </label>
                    </div>
                  </div>

                  <div style="display: flex; justify-content: space-between; margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid #e2e8f0;">
                    <button class="btn" style="background: #5cb85c; color: white; padding: 0.4rem 0.6rem; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; width: 35px;" title="Restaurar" (click)="visibleColumns.set(['nombre', 'activo'])">
                      ↺
                    </button>
                    <button class="btn" style="background: #5cb85c; color: white; padding: 0.4rem 1rem; border-radius: 4px; font-size: 0.85rem; font-weight: bold; width: calc(100% - 45px);" (click)="toggleColumnDropdown($event)">
                      Actualizar
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- FLEXIBLE SPACE -->
          <div class="toolbar-spacer" style="flex: 1;"></div>

          <!-- RIGHT SIDE -->
          <div class="toolbar-right" style="display: flex; gap: 0.75rem; align-items: center;">
            <!-- Filter Dropdown Trigger -->
            <div style="position: relative;" (click)="toggleFilterMenu()" (clickOutside)="isFilterMenuOpen = false">
              <button 
                class="btn btn-secondary" 
                [class.active-filter]="activeFilterState() !== 'all'" 
                title="Filtrar"
                style="display: flex; align-items: center; gap: 0.4rem;"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                Filter: {{ activeFilterState() === 'all' ? 'Todos' : activeFilterState() === 'active' ? 'Activos' : 'Inactivos' }}
              </button>
              
              <!-- Filter Dropdown -->
              <div *ngIf="isFilterMenuOpen" style="position: absolute; top: 100%; right: 0; background: white; border: 1px solid #e2e8f0; border-radius: 4px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); z-index: 50; width: 200px; padding: 0.5rem; margin-top: 0.5rem;">
                <button (click)="cycleActiveFilterState(); $event.stopPropagation()" style="display: block; width: 100%; text-align: left; padding: 0.5rem; border: none; background: none; cursor: pointer; color: #334155; font-size: 0.85rem;">Alternar Estado Activo/Inactivo</button>
                <button (click)="clearFilters(); $event.stopPropagation()" style="display: block; width: 100%; text-align: left; padding: 0.5rem; border: none; background: none; cursor: pointer; color: #334155; font-size: 0.85rem;">Limpiar Filtros</button>
                <button style="display: block; width: 100%; text-align: left; padding: 0.5rem; border: none; background: none; cursor: pointer; color: #334155; font-size: 0.85rem;">Guardar Filtro como...</button>
              </div>
            </div>

            <!-- Filtro de Búsqueda -->
            <div class="search-box">
              <span class="search-icon">🔍</span>
              <input 
                class="field-input" 
                type="text" 
                placeholder="Buscar operario..." 
                [ngModel]="searchText()" 
                (ngModelChange)="searchText.set($event); currentPage.set(1)"
              />
            </div>
          </div>
        </div>

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
              @if (isColVisible('activo')) {
                <th class="header-with-dropdown">
                  <div class="header-cell-content" (click)="toggleActiveHeaderDropdown($event)">
                    <span>Activo</span>
                    <span class="dropdown-arrow-icon">▼</span>
                  </div>
                  
                  <!-- Dropdown para cabecera Activo -->
                  @if (showActiveHeaderDropdown()) {
                    <div class="header-popover-menu animate-slide-up" (click)="$event.stopPropagation()">
                      <div class="popover-item" (click)="sortActive('desc')">
                        <span class="icon">⬆️</span> Ordenar A-Z (Activos primero)
                      </div>
                      <div class="popover-item" (click)="sortActive('asc')">
                        <span class="icon">⬇️</span> Ordenar Z-A (Inactivos primero)
                      </div>
                      <div class="popover-divider"></div>
                      <div class="popover-item" (click)="pinColumn('izquierda')">
                        <span class="icon">📌</span> Fijar a la izquierda
                      </div>
                      <div class="popover-item" (click)="pinColumn('derecha')">
                        <span class="icon">📌</span> Fijar a la derecha
                      </div>
                      <div class="popover-divider"></div>
                      <div class="popover-item" (click)="filterActiveState('active')">
                        <span class="icon">🟩</span> Checked (Solo Activos)
                      </div>
                      <div class="popover-item" (click)="filterActiveState('inactive')">
                        <span class="icon">🟥</span> Unchecked (Solo Inactivos)
                      </div>
                      <div class="popover-item" (click)="filterActiveState('all')">
                        <span class="icon">🔄</span> Mostrar Todos
                      </div>
                    </div>
                  }
                </th>
              }
            </tr>
          </thead>
          <tbody>
            @if (loading()) { 
              <tr><td colspan="5" class="empty-state">Cargando operarios...</td></tr> 
            }
            @else if (paginatedItems().length === 0) { 
              <tr><td colspan="5" class="empty-state">No se encontraron operarios registrados</td></tr> 
            }
            @else {
              @for (item of paginatedItems(); track item.id) {
                <tr>
                  <td style="width: 70px;">
                    <button class="action-btn view" (click)="openViewModal(item)">Ver</button>
                  </td>
                  <td style="width: 70px;">
                    <button class="action-btn edit" (click)="openEditModal(item)">Editar</button>
                  </td>
                  <td style="width: 70px;">
                    <button class="action-btn delete" (click)="del(item)">Borrar</button>
                  </td>
                  @if (isColVisible('nombre')) { 
                    <td class="col-nombre">{{ item.nombre }}</td> 
                  }
                  @if (isColVisible('fotografia')) { 
                    <td><img [src]="item.fotografia || ''" style="max-width: 40px; border-radius: 4px;" alt="Foto"></td> 
                  }
                  @if (isColVisible('activo')) {
                    <td style="width: 120px;">
                      <label class="checkbox-container">
                        <input 
                          type="checkbox" 
                          [checked]="item.activo" 
                          (change)="toggleRowActiveState(item.id, $any($event.target).checked)"
                        />
                        <span class="checkmark"></span>
                      </label>
                    </td>
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

      <!-- Modal de Operario -->
      @if (showModal()) {
        <div class="modal-overlay" (click)="closeModal()">
          <div class="modal-card" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h3>Operador</h3>
              <button class="modal-close" (click)="closeModal()">✕</button>
            </div>
            
            <div class="modal-body">
              <!-- ID and User GUID hidden as requested -->


              <div class="form-row">
                <label class="field-label">Nombre *</label>
                <input 
                  class="field-input" 
                  type="text" 
                  [(ngModel)]="form.nombre" 
                  [disabled]="modalReadOnly()" 
                  placeholder="Nombre completo del operario..." 
                />
              </div>

              <div class="form-row">
                <label class="field-label">Fotografía</label>
                <input 
                  class="field-input" 
                  type="text" 
                  [(ngModel)]="form.fotografia" 
                  [disabled]="modalReadOnly()" 
                  placeholder="URL de la fotografía del operario..." 
                />
              </div>


              
              <div class="form-row" style="margin-top: 0.5rem;">
                <label class="checkbox-container" style="display: flex; align-items: center; gap: 0.6rem; font-weight: 600; color: #475569;">
                  <input 
                    type="checkbox" 
                    [(ngModel)]="form.activo" 
                    [disabled]="modalReadOnly()" 
                  />
                  <span class="checkmark"></span>
                  <span>Operario Activo</span>
                </label>
              </div>
            </div>

            <div class="modal-footer">
              @if (modalReadOnly()) { 
                <!-- En modo solo lectura, estrictamente solo este botón -->
                <button class="btn btn-secondary" (click)="closeModal()">Cerrar</button>
              } @else {
                <button class="btn btn-primary" (click)="save()">Confirmar</button> 
                <button class="btn btn-secondary" (click)="closeModal()">Cancelar</button>
              }
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .module-page { padding: 3rem; }
    .breadcrumb { font-size: .75rem; color: #94a3b8; font-weight: 600; text-transform: uppercase; margin-bottom: .25rem; }
    h1 { font-size: 1.8rem; font-weight: 800; color: #1e293b; margin: 0; }
    .actions-toolbar { display: flex; gap: 0.75rem; align-items: center; }
    .btn { padding: .55rem 1.25rem; border-radius: 8px; border: none; cursor: pointer; font-size: .875rem; font-weight: 600; transition: all .2s; }
    .btn-primary { background: #10b981; color: white; box-shadow: 0 4px 10px rgba(16, 185, 129, 0.2); }
    .btn-primary:hover { background: #059669; transform: translateY(-1px); }
    .btn-secondary { background: white; color: #475569; border: 1px solid #e2e8f0; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
    .btn-secondary:hover { background: #f8fafc; border-color: #cbd5e1; }
    .active-filter { background: rgba(16, 185, 129, 0.1) !important; color: #10b981 !important; border-color: rgba(16, 185, 129, 0.25) !important; }
    .search-box { position: relative; }
    .search-icon { position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: #94a3b8; font-size: 0.9rem; }
    .search-box .field-input { padding-left: 2.2rem; width: 240px; }
    .content-card { background: white; border-radius: 12px; border: 1px solid #e2e8f0; overflow: visible; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
    
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th { text-align: left; padding: 1rem; background: #f8fafc; color: #64748b; font-size: .75rem; font-weight: 800; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; position: relative; }
    .data-table td { padding: .85rem 1rem; border-bottom: 1px solid #f1f5f9; font-size: .875rem; color: #334155; }
    .data-table tr:hover td { background: #f8fafc; }
    .empty-state { text-align: center; padding: 3.5rem; color: #94a3b8; font-style: italic; }
    
    .col-nombre { font-weight: 700; color: #1e293b; }
    
    .action-btn { padding: .35rem .9rem; border-radius: 6px; border: none; cursor: pointer; font-size: .78rem; font-weight: 700; transition: all .15s; text-align: center; }
    .action-btn.view { background: rgba(14, 165, 233, 0.08); color: #0284c7; }
    .action-btn.view:hover { background: rgba(14, 165, 233, 0.15); }
    .action-btn.edit { background: rgba(245, 158, 11, 0.08); color: #d97706; }
    .action-btn.edit:hover { background: rgba(245, 158, 11, 0.15); }
    .action-btn.delete { background: rgba(239, 68, 68, 0.08); color: #dc2626; }
    .action-btn.delete:hover { background: rgba(239, 68, 68, 0.15); }
    
    .header-with-dropdown { position: relative; cursor: pointer; user-select: none; }
    .header-cell-content { display: flex; align-items: center; gap: 0.4rem; width: fit-content; }
    .dropdown-arrow-icon { font-size: 0.65rem; color: #94a3b8; transition: color 0.15s; }
    .header-cell-content:hover .dropdown-arrow-icon { color: #475569; }
    
    .header-popover-menu { position: absolute; left: 0; top: 110%; background: white; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); width: 250px; z-index: 150; padding: 0.5rem 0; overflow: hidden; }
    .popover-item { display: flex; align-items: center; gap: 0.65rem; padding: 0.6rem 1rem; font-size: 0.85rem; color: #334155; font-weight: 600; text-transform: none; cursor: pointer; transition: background 0.15s; }
    .popover-item:hover { background: #f1f5f9; color: #1e293b; }
    .popover-item .icon { font-size: 0.95rem; }
    .popover-divider { height: 1px; background: #e2e8f0; margin: 0.4rem 0; }
    
    /* Checkbox Premium */
    .checkbox-container { display: block; position: relative; padding-left: 1.8rem; cursor: pointer; user-select: none; height: 1.15rem; }
    .checkbox-container input { position: absolute; opacity: 0; cursor: pointer; height: 0; width: 0; }
    .checkmark { position: absolute; top: 0; left: 0; height: 1.15rem; width: 1.15rem; background-color: #f1f5f9; border: 1.5px solid #cbd5e1; border-radius: 4px; transition: all 0.2s; }
    .checkbox-container:hover input ~ .checkmark { border-color: #94a3b8; background-color: #e2e8f0; }
    .checkbox-container input:checked ~ .checkmark { background-color: #10b981; border-color: #10b981; }
    .checkmark:after { content: ""; position: absolute; display: none; }
    .checkbox-container input:checked ~ .checkmark:after { display: block; }
    .checkbox-container .checkmark:after { left: 6px; top: 2px; width: 4px; height: 8px; border: solid white; border-width: 0 2px 2px 0; transform: rotate(45deg); }
    .checkbox-container input:disabled ~ .checkmark { opacity: 0.6; cursor: not-allowed; }
    
    .dropdown-wrapper { position: relative; }
    .column-selector-popover { position: absolute; right: 0; top: 110%; background: white; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); padding: 1rem; width: 180px; z-index: 100; }
    .column-selector-popover h4 { margin: 0 0 0.6rem 0; font-size: 0.78rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
    .column-list { display: flex; flex-direction: column; gap: 0.5rem; }
    .column-list label { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: #334155; cursor: pointer; font-weight: 600; }
    .dropdown-item { padding: 0.65rem 1rem; font-size: 0.85rem; color: #334155; cursor: pointer; transition: background 0.15s; font-weight: 600; }
    .dropdown-item:hover { background: #f1f5f9; }
    
    /* Modals */
    .modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.35); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; animation: fadeIn 0.25s ease; }
    .modal-card { background: white; border-radius: 16px; width: 480px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15); overflow: hidden; animation: zoomIn 0.25s ease; border: 1px solid #e2e8f0; }
    .modal-header { padding: 1.25rem 1.75rem; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; background: #f8fafc; }
    .modal-header h3 { margin: 0; font-size: 1.15rem; font-weight: 800; color: #1e293b; letter-spacing: -0.02em; }
    .modal-close { background: none; border: none; font-size: 1.1rem; cursor: pointer; color: #94a3b8; transition: color 0.15s; }
    .modal-close:hover { color: #475569; }
    .modal-body { padding: 1.75rem; display: flex; flex-direction: column; gap: 1.1rem; }
    .form-row { display: flex; flex-direction: column; gap: 0.35rem; }
    .field-label { font-size: .8rem; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; }
    .field-input { width: 100%; padding: .65rem .875rem; border-radius: 8px; border: 1px solid #e2e8f0; font-size: .875rem; outline: none; box-sizing: border-box; font-weight: 500; color: #334155; transition: all 0.2s; }
    .field-input:focus { border-color: #10b981; box-shadow: 0 0 0 3px rgba(16,185,129,.12); }
    .field-input:disabled { background: #f8fafc; border-color: #e2e8f0; color: #64748b; cursor: not-allowed; }
    .modal-footer { padding: 1.25rem 1.75rem; border-top: 1px solid #e2e8f0; display: flex; gap: .75rem; justify-content: flex-end; background: #f8fafc; }
    
    /* Pagination */
    .pagination-container { display: flex; justify-content: center; align-items: center; gap: 0.4rem; margin-top: 1.5rem; }
    .pag-btn { height: 2.1rem; min-width: 2.1rem; padding: 0 0.5rem; border-radius: 8px; border: 1px solid #e2e8f0; background: white; color: #475569; font-weight: 700; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
    .pag-btn:hover:not(:disabled) { background: #f8fafc; border-color: #cbd5e1; color: #1e293b; }
    .pag-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .pag-btn.active { background: #10b981; border-color: #10b981; color: white; box-shadow: 0 2px 6px rgba(16,185,129,0.25); }
    .pag-dots { font-size: 0.85rem; color: #94a3b8; font-weight: 700; padding: 0 0.2rem; }
    
    /* Animations */
    .animate-move-up { animation: moveUp .3s ease-out; }
    .animate-slide-up { animation: slideUp .2s ease-out; }
    @keyframes moveUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes zoomIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
  `]
})
export class OperariosCatalogoComponent implements OnInit {
  private svc = inject(ProduccionConfigService);
  
  items = signal<Operario[]>([]);
  loading = signal(true);
  showModal = signal(false);
  modalReadOnly = signal(false);
  form: Partial<Operario> = {};

  // Actions & Popover States
  searchText = signal<string>('');
  activeFilterState = signal<'all' | 'active' | 'inactive'>('all');
  sortActiveState = signal<'asc' | 'desc' | null>(null);
  
  showColumnSelector = signal<boolean>(false);
  showExportOptions = signal<boolean>(false);
  showActiveHeaderDropdown = signal<boolean>(false);
  isFilterMenuOpen = false;
  
  visibleColumns = signal<string[]>(['nombre', 'activo']);

  // Pagination Signals
  currentPage = signal<number>(1);
  pageSize = signal<number>(8);

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.svc.getOperarios().subscribe({
      next: data => {
        // Hydrate mock properties if missing on existing items
        const list = data.map(op => ({
          ...op,
          fotografia: op.fotografia || '',
          userGuid: op.userGuid || `usr_${op.id.substring(0, 8)}`
        }));
        this.items.set(list);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  filteredItems = computed(() => {
    let list = this.items();

    // Text Search
    const search = this.searchText().trim().toLowerCase();
    if (search) {
      list = list.filter(op => op.nombre.toLowerCase().includes(search));
    }

    // Active State Filter
    const filter = this.activeFilterState();
    if (filter === 'active') {
      list = list.filter(op => op.activo);
    } else if (filter === 'inactive') {
      list = list.filter(op => !op.activo);
    }

    // Active State Sorting
    const sort = this.sortActiveState();
    if (sort === 'asc') {
      // Unchecked/Inactive first
      list = [...list].sort((a, b) => (a.activo === b.activo ? 0 : a.activo ? 1 : -1));
    } else if (sort === 'desc') {
      // Checked/Active first
      list = [...list].sort((a, b) => (a.activo === b.activo ? 0 : a.activo ? -1 : 1));
    }

    return list;
  });

  // Pagination computed properties
  paginatedItems = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredItems().slice(start, start + this.pageSize());
  });

  totalPages = computed(() => {
    return Math.ceil(this.filteredItems().length / this.pageSize()) || 1;
  });

  // Toggles and cycle filters
  cycleActiveFilterState() {
    const current = this.activeFilterState();
    if (current === 'all') {
      this.activeFilterState.set('active');
    } else if (current === 'active') {
      this.activeFilterState.set('inactive');
    } else {
      this.activeFilterState.set('all');
    }
    this.currentPage.set(1);
  }

  closeColumnDropdown() {
    if (this.showColumnSelector()) {
      this.showColumnSelector.set(false);
    }
  }

  toggleColumnDropdown(event: Event) {
    event.stopPropagation();
    this.showColumnSelector.update(v => !v);
    this.showExportOptions.set(false);
    this.showActiveHeaderDropdown.set(false);
    this.isFilterMenuOpen = false;
  }

  toggleExportDropdown(event: Event) {
    event.stopPropagation();
    this.showExportOptions.update(v => !v);
    this.showColumnSelector.set(false);
    this.showActiveHeaderDropdown.set(false);
    this.isFilterMenuOpen = false;
  }

  toggleActiveHeaderDropdown(event: Event) {
    event.stopPropagation();
    this.showActiveHeaderDropdown.update(v => !v);
    this.showColumnSelector.set(false);
    this.showExportOptions.set(false);
    this.isFilterMenuOpen = false;
  }

  toggleFilterMenu() {
    this.isFilterMenuOpen = !this.isFilterMenuOpen;
    this.showColumnSelector.set(false);
    this.showExportOptions.set(false);
    this.showActiveHeaderDropdown.set(false);
  }

  clearFilters() {
    this.searchText.set('');
    this.activeFilterState.set('all');
    this.isFilterMenuOpen = false;
    this.currentPage.set(1);
  }

  isColVisible(colName: string): boolean {
    return this.visibleColumns().includes(colName);
  }

  toggleCol(colName: string) {
    this.visibleColumns.update(cols => {
      if (cols.includes(colName)) {
        return cols.filter(c => c !== colName);
      } else {
        return [...cols, colName];
      }
    });
  }

  // Header Dropdown Actions
  sortActive(dir: 'asc' | 'desc') {
    this.sortActiveState.set(dir);
    this.showActiveHeaderDropdown.set(false);
  }

  pinColumn(dir: string) {
    alert(`Columna de Activo fijada a la ${dir} exitosamente.`);
    this.showActiveHeaderDropdown.set(false);
  }

  filterActiveState(state: 'all' | 'active' | 'inactive') {
    this.activeFilterState.set(state);
    this.showActiveHeaderDropdown.set(false);
    this.currentPage.set(1);
  }

  toggleRowActiveState(id: string, checked: boolean) {
    this.items.update(list => 
      list.map(item => item.id === id ? { ...item, activo: checked } : item)
    );
    const updatedItem = this.items().find(i => i.id === id);
    if (updatedItem) {
      this.svc.updateOperario(id, { activo: checked }).subscribe();
    }
  }

  // Pagination Actions
  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
    }
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
    }
  }

  setPage(p: number) {
    this.currentPage.set(p);
  }

  getPages(current: number, total: number): (number | string)[] {
    if (total <= 1) return [];
    const pages: (number | string)[] = [];
    const windowSize = 1;

    pages.push(1);

    if (current > windowSize + 2) {
      pages.push('...');
    }

    const start = Math.max(2, current - windowSize);
    const end = Math.min(total - 1, current + windowSize);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < total - (windowSize + 1)) {
      pages.push('...');
    }

    pages.push(total);

    return pages;
  }

  // CRUD Actions
  openViewModal(item: Operario) {
    this.form = { ...item };
    this.modalReadOnly.set(true);
    this.showModal.set(true);
    this.showColumnSelector.set(false);
    this.showExportOptions.set(false);
    this.showActiveHeaderDropdown.set(false);
  }

  openEditModal(item: Operario) {
    this.form = { ...item };
    this.modalReadOnly.set(false);
    this.showModal.set(true);
    this.showColumnSelector.set(false);
    this.showExportOptions.set(false);
    this.showActiveHeaderDropdown.set(false);
  }

  openCreate() {
    this.form = { 
      nombre: '', 
      activo: true, 
      fotografia: '',
      userGuid: `usr_new_${Math.floor(Math.random()*10000)}`
    };
    this.modalReadOnly.set(false);
    this.showModal.set(true);
    this.showColumnSelector.set(false);
    this.showExportOptions.set(false);
    this.showActiveHeaderDropdown.set(false);
  }

  closeModal() {
    this.showModal.set(false);
    this.form = {};
  }

  save() {
    if (!this.form.nombre || !this.form.nombre.trim()) {
      alert('El campo Nombre es requerido.');
      return;
    }
    
    const payload = {
      nombre: this.form.nombre,
      activo: this.form.activo
    };

    if (!this.form.id) {
      this.svc.createOperario(payload).subscribe(() => {
        this.closeModal();
        this.load();
      });
    } else {
      this.svc.updateOperario(this.form.id, payload).subscribe(() => {
        this.closeModal();
        this.load();
      });
    }
  }

  del(item: Operario) {
    if (confirm(`¿Está seguro de que desea eliminar al operario "${item.nombre}"?`)) {
      this.svc.deleteOperario(item.id).subscribe(() => {
        this.load();
        if (this.currentPage() > this.totalPages()) {
          this.currentPage.set(this.totalPages());
        }
      });
    }
  }

  // Export options
  exportCSV() {
    this.showExportOptions.set(false);
    
    // Transformar los datos para el Excel
    const dataToExport = this.filteredItems().map(op => ({
      ID: op.id,
      Nombre: op.nombre,
      Fotografía: op.fotografia,
      UserGUID: op.userGuid,
      Estado: op.activo ? 'Activo' : 'Inactivo'
    }));

    // Crear la hoja de trabajo y el libro
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Operarios');

    // Escribir el archivo
    XLSX.writeFile(wb, `operarios_reporte_${new Date().toISOString().slice(0,10)}.xlsx`);
  }

  exportPDF() {
    this.showExportOptions.set(false);
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    let tableRows = '';
    this.filteredItems().forEach(op => {
      tableRows += `
        <tr>
          <td>${op.id.substring(0,8)}</td>
          <td>${op.nombre}</td>
          <td>${op.userGuid}</td>
          <td>${op.activo ? 'Activo' : 'Inactivo'}</td>
        </tr>`;
    });

    printWindow.document.write(`
      <html>
        <head>
          <title>Reporte de Operarios</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 2rem; color: #1e293b; background-color: #f8fafc; }
            h1 { color: #10b981; margin-bottom: 0.2rem; font-size: 1.8rem; }
            p { color: #64748b; font-size: 0.9rem; margin-bottom: 1.5rem; }
            table { width: 100%; border-collapse: collapse; margin-top: 1rem; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
            th, td { padding: 12px 16px; border-bottom: 1px solid #e2e8f0; text-align: left; font-size: 0.875rem; }
            th { background: #f1f5f9; font-weight: bold; color: #475569; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em; }
            tr:last-child td { border-bottom: none; }
          </style>
        </head>
        <body>
          <h1>Reporte de Operarios</h1>
          <p>Generado el: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>ID Corto</th>
                <th>Nombre</th>
                <th>User GUID</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
          <script>window.onload = function() { window.print(); window.close(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }
}
