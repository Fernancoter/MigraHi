import { Component, OnInit, inject, ChangeDetectorRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { timer } from 'rxjs';
import { InventarioService, ExistenciaHistorico } from '../../../core/services/inventario';
import { PdfExportService } from '../../../core/services/pdf-export.service';

interface ColumnDef {
  id: string;
  label: string;
  visible: boolean;
}

interface SavedFilter {
  id: string;
  name: string;
  search: string;
  desde: string;
  hasta: string;
  estado: string;
}

@Component({
  selector: 'app-cierre-mes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-fade-in">
      <div class="page-header-premium">
        <div class="title-section">
          <h1 class="premium-title">Inventario</h1>
          <nav class="breadcrumb-modern">
            <span class="root">Inventarios</span>
            <span class="sep">&rsaquo;</span>
            <span class="active">Cierre de Mes</span>
          </nav>
        </div>
      </div>
      
      <div class="card-premium card-toolbar-top" style="margin-bottom: 0; border-bottom-left-radius: 0; border-bottom-right-radius: 0; position: relative; z-index: 100; overflow: visible;">
        <div class="toolbar-premium">
          <div class="btn-group-modern">
            <!-- Dropdown Exportar -->
            <div class="export-dropdown-wrapper">
              <button class="btn-export-qa" (click)="toggleExport($event)" title="Exportar datos">
                📥 Exportar <span class="chevron-down-qa">▾</span>
              </button>
              <div class="export-popover-qa shadow-premium" *ngIf="showExportSelector" (click)="$event.stopPropagation()">
                <button class="export-item-qa" (click)="exportToCSV(); showExportSelector = false">
                  <span class="export-icon">📊</span> Excel (CSV)
                </button>
                <button class="export-item-qa" (click)="exportToPDF(); showExportSelector = false">
                  <span class="export-icon">📕</span> PDF
                </button>
              </div>
            </div>

            <button class="btn-legacy primary" (click)="abrirModalNuevoCierre()">Agregar</button>

            <!-- Selector de Columnas -->
            <div class="dropdown-container">
              <button class="btn-legacy secondary" (click)="toggleColumnSelector($event)">
                Selecciona columnas <span class="arrow">▼</span>
              </button>
              <div class="column-selector-dropdown shadow-premium" *ngIf="showColumnSelector">
                <div class="dropdown-header">
                  <input type="text" placeholder="Buscar..." class="search-mini">
                </div>
                <div class="dropdown-body">
                  <div class="column-section">
                    <div class="section-title">Fijas a la izquierda ▼</div>
                    <label class="col-item disabled"><input type="checkbox" checked disabled> (Ninguna)</label>
                  </div>
                  <div class="column-section">
                    <div class="section-title">No fijas ▼</div>
                    <label class="col-item" *ngFor="let col of columns">
                      <input type="checkbox" [(ngModel)]="col.visible"> {{ col.label }}
                    </label>
                  </div>
                  <div class="column-section">
                    <div class="section-title">Fijas a la derecha ▼</div>
                    <label class="col-item disabled"><input type="checkbox" checked disabled> (Ninguna)</label>
                  </div>
                </div>
                <div class="dropdown-footer">
                  <button class="btn-reset" (click)="resetColumns()">↺</button>
                  <button class="btn-update" (click)="showColumnSelector = false">Actualizar</button>
                </div>
              </div>
            </div>
          </div>
          
          <div class="filter-search-group-qa">
            <!-- Botón Filtro Avanzado -->
            <div class="dropdown-wrapper">
              <button class="btn-filter-funnel-qa" (click)="toggleSearchFilterDropdown($event)" title="Filtros avanzados">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
                <span class="chevron-down-funnel">▾</span>
              </button>
              
              <div class="filter-popover-qa shadow-premium" *ngIf="showSearchFilterDropdown" (click)="$event.stopPropagation()">
                <div class="filter-item-qa" (click)="clearAllFilters()">
                  <span class="icon-circle-cross-dark">✖</span> Limpiar filtros
                </div>
                <div class="filter-item-qa" (click)="saveActiveFilters()">
                  <span class="icon-floppy-dark">💾</span> Guardar filtro como...
                </div>
                
                <ng-container *ngIf="savedFilters.length > 0">
                  <div class="dropdown-divider"></div>
                  <div class="dropdown-header-saved">Filtros Guardados</div>
                  <div class="filter-item-qa saved-filter-item" *ngFor="let f of savedFilters" (click)="loadSavedFilter(f)">
                    <span>📁 {{ f.name }}</span>
                    <span class="btn-delete-saved-filter" (click)="deleteSavedFilter(f, $event)">🗑️</span>
                  </div>
                </ng-container>
              </div>
            </div>
            
            <!-- Campo de Búsqueda Subrayado -->
            <div class="search-modern-underline-qa">
              <input type="text" placeholder="Buscar..." [(ngModel)]="searchQuery" (input)="onSearchQueryChange()">
            </div>
          </div>
        </div>
      </div>

      <!-- Alertas de Transacción -->
      <div class="alert-container-premium animate-fade-in" *ngIf="successMessage || errorMessage">
        <div class="alert-premium success" *ngIf="successMessage">
          <span class="icon">✓</span> {{ successMessage }}
        </div>
        <div class="alert-premium error" *ngIf="errorMessage">
          <span class="icon">⚠️</span> {{ errorMessage }}
        </div>
      </div>

      <!-- Grid Principal de Cierre de Mes -->
      <div class="card-premium" style="border-top-left-radius: 0; border-top-right-radius: 0; border-top: none; position: relative; z-index: 1;">
        <div class="table-modern-container">
          <table class="table-modern">
            <thead>
              <tr>
                <!-- Cabeceras fijas para Acciones a la izquierda -->
                <th class="action-header"></th>
                <th class="action-header"></th>
                <th class="action-header"></th>
                
                <th *ngIf="isColVisible('fecha')" class="rel-pos">
                  <div class="header-cell-content">
                    <span>Fecha Hora de Reinicio de Consecutivo</span>
                    <button class="filter-trigger-btn" [class.active]="activeDropdown === 'fecha'" (click)="toggleDropdown('fecha', $event)">
                      {{ sortColumn === 'fecha' ? (sortAsc ? '↑' : '↓') : '▼' }}
                    </button>
                  </div>
                  <div class="col-filter-dropdown shadow-premium" *ngIf="activeDropdown === 'fecha'" (click)="$event.stopPropagation()">
                    <div class="dropdown-item-action" (click)="setSort('fecha', true)"><span class="icon">↑↓</span> Ordenar Antiguos</div>
                    <div class="dropdown-item-action" (click)="setSort('fecha', false)"><span class="icon">↑↓</span> Ordenar Recientes</div>
                    <div class="dropdown-divider"></div>
                    <div class="text-filter-box">
                      <input type="date" [(ngModel)]="filterFechaDesde" (change)="aplicarFiltros()" class="text-filter-input" style="margin-bottom:5px;">
                      <input type="date" [(ngModel)]="filterFechaHasta" (change)="aplicarFiltros()" class="text-filter-input">
                    </div>
                  </div>
                </th>
                <th *ngIf="isColVisible('inicio')" class="rel-pos">
                  <div class="header-cell-content">
                    <span>Inicio Consecutivo</span>
                    <button class="filter-trigger-btn" [class.active]="activeDropdown === 'inicio'" (click)="toggleDropdown('inicio', $event)">
                      {{ sortColumn === 'inicio' ? (sortAsc ? '↑' : '↓') : '▼' }}
                    </button>
                  </div>
                  <div class="col-filter-dropdown shadow-premium text-left" *ngIf="activeDropdown === 'inicio'" (click)="$event.stopPropagation()">
                    <div class="dropdown-item-action" (click)="setSort('inicio', true)"><span class="icon">↑↓</span> Ordenar de A a Z</div>
                    <div class="dropdown-item-action" (click)="setSort('inicio', false)"><span class="icon">↑↓</span> Ordenar de Z a A</div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of paginatedCierres" style="transition: background-color 0.2s;">
                <!-- Acciones a la izquierda como enlaces de texto simples (GX style) -->
                <td class="action-cell">
                  <a class="action-link-gx visual" (click)="verDetalle(item.id)">Visualizar</a>
                </td>
                <td class="action-cell">
                  <a class="action-link-gx mod" (click)="verDetalle(item.id)">Modificar</a>
                </td>
                <td class="action-cell">
                  <a class="action-link-gx del" (click)="confirmarEliminacion(item.id)">Eliminar</a>
                </td>
                
                <!-- Datos con formato derivado -->
                <td *ngIf="isColVisible('fecha')">
                  <span class="datetime-cell">{{ item.fecha }} {{ item.hora }}</span>
                </td>
                <td *ngIf="isColVisible('inicio')">
                  <span class="consecutivo-cell">// 00:00</span>
                </td>
              </tr>
              <tr *ngIf="filteredCierres.length === 0">
                <td colspan="5" class="text-center empty-row-premium">
                  🛸 No se encontraron registros de cierres mensuales.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Paginación Nativa al Pie (GX Parity) -->
        <div class="pagination-container-premium" *ngIf="filteredCierres.length > 0">
          <div class="pagination-info">
            Página {{ currentPage }} de {{ totalPages }}
          </div>
          <div class="pagination-buttons">
            <button class="btn-page" [disabled]="currentPage === 1" (click)="goToPage(currentPage - 1)">
              Ant
            </button>
            <button *ngFor="let p of getPagesList()" 
                    class="btn-page number" 
                    [class.active]="currentPage === p" 
                    (click)="goToPage(p)">
              {{ p }}
            </button>
            <button class="btn-page" [disabled]="currentPage === totalPages" (click)="goToPage(currentPage + 1)">
              Sig
            </button>
          </div>
        </div>
      </div>

      <!-- Modal para Nuevo Cierre -->
      <div class="modal-overlay" *ngIf="showModal" (click)="showModal = false">
        <div class="modal-card legacy-card animate-scale-in" (click)="$event.stopPropagation()">
          <div class="modal-header-legacy" [ngClass]="{'bg-danger': modalMode === 'DELETE'}">
            <span class="header-icon">{{ modalMode === 'ADD' ? '📅' : '⚠️' }}</span> 
            {{ modalMode === 'ADD' ? 'Generar Nuevo Cierre de Mes' : 'Eliminar Cierre de Mes' }}
          </div>
          <div class="modal-body-legacy">
            <ng-container *ngIf="modalMode === 'ADD'">
              <p class="modal-info">Esta acción tomará una fotografía instantánea del stock actual del sistema para todos los silos y artículos.</p>
              <div class="form-row-modern-modal">
                <label class="legacy-label">Observaciones o Motivo (Opcional)</label>
                <textarea class="legacy-textarea" [(ngModel)]="observacionesNuevoCierre" rows="3" placeholder="Ej. Cierre fin de semana, Auditoría interna..."></textarea>
              </div>
            </ng-container>
            <ng-container *ngIf="modalMode === 'DELETE'">
              <p class="modal-info text-danger" style="font-size: 1rem; color: #b91c1c; font-weight: 500;">¿Está completamente seguro de que desea eliminar este cierre de mes?</p>
              <p class="modal-info">Esta acción realizará un borrado lógico (Soft-Delete) y no se mostrará en los reportes posteriores. La información base quedará archivada en la base de datos por razones de auditoría.</p>
            </ng-container>
          </div>
          <div class="modal-footer-legacy">
            <button class="btn-legacy secondary" (click)="showModal = false">Cancelar</button>
            <button class="btn-legacy" [ngClass]="modalMode === 'ADD' ? 'primary' : 'danger'" (click)="modalMode === 'ADD' ? crearCierreYContinuar() : ejecutarEliminacion()" [disabled]="isSubmitting">
              <span *ngIf="modalMode === 'ADD'">{{ isSubmitting ? 'Generando...' : 'Crear y Capturar Físico' }}</span>
              <span *ngIf="modalMode === 'DELETE'">{{ isSubmitting ? 'Eliminando...' : 'Eliminar Permanentemente' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .module-page { padding: 2rem; background: #f8fafc; min-height: calc(100vh - 64px); }
    .page-header-premium { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    .premium-title { font-size: 1.875rem; font-weight: 800; color: #1e293b; margin: 0; }
    .breadcrumb-modern { display: flex; align-items: center; gap: 0.5rem; color: #64748b; font-size: 0.875rem; margin-top: 0.25rem; }
    .breadcrumb-modern .root { cursor: pointer; }
    .breadcrumb-modern .sep { color: #cbd5e1; }
    .breadcrumb-modern .active { color: #166534; font-weight: 600; }
    
    .toolbar-premium { display: flex; align-items: center; gap: 1.5rem; }
    .btn-group-modern { display: flex; align-items: center; gap: 0.75rem; }
    
    .btn-legacy {
      padding: 0.6rem 1.2rem; border-radius: 8px; font-weight: 600; cursor: pointer;
      transition: all 0.2s; font-size: 0.85rem; border: 1px solid transparent;
    }
    .btn-legacy.primary { background: #166534; color: white; }
    .btn-legacy.primary:hover { background: #14532d; transform: translateY(-1px); }
    .btn-legacy.danger { background: #dc2626; color: white; }
    .btn-legacy.danger:hover { background: #b91c1c; transform: translateY(-1px); }
    .bg-danger { background: #fef2f2 !important; color: #991b1b !important; }
    .btn-legacy.secondary { background: white; color: #334155; border-color: #cbd5e1; }
    .btn-legacy.secondary:hover { background: #f8fafc; border-color: #94a3b8; }
    
    .btn-quick-xls {
      background: #15803d; color: white; border: none; padding: 0.6rem 1.1rem;
      border-radius: 8px; font-weight: 700; font-size: 0.85rem; cursor: pointer;
      transition: all 0.2s; box-shadow: 0 2px 4px rgba(21, 128, 61, 0.2);
    }
    .btn-quick-xls:hover { background: #166534; transform: translateY(-1px); box-shadow: 0 4px 6px rgba(21, 128, 61, 0.3); }

    /* Selector de columnas dropdown */
    .dropdown-container { position: relative; display: inline-block; }
    .arrow { font-size: 0.7rem; margin-left: 0.3rem; }
    .column-selector-dropdown {
      position: absolute; top: 110%; left: 0; width: 220px; background: white;
      border: 1px solid #e2e8f0; border-radius: 12px; z-index: 100; padding: 0.75rem;
    }
    .dropdown-header { margin-bottom: 0.5rem; }
    .search-mini { width: 100%; border: 1px solid #cbd5e1; border-radius: 6px; padding: 0.35rem 0.6rem; font-size: 0.8rem; box-sizing: border-box; outline: none; }
    .column-list { max-height: 200px; overflow-y: auto; }
    .column-group { margin-bottom: 0.75rem; }
    .group-label { font-size: 0.7rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; display: block; margin-bottom: 0.25rem; }
    .item-label { display: flex; align-items: center; gap: 0.5rem; font-size: 0.825rem; color: #334155; padding: 0.3rem 0; cursor: pointer; }
    .export-item:hover { background: #f1f5f9; border-radius: 4px; padding-left: 0.25rem; }
    .dropdown-footer { border-top: 1px solid #f1f5f9; padding-top: 0.5rem; display: flex; justify-content: space-between; }
    .btn-reset { background: none; border: none; font-size: 1.1rem; cursor: pointer; color: #64748b; }
    .btn-update { background: #166534; color: white; border: none; border-radius: 4px; padding: 0.25rem 0.6rem; font-size: 0.75rem; cursor: pointer; }

    /* Funnel Search */
    .search-funnel-group { display: flex; align-items: center; background: white; border: 1px solid #cbd5e1; border-radius: 8px; padding: 0.25rem 0.5rem; }
    .btn-funnel-search { background: transparent; border: none; color: #64748b; cursor: pointer; display: flex; align-items: center; gap: 0.25rem; padding: 0.25rem; }
    .btn-funnel-search:hover { color: #166534; }
    .funnel-icon { display: block; }
    .arrow-mini { font-size: 0.6rem; }
    
    .search-modern-underline { display: flex; align-items: center; }
    .search-modern-underline input { border: none; border-left: 1px solid #e2e8f0; padding: 0.35rem 0.75rem; font-size: 0.875rem; outline: none; color: #334155; width: 140px; transition: width 0.25s; }
    .search-modern-underline input:focus { width: 180px; }

    /* Embudo dropdown */
    .search-filter-dropdown {
      position: absolute; top: 120%; right: 0; width: 280px; background: white;
      border: 1px solid #e2e8f0; border-radius: 12px; z-index: 100; padding: 1rem;
    }
    .dropdown-filter-section { display: flex; flex-direction: column; gap: 0.85rem; }
    .dropdown-filter-group { display: flex; flex-direction: column; gap: 0.3rem; }
    .dropdown-filter-label { font-size: 0.7rem; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.3px; }
    .dropdown-filter-input, .dropdown-filter-select {
      border: 1px solid #cbd5e1; border-radius: 6px; padding: 0.45rem 0.6rem;
      font-size: 0.85rem; background: #f8fafc; outline: none; width: 100%; box-sizing: border-box;
    }
    .dropdown-divider { height: 1px; background: #f1f5f9; margin: 0.75rem 0; }
    .dropdown-item-action { display: flex; align-items: center; gap: 0.5rem; font-size: 0.825rem; color: #475569; padding: 0.4rem 0.5rem; cursor: pointer; border-radius: 6px; transition: background 0.2s; }
    .dropdown-item-action:hover { background: #f1f5f9; color: #1e293b; }
    .dropdown-header-saved { font-size: 0.7rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; margin: 0.5rem 0.5rem 0.25rem; }
    .saved-filter-item { justify-content: space-between; font-weight: 600; color: #166534; }
    .btn-delete-saved-filter { cursor: pointer; opacity: 0.6; padding: 2px; }
    .btn-delete-saved-filter:hover { opacity: 1; color: #ef4444; }

    
    .rel-pos { position: relative; }
    .header-cell-content { display: flex; align-items: center; gap: 0.4rem; justify-content: space-between; width: 100%; }
    .filter-trigger-btn { background: none; border: none; color: #a0aec0; cursor: pointer; padding: 0.1rem 0.3rem; font-size: 0.7rem; border-radius: 3px; transition: all 0.2s; }
    .filter-trigger-btn:hover { background: #e2e8f0; color: #4a5568; }
    .filter-trigger-btn.active { color: #166534; font-weight: bold; background: #dcfce7; }
    .col-filter-dropdown { position: absolute; top: calc(100% + 5px); left: 0; background: white; border: 1px solid #e2e8f0; border-radius: 8px; z-index: 1000; min-width: 220px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); padding: 0.5rem 0; animation: fadeInDropdown 0.2s ease-out; }
    .col-filter-dropdown.text-left { left: auto; right: 0; }
    .text-filter-box { padding: 0.5rem 1rem; }
    .text-filter-input { width: 100%; padding: 0.5rem; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 0.85rem; outline: none; transition: border-color 0.2s; }
    
    /* Alertas */
    .alert-container-premium { margin-bottom: 1.5rem; }
    .alert-premium { padding: 1rem; border-radius: 12px; display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; font-weight: 600; }
    .alert-premium.success { background: #f0fdf4; border: 1px solid #dcfce7; color: #166534; }
    .alert-premium.error { background: #fef2f2; border: 1px solid #fee2e2; color: #991b1b; }

    /* Tarjeta y Tabla */
    .card-premium { background: white; border-radius: 16px; border: 1px solid #cbd5e1; overflow: hidden; }
    .table-modern-container { overflow-x: auto; }
    .table-modern { width: 100%; border-collapse: collapse; text-align: left; }
    .table-modern th { background: #f1f5f9; padding: 1rem 1.5rem; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #475569; letter-spacing: 0.05em; border-bottom: 2px solid #e2e8f0; }
    .table-modern td { padding: 1rem 1.5rem; border-bottom: 1px solid #f1f5f9; color: #334155; font-size: 0.9rem; vertical-align: middle; }
    .table-modern tr:hover { background: #f8fafc; }
    
    /* Acciones al estilo GeneXus */
    .action-header { width: 80px; }
    .action-cell { width: 80px; padding: 0.75rem 0.5rem !important; text-align: center; }
    .action-link-gx {
      font-size: 0.85rem; font-weight: 600; color: #166534; cursor: pointer;
      text-decoration: none; display: inline-block; transition: color 0.2s;
    }
    .action-link-gx:hover { text-decoration: underline; color: #14532d; }
    .action-link-gx.del { color: #dc2626; }
    .action-link-gx.del:hover { color: #b91c1c; }

    .datetime-cell { font-family: monospace; font-weight: 700; color: #1e293b; }
    .consecutivo-cell { font-family: monospace; color: #94a3b8; }
    /* Filtro Embudo & Buscador (IMAGEN 1 QA EXACTO) */
    .dropdown-wrapper { position: relative; display: inline-block; }
    .btn-filter-funnel-qa { background: #ffffff; border: 1px solid #dcdde1; border-radius: 4px; padding: 0.4rem 0.6rem; height: 32px; display: inline-flex; align-items: center; justify-content: center; gap: 3px; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.08); transition: background 0.2s; }
    .btn-filter-funnel-qa:hover { background: #f8fafc; border-color: #cbd5e1; }
    .chevron-down-dark { font-size: 0.7rem; color: #334155; }

    .filter-popover-qa { position: absolute; top: calc(100% + 4px); right: 0; background: #ffffff !important; border: 1px solid #cbd5e1 !important; border-radius: 6px !important; width: 180px !important; box-shadow: 0 6px 20px rgba(0,0,0,0.15) !important; z-index: 99999 !important; padding: 6px 0 !important; box-sizing: border-box; }
    .filter-item-qa { display: flex; align-items: center; gap: 8px; padding: 0.55rem 0.9rem; font-size: 0.85rem; color: #334155; font-weight: 500; cursor: pointer; transition: background 0.15s; }
    .filter-item-qa:hover { background: #f1f5f9; color: #2e7d32; }

    .icon-circle-cross-dark { display: inline-flex; align-items: center; justify-content: center; width: 15px; height: 15px; background: #475569; color: white; border-radius: 50%; font-size: 8px; font-weight: bold; }
    .filter-item-qa:hover .icon-circle-cross-dark { background: #2e7d32; }
    .icon-floppy-dark { font-size: 0.9rem; color: #475569; }
    .filter-item-qa:hover .icon-floppy-dark { color: #2e7d32; }

    .search-underline-box { display: inline-flex; align-items: center; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 2px; transition: border-bottom-color 0.2s; width: 140px; }
    .search-underline-box:focus-within { border-bottom-color: #4caf50; }
    .search-input-underline { border: none; background: transparent; outline: none; font-size: 0.88rem; color: #334155; width: 100%; padding: 2px 0; }
    .search-input-underline::placeholder { color: #94a3b8; font-weight: 400; }

    .empty-row-premium { padding: 3rem !important; color: #94a3b8; font-size: 1rem; }

    /* Paginación al Pie */
    .pagination-container-premium {
      padding: 1rem 1.5rem; border-top: 1px solid #cbd5e1; display: flex;
      justify-content: space-between; align-items: center; background: #f8fafc;
    }
    .pagination-info { font-size: 0.85rem; color: #64748b; font-weight: 600; }
    .pagination-buttons { display: flex; align-items: center; gap: 0.35rem; }
    .btn-page {
      padding: 0.4rem 0.8rem; border-radius: 6px; border: 1px solid #cbd5e1;
      background: white; color: #334155; font-size: 0.825rem; font-weight: 600;
      cursor: pointer; transition: all 0.2s;
    }
    .btn-page:hover:not(:disabled) { background: #f1f5f9; border-color: #94a3b8; }
    .btn-page:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-page.number { min-width: 32px; padding: 0.4rem 0.4rem; text-align: center; }
    .btn-page.number.active { background: #166534; color: white; border-color: #166534; }

    /* Modal Estilo Legacy */
    .modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .modal-card.legacy-card { background: white; border-radius: 12px; width: 90%; max-width: 500px; display: flex; flex-direction: column; overflow: hidden; border: 1px solid #cbd5e1; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3); }
    .modal-header-legacy { padding: 1.25rem 1.5rem; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; gap: 0.5rem; font-size: 1.15rem; font-weight: 700; color: #1e293b; background: #f8fafc; }
    .modal-body-legacy { padding: 1.5rem; flex: 1; }
    .modal-info { font-size: 0.875rem; color: #64748b; line-height: 1.4; margin-bottom: 1.25rem; }
    .form-row-modern-modal { display: flex; flex-direction: column; gap: 0.4rem; }
    .legacy-label { font-size: 0.8rem; font-weight: 700; color: #475569; text-transform: uppercase; }
    .legacy-textarea { border: 1px solid #cbd5e1; border-radius: 8px; padding: 0.6rem 0.8/em; font-size: 0.95rem; font-family: inherit; transition: all 0.2s; outline: none; background: #f8fafc; resize: vertical; box-sizing: border-box; width: 100%; }
    .legacy-textarea:focus { border-color: #16a34a; background: white; box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1); }
    .modal-footer-legacy { padding: 1rem 1.5rem; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; gap: 0.75rem; background: #f8fafc; }
  `]
})
export class CierreMesComponent implements OnInit {
  private inventarioService = inject(InventarioService);
  private pdfService = inject(PdfExportService);
  cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  // Datos del Grid
  cierres: ExistenciaHistorico[] = [];
  filteredCierres: ExistenciaHistorico[] = [];
  paginatedCierres: ExistenciaHistorico[] = [];

  // Paginación
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  // Sorting state
  activeDropdown: string | null = null;
  sortColumn: string = '';
  sortAsc: boolean = true;

  toggleDropdown(col: string, event: Event) {
    event.stopPropagation();
    this.activeDropdown = this.activeDropdown === col ? null : col;
    this.showSearchFilterDropdown = false;
    this.showColumnSelector = false;
    this.showExportSelector = false;
  }

  setSort(col: string, asc: boolean) {
    this.sortColumn = col;
    this.sortAsc = asc;
    this.activeDropdown = null;
    this.aplicarFiltros();
  }


  // Estado de Menús Desplegables
  showColumnSelector = false;
  showExportSelector = false;
  showSearchFilterDropdown = false;

  // Filtros Activos
  searchQuery = '';
  filterFechaDesde = '';
  filterFechaHasta = '';
  filterEstado = '';

  // Filtros Guardados
  savedFilters: any[] = [];

  // Columnas Configurables
  columns: any[] = [
    { id: 'fecha', label: 'Fecha Hora de Reinicio de Consecutivo', visible: true },
    { id: 'inicio', label: 'Inicio Consecutivo', visible: true }
  ];

  // Nuevo Cierre Modal State
  showModal = false;
  observacionesNuevoCierre = '';
  isSubmitting = false;
  modalMode: 'ADD' | 'DELETE' = 'ADD';
  itemToDelete: string | null = null;

  // Mensajes de Transacción
  successMessage = '';
  errorMessage = '';

  ngOnInit() {
    this.cargarHistorial();
    this.loadSavedFiltersFromStorage();
  }

  toggleExport(event: Event) {
    event.stopPropagation();
    this.showExportSelector = !this.showExportSelector;
    if (this.showExportSelector) {
      this.showColumnSelector = false;
      this.showSearchFilterDropdown = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-container') && !target.closest('.search-funnel-group') && !target.closest('.export-dropdown-wrapper') && !target.closest('.dropdown-wrapper')) {
      this.showSearchFilterDropdown = false;
      this.showColumnSelector = false;
      this.showExportSelector = false;
    }
  }

  cargarHistorial() {
    this.inventarioService.getHistorialCierres().subscribe({
      next: (cierres) => {
        this.cierres = cierres;
        this.aplicarFiltros();
      },
      error: (err) => {
        console.error('Error cargando historial de cierres:', err);
        this.showTransactionAlert('No se pudo cargar el historial de cierres.', 'error');
      }
    });
  }

  // ─── Lógica de Filtros y Búsqueda ─────────────────────────────────────────

  onSearchQueryChange() {
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    const query = this.searchQuery.toLowerCase().trim();
    const desde = this.filterFechaDesde ? new Date(this.filterFechaDesde + 'T00:00:00') : null;
    const hasta = this.filterFechaHasta ? new Date(this.filterFechaHasta + 'T23:59:59') : null;
    const estado = this.filterEstado;

    this.filteredCierres = this.cierres.filter(item => {
      // 1. Filtro General de Texto
      const matchesText = !query || 
        item.id.toLowerCase().includes(query) ||
        item.usuario.toLowerCase().includes(query) ||
        (item.observaciones && item.observaciones.toLowerCase().includes(query));

      // Parseo seguro de fecha en formato dd/MM/yyyy
      const [day, month, year] = item.fecha.split('/');
      // Formato temporal para parsear hora hh:mm tt
      let cleanTime = item.hora.trim();
      let hours = 0;
      let minutes = 0;
      
      const timeParts = cleanTime.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
      if (timeParts) {
        hours = parseInt(timeParts[1]);
        minutes = parseInt(timeParts[2]);
        const ampm = timeParts[3].toUpperCase();
        if (ampm === 'PM' && hours < 12) hours += 12;
        if (ampm === 'AM' && hours === 12) hours = 0;
      }
      
      const itemDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), hours, minutes);

      // 2. Filtro Rango de Fechas
      const matchesDesde = !desde || itemDate >= desde;
      const matchesHasta = !hasta || itemDate <= hasta;

      // 3. Filtro Estado de Cierre
      const matchesEstado = !estado || item.estado === estado;

      return matchesText && matchesDesde && matchesHasta && matchesEstado;
    });

    this.currentPage = 1;
    this.recalcularPaginacion();
  }

  clearAllFilters() {
    this.searchQuery = '';
    this.filterFechaDesde = '';
    this.filterFechaHasta = '';
    this.filterEstado = '';
    this.aplicarFiltros();
  }

  // Filtros Guardados (Storage Local)
  loadSavedFiltersFromStorage() {
    const raw = localStorage.getItem('hicone_saved_filters_cierre');
    this.savedFilters = raw ? JSON.parse(raw) : [];
  }

  saveActiveFilters() {
    const filterName = prompt('Ingrese el nombre para este filtro:');
    if (!filterName) return;

    const newFilter: SavedFilter = {
      id: 'F-' + Date.now(),
      name: filterName,
      search: this.searchQuery,
      desde: this.filterFechaDesde,
      hasta: this.filterFechaHasta,
      estado: this.filterEstado
    };

    this.savedFilters.push(newFilter);
    localStorage.setItem('hicone_saved_filters_cierre', JSON.stringify(this.savedFilters));
    this.showTransactionAlert('Filtro guardado con éxito.', 'success');
  }

  loadSavedFilter(f: SavedFilter) {
    this.searchQuery = f.search;
    this.filterFechaDesde = f.desde;
    this.filterFechaHasta = f.hasta;
    this.filterEstado = f.estado;
    this.showSearchFilterDropdown = false;
    this.aplicarFiltros();
  }

  deleteSavedFilter(f: SavedFilter, event: MouseEvent) {
    event.stopPropagation();
    this.savedFilters = this.savedFilters.filter(item => item.id !== f.id);
    localStorage.setItem('hicone_saved_filters_cierre', JSON.stringify(this.savedFilters));
    this.showTransactionAlert('Filtro eliminado.', 'success');
  }

  // ─── Paginación ──────────────────────────────────────────────────────────

  recalcularPaginacion() {
    this.totalPages = Math.ceil(this.filteredCierres.length / this.pageSize) || 1;
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;

    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedCierres = this.filteredCierres.slice(start, end);
    this.cdr.detectChanges();
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.recalcularPaginacion();
    }
  }

  getPagesList(): number[] {
    const list: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - 2);
    let end = Math.min(this.totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      list.push(i);
    }
    return list;
  }

  // ─── Selector de Columnas ──────────────────────────────────────────────────

  toggleColumnSelector(event?: Event) {
    event?.stopPropagation();
    this.showColumnSelector = !this.showColumnSelector;
  }

  resetColumns() {
    this.columns.forEach(c => c.visible = true);
  }

  isColVisible(id: string): boolean {
    return this.columns.find(c => c.id === id)?.visible ?? false;
  }

  toggleSearchFilterDropdown(event: Event) {
    event.stopPropagation();
    this.showSearchFilterDropdown = !this.showSearchFilterDropdown;
  }

  // ─── CRUD y Acciones ───────────────────────────────────────────────────────

  abrirModalNuevoCierre() {
    this.observacionesNuevoCierre = '';
    this.showModal = true;
  }

  crearCierreYContinuar() {
    this.isSubmitting = true;
    this.inventarioService.crearNuevoCierre('Admin', this.observacionesNuevoCierre).subscribe({
      next: (nuevoId) => {
        this.isSubmitting = false;
        this.showModal = false;
        this.showTransactionAlert('Cierre de mes iniciado con éxito.', 'success');
        timer(1000).subscribe(() => {
          this.router.navigate(['/inventario/existencias'], { queryParams: { id: nuevoId } });
        });
      },
      error: (err) => {
        console.error('Error creando cierre de mes:', err);
        this.isSubmitting = false;
        this.showTransactionAlert('Hubo un error al generar el cierre de mes.', 'error');
      }
    });
  }

  confirmarEliminacion(id: string) {
    this.itemToDelete = id;
    this.modalMode = 'DELETE';
    this.showModal = true;
  }

  ejecutarEliminacion() {
    if (!this.itemToDelete) return;
    this.isSubmitting = true;

    this.inventarioService.deleteCierre(this.itemToDelete).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.showModal = false;
        this.itemToDelete = null;
        this.showTransactionAlert('Cierre de mes eliminado correctamente.', 'success');
        this.cargarHistorial();
      },
      error: (err) => {
        console.error('Error eliminando cierre de mes:', err);
        this.isSubmitting = false;
        this.showModal = false;
        this.itemToDelete = null;
        this.showTransactionAlert('No se pudo eliminar el cierre de mes seleccionado.', 'error');
      }
    });
  }

  verDetalle(id: string) {
    this.router.navigate(['/inventario/existencias'], { queryParams: { id: id } });
  }

  // ─── Exportaciones ─────────────────────────────────────────────────────────

  exportToCSV() {
    if (this.filteredCierres.length === 0) return;
    const headers = ['ID', 'Fecha Hora de Reinicio de Consecutivo', 'Inicio Consecutivo', 'Usuario', 'Observaciones', 'Estado'];
    const rows = this.filteredCierres.map(item => [
      item.id,
      `${item.fecha} ${item.hora}`,
      '// 00:00',
      item.usuario,
      item.observaciones || '',
      item.estado
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Historial_Cierres_Mes_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  exportToPDF() {
    if (this.filteredCierres.length === 0) return;
    const headers = ['Fecha Hora Reinicio', 'Inicio Consecutivo', 'Usuario', 'Estado'];
    const tableData = this.filteredCierres.map(item => [
      `${item.fecha} ${item.hora}`,
      '// 00:00',
      item.usuario,
      item.estado
    ]);

    this.pdfService.exportTable(
      'Historial de Cierres de Mes',
      headers,
      tableData,
      `Reporte_Cierres_Mes_${new Date().toISOString().split('T')[0]}.pdf`
    );
  }

  // Helper de Alertas
  showTransactionAlert(msg: string, type: 'success' | 'error') {
    if (type === 'success') {
      this.successMessage = msg;
      this.cdr.markForCheck();
      timer(3000).subscribe(() => {
        this.successMessage = '';
        this.cdr.markForCheck();
      });
    } else {
      this.errorMessage = msg;
      this.cdr.markForCheck();
      timer(3000).subscribe(() => {
        this.errorMessage = '';
        this.cdr.markForCheck();
      });
    }
    this.cdr.detectChanges();
  }
}
