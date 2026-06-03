import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduccionService, Bobina } from '../../../core/services/produccion';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bobinas-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container animate-fade-in">
      <header class="page-header">
        <div class="header-main">
          <nav class="breadcrumb">Extrusión > Operación > Bobinas</nav>
          <h1 class="page-title">Bobinas</h1>
        </div>
      </header>

      <div class="content-card glass shadow-sm">
        <div class="action-bar-legacy">
          <div class="left-actions">
            <button class="btn-legacy-action">
              <span>📥 Exportar</span>
              <span class="chevron-down">▾</span>
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
                <th>Número de Serie &nbsp;↑</th>
                <th>Bobina No &nbsp;▾</th>
                <th>Peso (Kg) &nbsp;▾</th>
                <th>Calibre &nbsp;▾</th>
                <th>Desviación &nbsp;▾</th>
                <th>Fecha Producción &nbsp;▾</th>
                <th>Estado &nbsp;▾</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let b of filteredBobinas">
                <td class="actions-cell">
                  <a class="action-link-green" (click)="ver(b)">Visualizar</a>
                  <a class="action-link-green ml-3" (click)="validar(b)" *ngIf="b.estado === 'Creada'">Validar</a>
                </td>
                <td class="serial-cell"><strong>{{ b.noSerie }}</strong></td>
                <td>{{ b.bobinaNo }}</td>
                <td>{{ b.kg || b.mermaKg | number:'1.2-2' }}</td>
                <td>{{ b.espesor || 0.05 }}</td>
                <td>{{ b.mermaKg || 0 }}</td>
                <td>{{ b.fechaProduccion | date:'dd/MM/yy HH:mm' }}</td>
                <td>
                  <span class="status-badge" [class.valid]="b.estado === 'Aprobada'" [class.pending]="b.estado === 'Creada'">
                    {{ b.estado }}
                  </span>
                </td>
              </tr>
              <tr *ngIf="filteredBobinas.length === 0">
                <td colspan="8" class="empty-row-legacy">No hay bobinas registradas.</td>
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
    
    .actions-col { width: 200px; }
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

    .serial-cell { color: #0f172a; }

    .status-badge { 
      padding: 0.2rem 0.5rem; 
      border-radius: 4px; 
      font-size: 0.75rem; 
      font-weight: 700; 
    }
    .status-badge.valid { background: #dcfce7; color: #15803d; }
    .status-badge.pending { background: #fef3c7; color: #d97706; }

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
export class BobinasListComponent implements OnInit {
  private prodService = inject(ProduccionService);
  bobinas: Bobina[] = [];
  filteredBobinas: Bobina[] = [];
  searchTerm: string = '';

  ngOnInit() {
    this.prodService.getBobinasDisponibles().subscribe({
      next: (data) => {
        this.bobinas = data;
        this.filteredBobinas = data;
      },
      error: (err) => console.error('Error al cargar bobinas disponibles:', err)
    });
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredBobinas = this.bobinas;
    } else {
      this.filteredBobinas = this.bobinas.filter(b => 
        b.noSerie.toLowerCase().includes(term)
      );
    }
  }

  ver(b: Bobina) {
    alert(`Visualizando detalles de Bobina: ${b.noSerie}`);
  }

  validar(b: Bobina) {
    this.prodService.validarBobina(b.id).subscribe({
      next: () => {
        alert('Bobina validada con éxito');
        b.estado = 'Aprobada';
      },
      error: (err) => console.error('Error al validar bobina:', err)
    });
  }
}

