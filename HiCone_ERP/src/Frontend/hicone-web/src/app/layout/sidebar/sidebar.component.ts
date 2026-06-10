import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationService } from '../../core/services/navigation.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="sidebar-dynamic shadow-right" [class.mini-mode]="!(isSidebarVisible$ | async)">
      <!-- Banner Cabecera de Módulo -->
      <div class="module-banner">
        <div class="banner-avatar">
          <svg viewBox="0 0 24 24" class="helmet-icon" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 18a1 1 0 0 0 2 0v-3a8 8 0 1 1 16 0v3a1 1 0 0 0 2 0v-1a10 10 0 0 0-20 0z"/>
            <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/>
          </svg>
        </div>
        <div class="banner-text">
          <h2 class="module-title">{{ (activeModule$ | async) | titlecase }}</h2>
          <span class="module-subtitle">{{ (activeModule$ | async) | titlecase }}</span>
        </div>
      </div>
      
      <!-- Navegación Dinámica -->
      <nav class="sidebar-nav">
        <div class="nav-section-modern">
          <span class="section-text">{{ (activeModule$ | async) === 'INVENTARIO' ? 'INVENTARIOS' : (activeModule$ | async) }}</span>
        </div>
        
        <ng-container *ngIf="(activeModule$ | async) === 'INVENTARIO'">
          <a routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="nav-item" title="Inicio">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
            <span class="item-label">Inicio</span>
          </a>
          <a routerLink="/inventario/silos" routerLinkActive="active" class="nav-item" title="Silos">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg></div>
            <span class="item-label">Silos</span>
          </a>
          <a routerLink="/inventario/lotes" routerLinkActive="active" class="nav-item" title="Lotes">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg></div>
            <span class="item-label">Lotes</span>
          </a>
          <a routerLink="/inventario/cierre-mes" routerLinkActive="active" class="nav-item" title="Cierre de Mes">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg></div>
            <span class="item-label">Cierre de Mes</span>
          </a>
          <a routerLink="/inventario/existencias" routerLinkActive="active" class="nav-item" title="Inventario">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><rect x="7" y="7" width="3" height="9"/><rect x="14" y="7" width="3" height="5"/></svg></div>
            <span class="item-label">Inventario</span>
          </a>
          <a routerLink="/inventario" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="nav-item" title="Catálogo de Artículos">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div>
            <span class="item-label">Catálogo de Artículos</span>
          </a>
        </ng-container>

        <ng-container *ngIf="(activeModule$ | async) === 'EXTRUSIÓN'">
          <a routerLink="/produccion/extrusion/inicio" routerLinkActive="active" class="nav-item" title="Inicio">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
            <span class="item-label">Inicio</span>
          </a>
          <a routerLink="/produccion/extrusion/turnos" routerLinkActive="active" class="nav-item" title="Turnos Por Semana">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg></div>
            <span class="item-label">Turnos Por Semana</span>
          </a>
          <a routerLink="/produccion/extrusion/extrusoras" routerLinkActive="active" class="nav-item" title="Extrusoras">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg></div>
            <span class="item-label">Extrusoras</span>
          </a>
          <a routerLink="/produccion/extrusion/extrusora-producto" routerLinkActive="active" class="nav-item" title="Extrusora Producto">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></div>
            <span class="item-label">Extrusora Producto</span>
          </a>
          
          <!-- Submenú Operación -->
          <div class="collapsible-group">
            <div class="nav-item group-header" (click)="toggleOperacion()" [class.expanded]="operacionExpanded" title="Operación">
              <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></div>
              <span class="item-label">Operación</span>
              <span class="chevron" [class.rotated]="operacionExpanded">▾</span>
            </div>
            <div class="group-items animate-dropdown" *ngIf="operacionExpanded">
              <a routerLink="/produccion/extrusion/operacion/extrusiones" routerLinkActive="active" class="nav-subitem" title="Extrusiones">
                <div class="subitem-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg></div>
                <span class="item-label">Extrusiones</span>
              </a>
              <a routerLink="/produccion/extrusion/operacion/bobinas" routerLinkActive="active" class="nav-subitem" title="Bobinas">
                <div class="subitem-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg></div>
                <span class="item-label">Bobinas</span>
              </a>
            </div>
          </div>
        </ng-container>

        <!-- Prensado -->
        <ng-container *ngIf="(activeModule$ | async) === 'PRENSADO'">
          <a routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="nav-item" title="Inicio">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
            <span class="item-label">Inicio</span>
          </a>
          <a routerLink="/produccion" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="nav-item" title="Tablero de Control">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg></div>
            <span class="item-label">Tablero de Control</span>
          </a>
        </ng-container>

        <!-- Embarques -->
        <ng-container *ngIf="(activeModule$ | async) === 'EMBARQUES'">
          <a routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="nav-item" title="Inicio">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
            <span class="item-label">Inicio</span>
          </a>
          <a routerLink="/embarques" routerLinkActive="active" class="nav-item" title="Gestión de Embarques">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></div>
            <span class="item-label">Gestión de Embarques</span>
          </a>
        </ng-container>

        <!-- Calidad -->
        <ng-container *ngIf="(activeModule$ | async) === 'CALIDAD'">
          <a routerLink="/calidad" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="nav-item" title="Inicio">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
            <span class="item-label">Inicio</span>
          </a>
          <!-- Catálogo de Defectos -->
          <a routerLink="/calidad/defectos" routerLinkActive="active" class="nav-item" title="Catálogo de Defectos">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg></div>
            <span class="item-label">Defectos</span>
          </a>
          <!-- Reclamos -->
          <a routerLink="/calidad/reclamos" routerLinkActive="active" class="nav-item" title="Reclamos Cliente">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
            <span class="item-label">Reclamos</span>
          </a>
          <!-- Consultar Carrete -->
          <a routerLink="/calidad/consultar" routerLinkActive="active" class="nav-item" title="Consultar Carrete">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>
            <span class="item-label">Consultar</span>
          </a>
        </ng-container>

        <!-- Configuración -->
        <ng-container *ngIf="(activeModule$ | async) === 'CONFIGURACIÓN'">
          <a routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="nav-item" title="Inicio">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
            <span class="item-label">Inicio</span>
          </a>
          <a routerLink="/configuracion" routerLinkActive="active" class="nav-item" title="Ajustes de Producción">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></div>
            <span class="item-label">Ajustes de Producción</span>
          </a>
        </ng-container>

        <!-- Reportes SAE -->
        <ng-container *ngIf="(activeModule$ | async) === 'REPORTES_SAE'">
          <a routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="nav-item" title="Inicio">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
            <span class="item-label">Inicio</span>
          </a>
          <a routerLink="/reportes-sae" routerLinkActive="active" class="nav-item" title="Informes del SAE">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg></div>
            <span class="item-label">Informes del SAE</span>
          </a>
        </ng-container>

        <!-- Catálogos SAE -->
        <ng-container *ngIf="(activeModule$ | async) === 'CATÁLOGOS_SAE'">
          <a routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="nav-item" title="Inicio">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
            <span class="item-label">Inicio</span>
          </a>
          <a routerLink="/catalogos-sae" routerLinkActive="active" class="nav-item" title="Sincronización SAE">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg></div>
            <span class="item-label">Sincronización SAE</span>
          </a>
          <a routerLink="/clientes" routerLinkActive="active" class="nav-item" title="Directorio de Clientes">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
            <span class="item-label">Directorio de Clientes</span>
          </a>
          <a routerLink="/ventas" routerLinkActive="active" class="nav-item" title="Control de Ventas">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg></div>
            <span class="item-label">Control de Ventas</span>
          </a>
        </ng-container>

        <!-- Seguridad -->
        <ng-container *ngIf="(activeModule$ | async) === 'SEGURIDAD'">
          <a routerLink="/seguridad" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="nav-item" title="Inicio">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
            <span class="item-label">Inicio</span>
          </a>
          <a routerLink="/seguridad/usuarios" routerLinkActive="active" class="nav-item" title="Usuarios">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
            <span class="item-label">Usuarios</span>
          </a>
          <a routerLink="/seguridad/roles" routerLinkActive="active" class="nav-item" title="Roles">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
            <span class="item-label">Roles</span>
          </a>
        </ng-container>

        <!-- Fallback System Menu -->
        <ng-container *ngIf="(activeModule$ | async) === 'SISTEMA'">
          <a routerLink="/dashboard" routerLinkActive="active" class="nav-item" title="Dashboard Global">
             <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
             <span class="item-label">Dashboard Global</span>
          </a>
        </ng-container>
      </nav>
      
      <div class="sidebar-footer">
        <span class="footer-text">© HiCone {{ today | date:'yyyy' }}</span>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar-dynamic {
      width: 250px;
      height: calc(100vh - 64px);
      background: white;
      display: flex;
      flex-direction: column;
      z-index: 99;
      border-right: 1px solid #e2e8f0;
      position: relative;
    }
    
    /* ANIMACIÓN FONDO MÓVIL */
    @keyframes backgroundPan {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .module-banner {
      background: linear-gradient(135deg, #15803d, #064e3b, #166534, #14532d);
      background-size: 300% 300%;
      animation: backgroundPan 14s ease infinite;
      padding: 2.5rem 1.5rem 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: white;
      position: relative;
      overflow: hidden;
      transition: all 0.3s;
    }

    .module-banner::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: url('data:image/svg+xml;utf8,<svg opacity="0.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M0 0 L100 100 M100 0 L0 100" stroke="white" stroke-width="2"/></svg>') center/cover;
    }
    
    .banner-avatar {
      background: rgba(255,255,255,0.15);
      border: 3px solid rgba(255,255,255,0.8);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0.75rem;
      position: relative;
      z-index: 1;
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
      transition: all 0.3s;
    }

    .helmet-icon { width: 24px; height: 24px; color: white; }

    .banner-text {
      text-align: center;
      position: relative;
      z-index: 1;
      transition: all 0.3s;
      white-space: nowrap;
      overflow: hidden;
    }

    .module-title { font-size: 1.2rem; font-weight: 800; margin: 0; letter-spacing: 0.5px; opacity: 1; text-shadow: 0 1px 2px rgba(0,0,0,0.3); }
    .module-subtitle { font-size: 0.75rem; color: #e2e8f0; font-weight: 500; }
    
    .sidebar-nav {
      flex: 1;
      padding: 1.5rem 0;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      overflow-x: hidden;
    }
    
    .nav-section-modern {
      padding: 0 1.5rem 0.5rem;
      font-size: 0.75rem;
      font-weight: 800;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      white-space: nowrap;
      overflow: hidden;
    }
    
    .nav-item {
      display: flex;
      align-items: center;
      padding: 0.85rem 1rem;
      margin: 0 0.75rem;
      border-radius: 8px;
      color: #334155;
      text-decoration: none;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      position: relative;
      gap: 1rem;
    }
    
    .nav-item:hover {
      background: #f1f5f9;
      color: #0f172a;
    }
    
    .nav-item.active {
      background: #2e7d32;
      color: white;
      font-weight: 700;
      box-shadow: 0 4px 10px rgba(46, 125, 50, 0.3);
    }

    .item-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #475569;
      flex-shrink: 0;
    }

    .nav-item.active .item-icon { color: white; }
    .nav-item:hover .item-icon { color: #0f172a; }
    
    .item-label {
      white-space: nowrap;
      opacity: 1;
      transition: opacity 0.2s;
    }

    .group-header { justify-content: flex-start; }
    .group-header.expanded { background: #2e7d32; color: white; box-shadow: 0 4px 10px rgba(46, 125, 50, 0.3); }
    .group-header.expanded .item-icon { color: white; }
    .chevron { transition: transform 0.3s; font-size: 1.2rem; margin-left: auto; }
    .chevron.rotated { transform: rotate(180deg); }

    .group-items { background: transparent; overflow: hidden; display: flex; flex-direction: column; gap: 0.25rem; margin-top: 0.5rem; }
    .nav-subitem {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.6rem 1.5rem 0.6rem 3rem;
      color: #475569;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      transition: all 0.2s;
      white-space: nowrap;
    }
    .nav-subitem.active {
       color: #166534; font-weight: 800; background: #f0fdf4; border-radius: 0 20px 20px 0; margin-right: 1.5rem;
       border-left: 3px solid #166534;
    }
    .nav-subitem.active .subitem-icon { color: #166534; }
    .nav-subitem:hover { color: #0f172a; background: #e2e8f0; }
    .subitem-icon { display: flex; align-items: center; justify-content: center; color: #64748b; flex-shrink: 0; }
    
    .sidebar-footer { padding: 1rem; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 0.75rem; text-align: center; white-space: nowrap; overflow: hidden; font-weight: 500; }

    @keyframes animate-dropdown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
    .animate-dropdown { animation: animate-dropdown 0.2s ease-out; }

    /* MODO MINI (COLLAPSED) */
    .sidebar-dynamic.mini-mode {
      width: 76px;
    }

    .sidebar-dynamic.mini-mode .module-banner {
      padding: 1.5rem 0;
    }

    .sidebar-dynamic.mini-mode .banner-avatar {
      width: 40px;
      height: 40px;
      margin-bottom: 0;
      border-width: 2px;
    }

    .sidebar-dynamic.mini-mode .helmet-icon { width: 20px; height: 20px; }
    .sidebar-dynamic.mini-mode .banner-text { width: 0; opacity: 0; display: none; }
    
    .sidebar-dynamic.mini-mode .nav-section-modern { text-align: center; padding: 0 0 0.5rem; }
    .sidebar-dynamic.mini-mode .section-text { display: none; }
    .sidebar-dynamic.mini-mode .nav-section-modern::after { content: '•••'; color: #94a3b8; font-size: 1.2rem; line-height: 0.5; }

    .sidebar-dynamic.mini-mode .nav-item {
      padding: 0.85rem;
      justify-content: center;
      margin: 0 0.5rem;
    }

    .sidebar-dynamic.mini-mode .item-label,
    .sidebar-dynamic.mini-mode .chevron {
      display: none;
    }

    .sidebar-dynamic.mini-mode .group-items {
      align-items: center;
    }

    .sidebar-dynamic.mini-mode .nav-subitem {
      padding: 0.6rem;
      margin-right: 0;
      justify-content: center;
      border-radius: 8px;
      border-left: none;
    }

    .sidebar-dynamic.mini-mode .footer-text { display: none; }
  `]
})
export class SidebarComponent {
  today = new Date();
  activeModule$;
  isSidebarVisible$;
  operacionExpanded = false;

  constructor(private navService: NavigationService) {
    this.activeModule$ = this.navService.activeModule$;
    this.isSidebarVisible$ = this.navService.isSidebarVisible$;
  }

  toggleOperacion() {
    this.operacionExpanded = !this.operacionExpanded;
  }
}
