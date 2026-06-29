import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { SyncQueueService } from '../../core/offline/sync-queue.service';
import { OfflineStoreService } from '../../core/offline/offline-store.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-captura-shell',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="captura-container">
      <header class="captura-header">
        <div class="header-left">
          <button *ngIf="showBackButton()" class="header-action-btn back-btn" (click)="goBack()" title="Atrás">
            <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        </div>
        
        <h1 class="captura-title">{{ getTitle() }}</h1>
        
        <div class="header-right">
          <div class="network-badge-mini" [class.offline]="!isOnline" [title]="isOnline ? 'Online' : 'Offline'">
            <span class="status-dot"></span>
          </div>
          
          <button class="header-action-btn notification-btn" (click)="toggleNotifications()" title="Estado de Sincronización">
            <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span *ngIf="pendingCount > 0" class="badge-count">{{ pendingCount }}</span>
          </button>
          
          <button class="header-action-btn logout-btn" (click)="logout()" title="Cerrar Sesión">
            <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </header>

      <!-- Panel de notificaciones flotante -->
      <div *ngIf="showNotificationsPanel" class="notifications-panel card-global">
        <div class="panel-header">
          <h3>Sincronización</h3>
          <button class="close-panel-btn" (click)="toggleNotifications()">✕</button>
        </div>
        <div class="panel-body">
          <div class="sync-status-row">
            <span>Conexión:</span>
            <span class="status-badge" [class.online]="isOnline" [class.offline]="!isOnline">
              {{ isOnline ? 'Online' : 'Offline' }}
            </span>
          </div>
          <div class="sync-status-row">
            <span>Pendientes de Enviar:</span>
            <span class="pending-count-val font-mono">{{ pendingCount }}</span>
          </div>
          <div class="panel-actions">
            <button class="sync-now-btn" [disabled]="!isOnline || isSyncing || pendingCount === 0" (click)="forceSync()">
              {{ isSyncing ? 'Sincronizando...' : 'Sincronizar Ahora' }}
            </button>
          </div>
        </div>
      </div>
      
      <div *ngIf="pendingCount > 0" class="sync-banner" [class.offline]="!isOnline" (click)="forceSync()">
        <span>{{ isSyncing ? 'Sincronizando datos...' : 'Hay ' + pendingCount + ' capturas pendientes de sincronización.' }}</span>
        <button class="sync-btn" [disabled]="!isOnline || isSyncing">
          {{ isSyncing ? 'Procesando...' : 'Sincronizar' }}
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
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      background-color: var(--bg-main);
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      position: relative;
      overflow: hidden;
    }

    .captura-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 24px;
      background-color: var(--bg-header);
      border-bottom: 1px solid var(--border-color);
      color: var(--text-main);
      z-index: 10;
      height: 70px;
    }

    .header-left {
      width: 48px;
      display: flex;
      justify-content: flex-start;
    }

    .header-right {
      width: auto;
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .header-action-btn {
      background: transparent;
      border: 1px solid transparent;
      color: var(--text-muted);
      padding: 8px;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition-smooth);
      position: relative;
    }

    .header-action-btn:hover {
      color: var(--primary);
      background-color: var(--bg-card);
      border-color: var(--border-color);
    }

    .header-icon {
      width: 24px;
      height: 24px;
    }

    .badge-count {
      position: absolute;
      top: -2px;
      right: -2px;
      background-color: var(--danger);
      color: white;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 9999px;
      border: 2px solid var(--bg-header);
    }

    .captura-title {
      font-size: 20px;
      font-weight: 600;
      margin: 0;
      letter-spacing: 0.5px;
      text-align: center;
      flex: 1;
    }

    .network-badge-mini {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .status-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: var(--success);
      box-shadow: 0 0 8px var(--success);
      display: inline-block;
      transition: var(--transition-smooth);
    }

    .network-badge-mini.offline .status-dot {
      background-color: var(--danger);
      box-shadow: 0 0 8px var(--danger);
    }

    /* Floating Notifications Panel */
    .notifications-panel {
      position: absolute;
      top: 80px;
      right: 24px;
      width: 320px;
      z-index: 20;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 16px;
      box-shadow: var(--shadow-lg);
      animation: slideDown 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 8px;
    }

    .panel-header h3 {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-main);
    }

    .close-panel-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      font-size: 16px;
      transition: var(--transition-smooth);
    }

    .close-panel-btn:hover {
      color: var(--text-main);
    }

    .panel-body {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .sync-status-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
    }

    .status-badge {
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      color: white;
    }

    .status-badge.online {
      background-color: rgba(16, 185, 129, 0.2);
      color: var(--success);
      border: 1px solid var(--success);
    }

    .status-badge.offline {
      background-color: rgba(239, 68, 68, 0.2);
      color: var(--danger);
      border: 1px solid var(--danger);
    }

    .pending-count-val {
      font-weight: 600;
      color: var(--primary);
    }

    .panel-actions {
      margin-top: 16px;
    }

    .sync-now-btn {
      width: 100%;
      background: var(--primary);
      color: var(--text-dark);
      border: none;
      padding: 10px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: var(--transition-smooth);
    }

    .sync-now-btn:hover:not(:disabled) {
      background: var(--primary-hover);
    }

    .sync-now-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .sync-banner {
      background-color: var(--warning);
      color: var(--text-dark);
      padding: 12px 24px;
      font-size: 14px;
      font-weight: 500;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      z-index: 5;
    }

    .sync-banner.offline {
      background-color: var(--border-color);
      color: var(--text-muted);
      cursor: default;
    }

    .sync-btn {
      background: var(--text-dark);
      color: var(--text-main);
      border: none;
      padding: 6px 12px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: var(--transition-smooth);
    }

    .sync-banner.offline .sync-btn {
      display: none;
    }

    .sync-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .captura-content {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
      background-color: var(--bg-main);
    }

    @keyframes slideDown {
      from { transform: translateY(-10px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    @media (max-width: 768px) {
      .captura-header {
        padding: 12px 16px;
      }
      .captura-content {
        padding: 16px;
      }
      .notifications-panel {
        right: 16px;
        width: calc(100% - 32px);
      }
    }
  `]
})
export class CapturaShellComponent implements OnInit, OnDestroy {
  private syncQueue = inject(SyncQueueService);
  private offlineStore = inject(OfflineStoreService);
  private router = inject(Router);
  private authService = inject(AuthService);

  isOnline = navigator.onLine;
  pendingCount = 0;
  isSyncing = false;
  showNotificationsPanel = false;
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

  showBackButton(): boolean {
    return this.router.url !== '/' && this.router.url !== '/captura';
  }

  getTitle(): string {
    const url = this.router.url;
    if (url.includes('/troquel')) return 'Asignar Troquel';
    if (url.includes('/carrera')) return 'Cerrar Carrera';
    if (url.includes('/escanear')) return 'Escanear Código';
    if (url.includes('/prensado')) return 'Prensado';
    if (url.includes('/reportes') || url.includes('/sync')) return 'Historial / Sync';
    return 'Inicio';
  }

  goBack() {
    if (this.router.url.includes('/prensado/')) {
      this.router.navigate(['/prensado']);
    } else if (this.router.url === '/troquel' || this.router.url === '/carrera') {
      // If we came from the prensado menu, let's go back to it
      this.router.navigate(['/prensado']);
    } else {
      this.router.navigate(['/']);
    }
  }

  toggleNotifications() {
    this.showNotificationsPanel = !this.showNotificationsPanel;
  }

  async logout() {
    await this.authService.logout();
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

