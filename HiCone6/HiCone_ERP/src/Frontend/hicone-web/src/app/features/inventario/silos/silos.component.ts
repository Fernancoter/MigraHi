import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-silos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up">
      <div class="page-header-premium">
        <div class="title-section">
          <h1 class="premium-title">🏺 Gestión de Silos</h1>
          <nav class="breadcrumb-modern">
            <span class="root">Inventarios</span>
            <span class="sep">/</span>
            <span class="active">Silos</span>
          </nav>
        </div>
        
        <div class="toolbar-premium">
          <div class="btn-group-modern">
            <button class="btn-modern secondary">📥 Exportar</button>
            <button class="btn-modern secondary">Seleccionar Columnas</button>
            <button class="btn-modern primary">+ Agregar Silo</button>
          </div>
          <div class="search-modern">
            <input type="text" placeholder="Buscar silo..." [(ngModel)]="searchQuery">
            <span class="search-icon">🔍</span>
          </div>
        </div>
      </div>

      <div class="content-container">
        <div class="table-card shadow-premium">
          <table class="premium-grid">
            <thead>
              <tr>
                <th colspan="4" class="actions-header">Acciones</th>
                <th class="sortable">Nombre</th>
                <th class="text-right sortable">Capacidad (kg)</th>
                <th class="text-right sortable">Mínimo (kg)</th>
                <th class="text-right sortable">Máximo (kg)</th>
                <th class="sortable">Estado Material</th>
                <th class="sortable">Tipo Material</th>
                <th class="text-center">Activo</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let s of filteredSilos" class="grid-row">
                <td class="action-cell"><button class="btn-action archive">Archivar</button></td>
                <td class="action-cell"><button class="btn-action view">Ver</button></td>
                <td class="action-cell"><button class="btn-action edit">Editar</button></td>
                <td class="action-cell"><button class="btn-action delete">Borrar</button></td>
                <td class="font-semibold">{{ s.nombre }}</td>
                <td class="text-right font-mono">{{ s.capacidad | number:'1.2-2' }}</td>
                <td class="text-right font-mono">{{ s.kgMinimo | number:'1.2-2' }}</td>
                <td class="text-right font-mono">{{ s.kgMaximo | number:'1.2-2' }}</td>
                <td>
                   <span class="status-badge" [class.virgin]="s.estadoMaterial.includes('Virgen')">
                     {{ s.estadoMaterial }}
                   </span>
                </td>
                <td>{{ s.tipoMaterial }}</td>
                <td class="text-center">
                  <div class="active-indicator" [class.on]="s.activo"></div>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div class="table-footer-modern">
            <div class="results-count">Mostrando 1-7 de 12 registros</div>
            <div class="pagination-modern">
              <button class="pag-btn-modern">Anterior</button>
              <div class="pages">
                <span class="page-num active">1</span>
                <span class="page-num">2</span>
              </div>
              <button class="pag-btn-modern">Siguiente</button>
            </div>
          </div>
        </div>
      </div>
      
      <footer class="module-footer-premium">
        <div class="footer-left">
          🕒 Última actualización: <span class="highlight">22/04/2026</span>
        </div>
        <div class="footer-right">
          © 2026 HI-CONE ERP | v2.1-Premium
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .module-page { padding: 2rem; background: #f8fafc; min-height: 100vh; font-family: 'Inter', sans-serif; }
    
    .page-header-premium { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem; }
    .premium-title { font-size: 2rem; font-weight: 800; color: #1e293b; margin: 0; }
    .breadcrumb-modern { font-size: 0.85rem; color: #64748b; margin-top: 0.25rem; }
    .breadcrumb-modern .sep { margin: 0 0.5rem; opacity: 0.5; }
    .breadcrumb-modern .active { color: #166534; font-weight: 700; }

    .toolbar-premium { display: flex; flex-direction: column; align-items: flex-end; gap: 1rem; }
    .btn-group-modern { display: flex; gap: 0.75rem; }
    
    .btn-modern {
      padding: 0.6rem 1.25rem; border-radius: 10px; font-weight: 700; font-size: 0.85rem;
      cursor: pointer; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); border: none;
    }
    .btn-modern.primary { background: linear-gradient(135deg, #166534 0%, #22c55e 100%); color: white; box-shadow: 0 4px 12px rgba(22, 197, 94, 0.3); }
    .btn-modern.primary:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(22, 197, 94, 0.4); }
    .btn-modern.secondary { background: white; color: #334155; border: 1px solid #e2e8f0; }
    .btn-modern.secondary:hover { background: #f1f5f9; border-color: #cbd5e1; }

    .search-modern { position: relative; width: 300px; }
    .search-modern input {
      width: 100%; padding: 0.6rem 1rem 0.6rem 2.5rem; border-radius: 10px;
      border: 1px solid #e2e8f0; background: white; font-size: 0.9rem;
      transition: all 0.2s;
    }
    .search-modern input:focus { outline: none; border-color: #22c55e; box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.1); }
    .search-icon { position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); opacity: 0.4; }

    .shadow-premium { box-shadow: 0 10px 40px -10px rgba(0,0,0,0.08); }
    .table-card { background: white; border-radius: 16px; overflow: hidden; border: 1px solid #f1f5f9; }

    .premium-grid { width: 100%; border-collapse: collapse; }
    .premium-grid th {
      background: #1e293b; color: white; padding: 1.2rem 1rem; text-align: left;
      font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
    }
    .actions-header { text-align: center; background: #0f172a !important; border-right: 1px solid rgba(255,255,255,0.1); }
    
    .grid-row { transition: background 0.2s; border-bottom: 1px solid #f1f5f9; }
    .grid-row:hover { background: #f0fdf4; }
    .grid-row td { padding: 1rem; font-size: 0.875rem; color: #334155; }

    .action-cell { padding: 0.75rem 0.5rem !important; }
    .btn-action {
      width: 100%; padding: 0.35rem; border-radius: 6px; font-size: 0.7rem; font-weight: 700;
      cursor: pointer; border: 1px solid transparent; transition: all 0.2s;
    }
    .btn-action.archive { color: #64748b; background: #f1f5f9; }
    .btn-action.view { color: #166534; background: #dcfce7; }
    .btn-action.edit { color: #1e40af; background: #dbeafe; }
    .btn-action.delete { color: #991b1b; background: #fee2e2; }
    .btn-action:hover { transform: scale(1.05); filter: brightness(0.95); }

    .status-badge {
      padding: 0.25rem 0.75rem; border-radius: 99px; font-size: 0.75rem; font-weight: 700;
      background: #f1f5f9; color: #475569;
    }
    .status-badge.virgin { background: #dcfce7; color: #166534; }

    .active-indicator { width: 12px; height: 12px; border-radius: 50%; background: #e2e8f0; margin: 0 auto; }
    .active-indicator.on { background: #22c55e; box-shadow: 0 0 10px rgba(34, 197, 94, 0.5); }

    .table-footer-modern { padding: 1.5rem 2rem; display: flex; justify-content: space-between; align-items: center; background: #f8fafc; }
    .results-count { font-size: 0.85rem; color: #64748b; }
    .pagination-modern { display: flex; align-items: center; gap: 1rem; }
    .pag-btn-modern { background: white; border: 1px solid #e2e8f0; padding: 0.5rem 1rem; border-radius: 8px; font-size: 0.8rem; cursor: pointer; }
    .page-num { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 8px; font-size: 0.85rem; cursor: pointer; }
    .page-num.active { background: #166534; color: white; font-weight: 700; }

    .module-footer-premium { margin-top: 3rem; display: flex; justify-content: space-between; font-size: 0.8rem; color: #94a3b8; }
    .highlight { color: #166534; font-weight: 700; }
    .font-semibold { font-weight: 600; }
    .font-mono { font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; }
    .text-right { text-align: right; }
    .text-center { text-align: center; }
  `]
})
export class SilosComponent {
  searchQuery = '';
  
  silos = [
    { nombre: 'CAJA 100% PCR', capacidad: 589.00, kgMinimo: 180000.00, kgMaximo: 5500.00, actual: 42500, estadoMaterial: 'Virgen (pelet)', tipoMaterial: 'PCR', activo: true },
    { nombre: 'CAJA 55% PCR', capacidad: 100000.00, kgMinimo: 589.00, kgMaximo: 100000.00, actual: 8000, estadoMaterial: 'Virgen (pelet)', tipoMaterial: 'PCR', activo: true },
    { nombre: 'SUPER SAC 100% OMNI', capacidad: 500.00, kgMinimo: 0.00, kgMaximo: 30000.00, actual: 35000, estadoMaterial: 'Virgen (pelet)', tipoMaterial: 'PCR', activo: true },
    { nombre: 'SUPER SACKS', capacidad: 600.00, kgMinimo: 500.00, kgMaximo: 7000.00, actual: 4500, estadoMaterial: 'Virgen (pelet)', tipoMaterial: 'PCR', activo: true },
    { nombre: 'SUPER SACKS 100%', capacidad: 1200.00, kgMinimo: 1000.00, kgMaximo: 24000.00, actual: 0, estadoMaterial: 'Virgen (pelet)', tipoMaterial: 'PCR 100%', activo: true },
    { nombre: 'Silo 1', capacidad: 74995.00, kgMinimo: 1000.00, kgMaximo: 80000.00, actual: 12000, estadoMaterial: 'Virgen (pelet)', tipoMaterial: 'PCR', activo: true },
    { nombre: 'Silo 2', capacidad: 0.00, kgMinimo: 1000.00, kgMaximo: 55000.00, actual: 0, estadoMaterial: 'Molido', tipoMaterial: 'PCR', activo: true }
  ];

  get filteredSilos() {
    return this.silos.filter(s => s.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }
}
