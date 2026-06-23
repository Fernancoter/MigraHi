import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-captura-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="captura-home">
      <div class="welcome-section card">
        <h2>Panel de Operación de Planta</h2>
        <p>Seleccione el proceso a realizar en el turno activo.</p>
      </div>

      <div class="menu-grid">
        <a routerLink="escanear" class="menu-item escanear-btn">
          <span class="icon">🔍</span>
          <div class="text-group">
            <h3>Escanear Código</h3>
            <p>Registrar bobinas, carretes o pallets mediante código de barras o QR.</p>
          </div>
        </a>

        <a routerLink="troquel" class="menu-item troquel-btn">
          <span class="icon">🔧</span>
          <div class="text-group">
            <h3>Asignar Troquel</h3>
            <p>Configurar e instalar un troquel activo en la prensa.</p>
          </div>
        </a>

        <a routerLink="carrera" class="menu-item carrera-btn">
          <span class="icon">⚡</span>
          <div class="text-group">
            <h3>Cierre de Carrera</h3>
            <p>Cerrar carrera de prensado y registrar piezas buenas/merma.</p>
          </div>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .captura-home {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .card {
      background: white;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }

    .welcome-section {
      background: linear-gradient(135deg, #1f4068 0%, #162447 100%);
      color: white;
      text-align: center;
      padding: 24px 16px;
    }

    .welcome-section h2 {
      margin: 0 0 8px 0;
      font-size: 20px;
    }

    .welcome-section p {
      margin: 0;
      font-size: 14px;
      opacity: 0.9;
    }

    .menu-grid {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
      border-radius: 8px;
      background: white;
      color: #333;
      text-decoration: none;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      border-left: 5px solid #1f4068;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .menu-item:active {
      transform: scale(0.98);
    }

    .menu-item .icon {
      font-size: 32px;
    }

    .menu-item .text-group h3 {
      margin: 0 0 4px 0;
      font-size: 16px;
      font-weight: 600;
    }

    .menu-item .text-group p {
      margin: 0;
      font-size: 12px;
      color: #666;
    }

    .menu-item.escanear-btn {
      border-left-color: #f857a6;
    }

    .menu-item.troquel-btn {
      border-left-color: #11998e;
    }

    .menu-item.carrera-btn {
      border-left-color: #4776e6;
    }
  `]
})
export class CapturaHomeComponent {}
