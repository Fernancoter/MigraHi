import { Component, OnInit, inject, signal, HostListener, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduccionConfigService, PrensadoProgramacion, PrensadoOperacion } from '../../../core/services/produccion-config.service';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-inicio-prensado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up">
      <!-- CABECERA PRINCIPAL ESTILO QA -->
      <div class="page-header-clean bg-white p-6 rounded-lg shadow-sm mb-6" style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); display: flex; justify-content: space-between; align-items: center; border: 1px solid #e2e8f0; margin-bottom: 1.5rem;">
        <div class="title-section">
          <h1 class="premium-title" style="font-size: 1.5rem; font-weight: 900; color: #166534; margin: 0;">Inicio Prensado</h1>
          <nav class="breadcrumb-modern" style="font-size: 0.75rem; color: #166534; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0.3rem;">
            <span class="root">Prensado</span>
            <span class="sep" style="margin: 0 0.4rem;">&rsaquo;</span>
            <span class="active" style="color: #166534; font-weight: 800;">Inicio</span>
          </nav>
        </div>
      </div>

      <!-- TARJETA AGRUPADORA ESTADÍSTICAS DE PRENSADO -->
      <div class="section-card mb-6" style="background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; overflow: hidden; margin-bottom: 1.5rem;">
        <div class="section-header" style="padding: 1.25rem 1.5rem; background: #fafafa; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
          <div class="header-title" style="display: flex; align-items: center; gap: 0.5rem; font-weight: 800; color: #1e293b; font-size: 1rem;">
            <span>🏷️</span>
            <h3>Estadísticas de Prensado</h3>
          </div>
        </div>
        
        <div class="card-body" style="padding: 1.5rem;">
          
          <!-- SUB-SECCIÓN: PROGRAMACIÓN (FIELDSET / LEGEND) -->
          <fieldset style="border: 2px solid #cbd5e1; border-radius: 12px; padding: 1.5rem; margin-bottom: 2rem; position: relative;">
            <legend style="padding: 0 0.75rem; font-weight: 800; color: #166534; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em; margin-left: 1rem;">Programación</legend>
            
            <div style="margin-bottom: 1rem; display: flex; justify-content: flex-end;">
              <button class="btn-primary-small" style="background: #166534;" (click)="showTableroDirectivo.set(!showTableroDirectivo())">
                {{ showTableroDirectivo() ? 'Ocultar Tablero Directivo' : 'Ver Tablero Directivo' }}
              </button>
            </div>

            @if (!showTableroDirectivo()) {
              <div class="table-wrapper">
                <table class="qa-table">
                  <thead>
                    <tr>
                      <th (click)="toggleSort('progPren', 'fecha')">
                        Fecha <span class="sort-icon">{{ progPrenSortCol() === 'fecha' ? (progPrenSortDir() === 'asc' ? '↑' : '↓') : '' }}</span>
                      </th>
                      <th (click)="toggleFilter('prog-prensa', $event)">
                        Prensa <span class="sort-icon">{{ progPrenSortCol() === 'prensa' ? (progPrenSortDir() === 'asc' ? '↑' : '↓') : '' }}</span>
                        @if (activeFilter() === 'prog-prensa') {
                          <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                            <div class="filter-group">
                              <input type="text" class="search-input" placeholder="Buscar..." [ngModel]="progPrenPrensa()" (ngModelChange)="progPrenPrensa.set($event)">
                            </div>
                          </div>
                        }
                      </th>
                      <th (click)="toggleFilter('prog-turno', $event)">
                        Turno
                        @if (activeFilter() === 'prog-turno') {
                          <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                            <div class="filter-group">
                              <input type="text" class="search-input" placeholder="Buscar..." [ngModel]="progPrenTurno()" (ngModelChange)="progPrenTurno.set($event)">
                            </div>
                          </div>
                        }
                      </th>
                      <th (click)="toggleFilter('prog-producto', $event)">
                        Producto
                        @if (activeFilter() === 'prog-producto') {
                          <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                            <div class="filter-group">
                              <input type="text" class="search-input" placeholder="Buscar..." [ngModel]="progPrenProducto()" (ngModelChange)="progPrenProducto.set($event)">
                            </div>
                          </div>
                        }
                      </th>
                      <th (click)="toggleFilter('prog-operador', $event)">
                        Operador
                        @if (activeFilter() === 'prog-operador') {
                          <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                            <div class="filter-group">
                              <input type="text" class="search-input" placeholder="Buscar..." [ngModel]="progPrenOperador()" (ngModelChange)="progPrenOperador.set($event)">
                            </div>
                          </div>
                        }
                      </th>
                      <th class="text-right">Programado</th>
                    </tr>
                  </thead>
                  <tbody>
                    @if (loading()) {
                      <tr><td colspan="6" class="loading-cell">Cargando programación...</td></tr>
                    } @else if (filteredProgramacionPren().length === 0) {
                      <tr><td colspan="6" class="empty-cell">Sin registros programados.</td></tr>
                    } @else {
                      @for (item of filteredProgramacionPren(); track item.fecha) {
                        <tr>
                          <td>{{ item.fecha | date:'dd/MM/yyyy' }}</td>
                          <td>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                              <span style="color: #166534; font-weight: bold;">✔</span>
                              <strong>{{ item.prensa }}</strong>
                            </div>
                          </td>
                          <td><span class="turno-badge">{{ item.turno }}</span></td>
                          <td><strong>{{ item.producto }}</strong></td>
                          <td>{{ item.operador || 'Sin asignar' }}</td>
                          <td class="text-right font-bold">{{ item.programado | number }}</td>
                        </tr>
                      }
                    }
                  </tbody>
                </table>
              </div>
            } @else {
              <!-- TABLERO DIRECTIVO VIEW -->
              <div class="table-wrapper">
                <table class="qa-table">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Prensa</th>
                      <th>Turno</th>
                      <th>Producto</th>
                      <th>Operador</th>
                      <th class="text-right">Programado</th>
                      <th class="text-right">Producido</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    @if (loading()) {
                      <tr><td colspan="8" class="loading-cell">Cargando tablero...</td></tr>
                    } @else if (getPaginatedTableroDirectivo().length === 0) {
                      <tr><td colspan="8" class="empty-cell">No hay registros en el tablero.</td></tr>
                    } @else {
                      @for (item of getPaginatedTableroDirectivo(); track item.id) {
                        <tr>
                          <td>{{ item.fecha | date:'dd/MM/yyyy' }}</td>
                          <td>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                              <span style="color: #166534; font-weight: bold;">✔</span>
                              <strong>{{ item.prensa }}</strong>
                            </div>
                          </td>
                          <td><span class="turno-badge">{{ item.turno }}</span></td>
                          <td><strong>{{ item.producto }}</strong></td>
                          <td>{{ item.operador || 'Sin asignar' }}</td>
                          <td class="text-right font-bold">{{ item.programado | number }}</td>
                          <td class="text-right font-bold" style="color: #166534;">{{ item.producido | number }}</td>
                          <td>
                            <span [className]="
                              item.estado === 0 ? 'qa-badge-blue' :
                              item.estado === 1 ? 'qa-badge-green' :
                              item.estado === 2 ? 'qa-badge-orange' :
                              item.estado === 3 ? 'qa-badge-red' :
                              item.estado === 4 ? 'qa-badge-blue' : 'qa-badge-blue'
                            ">
                              {{ getPrensadoStatusLabel(item.estado) }}
                            </span>
                          </td>
                        </tr>
                      }
                      <tr style="background: #f8fafc; font-weight: bold; border-top: 2px solid #cbd5e1;">
                        <td colspan="5" class="text-right">Total:</td>
                        <td class="text-right font-bold" style="font-size: 14px;">{{ getTableroSumProgramado() | number }}</td>
                        <td class="text-right font-bold" style="font-size: 14px; color: #166534;">{{ getTableroSumProducido() | number }}</td>
                        <td></td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
              <!-- TABLERO DIRECTIVO PAGINATION -->
              <div style="margin-top: 1rem; display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 1rem;">
                <span style="font-size: 0.85rem; color: #64748b; font-weight: 600;">
                  Total de registros: {{ tableroDirectivoList().length }}
                </span>
                <div style="display: flex; gap: 0.25rem;">
                  <button [disabled]="tableroDirectivoPage() === 1" (click)="tableroDirectivoPage.set(tableroDirectivoPage() - 1)" style="padding: 0.4rem 0.8rem; border-radius: 6px; border: 1px solid #cbd5e1; background: white; font-weight: 700; cursor: pointer;">&lsaquo; Anterior</button>
                  @for (p of getTableroPages(); track p) {
                    <button (click)="tableroDirectivoPage.set(p)" [style.background]="tableroDirectivoPage() === p ? '#166534' : 'white'" [style.color]="tableroDirectivoPage() === p ? 'white' : '#334155'" style="padding: 0.4rem 0.8rem; border-radius: 6px; border: 1px solid #cbd5e1; font-weight: 700; cursor: pointer;">{{ p }}</button>
                  }
                  <button [disabled]="tableroDirectivoPage() === getTableroTotalPages()" (click)="tableroDirectivoPage.set(tableroDirectivoPage() + 1)" style="padding: 0.4rem 0.8rem; border-radius: 6px; border: 1px solid #cbd5e1; background: white; font-weight: 700; cursor: pointer;">Siguiente &rsaquo;</button>
                </div>
              </div>
            }
          </fieldset>

          <!-- SUB-SECCIÓN: OPERACIÓN (FIELDSET / LEGEND) -->
          <fieldset style="border: 2px solid #cbd5e1; border-radius: 12px; padding: 1.5rem; position: relative;">
            <legend style="padding: 0 0.75rem; font-weight: 800; color: #166534; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em; margin-left: 1rem;">Operación</legend>
            
            <div style="margin-bottom: 1rem; display: flex; justify-content: flex-end; gap: 0.5rem;">
              <button class="btn-primary-small" style="background: #10b981; color: white;" (click)="exportToExcel()">
                📊 Excel
              </button>
              <button class="btn-primary-small" style="background: #ef4444; color: white;" (click)="exportToPDF()">
                📄 PDF
              </button>
            </div>

            <div class="table-wrapper">
              <table class="qa-table">
                <thead>
                  <tr>
                    <th style="width: 120px;">Acciones</th>
                    <th>Estado</th>
                    <th (click)="toggleSort('operPren', 'prensa')">
                      Prensa <span class="sort-icon">{{ operPrenSortCol() === 'prensa' ? (operPrenSortDir() === 'asc' ? '↑' : '↓') : '' }}</span>
                    </th>
                    <th (click)="toggleFilter('oper-turno', $event)">
                      Turno
                      @if (activeFilter() === 'oper-turno') {
                        <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                          <div class="filter-group">
                            <input type="text" class="search-input" placeholder="Buscar..." [ngModel]="operPrenTurno()" (ngModelChange)="operPrenTurno.set($event)">
                          </div>
                        </div>
                      }
                    </th>
                    <th (click)="toggleFilter('oper-producto', $event)">
                      Producto
                      @if (activeFilter() === 'oper-producto') {
                        <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                          <div class="filter-group">
                            <input type="text" class="search-input" placeholder="Buscar..." [ngModel]="operPrenProducto()" (ngModelChange)="operPrenProducto.set($event)">
                          </div>
                        </div>
                      }
                    </th>
                    <th (click)="toggleFilter('oper-operador', $event)">
                      Operador
                      @if (activeFilter() === 'oper-operador') {
                        <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                          <div class="filter-group">
                            <input type="text" class="search-input" placeholder="Buscar..." [ngModel]="operPrenOperador()" (ngModelChange)="operPrenOperador.set($event)">
                          </div>
                        </div>
                      }
                    </th>
                    <th class="text-right">Tiempo Interrupción</th>
                    <th class="text-right">Producido</th>
                  </tr>
                </thead>
                <tbody>
                  @if (loading()) {
                    <tr><td colspan="8" class="loading-cell">Cargando operación...</td></tr>
                  } @else if (filteredOperacionPren().length === 0) {
                    <tr><td colspan="8" class="empty-cell">Sin registros en operación.</td></tr>
                  } @else {
                    @for (item of filteredOperacionPren(); track item.id) {
                      <tr [class.row-active]="item.enCurso">
                        <td class="actions-cell">
                          <div class="actions-flex" style="display: flex; gap: 0.35rem; align-items: center;">
                            <button class="btn-icon-edit" title="Editar" (click)="openPrensadoEditModal(item.id)">
                              <span class="icon">✎</span>
                            </button>
                            <button class="btn-icon-delete" title="Eliminar" (click)="deletePrensado(item.id)">
                              <span class="icon">×</span>
                            </button>
                            <button class="btn-icon-warn" [class.active-expand]="isPrensadoRowExpanded(item.id)" title="Ver Carreras" (click)="togglePrensadoRow(item.id, $event)" style="background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 6px;">
                              <span class="icon" style="font-weight: bold;">!</span>
                            </button>
                          </div>
                        </td>
                        <td>
                          <span [className]="
                            item.status === 'EnProceso' ? 'qa-badge-green' :
                            item.status === 'Intermedia' ? 'qa-badge-orange' :
                            item.status === 'Parada' ? 'qa-badge-red' :
                            item.status === 'Terminada' ? 'qa-badge-blue' :
                            item.status === 'PorProgramar' ? 'qa-badge-red' : 'qa-badge-blue'
                          ">
                            {{ 
                              item.status === 'EnProceso' ? 'En Proceso' : 
                              item.status === 'Intermedia' ? 'Intermedio' : 
                              item.status === 'Parada' ? 'Detenido' : 
                              item.status === 'Terminada' ? 'Terminado' : 
                              item.status === 'PorProgramar' ? 'Por Programar' : 
                              item.status === 'Programada' ? 'Programado' : item.status 
                            }}
                          </span>
                        </td>
                        <td>
                          <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span style="color: #166534; font-weight: bold;">✔</span>
                            <strong>{{ item.prensa }}</strong>
                          </div>
                        </td>
                        <td>{{ item.turno }}</td>
                        <td>{{ item.producto }}</td>
                        <td>{{ item.operador || 'Sin asignar' }}</td>
                        <td class="text-right">{{ item.tiempoInterrupcion }} min</td>
                        <td class="text-right font-bold">{{ item.producido | number }}</td>
                      </tr>

                      <!-- DETALLES EXPANDIBLES -->
                      @if (isPrensadoRowExpanded(item.id)) {
                        <tr class="expanded-row-tr">
                          <td colspan="8" class="expanded-row-td" style="padding: 1.5rem 2rem; background: rgba(248, 250, 252, 0.6); border-bottom: 1.5px solid #e2e8f0;">
                            <div class="expanded-detail-container animate-slide-up" style="display: flex; flex-direction: column; gap: 1rem;">
                              <div class="expand-header-row" style="display: flex; justify-content: space-between; align-items: center;">
                                <div class="expand-title" style="display: flex; align-items: center; gap: 0.5rem;">
                                  <span style="font-size: 1.1rem;">🏃‍♂️</span>
                                  <h4 style="margin: 0; font-size: 0.95rem; font-weight: 800; color: #1e293b; text-transform: uppercase; letter-spacing: 0.05em;">Carreras Registradas</h4>
                                </div>
                              </div>

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
                                        <tr style="border-bottom: 1px solid #f1f5f9;">
                                          <td style="padding: 0.5rem 0.8rem; font-weight: 700; color: #0f172a;">{{ c.bobina }}</td>
                                          <td style="padding: 0.5rem 0.8rem; text-align: right; color: #334155;">{{ c.reposoHr }}</td>
                                          <td style="padding: 0.5rem 0.8rem; text-align: right; font-weight: 600; color: #10b981;">{{ c.carreras }}</td>
                                          <td style="padding: 0.5rem 0.8rem; text-align: right; color: #64748b;">{{ c.enProceso }}</td>
                                          <td style="padding: 0.5rem 0.8rem; text-align: right; font-weight: 600; color: #0f172a;">{{ c.terminadas }}</td>
                                          <td style="padding: 0.5rem 0.8rem; text-align: right; font-weight: 600; color: #10b981;">{{ c.validadas }}</td>
                                          <td style="padding: 0.5rem 0.8rem; color: #475569;"><span style="background: #f1f5f9; padding: 0.2rem 0.4rem; border-radius: 4px; font-weight: 600;">{{ c.carretes }}</span></td>
                                        </tr>
                                      }
                                    </tbody>
                                  </table>
                                </div>
                              } @else {
                                <div style="padding: 1.25rem; background: white; border: 1px dashed #cbd5e1; border-radius: 8px; text-align: center; color: #94a3b8; font-style: italic;">
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
          </fieldset>
        </div>
      </div>

      <!-- MODAL EDICIÓN PRENSADO -->
      @if (showPrensadoModal()) {
        <div class="modal-backdrop animate-fade-in" (click)="closePrensadoModal()">
          <div class="modal-container animate-slide-up" style="max-width: 950px; width: 95%;" (click)="$event.stopPropagation()">
            <header class="modal-header">
              <h2>Información general</h2>
              <button class="btn-close" (click)="closePrensadoModal()">×</button>
            </header>
            
            <div class="modal-body" *ngIf="selectedPrensado()">
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; align-items: start;">
                <!-- COLUMNA 1 -->
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                  <div class="form-group">
                    <label>Id</label>
                    <input type="text" class="form-input" [ngModel]="selectedPrensado()?.idLegacy || '---'" readonly style="background: #f1f5f9; color: #64748b;">
                  </div>
                  <div class="form-group">
                    <label>Nombre</label>
                    <input type="text" class="form-input" [ngModel]="selectedPrensado()?.prensa || '---'" readonly style="background: #f1f5f9; color: #64748b;">
                  </div>
                  <div class="form-group">
                    <label>Producto Id</label>
                    <input type="text" class="form-input" [ngModel]="selectedPrensado()?.productoId || '---'" readonly style="background: #f1f5f9; color: #64748b;">
                  </div>
                  <div class="form-group">
                    <label>Operador Nombre</label>
                    <input type="text" class="form-input" [ngModel]="selectedPrensado()?.operador || '---'" readonly style="background: #f1f5f9; color: #64748b;">
                  </div>
                  <div class="form-group">
                    <label>Unidad Medida (Levas)</label>
                    <select class="form-select" [ngModel]="selectedPrensado()?.levasUnidadMedida || 'Kg'" (ngModelChange)="selectedPrensado().levasUnidadMedida = $event">
                      <option value="Kg">Kg</option>
                      <option value="Grados">Grados</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Grados Entrada (Levas)</label>
                    <input type="number" step="0.1" class="form-input" [ngModel]="selectedPrensado()?.levasGradosEntrada" (ngModelChange)="selectedPrensado().levasGradosEntrada = $event">
                  </div>
                  <div class="form-group">
                    <label>Kg Salida (Levas)</label>
                    <input type="number" step="0.1" class="form-input" [ngModel]="selectedPrensado()?.levasKgSalida" (ngModelChange)="selectedPrensado().levasKgSalida = $event">
                  </div>
                  <div class="form-group">
                    <label>Troquel Id</label>
                    <div style="display: flex; gap: 0.25rem;">
                      <input type="text" class="form-input" [ngModel]="selectedPrensado()?.troquelId || ''" (ngModelChange)="selectedPrensado().troquelId = $event" placeholder="Buscar troquel...">
                      <button class="btn-icon-edit" style="width: 38px; height: 38px; flex-shrink: 0;" title="Buscar troquel">
                        <span class="icon">🔍</span>
                      </button>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Fin Proceso</label>
                    <input type="datetime-local" class="form-input" [ngModel]="selectedPrensado()?.finProceso | date:'yyyy-MM-ddTHH:mm'" (ngModelChange)="selectedPrensado().finProceso = $event">
                  </div>
                </div>

                <!-- COLUMNA 2 -->
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                  <div class="form-group">
                    <label>Fecha</label>
                    <input type="date" class="form-input" [ngModel]="selectedPrensado()?.fecha | date:'yyyy-MM-dd'" (ngModelChange)="onPressingDateChange($event)">
                  </div>
                  <div class="form-group">
                    <label>Turno Id</label>
                    <input type="text" class="form-input" [ngModel]="selectedPrensado()?.turnoId || '---'" readonly style="background: #f1f5f9; color: #64748b;">
                  </div>
                  <div class="form-group">
                    <label>Producto Nombre</label>
                    <input type="text" class="form-input" [ngModel]="selectedPrensado()?.producto || '---'" readonly style="background: #f1f5f9; color: #64748b;">
                  </div>
                  <div class="form-group">
                    <label>Estado</label>
                    <select class="form-select" [ngModel]="selectedPrensado()?.estado" (ngModelChange)="selectedPrensado().estado = $event">
                      <option [value]="0">Programado</option>
                      <option [value]="1">En Proceso</option>
                      <option [value]="2">Intermedio</option>
                      <option [value]="3">Detenido</option>
                      <option [value]="4">Terminado</option>
                      <option [value]="5">Por Programar</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Kg Entrada (Levas)</label>
                    <input type="number" step="0.1" class="form-input" [ngModel]="selectedPrensado()?.levasKgEntrada" (ngModelChange)="selectedPrensado().levasKgEntrada = $event">
                  </div>
                  <div class="form-group">
                    <label>Grados Salida (Levas)</label>
                    <input type="number" step="0.1" class="form-input" [ngModel]="selectedPrensado()?.levasGradosSalida" (ngModelChange)="selectedPrensado().levasGradosSalida = $event">
                  </div>
                  <div class="form-group">
                    <label>Grados Entrada (Rodillos)</label>
                    <input type="number" step="0.1" class="form-input" [ngModel]="selectedPrensado()?.rodillosGradosEntrada" (ngModelChange)="selectedPrensado().rodillosGradosEntrada = $event">
                  </div>
                  <div class="form-group">
                    <label>Troquel Nombre</label>
                    <input type="text" class="form-input" [ngModel]="selectedPrensado()?.troquelNombre || '---'" readonly style="background: #f1f5f9; color: #64748b;">
                  </div>
                </div>

                <!-- COLUMNA 3 -->
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                  <div class="form-group">
                    <label>Id (Turno/Legacy)</label>
                    <input type="text" class="form-input" [ngModel]="selectedPrensado()?.idLegacy || '---'" readonly style="background: #f1f5f9; color: #64748b;">
                  </div>
                  <div class="form-group">
                    <label>Turno Nombre</label>
                    <input type="text" class="form-input" [ngModel]="selectedPrensado()?.turno || '---'" readonly style="background: #f1f5f9; color: #64748b;">
                  </div>
                  <div class="form-group">
                    <label>Operador Id</label>
                    <input type="text" class="form-input" [ngModel]="selectedPrensado()?.operadorId || '---'" readonly style="background: #f1f5f9; color: #64748b;">
                  </div>
                  <div class="form-group">
                    <label>Unidad Medida (Rodillos)</label>
                    <select class="form-select" [ngModel]="selectedPrensado()?.rodillosUnidadMedida || 'Kg'" (ngModelChange)="selectedPrensado().rodillosUnidadMedida = $event">
                      <option value="Kg">Kg</option>
                      <option value="Grados">Grados</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Kg Salida (Rodillos)</label>
                    <input type="number" step="0.1" class="form-input" [ngModel]="selectedPrensado()?.rodillosKgSalida" (ngModelChange)="selectedPrensado().rodillosKgSalida = $event">
                  </div>
                  <div class="form-group">
                    <label>Kg Entrada (Rodillos)</label>
                    <input type="number" step="0.1" class="form-input" [ngModel]="selectedPrensado()?.rodillosKgEntrada" (ngModelChange)="selectedPrensado().rodillosKgEntrada = $event">
                  </div>
                  <div class="form-group">
                    <label>Grados Salida (Rodillos)</label>
                    <input type="number" step="0.1" class="form-input" [ngModel]="selectedPrensado()?.rodillosGradosSalida" (ngModelChange)="selectedPrensado().rodillosGradosSalida = $event">
                  </div>
                  <div class="form-group">
                    <label>Inicia Proceso</label>
                    <input type="datetime-local" class="form-input" [ngModel]="selectedPrensado()?.iniciaProceso | date:'yyyy-MM-ddTHH:mm'" (ngModelChange)="selectedPrensado().iniciaProceso = $event">
                  </div>
                </div>
              </div>

              <!-- Opciones Adicionales de Producción -->
              <div class="sub-section" style="margin-top: 1.5rem;">
                <label style="display: block; font-size: 0.75rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">Especificaciones Adicionales</label>
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">
                  <div class="form-group">
                    <label>Calibre</label>
                    <input type="number" step="0.001" class="form-input" [ngModel]="selectedPrensado()?.calibre" (ngModelChange)="selectedPrensado().calibre = $event">
                  </div>
                  <div class="form-group">
                    <label>Ancho</label>
                    <input type="text" class="form-input" [ngModel]="selectedPrensado()?.ancho" (ngModelChange)="selectedPrensado().ancho = $event">
                  </div>
                  <div class="form-group">
                    <label>Longitud</label>
                    <input type="number" class="form-input" [ngModel]="selectedPrensado()?.longitud" (ngModelChange)="selectedPrensado().longitud = $event">
                  </div>
                  <div class="form-group">
                    <label>Meta</label>
                    <input type="number" class="form-input" [ngModel]="selectedPrensado()?.meta" (ngModelChange)="selectedPrensado().meta = $event">
                  </div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1rem;">
                  <div class="form-group">
                    <label>Virgen Kg</label>
                    <input type="number" step="0.01" class="form-input" [ngModel]="selectedPrensado()?.virgenKg" (ngModelChange)="selectedPrensado().virgenKg = $event">
                  </div>
                  <div class="form-group">
                    <label>Molido Kg</label>
                    <input type="number" step="0.01" class="form-input" [ngModel]="selectedPrensado()?.molidoKg" (ngModelChange)="selectedPrensado().molidoKg = $event">
                  </div>
                  <div class="form-group">
                    <label>Lote Silo</label>
                    <input type="text" class="form-input" [ngModel]="selectedPrensado()?.loteSilo" (ngModelChange)="selectedPrensado().loteSilo = $event">
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
    
    .section-card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05); overflow: hidden; }
    .mb-6 { margin-bottom: 2rem; }
    
    .table-wrapper { overflow-x: auto; }
    .row-active td { background: #f0fdf4 !important; }

    .sort-icon { font-size: 0.8rem; margin-left: 0.4rem; color: #94a3b8; }
    .turno-badge { padding: 0.25rem 0.6rem; background: #f1f5f9; border-radius: 6px; color: #475569; font-size: 0.8rem; font-weight: 700; border: 1px solid #e2e8f0; }

    .btn-icon-edit, .btn-icon-delete, .btn-icon-warn { width: 32px; height: 32px; border-radius: 8px; border: 1px solid #e2e8f0; background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; font-size: 1rem; }
    .btn-icon-edit { color: #3b82f6; }
    .btn-icon-edit:hover { background: #3b82f6; color: white; border-color: #3b82f6; transform: scale(1.1); box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); }
    
    .btn-icon-delete { color: #ef4444; }
    .btn-icon-delete:hover { background: #ef4444; color: white; border-color: #ef4444; transform: scale(1.1); box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3); }
    
    .btn-icon-warn { color: #d97706; }
    .btn-icon-warn:hover { background: #f59e0b; color: white; border-color: #f59e0b; transform: scale(1.1); box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3); }

    .actions-cell { width: 140px; }
    .actions-flex { display: flex; gap: 0.5rem; align-items: center; }

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
    .sub-section { border-top: 1px solid #f1f5f9; padding-top: 2rem; }

    .animate-move-up { animation: moveUp 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
    @keyframes moveUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .animate-fade-in { animation: fadeIn 0.3s ease; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .animate-slide-up { animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
    @keyframes slideUp { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

    /* FILTROS POP OVER */
    .filter-popover { position: absolute; background: white; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); padding: 1rem; width: 220px; z-index: 100; margin-top: 0.5rem; text-transform: none; }
    .filter-group { display: flex; flex-direction: column; gap: 0.5rem; }
    .search-input { width: 100%; padding: 0.6rem; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 0.85rem; outline: none; }
    .search-input:focus { border-color: #166534; box-shadow: 0 0 0 2px rgba(22, 101, 52, 0.1); }

    .btn-primary-small { background: #166534; color: white; border: none; padding: 0.5rem 1rem; border-radius: 8px; font-weight: 700; font-size: 0.8rem; cursor: pointer; transition: all 0.2s; }
    .btn-primary-small:hover { background: #14532d; }

    .form-group { margin-bottom: 1rem; }
    .form-group label { display: block; font-size: 0.75rem; font-weight: 700; color: #64748b; margin-bottom: 0.4rem; }
    .form-input { width: 100%; padding: 0.6rem; border-radius: 8px; border: 1px solid #cbd5e1; outline: none; font-size: 0.9rem; }
    .form-input:focus { border-color: #166534; box-shadow: 0 0 0 2px rgba(22, 101, 52, 0.1); }
    .form-select { width: 100%; padding: 0.6rem; border-radius: 8px; border: 1px solid #cbd5e1; outline: none; font-size: 0.9rem; }

    .delete-icon-large { font-size: 4rem; color: #f59e0b; margin-bottom: 1rem; }
    .btn-cancel { background: transparent; border: 1px solid #cbd5e1; color: #475569; padding: 0.6rem 1.25rem; border-radius: 8px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
    .btn-cancel:hover { background: #f1f5f9; }
    .btn-confirm { background: #166534; color: white; border: none; padding: 0.6rem 1.5rem; border-radius: 8px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
    .btn-confirm:hover { background: #14532d; }

    /* QA Layout Styles */
    .qa-table { width: 100%; border-collapse: collapse; text-align: left; }
    .qa-table th { padding: 12px 10px; border-bottom: 2px solid #cbd5e1; background: #fafafa; color: #475569; font-weight: 700; font-size: 13px; border-top: 1px solid #e2e8f0; cursor: pointer; }
    .qa-table td { padding: 12px 10px; border-bottom: 1px solid #cbd5e1; font-size: 13px; vertical-align: middle; color: #333; }
    .qa-table tr:hover td { background-color: #f8fafc; }
    .qa-badge-blue { background-color: #e0f2fe; color: #0369a1; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; border: 1px solid #bae6fd; display: inline-block; }
    .qa-badge-orange { background-color: #ffedd5; color: #c2410c; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; border: 1px solid #fed7aa; display: inline-block; }
    .qa-badge-red { background-color: #fee2e2; color: #b91c1c; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; border: 1px solid #fca5a5; display: inline-block; }
    .qa-badge-green { background-color: #dcfce7; color: #15803d; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; border: 1px solid #bbf7d0; display: inline-block; }
  `]
})
export class InicioPrensadoComponent implements OnInit {
  private svc = inject(ProduccionConfigService);

  loading = signal(false);

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

  // Prensado arrays and Tablero Directivo
  programacionPren = signal<PrensadoProgramacion[]>([]);
  operacionPren = signal<PrensadoOperacion[]>([]);
  selectedPrensado = signal<any>(null);
  showPrensadoModal = signal(false);
  showDeleteConfirmModalPrensado = signal(false);
  activePrensadoId = signal<string | null>(null);
  showTableroDirectivo = signal(false);
  tableroDirectivoPage = signal(1);
  tableroDirectivoPageSize = 10;
  tableroDirectivoList = signal<any[]>([]);

  operariosDisponibles = signal<any[]>([]);

  // Filtros dinámicos
  activeFilter = signal<string | null>(null);

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
    this.loadPrensado();
    this.loadOperarios();
  }

  loadOperarios() {
    this.svc.getOperarios().subscribe(res => this.operariosDisponibles.set(res));
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

    this.svc.getPrensados().subscribe({
      next: res => this.tableroDirectivoList.set(res),
      error: () => {}
    });
  }

  getPrensadoStatusName(estado: number): string {
    const names = ['Programada', 'EnProceso', 'Intermedia', 'Parada', 'Terminada', 'PorProgramar'];
    return names[estado] || 'Programada';
  }

  getPrensadoStatusLabel(estado: number): string {
    const labels = ['Programado', 'En Proceso', 'Intermedio', 'Detenido', 'Terminado', 'Por Programar'];
    return labels[estado] || 'Programado';
  }

  getPaginatedTableroDirectivo(): any[] {
    const start = (this.tableroDirectivoPage() - 1) * this.tableroDirectivoPageSize;
    const end = start + this.tableroDirectivoPageSize;
    return this.tableroDirectivoList().slice(start, end);
  }

  getTableroTotalPages(): number {
    return Math.ceil(this.tableroDirectivoList().length / this.tableroDirectivoPageSize) || 1;
  }

  getTableroPages(): number[] {
    const total = this.getTableroTotalPages();
    const current = this.tableroDirectivoPage();
    const pages: number[] = [];
    let start = Math.max(1, current - 2);
    let end = Math.min(total, start + 4);
    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  getTableroSumProgramado(): number {
    return this.tableroDirectivoList().reduce((acc, item) => acc + (item.programado || 0), 0);
  }

  getTableroSumProducido(): number {
    return this.tableroDirectivoList().reduce((acc, item) => acc + (item.producido || 0), 0);
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
      estado: Number(p.estado),
      operarioId: p.operadorId || null,
      troquelId: p.troquelId || null,
      levasUnidadMedida: p.levasUnidadMedida || 'Kg',
      rodillosUnidadMedida: p.rodillosUnidadMedida || 'Kg',
      levasKgEntrada: Number(p.levasKgEntrada || 0),
      levasKgSalida: Number(p.levasKgSalida || 0),
      levasGradosEntrada: Number(p.levasGradosEntrada || 0),
      levasGradosSalida: Number(p.levasGradosSalida || 0),
      rodillosKgEntrada: Number(p.rodillosKgEntrada || 0),
      rodillosKgSalida: Number(p.rodillosKgSalida || 0),
      rodillosGradosEntrada: Number(p.rodillosGradosEntrada || 0),
      rodillosGradosSalida: Number(p.rodillosGradosSalida || 0),
      iniciaProceso: p.iniciaProceso || null,
      finProceso: p.finProceso || null,
      calibre: Number(p.calibre || 0),
      ancho: p.ancho || '',
      longitud: Number(p.longitud || 0),
      virgenKg: Number(p.virgenKg || 0),
      molidoKg: Number(p.molidoKg || 0),
      meta: Number(p.meta || 0),
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

  exportToExcel() {
    const list = this.filteredOperacionPren();
    const data = list.map(item => ({
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
    const filename = `Reporte_Prensado_Operacion_${new Date().toISOString().split('T')[0]}.xlsx`;

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Operacion');
    XLSX.writeFile(wb, filename);
  }

  exportToPDF() {
    const doc = new jsPDF({ orientation: 'landscape' });
    const title = 'Reporte de Prensado - Operación';
    const headers = [['Estado', 'Prensa', 'Turno', 'Producto', 'Operador', 'Producido (Kg)', 'Tiempo Interrupción', 'En Curso', 'Prensa ID']];
    const rows = this.filteredOperacionPren().map(item => [
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

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(22, 101, 52);
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
        fillColor: [22, 101, 52],
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

  toggleSort(table: 'progPren' | 'operPren', column: string) {
    if (table === 'progPren') {
      const dir = this.progPrenSortCol() === column && this.progPrenSortDir() === 'asc' ? 'desc' : 'asc';
      this.progPrenSortCol.set(column);
      this.progPrenSortDir.set(dir);
    } else if (table === 'operPren') {
      const dir = this.operPrenSortCol() === column && this.operPrenSortDir() === 'asc' ? 'desc' : 'asc';
      this.operPrenSortCol.set(column);
      this.operPrenSortDir.set(dir);
    }
  }

  toggleFilter(id: string, event: MouseEvent) {
    event.stopPropagation();
    if (this.activeFilter() === id) {
      this.activeFilter.set(null);
    } else {
      this.activeFilter.set(id);
    }
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.activeFilter.set(null);
  }
}
