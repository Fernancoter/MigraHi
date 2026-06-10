import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calidad',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">Inicio Calidad</h1>
        <div class="breadcrumb">
          <span class="breadcrumb-item">Calidad</span>
          <span class="breadcrumb-separator">›</span>
          <span class="breadcrumb-item active">Inicio</span>
        </div>
      </div>
      
      <div class="page-content">
        <!-- Espacio en blanco como en la captura -->
      </div>
      <div class="page-footer-line"></div>
    </div>
  `,
  styles: [`
    .page-container {
      background-color: #ffffff;
      min-height: calc(100vh - 60px);
      display: flex;
      flex-direction: column;
    }
    .page-header {
      padding: 15px 20px 5px 20px;
      border-bottom: 1px solid #e0e0e0;
    }
    .page-title {
      color: #5cb85c;
      font-size: 22px;
      font-weight: 500;
      margin: 0 0 5px 0;
    }
    .breadcrumb {
      font-size: 13px;
      color: #999;
      display: flex;
      align-items: center;
      gap: 5px;
      margin-bottom: 10px;
    }
    .breadcrumb-item {
      color: #999;
    }
    .breadcrumb-separator {
      font-size: 14px;
    }
    .breadcrumb-item.active {
      color: #777;
    }
    .page-content {
      flex: 1;
      background-color: #ffffff;
    }
    .page-footer-line {
      border-top: 1px solid #777;
      margin: 20px;
    }
  `]
})
export class CalidadComponent {
}
