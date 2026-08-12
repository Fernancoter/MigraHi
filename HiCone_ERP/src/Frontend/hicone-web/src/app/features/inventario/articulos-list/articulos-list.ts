import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventarioService, Articulo } from '../../../core/services/inventario';
import { Observable } from 'rxjs';

import { LucidePencil, LucideX, LucideTrash2, LucideFolder, LucideSave, LucideSearch } from '@lucide/angular';

@Component({
  selector: 'app-articulos-list',
  standalone: true,
  imports: [CommonModule, LucidePencil, LucideX, LucideTrash2, LucideFolder, LucideSave, LucideSearch],
  template: `
    <div class="module-page animate-fade-in">
      <div class="page-header-premium">
        <div class="title-section">
          <h1 class="premium-title">Inventario de Artículos</h1>
          <nav class="breadcrumb-modern">
            <span class="root">Inventarios</span>
            <span class="sep">&rsaquo;</span>
            <span class="active">Artículos</span>
          </nav>
        </div>
        <button class="btn-primary-green">
          <span class="icon">＋</span> Nuevo Artículo
        </button>
      </div>

      <div class="card-premium" style="padding: 1.5rem;">
        <div class="table-actions">
          <div class="filter-search-group-qa">
            <div class="dropdown-wrapper">
              <button class="btn-filter-funnel-qa" (click)="toggleSearchFilterDropdown($event)" title="Filtros avanzados">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
                <span class="chevron-down-funnel">▾</span>
              </button>
              
              <div class="filter-popover-qa shadow-premium" *ngIf="showSearchFilterDropdown" (click)="$event.stopPropagation()">
                <div class="filter-item-qa" (click)="clearAllFilters()">
                  <span class="icon-circle-cross-dark"><svg lucideX [size]="12"></svg></span> Limpiar filtros
                </div>
                <div class="filter-item-qa" (click)="saveActiveFilters()">
                  <span class="icon-floppy-dark"><svg lucideSave [size]="14"></svg></span> Guardar filtro como...
                </div>
                
                <ng-container *ngIf="savedFilters.length > 0">
                  <div class="dropdown-divider"></div>
                  <div class="dropdown-header-saved">Filtros Guardados</div>
                  <div class="filter-item-qa saved-filter-item" *ngFor="let f of savedFilters" (click)="loadSavedFilter(f)">
                    <span><svg lucideFolder [size]="14"></svg> {{ f.name }}</span>
                    <span class="btn-delete-saved-filter" (click)="deleteSavedFilter(f, $event)"><svg lucideTrash2 [size]="14"></svg></span>
                  </div>
                </ng-container>
              </div>
            </div>

            <div class="search-box">
              <span class="search-icon"><svg lucideSearch [size]="14"></svg></span>
              <input type="text" placeholder="Filtrar por nombre o código...">
            </div>
          </div>
          <div class="filters">
            <button class="filter-btn active">Todos</button>
            <button class="filter-btn">Stock Bajo</button>
            <button class="filter-btn">Categorías</button>
          </div>
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Artículo</th>
              <th>Categoría</th>
              <th>Existencia</th>
              <th>Precio</th>
              <th>Estado</th>
              <th class="text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of (articulos$ | async)">
              <td class="font-mono text-muted">{{ item.codigo }}</td>
              <td>
                <div class="item-cell">
                  <div class="item-avatar">{{ item.nombre.charAt(0) }}</div>
                  <div class="item-info">
                    <span class="item-name">{{ item.nombre }}</span>
                    <span class="item-desc">{{ item.descripcion }}</span>
                  </div>
                </div>
              </td>
              <td><span class="badge-category">{{ item.categoria?.nombre || 'General' }}</span></td>
              <td>
                <div class="stock-container">
                  <span class="stock-value" [class.text-danger]="item.existencia < 10">
                    {{ item.existencia }}
                  </span>
                  <div class="stock-bar">
                    <div class="bar-inner" [style.width.%]="(item.existencia / 100) * 100" 
                         [class.low]="item.existencia < 10"></div>
                  </div>
                </div>
              </td>
              <td class="font-bold">{{ item.precio | currency:'USD' }}</td>
              <td>
                <span class="status-badge" [class.active]="item.existencia > 0">
                  {{ item.existencia > 0 ? 'Disponible' : 'Sin Stock' }}
                </span>
              </td>
              <td class="text-right">
                <div class="action-buttons">
                  <button class="icon-btn edit"><svg lucidePencil [size]="14"></svg></button>
                  <button class="icon-btn delete"><svg lucideTrash2 [size]="14"></svg></button>
                </div>
              </td>
            </tr>
            <tr *ngIf="!(articulos$ | async)?.length">
              <td colspan="7" class="empty-state">
                No se encontraron artículos en el inventario.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 2rem;
    }
    .page-title { font-size: 1.85rem; margin-bottom: 0.25rem; }
    .page-subtitle { color: var(--text-muted); font-size: 0.95rem; }

    .btn-primary {
      background: var(--primary);
      color: white;
      border: none;
      padding: 0.75rem 1.25rem;
      border-radius: var(--radius-md);
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      box-shadow: var(--shadow-md);
    }

    .table-container {
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
    }

    .table-actions {
      padding: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border-color);
    }

    .search-box {
      display: flex;
      align-items: center;
      background: var(--bg-main);
      padding: 0.5rem 1rem;
      border-radius: 8px;
      width: 320px;
      border: 1px solid var(--border-color);
    }
    .search-box input {
      background: transparent;
      border: none;
      outline: none;
      margin-left: 0.5rem;
      width: 100%;
    }

    .filters { display: flex; gap: 0.5rem; }
    .filter-btn {
      padding: 0.4rem 1rem;
      border-radius: 20px;
      border: 1px solid var(--border-color);
      background: transparent;
      font-size: 0.85rem;
      cursor: pointer;
      color: var(--text-muted);
    }
    .filter-btn.active {
      background: var(--primary);
      color: white;
      border-color: var(--primary);
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }
    .data-table th {
      background: rgba(var(--bg-main), 0.5);
      padding: 1rem 1.5rem;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
    }
    .data-table td {
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid var(--border-color);
      vertical-align: middle;
    }

    .item-cell { display: flex; align-items: center; gap: 1rem; }
    .item-avatar {
      width: 38px;
      height: 38px;
      background: #e0e7ff;
      color: #4f46e5;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
    }
    .item-info { display: flex; flex-direction: column; }
    .item-name { font-weight: 600; font-size: 0.95rem; }
    .item-desc { font-size: 0.8rem; color: var(--text-muted); }

    .badge-category {
      padding: 0.25rem 0.6rem;
      background: #f1f5f9;
      color: #475569;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .stock-container { width: 120px; }
    .stock-value { font-size: 0.9rem; font-weight: 700; display: block; margin-bottom: 0.25rem; }
    .stock-bar { height: 6px; background: #e2e8f0; border-radius: 10px; overflow: hidden; }
    .bar-inner { height: 100%; background: var(--accent); border-radius: 10px; }
    .bar-inner.low { background: var(--danger); }

    .status-badge {
      display: inline-block;
      padding: 0.2rem 0.6rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 700;
      background: #fee2e2;
      color: #991b1b;
    }
    .status-badge.active { background: #d1fae5; color: #065f46; }

    .action-buttons { display: flex; gap: 0.5rem; justify-content: flex-end; }
    .icon-btn {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      border: 1px solid var(--border-color);
      background: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }
    .icon-btn:hover { background: var(--bg-main); }
    .icon-btn.delete:hover { border-color: var(--danger); color: var(--danger); }

    .filter-search-group-qa { display: flex; gap: 0.6rem; align-items: center; }
    .dropdown-wrapper { position: relative; }
    .btn-filter-funnel-qa { background: #ffffff; border: 1px solid var(--border-color, #dcdde1); border-radius: 4px; padding: 0.4rem 0.6rem; height: 32px; display: inline-flex; align-items: center; justify-content: center; gap: 3px; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.08); transition: background 0.2s; }
    .btn-filter-funnel-qa:hover { background: #f8fafc; border-color: #cbd5e1; }
    .chevron-down-funnel { font-size: 0.65rem; color: #334155; }
    .filter-popover-qa { position: absolute; top: calc(100% + 4px); left: 0; background: #ffffff !important; border: 1px solid #cbd5e1 !important; border-radius: 6px !important; width: 185px !important; box-shadow: 0 6px 20px rgba(0,0,0,0.15) !important; z-index: 99999 !important; padding: 6px 0 !important; box-sizing: border-box; }
    .filter-item-qa { display: flex; align-items: center; gap: 8px; padding: 0.55rem 0.9rem; font-size: 0.85rem; color: #334155; font-weight: 500; cursor: pointer; transition: background 0.15s; }
    .filter-item-qa:hover { background: #f1f5f9; color: #2e7d32; }
    .icon-circle-cross-dark { display: inline-flex; align-items: center; justify-content: center; width: 15px; height: 15px; background: #475569; color: white; border-radius: 50%; font-size: 8px; font-weight: bold; }
    .filter-item-qa:hover .icon-circle-cross-dark { background: #2e7d32; }
    .icon-floppy-dark { font-size: 0.9rem; color: #475569; }
    .filter-item-qa:hover .icon-floppy-dark { color: #2e7d32; }
    .dropdown-divider { height: 1px; background: #e2e8f0; margin: 4px 0; }
    .dropdown-header-saved { font-size: 0.7rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; padding: 4px 12px; }
    .saved-filter-item { justify-content: space-between; }
    .btn-delete-saved-filter { cursor: pointer; opacity: 0.7; font-size: 0.8rem; }
    .btn-delete-saved-filter:hover { opacity: 1; }

    .empty-state { padding: 4rem; text-align: center; color: var(--text-muted); }
  `]
})
export class ArticulosListComponent implements OnInit {
  private inventarioService = inject(InventarioService);
  articulos$!: Observable<Articulo[]>;
  showSearchFilterDropdown = false;
  savedFilters: any[] = [];

  ngOnInit() {
    this.articulos$ = this.inventarioService.getArticulos();
  }

  toggleSearchFilterDropdown(e: Event) {
    e.stopPropagation();
    this.showSearchFilterDropdown = !this.showSearchFilterDropdown;
  }

  clearAllFilters() {
    this.showSearchFilterDropdown = false;
  }

  saveActiveFilters() {
    const name = prompt('Nombre para este filtro guardado:');
    if (name) {
      this.savedFilters.push({ id: Date.now(), name });
    }
    this.showSearchFilterDropdown = false;
  }

  loadSavedFilter(f: any) {
    this.showSearchFilterDropdown = false;
  }

  deleteSavedFilter(f: any, e: Event) {
    e.stopPropagation();
    this.savedFilters = this.savedFilters.filter(item => item.id !== f.id);
  }
}
