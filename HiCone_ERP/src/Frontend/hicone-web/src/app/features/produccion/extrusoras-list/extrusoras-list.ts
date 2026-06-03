import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduccionService, Extrusora } from '../../../core/services/produccion';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-extrusoras-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container animate-fade-in">
      <header class="page-header">
        <div class="header-main">
          <nav class="breadcrumb">Extrusión > Extrusoras</nav>
          <h1 class="page-title">Extrusora</h1>
        </div>
      </header>

      <div class="content-card glass shadow-sm">
        <div class="action-bar-legacy">
          <div class="left-actions">
            <button class="btn-legacy-action">
              <span>📥 Exportar</span>
              <span class="chevron-down">▾</span>
            </button>
            <button class="btn-legacy-action" (click)="agregarExtrusora()">
              <span>Agregar</span>
            </button>
            <button class="btn-legacy-action">
              <span>Selecciona columnas</span>
              <span class="chevron-down">▾</span>
            </button>
          </div>
          <div class="right-actions">
            <span class="filter-icon-legacy">⏳</span>
            <div class="search-box-legacy">
              <input type="text" placeholder="Buscar" [(ngModel)]="searchTerm" (input)="onSearch()">
            </div>
          </div>
        </div>

        <div class="table-scroll">
          <table class="data-table-legacy">
            <thead>
              <tr>
                <th class="actions-col"></th>
                <th>Extrusora &nbsp;↑</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let ext of filteredExtrusoras">
                <td class="actions-cell">
                  <a class="action-link-green" (click)="ver(ext)">Visualizar</a>
                  <a class="action-link-green ml-3" (click)="modificar(ext)">Modificar</a>
                  <a class="action-link-green ml-3" (click)="eliminar(ext)">Eliminar</a>
                </td>
                <td class="ext-name-cell">{{ ext.nombre }}</td>
              </tr>
              <tr *ngIf="filteredExtrusoras.length === 0">
                <td colspan="2" class="empty-row-legacy">No hay extrusoras registradas.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Paginación -->
        <div class="pagination-footer-legacy">
          <span class="page-info-legacy">Página 1 de 1</span>
          <div class="page-buttons-legacy">
            <button class="btn-page-legacy disabled">Ant</button>
            <button class="btn-page-legacy active">1</button>
            <button class="btn-page-legacy disabled">Sig</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: 1.5rem; background: #f8fafc; min-height: 100%; font-family: 'Outfit', sans-serif; }
    .breadcrumb { font-size: 0.8rem; color: #64748b; margin-bottom: 0.5rem; font-weight: 500; }
    .page-title { font-size: 1.75rem; font-weight: 800; color: #166534; margin: 0 0 1.5rem 0; }

    .content-card { background: white; border: 1px solid #cbd5e1; border-radius: 4px; overflow: hidden; }
    .action-bar-legacy { 
      padding: 0.85rem 1.25rem; 
      border-bottom: 1px solid #cbd5e1; 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      background: white; 
      gap: 1rem; 
      flex-wrap: wrap; 
    }
    
    .left-actions { display: flex; gap: 0.5rem; }
    .btn-legacy-action { 
      background: white; 
      border: 1px solid #4caf50; 
      color: #2e7d32; 
      padding: 0.45rem 1rem; 
      border-radius: 4px; 
      font-weight: 700; 
      font-size: 0.8rem; 
      cursor: pointer; 
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      transition: all 0.2s;
    }
    .btn-legacy-action:hover { 
      background: #e8f5e9; 
      border-color: #2e7d32;
    }
    .chevron-down { font-size: 0.75rem; }

    .right-actions { display: flex; align-items: center; gap: 0.5rem; }
    .filter-icon-legacy { 
      font-size: 1rem; 
      color: #78909c; 
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      transform: rotate(90deg);
    }
    .search-box-legacy { 
      position: relative;
    }
    .search-box-legacy input { 
      border: none; 
      border-bottom: 1px solid #4caf50; 
      outline: none; 
      padding: 0.25rem 0.5rem; 
      font-size: 0.85rem; 
      width: 180px; 
      font-family: inherit;
    }
    .search-box-legacy input::placeholder {
      color: #94a3b8;
    }

    .table-scroll { overflow-x: auto; }
    .data-table-legacy { width: 100%; border-collapse: collapse; text-align: left; }
    .data-table-legacy th { 
      background: #f8fafc; 
      color: #475569; 
      font-size: 0.75rem; 
      font-weight: 700; 
      padding: 0.75rem 1.25rem; 
      border-bottom: 1px solid #cbd5e1; 
      white-space: nowrap;
    }
    .data-table-legacy td { 
      padding: 0.75rem 1.25rem; 
      border-bottom: 1px solid #f1f5f9; 
      font-size: 0.85rem; 
      color: #334155; 
      vertical-align: middle; 
    }
    
    .actions-col { width: 280px; }
    .actions-cell { white-space: nowrap; }
    
    .action-link-green { 
      color: #2e7d32; 
      font-weight: 600; 
      cursor: pointer; 
      text-decoration: none; 
      font-size: 0.85rem;
    }
    .action-link-green:hover { 
      text-decoration: underline; 
    }
    .ml-3 { margin-left: 0.75rem; }

    .ext-name-cell { font-size: 0.85rem; color: #0f172a; }

    .empty-row-legacy { text-align: center; color: #94a3b8; padding: 2rem !important; font-style: italic; }

    .pagination-footer-legacy { 
      padding: 0.85rem 1.25rem; 
      border-top: 1px solid #cbd5e1; 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      background: white; 
    }
    .page-info-legacy { font-size: 0.8rem; color: #64748b; font-weight: 600; }
    .page-buttons-legacy { display: flex; gap: 0.25rem; }
    .btn-page-legacy { 
      border: 1px solid #cbd5e1; 
      background: white; 
      padding: 0.35rem 0.75rem; 
      border-radius: 4px; 
      font-size: 0.8rem; 
      font-weight: 700; 
      cursor: pointer; 
      color: #475569;
    }
    .btn-page-legacy.active { 
      background: #4caf50; 
      color: white; 
      border-color: #4caf50; 
      box-shadow: 0 1px 3px rgba(76,175,80,0.3);
    }
    .btn-page-legacy.disabled { opacity: 0.5; cursor: not-allowed; }
  `]
})
export class ExtrusorasListComponent implements OnInit {
  private prodService = inject(ProduccionService);
  extrusoras: Extrusora[] = [];
  filteredExtrusoras: Extrusora[] = [];
  searchTerm: string = '';

  ngOnInit() {
    this.prodService.getExtrusoras().subscribe({
      next: (data) => {
        this.extrusoras = data;
        this.filteredExtrusoras = data;
      },
      error: (err) => console.error('Error al cargar extrusoras:', err)
    });
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredExtrusoras = this.extrusoras;
    } else {
      this.filteredExtrusoras = this.extrusoras.filter(e => 
        e.nombre.toLowerCase().includes(term) || e.codigo.toLowerCase().includes(term)
      );
    }
  }

  agregarExtrusora() {
    alert('Función para agregar nueva extrusora');
  }

  ver(ext: Extrusora) {
    alert(`Visualizando detalles de: ${ext.nombre}`);
  }

  modificar(ext: Extrusora) {
    alert(`Modificando: ${ext.nombre}`);
  }

  eliminar(ext: Extrusora) {
    if (confirm(`¿Está seguro de eliminar la ${ext.nombre}?`)) {
      alert(`Eliminado: ${ext.nombre}`);
    }
  }
}

