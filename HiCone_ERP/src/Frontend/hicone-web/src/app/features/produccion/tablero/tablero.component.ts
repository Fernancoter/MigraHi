import { Component, OnInit, inject, signal, HostListener, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduccionConfigService, ExtrusionProgramacion, ExtrusionOperacion, PrensadoProgramacion, PrensadoOperacion } from '../../../core/services/produccion-config.service';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-tablero-produccion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up">
      <div class="page-header-premium">
        <div class="title-section">
          <nav class="breadcrumb-modern">
            <span class="root">Producción</span>
            <span class="sep">&rsaquo;</span>
            <span class="active">Inicio</span>
          </nav>
          <h1 class="premium-title">Tablero de Producción</h1>
        </div>
      </div>

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
                    <th (click)="progExtSortCol.set('fecha'); progExtSortDir.set(progExtSortDir() === 'asc' ? 'desc' : 'asc')">
                      Fecha Extrusora <span class="sort-icon">{{ progExtSortCol() === 'fecha' ? (progExtSortDir() === 'asc' ? '↑' : '↓') : '' }}</span>
                    </th>
                    <th (click)="toggleFilter('prog-turno', $event)">
                      <span class="th-inner">Turno <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                      @if (activeFilter() === 'prog-turno') {
                        <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                          <div class="filter-group">
                            <button class="sort-btn" (click)="progExtSortCol.set('turno'); progExtSortDir.set('asc')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 16 4 4 4-4M7 20V4M11 8l4-4 4 4M15 4v16"/></svg> A a Z</button>
                            <button class="sort-btn" (click)="progExtSortCol.set('turno'); progExtSortDir.set('desc')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 8 4-4 4 4M7 4v16M11 16l4 4 4-4M15 20V4"/></svg> Z a A</button>
                            <input type="text" class="search-input" placeholder="Buscar..." [ngModel]="progExtTurno()" (ngModelChange)="progExtTurno.set($event)">
                            <div class="suggestions">
                              <span class="suggestion-label">Sugerencias</span>
                              <div class="suggestion-item" (click)="progExtTurno.set('Mañana')">Mañana</div>
                              <div class="suggestion-item" (click)="progExtTurno.set('Tarde')">Tarde</div>
                              <div class="suggestion-item" (click)="progExtTurno.set('Noche')">Noche</div>
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
                            <button class="sort-btn" (click)="progExtSortCol.set('producto'); progExtSortDir.set('asc')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 16 4 4 4-4M7 20V4M11 8l4-4 4 4M15 4v16"/></svg> A a Z</button>
                            <button class="sort-btn" (click)="progExtSortCol.set('producto'); progExtSortDir.set('desc')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 8 4-4 4 4M7 4v16M11 16l4 4 4-4M15 20V4"/></svg> Z a A</button>
                            <input type="text" class="search-input" placeholder="Buscar..." [ngModel]="progExtProducto()" (ngModelChange)="progExtProducto.set($event)">
                          </div>
                        </div>
                      }
                    </th>
                    <th (click)="toggleFilter('prog-operador', $event)">
                      <span class="th-inner">Operador <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                      @if (activeFilter() === 'prog-operador') {
                        <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                          <div class="filter-group">
                            <button class="sort-btn" (click)="progExtSortCol.set('operador'); progExtSortDir.set('asc')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 16 4 4 4-4M7 20V4M11 8l4-4 4 4M15 4v16"/></svg> A a Z</button>
                            <button class="sort-btn" (click)="progExtSortCol.set('operador'); progExtSortDir.set('desc')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 8 4-4 4 4M7 4v16M11 16l4 4 4-4M15 20V4"/></svg> Z a A</button>
                            <input type="text" class="search-input" placeholder="Buscar..." [ngModel]="progExtOperador()" (ngModelChange)="progExtOperador.set($event)">
                          </div>
                        </div>
                      }
                    </th>
                    <th (click)="toggleFilter('prog-programado', $event)">
                      <span class="th-inner">Programado <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                      @if (activeFilter() === 'prog-programado') {
                        <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                          <div class="range-group">
                            <div class="range-field"><label>Desde</label><input type="number" class="search-input" [ngModel]="progExtProgramadoDesde()" (ngModelChange)="progExtProgramadoDesde.set($event)"></div>
                            <div class="range-field"><label>Hasta</label><input type="number" class="search-input" [ngModel]="progExtProgramadoHasta()" (ngModelChange)="progExtProgramadoHasta.set($event)"></div>
                          </div>
                        </div>
                      }
                    </th>
                  </tr>
                </thead>
                <tbody>
                  @if (loading()) {
                    <tr><td colspan="5" class="loading-cell">Cargando programación...</td></tr>
                  } @else if (filteredProgramacionExt().length === 0) {
                    <tr><td colspan="5" class="empty-cell">No hay órdenes programadas que coincidan con los filtros.</td></tr>
                  } @else {
                    @for (item of filteredProgramacionExt(); track item.id) {
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
                  } @else if (filteredOperacionExt().length === 0) {
                    <tr><td colspan="13" class="empty-cell">Sin registros en curso.</td></tr>
                  } @else {
                    @for (item of filteredOperacionExt(); track item.id) {
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
                                      <div class="wd-item" (click)="exportToExcel('extrusion')">Excel</div>
                                      <div class="wd-item" (click)="exportToPDF('extrusion')">PDF</div>
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
                        <!-- Renglón 1 -->
                        <div class="bc-block">
                          <div class="bc-item"><label>Fecha</label><span>{{ selectedExtrusion()?.fecha | date:'dd/MM/yy HH:mm' }}</span></div>
                          <div class="bc-item"><label>Calibre</label><span>{{ selectedExtrusion()?.calibre || '0.00' }}</span></div>
                          <div class="bc-item"><label>Ancho</label><span>{{ selectedExtrusion()?.ancho || '000/000' }}</span></div>
                          <div class="bc-item"><label>Longitud</label><span>{{ selectedExtrusion()?.longitud || '0' }}</span></div>
                        </div>
                        
                        <!-- Renglón 2 -->
                        <div class="bc-block">
                          <div class="bc-item"><label>Virgen kg</label><span>{{ selectedExtrusion()?.kgVirgen || '0.00' }}</span></div>
                          <div class="bc-item"><label>Meta</label><span>{{ selectedExtrusion()?.target || '0.00' }}</span></div>
                          <div class="bc-item"><label>Molido kg</label><span>{{ selectedExtrusion()?.kgMolido || '0.00' }}</span></div>
                          <div class="bc-item">
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

                        <!-- Renglón 3 -->
                        <div class="bc-block">
                          <div class="bc-item"><label>Inicia proceso</label><span>{{ selectedExtrusion()?.processStart ? (selectedExtrusion()?.processStart | date:'dd/MM/yy HH:mm') : '---' }}</span></div>
                          <div class="bc-item"><label>Fin de proceso</label><span>{{ selectedExtrusion()?.processEnd ? (selectedExtrusion()?.processEnd | date:'dd/MM/yy HH:mm') : '---' }}</span></div>
                          <div class="bc-item"></div> <!-- Espaciador -->
                          <div class="bc-item"></div> <!-- Espaciador -->
                        </div>

                        <!-- Renglón 4 -->
                        <div class="bc-block">
                          <div class="bc-item"><label>Pares de bobinas</label><span>{{ b.bobbinNo || '---' }}</span></div>
                          <div class="bc-item"></div> <!-- Espaciador -->
                          <div class="bc-item"></div> <!-- Espaciador -->
                          <div class="bc-item"></div> <!-- Espaciador -->
                        </div>
                      </div>
                    }
                  } @else {
                    <!-- ESTRUCTURA VACÍA VISIBLE -->
                    <div class="bobbin-card empty-card">
                        <!-- Renglón 1 -->
                        <div class="bc-block">
                          <div class="bc-item"><label>Fecha</label><span>---</span></div>
                          <div class="bc-item"><label>Calibre</label><span>---</span></div>
                          <div class="bc-item"><label>Ancho</label><span>---</span></div>
                          <div class="bc-item"><label>Longitud</label><span>---</span></div>
                        </div>
                        <!-- Renglón 2 -->
                        <div class="bc-block">
                          <div class="bc-item"><label>Virgen kg</label><span>---</span></div>
                          <div class="bc-item"><label>Meta</label><span>---</span></div>
                          <div class="bc-item"><label>Molido kg</label><span>---</span></div>
                          <div class="bc-item"><label>Estado</label><span>---</span></div>
                        </div>
                        <!-- Renglón 3 -->
                        <div class="bc-block">
                          <div class="bc-item"><label>Inicia proceso</label><span>---</span></div>
                          <div class="bc-item"><label>Fin de proceso</label><span>---</span></div>
                          <div class="bc-item"></div>
                          <div class="bc-item"></div>
                        </div>
                        <!-- Renglón 4 -->
                        <div class="bc-block">
                          <div class="bc-item"><label>Pares de bobinas</label><span>---</span></div>
                          <div class="bc-item"></div>
                          <div class="bc-item"></div>
                          <div class="bc-item"></div>
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

      <!-- MODAL CONFIRMAR ELIMINACIÓN -->
      @if (showDeleteConfirmModal()) {
        <div class="modal-backdrop animate-fade-in" style="z-index: 1060;" (click)="closeDeleteConfirm()">
          <div class="modal-container animate-slide-up" style="max-width: 400px;" (click)="$event.stopPropagation()">
            <header class="modal-header">
              <h2 style="color: #ef4444;">Eliminar registro</h2>
              <button class="btn-close" (click)="closeDeleteConfirm()">×</button>
            </header>
            <div class="modal-body text-center">
              <div class="delete-icon-large">⚠</div>
              <h3 style="margin: 1rem 0;">¿Estás seguro?</h3>
              <p class="text-muted">Esta acción eliminará la fila completa y toda su información de bobinas. No se puede deshacer.</p>
              <div class="modal-footer" style="justify-content: center; border: none; margin-top: 2rem;">
                <button class="btn-cancel" (click)="closeDeleteConfirm()">Cancelar</button>
                <button class="btn-confirm" style="background: #ef4444;" (click)="confirmDeleteExtrusion()">Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- TAB PRENSADO -->
      @if (activeTab() === 'prensado') {
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
                    <th class="header-empty"></th>
                    <th class="header-empty"></th>
                    <th class="header-empty"></th>
                    <th (click)="progPrenSortCol.set('fecha'); progPrenSortDir.set(progPrenSortDir() === 'asc' ? 'desc' : 'asc')">
                      Fecha Prensado <span class="sort-icon">{{ progPrenSortCol() === 'fecha' ? (progPrenSortDir() === 'asc' ? '↑' : '↓') : '' }}</span>
                    </th>
                    <th (click)="toggleFilter('prog-prensa-filter', $event)">
                      <span class="th-inner">Prensa <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                      @if (activeFilter() === 'prog-prensa-filter') {
                        <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                          <div class="filter-group">
                            <button class="sort-btn" (click)="progPrenSortCol.set('prensa'); progPrenSortDir.set('asc')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 16 4 4 4-4M7 20V4M11 8l4-4 4 4M15 4v16"/></svg> A a Z</button>
                            <button class="sort-btn" (click)="progPrenSortCol.set('prensa'); progPrenSortDir.set('desc')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 8 4-4 4 4M7 4v16M11 16l4 4 4-4M15 20V4"/></svg> Z a A</button>
                            <input type="text" class="search-input" placeholder="Buscar..." [ngModel]="progPrenPrensa()" (ngModelChange)="progPrenPrensa.set($event)">
                          </div>
                        </div>
                      }
                    </th>
                    <th (click)="toggleFilter('prog-turno-filter', $event)">
                      <span class="th-inner">Turno <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                      @if (activeFilter() === 'prog-turno-filter') {
                        <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                          <div class="filter-group">
                            <button class="sort-btn" (click)="progPrenSortCol.set('turno'); progPrenSortDir.set('asc')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 16 4 4 4-4M7 20V4M11 8l4-4 4 4M15 4v16"/></svg> A a Z</button>
                            <button class="sort-btn" (click)="progPrenSortCol.set('turno'); progPrenSortDir.set('desc')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 8 4-4 4 4M7 4v16M11 16l4 4 4-4M15 20V4"/></svg> Z a A</button>
                            <input type="text" class="search-input" placeholder="Buscar..." [ngModel]="progPrenTurno()" (ngModelChange)="progPrenTurno.set($event)">
                            <div class="suggestions">
                              <span class="suggestion-label">Sugerencias</span>
                              <div class="suggestion-item" (click)="progPrenTurno.set('Mañana')">Mañana</div>
                              <div class="suggestion-item" (click)="progPrenTurno.set('Tarde')">Tarde</div>
                              <div class="suggestion-item" (click)="progPrenTurno.set('Noche')">Noche</div>
                            </div>
                          </div>
                        </div>
                      }
                    </th>
                    <th (click)="toggleFilter('prog-producto-filter', $event)">
                      <span class="th-inner">Producto <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                      @if (activeFilter() === 'prog-producto-filter') {
                        <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                          <div class="filter-group">
                            <button class="sort-btn" (click)="progPrenSortCol.set('producto'); progPrenSortDir.set('asc')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 16 4 4 4-4M7 20V4M11 8l4-4 4 4M15 4v16"/></svg> A a Z</button>
                            <button class="sort-btn" (click)="progPrenSortCol.set('producto'); progPrenSortDir.set('desc')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 8 4-4 4 4M7 4v16M11 16l4 4 4-4M15 20V4"/></svg> Z a A</button>
                            <input type="text" class="search-input" placeholder="Buscar..." [ngModel]="progPrenProducto()" (ngModelChange)="progPrenProducto.set($event)">
                          </div>
                        </div>
                      }
                    </th>
                    <th (click)="toggleFilter('prog-operador-filter', $event)">
                      <span class="th-inner">Operador <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                      @if (activeFilter() === 'prog-operador-filter') {
                        <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                          <div class="filter-group">
                            <button class="sort-btn" (click)="progPrenSortCol.set('operador'); progPrenSortDir.set('asc')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 16 4 4 4-4M7 20V4M11 8l4-4 4 4M15 4v16"/></svg> A a Z</button>
                            <button class="sort-btn" (click)="progPrenSortCol.set('operador'); progPrenSortDir.set('desc')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 8 4-4 4 4M7 4v16M11 16l4 4 4-4M15 20V4"/></svg> Z a A</button>
                            <input type="text" class="search-input" placeholder="Buscar..." [ngModel]="progPrenOperador()" (ngModelChange)="progPrenOperador.set($event)">
                          </div>
                        </div>
                      }
                    </th>
                    <th (click)="toggleFilter('prog-programado-filter', $event)">
                      <span class="th-inner">Programado <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                      @if (activeFilter() === 'prog-programado-filter') {
                        <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                          <div class="range-group">
                            <div class="range-field"><label>Desde</label><input type="number" class="search-input" [ngModel]="progPrenProgramadoDesde()" (ngModelChange)="progPrenProgramadoDesde.set($event)"></div>
                            <div class="range-field"><label>Hasta</label><input type="number" class="search-input" [ngModel]="progPrenProgramadoHasta()" (ngModelChange)="progPrenProgramadoHasta.set($event)"></div>
                          </div>
                        </div>
                      }
                    </th>
                  </tr>
                </thead>
                <tbody>
                  @if (loading()) {
                    <tr><td colspan="9" class="loading-cell">Cargando programación...</td></tr>
                  } @else if (filteredProgramacionPren().length === 0) {
                    <tr><td colspan="9" class="empty-cell">No hay órdenes programadas que coincidan con los filtros.</td></tr>
                  } @else {
                    @for (item of filteredProgramacionPren(); track item.id) {
                      <tr>
                        <td class="td-empty"></td>
                        <td class="td-empty"></td>
                        <td class="td-empty"></td>
                        <td>{{ item.fecha | date:'dd/MM/yyyy' }}</td>
                        <td><strong>{{ item.prensa }}</strong></td>
                        <td><span class="turno-badge">{{ item.turno }}</span></td>
                        <td><strong>{{ item.producto }}</strong></td>
                        <td>{{ item.operador || 'Sin asignar' }}</td>
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
                    <th class="header-action text-center" style="width: 32px; color: #ef4444; font-weight: 800; cursor: default;" title="Eliminar fila">×</th>
                    <th class="header-action text-center" style="width: 32px; color: #10b981; font-weight: 800; cursor: default;" title="Detalles y Carreras">!</th>
                    <th (click)="toggleFilter('oper-prensa-filter', $event)">
                      Prensa <span class="sort-icon">{{ operPrenSortCol() === 'prensa' ? (operPrenSortDir() === 'asc' ? '↑' : '↓') : '' }}</span>
                      @if (activeFilter() === 'oper-prensa-filter') {
                        <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                          <div class="filter-group">
                            <button class="sort-btn" (click)="operPrenSortCol.set('prensa'); operPrenSortDir.set('asc')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 16 4 4 4-4M7 20V4M11 8l4-4 4 4M15 4v16"/></svg> A a Z</button>
                            <button class="sort-btn" (click)="operPrenSortCol.set('prensa'); operPrenSortDir.set('desc')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 8 4-4 4 4M7 4v16M11 16l4 4 4-4M15 20V4"/></svg> Z a A</button>
                            <input type="text" class="search-input" placeholder="Buscar..." [ngModel]="operPrenPrensa()" (ngModelChange)="operPrenPrensa.set($event)">
                            <div class="suggestions">
                              <span class="suggestion-label">Sugerencias</span>
                              <div class="suggestion-item" (click)="operPrenPrensa.set('Prensa 1'); activeFilter.set(null)">Prensa 1</div>
                              <div class="suggestion-item" (click)="operPrenPrensa.set('Prensa 2'); activeFilter.set(null)">Prensa 2</div>
                              <div class="suggestion-item" (click)="operPrenPrensa.set('Prensa 3'); activeFilter.set(null)">Prensa 3</div>
                            </div>
                          </div>
                        </div>
                      }
                    </th>
                    <th (click)="toggleFilter('oper-turno-filter', $event)">
                      <span class="th-inner">Turno <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                      @if (activeFilter() === 'oper-turno-filter') {
                        <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                          <div class="filter-group">
                            <button class="sort-btn" (click)="operPrenSortCol.set('turno'); operPrenSortDir.set('asc')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 16 4 4 4-4M7 20V4M11 8l4-4 4 4M15 4v16"/></svg> A a Z</button>
                            <button class="sort-btn" (click)="operPrenSortCol.set('turno'); operPrenSortDir.set('desc')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 8 4-4 4 4M7 4v16M11 16l4 4 4-4M15 20V4"/></svg> Z a A</button>
                            <input type="text" class="search-input" placeholder="Buscar..." [ngModel]="operPrenTurno()" (ngModelChange)="operPrenTurno.set($event)">
                            <div class="suggestions">
                              <span class="suggestion-label">Sugerencias</span>
                              <div class="suggestion-item" (click)="operPrenTurno.set('Mañana'); activeFilter.set(null)">Mañana</div>
                              <div class="suggestion-item" (click)="operPrenTurno.set('Tarde'); activeFilter.set(null)">Tarde</div>
                              <div class="suggestion-item" (click)="operPrenTurno.set('Noche'); activeFilter.set(null)">Noche</div>
                            </div>
                          </div>
                        </div>
                      }
                    </th>
                    <th (click)="toggleFilter('oper-producto-filter', $event)">
                      <span class="th-inner">Producto <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                      @if (activeFilter() === 'oper-producto-filter') {
                        <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                          <div class="filter-group">
                            <button class="sort-btn" (click)="operPrenSortCol.set('producto'); operPrenSortDir.set('asc')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 16 4 4 4-4M7 20V4M11 8l4-4 4 4M15 4v16"/></svg> A a Z</button>
                            <button class="sort-btn" (click)="operPrenSortCol.set('producto'); operPrenSortDir.set('desc')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 8 4-4 4 4M7 4v16M11 16l4 4 4-4M15 20V4"/></svg> Z a A</button>
                            <input type="text" class="search-input" placeholder="Buscar..." [ngModel]="operPrenProducto()" (ngModelChange)="operPrenProducto.set($event)">
                            <div class="suggestions">
                              <span class="suggestion-label">Sugerencias</span>
                              <div class="suggestion-item" (click)="operPrenProducto.set('Bobina'); activeFilter.set(null)">Bobina</div>
                              <div class="suggestion-item" (click)="operPrenProducto.set('Carrete'); activeFilter.set(null)">Carrete</div>
                            </div>
                          </div>
                        </div>
                      }
                    </th>
                    <th (click)="toggleFilter('oper-operador-filter', $event)">
                      <span class="th-inner">Operador <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                      @if (activeFilter() === 'oper-operador-filter') {
                        <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                          <div class="filter-group">
                            <button class="sort-btn" (click)="operPrenSortCol.set('operador'); operPrenSortDir.set('asc')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 16 4 4 4-4M7 20V4M11 8l4-4 4 4M15 4v16"/></svg> A a Z</button>
                            <button class="sort-btn" (click)="operPrenSortCol.set('operador'); operPrenSortDir.set('desc')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 8 4-4 4 4M7 4v16M11 16l4 4 4-4M15 20V4"/></svg> Z a A</button>
                            <input type="text" class="search-input" placeholder="Buscar..." [ngModel]="operPrenOperador()" (ngModelChange)="operPrenOperador.set($event)">
                            <div class="suggestions">
                              <span class="suggestion-label">Sugerencias</span>
                              <div class="suggestion-item" (click)="operPrenOperador.set('Juan Pérez'); activeFilter.set(null)">Juan Pérez</div>
                              <div class="suggestion-item" (click)="operPrenOperador.set('María López'); activeFilter.set(null)">María López</div>
                            </div>
                          </div>
                        </div>
                      }
                    </th>
                    <th class="text-right" (click)="toggleFilter('oper-producido-filter', $event)">
                      <span class="th-inner">Producido <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                      @if (activeFilter() === 'oper-producido-filter') {
                        <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                          <div class="range-group">
                            <div class="range-field"><label>Desde</label><input type="number" class="search-input" [ngModel]="operPrenProducidoDesde()" (ngModelChange)="operPrenProducidoDesde.set($event)"></div>
                            <div class="range-field"><label>Hasta</label><input type="number" class="search-input" [ngModel]="operPrenProducidoHasta()" (ngModelChange)="operPrenProducidoHasta.set($event)"></div>
                            <button class="sort-btn" style="background: #10b981; color: white; margin-top: 0.5rem; justify-content: center; font-weight: bold;" (click)="activeFilter.set(null)">Buscar</button>
                          </div>
                        </div>
                      }
                    </th>
                    <th class="text-right" (click)="toggleFilter('oper-interrupcion-filter', $event)">
                      <span class="th-inner">Tiempo Interrupción <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                      @if (activeFilter() === 'oper-interrupcion-filter') {
                        <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                          <div class="range-group">
                            <div class="range-field"><label>Desde</label><input type="number" class="search-input" [ngModel]="operPrenInterrupcionDesde()" (ngModelChange)="operPrenInterrupcionDesde.set($event)"></div>
                            <div class="range-field"><label>Hasta</label><input type="number" class="search-input" [ngModel]="operPrenInterrupcionHasta()" (ngModelChange)="operPrenInterrupcionHasta.set($event)"></div>
                            <button class="sort-btn" style="background: #10b981; color: white; margin-top: 0.5rem; justify-content: center; font-weight: bold;" (click)="activeFilter.set(null)">Buscar</button>
                          </div>
                        </div>
                      }
                    </th>
                    <th>En Curso</th>
                    <th>Prensa ID</th>
                  </tr>
                </thead>
                <tbody>
                  @if (loading()) {
                    <tr><td colspan="12" class="loading-cell">Cargando operación...</td></tr>
                  } @else if (filteredOperacionPren().length === 0) {
                    <tr><td colspan="12" class="empty-cell">Sin registros en curso que coincidan con los filtros.</td></tr>
                  } @else {
                    @for (item of filteredOperacionPren(); track item.id) {
                      <tr [class.row-active]="item.enCurso">
                        <td>
                          <span class="status-indicator" [attr.data-status]="item.status">
                            {{ item.status }}
                          </span>
                        </td>
                        <td class="actions-cell" style="width: auto;">
                          <button class="btn-icon-edit" title="Editar" (click)="openPrensadoEditModal(item.id)">
                            <span class="icon">✎</span>
                          </button>
                        </td>
                        <td class="actions-cell" style="width: auto;">
                          <button class="btn-icon-delete" title="Eliminar" (click)="deletePrensado(item.id)">
                            <span class="icon">×</span>
                          </button>
                        </td>
                        <td class="actions-cell" style="width: auto;">
                          <button class="btn-icon-warn" [class.active-expand]="isPrensadoRowExpanded(item.id)" title="Ver Carreras y Detalles" (click)="togglePrensadoRow(item.id, $event)" style="background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 6px;">
                            <span class="icon" style="font-weight: bold;">!</span>
                          </button>
                        </td>
                        <td><strong>{{ item.prensa }}</strong></td>
                        <td>{{ item.turno }}</td>
                        <td>{{ item.producto }}</td>
                        <td>{{ item.operador || 'Sin asignar' }}</td>
                        <td class="text-right font-bold">{{ item.producido | number }}</td>
                        <td class="text-right">{{ item.tiempoInterrupcion }}</td>
                        <td class="text-center">
                          <div class="toggle-status" [class.on]="item.enCurso"></div>
                        </td>
                        <td><code class="id-tag">{{ item.id.substring(0, 8) }}</code></td>
                      </tr>

                      <!-- BLOQUE EXPANDIBLE DE DETALLES Y CARRERAS -->
                      @if (isPrensadoRowExpanded(item.id)) {
                        <tr class="expanded-row-tr">
                          <td colspan="12" class="expanded-row-td" style="padding: 1.5rem 2rem; background: rgba(248, 250, 252, 0.6); border-bottom: 1.5px solid #e2e8f0;">
                            <div class="expanded-detail-container animate-slide-up" style="display: flex; flex-direction: column; gap: 1rem;">
                              
                              <!-- Header & Export Toolbar -->
                              <div class="expand-header-row" style="display: flex; justify-content: space-between; align-items: center;">
                                <div class="expand-title" style="display: flex; align-items: center; gap: 0.5rem;">
                                  <span style="font-size: 1.1rem;">🏃‍♂️</span>
                                  <h4 style="margin: 0; font-size: 0.95rem; font-weight: 800; color: #1e293b; text-transform: uppercase; letter-spacing: 0.05em;">Carreras Registradas</h4>
                                </div>
                                <div class="expand-toolbar" style="display: flex; gap: 0.5rem;">
                                  <button class="btn-export-sub" style="background: #10b981; color: white; border: none; padding: 0.4rem 0.8rem; border-radius: 6px; font-size: 0.78rem; font-weight: 600; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.3rem;" (click)="exportToExcel('prensado')">
                                    <span>📊 Excel</span>
                                  </button>
                                  <button class="btn-export-sub" style="background: #ef4444; color: white; border: none; padding: 0.4rem 0.8rem; border-radius: 6px; font-size: 0.78rem; font-weight: 600; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.3rem;" (click)="exportToPDF('prensado')">
                                    <span>📄 PDF</span>
                                  </button>
                                </div>
                              </div>

                              <!-- Carreras Grid -->
                              @if (getCarrerasForPrensado(item).length > 0) {
                                <div class="sub-table-wrapper" style="border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background: white;">
                                  <table class="sub-table" style="width: 100%; border-collapse: collapse; font-size: 0.825rem;">
                                    <thead>
                                      <tr style="background: #f1f5f9; border-bottom: 1px solid #e2e8f0;">
                                        <th style="padding: 0.6rem 0.8rem; text-align: left; color: #475569; font-weight: 700;">Bobina</th>
                                        <th style="padding: 0.6rem 0.8rem; text-align: right; color: #475569; font-weight: 700;">Reposo (Hr)</th>
                                        <th style="padding: 0.6rem 0.8rem; text-align: right; color: #475569; font-weight: 700;">Carreras</th>
                                        <th style="padding: 0.6rem 0.8rem; text-align: right; color: #475569; font-weight: 700;">En Proceso</th>
                                        <th style="padding: 0.6rem 0.8rem; text-align: right; color: #475569; font-weight: 700;">Terminadas</th>
                                        <th style="padding: 0.6rem 0.8rem; text-align: right; color: #475569; font-weight: 700;">Validadas</th>
                                        <th style="padding: 0.6rem 0.8rem; text-align: left; color: #475569; font-weight: 700;">Carretes</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      @for (c of getCarrerasForPrensado(item); track c.bobina) {
                                        <tr style="border-bottom: 1px solid #f1f5f9; transition: all 0.15s;">
                                          <td style="padding: 0.5rem 0.8rem; font-weight: 700; color: #0f172a;">{{ c.bobina }}</td>
                                          <td style="padding: 0.5rem 0.8rem; text-align: right; color: #334155;">{{ c.reposoHr }}</td>
                                          <td style="padding: 0.5rem 0.8rem; text-align: right; font-weight: 600; color: #10b981;">{{ c.carreras }}</td>
                                          <td style="padding: 0.5rem 0.8rem; text-align: right; color: #64748b;">{{ c.enProceso }}</td>
                                          <td style="padding: 0.5rem 0.8rem; text-align: right; font-weight: 600; color: #0f172a;">{{ c.terminadas }}</td>
                                          <td style="padding: 0.5rem 0.8rem; text-align: right; font-weight: 600; color: #10b981;">{{ c.validadas }}</td>
                                          <td style="padding: 0.5rem 0.8rem; color: #475569;"><span class="carretes-tag" style="background: #f1f5f9; padding: 0.2rem 0.4rem; border-radius: 4px; font-weight: 600;">{{ c.carretes }}</span></td>
                                        </tr>
                                      }
                                    </tbody>
                                  </table>
                                </div>
                              } @else {
                                <div class="empty-carreras-box" style="padding: 1.25rem; background: white; border: 1px dashed #cbd5e1; border-radius: 8px; text-align: center; color: #94a3b8; font-style: italic;">
                                  Prensado seleccionado sin carreras registradas
                                </div>
                              }
                            </div>
                          </td>
                        </tr>
                      }
                    }
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      }

      <!-- MODAL DE EDICIÓN PRENSADO -->
      @if (showPrensadoModal()) {
        <div class="modal-backdrop animate-fade-in" (click)="closePrensadoModal()">
          <div class="modal-container animate-slide-up" (click)="$event.stopPropagation()">
            <header class="modal-header">
              <h2>Información general</h2>
              <button class="btn-close" (click)="closePrensadoModal()">×</button>
            </header>
            
            <div class="modal-body" *ngIf="selectedPrensado()">
              <!-- Top borderless grid section -->
              <div class="info-grid borderless" style="margin-bottom: 2rem;">
                <div class="info-col">
                  <label>Prensa</label>
                  <p>{{ selectedPrensado()?.prensa || '---' }}</p>
                </div>
                <div class="info-col">
                  <label>Turno</label>
                  <p>{{ selectedPrensado()?.turno || '---' }}</p>
                </div>
                <div class="info-col">
                  <label>Producto</label>
                  <p>{{ selectedPrensado()?.producto || '---' }}</p>
                </div>
              </div>

              <!-- Operator Section -->
              <div class="sub-section">
                <label style="display: block; font-size: 0.75rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">Operador</label>
                <select class="op-selector" [ngModel]="selectedPrensado()?.operadorId || ''" (ngModelChange)="selectedPrensado().operadorId = $event">
                  <option value="">Sin asignar</option>
                  @for (op of operariosDisponibles(); track op.id) {
                    <option [value]="op.id">{{ op.nombre }}</option>
                  }
                </select>
              </div>

              <!-- Status Section -->
              <div class="sub-section" style="margin-top: 1.5rem;">
                <label style="display: block; font-size: 0.75rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">Estado</label>
                <select class="op-selector" [ngModel]="selectedPrensado()?.status || ''" (ngModelChange)="selectedPrensado().status = $event">
                  <option value="Programada">Programada</option>
                  <option value="EnProceso">En Proceso</option>
                  <option value="Intermedia">Intermedia</option>
                  <option value="Parada">Parada</option>
                  <option value="Terminada">Terminada</option>
                  <option value="PorProgramar">Por Programar</option>
                </select>
              </div>

              <!-- Bottom section borderless table -->
              <div class="sub-section" style="margin-top: 1.5rem;">
                <label style="display: block; font-size: 0.75rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">Detalles de Producción</label>
                <div class="bobbin-card" style="border: none; padding-top: 0.5rem; display: flex; flex-direction: column; gap: 1rem;">
                  <!-- Renglón 1: Fecha e input interactivo con calendario -->
                  <div class="bc-block">
                    <div class="bc-item">
                      <label>Fecha de Producción 📅</label>
                      <input type="date" class="form-input" [ngModel]="selectedPrensado()?.fecha | date:'yyyy-MM-dd'" (ngModelChange)="onPressingDateChange($event)">
                    </div>
                    <div class="bc-item">
                      <label>Calibre</label>
                      <input type="number" step="0.001" class="form-input" [ngModel]="selectedPrensado()?.calibre" (ngModelChange)="selectedPrensado().calibre = $event" placeholder="0.000">
                    </div>
                  </div>

                  <!-- Renglón 2: Ancho y Longitud -->
                  <div class="bc-block">
                    <div class="bc-item">
                      <label>Ancho</label>
                      <input type="text" class="form-input" [ngModel]="selectedPrensado()?.ancho" (ngModelChange)="selectedPrensado().ancho = $event" placeholder="0000/00">
                    </div>
                    <div class="bc-item">
                      <label>Longitud</label>
                      <input type="number" class="form-input" [ngModel]="selectedPrensado()?.longitud" (ngModelChange)="selectedPrensado().longitud = $event" placeholder="00000">
                    </div>
                  </div>

                  <!-- Renglón 3: Información Adicional (Virgen Kg, Meta, Molido Kg, Estado) -->
                  <label style="display: block; font-size: 0.75rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0.5rem;">Información Adicional</label>
                  <div class="bc-block">
                    <div class="bc-item">
                      <label>Virgen Kg</label>
                      <input type="number" step="0.01" class="form-input" [ngModel]="selectedPrensado()?.virgenKg" (ngModelChange)="selectedPrensado().virgenKg = $event" placeholder="00.00">
                    </div>
                    <div class="bc-item">
                      <label>Meta</label>
                      <input type="number" class="form-input" [ngModel]="selectedPrensado()?.meta" (ngModelChange)="selectedPrensado().meta = $event" placeholder="0000">
                    </div>
                  </div>
                  <div class="bc-block">
                    <div class="bc-item">
                      <label>Molido Kg</label>
                      <input type="number" step="0.01" class="form-input" [ngModel]="selectedPrensado()?.molidoKg" (ngModelChange)="selectedPrensado().molidoKg = $event" placeholder="00.00">
                    </div>
                    <div class="bc-item">
                      <label>Estado</label>
                      <select class="form-select" [ngModel]="selectedPrensado()?.status" (ngModelChange)="selectedPrensado().status = $event">
                        <option value="Programada">Programada</option>
                        <option value="EnProceso">En Proceso</option>
                        <option value="Intermedia">Intermedia</option>
                        <option value="Parada">Parada</option>
                        <option value="Terminada">Terminada</option>
                        <option value="PorProgramar">Por Programar</option>
                      </select>
                    </div>
                  </div>

                  <!-- Renglón 4: Tiempos de Proceso (Inicia Proceso, Fin Proceso) -->
                  <label style="display: block; font-size: 0.75rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0.5rem;">Tiempos de Proceso</label>
                  <div class="bc-block">
                    <div class="bc-item">
                      <label>Inicia Proceso</label>
                      <input type="datetime-local" class="form-input" [ngModel]="selectedPrensado()?.iniciaProceso | date:'yyyy-MM-ddTHH:mm'" (ngModelChange)="selectedPrensado().iniciaProceso = $event">
                    </div>
                    <div class="bc-item">
                      <label>Fin Proceso</label>
                      <input type="datetime-local" class="form-input" [ngModel]="selectedPrensado()?.finProceso | date:'yyyy-MM-ddTHH:mm'" (ngModelChange)="selectedPrensado().finProceso = $event">
                    </div>
                  </div>

                  <!-- Renglón 5: Lote Silo -->
                  <label style="display: block; font-size: 0.75rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0.5rem;">Lote Silo</label>
                  <div class="bc-block">
                    <div class="bc-item" style="flex: 1;">
                      <label>Lote Silo</label>
                      <input type="text" class="form-input" [ngModel]="selectedPrensado()?.loteSilo" (ngModelChange)="selectedPrensado().loteSilo = $event" placeholder="Información del lote de silo...">
                    </div>
                  </div>
                </div>
              </div>

              <div class="modal-footer" style="border: none; margin-top: 2rem; padding: 0;">
                <button class="btn-cancel" (click)="closePrensadoModal()">Cancelar</button>
                <button class="btn-confirm" (click)="savePrensado()">Confirmar</button>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- MODAL CONFIRMAR ELIMINACIÓN PRENSADO -->
      @if (showDeleteConfirmModalPrensado()) {
        <div class="modal-backdrop animate-fade-in" style="z-index: 1060;" (click)="closeDeleteConfirmPrensado()">
          <div class="modal-container animate-slide-up" style="max-width: 400px;" (click)="$event.stopPropagation()">
            <header class="modal-header">
              <h2 style="color: #ef4444;">Eliminar registro</h2>
              <button class="btn-close" (click)="closeDeleteConfirmPrensado()">×</button>
            </header>
            <div class="modal-body text-center">
              <div class="delete-icon-large">⚠</div>
              <h3 style="margin: 1rem 0;">¿Estás seguro?</h3>
              <p class="text-muted">Esta acción eliminará el registro de prensado seleccionado de forma permanente. No se puede deshacer.</p>
              <div class="modal-footer" style="justify-content: center; border: none; margin-top: 2rem;">
                <button class="btn-cancel" (click)="closeDeleteConfirmPrensado()">Cancelar</button>
                <button class="btn-confirm" style="background: #ef4444;" (click)="confirmDeletePrensado()">Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .module-page { padding: 3rem; background: #f1f5f9; min-height: 100vh; }
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

    .bobbin-card { display: flex; flex-direction: column; gap: 1rem; padding: 1.5rem 0; border-bottom: 1px dashed #cbd5e1; position: relative; }
    .bobbin-card:last-child { border-bottom: none; }
    .bc-block { display: flex; gap: 1rem; width: 100%; justify-content: space-between; }
    .bc-item { display: flex; flex-direction: column; gap: 0.25rem; flex: 1; min-width: 0; }
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
    .wd-submenu { display: none; position: absolute; left: 100%; top: 0; background: white; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); width: 120px; padding: 0.5rem; margin-left: -2px; padding-left: 10px; } /* Ajuste para evitar gap en hover */

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
    
    .delete-icon-large { font-size: 4rem; color: #f59e0b; margin-bottom: 1rem; }
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
  
  // Filtros activos para Extrusión Programación
  progExtTurno = signal<string>('');
  progExtProducto = signal<string>('');
  progExtOperador = signal<string>('');
  progExtProgramadoDesde = signal<number | null | string>(null);
  progExtProgramadoHasta = signal<number | null | string>(null);

  // Filtros activos para Extrusión Operación
  operExtExtrusora = signal<string>('');
  operExtTurno = signal<string>('');
  operExtProducto = signal<string>('');
  operExtOperador = signal<string>('');
  operExtProducidoDesde = signal<number | null | string>(null);
  operExtProducidoHasta = signal<number | null | string>(null);
  operExtInterrupcionDesde = signal<number | null | string>(null);
  operExtInterrupcionHasta = signal<number | null | string>(null);
  operExtEnCurso = signal<boolean | null>(null);
  operExtId = signal<string>('');

  // Sort signals para Extrusión
  progExtSortCol = signal<string>('fecha');
  progExtSortDir = signal<'asc' | 'desc'>('asc');
  operExtSortCol = signal<string>('extrusora');
  operExtSortDir = signal<'asc' | 'desc'>('asc');

  // Filtros activos para Prensado Programación
  progPrenPrensa = signal<string>('');
  progPrenTurno = signal<string>('');
  progPrenProducto = signal<string>('');
  progPrenOperador = signal<string>('');
  progPrenProgramadoDesde = signal<number | null | string>(null);
  progPrenProgramadoHasta = signal<number | null | string>(null);

  // Filtros activos para Prensado Operación
  operPrenPrensa = signal<string>('');
  operPrenStatus = signal<string>('');
  operPrenTurno = signal<string>('');
  operPrenProducto = signal<string>('');
  operPrenOperador = signal<string>('');
  operPrenProducidoDesde = signal<number | null | string>(null);
  operPrenProducidoHasta = signal<number | null | string>(null);
  operPrenInterrupcionDesde = signal<number | null | string>(null);
  operPrenInterrupcionHasta = signal<number | null | string>(null);

  // Sort signals para Prensado
  progPrenSortCol = signal<string>('fecha');
  progPrenSortDir = signal<'asc' | 'desc'>('asc');
  operPrenSortCol = signal<string>('prensa');
  operPrenSortDir = signal<'asc' | 'desc'>('asc');

  // Prensado arrays
  programacionPren = signal<PrensadoProgramacion[]>([]);
  operacionPren = signal<PrensadoOperacion[]>([]);
  selectedPrensado = signal<any>(null);
  showPrensadoModal = signal(false);
  showDeleteConfirmModalPrensado = signal(false);
  activePrensadoId = signal<string | null>(null);

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
  showDeleteConfirmModal = signal(false);
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

  filteredProgramacionExt = computed(() => {
    let list = this.programacionExt();
    
    // Apply filters
    const turno = this.progExtTurno();
    if (turno) list = list.filter(item => item.turno.toLowerCase().includes(turno.toLowerCase()));
    
    const producto = this.progExtProducto();
    if (producto) list = list.filter(item => item.producto.toLowerCase().includes(producto.toLowerCase()));
    
    const operador = this.progExtOperador();
    if (operador) list = list.filter(item => (item.operador || '').toLowerCase().includes(operador.toLowerCase()));
    
    const desde = this.progExtProgramadoDesde();
    if (desde !== null && desde !== undefined && desde !== '') list = list.filter(item => item.programado >= Number(desde));
    
    const hasta = this.progExtProgramadoHasta();
    if (hasta !== null && hasta !== undefined && hasta !== '') list = list.filter(item => item.programado <= Number(hasta));

    // Apply sorting
    const sortCol = this.progExtSortCol();
    const sortDir = this.progExtSortDir();
    if (sortCol) {
      list = [...list].sort((a: any, b: any) => {
        let valA = a[sortCol === 'fecha' ? 'fechaExtrusora' : sortCol];
        let valB = b[sortCol === 'fecha' ? 'fechaExtrusora' : sortCol];
        if (typeof valA === 'string') {
          return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        } else {
          return sortDir === 'asc' ? (valA - valB) : (valB - valA);
        }
      });
    }
    
    return list;
  });

  filteredOperacionExt = computed(() => {
    let list = this.operacionExt();
    
    const extrusora = this.operExtExtrusora();
    if (extrusora) list = list.filter(item => item.extrusora.toLowerCase().includes(extrusora.toLowerCase()));
    
    const turno = this.operExtTurno();
    if (turno) list = list.filter(item => item.turno.toLowerCase().includes(turno.toLowerCase()));
    
    const producto = this.operExtProducto();
    if (producto) list = list.filter(item => item.producto.toLowerCase().includes(producto.toLowerCase()));
    
    const operador = this.operExtOperador();
    if (operador) list = list.filter(item => (item.operador || '').toLowerCase().includes(operador.toLowerCase()));
    
    const prodDesde = this.operExtProducidoDesde();
    if (prodDesde !== null && prodDesde !== undefined && prodDesde !== '') list = list.filter(item => item.producido >= Number(prodDesde));
    
    const prodHasta = this.operExtProducidoHasta();
    if (prodHasta !== null && prodHasta !== undefined && prodHasta !== '') list = list.filter(item => item.producido <= Number(prodHasta));
    
    const intDesde = this.operExtInterrupcionDesde();
    if (intDesde !== null && intDesde !== undefined && intDesde !== '') list = list.filter(item => item.tiempoInterrupcion >= Number(intDesde));
    
    const intHasta = this.operExtInterrupcionHasta();
    if (intHasta !== null && intHasta !== undefined && intHasta !== '') list = list.filter(item => item.tiempoInterrupcion <= Number(intHasta));
    
    const enCurso = this.operExtEnCurso();
    if (enCurso !== null) list = list.filter(item => item.enCurso === enCurso);
    
    const extId = this.operExtId();
    if (extId) list = list.filter(item => String(item.extrusionId).toLowerCase().includes(extId.toLowerCase()));

    // Apply sorting
    const sortCol = this.operExtSortCol();
    const sortDir = this.operExtSortDir();
    if (sortCol) {
      list = [...list].sort((a: any, b: any) => {
        let valA = a[sortCol];
        let valB = b[sortCol];
        if (typeof valA === 'string') {
          return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        } else if (typeof valA === 'boolean') {
          return sortDir === 'asc' ? (valA === valB ? 0 : valA ? 1 : -1) : (valA === valB ? 0 : valA ? -1 : 1);
        } else {
          return sortDir === 'asc' ? (valA - valB) : (valB - valA);
        }
      });
    }
    
    return list;
  });

  filteredProgramacionPren = computed(() => {
    let list = this.programacionPren();
    
    const prensa = this.progPrenPrensa();
    if (prensa) list = list.filter(item => item.prensa.toLowerCase().includes(prensa.toLowerCase()));
    
    const turno = this.progPrenTurno();
    if (turno) list = list.filter(item => item.turno.toLowerCase().includes(turno.toLowerCase()));
    
    const producto = this.progPrenProducto();
    if (producto) list = list.filter(item => item.producto.toLowerCase().includes(producto.toLowerCase()));
    
    const operador = this.progPrenOperador();
    if (operador) list = list.filter(item => (item.operador || '').toLowerCase().includes(operador.toLowerCase()));
    
    const desde = this.progPrenProgramadoDesde();
    if (desde !== null && desde !== undefined && desde !== '') list = list.filter(item => item.programado >= Number(desde));
    
    const hasta = this.progPrenProgramadoHasta();
    if (hasta !== null && hasta !== undefined && hasta !== '') list = list.filter(item => item.programado <= Number(hasta));

    // Apply sorting
    const sortCol = this.progPrenSortCol();
    const sortDir = this.progPrenSortDir();
    if (sortCol) {
      list = [...list].sort((a: any, b: any) => {
        let valA = a[sortCol];
        let valB = b[sortCol];
        if (typeof valA === 'string') {
          return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        } else {
          return sortDir === 'asc' ? (valA - valB) : (valB - valA);
        }
      });
    }
    
    return list;
  });

  filteredOperacionPren = computed(() => {
    let list = this.operacionPren();
    
    const prensa = this.operPrenPrensa();
    if (prensa) list = list.filter(item => item.prensa.toLowerCase().includes(prensa.toLowerCase()));
    
    const status = this.operPrenStatus();
    if (status) list = list.filter(item => item.status.toLowerCase().includes(status.toLowerCase()));
    
    const turno = this.operPrenTurno();
    if (turno) list = list.filter(item => item.turno.toLowerCase().includes(turno.toLowerCase()));
    
    const producto = this.operPrenProducto();
    if (producto) list = list.filter(item => item.producto.toLowerCase().includes(producto.toLowerCase()));
    
    const operador = this.operPrenOperador();
    if (operador) list = list.filter(item => (item.operador || '').toLowerCase().includes(operador.toLowerCase()));
    
    const prodDesde = this.operPrenProducidoDesde();
    if (prodDesde !== null && prodDesde !== undefined && prodDesde !== '') list = list.filter(item => item.producido >= Number(prodDesde));
    
    const prodHasta = this.operPrenProducidoHasta();
    if (prodHasta !== null && prodHasta !== undefined && prodHasta !== '') list = list.filter(item => item.producido <= Number(prodHasta));
    
    const intDesde = this.operPrenInterrupcionDesde();
    if (intDesde !== null && intDesde !== undefined && intDesde !== '') list = list.filter(item => item.tiempoInterrupcion >= Number(intDesde));
    
    const intHasta = this.operPrenInterrupcionHasta();
    if (intHasta !== null && intHasta !== undefined && intHasta !== '') list = list.filter(item => item.tiempoInterrupcion <= Number(intHasta));

    // Apply sorting
    const sortCol = this.operPrenSortCol();
    const sortDir = this.operPrenSortDir();
    if (sortCol) {
      list = [...list].sort((a: any, b: any) => {
        let valA = a[sortCol];
        let valB = b[sortCol];
        if (typeof valA === 'string') {
          return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        } else if (typeof valA === 'boolean') {
          return sortDir === 'asc' ? (valA === valB ? 0 : valA ? 1 : -1) : (valA === valB ? 0 : valA ? -1 : 1);
        } else {
          return sortDir === 'asc' ? (valA - valB) : (valB - valA);
        }
      });
    }
    
    return list;
  });

  ngOnInit() { 
    this.loadExtrusion(); 
    this.loadPrensado();
    this.loadOperarios();
  }

  loadOperarios() {
    this.svc.getOperarios().subscribe(res => this.operariosDisponibles.set(res));
  }

  setTab(tab: 'extrusion' | 'prensado') {
    this.activeTab.set(tab);
    if (tab === 'extrusion') this.loadExtrusion();
    if (tab === 'prensado') this.loadPrensado();
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

  loadPrensado() {
    this.loading.set(true);
    this.svc.getPrensadoProgramacion().subscribe({
      next: res => this.programacionPren.set(res),
      error: ()  => this.loading.set(false)
    });

    this.svc.getPrensadoOperacion().subscribe({
      next: res => { 
        this.operacionPren.set(res); 
        this.loading.set(false); 
      },
      error: ()  => this.loading.set(false)
    });
  }

  openPrensadoEditModal(id: string) {
    this.svc.getPrensadoDetail(id).subscribe(res => {
      this.selectedPrensado.set(res);
      this.showPrensadoModal.set(true);
    });
  }

  expandedPrensadoRows = signal<Set<string>>(new Set<string>());

  togglePrensadoRow(id: string, event: Event) {
    event.stopPropagation();
    this.expandedPrensadoRows.update(set => {
      const newSet = new Set(set);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }

  isPrensadoRowExpanded(id: string): boolean {
    return this.expandedPrensadoRows().has(id);
  }

  getCarrerasForPrensado(item: any): any[] {
    if (item.producido > 300) {
      return [
        { bobina: "B-202605-A", reposoHr: 24, carreras: 3, enProceso: 1, terminadas: 2, validadas: 2, carretes: "C-01, C-02" },
        { bobina: "B-202605-B", reposoHr: 20, carreras: 2, enProceso: 0, terminadas: 2, validadas: 2, carretes: "C-03, C-04" }
      ];
    }
    return [];
  }

  closePrensadoModal() {
    this.showPrensadoModal.set(false);
    this.selectedPrensado.set(null);
  }

  onPressingDateChange(newDateStr: string) {
    if (!newDateStr || !this.selectedPrensado()) return;
    const current = new Date(this.selectedPrensado().fecha);
    const parts = newDateStr.split('-');
    current.setFullYear(Number(parts[0]));
    current.setMonth(Number(parts[1]) - 1);
    current.setDate(Number(parts[2]));
    this.selectedPrensado().fecha = current.toISOString();
  }

  savePrensado() {
    const p = this.selectedPrensado();
    if (!p) return;
    const body = {
      fecha: p.fecha,
      calibre: Number(p.calibre),
      ancho: p.ancho,
      longitud: Number(p.longitud),
      status: p.status,
      operarioId: p.operadorId || null,
      kgVirgen: Number(p.virgenKg || 0),
      target: Number(p.meta || 0),
      kgMolido: Number(p.molidoKg || 0),
      processStart: p.iniciaProceso || null,
      processEnd: p.finProceso || null,
      loteSilo: p.loteSilo || null
    };
    this.svc.updatePrensado(p.id, body).subscribe({
      next: () => {
        this.closePrensadoModal();
        this.loadPrensado();
      },
      error: err => {
        console.error('Error al guardar prensado:', err);
        alert('Error al guardar los cambios.');
      }
    });
  }

  deletePrensado(id: string) {
    this.activePReportPrensadoId(id);
  }

  activePReportPrensadoId(id: string) {
    this.activePrensadoId.set(id);
    this.showDeleteConfirmModalPrensado.set(true);
  }

  closeDeleteConfirmPrensado() {
    this.showDeleteConfirmModalPrensado.set(false);
    this.activePrensadoId.set(null);
  }

  confirmDeletePrensado() {
    const id = this.activePrensadoId();
    if (!id) return;
    this.svc.deletePrensado(id).subscribe({
      next: () => {
        this.closeDeleteConfirmPrensado();
        this.loadPrensado();
      },
      error: err => {
        console.error('Error al eliminar:', err);
        alert('Error al eliminar el registro.');
      }
    });
  }

  exportToExcel(tableType: 'extrusion' | 'prensado') {
    let data: any[] = [];
    let filename = '';
    
    if (tableType === 'extrusion') {
      const list = this.filteredOperacionExt();
      data = list.map(item => ({
        'Estado': item.status,
        'Extrusora': item.extrusora,
        'Turno': item.turno,
        'Producto': item.producto,
        'Operador': item.operador,
        'Producido (Kg)': item.producido,
        'Tiempo Interrupción (min)': item.tiempoInterrupcion,
        'En Curso': item.enCurso ? 'Sí' : 'No',
        'Extrusión ID': item.extrusionId
      }));
      filename = `Reporte_Extrusion_Operacion_${new Date().toISOString().split('T')[0]}.xlsx`;
    } else {
      const list = this.filteredOperacionPren();
      data = list.map(item => ({
        'Estado': item.status,
        'Prensa': item.prensa,
        'Turno': item.turno,
        'Producto': item.producto,
        'Operador': item.operador,
        'Producido (Kg)': item.producido,
        'Tiempo Interrupción (min)': item.tiempoInterrupcion,
        'En Curso': item.enCurso ? 'Sí' : 'No',
        'Prensa ID': item.id
      }));
      filename = `Reporte_Prensado_Operacion_${new Date().toISOString().split('T')[0]}.xlsx`;
    }

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Operacion');
    XLSX.writeFile(wb, filename);
  }

  exportToPDF(tableType: 'extrusion' | 'prensado') {
    const doc = new jsPDF({ orientation: 'landscape' });
    let title = '';
    let headers: string[][] = [];
    let rows: any[][] = [];
    
    if (tableType === 'extrusion') {
      title = 'Reporte de Extrusión - Operación';
      headers = [['Estado', 'Extrusora', 'Turno', 'Producto', 'Operador', 'Producido (Kg)', 'Tiempo Interrupción', 'En Curso', 'Extrusión ID']];
      rows = this.filteredOperacionExt().map(item => [
        item.status,
        item.extrusora,
        item.turno,
        item.producto,
        item.operador,
        item.producido,
        item.tiempoInterrupcion,
        item.enCurso ? 'Sí' : 'No',
        item.extrusionId
      ]);
    } else {
      title = 'Reporte de Prensado - Operación';
      headers = [['Estado', 'Prensa', 'Turno', 'Producto', 'Operador', 'Producido (Kg)', 'Tiempo Interrupción', 'En Curso', 'Prensa ID']];
      rows = this.filteredOperacionPren().map(item => [
        item.status,
        item.prensa,
        item.turno,
        item.producto,
        item.operador,
        item.producido,
        item.tiempoInterrupcion,
        item.enCurso ? 'Sí' : 'No',
        item.id.substring(0, 8)
      ]);
    }

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(26, 54, 93);
    doc.text(title, 14, 15);
    
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generado el: ${new Date().toLocaleString()}`, 14, 22);

    autoTable(doc, {
      head: headers,
      body: rows,
      startY: 26,
      theme: 'grid',
      styles: {
        fontSize: 9,
        cellPadding: 3,
        overflow: 'linebreak',
        halign: 'left'
      },
      headStyles: {
        fillColor: [26, 54, 93],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252]
      }
    });

    const filename = `${title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);
  }

  toggleSort(table: 'prog' | 'oper' | 'progPren' | 'operPren', column: string) {
    if (table === 'prog') {
      const dir = this.progExtSortCol() === column && this.progExtSortDir() === 'asc' ? 'desc' : 'asc';
      this.progExtSortCol.set(column);
      this.progExtSortDir.set(dir);
    } else if (table === 'oper') {
      const dir = this.operExtSortCol() === column && this.operExtSortDir() === 'asc' ? 'desc' : 'asc';
      this.operExtSortCol.set(column);
      this.operExtSortDir.set(dir);
    } else if (table === 'progPren') {
      const dir = this.progPrenSortCol() === column && this.progPrenSortDir() === 'asc' ? 'desc' : 'asc';
      this.progPrenSortCol.set(column);
      this.progPrenSortDir.set(dir);
    } else if (table === 'operPren') {
      const dir = this.operPrenSortCol() === column && this.operPrenSortDir() === 'asc' ? 'desc' : 'asc';
      this.operPrenSortCol.set(column);
      this.operPrenSortDir.set(dir);
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
    this.activeExtrusionId.set(id);
    this.showDeleteConfirmModal.set(true);
  }

  closeDeleteConfirm() {
    this.showDeleteConfirmModal.set(false);
    this.activeExtrusionId.set(null);
  }

  confirmDeleteExtrusion() {
    const id = this.activeExtrusionId();
    if (!id) return;
    
    this.svc.deleteExtrusion(id).subscribe({
      next: () => {
        this.closeDeleteConfirm();
        this.loadExtrusion();
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        alert('Error al eliminar el registro.');
      }
    });
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.activeDropdownId.set(null);
    this.activeMainRowDropdownId.set(null);
  }
}
