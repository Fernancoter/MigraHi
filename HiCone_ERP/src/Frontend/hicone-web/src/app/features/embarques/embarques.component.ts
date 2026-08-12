import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LogisticaService, Embarque } from '../../core/services/logistica';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-embarques',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-fade-in">
      <header class="module-header">
        <div class="title-area">
          <h1>📦 Logística y Embarques</h1>
          <p>Control de despachos y salidas de producto terminado</p>
        </div>
        <div class="actions">
          <button class="btn btn-primary" (click)="abrirModalCrear()">+ Nuevo Embarque</button>
        </div>
      </header>

      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-label">En Carga</span>
          <span class="stat-value">{{ getStat(3) }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Pendientes de Programar</span>
          <span class="stat-value">{{ getStat(1) }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Programados</span>
          <span class="stat-value">{{ getStat(2) }}</span>
        </div>
      </div>

      <div class="content-card">
        <table class="data-table">
          <thead>
            <tr>
              <th>Folio Carga</th>
              <th>Remisión SAE</th>
              <th>Cliente / Destino</th>
              <th>Transporte / Placas</th>
              <th>Conductor</th>
              <th>Estatus</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let e of embarques">
              <td class="bold text-primary">{{ e.codigo }}</td>
              <td><span class="sae-tag">SAE: {{ e.remissionDoc }}</span></td>
              <td>
                <div class="client-cell">
                  <span class="client-name">{{ e.cliente }}</span>
                  <span class="destination">Pendiente dirección</span>
                </div>
              </td>
              <td>{{ e.transporte || '---' }} <br> <small class="text-muted">{{ e.placas || '---' }}</small></td>
              <td>{{ e.conductor || '---' }}</td>
              <td>
                <span class="status-badge" [class]="getEstatusClass(e.estatus)">{{ getEstatusNombre(e.estatus) }}</span>
              </td>
              <td>
                {{ e.fecha | date:'dd/MM/yy' }}
                <div class="actions-cell">
                   <button *ngIf="e.estatus !== 4" class="btn-action" (click)="irACargar(e.id)">📦 Cargar</button>
                   <button class="btn-action secondary">📄 Ver</button>
                </div>
              </td>
            </tr>
            <tr *ngIf="embarques.length === 0">
               <td colspan="7" style="text-align: center; padding: 2rem; color: #94a3b8;">No hay embarques activos.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="modal-overlay" *ngIf="mostrarModalCrear" (click)="cerrarModalCrear()">
        <div class="modal-card" (click)="$event.stopPropagation()">
          <h3>Nuevo Embarque desde SAE</h3>
          <div class="form-group">
            <label>Número de Orden (OrderDoc)</label>
            <input type="text" [(ngModel)]="nuevoEmbarque.orderDoc" placeholder="Ej. ORD-12345">
          </div>
          <div class="form-group">
            <label>Número de Remisión (RemissionDoc)</label>
            <input type="text" [(ngModel)]="nuevoEmbarque.remissionDoc" placeholder="Ej. REM-12345">
          </div>
          <div class="modal-actions">
            <button class="btn-secondary" (click)="cerrarModalCrear()">Cancelar</button>
            <button class="btn-primary" [disabled]="!nuevoEmbarque.orderDoc || !nuevoEmbarque.remissionDoc" (click)="guardarNuevoEmbarque()">Crear</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .module-page { padding: 2rem; }
    .module-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem; }
    h1 { font-size: 1.75rem; color: #1e293b; margin-bottom: 0.25rem; }
    p { color: #64748b; font-size: 0.875rem; }

    .actions-cell { display: flex; gap: 0.5rem; }
    .btn-action { padding: 0.4rem 0.8rem; border-radius: 6px; border: 1px solid #e2e8f0; background: white; color: #1e293b; font-size: 0.75rem; font-weight: 700; cursor: pointer; transition: all 0.2s; }
    .btn-action:hover { background: #f8fafc; border-color: #cbd5e1; }
    .btn-action.secondary { color: #64748b; }

    .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 2rem; }
    .stat-card { background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid var(--border-color); }
    .stat-label { display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem; }
    .stat-value { font-size: 2rem; font-weight: 800; color: var(--primary); }

    .content-card { background: white; border-radius: 8px; border: 1px solid var(--border-color); overflow: hidden; }
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th { text-align: left; padding: 1rem; background: #f8fafc; font-size: 0.75rem; font-weight: 700; color: var(--text-muted); }
    .data-table td { padding: 1rem; border-top: 1px solid var(--border-color); font-size: 0.875rem; }
    .bold { font-weight: 700; }

    .status-badge { padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }
    .sae-tag { background: #fee2e2; color: #b91c1c; padding: 0.125rem 0.375rem; border-radius: 4px; font-size: 0.7rem; font-weight: 600; border: 1px solid #fecaca; }
    .client-cell { display: flex; flex-direction: column; }
    .client-name { font-weight: 600; color: var(--text-main); font-size: 0.875rem; }
    .destination { font-size: 0.75rem; color: var(--text-muted); }
    .text-primary { color: var(--primary); }
    .text-muted { color: var(--text-muted); }

    .status-badge.entregado { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
    .status-badge.por-programar { background: #fef9c3; color: #854d0e; border: 1px solid #fef08a; }
    .status-badge.programado { background: #dbeafe; color: #1e40af; border: 1px solid #bfdbfe; }
    .status-badge.en-carga { background: #ffedd5; color: #9a3412; border: 1px solid #fed7aa; }
    .status-badge.cancelado { background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0; }

    .btn-primary { background: var(--primary); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
    .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
    .btn-secondary { background: white; border: 1px solid #e2e8f0; color: #64748b; padding: 0.75rem 1.5rem; border-radius: 6px; font-weight: 600; cursor: pointer; }

    .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; }
    .modal-card { background: white; padding: 1.5rem; border-radius: 8px; width: 400px; }
    .modal-card h3 { margin: 0 0 1.25rem 0; }
    .form-group { margin-bottom: 1rem; }
    .form-group label { display: block; margin-bottom: 0.4rem; font-size: 0.85rem; font-weight: 600; color: #334155; }
    .form-group input { width: 100%; padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 6px; box-sizing: border-box; }
    .modal-actions { display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.25rem; }
  `]
})
export class EmbarquesComponent implements OnInit {
  private logisticaService = inject(LogisticaService);
  private router = inject(Router);
  private notify = inject(NotificationService);
  embarques: Embarque[] = [];

  mostrarModalCrear = false;
  nuevoEmbarque = { orderDoc: '', remissionDoc: '' };

  ngOnInit() {
    this.loadEmbarques();
  }

  abrirModalCrear() {
    this.nuevoEmbarque = { orderDoc: '', remissionDoc: '' };
    this.mostrarModalCrear = true;
  }

  cerrarModalCrear() {
    this.mostrarModalCrear = false;
  }

  guardarNuevoEmbarque() {
    if (!this.nuevoEmbarque.orderDoc || !this.nuevoEmbarque.remissionDoc) return;
    this.logisticaService.crearEmbarqueDesdeSae(this.nuevoEmbarque).subscribe({
      next: () => {
        this.notify.success('Embarque creado exitosamente.');
        this.mostrarModalCrear = false;
        this.loadEmbarques();
      },
      error: (err) => {
        console.error('Error al crear embarque:', err);
        this.notify.error('No se pudo crear el embarque. Intente de nuevo.');
      }
    });
  }

  loadEmbarques() {
    this.logisticaService.getEmbarquesActivos().subscribe(data => {
      this.embarques = data;
    });
  }

  irACargar(id: string) {
    this.router.navigate(['/embarques/carga', id]);
  }

  getStat(estatus: number): number {
    return this.embarques.filter(e => e.estatus === estatus).length;
  }

  getEstatusNombre(estatus: number): string {
    switch (estatus) {
      case 1: return 'Por Programar';
      case 2: return 'Programado';
      case 3: return 'En Carga';
      case 4: return 'Cargado';
      case 5: return 'Cancelado';
      default: return 'Desconocido';
    }
  }

  getEstatusClass(estatus: number): string {
    switch (estatus) {
      case 1: return 'status-badge por-programar';
      case 2: return 'status-badge programado';
      case 3: return 'status-badge en-carga';
      case 4: return 'status-badge entregado';
      case 5: return 'status-badge cancelado';
      default: return 'status-badge';
    }
  }
}
