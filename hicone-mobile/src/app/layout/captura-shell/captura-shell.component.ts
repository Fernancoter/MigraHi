import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
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
          <!-- Reloj y botones contextuales -->
          <ng-container *ngIf="router.url === '/prensado' || router.url === '/extrusion'">
            <!-- Botón del Relojito (Común para Prensado y Extrusión) -->
            <button class="header-action-btn clock-btn" (click)="toggleShiftsMenu()" title="Turnos">
              <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

            <!-- Botón del Sandwich (Solo Prensado) -->
            <button *ngIf="router.url === '/prensado'" class="header-action-btn layers-btn" (click)="togglePrensasMenu()" title="Prensas">
              <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </button>

            <!-- Botón de Engrane (Solo Extrusión) -->
            <button *ngIf="router.url === '/extrusion'" class="header-action-btn layers-btn" (click)="toggleExtrusorasMenu()" title="Extrusoras">
              <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </button>
          </ng-container>

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

      <!-- Overlay invisible para cerrar dropdowns -->
      <div *ngIf="showShiftsMenu || showPrensasMenu || showExtrusorasMenu" class="dropdown-overlay" (click)="closeDropdowns()"></div>

      <!-- Dropdown de Turnos -->
      <div *ngIf="showShiftsMenu" class="header-dropdown shifts-dropdown">
        <button class="dropdown-item" *ngFor="let t of turnos" (click)="selectTurno(t)">
          {{ t }}
        </button>
      </div>

      <!-- Dropdown de Prensas -->
      <div *ngIf="showPrensasMenu" class="header-dropdown prensas-dropdown">
        <button class="dropdown-item" *ngFor="let p of prensas" (click)="selectPrensa(p)">
          {{ p }}
        </button>
      </div>

      <!-- Dropdown de Extrusoras -->
      <div *ngIf="showExtrusorasMenu" class="header-dropdown prensas-dropdown">
        <button class="dropdown-item" *ngFor="let e of extrusoras" (click)="selectExtrusora(e)">
          {{ e }}
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

    /* Dropdowns de cabecera */
    .dropdown-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 99;
      background: transparent;
    }

    .header-dropdown {
      position: absolute;
      top: 65px;
      background-color: #212121;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.45);
      z-index: 100;
      display: flex;
      flex-direction: column;
      min-width: 140px;
      padding: 4px 0;
      animation: fadeInDropdown 0.15s ease-out;
    }

    .shifts-dropdown {
      right: 124px;
    }

    .prensas-dropdown {
      right: 76px;
    }

    .dropdown-item {
      background: transparent;
      border: none;
      color: var(--text-main);
      padding: 10px 16px;
      text-align: left;
      font-size: 14px;
      width: 100%;
      cursor: pointer;
      transition: var(--transition-smooth);
    }

    .dropdown-item:hover {
      background-color: rgba(56, 189, 248, 0.15);
      color: var(--primary);
    }

    @keyframes fadeInDropdown {
      from { opacity: 0; transform: translateY(-5px); }
      to { opacity: 1; transform: translateY(0); }
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
  public router = inject(Router);
  private authService = inject(AuthService);

  isOnline = navigator.onLine;
  pendingCount = 0;
  isSyncing = false;
  showNotificationsPanel = false;

  showShiftsMenu = false;
  showPrensasMenu = false;
  showExtrusorasMenu = false;

  turnos = ['Matutino', 'Vespertino', 'Nocturno'];
  prensas = ['Prensa #1', 'Prensa #2', 'Prensa #3', 'Prensa #4'];
  extrusoras = ['Ext #1', 'Ext #2', 'Ext #3'];

  selectedTurno = signal('Matutino');
  selectedPrensa = signal('Prensa #1');
  selectedExtrusora = signal('Ext #1');

  private intervalId: any;

  private onlineListener = () => { this.isOnline = true; this.forceSync(); };
  private offlineListener = () => { this.isOnline = false; };

  ngOnInit() {
    window.addEventListener('online', this.onlineListener);
    window.addEventListener('offline', this.offlineListener);

    this.updatePendingCount();
    this.intervalId = setInterval(() => this.updatePendingCount(), 3000);
    this.loadSelectedParameters();
  }

  ngOnDestroy() {
    window.removeEventListener('online', this.onlineListener);
    window.removeEventListener('offline', this.offlineListener);
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  async loadSelectedParameters() {
    const cachedTurno = await this.offlineStore.get<string>('active_shift');
    if (cachedTurno) {
      this.selectedTurno.set(cachedTurno);
    }
    const cachedPrensa = await this.offlineStore.get<string>('active_press');
    if (cachedPrensa) {
      this.selectedPrensa.set(cachedPrensa);
    }
    const cachedExt = await this.offlineStore.get<string>('active_ext');
    if (cachedExt) {
      this.selectedExtrusora.set(cachedExt);
    }
  }

  toggleShiftsMenu() {
    this.showShiftsMenu = !this.showShiftsMenu;
    this.showPrensasMenu = false;
    this.showExtrusorasMenu = false;
  }

  togglePrensasMenu() {
    this.showPrensasMenu = !this.showPrensasMenu;
    this.showShiftsMenu = false;
    this.showExtrusorasMenu = false;
  }

  toggleExtrusorasMenu() {
    this.showExtrusorasMenu = !this.showExtrusorasMenu;
    this.showShiftsMenu = false;
    this.showPrensasMenu = false;
  }

  closeDropdowns() {
    this.showShiftsMenu = false;
    this.showPrensasMenu = false;
    this.showExtrusorasMenu = false;
  }

  async selectTurno(turno: string) {
    this.selectedTurno.set(turno);
    await this.offlineStore.set('active_shift', turno);
    this.closeDropdowns();
  }

  async selectPrensa(prensa: string) {
    this.selectedPrensa.set(prensa);
    await this.offlineStore.set('active_press', prensa);
    this.closeDropdowns();
  }

  async selectExtrusora(ext: string) {
    this.selectedExtrusora.set(ext);
    await this.offlineStore.set('active_ext', ext);
    this.closeDropdowns();
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
    if (url.includes('/prensado')) return 'Prensados';
    if (url.includes('/extrusion')) return 'Extrusiones';
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

