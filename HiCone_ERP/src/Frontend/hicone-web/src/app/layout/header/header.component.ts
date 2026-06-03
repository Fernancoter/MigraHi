import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService, UserDto as User } from '../../core/services/auth.service';
import { Observable } from 'rxjs';
import { NavigationService } from '../../core/services/navigation.service';

interface ModuleItem {
  title: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="main-header legacy-theme shadow-2xl">
      <div class="header-left">
        <div class="brand-premium">
          <div class="logo-text">HI-<span class="highlight-white">CONE</span> <small class="erp-tag">ERP</small></div>
        </div>
        
        <button class="header-btn-modern" (click)="toggleSidebar()">
          <span>☰</span>
        </button>
        
        <!-- Icono de Rejilla con Megamenú -->
        <div class="module-selector-container" 
             (mouseenter)="onMouseEnter()" 
             (mouseleave)="onMouseLeave()">
          <button class="grid-btn-premium" [class.active]="showGrid" (click)="toggleGrid()">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M4,4H10V10H4V4M4,14H10V20H4V14M14,4H20V10H14V4M14,14H20V20H14V14Z" />
            </svg>
          </button>

          <!-- Megamenú High-End -->
          <div class="module-megamenu-modern animate-fade-in" *ngIf="showGrid">
            <div class="megamenu-header">Selecciona un Módulo de Operación</div>
            <div class="megamenu-grid-modern">
              <a *ngFor="let m of modules" 
                 [routerLink]="m.route" 
                 class="module-tile-premium"
                 (click)="selectModule(m)">
                <div class="tile-icon-box">{{ m.icon }}</div>
                <span class="tile-label-modern">{{ m.title }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div class="header-right-premium">
        <div class="date-capsule">
          <span class="date-text">{{ today | date:'EEEE, d MMMM y' : '' : 'es-MX' | titlecase }}</span>
        </div>
        
        <div class="action-icons">
          <button class="icon-btn-modern">🔔<span class="badge-dot"></span></button>
        </div>
        
        <div class="dropdown-container">
          <div class="user-pill" (click)="toggleUserMenu($event)">
            <div class="user-info" *ngIf="currentUser$ | async as user">
              <span class="user-name">{{ user.fullName || '' }}</span>
              <span class="user-role">{{ user.roles[0] || 'Usuario' }}</span>
            </div>
            <div class="user-avatar" *ngIf="currentUser$ | async as user">
              {{ getInitials(user.fullName || '') }}
            </div>
          </div>

          <!-- Menú Desplegable Premium de Usuario -->
          <div class="user-dropdown-menu shadow-premium animate-fade-in" *ngIf="showUserMenu" (click)="$event.stopPropagation()">
            <div class="dropdown-header-user" *ngIf="currentUser$ | async as user">
              <strong>{{ user.fullName }}</strong>
              <span class="dropdown-email">{{ user.email }}</span>
            </div>
            <div class="dropdown-divider-user"></div>
            <button class="dropdown-item-user" (click)="navigateToConfig()">
              ⚙️ Ajustes del Sistema
            </button>
            <button class="dropdown-item-user logout-btn-item" (click)="onLogout()">
              🚪 Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .main-header {
      height: 64px;
      padding: 0 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: linear-gradient(135deg, #064e3b 0%, #166534 50%, #064e3b 100%);
      color: white;
      z-index: 1000;
      box-shadow: 0 4px 30px rgba(0,0,0,0.3);
    }

    .brand-premium .logo-text { font-size: 1.25rem; font-weight: 900; letter-spacing: 1px; }
    .highlight-white { color: #22c55e; }
    .erp-tag { font-size: 0.6rem; vertical-align: top; background: white; color: #166534; padding: 1px 4px; border-radius: 4px; margin-left: 4px; }

    .header-left { display: flex; align-items: center; gap: 1.5rem; }
    .header-btn-modern, .grid-btn-premium {
      background: rgba(255,255,255,0.1); border: none; color: white; width: 40px; height: 40px;
      border-radius: 10px; display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: all 0.2s;
    }
    .grid-btn-premium.active { background: #22c55e; color: white; box-shadow: 0 0 15px rgba(34, 197, 94, 0.4); }

    .module-selector-container { position: relative; height: 64px; display: flex; align-items: center; }
    .module-megamenu-modern {
      position: absolute; top: 64px; left: 0; background: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1);
      box-shadow: 0 20px 50px rgba(0,0,0,0.5); border-radius: 0 0 16px 16px;
      padding: 2rem; width: 620px; z-index: 1001;
    }
    .megamenu-header { color: #94a3b8; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; margin-bottom: 1.5rem; letter-spacing: 1px; }
    .megamenu-grid-modern { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; }

    .module-tile-premium {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      background: rgba(255,255,255,0.03); aspect-ratio: 1 / 1; border-radius: 12px;
      text-decoration: none; color: white; transition: all 0.2s; border: 1px solid rgba(255,255,255,0.05);
    }
    .module-tile-premium:hover { background: #166534; transform: translateY(-4px); box-shadow: 0 10px 20px rgba(0,0,0,0.3); }
    .tile-icon-box { font-size: 1.75rem; margin-bottom: 0.5rem; }
    .tile-label-modern { font-size: 0.7rem; font-weight: 600; text-align: center; color: #cbd5e1; }

    .header-right-premium { display: flex; align-items: center; gap: 2rem; }
    .date-capsule { background: rgba(0,0,0,0.2); padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.8rem; border: 1px solid rgba(255,255,255,0.1); }
    
    .icon-btn-modern { background: transparent; border: none; color: white; cursor: pointer; font-size: 1.2rem; position: relative; }
    .badge-dot { position: absolute; top: -2px; right: -2px; width: 8px; height: 8px; background: #ef4444; border-radius: 50%; border: 2px solid #166534; }

    .user-pill {
      display: flex; align-items: center; gap: 0.75rem; background: rgba(255,255,255,0.1);
      padding: 0.4rem 0.6rem 0.4rem 1rem; border-radius: 50px; cursor: pointer;
      transition: all 0.2s; border: 1px solid rgba(255,255,255,0.05);
    }
    .user-pill:hover { background: rgba(255,255,255,0.2); }
    .user-info { display: flex; flex-direction: column; align-items: flex-end; }
    .user-name { font-size: 0.85rem; font-weight: 700; }
    .user-role { font-size: 0.65rem; opacity: 0.6; }
    .user-avatar { width: 32px; height: 32px; background: #22c55e; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.75rem; color: #064e3b; }

    /* Estilos del Desplegable de Usuario */
    .dropdown-container { position: relative; display: inline-block; }
    .user-dropdown-menu {
      position: absolute; top: 115%; right: 0; background: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4); border-radius: 12px;
      padding: 0.5rem 0; width: 220px; z-index: 1002;
    }
    .dropdown-header-user { padding: 0.75rem 1.2rem; display: flex; flex-direction: column; }
    .dropdown-header-user strong { color: white; font-size: 0.85rem; font-weight: 700; }
    .dropdown-email { color: #94a3b8; font-size: 0.75rem; margin-top: 0.15rem; word-break: break-all; }
    .dropdown-divider-user { height: 1px; background: rgba(255, 255, 255, 0.1); margin: 0.4rem 0; }
    
    .dropdown-item-user {
      display: flex; align-items: center; width: 100%; padding: 0.7rem 1.2rem;
      background: transparent; border: none; color: #cbd5e1; font-size: 0.825rem;
      font-weight: 600; text-align: left; cursor: pointer; transition: all 0.2s;
    }
    .dropdown-item-user:hover { background: rgba(255, 255, 255, 0.08); color: white; }
    .logout-btn-item { color: #f87171; }
    .logout-btn-item:hover { background: rgba(239, 68, 68, 0.15) !important; color: #fca5a5 !important; }

    @keyframes animate-fade-in { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class HeaderComponent {
  today = new Date();
  showGrid = false;
  showUserMenu = false;
  currentUser$: Observable<User | null>;
  private closeTimer: any;

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  }

  modules: ModuleItem[] = [
    { title: 'Inventario', icon: '🏭', route: '/dashboard' },
    { title: 'Extrusión', icon: '🏗️', route: '/produccion/extrusion/inicio' },
    { title: 'Prensado', icon: '⚙️', route: '/produccion' },
    { title: 'Embarques', icon: '🚚', route: '/embarques' },
    { title: 'Calidad', icon: '✅', route: '/calidad' },
    { title: 'Seguridad', icon: '🛡️', route: '/seguridad' },
    { title: 'Configurar Producción', icon: '🎛️', route: '/configuracion' },
    { title: 'Reportes SAE', icon: '📊', route: '/reportes-sae' },
    { title: 'Catálogos SAE', icon: '📂', route: '/catalogos-sae' },
    { title: 'Informes Operativos', icon: '📄', route: '/informes' }
  ];

  constructor(private authService: AuthService, private router: Router, private navService: NavigationService) { 
    this.currentUser$ = this.authService.currentUser$;
  }

  onLogout() {
    this.showUserMenu = false;
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleUserMenu(event: Event) {
    event.stopPropagation();
    this.showUserMenu = !this.showUserMenu;
  }

  navigateToConfig() {
    this.showUserMenu = false;
    this.router.navigate(['/configuracion']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-container')) {
      this.showUserMenu = false;
    }
  }

  toggleSidebar() {
    this.navService.toggleSidebar();
  }

  onMouseEnter() {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
    }
    this.showGrid = true;
  }

  onMouseLeave() {
    // Si ya hay un timer, lo limpiamos para no acumular cierres
    if (this.closeTimer) clearTimeout(this.closeTimer);
    
    this.closeTimer = setTimeout(() => {
      this.showGrid = false;
      this.closeTimer = null;
    }, 1000); // Reducido a 1 segundo como solicitaste
  }

  toggleGrid() {
    this.showGrid = !this.showGrid;
    if (this.showGrid && this.closeTimer) {
      clearTimeout(this.closeTimer);
    }
  }

  selectModule(module: ModuleItem) {
    this.showGrid = false;
    
    // Mapeo detallado de títulos a tipos de módulo específicos para poblar el sidebar dinámicamente
    if (module.title === 'Inventario') {
      this.navService.setActiveModule('INVENTARIO');
    } else if (module.title === 'Extrusión') {
      this.navService.setActiveModule('EXTRUSIÓN');
    } else if (module.title === 'Prensado') {
      this.navService.setActiveModule('PRENSADO');
    } else if (module.title === 'Embarques') {
      this.navService.setActiveModule('EMBARQUES');
    } else if (module.title === 'Calidad') {
      this.navService.setActiveModule('CALIDAD');
    } else if (module.title === 'Seguridad') {
      this.navService.setActiveModule('SEGURIDAD');
    } else if (module.title === 'Configurar Producción') {
      this.navService.setActiveModule('CONFIGURACIÓN');
    } else if (module.title === 'Reportes SAE') {
      this.navService.setActiveModule('REPORTES_SAE');
    } else if (module.title === 'Catálogos SAE') {
      this.navService.setActiveModule('CATÁLOGOS_SAE');
    } else {
      this.navService.setActiveModule('SISTEMA');
    }
  }
}
