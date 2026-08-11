import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduccionConfigService, Producto, Categoria } from '../../../../core/services/produccion-config.service';
import { SaeService } from '../../../../core/services/sae';
import { ClickOutsideDirective } from '../../../../shared/directives/click-outside.directive';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-productos-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule, ClickOutsideDirective],
  template: `
    <div class="module-page animate-move-up">
      <div class="page-header-premium">
        <div class="title-section">
          <h1 class="premium-title">{{ showModal() ? 'Gestionar Producto' : 'Producto' }}</h1>
          <nav class="breadcrumb-modern">
            <span class="root">Producción</span>
            <span class="sep">&rsaquo;</span>
            <span class="root">Catálogos</span>
            <span class="sep">&rsaquo;</span>
            <span class="active">Productos</span>
          </nav>
        </div>
      </div>

      @if (!showModal()) {
        <!-- Barra de Acciones Premium -->
        <div class="actions-toolbar" style="display: flex; width: 100%; align-items: center; margin-bottom: 1.5rem;">
          
          <!-- LEFT SIDE -->
          <div class="toolbar-left" style="display: flex; gap: 0.75rem; align-items: center;">
            <!-- Dropdown de Exportar -->
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

            <!-- Botón Agregar -->
            <button class="btn btn-outline-green" (click)="openCreate()">Agregar</button>

            <!-- Selector de Columnas -->
            <button class="btn btn-outline-green" (click)="showColumnModal.set(true)" style="display: flex; align-items: center; gap: 0.4rem;">
              Selecciona columnas <span style="font-size: 0.7rem; color: #10b981;">▼</span>
            </button>
          </div>

          <!-- FLEXIBLE SPACE -->
          <div class="toolbar-spacer" style="flex: 1;"></div>

          <!-- RIGHT SIDE -->
          <div class="toolbar-right">
            <div class="filter-search-group-qa">
              <!-- Botón Filtro Avanzado -->
              <div class="dropdown-wrapper">
                <button class="btn-filter-funnel-qa" (click)="toggleFilterDropdown($event)" title="Filtros avanzados">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>
                  <span class="chevron-down-funnel">▾</span>
                </button>
                
                @if (showFilterDropdown()) {
                  <div class="header-popover-menu animate-slide-up" style="position: absolute; top: calc(100% + 4px); right: 0; left: auto; width: 200px; z-index: 99999; padding: 6px 0;" (click)="$event.stopPropagation()">
                    <div class="popover-item" (click)="clearFilters()" style="display: flex; align-items: center; gap: 8px; padding: 0.55rem 0.9rem; font-size: 0.85rem; color: #334155; cursor: pointer;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                      Limpiar filtros
                    </div>
                    <div class="popover-item" (click)="saveFilterAs()" style="display: flex; align-items: center; gap: 8px; padding: 0.55rem 0.9rem; font-size: 0.85rem; color: #334155; cursor: pointer;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                      Guardar filtro como...
                    </div>
                    
                    @if (savedFilters.length > 0) {
                      <div class="popover-divider"></div>
                      <div style="font-size: 0.7rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; padding: 0.25rem 0.5rem;">Filtros Guardados</div>
                      @for (f of savedFilters; track f.id) {
                        <div class="popover-item" (click)="loadSavedFilter(f)" style="display: flex; justify-content: space-between; align-items: center; padding: 0.55rem 0.9rem; font-size: 0.85rem; color: #334155; cursor: pointer;">
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
                <input 
                  type="text" 
                  placeholder="Buscar..." 
                  [ngModel]="searchText()" 
                  (ngModelChange)="searchText.set($event); currentPage.set(1)"
                />
              </div>
            </div>
          </div>
        </div>
      }

      @if (!showModal()) {
      <!-- Tabla de Datos Premium -->
      <div class="content-card" style="margin-top: 1rem; position: relative; min-height: 300px;">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 70px;"></th> <!-- Ver -->
              <th style="width: 70px;"></th> <!-- Editar -->
              <th style="width: 70px;"></th> <!-- Borrar -->
              @if (isColVisible('categoria')) {
                <th class="header-with-dropdown">
                  <div class="header-cell-content" (click)="toggleHeaderDropdown('categoria', $event)">
                    <span>Categoría</span>
                    <span class="dropdown-arrow-icon">▼</span>
                  </div>
                  @if (activeHeaderDropdown() === 'categoria') {
                    <div class="header-popover-menu animate-slide-up" (click)="$event.stopPropagation()">
                      <div class="popover-item" (click)="sortBy('categoria', 'asc')"><span class="icon">⬆️</span> Ordenar A-Z</div>
                      <div class="popover-item" (click)="sortBy('categoria', 'desc')"><span class="icon">⬇️</span> Ordenar Z-A</div>
                      <div class="popover-divider"></div>
                      <div class="popover-item" (click)="pinColumn('categoria', 'izquierda')"><span class="icon">📌</span> Fijar a la izquierda</div>
                      <div class="popover-item" (click)="pinColumn('categoria', 'derecha')"><span class="icon">📌</span> Fijar a la derecha</div>
                      <div class="popover-divider"></div>
                      <div style="padding: 0 1rem 0.5rem 1rem;">
                        <input type="text" class="search-input" placeholder="Buscar..." [ngModel]="filterCategoria()" (ngModelChange)="filterCategoria.set($event)">
                        <div class="suggestions">
                          <span class="suggestion-label">Sugerencias</span>
                          @for (val of getTop3Frequent('categoria'); track val) {
                            <div class="suggestion-item" (click)="filterCategoria.set(val); activeHeaderDropdown.set(null)">{{ val }}</div>
                          }
                        </div>
                      </div>
                    </div>
                  }
                </th>
              }
              @if (isColVisible('productoBase')) {
                <th class="header-with-dropdown">
                  <div class="header-cell-content" (click)="toggleHeaderDropdown('productoBase', $event)">
                    <span>Producto Base</span>
                    <span class="dropdown-arrow-icon">▼</span>
                  </div>
                  @if (activeHeaderDropdown() === 'productoBase') {
                    <div class="header-popover-menu animate-slide-up" (click)="$event.stopPropagation()">
                      <div class="popover-item" (click)="sortBy('productoBase', 'asc')"><span class="icon">⬆️</span> Ordenar A-Z</div>
                      <div class="popover-item" (click)="sortBy('productoBase', 'desc')"><span class="icon">⬇️</span> Ordenar Z-A</div>
                      <div class="popover-divider"></div>
                      <div class="popover-item" (click)="pinColumn('productoBase', 'izquierda')"><span class="icon">📌</span> Fijar a la izquierda</div>
                      <div class="popover-item" (click)="pinColumn('productoBase', 'derecha')"><span class="icon">📌</span> Fijar a la derecha</div>
                      <div class="popover-divider"></div>
                      <div style="padding: 0 1rem 0.5rem 1rem;">
                        <input type="text" class="search-input" placeholder="Buscar..." [ngModel]="filterProductoBase()" (ngModelChange)="filterProductoBase.set($event)">
                        <div class="suggestions">
                          <span class="suggestion-label">Sugerencias</span>
                          @for (val of getTop3Frequent('productoBase'); track val) {
                            <div class="suggestion-item" (click)="filterProductoBase.set(val); activeHeaderDropdown.set(null)">{{ val }}</div>
                          }
                        </div>
                      </div>
                    </div>
                  }
                </th>
              }
              @if (isColVisible('clave')) {
                <th class="header-with-dropdown">
                  <div class="header-cell-content" (click)="toggleHeaderDropdown('clave', $event)">
                    <span>Clave</span>
                    <span class="dropdown-arrow-icon">▼</span>
                  </div>
                  @if (activeHeaderDropdown() === 'clave') {
                    <div class="header-popover-menu animate-slide-up" (click)="$event.stopPropagation()">
                      <div class="popover-item" (click)="sortBy('clave', 'asc')"><span class="icon">⬆️</span> Ordenar A-Z</div>
                      <div class="popover-item" (click)="sortBy('clave', 'desc')"><span class="icon">⬇️</span> Ordenar Z-A</div>
                      <div class="popover-divider"></div>
                      <div class="popover-item" (click)="pinColumn('clave', 'izquierda')"><span class="icon">📌</span> Fijar a la izquierda</div>
                      <div class="popover-item" (click)="pinColumn('clave', 'derecha')"><span class="icon">📌</span> Fijar a la derecha</div>
                      <div class="popover-divider"></div>
                      <div style="padding: 0 1rem 0.5rem 1rem;">
                        <input type="text" class="search-input" placeholder="Buscar..." [ngModel]="filterClave()" (ngModelChange)="filterClave.set($event)">
                        <div class="suggestions">
                          <span class="suggestion-label">Sugerencias</span>
                          @for (val of getTop3Frequent('clave'); track val) {
                            <div class="suggestion-item" (click)="filterClave.set(val); activeHeaderDropdown.set(null)">{{ val }}</div>
                          }
                        </div>
                      </div>
                    </div>
                  }
                </th>
              }
              @if (isColVisible('nombre')) {
                <th class="header-with-dropdown">
                  <div class="header-cell-content" (click)="toggleHeaderDropdown('nombre', $event)">
                    <span>Nombre</span>
                    <span class="dropdown-arrow-icon">▼</span>
                  </div>
                  @if (activeHeaderDropdown() === 'nombre') {
                    <div class="header-popover-menu animate-slide-up" (click)="$event.stopPropagation()">
                      <div class="popover-item" (click)="sortBy('nombre', 'asc')"><span class="icon">⬆️</span> Ordenar A-Z</div>
                      <div class="popover-item" (click)="sortBy('nombre', 'desc')"><span class="icon">⬇️</span> Ordenar Z-A</div>
                      <div class="popover-divider"></div>
                      <div class="popover-item" (click)="pinColumn('nombre', 'izquierda')"><span class="icon">📌</span> Fijar a la izquierda</div>
                      <div class="popover-item" (click)="pinColumn('nombre', 'derecha')"><span class="icon">📌</span> Fijar a la derecha</div>
                      <div class="popover-divider"></div>
                      <div style="padding: 0 1rem 0.5rem 1rem;">
                        <input type="text" class="search-input" placeholder="Buscar..." [ngModel]="filterNombre()" (ngModelChange)="filterNombre.set($event)">
                        <div class="suggestions">
                          <span class="suggestion-label">Sugerencias</span>
                          @for (val of getTop3Frequent('nombre'); track val) {
                            <div class="suggestion-item" (click)="filterNombre.set(val); activeHeaderDropdown.set(null)">{{ val }}</div>
                          }
                        </div>
                      </div>
                    </div>
                  }
                </th>
              }
              @if (isColVisible('descripcion')) {
                <th class="header-with-dropdown">
                  <div class="header-cell-content" (click)="toggleHeaderDropdown('descripcion', $event)">
                    <span>Descripción</span>
                    <span class="dropdown-arrow-icon">▼</span>
                  </div>
                  @if (activeHeaderDropdown() === 'descripcion') {
                    <div class="header-popover-menu animate-slide-up" (click)="$event.stopPropagation()">
                      <div class="popover-item" (click)="sortBy('descripcion', 'asc')"><span class="icon">⬆️</span> Ordenar A-Z</div>
                      <div class="popover-item" (click)="sortBy('descripcion', 'desc')"><span class="icon">⬇️</span> Ordenar Z-A</div>
                      <div class="popover-divider"></div>
                      <div class="popover-item" (click)="pinColumn('descripcion', 'izquierda')"><span class="icon">📌</span> Fijar a la izquierda</div>
                      <div class="popover-item" (click)="pinColumn('descripcion', 'derecha')"><span class="icon">📌</span> Fijar a la derecha</div>
                      <div class="popover-divider"></div>
                      <div style="padding: 0 1rem 0.5rem 1rem;">
                        <input type="text" class="search-input" placeholder="Buscar..." [ngModel]="filterDescripcion()" (ngModelChange)="filterDescripcion.set($event)">
                        <div class="suggestions">
                          <span class="suggestion-label">Sugerencias</span>
                          @for (val of getTop3Frequent('descripcion'); track val) {
                            <div class="suggestion-item" (click)="filterDescripcion.set(val); activeHeaderDropdown.set(null)">{{ val }}</div>
                          }
                        </div>
                      </div>
                    </div>
                  }
                </th>
              }
              @if (isColVisible('precioUnitario')) {
                <th class="header-with-dropdown">
                  <div class="header-cell-content" (click)="toggleHeaderDropdown('precioUnitario', $event)">
                    <span>Precio Unitario</span>
                    <span class="dropdown-arrow-icon">▼</span>
                  </div>
                  @if (activeHeaderDropdown() === 'precioUnitario') {
                    <div class="header-popover-menu animate-slide-up" (click)="$event.stopPropagation()">
                      <div class="popover-item" (click)="sortBy('precioUnitario', 'asc')"><span class="icon">⬆️</span> Menor a Mayor</div>
                      <div class="popover-item" (click)="sortBy('precioUnitario', 'desc')"><span class="icon">⬇️</span> Mayor a Menor</div>
                      <div class="popover-divider"></div>
                      <div class="popover-item" (click)="pinColumn('precioUnitario', 'izquierda')"><span class="icon">📌</span> Fijar a la izquierda</div>
                      <div class="popover-item" (click)="pinColumn('precioUnitario', 'derecha')"><span class="icon">📌</span> Fijar a la derecha</div>
                      <div class="popover-divider"></div>
                      <div style="padding: 0 1rem 0.5rem 1rem;">
                        <div class="range-group">
                          <div class="range-field">
                            <label>Desde</label>
                            <input type="number" class="search-input" style="margin-bottom:0;" placeholder="Mínimo" [ngModel]="filterPrecioMin()" (ngModelChange)="filterPrecioMin.set($event)">
                          </div>
                          <div class="range-field" style="margin-top:0.5rem;">
                            <label>Hasta</label>
                            <input type="number" class="search-input" style="margin-bottom:0;" placeholder="Máximo" [ngModel]="filterPrecioMax()" (ngModelChange)="filterPrecioMax.set($event)">
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </th>
              }
              @if (isColVisible('tipoMaterial')) {
                <th class="header-with-dropdown">
                  <div class="header-cell-content" (click)="toggleHeaderDropdown('tipoMaterial', $event)">
                    <span>Tipo Material</span>
                    <span class="dropdown-arrow-icon">▼</span>
                  </div>
                  @if (activeHeaderDropdown() === 'tipoMaterial') {
                    <div class="header-popover-menu animate-slide-up" (click)="$event.stopPropagation()">
                      <div class="popover-item" (click)="sortBy('tipoMaterial', 'asc')"><span class="icon">⬆️</span> Ordenar A-Z</div>
                      <div class="popover-item" (click)="sortBy('tipoMaterial', 'desc')"><span class="icon">⬇️</span> Ordenar Z-A</div>
                      <div class="popover-divider"></div>
                      <div class="popover-item" (click)="pinColumn('tipoMaterial', 'izquierda')"><span class="icon">📌</span> Fijar a la izquierda</div>
                      <div class="popover-item" (click)="pinColumn('tipoMaterial', 'derecha')"><span class="icon">📌</span> Fijar a la derecha</div>
                      <div class="popover-divider"></div>
                      <div style="padding: 0 1rem 0.5rem 1rem;">
                        <input type="text" class="search-input" placeholder="Buscar..." [ngModel]="filterTipoMaterial()" (ngModelChange)="filterTipoMaterial.set($event)">
                        <div class="suggestions">
                          <span class="suggestion-label">Sugerencias</span>
                          @for (val of getTop3Frequent('tipoMaterial'); track val) {
                            <div class="suggestion-item" (click)="filterTipoMaterial.set(val); activeHeaderDropdown.set(null)">{{ val }}</div>
                          }
                        </div>
                      </div>
                    </div>
                  }
                </th>
              }
              @if (isColVisible('activo')) {
                <th class="header-with-dropdown">
                  <div class="header-cell-content" (click)="toggleHeaderDropdown('activo', $event)">
                    <span>Activo</span>
                    <span class="dropdown-arrow-icon">▼</span>
                  </div>
                  @if (activeHeaderDropdown() === 'activo') {
                    <div class="header-popover-menu animate-slide-up" (click)="$event.stopPropagation()">
                      <div class="popover-item" (click)="sortBy('isActive', 'desc')"><span class="icon">⬆️</span> Activos primero</div>
                      <div class="popover-item" (click)="sortBy('isActive', 'asc')"><span class="icon">⬇️</span> Inactivos primero</div>
                      <div class="popover-divider"></div>
                      <div class="popover-item" (click)="pinColumn('activo', 'izquierda')"><span class="icon">📌</span> Fijar a la izquierda</div>
                      <div class="popover-item" (click)="pinColumn('activo', 'derecha')"><span class="icon">📌</span> Fijar a la derecha</div>
                      <div class="popover-divider"></div>
                      <div class="popover-item" (click)="filterActiveState('active')"><span class="icon">🟩</span> Solo Activos</div>
                      <div class="popover-item" (click)="filterActiveState('inactive')"><span class="icon">🟥</span> Solo Inactivos</div>
                      <div class="popover-item" (click)="filterActiveState('all')"><span class="icon">🔄</span> Mostrar Todos</div>
                    </div>
                  }
                </th>
              }
              @if (isColVisible('productoSAE')) {
                <th class="header-with-dropdown">
                  <div class="header-cell-content" (click)="toggleHeaderDropdown('productoSAE', $event)">
                    <span>Producto SAE</span>
                    <span class="dropdown-arrow-icon">▼</span>
                  </div>
                  @if (activeHeaderDropdown() === 'productoSAE') {
                    <div class="header-popover-menu animate-slide-up" (click)="$event.stopPropagation()">
                      <div class="popover-item" (click)="sortBy('productoSAE', 'asc')"><span class="icon">⬆️</span> Ordenar A-Z</div>
                      <div class="popover-item" (click)="sortBy('productoSAE', 'desc')"><span class="icon">⬇️</span> Ordenar Z-A</div>
                      <div class="popover-divider"></div>
                      <div class="popover-item" (click)="pinColumn('productoSAE', 'izquierda')"><span class="icon">📌</span> Fijar a la izquierda</div>
                      <div class="popover-item" (click)="pinColumn('productoSAE', 'derecha')"><span class="icon">📌</span> Fijar a la derecha</div>
                      <div class="popover-divider"></div>
                      <div style="padding: 0 1rem 0.5rem 1rem;">
                        <input type="text" class="search-input" placeholder="Buscar..." [ngModel]="filterSAE()" (ngModelChange)="filterSAE.set($event)">
                        <div class="suggestions">
                          <span class="suggestion-label">Sugerencias</span>
                          @for (val of getTop3Frequent('productoSAE'); track val) {
                            <div class="suggestion-item" (click)="filterSAE.set(val); activeHeaderDropdown.set(null)">{{ val }}</div>
                          }
                        </div>
                      </div>
                    </div>
                  }
                </th>
              }
            </tr>
          </thead>
          <tbody>
            @if (loading()) { 
              <tr><td colspan="12" class="empty-state">Cargando productos...</td></tr> 
            }
            @else if (paginatedItems().length === 0) { 
              <tr><td colspan="12" class="empty-state">No se encontraron productos registrados</td></tr> 
            }
            @else {
              @for (item of paginatedItems(); track item.id) {
                <tr>
                  <td style="width: 70px; text-align: center;">
                    <a class="action-link text-green" (click)="openViewModal(item)">Visualizar</a>
                  </td>
                  <td style="width: 70px; text-align: center;">
                    <a class="action-link text-green" (click)="openEditModal(item)">Modificar</a>
                  </td>
                  <td style="width: 70px; text-align: center;">
                    <a class="action-link text-green" (click)="del(item)">Eliminar</a>
                  </td>
                  @if (isColVisible('categoria')) { 
                    <td>{{ item.categoria || '' }}</td> 
                  }
                  @if (isColVisible('productoBase')) { 
                    <td>{{ $any(item).productoBase || '' }}</td> 
                  }
                  @if (isColVisible('clave')) { 
                    <td>{{ item.clave }}</td> 
                  }
                  @if (isColVisible('nombre')) { 
                    <td>{{ item.nombre }}</td> 
                  }
                  @if (isColVisible('descripcion')) { 
                    <td>{{ item.descripcion || '' }}</td> 
                  }
                  @if (isColVisible('precioUnitario')) { 
                    <td>{{ item.precioUnitario ? ('$ ' + item.precioUnitario.toFixed(2)) : '$ 0.00' }}</td> 
                  }
                  @if (isColVisible('tipoMaterial')) { 
                    <td>{{ $any(item).tipoMaterial || '' }}</td> 
                  }
                  @if (isColVisible('activo')) {
                    <td style="width: 80px;">
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
                  @if (isColVisible('productoSAE')) {
                    <td>{{ item.productoSAE || '' }}</td>
                  }
                </tr>
              }
            }
          </tbody>
        </table>
      </div>

      <!-- Paginación Premium -->
      <!-- Scroll indicator legacy -->
      <div class="legacy-scroll-bar">
        <div class="scroll-track">
          <div class="scroll-thumb"></div>
        </div>
      </div>

      <!-- Footer Premium con estilo Legacy -->
      <div class="legacy-footer-container animate-move-up">
        <div class="footer-left">
          <span>Página {{ currentPage() }} de {{ totalPages() }}</span>
        </div>
        <div class="footer-right">
          @if (searchText()) {
            <span class="filtering-text">Filtrando por Clave</span>
          }
          <div class="pagination-container-legacy">
            <button class="pag-btn-legacy" [disabled]="currentPage() === 1" (click)="prevPage()">Ant</button>
            
            @for (p of getPages(currentPage(), totalPages()); track $index) {
              @if (p === '...') {
                <span class="pag-dots">...</span>
              } @else {
                <button 
                  class="pag-btn-legacy page-num" 
                  [class.active]="currentPage() === p" 
                  (click)="setPage($any(p))"
                >
                  {{ p }}
                </button>
              }
            }
            
            <button class="pag-btn-legacy" [disabled]="currentPage() === totalPages()" (click)="nextPage()">Sig</button>
          </div>
        </div>
      </div>

      <!-- Modal de Producto -->
      } @else {
        <!-- Formulario gestionar Producto (Legacy Screen) -->
        <div class="legacy-form-container animate-fade-in" style="background: white; border: 1px solid #cbd5e1; padding: 0.5rem; margin-bottom: 2rem;">
          
          <!-- Acordeón 1: Información General -->
          <div class="legacy-accordion" style="border: 1px solid #cbd5e1;">
            <div class="legacy-accordion-header" style="padding: 0.75rem 1rem; display: flex; align-items: center;">
              <span class="icon text-green" style="font-weight:bold; color: #10b981; margin-right: 0.5rem;">[+]</span> 
              <span style="font-weight: 600; color: #475569; font-size: 0.85rem;">Información General</span>
            </div>
            <div class="legacy-accordion-body" style="padding: 0 1rem;">
              
              <!-- Producto SAE -->
              <div class="legacy-field-row">
                <label class="legacy-field-label">Producto SAE</label>
                <div class="legacy-field-value">
                  @if (modalReadOnly()) {
                    {{ form.productoSAE || '(Ninguno)' }}
                  } @else {
                    <div class="sae-selector-wrapper" clickOutside (clickOutside)="showSaeDropdown.set(false)">
                      <div class="sae-select-bar" (click)="toggleSaeDropdown($event)" style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 0.4rem; font-size: 0.85rem; height: auto;">
                        <span>{{ form.productoSAE || '-- Seleccione Producto SAE --' }}</span>
                        <span class="sae-arrow">▼</span>
                      </div>
                      @if (showSaeDropdown()) {
                        <div class="sae-dropdown" style="border: 1px solid #cbd5e1; background: white; border-radius: 4px; max-height: 200px; overflow-y: auto;">
                          <div class="sae-dropdown-header" style="font-size: 0.72rem; color: #94a3b8; font-weight: 800; padding: 0.5rem 1rem; border-bottom: 1px solid #f1f5f9;">Códigos Aspel SAE</div>
                          @if (saeCodes().length === 0) {
                            <div class="sae-empty" style="padding: 1rem; color: #94a3b8; text-align: center; font-style: italic;">No hay códigos de SAE cargados. Sincronice primero.</div>
                          } @else {
                            @for (code of saeCodes(); track code.code) {
                              <div class="sae-item" (click)="selectSaeCode(code)" style="padding: 0.6rem 1rem; cursor: pointer; border-bottom: 1px solid #f8fafc; display: flex; flex-direction: column;">
                                <span class="sae-code" style="font-weight: 800; font-size: 0.8rem; color: #10b981;">{{ code.code }}</span>
                                <span class="sae-name" style="font-size: 0.85rem; color: #475569;">{{ code.name }}</span>
                              </div>
                            }
                          }
                        </div>
                      }
                    </div>
                  }
                </div>
              </div>

              <!-- Categoría -->
              <div class="legacy-field-row">
                <label class="legacy-field-label">Categoría</label>
                <div class="legacy-field-value">
                  @if (modalReadOnly()) {
                    {{ form.categoria || '(Ninguno)' }}
                  } @else {
                      <select class="field-input" [(ngModel)]="form.categoriaId" style="width: 100%; appearance: auto; border: 1px solid #e2e8f0; border-radius: 4px; padding: 0.4rem;">
                        <option [value]="undefined">(Ninguno)</option>
                        @for (cat of categories(); track cat.id) {
                          <option [value]="cat.id">{{ cat.nombre }}</option>
                        }
                      </select>
                  }
                </div>
              </div>

              <!-- Clave -->
              <div class="legacy-field-row">
                <label class="legacy-field-label">Clave</label>
                <div class="legacy-field-value">
                  @if (modalReadOnly()) {
                    {{ form.clave || '' }}
                  } @else {
                    <input class="field-input" type="text" [(ngModel)]="form.clave" style="width: 100%; border: 1px solid #e2e8f0; border-radius: 4px; padding: 0.4rem;" [disabled]="form.id !== undefined" />
                  }
                </div>
              </div>

              <!-- Nombre -->
              <div class="legacy-field-row">
                <label class="legacy-field-label">Nombre</label>
                <div class="legacy-field-value">
                  @if (modalReadOnly()) {
                    {{ form.nombre || '' }}
                  } @else {
                    <input class="field-input" type="text" [(ngModel)]="form.nombre" style="width: 100%; border: 1px solid #e2e8f0; border-radius: 4px; padding: 0.4rem;" />
                  }
                </div>
              </div>

              <!-- Descripción -->
              <div class="legacy-field-row">
                <label class="legacy-field-label">Descripción</label>
                <div class="legacy-field-value">
                  @if (modalReadOnly()) {
                    {{ form.descripcion || '' }}
                  } @else {
                    <textarea class="field-input" rows="2" [(ngModel)]="form.descripcion" style="width: 100%; border: 1px solid #e2e8f0; border-radius: 4px; padding: 0.4rem;"></textarea>
                  }
                </div>
              </div>

              <!-- Precio Unitario -->
              <div class="legacy-field-row">
                <label class="legacy-field-label">Precio Unitario</label>
                <div class="legacy-field-value">
                  @if (modalReadOnly()) {
                    <span style="padding: 0.4rem;">$ {{ (form.precioUnitario || 0).toFixed(2) }}</span>
                  } @else {
                    <div style="position: relative; display: flex; align-items: center;">
                      <span style="position: absolute; left: 0.5rem; color: #64748b; font-weight: bold;">$</span>
                      <input class="field-input no-spin" type="number" step="0.01" (wheel)="$event.preventDefault()" [(ngModel)]="form.precioUnitario" placeholder="0.00" style="width: 100%; border: 1px solid #e2e8f0; border-radius: 4px; padding: 0.4rem 0.4rem 0.4rem 1.5rem;" />
                    </div>
                  }
                </div>
              </div>

              <!-- Inventario Inicial -->
              <div class="legacy-field-row">
                <label class="legacy-field-label">Inventario Inicial</label>
                <div class="legacy-field-value">
                  @if (modalReadOnly()) {
                    {{ form.inventarioActual || 0 }}
                  } @else {
                    <input class="field-input" type="number" [(ngModel)]="form.inventarioActual" style="width: 100%; border: 1px solid #e2e8f0; border-radius: 4px; padding: 0.4rem;" />
                  }
                </div>
              </div>

              <!-- Clave Paleta -->
              <div class="legacy-field-row">
                <label class="legacy-field-label">Clave Paleta</label>
                <div class="legacy-field-value">
                  @if (modalReadOnly()) {
                    {{ form.claveExterna || '' }}
                  } @else {
                    <input class="field-input" type="text" [(ngModel)]="form.claveExterna" style="width: 100%; border: 1px solid #e2e8f0; border-radius: 4px; padding: 0.4rem;" />
                  }
                </div>
              </div>

              <!-- Tipo Material -->
              <div class="legacy-field-row">
                <label class="legacy-field-label">Tipo Material</label>
                <div class="legacy-field-value" style="display: flex; align-items: center; justify-content: space-between;">
                  @if (modalReadOnly()) {
                    <span>{{ form.tipoMaterial || '' }}</span>
                    <span style="color: #64748b; font-size: 1.2rem;">▼</span>
                  } @else {
                    <select class="field-input" [(ngModel)]="form.tipoMaterial" style="width: 100%; appearance: auto; border: 1px solid #e2e8f0; border-radius: 4px; padding: 0.4rem; color: #1e293b; background: white;">
                      <option value="">(Ninguno / No especificado)</option>
                      <option value="PCR 100%">PCR 100%</option>
                      <option value="Polietileno (LDPE)">Polietileno (LDPE)</option>
                      <option value="Polipropileno (PP)">Polipropileno (PP)</option>
                      <option value="Virgen">Virgen</option>
                      <option value="Molido / Reproceso">Molido / Reproceso</option>
                      @for (mat of materialTipos(); track mat.id) {
                        <option [value]="mat.nombre">{{ mat.nombre }}</option>
                      }
                    </select>
                  }
                </div>
              </div>

              <!-- Imagen -->
              <div class="legacy-field-row">
                <label class="legacy-field-label">Imagen</label>
                <div class="legacy-field-value" style="height: 2rem;"></div>
              </div>

              <!-- Activo -->
              <div class="legacy-field-row" style="border-bottom: none; padding-bottom: 1rem;">
                <label class="legacy-field-label">Activo</label>
                <div class="legacy-field-value" style="padding-top: 0.2rem;">
                  @if (modalReadOnly()) {
                    <input type="checkbox" [checked]="form.isActive" disabled />
                  } @else {
                    <input type="checkbox" [(ngModel)]="form.isActive" />
                  }
                </div>
              </div>

            </div>
          </div>

          <!-- Acordeón 2: Producto Base -->
          <div class="legacy-accordion" style="margin-top: 0.5rem; border: 1px solid #cbd5e1;">
            <div class="legacy-accordion-header" style="padding: 0.75rem 1rem; border-bottom: 1px solid #cbd5e1; display: flex; align-items: center;">
              @if (modalReadOnly()) {
                <span class="icon text-green" style="font-weight:bold; color: #10b981; margin-right: 0.5rem;">[+]</span> 
              } @else {
                <span class="icon text-white" style="background: #4caf50; border-radius: 2px; display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; margin-right: 0.5rem;">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.41l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.22-1.05-.59-1.41zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>
                </span>
              }
              <span style="font-weight: 600; color: #475569; font-size: 0.85rem;">Producto Base</span>
            </div>
            <div class="legacy-accordion-body" style="padding: 1rem; display: flex; gap: 2rem; min-height: 80px;">
              <div style="flex: 1; border-bottom: 1px solid #cbd5e1; padding-bottom: 0.2rem; display: flex; flex-direction: column; justify-content: flex-end; position: relative;">
                <label class="legacy-field-label" style="position: absolute; top: 0; left: 0;">Categoría del producto base</label>
                @if (modalReadOnly()) {
                  <div class="legacy-field-value" style="color: transparent;">---</div>
                } @else {
                  <select [(ngModel)]="form.categoriaProductoBase" style="width: 100%; border: none; outline: none; appearance: auto; background: transparent; font-size: 0.85rem; color: #1e293b; margin-top: 1.5rem;">
                    <option [value]="undefined"></option>
                    @for (cat of categories(); track cat.id) {
                      <option [value]="cat.id">{{ cat.nombre }}</option>
                    }
                  </select>
                }
              </div>
              <div style="flex: 1; border-bottom: 1px solid #cbd5e1; padding-bottom: 0.2rem; display: flex; align-items: flex-end;">
                <label class="legacy-field-label" style="margin-right: 1rem; flex-shrink: 0;">Producto Base</label>
                @if (modalReadOnly()) {
                  <div class="legacy-field-value" style="font-size: 0.8rem; color: #64748b; width: 100%;">Sin Producto Base</div>
                } @else {
                  <select [(ngModel)]="form.productoBase" style="width: 100%; border: none; outline: none; appearance: auto; background: transparent; font-size: 0.85rem; color: #1e293b;">
                    <option [value]="undefined">Sin Producto Base</option>
                    <option value="Base 1">Base 1</option>
                    <option value="Base 2">Base 2</option>
                  </select>
                }
              </div>
            </div>
          </div>

          <!-- Barra de Botones -->
          <div style="margin-top: 1rem; padding: 0.5rem 0; display: flex; gap: 0.5rem;">
            @if (!modalReadOnly()) {
              <button style="background: #4caf50; color: white; padding: 0.5rem 1.5rem; border-radius: 4px; font-weight: bold; font-size: 0.8rem; border: none; cursor: pointer;" (click)="save()">CONFIRMAR</button>
            }
            <button style="background: #9ca3af; color: white; padding: 0.5rem 1.5rem; border-radius: 4px; font-weight: bold; font-size: 0.8rem; border: none; cursor: pointer;" (click)="closeModal()">CANCELAR</button>
          </div>

          @if (modalReadOnly()) {
          <!-- Acordeón 3: Historial Auditoría -->
          <div class="legacy-accordion" style="margin-top: 0.5rem; border: 1px solid #cbd5e1;">
            <div class="legacy-accordion-header" style="padding: 0.75rem 1rem; display: flex; align-items: center;">
              <span class="icon text-green" style="font-weight:bold; color: #10b981; margin-right: 0.5rem;">[+]</span> 
              <span style="font-weight: 600; color: #475569; font-size: 0.85rem;">Historial Auditoría</span>
            </div>
            <div class="legacy-accordion-body" style="padding: 1rem; display: flex; gap: 1rem;">
              
              <div style="flex: 2; border: 1px solid #cbd5e1; min-height: 120px; background: white;">
                <div style="padding: 0.5rem; border-bottom: 1px solid #cbd5e1; display: flex; align-items: center;">
                  <span class="icon text-green" style="font-weight:bold; color: #10b981; margin-right: 0.5rem;">[+]</span> 
                  <span style="font-weight: 600; color: #475569; font-size: 0.8rem;">Change Log</span>
                </div>
                <div style="display: flex; justify-content: center; border-bottom: 1px solid #e2e8f0; padding: 0.25rem 0; gap: 2rem;">
                  <span style="font-size: 0.7rem; color: #64748b;">Date</span>
                  <span style="font-size: 0.7rem; color: #64748b;">User</span>
                </div>
                <div style="height: 60px;"></div>
                <div style="border-top: 1px solid #e2e8f0; padding: 0.25rem 0.5rem; display: flex; justify-content: flex-end; gap: 0.25rem;">
                  <button style="border: 1px solid #cbd5e1; background: white; font-size: 0.6rem; color: #94a3b8; padding: 0.1rem 0.4rem; cursor: pointer;">Ant</button>
                  <button style="border: 1px solid #cbd5e1; background: white; font-size: 0.6rem; color: #94a3b8; padding: 0.1rem 0.4rem; cursor: pointer;">Sig</button>
                </div>
              </div>

              <div style="flex: 1; border: 1px solid #cbd5e1; min-height: 120px; background: white;">
                <div style="padding: 0.5rem; border-bottom: 1px solid #cbd5e1; display: flex; align-items: center;">
                  <span class="icon text-green" style="font-weight:bold; color: #10b981; margin-right: 0.5rem;">[+]</span> 
                  <span style="font-weight: 600; color: #475569; font-size: 0.8rem;">Detail</span>
                </div>
              </div>

            </div>
          </div>
          }

        </div>
      }
      
      <!-- Modal Confirmar Eliminar -->
      @if (itemToDelete()) {
        <div class="modal-overlay" style="z-index: 2000;" (click)="itemToDelete.set(null)">
          <div class="modal-card" style="width: 400px; text-align: center; padding: 2rem;" (click)="$event.stopPropagation()">
            <h3 style="color: #dc2626; margin-top: 0; font-size: 1.25rem; font-weight: 700;">Confirmar Eliminación</h3>
            <p style="color: #475569; font-size: 0.95rem; line-height: 1.5; margin: 1rem 0;">
              ¿Está seguro de que desea eliminar el producto <br><strong>"{{ itemToDelete()?.nombre }}"</strong>?
            </p>
            <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem;">
              <button class="btn btn-secondary" style="padding: 0.5rem 1.5rem;" (click)="itemToDelete.set(null)">Cancelar</button>
              <button class="btn btn-primary" style="background: #dc2626; border-color: #dc2626; padding: 0.5rem 1.5rem;" (click)="confirmDelete()">Eliminar</button>
            </div>
          </div>
        </div>
      }
      <!-- Modal de Select Columns -->
      @if (showColumnModal()) {
        <div class="modal-overlay" (click)="closeColumnModal()">
          <div class="modal-card" (click)="$event.stopPropagation()" style="width: 400px;">
            <div class="modal-header">
              <h3>Select Columns</h3>
              <button class="modal-close" (click)="closeColumnModal()">✕</button>
            </div>
            
            <div class="modal-body">
              <div class="column-group">
                <h4 style="margin: 0 0 0.5rem 0; font-size: 0.9rem; color: #1e293b; font-weight: 800;">Fixed to the Left</h4>
                <div style="padding-left: 1rem; color: #94a3b8; font-size: 0.85rem; font-style: italic; margin-bottom: 1rem;">
                  (none)
                </div>
              </div>
              
              <div class="column-group">
                <h4 style="margin: 0 0 0.5rem 0; font-size: 0.9rem; color: #1e293b; font-weight: 800;">Not Fixed</h4>
                <div style="display: flex; flex-direction: column; gap: 0.5rem; padding-left: 1rem;">
                  <label class="checkbox-container" style="display: flex; align-items: center; gap: 0.6rem; font-weight: 600; color: #475569;">
                    <input type="checkbox" [checked]="isColVisible('categoria')" (change)="toggleCol('categoria')" />
                    <span class="checkmark"></span>
                    <span>Category</span>
                  </label>
                  <label class="checkbox-container" style="display: flex; align-items: center; gap: 0.6rem; font-weight: 600; color: #475569;">
                    <input type="checkbox" [checked]="isColVisible('productoBase')" (change)="toggleCol('productoBase')" />
                    <span class="checkmark"></span>
                    <span>Base Product</span>
                  </label>
                  <label class="checkbox-container" style="display: flex; align-items: center; gap: 0.6rem; font-weight: 600; color: #475569;">
                    <input type="checkbox" [checked]="isColVisible('clave')" (change)="toggleCol('clave')" />
                    <span class="checkmark"></span>
                    <span>Key</span>
                  </label>
                  <label class="checkbox-container" style="display: flex; align-items: center; gap: 0.6rem; font-weight: 600; color: #475569;">
                    <input type="checkbox" [checked]="isColVisible('nombre')" (change)="toggleCol('nombre')" />
                    <span class="checkmark"></span>
                    <span>Name</span>
                  </label>
                  <label class="checkbox-container" style="display: flex; align-items: center; gap: 0.6rem; font-weight: 600; color: #475569;">
                    <input type="checkbox" [checked]="isColVisible('descripcion')" (change)="toggleCol('descripcion')" />
                    <span class="checkmark"></span>
                    <span>Description</span>
                  </label>
                  <label class="checkbox-container" style="display: flex; align-items: center; gap: 0.6rem; font-weight: 600; color: #475569;">
                    <input type="checkbox" [checked]="isColVisible('precioUnitario')" (change)="toggleCol('precioUnitario')" />
                    <span class="checkmark"></span>
                    <span>Unit Price</span>
                  </label>
                  <label class="checkbox-container" style="display: flex; align-items: center; gap: 0.6rem; font-weight: 600; color: #475569;">
                    <input type="checkbox" [checked]="isColVisible('inventarioActual')" (change)="toggleCol('inventarioActual')" />
                    <span class="checkmark"></span>
                    <span>Current Inventory</span>
                  </label>
                  <label class="checkbox-container" style="display: flex; align-items: center; gap: 0.6rem; font-weight: 600; color: #475569;">
                    <input type="checkbox" [checked]="isColVisible('activo')" (change)="toggleCol('activo')" />
                    <span class="checkmark"></span>
                    <span>Activo</span>
                  </label>
                </div>
              </div>
            </div>

            <div class="modal-footer" style="justify-content: center;">
              <button class="btn btn-primary" style="width: 100%;" (click)="closeColumnModal()">Update</button>
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
    
    .btn-outline-green { background: white; color: #10b981; border: 1px solid #10b981; }
    .btn-outline-green:hover { background: rgba(16, 185, 129, 0.05); }
    .active-filter { background: rgba(16, 185, 129, 0.1) !important; color: #10b981 !important; border-color: rgba(16, 185, 129, 0.25) !important; }
    .search-box { position: relative; }
    .search-icon { position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: #94a3b8; font-size: 0.9rem; }
    .search-box .field-input { padding-left: 2.2rem; width: 240px; }
    
    /* Legacy Search */
    .legacy-search-container { display: flex; align-items: flex-end; gap: 0.5rem; margin-right: 1rem; }
    .legacy-filter-icon { color: #475569; display: flex; align-items: center; padding-bottom: 0.2rem; }
    .legacy-search-input { border: none; border-bottom: 1px solid #10b981; background: transparent; padding: 0.3rem 0; font-size: 0.85rem; width: 180px; outline: none; color: #334155; font-weight: 500; transition: border-color 0.2s; }
    .legacy-search-input:focus { border-bottom: 2px solid #059669; }

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

    /* Legacy Action Links */
    .action-link { font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: opacity 0.2s; }
    .action-link:hover { opacity: 0.7; text-decoration: underline; }
    .text-green { color: #10b981; }
    
    .legacy-header-icon { font-size: 0.6rem; color: #64748b; margin-left: 0.3rem; }
    
    /* Legacy Footer & Pagination */
    .legacy-scroll-bar { margin: 0 1rem; padding: 0.5rem 0; display: flex; align-items: center; }
    .scroll-track { height: 10px; background: #e2e8f0; border-radius: 10px; width: 100%; position: relative; display: flex; align-items: center; padding: 0 2px; }
    .scroll-thumb { height: 6px; width: 40%; background: #94a3b8; border-radius: 6px; position: absolute; left: 2px; }
    
    .legacy-footer-container { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; border-top: 1px solid #e2e8f0; }
    .footer-left { font-size: 0.85rem; color: #64748b; font-weight: 500; }
    .footer-right { display: flex; align-items: center; gap: 1.5rem; }
    .filtering-text { font-size: 0.8rem; color: #64748b; }
    
    .pagination-container-legacy { display: flex; align-items: center; gap: 0.3rem; }
    .pag-btn-legacy { padding: 0.3rem 0.6rem; border: 1px solid #e2e8f0; background: #f8fafc; border-radius: 4px; color: #475569; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
    .pag-btn-legacy:hover:not(:disabled) { border-color: #cbd5e1; background: #f1f5f9; }
    .pag-btn-legacy:disabled { opacity: 0.5; cursor: not-allowed; }
    .pag-btn-legacy.active { background: #10b981; color: white; border-color: #10b981; }

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
    
    /* Popover Filters */
    .search-input { width: 100%; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 0.8rem; margin-bottom: 0.5rem; box-sizing: border-box; }
    .search-input:focus { outline: none; border-color: #10b981; }
    .suggestions { margin-top: 0.5rem; }
    .suggestion-label { font-size: 0.65rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 0.4rem; display: block; }
    .suggestion-item { font-size: 0.8rem; padding: 0.4rem 0.6rem; border-radius: 6px; cursor: pointer; color: #64748b; }
    .suggestion-item:hover { background: #f1f5f9; color: #1e293b; }
    .range-group { display: grid; gap: 0.75rem; }
    .range-field label { font-size: 0.7rem; font-weight: 700; color: #64748b; margin-bottom: 0.25rem; display: block; }

    /* Legacy Form Screen */
    .legacy-form-container { background: #fff; display: flex; flex-direction: column; }
    .legacy-field-row { display: flex; flex-direction: column; padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; }
    .legacy-field-label { font-size: 0.7rem; color: #94a3b8; margin-bottom: 0.2rem; font-weight: 600; text-transform: capitalize; }
    .legacy-field-value { font-size: 0.85rem; color: #1e293b; min-height: 1.2rem; }
    .legacy-field-value input[type="text"], .legacy-field-value input[type="number"], .legacy-field-value select, .legacy-field-value textarea { border: 1px solid #cbd5e1; padding: 0.4rem; border-radius: 4px; font-size: 0.85rem; color: #1e293b; box-sizing: border-box; }
    .legacy-field-value input:focus, .legacy-field-value select:focus, .legacy-field-value textarea:focus { outline: none; border-color: #10b981; }
    
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
  private saeSvc = inject(SaeService);
  
  items = signal<Producto[]>([]);
  categories = signal<Categoria[]>([]);
  materialTipos = signal<{id: string, nombre: string}[]>([
    { id: '1', nombre: 'Polietileno (LDPE)' },
    { id: '2', nombre: 'PCR 100%' },
    { id: '3', nombre: 'Polipropileno (PP)' },
    { id: '4', nombre: 'Virgen' },
    { id: '5', nombre: 'Molido / Reproceso' }
  ]);
  loading = signal(true);
  showModal = signal(false);
  modalReadOnly = signal(false);
  showSaeDropdown = signal(false);
  showColumnModal = signal(false);
  showFilterDropdown = signal(false);
  savedFilters: any[] = [];

  form: Partial<Producto> & { 
    precioUnitarioFormat?: string; 
    inventarioActual?: number;
    claveExterna?: string;
    tipoMaterial?: string;
    imagenUrl?: string;
    categoriaProductoBase?: string;
    productoBase?: string;
  } = {};

  // SAE Codes
  saeCodes = signal<{ code: string; name: string }[]>([]);

  // Actions & Popover States
  searchText = signal<string>('');
  
  // Header Dropdowns and Filtering
  activeHeaderDropdown = signal<string | null>(null);
  sortState = signal<{col: string, dir: 'asc'|'desc'} | null>(null);
  itemToDelete = signal<Producto | null>(null);

  filterCategoria = signal<string>('');
  filterProductoBase = signal<string>('');
  filterClave = signal<string>('');
  filterNombre = signal<string>('');
  filterDescripcion = signal<string>('');
  filterTipoMaterial = signal<string>('');
  filterSAE = signal<string>('');
  filterPrecioMin = signal<number | null>(null);
  filterPrecioMax = signal<number | null>(null);
  activeFilterState = signal<'all' | 'active' | 'inactive'>('all'); // Re-used for Activo column
  
  showColumnSelector = signal<boolean>(false);
  showExportOptions = signal<boolean>(false);
  
  visibleColumns = signal<string[]>(['categoria', 'productoBase', 'clave', 'nombre', 'descripcion', 'precioUnitario', 'tipoMaterial', 'activo', 'productoSAE']);

  // Pagination Signals
  currentPage = signal<number>(1);
  pageSize = signal<number>(8);

  ngOnInit() {
    this.loadSavedFiltersFromStorage();
    this.load();
    this.loadCategories();
    this.loadSaeCodes();
  }

  loadSaeCodes() {
    this.saeSvc.getProductos().subscribe({
      next: (res) => {
        const codes = (res || []).map(p => ({ code: p.productNumber, name: p.productName }));
        this.saeCodes.set(codes);
      },
      error: (err) => console.error('Error loading SAE products:', err)
    });
  }

  loadCategories() {
    this.svc.getCategorias().subscribe(res => {
      // Auto-seed si no hay datos
      if (!res || res.length === 0) {
        this.svc.createCategoria({nombre: 'Bobina'}).subscribe(() => {
          this.svc.createCategoria({nombre: 'Reel'}).subscribe(() => {
            this.svc.getCategorias().subscribe(r => this.categories.set(r));
          });
        });
      } else {
        this.categories.set(res);
      }
    });
    this.svc.getMaterialTipos().subscribe(res => this.materialTipos.set(res || []));
  }

  load() {
    this.loading.set(true);
    this.svc.getProductos().subscribe({
      next: data => {
        this.items.set(data || []);
        this.loading.set(false);
      },
      error: (err) => {
        console.warn('API Error', err);
        this.items.set([]);
        this.loading.set(false);
      }
    });
  }

  getTop3Frequent(field: string): string[] {
    const counts = new Map<string, number>();
    this.items().forEach(item => {
      const val = (item as any)[field];
      if (val !== undefined && val !== null && val !== '') {
        const strVal = String(val);
        counts.set(strVal, (counts.get(strVal) || 0) + 1);
      }
    });
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(e => e[0]);
  }

  filteredItems = computed(() => {
    let list = this.items();

    const search = this.searchText().trim().toLowerCase();
    if (search) {
      list = list.filter(op => op.nombre.toLowerCase().includes(search) || op.clave.toLowerCase().includes(search));
    }

    const fCat = this.filterCategoria().trim().toLowerCase();
    if (fCat) list = list.filter(item => (item.categoria || '').toLowerCase().includes(fCat));

    const fBase = this.filterProductoBase().trim().toLowerCase();
    if (fBase) list = list.filter(item => (item as any).productoBase?.toLowerCase().includes(fBase));

    const fClave = this.filterClave().trim().toLowerCase();
    if (fClave) list = list.filter(item => (item.clave || '').toLowerCase().includes(fClave));

    const fNombre = this.filterNombre().trim().toLowerCase();
    if (fNombre) list = list.filter(item => (item.nombre || '').toLowerCase().includes(fNombre));

    const fDesc = this.filterDescripcion().trim().toLowerCase();
    if (fDesc) list = list.filter(item => (item.descripcion || '').toLowerCase().includes(fDesc));

    const fMat = this.filterTipoMaterial().trim().toLowerCase();
    if (fMat) list = list.filter(item => (item as any).tipoMaterial?.toLowerCase().includes(fMat));

    const fSAE = this.filterSAE().trim().toLowerCase();
    if (fSAE) list = list.filter(item => (item.productoSAE || '').toLowerCase().includes(fSAE));

    const pMin = this.filterPrecioMin();
    if (pMin !== null) list = list.filter(item => (item.precioUnitario || 0) >= pMin);

    const pMax = this.filterPrecioMax();
    if (pMax !== null) list = list.filter(item => (item.precioUnitario || 0) <= pMax);

    const filter = this.activeFilterState();
    if (filter === 'active') {
      list = list.filter(op => op.isActive);
    } else if (filter === 'inactive') {
      list = list.filter(op => !op.isActive);
    }

    const sort = this.sortState();
    if (sort) {
      list = [...list].sort((a: any, b: any) => {
        const valA = a[sort.col];
        const valB = b[sort.col];
        if (sort.col === 'isActive') {
           return sort.dir === 'asc' ? (valA === valB ? 0 : valA ? 1 : -1) : (valA === valB ? 0 : valA ? -1 : 1);
        }
        if (typeof valA === 'number' && typeof valB === 'number') {
          return sort.dir === 'asc' ? valA - valB : valB - valA;
        }
        const strA = String(valA || '').toLowerCase();
        const strB = String(valB || '').toLowerCase();
        return sort.dir === 'asc' ? strA.localeCompare(strB) : strB.localeCompare(strA);
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

  toggleFilterDropdown(event: Event) {
    event.stopPropagation();
    this.showFilterDropdown.update(v => !v);
    this.showExportOptions.set(false);
    this.activeHeaderDropdown.set(null);
  }

  clearFilters() {
    this.searchText.set('');
    this.activeFilterState.set('all');
    this.sortState.set(null);
    this.currentPage.set(1);
    this.showFilterDropdown.set(false);
  }

  loadSavedFiltersFromStorage() {
    const raw = localStorage.getItem('hicone_saved_filters_productos');
    this.savedFilters = raw ? JSON.parse(raw) : [];
  }

  saveFilterAs() {
    this.showFilterDropdown.set(false);
    const filterName = prompt('Ingrese el nombre para este filtro:', 'Filtro Productos ' + new Date().toLocaleDateString());
    if (!filterName) return;

    const newFilter = {
      id: 'F-' + Date.now(),
      name: filterName,
      state: {
        searchText: this.searchText()
      }
    };

    this.savedFilters.push(newFilter);
    localStorage.setItem('hicone_saved_filters_productos', JSON.stringify(this.savedFilters));
    alert('Filtro guardado con éxito.');
  }

  loadSavedFilter(f: any) {
    const s = f.state;
    this.searchText.set(s.searchText || '');
    this.currentPage.set(1);
    this.showFilterDropdown.set(false);
  }

  deleteSavedFilter(f: any, event: MouseEvent) {
    event.stopPropagation();
    this.savedFilters = this.savedFilters.filter(item => item.id !== f.id);
    localStorage.setItem('hicone_saved_filters_productos', JSON.stringify(this.savedFilters));
  }

  closeColumnModal() {
    this.showColumnModal.set(false);
  }

  toggleColumnDropdown(event: Event) {
    event.stopPropagation();
    this.showColumnSelector.update(v => !v);
    this.showExportOptions.set(false);
    this.activeHeaderDropdown.set(null);
  }

  toggleExportDropdown(event: Event) {
    event.stopPropagation();
    this.showExportOptions.update(v => !v);
    this.showColumnSelector.set(false);
    this.activeHeaderDropdown.set(null);
  }

  toggleHeaderDropdown(col: string, event: Event) {
    event.stopPropagation();
    if (this.activeHeaderDropdown() === col) {
      this.activeHeaderDropdown.set(null);
    } else {
      this.activeHeaderDropdown.set(col);
      this.showColumnSelector.set(false);
      this.showExportOptions.set(false);
    }
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

  sortBy(col: string, dir: 'asc' | 'desc') {
    this.sortState.set({ col, dir });
    this.activeHeaderDropdown.set(null);
  }

  pinColumn(col: string, dir: string) {
    alert(`Columna ${col} fijada a la ${dir} exitosamente.`);
    this.activeHeaderDropdown.set(null);
  }

  filterActiveState(state: 'all' | 'active' | 'inactive') {
    this.activeFilterState.set(state);
    this.activeHeaderDropdown.set(null);
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
    this.form = { ...item, precioUnitarioFormat: item.precioUnitario ? '$' + item.precioUnitario.toFixed(2) : '$0.00' };
    this.modalReadOnly.set(true);
    this.showModal.set(true);
    this.showSaeDropdown.set(false);
    this.showColumnSelector.set(false);
    this.showExportOptions.set(false);
    this.activeHeaderDropdown.set(null);
  }

  openEditModal(item: Producto) {
    this.form = { ...item, precioUnitarioFormat: item.precioUnitario ? '$' + item.precioUnitario.toFixed(2) : '$0.00' };
    this.modalReadOnly.set(false);
    this.showModal.set(true);
    this.showSaeDropdown.set(false);
    this.showColumnSelector.set(false);
    this.showExportOptions.set(false);
    this.activeHeaderDropdown.set(null);
  }

  openCreate() {
    this.form = { 
      clave: '',
      nombre: '', 
      isActive: true, 
      precioUnitario: 0,
      precioUnitarioFormat: '$0.00'
    };
    this.modalReadOnly.set(false);
    this.showModal.set(true);
    this.showSaeDropdown.set(false);
    this.showColumnSelector.set(false);
    this.showExportOptions.set(false);
    this.activeHeaderDropdown.set(null);
  }

  closeModal() {
    this.showModal.set(false);
    this.form = {};
  }

  formatPrice() {
    if (this.form.precioUnitarioFormat) {
      let numericVal = parseFloat(this.form.precioUnitarioFormat.replace(/[^0-9.-]+/g, ''));
      if (!isNaN(numericVal)) {
        this.form.precioUnitarioFormat = '$' + numericVal.toFixed(2);
        this.form.precioUnitario = numericVal;
      }
    }
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

    const payload: any = {
      clave: this.form.clave,
      nombre: this.form.nombre,
      descripcion: this.form.descripcion,
      categoriaId: this.form.categoriaId,
      isActive: this.form.isActive,
      productoSAE: this.form.productoSAE === 'Ninguno' ? undefined : this.form.productoSAE,
      precioUnitario: this.form.precioUnitario || 0,
      inventarioActual: this.form.inventarioActual,
      claveExterna: this.form.claveExterna,
      tipoMaterial: this.form.tipoMaterial,
      categoriaProductoBase: this.form.categoriaProductoBase,
      productoBase: this.form.productoBase
    };

    if (!this.form.id) {
      this.svc.createProducto(payload).subscribe({
        next: () => {
          this.closeModal();
          this.load();
        },
        error: (err) => {
          console.error('Error al crear producto:', err);
          alert('Error: ' + (err.error?.title || err.error?.message || err.message) + '\n\nAsegúrate de haber llenado todos los campos requeridos correctamente.');
        }
      });
    } else {
      this.svc.updateProducto(this.form.id, payload).subscribe({
        next: () => {
          this.closeModal();
          this.load();
        },
        error: (err) => {
          console.error('Error al actualizar producto:', err);
          alert('Error: ' + (err.error?.title || err.error?.message || err.message));
        }
      });
    }
  }

  del(item: Producto) {
    this.itemToDelete.set(item);
  }

  confirmDelete() {
    const item = this.itemToDelete();
    if (!item) return;

    this.svc.deleteProducto(item.id).subscribe({
      next: () => {
        this.itemToDelete.set(null);
        this.load();
        if (this.currentPage() > this.totalPages()) {
          this.currentPage.set(this.totalPages());
        }
      },
      error: () => {
        // Fallback for offline/mock data: remove from the current loaded items manually
        // Since load() injects the dummy data if API fails, deleting won't persist across loads unless we mutate the state locally and DON'T call load().
        const currentItems = this.items();
        this.items.set(currentItems.filter(p => p.id !== item.id));
        this.itemToDelete.set(null);
        if (this.currentPage() > this.totalPages()) {
          this.currentPage.set(this.totalPages());
        }
      }
    });
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
