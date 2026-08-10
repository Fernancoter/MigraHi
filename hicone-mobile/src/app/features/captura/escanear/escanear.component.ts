import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { timer } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ScannerService } from '../../../core/hardware/scanner.service';
import { SyncQueueService, PendingOp } from '../../../core/offline/sync-queue.service';

@Component({
  selector: 'app-escanear-captura',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="escanear-view">
      <div class="card card-hero">
        <h2>Captura por Escáner</h2>
        <p>Seleccione el tipo de elemento a capturar y apunte al código de barras o QR.</p>
      </div>

      <div class="action-grid">
        <button class="action-btn bobina" (click)="iniciarEscaneo('bobina')">
          <span class="icon">🌀</span>
          <span class="label">Escanear Bobina</span>
        </button>

        <button class="action-btn carrete" (click)="iniciarEscaneo('carrete')">
          <span class="icon">🧵</span>
          <span class="label">Escanear Carrete</span>
        </button>

        <button class="action-btn pallet" (click)="iniciarEscaneo('pallet')">
          <span class="icon">📦</span>
          <span class="label">Escanear Pallet</span>
        </button>
      </div>

      <div *ngIf="lastScan" class="scan-result-card card">
        <h3>Resultado de Lectura</h3>
        <div class="detail-row">
          <span class="detail-label">Tipo:</span>
          <span class="detail-val uppercase font-bold">{{ lastScan.type }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Código:</span>
          <span class="detail-val font-mono font-bold">{{ lastScan.code }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Formato:</span>
          <span class="detail-val font-mono text-sm text-gray-500">{{ lastScan.format }}</span>
        </div>

        <div class="action-row">
          <button class="confirm-btn" (click)="confirmarGuardado()">✓ Confirmar y Registrar</button>
          <button class="cancel-btn" (click)="lastScan = null">✕ Descartar</button>
        </div>
      </div>

      <div *ngIf="message" class="status-banner" [class.success]="isSuccess">
        {{ message }}
      </div>
    </div>
  `,
  styles: [`
    .escanear-view {
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
      background: linear-gradient(135deg, #2b5876 0%, #4e4376 100%);
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

    .action-grid {
      display: grid;
      grid-template-rows: repeat(3, auto);
      gap: 12px;
    }

    .action-btn {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 18px 24px;
      border: none;
      border-radius: 8px;
      color: white;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 4px 6px rgba(0,0,0,0.07);
    }

    .action-btn:active {
      transform: scale(0.98);
    }

    .action-btn .icon {
      font-size: 24px;
    }

    .action-btn.bobina {
      background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
    }

    .action-btn.carrete {
      background: linear-gradient(135deg, #f857a6 0%, #ff5858 100%);
    }

    .action-btn.pallet {
      background: linear-gradient(135deg, #4776e6 0%, #8e54e9 100%);
    }

    .scan-result-card {
      border: 2px solid #ddd;
      animation: fadeIn 0.3s ease;
    }

    .scan-result-card h3 {
      margin: 0 0 12px 0;
      font-size: 16px;
      border-bottom: 1px solid #eee;
      padding-bottom: 8px;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .detail-label {
      color: #666;
    }

    .detail-val {
      color: #111;
    }

    .uppercase { text-transform: uppercase; }
    .font-mono { font-family: monospace; }
    .font-bold { font-weight: 600; }

    .action-row {
      display: flex;
      gap: 8px;
      margin-top: 16px;
    }

    .confirm-btn {
      flex: 1;
      background-color: #4caf50;
      border: none;
      color: white;
      padding: 12px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
    }

    .cancel-btn {
      background-color: #f44336;
      border: none;
      color: white;
      padding: 12px 18px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
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
export class EscanearComponent {
  private scanner = inject(ScannerService);
  private syncQueue = inject(SyncQueueService);
  private cdr = inject(ChangeDetectorRef);

  lastScan: { type: 'bobina' | 'carrete' | 'pallet'; code: string; format: string } | null = null;
  message = '';
  isSuccess = false;

  async iniciarEscaneo(type: 'bobina' | 'carrete' | 'pallet') {
    this.message = '';
    try {
      const result = await this.scanner.scan();
      this.lastScan = {
        type,
        code: result.value,
        format: result.format
      };
    } catch (err: any) {
      this.showStatus(err.message || 'Error al escanear', false);
    }
  }

  async confirmarGuardado() {
    if (!this.lastScan) return;

    let endpoint = 'http://localhost:5007/api/v1/produccion/captura/registrar';
    let body: any = {};

    if (this.lastScan.type === 'bobina') {
      endpoint = 'http://localhost:5007/api/v1/produccion/extrusion/guardar-bobina';
      body = {
        noSerie: this.lastScan.code,
        fechaProduccion: new Date().toISOString(),
        kg: 25,
        espesor: 1.2
      };
    } else if (this.lastScan.type === 'carrete') {
      endpoint = 'http://localhost:5007/api/v1/produccion/carrete/registrar';
      body = {
        noSerie: this.lastScan.code,
        estado: 'Validado'
      };
    } else {
      endpoint = 'http://localhost:5007/api/v1/produccion/pallet/registrar';
      body = {
        noSerie: this.lastScan.code,
        estado: 'Terminado'
      };
    }

    const op: PendingOp = {
      id: `${this.lastScan.type}_${Date.now()}`,
      endpoint,
      method: 'POST',
      body,
      createdAt: Date.now()
    };

    try {
      await this.syncQueue.enqueue(op);
      this.showStatus('Lectura encolada correctamente. Se procesará al estar online.', true);
      this.lastScan = null;
    } catch (err: any) {
      this.showStatus('Error al encolar operación: ' + err.message, false);
    }
  }

  showStatus(msg: string, success: boolean) {
    this.message = msg;
    this.isSuccess = success;
    this.cdr.markForCheck();
    timer(4000).subscribe(() => {
      this.message = '';
      this.cdr.markForCheck();
    });
  }
}
