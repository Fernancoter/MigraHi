import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduccionService, Extrusion, Prensado, CausaInterrupcion } from '../../../core/services/produccion';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produccion-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-fade-in">
      <div class="page-header-premium">
        <div class="title-section">
          <h1 class="premium-title">Monitor de Producción en Tiempo Real</h1>
          <nav class="breadcrumb-modern">
            <span class="root">Producción</span>
            <span class="sep">&rsaquo;</span>
            <span class="active">Tablero de Control</span>
          </nav>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.25rem;">Control de extrusoras, prensas y gestión de tiempos muertos (Downtime).</p>
        </div>
      </div>

      <div class="production-dashboard-grid">
        <!-- SECCIÓN EXTRUSIÓN -->
        <div class="card-premium">
          <div class="toolbar-premium bg-gradient-premium">
            <h3 style="margin: 0; font-size: 1.1rem; font-weight: 700; color: #1e293b;">🏗️ Extrusoras en Operación</h3>
            <span class="badge-premium badge-info animate-pulse-slow">LIVE EXTRUSIÓN</span>
          </div>
          <div class="table-modern-container">
            <table class="table-modern">
              <thead>
                <tr>
                  <th>Estado</th>
                  <th>Máquina</th>
                  <th>Producto</th>
                  <th>Operador</th>
                  <th class="text-right">Producción</th>
                  <th class="text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let o of extrusionesActivas">
                  <td>
                    <span class="badge-premium" [class.badge-success]="!o.interrupcionEnCurso" [class.badge-warning]="o.interrupcionEnCurso">
                      {{ o.interrupcionEnCurso ? '🚫 DETENIDA' : '⚡ OPERANDO' }}
                    </span>
                  </td>
                  <td><strong>{{ o.extrusora?.nombre || o.extrusoraId }}</strong></td>
                  <td>{{ o.producto?.nombre || 'N/A' }}</td>
                  <td>{{ o.operario?.nombreCompleto || 'Sin asignar' }}</td>
                  <td class="text-right font-mono" style="font-weight: 700;">{{ o.totalBobinas || 0 }} Bobinas</td>
                  <td class="text-right">
                    <button *ngIf="!o.interrupcionEnCurso" (click)="abrirModalInterrupcion(o, 'extrusion')" class="btn-premium-danger" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">Detener</button>
                    <button *ngIf="o.interrupcionEnCurso" (click)="reanudarProceso(o, 'extrusion')" class="btn-premium" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">Retomar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- SECCIÓN PRENSADO -->
        <div class="card-premium">
          <div class="toolbar-premium bg-gradient-premium">
            <h3 style="margin: 0; font-size: 1.1rem; font-weight: 700; color: #1e293b;">⚙️ Prensas en Operación</h3>
            <span class="badge-premium badge-info">LIVE PRENSADO</span>
          </div>
          <div class="table-modern-container">
            <table class="table-modern">
              <thead>
                <tr>
                  <th>Estado</th>
                  <th>Máquina</th>
                  <th>Producto</th>
                  <th>Operador</th>
                  <th class="text-right">Progreso</th>
                  <th class="text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let p of prensadosActivos">
                  <td>
                    <span class="badge-premium" [class.badge-success]="!p.interrupcionEnCurso" [class.badge-warning]="p.interrupcionEnCurso">
                      {{ p.interrupcionEnCurso ? '🚫 DETENIDA' : '⚡ OPERANDO' }}
                    </span>
                  </td>
                  <td><strong>{{ p.prensa?.nombre || 'Prensa' }}</strong></td>
                  <td>{{ p.producto?.nombre || 'N/A' }}</td>
                  <td>{{ p.operario?.nombreCompleto || 'Sin asignar' }}</td>
                  <td class="text-right" style="font-weight: 700;">En Línea</td>
                  <td class="text-right">
                    <button *ngIf="!p.interrupcionEnCurso" (click)="abrirModalInterrupcion(p, 'prensado')" class="btn-premium-danger" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">Detener</button>
                    <button *ngIf="p.interrupcionEnCurso" (click)="reanudarProceso(p, 'prensado')" class="btn-premium" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">Retomar</button>
                  </td>
                </tr>
                <tr *ngIf="prensadosActivos.length === 0">
                  <td colspan="6" class="empty-row-premium">No hay prensas trabajando actualmente.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- MODAL DE INTERRUPCIÓN (DOWNTIME) -->
      <div class="modal-overlay-premium" *ngIf="showModal" (click)="showModal = false">
        <div class="modal-card-premium animate-scale-in" (click)="$event.stopPropagation()">
          <div class="modal-header-premium">
            <h3>🛑 Reportar Paro de Máquina</h3>
            <button class="btn-icon-premium" (click)="showModal = false">✖️</button>
          </div>
          
          <div class="modal-body-premium">
            <p style="color: var(--text-muted); margin-bottom: 1.25rem;">Seleccione el motivo de la interrupción para {{ itemToStop?.codigo }}</p>
            
            <div class="form-group-premium">
              <label>Causa del Paro</label>
              <select [(ngModel)]="selectedCausaId" class="input-premium">
                <option value="">Seleccione una causa...</option>
                <option *ngFor="let c of causas" [value]="c.id">[{{c.codigo}}] {{c.descripcion}}</option>
              </select>
            </div>

            <div class="form-group-premium">
              <label>Comentarios Adicionales</label>
              <textarea [(ngModel)]="descripcionParo" class="input-premium" style="height: 100px; resize: none;" placeholder="Detalle técnico de la falla..."></textarea>
            </div>
          </div>

          <div class="modal-footer-premium">
            <button class="btn-premium-danger" [disabled]="!selectedCausaId" (click)="confirmarParo()">Confirmar Paro</button>
            <button class="btn-premium-secondary" (click)="showModal = false">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .production-dashboard-grid { display: flex; flex-direction: column; gap: 2rem; }
    .bg-gradient-premium { background: #f8fafc; border-bottom: 1px solid var(--border-color); }
    @keyframes pulseSlow {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }
    .animate-pulse-slow {
      animation: pulseSlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
  `]
})
export class ProduccionListComponent implements OnInit {
  private produccionService = inject(ProduccionService);
  private cdr = inject(ChangeDetectorRef);
  
  extrusionesActivas: Extrusion[] = [];
  prensadosActivos: Prensado[] = [];
  causas: CausaInterrupcion[] = [];
  
  showModal = false;
  itemToStop: any = null;
  typeToStop: 'extrusion' | 'prensado' = 'extrusion';
  selectedCausaId = '';
  descripcionParo = '';

  ngOnInit() {
    this.refreshData();
    this.loadCausas();
  }

  refreshData() {
    // "Detenida" no es un valor de EstadoExtrusion/EstadoPrensado: una interrupción activa
    // no cambia el Estado de la entidad (se queda en EnProceso), solo pone
    // InterrupcionEnCurso=true. El filtro se queda en EnProceso; el badge/botones usan
    // interrupcionEnCurso para distinguir Operando vs Detenida.
    this.produccionService.getExtrusiones().subscribe(data => {
      this.extrusionesActivas = data.filter(e => e.estado === 'EnProceso');
      this.cdr.detectChanges();
    });
    this.produccionService.getPrensados().subscribe(data => {
      this.prensadosActivos = data.filter(p => p.estado === 1);
      this.cdr.detectChanges();
    });
  }

  loadCausas() {
    this.produccionService.getCausasInterrupcion().subscribe(data => {
      this.causas = data;
      this.cdr.detectChanges();
    });
  }

  abrirModalInterrupcion(item: any, type: 'extrusion' | 'prensado') {
    this.itemToStop = item;
    this.typeToStop = type;
    this.showModal = true;
    this.selectedCausaId = '';
    this.descripcionParo = '';
  }

  confirmarParo() {
    const request = {
      entidadId: this.itemToStop.id,
      causaId: this.selectedCausaId,
      descripcion: this.descripcionParo
    };

    if (this.typeToStop === 'extrusion') {
      this.produccionService.registrarInterrupcionExtrusion(request).subscribe(() => {
        this.showModal = false;
        this.refreshData();
      });
    } else {
      this.produccionService.registrarInterrupcionPrensado(request).subscribe(() => {
        this.showModal = false;
        this.refreshData();
      });
    }
  }

  reanudarProceso(item: any, type: 'extrusion' | 'prensado') {
    if (type === 'extrusion') {
      this.produccionService.finalizarInterrupcionExtrusionActiva(item.id).subscribe({
        next: () => {
          this.refreshData();
        },
        error: (err) => {
          console.error('Error al reanudar extrusora:', err);
          alert('No se pudo reanudar la extrusora.');
        }
      });
    } else {
      this.produccionService.finalizarInterrupcionPrensadoActiva(item.id).subscribe({
        next: () => {
          this.refreshData();
        },
        error: (err) => {
          console.error('Error al reanudar prensa:', err);
          alert('No se pudo reanudar la prensa.');
        }
      });
    }
  }
}
