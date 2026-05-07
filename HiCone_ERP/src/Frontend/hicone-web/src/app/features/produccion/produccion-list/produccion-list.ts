import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduccionService, Extrusion, Prensado, CausaInterrupcion } from '../../../core/services/produccion';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produccion-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up">
      <header class="module-header">
        <div class="title-area">
          <nav class="breadcrumb">Producción > Tablero de Control</nav>
          <h1>📊 Monitor de Producción en Tiempo Real</h1>
          <p>Control de extrusoras, prensas y gestión de tiempos muertos (Downtime).</p>
        </div>
      </header>

      <div class="production-dashboard-grid">
        <!-- SECCIÓN EXTRUSIÓN -->
        <div class="content-card shadow-lg">
          <div class="card-header bg-gradient">
            <h3>🏗️ Extrusoras en Operación</h3>
            <span class="badge live animate-pulse">LIVE EXTRUSIÓN</span>
          </div>
          <table class="data-table">
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
                  <div class="status-pill" [class.working]="o.estado === 'EnProceso'" [class.stopped]="o.estado === 'Detenida'">
                    {{ o.estado === 'EnProceso' ? '⚡ OPERANDO' : '🚫 DETENIDA' }}
                  </div>
                </td>
                <td><strong>{{ o.extrusora?.nombre || o.extrusoraId }}</strong></td>
                <td>{{ o.producto?.nombre || 'N/A' }}</td>
                <td>{{ o.operario?.nombreCompleto || 'Sin asignar' }}</td>
                <td class="text-right font-bold">{{ o.totalBobinas || 0 }} Bobinas</td>
                <td class="text-right">
                  <button *ngIf="o.estado === 'EnProceso'" (click)="abrirModalInterrupcion(o, 'extrusion')" class="btn-stop">Detener</button>
                  <button *ngIf="o.estado === 'Detenida'" (click)="reanudarProceso(o, 'extrusion')" class="btn-resume">Retomar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- SECCIÓN PRENSADO -->
        <div class="content-card shadow-lg">
          <div class="card-header bg-gradient-alt">
            <h3>⚙️ Prensas en Operación</h3>
            <span class="badge live">LIVE PRENSADO</span>
          </div>
          <table class="data-table">
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
                  <div class="status-pill" [class.working]="p.estado === 'EnProceso'" [class.stopped]="p.estado === 'Detenida'">
                    {{ p.estado === 'EnProceso' ? '⚡ OPERANDO' : '🚫 DETENIDA' }}
                  </div>
                </td>
                <td><strong>{{ p.prensa?.nombre || 'Prensa' }}</strong></td>
                <td>{{ p.producto?.nombre || 'N/A' }}</td>
                <td>{{ p.operario?.nombreCompleto || 'Sin asignar' }}</td>
                <td class="text-right font-bold">En Línea</td>
                <td class="text-right">
                  <button *ngIf="p.estado === 'EnProceso'" (click)="abrirModalInterrupcion(p, 'prensado')" class="btn-stop">Detener</button>
                  <button *ngIf="p.estado === 'Detenida'" (click)="reanudarProceso(p, 'prensado')" class="btn-resume">Retomar</button>
                </td>
              </tr>
              <tr *ngIf="prensadosActivos.length === 0">
                <td colspan="6" class="text-center empty-msg">No hay prensas trabajando actualmente.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- MODAL DE INTERRUPCIÓN (DOWNTIME) -->
      <div class="modal-overlay" *ngIf="showModal">
        <div class="modal-content animate-pop">
          <header>
            <h2>🛑 Reportar Paro de Máquina</h2>
            <p>Seleccione el motivo de la interrupción para {{ itemToStop?.codigo }}</p>
          </header>
          
          <div class="form-group">
            <label>Causa del Paro</label>
            <select [(ngModel)]="selectedCausaId" class="modern-select">
              <option value="">Seleccione una causa...</option>
              <option *ngFor="let c of causas" [value]="c.id">[{{c.codigo}}] {{c.descripcion}}</option>
            </select>
          </div>

          <div class="form-group">
            <label>Comentarios Adicionales</label>
            <textarea [(ngModel)]="descripcionParo" placeholder="Detalle técnico de la falla..."></textarea>
          </div>

          <footer>
            <button class="btn-cancel" (click)="showModal = false">Cancelar</button>
            <button class="btn-confirm" [disabled]="!selectedCausaId" (click)="confirmarParo()">Confirmar Paro</button>
          </footer>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .module-page { padding: 1.5rem 2.5rem; }
    .breadcrumb { font-size: 0.75rem; color: #94a3b8; margin-bottom: 0.5rem; font-weight: 600; text-transform: uppercase; }
    h1 { font-size: 1.8rem; font-weight: 800; color: #1e293b; margin: 0; }
    
    .production-dashboard-grid { display: flex; flex-direction: column; gap: 2rem; }
    
    .content-card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; }
    .card-header { padding: 1.25rem 1.5rem; display: flex; justify-content: space-between; align-items: center; color: white; }
    .bg-gradient { background: linear-gradient(135deg, #1e293b 0%, #334155 100%); }
    .bg-gradient-alt { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); }
    .card-header h3 { margin: 0; font-size: 1.1rem; font-weight: 700; }
    
    .badge { padding: 0.35rem 0.75rem; border-radius: 6px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; }
    .badge.live { background: rgba(34, 197, 94, 0.2); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.4); }
    
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th { text-align: left; padding: 1.25rem 1.5rem; background: #f8fafc; color: #64748b; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
    .data-table td { padding: 1.25rem 1.5rem; border-bottom: 1px solid #f1f5f9; font-size: 0.9rem; }
    
    .status-pill { display: inline-flex; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; font-weight: 700; }
    .status-pill.working { background: #dcfce7; color: #15803d; }
    .status-pill.stopped { background: #fee2e2; color: #b91c1c; }
    
    .btn-stop { background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; padding: 0.5rem 1rem; border-radius: 8px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
    .btn-stop:hover { background: #fecaca; }
    .btn-resume { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; padding: 0.5rem 1rem; border-radius: 8px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
    .btn-resume:hover { background: #bbf7d0; }

    /* Modal Styles */
    .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .modal-content { background: white; width: 90%; max-width: 500px; border-radius: 20px; padding: 2rem; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); }
    .modal-content h2 { font-size: 1.5rem; color: #1e293b; margin-bottom: 0.5rem; }
    .modal-content p { color: #64748b; margin-bottom: 1.5rem; }
    
    .form-group { margin-bottom: 1.5rem; }
    .form-group label { display: block; font-weight: 700; color: #475569; font-size: 0.85rem; margin-bottom: 0.5rem; }
    .modern-select, textarea { width: 100%; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 1rem; }
    textarea { height: 100px; resize: none; }
    
    footer { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1rem; }
    .btn-cancel { background: #f1f5f9; color: #475569; border: none; padding: 0.75rem 1.5rem; border-radius: 10px; font-weight: 700; cursor: pointer; }
    .btn-confirm { background: #b91c1c; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 10px; font-weight: 700; cursor: pointer; }
    .btn-confirm:disabled { opacity: 0.5; cursor: not-allowed; }

    .empty-msg { padding: 3rem; color: #94a3b8; font-style: italic; }
  `]
})
export class ProduccionListComponent implements OnInit {
  private produccionService = inject(ProduccionService);
  
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
    this.produccionService.getExtrusiones().subscribe(data => {
      this.extrusionesActivas = data.filter(e => e.estado === 'EnProceso' || e.estado === 'Detenida');
    });
    this.produccionService.getPrensados().subscribe(data => {
      this.prensadosActivos = data.filter(p => p.estado === 'EnProceso' || p.estado === 'Detenida');
    });
  }

  loadCausas() {
    this.produccionService.getCausasInterrupcion().subscribe(data => this.causas = data);
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
    // Aquí buscaríamos la última interrupción activa para este ítem
    // Por simplicidad en este MVP, asumiremos que el backend sabe cuál cerrar
    // En una implementación real, pasaríamos el ID de la interrupción.
    alert('Reanudando proceso...');
    this.refreshData();
  }
}
