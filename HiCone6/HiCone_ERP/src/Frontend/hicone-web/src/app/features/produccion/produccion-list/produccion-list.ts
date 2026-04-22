import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduccionService, Palet, Bobina } from '../../../core/services/produccion';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-produccion-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container animate-fade-in">
      <header class="page-header">
        <div class="header-main">
          <h1 class="page-title">Módulo de Producción</h1>
          <p class="page-subtitle">Control de manufactura de Bobinas y ensamble de Palets.</p>
        </div>
        <div class="header-actions">
          <button class="btn-outline">🛠️ Configuración</button>
          <button class="btn-primary">⚡ Nuevo Registro</button>
        </div>
      </header>

      <div class="production-grid">
        <section class="main-column">
          <div class="card glass">
            <div class="card-header">
              <h2>Palets en Proceso</h2>
              <span class="badge">Activos</span>
            </div>
            
            <div class="palet-list">
              <div class="palet-item" *ngFor="let p of (palets$ | async)">
                <div class="palet-preview">
                  <div class="palet-icon">📦</div>
                  <div class="palet-info">
                    <span class="palet-code">{{ p.codigo }}</span>
                    <span class="palet-type">{{ p.tipo }}</span>
                  </div>
                </div>
                <div class="palet-stats">
                  <div class="stat">
                    <span class="label">Bobinas</span>
                    <span class="value">{{ p.bobinas?.length || 0 }}</span>
                  </div>
                  <div class="stat">
                    <span class="label">Estado</span>
                    <span class="status-chip" [class.active]="p.estado === 'En Proceso'">
                      {{ p.estado }}
                    </span>
                  </div>
                </div>
                <div class="palet-time">
                  <span class="time-label">Inicio Ensamble</span>
                  <span class="time-value">{{ (p.horaInicioEnsamble | date:'HH:mm') || '--:--' }}</span>
                </div>
              </div>
              <div *ngIf="!(palets$ | async)?.length" class="empty-msg">
                No hay palets en proceso de ensamble.
              </div>
            </div>
          </div>
        </section>

        <aside class="side-column">
          <div class="card dark">
            <div class="card-header">
              <h3>Últimas Bobinas</h3>
              <button class="text-btn">Ver todas</button>
            </div>
            <div class="bobina-feed">
              <div class="bobina-card" *ngFor="let b of (bobinas$ | async)">
                <div class="bobina-head">
                  <span class="bobina-code">{{ b.codigo }}</span>
                  <span class="bobina-time">{{ b.fechaProduccion | date:'shortTime' }}</span>
                </div>
                <div class="bobina-body">
                  <div class="metric">
                    <span class="unit">Peso</span>
                    <span class="amount">{{ b.pesoNeto }}kg</span>
                  </div>
                  <div class="metric">
                    <span class="unit">Metros</span>
                    <span class="amount">{{ b.metros }}m</span>
                  </div>
                </div>
                <div class="bobina-footer">
                  <span class="tag">Turno: {{ b.turno }}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  `,
  styles: [`
    .production-grid {
      display: grid;
      grid-template-columns: 1fr 340px;
      gap: 1.5rem;
    }

    .page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem; }
    .page-title { font-size: 1.85rem; margin-bottom: 0.25rem; }
    .page-subtitle { color: var(--text-muted); }

    .header-actions { display: flex; gap: 0.75rem; }
    .btn-primary { 
      background: var(--primary); color: white; border: none; padding: 0.75rem 1.5rem; 
      border-radius: var(--radius-md); font-weight: 600; cursor: pointer;
    }
    .btn-outline { 
      background: transparent; border: 1px solid var(--border-color); padding: 0.75rem 1.5rem; 
      border-radius: var(--radius-md); color: var(--text-main); font-weight: 600; cursor: pointer;
    }

    .card { border-radius: var(--radius-lg); padding: 1.5rem; border: 1px solid var(--border-color); }
    .card.dark { background: #1e293b; color: white; border: none; }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
    .card-header h2, .card-header h3 { margin: 0; font-size: 1.25rem; }

    .palet-item {
      display: flex; justify-content: space-between; align-items: center;
      padding: 1.25rem; border-bottom: 1px solid rgba(0,0,0,0.05);
      transition: background 0.2s; cursor: pointer;
    }
    .palet-item:hover { background: rgba(0,0,0,0.02); }
    .palet-item:last-child { border-bottom: none; }

    .palet-preview { display: flex; align-items: center; gap: 1rem; }
    .palet-icon { font-size: 1.5rem; background: #eff6ff; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; border-radius: 10px; }
    .palet-info { display: flex; flex-direction: column; }
    .palet-code { font-weight: 700; color: var(--text-main); }
    .palet-type { font-size: 0.8rem; color: var(--text-muted); }

    .palet-stats { display: flex; gap: 2rem; }
    .stat { display: flex; flex-direction: column; }
    .stat .label { font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; }
    .stat .value { font-weight: 700; }

    .status-chip { font-size: 0.75rem; padding: 0.25rem 0.6rem; border-radius: 20px; background: #f1f5f9; color: #64748b; font-weight: 700; }
    .status-chip.active { background: #dcfce7; color: #166534; }

    .palet-time { text-align: right; border-left: 1px solid var(--border-color); padding-left: 1.5rem; }
    .time-label { display: block; font-size: 0.75rem; color: var(--text-muted); }
    .time-value { font-weight: 700; font-family: monospace; }

    .bobina-feed { display: flex; flex-direction: column; gap: 1rem; }
    .bobina-card { background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 12px; }
    .bobina-head { display: flex; justify-content: space-between; margin-bottom: 0.75rem; }
    .bobina-code { font-weight: 700; color: #94a3b8; }
    .bobina-time { font-size: 0.75rem; opacity: 0.6; }
    .bobina-body { display: flex; gap: 1rem; margin-bottom: 0.75rem; }
    .metric { display: flex; flex-direction: column; flex: 1; }
    .unit { font-size: 0.7rem; opacity: 0.6; text-transform: uppercase; }
    .amount { font-weight: 700; font-size: 1.1rem; }
    .bobina-footer { font-size: 0.75rem; }
    .tag { background: rgba(255,255,255,0.1); padding: 0.2rem 0.5rem; border-radius: 4px; }

    .empty-msg { padding: 4rem; text-align: center; color: var(--text-muted); }
  `]
})
export class ProduccionListComponent implements OnInit {
  private produccionService = inject(ProduccionService);
  palets$!: Observable<Palet[]>;
  bobinas$!: Observable<Bobina[]>;

  ngOnInit() {
    this.palets$ = this.produccionService.getPalets();
    this.bobinas$ = this.produccionService.getBobinas();
  }
}
