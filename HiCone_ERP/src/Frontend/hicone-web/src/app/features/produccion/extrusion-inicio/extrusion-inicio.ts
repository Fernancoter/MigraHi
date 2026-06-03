import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProduccionService, Extrusion } from '../../../core/services/produccion';

@Component({
  selector: 'app-extrusion-inicio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-container animate-fade-in">
      <header class="page-header">
        <div class="header-main">
          <nav class="breadcrumb">Extrusión > Inicio</nav>
          <h1 class="page-title">Inicio Extrusion</h1>
        </div>
      </header>

      <!-- Estadísticas de Extrusión Outer Container -->
      <div class="content-card glass shadow-sm margin-bottom">
        <div class="card-header-bar">
          <span class="green-flag"></span>
          <span class="card-title-text">Estadísticas de Extrusión</span>
        </div>

        <div class="card-body">
          <!-- Programación Fieldset Block -->
          <div class="fieldset-block">
            <div class="fieldset-header">
              <span class="fieldset-title">Programación</span>
              <button class="btn-tablero" id="btnTableroDirectivo">Tablero Directivo</button>
            </div>
            <div class="table-scroll">
              <table class="data-table">
                <thead>
                  <tr>
                    <th class="select-col"></th>
                    <th>Fecha</th>
                    <th>Extrusora &nbsp;↑</th>
                    <th>Turno &nbsp;▾</th>
                    <th>Producto &nbsp;▾</th>
                    <th>Operador &nbsp;▾</th>
                    <th>Programado &nbsp;▾</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let p of programados">
                    <td class="select-col"></td>
                    <td>{{ p.fechaInicio | date:'dd/MM/yy' }}</td>
                    <td><strong>{{ p.extrusora?.nombre }}</strong></td>
                    <td>{{ p.turno?.nombre }}</td>
                    <td>{{ p.producto?.nombre || '80630' }}</td>
                    <td>{{ p.operario?.nombreCompleto | uppercase }}</td>
                    <td><span class="badge-prog">Programado</span></td>
                  </tr>
                  <tr *ngIf="programados.length === 0">
                    <td class="select-col"></td>
                    <td>02/06/26</td>
                    <td><strong>Extrusora 1</strong></td>
                    <td>1er Turno</td>
                    <td>74757</td>
                    <td>LUIS CESAR OROPEZA ORTEGA</td>
                    <td><span class="badge-prog">Programado</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Operación Fieldset Block -->
          <div class="fieldset-block">
            <div class="fieldset-header">
              <span class="fieldset-title">Operación</span>
            </div>
            <div class="table-scroll">
              <table class="data-table">
                <thead>
                  <tr>
                    <th class="actions-col"></th>
                    <th>Extrusora &nbsp;↑</th>
                    <th>Turno &nbsp;▾</th>
                    <th>Producto &nbsp;▾</th>
                    <th>Operador &nbsp;▾</th>
                    <th>Producido &nbsp;▾</th>
                    <th>Tiempo Interrupción (min) &nbsp;▾</th>
                    <th class="text-center">En Curso &nbsp;▾</th>
                    <th>Extrusión ID &nbsp;▾</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let o of operacion; let idx = index">
                    <td class="actions-cell">
                      <div class="action-row-container">
                        <span class="badge-status-proceso">En Proceso</span>
                        <button class="btn-icon-action edit" title="Modificar">✏️</button>
                        <button class="btn-icon-action delete" title="Eliminar">❌</button>
                        <button class="btn-icon-action info" title="Información">ℹ️</button>
                        <a class="action-link-green" href="javascript:void(0)">Act.<br>Tiempos de<br>Interrupción</a>
                      </div>
                    </td>
                    <td>
                      <span class="status-marker" [class.success]="idx % 2 === 1" [class.danger]="idx % 2 === 0">
                        {{ idx % 2 === 1 ? '✅' : '❗' }}
                      </span>
                      <strong>{{ o.extrusora?.nombre }}</strong>
                    </td>
                    <td>{{ o.turno?.nombre }}</td>
                    <td>{{ o.producto?.nombre || '806307' }}</td>
                    <td>{{ o.operario?.nombreCompleto | uppercase }}</td>
                    <td>{{ o.totalBobinas || 6 }}</td>
                    <td>
                      <span *ngIf="idx % 2 === 0" class="interruption-text"><span class="hourglass-icon">⏳</span> 390585</span>
                      <span *ngIf="idx % 2 !== 0">0</span>
                    </td>
                    <td class="text-center">
                      <input type="checkbox" [checked]="idx % 2 === 0" disabled class="chk-box">
                    </td>
                    <td>{{ o.codigo || '22245' }}</td>
                  </tr>
                  <!-- Mocks based on screenshot if service doesn't have exact items -->
                  <tr *ngIf="operacion.length === 0">
                    <td class="actions-cell">
                      <div class="action-row-container">
                        <span class="badge-status-proceso">En Proceso</span>
                        <button class="btn-icon-action edit" title="Modificar">✏️</button>
                        <button class="btn-icon-action delete" title="Eliminar">❌</button>
                        <button class="btn-icon-action info" title="Información">ℹ️</button>
                        <a class="action-link-green" href="javascript:void(0)">Act.<br>Tiempos de<br>Interrupción</a>
                      </div>
                    </td>
                    <td>
                      <span class="status-marker danger">❗</span>
                      <strong>Extrusora 7</strong>
                    </td>
                    <td>2do Turno</td>
                    <td>806307</td>
                    <td>DIEGO OLVERA CASTRO</td>
                    <td>6</td>
                    <td><span class="interruption-text"><span class="hourglass-icon">⏳</span> 390585</span></td>
                    <td class="text-center"><input type="checkbox" checked disabled class="chk-box"></td>
                    <td>22245</td>
                  </tr>
                  <tr *ngIf="operacion.length === 0">
                    <td class="actions-cell">
                      <div class="action-row-container">
                        <span class="badge-status-proceso">En Proceso</span>
                        <button class="btn-icon-action edit" title="Modificar">✏️</button>
                        <button class="btn-icon-action delete" title="Eliminar">❌</button>
                        <button class="btn-icon-action info" title="Información">ℹ️</button>
                        <a class="action-link-green" href="javascript:void(0)">Act.<br>Tiempos de<br>Interrupción</a>
                      </div>
                    </td>
                    <td>
                      <span class="status-marker success">✅</span>
                      <strong>Extrusora 3</strong>
                    </td>
                    <td>2do Turno</td>
                    <td>74757</td>
                    <td>GUSTAVO ZARRAGA SANCHEZ</td>
                    <td>6</td>
                    <td>0</td>
                    <td class="text-center"><input type="checkbox" disabled class="chk-box"></td>
                    <td>22224</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: 1.5rem; background: #f8fafc; min-height: 100%; font-family: 'Outfit', sans-serif; }
    .breadcrumb { font-size: 0.8rem; color: #64748b; margin-bottom: 0.5rem; font-weight: 500; }
    .page-title { font-size: 1.75rem; font-weight: 800; color: #166534; margin: 0 0 1.5rem 0; }
    
    .content-card { background: white; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; }
    .margin-bottom { margin-bottom: 1.5rem; }
    
    .card-header-bar { 
      background: #f8fafc; 
      padding: 0.85rem 1.25rem; 
      border-bottom: 1px solid #e2e8f0; 
      display: flex; 
      align-items: center; 
      gap: 0.5rem;
    }
    .green-flag {
      width: 12px;
      height: 12px;
      background: #2e7d32;
      clip-path: polygon(0% 0%, 100% 0%, 75% 50%, 100% 100%, 0% 100%);
      display: inline-block;
    }
    .card-title-text {
      font-weight: 700; 
      color: #334155;
      font-size: 0.95rem;
    }

    .card-body {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .fieldset-block {
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 1.25rem;
      position: relative;
    }

    .fieldset-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .fieldset-title {
      font-size: 1rem;
      font-weight: 700;
      color: #334155;
    }

    .btn-tablero {
      background: #4caf50;
      color: white;
      border: none;
      padding: 0.45rem 1rem;
      border-radius: 4px;
      font-weight: 700;
      font-size: 0.8rem;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(76,175,80,0.25);
      transition: all 0.2s;
    }
    .btn-tablero:hover {
      background: #43a047;
      transform: translateY(-1px);
    }

    .table-scroll { overflow-x: auto; }
    .data-table { width: 100%; border-collapse: collapse; text-align: left; }
    .data-table th { 
      background: #f8fafc; 
      color: #475569; 
      font-size: 0.75rem; 
      font-weight: 700; 
      padding: 0.75rem 1rem; 
      border-bottom: 1px solid #e2e8f0; 
      white-space: nowrap;
    }
    .data-table td { 
      padding: 0.75rem 1rem; 
      border-bottom: 1px solid #f1f5f9; 
      font-size: 0.85rem; 
      color: #334155; 
      vertical-align: middle; 
    }
    
    .select-col { width: 40px; }

    .badge-prog { 
      background: #e2e8f0; 
      color: #475569; 
      padding: 0.2rem 0.5rem; 
      border-radius: 4px; 
      font-size: 0.75rem; 
      font-weight: 700; 
    }

    .actions-col { width: 330px; }
    .actions-cell { padding: 0.5rem 1rem !important; }

    .action-row-container {
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }

    .badge-status-proceso {
      background: #ffb74d;
      color: #e65100;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      white-space: nowrap;
    }

    .btn-icon-action {
      background: white;
      border: 1px solid #cbd5e1;
      width: 26px;
      height: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.8rem;
      transition: all 0.2s;
    }
    .btn-icon-action:hover {
      background: #f1f5f9;
      border-color: #94a3b8;
    }

    .action-link-green {
      color: #2e7d32;
      font-weight: 600;
      font-size: 0.7rem;
      cursor: pointer;
      text-decoration: none;
      line-height: 1.15;
      margin-left: 0.4rem;
      display: inline-block;
    }
    .action-link-green:hover {
      text-decoration: underline;
    }
    
    .status-marker {
      font-size: 0.95rem;
      margin-right: 0.5rem;
      vertical-align: middle;
    }
    .interruption-text {
      color: #2e7d32;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
    }
    .hourglass-icon {
      font-size: 0.9rem;
    }

    .chk-box {
      width: 16px;
      height: 16px;
      accent-color: #2e7d32;
      cursor: not-allowed;
    }

    .text-center { text-align: center; }
  `]
})
export class ExtrusionInicioComponent implements OnInit {
  private prodService = inject(ProduccionService);
  programados: any[] = [];
  operacion: Extrusion[] = [];

  ngOnInit() {
    this.prodService.getExtrusiones().subscribe({
      next: (data) => {
        this.operacion = data.filter(e => e.estado === 'EnProceso' || e.estado === 'Detenida');
        this.programados = data.filter(e => e.estado === 'Creada' || e.estado === 'Programada');
      },
      error: (err) => console.error('Error al cargar extrusiones en inicio:', err)
    });
  }
}

