import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-embarques',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="module-page animate-fade-in">
      <header class="module-header">
        <div class="title-area">
          <h1>📦 Logística y Embarques</h1>
          <p>Control de despachos y salidas de producto terminado</p>
        </div>
        <div class="actions">
          <button class="btn btn-primary">+ Nuevo Embarque</button>
        </div>
      </header>

      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-label">En Tránsito</span>
          <span class="stat-value">4</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Pendientes de Carga</span>
          <span class="stat-value">12</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Entregados Hoy</span>
          <span class="stat-value">8</span>
        </div>
      </div>

      <div class="content-card">
        <table class="data-table">
          <thead>
            <tr>
              <th>Folio Carga</th>
              <th>Remisión SAE</th>
              <th>Cliente / Destino</th>
              <th>Transporte / Placas</th>
              <th>Conductor</th>
              <th>Estatus</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let e of embarques">
              <td class="bold text-primary">{{ e.folioCarga }}</td>
              <td><span class="sae-tag">SAE: {{ e.remisionSae }}</span></td>
              <td>
                <div class="client-cell">
                  <span class="client-name">{{ e.cliente }}</span>
                  <span class="destination">{{ e.destino }}</span>
                </div>
              </td>
              <td>{{ e.transporte }} <br> <small class="text-muted">{{ e.placas }}</small></td>
              <td>{{ e.conductor }}</td>
              <td>
                <span class="status-badge" [class]="e.estatus.toLowerCase().split(' ').join('-')">
                  {{ e.estatus }}
                </span>
              </td>
              <td>{{ e.fecha | date:'dd/MM/yyyy' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .module-page { padding: 2rem; }
    .module-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem; }
    h1 { font-size: 1.75rem; color: var(--text-main); margin-bottom: 0.25rem; }
    p { color: var(--text-muted); font-size: 0.875rem; }

    .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 2rem; }
    .stat-card { background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid var(--border-color); }
    .stat-label { display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem; }
    .stat-value { font-size: 2rem; font-weight: 800; color: var(--primary); }

    .content-card { background: white; border-radius: 8px; border: 1px solid var(--border-color); overflow: hidden; }
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th { text-align: left; padding: 1rem; background: #f8fafc; font-size: 0.75rem; font-weight: 700; color: var(--text-muted); }
    .data-table td { padding: 1rem; border-top: 1px solid var(--border-color); font-size: 0.875rem; }
    .bold { font-weight: 700; }

    .status-badge { padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }
    .sae-tag { background: #fee2e2; color: #b91c1c; padding: 0.125rem 0.375rem; border-radius: 4px; font-size: 0.7rem; font-weight: 600; border: 1px solid #fecaca; }
    .client-cell { display: flex; flex-direction: column; }
    .client-name { font-weight: 600; color: var(--text-main); font-size: 0.875rem; }
    .destination { font-size: 0.75rem; color: var(--text-muted); }
    .text-primary { color: var(--primary); }
    .text-muted { color: var(--text-muted); }

    .status-badge.entregado { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
    .status-badge.tránsito { background: #fef9c3; color: #854d0e; border: 1px solid #fef08a; }
    .status-badge.programado { background: #dbeafe; color: #1e40af; border: 1px solid #bfdbfe; }
    .status-badge.en-carga { background: #ffedd5; color: #9a3412; border: 1px solid #fed7aa; }

    .btn-primary { background: var(--primary); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
    .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
  `]
})
export class EmbarquesComponent {
  embarques = [
    { folioCarga: 'FC-8821', remisionSae: 'R-10254', cliente: 'Bimbo S.A. de C.V.', destino: 'Planta Azcapotzalco, CDMX', transporte: 'Logística Express', conductor: 'Manuel Ortega', placas: '562-ABC', estatus: 'Tránsito', fecha: new Date() },
    { folioCarga: 'FC-8822', remisionSae: 'R-10255', cliente: 'Walmart de México', destino: 'CEDIS Cuautitlán, EdoMex', transporte: 'Muebles y Mudanzas', conductor: 'Javier Ruíz', placas: '990-XYZ', estatus: 'Entregado', fecha: new Date() },
    { folioCarga: 'FC-8823', remisionSae: 'R-10256', cliente: 'Femsa Logística', destino: 'Planta Toluca, EdoMex', transporte: 'HiCone Logistics', conductor: 'Roberto S.', placas: '123-JKL', estatus: 'En Carga', fecha: new Date() },
    { folioCarga: 'FC-8824', remisionSae: 'R-10257', cliente: 'Nestlé México', destino: 'Planta Querétaro', transporte: 'Fletes del Bajío', conductor: 'Carlos M.', placas: '771-HJK', estatus: 'Programado', fecha: new Date() }
  ];
}
