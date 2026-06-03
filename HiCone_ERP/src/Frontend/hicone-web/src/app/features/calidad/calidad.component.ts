import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalidadService, Reclamo } from '../../core/services/calidad';

@Component({
  selector: 'app-calidad',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
          <span class="value">{{ reclamos.length }}</span>
          <p class="box-note">Requieren revisión inmediata</p>
        </div>
        <!-- BUSCADOR DE TRAZABILIDAD -->
        <div class="metric-box box-search">
          <span class="label">🔍 Consulta de Trazabilidad</span>
          <div class="search-input-group">
            <input type="text" [(ngModel)]="searchNoSerie" placeholder="Ingrese No. Serie..." (keyup.enter)="consultarTrazabilidad()">
            <button (click)="consultarTrazabilidad()">Ir</button>
          </div>
        </div>
      </div>

      <div class="grid-layout">
        <!-- RESULTADO TRAZABILIDAD -->
        <div class="content-card full-width animate-fade-in" *ngIf="trazabilidad">
          <div class="card-header traz-header">
            <h3>🧬 Genealogía del Producto: {{ searchNoSerie }}</h3>
            <button class="btn-close" (click)="trazabilidad = null">✕</button>
          </div>
          <div class="traz-body">
            <div class="traz-step">
              <div class="step-icon">📦</div>
              <div class="step-info">
                <h4>CARRETE</h4>
                <p><strong>Serie:</strong> {{ trazabilidad.carrete.noSerie }}</p>
                <p><strong>Línea:</strong> {{ trazabilidad.carrete.noLinea }}</p>
                <p><strong>Estado:</strong> <span class="badge" [class.badge-success]="trazabilidad.carrete.estado === 'Terminado'">{{ trazabilidad.carrete.estado }}</span></p>
              </div>
            </div>
            <div class="traz-arrow">➜</div>
            <div class="traz-step">
              <div class="step-icon">⚙️</div>
              <div class="step-info">
                <h4>PRENSADO</h4>
                <p><strong>Máquina:</strong> {{ trazabilidad.prensado.prensa }}</p>
                <p><strong>Operador:</strong> {{ trazabilidad.prensado.operario }}</p>
                <p><strong>Fecha:</strong> {{ trazabilidad.prensado.fecha | date:'medium' }}</p>
                <p><strong>Carrera:</strong> #{{ trazabilidad.prensado.carreraNo }}</p>
              </div>
            </div>
            <div class="traz-arrow">➜</div>
            <div class="traz-step" *ngIf="trazabilidad.extrusion">
              <div class="step-icon">🏗️</div>
              <div class="step-info">
                <h4>EXTRUSIÓN</h4>
                <p><strong>Máquina:</strong> {{ trazabilidad.extrusion.extrusora }}</p>
                <p><strong>Operador:</strong> {{ trazabilidad.extrusion.operario }}</p>
                <p><strong>Fecha:</strong> {{ trazabilidad.extrusion.fecha | date:'medium' }}</p>
                <p><strong>Bobina:</strong> #{{ trazabilidad.extrusion.bobinaNo }} ({{ trazabilidad.extrusion.pesoBobina }} kg)</p>
              </div>
            </div>
          </div>
        </div>

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
                <span class="reclaim-folio">{{ r.codigo }}</span>
                <span class="reclaim-priority alta">{{ r.estatus }}</span>
              </div>
              <p class="reclaim-client">{{ r.cliente }}</p>
              <p class="reclaim-desc">{{ r.descripcion }}</p>
              <span class="reclaim-date">{{ r.fecha | date:'dd/MM/yyyy' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .metric-box.box-primary { border-left: 4px solid #1e293b; }
    .metric-box.box-danger { border-left: 4px solid #ef4444; }
    .metric-box.box-search { background: #f1f5f9; border-left: 4px solid #3b82f6; }
    
    .search-input-group { display: flex; gap: 0.5rem; margin-top: 0.5rem; }
    .search-input-group input { flex: 1; padding: 0.5rem; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 0.8rem; }
    .search-input-group button { background: #3b82f6; color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; font-weight: 700; cursor: pointer; }

    .traz-header { background: #1e293b; color: white; display: flex; justify-content: space-between; align-items: center; }
    .traz-body { padding: 2rem; display: flex; align-items: center; gap: 1.5rem; background: #f8fafc; }
    .traz-step { background: white; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; flex: 1; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
    .step-icon { font-size: 2rem; margin-bottom: 0.5rem; }
    .step-info h4 { margin: 0 0 0.5rem 0; font-size: 0.75rem; color: #64748b; letter-spacing: 1px; }
    .step-info p { margin: 0.2rem 0; font-size: 0.85rem; color: #1e293b; }
    .traz-arrow { font-size: 1.5rem; color: #cbd5e1; }

    .btn-close { background: transparent; border: none; color: white; font-size: 1.2rem; cursor: pointer; opacity: 0.6; }
    .btn-close:hover { opacity: 1; }

    .grid-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; }
    .full-width { grid-column: span 2; }
    
    .badge-success { background: #dcfce7; color: #15803d; }
  `],
  providers: [CommonModule]
})
export class CalidadComponent implements OnInit {
  private calidadService = inject(CalidadService);
  
  inspecciones: any[] = [];
  reclamos: Reclamo[] = [];
  searchNoSerie = '';
  trazabilidad: any = null;

  ngOnInit() {
    this.loadReclamos();
  }

  loadReclamos() {
    this.calidadService.getReclamosActivos().subscribe(data => this.reclamos = data);
  }

  consultarTrazabilidad() {
    if (!this.searchNoSerie) return;
    this.calidadService.getTrazabilidad(this.searchNoSerie).subscribe({
      next: (data) => this.trazabilidad = data,
      error: () => {
        alert('No se encontró trazabilidad para este número de serie.');
        this.trazabilidad = null;
      }
    });
  }
}

