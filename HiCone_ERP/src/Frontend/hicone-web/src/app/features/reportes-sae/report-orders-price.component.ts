import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report-orders-price',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="module-container">
      <header class="page-header">
        <div class="header-left">
          <h1>Report Orders Price</h1>
          <p class="subtitle">Reporte detallado de órdenes con precios e importes.</p>
        </div>
      </header>
      <div class="card-table" style="padding: 3rem; text-align: center; color: #64748b;">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 1rem;"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        <h3>Vista en Construcción</h3>
        <p>Este reporte se implementará con los datos de precios e importes de las órdenes de SAE.</p>
      </div>
    </div>
  `,
  styles: [`
    .module-container { padding: 1.5rem 2rem; }
    .page-header { margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 2px solid #e2e8f0; }
    .page-header h1 { font-size: 1.5rem; font-weight: 800; color: #1e293b; margin: 0 0 0.25rem 0; }
    .subtitle { color: #64748b; font-size: 0.85rem; margin: 0; }
    .card-table { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
  `]
})
export class ReportOrdersPriceComponent {}
