import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventarioService, Articulo } from '../../../core/services/inventario';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-articulos-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container animate-fade-in">
      <header class="page-header">
        <div class="header-main">
          <h1 class="page-title">Inventario de Artículos</h1>
          <p class="page-subtitle">Gestión centralizada del catálogo de productos y existencias.</p>
        </div>
        <button class="btn-primary">
          <span class="icon">＋</span> Nuevo Artículo
        </button>
      </header>

      <div class="table-container glass">
        <div class="table-actions">
          <div class="search-box">
            <span class="search-icon">🔍</span>
            <input type="text" placeholder="Filtrar por nombre o código...">
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
                  <button class="icon-btn edit">✏️</button>
                  <button class="icon-btn delete">🗑️</button>
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

    .empty-state { padding: 4rem; text-align: center; color: var(--text-muted); }
  `]
})
export class ArticulosListComponent implements OnInit {
  private inventarioService = inject(InventarioService);
  articulos$!: Observable<Articulo[]>;

  ngOnInit() {
    this.articulos$ = this.inventarioService.getArticulos();
  }
}
