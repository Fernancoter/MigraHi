import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="logo-circle">H</div>
        <span class="logo-text">HiCone<span class="text-accent">ERP</span></span>
      </div>
      
      <nav class="sidebar-nav">
        <div class="nav-section">MENU PRINCIPAL</div>
        <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
          <span class="nav-icon">📊</span>
          <span class="nav-label">Dashboard</span>
        </a>
        
        <div class="nav-section">MÓDULOS ERP</div>
        <a routerLink="/inventario" routerLinkActive="active" class="nav-item">
          <span class="nav-icon">📦</span>
          <span class="nav-label">Inventario</span>
        </a>
        <a routerLink="/clientes" routerLinkActive="active" class="nav-item">
          <span class="nav-icon">👥</span>
          <span class="nav-label">Clientes</span>
        </a>
        <a routerLink="/ventas" routerLinkActive="active" class="nav-item">
          <span class="nav-icon">💰</span>
          <span class="nav-label">Ventas</span>
        </a>
        <a routerLink="/produccion" routerLinkActive="active" class="nav-item">
          <span class="nav-icon">🏭</span>
          <span class="nav-label">Producción</span>
        </a>
        
        <div class="nav-section">SISTEMA</div>
        <a routerLink="/usuarios" routerLinkActive="active" class="nav-item">
          <span class="nav-icon">⚙️</span>
          <span class="nav-label">Configuración</span>
        </a>
      </nav>
      
      <div class="sidebar-footer">
        <div class="user-info">
          <div class="user-avatar">AD</div>
          <div class="user-details">
            <p class="user-name">Administrador</p>
            <p class="user-role">SuperAdmin</p>
          </div>
        </div>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: var(--sidebar-width);
      height: 100vh;
      background-color: var(--bg-sidebar);
      color: var(--text-inverse);
      display: flex;
      flex-direction: column;
      position: fixed;
      left: 0;
      top: 0;
      border-right: 1px solid rgba(255,255,255,0.1);
      z-index: 100;
    }
    
    .sidebar-header {
      padding: 2rem 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    
    .logo-circle {
      width: 32px;
      height: 32px;
      background: var(--primary);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.25rem;
    }
    
    .logo-text {
      font-family: 'Outfit', sans-serif;
      font-weight: 700;
      font-size: 1.5rem;
      letter-spacing: -0.03em;
    }
    
    .text-accent { color: var(--primary); }
    
    .sidebar-nav {
      flex: 1;
      padding: 0 1rem;
    }
    
    .nav-section {
      padding: 1.5rem 0.75rem 0.5rem;
      font-size: 0.7rem;
      font-weight: 700;
      color: rgba(255,255,255,0.4);
      letter-spacing: 0.1em;
    }
    
    .nav-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      color: rgba(255,255,255,0.7);
      text-decoration: none;
      border-radius: var(--radius-md);
      transition: all 0.2s ease;
      margin-bottom: 0.25rem;
    }
    
    .nav-item:hover {
      background: rgba(255,255,255,0.05);
      color: var(--text-inverse);
    }
    
    .nav-item.active {
      background: var(--primary);
      color: var(--text-inverse);
      box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.4);
    }
    
    .nav-icon { font-size: 1.25rem; }
    
    .sidebar-footer {
      padding: 1.5rem;
      background: rgba(0,0,0,0.2);
    }
    
    .user-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    
    .user-avatar {
      width: 40px;
      height: 40px;
      background: rgba(255,255,255,0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 0.875rem;
    }
    
    .user-name { font-size: 0.875rem; font-weight: 600; margin: 0; }
    .user-role { font-size: 0.75rem; color: rgba(255,255,255,0.5); margin: 0; }
  `]
})
export class SidebarComponent {}
