import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduccionService, Prensa } from '../../../core/services/produccion';
import { SyncQueueService, PendingOp } from '../../../core/offline/sync-queue.service';

@Component({
  selector: 'app-carrera-captura',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="carrera-view">
      <div class="card card-hero">
        <h2>Validar y Cerrar Carrera</h2>
        <p>Registre la finalización de una carrera de prensado.</p>
      </div>

      <div class="card form-card">
        <div class="form-group">
          <label for="prensa">Prensa Activa:</label>
          <select id="prensa" [(ngModel)]="selectedPrensaId" class="form-control">
            <option value="" disabled>-- Seleccione --</option>
            <option *ngFor="let p of prensas" [value]="p.id">{{ p.nombre }} ({{ p.codigo }})</option>
          </select>
        </div>

        <div class="form-group">
          <label for="carreraNo">Número de Carrera:</label>
          <input type="number" id="carreraNo" [(ngModel)]="carreraNo" class="form-control" placeholder="Ej: 1, 2, 3..." />
        </div>

        <div class="form-group">
          <label for="piezasBuenas">Piezas Buenas Producidas:</label>
          <input type="number" id="piezasBuenas" [(ngModel)]="piezasBuenas" class="form-control" placeholder="Cantidad de piezas útiles" />
        </div>

        <div class="form-group">
          <label for="piezasMolino">Piezas a Molino (Merma):</label>
          <input type="number" id="piezasMolino" [(ngModel)]="piezasMolino" class="form-control" placeholder="Cantidad enviada a molino" />
        </div>

        <button class="action-btn" [disabled]="!selectedPrensaId || !carreraNo || piezasBuenas === null" (click)="registrarCarrera()">
          💾 Validar y Cerrar Carrera
        </button>
      </div>

      <div *ngIf="message" class="status-banner" [class.success]="isSuccess">
        {{ message }}
      </div>
    </div>
  `,
  styles: [`
    .carrera-view {
      display: flex;
      flex-direction: column;
      gap: 16px;
      height: 100%;
    }

    .card {
      background: white;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }

    .card-hero {
      background: linear-gradient(135deg, #f857a6 0%, #ff5858 100%);
      color: white;
      text-align: center;
    }

    .card-hero h2 {
      margin: 0 0 8px 0;
      font-size: 20px;
    }

    .card-hero p {
      margin: 0;
      font-size: 14px;
      opacity: 0.9;
    }

    .form-card {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .form-group label {
      font-weight: 600;
      color: #555;
      font-size: 14px;
    }

    .form-control {
      padding: 12px;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 16px;
      background-color: #fafafa;
    }

    .action-btn {
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
      color: white;
      border: none;
      padding: 16px;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .action-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
      box-shadow: none;
    }

    .status-banner {
      background-color: #f44336;
      color: white;
      padding: 12px;
      border-radius: 6px;
      text-align: center;
      font-weight: 600;
      animation: fadeIn 0.3s ease;
    }

    .status-banner.success {
      background-color: #4caf50;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class CarreraComponent implements OnInit {
  private prodService = inject(ProduccionService);
  private syncQueue = inject(SyncQueueService);

  prensas: Prensa[] = [];
  selectedPrensaId = '';
  carreraNo: number | null = null;
  piezasBuenas: number | null = null;
  piezasMolino: number | null = null;
  
  message = '';
  isSuccess = false;

  ngOnInit() {
    this.prodService.getPrensas().subscribe({
      next: (data) => this.prensas = data,
      error: () => this.showStatus('Error al cargar catálogo de prensas', false)
    });
  }

  async registrarCarrera() {
    if (!this.selectedPrensaId || !this.carreraNo || this.piezasBuenas === null) return;

    const op: PendingOp = {
      id: `carrera_${this.selectedPrensaId}_${this.carreraNo}_${Date.now()}`,
      endpoint: 'http://localhost:5007/api/v1/produccion/prensado/carrera/cerrar',
      method: 'POST',
      body: {
        prensaId: this.selectedPrensaId,
        carreraNo: this.carreraNo,
        piezasBuenas: this.piezasBuenas,
        piezasMolino: this.piezasMolino || 0,
        fechaRegistro: new Date().toISOString()
      },
      createdAt: Date.now()
    };

    try {
      await this.syncQueue.enqueue(op);
      this.showStatus('Cierre de carrera encolado correctamente. Se sincronizará al estar online.', true);
      this.selectedPrensaId = '';
      this.carreraNo = null;
      this.piezasBuenas = null;
      this.piezasMolino = null;
    } catch (err: any) {
      this.showStatus('Error al registrar carrera: ' + err.message, false);
    }
  }

  showStatus(msg: string, success: boolean) {
    this.message = msg;
    this.isSuccess = success;
    setTimeout(() => {
      this.message = '';
    }, 4000);
  }
}
