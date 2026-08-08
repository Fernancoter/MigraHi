import { Component, OnInit, HostListener, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduccionService, Extrusion } from '../../../core/services/produccion';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ProduccionConfigService } from '../../../core/services/produccion-config.service';

@Component({
  selector: 'app-extrusiones-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-fade-in">
      <div class="page-header-premium">
        <div class="title-section">
          <h1 class="premium-title">Extrusión</h1>
          <nav class="breadcrumb-modern">
            <span class="root">Extrusión</span>
            <span class="sep">&rsaquo;</span>
            <span class="root">Operación</span>
            <span class="sep">&rsaquo;</span>
            <span class="active">Extrusiones</span>
          </nav>
        </div>
      </div>

      <!-- VISTA LISTADO -->
      <div class="card-premium" *ngIf="viewState === 'list'">
        <div class="toolbar-premium">
          <div class="toolbar-left">
            <!-- Menú Desplegable Exportar -->
            <div class="export-dropdown-wrapper">
              <button class="btn-export-qa" (click)="toggleExportDropdown($event)" title="Exportar datos">
                📥 Exportar <span class="chevron-down-qa">▾</span>
              </button>
              <div class="export-popover-qa shadow-premium" *ngIf="showExportOptions" (click)="$event.stopPropagation()">
                <button class="export-item-qa" (click)="exportarExcel()">
                  <span class="export-icon">📊</span> Excel (CSV)
                </button>
                <button class="export-item-qa" (click)="exportarPDF()">
                  <span class="export-icon">📕</span> PDF
                </button>
              </div>
            </div>

            <button class="btn-premium" (click)="irAAgregar()">
              <span>Agregar</span>
            </button>
            <button class="btn-premium-secondary" (click)="exportarExcel()" title="Exportar rápido a Excel">
              <span>XLS</span>
            </button>

            <!-- Menú Desplegable Selecciona Columnas -->
            <div class="dropdown-wrapper">
              <button class="btn-premium-secondary" (click)="toggleColumnDropdown($event)">
                <span>Selecciona columnas</span>
                <span class="chevron-down">▾</span>
              </button>

              <div class="column-selector-popover" *ngIf="showColumnSelector" (click)="$event.stopPropagation()">
                <div class="popover-search">
                  <input type="text" placeholder="Buscar columna..." [(ngModel)]="colSearchTerm" (input)="onColSearch()" />
                </div>
                
                <div class="popover-sections">
                  <!-- Fijas a la izquierda -->
                  <div class="popover-section" *ngIf="!colSearchTerm || matchesSearch('Fijas a la izquierda')">
                    <div class="section-title">
                      <span class="chevron-down">▾</span> Fijas a la izquierda
                    </div>
                    <label class="popover-item disabled">
                      <input type="checkbox" checked disabled />
                      <span>(Ninguna)</span>
                    </label>
                  </div>

                  <!-- No fijas -->
                  <div class="popover-section">
                    <div class="section-title">
                      <span class="chevron-down">▾</span> No fijas
                    </div>
                    <div class="section-list">
                      <label class="popover-item" *ngIf="isColMatch('bobinas')">
                        <input type="checkbox" [(ngModel)]="tempVisibleCols.bobinas" />
                        <span>Bobinas</span>
                      </label>
                      <label class="popover-item" *ngIf="isColMatch('aditivos')">
                        <input type="checkbox" [(ngModel)]="tempVisibleCols.aditivos" />
                        <span>Paquete Aditivos</span>
                      </label>
                      <label class="popover-item" *ngIf="isColMatch('id')">
                        <input type="checkbox" [(ngModel)]="tempVisibleCols.id" />
                        <span>Id</span>
                      </label>
                      <label class="popover-item" *ngIf="isColMatch('extrusora')">
                        <input type="checkbox" [(ngModel)]="tempVisibleCols.extrusora" />
                        <span>Extrusora</span>
                      </label>
                      <label class="popover-item" *ngIf="isColMatch('turno')">
                        <input type="checkbox" [(ngModel)]="tempVisibleCols.turno" />
                        <span>Turno</span>
                      </label>
                      <label class="popover-item" *ngIf="isColMatch('producto')">
                        <input type="checkbox" [(ngModel)]="tempVisibleCols.producto" />
                        <span>Producto</span>
                      </label>
                      <label class="popover-item" *ngIf="isColMatch('tiempoInterrupcion')">
                        <input type="checkbox" [(ngModel)]="tempVisibleCols.tiempoInterrupcion" />
                        <span>Tiempo Interrupción (min)</span>
                      </label>
                      <label class="popover-item" *ngIf="isColMatch('fecha')">
                        <input type="checkbox" [(ngModel)]="tempVisibleCols.fecha" />
                        <span>Fecha</span>
                      </label>
                      <label class="popover-item" *ngIf="isColMatch('meta')">
                        <input type="checkbox" [(ngModel)]="tempVisibleCols.meta" />
                        <span>Meta</span>
                      </label>
                      <label class="popover-item" *ngIf="isColMatch('estado')">
                        <input type="checkbox" [(ngModel)]="tempVisibleCols.estado" />
                        <span>Estado</span>
                      </label>
                      <label class="popover-item" *ngIf="isColMatch('operador')">
                        <input type="checkbox" [(ngModel)]="tempVisibleCols.operador" />
                        <span>Operador Nombre</span>
                      </label>
                      <label class="popover-item" *ngIf="isColMatch('iniciaProceso')">
                        <input type="checkbox" [(ngModel)]="tempVisibleCols.iniciaProceso" />
                        <span>Inicia Proceso</span>
                      </label>
                      <label class="popover-item" *ngIf="isColMatch('finProceso')">
                        <input type="checkbox" [(ngModel)]="tempVisibleCols.finProceso" />
                        <span>Fin Proceso</span>
                      </label>
                    </div>
                  </div>

                  <!-- Fijas a la derecha -->
                  <div class="popover-section" *ngIf="!colSearchTerm || matchesSearch('Fijas a la derecha')">
                    <div class="section-title">
                      <span class="chevron-down">▾</span> Fijas a la derecha
                    </div>
                    <label class="popover-item disabled">
                      <input type="checkbox" checked disabled />
                      <span>(Ninguna)</span>
                    </label>
                  </div>
                </div>

                <div class="popover-footer">
                  <button class="btn-popover-reset" (click)="resetColumns()" title="Restablecer">
                    <span class="reset-icon">⟲</span>
                  </button>
                  <button class="btn-popover-apply" (click)="applyColumns()">Actualizar</button>
                </div>
              </div>
            </div>
          </div>
          <div class="toolbar-right">
            <div class="filter-search-group-qa">
              <!-- Botón Filtro Avanzado -->
              <div class="dropdown-wrapper">
                <button class="btn-filter-funnel-qa" (click)="$event.stopPropagation(); toggleFilterMenu($event)" title="Filtros avanzados">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>
                  <span class="chevron-down-funnel">▾</span>
                </button>
                
                <!-- Filter Dropdown -->
                <div *ngIf="isFilterMenuOpen" style="position: absolute; top: 100%; right: 0; background: white; border: 1px solid #e2e8f0; border-radius: 4px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); z-index: 99999; width: 210px; padding: 0.5rem;" (click)="$event.stopPropagation()">
                  <button (click)="clearFilters(); $event.stopPropagation()" style="display: block; width: 100%; text-align: left; padding: 0.5rem; border: none; background: none; cursor: pointer; color: #334155; font-size: 0.85rem;">Limpiar Filtros</button>
                  <button (click)="saveFilter(); $event.stopPropagation()" style="display: block; width: 100%; text-align: left; padding: 0.5rem; border: none; background: none; cursor: pointer; color: #334155; font-size: 0.85rem;">Guardar Filtro como...</button>
                  <div *ngIf="savedFilters.length > 0">
                    <div style="height: 1px; background: #e2e8f0; margin: 0.5rem 0;"></div>
                    <div style="font-size: 0.7rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; padding: 0.25rem 0.5rem;">Filtros Guardados</div>
                    <div *ngFor="let f of savedFilters" (click)="loadSavedFilter(f); $event.stopPropagation()" style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; font-size: 0.85rem; color: #334155; cursor: pointer;">
                      <span>📁 {{ f.name }}</span>
                      <span (click)="deleteSavedFilter(f, $event); $event.stopPropagation()" style="cursor: pointer; opacity: 0.6; padding: 2px;">🗑️</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Campo de Búsqueda Subrayado -->
              <div class="search-modern-underline-qa">
                <input type="text" placeholder="Buscar..." [(ngModel)]="searchTerm" (input)="onSearch()">
              </div>
            </div>
          </div>
        </div>

        <div class="table-modern-container">
          <table class="table-modern">
            <thead>
              <tr>
                <th class="actions-col-1"></th>
                <th *ngIf="visibleCols.bobinas">Bobinas &nbsp;▾</th>
                <th *ngIf="visibleCols.aditivos">Paquete Aditivos &nbsp;▾</th>
                <th *ngIf="visibleCols.tiempoInterrupcion"></th>
                <th *ngIf="visibleCols.id">Id &nbsp;▾</th>
                <th *ngIf="visibleCols.extrusora">Extrusora &nbsp;↑</th>
                <th *ngIf="visibleCols.turno">Turno &nbsp;▾</th>
                <th *ngIf="visibleCols.producto">Producto &nbsp;▾</th>
                <th *ngIf="visibleCols.tiempoInterrupcion">Tiempo Interrupción (min) &nbsp;▾</th>
                <th *ngIf="visibleCols.fecha">Fecha &nbsp;▾</th>
                <th *ngIf="visibleCols.meta">Meta &nbsp;▾</th>
                <th *ngIf="visibleCols.estado">Estado &nbsp;▾</th>
                <th *ngIf="visibleCols.operador">Operador Nombre &nbsp;▾</th>
                <th *ngIf="visibleCols.iniciaProceso">Inicia Proceso &nbsp;▾</th>
                <th *ngIf="visibleCols.finProceso">Fin Proceso &nbsp;▾</th>
              </tr>
            </thead>
            <tbody>
              <ng-container *ngFor="let ex of filteredItems; let idx = index">
                <tr [style.background-color]="expandedExtrusionId === ex.id ? '#dcfce7' : ''">
                  <td class="actions-cell-1">
                    <span class="info-circle-btn green" (click)="ver(ex)" title="Información">i</span>
                    <span class="print-btn" (click)="imprimir(ex)" title="Imprimir">🖨️</span>
                    <button class="btn-premium-secondary" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;" (click)="irAModificar(ex)">Modificar</button>
                    <button class="btn-premium-danger ml-2" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;" (click)="eliminar(ex)">Eliminar</button>
                    <button class="btn-premium-secondary ml-2" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;" (click)="ver(ex)">Visualizar</button>
                  </td>
                  <td *ngIf="visibleCols.bobinas" class="text-right">
                    <button class="btn-premium-secondary" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;" (click)="ver(ex)">{{ ex.totalBobinas || 0 }}</button>
                  </td>
                  <td *ngIf="visibleCols.aditivos" class="aditivos-cell">
                    {{ ex.lotePaqueteAditivos || '' }}
                  </td>
                  <td *ngIf="visibleCols.tiempoInterrupcion">
                    <button class="btn-premium-secondary" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;" *ngIf="ex.tiempoInterrupcion" (click)="verInterrupciones(ex)">
                      Detalle Interrupción
                    </button>
                  </td>
                  <td *ngIf="visibleCols.id" class="id-cell"><strong>{{ ex.extrusionIdLegacy || getShortId(ex.id, idx) }}</strong></td>
                  <td *ngIf="visibleCols.extrusora" class="extrusora-name" style="color: #10b981; font-weight: 700;">{{ ex.extrusora?.nombre || '' }}</td>
                  <td *ngIf="visibleCols.turno">{{ ex.turno?.nombre || '1er Turno' }}</td>
                  <td *ngIf="visibleCols.producto">{{ ex.producto?.nombre || ex.productoNombre || '' }}</td>
                  <td *ngIf="visibleCols.tiempoInterrupcion" class="text-right">{{ ex.tiempoInterrupcion || 0 }}</td>
                  <td *ngIf="visibleCols.fecha">{{ ex.fechaInicio | date:'dd/MM/yy HH:mm' }}</td>
                  <td *ngIf="visibleCols.meta" class="text-right">{{ ex.metaKg || 0 | number:'1.0-0' }}</td>
                  <td *ngIf="visibleCols.estado">
                    <span class="badge-status" [ngClass]="getStatusClass(ex.estado)">
                      {{ getEstadoLabel(ex.estado) }}
                    </span>
                  </td>
                  <td *ngIf="visibleCols.operador" class="operator-name">{{ ex.operario?.nombreCompleto || 'LUIS CESAR OROPEZA ORTEGA' | uppercase }}</td>
                  <td *ngIf="visibleCols.iniciaProceso">{{ (ex.iniciaProceso || ex.fechaInicio) | date:'dd/MM/yy' }} {{ (ex.iniciaProceso || ex.fechaInicio) | date:'HH:mm' }}</td>
                  <td *ngIf="visibleCols.finProceso">{{ (ex.finProceso || ex.fechaFin) ? ((ex.finProceso || ex.fechaFin) | date:'dd/MM/yy') : '' }} {{ (ex.finProceso || ex.fechaFin) ? ((ex.finProceso || ex.fechaFin) | date:'HH:mm') : '' }}</td>
                </tr>

                <!-- FILA DE DETALLE DE BOBINAS INLINE -->
                <tr *ngIf="expandedExtrusionId === ex.id && extrusionSeleccionada" style="background-color: white;">
                  <td colspan="100" style="padding: 1.5rem 2rem; border-bottom: 2px solid #cbd5e1;">
                    <!-- Barra de Acciones del Detalle de Bobinas -->
                    <div class="toolbar-premium" style="padding: 0.5rem 0; border-bottom: none; background: transparent;">
                      <div class="toolbar-left">
                        <!-- Menú Desplegable Exportar -->
                        <div class="export-dropdown-wrapper">
                          <button class="btn-export-qa" (click)="toggleExportDropdownBobina($event)" title="Exportar datos">
                            📥 Exportar <span class="chevron-down-qa">▾</span>
                          </button>
                          <div class="export-popover-qa shadow-premium" *ngIf="showExportOptionsBobina" (click)="$event.stopPropagation()">
                            <button class="export-item-qa" (click)="exportarBobinasExcel()">
                              <span class="export-icon">📊</span> Excel (CSV)
                            </button>
                            <button class="export-item-qa" (click)="exportarBobinasPDF()">
                              <span class="export-icon">📕</span> PDF
                            </button>
                          </div>
                        </div>

                        <!-- Menú Desplegable Selecciona Columnas -->
                        <div class="dropdown-wrapper">
                          <button class="btn-premium-secondary" (click)="toggleColumnDropdownBobina($event)">
                            <span>Selecciona columnas</span>
                            <span class="chevron-down">▾</span>
                          </button>

                          <div class="column-selector-popover" *ngIf="showBobinaColumnSelector" (click)="$event.stopPropagation()">
                            <div class="popover-search">
                              <input type="text" placeholder="Buscar columna..." [(ngModel)]="bobinaColSearchTerm" />
                            </div>
                            
                            <div class="popover-sections">
                              <!-- Fijas a la izquierda -->
                              <div class="popover-section" *ngIf="!bobinaColSearchTerm || matchesSearch('Fijas a la izquierda')">
                                <div class="section-title">
                                  <span class="chevron-down">▾</span> Fijas a la izquierda
                                </div>
                                <label class="popover-item disabled">
                                  <input type="checkbox" checked disabled />
                                  <span>(Ninguna)</span>
                                </label>
                              </div>

                              <!-- No fijas -->
                              <div class="popover-section">
                                <div class="section-title">
                                  <span class="chevron-down">▾</span> No fijas
                                </div>
                                <div class="section-list">
                                  <label class="popover-item" *ngIf="isBobinaColMatch('extrusionId')">
                                    <input type="checkbox" [(ngModel)]="tempVisibleBobinaCols.extrusionId" />
                                    <span>Extrusión ID</span>
                                  </label>
                                  <label class="popover-item" *ngIf="isBobinaColMatch('bobinaOrigen')">
                                    <input type="checkbox" [(ngModel)]="tempVisibleBobinaCols.bobinaOrigen" />
                                    <span>Bobina Origen</span>
                                  </label>
                                  <label class="popover-item" *ngIf="isBobinaColMatch('horaInicio')">
                                    <input type="checkbox" [(ngModel)]="tempVisibleBobinaCols.horaInicio" />
                                    <span>Bobina Hora Inicio</span>
                                  </label>
                                  <label class="popover-item" *ngIf="isBobinaColMatch('horaSalida')">
                                    <input type="checkbox" [(ngModel)]="tempVisibleBobinaCols.horaSalida" />
                                    <span>Bobina Hora Salida</span>
                                  </label>
                                  <label class="popover-item" *ngIf="isBobinaColMatch('bobinaNo')">
                                    <input type="checkbox" [(ngModel)]="tempVisibleBobinaCols.bobinaNo" />
                                    <span>Bobina No</span>
                                  </label>
                                  <label class="popover-item" *ngIf="isBobinaColMatch('bobinaNoSerie')">
                                    <input type="checkbox" [(ngModel)]="tempVisibleBobinaCols.bobinaNoSerie" />
                                    <span>Bobina No Serie</span>
                                  </label>
                                  <label class="popover-item" *ngIf="isBobinaColMatch('bobinaKg')">
                                    <input type="checkbox" [(ngModel)]="tempVisibleBobinaCols.bobinaKg" />
                                    <span>Bobina Kg</span>
                                  </label>
                                  <label class="popover-item" *ngIf="isBobinaColMatch('bobinaMermaKg')">
                                    <input type="checkbox" [(ngModel)]="tempVisibleBobinaCols.bobinaMermaKg" />
                                    <span>Bobina Merma Kg</span>
                                  </label>
                                  <label class="popover-item" *ngIf="isBobinaColMatch('bobinaEspesor')">
                                    <input type="checkbox" [(ngModel)]="tempVisibleBobinaCols.bobinaEspesor" />
                                    <span>Bobina Espesor</span>
                                  </label>
                                  <label class="popover-item" *ngIf="isBobinaColMatch('bobinaObservaciones')">
                                    <input type="checkbox" [(ngModel)]="tempVisibleBobinaCols.bobinaObservaciones" />
                                    <span>Bobina Observaciones</span>
                                  </label>
                                  <label class="popover-item" *ngIf="isBobinaColMatch('bobinaMotivoMolino')">
                                    <input type="checkbox" [(ngModel)]="tempVisibleBobinaCols.bobinaMotivoMolino" />
                                    <span>Bobina Motivo Molino</span>
                                  </label>
                                  <label class="popover-item" *ngIf="isBobinaColMatch('bobinaProductoNombre')">
                                    <input type="checkbox" [(ngModel)]="tempVisibleBobinaCols.bobinaProductoNombre" />
                                    <span>Bobina Producto Nombre</span>
                                  </label>
                                  <label class="popover-item" *ngIf="isBobinaColMatch('bobinaCarreras')">
                                    <input type="checkbox" [(ngModel)]="tempVisibleBobinaCols.bobinaCarreras" />
                                    <span>Bobina Carreras</span>
                                  </label>
                                  <label class="popover-item" *ngIf="isBobinaColMatch('bobinaIniciaReposo')">
                                    <input type="checkbox" [(ngModel)]="tempVisibleBobinaCols.bobinaIniciaReposo" />
                                    <span>Bobina Inicia Reposo</span>
                                  </label>
                                  <label class="popover-item" *ngIf="isBobinaColMatch('bobinaMinutosEnReposo')">
                                    <input type="checkbox" [(ngModel)]="tempVisibleBobinaCols.bobinaMinutosEnReposo" />
                                    <span>Bobina Minutos En Reposo</span>
                                  </label>
                                  <label class="popover-item" *ngIf="isBobinaColMatch('bobinaMolino')">
                                    <input type="checkbox" [(ngModel)]="tempVisibleBobinaCols.bobinaMolino" />
                                    <span>Bobina Molino</span>
                                  </label>
                                </div>
                              </div>

                              <!-- Fijas a la derecha -->
                              <div class="popover-section" *ngIf="!bobinaColSearchTerm || matchesSearch('Fijas a la derecha')">
                                <div class="section-title">
                                  <span class="chevron-down">▾</span> Fijas a la derecha
                                </div>
                                <label class="popover-item disabled">
                                  <input type="checkbox" checked disabled />
                                  <span>(Ninguna)</span>
                                </label>
                              </div>
                            </div>

                            <div class="popover-footer">
                              <button class="btn-popover-reset" (click)="resetBobinaColumns()" title="Restablecer">
                                <span class="reset-icon">⟲</span>
                              </button>
                              <button class="btn-popover-apply" (click)="applyBobinaColumns()">Actualizar</button>
                            </div>
                          </div>
                        </div>

                        <button class="btn-premium" (click)="agregarBobinaManual()">
                          <span>Agregar Manual</span>
                        </button>
                      </div>
                    </div>

                    <!-- Tabla de Bobinas -->
                    <div class="table-modern-container" style="margin-top: 0.5rem; border: 1px solid #cbd5e1; border-radius: 8px;">
                      <table class="table-modern">
                        <thead>
                          <tr>
                            <th class="actions-col-1"></th>
                            <th *ngIf="visibleBobinaCols.extrusionId">Extrusión ID &nbsp;▾</th>
                            <th *ngIf="visibleBobinaCols.bobinaOrigen">Bobina Origen &nbsp;▾</th>
                            <th *ngIf="visibleBobinaCols.horaInicio">Bobina Hora Inicio &nbsp;▾</th>
                            <th *ngIf="visibleBobinaCols.horaSalida">Bobina Hora Salida &nbsp;▾</th>
                            <th *ngIf="visibleBobinaCols.bobinaNo">Bobina No &nbsp;▾</th>
                            <th *ngIf="visibleBobinaCols.bobinaNoSerie">Bobina No Serie &nbsp;▾</th>
                            <th *ngIf="visibleBobinaCols.bobinaKg">Bobina Kg &nbsp;▾</th>
                            <th *ngIf="visibleBobinaCols.bobinaMermaKg">Bobina Merma Kg &nbsp;▾</th>
                            <th *ngIf="visibleBobinaCols.bobinaEspesor">Bobina Espesor &nbsp;▾</th>
                            <th *ngIf="visibleBobinaCols.bobinaObservaciones">Bobina Observaciones &nbsp;▾</th>
                            <th *ngIf="visibleBobinaCols.bobinaMotivoMolino">Bobina Motivo Molino &nbsp;▾</th>
                            <th *ngIf="visibleBobinaCols.bobinaProductoNombre">Bobina Producto Nombre &nbsp;▾</th>
                            <th *ngIf="visibleBobinaCols.bobinaCarreras">Bobina Carreras &nbsp;▾</th>
                            <th *ngIf="visibleBobinaCols.bobinaIniciaReposo">Bobina Inicia Reposo &nbsp;▾</th>
                            <th *ngIf="visibleBobinaCols.bobinaMinutosEnReposo">Bobina Minutos En Reposo &nbsp;▾</th>
                            <th *ngIf="visibleBobinaCols.bobinaMolino">Bobina Molino &nbsp;▾</th>
                            <th *ngIf="visibleBobinaCols.bobinaEtiqueta">Bobina Etiqueta &nbsp;▾</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr *ngFor="let b of extrusionSeleccionada.bobinas; let idx = index" style="background-color: white;">
                            <td class="actions-cell-1">
                              <!-- Badge Molino si es scrapKg > 0 o b.mill -->
                              <span class="badge-molino-red" style="background: #ef4444; color: white; padding: 0.2rem 0.4rem; border-radius: 4px; font-size: 0.75rem; font-weight: 700; margin-right: 0.25rem;" *ngIf="b.scrapKg > 0 || b.mill">Molino</span>
                              <span class="pencil-edit-btn" style="cursor: pointer;" title="Modificar">✏️</span>
                              <span class="cross-delete-btn" style="cursor: pointer; margin-left: 0.25rem;" (click)="eliminarBobina(b)" title="Eliminar">❌</span>
                            </td>
                            <td *ngIf="visibleBobinaCols.extrusionId">{{ extrusionSeleccionada.extrusionIdLegacy || getShortId(extrusionSeleccionada.id, 0) }}</td>
                            <td *ngIf="visibleBobinaCols.bobinaOrigen">{{ b.station || b.bobinaOrigen || 'A' }}</td>
                            <td *ngIf="visibleBobinaCols.horaInicio">{{ b.horaInicio | date:'dd/MM/yyyy HH:mm' }}</td>
                            <td *ngIf="visibleBobinaCols.horaSalida">{{ b.horaSalida | date:'dd/MM/yyyy HH:mm' }}</td>
                            <td *ngIf="visibleBobinaCols.bobinaNo" class="text-right">{{ b.bobbinNo }}</td>
                            <td *ngIf="visibleBobinaCols.bobinaNoSerie">{{ b.serialNo }}</td>
                            <td *ngIf="visibleBobinaCols.bobinaKg" class="text-right">{{ b.kg | number:'1.2-2' }}</td>
                            <td *ngIf="visibleBobinaCols.bobinaMermaKg" class="text-right">{{ b.scrapKg | number:'1.2-2' }}</td>
                            <td *ngIf="visibleBobinaCols.bobinaEspesor" class="text-right">{{ b.thickness | number:'1.2-2' }}</td>
                            <td *ngIf="visibleBobinaCols.bobinaObservaciones">{{ b.observations || '' }}</td>
                            <td *ngIf="visibleBobinaCols.bobinaMotivoMolino">{{ b.millReason || 'N/A' }}</td>
                            <td *ngIf="visibleBobinaCols.bobinaProductoNombre">{{ b.productName || extrusionSeleccionada.producto?.nombre || '' }}</td>
                            <td *ngIf="visibleBobinaCols.bobinaCarreras" class="text-right">{{ b.carreras || 0 }}</td>
                            <td *ngIf="visibleBobinaCols.bobinaIniciaReposo">{{ b.iniciaReposo | date:'dd/MM/yyyy HH:mm' }}</td>
                            <td *ngIf="visibleBobinaCols.bobinaMinutosEnReposo" class="text-right">{{ b.restMinutes || 0 }}</td>
                            <td *ngIf="visibleBobinaCols.bobinaMolino" class="text-center">
                              <input type="checkbox" [checked]="b.scrapKg > 0 || b.mill" disabled />
                            </td>
                            <td *ngIf="visibleBobinaCols.bobinaEtiqueta"></td>
                          </tr>
                          <tr *ngIf="!extrusionSeleccionada.bobinas || extrusionSeleccionada.bobinas.length === 0">
                            <td colspan="18" class="empty-row-premium">No hay bobinas registradas en esta orden.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div class="pagination-container-premium" style="padding: 0.5rem 0; border-top: none; background: transparent;">
                      <span class="pagination-info">Página 1 de 1</span>
                      <div class="pagination-controls">
                        <button class="btn-page" [disabled]="true">Ant</button>
                        <button class="btn-page active">1</button>
                        <button class="btn-page" [disabled]="true">Sig</button>
                      </div>
                    </div>
                  </td>
                </tr>
              </ng-container>
            </tbody>
          </table>
        </div>

        <!-- Paginación -->
        <div class="pagination-container-premium">
          <span class="pagination-info">Página 1 de 1</span>
          <div class="pagination-controls">
            <button class="btn-page" [disabled]="true">Ant</button>
            <button class="btn-page active">1</button>
            <button class="btn-page" [disabled]="true">Sig</button>
          </div>
        </div>
      </div>

      <!-- FORMULARIO AGREGAR / EDITAR -->
      <div class="card-premium pad-form" *ngIf="viewState === 'add' || viewState === 'edit'">
        <div class="toolbar-premium">
          <div class="toolbar-left">
            <span class="subtitle-text">Información General</span>
          </div>
        </div>

        <div style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
          <div class="premium-form-grid">
            <!-- Campo Extrusora (Dropdown en Agregar, Fijo en Editar) -->
            <div class="form-group-premium">
              <label>Extrusora</label>
              <select *ngIf="viewState === 'add'" [(ngModel)]="editForm.extrusoraId" class="input-premium">
                <option value="">-- Selecciona --</option>
                <option *ngFor="let ex of catalogos.extrusoras" [value]="ex.id">{{ ex.nombre }}</option>
              </select>
              <div *ngIf="viewState === 'edit'" class="readonly-text" style="padding: 0.6rem 0.85rem; background: #f1f5f9; border-radius: 8px; font-weight: 600;">
                {{ getExtrusoraName(editForm.extrusoraId) }}
              </div>
            </div>

            <!-- Campo Turno (Dropdown en Agregar, Fijo en Editar) -->
            <div class="form-group-premium">
              <label>Turno</label>
              <select *ngIf="viewState === 'add'" [(ngModel)]="editForm.turnoId" class="input-premium">
                <option value="">-- Selecciona --</option>
                <option *ngFor="let t of catalogos.turnos" [value]="t.id">{{ t.nombre }}</option>
              </select>
              <div *ngIf="viewState === 'edit'" class="readonly-text" style="padding: 0.6rem 0.85rem; background: #f1f5f9; border-radius: 8px; font-weight: 600;">
                {{ getTurnoName(editForm.turnoId) }}
              </div>
            </div>

            <!-- Campo Producto (Dropdown en Agregar, Fijo en Editar) -->
            <div class="form-group-premium">
              <label>Producto Nombre</label>
              <select *ngIf="viewState === 'add'" [(ngModel)]="editForm.productoId" class="input-premium">
                <option value="">-- Selecciona --</option>
                <option *ngFor="let p of catalogos.productos" [value]="p.id">{{ p.nombre }}</option>
              </select>
              <div *ngIf="viewState === 'edit'" class="readonly-text" style="padding: 0.6rem 0.85rem; background: #f1f5f9; border-radius: 8px; font-weight: 600;">
                {{ getProductoName(editForm.productoId) }}
              </div>
            </div>

            <!-- Campo Operario -->
            <div class="form-group-premium">
              <label>Operador</label>
              <select [(ngModel)]="editForm.operarioId" class="input-premium">
                <option value="">-- Selecciona --</option>
                <option *ngFor="let o of catalogos.operarios" [value]="o.id">{{ o.nombreCompleto | uppercase }}</option>
              </select>
            </div>

            <!-- Campo Fecha -->
            <div class="form-group-premium">
              <label>Fecha</label>
              <input type="datetime-local" [(ngModel)]="editForm.fecha" class="input-premium" />
            </div>

            <!-- Calibre -->
            <div class="form-group-premium">
              <label>Calibre (mm)</label>
              <input type="number" [(ngModel)]="editForm.calibre" class="input-premium" step="0.001" />
            </div>

            <!-- Ancho -->
            <div class="form-group-premium">
              <label>Ancho (mm)</label>
              <input type="number" [(ngModel)]="editForm.ancho" class="input-premium" />
            </div>

            <!-- Longitud -->
            <div class="form-group-premium">
              <label>Longitud (m)</label>
              <input type="number" [(ngModel)]="editForm.longitud" class="input-premium" />
            </div>

            <!-- Virgen Kg -->
            <div class="form-group-premium">
              <label>Virgen Kg</label>
              <input type="number" [(ngModel)]="editForm.virgenKg" class="input-premium" />
            </div>

            <!-- Meta -->
            <div class="form-group-premium">
              <label>Meta (Kg)</label>
              <input type="number" [(ngModel)]="editForm.metaKg" class="input-premium" />
            </div>

            <!-- Molido Kg -->
            <div class="form-group-premium">
              <label>Molido Kg</label>
              <input type="number" [(ngModel)]="editForm.molidoKg" class="input-premium" />
            </div>

            <!-- Estado -->
            <div class="form-group-premium">
              <label>Estado</label>
              <select [(ngModel)]="editForm.estado" class="input-premium">
                <option [value]="1">Programada</option>
                <option [value]="2">En Proceso</option>
                <option [value]="3">Finalizada</option>
                <option [value]="4">Anticipada</option>
                <option [value]="5">Cancelada</option>
              </select>
            </div>

            <!-- Inicia Proceso -->
            <div class="form-group-premium">
              <label>Inicia Proceso</label>
              <input type="datetime-local" [(ngModel)]="editForm.processStart" class="input-premium" />
            </div>

            <!-- Fin Proceso -->
            <div class="form-group-premium">
              <label>Fin Proceso</label>
              <input type="datetime-local" [(ngModel)]="editForm.processEnd" class="input-premium" />
            </div>

            <!-- Lote Silo -->
            <div class="form-group-premium">
              <label>Lote Silo</label>
              <input type="text" [(ngModel)]="editForm.loteSilo" class="input-premium" />
            </div>

            <!-- Lote Aditivos -->
            <div class="form-group-premium">
              <label>Lote Aditivos</label>
              <input type="text" [(ngModel)]="editForm.lotePaqueteAditivos" class="input-premium" />
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem; padding: 0 1.5rem 1.5rem 1.5rem;">
          <button class="btn-premium" (click)="guardarCambios()" [disabled]="saving">
            {{ saving ? 'CONFIRMANDO...' : 'CONFIRMAR' }}
          </button>
    <!-- MODAL DE VISUALIZACIÓN (VER DETALLE) -->
    <div class="modal-overlay-premium" *ngIf="mostrarModalVer">
      <div class="modal-card-premium animate-scale-in" style="max-width: 850px;">
        <div class="modal-header-premium">
          <h3><span>🔍</span> Detalle de Extrusión</h3>
          <button class="btn-icon-premium" (click)="cerrarModales()">✖️</button>
        </div>
        <div class="modal-body-premium" *ngIf="extrusionSeleccionada">
          <div class="info-grid-legacy">
            <div class="info-item-legacy"><strong>ID Legacy:</strong> {{ extrusionSeleccionada.extrusionIdLegacy }}</div>
            <div class="info-item-legacy"><strong>Extrusora:</strong> {{ extrusionSeleccionada.extrusora }}</div>
            <div class="info-item-legacy"><strong>Turno:</strong> {{ extrusionSeleccionada.turno }}</div>
            <div class="info-item-legacy"><strong>Operador:</strong> {{ extrusionSeleccionada.operador }}</div>
            <div class="info-item-legacy"><strong>Producto:</strong> {{ extrusionSeleccionada.producto?.nombre || extrusionSeleccionada.producto || '' }}</div>
            <div class="info-item-legacy"><strong>Calibre:</strong> {{ extrusionSeleccionada.calibre }} mm</div>
            <div class="info-item-legacy"><strong>Ancho:</strong> {{ extrusionSeleccionada.ancho }} mm</div>
            <div class="info-item-legacy"><strong>Longitud:</strong> {{ extrusionSeleccionada.longitud }} m</div>
            <div class="info-item-legacy"><strong>Meta:</strong> {{ extrusionSeleccionada.target }} Kg</div>
            <div class="info-item-legacy"><strong>Kg Virgen:</strong> {{ extrusionSeleccionada.kgVirgen }} Kg</div>
            <div class="info-item-legacy"><strong>Kg Molido:</strong> {{ extrusionSeleccionada.kgMolido }} Kg</div>
            <div class="info-item-legacy"><strong>Lote Silo:</strong> {{ extrusionSeleccionada.loteSilo }}</div>
            <div class="info-item-legacy"><strong>Lote Aditivos:</strong> {{ extrusionSeleccionada.lotePaqueteAditivos }}</div>
            <div class="info-item-legacy"><strong>Fecha Programada:</strong> {{ extrusionSeleccionada.fecha | date:'dd/MM/yy' }}</div>
            <div class="info-item-legacy"><strong>Inicia Proceso:</strong> {{ extrusionSeleccionada.processStart | date:'dd/MM/yy HH:mm' }}</div>
            <div class="info-item-legacy"><strong>Fin Proceso:</strong> {{ extrusionSeleccionada.processEnd | date:'dd/MM/yy HH:mm' }}</div>
            <div class="info-item-legacy"><strong>Estado:</strong> {{ getEstadoLabelByVal(extrusionSeleccionada.estado) }}</div>
          </div>

          <div class="table-modern-container" style="margin-top: 1.5rem;">
            <h4 class="subtitle-text">Bobinas Producidas ({{ extrusionSeleccionada.bobinas?.length || 0 }})</h4>
            <table class="table-modern">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Estación</th>
                  <th>No. Serie</th>
                  <th class="text-right">Peso (Kg)</th>
                  <th class="text-right">Merma (Kg)</th>
                  <th>Calibre</th>
                  <th>Estado</th>
                  <th>Observaciones</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let b of extrusionSeleccionada.bobinas">
                  <td>{{ b.bobbinNo }}</td>
                  <td><span class="station-badge" [class.a]="b.station === 'A'">{{ b.station }}</span></td>
                  <td>{{ b.serialNo }}</td>
                  <td class="text-right">{{ b.kg }}</td>
                  <td class="text-right">{{ b.scrapKg }}</td>
                  <td>{{ b.thickness }}</td>
                  <td>{{ getEstadoBobinaName(b.mill ? 6 : b.restStart ? 2 : 1) }}</td>
                  <td>{{ b.observations }}</td>
                </tr>
                <tr *ngIf="!extrusionSeleccionada.bobinas || extrusionSeleccionada.bobinas.length === 0">
                  <td colspan="8" class="empty-row-premium">No hay bobinas registradas en esta orden.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL DE DETALLE DE INTERRUPCIÓN (WCDetalle Interrupcion) -->
    <div class="modal-overlay-premium" *ngIf="mostrarModalInterrupciones">
      <div class="modal-card-premium animate-scale-in" style="max-width: 950px;">
        <div class="modal-header-premium">
          <h3><span>⏳</span> WCDetalle Interrupcion</h3>
          <button class="btn-icon-premium" (click)="cerrarInterrupciones()">✖️</button>
        </div>
        <div class="modal-body-premium" style="display: flex; flex-direction: column; gap: 1rem;" *ngIf="extrusionSeleccionada">
          
          <!-- Barra de Búsqueda Superior -->
          <div style="display: flex; justify-content: flex-end; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
            <div class="search-modern-underline">
              <input type="text" placeholder="Buscar..." [(ngModel)]="searchTermInterrupcion" (input)="pageInterrupcion = 1" style="width: 200px;" />
            </div>
          </div>
          
          <!-- Tabla de Interrupciones -->
          <div class="table-modern-container">
            <table class="table-modern">
              <thead>
                <tr>
                  <th>Extrusión</th>
                  <th>Motivo de Interrupción</th>
                  <th>Down Time Code Id</th>
                  <th>Down Time Code Name</th>
                  <th>Hora Inicio</th>
                  <th>Hora Fin</th>
                  <th class="text-center">Interrupción Concluida</th>
                  <th class="text-right">Tiempo</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let i of getPaginatedInterrupciones()">
                  <td>{{ extrusionSeleccionada.extrusionIdLegacy || getShortId(extrusionSeleccionada.id, 0) }}</td>
                  <td>{{ i.descripcion || '' }}</td>
                  <td>{{ parseCausa(i.causa).id }}</td>
                  <td>{{ parseCausa(i.causa).name }}</td>
                  <td>{{ i.horaInicio | date:'dd/MM/yy HH:mm' }}</td>
                  <td>{{ i.horaFin ? (i.horaFin | date:'dd/MM/yy HH:mm') : '' }}</td>
                  <td class="text-center">
                    <input type="checkbox" [checked]="i.concluida" disabled />
                  </td>
                  <td class="text-right" style="font-weight: 600;">{{ getDuracionSegundos(i.duracion) }}s</td>
                </tr>
                <tr *ngIf="getFilteredInterrupciones().length === 0">
                  <td colspan="8" class="empty-row-premium">No se encontraron interrupciones.</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Paginador del Modal -->
          <div class="pagination-container-premium" style="padding: 0.5rem 0; border-top: none; background: transparent; display: flex; justify-content: space-between; align-items: center;">
            <span class="pagination-info">
              Página {{ pageInterrupcion }} de {{ getMaxPagesInterrupcion() }}
            </span>
            <div class="pagination-controls">
              <button class="btn-page" [disabled]="pageInterrupcion === 1" (click)="pageInterrupcion = pageInterrupcion - 1">Ant</button>
              <button class="btn-page active">{{ pageInterrupcion }}</button>
              <button class="btn-page" [disabled]="pageInterrupcion >= getMaxPagesInterrupcion()" (click)="pageInterrupcion = pageInterrupcion + 1">Sig</button>
            </div>
          </div>
          
        </div>
      </div>
    </div>

    <!-- MODAL DE AGREGAR BOBINAS MANUALMENTE -->
    <div class="modal-overlay-premium" *ngIf="mostrarModalAgregarBobinas">
      <div class="modal-card-premium animate-scale-in" style="max-width: 480px;">
        <div class="modal-header-premium">
          <h3><span>🏷️</span> Agregar Bobinas</h3>
          <button class="btn-icon-premium" (click)="cerrarModalAgregarBobinas()">✖️</button>
        </div>
        <div class="modal-body-premium" style="display: flex; flex-direction: column; gap: 1rem;">
          
          <div class="badge-premium badge-info" style="text-transform: none; display: inline-flex; align-items: center; gap: 0.5rem; width: fit-content;">
            <span>Agregar Bobinas Manualmente a Extrusión</span>
          </div>
          
          <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted); line-height: 1.4;">
            Las bobinas se agregarán en pares, una para la estación A y otra para la estación B
          </p>
          
          <div class="form-group-premium" style="margin-top: 0.5rem;">
            <label>Pares de Bobinas *</label>
            <input type="number" [(ngModel)]="paresBobinasInput" class="input-premium" />
          </div>
        </div>
        <div class="modal-footer-premium">
          <button class="btn-premium" (click)="confirmarAgregarBobinas()">CONFIRMAR</button>
          <button class="btn-premium-secondary" (click)="cerrarModalAgregarBobinas()">CANCELAR</button>
        </div>
      </div>
    </div>

    <!-- MODAL DE CONFIRMACIÓN DE ELIMINACIÓN -->
    <div class="modal-overlay-premium" *ngIf="mostrarConfirmarEliminar">
      <div class="modal-card-premium animate-scale-in" style="max-width: 450px;">
        <div class="modal-header-premium" style="background: var(--danger); color: white;">
          <h3 style="color: white; margin: 0;">⚠️ Confirmar Eliminación</h3>
          <button class="btn-icon-premium" (click)="cancelarEliminar()" style="color: white;">✖️</button>
        </div>
        <div class="modal-body-premium" style="text-align: center;">
          <p style="font-size: 1.05rem; margin-bottom: 1rem; color: var(--text-main);" *ngIf="tipoEliminacion === 'extrusion'">
            ¿Está seguro de que desea eliminar la orden de extrusora <strong>{{ itemAEliminar?.extrusora?.nombre }}</strong>? Esta acción no se puede deshacer y se eliminarán todas sus bobinas asociadas.
          </p>
          <p style="font-size: 1.05rem; margin-bottom: 1rem; color: var(--text-main);" *ngIf="tipoEliminacion === 'bobina'">
            ¿Está seguro de que desea eliminar la bobina No. <strong>{{ itemAEliminar?.bobbinNo }}</strong> ({{ itemAEliminar?.station }})? Esta acción no se puede deshacer.
          </p>
        </div>
        <div class="modal-footer-premium">
          <button class="btn-premium-danger" (click)="confirmarEliminar()">SÍ, ELIMINAR</button>
          <button class="btn-premium-secondary" (click)="cancelarEliminar()">NO, CANCELAR</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .module-page { padding: 3rem; background: #f8fafc; min-height: 100%; font-family: 'Outfit', sans-serif; }
    .breadcrumb { font-size: 0.8rem; color: #64748b; margin-bottom: 0.5rem; font-weight: 500; }
    .page-title { font-size: 1.75rem; font-weight: 800; color: #166534; margin: 0 0 1.5rem 0; }

    .content-card { background: white; border: 1px solid #cbd5e1; border-radius: 4px; overflow: visible; }
    
    /* Premium Form Styling */
    .pad-form { padding: 2rem; }
    .form-header-premium { display: flex; align-items: center; gap: 0.75rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 1rem; margin-bottom: 1.5rem; }
    .form-icon-green { font-size: 1.5rem; color: #2e7d32; }
    .form-section-title { font-size: 1.25rem; font-weight: 800; color: #334155; margin: 0; }
    
    .premium-form-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
    @media (max-width: 992px) { .premium-form-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 768px) { .premium-form-grid { grid-template-columns: 1fr; } }
    
    .form-group-premium { display: flex; flex-direction: column; gap: 0.45rem; }
    .form-group-premium label { font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
    .form-control-premium { padding: 0.65rem 0.85rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.85rem; background: #f8fafc; outline: none; transition: all 0.2s; font-family: inherit; }
    .form-control-premium:focus { border-color: #2e7d32; background: white; box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.15); }
    .form-static-text { padding: 0.65rem 0; font-size: 0.9rem; font-weight: 700; color: #1e293b; }
    
    .form-actions-premium { display: flex; gap: 1rem; margin-top: 2rem; border-top: 1px solid #e2e8f0; padding-top: 1.5rem; }
    .btn-confirm-premium { background: #2e7d32; color: white; border: none; padding: 0.75rem 2rem; font-weight: 800; font-size: 0.85rem; border-radius: 6px; cursor: pointer; transition: background 0.2s; }
    .btn-confirm-premium:hover { background: #1b5e20; }
    .btn-confirm-premium:disabled { opacity: 0.6; cursor: not-allowed; }
    
    .btn-cancel-premium { background: #64748b; color: white; border: none; padding: 0.75rem 2rem; font-weight: 800; font-size: 0.85rem; border-radius: 6px; cursor: pointer; transition: background 0.2s; }
    .btn-cancel-premium:hover { background: #475569; }

    /* Action bar and layout */
    .action-bar-legacy { 
      padding: 0.85rem 1.25rem; 
      border-bottom: 1px solid #cbd5e1; 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      background: white; 
      gap: 1rem; 
      flex-wrap: wrap; 
    }
    
    .left-actions { display: flex; gap: 0.5rem; }
    
    /* Dropdown wrapper & custom menu */
    .dropdown-wrapper { position: relative; display: inline-block; }
    .btn-legacy-action { 
      background: white; 
      border: 1px solid #4caf50; 
      color: #2e7d32; 
      padding: 0.45rem 1rem; 
      border-radius: 4px; 
      font-weight: 700; 
      font-size: 0.8rem; 
      cursor: pointer; 
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      transition: all 0.2s;
    }
    .btn-legacy-action:hover { 
      background: #e8f5e9; 
      border-color: #2e7d32;
    }
    .text-green-btn { background: #4caf50; color: white; border-color: #4caf50; }
    .text-green-btn:hover { background: #388e3c; color: white; }
    .chevron-down { font-size: 0.75rem; }

    .dropdown-menu-custom {
      position: absolute;
      top: 105%;
      left: 0;
      background: white;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
      z-index: 100;
      min-width: 180px;
      display: flex;
      flex-direction: column;
      padding: 0.25rem 0;
    }
    .dropdown-item-custom {
      background: transparent;
      border: none;
      text-align: left;
      padding: 0.5rem 1rem;
      font-size: 0.8rem;
      font-weight: 600;
      color: #334155;
      cursor: pointer;
      font-family: inherit;
    }
    .dropdown-item-custom:hover {
      background: #f1f5f9;
      color: #1e293b;
    }

    /* Column Selector Popover */
    .column-selector-popover {
      position: absolute;
      top: 105%;
      left: 0;
      background: white;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      width: 250px;
      box-shadow: 0 10px 20px rgba(0,0,0,0.15);
      z-index: 200;
      display: flex;
      flex-direction: column;
      font-family: inherit;
    }
    .popover-search { padding: 0.5rem; border-bottom: 1px solid #e2e8f0; }
    .popover-search input { width: 100%; padding: 0.4rem; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 0.8rem; outline: none; }
    .popover-search input:focus { border-color: #4caf50; }
    
    .popover-sections { max-height: 250px; overflow-y: auto; padding: 0.5rem 0; }
    .popover-section { margin-bottom: 0.75rem; }
    .section-title { font-size: 0.75rem; font-weight: 700; color: #475569; padding: 0.25rem 0.75rem; display: flex; align-items: center; gap: 0.25rem; background: #f8fafc; }
    .section-list { display: flex; flex-direction: column; }
    
    .popover-item { display: flex; align-items: center; gap: 0.5rem; padding: 0.35rem 1rem; font-size: 0.8rem; color: #334155; cursor: pointer; }
    .popover-item:hover { background: #f1f5f9; }
    .popover-item input { cursor: pointer; accent-color: #4caf50; }
    .popover-item.disabled { opacity: 0.6; cursor: not-allowed; }

    .popover-footer { display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; border-top: 1px solid #e2e8f0; background: #f8fafc; }
    .btn-popover-reset { background: transparent; border: 1px solid #cbd5e1; padding: 0.25rem 0.5rem; border-radius: 4px; cursor: pointer; color: #475569; font-weight: 800; font-size: 0.95rem; }
    .btn-popover-reset:hover { background: #e2e8f0; }
    .btn-popover-apply { background: #4caf50; color: white; border: none; padding: 0.35rem 0.85rem; font-weight: 700; border-radius: 4px; cursor: pointer; font-size: 0.75rem; }
    .btn-popover-apply:hover { background: #388e3c; }

    .right-actions { display: flex; align-items: center; gap: 0.5rem; }
    .filter-icon-legacy { 
      font-size: 1rem; 
      color: #78909c; 
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      transform: rotate(90deg);
    }
    .search-box-legacy { position: relative; }
    .search-box-legacy input { 
      border: none; 
      border-bottom: 1px solid #4caf50; 
      outline: none; 
      padding: 0.25rem 0.5rem; 
      font-size: 0.85rem; 
      width: 180px; 
      font-family: inherit;
    }

    .table-scroll { overflow-x: auto; }
    .data-table-legacy { width: 100%; border-collapse: collapse; text-align: left; }
    .data-table-legacy th { 
      background: #f8fafc; 
      color: #475569; 
      font-size: 0.75rem; 
      font-weight: 700; 
      padding: 0.75rem 1rem; 
      border-bottom: 1px solid #cbd5e1; 
      white-space: nowrap;
    }
    .data-table-legacy td { 
      padding: 0.75rem 1rem; 
      border-bottom: 1px solid #cbd5e1; 
      font-size: 0.85rem; 
      color: #334155; 
      vertical-align: middle; 
      white-space: nowrap;
    }

    .green-theme-grid tbody tr { background-color: #f0fdf4; }
    .green-theme-grid tbody tr:hover { background-color: #dcfce7; }

    .actions-col-1 { width: 180px; }
    .actions-cell-1 { display: inline-flex; align-items: center; gap: 0.4rem; white-space: nowrap; }

    .info-circle-btn {
      width: 16px;
      height: 16px;
      background: #2563eb;
      color: white;
      font-size: 0.65rem;
      font-weight: 800;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .info-circle-btn.green { background: #2e7d32; }

    .print-btn { cursor: pointer; font-size: 1rem; display: inline-flex; align-items: center; justify-content: center; margin-left: 0.2rem; margin-right: 0.4rem; }

    .action-link-green { color: #2e7d32; font-weight: 600; cursor: pointer; text-decoration: none; font-size: 0.85rem; }
    .action-link-green:hover { text-decoration: underline; }

    .grid-link-green { color: #2e7d32; font-weight: 700; text-decoration: underline; cursor: pointer; }
    .ml-2 { margin-left: 0.5rem; }

    .id-cell { color: #0f172a; }
    .extrusora-name { color: #2e7d32; font-weight: 700; }
    .operator-name { font-size: 0.8rem; font-weight: 500; }

    .badge-status {
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 700;
      color: white;
      text-transform: capitalize;
      display: inline-block;
      text-align: center;
      min-width: 80px;
    }
    .badge-status.terminada { background-color: #2e7d32; }
    .badge-status.programada { background-color: #1976d2; }
    .badge-status.proceso { background-color: #f57c00; }
    .badge-status.detenida { background-color: #d32f2f; }

    .pagination-footer-legacy { 
      padding: 0.85rem 1.25rem; 
      border-top: 1px solid #cbd5e1; 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      background: white; 
    }
    .page-info-legacy { font-size: 0.8rem; color: #64748b; font-weight: 600; }
    .page-buttons-legacy { display: flex; gap: 0.25rem; }
    .btn-page-legacy { 
      border: 1px solid #cbd5e1; 
      background: white; 
      padding: 0.35rem 0.75rem; 
      border-radius: 4px; 
      font-size: 0.8rem; 
      font-weight: 700; 
      cursor: pointer; 
      color: #475569;
    }
    .btn-page-legacy.active { 
      background: #4caf50; 
      color: white; 
      border-color: #4caf50; 
      box-shadow: 0 1px 3px rgba(76,175,80,0.3);
    }
    .btn-page-legacy.disabled { opacity: 0.5; cursor: not-allowed; }

    .text-right { text-align: right; }
    .aditivos-cell { font-weight: 600; }

    /* Modal Styles */
    .modal-overlay-legacy {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(4px);
      z-index: 1000;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1.5rem;
    }
    .modal-card-legacy {
      background: white;
      border-radius: 8px;
      width: 100%;
      max-width: 550px;
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
      display: flex;
      flex-direction: column;
      max-height: 90vh;
      overflow: hidden;
    }
    .modal-card-legacy.wide { max-width: 850px; }
    .modal-header-legacy {
      padding: 1rem 1.25rem;
      border-bottom: 1px solid #cbd5e1;
      background: #f8fafc;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .modal-header-legacy h3 { margin: 0; font-size: 1.1rem; color: #0f172a; font-weight: 700; }
    .btn-close-legacy { background: transparent; border: none; font-size: 1.1rem; cursor: pointer; color: #64748b; }
    .btn-close-legacy:hover { color: #0f172a; }
    
    .modal-body-legacy { padding: 1.25rem; overflow-y: auto; display: flex; flex-direction: column; gap: 1.25rem; }
    .info-grid-legacy { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 0.85rem; background: #f8fafc; border: 1px solid #e2e8f0; padding: 1rem; border-radius: 6px; font-size: 0.85rem; }
    .info-item-legacy strong { color: #475569; }
    
    .table-container-legacy h4 { margin: 0 0 0.75rem 0; font-size: 0.95rem; color: #334155; font-weight: 700; }
    .modal-data-table { width: 100%; border-collapse: collapse; font-size: 0.8rem; text-align: left; }
    .modal-data-table th { background: #f1f5f9; color: #475569; padding: 0.6rem 0.85rem; border-bottom: 1px solid #cbd5e1; font-weight: 700; }
    .modal-data-table td { padding: 0.6rem 0.85rem; border-bottom: 1px solid #e2e8f0; color: #334155; }
    .modal-data-table tbody tr:hover { background: #f8fafc; }
    
    .info-banner-legacy { padding: 0.75rem; border-radius: 6px; font-size: 0.85rem; font-weight: 500; background: #f1f5f9; border: 1px solid #cbd5e1; color: #334155; }
    .info-banner-legacy.green { background: #f0fdf4; border-color: #bbf7d0; color: #166534; }
    
    .station-badge { display: inline-block; width: 20px; height: 20px; line-height: 20px; text-align: center; border-radius: 50%; font-weight: 800; font-size: 0.75rem; color: white; background: #2563eb; }
    .station-badge.a { background: #dc2626; }
    .margin-top { margin-top: 0.75rem; }

    /* Cabecera Verde de Bobinas */
    .action-bar-green-header {
      background-color: #2e7d32;
      color: white;
      padding: 0.75rem 1.25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      font-size: 0.85rem;
      font-weight: 600;
    }
    .header-left {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }
    .back-arrow-btn {
      font-size: 1.1rem;
      cursor: pointer;
      margin-right: 0.5rem;
      transition: transform 0.2s;
    }
    .back-arrow-btn:hover {
      transform: scale(1.15);
    }
    .btn-legacy-header-action {
      background: rgba(255,255,255,0.15);
      border: 1px solid rgba(255,255,255,0.3);
      color: white;
      padding: 0.3rem 0.85rem;
      border-radius: 4px;
      font-weight: 700;
      font-size: 0.8rem;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-legacy-header-action:hover {
      background: white;
      color: #2e7d32;
    }
    
    .header-middle {
      display: flex;
      align-items: center;
      gap: 1.25rem;
    }
    .badge-value-circle {
      background: white;
      color: #2e7d32;
      font-weight: 800;
      padding: 0.15rem 0.6rem;
      border-radius: 12px;
      font-size: 0.75rem;
    }
    .header-adit-value {
      font-weight: 700;
    }
    .header-link-white {
      color: white;
      text-decoration: underline;
      cursor: pointer;
      font-weight: 700;
    }
    .header-link-white:hover {
      color: #e8f5e9;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 0.85rem;
    }
    .header-tag {
      background: rgba(255,255,255,0.1);
      padding: 0.25rem 0.6rem;
      border-radius: 4px;
      font-size: 0.8rem;
      border: 1px solid rgba(255,255,255,0.15);
    }

    /* Badges y acciones específicos de la tabla de bobinas */
    .badge-molino-red {
      background-color: #d32f2f;
      color: white;
      font-size: 0.65rem;
      font-weight: 800;
      padding: 0.15rem 0.35rem;
      border-radius: 3px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .pencil-edit-btn, .cross-delete-btn {
      cursor: pointer;
      font-size: 0.85rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      transition: transform 0.1s;
    }
    .pencil-edit-btn:hover, .cross-delete-btn:hover {
      transform: scale(1.2);
    }
  `]
})
export class ExtrusionesListComponent implements OnInit {
  private prodService = inject(ProduccionService);
  private configService = inject(ProduccionConfigService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  viewState: 'list' | 'add' | 'edit' | 'bobinas' = 'list';
  saving: boolean = false;
  items: Extrusion[] = [];
  filteredItems: Extrusion[] = [];
  searchTerm: string = '';

  // Dropdowns and Popovers state
  showExportOptions: boolean = false;
  showColumnSelector: boolean = false;
  colSearchTerm: string = '';
  isFilterMenuOpen: boolean = false;
  savedFilters: any[] = [];

  visibleCols = {
    bobinas: true,
    aditivos: true,
    id: true,
    extrusora: true,
    turno: true,
    producto: true,
    tiempoInterrupcion: true,
    fecha: true,
    meta: true,
    estado: true,
    operador: true,
    iniciaProceso: true,
    finProceso: true
  };

  tempVisibleCols = { ...this.visibleCols };

  // Bobinas view columns selection
  showBobinaColumnSelector: boolean = false;
  bobinaColSearchTerm: string = '';
  showExportOptionsBobina: boolean = false;

  visibleBobinaCols = {
    extrusionId: true,
    bobinaOrigen: true,
    horaInicio: true,
    horaSalida: true,
    bobinaNo: true,
    bobinaNoSerie: true,
    bobinaKg: true,
    bobinaMermaKg: true,
    bobinaEspesor: true,
    bobinaObservaciones: true,
    bobinaMotivoMolino: true,
    bobinaProductoNombre: true,
    bobinaCarreras: true,
    bobinaIniciaReposo: true,
    bobinaMinutosEnReposo: true,
    bobinaMolino: true,
    bobinaEtiqueta: true
  };

  tempVisibleBobinaCols = { ...this.visibleBobinaCols };
  expandedExtrusionId: string | null = null;

  // Modals state
  mostrarModalVer: boolean = false;
  mostrarModalInterrupciones: boolean = false;
  mostrarModalAgregarBobinas: boolean = false;
  mostrarConfirmarEliminar: boolean = false;
  tipoEliminacion: 'extrusion' | 'bobina' = 'extrusion';
  itemAEliminar: any = null;
  paresBobinasInput: number = 0;
  searchTermInterrupcion: string = '';
  pageInterrupcion: number = 1;
  extrusionSeleccionada: any = null;
  loadingDetalle: boolean = false;

  // Catalogos para edición/creación
  catalogos = {
    operarios: [] as any[],
    turnos: [] as any[],
    productos: [] as any[],
    extrusoras: [] as any[]
  };

  editForm = {
    id: '',
    fecha: '',
    extrusoraId: '',
    turnoId: '',
    productoId: '',
    operarioId: '',
    metaKg: 0,
    virgenKg: 0,
    molidoKg: 0,
    calibre: 0,
    ancho: 0,
    longitud: 0,
    loteSilo: '',
    lotePaqueteAditivos: '',
    estado: 1,
    processStart: '',
    processEnd: ''
  };

  @HostListener('document:click')
  onDocumentClick() {
    this.showExportOptions = false;
    this.showColumnSelector = false;
    this.isFilterMenuOpen = false;
  }

  ngOnInit() {
    this.loadSavedFiltersFromStorage();
    this.cargarExtrusiones();
    this.cargarCatalogos();
  }

  cargarExtrusiones() {
    this.prodService.getExtrusiones().subscribe({
      next: (data) => {
        this.items = data;
        this.filteredItems = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar historial de extrusiones:', err)
    });
  }

  cargarCatalogos() {
    this.prodService.getOperarios().subscribe(data => { this.catalogos.operarios = data; this.cdr.detectChanges(); });
    this.prodService.getTurnos().subscribe(data => { this.catalogos.turnos = data; this.cdr.detectChanges(); });
    this.prodService.getProductos().subscribe(data => { this.catalogos.productos = data; this.cdr.detectChanges(); });
    this.prodService.getExtrusoras().subscribe(data => { this.catalogos.extrusoras = data; this.cdr.detectChanges(); });
  }

  getShortId(id: string, index: number): string {
    if (!id) return (22343 + index).toString();
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(22300 + (hash % 100)).toString();
  }

  getStatusClass(estado: any): string {
    const st = String(estado || '').toLowerCase();
    if (st.includes('terminada') || st.includes('finalizada') || st === '3') return 'terminada';
    if (st.includes('programada') || st.includes('creada') || st === '1') return 'programada';
    if (st.includes('proceso') || st === '2') return 'proceso';
    if (st.includes('detenida') || st.includes('paro') || st === '4') return 'detenida';
    return '';
  }

  getEstadoLabel(estado: any): string {
    const st = String(estado || '').toLowerCase();
    if (st.includes('terminada') || st.includes('finalizada') || st === '3') return 'Terminada';
    if (st.includes('programada') || st.includes('creada') || st === '1') return 'Programada';
    if (st.includes('proceso') || st === '2') return 'En Proceso';
    if (st.includes('detenida') || st.includes('paro') || st === '4') return 'Detenida';
    return 'Creada';
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredItems = this.items;
    } else {
      this.filteredItems = this.items.filter(ex => 
        (ex.extrusora?.nombre || '').toLowerCase().includes(term) || 
        (ex.operario?.nombreCompleto || '').toLowerCase().includes(term) || 
        (ex.producto?.nombre || ex.productoNombre || '').toLowerCase().includes(term)
      );
    }
  }

  // Visualizadores de dropdowns
  toggleExportDropdown(event: Event) {
    event.stopPropagation();
    this.showColumnSelector = false;
    this.isFilterMenuOpen = false;
    this.showExportOptions = !this.showExportOptions;
  }

  toggleColumnDropdown(event: Event) {
    event.stopPropagation();
    this.showExportOptions = false;
    this.isFilterMenuOpen = false;
    this.tempVisibleCols = { ...this.visibleCols };
    this.showColumnSelector = !this.showColumnSelector;
  }

  onColSearch() {}

  toggleFilterMenu(event: Event) {
    event.stopPropagation();
    this.showExportOptions = false;
    this.showColumnSelector = false;
    this.isFilterMenuOpen = !this.isFilterMenuOpen;
  }

  loadSavedFiltersFromStorage() {
    const raw = localStorage.getItem('hicone_saved_filters_extrusiones');
    this.savedFilters = raw ? JSON.parse(raw) : [];
  }

  clearFilters() {
    this.searchTerm = '';
    this.isFilterMenuOpen = false;
    this.onSearch();
  }

  saveFilter() {
    this.isFilterMenuOpen = false;
    const filterName = prompt('Ingrese el nombre para este filtro:', 'Filtro Extrusiones ' + new Date().toLocaleDateString());
    if (!filterName) return;
    const newFilter = {
      id: 'F-' + Date.now(),
      name: filterName,
      state: { searchTerm: this.searchTerm }
    };
    this.savedFilters.push(newFilter);
    localStorage.setItem('hicone_saved_filters_extrusiones', JSON.stringify(this.savedFilters));
    alert('Filtro guardado con éxito.');
  }

  loadSavedFilter(f: any) {
    this.searchTerm = f.state?.searchTerm || '';
    this.isFilterMenuOpen = false;
    this.onSearch();
  }

  deleteSavedFilter(f: any, event: MouseEvent) {
    event.stopPropagation();
    this.savedFilters = this.savedFilters.filter(item => item.id !== f.id);
    localStorage.setItem('hicone_saved_filters_extrusiones', JSON.stringify(this.savedFilters));
  }

  toggleExportDropdownBobina(event: Event) {
    event.stopPropagation();
    this.showBobinaColumnSelector = false;
    this.showExportOptionsBobina = !this.showExportOptionsBobina;
  }

  toggleColumnDropdownBobina(event: Event) {
    event.stopPropagation();
    this.showExportOptionsBobina = false;
    this.tempVisibleBobinaCols = { ...this.visibleBobinaCols };
    this.showBobinaColumnSelector = !this.showBobinaColumnSelector;
  }

  isBobinaColMatch(colKey: string): boolean {
    if (!this.bobinaColSearchTerm) return true;
    const labels: { [key: string]: string } = {
      extrusionId: 'extrusión id',
      bobinaOrigen: 'bobina origen',
      horaInicio: 'bobina hora inicio',
      horaSalida: 'bobina hora salida',
      bobinaNo: 'bobina no',
      bobinaNoSerie: 'bobina no serie',
      bobinaKg: 'bobina kg',
      bobinaMermaKg: 'bobina merma kg',
      bobinaEspesor: 'bobina espesor',
      bobinaObservaciones: 'bobina observaciones',
      bobinaMotivoMolino: 'bobina motivo molino',
      bobinaProductoNombre: 'bobina producto nombre',
      bobinaCarreras: 'bobina carreras',
      bobinaIniciaReposo: 'bobina inicia reposo',
      bobinaMinutosEnReposo: 'bobina minutos en reposo',
      bobinaMolino: 'bobina molino',
      bobinaEtiqueta: 'bobina etiqueta'
    };
    return labels[colKey]?.toLowerCase().includes(this.bobinaColSearchTerm.toLowerCase());
  }

  resetBobinaColumns() {
    this.tempVisibleBobinaCols = {
      extrusionId: true,
      bobinaOrigen: true,
      horaInicio: true,
      horaSalida: true,
      bobinaNo: true,
      bobinaNoSerie: true,
      bobinaKg: true,
      bobinaMermaKg: true,
      bobinaEspesor: true,
      bobinaObservaciones: true,
      bobinaMotivoMolino: true,
      bobinaProductoNombre: true,
      bobinaCarreras: true,
      bobinaIniciaReposo: true,
      bobinaMinutosEnReposo: true,
      bobinaMolino: true,
      bobinaEtiqueta: true
    };
  }

  applyBobinaColumns() {
    this.visibleBobinaCols = { ...this.tempVisibleBobinaCols };
    this.showBobinaColumnSelector = false;
  }

  isColMatch(colKey: string): boolean {
    if (!this.colSearchTerm) return true;
    const labels: { [key: string]: string } = {
      bobinas: 'bobinas',
      aditivos: 'paquete aditivos',
      id: 'id',
      extrusora: 'extrusora',
      turno: 'turno',
      producto: 'producto',
      tiempoInterrupcion: 'tiempo interrupción min',
      fecha: 'fecha',
      meta: 'meta',
      estado: 'estado',
      operador: 'operador nombre',
      iniciaProceso: 'inicia proceso',
      finProceso: 'fin proceso'
    };
    return labels[colKey]?.toLowerCase().includes(this.colSearchTerm.toLowerCase());
  }

  matchesSearch(text: string): boolean {
    if (!this.colSearchTerm) return true;
    return text.toLowerCase().includes(this.colSearchTerm.toLowerCase());
  }

  resetColumns() {
    this.tempVisibleCols = {
      bobinas: true,
      aditivos: true,
      id: true,
      extrusora: true,
      turno: true,
      producto: true,
      tiempoInterrupcion: true,
      fecha: true,
      meta: true,
      estado: true,
      operador: true,
      iniciaProceso: true,
      finProceso: true
    };
  }

  applyColumns() {
    this.visibleCols = { ...this.tempVisibleCols };
    this.showColumnSelector = false;
  }

  // Getters para textos en Modo Edición
  getExtrusoraName(id: string): string {
    const ext = this.catalogos.extrusoras.find(e => e.id === id);
    return ext ? ext.nombre : 'Extrusora';
  }

  getTurnoName(id: string): string {
    const t = this.catalogos.turnos.find(x => x.id === id);
    return t ? t.nombre : 'Turno';
  }

  getProductoName(id: string): string {
    const p = this.catalogos.productos.find(x => x.id === id);
    return p ? p.nombre : 'Producto';
  }

  // Controladores de Vista
  irAAgregar() {
    this.viewState = 'add';
    const nowStr = this.formatDateTimeLocal(new Date());
    this.editForm = {
      id: '',
      fecha: nowStr.substring(0, 10),
      extrusoraId: '',
      turnoId: '',
      productoId: '',
      operarioId: '',
      metaKg: 0,
      virgenKg: 0,
      molidoKg: 0,
      calibre: 0,
      ancho: 0,
      longitud: 0,
      loteSilo: '',
      lotePaqueteAditivos: '',
      estado: 1,
      processStart: nowStr,
      processEnd: ''
    };
  }

  irAModificar(ex: Extrusion) {
    this.viewState = 'edit';
    this.editForm = {
      id: ex.id,
      fecha: ex.fechaInicio ? new Date(ex.fechaInicio).toISOString().substring(0, 10) : new Date().toISOString().substring(0, 10),
      extrusoraId: ex.extrusoraId,
      turnoId: ex.turnoId || '',
      productoId: ex.producto?.id || '',
      operarioId: ex.operarioId,
      metaKg: ex.metaKg || 0,
      virgenKg: ex.producido || 0, // mapeado como virgenKg
      molidoKg: 0,
      calibre: ex.producto?.calibre || 0,
      ancho: ex.producto?.ancho || 0,
      longitud: 0,
      loteSilo: '',
      lotePaqueteAditivos: ex.lotePaqueteAditivos || '',
      estado: this.mapEstadoToNumber(ex.estado),
      processStart: this.formatDateTimeLocal(ex.iniciaProceso),
      processEnd: this.formatDateTimeLocal(ex.finProceso)
    };
  }

  mapEstadoToNumber(state: any): number {
    const s = String(state).toLowerCase();
    if (s.includes('programada') || s === '1') return 1;
    if (s.includes('proceso') || s === '2') return 2;
    if (s.includes('terminada') || s.includes('finalizada') || s === '3') return 3;
    if (s.includes('anticipada') || s === '4') return 4;
    if (s.includes('cancelada') || s === '5') return 5;
    return 1;
  }

  formatDateTimeLocal(dateVal: any): string {
    if (!dateVal) return '';
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return '';
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  cancelarForm() {
    this.viewState = 'list';
  }

  guardarCambios() {
    if (this.viewState === 'add') {
      if (!this.editForm.extrusoraId) { alert('Seleccione la extrusora.'); return; }
      if (!this.editForm.turnoId) { alert('Seleccione el turno.'); return; }
      if (!this.editForm.productoId) { alert('Seleccione el producto.'); return; }
      if (!this.editForm.operarioId) { alert('Seleccione el operador.'); return; }

      this.saving = true;
      const payload = {
        fecha: new Date(this.editForm.fecha),
        extrusoraId: this.editForm.extrusoraId,
        turnoId: this.editForm.turnoId,
        productoId: this.editForm.productoId,
        operarioId: this.editForm.operarioId,
        metaKg: this.editForm.metaKg,
        virgenKg: this.editForm.virgenKg,
        molidoKg: this.editForm.molidoKg,
        calibre: this.editForm.calibre,
        ancho: this.editForm.ancho,
        longitud: this.editForm.longitud,
        loteSilo: this.editForm.loteSilo,
        lotePaqueteAditivos: this.editForm.lotePaqueteAditivos,
        estado: Number(this.editForm.estado),
        processStart: this.editForm.processStart ? new Date(this.editForm.processStart) : null,
        processEnd: this.editForm.processEnd ? new Date(this.editForm.processEnd) : null
      };

      this.prodService.createExtrusion(payload).subscribe({
        next: () => {
          this.saving = false;
          alert('Orden de extrusión creada con éxito.');
          this.viewState = 'list';
          this.cargarExtrusiones();
        },
        error: (err) => {
          this.saving = false;
          console.error(err);
          alert('Error al guardar la orden de extrusión.');
        }
      });
    } else {
      // Modificar
      this.saving = true;
      const payload = {
        fecha: new Date(this.editForm.fecha),
        extrusoraId: this.editForm.extrusoraId,
        turnoId: this.editForm.turnoId,
        productoId: this.editForm.productoId || null,
        operarioId: this.editForm.operarioId,
        metaKg: this.editForm.metaKg,
        virgenKg: this.editForm.virgenKg,
        molidoKg: this.editForm.molidoKg,
        calibre: this.editForm.calibre,
        ancho: this.editForm.ancho,
        longitud: this.editForm.longitud,
        loteSilo: this.editForm.loteSilo,
        lotePaqueteAditivos: this.editForm.lotePaqueteAditivos,
        estado: Number(this.editForm.estado),
        processStart: this.editForm.processStart ? new Date(this.editForm.processStart) : null,
        processEnd: this.editForm.processEnd ? new Date(this.editForm.processEnd) : null
      };

      this.prodService.updateExtrusion(this.editForm.id, payload).subscribe({
        next: () => {
          this.saving = false;
          alert('Orden de extrusión actualizada con éxito.');
          this.viewState = 'list';
          this.cargarExtrusiones();
        },
        error: (err) => {
          this.saving = false;
          console.error(err);
          alert('Error al actualizar la orden de extrusión.');
        }
      });
    }
  }

  eliminar(ex: Extrusion) {
    this.itemAEliminar = ex;
    this.tipoEliminacion = 'extrusion';
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

    if (this.tipoEliminacion === 'extrusion') {
      this.prodService.deleteExtrusion(this.itemAEliminar.id).subscribe({
        next: () => {
          alert('Orden de extrusión eliminada con éxito.');
          this.mostrarConfirmarEliminar = false;
          this.itemAEliminar = null;
          this.viewState = 'list';
          this.cargarExtrusiones();
        },
        error: (err) => {
          console.error('Error al eliminar extrusión:', err);
          alert(err.error?.message || 'Error del servidor al eliminar la extrusión.');
          this.mostrarConfirmarEliminar = false;
          this.itemAEliminar = null;
          this.cdr.detectChanges();
        }
      });
    } else if (this.tipoEliminacion === 'bobina') {
      this.configService.deleteBobina(this.extrusionSeleccionada.id, this.itemAEliminar.id).subscribe({
        next: () => {
          alert('Bobina eliminada con éxito.');
          this.mostrarConfirmarEliminar = false;
          const selected = this.extrusionSeleccionada;
          this.itemAEliminar = null;
          this.expandedExtrusionId = null; // force toggle refresh
          this.ver(selected);
        },
        error: (err) => {
          console.error('Error al eliminar bobina:', err);
          alert('Error al eliminar la bobina.');
          this.mostrarConfirmarEliminar = false;
          this.itemAEliminar = null;
          this.cdr.detectChanges();
        }
      });
    }
  }

  ver(ex: any) {
    if (this.expandedExtrusionId === ex.id) {
      this.expandedExtrusionId = null;
      this.extrusionSeleccionada = null;
      this.cdr.detectChanges();
      return;
    }

    this.loadingDetalle = true;
    this.cdr.detectChanges();
    this.prodService.getExtrusion(ex.id).subscribe({
      next: (data) => {
        this.extrusionSeleccionada = data;
        this.expandedExtrusionId = ex.id;
        this.loadingDetalle = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar detalle:', err);
        alert('No se pudo cargar el detalle de la extrusión.');
        this.loadingDetalle = false;
        this.cdr.detectChanges();
      }
    });
  }

  agregarBobinaManual() {
    if (!this.extrusionSeleccionada) return;
    this.mostrarModalAgregarBobinas = true;
    
    // Auto-calculate the next pair number based on current bobinas in the extrusion
    let maxBobbinNo = 0;
    if (this.extrusionSeleccionada.bobinas && this.extrusionSeleccionada.bobinas.length > 0) {
      maxBobbinNo = Math.max(...this.extrusionSeleccionada.bobinas.map((b: any) => b.bobbinNo || 0));
    }
    this.paresBobinasInput = maxBobbinNo > 0 ? Math.floor(maxBobbinNo / 2) + 1 : 1;
  }

  cerrarModalAgregarBobinas() {
    this.mostrarModalAgregarBobinas = false;
    this.paresBobinasInput = 0;
  }

  confirmarAgregarBobinas() {
    if (!this.extrusionSeleccionada) return;
    const paresNum = this.paresBobinasInput;
    if (isNaN(paresNum) || paresNum <= 0) {
      alert('Número de par inválido. Debe ser mayor que 0.');
      return;
    }

    this.configService.addBobinasManual(this.extrusionSeleccionada.id, { paresBobinas: paresNum }).subscribe({
      next: () => {
        alert('Bobinas agregadas con éxito.');
        this.cerrarModalAgregarBobinas();
        // Refresh detail view
        this.expandedExtrusionId = null; // force reload by toggling ver
        this.ver({ id: this.extrusionSeleccionada.id });
      },
      error: (err) => {
        console.error('Error al agregar bobinas manual:', err);
        alert('Error al agregar bobinas.');
      }
    });
  }

  eliminarBobina(bobina: any) {
    if (!this.extrusionSeleccionada) return;
    this.itemAEliminar = bobina;
    this.tipoEliminacion = 'bobina';
    this.mostrarConfirmarEliminar = true;
    this.cdr.detectChanges();
  }

  exportarBobinasExcel() {
    if (!this.extrusionSeleccionada || !this.extrusionSeleccionada.bobinas) return;
    const dataToExport = this.extrusionSeleccionada.bobinas.map((b: any) => ({
      'Extrusión ID': this.extrusionSeleccionada.extrusionIdLegacy || this.getShortId(this.extrusionSeleccionada.id, 0),
      'Bobina Origen': b.station || b.bobinaOrigen || 'A',
      'Hora Inicio': b.horaInicio ? new Date(b.horaInicio).toLocaleString() : '',
      'Hora Salida': b.horaSalida ? new Date(b.horaSalida).toLocaleString() : '',
      'Bobina No': b.bobbinNo,
      'No Serie': b.serialNo || '',
      'Kg': b.kg,
      'Merma Kg': b.scrapKg,
      'Espesor': b.thickness,
      'Observaciones': b.observations || '',
      'Motivo Molino': b.millReason || '',
      'Producto': b.productName || this.extrusionSeleccionada.producto?.nombre || '',
      'Carreras': b.carreras || 0,
      'Inicia Reposo': b.iniciaReposo ? new Date(b.iniciaReposo).toLocaleString() : '',
      'Minutos en Reposo': b.restMinutes || 0,
      'Molino': b.mill || ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Bobinas');
    XLSX.writeFile(workbook, `Reporte_Bobinas_Extrusion_${this.extrusionSeleccionada.extrusionIdLegacy || 'Detail'}.xlsx`);
    this.showExportOptionsBobina = false;
  }

  exportarBobinasPDF() {
    if (!this.extrusionSeleccionada || !this.extrusionSeleccionada.bobinas) return;
    const doc = new jsPDF('l', 'mm', 'a4');
    doc.text(`Reporte de Bobinas - Extrusión ${this.extrusionSeleccionada.extrusionIdLegacy || ''}`, 14, 15);

    const headers = [['Extrusión ID', 'Origen', 'Inicio', 'Salida', 'No', 'No Serie', 'Kg', 'Merma Kg', 'Espesor', 'Observaciones', 'Motivo Molino', 'Producto', 'Carreras', 'Min Reposo', 'Molino']];
    const data = this.extrusionSeleccionada.bobinas.map((b: any) => [
      (this.extrusionSeleccionada.extrusionIdLegacy || '').toString(),
      b.station || b.bobinaOrigen || 'A',
      b.horaInicio ? new Date(b.horaInicio).toLocaleDateString() : '',
      b.horaSalida ? new Date(b.horaSalida).toLocaleDateString() : '',
      (b.bobbinNo || '').toString(),
      b.serialNo || '',
      (b.kg || 0).toString(),
      (b.scrapKg || 0).toString(),
      (b.thickness || 0).toString(),
      b.observations || '',
      b.millReason || '',
      b.productName || this.extrusionSeleccionada.producto?.nombre || '',
      (b.carreras || 0).toString(),
      (b.restMinutes || 0).toString(),
      b.mill || ''
    ]);

    autoTable(doc, {
      head: headers,
      body: data,
      startY: 20,
      styles: { fontSize: 7 },
      theme: 'grid'
    });

    doc.save(`Reporte_Bobinas_Extrusion_${this.extrusionSeleccionada.extrusionIdLegacy || 'Detail'}.pdf`);
    this.showExportOptionsBobina = false;
  }

  verInterrupciones(ex: Extrusion) {
    this.loadingDetalle = true;
    this.cdr.detectChanges();
    this.prodService.getExtrusion(ex.id).subscribe({
      next: (data) => {
        this.extrusionSeleccionada = data;
        this.mostrarModalInterrupciones = true;
        this.loadingDetalle = false;
        this.searchTermInterrupcion = '';
        this.pageInterrupcion = 1;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar interrupciones:', err);
        alert('No se pudo cargar el detalle de interrupciones.');
        this.loadingDetalle = false;
        this.cdr.detectChanges();
      }
    });
  }

  cerrarModales() {
    this.mostrarModalVer = false;
    this.mostrarModalInterrupciones = false;
    this.searchTermInterrupcion = '';
    this.pageInterrupcion = 1;
    this.extrusionSeleccionada = null;
  }

  cerrarInterrupciones() {
    this.mostrarModalInterrupciones = false;
    this.searchTermInterrupcion = '';
    this.pageInterrupcion = 1;
    this.extrusionSeleccionada = null;
  }

  parseCausa(causaStr: string): { id: string; name: string } {
    if (!causaStr) return { id: '', name: '' };
    const parts = causaStr.split(' - ');
    if (parts.length >= 2) {
      return { id: parts[0].trim(), name: parts.slice(1).join(' - ').trim() };
    }
    return { id: '', name: causaStr.trim() };
  }

  getDuracionSegundos(duracionMinutos: number): number {
    if (!duracionMinutos) return 0;
    return Math.round(duracionMinutos * 60);
  }

  getFilteredInterrupciones(): any[] {
    if (!this.extrusionSeleccionada || !this.extrusionSeleccionada.interrupciones) return [];
    const term = this.searchTermInterrupcion.toLowerCase().trim();
    if (!term) return this.extrusionSeleccionada.interrupciones;
    return this.extrusionSeleccionada.interrupciones.filter((i: any) => {
      const parsed = this.parseCausa(i.causa);
      return (i.descripcion || '').toLowerCase().includes(term) ||
             parsed.id.toLowerCase().includes(term) ||
             parsed.name.toLowerCase().includes(term);
    });
  }

  getPaginatedInterrupciones(): any[] {
    const filtered = this.getFilteredInterrupciones();
    const startIndex = (this.pageInterrupcion - 1) * 5;
    return filtered.slice(startIndex, startIndex + 5);
  }

  getMaxPagesInterrupcion(): number {
    const filtered = this.getFilteredInterrupciones();
    if (filtered.length === 0) return 1;
    return Math.ceil(filtered.length / 5);
  }

  getEstadoLabelByVal(estadoVal: any): string {
    const val = Number(estadoVal);
    switch (val) {
      case 1: return 'Programada';
      case 2: return 'En Proceso';
      case 3: return 'Finalizada';
      case 4: return 'Anticipada';
      case 5: return 'Cancelada';
      default: return 'Desconocido';
    }
  }

  getEstadoBobinaName(estadoVal: any): string {
    const val = Number(estadoVal);
    switch (val) {
      case 1: return 'En Proceso';
      case 2: return 'En Reposo';
      case 3: return 'En Prensado';
      case 4: return 'Utilizada';
      case 5: return 'Rechazada';
      case 6: return 'Molido (Reciclaje)';
      default: return 'Desconocido';
    }
  }

  // Exportadores
  exportarExcel() {
    const dataToExport = this.filteredItems.map((ex, idx) => ({
      'Id': ex.extrusionIdLegacy || this.getShortId(ex.id, idx),
      'Extrusora': ex.extrusora?.nombre || '',
      'Turno': ex.turno?.nombre || '1er Turno',
      'Producto': ex.producto?.nombre || ex.productoNombre || '',
      'Bobinas': ex.totalBobinas || 0,
      'Paquete Aditivos': ex.lotePaqueteAditivos || '',
      'Tiempo Interrupción (min)': ex.tiempoInterrupcion || 0,
      'Fecha': ex.fechaInicio ? new Date(ex.fechaInicio).toLocaleDateString() : '',
      'Meta (Kg)': ex.metaKg || 0,
      'Estado': this.getEstadoLabel(ex.estado),
      'Operador': ex.operario?.nombreCompleto || 'LUIS CESAR OROPEZA ORTEGA'
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Extrusiones');
    XLSX.writeFile(workbook, `Reporte_Extrusiones_${new Date().toISOString().substring(0, 10)}.xlsx`);
    this.showExportOptions = false;
  }

  exportarPDF() {
    const doc = new jsPDF('l', 'mm', 'a4');
    doc.text('Reporte de Extrusiones', 14, 15);
    
    const headers = [['Id', 'Extrusora', 'Turno', 'Producto', 'Bobinas', 'Aditivos', 'Paros (min)', 'Fecha', 'Meta (Kg)', 'Estado', 'Operador']];
    const data = this.filteredItems.map((ex, idx) => [
      ex.extrusionIdLegacy || this.getShortId(ex.id, idx),
      ex.extrusora?.nombre || '',
      ex.turno?.nombre || '1er Turno',
      ex.producto?.nombre || ex.productoNombre || '',
      (ex.totalBobinas || 0).toString(),
      ex.lotePaqueteAditivos || '',
      (ex.tiempoInterrupcion || 0).toString(),
      ex.fechaInicio ? new Date(ex.fechaInicio).toLocaleDateString() : '',
      (ex.metaKg || 0).toString(),
      this.getEstadoLabel(ex.estado),
      ex.operario?.nombreCompleto || 'LUIS CESAR OROPEZA ORTEGA'
    ]);

    autoTable(doc, {
      head: headers,
      body: data,
      startY: 20,
      styles: { fontSize: 8 },
      theme: 'grid'
    });

    doc.save(`Reporte_Extrusiones_${new Date().toISOString().substring(0, 10)}.pdf`);
    this.showExportOptions = false;
  }

  imprimir(ex: Extrusion) {
    alert(`Imprimiendo registro de extrusión ID: ${ex.id}`);
  }
}
