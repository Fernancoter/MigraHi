import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { SyncQueueService } from '../../core/offline/sync-queue.service';

@Component({
  selector: 'app-captura-shell',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="captura-container">
      <header class="captura-header">
        <button class="back-btn" (click)="goBack()">
          <span class="icon">◀</span> Atrás
        </button>
        <h1 class="captura-title">HiCone Planta</h1>
        <div class="network-badge" [class.offline]="!isOnline">
          {{ isOnline ? 'Conectado' : 'Offline' }}
        </div>
      </header>
      
      <div *ngIf="pendingCount > 0" class="sync-banner" (click)="forceSync()">
        <span>Hay {{ pendingCount }} capturas pendientes de sincronización.</span>
        <button class="sync-btn" [disabled]="!isOnline || isSyncing">
          {{ isSyncing ? 'Sincronizando...' : 'Sincronizar' }}
        </button>
      </div>

      <main class="captura-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .captura-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      max-width: 600px;
      margin: 0 auto;
      background-color: #fafafa;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      position: relative;
    }

    .captura-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
      color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .back-btn {
      background: rgba(255,255,255,0.2);
      border: none;
      color: white;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .back-btn:hover {
      background: rgba(255,255,255,0.3);
    }

    .captura-title {
      font-size: 18px;
      font-weight: 600;
      margin: 0;
    }

    .network-badge {
      font-size: 12px;
      font-weight: 600;
      padding: 4px 8px;
      border-radius: 12px;
      background-color: #4caf50;
      color: white;
    }

    .network-badge.offline {
      background-color: #f44336;
    }

    .sync-banner {
      background-color: #ff9800;
      color: white;
      padding: 10px 16px;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      animation: slideDown 0.3s ease;
    }

    .sync-btn {
      background: white;
      color: #ff9800;
      border: none;
      padding: 4px 10px;
      border-radius: 4px;
      font-weight: 600;
      cursor: pointer;
    }

    .sync-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .captura-content {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
    }

    @keyframes slideDown {
      from { transform: translateY(-100%); }
      to { transform: translateY(0); }
    }
  `]
})
export class CapturaShellComponent implements OnInit, OnDestroy {
  private syncQueue = inject(SyncQueueService);
  private router = inject(Router);

  isOnline = navigator.onLine;
  pendingCount = 0;
  isSyncing = false;
  private intervalId: any;

  private onlineListener = () => { this.isOnline = true; this.forceSync(); };
  private offlineListener = () => { this.isOnline = false; };

  ngOnInit() {
    window.addEventListener('online', this.onlineListener);
    window.addEventListener('offline', this.offlineListener);

    this.updatePendingCount();
    this.intervalId = setInterval(() => this.updatePendingCount(), 3000);
  }

  ngOnDestroy() {
    window.removeEventListener('online', this.onlineListener);
    window.removeEventListener('offline', this.offlineListener);
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  async updatePendingCount() {
    this.pendingCount = await this.syncQueue.pendingCount();
  }

  goBack() {
    if (this.router.url === '/captura') {
      this.router.navigate(['/']);
    } else {
      window.history.back();
    }
  }

  async forceSync() {
    if (!this.isOnline || this.isSyncing) return;
    this.isSyncing = true;
    try {
      const result = await this.syncQueue.flush();
      console.log('Sincronización forzada:', result);
      await this.updatePendingCount();
    } catch (err) {
      console.error('Error en sync forzado:', err);
    } finally {
      this.isSyncing = false;
    }
  }
}
