import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-prensado-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="prensado-menu">
      <div class="menu-header">
        <h2>Módulo de Prensado</h2>
        <p>Seleccione el proceso de prensado a realizar en el turno activo.</p>
      </div>

      <div class="menu-grid">
        <!-- Asignar Troquel -->
        <a routerLink="/troquel" class="menu-card">
          <div class="card-icon icon-cyan">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div class="card-content">
            <h3>Asignar Troquel a Prensa</h3>
            <p>Configurar e instalar un troquel activo en la prensa.</p>
          </div>
        </a>

        <!-- Cierre de Carrera -->
        <a routerLink="/carrera" class="menu-card">
          <div class="card-icon icon-cyan">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="card-content">
            <h3>Cierre de Carrera</h3>
            <p>Cerrar carrera de prensado y registrar piezas buenas/merma.</p>
          </div>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .prensado-menu {
      display: flex;
      flex-direction: column;
      gap: 24px;
      animation: fadeIn 0.4s ease-out;
    }

    .menu-header {
      text-align: center;
      background: linear-gradient(135deg, #151f32 0%, #1e293b 100%);
      border: 1px solid var(--border-color);
      padding: 24px;
      border-radius: 16px;
      box-shadow: var(--shadow-md);
    }

    .menu-header h2 {
      font-size: 22px;
      margin: 0 0 8px 0;
      color: var(--text-main);
    }

    .menu-header p {
      font-size: 14px;
      color: var(--text-muted);
      margin: 0;
    }

    .menu-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    @media (max-width: 768px) {
      .menu-grid {
        grid-template-columns: 1fr;
      }
    }

    .menu-card {
      display: flex;
      flex-direction: column;
      gap: 16px;
      background-color: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 14px;
      padding: 24px;
      text-decoration: none;
      color: var(--text-main);
      transition: var(--transition-smooth);
      box-shadow: var(--shadow-sm);
    }

    .menu-card:hover {
      background-color: var(--bg-card-hover);
      border-color: var(--border-glow);
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(56, 189, 248, 0.1);
    }

    .menu-card:active {
      transform: translateY(0);
    }

    .card-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition-smooth);
    }

    .icon-cyan {
      background-color: rgba(56, 189, 248, 0.1);
      color: var(--primary);
      border: 1px solid rgba(56, 189, 248, 0.2);
    }

    .menu-card:hover .icon-cyan {
      background-color: var(--primary);
      color: var(--text-dark);
    }

    .card-icon svg {
      width: 26px;
      height: 26px;
    }

    .card-content h3 {
      font-size: 18px;
      font-weight: 600;
      margin: 0 0 6px 0;
    }

    .card-content p {
      font-size: 14px;
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
export class PrensadoMenuComponent {}
