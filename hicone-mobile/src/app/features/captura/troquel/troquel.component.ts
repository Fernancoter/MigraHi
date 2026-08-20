import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { timer } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduccionService, Prensa } from '../../../core/services/produccion';
import { SyncQueueService, PendingOp } from '../../../core/offline/sync-queue.service';

@Component({
  selector: 'app-troquel-captura',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="troquel-view">
      <div class="card card-hero">
        <h2>Asignación de Troquel</h2>
        <p>Seleccione la prensa y el troquel a instalar.</p>
      </div>

      <div class="card form-card">
        <div class="form-group">
          <label for="prensa">Seleccionar Prensa:</label>
          <select id="prensa" [(ngModel)]="selectedPrensaId" class="form-control">
            <option value="" disabled>-- Seleccione --</option>
            <option *ngFor="let p of prensas" [value]="p.id">{{ p.nombre }} ({{ p.codigo }})</option>
          </select>
        </div>

        <div class="form-group">
          <label for="troquel">Seleccionar Troquel:</label>
          <select id="troquel" [(ngModel)]="selectedTroquelId" class="form-control">
            <option value="" disabled>-- Seleccione --</option>
            <option *ngFor="let t of troqueles" [value]="t.id">{{ t.nombre }}</option>
          </select>
        </div>

        <button class="action-btn" [disabled]="!selectedPrensaId || !selectedTroquelId" (click)="asignarTroquel()">
          🔧 Asignar Troquel a Prensa
        </button>
      </div>

      <div *ngIf="message" class="status-banner" [class.success]="isSuccess">
        {{ message }}
      </div>
    </div>
  `,
  styles: [`
    .troquel-view {
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
      background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
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
export class TroquelComponent implements OnInit {
  private prodService = inject(ProduccionService);
  private syncQueue = inject(SyncQueueService);
  private cdr = inject(ChangeDetectorRef);

  prensas: Prensa[] = [];
  troqueles = [
    { id: 'T1', nombre: 'Troquel Cono 6" Standard' },
    { id: 'T2', nombre: 'Troquel Cono 6" Reforzado' },
    { id: 'T3', nombre: 'Troquel Cono 4" Delgado' },
    { id: 'T4', nombre: 'Troquel Personalizado Especial' }
  ];

  selectedPrensaId = '';
  selectedTroquelId = '';
  message = '';
  isSuccess = false;

  ngOnInit() {
    this.prodService.getPrensas().subscribe({
      next: (data) => this.prensas = data,
      error: () => this.showStatus('Error al cargar catálogo de prensas', false)
    });
  }

  async asignarTroquel() {
    if (!this.selectedPrensaId || !this.selectedTroquelId) return;

    const op: PendingOp = {
      id: `troquel_${this.selectedPrensaId}_${Date.now()}`,
      endpoint: 'http://localhost:5007/api/v1/produccion/prensado/asignar-troquel',
      method: 'POST',
      body: {
        prensaId: this.selectedPrensaId,
        troquelId: this.selectedTroquelId,
        fechaAsignacion: new Date().toISOString()
      },
      createdAt: Date.now()
    };

    try {
      await this.syncQueue.enqueue(op);
      this.showStatus('Asignación de troquel encolada. Se guardará al estar online.', true);
      this.selectedPrensaId = '';
      this.selectedTroquelId = '';
    } catch (err: any) {
      this.showStatus('Error al encolar asignación: ' + err.message, false);
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
