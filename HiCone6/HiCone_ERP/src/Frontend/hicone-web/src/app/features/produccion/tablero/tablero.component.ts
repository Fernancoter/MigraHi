import { Component, OnInit, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduccionConfigService, ExtrusionProgramacion, ExtrusionOperacion } from '../../../core/services/produccion-config.service';

@Component({
  selector: 'app-tablero-produccion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up">
      <header class="module-header">
        <div class="title-area">
          <nav class="breadcrumb">Producción › Inicio</nav>
          <h1>Tablero de Producción</h1>
        </div>
      </header>

      <!-- TABS -->
      <div class="tab-bar">
        <button class="tab-btn" [class.active]="activeTab() === 'extrusion'" (click)="setTab('extrusion')">
          <span class="tab-icon">⚙️</span> Extrusión
        </button>
        <button class="tab-btn" [class.active]="activeTab() === 'prensado'" (click)="setTab('prensado')">
          <span class="tab-icon">🔨</span> Prensado
        </button>
      </div>

      <!-- TAB EXTRUSIÓN -->
      @if (activeTab() === 'extrusion') {
        <div class="tab-content animate-move-up">
          
          <!-- TABLA 1: PROGRAMACIÓN -->
          <div class="section-card mb-6">
            <div class="section-header">
              <div class="header-title">
                <span class="dot-indicator blue"></span>
                <h3>Programación</h3>
              </div>
            </div>
            
            <div class="table-wrapper">
              <table class="premium-table">
                <thead>
                  <tr>
                    <th (click)="toggleSort('prog', 'fecha')">
                      Fecha Extrusora <span class="sort-icon">{{ sortDirProg() === 'asc' ? '↑' : '↓' }}</span>
                    </th>
                    <th (click)="toggleFilter('prog-turno', $event)">
                      <span class="th-inner">Turno <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                      @if (activeFilter() === 'prog-turno') {
                        <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                          <div class="filter-group">
                            <button class="sort-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 16 4 4 4-4M7 20V4M11 8l4-4 4 4M15 4v16"/></svg> A a Z</button>
                            <button class="sort-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 8 4-4 4 4M7 4v16M11 16l4 4 4-4M15 20V4"/></svg> Z a A</button>
                            <input type="text" class="search-input" placeholder="Buscar..." [value]="filterSearch()" (input)="filterSearch.set($any($event.target).value)">
                            <div class="suggestions">
                              <span class="suggestion-label">Sugerencias</span>
                              <div class="suggestion-item">Mañana</div>
                              <div class="suggestion-item">Tarde</div>
                              <div class="suggestion-item">Noche</div>
                            </div>
                          </div>
                        </div>
                      }
                    </th>
                    <th (click)="toggleFilter('prog-producto', $event)">
                      <span class="th-inner">Producto <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                      @if (activeFilter() === 'prog-producto') {
                        <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                          <div class="filter-group">
                            <button class="sort-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 16 4 4 4-4M7 20V4M11 8l4-4 4 4M15 4v16"/></svg> A a Z</button>
                            <button class="sort-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 8 4-4 4 4M7 4v16M11 16l4 4 4-4M15 20V4"/></svg> Z a A</button>
                            <input type="text" class="search-input" placeholder="Buscar..." [value]="filterSearch()" (input)="filterSearch.set($any($event.target).value)">
                          </div>
                        </div>
                      }
                    </th>
                    <th (click)="toggleFilter('prog-operador', $event)">
                      <span class="th-inner">Operador <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                      @if (activeFilter() === 'prog-operador') {
                        <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                          <div class="filter-group">
                            <button class="sort-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 16 4 4 4-4M7 20V4M11 8l4-4 4 4M15 4v16"/></svg> A a Z</button>
                            <button class="sort-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 8 4-4 4 4M7 4v16M11 16l4 4 4-4M15 20V4"/></svg> Z a A</button>
                            <input type="text" class="search-input" placeholder="Buscar..." [value]="filterSearch()" (input)="filterSearch.set($any($event.target).value)">
                          </div>
                        </div>
                      }
                    </th>
                    <th (click)="toggleFilter('prog-programado', $event)">
                      <span class="th-inner">Programado <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                      @if (activeFilter() === 'prog-programado') {
                        <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                          <div class="range-group">
                            <div class="range-field"><label>Desde</label><input type="number" class="search-input" [value]="filterDesde()" (input)="filterDesde.set($any($event.target).value)"></div>
                            <div class="range-field"><label>Hasta</label><input type="number" class="search-input" [value]="filterHasta()" (input)="filterHasta.set($any($event.target).value)"></div>
                            <button class="btn-search-filter">Buscar</button>
                          </div>
                        </div>
                      }
                    </th>
                  </tr>
                </thead>
                <tbody>
                  @if (loading()) {
                    <tr><td colspan="5" class="loading-cell">Cargando programación...</td></tr>
                  } @else if (programacionExt().length === 0) {
                    <tr><td colspan="5" class="empty-cell">No hay órdenes programadas.</td></tr>
                  } @else {
                    @for (item of programacionExt(); track item.id) {
                      <tr>
                        <td>{{ item.fechaExtrusora | date:'dd/MM/yyyy' }}</td>
                        <td><span class="turno-badge">{{ item.turno }}</span></td>
                        <td><strong>{{ item.producto }}</strong></td>
                        <td>{{ item.operador }}</td>
                        <td class="font-bold">{{ item.programado | number }}</td>
                      </tr>
                    }
                  }
                </tbody>
              </table>
            </div>
          </div>

          <!-- TABLA 2: OPERACIÓN -->
          <div class="section-card">
            <div class="section-header">
              <div class="header-title">
                <span class="dot-indicator green"></span>
                <h3>Operación</h3>
              </div>
              <span class="badge-live pulse">En Vivo</span>
            </div>
            
            <div class="table-wrapper">
              <table class="premium-table">
                <thead>
                  <tr>
                    <th class="header-empty"></th> <!-- Estado -->
                    <th class="header-empty"></th> <!-- Editar -->
                    <th class="header-empty"></th>
                    <th class="header-empty"></th>
                    <th class="header-empty"></th>
                    <th (click)="toggleFilter('oper-extrusora', $event)">
                      Extrusora <span class="sort-icon">{{ sortDirOper() === 'asc' ? '↑' : '↓' }}</span>
                      @if (activeFilter() === 'oper-extrusora') {
                        <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                          <div class="filter-group">
                            <button class="sort-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 16 4 4 4-4M7 20V4M11 8l4-4 4 4M15 4v16"/></svg> A a Z</button>
                            <button class="sort-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 8 4-4 4 4M7 4v16M11 16l4 4 4-4M15 20V4"/></svg> Z a A</button>
                            <input type="text" class="search-input" placeholder="Buscar..." [value]="filterSearch()" (input)="filterSearch.set($any($event.target).value)">
                          </div>
                        </div>
                      }
                    </th>
                    <th (click)="toggleFilter('oper-turno', $event)">
                      <span class="th-inner">Turno <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                      @if (activeFilter() === 'oper-turno') {
                        <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                          <div class="filter-group">
                            <button class="sort-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 16 4 4 4-4M7 20V4M11 8l4-4 4 4M15 4v16"/></svg> A a Z</button>
                            <button class="sort-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 8 4-4 4 4M7 4v16M11 16l4 4 4-4M15 20V4"/></svg> Z a A</button>
                            <input type="text" class="search-input" placeholder="Buscar..." [value]="filterSearch()" (input)="filterSearch.set($any($event.target).value)">
                          </div>
                        </div>
                      }
                    </th>
                    <th (click)="toggleFilter('oper-producto', $event)">
                      <span class="th-inner">Producto <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                      @if (activeFilter() === 'oper-producto') {
                        <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                          <div class="filter-group">
                            <button class="sort-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 16 4 4 4-4M7 20V4M11 8l4-4 4 4M15 4v16"/></svg> A a Z</button>
                            <button class="sort-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 8 4-4 4 4M7 4v16M11 16l4 4 4-4M15 20V4"/></svg> Z a A</button>
                            <input type="text" class="search-input" placeholder="Buscar..." [value]="filterSearch()" (input)="filterSearch.set($any($event.target).value)">
                          </div>
                        </div>
                      }
                    </th>
                    <th (click)="toggleFilter('oper-operador', $event)">
                      <span class="th-inner">Operador <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                      @if (activeFilter() === 'oper-operador') {
                        <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                          <div class="filter-group">
                            <button class="sort-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 16 4 4 4-4M7 20V4M11 8l4-4 4 4M15 4v16"/></svg> A a Z</button>
                            <button class="sort-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 8 4-4 4 4M7 4v16M11 16l4 4 4-4M15 20V4"/></svg> Z a A</button>
                            <input type="text" class="search-input" placeholder="Buscar..." [value]="filterSearch()" (input)="filterSearch.set($any($event.target).value)">
                          </div>
                        </div>
                      }
                    </th>
                    <th class="text-right" (click)="toggleFilter('oper-producido', $event)">
                      <span class="th-inner">Producido <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                      @if (activeFilter() === 'oper-producido') {
                        <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                          <div class="range-group">
                            <div class="range-field"><label>Desde</label><input type="number" class="search-input" [value]="filterDesde()" (input)="filterDesde.set($any($event.target).value)"></div>
                            <div class="range-field"><label>Hasta</label><input type="number" class="search-input" [value]="filterHasta()" (input)="filterHasta.set($any($event.target).value)"></div>
                            <button class="btn-search-filter">Buscar</button>
                          </div>
                        </div>
                      }
                    </th>
                    <th class="text-right" (click)="toggleFilter('oper-interrupcion', $event)">
                      <span class="th-inner">Tiempo Interrupción (min) <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                      @if (activeFilter() === 'oper-interrupcion') {
                        <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                          <div class="range-group">
                            <div class="range-field"><label>Desde</label><input type="number" class="search-input" [value]="filterDesde()" (input)="filterDesde.set($any($event.target).value)"></div>
                            <div class="range-field"><label>Hasta</label><input type="number" class="search-input" [value]="filterHasta()" (input)="filterHasta.set($any($event.target).value)"></div>
                            <button class="btn-search-filter">Buscar</button>
                          </div>
                        </div>
                      }
                    </th>
                    <th (click)="toggleFilter('oper-encurso', $event)">
                      <span class="th-inner">En Curso <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                      @if (activeFilter() === 'oper-encurso') {
                        <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                          <div class="filter-group">
                            <label class="boolean-option"><input type="radio" name="encurso"> Marcado</label>
                            <label class="boolean-option"><input type="radio" name="encurso"> Desmarcado</label>
                          </div>
                        </div>
                      }
                    </th>
                    <th (click)="toggleFilter('oper-extid', $event)">
                      <span class="th-inner">Extrusión ID <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                      @if (activeFilter() === 'oper-extid') {
                        <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                          <div class="filter-group">
                            <button class="sort-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 16 4 4 4-4M7 20V4M11 8l4-4 4 4M15 4v16"/></svg> A a Z</button>
                            <button class="sort-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 8 4-4 4 4M7 4v16M11 16l4 4 4-4M15 20V4"/></svg> Z a A</button>
                            <div class="range-group" style="margin-top: 0.5rem; border-top: 1px solid #f1f5f9; padding-top: 0.5rem;">
                              <div class="range-field"><label>Desde</label><input type="number" class="search-input"></div>
                              <div class="range-field"><label>Hasta</label><input type="number" class="search-input"></div>
                              <button class="btn-search-filter">Buscar</button>
                            </div>
                          </div>
                        </div>
                      }
                    </th>
                  </tr>
                </thead>
                <tbody>
                  @if (loading()) {
                    <tr><td colspan="13" class="loading-cell">Cargando operación...</td></tr>
                  } @else if (operacionExt().length === 0) {
                    <tr><td colspan="13" class="empty-cell">Sin registros en curso.</td></tr>
                  } @else {
                    @for (item of operacionExt(); track item.id) {
                      <tr [class.row-active]="item.enCurso">
                        <td>
                          <span class="status-indicator" [attr.data-status]="item.status">
                            {{ item.status }}
                          </span>
                        </td>
                        <td class="actions-cell">
                          <div class="actions-flex">
                            <button class="btn-icon-edit" title="Editar" (click)="openEditModal(item.id)">
                              <span class="icon">✎</span>
                            </button>
                            <button class="btn-icon-delete" title="Eliminar fila completa" (click)="deleteExtrusion(item.id)">
                              <span class="icon">×</span>
                            </button>
                            <div class="warning-dropdown-container">
                              <button class="btn-icon-warn" title="Menú de acciones" (click)="toggleMainRowDropdown(item.id, $event)">
                                <span class="icon">!</span>
                              </button>
                              @if (activeMainRowDropdownId() === item.id) {
                                <div class="warning-dropdown main-row-dropdown animate-fade-in" (click)="$event.stopPropagation()">
                                  <div class="wd-item has-submenu">
                                    Exportar <span class="arrow">▶</span>
                                    <div class="wd-submenu">
                                      <div class="wd-item">CSV</div>
                                      <div class="wd-item">PDF</div>
                                    </div>
                                  </div>
                                  <div class="wd-item" (click)="openSelectColumns(item.id)">Seleccionar columnas</div>
                                  <div class="wd-item" (click)="openAddManually(item.id)">Agregar manual</div>
                                </div>
                              }
                            </div>
                          </div>
                        </td>
                        <td><strong>{{ item.extrusora }}</strong></td>
                        <td>{{ item.turno }}</td>
                        <td>{{ item.producto }}</td>
                        <td>{{ item.operador }}</td>
                        <td class="text-right font-bold">{{ item.producido | number }}</td>
                        <td class="text-right">{{ item.tiempoInterrupcion }}</td>
                        <td class="text-center">
                          <div class="toggle-status" [class.on]="item.enCurso"></div>
                        </td>
                        <td><code class="id-tag">{{ item.extrusionId }}</code></td>
                      </tr>
                    }
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      }

      <!-- MODAL DE EDICIÓN -->
      @if (showModal()) {
        <div class="modal-backdrop animate-fade-in" (click)="closeModal()">
          <div class="modal-container animate-slide-up" (click)="$event.stopPropagation()">
            <header class="modal-header">
              <h2>Información general</h2>
              <button class="btn-close" (click)="closeModal()">×</button>
            </header>
            
            <div class="modal-body">
              <div class="info-grid">
                <div class="info-col">
                  <label>Extrusora</label>
                  <p>{{ selectedExtrusion()?.extrusora || '---' }}</p>
                </div>
                <div class="info-col">
                  <label>Turno</label>
                  <p>{{ selectedExtrusion()?.turno || '---' }}</p>
                </div>
                <div class="info-col">
                  <label>Producto</label>
                  <p>{{ selectedExtrusion()?.producto || '---' }}</p>
                </div>
              </div>

              <div class="sub-section">
                <h4>Operador</h4>
                <select class="op-selector" [value]="selectedExtrusion()?.operadorId || ''" (change)="updateOperador($event)">
                  <option value="">Sin asignar</option>
                  @for (op of operariosDisponibles(); track op.id) {
                    <option [value]="op.id">{{ op.nombre }}</option>
                  }
                </select>
              </div>

              <!-- BLOQUE DE INFORMACIÓN (BOBINAS) -->
              <div class="sub-section">
                <div class="flex-between align-center mb-4">
                  <h4>Información de Bobinas</h4>
                </div>

                <!-- SIEMPRE SE MUESTRA LA ESTRUCTURA, aunque no haya bobinas -->
                <div class="bobbins-list">
                  @if (selectedExtrusion()?.bobinas?.length > 0) {
                    @for (b of selectedExtrusion()?.bobinas; track b.id) {
                      <div class="bobbin-card">
                        <!-- Bloque 1 -->
                        <div class="bc-block">
                          <div class="bc-item"><label>Fecha</label><span>{{ selectedExtrusion()?.fecha | date:'dd/MM/yy HH:mm' }}</span></div>
                          <div class="bc-item"><label>Calibre</label><span>{{ selectedExtrusion()?.calibre || '0.00' }}</span></div>
                          <div class="bc-item"><label>Ancho</label><span>{{ selectedExtrusion()?.ancho || '000/000' }}</span></div>
                          <div class="bc-item"><label>Longitud</label><span>{{ selectedExtrusion()?.longitud || '0' }}</span></div>
                        </div>
                        
                        <!-- Bloque 2 -->
                        <div class="bc-block">
                          <div class="bc-item"><label>Virgen kg</label><span>{{ selectedExtrusion()?.kgVirgen || '0.00' }}</span></div>
                          <div class="bc-item"><label>Meta</label><span>{{ selectedExtrusion()?.target || '0.00' }}</span></div>
                          <div class="bc-item"><label>Molido kg</label><span>{{ selectedExtrusion()?.kgMolido || '0.00' }}</span></div>
                          <div class="bc-item" style="position: relative;">
                            <label>Estado</label>
                            <select class="status-selector" [value]="selectedExtrusion()?.status">
                              <option value="Programada">Programada</option>
                              <option value="EnProceso">En Proceso</option>
                              <option value="Intermedia">Intermedia</option>
                              <option value="Terminada">Terminada</option>
                              <option value="PorProgramar">Por Programar</option>
                            </select>
                          </div>
                        </div>

                        <!-- Bloque 3 -->
                        <div class="bc-block relative-block">
                          <div class="bc-item"><label>Inicio de proceso</label><span>{{ selectedExtrusion()?.processStart ? (selectedExtrusion()?.processStart | date:'dd/MM/yy HH:mm') : '---' }}</span></div>
                          <div class="bc-item"><label>Fin de proceso</label><span>{{ selectedExtrusion()?.processEnd ? (selectedExtrusion()?.processEnd | date:'dd/MM/yy HH:mm') : '---' }}</span></div>
                          <div class="bc-item"><label>Pares de bobinas</label><span>{{ b.bobbinNo || '---' }}</span></div>
                        </div>
                      </div>
                    }
                  } @else {
                    <!-- ESTRUCTURA VACÍA VISIBLE -->
                    <div class="bobbin-card empty-card">
                        <div class="bc-block">
                          <div class="bc-item"><label>Fecha</label><span>---</span></div>
                          <div class="bc-item"><label>Calibre</label><span>---</span></div>
                          <div class="bc-item"><label>Ancho</label><span>---</span></div>
                          <div class="bc-item"><label>Longitud</label><span>---</span></div>
                        </div>
                        <div class="bc-block">
                          <div class="bc-item"><label>Virgen kg</label><span>---</span></div>
                          <div class="bc-item"><label>Meta</label><span>---</span></div>
                          <div class="bc-item"><label>Molido kg</label><span>---</span></div>
                          <div class="bc-item"><label>Estado</label><span>---</span></div>
                        </div>
                        <div class="bc-block">
                          <div class="bc-item"><label>Inicio de proceso</label><span>---</span></div>
                          <div class="bc-item"><label>Fin de proceso</label><span>---</span></div>
                          <div class="bc-item"><label>Pares de bobinas</label><span>---</span></div>
                        </div>
                    </div>
                  }
                </div>
              </div>

            </div>
          </div>
        </div>
      }

      <!-- MODAL AGREGAR MANUAL -->
      @if (showAddManualModal()) {
        <div class="modal-backdrop animate-fade-in" style="z-index: 1050;" (click)="closeAddManual()">
          <div class="modal-container animate-slide-up" style="max-width: 500px;" (click)="$event.stopPropagation()">
            <header class="modal-header">
              <h2>Agregar manual</h2>
              <button class="btn-close" (click)="closeAddManual()">×</button>
            </header>
            <div class="modal-body">
              <div class="manual-add-content">
                <h3>Agregar bobina</h3>
                <p class="text-muted" style="margin-top: 0.25rem;">Agregar bobina manualmente a extrusión</p>
                <div class="alert-info mt-4">
                  Las bobinas se agregan en pares una para la estación A y otra para la estación B
                </div>
                
                <div class="form-group mt-4">
                  <label>Pares de bobinas</label>
                  <input type="number" [(ngModel)]="addManualData.paresBobinas" class="form-input" placeholder="0">
                </div>
              </div>
              <div class="modal-footer">
                <button class="btn-cancel" (click)="closeAddManual()">Cancelar</button>
                <button class="btn-confirm" (click)="confirmAddManual()">Confirmar</button>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- MODAL SELECCIONAR COLUMNAS -->
      @if (showSelectColumnsModal()) {
        <div class="modal-backdrop animate-fade-in" style="z-index: 1050;" (click)="closeSelectColumns()">
          <div class="modal-container animate-slide-up" style="max-width: 400px;" (click)="$event.stopPropagation()">
            <header class="modal-header">
              <h2>Seleccionar columnas</h2>
              <button class="btn-close" (click)="closeSelectColumns()">×</button>
            </header>
            <div class="modal-body">
              <div class="columns-list">
                @for (col of availableColumns; track col) {
                  <label class="checkbox-row">
                    <input type="checkbox" checked> {{ col }}
                  </label>
                }
              </div>
              <div class="pin-section mt-4">
                <label style="display: block; font-weight: 700; margin-bottom: 0.5rem; color: #475569;">Fijas a la derecha</label>
                <select class="form-select">
                  <option>Ninguna</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- TAB PRENSADO (Placeholder) -->
      @if (activeTab() === 'prensado') {
        <div class="tab-content animate-move-up">
          <div class="empty-state">Módulo de Prensado en desarrollo.</div>
        </div>
      }
    </div>
  `,
  styles: [`
    .module-page { padding: 1.5rem 2.5rem; background: #f1f5f9; min-height: 100vh; }
    .breadcrumb { font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase; margin-bottom: 0.5rem; letter-spacing: 0.05em; }
    h1 { font-size: 2rem; font-weight: 800; color: #0f172a; margin: 0 0 2rem 0; letter-spacing: -0.02em; }

    .tab-bar { display: flex; gap: 0.5rem; border-bottom: 1px solid #cbd5e1; margin-bottom: 2rem; }
    .tab-btn { padding: 1rem 2rem; background: transparent; border: none; border-bottom: 4px solid transparent; margin-bottom: -1px; cursor: pointer; font-size: 1rem; font-weight: 700; color: #64748b; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); display: flex; align-items: center; gap: 0.75rem; }
    .tab-btn:hover { color: #10b981; background: #f8fafc; }
    .tab-btn.active { color: #10b981; border-bottom-color: #10b981; background: white; border-radius: 8px 8px 0 0; }

    .section-card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05); overflow: hidden; }
    .mb-6 { margin-bottom: 2rem; }
    
    .section-header { padding: 1.25rem 1.5rem; background: white; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; }
    .header-title { display: flex; align-items: center; gap: 0.75rem; }
    .header-title h3 { margin: 0; font-size: 1.1rem; font-weight: 800; color: #1e293b; }
    
    .dot-indicator { width: 10px; height: 10px; border-radius: 50%; }
    .dot-indicator.blue { background: #3b82f6; box-shadow: 0 0 8px #3b82f6; }
    .dot-indicator.green { background: #10b981; box-shadow: 0 0 8px #10b981; }

    .badge-live { padding: 0.4rem 0.8rem; background: #dcfce7; color: #15803d; border-radius: 20px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.025em; border: 1px solid #bbf7d0; }
    .pulse { animation: pulseAnim 2s infinite; }
    @keyframes pulseAnim { 0% { opacity: 1; } 50% { opacity: 0.6; } 100% { opacity: 1; } }

    .table-wrapper { overflow-x: auto; }
    .premium-table { width: 100%; border-collapse: collapse; min-width: 1000px; }
    .premium-table th { text-align: left; padding: 1rem 1.5rem; background: #f8fafc; color: #475569; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #e2e8f0; cursor: pointer; user-select: none; vertical-align: top; }
    .premium-table th:hover { background: #f1f5f9; }
    .premium-table td { padding: 1.1rem 1.5rem; border-bottom: 1px solid #f1f5f9; font-size: 0.9rem; color: #334155; }
    .premium-table tr:hover td { background: #f8fafc; }
    .row-active td { background: #f0fdf4 !important; }

    .sort-icon { font-size: 0.8rem; margin-left: 0.4rem; color: #94a3b8; }
    .th-inner { display: inline-flex; align-items: flex-start; gap: 0.35rem; }
    .chevron-icon { width: 10px; height: 6px; flex-shrink: 0; margin-top: 0.15em; color: #94a3b8; }
    .header-empty { width: 40px; pointer-events: none; }
    .td-empty { background: transparent !important; border: none !important; }

    .turno-badge { padding: 0.25rem 0.6rem; background: #f1f5f9; border-radius: 6px; color: #475569; font-size: 0.8rem; font-weight: 700; border: 1px solid #e2e8f0; }
    
    .status-indicator { padding: 0.35rem 0.75rem; border-radius: 8px; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.01em; display: inline-block; }
    .status-indicator[data-status="Programada"] { background: #dbeafe; color: #1e40af; }
    .status-indicator[data-status="EnProceso"] { background: #dcfce7; color: #166534; }
    .status-indicator[data-status="Intermedia"] { background: #fef3c7; color: #92400e; }
    .status-indicator[data-status="Terminada"] { background: #f1f5f9; color: #475569; }
    .status-indicator[data-status="PorProgramar"] { background: #fee2e2; color: #991b1b; }

    .btn-icon-edit, .btn-icon-delete, .btn-icon-warn { width: 32px; height: 32px; border-radius: 8px; border: 1px solid #e2e8f0; background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; font-size: 1rem; }
    .btn-icon-edit { color: #3b82f6; }
    .btn-icon-edit:hover { background: #3b82f6; color: white; border-color: #3b82f6; transform: scale(1.1); box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); }
    
    .btn-icon-delete { color: #ef4444; }
    .btn-icon-delete:hover { background: #ef4444; color: white; border-color: #ef4444; transform: scale(1.1); box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3); }
    
    .btn-icon-warn { color: #d97706; }
    .btn-icon-warn:hover { background: #f59e0b; color: white; border-color: #f59e0b; transform: scale(1.1); box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3); }

    .actions-cell { width: 140px; }
    .actions-flex { display: flex; gap: 0.5rem; align-items: center; }

    .toggle-status { width: 14px; height: 14px; border-radius: 50%; background: #cbd5e1; margin: 0 auto; transition: all 0.3s; }
    .toggle-status.on { background: #10b981; box-shadow: 0 0 8px #10b981; }

    .id-tag { background: #f8fafc; padding: 0.3rem 0.6rem; border-radius: 6px; color: #64748b; font-size: 0.8rem; font-family: 'JetBrains Mono', 'Fira Code', monospace; border: 1px solid #e2e8f0; }
    .text-right { text-align: right; }
    .text-center { text-align: center; }
    .font-bold { font-weight: 800; }
    .loading-cell, .empty-cell { text-align: center; padding: 4rem; color: #94a3b8; font-style: italic; }

    /* MODAL */
    .modal-backdrop { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .modal-container { background: white; border-radius: 24px; width: 90%; max-width: 600px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); overflow: hidden; }
    .modal-header { padding: 1.5rem 2rem; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; background: #f8fafc; }
    .modal-header h2 { margin: 0; font-size: 1.5rem; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; }
    .btn-close { background: transparent; border: none; font-size: 1.8rem; color: #64748b; cursor: pointer; line-height: 1; }
    .btn-close:hover { color: #0f172a; }

    .modal-body { padding: 2.5rem; }
    .info-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-bottom: 3rem; }
    .info-col label { display: block; font-size: 0.75rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
    .info-col p { font-size: 1.1rem; font-weight: 700; color: #1e293b; margin: 0; }

    .sub-section { border-top: 1px solid #f1f5f9; padding-top: 2rem; }
    .sub-section h4 { margin: 0 0 1rem 0; font-size: 0.9rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
    .operador-name { font-size: 1.25rem; font-weight: 800; color: #10b981; margin: 0; }

    .animate-move-up { animation: moveUp 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
    @keyframes moveUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .animate-fade-in { animation: fadeIn 0.3s ease; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .animate-slide-up { animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
    @keyframes slideUp { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

    /* FILTROS POP OVER */
    .filter-popover { position: absolute; background: white; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); padding: 1rem; width: 220px; z-index: 100; margin-top: 0.5rem; text-transform: none; }
    .filter-group { display: flex; flex-direction: column; gap: 0.5rem; }
    .sort-btn { display: flex; align-items: center; gap: 0.75rem; padding: 0.6rem; border-radius: 8px; border: 1px solid #f1f5f9; background: white; font-size: 0.8rem; font-weight: 700; color: #475569; cursor: pointer; transition: all 0.2s; width: 100%; text-align: left; }
    .sort-btn:hover { background: #f8fafc; color: #10b981; border-color: #10b981; }
    .search-input { width: 100%; padding: 0.6rem; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 0.85rem; outline: none; }
    .search-input:focus { border-color: #10b981; box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.1); }
    .suggestions { margin-top: 0.5rem; }
    .suggestion-label { font-size: 0.65rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 0.4rem; display: block; }
    .suggestion-item { font-size: 0.8rem; padding: 0.4rem 0.6rem; border-radius: 6px; cursor: pointer; color: #64748b; }
    .suggestion-item:hover { background: #f1f5f9; color: #1e293b; }
    .range-group { display: grid; gap: 0.75rem; }
    .range-field label { font-size: 0.7rem; font-weight: 700; color: #64748b; margin-bottom: 0.25rem; display: block; }
    .btn-search-filter { background: #10b981; color: white; border: none; padding: 0.6rem; border-radius: 8px; font-weight: 800; font-size: 0.8rem; cursor: pointer; width: 100%; }
    .boolean-option { display: flex; align-items: center; gap: 0.75rem; padding: 0.6rem; cursor: pointer; border-radius: 8px; font-size: 0.85rem; color: #475569; }
    .boolean-option:hover { background: #f8fafc; }

    /* SELECTOR EN MODAL */
    .op-selector { width: 100%; padding: 0.75rem; border-radius: 10px; border: 2px solid #f1f5f9; background: #f8fafc; color: #0f172a; font-size: 1rem; font-weight: 700; outline: none; cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 1rem center; background-size: 1.25rem; }
    .op-selector:focus { border-color: #10b981; background-color: white; }

    /* NUEVO BLOQUE BOBINAS (NO TABLA) */
    .flex-between { display: flex; justify-content: space-between; }
    .align-center { align-items: center; }
    .mb-4 { margin-bottom: 1rem; }
    .mt-4 { margin-top: 1.5rem; }
    
    .btn-primary-small { background: #10b981; color: white; border: none; padding: 0.5rem 1rem; border-radius: 8px; font-weight: 700; font-size: 0.8rem; cursor: pointer; transition: all 0.2s; }
    .btn-primary-small:hover { background: #059669; }

    .bobbin-card { display: flex; gap: 2rem; padding: 1.25rem 0; border-bottom: 1px dashed #cbd5e1; position: relative; }
    .bobbin-card:last-child { border-bottom: none; }
    .bc-block { display: flex; gap: 1.5rem; flex: 1; }
    .bc-item { display: flex; flex-direction: column; gap: 0.25rem; min-width: 80px; }
    .bc-item label { font-size: 0.65rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; }
    .bc-item span { font-size: 0.9rem; font-weight: 600; color: #334155; }
    
    .status-selector { border: none; background: #f8fafc; padding: 0.25rem 0.5rem; border-radius: 6px; font-size: 0.8rem; font-weight: 700; color: #475569; outline: none; cursor: pointer; }
    
    .relative-block { position: relative; }
    .bc-actions { position: absolute; right: 0; top: 50%; transform: translateY(-50%); display: flex; gap: 0.5rem; align-items: center; }
    
    .btn-action-x { width: 28px; height: 28px; border-radius: 50%; background: #fee2e2; color: #ef4444; border: none; font-size: 1.2rem; line-height: 1; cursor: pointer; font-weight: bold; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
    .btn-action-x:hover { background: #ef4444; color: white; transform: scale(1.1); }
    
    .btn-action-warn { width: 28px; height: 28px; border-radius: 50%; background: #fef3c7; color: #d97706; border: 1px solid #fde68a; font-size: 1rem; line-height: 1; cursor: pointer; font-weight: 900; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
    .btn-action-warn:hover { background: #f59e0b; color: white; transform: scale(1.1); }

    .warning-dropdown-container { position: relative; }
    .warning-dropdown { position: absolute; top: 100%; right: 0; margin-top: 0.5rem; background: white; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); width: 180px; z-index: 100; padding: 0.5rem; text-transform: none; }
    .main-row-dropdown { right: auto; left: 0; }
    .wd-item { padding: 0.6rem 0.8rem; font-size: 0.85rem; font-weight: 600; color: #475569; border-radius: 8px; cursor: pointer; transition: all 0.2s; display: flex; justify-content: space-between; align-items: center; position: relative; }
    .wd-item:hover { background: #f1f5f9; color: #1e293b; }
    .arrow { font-size: 0.6rem; color: #94a3b8; }
    
    .has-submenu:hover .wd-submenu { display: block; }
    .wd-submenu { display: none; position: absolute; right: 100%; top: 0; background: white; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); width: 120px; padding: 0.5rem; margin-right: 0.5rem; }

    .empty-state-small { padding: 2rem; text-align: center; color: #94a3b8; font-style: italic; background: #f8fafc; border-radius: 12px; }
    .empty-card { opacity: 0.5; border-bottom: none; }

    /* MANUAL ADD MODAL */
    .text-muted { color: #64748b; font-size: 0.9rem; }
    .alert-info { background: #e0f2fe; color: #0369a1; padding: 0.75rem 1rem; border-radius: 8px; font-size: 0.85rem; font-weight: 600; }
    .bobbin-pairs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
    .station-title { color: #1e293b; font-weight: 800; border-bottom: 2px solid #f1f5f9; padding-bottom: 0.5rem; margin-bottom: 1rem; }
    .form-group { margin-bottom: 1rem; }
    .form-group label { display: block; font-size: 0.75rem; font-weight: 700; color: #64748b; margin-bottom: 0.4rem; }
    .form-input { width: 100%; padding: 0.6rem; border-radius: 8px; border: 1px solid #cbd5e1; outline: none; font-size: 0.9rem; }
    .form-input:focus { border-color: #10b981; box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.1); }
    
    .modal-footer { border-top: 1px solid #f1f5f9; padding-top: 1.5rem; margin-top: 2rem; display: flex; justify-content: flex-end; gap: 1rem; }
    .btn-cancel { background: transparent; border: 1px solid #cbd5e1; color: #475569; padding: 0.6rem 1.25rem; border-radius: 8px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
    .btn-cancel:hover { background: #f1f5f9; }
    .btn-confirm { background: #10b981; color: white; border: none; padding: 0.6rem 1.5rem; border-radius: 8px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
    .btn-confirm:hover { background: #059669; }

    /* SELECT COLUMNS MODAL */
    .columns-list { display: flex; flex-direction: column; gap: 0.6rem; max-height: 300px; overflow-y: auto; padding-right: 1rem; }
    .checkbox-row { display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; color: #334155; font-weight: 600; cursor: pointer; }
    .checkbox-row input { accent-color: #10b981; width: 16px; height: 16px; cursor: pointer; }
    .form-select { width: 100%; padding: 0.6rem; border-radius: 8px; border: 1px solid #cbd5e1; outline: none; font-size: 0.9rem; }
  `]
})
export class TableroProduccionComponent implements OnInit {
  private svc = inject(ProduccionConfigService);

  activeTab   = signal<'extrusion' | 'prensado'>('extrusion');
  loading     = signal(false);
  
  programacionExt = signal<ExtrusionProgramacion[]>([]);
  operacionExt    = signal<ExtrusionOperacion[]>([]);
  
  sortDirProg = signal<'asc' | 'desc'>('asc');
  sortDirOper = signal<'asc' | 'desc'>('asc');

  showModal = signal(false);
  selectedExtrusion = signal<any>(null);
  operariosDisponibles = signal<any[]>([]);

  // States para la nueva funcionalidad de Bobinas
  activeMainRowDropdownId = signal<string | null>(null);
  activeDropdownId = signal<string | null>(null);
  showAddManualModal = signal(false);
  showSelectColumnsModal = signal(false);
  activeExtrusionId = signal<string | null>(null);
  
  availableColumns = [
    'Bobina No', 'Bobina no serie', 'Bobina Kg', 'Bobina merma Kg', 
    'Bobina espesor', 'Bobina Observaciones', 'Bobina Motivo Molino', 
    'Bobina Producto Nombre', 'Bobina Carrete', 'Bobina Inicia Reposo', 
    'Bobina Minutos en Reposo', 'Bobina Molino'
  ];

  addManualData = {
    paresBobinas: null as number | null
  };

  // Filtros dinámicos
  activeFilter = signal<string | null>(null); // 'tabla-columna'
  filterSearch = signal<string>('');
  filterDesde  = signal<number | null>(null);
  filterHasta  = signal<number | null>(null);

  ngOnInit() { 
    this.loadExtrusion(); 
    this.loadOperarios();
  }

  loadOperarios() {
    this.svc.getOperarios().subscribe(res => this.operariosDisponibles.set(res));
  }

  setTab(tab: 'extrusion' | 'prensado') {
    this.activeTab.set(tab);
    if (tab === 'extrusion') this.loadExtrusion();
  }

  loadExtrusion() {
    this.loading.set(true);
    this.svc.getExtrusionProgramacion().subscribe({
      next: res => this.programacionExt.set(res),
      error: ()  => this.loading.set(false)
    });

    this.svc.getExtrusionOperacion().subscribe({
      next: res => { 
        this.operacionExt.set(res); 
        this.loading.set(false); 
      },
      error: ()  => this.loading.set(false)
    });
  }

  toggleSort(table: 'prog' | 'oper', column: string) {
    if (table === 'prog') {
      const dir = this.sortDirProg() === 'asc' ? 'desc' : 'asc';
      this.sortDirProg.set(dir);
      this.programacionExt.update(items => [...items].sort((a, b) => {
        const valA = a.fechaExtrusora;
        const valB = b.fechaExtrusora;
        return dir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }));
    } else {
      const dir = this.sortDirOper() === 'asc' ? 'desc' : 'asc';
      this.sortDirOper.set(dir);
      this.operacionExt.update(items => [...items].sort((a, b) => {
        const valA = a.extrusora;
        const valB = b.extrusora;
        return dir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }));
    }
  }

  openEditModal(id: string) {
    this.svc.getExtrusionDetail(id).subscribe(res => {
      this.selectedExtrusion.set(res);
      this.showModal.set(true);
    });
  }

  toggleFilter(id: string, event: MouseEvent) {
    event.stopPropagation();
    if (this.activeFilter() === id) {
      this.activeFilter.set(null);
    } else {
      this.activeFilter.set(id);
      this.filterSearch.set('');
      this.filterDesde.set(null);
      this.filterHasta.set(null);
    }
  }

  updateOperador(event: any) {
    const newId = event.target.value;
    const extrusionId = this.selectedExtrusion().id;
    this.svc.patchExtrusionOperador(extrusionId, newId || null).subscribe(() => {
      this.loadExtrusion();
      this.selectedExtrusion.set({ ...this.selectedExtrusion(), operadorId: newId });
    });
  }


  closeModal() {
    this.showModal.set(false);
    this.selectedExtrusion.set(null);
  }

  // --- MÉTODOS PARA BOBINAS ---
  toggleMainRowDropdown(id: string, event: MouseEvent) {
    event.stopPropagation();
    this.activeMainRowDropdownId.set(this.activeMainRowDropdownId() === id ? null : id);
  }

  toggleWarningDropdown(id: string, event: MouseEvent) {
    event.stopPropagation();
    this.activeDropdownId.set(this.activeDropdownId() === id ? null : id);
  }

  openSelectColumns(extrusionId: string) {
    this.activeMainRowDropdownId.set(null);
    this.activeExtrusionId.set(extrusionId);
    this.showSelectColumnsModal.set(true);
  }
  closeSelectColumns() { this.showSelectColumnsModal.set(false); }

  openAddManually(extrusionId: string) {
    this.activeMainRowDropdownId.set(null);
    this.activeExtrusionId.set(extrusionId);
    this.addManualData = { paresBobinas: null };
    this.showAddManualModal.set(true);
  }
  closeAddManual() { this.showAddManualModal.set(false); }

  confirmAddManual() {
    if (!this.activeExtrusionId()) return;
    this.svc.addBobinasManual(this.activeExtrusionId()!, this.addManualData).subscribe(() => {
      this.closeAddManual();
      this.loadExtrusion();
    });
  }

  deleteBobina(bobinaId: string) {
    if (!this.selectedExtrusion()) return;
    this.svc.deleteBobina(this.selectedExtrusion().id, bobinaId).subscribe(() => {
      this.openEditModal(this.selectedExtrusion().id); // Recargar datos
    });
  }

  deleteExtrusion(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar esta fila completa?')) {
      this.svc.deleteExtrusion(id).subscribe(() => {
        this.loadExtrusion();
      });
    }
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.activeDropdownId.set(null);
    this.activeMainRowDropdownId.set(null);
  }
}
