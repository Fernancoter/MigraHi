import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { timer } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduccionService, Prensa } from '../../../core/services/produccion';
import { SyncQueueService, PendingOp } from '../../../core/offline/sync-queue.service';
import { ApiConfigService } from '../../../core/services/api-config.service';

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
          <label for="prensa">Prensa:</label>
          <select id="prensa" [(ngModel)]="selectedPrensaId" class="form-control">
            <option value="" disabled>-- Seleccione --</option>
            <option *ngFor="let p of prensas" [value]="p.id">{{ p.nombre }} ({{ p.codigo }})</option>
          </select>
        </div>

        <div class="form-group">
          <label for="troquel">Troquel / Matriz:</label>
          <select id="troquel" [(ngModel)]="selectedTroquelId" class="form-control">
            <option value="" disabled>-- Seleccione --</option>
            <option *ngFor="let t of troqueles" [value]="t.id">{{ t.nombre }} ({{ t.id }})</option>
          </select>
        </div>

        <button class="btn btn-primary" (click)="asignarTroquel()" [disabled]="!selectedPrensaId || !selectedTroquelId">
          Confirmar e Instalar Troquel
        </button>

        <div *ngIf="message" class="status-msg" [class.success]="isSuccess" [class.error]="!isSuccess">
          {{ message }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .troquel-view { padding: 1rem; }
    .card { background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
    .card-hero { margin-bottom: 1.5rem; padding: 1rem; background: linear-gradient(135deg, #107C41 0%, #16a34a 100%); color: white; border-radius: 8px; }
    .card-hero h2 { margin: 0 0 0.5rem 0; font-size: 1.25rem; font-weight: 700; color: white; }
    .card-hero p { margin: 0; color: rgba(255,255,255,0.9); font-size: 0.875rem; }
    .form-card { padding: 1.5rem; }
    .form-group { margin-bottom: 1.25rem; }
    .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; font-size: 0.875rem; color: #334155; }
    .form-control { width: 100%; padding: 0.75rem; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 1rem; box-sizing: border-box; }
    .btn-primary { width: 100%; padding: 0.875rem; background: #107C41; color: white; border: none; border-radius: 8px; font-weight: 600; font-size: 1rem; cursor: pointer; }
    .btn-primary:disabled { background: #94a3b8; cursor: not-allowed; }
    .status-msg { margin-top: 1rem; padding: 0.75rem; border-radius: 8px; font-size: 0.875rem; animation: fadeIn 0.3s ease; }
    .status-msg.success { background: #dcfce7; color: #166534; }
    .status-msg.error { background: #fee2e2; color: #991b1b; }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class TroquelComponent implements OnInit {
  private prodService = inject(ProduccionService);
  private syncQueue = inject(SyncQueueService);
  private apiConfig = inject(ApiConfigService);
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
<<<<<<< Updated upstream
      endpoint: this.apiConfig.url('/api/v1/produccion/prensado/asignar-troquel'),
=======
      endpoint: `http://${window.location.hostname}:5007/api/v1/produccion/prensado/asignar-troquel`,
>>>>>>> Stashed changes
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
