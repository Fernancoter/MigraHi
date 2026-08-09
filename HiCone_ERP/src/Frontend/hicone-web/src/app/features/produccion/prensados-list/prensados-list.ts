import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ProduccionService } from '../../../core/services/produccion';

const ALL_COLUMNS = [
  'fecha', 'prensa', 'turno', 'producto', 'operador', 'interrupcion', 'estado',
  'umLevas', 'umRodillos', 'levasKgEntrada', 'levasKgSalida', 'levasGradosEntrada', 'levasGradosSalida',
  'rodillosKgEntrada', 'rodillosKgSalida', 'rodillosGradosEntrada', 'rodillosGradosSalida',
  'troquel', 'iniciaProceso', 'finProceso', 'pallets'
];

const ESTADO_LABELS: Record<number, string> = {
  0: 'Programado',
  1: 'En Proceso',
  2: 'Terminado',
  3: 'Anticipado',
  4: 'Cancelado'
};

const ESTADO_CLASS: Record<number, string> = {
  0: 'status-programado',
  1: 'status-enproceso',
  2: 'status-terminado',
  3: 'status-anticipado',
  4: 'status-cancelado'
};

@Component({
  selector: 'app-prensados-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up" (click)="closeAllDropdowns()">

      <div class="page-header-premium">
        <div class="title-section">
          <h1 class="premium-title">Órdenes de Prensado</h1>
          <nav class="breadcrumb-modern">
            <span class="root">Prensado</span>
            <span class="sep">&rsaquo;</span>
            <span class="root">Operación</span>
            <span class="sep">&rsaquo;</span>
            <span class="active">Prensados</span>
          </nav>
        </div>
      </div>

      <div class="actions-toolbar" style="margin-bottom: 1.5rem;">
          <div class="toolbar-left">
            <div class="dropdown-wrapper">
              <button class="btn btn-secondary" (click)="toggleExportDropdown($event)">
                <span><svg class="btn-icon-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></span> Exportar
              </button>
              @if (showExportOptions()) {
                <div class="dd-popover animate-slide-up" (click)="$event.stopPropagation()">
                  <div class="dd-item" (click)="exportCSV()">Excel (CSV)</div>
                  <div class="dd-item" (click)="exportPDF()">PDF</div>
                </div>
              }
            </div>

            <div class="dropdown-wrapper">
              <button class="btn btn-secondary btn-cols" (click)="toggleColumnDropdown($event)">
                <svg class="btn-icon-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg> Selecciona columnas ▾
              </button>
              @if (showColumnSelector()) {
                <div class="col-sel-popover animate-slide-up" (click)="$event.stopPropagation()">
                  <div class="col-group">
                    <label class="col-group-label">
                      <input type="checkbox" [checked]="allColsVisible()" (change)="toggleAllCols()" /> Mostrar Columnas ▾
                    </label>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('fecha')" (change)="toggleCol('fecha')" /> Fecha</label>
                    </div>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('prensa')" (change)="toggleCol('prensa')" /> Prensa</label>
                    </div>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('turno')" (change)="toggleCol('turno')" /> Turno</label>
                    </div>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('producto')" (change)="toggleCol('producto')" /> Producto</label>
                    </div>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('operador')" (change)="toggleCol('operador')" /> Operador</label>
                    </div>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('interrupcion')" (change)="toggleCol('interrupcion')" /> Tiempo Interrupción</label>
                    </div>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('estado')" (change)="toggleCol('estado')" /> Estado</label>
                    </div>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('umLevas')" (change)="toggleCol('umLevas')" /> U.M. Levas</label>
                    </div>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('umRodillos')" (change)="toggleCol('umRodillos')" /> U.M. Rodillos</label>
                    </div>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('levasKgEntrada')" (change)="toggleCol('levasKgEntrada')" /> Levas Kg Entrada</label>
                    </div>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('levasKgSalida')" (change)="toggleCol('levasKgSalida')" /> Levas Kg Salida</label>
                    </div>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('levasGradosEntrada')" (change)="toggleCol('levasGradosEntrada')" /> Levas Grados Entrada</label>
                    </div>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('levasGradosSalida')" (change)="toggleCol('levasGradosSalida')" /> Levas Grados Salida</label>
                    </div>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('rodillosKgEntrada')" (change)="toggleCol('rodillosKgEntrada')" /> Rodillos Kg Entrada</label>
                    </div>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('rodillosKgSalida')" (change)="toggleCol('rodillosKgSalida')" /> Rodillos Kg Salida</label>
                    </div>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('rodillosGradosEntrada')" (change)="toggleCol('rodillosGradosEntrada')" /> Rodillos Grados Entrada</label>
                    </div>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('rodillosGradosSalida')" (change)="toggleCol('rodillosGradosSalida')" /> Rodillos Grados Salida</label>
                    </div>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('troquel')" (change)="toggleCol('troquel')" /> Troquel</label>
                    </div>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('iniciaProceso')" (change)="toggleCol('iniciaProceso')" /> Inicia Proceso</label>
                    </div>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('finProceso')" (change)="toggleCol('finProceso')" /> Fin Proceso</label>
                    </div>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('pallets')" (change)="toggleCol('pallets')" /> Pallets</label>
                    </div>
                  </div>
                  <button class="btn-actualizar" (click)="showColumnSelector.set(false)">↺ Actualizar</button>
                </div>
              }
            </div>
          </div>

          <div style="flex:1"></div>

          <div class="toolbar-right">
            <div class="search-box">
              <span class="search-icon"><svg class="search-icon-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
              <input class="search-input" type="text" placeholder="Buscar..." [ngModel]="searchText()" (ngModelChange)="searchText.set($event)" />
            </div>
          </div>
      </div>

      <!-- TABLA -->
      <div class="content-card">
        <table class="data-table">
          <thead>
            <tr>
              <th class="col-acciones">Acciones</th>
              @if (isColVisible('fecha')) { <th>Fecha</th> }
              @if (isColVisible('prensa')) { <th>Prensa</th> }
              @if (isColVisible('turno')) { <th>Turno</th> }
              @if (isColVisible('producto')) { <th>Producto</th> }
              @if (isColVisible('operador')) { <th>Operador</th> }
              @if (isColVisible('interrupcion')) { <th>Tiempo Interrupción (min)</th> }
              @if (isColVisible('estado')) { <th>Estado</th> }
              @if (isColVisible('umLevas')) { <th>U.M. Levas</th> }
              @if (isColVisible('umRodillos')) { <th>U.M. Rodillos</th> }
              @if (isColVisible('levasKgEntrada')) { <th>Levas Kg Entrada</th> }
              @if (isColVisible('levasKgSalida')) { <th>Levas Kg Salida</th> }
              @if (isColVisible('levasGradosEntrada')) { <th>Levas Grados Entrada</th> }
              @if (isColVisible('levasGradosSalida')) { <th>Levas Grados Salida</th> }
              @if (isColVisible('rodillosKgEntrada')) { <th>Rodillos Kg Entrada</th> }
              @if (isColVisible('rodillosKgSalida')) { <th>Rodillos Kg Salida</th> }
              @if (isColVisible('rodillosGradosEntrada')) { <th>Rodillos Grados Entrada</th> }
              @if (isColVisible('rodillosGradosSalida')) { <th>Rodillos Grados Salida</th> }
              @if (isColVisible('troquel')) { <th>Troquel</th> }
              @if (isColVisible('iniciaProceso')) { <th>Inicia Proceso</th> }
              @if (isColVisible('finProceso')) { <th>Fin Proceso</th> }
              @if (isColVisible('pallets')) { <th>Pallets</th> }
            </tr>
          </thead>
          <tbody>
            @for (item of paginatedItems(); track item.id) {
              <tr [ngClass]="estadoClass(item.estado)">
                <td class="col-acciones">
                  <button class="icon-btn" title="Carreras por Prensado" (click)="toggleCarrerasPanel(item)"><svg class="icon-btn-svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></button>
                  @if (item.estado === 2) {
                    <button class="icon-btn" title="Imprimir" (click)="imprimir(item)"><svg class="icon-btn-svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg></button>
                  }
                  <a class="row-action" (click)="visualizar(item)">Visualizar</a>
                  <a class="row-action" (click)="modificar(item)">Modificar</a>
                  <a class="row-action row-action-danger" (click)="eliminar(item)">Eliminar</a>
                </td>
                @if (isColVisible('fecha')) { <td>{{ item.fecha | date:'dd/MM/yyyy' }}</td> }
                @if (isColVisible('prensa')) { <td class="col-nombre">{{ item.prensa?.nombre }}</td> }
                @if (isColVisible('turno')) { <td>{{ item.turno?.nombre }}</td> }
                @if (isColVisible('producto')) { <td>{{ item.producto?.nombre }}</td> }
                @if (isColVisible('operador')) { <td>{{ item.operario?.nombreCompleto }}</td> }
                @if (isColVisible('interrupcion')) { <td>{{ item.tiempoInterrupcionMin ?? 0 }}</td> }
                @if (isColVisible('estado')) {
                  <td>
                    <span class="status-badge" [ngClass]="estadoClass(item.estado)">
                      {{ estadoLabel(item.estado) }}
                    </span>
                  </td>
                }
                @if (isColVisible('umLevas')) { <td>{{ item.levasUnidadMedida || 'Kg' }}</td> }
                @if (isColVisible('umRodillos')) { <td>{{ item.rodillosUnidadMedida || 'Kg' }}</td> }
                @if (isColVisible('levasKgEntrada')) { <td>{{ item.levasKgEntrada ?? 0 }}</td> }
                @if (isColVisible('levasKgSalida')) { <td>{{ item.levasKgSalida ?? 0 }}</td> }
                @if (isColVisible('levasGradosEntrada')) { <td>{{ item.levasGradosEntrada ?? 0 }}</td> }
                @if (isColVisible('levasGradosSalida')) { <td>{{ item.levasGradosSalida ?? 0 }}</td> }
                @if (isColVisible('rodillosKgEntrada')) { <td>{{ item.rodillosKgEntrada ?? 0 }}</td> }
                @if (isColVisible('rodillosKgSalida')) { <td>{{ item.rodillosKgSalida ?? 0 }}</td> }
                @if (isColVisible('rodillosGradosEntrada')) { <td>{{ item.rodillosGradosEntrada ?? 0 }}</td> }
                @if (isColVisible('rodillosGradosSalida')) { <td>{{ item.rodillosGradosSalida ?? 0 }}</td> }
                @if (isColVisible('troquel')) { <td>{{ item.troquel?.nombre || '—' }}</td> }
                @if (isColVisible('iniciaProceso')) { <td>{{ item.horaIniciaProceso ? (item.horaIniciaProceso | date:'dd/MM/yy HH:mm') : '—' }}</td> }
                @if (isColVisible('finProceso')) { <td>{{ item.horaFinProceso ? (item.horaFinProceso | date:'dd/MM/yy HH:mm') : '—' }}</td> }
                @if (isColVisible('pallets')) { <td>{{ item.totalPallets ?? 0 }}</td> }
              </tr>
              @if (expandedPrensadoId() === item.id) {
                <tr class="carreras-panel-row">
                  <td [attr.colspan]="visibleCount() + 1">
                    <div class="carreras-panel">
                      <div class="carreras-panel-title">Carreras por Prensado</div>
                      @if (loadingCarrerasPanel()) {
                        <div class="carreras-panel-empty">Cargando...</div>
                      } @else if (carrerasPorBobina().length === 0) {
                        <div class="carreras-panel-empty">Sin carreras registradas para este prensado.</div>
                      } @else {
                        <table class="mini-table">
                          <thead>
                            <tr>
                              <th>Bobina</th>
                              <th>Reposo (Hr)</th>
                              <th>Carreras</th>
                              <th>En Proceso</th>
                              <th>Terminadas</th>
                              <th>Validadas</th>
                              <th>Carretes</th>
                            </tr>
                          </thead>
                          <tbody>
                            @for (b of carrerasPorBobina(); track b.bobinaId) {
                              <tr>
                                <td class="col-nombre">{{ b.bobina }}</td>
                                <td>{{ b.reposoHr ?? '—' }}</td>
                                <td>{{ b.carreras }}</td>
                                <td>{{ b.enProceso }}</td>
                                <td>{{ b.terminadas }}</td>
                                <td>{{ b.validadas }}</td>
                                <td>{{ b.carretes }}</td>
                              </tr>
                            }
                          </tbody>
                        </table>
                      }
                    </div>
                  </td>
                </tr>
              }
            }
            @if (paginatedItems().length === 0) {
              <tr>
                <td [attr.colspan]="visibleCount() + 1" class="empty-state">No se encontraron prensados.</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <!-- Paginación -->
      @if (filteredItems().length > 0) {
        <div class="pagination-container">
          <span class="pagination-label">Página {{ currentPage() }} de {{ totalPages() }}</span>
          <div class="pagination-buttons">
            <button class="pag-btn" [disabled]="currentPage() === 1" (click)="prevPage()">&laquo;</button>
            @for (p of getPages(currentPage(), totalPages()); track p) {
              @if (p === '...') {
                <span class="pag-dots">...</span>
              } @else {
                <button class="pag-btn" [class.active]="currentPage() === p" (click)="setPage(p)">{{ p }}</button>
              }
            }
            <button class="pag-btn" [disabled]="currentPage() === totalPages()" (click)="nextPage()">&raquo;</button>
          </div>
        </div>
      }

      <!-- Modal Visualizar -->
      @if (viewingItem(); as v) {
        <div class="modal-overlay" (click)="cerrarVisualizar()">
          <div class="modal-card" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h2>Detalle del Prensado</h2>
              <button class="modal-close" (click)="cerrarVisualizar()"><svg class="close-icon-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            </div>
            <div class="modal-body">
              <div class="detail-grid">
                <div class="detail-item"><span class="d-label">Fecha</span><span class="d-value">{{ v.fecha | date:'dd/MM/yyyy' }}</span></div>
                <div class="detail-item"><span class="d-label">Prensa</span><span class="d-value">{{ v.prensa }}</span></div>
                <div class="detail-item"><span class="d-label">Turno</span><span class="d-value">{{ v.turno }}</span></div>
                <div class="detail-item"><span class="d-label">Producto</span><span class="d-value">{{ v.producto }} — {{ v.productoDescripcion }}</span></div>
                <div class="detail-item"><span class="d-label">Operador</span><span class="d-value">{{ v.operador }}</span></div>
                <div class="detail-item"><span class="d-label">Estado</span><span class="d-value">{{ v.status }}</span></div>
                <div class="detail-item"><span class="d-label">Troquel</span><span class="d-value">{{ v.troquelNombre || '—' }}</span></div>
                <div class="detail-item"><span class="d-label">Lote Silo</span><span class="d-value">{{ v.loteSilo || '—' }}</span></div>
                <div class="detail-item"><span class="d-label">Calibre / Ancho / Longitud</span><span class="d-value">{{ v.calibre }} / {{ v.ancho }} / {{ v.longitud }}</span></div>
                <div class="detail-item"><span class="d-label">Kg Virgen / Molido</span><span class="d-value">{{ v.virgenKg }} / {{ v.molidoKg }}</span></div>
                <div class="detail-item"><span class="d-label">Meta</span><span class="d-value">{{ v.meta }}</span></div>
                <div class="detail-item"><span class="d-label">Levas ({{ v.levasUnidadMedida }})</span><span class="d-value">Entrada {{ v.levasKgEntrada }} / Salida {{ v.levasKgSalida }} · {{ v.levasGradosEntrada }}° / {{ v.levasGradosSalida }}°</span></div>
                <div class="detail-item"><span class="d-label">Rodillos ({{ v.rodillosUnidadMedida }})</span><span class="d-value">Entrada {{ v.rodillosKgEntrada }} / Salida {{ v.rodillosKgSalida }} · {{ v.rodillosGradosEntrada }}° / {{ v.rodillosGradosSalida }}°</span></div>
                <div class="detail-item"><span class="d-label">Inicia Proceso</span><span class="d-value">{{ v.iniciaProceso | date:'dd/MM/yyyy HH:mm' }}</span></div>
                <div class="detail-item"><span class="d-label">Fin Proceso</span><span class="d-value">{{ v.finProceso ? (v.finProceso | date:'dd/MM/yyyy HH:mm') : '—' }}</span></div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" (click)="cerrarVisualizar()">Cerrar</button>
            </div>
          </div>
        </div>
      }

      <!-- Modal Modificar -->
      @if (editForm(); as f) {
        <div class="modal-overlay" (click)="cerrarModificar()">
          <div class="modal-card" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h2>Modificar Prensado</h2>
              <button class="modal-close" (click)="cerrarModificar()"><svg class="close-icon-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            </div>
            <div class="modal-body">
              <div class="form-grid">
                <div class="form-field">
                  <label>Fecha</label>
                  <input type="date" [(ngModel)]="f.fecha" />
                </div>
                <div class="form-field">
                  <label>Estado</label>
                  <select [(ngModel)]="f.estado">
                    @for (opt of estadoOptions; track opt.value) {
                      <option [value]="opt.value">{{ opt.label }}</option>
                    }
                  </select>
                </div>
                <div class="form-field">
                  <label>Operario</label>
                  <select [(ngModel)]="f.operarioId">
                    @for (op of operarios(); track op.id) {
                      <option [value]="op.id">{{ op.nombreCompleto }}</option>
                    }
                  </select>
                </div>
                <div class="form-field">
                  <label>Troquel</label>
                  <select [(ngModel)]="f.troquelId">
                    <option [value]="null">-- Sin troquel --</option>
                    @for (t of troqueles(); track t.id) {
                      <option [value]="t.id">{{ t.nombre }}</option>
                    }
                  </select>
                </div>
                <div class="form-field">
                  <label>U.M. Levas</label>
                  <select [(ngModel)]="f.levasUnidadMedida">
                    <option value="Kg">Kg</option>
                    <option value="Grados">Grados</option>
                  </select>
                </div>
                <div class="form-field">
                  <label>U.M. Rodillos</label>
                  <select [(ngModel)]="f.rodillosUnidadMedida">
                    <option value="Kg">Kg</option>
                    <option value="Grados">Grados</option>
                  </select>
                </div>
                <div class="form-field">
                  <label>Levas Kg Entrada</label>
                  <input type="number" [(ngModel)]="f.levasKgEntrada" />
                </div>
                <div class="form-field">
                  <label>Levas Kg Salida</label>
                  <input type="number" [(ngModel)]="f.levasKgSalida" />
                </div>
                <div class="form-field">
                  <label>Levas Grados Entrada</label>
                  <input type="number" [(ngModel)]="f.levasGradosEntrada" />
                </div>
                <div class="form-field">
                  <label>Levas Grados Salida</label>
                  <input type="number" [(ngModel)]="f.levasGradosSalida" />
                </div>
                <div class="form-field">
                  <label>Rodillos Kg Entrada</label>
                  <input type="number" [(ngModel)]="f.rodillosKgEntrada" />
                </div>
                <div class="form-field">
                  <label>Rodillos Kg Salida</label>
                  <input type="number" [(ngModel)]="f.rodillosKgSalida" />
                </div>
                <div class="form-field">
                  <label>Rodillos Grados Entrada</label>
                  <input type="number" [(ngModel)]="f.rodillosGradosEntrada" />
                </div>
                <div class="form-field">
                  <label>Rodillos Grados Salida</label>
                  <input type="number" [(ngModel)]="f.rodillosGradosSalida" />
                </div>
                <div class="form-field">
                  <label>Calibre</label>
                  <input type="number" [(ngModel)]="f.calibre" />
                </div>
                <div class="form-field">
                  <label>Ancho</label>
                  <input type="text" [(ngModel)]="f.ancho" />
                </div>
                <div class="form-field">
                  <label>Longitud</label>
                  <input type="number" [(ngModel)]="f.longitud" />
                </div>
                <div class="form-field">
                  <label>Kg Virgen</label>
                  <input type="number" [(ngModel)]="f.virgenKg" />
                </div>
                <div class="form-field">
                  <label>Kg Molido</label>
                  <input type="number" [(ngModel)]="f.molidoKg" />
                </div>
                <div class="form-field">
                  <label>Meta</label>
                  <input type="number" [(ngModel)]="f.meta" />
                </div>
                <div class="form-field" style="grid-column: 1 / -1;">
                  <label>Lote Silo</label>
                  <input type="text" [(ngModel)]="f.loteSilo" />
                </div>
              </div>
              @if (saveError()) {
                <div class="form-error">{{ saveError() }}</div>
              }
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" (click)="cerrarModificar()">Cancelar</button>
              <button class="btn btn-primary" [disabled]="saving()" (click)="guardarModificar()">{{ saving() ? 'Guardando...' : 'Guardar' }}</button>
            </div>
          </div>
        </div>
      }

      <!-- Modal Eliminar -->
      @if (itemToDelete(); as del) {
        <div class="modal-overlay" (click)="cancelarEliminar()">
          <div class="modal-card modal-card-sm" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h2>Eliminar Orden de Prensado</h2>
              <button class="modal-close" (click)="cancelarEliminar()"><svg class="close-icon-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            </div>
            <div class="modal-body">
              <p>¿Está seguro de que desea eliminar la orden de prensado de <strong>{{ del.prensa?.nombre }}</strong> del {{ del.fecha | date:'dd/MM/yyyy' }}? Esta acción no se puede deshacer.</p>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" (click)="cancelarEliminar()">Cancelar</button>
              <button class="btn btn-danger" [disabled]="deleting()" (click)="confirmarEliminar()">{{ deleting() ? 'Eliminando...' : 'Sí, eliminar' }}</button>
            </div>
          </div>
        </div>
      }

    </div>
  `,
  styles: [`
    .btn-icon-svg { display:inline-block; vertical-align:-2px; }
    .search-icon-svg { display:block; }
    .close-icon-svg { display:block; }
    .icon-btn-svg { display:block; }
    .module-page { padding: 3rem; font-family: 'Inter', sans-serif; }
    .breadcrumb  { font-size:.72rem; color:#94a3b8; font-weight:700; text-transform:uppercase; letter-spacing:.05em; }
    h1           { font-size:1.75rem; font-weight:800; color:#1e293b; margin:0 0 .25rem; }
    .actions-toolbar { display:flex; width:100%; align-items:center; gap:.5rem; }
    .toolbar-left    { display:flex; gap:.6rem; align-items:center; }
    .toolbar-right   { display:flex; gap:.6rem; align-items:center; }

    .btn { padding:.52rem 1.1rem; border-radius:7px; border:none; cursor:pointer; font-size:.82rem; font-weight:700; transition:all .18s; display:flex; align-items:center; gap:.35rem; }
    .btn-primary   { background:#3faa5a; color:#fff; }
    .btn-primary:disabled { opacity:.6; cursor:not-allowed; }
    .btn-secondary { background:#fff; color:#475569; border:1px solid #e2e8f0; }
    .btn-secondary:hover { background:#f8fafc; border-color:#cbd5e1; }
    .btn-danger { background:#dc2626; color:#fff; }
    .btn-danger:disabled { opacity:.6; cursor:not-allowed; }
    .btn-cols { font-size:.78rem; padding:.48rem .9rem; }

    .search-box   { position:relative; }
    .search-icon  { position:absolute; left:.7rem; top:50%; transform:translateY(-50%); color:#94a3b8; }
    .search-input { padding:.48rem .75rem .48rem 2rem; border:1px solid #e2e8f0; border-radius:7px; font-size:.82rem; outline:none; width:200px; color:#334155; }
    .search-input:focus { border-color:#3faa5a; box-shadow:0 0 0 3px rgba(63,170,90,.12); }

    .dropdown-wrapper { position:relative; }
    .dd-popover  { position:absolute; left:0; top:110%; background:#fff; border:1px solid #e2e8f0; border-radius:10px; box-shadow:0 8px 20px rgba(0,0,0,.1); z-index:200; min-width:140px; overflow:hidden; }
    .dd-item     { padding:.6rem 1rem; font-size:.82rem; font-weight:600; color:#334155; cursor:pointer; }
    .dd-item:hover { background:#f1f5f9; }

    .col-sel-popover { position:absolute; left:0; top:110%; background:#fff; border:1px solid #e2e8f0; border-radius:10px; box-shadow:0 8px 24px rgba(0,0,0,.12); z-index:200; width:240px; padding:.75rem; }
    .col-group { margin-bottom:.25rem; }
    .col-group-label { display:flex; align-items:center; gap:.4rem; font-size:.82rem; font-weight:700; color:#334155; cursor:pointer; padding:.2rem 0; }
    .col-subitem { padding-left:1.4rem; display:flex; flex-direction:column; gap:.2rem; }
    .col-subitem label { display:flex; align-items:center; gap:.4rem; font-size:.8rem; color:#475569; cursor:pointer; padding:.15rem 0; }
    .btn-actualizar { width:100%; margin-top:.5rem; padding:.45rem; background:#3faa5a; color:#fff; border:none; border-radius:6px; font-size:.8rem; font-weight:700; cursor:pointer; }

    .status-badge { padding:.2rem .5rem; border-radius:12px; font-size:.72rem; font-weight:700; text-transform:uppercase; }
    .status-badge.status-programado  { background:#eff6ff; color:#2563eb; }
    .status-badge.status-enproceso   { background:#fffbeb; color:#b45309; }
    .status-badge.status-terminado   { background:#ecfdf5; color:#059669; }
    .status-badge.status-anticipado  { background:#fdf4ff; color:#a21caf; }
    .status-badge.status-cancelado   { background:#fef2f2; color:#dc2626; }

    .content-card { background:#fff; border-radius:12px; border:1px solid #e2e8f0; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,.04); margin-top:1rem; overflow-x:auto; }
    .data-table   { width:100%; border-collapse:collapse; }
    .data-table th { text-align:left; padding:.85rem 1rem; background:#f8fafc; color:#64748b; font-size:.72rem; font-weight:800; text-transform:uppercase; letter-spacing:.04em; border-bottom:1px solid #e2e8f0; white-space:nowrap; }
    .data-table td { padding:.78rem 1rem; border-bottom:1px solid #f1f5f9; font-size:.83rem; color:#334155; white-space:nowrap; }
    .data-table tr:hover td { background:#f8fafc; }

    /* Franja de color a la izquierda por estado, igual que el ERP legado */
    .data-table tbody tr { border-left:4px solid transparent; }
    .data-table tbody tr.status-programado { border-left-color:#3b82f6; background:#f5f9ff; }
    .data-table tbody tr.status-enproceso  { border-left-color:#f59e0b; background:#fffdf5; }
    .data-table tbody tr.status-terminado  { border-left-color:#22c55e; background:#f6fdf8; }
    .data-table tbody tr.status-anticipado { border-left-color:#c026d3; background:#fdf6fe; }
    .data-table tbody tr.status-cancelado  { border-left-color:#ef4444; background:#fef7f7; }
    .data-table tbody tr.status-programado:hover td,
    .data-table tbody tr.status-enproceso:hover td,
    .data-table tbody tr.status-terminado:hover td,
    .data-table tbody tr.status-anticipado:hover td,
    .data-table tbody tr.status-cancelado:hover td { background:#f1f5f9; }
    .col-nombre { font-weight:700; color:#1e293b; }
    .col-acciones { display:flex; gap:.75rem; position:sticky; left:0; z-index:2; background:#fff; box-shadow:2px 0 4px rgba(0,0,0,.06); }
    .data-table thead th.col-acciones { z-index:3; background:#f8fafc; }
    .data-table tbody tr.status-programado td.col-acciones { background:#f5f9ff; }
    .data-table tbody tr.status-enproceso td.col-acciones  { background:#fffdf5; }
    .data-table tbody tr.status-terminado td.col-acciones  { background:#f6fdf8; }
    .data-table tbody tr.status-anticipado td.col-acciones { background:#fdf6fe; }
    .data-table tbody tr.status-cancelado td.col-acciones  { background:#fef7f7; }
    .data-table tbody tr:hover td.col-acciones { background:#f1f5f9; }
    .row-action { color:#3faa5a; font-weight:700; font-size:.8rem; cursor:pointer; text-decoration:none; }
    .row-action:hover { text-decoration:underline; }
    .row-action-danger { color:#dc2626; }
    .icon-btn { background:none; border:none; cursor:pointer; font-size:.95rem; color:#475569; padding:0; line-height:1; }
    .icon-btn:hover { color:#1e293b; }
    .empty-state { text-align:center; padding:3rem; color:#94a3b8; font-style:italic; }

    .carreras-panel-row td { padding:0; background:#f8fafc; }
    .carreras-panel { padding:1rem 1.4rem; }
    .carreras-panel-title { font-size:.78rem; font-weight:800; text-transform:uppercase; letter-spacing:.04em; color:#64748b; margin-bottom:.6rem; }
    .carreras-panel-empty { font-size:.83rem; color:#94a3b8; font-style:italic; padding:.4rem 0; }
    .mini-table { width:100%; border-collapse:collapse; background:#fff; border:1px solid #e2e8f0; border-radius:8px; overflow:hidden; }
    .mini-table th { text-align:left; padding:.55rem .8rem; background:#eef2f6; color:#64748b; font-size:.68rem; font-weight:800; text-transform:uppercase; letter-spacing:.03em; border-bottom:1px solid #e2e8f0; }
    .mini-table td { padding:.55rem .8rem; border-bottom:1px solid #f1f5f9; font-size:.82rem; color:#334155; }
    .mini-table tr:last-child td { border-bottom:none; }

    .pagination-container { display:flex; justify-content:space-between; align-items:center; gap:1rem; margin-top:1.4rem; flex-wrap:wrap; }
    .pagination-label { font-size:.8rem; color:#64748b; font-weight:600; }
    .pagination-buttons { display:flex; align-items:center; gap:.35rem; }
    .pag-btn { height:2rem; min-width:2rem; padding:0 .45rem; border-radius:7px; border:1px solid #e2e8f0; background:#fff; color:#475569; font-weight:700; font-size:.82rem; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all .18s; }
    .pag-btn:hover:not(:disabled) { background:#f8fafc; border-color:#cbd5e1; }
    .pag-btn:disabled { opacity:.4; cursor:not-allowed; }
    .pag-btn.active { background:#3faa5a; border-color:#3faa5a; color:#fff; }

    .modal-overlay { position:fixed; inset:0; background:rgba(15,23,42,.55); display:flex; align-items:center; justify-content:center; z-index:500; padding:1.5rem; }
    .modal-card { background:#fff; border-radius:12px; width:100%; max-width:640px; max-height:88vh; display:flex; flex-direction:column; box-shadow:0 20px 50px rgba(0,0,0,.25); }
    .modal-card-sm { max-width:440px; }
    .modal-header { display:flex; align-items:center; justify-content:space-between; padding:1.1rem 1.4rem; border-bottom:1px solid #e2e8f0; }
    .modal-header h2 { margin:0; font-size:1.05rem; font-weight:800; color:#1e293b; }
    .modal-close { background:none; border:none; cursor:pointer; font-size:1rem; color:#94a3b8; }
    .modal-body { padding:1.2rem 1.4rem; overflow-y:auto; }
    .modal-footer { display:flex; justify-content:flex-end; gap:.6rem; padding:1rem 1.4rem; border-top:1px solid #e2e8f0; }

    .detail-grid { display:grid; grid-template-columns:1fr 1fr; gap:.9rem 1.5rem; }
    .detail-item { display:flex; flex-direction:column; gap:.2rem; }
    .d-label { font-size:.7rem; font-weight:700; text-transform:uppercase; letter-spacing:.04em; color:#94a3b8; }
    .d-value { font-size:.88rem; color:#1e293b; font-weight:600; }

    .form-grid { display:grid; grid-template-columns:1fr 1fr; gap:.9rem 1.2rem; }
    .form-field { display:flex; flex-direction:column; gap:.3rem; }
    .form-field label { font-size:.72rem; font-weight:700; color:#475569; text-transform:uppercase; letter-spacing:.03em; }
    .form-field input, .form-field select { padding:.5rem .6rem; border:1px solid #e2e8f0; border-radius:7px; font-size:.85rem; color:#1e293b; }
    .form-field input:focus, .form-field select:focus { outline:none; border-color:#3faa5a; box-shadow:0 0 0 3px rgba(63,170,90,.12); }
    .form-error { margin-top:.9rem; padding:.6rem .8rem; background:#fef2f2; color:#dc2626; border-radius:7px; font-size:.82rem; font-weight:600; }
  `]
})
export class PrensadosListComponent implements OnInit {
  private svc = inject(ProduccionService);

  items = signal<any[]>([]);
  searchText = signal('');
  currentPage = signal(1);
  pageSize = signal(10);

  showColumnSelector = signal(false);
  showExportOptions = signal(false);

  visibleColumns = signal<string[]>([...ALL_COLUMNS]);

  operarios = signal<any[]>([]);
  troqueles = signal<any[]>([]);

  viewingItem = signal<any | null>(null);

  expandedPrensadoId = signal<string | null>(null);
  carrerasPorBobina = signal<any[]>([]);
  loadingCarrerasPanel = signal(false);

  editForm = signal<any | null>(null);
  private editingId: string | null = null;
  saving = signal(false);
  saveError = signal('');

  itemToDelete = signal<any | null>(null);
  deleting = signal(false);

  estadoOptions = Object.entries(ESTADO_LABELS).map(([value, label]) => ({ value: Number(value), label }));

  estadoLabel(estado: number): string { return ESTADO_LABELS[estado] ?? 'Desconocido'; }
  estadoClass(estado: number): string { return ESTADO_CLASS[estado] ?? ''; }

  ngOnInit() {
    this.load();
    this.svc.getOperarios().subscribe({ next: (data) => this.operarios.set(data), error: (err) => console.error(err) });
    this.svc.getTroquelesCatalogo().subscribe({ next: (data) => this.troqueles.set(data), error: (err) => console.error(err) });
  }

  load() {
    this.svc.getPrensados().subscribe({
      next: (data) => this.items.set(data),
      error: (err) => console.error(err)
    });
  }

  filteredItems = computed(() => {
    const s = this.searchText().trim().toLowerCase();
    return s ? this.items().filter(item =>
      (item.prensa?.nombre?.toLowerCase().includes(s)) ||
      (item.producto?.nombre?.toLowerCase().includes(s)) ||
      (item.operario?.nombreCompleto?.toLowerCase().includes(s))
    ) : this.items();
  });

  paginatedItems = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredItems().slice(start, start + this.pageSize());
  });

  totalPages = computed(() => Math.ceil(this.filteredItems().length / this.pageSize()) || 1);

  visibleCount = computed(() => this.visibleColumns().length);

  allColsVisible = computed(() => ALL_COLUMNS.every(c => this.visibleColumns().includes(c)));

  isColVisible(col: string) { return this.visibleColumns().includes(col); }
  toggleCol(col: string) {
    this.visibleColumns.update(cols =>
      cols.includes(col) ? cols.filter(c => c !== col) : [...cols, col]
    );
  }
  toggleAllCols() {
    if (this.allColsVisible()) this.visibleColumns.set([]);
    else this.visibleColumns.set([...ALL_COLUMNS]);
  }

  prevPage() { if (this.currentPage() > 1) this.currentPage.update(p => p - 1); }
  nextPage() { if (this.currentPage() < this.totalPages()) this.currentPage.update(p => p + 1); }
  setPage(p: number | string) { if (typeof p === 'number') this.currentPage.set(p); }

  getPages(current: number, total: number): (number | string)[] {
    if (total <= 1) return [];
    const pages: (number | string)[] = [1];
    if (current > 3) pages.push('...');
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
    if (current < total - 2) pages.push('...');
    if (total > 1) pages.push(total);
    return pages;
  }

  toggleColumnDropdown(e: Event) { e.stopPropagation(); this.showColumnSelector.update(v => !v); this.showExportOptions.set(false); }
  toggleExportDropdown(e: Event) { e.stopPropagation(); this.showExportOptions.update(v => !v); this.showColumnSelector.set(false); }
  closeAllDropdowns()             { this.showColumnSelector.set(false); this.showExportOptions.set(false); }

  // ── Visualizar ──────────────────────────────────────────────────────
  visualizar(item: any) {
    this.svc.getPrensadoDetail(item.id).subscribe({
      next: (detail) => this.viewingItem.set(detail),
      error: (err) => { console.error(err); alert('No se pudo cargar el detalle del prensado.'); }
    });
  }
  cerrarVisualizar() { this.viewingItem.set(null); }

  // ── Imprimir (equivalente a RptPrensado del legado; solo Terminado) ──
  imprimir(item: any) {
    if (item.estado !== 2) return;

    forkJoin({
      detail: this.svc.getPrensadoDetail(item.id),
      carreras: this.svc.getCarrerasPorBobina(item.id),
      calidadCarretes: this.svc.getDetalleCalidadCarretes(item.id),
      interrupciones: this.svc.getInterrupcionesPrensado()
    }).subscribe({
      next: ({ detail, carreras, calidadCarretes, interrupciones }) => {
        const interrupcionesPrensado = (interrupciones || []).filter((i: any) => i.prensadoId === item.id);
        this.abrirVentanaImpresion(detail, carreras || [], calidadCarretes || [], interrupcionesPrensado);
      },
      error: (err) => { console.error(err); alert('No se pudo generar la impresión.'); }
    });
  }

  private abrirVentanaImpresion(v: any, carreras: any[], calidadCarretes: any[], interrupciones: any[]) {
    const fmtFecha = (d: any) => d ? new Date(d).toLocaleString('es-MX') : '—';
    const filasCarreras = carreras.map(b => `
      <tr>
        <td>${b.bobina}</td>
        <td>${b.reposoHr ?? '—'}</td>
        <td>${b.carreras}</td>
        <td>${b.enProceso}</td>
        <td>${b.terminadas}</td>
        <td>${b.validadas}</td>
        <td>${b.carretes}</td>
      </tr>`).join('') || '<tr><td colspan="7" style="text-align:center;color:#888;">Sin carreras registradas.</td></tr>';

    const filasCalidad = calidadCarretes.map(c => `
      <tr>
        <td>${c.carreraNo}</td>
        <td>${c.bobina}</td>
        <td style="text-align:center;${c.linea1 === 'X' ? 'color:#dc2626;font-weight:700;' : ''}">${c.linea1 ?? ''}</td>
        <td style="text-align:center;${c.linea2 === 'X' ? 'color:#dc2626;font-weight:700;' : ''}">${c.linea2 ?? ''}</td>
        <td style="text-align:center;${c.linea3 === 'X' ? 'color:#dc2626;font-weight:700;' : ''}">${c.linea3 ?? ''}</td>
        <td style="text-align:center;${c.linea4 === 'X' ? 'color:#dc2626;font-weight:700;' : ''}">${c.linea4 ?? ''}</td>
        <td style="text-align:center;${c.linea5 === 'X' ? 'color:#dc2626;font-weight:700;' : ''}">${c.linea5 ?? ''}</td>
        <td style="text-align:center;${c.linea6 === 'X' ? 'color:#dc2626;font-weight:700;' : ''}">${c.linea6 ?? ''}</td>
        <td>${c.paletSerie || '—'}</td>
        <td style="text-align:center;">${c.carretesAMolino}</td>
      </tr>`).join('') || '<tr><td colspan="10" style="text-align:center;color:#888;">Sin carreras registradas.</td></tr>';

    const filasInterrupciones = interrupciones.map(i => `
      <tr>
        <td>${fmtFecha(i.horaInicio)}</td>
        <td>${i.horaFin ? fmtFecha(i.horaFin) : '—'}</td>
        <td>${i.causaNombre || '—'}</td>
        <td>${i.descripcion || '—'}</td>
      </tr>`).join('') || '<tr><td colspan="4" style="text-align:center;color:#888;">Sin interrupciones registradas.</td></tr>';

    const html = `
      <!doctype html><html><head><meta charset="utf-8"><title>Prensado ${v.prensa} — ${fmtFecha(v.fecha)}</title>
      <style>
        body{font-family:Arial,sans-serif;padding:2rem;color:#1e293b;}
        h1{font-size:1.3rem;margin:0 0 .2rem;}
        h2{font-size:1rem;margin:1.4rem 0 .5rem;border-bottom:2px solid #3faa5a;padding-bottom:.2rem;}
        .sub{color:#64748b;font-size:.85rem;margin-bottom:1rem;}
        table{width:100%;border-collapse:collapse;margin-bottom:1rem;}
        th,td{border:1px solid #cbd5e1;padding:.4rem .6rem;font-size:.8rem;text-align:left;}
        th{background:#f1f5f9;}
        .header-grid{display:grid;grid-template-columns:1fr 1fr;gap:.3rem 1.5rem;margin-bottom:1rem;font-size:.85rem;}
        .header-grid div span:first-child{font-weight:700;color:#475569;margin-right:.3rem;}
      </style></head>
      <body>
        <h1>Reporte de Prensado</h1>
        <div class="sub">Generado ${fmtFecha(new Date())}</div>

        <div class="header-grid">
          <div><span>Fecha:</span>${fmtFecha(v.fecha)}</div>
          <div><span>Prensa:</span>${v.prensa || '—'}</div>
          <div><span>Turno:</span>${v.turno || '—'}</div>
          <div><span>Producto:</span>${v.producto || '—'} — ${v.productoDescripcion || ''}</div>
          <div><span>Operador:</span>${v.operador || '—'}</div>
          <div><span>Estado:</span>${v.status || '—'}</div>
          <div><span>Troquel:</span>${v.troquelNombre || '—'}</div>
          <div><span>Lote Silo:</span>${v.loteSilo || '—'}</div>
          <div><span>Calibre / Ancho / Longitud:</span>${v.calibre ?? '—'} / ${v.ancho ?? '—'} / ${v.longitud ?? '—'}</div>
          <div><span>Kg Virgen / Molido:</span>${v.virgenKg ?? 0} / ${v.molidoKg ?? 0}</div>
          <div><span>Meta:</span>${v.meta ?? '—'}</div>
          <div><span>Levas (${v.levasUnidadMedida || 'Kg'}):</span>Entrada ${v.levasKgEntrada ?? 0} / Salida ${v.levasKgSalida ?? 0} · ${v.levasGradosEntrada ?? 0}° / ${v.levasGradosSalida ?? 0}°</div>
          <div><span>Rodillos (${v.rodillosUnidadMedida || 'Kg'}):</span>Entrada ${v.rodillosKgEntrada ?? 0} / Salida ${v.rodillosKgSalida ?? 0} · ${v.rodillosGradosEntrada ?? 0}° / ${v.rodillosGradosSalida ?? 0}°</div>
          <div><span>Inicia Proceso:</span>${fmtFecha(v.iniciaProceso)}</div>
          <div><span>Fin Proceso:</span>${v.finProceso ? fmtFecha(v.finProceso) : '—'}</div>
          <div><span>Merma Kg:</span>${v.mermaKg ?? 0}</div>
          <div><span>Motivo Anticipado:</span>${v.motivoAnticipado || '—'}</div>
        </div>

        <h2>Control de Calidad por Carrete</h2>
        <table>
          <thead><tr><th>Carrera</th><th>Bobina</th><th>L1</th><th>L2</th><th>L3</th><th>L4</th><th>L5</th><th>L6</th><th>Palet Serie</th><th>Carretes a Molino</th></tr></thead>
          <tbody>${filasCalidad}</tbody>
        </table>
        <p style="font-size:.75rem;color:#64748b;">✓ = línea correcta · <span style="color:#dc2626;font-weight:700;">X</span> = carrete enviado a molino</p>

        <h2>Carreras por Bobina (resumen)</h2>
        <table>
          <thead><tr><th>Bobina</th><th>Reposo (Hr)</th><th>Carreras</th><th>En Proceso</th><th>Terminadas</th><th>Validadas</th><th>Carretes</th></tr></thead>
          <tbody>${filasCarreras}</tbody>
        </table>

        <h2>Interrupciones</h2>
        <table>
          <thead><tr><th>Hora Inicio</th><th>Hora Fin</th><th>Causa</th><th>Descripción</th></tr></thead>
          <tbody>${filasInterrupciones}</tbody>
        </table>

        <script>window.onload = () => { window.print(); };</script>
      </body></html>`;

    const w = window.open('', '_blank');
    if (!w) { alert('El navegador bloqueó la ventana de impresión. Permite ventanas emergentes para este sitio.'); return; }
    w.document.write(html);
    w.document.close();
  }

  toggleCarrerasPanel(item: any) {
    if (this.expandedPrensadoId() === item.id) {
      this.expandedPrensadoId.set(null);
      return;
    }
    this.expandedPrensadoId.set(item.id);
    this.loadingCarrerasPanel.set(true);
    this.carrerasPorBobina.set([]);
    this.svc.getCarrerasPorBobina(item.id).subscribe({
      next: (data) => { this.carrerasPorBobina.set(data); this.loadingCarrerasPanel.set(false); },
      error: (err) => { console.error(err); this.loadingCarrerasPanel.set(false); }
    });
  }

  // ── Modificar ───────────────────────────────────────────────────────
  modificar(item: any) {
    this.saveError.set('');
    this.svc.getPrensadoDetail(item.id).subscribe({
      next: (detail) => {
        this.editingId = detail.id;
        this.editForm.set({
          fecha: detail.fecha ? new Date(detail.fecha).toISOString().slice(0, 10) : '',
          estado: detail.estado,
          operarioId: detail.operadorId,
          troquelId: detail.troquelId || null,
          levasUnidadMedida: detail.levasUnidadMedida || 'Kg',
          rodillosUnidadMedida: detail.rodillosUnidadMedida || 'Kg',
          levasKgEntrada: detail.levasKgEntrada,
          levasKgSalida: detail.levasKgSalida,
          levasGradosEntrada: detail.levasGradosEntrada,
          levasGradosSalida: detail.levasGradosSalida,
          rodillosKgEntrada: detail.rodillosKgEntrada,
          rodillosKgSalida: detail.rodillosKgSalida,
          rodillosGradosEntrada: detail.rodillosGradosEntrada,
          rodillosGradosSalida: detail.rodillosGradosSalida,
          calibre: detail.calibre,
          ancho: detail.ancho,
          longitud: detail.longitud,
          virgenKg: detail.virgenKg,
          molidoKg: detail.molidoKg,
          meta: detail.meta,
          loteSilo: detail.loteSilo
        });
      },
      error: (err) => { console.error(err); alert('No se pudo cargar el prensado para modificar.'); }
    });
  }

  cerrarModificar() { this.editForm.set(null); this.editingId = null; this.saveError.set(''); }

  guardarModificar() {
    const f = this.editForm();
    if (!f || !this.editingId) return;

    this.saving.set(true);
    this.saveError.set('');

    const request = {
      fecha: f.fecha,
      estado: Number(f.estado),
      operarioId: f.operarioId,
      troquelId: f.troquelId || null,
      levasUnidadMedida: f.levasUnidadMedida,
      rodillosUnidadMedida: f.rodillosUnidadMedida,
      levasKgEntrada: f.levasKgEntrada,
      levasKgSalida: f.levasKgSalida,
      levasGradosEntrada: f.levasGradosEntrada,
      levasGradosSalida: f.levasGradosSalida,
      rodillosKgEntrada: f.rodillosKgEntrada,
      rodillosKgSalida: f.rodillosKgSalida,
      rodillosGradosEntrada: f.rodillosGradosEntrada,
      rodillosGradosSalida: f.rodillosGradosSalida,
      calibre: f.calibre,
      ancho: f.ancho,
      longitud: f.longitud,
      virgenKg: f.virgenKg,
      molidoKg: f.molidoKg,
      meta: f.meta,
      loteSilo: f.loteSilo
    };

    this.svc.updatePrensado(this.editingId, request).subscribe({
      next: () => {
        this.saving.set(false);
        this.cerrarModificar();
        this.load();
      },
      error: (err) => {
        this.saving.set(false);
        this.saveError.set(err?.error?.message || 'Ocurrió un error al guardar los cambios.');
      }
    });
  }

  // ── Eliminar ────────────────────────────────────────────────────────
  eliminar(item: any) { this.itemToDelete.set(item); }
  cancelarEliminar() { this.itemToDelete.set(null); }

  confirmarEliminar() {
    const item = this.itemToDelete();
    if (!item) return;

    this.deleting.set(true);
    this.svc.deletePrensado(item.id).subscribe({
      next: () => {
        this.deleting.set(false);
        this.itemToDelete.set(null);
        this.load();
      },
      error: (err) => {
        this.deleting.set(false);
        console.error(err);
        alert(err?.error?.message || 'No se pudo eliminar la orden de prensado.');
      }
    });
  }

  exportCSV() {
    this.showExportOptions.set(false);
    let csv = '﻿';
    const heads: string[] = [];
    if (this.isColVisible('fecha')) heads.push('Fecha');
    if (this.isColVisible('prensa')) heads.push('Prensa');
    if (this.isColVisible('turno')) heads.push('Turno');
    if (this.isColVisible('producto')) heads.push('Producto');
    if (this.isColVisible('operador')) heads.push('Operador');
    if (this.isColVisible('interrupcion')) heads.push('Tiempo Interrupción (min)');
    if (this.isColVisible('estado')) heads.push('Estado');
    if (this.isColVisible('umLevas')) heads.push('U.M. Levas');
    if (this.isColVisible('umRodillos')) heads.push('U.M. Rodillos');
    if (this.isColVisible('levasKgEntrada')) heads.push('Levas Kg Entrada');
    if (this.isColVisible('levasKgSalida')) heads.push('Levas Kg Salida');
    if (this.isColVisible('levasGradosEntrada')) heads.push('Levas Grados Entrada');
    if (this.isColVisible('levasGradosSalida')) heads.push('Levas Grados Salida');
    if (this.isColVisible('rodillosKgEntrada')) heads.push('Rodillos Kg Entrada');
    if (this.isColVisible('rodillosKgSalida')) heads.push('Rodillos Kg Salida');
    if (this.isColVisible('rodillosGradosEntrada')) heads.push('Rodillos Grados Entrada');
    if (this.isColVisible('rodillosGradosSalida')) heads.push('Rodillos Grados Salida');
    if (this.isColVisible('troquel')) heads.push('Troquel');
    if (this.isColVisible('iniciaProceso')) heads.push('Inicia Proceso');
    if (this.isColVisible('finProceso')) heads.push('Fin Proceso');
    if (this.isColVisible('pallets')) heads.push('Pallets');
    csv += heads.join(';') + '\n';
    this.filteredItems().forEach(item => {
      const row: string[] = [];
      if (this.isColVisible('fecha')) row.push(item.fecha ? new Date(item.fecha).toLocaleDateString() : '');
      if (this.isColVisible('prensa')) row.push(item.prensa?.nombre || '');
      if (this.isColVisible('turno')) row.push(item.turno?.nombre || '');
      if (this.isColVisible('producto')) row.push(item.producto?.nombre || '');
      if (this.isColVisible('operador')) row.push(item.operario?.nombreCompleto || '');
      if (this.isColVisible('interrupcion')) row.push(String(item.tiempoInterrupcionMin ?? 0));
      if (this.isColVisible('estado')) row.push(this.estadoLabel(item.estado));
      if (this.isColVisible('umLevas')) row.push(item.levasUnidadMedida || 'Kg');
      if (this.isColVisible('umRodillos')) row.push(item.rodillosUnidadMedida || 'Kg');
      if (this.isColVisible('levasKgEntrada')) row.push(String(item.levasKgEntrada ?? 0));
      if (this.isColVisible('levasKgSalida')) row.push(String(item.levasKgSalida ?? 0));
      if (this.isColVisible('levasGradosEntrada')) row.push(String(item.levasGradosEntrada ?? 0));
      if (this.isColVisible('levasGradosSalida')) row.push(String(item.levasGradosSalida ?? 0));
      if (this.isColVisible('rodillosKgEntrada')) row.push(String(item.rodillosKgEntrada ?? 0));
      if (this.isColVisible('rodillosKgSalida')) row.push(String(item.rodillosKgSalida ?? 0));
      if (this.isColVisible('rodillosGradosEntrada')) row.push(String(item.rodillosGradosEntrada ?? 0));
      if (this.isColVisible('rodillosGradosSalida')) row.push(String(item.rodillosGradosSalida ?? 0));
      if (this.isColVisible('troquel')) row.push(item.troquel?.nombre || '');
      if (this.isColVisible('iniciaProceso')) row.push(item.horaIniciaProceso ? new Date(item.horaIniciaProceso).toLocaleString() : '');
      if (this.isColVisible('finProceso')) row.push(item.horaFinProceso ? new Date(item.horaFinProceso).toLocaleString() : '');
      if (this.isColVisible('pallets')) row.push(String(item.totalPallets ?? 0));
      csv += row.join(';') + '\n';
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `prensados_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }

  exportPDF() {
    this.showExportOptions.set(false);
    const w = window.open('', '_blank');
    if (!w) return;
    let heads = '';
    if (this.isColVisible('fecha')) heads += '<th>Fecha</th>';
    if (this.isColVisible('prensa')) heads += '<th>Prensa</th>';
    if (this.isColVisible('turno')) heads += '<th>Turno</th>';
    if (this.isColVisible('producto')) heads += '<th>Producto</th>';
    if (this.isColVisible('operador')) heads += '<th>Operador</th>';
    if (this.isColVisible('interrupcion')) heads += '<th>Tiempo Interrupción (min)</th>';
    if (this.isColVisible('estado')) heads += '<th>Estado</th>';
    if (this.isColVisible('umLevas')) heads += '<th>U.M. Levas</th>';
    if (this.isColVisible('umRodillos')) heads += '<th>U.M. Rodillos</th>';
    if (this.isColVisible('levasKgEntrada')) heads += '<th>Levas Kg Entrada</th>';
    if (this.isColVisible('levasKgSalida')) heads += '<th>Levas Kg Salida</th>';
    if (this.isColVisible('levasGradosEntrada')) heads += '<th>Levas Grados Entrada</th>';
    if (this.isColVisible('levasGradosSalida')) heads += '<th>Levas Grados Salida</th>';
    if (this.isColVisible('rodillosKgEntrada')) heads += '<th>Rodillos Kg Entrada</th>';
    if (this.isColVisible('rodillosKgSalida')) heads += '<th>Rodillos Kg Salida</th>';
    if (this.isColVisible('rodillosGradosEntrada')) heads += '<th>Rodillos Grados Entrada</th>';
    if (this.isColVisible('rodillosGradosSalida')) heads += '<th>Rodillos Grados Salida</th>';
    if (this.isColVisible('troquel')) heads += '<th>Troquel</th>';
    if (this.isColVisible('iniciaProceso')) heads += '<th>Inicia Proceso</th>';
    if (this.isColVisible('finProceso')) heads += '<th>Fin Proceso</th>';
    if (this.isColVisible('pallets')) heads += '<th>Pallets</th>';
    let rows = '';
    this.filteredItems().forEach(item => {
      rows += '<tr>';
      if (this.isColVisible('fecha')) rows += `<td>${item.fecha ? new Date(item.fecha).toLocaleDateString() : ''}</td>`;
      if (this.isColVisible('prensa')) rows += `<td>${item.prensa?.nombre || ''}</td>`;
      if (this.isColVisible('turno')) rows += `<td>${item.turno?.nombre || ''}</td>`;
      if (this.isColVisible('producto')) rows += `<td>${item.producto?.nombre || ''}</td>`;
      if (this.isColVisible('operador')) rows += `<td>${item.operario?.nombreCompleto || ''}</td>`;
      if (this.isColVisible('interrupcion')) rows += `<td>${item.tiempoInterrupcionMin ?? 0}</td>`;
      if (this.isColVisible('estado')) rows += `<td>${this.estadoLabel(item.estado)}</td>`;
      if (this.isColVisible('umLevas')) rows += `<td>${item.levasUnidadMedida || 'Kg'}</td>`;
      if (this.isColVisible('umRodillos')) rows += `<td>${item.rodillosUnidadMedida || 'Kg'}</td>`;
      if (this.isColVisible('levasKgEntrada')) rows += `<td>${item.levasKgEntrada ?? 0}</td>`;
      if (this.isColVisible('levasKgSalida')) rows += `<td>${item.levasKgSalida ?? 0}</td>`;
      if (this.isColVisible('levasGradosEntrada')) rows += `<td>${item.levasGradosEntrada ?? 0}</td>`;
      if (this.isColVisible('levasGradosSalida')) rows += `<td>${item.levasGradosSalida ?? 0}</td>`;
      if (this.isColVisible('rodillosKgEntrada')) rows += `<td>${item.rodillosKgEntrada ?? 0}</td>`;
      if (this.isColVisible('rodillosKgSalida')) rows += `<td>${item.rodillosKgSalida ?? 0}</td>`;
      if (this.isColVisible('rodillosGradosEntrada')) rows += `<td>${item.rodillosGradosEntrada ?? 0}</td>`;
      if (this.isColVisible('rodillosGradosSalida')) rows += `<td>${item.rodillosGradosSalida ?? 0}</td>`;
      if (this.isColVisible('troquel')) rows += `<td>${item.troquel?.nombre || ''}</td>`;
      if (this.isColVisible('iniciaProceso')) rows += `<td>${item.horaIniciaProceso ? new Date(item.horaIniciaProceso).toLocaleString() : ''}</td>`;
      if (this.isColVisible('finProceso')) rows += `<td>${item.horaFinProceso ? new Date(item.horaFinProceso).toLocaleString() : ''}</td>`;
      if (this.isColVisible('pallets')) rows += `<td>${item.totalPallets ?? 0}</td>`;
      rows += '</tr>';
    });
    w.document.write(`<html><head><title>Reporte Prensados</title>
      <style>body{font-family:sans-serif;padding:2rem}table{width:100%;border-collapse:collapse}th,td{padding:10px 14px;border:1px solid #e2e8f0;font-size:.85rem}th{background:#f1f5f9;font-weight:700}</style>
      </head><body><h2>Reporte de Prensados</h2><p>${new Date().toLocaleString()}</p>
      <table><thead><tr>${heads}</tr></thead><tbody>${rows}</tbody></table>
      <script>window.onload=()=>{window.print();window.close();}<\/script></body></html>`);
    w.document.close();
  }
}
