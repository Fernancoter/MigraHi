import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduccionService, Bobina } from '../../../core/services/produccion';
import { FormsModule } from '@angular/forms';

interface ColumnConfig {
  field: string;
  header: string;
  visible: boolean;
  fixed: 'left' | 'none' | 'right';
}

@Component({
  selector: 'app-bobinas-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-fade-in">
      <div class="page-header-premium">
        <div class="title-section">
          <nav class="breadcrumb-modern">
            <span class="root">Extrusión</span>
            <span class="sep">&rsaquo;</span>
            <span class="root">Operación</span>
            <span class="sep">&rsaquo;</span>
            <span class="active">Bobinas</span>
          </nav>
          <h1 class="premium-title">Bobinas</h1>
        </div>
      </div>

      <div class="content-card glass shadow-sm">
        <div class="action-bar-legacy">
          <div class="left-actions" style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
            
            <!-- Exportar Dropdown -->
            <div class="dropdown" [class.open]="exportMenuOpen" (click)="toggleExportMenu()">
              <button class="btn-modern">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                <span>Exportar</span>
                <span class="chevron-down">▾</span>
              </button>
              <div class="dropdown-menu modern-menu" *ngIf="exportMenuOpen">
                <a (click)="exportar('pdf')">
                  <span class="menu-icon">📄</span> Exportar a PDF
                </a>
                <a (click)="exportar('excel')">
                  <span class="menu-icon">📊</span> Exportar a Excel
                </a>
              </div>
            </div>

            <!-- Selecciona Columnas Dropdown -->
            <div class="dropdown" [class.open]="columnMenuOpen">
              <button class="btn-modern" (click)="toggleColumnMenu()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                <span>Selecciona columnas</span>
                <span class="chevron-down" [class.rotate]="columnMenuOpen">▾</span>
              </button>
              
              <!-- Popover Premium para Columnas -->
              <div class="columns-popover" *ngIf="columnMenuOpen" (click)="$event.stopPropagation()">
                <div class="popover-header">
                  <h3>Personalizar Columnas</h3>
                  <button class="close-btn" (click)="toggleColumnMenu()">×</button>
                </div>
                
                <div class="popover-content">
                  <!-- Grupo: Fijas Izquierda -->
                  <div class="column-group" *ngIf="leftColumns.length > 0">
                    <h4 class="group-title"><span class="pin-icon left">📌</span> Fijas a la izquierda</h4>
                    <div class="column-item" *ngFor="let col of leftColumns">
                      <label class="toggle-switch">
                        <input type="checkbox" [(ngModel)]="col.visible">
                        <span class="slider round"></span>
                      </label>
                      <span class="col-name">{{ col.header.replace(' ▾', '').replace(' ↑', '') }}</span>
                      <div class="col-actions">
                        <button class="icon-btn" title="Desfijar" (click)="moveColumn(col, 'none')">🔄</button>
                        <button class="icon-btn" title="Fijar a la derecha" (click)="moveColumn(col, 'right')">▶</button>
                      </div>
                    </div>
                  </div>

                  <!-- Grupo: No Fijas -->
                  <div class="column-group">
                    <h4 class="group-title"><span class="pin-icon">📝</span> No fijas</h4>
                    <div class="column-item" *ngFor="let col of noneColumns">
                      <label class="toggle-switch">
                        <input type="checkbox" [(ngModel)]="col.visible">
                        <span class="slider round"></span>
                      </label>
                      <span class="col-name">{{ col.header.replace(' ▾', '').replace(' ↑', '') }}</span>
                      <div class="col-actions">
                        <button class="icon-btn" title="Fijar a la izquierda" (click)="moveColumn(col, 'left')">◀</button>
                        <button class="icon-btn" title="Fijar a la derecha" (click)="moveColumn(col, 'right')">▶</button>
                      </div>
                    </div>
                  </div>

                  <!-- Grupo: Fijas Derecha -->
                  <div class="column-group" *ngIf="rightColumns.length > 0">
                    <h4 class="group-title"><span class="pin-icon right">📌</span> Fijas a la derecha</h4>
                    <div class="column-item" *ngFor="let col of rightColumns">
                      <label class="toggle-switch">
                        <input type="checkbox" [(ngModel)]="col.visible">
                        <span class="slider round"></span>
                      </label>
                      <span class="col-name">{{ col.header.replace(' ▾', '').replace(' ↑', '') }}</span>
                      <div class="col-actions">
                        <button class="icon-btn" title="Fijar a la izquierda" (click)="moveColumn(col, 'left')">◀</button>
                        <button class="icon-btn" title="Desfijar" (click)="moveColumn(col, 'none')">🔄</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button class="btn-modern" (click)="toggleEliminadas()" [class.active-toggle]="mostrandoEliminadas">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              <span>{{ mostrandoEliminadas ? 'Ocultar eliminados' : 'Registros eliminados' }}</span>
            </button>
            <button class="btn-modern" (click)="obtenerInterrupcion()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span>Obtener interrupción</span>
            </button>
            <button class="btn-modern btn-primary" (click)="impresionMultiple()" [disabled]="!hasSelectedBobinas()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
              <span>IMPRESIÓN MÚLTIPLE</span>
            </button>
          </div>
          <div class="right-actions">
            <div class="search-modern">
              <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input type="text" placeholder="Buscar bobinas..." [(ngModel)]="searchTerm" (input)="onSearch()">
            </div>
          </div>
        </div>

        <div class="table-scroll">
          <table class="data-table-modern">
            <thead>
              <tr>
                <th class="checkbox-col sticky-left" style="left: 0; z-index: 2;">
                  <input type="checkbox" class="custom-checkbox" (change)="toggleAll($event)">
                </th>
                <th class="actions-col sticky-left" style="left: 40px; z-index: 2;">Acciones</th>
                <ng-container *ngFor="let col of visibleColumns">
                  <th [class.sticky-left]="col.fixed === 'left'" [class.sticky-right]="col.fixed === 'right'"
                      [ngStyle]="getFixedStyles(col)">
                    {{ col.header }}
                  </th>
                </ng-container>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let b of filteredBobinas" [class.selected]="b.selected">
                <td class="checkbox-col sticky-left" style="left: 0; background: inherit;">
                  <input type="checkbox" class="custom-checkbox" [(ngModel)]="b.selected">
                </td>
                <td class="actions-cell sticky-left" style="left: 40px; background: inherit;">
                  <button class="action-btn-icon" title="Visualizar" (click)="ver(b)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  </button>
                  <button class="action-btn-icon success" title="Validar" (click)="validar(b)" *ngIf="b.estado === 'Creada'">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </button>
                </td>
                <ng-container *ngFor="let col of visibleColumns">
                  <td *ngIf="col.field === 'noSerie'" class="serial-cell" [class.sticky-left]="col.fixed === 'left'" [class.sticky-right]="col.fixed === 'right'" [ngStyle]="getFixedStyles(col)">
                    <strong>{{ b.noSerie }}</strong>
                  </td>
                  <td *ngIf="col.field === 'bobinaNo'" [class.sticky-left]="col.fixed === 'left'" [class.sticky-right]="col.fixed === 'right'" [ngStyle]="getFixedStyles(col)">{{ b.bobinaNo }}</td>
                  <td *ngIf="col.field === 'peso'" [class.sticky-left]="col.fixed === 'left'" [class.sticky-right]="col.fixed === 'right'" [ngStyle]="getFixedStyles(col)">{{ b.kg || b.mermaKg | number:'1.2-2' }}</td>
                  <td *ngIf="col.field === 'calibre'" [class.sticky-left]="col.fixed === 'left'" [class.sticky-right]="col.fixed === 'right'" [ngStyle]="getFixedStyles(col)">{{ b.espesor || 0.05 }}</td>
                  <td *ngIf="col.field === 'desviacion'" [class.sticky-left]="col.fixed === 'left'" [class.sticky-right]="col.fixed === 'right'" [ngStyle]="getFixedStyles(col)">{{ b.mermaKg || 0 }}</td>
                  <td *ngIf="col.field === 'fechaProduccion'" [class.sticky-left]="col.fixed === 'left'" [class.sticky-right]="col.fixed === 'right'" [ngStyle]="getFixedStyles(col)">{{ b.fechaProduccion | date:'dd/MM/yy HH:mm' }}</td>
                  <td *ngIf="col.field === 'estado'" [class.sticky-left]="col.fixed === 'left'" [class.sticky-right]="col.fixed === 'right'" [ngStyle]="getFixedStyles(col)">
                    <span class="status-badge" [class.valid]="b.estado === 'Aprobada'" [class.pending]="b.estado === 'Creada'">
                      {{ b.estado }}
                    </span>
                  </td>
                </ng-container>
              </tr>
              <tr *ngIf="filteredBobinas.length === 0">
                <td [attr.colspan]="visibleColumns.length + 2" class="empty-row-legacy">
                  <div class="empty-state">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                    <p>No hay bobinas registradas o que coincidan con la búsqueda.</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Paginación Modernizada -->
        <div class="pagination-footer-modern">
          <div class="page-info">Mostrando {{ filteredBobinas.length }} resultados</div>
          <div class="page-controls">
            <button class="btn-icon" disabled><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
            <div class="page-numbers">
              <button class="page-num active">1</button>
            </div>
            <button class="btn-icon" disabled><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .module-page { padding: 2rem; background: #f1f5f9; min-height: 100vh; font-family: 'Inter', system-ui, sans-serif; }
    
    .breadcrumb-modern { font-size: 0.85rem; color: #64748b; margin-bottom: 0.75rem; font-weight: 500; display: flex; gap: 0.5rem; align-items: center; }
    .breadcrumb-modern .active { color: #0f172a; font-weight: 600; }
    .premium-title { font-size: 1.85rem; font-weight: 700; color: #0f172a; margin: 0 0 1.5rem 0; letter-spacing: -0.025em; }

    .content-card { background: white; border: 1px solid #e2e8f0; border-radius: 12px; overflow: visible; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03); }
    
    .action-bar-legacy { 
      padding: 1rem 1.5rem; 
      border-bottom: 1px solid #e2e8f0; 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      background: #ffffff; 
      border-radius: 12px 12px 0 0;
      gap: 1rem; 
      flex-wrap: wrap; 
    }
    
    .btn-modern { 
      background: white; 
      border: 1px solid #cbd5e1; 
      color: #334155; 
      padding: 0.5rem 0.875rem; 
      border-radius: 8px; 
      font-weight: 500; 
      font-size: 0.875rem; 
      cursor: pointer; 
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    }
    .btn-modern:hover { 
      background: #f8fafc; 
      border-color: #94a3b8;
      color: #0f172a;
    }
    .btn-modern.active-toggle {
      background: #eff6ff;
      border-color: #bfdbfe;
      color: #1d4ed8;
    }
    
    .btn-primary {
      background: #10b981;
      color: white;
      border: 1px solid #059669;
      font-weight: 600;
    }
    .btn-primary:hover {
      background: #059669;
      color: white;
      border-color: #047857;
      box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.2);
    }
    .btn-primary[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
      box-shadow: none;
    }

    .dropdown { position: relative; display: inline-block; }
    .chevron-down { font-size: 0.75rem; transition: transform 0.2s; }
    .chevron-down.rotate { transform: rotate(180deg); }

    .modern-menu {
      display: block;
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      background-color: white;
      min-width: 180px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      z-index: 50;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 0.5rem;
      animation: popIn 0.2s ease-out;
    }
    .modern-menu a {
      color: #334155;
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.15s;
    }
    .modern-menu a:hover { background-color: #f1f5f9; color: #0f172a; }

    /* POPOVER DE COLUMNAS (Premium) */
    .columns-popover {
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      background: white;
      width: 320px;
      border-radius: 12px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      border: 1px solid #e2e8f0;
      z-index: 50;
      overflow: hidden;
      animation: popIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes popIn {
      from { opacity: 0; transform: translateY(-10px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .popover-header {
      padding: 1rem;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #f8fafc;
    }
    .popover-header h3 { margin: 0; font-size: 0.95rem; font-weight: 600; color: #0f172a; }
    .close-btn { background: none; border: none; font-size: 1.25rem; color: #94a3b8; cursor: pointer; line-height: 1; padding: 0; }
    .close-btn:hover { color: #0f172a; }
    
    .popover-content {
      max-height: 400px;
      overflow-y: auto;
      padding: 0.5rem;
    }
    .column-group {
      margin-bottom: 0.5rem;
      background: white;
      border-radius: 8px;
    }
    .group-title {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #64748b;
      margin: 1rem 0.5rem 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }
    .column-item {
      display: flex;
      align-items: center;
      padding: 0.5rem;
      border-radius: 6px;
      transition: background 0.15s;
    }
    .column-item:hover { background: #f8fafc; }
    .col-name { flex: 1; font-size: 0.875rem; color: #334155; margin-left: 0.75rem; font-weight: 500; }
    .col-actions { display: flex; gap: 0.25rem; opacity: 0; transition: opacity 0.2s; }
    .column-item:hover .col-actions { opacity: 1; }
    .icon-btn { 
      background: white; border: 1px solid #e2e8f0; border-radius: 4px; 
      width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;
      cursor: pointer; color: #64748b; font-size: 0.7rem; transition: all 0.2s;
    }
    .icon-btn:hover { background: #f1f5f9; color: #0f172a; border-color: #cbd5e1; }

    /* Toggle Switch */
    .toggle-switch { position: relative; display: inline-block; width: 32px; height: 18px; }
    .toggle-switch input { opacity: 0; width: 0; height: 0; }
    .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #cbd5e1; transition: .3s; border-radius: 18px; }
    .slider:before { position: absolute; content: ""; height: 14px; width: 14px; left: 2px; bottom: 2px; background-color: white; transition: .3s; border-radius: 50%; box-shadow: 0 1px 2px rgba(0,0,0,0.2); }
    input:checked + .slider { background-color: #10b981; }
    input:checked + .slider:before { transform: translateX(14px); }

    /* Buscador Moderno */
    .search-modern {
      position: relative;
      display: flex;
      align-items: center;
    }
    .search-icon { position: absolute; left: 0.75rem; color: #94a3b8; }
    .search-modern input {
      padding: 0.5rem 1rem 0.5rem 2.25rem;
      border: 1px solid #cbd5e1;
      border-radius: 20px;
      font-size: 0.875rem;
      width: 240px;
      transition: all 0.2s;
      outline: none;
      color: #0f172a;
    }
    .search-modern input:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      width: 260px;
    }

    /* Tabla */
    .table-scroll { overflow-x: auto; min-height: 400px; }
    .data-table-modern { width: 100%; border-collapse: separate; border-spacing: 0; text-align: left; }
    .data-table-modern th { 
      background: #f8fafc; 
      color: #475569; 
      font-size: 0.75rem; 
      font-weight: 600; 
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 0.875rem 1rem; 
      border-bottom: 1px solid #e2e8f0;
      border-top: 1px solid #e2e8f0;
      white-space: nowrap;
    }
    .data-table-modern td { 
      padding: 0.875rem 1rem; 
      border-bottom: 1px solid #f1f5f9; 
      font-size: 0.875rem; 
      color: #334155; 
      vertical-align: middle; 
      background: white;
      transition: background 0.2s;
    }
    .data-table-modern tr:hover td { background: #f8fafc; }
    .data-table-modern tr.selected td { background: #ecfdf5; }

    /* Sticky columns */
    .sticky-left { position: sticky; left: 0; z-index: 1; border-right: 1px solid #e2e8f0; }
    .sticky-right { position: sticky; right: 0; z-index: 1; border-left: 1px solid #e2e8f0; }
    
    .checkbox-col { width: 40px; text-align: center; }
    .custom-checkbox { width: 16px; height: 16px; cursor: pointer; accent-color: #10b981; }
    
    .actions-col { width: 100px; text-align: center; }
    .actions-cell { display: flex; gap: 0.5rem; justify-content: center; }
    .action-btn-icon {
      background: white; border: 1px solid #e2e8f0; border-radius: 6px;
      width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center;
      color: #64748b; cursor: pointer; transition: all 0.2s;
    }
    .action-btn-icon:hover { background: #f1f5f9; color: #0f172a; border-color: #cbd5e1; }
    .action-btn-icon.success:hover { background: #dcfce7; color: #16a34a; border-color: #86efac; }

    .serial-cell { color: #0f172a; font-family: monospace; font-size: 0.95rem; }

    .status-badge { 
      padding: 0.25rem 0.6rem; 
      border-radius: 20px; 
      font-size: 0.75rem; 
      font-weight: 600; 
      display: inline-flex;
      align-items: center;
    }
    .status-badge.valid { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
    .status-badge.pending { background: #fef9c3; color: #854d0e; border: 1px solid #fef08a; }

    .empty-state { text-align: center; padding: 4rem 2rem; color: #64748b; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
    .empty-state p { margin: 0; font-size: 0.95rem; }

    /* Paginación Modernizada */
    .pagination-footer-modern { 
      padding: 1rem 1.5rem; 
      border-top: 1px solid #e2e8f0; 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      background: #f8fafc; 
      border-radius: 0 0 12px 12px;
    }
    .page-info { font-size: 0.875rem; color: #64748b; font-weight: 500; }
    .page-controls { display: flex; gap: 0.5rem; align-items: center; }
    .btn-icon { 
      background: white; border: 1px solid #cbd5e1; border-radius: 6px; 
      width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center;
      cursor: pointer; color: #475569; transition: all 0.2s;
    }
    .btn-icon:not(:disabled):hover { background: #f1f5f9; color: #0f172a; }
    .btn-icon:disabled { opacity: 0.5; cursor: not-allowed; }
    .page-numbers { display: flex; gap: 0.25rem; }
    .page-num {
      background: white; border: 1px solid #cbd5e1; border-radius: 6px;
      min-width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center;
      font-size: 0.875rem; font-weight: 600; color: #475569; cursor: pointer; transition: all 0.2s;
    }
    .page-num.active { background: #10b981; color: white; border-color: #059669; }
  `]
})
export class BobinasListComponent implements OnInit {
  private prodService = inject(ProduccionService);
  bobinas: (Bobina & { selected?: boolean })[] = [];
  filteredBobinas: (Bobina & { selected?: boolean })[] = [];
  searchTerm: string = '';
  
  exportMenuOpen = false;
  columnMenuOpen = false;
  mostrandoEliminadas = false;

  columns: ColumnConfig[] = [
    { field: 'noSerie', header: 'Número de Serie ↑', visible: true, fixed: 'none' },
    { field: 'bobinaNo', header: 'Bobina No ▾', visible: true, fixed: 'none' },
    { field: 'peso', header: 'Peso (Kg) ▾', visible: true, fixed: 'none' },
    { field: 'calibre', header: 'Calibre ▾', visible: true, fixed: 'none' },
    { field: 'desviacion', header: 'Desviación ▾', visible: true, fixed: 'none' },
    { field: 'fechaProduccion', header: 'Fecha Producción ▾', visible: true, fixed: 'none' },
    { field: 'estado', header: 'Estado ▾', visible: true, fixed: 'none' }
  ];

  get leftColumns() { return this.columns.filter(c => c.fixed === 'left'); }
  get noneColumns() { return this.columns.filter(c => c.fixed === 'none'); }
  get rightColumns() { return this.columns.filter(c => c.fixed === 'right'); }
  
  get visibleColumns() { 
    return [
      ...this.leftColumns.filter(c => c.visible),
      ...this.noneColumns.filter(c => c.visible),
      ...this.rightColumns.filter(c => c.visible)
    ];
  }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    if (this.mostrandoEliminadas) {
      this.prodService.getBobinasEliminadas().subscribe({
        next: (data) => {
          this.bobinas = data.map(d => ({ 
            id: d.id, noSerie: 'ELIMINADA', bobinaNo: 0, kg: 0, 
            espesor: 0, fechaProduccion: d.timestamp, estado: 'Eliminada', selected: false 
          }));
          this.onSearch();
        },
        error: (err) => console.error('Error al cargar bobinas eliminadas:', err)
      });
    } else {
      this.prodService.getBobinasDisponibles().subscribe({
        next: (data) => {
          this.bobinas = data.map(b => ({ ...b, selected: false }));
          this.onSearch();
        },
        error: (err) => console.error('Error al cargar bobinas disponibles:', err)
      });
    }
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredBobinas = this.bobinas;
    } else {
      this.filteredBobinas = this.bobinas.filter(b => 
        b.noSerie && b.noSerie.toLowerCase().includes(term)
      );
    }
  }

  toggleExportMenu() {
    this.exportMenuOpen = !this.exportMenuOpen;
    if (this.exportMenuOpen) this.columnMenuOpen = false;
  }

  toggleColumnMenu() {
    this.columnMenuOpen = !this.columnMenuOpen;
    if (this.columnMenuOpen) this.exportMenuOpen = false;
  }

  moveColumn(col: ColumnConfig, position: 'left' | 'none' | 'right') {
    col.fixed = position;
  }

  getFixedStyles(col: ColumnConfig): any {
    if (col.fixed === 'none') return {};
    
    // Simplificación: Asumimos que las columnas fijas a la izquierda después del checkbox/acciones 
    // empiezan en 140px, y las de la derecha empiezan en 0. 
    // Para un cálculo perfecto en producción se suele calcular el offset acumulado dinámicamente.
    if (col.fixed === 'left') {
      return { 'left': '140px', 'z-index': '1' };
    }
    if (col.fixed === 'right') {
      return { 'right': '0px', 'z-index': '1' };
    }
    return {};
  }

  toggleEliminadas() {
    this.mostrandoEliminadas = !this.mostrandoEliminadas;
    this.cargarDatos();
  }

  obtenerInterrupcion() {
    this.prodService.llenadoBobinaInterrupcion().subscribe({
      next: (res) => {
        alert(`Se han asignado ${res.asignadas} interrupciones a bobinas recientes.`);
      },
      error: (err) => console.error('Error al obtener interrupción:', err)
    });
  }

  exportar(formato: string) {
    // El endpoint ahora acepta filtros estructurados del grid.
    // Los filtros opcionales pueden expandirse aquí cuando el componente exponga campos de fecha/estado.
    this.prodService.exportarBobinas().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Bobinas_${new Date().getTime()}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  toggleAll(event: any) {
    const checked = event.target.checked;
    this.filteredBobinas.forEach(b => b.selected = checked);
  }

  hasSelectedBobinas(): boolean {
    return this.filteredBobinas.some(b => b.selected);
  }

  impresionMultiple() {
    const seleccionadas = this.filteredBobinas.filter(b => b.selected).map(b => b.noSerie);
    if (seleccionadas.length === 0) return;
    
    this.prodService.imprimirMultipleBobinas(seleccionadas).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Impresion_Multiple_${new Date().getTime()}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  ver(b: Bobina) {
    alert(`Visualizando detalles de Bobina: ${b.noSerie}`);
  }

  validar(b: Bobina) {
    if (b.id) {
      this.prodService.validarBobina(b.id).subscribe({
        next: () => {
          alert('Bobina validada con éxito');
          b.estado = 'Aprobada';
        },
        error: (err) => console.error('Error al validar bobina:', err)
      });
    }
  }
}
