import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduccionService, Extrusora } from '../../../core/services/produccion';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-turnos-semana',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container animate-fade-in">
      <header class="page-header">
        <div class="header-main">
          <nav class="breadcrumb">Extrusión > Turnos Por Semana</nav>
          <h1 class="page-title">Turnos Por Semana Extrusoras</h1>
        </div>
      </header>

      <div class="content-card glass shadow-sm">
        <div class="card-header-bar">
          <span class="green-flag-icon"></span>
          <span class="header-title">Extrusoras</span>
        </div>
        
        <div class="inner-padding">
          <!-- Alerta de inicio de semana -->
          <div class="info-alert-box-legacy">
            <span class="legacy-alert-icon">🟢</span>
            <span class="alert-text">Seleccione el inicio de semana para generar la plantilla de turnos</span>
          </div>

          <!-- Filtros de arrastre simulados de GeneXus -->
          <div class="drag-filters-box-legacy">
            <div class="drag-title">
              <span class="hamburger-menu-icon">☰</span>
              Arrastre los filtros aquí
            </div>
            <div class="filter-pills-legacy">
              <span class="filter-pill-blue">Producto</span>
              <span class="filter-pill-blue">Extrusora</span>
              <span class="filter-pill-blue">Programado</span>
              <span class="filter-pill-blue">Fabricado</span>
              <span class="filter-pill-blue">Diferencia</span>
            </div>
          </div>

          <!-- Controles de fecha -->
          <div class="date-controls-grid">
            <div class="control-group">
              <label class="control-label">Fecha Inicio *</label>
              <div class="input-wrapper">
                <input type="date" [(ngModel)]="fechaInicio" class="form-input-legacy">
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Fecha Fin *</label>
              <div class="input-wrapper">
                <input type="date" [(ngModel)]="fechaFin" class="form-input-legacy">
              </div>
            </div>
          </div>

          <button class="btn-legacy-submit" (click)="consultarTurnos()">PROGRAMAR O CONSULTAR</button>

          <!-- Tabs de Extrusoras -->
          <div class="tabs-container-legacy">
            <div class="tabs-header-legacy">
              <button *ngFor="let ext of extrusoras; let i = index" 
                      class="tab-link-legacy" 
                      [class.active]="selectedTabIndex === i"
                      (click)="selectedTabIndex = i">
                {{ ext.nombre }}
              </button>
              <button *ngIf="extrusoras.length === 0" class="tab-link-legacy active">Extrusora 1</button>
              <button *ngIf="extrusoras.length === 0" class="tab-link-legacy">Extrusora 2</button>
              <button *ngIf="extrusoras.length === 0" class="tab-link-legacy">Extrusora 3</button>
            </div>
            <div class="tab-body-legacy">
              <div class="tab-pane-content" *ngIf="extrusoras.length > 0">
                <h3 class="template-title">Plantilla de Turnos para {{ extrusoras[selectedTabIndex].nombre }}</h3>
                <p class="empty-state-msg">No hay registros de programación cargados para el rango de fechas seleccionado.</p>
              </div>
              <div *ngIf="extrusoras.length === 0" class="tab-pane-content">
                <h3 class="template-title">Plantilla de Turnos para Extrusora 1</h3>
                <p class="empty-state-msg">No hay registros de programación cargados para el rango de fechas seleccionado.</p>
              </div>
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

    .content-card { background: white; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden; }
    
    .card-header-bar { 
      background: #f8fafc; 
      padding: 0.85rem 1.25rem; 
      border-bottom: 1px solid #cbd5e1; 
      display: flex; 
      align-items: center; 
      gap: 0.5rem;
    }
    .green-flag-icon {
      width: 12px;
      height: 12px;
      background: #2e7d32;
      clip-path: polygon(0% 0%, 100% 0%, 75% 50%, 100% 100%, 0% 100%);
      display: inline-block;
    }
    .header-title {
      font-weight: 700; 
      color: #2e7d32;
      font-size: 0.95rem;
    }
    
    .inner-padding { padding: 1.5rem; }

    .info-alert-box-legacy { 
      display: flex; 
      align-items: center; 
      gap: 0.75rem; 
      background: #ffffff; 
      border: 1px solid #cbd5e1; 
      border-radius: 4px; 
      padding: 0.85rem 1.25rem; 
      margin-bottom: 1.5rem; 
    }
    .legacy-alert-icon { font-size: 0.9rem; }
    .alert-text { font-size: 0.85rem; color: #334155; font-weight: 600; }

    .drag-filters-box-legacy { 
      background: #eceff1; 
      border: 1px dashed #b0bec5; 
      border-radius: 4px; 
      padding: 1rem; 
      margin-bottom: 1.5rem; 
    }
    .drag-title { 
      font-size: 0.75rem; 
      color: #475569; 
      font-weight: 700; 
      margin-bottom: 0.75rem; 
      display: flex; 
      align-items: center; 
      gap: 0.35rem; 
    }
    .hamburger-menu-icon { font-size: 0.95rem; color: #475569; }
    .filter-pills-legacy { display: flex; gap: 0.5rem; flex-wrap: wrap; }
    .filter-pill-blue { 
      background: #1e3f66; 
      color: white; 
      padding: 0.35rem 0.85rem; 
      border-radius: 2px; 
      font-size: 0.8rem; 
      font-weight: 700; 
      box-shadow: 0 1px 3px rgba(0,0,0,0.15); 
    }

    .date-controls-grid { 
      display: grid; 
      grid-template-columns: repeat(2, 1fr); 
      gap: 1.5rem; 
      max-width: 600px; 
      margin-bottom: 1.5rem; 
    }
    .control-group { display: flex; flex-direction: column; gap: 0.35rem; }
    .control-label { font-size: 0.8rem; font-weight: 700; color: #334155; }
    
    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }
    .form-input-legacy { 
      width: 100%;
      border: 1px solid #cbd5e1; 
      border-radius: 4px; 
      padding: 0.5rem; 
      font-size: 0.85rem; 
      outline: none; 
      font-family: inherit;
    }

    .btn-legacy-submit { 
      background: #4caf50; 
      color: white; 
      border: none; 
      padding: 0.65rem 1.5rem; 
      border-radius: 4px; 
      font-weight: 700; 
      font-size: 0.85rem; 
      cursor: pointer; 
      box-shadow: 0 2px 4px rgba(76,175,80,0.25); 
      transition: background 0.2s; 
    }
    .btn-legacy-submit:hover { background: #43a047; }

    .tabs-container-legacy { 
      margin-top: 2rem; 
      border: 1px solid #cbd5e1; 
      border-radius: 4px; 
      overflow: hidden; 
    }
    .tabs-header-legacy { 
      display: flex; 
      background: #f8fafc; 
      border-bottom: 1px solid #cbd5e1; 
    }
    .tab-link-legacy { 
      background: transparent; 
      border: none; 
      padding: 0.85rem 1.5rem; 
      font-weight: 700; 
      color: #64748b; 
      cursor: pointer; 
      position: relative; 
      font-size: 0.85rem; 
    }
    .tab-link-legacy.active { color: #2e7d32; }
    .tab-link-legacy.active::after { 
      content: ''; 
      position: absolute; 
      bottom: -1px; 
      left: 0; 
      width: 100%; 
      height: 3px; 
      background: #2e7d32; 
    }
    
    .tab-body-legacy { padding: 1.5rem; background: white; }
    .template-title { font-size: 1.05rem; font-weight: 700; margin: 0 0 1rem 0; color: #334155; }
    .empty-state-msg { color: #94a3b8; font-style: italic; font-size: 0.85rem; }
  `]
})
export class TurnosSemanaComponent implements OnInit {
  private prodService = inject(ProduccionService);
  extrusoras: Extrusora[] = [];
  selectedTabIndex = 0;
  fechaInicio: string = '';
  fechaFin: string = '';

  ngOnInit() {
    this.prodService.getExtrusoras().subscribe({
      next: (data) => this.extrusoras = data,
      error: (err) => console.error('Error al cargar extrusoras para turnos:', err)
    });

    const today = new Date();
    this.fechaInicio = this.formatDate(today);
    const inFiveDays = new Date();
    inFiveDays.setDate(today.getDate() + 5);
    this.fechaFin = this.formatDate(inFiveDays);
  }

  formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  consultarTurnos() {
    alert(`Consultando programación semanal desde ${this.fechaInicio} hasta ${this.fechaFin}`);
  }
}

