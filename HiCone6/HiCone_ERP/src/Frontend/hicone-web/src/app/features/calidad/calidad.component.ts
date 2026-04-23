import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calidad',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="module-page animate-fade-in">
      <header class="module-header">
        <div class="title-area">
          <h1>✅ Control de Calidad</h1>
          <p>Gestión de inspecciones y pruebas de producto terminado</p>
        </div>
        <div class="actions">
          <button class="btn btn-primary">+ Nueva Inspección</button>
        </div>
      </header>

      <div class="metrics-row">
        <div class="metric-box box-primary">
          <span class="label">Tasa de Aprobación</span>
          <span class="value">98.5%</span>
          <div class="progress-bar"><div class="progress" style="width: 98.5%"></div></div>
        </div>
        <div class="metric-box box-danger">
          <span class="label">Reclamos DP Pendientes</span>
          <span class="value">3</span>
          <p class="box-note">Requieren revisión inmediata</p>
        </div>
      </div>

      <div class="grid-layout">
        <div class="content-card">
          <div class="card-header">
            <h3>🔍 Inspecciones Recientes</h3>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Folio</th>
                <th>Producto / Lote</th>
                <th>Inspector</th>
                <th>Resultado</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let i of inspecciones">
                <td>{{ i.folio }}</td>
                <td class="bold">{{ i.lote }}</td>
                <td>{{ i.inspector }}</td>
                <td>
                  <span class="result-badge" [class]="i.resultado.toLowerCase()">
                    {{ i.resultado }}
                  </span>
                </td>
                <td>{{ i.fecha | date:'dd/MM/yyyy' }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="content-card thin">
          <div class="card-header">
            <h3>❗ Reclamos Producto DP</h3>
          </div>
          <div class="reclaim-list">
            <div class="reclaim-item" *ngFor="let r of reclamos">
              <div class="reclaim-top">
                <span class="reclaim-folio">{{ r.folio }}</span>
                <span class="reclaim-priority" [class]="r.prioridad.toLowerCase()">{{ r.prioridad }}</span>
              </div>
              <p class="reclaim-client">{{ r.cliente }}</p>
              <p class="reclaim-desc">{{ r.descripcion }}</p>
              <span class="reclaim-date">{{ r.fecha | date:'shortDate' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .metric-box.box-primary { border-left: 4px solid var(--primary); }
    .metric-box.box-danger { border-left: 4px solid #ef4444; }
    .box-note { font-size: 0.75rem; color: #64748b; margin-top: 0.5rem; }

    .grid-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; }
    .card-header { padding: 1rem; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; }
    .card-header h3 { font-size: 1rem; font-weight: 700; color: var(--text-main); margin: 0; }

    .content-card.thin { background: #f8fafc; }
    .reclaim-list { padding: 1rem; display: flex; flex-direction: column; gap: 1rem; }
    .reclaim-item { background: white; padding: 1rem; border-radius: 6px; border: 1px solid var(--border-color); box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
    .reclaim-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
    .reclaim-folio { font-weight: 700; color: var(--primary); font-size: 0.8rem; }
    .reclaim-priority { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; padding: 0.125rem 0.4rem; border-radius: 4px; }
    .reclaim-priority.alta { background: #fee2e2; color: #b91c1c; }
    .reclaim-priority.media { background: #fef9c3; color: #854d0e; }
    
    .reclaim-client { font-weight: 600; font-size: 0.875rem; margin: 0; color: var(--text-main); }
    .reclaim-desc { font-size: 0.75rem; color: var(--text-muted); margin: 0.25rem 0; line-height: 1.4; }
    .reclaim-date { font-size: 0.7rem; color: #94a3b8; }

    .btn-primary { background: var(--primary); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer; font-weight: 600; transition: all 0.2s; }
    .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
  `]
})
export class CalidadComponent {
  inspecciones = [
    { folio: 'QC-8821', lote: 'LOTE-EXT-2024-001', inspector: 'Ana Torres', resultado: 'Aprobado', fecha: new Date() },
    { folio: 'QC-8822', lote: 'LOTE-EXT-2024-002', inspector: 'Carlos M.', resultado: 'Rechazado', fecha: new Date() },
    { folio: 'QC-8823', lote: 'LOTE-PRE-2024-015', inspector: 'Ana Torres', resultado: 'Aprobado', fecha: new Date() }
  ];

  reclamos = [
    { folio: 'REC-001', cliente: 'Bimbo México', descripcion: 'Espesor fuera de rango en bobinas de 4 pulgadas', prioridad: 'Alta', fecha: new Date() },
    { folio: 'REC-002', cliente: 'Walmart CEDIS', descripcion: 'Palet con flejado suelto en llegada', prioridad: 'Media', fecha: new Date() },
    { folio: 'REC-003', cliente: 'Nestlé', descripcion: 'Bobina con núcleo dañado', prioridad: 'Alta', fecha: new Date() }
  ];
}
