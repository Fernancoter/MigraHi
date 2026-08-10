import { Component, OnInit, OnDestroy, HostListener, inject, signal, ChangeDetectorRef } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { SyncQueueService } from '../../core/offline/sync-queue.service';
import { OfflineStoreService } from '../../core/offline/offline-store.service';
import { AuthService } from '../../core/services/auth.service';
import { ProduccionService, Extrusora, Turno } from '../../core/services/produccion';
import { ExtrusionStateService } from '../../core/services/extrusion-state.service';

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
          <!-- Botones contextuales para Prensado y Extrusión -->
          <ng-container *ngIf="router.url === '/prensado' || router.url === '/extrusion'">
            <!-- Botón del Relojito (Turnos) -->
            <button class="header-action-btn clock-btn" (click)="toggleShiftsMenu()" title="Turnos"
                    [class.active-btn]="extrusionState.turnoActivo() !== null && router.url === '/extrusion'">
              <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span *ngIf="extrusionState.turnoActivo() && router.url === '/extrusion'"
                    class="selection-indicator">{{ extrusionState.turnoActivo()!.nombre | slice:0:3 }}</span>
            </button>

            <!-- Botón Sandwich (Solo Prensado) -->
            <button *ngIf="router.url === '/prensado'" class="header-action-btn layers-btn" (click)="togglePrensasMenu()" title="Prensas">
              <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </button>

            <!-- Botón Engrane (Solo Extrusión) -->
            <button *ngIf="router.url === '/extrusion'" class="header-action-btn layers-btn" (click)="toggleExtrusorasMenu()" title="Extrusoras"
                    [class.active-btn]="extrusionState.extrusoraActiva() !== null">
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

      <!-- Overlay para cerrar dropdowns -->
      <div *ngIf="showShiftsMenu || showPrensasMenu || showExtrusorasMenu" class="dropdown-overlay" (click)="closeDropdowns()"></div>

      <!-- Dropdown de Turnos -->
      <div *ngIf="showShiftsMenu" class="header-dropdown shifts-dropdown">
        <div *ngIf="loadingTurnos" class="dropdown-loading">Cargando...</div>
        <button class="dropdown-item" *ngFor="let t of turnos" (click)="selectTurno(t)"
                [class.selected]="extrusionState.turnoActivo()?.id === t.id">
          {{ t.nombre }}
        </button>
      </div>

      <!-- Dropdown de Prensas -->
      <div *ngIf="showPrensasMenu" class="header-dropdown prensas-dropdown">
        <button class="dropdown-item" *ngFor="let p of prensas" (click)="selectPrensa(p)">
          {{ p }}
        </button>
      </div>

      <!-- Dropdown de Extrusoras (carga desde API) -->
      <div *ngIf="showExtrusorasMenu" class="header-dropdown prensas-dropdown">
        <div *ngIf="loadingExtrusoras" class="dropdown-loading">Cargando...</div>
        <button class="dropdown-item" *ngFor="let e of extrusorasApi" (click)="selectExtrusora(e)"
                [class.selected]="extrusionState.extrusoraActiva()?.id === e.id">
          <span class="ext-nombre">{{ e.nombre }}</span>
          <span class="ext-codigo">{{ e.codigo }}</span>
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
      gap: 4px;
      transition: var(--transition-smooth);
      position: relative;
      flex-direction: column;
    }

    .header-action-btn:hover {
      color: var(--primary);
      background-color: var(--bg-card);
      border-color: var(--border-color);
    }

    .header-action-btn.active-btn {
      color: var(--primary);
      border-color: var(--primary);
      background-color: rgba(56, 189, 248, 0.08);
    }

    .selection-indicator {
      font-size: 9px;
      font-weight: 700;
      color: var(--primary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      line-height: 1;
    }

    .header-icon {
      width: 24px;
      height: 24px;
    }

    /* Dropdowns */
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
      background-color: #1a1a2e;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5);
      z-index: 100;
      display: flex;
      flex-direction: column;
      min-width: 180px;
      padding: 6px 0;
      animation: fadeInDropdown 0.15s ease-out;
    }

    .shifts-dropdown {
      right: 124px;
    }

    .prensas-dropdown {
      right: 76px;
    }

    .dropdown-loading {
      padding: 12px 16px;
      font-size: 13px;
      color: var(--text-muted);
      text-align: center;
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
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .dropdown-item:hover {
      background-color: rgba(56, 189, 248, 0.1);
      color: var(--primary);
    }

    .dropdown-item.selected {
      background-color: rgba(56, 189, 248, 0.12);
      color: var(--primary);
    }

    .ext-nombre {
      font-size: 14px;
      font-weight: 600;
    }

    .ext-codigo {
      font-size: 11px;
      color: var(--text-muted);
    }

    .dropdown-item.selected .ext-codigo {
      color: rgba(56, 189, 248, 0.7);
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

    /* Panel Notificaciones */
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

    .close-panel-btn:hover { color: var(--text-main); }

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

    .panel-actions { margin-top: 16px; }

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

    .sync-now-btn:hover:not(:disabled) { background: var(--primary-hover); }
    .sync-now-btn:disabled { opacity: 0.5; cursor: not-allowed; }

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

    .sync-banner.offline .sync-btn { display: none; }
    .sync-btn:disabled { opacity: 0.7; cursor: not-allowed; }

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
      .captura-header { padding: 12px 16px; }
      .captura-content { padding: 16px; }
      .notifications-panel { right: 16px; width: calc(100% - 32px); }
    }
  `]
})
export class CapturaShellComponent implements OnInit, OnDestroy {
  private syncQueue = inject(SyncQueueService);
  private offlineStore = inject(OfflineStoreService);
  public router = inject(Router);
  private authService = inject(AuthService);
  private produccionService = inject(ProduccionService);
  public extrusionState = inject(ExtrusionStateService);
  private cdr = inject(ChangeDetectorRef);

  isOnline = navigator.onLine;
  pendingCount = 0;
  isSyncing = false;
  showNotificationsPanel = false;

  showShiftsMenu = false;
  showPrensasMenu = false;
  showExtrusorasMenu = false;

  // Datos desde API
  turnos: Turno[] = [];
  extrusorasApi: Extrusora[] = [];
  loadingTurnos = false;
  loadingExtrusoras = false;

  // Prensas (todavía hardcoded)
  prensas = ['Prensa #1', 'Prensa #2', 'Prensa #3', 'Prensa #4'];

  private syncSub?: Subscription;

  @HostListener('window:online')
  onOnline() {
    this.isOnline = true;
    this.forceSync();
  }

  @HostListener('window:offline')
  onOffline() {
    this.isOnline = false;
  }

  ngOnInit() {
    this.updatePendingCount();
    this.syncSub = interval(3000).subscribe(() => {
      this.updatePendingCount();
    });
    // Resetear selección de extrusión al entrar
    this.extrusionState.reset();
  }

  ngOnDestroy() {
    if (this.syncSub) {
      this.syncSub.unsubscribe();
    }
  }

  toggleShiftsMenu() {
    this.showShiftsMenu = !this.showShiftsMenu;
    this.showPrensasMenu = false;
    this.showExtrusorasMenu = false;
    this.cdr.detectChanges();
    if (this.showShiftsMenu && this.turnos.length === 0) {
      this.cargarTurnos();
    }
  }

  togglePrensasMenu() {
    this.showPrensasMenu = !this.showPrensasMenu;
    this.showShiftsMenu = false;
    this.showExtrusorasMenu = false;
    this.cdr.detectChanges();
  }

  toggleExtrusorasMenu() {
    this.showExtrusorasMenu = !this.showExtrusorasMenu;
    this.showShiftsMenu = false;
    this.showPrensasMenu = false;
    this.cdr.detectChanges();
    if (this.showExtrusorasMenu && this.extrusorasApi.length === 0) {
      this.cargarExtrusorasApi();
    }
  }

  closeDropdowns() {
    this.showShiftsMenu = false;
    this.showPrensasMenu = false;
    this.showExtrusorasMenu = false;
    this.cdr.detectChanges();
  }

  cargarTurnos() {
    this.loadingTurnos = true;
    this.cdr.detectChanges();
    this.produccionService.getTurnos().subscribe({
      next: (data) => {
        this.turnos = data;
        this.loadingTurnos = false;
        this.cdr.detectChanges();
      },
      error: () => { 
        this.loadingTurnos = false; 
        this.cdr.detectChanges(); 
      }
    });
  }

  cargarExtrusorasApi() {
    this.loadingExtrusoras = true;
    this.cdr.detectChanges();
    this.produccionService.getExtrusoras().subscribe({
      next: (data) => {
        this.extrusorasApi = data;
        this.loadingExtrusoras = false;
        this.cdr.detectChanges();
      },
      error: () => { 
        this.loadingExtrusoras = false; 
        this.cdr.detectChanges(); 
      }
    });
  }

  selectTurno(turno: Turno) {
    this.extrusionState.setTurno({ id: turno.id, nombre: turno.nombre });
    this.offlineStore.set('active_shift', turno.nombre);
    this.closeDropdowns();
    this.cdr.detectChanges();
  }

  selectPrensa(prensa: string) {
    this.offlineStore.set('active_press', prensa);
    this.closeDropdowns();
    this.cdr.detectChanges();
  }

  selectExtrusora(ext: Extrusora) {
    this.extrusionState.setExtrusora(ext);
    this.offlineStore.set('active_extrusora_id', ext.id);
    this.closeDropdowns();
    this.cdr.detectChanges();
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
    if (url.includes('/etiquetado-pallets')) return 'Etiquetado Pallet';
    if (url.includes('/reportes')) return 'Reportes';
    if (url.includes('/sync')) return 'Historial / Sync';


    return 'Inicio';
  }

  goBack() {
    if (this.router.url.includes('/prensado/')) {
      this.router.navigate(['/prensado']);
    } else if (this.router.url === '/troquel' || this.router.url === '/carrera') {
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
