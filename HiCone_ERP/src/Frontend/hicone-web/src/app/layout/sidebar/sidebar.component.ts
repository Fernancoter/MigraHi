

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
            <svg viewBox="0 0 24 24" class="helmet-icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M7 9a5 5 0 0 1 10 0v1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h1z" />
                <path d="M12 9V6a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v2" />
                <path d="M16 12v3a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4v-3" />
                <path d="M10.5 12l.5 1h2l.5-1" />
                <path d="M19.5 21v-3.5a3 3 0 0 0-3-3H12M4.5 21v-3.5a3 3 0 0 1 3-3H12" />
            </svg>
        <div class="banner-text">
          <h2 class="module-title">{{ getModuleTitle(activeModule$ | async) }}</h2>
          <span class="module-subtitle">{{ getModuleTitle(activeModule$ | async) }}</span>
        </div>
      </div>
      
      <!-- Navegación Dinámica -->
      <nav class="sidebar-nav">
        <div class="nav-section-modern"><span class="section-text">{{ getModuleTitle(activeModule$ | async) }}</span></div>
        
        <ng-container *ngIf="(activeModule$ | async) === 'INVENTARIO'">
          <a routerLink="/inventario/inicio" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="nav-item" title="Inicio">
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
        </ng-container>

        <ng-container *ngIf="(activeModule$ | async) === 'EXTRUSIÓN'">
          <a routerLink="/produccion/extrusion/inicio" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="nav-item" title="Inicio">
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
          <a routerLink="/produccion/extrusion/extrusora-producto" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="nav-item" title="Extrusora Producto">
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
              <a routerLink="/produccion/extrusion/operacion/interrupciones" routerLinkActive="active" class="nav-subitem" title="Interrupciones">
                <div class="subitem-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg></div>
                <span class="item-label">Interrupciones</span>
              </a>
            </div>
          </div>
        </ng-container>

        <ng-container *ngIf="(activeModule$ | async) === 'PRENSADO'">
          <!-- Inicio (Tablero) -->
          <a routerLink="/produccion/prensado/inicio" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="nav-item" title="Inicio">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
            <span class="item-label">Inicio</span>
          </a>
          <!-- Turnos Por Semana -->
          <a routerLink="/produccion/prensado/turnos-semana" routerLinkActive="active" class="nav-item" title="Turnos Por Semana">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg></div>
            <span class="item-label">Turnos Por Semana</span>
          </a>

          <!-- Troqueles -->
          <a routerLink="/produccion/prensado/catalogos/troqueles" routerLinkActive="active" class="nav-item" title="Troqueles">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg></div>
            <span class="item-label">Troqueles</span>
          </a>
          <!-- Prensas -->
          <a routerLink="/produccion/prensado/catalogos/prensas" routerLinkActive="active" class="nav-item" title="Prensas">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></div>
            <span class="item-label">Prensas</span>
          </a>
          <!-- Prensa Producto -->
          <a routerLink="/produccion/prensado/referencias/prensa-producto" routerLinkActive="active" class="nav-item" title="Prensa Producto">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></div>
            <span class="item-label">Prensa Producto</span>
          </a>
          <!-- Producto Terminado -->
          <a routerLink="/produccion/prensado/referencias/producto-terminado" routerLinkActive="active" class="nav-item" title="Producto Terminado">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div>
            <span class="item-label">Producto Terminado</span>
          </a>

          <!-- Submenú Operación (PRENSADO) -->
          <div class="collapsible-group">
            <div class="nav-item group-header" (click)="toggleOperacion()" [class.expanded]="operacionExpanded" title="Operación">
              <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></div>
              <span class="item-label">Operación</span>
              <span class="chevron" [class.rotated]="operacionExpanded">▾</span>
            </div>
            <div class="group-items animate-dropdown" *ngIf="operacionExpanded">
              <a routerLink="/produccion/prensado/operacion/prensados" routerLinkActive="active" class="nav-subitem" title="Prensados">
                <div class="subitem-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg></div>
                <span class="item-label">Prensados</span>
              </a>
              <a routerLink="/produccion/prensado/operacion/carreras" routerLinkActive="active" class="nav-subitem" title="Carreras">
                <div class="subitem-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg></div>
                <span class="item-label">Carreras</span>
              </a>
              <a routerLink="/produccion/prensado/operacion/carretes" routerLinkActive="active" class="nav-subitem" title="Carretes">
                <div class="subitem-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg></div>
                <span class="item-label">Carretes</span>
              </a>
              <a routerLink="/produccion/prensado/operacion/palets" routerLinkActive="active" class="nav-subitem" title="Palets">
                <div class="subitem-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg></div>
                <span class="item-label">Palets</span>
              </a>
              <a routerLink="/produccion/prensado/operacion/interrupciones" routerLinkActive="active" class="nav-subitem" title="Interrupciones">
                <div class="subitem-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg></div>
                <span class="item-label">Interrupciones</span>
              </a>
            </div>
          </div>
        </ng-container>

        <!-- ── CALIDAD (Control de Calidad) ─────────────────────────────────── -->
        <ng-container *ngIf="(activeModule$ | async) === 'CALIDAD'">
          <!-- Inicio/Dashboard -->
          <a routerLink="/calidad" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="nav-item" title="Dashboard">
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

        <!-- ── CONFIGURACION_PRODUCCION (Configurar Producción) ─────────────────────── -->
        <ng-container *ngIf="(activeModule$ | async) === 'CONFIGURACION_PRODUCCION'">
          <!-- Inicio -->
          <a routerLink="/configurar-produccion" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="nav-item" title="Inicio">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
            <span class="item-label">Inicio</span>
          </a>
          <!-- Operadores -->
          <a routerLink="/configurar-produccion/operarios" routerLinkActive="active" class="nav-item" title="Operadores">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div>
            <span class="item-label">Operadores</span>
          </a>
          <!-- Productos -->
          <a routerLink="/configurar-produccion/productos" routerLinkActive="active" class="nav-item" title="Productos">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div>
            <span class="item-label">Productos</span>
          </a>
          <!-- Turnos por Semana -->
          <a routerLink="/configurar-produccion/turnos-semana" routerLinkActive="active" class="nav-item" title="Turnos Por Semana">
            <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg></div>
            <span class="item-label">Turnos Por Semana</span>
          </a>

          <!-- Catálogos (desplegable) -->
          <div class="collapsible-group">
            <div class="nav-item group-header" (click)="catalogosExpanded=!catalogosExpanded" [class.expanded]="catalogosExpanded" title="Catálogos">
              <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></div>
              <span class="item-label">Catálogos</span>
              <span class="chevron" [class.rotated]="catalogosExpanded">▾</span>
            </div>
            <div class="group-items animate-dropdown" *ngIf="catalogosExpanded">
              <a routerLink="/configurar-produccion/catalogos/categorias" routerLinkActive="active" class="nav-subitem" title="Categorías">
                <div class="subitem-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
                <span class="item-label">Categorías</span>
              </a>
              <a routerLink="/configurar-produccion/catalogos/turnos" routerLinkActive="active" class="nav-subitem" title="Turnos">
                <div class="subitem-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
                <span class="item-label">Turnos</span>
              </a>
              <a routerLink="/configurar-produccion/catalogos/extrusoras" routerLinkActive="active" class="nav-subitem" title="Extrusoras">
                <div class="subitem-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg></div>
                <span class="item-label">Extrusoras</span>
              </a>
              <a routerLink="/configurar-produccion/catalogos/prensas" routerLinkActive="active" class="nav-subitem" title="Prensas">
                <div class="subitem-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></div>
                <span class="item-label">Prensas</span>
              </a>
              <a routerLink="/configurar-produccion/catalogos/silos" routerLinkActive="active" class="nav-subitem" title="Silos">
                <div class="subitem-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg></div>
                <span class="item-label">Silos</span>
              </a>
            </div>
          </div>

          <!-- Referencias (desplegable) -->
          <div class="collapsible-group">
            <div class="nav-item group-header" (click)="referenciasExpanded=!referenciasExpanded" [class.expanded]="referenciasExpanded" title="Referencias">
              <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></div>
              <span class="item-label">Referencias</span>
              <span class="chevron" [class.rotated]="referenciasExpanded">▾</span>
            </div>
            <div class="group-items animate-dropdown" *ngIf="referenciasExpanded">
              <a routerLink="/configurar-produccion/referencias/configuracion" routerLinkActive="active" class="nav-subitem" title="Configuración">
                <div class="subitem-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></div>
                <span class="item-label">Configuración</span>
              </a>
              <a routerLink="/configurar-produccion/referencias/extrusora-producto" routerLinkActive="active" class="nav-subitem" title="Extrusora Producto">
                <div class="subitem-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></div>
                <span class="item-label">Extrusora Producto</span>
              </a>
              <a routerLink="/configurar-produccion/referencias/extrusora-mezcladora" routerLinkActive="active" class="nav-subitem" title="Extrusora Mezcladora">
                <div class="subitem-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></div>
                <span class="item-label">Extrusora Mezcladora</span>
              </a>
              <a routerLink="/configurar-produccion/referencias/prensa-producto" routerLinkActive="active" class="nav-subitem" title="Prensa Producto">
                <div class="subitem-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></div>
                <span class="item-label">Prensa Producto</span>
              </a>
              <a routerLink="/configurar-produccion/referencias/producto-terminado" routerLinkActive="active" class="nav-subitem" title="Producto Terminado">
                <div class="subitem-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div>
                <span class="item-label">Producto Terminado</span>
              </a>
            </div>
          </div>
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

        <!-- SAE: CATÁLOGOS -->
        <ng-container *ngIf="(activeModule$ | async) === 'CATÁLOGOS_SAE'">
          <div class="nav-section-modern"><span class="section-text">REPORTES</span></div>
          
          <a routerLink="/catalogos-sae/customer" routerLinkActive="active" class="nav-item legacy-menu-item" title="Customer">
             <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg></div>
             <span class="item-label">Customer</span>
          </a>
          
          <a routerLink="/catalogos-sae/outlook" routerLinkActive="active" class="nav-item legacy-menu-item" title="Outlook">
             <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg></div>
             <span class="item-label">Outlook</span>
          </a>
          
          <a routerLink="/catalogos-sae/budget" routerLinkActive="active" class="nav-item legacy-menu-item" title="Budget">
             <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg></div>
             <span class="item-label">Budget</span>
          </a>
          
          <a routerLink="/catalogos-sae/price" routerLinkActive="active" class="nav-item legacy-menu-item" title="Price">
             <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg></div>
             <span class="item-label">Price</span>
          </a>
          
          <a routerLink="/catalogos-sae/product" routerLinkActive="active" class="nav-item legacy-menu-item" title="Product">
             <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg></div>
             <span class="item-label">Product</span>
          </a>
          
          <a routerLink="/catalogos-sae/salesperson" routerLinkActive="active" class="nav-item legacy-menu-item" title="SalesPerson">
             <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg></div>
             <span class="item-label">SalesPerson</span>
          </a>
        </ng-container>

        <!-- SAE: REPORTES -->
        <ng-container *ngIf="(activeModule$ | async) === 'REPORTES_SAE'">
          <div class="nav-section-modern"><span class="section-text">REPORTES</span></div>
          
          <a routerLink="/reportes-sae/orders-price" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="nav-item legacy-menu-item" title="Report Orders Price">
             <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg></div>
             <span class="item-label">Report Orders Price</span>
          </a>
          
          <a routerLink="/reportes-sae" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="nav-item legacy-menu-item" title="Report Orders">
             <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg></div>
             <span class="item-label">Report Orders</span>
          </a>
          
          <a routerLink="/reportes-sae/presupuesto" routerLinkActive="active" class="nav-item legacy-menu-item" title="Report FTB">
             <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg></div>
             <span class="item-label">Report FTB</span>
          </a>
          
          <a routerLink="/reportes-sae/itw-outlook" routerLinkActive="active" class="nav-item legacy-menu-item" title="FTB YTD">
             <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg></div>
             <span class="item-label">FTB YTD</span>
          </a>
          
          <a routerLink="/reportes-sae/realtime-inventory" routerLinkActive="active" class="nav-item legacy-menu-item" title="Realtime Inventory">
             <div class="item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg></div>
             <span class="item-label">Realtime Inventory</span>
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
    

    .helmet-icon { width: 50px; height: 50px; color: white; }

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
    
    .legacy-menu-item {
      color: #5A738E;
      font-weight: 500;
      border-radius: 4px;
      padding: 0.6rem 1rem;
    }
    .legacy-menu-item:hover {
      background: #f1f5f9;
      color: #0f172a;
    }
    .legacy-menu-item.active {
      background: #5cb85c;
      color: white;
      box-shadow: none;
    }
    .legacy-menu-item.active .item-icon {
      color: white;
    }

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

    .sidebar-dynamic.mini-mode .helmet-icon { width: 24px; height: 24px; }
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
  catalogosExpanded = false;
  referenciasExpanded = false;

  constructor(private navService: NavigationService) {
    this.activeModule$ = this.navService.activeModule$;
    this.isSidebarVisible$ = this.navService.isSidebarVisible$;
  }

  getModuleTitle(moduleType: string | null): string {
    if (!moduleType) return '';
    const titles: { [key: string]: string } = {
      'INVENTARIO': 'Inventario',
      'EXTRUSIÓN': 'Extrusión',
      'PRENSADO': 'Prensado',
      'EMBARQUES': 'Embarques',
      'CALIDAD': 'Calidad',
      'SEGURIDAD': 'Seguridad',
      'CONFIGURACION_PRODUCCION': 'Configurar Producción',
      'REPORTES_SAE': 'Reportes SAE',
      'CATÁLOGOS_SAE': 'Catálogos SAE',
      'SISTEMA': 'Sistema'
    };
    return titles[moduleType.toUpperCase()] || moduleType;
  }

  toggleOperacion() {
    this.operacionExpanded = !this.operacionExpanded;
  }
}
