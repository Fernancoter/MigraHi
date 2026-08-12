import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LogisticaService, Embarque, ResumenCarga } from '../../../core/services/logistica';

@Component({
  selector: 'app-carga-camion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up" *ngIf="embarque">
      <header class="module-header">
        <div class="title-area">
          <nav class="breadcrumb">Logística > Embarques > Carga de Camión</nav>
          <h1>🚛 Carga de Embarque: {{ embarque.codigo }}</h1>
          <p>Escanee cada palet para validar su carga en el transporte.</p>
        </div>
        <div class="actions">
          <button class="btn btn-outline" (click)="regresar()">Volver al Listado</button>
        </div>
      </header>

      <div class="loading-container">
        <!-- INFO EMBARQUE -->
        <div class="info-sidebar">
          <div class="info-card">
            <h3>📋 Datos Generales</h3>
            <div class="info-row">
              <span class="label">Cliente:</span>
              <span class="value">{{ embarque.cliente }}</span>
            </div>
            <div class="info-row">
              <span class="label">Remisión:</span>
              <span class="value">{{ embarque.remissionDoc }}</span>
            </div>
            <div class="info-row">
              <span class="label">Transporte:</span>
              <span class="value">{{ embarque.transporte }} ({{ embarque.placas }})</span>
            </div>
            <div class="info-row">
              <span class="label">Conductor:</span>
              <span class="value">{{ embarque.conductor }}</span>
            </div>
          </div>

          <div class="progress-card">
            <h3>📊 Progreso de Carga</h3>
            <div class="progress-circle">
              <span class="pct">{{ porcentajeCarga }}%</span>
              <span class="sub">{{ paletsEscaneados }} / {{ totalPalets }} Palets</span>
            </div>
          </div>
          
          <button class="btn btn-primary full-width" [disabled]="porcentajeCarga < 100" (click)="finalizar()">
            Finalizar Embarque
          </button>
        </div>

        <!-- AREA DE ESCANEO -->
        <div class="scanning-area">
          <div class="scan-input-card">
            <div class="scan-icon">📡</div>
            <input type="text" [(ngModel)]="noSerieScan" (keyup.enter)="escanearPalet()" 
                   placeholder="Escanee Número de Serie del Palet..." #scanInput autofocus>
            <p class="hint">Use el escáner de mano o escriba manualmente</p>
          </div>

          <div class="feedback-msg" *ngIf="lastMsg" [class.error]="lastMsgError" [class.success]="!lastMsgError">
            {{ lastMsg }}
          </div>

          <div class="history-card">
            <h3>📝 Palets Cargados</h3>
            <div class="empty-state" *ngIf="paletsCargados.length === 0">
              Esperando primer escaneo...
            </div>
            <ul class="pallet-list">
              <li *ngFor="let p of paletsCargados" class="pallet-item animate-pop">
                <div class="pallet-info">
                  <span class="p-serie">Serie: {{ p.noSerie }}</span>
                  <span class="p-time">{{ p.fechaCarga | date:'HH:mm' }}</span>
                </div>
                <span class="check">✔</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .module-page { padding: 1.5rem 2.5rem; }
    .breadcrumb { font-size: 0.75rem; color: #94a3b8; margin-bottom: 0.5rem; font-weight: 600; text-transform: uppercase; }
    h1 { font-size: 1.5rem; color: #1e293b; margin: 0; }
    
    .loading-container { display: grid; grid-template-columns: 350px 1fr; gap: 2rem; margin-top: 2rem; }
    
    .info-card, .progress-card, .history-card { background: white; border-radius: 16px; padding: 1.5rem; border: 1px solid #e2e8f0; margin-bottom: 1.5rem; }
    h3 { font-size: 0.9rem; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 1rem 0; }
    
    .info-row { display: flex; justify-content: space-between; margin-bottom: 0.75rem; font-size: 0.9rem; }
    .info-row .label { color: #94a3b8; }
    .info-row .value { font-weight: 700; color: #1e293b; }

    .progress-circle { display: flex; flex-direction: column; align-items: center; padding: 1rem; }
    .progress-circle .pct { font-size: 2.5rem; font-weight: 800; color: #22c55e; }
    .progress-circle .sub { font-size: 0.8rem; color: #94a3b8; font-weight: 600; }

    .scan-input-card { background: #1e293b; border-radius: 16px; padding: 2.5rem; text-align: center; color: white; margin-bottom: 1.5rem; }
    .scan-icon { font-size: 3rem; margin-bottom: 1rem; }
    .scan-input-card input { width: 100%; max-width: 400px; padding: 1rem; border-radius: 12px; border: none; font-size: 1.25rem; text-align: center; color: #1e293b; }
    .hint { font-size: 0.8rem; opacity: 0.6; margin-top: 1rem; }

    .feedback-msg { padding: 1rem; border-radius: 12px; text-align: center; font-weight: 700; margin-bottom: 1.5rem; }
    .feedback-msg.success { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }
    .feedback-msg.error { background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; }

    .pallet-list { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
    .pallet-item { background: #f8fafc; padding: 1rem; border-radius: 12px; border: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
    .pallet-info { display: flex; flex-direction: column; }
    .p-serie { font-weight: 700; color: #1e293b; font-size: 0.9rem; }
    .p-time { font-size: 0.75rem; color: #94a3b8; }
    .check { color: #22c55e; font-weight: 800; }

    .empty-state { text-align: center; padding: 3rem; color: #94a3b8; font-style: italic; }
    .btn { padding: 0.75rem 1.5rem; border-radius: 10px; font-weight: 700; cursor: pointer; transition: all 0.2s; border: none; }
    .btn-primary { background: #3b82f6; color: white; }
    .btn-primary:hover { background: #2563eb; }
    .btn-outline { background: white; border: 1px solid #e2e8f0; color: #64748b; }
    .full-width { width: 100%; }
  `]
})
export class CargaCamionComponent implements OnInit {
  private logisticaService = inject(LogisticaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  embarque: Embarque | null = null;
  noSerieScan = '';
  lastMsg = '';
  lastMsgError = false;
  
  paletsCargados: any[] = [];
  resumen: ResumenCarga | null = null;
  totalPalets = 0;
  paletsEscaneados = 0;
  porcentajeCarga = 0;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadResumen(id);
    }
  }

  loadResumen(id: string) {
    this.logisticaService.getEmbarquesActivos().subscribe(data => {
      this.embarque = data.find(e => e.id === id) || null;
    });

    this.logisticaService.getResumenCarga(id).subscribe({
      next: (resumen) => {
        this.resumen = resumen;
        this.totalPalets = resumen.detalles.reduce((sum, d) => sum + d.cantidadPalletsRequerida, 0);
        this.paletsEscaneados = resumen.detalles.reduce((sum, d) => sum + d.cantidadPalletsEscaneados, 0);
        this.updateProgress();
      },
      error: (err) => console.error('Error al cargar resumen de carga:', err)
    });
  }

  escanearPalet() {
    if (!this.noSerieScan || !this.embarque) return;

    const id = this.embarque.id;
    this.logisticaService.validarPalet(id, this.noSerieScan).subscribe({
      next: (res) => {
        this.lastMsg = res.message;
        this.lastMsgError = false;
        this.paletsCargados.unshift({ noSerie: this.noSerieScan, fechaCarga: new Date() });
        this.noSerieScan = '';
        this.loadResumen(id);
      },
      error: (err) => {
        this.lastMsg = err.error?.message || 'Error al validar palet';
        this.lastMsgError = true;
        this.noSerieScan = '';
      }
    });
  }

  updateProgress() {
    this.porcentajeCarga = this.totalPalets > 0 ? Math.round((this.paletsEscaneados / this.totalPalets) * 100) : 0;
  }

  finalizar() {
    if (!this.embarque) return;
    this.logisticaService.finalizarEmbarque(this.embarque.id, 'OPERADOR_ACTUAL').subscribe({
      next: () => {
        alert('Embarque finalizado con éxito');
        this.router.navigate(['/embarques']);
      },
      error: (err) => {
        alert(err.error?.message || 'No se pudo finalizar el embarque. Verifique que todos los palets requeridos estén escaneados.');
      }
    });
  }

  regresar() {
    this.router.navigate(['/embarques']);
  }
}
