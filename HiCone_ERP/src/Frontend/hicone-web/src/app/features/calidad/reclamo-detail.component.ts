import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CalidadService, Reclamo, ReclamoDetalle } from '../../core/services/calidad';

@Component({
  selector: 'app-reclamo-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="page-container animate-fade-in" *ngIf="reclamo">
      <div class="page-header-premium">
        <div class="title-section">
          <nav class="breadcrumb-modern">
            <a routerLink="/calidad">Calidad</a> / <a routerLink="/calidad/reclamos">Reclamos</a> / <span>{{ reclamo.codigo }}</span>
          </nav>
          <h1 class="premium-title">Expediente de Reclamo: {{ reclamo.codigo }}</h1>
          <p>Detalle, investigación de causa raíz (RCA) y carretes afectados</p>
        </div>
        <div class="actions" *ngIf="isAbiertoOrProceso()">
          <button class="btn-premium-secondary" (click)="abrirModalReel()">Agregar Carrete</button>
          <button class="btn-premium" (click)="abrirFormResolucion()">Resolver Reclamo</button>
        </div>
      </div>

      <div class="detail-grid">
        <!-- Panel Izquierdo: Información del Reclamo -->
        <div class="panel-left">
          <!-- Tarjeta Informativa Principal -->
          <div class="card-premium">
            <div class="card-header">
              <h3>Ficha del Reclamo</h3>
              <span class="status-badge" [class]="getEstatusClass(reclamo.estatus)">
                {{ getEstatusNombre(reclamo.estatus) }}
              </span>
            </div>
            
            <div class="info-table">
              <div class="info-row">
                <span class="info-label">Cliente:</span>
                <span class="info-value bold">{{ reclamo.cliente }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Pedido / Factura:</span>
                <span class="info-value">{{ reclamo.orderDoc || 'N/A' }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Fecha Apertura:</span>
                <span class="info-value">{{ reclamo.fecha | date:'dd/MM/yyyy HH:mm' }}</span>
              </div>
              <div class="info-row" *ngIf="reclamo.fechaCierre">
                <span class="info-label">Fecha Cierre:</span>
                <span class="info-value">{{ reclamo.fechaCierre | date:'dd/MM/yyyy HH:mm' }}</span>
              </div>
              <div class="info-row" *ngIf="reclamo.cerradoPor">
                <span class="info-label">Resuelto Por:</span>
                <span class="info-value bold">{{ reclamo.cerradoPor }}</span>
              </div>
            </div>

            <div class="section-desc">
              <h4>Descripción de la Falla:</h4>
              <div class="desc-box">{{ reclamo.descripcion }}</div>
            </div>
          </div>

          <!-- Formulario de Acción Correctiva (RCA) / Resolución -->
          <div class="card-premium " *ngIf="mostrarFormResolucion || isResueltoOrCerrado()">
            <div class="card-header">
              <h3>Análisis de Causa Raíz (RCA)</h3>
            </div>
            
            <!-- Si ya está resuelto/cerrado, solo muestra el texto -->
            <div *ngIf="isResueltoOrCerrado(); else formResolucionActive">
              <div class="info-table">
                <div class="info-row">
                  <span class="info-label">Acción Correctiva Implementada:</span>
                </div>
                <div class="desc-box success-box">{{ reclamo.accionCorrectiva }}</div>
              </div>
            </div>

            <!-- Formulario activo de resolución -->
            <ng-template #formResolucionActive>
              <form (ngSubmit)="resolverReclamo()">
                <div class="form-group-premium">
                  <label for="accionCorrectiva">Acción Correctiva / Contramedida *</label>
                  <textarea class="input-premium" id="accionCorrectiva" name="accionCorrectiva" [(ngModel)]="resolucionData.accionCorrectiva" required rows="4" placeholder="Describa el análisis de causa raíz y la contramedida aplicada para evitar recurrencia..."></textarea>
                </div>
                <div class="form-group-premium">
                  <label for="resueltoPor">Responsable de Calidad *</label>
                  <input class="input-premium" type="text" id="resueltoPor" name="resueltoPor" [(ngModel)]="resolucionData.resueltoPor" required placeholder="Nombre del inspector o líder de calidad...">
                </div>
                <div class="form-actions">
                  <button type="button" class="btn-premium-secondary" (click)="mostrarFormResolucion = false">Cancelar</button>
                  <button type="submit" class="btn-premium" [disabled]="!resolucionData.accionCorrectiva || !resolucionData.resueltoPor">Aplicar Resolución</button>
                </div>
              </form>
            </ng-template>
          </div>
        </div>

        <!-- Panel Derecho: Carretes Afectados -->
        <div class="panel-right">
          <div class="card-premium">
            <div class="card-header">
              <h3>Carretes Reportados</h3>
              <span class="badge badge-neutral">{{ reclamo.detalles?.length || 0 }} carretes</span>
            </div>

            <div class="table-modern-container" *ngIf="reclamo.detalles && reclamo.detalles.length > 0; else noReels">
              <table class="table-modern">
                <thead>
                  <tr>
                    <th>No. Serie</th>
                    <th>Defecto</th>
                    <th>Observación</th>
                    <th>Registro</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let det of reclamo.detalles">
                    <td class="bold">
                      <a [routerLink]="['/calidad/consultar']" [queryParams]="{search: det.noSerieCarrete}" class="traz-link" title="Consultar Trazabilidad de esta serie">
                        {{ det.noSerieCarrete }}
                      </a>
                    </td>
                    <td>
                      <span class="badge-premium badge-danger">
                        {{ getDefectoNombre(det.tipoDefecto) }}
                      </span>
                    </td>
                    <td>{{ det.descripcion || 'Sin observaciones' }}</td>
                    <td>{{ det.fechaRegistro | date:'dd/MM/yyyy HH:mm' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ng-template #noReels>
              <div class="empty-row-premium">
                <span class="empty-icon">📦</span>
                <h4>No hay carretes reportados</h4>
                <p *ngIf="isAbiertoOrProceso()">Utilice el botón "Agregar Carrete" para asociar carretes con defectos de extrusión/prensado a este reclamo.</p>
                <p *ngIf="isResueltoOrCerrado()">Este reclamo se cerró sin carretes específicos asociados.</p>
              </div>
            </ng-template>
          </div>
        </div>
      </div>

      <!-- Modal para Agregar Carrete Defectuoso -->
      <div class="modal-overlay-premium" *ngIf="mostrarModalReel" (click)="cerrarModalReel()">
        <div class="modal-card-premium animate-scale-in" (click)="$event.stopPropagation()">
          <div class="modal-header-premium">
            <h3>📦 Asociar Carrete Defectuoso</h3>
            <button class="btn-icon-premium" (click)="cerrarModalReel()">✕</button>
          </div>
          <div class="modal-body-premium">
            <form (ngSubmit)="guardarCarreteDefecto()" #reelForm="ngForm">
              <div class="form-group-premium">
                <label for="noSerieCarrete">Número de Serie del Carrete *</label>
                <input class="input-premium" type="text" id="noSerieCarrete" name="noSerieCarrete" [(ngModel)]="nuevoReel.noSerieCarrete" required placeholder="Ej. CAR-2026-..." #serieInput="ngModel">
                <span class="error-msg" *ngIf="serieInput.invalid && serieInput.touched">El número de serie es requerido para asociar y rastrear la trazabilidad.</span>
              </div>
              <div class="form-group-premium">
                <label for="tipoDefecto">Tipo de Defecto *</label>
                <select class="input-premium" id="tipoDefecto" name="tipoDefecto" [(ngModel)]="nuevoReel.defecto" required>
                  <option [value]="1">1. Calibre</option>
                  <option [value]="2">2. Peso</option>
                  <option [value]="3">3. Espesor</option>
                  <option [value]="4">4. Daño Físico</option>
                  <option [value]="5">5. Contaminación de Color</option>
                  <option [value]="6">6. Otro</option>
                </select>
              </div>
              <div class="form-group-premium">
                <label for="observacion">Observaciones / Evidencia</label>
                <textarea class="input-premium" id="observacion" name="observacion" [(ngModel)]="nuevoReel.observacion" rows="3" placeholder="Detalles de la anomalía física observada en el carrete..."></textarea>
              </div>

              <div class="modal-footer-premium">
                <button type="button" class="btn-premium-secondary" (click)="cerrarModalReel()">Cancelar</button>
                <button type="submit" class="btn-premium" [disabled]="reelForm.invalid">Asociar a Folio</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
  providers: [CommonModule]
})
export class ReclamoDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private calidadService = inject(CalidadService);

  reclamoId!: string;
  reclamo: Reclamo | null = null;

  // Control de Formularios y Modales
  mostrarFormResolucion = false;
  mostrarModalReel = false;

  nuevoReel = {
    noSerieCarrete: '',
    defecto: 1,
    observacion: ''
  };

  resolucionData = {
    accionCorrectiva: '',
    resueltoPor: ''
  };

  ngOnInit() {
    this.reclamoId = this.route.snapshot.paramMap.get('id')!;
    this.cargarReclamo();
  }

  cargarReclamo() {
    this.calidadService.getReclamoById(this.reclamoId).subscribe({
      next: (data) => {
        this.reclamo = data;
        if (data.accionCorrectiva) {
          this.resolucionData.accionCorrectiva = data.accionCorrectiva;
        }
        if (data.cerradoPor) {
          this.resolucionData.resueltoPor = data.cerradoPor;
        }
      },
      error: (err) => console.error('Error al obtener el reclamo:', err)
    });
  }

  isAbiertoOrProceso(): boolean {
    if (!this.reclamo) return false;
    const estatusVal = Number(this.reclamo.estatus);
    return estatusVal === 1 || estatusVal === 2;
  }

  isResueltoOrCerrado(): boolean {
    if (!this.reclamo) return false;
    const estatusVal = Number(this.reclamo.estatus);
    return estatusVal === 3 || estatusVal === 4;
  }

  abrirModalReel() {
    this.nuevoReel = { noSerieCarrete: '', defecto: 1, observacion: '' };
    this.mostrarModalReel = true;
  }

  cerrarModalReel() {
    this.mostrarModalReel = false;
  }

  guardarCarreteDefecto() {
    if (!this.nuevoReel.noSerieCarrete) return;
    this.calidadService.agregarDetalleReclamo(this.reclamoId, this.nuevoReel).subscribe({
      next: () => {
        this.mostrarModalReel = false;
        this.cargarReclamo();
      },
      error: (err) => {
        console.error('Error al agregar carrete defectuoso:', err);
        alert('No se pudo registrar el carrete defectuoso. Verifique que no haya sido agregado previamente.');
      }
    });
  }

  abrirFormResolucion() {
    this.mostrarFormResolucion = true;
  }

  resolverReclamo() {
    if (!this.resolucionData.accionCorrectiva || !this.resolucionData.resueltoPor) return;
    this.calidadService.resolverReclamo(this.reclamoId, this.resolucionData).subscribe({
      next: () => {
        this.mostrarFormResolucion = false;
        this.cargarReclamo();
      },
      error: (err) => {
        console.error('Error al resolver reclamo:', err);
        alert('Ocurrió un error al aplicar la resolución.');
      }
    });
  }

  getEstatusClass(estatus: any): string {
    const val = Number(estatus);
    switch (val) {
      case 1: return 'status-abierto';
      case 2: return 'status-proceso';
      case 3: return 'status-resuelto';
      case 4: return 'status-cerrado';
      default: return 'status-cerrado';
    }
  }

  getEstatusNombre(estatus: any): string {
    const val = Number(estatus);
    switch (val) {
      case 1: return 'Abierto';
      case 2: return 'En Proceso';
      case 3: return 'Resuelto';
      case 4: return 'Cerrado';
      default: return 'Cerrado';
    }
  }

  getDefectoNombre(defecto: number): string {
    switch (Number(defecto)) {
      case 1: return 'Calibre';
      case 2: return 'Peso';
      case 3: return 'Espesor';
      case 4: return 'Daño Físico';
      case 5: return 'Contaminación Color';
      case 6: return 'Otro';
      default: return 'Otro';
    }
  }
}
