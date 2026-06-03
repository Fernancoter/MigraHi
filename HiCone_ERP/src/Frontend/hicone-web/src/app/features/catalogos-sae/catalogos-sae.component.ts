import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaeService, SaeProducto } from '../../core/services/sae';

@Component({
  selector: 'app-catalogos-sae',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="module-page animate-fade-in">
      <header class="module-header">
        <div class="title-area">
          <h1>📂 Catálogos Maestros SAE</h1>
          <p>Consulta de inventarios, productos y clientes registrados en Aspel SAE</p>
        </div>
        <div class="actions" style="display: flex; gap: 1rem; align-items: center;">
          <button class="btn-sync" (click)="onSync()">🔄 Sincronizar con SAE</button>
          <div class="tabs">
            <button class="tab-btn" [class.active]="activeTab === 'inv'" (click)="activeTab = 'inv'">📦 Inventario</button>
            <button class="tab-btn" [class.active]="activeTab === 'clt'" (click)="activeTab = 'clt'">👥 Clientes</button>
          </div>
        </div>
      </header>

      <div class="content-card" *ngIf="activeTab === 'inv'">
        <div class="card-header">
          <div class="search-box">
            <span>🔍</span>
            <input type="text" placeholder="Buscar por clave o descripción..." (input)="onSearch($event)">
          </div>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Clave</th>
              <th>Descripción</th>
              <th>Existencia</th>
              <th>Estatus</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let p of filteredProductos">
              <td class="bold">{{ p.productNumber }}</td>
              <td>{{ p.productName }}</td>
              <td>{{ p.stock || 0 | number }}</td>
              <td>
                <span class="status-pill" [class.active]="p.isActive">
                  {{ p.isActive ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
            </tr>
            <tr *ngIf="filteredProductos.length === 0">
              <td colspan="4" style="text-align: center; padding: 2rem; color: #94a3b8;">
                No hay productos cargados. Presiona "Sincronizar con SAE" para importar datos.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="content-card placeholder" *ngIf="activeTab === 'clt'">
        <div class="empty-state">
          <span class="icon">👥</span>
          <h3>Catálogo de Clientes en SAE</h3>
          <p>Módulo en sincronización. Próximamente visualización detallada de estados de cuenta.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .module-page { padding: 2rem; }
    .module-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem; border-bottom: 2px solid #f1f5f9; padding-bottom: 1rem; }
    h1 { font-size: 1.75rem; color: var(--text-main); margin: 0; }
    p { color: var(--text-muted); font-size: 0.875rem; }

    .btn-sync {
      background: #1e293b; color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 8px;
      font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: all 0.2s;
    }
    .btn-sync:hover { background: #0f172a; transform: translateY(-1px); }

    .tabs { display: flex; gap: 0.5rem; }
    .tab-btn { background: transparent; border: none; padding: 0.75rem 1.5rem; font-weight: 700; color: #64748b; cursor: pointer; border-radius: 8px 8px 0 0; position: relative; }
    .tab-btn.active { color: var(--primary); }
    .tab-btn.active::after { content: ''; position: absolute; bottom: -1rem; left: 0; width: 100%; height: 4px; background: var(--primary); border-radius: 2px; }

    .content-card { background: white; border-radius: 12px; border: 1px solid var(--border-color); box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
    .card-header { padding: 1.5rem; }
    
    .search-box { display: flex; align-items: center; gap: 0.75rem; background: #f8fafc; padding: 0.75rem 1rem; border-radius: 10px; border: 1px solid #e2e8f0; max-width: 400px; }
    .search-box input { background: transparent; border: none; outline: none; width: 100%; font-size: 0.9rem; }

    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th { text-align: left; padding: 1rem 1.5rem; font-size: 0.75rem; color: #64748b; text-transform: uppercase; background: #f8fafc; }
    .data-table td { padding: 1.25rem 1.5rem; border-top: 1px solid #f1f5f9; font-size: 0.875rem; }
    
    .status-pill { padding: 0.25rem 0.6rem; border-radius: 20px; font-size: 0.7rem; font-weight: 700; background: #cbd5e1; color: #475569; }
    .status-pill.active { background: #dcfce7; color: #166534; }

    .placeholder { padding: 5rem; text-align: center; }
    .empty-state .icon { font-size: 4rem; display: block; margin-bottom: 1.5rem; opacity: 0.3; }
    .empty-state h3 { font-size: 1.25rem; color: #1e293b; margin-bottom: 0.5rem; }
    .empty-state p { color: #64748b; }
    .bold { font-weight: 700; }
  `]
})
export class CatalogosSaeComponent implements OnInit {
  private saeService = inject(SaeService);
  activeTab = 'inv';
  productos: SaeProducto[] = [];
  filteredProductos: SaeProducto[] = [];

  ngOnInit() {
    this.loadProductos();
  }

  loadProductos() {
    this.saeService.getProductos().subscribe(data => {
      this.productos = data;
      this.filteredProductos = data;
    });
  }

  onSync() {
    this.saeService.sincronizar().subscribe(res => {
      alert('Sincronización con SAE completada');
      this.loadProductos();
    });
  }

  onSearch(event: any) {
    const term = event.target.value.toLowerCase();
    this.filteredProductos = this.productos.filter(p => 
      p.productNumber.toLowerCase().includes(term) || 
      p.productName.toLowerCase().includes(term)
    );
  }
}
