import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClientesService, Cliente } from '../../../core/services/clientes';
import { Observable } from 'rxjs';
import { LucidePencil, LucideX, LucideTrash2, LucideFolder, LucideSave, LucideSearch, LucideEye, LucideUser } from '@lucide/angular';

@Component({
  selector: 'app-clientes-list',
  standalone: true,
  imports: [CommonModule, RouterModule, LucidePencil, LucideX, LucideTrash2, LucideFolder, LucideSave, LucideSearch, LucideEye, LucideUser],
  template: `
    <div class="page-container animate-fade-in">
      <header class="page-header">
        <div class="header-main">
          <h1 class="page-title">Directorio de Clientes</h1>
          <p class="page-subtitle">Administración de la cartera de clientes y límites de crédito.</p>
        </div>
        <button class="btn-primary">
          <span class="icon"><svg lucideUser [size]="14"></svg></span> Nuevo Cliente
        </button>
      </header>

      <div class="table-container glass">
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
              <input type="text" placeholder="Buscar por nombre, RFC o código...">
            </div>
          </div>
          <div class="filters">
            <button class="filter-btn active">Todos</button>
            <button class="filter-btn">Con Crédito</button>
            <button class="filter-btn">Inactivos</button>
          </div>
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>RFC / Código</th>
              <th>Contacto</th>
              <th>Límite de Crédito</th>
              <th>Estado</th>
              <th class="text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of (clientes$ | async)">
              <td>
                <div class="item-cell">
                  <div class="item-avatar">{{ item.nombre.charAt(0) }}</div>
                  <div class="item-info">
                    <span class="item-name">{{ item.nombre }}</span>
                    <span class="item-desc">{{ item.direccion }}</span>
                  </div>
                </div>
              </td>
              <td>
                <div class="id-column">
                  <span class="rfc-tag">{{ item.rfc || 'XAX010101000' }}</span>
                  <span class="code-tag">{{ item.codigo }}</span>
                </div>
              </td>
              <td>
                <div class="contact-info">
                  <span class="contact-item">📞 {{ item.telefono || 'Sin tel.' }}</span>
                  <span class="contact-item text-primary">✉️ {{ item.email }}</span>
                </div>
              </td>
              <td class="font-bold text-center">
                {{ (item.limiteCredito || 0) | currency:'USD' }}
              </td>
              <td>
                <span class="status-indicator" [class.active]="item.isActive">
                  {{ item.isActive ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td class="text-right">
                <div class="action-buttons">
                  <button class="icon-btn info"><svg lucideEye [size]="14"></svg></button>
                  <button class="icon-btn edit"><svg lucidePencil [size]="14"></svg></button>
                </div>
              </td>
            </tr>
            <tr *ngIf="!(clientes$ | async)?.length">
              <td colspan="6" class="empty-state">
                <div class="empty-icon">👥</div>
                <p>Aún no hay clientes registrados en el sistema.</p>
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

    .filter-search-group-qa { display: flex; gap: 0.6rem; align-items: center; }
    .dropdown-wrapper { position: relative; }
    .btn-filter-funnel-qa { background: #ffffff; border: 1px solid var(--border-color); border-radius: 4px; padding: 0.4rem 0.6rem; height: 32px; display: inline-flex; align-items: center; justify-content: center; gap: 3px; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.08); transition: background 0.2s; }
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

    .search-box {
      display: flex;
      align-items: center;
      background: var(--bg-main);
      padding: 0.5rem 1rem;
      border-radius: 8px;
      width: 350px;
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
    .filter-btn.active { background: var(--primary); color: white; border-color: var(--primary); }

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
      width: 42px;
      height: 42px;
      background: linear-gradient(135deg, #6366f1, #a855f7);
      color: white;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.2rem;
    }
    .item-info { display: flex; flex-direction: column; }
    .item-name { font-weight: 600; font-size: 1rem; color: var(--text-main); }
    .item-desc { font-size: 0.8rem; color: var(--text-muted); }

    .id-column { display: flex; flex-direction: column; gap: 0.25rem; }
    .rfc-tag { font-weight: 700; font-size: 0.85rem; color: var(--text-main); }
    .code-tag { font-size: 0.75rem; color: var(--text-muted); font-family: monospace; }

    .contact-info { display: flex; flex-direction: column; gap: 0.2rem; }
    .contact-item { font-size: 0.85rem; }

    .status-indicator {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8rem;
      font-weight: 600;
      color: #94a3b8;
    }
    .status-indicator::before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #cbd5e1;
    }
    .status-indicator.active { color: #059669; }
    .status-indicator.active::before { background: #10b981; box-shadow: 0 0 8px rgba(16, 185, 129, 0.5); }

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
    .icon-btn:hover { background: var(--bg-main); border-color: var(--primary); color: var(--primary); }

    .empty-state { padding: 5rem; text-align: center; color: var(--text-muted); }
    .empty-icon { font-size: 3rem; margin-bottom: 1rem; opacity: 0.3; }
  `]
})
export class ClientesListComponent implements OnInit {
  private clientesService = inject(ClientesService);
  clientes$!: Observable<Cliente[]>;
  showSearchFilterDropdown = false;
  savedFilters: any[] = [];

  ngOnInit() {
    this.clientes$ = this.clientesService.getClientes();
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
