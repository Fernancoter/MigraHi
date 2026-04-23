import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduccionService, Palet, Bobina, Extrusion } from '../../../core/services/produccion';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-produccion-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="module-page animate-move-up">
      <header class="module-header">
        <div class="title-area">
          <nav class="breadcrumb">Producción > Extrusión</nav>
          <h1>📊 Tablero Directivo de Extrusión</h1>
          <p>Monitoreo de programación y operación en tiempo real.</p>
        </div>
      </header>

      <div class="production-dashboard-grid">
        <!-- TABLA DE PROGRAMACIÓN -->
        <div class="content-card">
          <div class="card-header">
            <h3>📅 Programación de Órdenes</h3>
            <span class="badge">Siguiente Turno</span>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Máquina</th>
                <th>Turno</th>
                <th>Producto</th>
                <th>Operador</th>
                <th class="text-right">Prog (kg)</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let p of programacion">
                <td>{{ p.fecha | date:'dd/MM/yyyy' }}</td>
                <td><strong>{{ p.maquina }}</strong></td>
                <td>{{ p.turno }}</td>
                <td>{{ p.producto }}</td>
                <td>{{ p.operador }}</td>
                <td class="text-right font-bold">{{ p.programado | number }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- TABLA DE OPERACIÓN -->
        <div class="content-card">
          <div class="card-header">
            <h3>🏗️ Extrusoras en Operación</h3>
            <span class="badge live">En Vivo</span>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Estado</th>
                <th>Máquina</th>
                <th>Producto</th>
                <th>Operador</th>
                <th class="text-right">Producido</th>
                <th class="text-right">Paros (min)</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let o of operacion">
                <td>
                  <span class="status-dot" [class.active]="o.enCurso"></span>
                  {{ o.enCurso ? 'Trabajando' : 'Detenido' }}
                </td>
                <td><strong>{{ o.maquina }}</strong></td>
                <td>{{ o.producto }}</td>
                <td>{{ o.operador }}</td>
                <td class="text-right">{{ o.producido | number }} bobinas</td>
                <td class="text-right">{{ o.tInterrupcion | number }}</td>
                <td><code class="id-tag">{{ o.id }}</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .module-page { padding: 1.5rem 2.5rem; }
    .breadcrumb { font-size: 0.75rem; color: #94a3b8; margin-bottom: 0.5rem; font-weight: 600; text-transform: uppercase; }
    .module-header { margin-bottom: 2rem; }
    h1 { font-size: 1.8rem; font-weight: 800; color: #1e293b; margin: 0; }
    
    .production-dashboard-grid { display: flex; flex-direction: column; gap: 2rem; }
    
    .content-card { background: white; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
    .card-header { padding: 1rem 1.5rem; background: #f8fafc; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
    .card-header h3 { margin: 0; font-size: 1rem; color: #1e293b; }
    
    .badge { padding: 0.25rem 0.6rem; border-radius: 4px; font-size: 0.7rem; font-weight: 700; background: #e2e8f0; color: #475569; }
    .badge.live { background: #dcfce7; color: #166534; }
    
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th { text-align: left; padding: 1rem; background: #f8fafc; color: #64748b; font-size: 0.75rem; font-weight: 700; border-bottom: 1px solid #e2e8f0; }
    .data-table td { padding: 1rem; border-bottom: 1px solid #f1f5f9; font-size: 0.85rem; }
    
    .status-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; background: #cbd5e1; margin-right: 0.5rem; }
    .status-dot.active { background: #22c55e; }
    
    .id-tag { background: #f1f5f9; padding: 0.2rem 0.4rem; border-radius: 4px; color: #64748b; font-size: 0.75rem; }
    .text-right { text-align: right; }
    .font-bold { font-weight: 700; }
  `]
})
export class ProduccionListComponent implements OnInit {
  private produccionService = inject(ProduccionService);
  
  programacion = [
    { fecha: new Date(), maquina: 'Extrusora 1', turno: '1er Turno', producto: '8023-A', operador: 'JUAN PEREZ', programado: 1500 },
    { fecha: new Date(), maquina: 'Extrusora 3', turno: '1er Turno', producto: '74757', operador: 'MARCOS ALVARO', programado: 2200 },
    { fecha: new Date(), maquina: 'Extrusora 5', turno: '2do Turno', producto: 'B-200', operador: 'CARLOS RUIZ', programado: 800 }
  ];

  operacion = [
    { id: 22320, maquina: 'Extrusora 1', turno: '3er Turno', producto: '74757', operador: 'LUIS CESAR OROPEZA', producido: 4, tInterrupcion: 0, enCurso: true },
    { id: 22245, maquina: 'Extrusora 2', turno: '2do Turno', producto: '8063C2', operador: 'DIEGO OLVERA CASTRO', producido: 6, tInterrupcion: 331, enCurso: true },
    { id: 22224, maquina: 'Extrusora 3', turno: '2do Turno', producto: '74757', operador: 'GUSTAVO ZARRAGA', producido: 6, tInterrupcion: 0, enCurso: true }
  ];

  ngOnInit() {}
}
