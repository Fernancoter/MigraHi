import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduccionConfigService, Producto, Categoria } from '../../../../core/services/produccion-config.service';

@Component({
  selector: 'app-productos-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up">
      <!-- Encabezado del Módulo -->
      <header class="module-header">
        <div class="title-area">
          <nav class="breadcrumb">Producción › Catálogos › Productos</nav>
          <h1>Catálogo de Productos</h1>
        </div>
        
        <!-- Barra de Acciones Premium -->
        <div class="actions-toolbar">
          
          <!-- Filtro de Búsqueda -->
          <div class="search-box">
            <span class="search-icon">🔍</span>
            <input 
              class="field-input" 
              type="text" 
              placeholder="Buscar producto..." 
              [ngModel]="searchText()" 
              (ngModelChange)="searchText.set($event); currentPage.set(1)"
            />
          </div>

          <!-- Toggle de Filtros de Estado Rápido -->
          <button 
            class="btn btn-secondary" 
            [class.active-filter]="activeFilterState() !== 'all'" 
            (click)="cycleActiveFilterState()"
            title="Filtrar por estado activo"
            style="display: flex; align-items: center; gap: 0.4rem;"
          >
            <span>🔄</span> Estado: {{ activeFilterState() === 'all' ? 'Todos' : activeFilterState() === 'active' ? 'Activos' : 'Inactivos' }}
          </button>

          <!-- Selector de Columnas -->
          <div class="dropdown-wrapper">
            <button class="btn btn-secondary" (click)="toggleColumnDropdown($event)" style="display: flex; align-items: center; gap: 0.4rem;">
              <span>📊</span> Columnas
            </button>
            @if (showColumnSelector()) {
              <div class="column-selector-popover animate-slide-up" (click)="$event.stopPropagation()">
                <h4>Columnas Visibles</h4>
                <div class="column-list">
                  <label>
                    <input type="checkbox" [checked]="isColVisible('clave')" (change)="toggleCol('clave')"> Clave
                  </label>
                  <label>
                    <input type="checkbox" [checked]="isColVisible('nombre')" (change)="toggleCol('nombre')"> Nombre
                  </label>
                  <label>
                    <input type="checkbox" [checked]="isColVisible('categoria')" (change)="toggleCol('categoria')"> Categoría
                  </label>
                  <label>
                    <input type="checkbox" [checked]="isColVisible('activo')" (change)="toggleCol('activo')"> Activo
                  </label>
                </div>
              </div>
            }
          </div>

          <!-- Dropdown de Exportar -->
          <div class="dropdown-wrapper">
            <button class="btn btn-secondary" (click)="toggleExportDropdown($event)" style="display: flex; align-items: center; gap: 0.4rem;">
              <span>⬇️</span> Exportar
            </button>
            @if (showExportOptions()) {
              <div class="column-selector-popover animate-slide-up">
                <div class="dropdown-item" (click)="exportCSV()">Excel (CSV)</div>
                <div class="dropdown-item" (click)="exportPDF()">PDF</div>
              </div>
            }
          </div>

          <!-- Botón Agregar -->
          <button class="btn btn-primary" (click)="openCreate()">+ Agregar</button>
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
              @if (isColVisible('clave')) {
                <th>Clave</th>
              }
              @if (isColVisible('nombre')) {
                <th>Nombre</th>
              }
              @if (isColVisible('categoria')) {
                <th>Categoría</th>
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
              <tr><td colspan="7" class="empty-state">Cargando productos...</td></tr> 
            }
            @else if (paginatedItems().length === 0) { 
              <tr><td colspan="7" class="empty-state">No se encontraron productos registrados</td></tr> 
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
                  @if (isColVisible('clave')) { 
                    <td><code class="id-tag" style="background: #f1f5f9; padding: 0.2rem 0.4rem; border-radius: 4px; font-size: 0.78rem; font-weight: 700; color: #475569;">{{ item.clave }}</code></td> 
                  }
                  @if (isColVisible('nombre')) { 
                    <td class="col-nombre">{{ item.nombre }}</td> 
                  }
                  @if (isColVisible('categoria')) { 
                    <td>
                      <span class="category-badge">{{ item.categoria || 'Sin Categoría' }}</span>
                    </td> 
                  }
                  @if (isColVisible('activo')) {
                    <td style="width: 120px;">
                      <label class="checkbox-container">
                        <input 
                          type="checkbox" 
                          [checked]="item.isActive" 
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

      <!-- Modal de Producto -->
      @if (showModal()) {
        <div class="modal-overlay" (click)="closeModal()">
          <div class="modal-card" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h3>Información General</h3>
              <button class="modal-close" (click)="closeModal()">✕</button>
            </div>
            
            <div class="modal-body">
              <!-- SAE Product Selector/Input Bar -->
              <div class="form-row">
                <label class="field-label">SAE Product</label>
                <div class="sae-selector-wrapper" [class.disabled]="modalReadOnly()">
                  <div class="sae-select-bar" (click)="!modalReadOnly() && toggleSaeDropdown($event)">
                    <span class="sae-value">{{ form.productoSAE || 'Ninguno' }}</span>
                    <span class="sae-arrow">▼</span>
                  </div>
                  @if (showSaeDropdown()) {
                    <div class="sae-dropdown animate-slide-up" (click)="$event.stopPropagation()">
                      <div class="sae-dropdown-header">Códigos SAE Disponibles</div>
                      @if (saeCodes().length === 0) {
                        <div class="sae-empty">No hay registros Aspel SAE disponibles</div>
                      } @else {
                        @for (code of saeCodes(); track code.code) {
                          <div class="sae-item" (click)="selectSaeCode(code)">
                            <span class="sae-code">{{ code.code }}</span>
                            <span class="sae-name">{{ code.name }}</span>
                          </div>
                        }
                      }
                    </div>
                  }
                </div>
              </div>

              <!-- Category Dropdown Selector -->
              <div class="form-row">
                <label class="field-label">Categoría</label>
                <select 
                  class="field-input" 
                  [(ngModel)]="form.categoriaId" 
                  [disabled]="modalReadOnly()"
                >
                  <option [value]="undefined">Ninguno</option>
                  @for (cat of categories(); track cat.id) {
                    <option [value]="cat.id">{{ cat.nombre }}</option>
                  }
                </select>
              </div>

              <div class="form-row">
                <label class="field-label">Clave *</label>
                <input 
                  class="field-input" 
                  type="text" 
                  [(ngModel)]="form.clave" 
                  [disabled]="modalReadOnly() || form.id !== undefined" 
                  placeholder="Ej: MP-001" 
                />
              </div>

              <div class="form-row">
                <label class="field-label">Nombre *</label>
                <input 
                  class="field-input" 
                  type="text" 
                  [(ngModel)]="form.nombre" 
                  [disabled]="modalReadOnly()" 
                  placeholder="Nombre completo del producto..." 
                />
              </div>

              <div class="form-row">
                <label class="field-label">Descripción</label>
                <textarea 
                  class="field-input" 
                  rows="2"
                  [(ngModel)]="form.descripcion" 
                  [disabled]="modalReadOnly()" 
                  placeholder="Descripción detallada del producto..."
                ></textarea>
              </div>

              <div class="form-row" style="margin-top: 0.5rem;">
                <label class="checkbox-container" style="display: flex; align-items: center; gap: 0.6rem; font-weight: 600; color: #475569;">
                  <input 
                    type="checkbox" 
                    [(ngModel)]="form.isActive" 
                    [disabled]="modalReadOnly()" 
                  />
                  <span class="checkmark"></span>
                  <span>Producto Activo</span>
                </label>
              </div>
            </div>

            <div class="modal-footer">
              @if (modalReadOnly()) { 
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
    .module-page { padding: 1.5rem 2.5rem; }
    .breadcrumb { font-size: .75rem; color: #94a3b8; font-weight: 600; text-transform: uppercase; margin-bottom: .25rem; }
    h1 { font-size: 1.8rem; font-weight: 800; color: #1e293b; margin: 0; }
    .module-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem; }
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
    .category-badge { display: inline-block; padding: 0.25rem 0.6rem; border-radius: 6px; background: rgba(16, 185, 129, 0.08); color: #059669; font-weight: 700; font-size: 0.78rem; }
    
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
    
    /* SAE Product selector input */
    .sae-selector-wrapper { position: relative; width: 100%; }
    .sae-select-bar { display: flex; justify-content: space-between; align-items: center; width: 100%; padding: .65rem .875rem; border-radius: 8px; border: 1px solid #e2e8f0; font-size: .875rem; background: white; cursor: pointer; user-select: none; box-sizing: border-box; font-weight: 600; color: #334155; transition: border-color 0.2s; }
    .sae-select-bar:hover { border-color: #cbd5e1; }
    .sae-selector-wrapper.disabled .sae-select-bar { background: #f8fafc; color: #64748b; cursor: not-allowed; border-color: #e2e8f0; }
    .sae-arrow { font-size: 0.65rem; color: #94a3b8; }
    .sae-dropdown { position: absolute; left: 0; top: 105%; width: 100%; background: white; border: 1px solid #e2e8f0; border-radius: 10px; box-shadow: 0 10px 25px rgba(0,0,0,0.08); z-index: 200; overflow: hidden; padding: 0.4rem 0; }
    .sae-dropdown-header { font-size: 0.72rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; padding: 0.5rem 1rem; border-bottom: 1px solid #f1f5f9; letter-spacing: 0.05em; }
    .sae-empty { padding: 1rem; font-size: 0.85rem; color: #94a3b8; text-align: center; font-style: italic; }
    .sae-item { display: flex; flex-direction: column; padding: 0.6rem 1rem; cursor: pointer; transition: background 0.15s; border-bottom: 1px solid #f8fafc; }
    .sae-item:last-child { border-bottom: none; }
    .sae-item:hover { background: #f1f5f9; }
    .sae-code { font-weight: 800; font-size: 0.8rem; color: #10b981; }
    .sae-name { font-size: 0.85rem; color: #475569; font-weight: 500; }

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
export class ProductosCatalogoComponent implements OnInit {
  private svc = inject(ProduccionConfigService);
  
  items = signal<Producto[]>([]);
  categories = signal<Categoria[]>([]);
  loading = signal(true);
  showModal = signal(false);
  modalReadOnly = signal(false);
  showSaeDropdown = signal(false);
  form: Partial<Producto> = {};

  // Mock Aspel SAE Codes
  saeCodes = signal<{ code: string; name: string }[]>([
    { code: 'SAE-PROD-001', name: 'Bobina de Película Polietileno 80cm' },
    { code: 'SAE-PROD-002', name: 'Tubo de Plástico Flexible 1/2' },
    { code: 'SAE-PROD-003', name: 'Perfil Extruido Industrial PVC' },
    { code: 'SAE-PROD-004', name: 'Bobina Plástica Termoencogible' }
  ]);

  // Actions & Popover States
  searchText = signal<string>('');
  activeFilterState = signal<'all' | 'active' | 'inactive'>('all');
  sortActiveState = signal<'asc' | 'desc' | null>(null);
  
  showColumnSelector = signal<boolean>(false);
  showExportOptions = signal<boolean>(false);
  showActiveHeaderDropdown = signal<boolean>(false);
  
  visibleColumns = signal<string[]>(['clave', 'nombre', 'categoria', 'activo']);

  // Pagination Signals
  currentPage = signal<number>(1);
  pageSize = signal<number>(8);

  ngOnInit() {
    this.load();
    this.loadCategories();
  }

  loadCategories() {
    this.svc.getCategorias().subscribe(res => this.categories.set(res));
  }

  load() {
    this.loading.set(true);
    this.svc.getProductos().subscribe({
      next: data => {
        this.items.set(data);
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
      list = list.filter(p => 
        p.nombre.toLowerCase().includes(search) || 
        p.clave.toLowerCase().includes(search) ||
        (p.categoria || '').toLowerCase().includes(search)
      );
    }

    // Active State Filter
    const filter = this.activeFilterState();
    if (filter === 'active') {
      list = list.filter(p => p.isActive);
    } else if (filter === 'inactive') {
      list = list.filter(p => !p.isActive);
    }

    // Active State Sorting
    const sort = this.sortActiveState();
    if (sort === 'asc') {
      list = [...list].sort((a, b) => (a.isActive === b.isActive ? 0 : a.isActive ? 1 : -1));
    } else if (sort === 'desc') {
      list = [...list].sort((a, b) => (a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1));
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

  toggleColumnDropdown(event: Event) {
    event.stopPropagation();
    this.showColumnSelector.update(v => !v);
    this.showExportOptions.set(false);
    this.showActiveHeaderDropdown.set(false);
  }

  toggleExportDropdown(event: Event) {
    event.stopPropagation();
    this.showExportOptions.update(v => !v);
    this.showColumnSelector.set(false);
    this.showActiveHeaderDropdown.set(false);
  }

  toggleActiveHeaderDropdown(event: Event) {
    event.stopPropagation();
    this.showActiveHeaderDropdown.update(v => !v);
    this.showColumnSelector.set(false);
    this.showExportOptions.set(false);
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
      list.map(item => item.id === id ? { ...item, isActive: checked } : item)
    );
    const updatedItem = this.items().find(i => i.id === id);
    if (updatedItem) {
      this.svc.updateProducto(id, { isActive: checked }).subscribe();
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

  // SAE Dropdown actions
  toggleSaeDropdown(event: Event) {
    event.stopPropagation();
    this.showSaeDropdown.update(v => !v);
  }

  selectSaeCode(code: { code: string; name: string }) {
    this.form.productoSAE = code.code;
    this.form.nombre = code.name; // Auto-populate product name!
    this.showSaeDropdown.set(false);
  }

  // CRUD Actions
  openViewModal(item: Producto) {
    this.form = { ...item };
    this.modalReadOnly.set(true);
    this.showModal.set(true);
    this.showSaeDropdown.set(false);
    this.showColumnSelector.set(false);
    this.showExportOptions.set(false);
    this.showActiveHeaderDropdown.set(false);
  }

  openEditModal(item: Producto) {
    this.form = { ...item };
    this.modalReadOnly.set(false);
    this.showModal.set(true);
    this.showSaeDropdown.set(false);
    this.showColumnSelector.set(false);
    this.showExportOptions.set(false);
    this.showActiveHeaderDropdown.set(false);
  }

  openCreate() {
    this.form = { 
      clave: '',
      nombre: '', 
      isActive: true, 
      productoSAE: 'Ninguno',
      precioUnitario: 0
    };
    this.modalReadOnly.set(false);
    this.showModal.set(true);
    this.showSaeDropdown.set(false);
    this.showColumnSelector.set(false);
    this.showExportOptions.set(false);
    this.showActiveHeaderDropdown.set(false);
  }

  closeModal() {
    this.showModal.set(false);
    this.form = {};
  }

  save() {
    if (!this.form.clave || !this.form.clave.trim()) {
      alert('El campo Clave es requerido.');
      return;
    }
    if (!this.form.nombre || !this.form.nombre.trim()) {
      alert('El campo Nombre es requerido.');
      return;
    }
    
    // Fill category name if selected
    if (this.form.categoriaId) {
      const cat = this.categories().find(c => c.id === this.form.categoriaId);
      if (cat) {
        this.form.categoria = cat.nombre;
      }
    } else {
      this.form.categoria = undefined;
    }

    const payload = {
      clave: this.form.clave,
      nombre: this.form.nombre,
      descripcion: this.form.descripcion,
      categoriaId: this.form.categoriaId,
      categoria: this.form.categoria,
      isActive: this.form.isActive,
      productoSAE: this.form.productoSAE === 'Ninguno' ? undefined : this.form.productoSAE,
      precioUnitario: this.form.precioUnitario || 0
    };

    if (!this.form.id) {
      this.svc.createProducto(payload).subscribe(() => {
        this.closeModal();
        this.load();
      });
    } else {
      this.svc.updateProducto(this.form.id, payload).subscribe(() => {
        this.closeModal();
        this.load();
      });
    }
  }

  del(item: Producto) {
    if (confirm(`¿Está seguro de que desea eliminar al producto "${item.nombre}"?`)) {
      this.svc.deleteProducto(item.id).subscribe(() => {
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
    let csvContent = '\uFEFFID;Clave;Nombre;Categoría;SAE;Estado\n';
    this.filteredItems().forEach(p => {
      csvContent += `${p.id};${p.clave};${p.nombre};${p.categoria || 'N/A'};${p.productoSAE || 'Ninguno'};${p.isActive ? 'Activo' : 'Inactivo'}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `productos_reporte_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  exportPDF() {
    this.showExportOptions.set(false);
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    let tableRows = '';
    this.filteredItems().forEach(p => {
      tableRows += `
        <tr>
          <td>${p.clave}</td>
          <td>${p.nombre}</td>
          <td>${p.categoria || 'Sin Categoría'}</td>
          <td>${p.productoSAE || 'Ninguno'}</td>
          <td>${p.isActive ? 'Activo' : 'Inactivo'}</td>
        </tr>`;
    });

    printWindow.document.write(`
      <html>
        <head>
          <title>Reporte de Productos</title>
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
          <h1>Reporte de Productos</h1>
          <p>Generado el: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Clave</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>SAE Product</th>
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
