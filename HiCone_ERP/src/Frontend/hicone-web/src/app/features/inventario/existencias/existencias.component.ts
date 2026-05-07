import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventarioService, ExistenciaSiloDto } from '../../../core/services/inventario';

@Component({
  selector: 'app-existencias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container animate-fade-in">
      <div class="page-header-modern">
        <div class="header-info">
          <h1 class="page-title">Existencias e Inventario</h1>
          <nav class="breadcrumb-modern">
            <span>Inventarios</span>
            <span class="separator">/</span>
            <span class="active">Existencias</span>
          </nav>
        </div>
        <div class="header-actions">
          <button class="btn-secondary-modern">
            <span class="icon">📊</span> Exportar Excel
          </button>
          <button class="btn-primary-modern" (click)="guardarExistenciasSilos()" *ngIf="activeTab === 'silos'">
            <span class="icon">💾</span> Confirmar Ajuste
          </button>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-label">Total Bobinas</div>
          <div class="stat-value">1,248</div>
          <div class="stat-trend up">↑ 4% vs mes anterior</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Materia Prima (Silos)</div>
          <div class="stat-value">45,600 <small>kg</small></div>
          <div class="stat-trend">Estable</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Producto en Reposo</div>
          <div class="stat-value">312</div>
          <div class="stat-trend down">↓ 2% rotación</div>
        </div>
      </div>

      <div class="card-premium shadow-2xl">
        <div class="card-tabs">
          <button class="tab-btn" [class.active]="activeTab === 'producto'" (click)="activeTab = 'producto'">Existencia por Producto</button>
          <button class="tab-btn" [class.active]="activeTab === 'silos'" (click)="activeTab = 'silos'">Existencia en Silos</button>
        </div>
        <div class="table-modern-container" *ngIf="activeTab === 'producto'">
          <table class="table-modern">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th class="text-right">Stock Sistema</th>
                <th class="text-right">Stock Físico</th>
                <th class="text-right">Diferencia</th>
                <th class="text-center">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of inventory">
                <td>
                  <div class="product-info">
                    <span class="product-name">{{item.nombre}}</span>
                    <span class="product-sku">SKU: {{item.sku}}</span>
                  </div>
                </td>
                <td>{{item.categoria}}</td>
                <td class="text-right font-mono">{{item.sistema | number}}</td>
                <td class="text-right font-mono">{{item.fisico | number}}</td>
                <td class="text-right">
                  <span [class.diff-warning]="item.sistema !== item.fisico">
                    {{item.fisico - item.sistema | number}}
                  </span>
                </td>
                <td class="text-center">
                  <span class="stock-dot" [class.low-stock]="item.fisico < 50"></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Nueva Tabla: Existencia en Silos -->
        <div class="table-modern-container" *ngIf="activeTab === 'silos'">
          <table class="table-modern">
            <thead>
              <tr>
                <th>Silo</th>
                <th>Tipo Material</th>
                <th>Lote Virgen Actual</th>
                <th class="text-right">Cantidad Física (kg)</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of silosInventory">
                <td>
                  <div class="product-info">
                    <span class="product-name">{{item.siloNombre}}</span>
                  </div>
                </td>
                <td>{{item.tipoMaterial}}</td>
                <td>{{item.loteVirgen}}</td>
                <td class="text-right">
                   <input type="number" class="modern-input text-right" [(ngModel)]="item.cantidadReal">
                </td>
              </tr>
              <tr *ngIf="silosInventory.length === 0">
                <td colspan="4" class="text-center">Cargando silos...</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: 2rem; background: #f8fafc; min-height: calc(100vh - 64px); }
    .page-header-modern { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    .page-title { font-size: 1.875rem; font-weight: 800; color: #1e293b; margin: 0; }
    .breadcrumb-modern { display: flex; align-items: center; gap: 0.5rem; color: #64748b; font-size: 0.875rem; margin-top: 0.25rem; }
    .breadcrumb-modern .active { color: #166534; font-weight: 600; }

    .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 2rem; }
    .stat-card { background: white; padding: 1.5rem; border-radius: 16px; border: 1px solid #e2e8f0; }
    .stat-label { font-size: 0.875rem; color: #64748b; font-weight: 600; margin-bottom: 0.5rem; }
    .stat-value { font-size: 2rem; font-weight: 800; color: #1e293b; }
    .stat-trend { font-size: 0.75rem; margin-top: 0.5rem; font-weight: 600; }
    .stat-trend.up { color: #166534; }
    .stat-trend.down { color: #991b1b; }

    .card-premium { background: white; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; }
    .card-tabs { display: flex; background: #f1f5f9; padding: 0.5rem; gap: 0.5rem; }
    .tab-btn { border: none; padding: 0.6rem 1.2rem; border-radius: 8px; font-weight: 700; cursor: pointer; transition: all 0.2s; font-size: 0.85rem; color: #64748b; background: transparent; }
    .tab-btn.active { background: white; color: #166534; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }

    .table-modern-container { overflow-x: auto; }
    .table-modern { width: 100%; border-collapse: collapse; text-align: left; }
    .table-modern th { padding: 1rem 1.5rem; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #475569; border-bottom: 2px solid #f1f5f9; }
    .table-modern td { padding: 1rem 1.5rem; border-bottom: 1px solid #f1f5f9; color: #334155; font-size: 0.9rem; }
    
    .product-info { display: flex; flex-direction: column; }
    .product-name { font-weight: 700; color: #1e293b; }
    .product-sku { font-size: 0.75rem; color: #94a3b8; }
    
    .diff-warning { color: #d97706; font-weight: 800; background: #fffbeb; padding: 2px 6px; border-radius: 4px; }
    .stock-dot { width: 10px; height: 10px; border-radius: 50%; background: #22c55e; display: inline-block; }
    .low-stock { background: #ef4444; box-shadow: 0 0 8px rgba(239, 68, 68, 0.5); }

    .btn-primary-modern { background: #166534; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 10px; font-weight: 600; cursor: pointer; }
    .btn-secondary-modern { background: #f1f5f9; color: #1e293b; border: 1px solid #e2e8f0; padding: 0.75rem 1.5rem; border-radius: 10px; font-weight: 600; cursor: pointer; margin-right: 0.5rem; }

    .animate-fade-in { animation: fadeIn 0.4s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .modern-input { border: 1px solid #e2e8f0; border-radius: 6px; padding: 0.5rem; width: 120px; font-family: monospace; font-size: 1rem; color: #1e293b; background: #f8fafc; }
    .modern-input:focus { outline: none; border-color: #166534; background: #fff; }
  `]
})
export class ExistenciasComponent implements OnInit {
  private inventarioService = inject(InventarioService);
  activeTab = 'silos';
  
  // Placeholder ID for existence record, in a real app this would be chosen or created
  currentExistenciaId = '00000000-0000-0000-0000-000000000000'; 
  
  silosInventory: ExistenciaSiloDto[] = [];

  inventory = [
    { nombre: 'Polipropileno Bio-Orientado', sku: 'PP-BO-001', categoria: 'Materia Prima', sistema: 15000, fisico: 14950 },
    { nombre: 'Tinta Cian Premium', sku: 'INK-C-500', categoria: 'Aditivos', sistema: 450, fisico: 450 },
    { nombre: 'Adhesivo Hot-Melt', sku: 'ADH-HM-02', categoria: 'Materia Prima', sistema: 2300, fisico: 2315 },
    { nombre: 'Película Stretch 18"', sku: 'STR-18-HD', categoria: 'Embalaje', sistema: 85, fisico: 40 }
  ];

  ngOnInit() {
    this.loadSilosInventory();
  }

  loadSilosInventory() {
    // In actual use, empty Guid gives current state mapping
    this.inventarioService.getExistenciaSilo(this.currentExistenciaId).subscribe(data => {
      this.silosInventory = data;
    });
  }

  guardarExistenciasSilos() {
    if (confirm('¿Estás seguro de que deseas ajustar el stock físico de los silos? Esto sobrescribirá el inventario actual.')) {
      this.inventarioService.updateExistenciasSilos(this.silosInventory).subscribe({
        next: () => {
          alert('✅ Ajuste de inventario guardado correctamente.');
          this.loadSilosInventory();
        },
        error: (err) => alert('❌ Error al guardar existencias: ' + (err.error || err.message))
      });
    }
  }
}
