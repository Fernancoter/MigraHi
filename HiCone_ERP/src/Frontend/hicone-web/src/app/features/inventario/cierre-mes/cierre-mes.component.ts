import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cierre-mes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container animate-fade-in">
      <div class="page-header-modern">
        <div class="header-info">
          <h1 class="page-title">Cierre de Mes</h1>
          <nav class="breadcrumb-modern">
            <span>Inventarios</span>
            <span class="separator">/</span>
            <span class="active">Cierre de Mes</span>
          </nav>
        </div>
        <div class="header-actions">
          <button class="btn-primary-modern">
            <span class="icon">➕</span> Nuevo Cierre
          </button>
        </div>
      </div>

      <div class="card-premium shadow-2xl">
        <div class="table-modern-container">
          <table class="table-modern">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha Cierre</th>
                <th>Usuario</th>
                <th>Observaciones</th>
                <th>Estado</th>
                <th class="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of data">
                <td><span class="badge-id">#{{item.id}}</span></td>
                <td>
                  <div class="date-box">
                    <span class="main-date">{{item.fecha}}</span>
                    <span class="sub-date">{{item.hora}}</span>
                  </div>
                </td>
                <td>{{item.usuario}}</td>
                <td>{{item.observaciones}}</td>
                <td>
                  <span class="status-pill" [class.status-active]="item.estado === 'Completado'">
                    {{item.estado}}
                  </span>
                </td>
                <td class="text-center">
                  <button class="btn-icon-modern" title="Ver Detalle">👁️</button>
                  <button class="btn-icon-modern" title="Imprimir Reporte">🖨️</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: 2rem; background: #f8fafc; min-height: calc(100vh - 64px); }
    .page-header-modern { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    .page-title { font-size: 1.875rem; font-weight: 800; color: #1e293b; margin: 0; }
    .breadcrumb-modern { display: flex; align-items: center; gap: 0.5rem; color: #64748b; font-size: 0.875rem; margin-top: 0.25rem; }
    .breadcrumb-modern .active { color: #166534; font-weight: 600; }
    
    .card-premium { background: white; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; }
    .table-modern-container { overflow-x: auto; }
    .table-modern { width: 100%; border-collapse: collapse; text-align: left; }
    .table-modern th { background: #f1f5f9; padding: 1rem 1.5rem; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #475569; letter-spacing: 0.05em; }
    .table-modern td { padding: 1.25rem 1.5rem; border-bottom: 1px solid #f1f5f9; color: #334155; font-size: 0.9rem; }
    .table-modern tr:hover { background: #f8fafc; }

    .badge-id { background: #e2e8f0; color: #475569; padding: 0.25rem 0.6rem; border-radius: 6px; font-family: monospace; font-weight: 600; }
    .date-box { display: flex; flex-direction: column; }
    .main-date { font-weight: 700; color: #1e293b; }
    .sub-date { font-size: 0.75rem; color: #64748b; }
    
    .status-pill { padding: 0.35rem 0.75rem; border-radius: 20px; font-size: 0.75rem; font-weight: 700; background: #fee2e2; color: #991b1b; }
    .status-active { background: #dcfce7; color: #166534; }

    .btn-primary-modern { background: #166534; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 10px; font-weight: 600; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.5rem; }
    .btn-primary-modern:hover { background: #14532d; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(22, 101, 52, 0.2); }
    
    .btn-icon-modern { background: transparent; border: none; font-size: 1.1rem; cursor: pointer; padding: 0.4rem; border-radius: 6px; transition: background 0.2s; }
    .btn-icon-modern:hover { background: #f1f5f9; }

    .animate-fade-in { animation: fadeIn 0.4s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class CierreMesComponent {
  data = [
    { id: 104, fecha: '23/04/2026', hora: '12:45 PM', usuario: 'Admin', observaciones: 'Cierre de producción turno matutino', estado: 'Completado' },
    { id: 103, fecha: '22/04/2026', hora: '11:30 PM', usuario: 'Sistema', observaciones: 'Reinicio automático de consecutivos', estado: 'Completado' },
    { id: 102, fecha: '21/04/2026', hora: '06:00 AM', usuario: 'Supervisor', observaciones: 'Cierre mensual consolidado', estado: 'Completado' }
  ];
}
