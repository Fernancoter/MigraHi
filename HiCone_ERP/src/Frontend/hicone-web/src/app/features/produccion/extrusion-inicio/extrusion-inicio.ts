import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProduccionService, Extrusion, CausaInterrupcion } from '../../../core/services/produccion';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-extrusion-inicio',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="page-container animate-fade-in">
      <div class="page-header-premium">
        <div class="title-section">
          <h1 class="premium-title">{{ showTableroDirectivo ? 'Extrusión' : 'Inicio Extrusión' }}</h1>
          <nav class="breadcrumb-modern">
            <span class="root">Extrusión</span>
            <span class="sep">&rsaquo;</span>
            <span class="active">Inicio</span>
          </nav>
        </div>
      </div>

      <!-- TABLERO DIRECTIVO VIEW -->
      <div class="content-card glass shadow-sm margin-bottom" *ngIf="showTableroDirectivo">
        <div class="card-header-bar">
          <span class="green-flag"></span>
          <span class="card-title-text">Tablero Directivo</span>
        </div>

        <div class="card-body">
          <div class="table-scroll">
            <table class="data-table">
              <thead>
                <tr>
                  <th style="width: 200px;"></th>
                  <th>Fecha</th>
                  <th>Extrusora</th>
                  <th>Turno</th>
                  <th>Producto</th>
                  <th>Operador</th>
                  <th class="text-right">Programado</th>
                  <th class="text-right">Producido</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let ex of allExtrusiones">
                  <td class="actions-cell">
                    <div class="action-row-container">
                      <span class="badge-status" [ngClass]="getStatusClass(ex.estado)">
                        {{ getEstadoLabel(ex.estado) }}
                      </span>
                      <button class="btn-icon-action edit" (click)="modificar(ex)" title="Modificar">✏️</button>
                      <button class="btn-icon-action delete" (click)="eliminar(ex)" title="Eliminar">❌</button>
                      <button *ngIf="isTerminada(ex.estado)" class="btn-icon-action info" (click)="ver(ex)" title="Información">ℹ️</button>
                    </div>
                  </td>
                  <td>{{ formatDateLocal(ex.fechaInicio) }}</td>
                  <td><a class="action-link-green bold" (click)="ver(ex)">{{ ex.extrusora?.nombre || 'Extrusora' }}</a></td>
                  <td>{{ ex.turno?.nombre }}</td>
                  <td>{{ ex.producto?.nombre || ex.productoNombre }}</td>
                  <td>{{ (ex.operario?.nombreCompleto || '') | uppercase }}</td>
                  <td class="text-right">{{ ex.programado || 0 }}</td>
                  <td class="text-right">{{ ex.producido || ex.totalBobinas || 0 }}</td>
                </tr>
                <!-- Totales row -->
                <tr class="totals-row" style="font-weight: bold; background-color: #f8fafc; border-top: 2px solid #cbd5e1;">
                  <td colspan="2"></td>
                  <td colspan="4" style="color: #475569;">CNT: {{ cntExtrusiones | number }}</td>
                  <td class="text-right">{{ totalProgramado | number }}</td>
                  <td class="text-right">{{ totalProducido | number }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ESTADÍSTICAS DE EXTRUSIÓN VIEW (STANDARD START SCREEN) -->
      <div class="content-card glass shadow-sm margin-bottom" *ngIf="!showTableroDirectivo">
        <div class="card-header-bar">
          <span class="green-flag"></span>
          <span class="card-title-text">Estadísticas de Extrusión</span>
        </div>

        <div class="card-body">
          <!-- Programación Fieldset Block -->
          <div class="fieldset-block">
            <div class="fieldset-header">
              <span class="fieldset-title">Programación</span>
              <button class="btn-tablero" id="btnTableroDirectivo" routerLink="." [queryParams]="{ tablero: true }">Tablero Directivo</button>
            </div>
            <div class="table-scroll">
              <table class="data-table">
                <thead>
                  <tr>
                    <th style="width: 200px;"></th>
                    <th>Fecha</th>
                    <th>Extrusora &nbsp;↑</th>
                    <th>Turno &nbsp;▾</th>
                    <th>Producto &nbsp;▾</th>
                    <th>Operador &nbsp;▾</th>
                    <th class="text-right">Programado &nbsp;▾</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let p of programados">
                    <td class="actions-cell">
                      <div class="action-row-container">
                        <span class="badge-status" [ngClass]="getStatusClass(p.estado)">
                          {{ getEstadoLabel(p.estado) }}
                        </span>
                        <button class="btn-icon-action edit" (click)="modificar(p)" title="Modificar">✏️</button>
                        <button class="btn-icon-action delete" (click)="eliminar(p)" title="Eliminar">❌</button>
                        <button *ngIf="isTerminada(p.estado)" class="btn-icon-action info" (click)="ver(p)" title="Información">ℹ️</button>
                      </div>
                    </td>
                    <td>{{ formatDateLocal(p.fechaInicio) }}</td>
                    <td><a class="action-link-green bold" (click)="ver(p)">{{ p.extrusora?.nombre }}</a></td>
                    <td>{{ p.turno?.nombre }}</td>
                    <td>{{ p.producto?.nombre || p.productoNombre }}</td>
                    <td>{{ (p.operario?.nombreCompleto || '') | uppercase }}</td>
                    <td class="text-right">{{ p.programado || 0 }}</td>
                    <td class="text-center">
                      <span *ngIf="isTerminada(p.estado)" class="print-btn" (click)="imprimir(p)" title="Imprimir" style="cursor: pointer;">🖨️</span>
                    </td>
                    <td>
                      <a class="action-link-green" (click)="abrirInterrupcion(p)" href="javascript:void(0)">
                        Act.<br>Tiempos de<br>Interrupción
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Operación Fieldset Block -->
          <div class="fieldset-block">
            <div class="fieldset-header">
              <span class="fieldset-title">Operación</span>
            </div>
            <div class="table-scroll">
              <table class="data-table">
                <thead>
                  <tr>
                    <th style="width: 180px;"></th>
                    <th></th>
                    <th>Extrusora &nbsp;↑</th>
                    <th>Turno &nbsp;▾</th>
                    <th>Producto &nbsp;▾</th>
                    <th>Operador &nbsp;▾</th>
                    <th class="text-right">Producido &nbsp;▾</th>
                    <th class="text-right">Tiempo Interrupción (min) &nbsp;▾</th>
                    <th class="text-center">En Curso &nbsp;▾</th>
                    <th>Extrusión ID &nbsp;▾</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let o of operacion">
                    <td class="actions-cell">
                      <div class="action-row-container">
                        <span class="badge-status" [ngClass]="getStatusClass(o.estado)">
                          {{ getEstadoLabel(o.estado) }}
                        </span>
                        <button class="btn-icon-action edit" (click)="modificar(o)" title="Modificar">✏️</button>
                        <button class="btn-icon-action delete" (click)="eliminar(o)" title="Eliminar">❌</button>
                        <button class="btn-icon-action info" (click)="ver(o)" title="Información">ℹ️</button>
                      </div>
                    </td>
                    <td>
                      <a class="action-link-green" (click)="abrirInterrupcion(o)" href="javascript:void(0)">
                        Act.<br>Tiempos de<br>Interrupción
                      </a>
                    </td>
                    <td>
                      <span class="status-marker" [class.success]="o.estado !== 'Detenida'" [class.danger]="o.estado === 'Detenida'">
                        {{ o.estado !== 'Detenida' ? '✅' : '❗' }}
                      </span>
                      <strong>{{ o.extrusora?.nombre }}</strong>
                    </td>
                    <td>{{ o.turno?.nombre }}</td>
                    <td>{{ o.producto?.nombre || o.productoNombre }}</td>
                    <td>{{ (o.operario?.nombreCompleto || '') | uppercase }}</td>
                    <td class="text-right">{{ o.totalBobinas || 0 }}</td>
                    <td class="text-right">
                      <span *ngIf="o.estado === 'Detenida' || o.tiempoInterrupcion" class="interruption-text">
                        <span class="hourglass-icon">⏳</span> {{ o.tiempoInterrupcion || 0 }}
                      </span>
                      <span *ngIf="o.estado !== 'Detenida' && !o.tiempoInterrupcion">0</span>
                    </td>
                    <td class="text-center">
                      <input type="checkbox" [checked]="o.estado !== 'Detenida'" disabled class="chk-box">
                    </td>
                    <td>{{ o.extrusionIdLegacy || o.id }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL DE TIEMPOS DE INTERRUPCIÓN (DOWNTIME) -->
    <div class="modal-overlay" *ngIf="mostrarModalInterrupcion">
      <div class="modal-card">
        <div class="modal-header">
          <h3>⏱️ Gestión de Tiempos de Interrupción</h3>
          <button class="btn-close" (click)="cerrarModalInterrupcion()">✖️</button>
        </div>
        
        <div class="modal-body" *ngIf="extrusionSeleccionada">
          <div class="info-banner">
            <strong>Máquina:</strong> {{ extrusionSeleccionada.extrusora?.nombre || extrusionSeleccionada.extrusora }} | 
            <strong>Orden:</strong> {{ extrusionSeleccionada.codigo }}
          </div>
          
          <!-- Estado Actual de Paro -->
          <div class="status-box" [class.stopped]="extrusionSeleccionada.estado === 'Detenida'">
            <span>Estado de Máquina:</span>
            <strong>{{ extrusionSeleccionada.estado === 'Detenida' ? '🛑 DETENIDA (En Interrupción)' : '🟢 EN PROCESO (Operando)' }}</strong>
          </div>

          <!-- Si la máquina está operando, mostrar formulario para REGISTRAR Paro -->
          <div *ngIf="extrusionSeleccionada.estado !== 'Detenida'" class="form-container">
            <h4>Registrar Paro de Extrusora</h4>
            <div class="form-group">
              <label for="causaSelect">Motivo/Causa de Interrupción</label>
              <select id="causaSelect" [(ngModel)]="interrupcion.causaId" class="form-select">
                <option value="" disabled selected>-- Seleccione Causa --</option>
                <option *ngFor="let c of causas" [value]="c.id">{{ c.codigo }} - {{ c.descripcion }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="descInput">Descripción Adicional</label>
              <input id="descInput" type="text" [(ngModel)]="interrupcion.descripcion" placeholder="Notas adicionales..." class="form-input" />
            </div>
            <button class="btn-submit-stop" (click)="confirmarRegistrarInterrupcion()">
              🛑 REGISTRAR PARO DE MÁQUINA
            </button>
          </div>

          <!-- Si la máquina ya está Detenida, mostrar opción para FINALIZAR Paro -->
          <div *ngIf="extrusionSeleccionada.estado === 'Detenida'" class="form-container">
            <h4>Reiniciar Operación (Terminar Interrupción)</h4>
            <p>Haga clic en el botón inferior para concluir el paro actual y reanudar la operación de la extrusora.</p>
            <button class="btn-submit-start" (click)="confirmarFinalizarInterrupcion()">
              🟢 REINICIAR OPERACIÓN
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL DE EDICIÓN (INICIO EXTRUSIÓN) -->
    <div class="modal-overlay" *ngIf="mostrarModalEditar">
      <div class="modal-card wide-modal">
        <div class="modal-header">
          <h3>✏️ Editar Registro de Extrusión</h3>
          <button class="btn-close" (click)="cerrarModales()">✖️</button>
        </div>
        <div class="modal-body edit-modal-body">
          <div class="content-card shadow-sm edit-card">
            <div class="card-header-bar">
              <span class="green-flag"></span>
              <span class="card-title-text">Información General</span>
            </div>
            <div class="card-body-form">
              <div class="form-grid">
                <!-- Extrusora -->
                <div class="form-field col-span-4">
                  <label>Extrusora</label>
                  <select [(ngModel)]="editForm.extrusoraId" class="form-control-styled">
                    <option value="" disabled>-- Seleccione --</option>
                    <option *ngFor="let ex of catalogos.extrusoras" [value]="ex.id">{{ ex.nombre }}</option>
                  </select>
                </div>
                <!-- Turno -->
                <div class="form-field col-span-4">
                  <label>Turno</label>
                  <select [(ngModel)]="editForm.turnoId" class="form-control-styled">
                    <option value="" disabled>-- Seleccione --</option>
                    <option *ngFor="let t of catalogos.turnos" [value]="t.id">{{ t.nombre }}</option>
                  </select>
                </div>
                <!-- Producto Nombre -->
                <div class="form-field col-span-4">
                  <label>Producto Nombre</label>
                  <select [(ngModel)]="editForm.productoId" class="form-control-styled">
                    <option value="" disabled>-- Seleccione --</option>
                    <option *ngFor="let p of catalogos.productos" [value]="p.id">{{ p.nombre }}</option>
                  </select>
                </div>

                <!-- Operador -->
                <div class="form-field col-span-12">
                  <label>Operador</label>
                  <select [(ngModel)]="editForm.operarioId" class="form-control-styled">
                    <option value="" disabled>-- Seleccione --</option>
                    <option *ngFor="let op of catalogos.operarios" [value]="op.id">{{ op.nombreCompleto | uppercase }}</option>
                  </select>
                </div>

                <!-- Fecha -->
                <div class="form-field col-span-3">
                  <label>Fecha</label>
                  <input type="datetime-local" [(ngModel)]="editForm.fecha" class="form-control-styled">
                </div>
                <!-- Calibre -->
                <div class="form-field col-span-3">
                  <label>Calibre</label>
                  <input type="number" step="0.001" [(ngModel)]="editForm.calibre" class="form-control-styled">
                </div>
                <!-- Ancho -->
                <div class="form-field col-span-3">
                  <label>Ancho</label>
                  <input type="text" [(ngModel)]="editForm.ancho" class="form-control-styled">
                </div>
                <!-- Longitud -->
                <div class="form-field col-span-3">
                  <label>Longitud</label>
                  <input type="number" [(ngModel)]="editForm.longitud" class="form-control-styled">
                </div>

                <!-- Virgen Kg -->
                <div class="form-field col-span-3">
                  <label>Virgen Kg</label>
                  <input type="number" step="0.01" [(ngModel)]="editForm.virgenKg" class="form-control-styled">
                </div>
                <!-- Meta -->
                <div class="form-field col-span-3">
                  <label>Meta</label>
                  <input type="number" [(ngModel)]="editForm.metaKg" class="form-control-styled">
                </div>
                <!-- Molido Kg -->
                <div class="form-field col-span-3">
                  <label>Molido Kg</label>
                  <input type="number" step="0.01" [(ngModel)]="editForm.molidoKg" class="form-control-styled">
                </div>
                <!-- Estado -->
                <div class="form-field col-span-3">
                  <label>Estado</label>
                  <select [(ngModel)]="editForm.estado" class="form-control-styled">
                    <option [value]="1">Programada</option>
                    <option [value]="2">En Proceso</option>
                    <option [value]="3">Terminada</option>
                    <option [value]="4">Anticipada</option>
                    <option [value]="5">Cancelada</option>
                  </select>
                </div>

                <!-- Inicia Proceso -->
                <div class="form-field col-span-6">
                  <label>Inicia Proceso</label>
                  <input type="datetime-local" [(ngModel)]="editForm.processStart" class="form-control-styled">
                </div>
                <!-- Fin Proceso -->
                <div class="form-field col-span-6">
                  <label>Fin Proceso</label>
                  <input type="datetime-local" [(ngModel)]="editForm.processEnd" class="form-control-styled">
                </div>

                <!-- Lote Silo -->
                <div class="form-field col-span-12">
                  <label>Lote Silo</label>
                  <input type="text" [(ngModel)]="editForm.loteSilo" class="form-control-styled">
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="form-actions-edit">
                <button class="btn-confirm-edit" (click)="guardarEdicion()" [disabled]="savingEdicion">
                  CONFIRMAR
                </button>
                <button class="btn-cancel-edit" (click)="cerrarModales()" [disabled]="savingEdicion">
                  CANCELAR
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Confirmar Eliminar Extrusión -->
        <div class="modal-backdrop-styled animate-fade-in" *ngIf="showDeleteConfirmModal" (click)="showDeleteConfirmModal = false" style="z-index: 1060;">
          <div class="modal-card-styled animate-scale-up" (click)="$event.stopPropagation()" style="max-width: 400px; text-align: center;">
            <div class="modal-header-edit" style="background: #fef2f2; border-bottom: 1px solid #fee2e2; padding: 1.25rem;">
              <h3 style="color: #b91c1c; margin: 0; font-size: 1.2rem; font-weight: 700;">Eliminar Orden</h3>
            </div>
            <div style="padding: 1.5rem;">
              <p style="color: #334155; font-size: 0.95rem; margin-bottom: 0.5rem;">
                ¿Está seguro de eliminar de forma permanente la orden de extrusión de la extrusora <strong>"{{ extrusionToDelete?.extrusora?.nombre || '' }}"</strong>?
              </p>
              <p style="color: #64748b; font-size: 0.85rem;">
                Esta action no se puede deshacer.
              </p>
            </div>
            <div style="padding: 1.25rem; display: flex; justify-content: center; gap: 12px; border-top: 1px solid #f1f5f9;">
              <button class="btn-confirm-edit" style="background: #ef4444;" (click)="executeDelete()">Eliminar</button>
              <button class="btn-cancel-edit" (click)="showDeleteConfirmModal = false">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .module-page { padding: 3rem; background: #f8fafc; min-height: 100%; font-family: 'Outfit', sans-serif; }
    .breadcrumb { font-size: 0.8rem; color: #64748b; margin-bottom: 0.5rem; font-weight: 500; }
    .page-title { font-size: 1.75rem; font-weight: 800; color: #166534; margin: 0 0 1.5rem 0; }
    
    .content-card { background: white; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; }
    .margin-bottom { margin-bottom: 1.5rem; }
    
    .card-header-bar { 
      background: #f8fafc; 
      padding: 0.85rem 1.25rem; 
      border-bottom: 1px solid #e2e8f0; 
      display: flex; 
      align-items: center; 
      gap: 0.5rem;
    }
    .green-flag {
      width: 12px;
      height: 12px;
      background: #2e7d32;
      clip-path: polygon(0% 0%, 100% 0%, 75% 50%, 100% 100%, 0% 100%);
      display: inline-block;
    }
    .card-title-text {
      font-weight: 700; 
      color: #334155;
      font-size: 0.95rem;
    }

    .card-body {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .fieldset-block {
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 1.25rem;
      position: relative;
    }

    .fieldset-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .fieldset-title {
      font-size: 1rem;
      font-weight: 700;
      color: #334155;
    }

    .btn-tablero {
      background: #4caf50;
      color: white;
      border: none;
      padding: 0.45rem 1rem;
      border-radius: 4px;
      font-weight: 700;
      font-size: 0.8rem;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(76,175,80,0.25);
      transition: all 0.2s;
    }
    .btn-tablero:hover {
      background: #43a047;
      transform: translateY(-1px);
    }

    .table-scroll { overflow-x: auto; }
    .data-table { width: 100%; border-collapse: collapse; text-align: left; }
    .data-table th { 
      background: #f8fafc; 
      color: #475569; 
      font-size: 0.75rem; 
      font-weight: 700; 
      padding: 0.75rem 1rem; 
      border-bottom: 1px solid #e2e8f0; 
      white-space: nowrap;
    }
    .data-table td { 
      padding: 0.75rem 1rem; 
      border-bottom: 1px solid #f1f5f9; 
      font-size: 0.85rem; 
      color: #334155; 
      vertical-align: middle; 
      white-space: nowrap;
    }
    
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

    .actions-cell { padding: 0.5rem 1rem !important; }

    .action-row-container {
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }

    .btn-icon-action {
      background: white;
      border: 1px solid #cbd5e1;
      width: 26px;
      height: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.8rem;
      transition: all 0.2s;
    }
    .btn-icon-action:hover {
      background: #f1f5f9;
      border-color: #94a3b8;
    }

    .action-link-green {
      color: #2e7d32;
      font-weight: 600;
      font-size: 0.7rem;
      cursor: pointer;
      text-decoration: none;
      line-height: 1.15;
      display: inline-block;
    }
    .action-link-green:hover {
      text-decoration: underline;
    }
    
    .status-marker {
      font-size: 0.95rem;
      margin-right: 0.5rem;
      vertical-align: middle;
    }
    .interruption-text {
      color: #2e7d32;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
    }
    .hourglass-icon {
      font-size: 0.9rem;
    }

    .chk-box {
      width: 16px;
      height: 16px;
      accent-color: #2e7d32;
      cursor: not-allowed;
    }

    .text-center { text-align: center; }
    .text-right { text-align: right; }
    .bold { font-weight: bold; }

    /* Modal Styles */
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(4px);
      z-index: 1000;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
    }
    .modal-card {
      background: white;
      border-radius: 12px;
      width: 100%;
      max-width: 480px;
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
      overflow: hidden;
    }
    .modal-header {
      padding: 1rem 1.5rem;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .modal-header h3 { margin: 0; font-size: 1.1rem; color: #0f172a; font-weight: 700; }
    .btn-close { background: transparent; border: none; font-size: 1rem; cursor: pointer; color: #64748b; }
    .btn-close:hover { color: #0f172a; }
    .modal-body { padding: 1.5rem; display: flex; flex-direction: column; gap: 1.25rem; }
    .info-banner { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; padding: 0.75rem; border-radius: 6px; font-size: 0.85rem; }
    .status-box { padding: 0.75rem; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem; background: #f8fafc; border: 1px solid #e2e8f0; }
    .status-box.stopped { background: #fef2f2; border-color: #fca5a5; color: #991b1b; }
    .form-container { display: flex; flex-direction: column; gap: 1rem; border-top: 1px dashed #e2e8f0; padding-top: 1.25rem; }
    .form-container h4 { margin: 0; font-size: 0.95rem; color: #334155; font-weight: 700; }
    .form-select, .form-input { padding: 0.6rem 0.75rem; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 0.9rem; background: #f8fafc; font-family: inherit; }
    .form-select:focus, .form-input:focus { border-color: #166534; outline: none; background: white; }
    .btn-submit-stop, .btn-submit-start { border: none; padding: 0.75rem; border-radius: 6px; font-weight: 700; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; text-align: center; }
    .btn-submit-stop { background: #dc2626; color: white; box-shadow: 0 4px 6px -1px rgba(220,38,38,0.2); }
    .btn-submit-stop:hover { background: #b91c1c; transform: translateY(-1px); }
    .btn-submit-start { background: #166534; color: white; box-shadow: 0 4px 6px -1px rgba(22,101,52,0.2); }
    .btn-submit-start:hover { background: #15803d; transform: translateY(-1px); }

    /* Estilos para el Modal de Edición de Extrusión */
    .wide-modal {
      max-width: 900px !important;
      width: 95% !important;
    }
    .edit-modal-body {
      padding: 1rem !important;
    }
    .edit-card {
      border: none !important;
      border-radius: 8px !important;
      box-shadow: none !important;
    }
    .card-body-form {
      padding: 1.5rem 1rem 0.5rem 1rem;
    }
    .form-grid {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 1.25rem;
    }
    .form-field {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }
    .form-field label {
      font-size: 0.75rem;
      color: #888;
      font-weight: 500;
      text-transform: capitalize;
    }
    .form-control-styled {
      border: none;
      border-bottom: 1px solid #cbd5e1;
      padding: 0.4rem 0;
      font-size: 0.95rem;
      color: #334155;
      background: transparent;
      outline: none;
      border-radius: 0;
      width: 100%;
      font-family: inherit;
      box-sizing: border-box;
    }
    .form-control-styled:focus {
      border-bottom: 2px solid #4caf50;
      padding-bottom: 0.35rem;
    }
    .col-span-3 { grid-column: span 3; }
    .col-span-4 { grid-column: span 4; }
    .col-span-6 { grid-column: span 6; }
    .col-span-12 { grid-column: span 12; }
    .form-actions-edit {
      display: flex;
      gap: 1rem;
      margin-top: 1.75rem;
      padding-top: 1rem;
    }
    .btn-confirm-edit {
      background-color: #4caf50;
      color: white;
      border: none;
      padding: 0.6rem 2.25rem;
      font-size: 0.85rem;
      font-weight: 700;
      border-radius: 4px;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(76,175,80,0.25);
      transition: all 0.2s;
    }
    .btn-confirm-edit:hover:not([disabled]) {
      background-color: #43a047;
      transform: translateY(-1px);
    }
    .btn-confirm-edit[disabled], .btn-cancel-edit[disabled] {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .btn-cancel-edit {
      background-color: #9e9e9e;
      color: white;
      border: none;
      padding: 0.6rem 2.25rem;
      font-size: 0.85rem;
      font-weight: 700;
      border-radius: 4px;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0,0,0,0.15);
      transition: all 0.2s;
    }
    .btn-cancel-edit:hover:not([disabled]) {
      background-color: #757575;
      transform: translateY(-1px);
    }
  `]
})
export class ExtrusionInicioComponent implements OnInit {
  private prodService = inject(ProduccionService);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private notify = inject(NotificationService);

  showTableroDirectivo = false;
  allExtrusiones: any[] = [];
  programados: any[] = [];
  operacion: Extrusion[] = [];

  mostrarModalInterrupcion: boolean = false;
  mostrarModalEditar: boolean = false;
  showDeleteConfirmModal = false;
  extrusionToDelete: any = null;
  extrusionSeleccionada: Extrusion | null = null;
  causas: CausaInterrupcion[] = [];
  interrupcion = {
    causaId: '',
    descripcion: ''
  };

  savingEdicion: boolean = false;
  loadingDetalle: boolean = false;

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
    ancho: '',
    longitud: 0,
    loteSilo: '',
    lotePaqueteAditivos: '',
    estado: 1,
    processStart: '',
    processEnd: ''
  };

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.showTableroDirectivo = params['tablero'] === 'true';
      this.cdr.detectChanges();
    });
    this.cargarExtrusiones();
    this.cargarCausas();
    this.cargarCatalogos();
  }

  cargarExtrusiones() {
    this.prodService.getExtrusiones().subscribe({
      next: (data) => {
        this.allExtrusiones = data || [];
        
        // Operación shows in-progress and stopped ones
        this.operacion = this.allExtrusiones.filter(e => e.estado === 'EnProceso' || e.estado === 'Detenida' || Number(e.estado) === 2);
        // Programación shows scheduled and completed ones (non-active)
        this.programados = this.allExtrusiones.filter(e => e.estado !== 'EnProceso' && e.estado !== 'Detenida' && Number(e.estado) !== 2);

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar extrusiones en inicio:', err);
        this.allExtrusiones = [];
        this.operacion = [];
        this.programados = [];
        this.cdr.detectChanges();
      }
    });
  }

  cargarCatalogos() {
    this.prodService.getOperarios().subscribe(data => { this.catalogos.operarios = data; this.cdr.detectChanges(); });
    this.prodService.getTurnos().subscribe(data => { this.catalogos.turnos = data; this.cdr.detectChanges(); });
    this.prodService.getProductos().subscribe(data => { this.catalogos.productos = data; this.cdr.detectChanges(); });
    this.prodService.getExtrusoras().subscribe(data => { this.catalogos.extrusoras = data; this.cdr.detectChanges(); });
  }

  cargarMocks() {
    const mockData = [
      {
        id: 'mock-ext-01',
        codigo: 'TEST-EXT-01',
        fechaInicio: new Date('2026-06-10T00:00:00'),
        estado: 'EnProceso',
        extrusora: { nombre: 'Extrusora 1' },
        turno: { nombre: '1er Turno' },
        producto: { nombre: '8063C2' },
        operario: { nombreCompleto: 'SALVADOR SIERRA CAMARILLO' },
        programado: 0,
        totalBobinas: 4,
        tiempoInterrupcion: 0
      },
      {
        id: 'mock-ext-02',
        codigo: 'TEST-EXT-02',
        fechaInicio: new Date('2026-06-10T15:00:00'),
        estado: 'Programada',
        extrusora: { nombre: 'Extrusora 1' },
        turno: { nombre: '3er Turno' },
        producto: { nombre: '74757' },
        operario: { nombreCompleto: 'ANTONIO GONZALEZ AYALA' },
        programado: 0,
        totalBobinas: 0,
        tiempoInterrupcion: 0
      },
      {
        id: 'mock-ext-03',
        codigo: 'TEST-EXT-03',
        fechaInicio: new Date('2026-06-10T00:00:00'),
        estado: 'Terminada',
        extrusora: { nombre: 'Extrusora 2' },
        turno: { nombre: '1er Turno' },
        producto: { nombre: '8063C2' },
        operario: { nombreCompleto: 'DIEGO HUESCA VARGAS' },
        programado: 0,
        totalBobinas: 0,
        tiempoInterrupcion: 0
      },
      {
        id: 'mock-ext-04',
        codigo: 'TEST-EXT-04',
        fechaInicio: new Date('2026-06-10T15:00:00'),
        estado: 'Programada',
        extrusora: { nombre: 'Extrusora 2' },
        turno: { nombre: '3er Turno' },
        producto: { nombre: '74757' },
        operario: { nombreCompleto: 'JUAN CARLOS ROSALES ZARRAGA' },
        programado: 0,
        totalBobinas: 0,
        tiempoInterrupcion: 0
      },
      {
        id: 'mock-ext-05',
        codigo: 'TEST-EXT-05',
        fechaInicio: new Date('2026-06-10T00:00:00'),
        estado: 'Terminada',
        extrusora: { nombre: 'Extrusora 3' },
        turno: { nombre: '1er Turno' },
        producto: { nombre: '8063C2' },
        operario: { nombreCompleto: 'LUCIO MANUEL FLORES BARCENAS' },
        programado: 0,
        totalBobinas: 0,
        tiempoInterrupcion: 0
      },
      {
        id: 'mock-ext-06',
        codigo: 'TEST-EXT-06',
        fechaInicio: new Date('2026-06-10T15:00:00'),
        estado: 'Programada',
        extrusora: { nombre: 'Extrusora 3' },
        turno: { nombre: '3er Turno' },
        producto: { nombre: '74757' },
        operario: { nombreCompleto: 'LUIS CESAR OROPEZA ORTEGA' },
        programado: 0,
        totalBobinas: 0,
        tiempoInterrupcion: 0
      }
    ];
    this.allExtrusiones = mockData as any;
    this.operacion = this.allExtrusiones.filter(e => e.estado === 'EnProceso' || e.estado === 'Detenida');
    this.programados = this.allExtrusiones.filter(e => e.estado !== 'EnProceso' && e.estado !== 'Detenida');
    this.cdr.detectChanges();
  }

  cargarCausas() {
    this.prodService.getCausasInterrupcion().subscribe({
      next: (data) => {
        this.causas = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar causas de interrupción:', err);
        this.cdr.detectChanges();
      }
    });
  }

  // Helper selectors
  get cntExtrusiones(): number {
    return this.allExtrusiones.length;
  }

  get totalProgramado(): number {
    return this.allExtrusiones.reduce((sum, e) => sum + (e.programado || 0), 0);
  }

  get totalProducido(): number {
    return this.allExtrusiones.reduce((sum, e) => sum + (e.producido || e.totalBobinas || 0), 0);
  }

  getStatusClass(estado: any): string {
    const st = String(estado).toLowerCase();
    if (st.includes('3') || st.includes('finalizada') || st.includes('terminada')) return 'terminada';
    if (st.includes('1') || st.includes('programada') || st.includes('creada')) return 'programada';
    if (st.includes('2') || st.includes('proceso')) return 'proceso';
    if (st.includes('4') || st.includes('anticipada')) return 'anticipada';
    if (st.includes('5') || st.includes('cancelada')) return 'cancelada';
    return '';
  }

  getEstadoLabel(estado: any): string {
    const st = String(estado).toLowerCase();
    if (st.includes('3') || st.includes('finalizada') || st.includes('terminada')) return 'Terminada';
    if (st.includes('1') || st.includes('programada') || st.includes('creada')) return 'Programada';
    if (st.includes('2') || st.includes('proceso')) return 'En Proceso';
    if (st.includes('4') || st.includes('anticipada')) return 'Anticipada';
    if (st.includes('5') || st.includes('cancelada')) return 'Cancelada';
    return 'Creada';
  }

  isTerminada(estado: any): boolean {
    const st = String(estado).toLowerCase();
    return st.includes('3') || st.includes('finalizada') || st.includes('terminada');
  }

  // Actions
  modificar(ex: any) {
    if (ex.id.startsWith('mock-')) {
      const data = ex;
      let rawDate = data.fechaInicio ? new Date(data.fechaInicio) : new Date();
      let formattedDate = rawDate.toISOString().substring(0, 16);
      
      let rawStart = data.fechaInicio ? new Date(data.fechaInicio) : new Date();
      let formattedStart = rawStart.toISOString().substring(0, 16);
      
      let rawEnd = data.fechaFin ? new Date(data.fechaFin) : new Date();
      let formattedEnd = rawEnd.toISOString().substring(0, 16);

      this.editForm = {
        id: data.id,
        fecha: formattedDate,
        extrusoraId: this.catalogos.extrusoras[0]?.id || '',
        turnoId: this.catalogos.turnos[0]?.id || '',
        productoId: this.catalogos.productos[0]?.id || '',
        operarioId: this.catalogos.operarios[0]?.id || '',
        metaKg: data.metaKg || 1000,
        virgenKg: data.virgenKg || 800,
        molidoKg: data.molidoKg || 200,
        calibre: data.calibre || 0.12,
        ancho: String(data.ancho || '800'),
        longitud: data.longitud || 2000,
        loteSilo: data.loteSilo || 'L-SILO-MOCK',
        lotePaqueteAditivos: data.lotePaqueteAditivos || '',
        estado: data.estado === 'EnProceso' ? 2 : data.estado === 'Programada' ? 1 : 3,
        processStart: formattedStart,
        processEnd: formattedEnd
      };
      this.mostrarModalEditar = true;
      this.cdr.detectChanges();
      return;
    }

    this.loadingDetalle = true;
    this.cdr.detectChanges();
    this.prodService.getExtrusion(ex.id).subscribe({
      next: (data) => {
        this.extrusionSeleccionada = data;
        
        let rawDate = data.fecha ? new Date(data.fecha) : new Date();
        let formattedDate = rawDate.toISOString().substring(0, 16);

        let rawStart = data.processStart ? new Date(data.processStart) : new Date();
        let formattedStart = rawStart.toISOString().substring(0, 16);

        let rawEnd = data.processEnd ? new Date(data.processEnd) : new Date();
        let formattedEnd = rawEnd.toISOString().substring(0, 16);

        this.editForm = {
          id: data.id,
          fecha: formattedDate,
          extrusoraId: data.extrusoraId,
          turnoId: data.turnoId,
          productoId: data.productoId || '',
          operarioId: data.operadorId || data.operarioId || '',
          metaKg: data.target || 0,
          virgenKg: data.kgVirgen || 0,
          molidoKg: data.kgMolido || 0,
          calibre: data.calibre || 0,
          ancho: String(data.ancho || 0),
          longitud: data.longitud || 0,
          loteSilo: data.loteSilo || '',
          lotePaqueteAditivos: data.lotePaqueteAditivos || '',
          estado: data.estado || 1,
          processStart: formattedStart,
          processEnd: formattedEnd
        };

        this.mostrarModalEditar = true;
        this.loadingDetalle = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar datos para edición:', err);
        this.notify.error('No se pudo cargar el registro para modificar.');
        this.loadingDetalle = false;
        this.cdr.detectChanges();
      }
    });
  }

  guardarEdicion() {
    if (!this.editForm.id) return;

    if (this.editForm.id.startsWith('mock-')) {
      const matchIndex = this.allExtrusiones.findIndex(e => e.id === this.editForm.id);
      if (matchIndex !== -1) {
        const item = this.allExtrusiones[matchIndex];
        item.fechaInicio = new Date(this.editForm.fecha);
        item.metaKg = this.editForm.metaKg;
        item.programado = this.editForm.metaKg;
        item.calibre = this.editForm.calibre;
        item.ancho = this.editForm.ancho;
        item.longitud = this.editForm.longitud;
        item.loteSilo = this.editForm.loteSilo;
        item.lotePaqueteAditivos = this.editForm.lotePaqueteAditivos;
        item.estado = this.getEstadoLabelByVal(this.editForm.estado);
        
        const matchedOperario = this.catalogos.operarios.find(o => o.id === this.editForm.operarioId);
        if (matchedOperario) {
          item.operario = matchedOperario;
        }
      }
      this.cerrarModales();
      this.operacion = this.allExtrusiones.filter(e => e.estado === 'EnProceso' || e.estado === 'Detenida');
      this.programados = this.allExtrusiones.filter(e => e.estado !== 'EnProceso' && e.estado !== 'Detenida');
      this.cdr.detectChanges();
      this.notify.success('Registro realizado con éxito.');
      return;
    }

    this.savingEdicion = true;
    this.cdr.detectChanges();
    
    // Parse decimal fields safely
    const parsedAncho = parseFloat(this.editForm.ancho.replace('/', '.')) || 0;

    this.prodService.updateExtrusion(this.editForm.id, {
      fecha: new Date(this.editForm.fecha),
      extrusoraId: this.editForm.extrusoraId,
      turnoId: this.editForm.turnoId,
      productoId: this.editForm.productoId || null,
      operarioId: this.editForm.operarioId,
      metaKg: this.editForm.metaKg,
      virgenKg: this.editForm.virgenKg,
      molidoKg: this.editForm.molidoKg,
      calibre: this.editForm.calibre,
      ancho: parsedAncho,
      longitud: this.editForm.longitud,
      loteSilo: this.editForm.loteSilo,
      lotePaqueteAditivos: this.editForm.lotePaqueteAditivos,
      estado: Number(this.editForm.estado),
      processStart: this.editForm.processStart ? new Date(this.editForm.processStart) : null,
      processEnd: this.editForm.processEnd ? new Date(this.editForm.processEnd) : null
    }).subscribe({
      next: () => {
        this.cerrarModales();
        this.cargarExtrusiones();
        this.notify.success('Registro realizado con éxito.');
      },
      error: (err) => {
        console.error('Error al guardar cambios:', err);
        this.notify.error(err.error?.message || 'Error del servidor al actualizar el registro.');
        this.savingEdicion = false;
        this.cdr.detectChanges();
      }
    });
  }

  cerrarModales() {
    this.mostrarModalEditar = false;
    this.mostrarModalInterrupcion = false;
    this.extrusionSeleccionada = null;
    this.savingEdicion = false;
    this.cdr.detectChanges();
  }

  getEstadoLabelByVal(estadoVal: any): string {
    const val = Number(estadoVal);
    switch (val) {
      case 1: return 'Programada';
      case 2: return 'EnProceso';
      case 3: return 'Terminada';
      case 4: return 'Anticipada';
      case 5: return 'Cancelada';
      default: return 'Programada';
    }
  }

  eliminar(ex: any) {
    this.extrusionToDelete = ex;
    this.showDeleteConfirmModal = true;
  }

  executeDelete() {
    const ex = this.extrusionToDelete;
    if (!ex) return;

    if (ex.id && String(ex.id).startsWith('mock-')) {
      this.allExtrusiones = this.allExtrusiones.filter(item => item.id !== ex.id);
      this.operacion = this.allExtrusiones.filter(e => e.estado === 'EnProceso' || e.estado === 'Detenida' || Number(e.estado) === 2);
      this.programados = this.allExtrusiones.filter(e => e.estado !== 'EnProceso' && e.estado !== 'Detenida' && Number(e.estado) !== 2);
      this.showDeleteConfirmModal = false;
      this.extrusionToDelete = null;
      this.cdr.detectChanges();
      this.notify.success('Orden de extrusión eliminada.');
      return;
    }

    this.prodService.deleteExtrusion(ex.id).subscribe({
      next: () => {
        this.notify.success('Orden de extrusión eliminada.');
        this.cargarExtrusiones();
        this.showDeleteConfirmModal = false;
        this.extrusionToDelete = null;
      },
      error: (err) => {
        console.error('Error al eliminar orden de extrusión:', err);
        this.notify.error(err.error?.message || 'No se pudo eliminar la orden de extrusión.');
        this.showDeleteConfirmModal = false;
        this.extrusionToDelete = null;
        this.cdr.detectChanges();
      }
    });
  }


  ver(ex: any) {
    this.notify.info(`Visualizar detalle de extrusión ID: ${ex.id}`);
  }

  imprimir(ex: any) {
    this.notify.info(`Imprimiendo registro de extrusión ID: ${ex.id}`);
  }

  abrirInterrupcion(ext: Extrusion) {
    this.extrusionSeleccionada = ext;
    this.interrupcion = {
      causaId: '',
      descripcion: ''
    };
    this.mostrarModalInterrupcion = true;
    this.cdr.detectChanges();
  }

  cerrarModalInterrupcion() {
    this.mostrarModalInterrupcion = false;
    this.extrusionSeleccionada = null;
    this.interrupcion = {
      causaId: '',
      descripcion: ''
    };
    this.cdr.detectChanges();
  }

  confirmarRegistrarInterrupcion() {
    if (!this.extrusionSeleccionada) return;
    if (!this.interrupcion.causaId) {
      this.notify.warning('Debe seleccionar una causa de interrupción.');
      return;
    }

    const req = {
      entidadId: this.extrusionSeleccionada.id,
      causaId: this.interrupcion.causaId,
      descripcion: this.interrupcion.descripcion
    };

    this.prodService.registrarInterrupcionExtrusion(req).subscribe({
      next: () => {
        this.notify.success('Interrupción registrada exitosamente.');
        this.cargarExtrusiones();
        this.cerrarModalInterrupcion();
      },
      error: (err) => {
        console.error('Error al registrar interrupción:', err);
        this.notify.error(err.error?.message || 'Error del servidor al registrar interrupción.');
        this.cdr.detectChanges();
      }
    });
  }

  confirmarFinalizarInterrupcion() {
    if (!this.extrusionSeleccionada) return;

    this.prodService.finalizarInterrupcionExtrusionActiva(this.extrusionSeleccionada.id).subscribe({
      next: () => {
        this.notify.success('Interrupción finalizada exitosamente.');
        this.cargarExtrusiones();
        this.cerrarModalInterrupcion();
      },
      error: (err) => {
        console.error('Error al finalizar interrupción:', err);
        this.notify.error(err.error?.message || 'Error del servidor al finalizar interrupción.');
        this.cdr.detectChanges();
      }
    });
  }

  formatDateLocal(dateVal: any): string {
    if (!dateVal) return '-';
    try {
      let d: Date;
      if (typeof dateVal === 'string') {
        const isIsoNoZone = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?$/.test(dateVal);
        d = isIsoNoZone ? new Date(dateVal + 'Z') : new Date(dateVal);
      } else {
        d = new Date(dateVal);
      }
      if (isNaN(d.getTime())) return String(dateVal);
      
      const pad = (n: number) => n < 10 ? '0' + n : n.toString();
      const day = pad(d.getDate());
      const month = pad(d.getMonth() + 1);
      const year = d.getFullYear();
      const hours = pad(d.getHours());
      const mins = pad(d.getMinutes());
      return `${day}/${month}/${year} ${hours}:${mins}`;
    } catch {
      return String(dateVal);
    }
  }
}


