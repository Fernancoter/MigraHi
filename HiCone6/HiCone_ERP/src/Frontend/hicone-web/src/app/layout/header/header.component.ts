import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
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
             (mouseenter)="showGrid = true" 
             (mouseleave)="showGrid = false">
          <button class="grid-btn-premium" [class.active]="showGrid">
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
                 (click)="showGrid = false">
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
        
        <div class="user-pill" (click)="onLogout()" [title]="'Cerrar sesión'">
          <div class="user-info">
            <span class="user-name">{{ userFullName() }}</span>
            <span class="user-role">{{ userRole() }}</span>
          </div>
          <div class="user-avatar">{{ userInitials() }}</div>
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

    @keyframes animate-fade-in { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class HeaderComponent {
  today = new Date();
  showGrid = false;

  modules: ModuleItem[] = [
    { title: 'Silos', icon: '🏺', route: '/inventario/silos' },
    { title: 'Lotes', icon: '📦', route: '/produccion' },
    { title: 'Extrusión', icon: '🏗️', route: '/produccion' },
    { title: 'Prensado', icon: '⚙️', route: '/produccion' },
    { title: 'Embarques', icon: '🚚', route: '/embarques' },
    { title: 'Calidad', icon: '✅', route: '/calidad' },
    { title: 'Seguridad', icon: '🛡️', route: '/seguridad' },
    { title: 'Cierre Mes', icon: '📆', route: '/reportes-sae' },
    { title: 'Reportes SAE', icon: '📊', route: '/reportes-sae' },
    { title: 'Catálogos SAE', icon: '📂', route: '/catalogos-sae' }
  ];

  readonly userFullName = computed(() => {
    const u = this.authService.currentUser();
    if (!u) return 'Invitado';
    const full = `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim();
    return full || u.email || 'Usuario';
  });

  readonly userRole = computed(() => {
    const u = this.authService.currentUser();
    return u?.operadorId ? `Operador ${u.operadorId}` : 'Usuario';
  });

  readonly userInitials = computed(() => {
    const u = this.authService.currentUser();
    if (!u) return '··';
    const a = (u.firstName?.[0] ?? '').toUpperCase();
    const b = (u.lastName?.[0] ?? '').toUpperCase();
    const initials = `${a}${b}`;
    return initials || (u.email?.[0]?.toUpperCase() ?? '?');
  });

  constructor(private authService: AuthService, private router: Router, private navService: NavigationService) {}

  onLogout() {
    this.authService.logout();
  }

  toggleSidebar() {
    this.navService.toggleSidebar();
  }
}
