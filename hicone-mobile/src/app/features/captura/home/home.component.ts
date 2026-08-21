import { Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ProduccionService } from '../../../core/services/produccion';
import { OfflineStoreService } from '../../../core/offline/offline-store.service';
import { AuthService } from '../../../core/services/auth.service';
import { ExtrusionStateService } from '../../../core/services/extrusion-state.service';

interface ModuleItem {
  id: string;
  title: string;
  description: string;
  route?: string;
  action?: () => void;
  iconClass: string;
  svg: string;
  allowedRoles: string[];
}

@Component({
  selector: 'app-captura-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="captura-home">
      <!-- Tarjeta del Operador con Muesca -->
      <div class="operator-card">
        <div class="operator-notch">{{ operatorRole() }}</div>
        <div class="operator-avatar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div class="operator-info">
          <h2>{{ operatorName() }}</h2>
          <p>Turno {{ shiftName }} • {{ plantName }}</p>
        </div>
      </div>

      <!-- Versión de la Aplicación -->
      <div class="version-label">Hi-Cone App v3.6</div>

      <!-- Grid de Módulos (2 columnas responsivo) -->
      <div class="modules-grid">
        <ng-container *ngFor="let mod of visibleModules()">
          <!-- Si es link con ruta -->
          <a *ngIf="mod.route" [routerLink]="mod.route" class="module-card">
            <div class="module-icon" [ngClass]="mod.iconClass">
              <ng-container *ngTemplateOutlet="svgTemplate; context: { type: mod.svg }"></ng-container>
            </div>
            <div class="module-content">
              <h3>{{ mod.title }}</h3>
              <p>{{ mod.description }}</p>
            </div>
          </a>

          <!-- Si es botón con acción -->
          <div *ngIf="!mod.route && mod.action" (click)="mod.action()" class="module-card clickable">
            <div class="module-icon" [ngClass]="mod.iconClass">
              <ng-container *ngTemplateOutlet="svgTemplate; context: { type: mod.svg }"></ng-container>
            </div>
            <div class="module-content">
              <h3>{{ mod.title }}</h3>
              <p>{{ mod.description }}</p>
            </div>
          </div>
        </ng-container>
      </div>
    </div>

    <!-- Plantilla de Iconos SVG -->
    <ng-template #svgTemplate let-type="type">
      <!-- Extrusiones -->
      <svg *ngIf="type === 'extrusiones'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>

      <!-- Prensados -->
      <svg *ngIf="type === 'prensados'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>

      <!-- Reportes -->
      <svg *ngIf="type === 'reportes'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>

      <!-- Manual -->
      <svg *ngIf="type === 'manual'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>

      <!-- Wizard -->
      <svg *ngIf="type === 'wizard'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
      </svg>

      <!-- Etiquetado -->
      <svg *ngIf="type === 'etiquetado'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </ng-template>
  `,
  styles: [`
    .captura-home {
      display: flex;
      flex-direction: column;
      gap: 20px;
      animation: fadeIn 0.4s ease-out;
    }

    /* Tarjeta de Operador Premium con muesca circular */
    .operator-card {
      position: relative;
      background: linear-gradient(135deg, #151f32 0%, #1e293b 100%);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 32px 24px 24px 24px;
      display: flex;
      align-items: center;
      gap: 20px;
      box-shadow: var(--shadow-lg);
      margin-top: 12px;
    }

    .operator-notch {
      position: absolute;
      top: -12px;
      left: 24px;
      background-color: var(--primary);
      color: var(--text-dark);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 4px 12px;
      border-radius: 20px;
      box-shadow: 0 0 10px rgba(56, 189, 248, 0.4);
    }

    .operator-avatar {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background-color: rgba(56, 189, 248, 0.1);
      border: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary);
    }

    .operator-avatar svg {
      width: 28px;
      height: 28px;
    }

    .operator-info h2 {
      font-size: 20px;
      font-weight: 600;
      color: var(--text-main);
      margin: 0 0 4px 0;
    }

    .operator-info p {
      font-size: 13px;
      color: var(--text-muted);
      margin: 0;
    }

    /* Versión */
    .version-label {
      font-size: 12px;
      font-family: var(--font-mono);
      color: var(--text-muted);
      text-align: center;
      margin-bottom: 8px;
    }

    /* Grid Responsivo */
    .modules-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    @media (max-width: 768px) {
      .modules-grid {
        grid-template-columns: 1fr;
      }
      .operator-card {
        padding: 28px 16px 16px 16px;
      }
    }

    /* Tarjetas de Modulos */
    .module-card {
      display: flex;
      flex-direction: column;
      gap: 12px;
      background-color: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 14px;
      padding: 20px;
      text-decoration: none;
      color: var(--text-main);
      transition: var(--transition-smooth);
      box-shadow: var(--shadow-sm);
    }

    .module-card.clickable {
      cursor: pointer;
    }

    .module-card:hover {
      background-color: var(--bg-card-hover);
      border-color: var(--border-glow);
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(56, 189, 248, 0.1);
    }

    .module-card:active {
      transform: translateY(0);
    }

    .module-icon {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition-smooth);
    }

    .icon-blue {
      background-color: rgba(56, 189, 248, 0.1);
      color: var(--primary);
      border: 1px solid rgba(56, 189, 248, 0.2);
    }

    .module-card:hover .icon-blue {
      background-color: var(--primary);
      color: var(--text-dark);
    }

    .module-icon svg {
      width: 24px;
      height: 24px;
    }

    .module-content h3 {
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 6px 0;
    }

    .module-content p {
      font-size: 13px;
      color: var(--text-muted);
      line-height: 1.4;
      margin: 0;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(15px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class CapturaHomeComponent implements OnInit {
  private prodService = inject(ProduccionService);
  private offlineStore = inject(OfflineStoreService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private extrusionState = inject(ExtrusionStateService);

  // Computa el nombre del operador dinámicamente desde el AuthService
  operatorName = computed(() => {
    const user = this.authService.currentUser();
    return user ? user.fullName.toUpperCase() : 'JULIO PRODUCCIÓN';
  });

  // Computa el rol del usuario dinámicamente para la muesca
  operatorRole = computed(() => {
    const user = this.authService.currentUser();
    const role = user?.roles?.[0] || 'Operario';
    // Mapear de manera amigable
    const roleMap: { [key: string]: string } = {
      'SuperAdmin': 'Super Administrador',
      'Administrator': 'Administrador',
      'Operador': 'Operador Activo',
      'Supervisor': 'Supervisor Activo',
      'Mantenimiento': 'Mantenimiento Activo'
    };
    return (roleMap[role] || `${role} Activo`).toUpperCase();
  });

  // Módulos definidos con sus respectivos roles permitidos
  modules: ModuleItem[] = [
    {
      id: 'extrusiones',
      title: 'Extrusiones',
      description: 'Registro de bobinas, carretes y control de extrusoras.',
      route: 'extrusion',
      iconClass: 'icon-blue',
      svg: 'extrusiones',
      allowedRoles: ['SuperAdmin', 'Administrator', 'Supervisor', 'Operador', 'Mantenimiento']
    },
    {
      id: 'prensados',
      title: 'Prensados',
      description: 'Asignación de troqueles y control de cierre de carrera.',
      route: 'prensado',
      iconClass: 'icon-blue',
      svg: 'prensados',
      allowedRoles: ['SuperAdmin', 'Administrator', 'Supervisor', 'Operador', 'Mantenimiento']
    },
    {
      id: 'reportes',
      title: 'Reportes',
      description: 'Consultas y reportes de producción por fecha y máquina.',
      route: 'reportes',
      iconClass: 'icon-blue',
      svg: 'reportes',
      allowedRoles: ['SuperAdmin', 'Administrator', 'Supervisor', 'Operador', 'Mantenimiento']
    },

    {
      id: 'manual',
      title: 'Manual de Ayuda',
      description: 'Documentación técnica y procedimientos de planta.',
      route: 'manual',
      iconClass: 'icon-blue',
      svg: 'manual',
      allowedRoles: ['SuperAdmin', 'Administrator', 'Supervisor', 'Operador', 'Mantenimiento']
    },
    {
      id: 'wizard',
      title: 'Wizard',
      description: 'Asistente guiado de arranque y parámetros de turno.',
      route: 'wizard',
      iconClass: 'icon-blue',
      svg: 'wizard',
      allowedRoles: ['SuperAdmin', 'Administrator', 'Supervisor']
    },
    {
      id: 'etiquetado',
      title: 'Etiquetado Pallets',
      description: 'Generación de etiquetas físicas de producto terminado.',
      route: 'etiquetado-pallets',
      iconClass: 'icon-blue',
      svg: 'etiquetado',
      allowedRoles: ['SuperAdmin', 'Administrator', 'Supervisor', 'Operador']
    }

  ];

  // Filtra los módulos visibles según los roles del usuario autenticado
  visibleModules = computed(() => {
    const user = this.authService.currentUser();
    if (!user) return [];

    // Si es SuperAdministrador o Administrador del sistema, ve todo
    if (user.roles.includes('SuperAdmin') || user.roles.includes('Administrator')) {
      return this.modules;
    }

    // Retorna los módulos donde al menos uno de los roles del usuario esté en la lista permitida
    return this.modules.filter(m => 
      m.allowedRoles.some(r => user.roles.includes(r))
    );
  });

  shiftName = 'MATUTINO';
  plantName = 'Planta Principal';

  ngOnInit() {
    this.shiftName = this.getShiftByTime().toUpperCase();
    
    // Al regresar al menú de inicio se resetea la selección de máquina, prensa y turno
    // para obligar al usuario a seleccionar de nuevo en su próxima entrada
    this.extrusionState.reset();
    this.offlineStore.remove('active_shift');
    this.offlineStore.remove('active_press');
    this.offlineStore.remove('active_press_id');
    this.offlineStore.remove('active_extrusora_id');
  }

  private getShiftByTime(): string {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 14) {
      return 'Matutino';
    } else if (hour >= 14 && hour < 22) {
      return 'Vespertino';
    } else {
      return 'Nocturno';
    }
  }

  openHelpUrl() {
    window.open('https://nedi.mx/knowledge/article/941', '_blank');
  }

  openSyncMonitor() {
    const shellBtn = document.querySelector('.notification-btn') as HTMLElement;
    if (shellBtn) {
      shellBtn.click();
    } else {
      alert('Utilice el icono de la campana en la parte superior para administrar la cola de sincronización.');
    }
  }

  showDevAlert(moduleName: string) {
    alert(`El módulo "${moduleName}" se encuentra en desarrollo.`);
  }
}
