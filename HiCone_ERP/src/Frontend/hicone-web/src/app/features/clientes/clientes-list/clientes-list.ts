import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesService, Cliente } from '../../../core/services/clientes';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clientes-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container animate-fade-in">
      <header class="page-header">
        <div class="header-main">
          <h1 class="page-title">Directorio de Clientes</h1>
          <p class="page-subtitle">Administración de la cartera de clientes y límites de crédito.</p>
        </div>
        <button class="btn-primary">
          <span class="icon">👤</span> Nuevo Cliente
        </button>
      </header>

      <div class="table-container glass">
        <div class="table-actions">
          <div class="search-box">
            <span class="search-icon">🔍</span>
            <input type="text" placeholder="Buscar por nombre, RFC o código...">
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
                  <button class="icon-btn info">👁️</button>
                  <button class="icon-btn edit">✏️</button>
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

  ngOnInit() {
    this.clientes$ = this.clientesService.getClientes();
  }
}
