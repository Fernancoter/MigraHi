import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InventarioService, ExistenciaSiloDto } from '../../../core/services/inventario';
import { PdfExportService } from '../../../core/services/pdf-export.service';

export interface ExistenciaProductoDto {
  productoId: string;
  productoNombre: string;
  existenciaId: string;
  cantidadReal: number;
  cantidadSistema: number;
  millarSistema: number;
}

@Component({
  selector: 'app-existencias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container animate-fade-in">
      <div class="page-header-modern">
        <div class="header-info">
          <h1 class="page-title">🔍 Conciliación de Existencias Físicas</h1>
          <nav class="breadcrumb-modern">
            <span>Inventarios</span>
            <span class="separator">/</span>
            <span class="active">Conciliación de Existencias</span>
          </nav>
        </div>
        <div class="header-actions">
          <div class="dropdown-container">
            <button class="btn-secondary-modern" (click)="showExportSelector = !showExportSelector">
              <span class="icon">📊</span> Exportar <span class="arrow">▼</span>
            </button>
            <div class="column-selector-dropdown shadow-premium" *ngIf="showExportSelector">
              <div class="column-list custom-scroll">
                <div class="column-group">
                  <label class="item-label export-item" (click)="exportToCSV(); showExportSelector = false">📄 Excel (CSV)</label>
                  <label class="item-label export-item" (click)="exportToPDF(); showExportSelector = false">📕 PDF</label>
                </div>
              </div>
            </div>
          </div>
          <button class="btn-primary-modern" (click)="guardarExistencias()" [disabled]="saving">
            <span class="icon">💾</span> {{ saving ? '⏳ Procesando...' : 'Confirmar Ajuste Físico' }}
          </button>
        </div>
      </div>

      <!-- Alertas de estado -->
      <div class="alert-container" *ngIf="errorMessage || successMessage" style="margin-bottom: 1.5rem;">
        <div class="alert alert-error" *ngIf="errorMessage" style="background: #fef2f2; border: 1px solid #fee2e2; color: #991b1b; padding: 1rem; border-radius: 12px; display: flex; gap: 0.5rem;">
          <span>⚠️</span>
          <div>
            <strong>Error de transacción:</strong>
            <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem;">{{ errorMessage }}</p>
          </div>
        </div>
        <div class="alert alert-success" *ngIf="successMessage" style="background: #f0fdf4; border: 1px solid #dcfce7; color: #166534; padding: 1rem; border-radius: 12px; display: flex; gap: 0.5rem;">
          <span>✓</span>
          <div>
            <strong>Transacción completada:</strong>
            <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem;">{{ successMessage }}</p>
          </div>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-label">Silo MP Activo</div>
          <div class="stat-value">🏺 Silos</div>
          <div class="stat-trend up">Control transaccional en tiempo real</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Módulo</div>
          <div class="stat-value">📦 Conciliación</div>
          <div class="stat-trend">Verificación de discrepancia física vs sistema</div>
        </div>
        <div class="stat-card" *ngIf="currentExistenciaId !== '00000000-0000-0000-0000-000000000000'">
          <div class="stat-label">Estado de Snapshot</div>
          <div class="stat-value text-warning">⏳ Histórico</div>
          <div class="stat-trend">Registrando cierre de periodo mensual</div>
        </div>
        <div class="stat-card" *ngIf="currentExistenciaId === '00000000-0000-0000-0000-000000000000'">
          <div class="stat-label">Estado de Snapshot</div>
          <div class="stat-value text-success">🟢 Tiempo Real</div>
          <div class="stat-trend">Ajuste directo en inventario activo</div>
        </div>
      </div>

      <div class="card-premium shadow-2xl">
        <div class="card-tabs">
          <button class="tab-btn" [class.active]="activeTab === 'silos'" (click)="selectTab('silos')">Existencia en Silos</button>
          <button class="tab-btn" [class.active]="activeTab === 'producto'" (click)="selectTab('producto')">Existencia por Producto</button>
        </div>

        <!-- TABLA: Existencia en Silos -->
        <div class="table-modern-container" *ngIf="activeTab === 'silos'">
          <div class="loading-overlay" *ngIf="loading" style="padding: 3rem; text-align: center; color: #64748b;">⏳ Cargando inventarios de Silos...</div>
          <table class="table-modern" *ngIf="!loading">
            <thead>
              <tr>
                <th>Silo</th>
                <th>Tipo Material</th>
                <th>Lote Virgen Actual</th>
                <th class="text-right">Stock Sistema (kg)</th>
                <th class="text-right">Cantidad Física (kg)</th>
                <th class="text-right">Diferencia (kg)</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of silosInventory" style="transition: background-color 0.2s;">
                <td>
                  <div class="product-info">
                    <span class="product-name">🏺 {{item.siloNombre}}</span>
                  </div>
                </td>
                <td>{{item.tipoMaterial}}</td>
                <td><span class="font-mono" style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 0.85rem;">{{item.loteVirgen || 'N/A'}}</span></td>
                <td class="text-right font-mono">{{item.cantidadSistema | number:'1.0-2'}}</td>
                <td class="text-right">
                   <input type="number" class="modern-input text-right" [(ngModel)]="item.cantidadReal" style="font-weight: bold; width: 130px;">
                </td>
                <td class="text-right">
                  <span [class.diff-warning]="item.cantidadReal !== item.cantidadSistema" [style.color]="item.cantidadReal - item.cantidadSistema < 0 ? '#b91c1c' : (item.cantidadReal - item.cantidadSistema > 0 ? '#15803d' : 'inherit')" style="font-weight: bold; font-family: monospace;">
                    {{ (item.cantidadReal - item.cantidadSistema > 0 ? '+' : '') }}{{item.cantidadReal - item.cantidadSistema | number:'1.0-2'}}
                  </span>
                </td>
              </tr>
              <tr *ngIf="silosInventory.length === 0">
                <td colspan="6" class="text-center" style="padding: 2rem; color: #94a3b8;">No se encontraron registros de silos.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- TABLA: Existencia por Producto -->
        <div class="table-modern-container" *ngIf="activeTab === 'producto'">
          
          <!-- Filtros dinámicos de Categoría y Tipo de Producto -->
          <div class="filters-row" style="display: flex; gap: 1.5rem; margin: 1.5rem; background: #f8fafc; padding: 1.25rem; border-radius: 12px; border: 1px solid #e2e8f0;">
            <div class="form-group" style="margin: 0; display: flex; flex-direction: column; gap: 0.4rem;">
              <label style="font-weight: bold; font-size: 0.85rem; color: #475569;">📁 Categoría de Artículos</label>
              <select class="modern-input" [(ngModel)]="categoriaSeleccionada" (change)="loadProductosInventory()" style="width: 220px; background: white;">
                <option value="Película">Película Extruida</option>
                <option value="Materia Prima">Materia Prima</option>
                <option value="Aditivos">Aditivos</option>
                <option value="Embalaje">Embalaje</option>
              </select>
            </div>
            <div class="form-group" style="margin: 0; display: flex; flex-direction: column; gap: 0.4rem;">
              <label style="font-weight: bold; font-size: 0.85rem; color: #475569;">📦 Formato</label>
              <select class="modern-input" [(ngModel)]="tipoSeleccionado" (change)="loadProductosInventory()" style="width: 160px; background: white;">
                <option value="Bobina">Bobina</option>
                <option value="Pallet">Pallet</option>
              </select>
            </div>
          </div>

          <div class="loading-overlay" *ngIf="loading" style="padding: 3rem; text-align: center; color: #64748b;">⏳ Cargando inventarios de productos y stock del sistema...</div>
          
          <table class="table-modern" *ngIf="!loading">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th class="text-right">Stock Sistema (unidades)</th>
                <th class="text-right">Cantidad Física Real</th>
                <th class="text-right">Diferencia</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of productosInventory" style="transition: background-color 0.2s;">
                <td>
                  <div class="product-info">
                    <span class="product-name">📦 {{item.productoNombre}}</span>
                    <span class="product-sku" style="font-size: 0.75rem; color: #94a3b8; font-family: monospace;">Formato: {{ tipoSeleccionado }}</span>
                  </div>
                </td>
                <td>{{ categoriaSeleccionada }}</td>
                <td class="text-right font-mono">{{item.cantidadSistema | number:'1.0-0'}}</td>
                <td class="text-right">
                   <input type="number" class="modern-input text-right" [(ngModel)]="item.cantidadReal" style="font-weight: bold; width: 130px;" min="0">
                </td>
                <td class="text-right">
                  <span [class.diff-warning]="item.cantidadReal !== item.cantidadSistema" [style.color]="item.cantidadReal - item.cantidadSistema < 0 ? '#b91c1c' : (item.cantidadReal - item.cantidadSistema > 0 ? '#15803d' : 'inherit')" style="font-weight: bold; font-family: monospace;">
                    {{ (item.cantidadReal - item.cantidadSistema > 0 ? '+' : '') }}{{item.cantidadReal - item.cantidadSistema | number:'1.0-0'}}
                  </span>
                </td>
              </tr>
              <tr *ngIf="productosInventory.length === 0">
                <td colspan="5" class="text-center" style="padding: 3rem; color: #94a3b8; text-align: center;">
                  <div style="font-size: 2rem; margin-bottom: 0.5rem;">📁</div>
                  No se encontraron productos registrados en esta categoría y formato.
                </td>
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
    .stat-trend { font-size: 0.75rem; margin-top: 0.5rem; font-weight: 600; color: #64748b; }
    .stat-trend.up { color: #166534; }
    .stat-trend.down { color: #991b1b; }

    .card-premium { background: white; padding-bottom: 2rem; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; }
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

    .btn-primary-modern { background: #166534; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 10px; font-weight: 600; cursor: pointer; transition: background-color 0.2s; }
    .btn-primary-modern:hover { background: #14532d; }
    .btn-primary-modern:disabled { background: #93c5fd; cursor: not-allowed; }
    .btn-secondary-modern { background: white; color: #1e293b; border: 1px solid #cbd5e1; padding: 0.75rem 1.5rem; border-radius: 10px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
    .btn-secondary-modern:hover { background: #f8fafc; border-color: #94a3b8; }

    .animate-fade-in { animation: fadeIn 0.4s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .modern-input { border: 1px solid #cbd5e1; border-radius: 8px; padding: 0.5rem 0.75rem; width: 120px; font-family: monospace; font-size: 1rem; color: #1e293b; background: #f8fafc; transition: all 0.2s; }
    .modern-input:focus { outline: none; border-color: #166534; background: #fff; box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1); }
    
    .dropdown-container { position: relative; display: inline-block; margin-right: 0.5rem; }
    .column-selector-dropdown { position: absolute; top: 110%; right: 0; width: 180px; background: white; border: 1px solid #cbd5e1; border-radius: 8px; z-index: 100; padding: 0.5rem; }
    .export-item { padding: 0.5rem; cursor: pointer; display: block; font-size: 0.85rem; color: #334155; transition: background-color 0.2s; border-radius: 4px; }
    .export-item:hover { background: #f1f5f9; }
    .arrow { font-size: 0.7rem; margin-left: 0.3rem; }
  `]
})
export class ExistenciasComponent implements OnInit {
  private inventarioService = inject(InventarioService);
  private pdfService = inject(PdfExportService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  activeTab = 'silos';
  showExportSelector = false;
  loading = false;
  saving = false;
  errorMessage = '';
  successMessage = '';
  
  // ID of the snapshot
  currentExistenciaId = '00000000-0000-0000-0000-000000000000'; 
  
  silosInventory: ExistenciaSiloDto[] = [];
  productosInventory: ExistenciaProductoDto[] = [];

  // Filtros de Productos
  categorias = ['Película', 'Materia Prima', 'Aditivos', 'Embalaje'];
  categoriaSeleccionada = 'Película';
  tipoSeleccionado = 'Bobina';

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.currentExistenciaId = params['id'];
      }
      this.loadSilosInventory();
    });
  }

  selectTab(tab: string) {
    this.activeTab = tab;
    this.errorMessage = '';
    this.successMessage = '';
    if (tab === 'silos') {
      this.loadSilosInventory();
    } else {
      this.loadProductosInventory();
    }
  }

  loadSilosInventory() {
    this.loading = true;
    this.inventarioService.getExistenciaSilo(this.currentExistenciaId).subscribe({
      next: (data) => {
        this.silosInventory = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar existencias de silos:', err);
        this.errorMessage = 'No se pudieron cargar las existencias de Silos.';
        this.loading = false;
      }
    });
  }

  loadProductosInventory() {
    this.loading = true;
    this.inventarioService.getExistenciaProducto(
      this.currentExistenciaId, 
      this.categoriaSeleccionada, 
      this.tipoSeleccionado
    ).subscribe({
      next: (data: any[]) => {
        this.productosInventory = data as ExistenciaProductoDto[];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar existencias de productos:', err);
        this.errorMessage = 'No se pudieron cargar las existencias de Productos.';
        this.loading = false;
      }
    });
  }

  guardarExistencias() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.activeTab === 'silos') {
      if (!confirm('¿Estás seguro de que deseas confirmar este inventario físico de Silos? Esto sobrescribirá el stock del sistema con las cantidades reales.')) {
        return;
      }
      this.saving = true;
      if (this.currentExistenciaId !== '00000000-0000-0000-0000-000000000000') {
        // Cierre histórico mensual atado a un Snapshot
        this.inventarioService.completarCierre(this.currentExistenciaId, this.silosInventory).subscribe({
          next: () => {
            this.successMessage = '¡Cierre de inventario en Silos completado correctamente!';
            this.saving = false;
            setTimeout(() => this.router.navigate(['/inventario/cierre-mes']), 1500);
          },
          error: (err) => {
            console.error('Error al completar cierre de silos:', err);
            this.errorMessage = err.error?.message || err.error || err.message || 'Error del servidor al completar el cierre.';
            this.saving = false;
          }
        });
      } else {
        // Ajuste directo en tiempo real (directo en silos)
        this.inventarioService.updateExistenciasSilos(this.silosInventory).subscribe({
          next: () => {
            this.successMessage = '¡Ajuste de inventario en Silos aplicado con éxito!';
            this.saving = false;
            this.loadSilosInventory();
          },
          error: (err) => {
            console.error('Error al guardar existencias de silos:', err);
            this.errorMessage = err.error?.message || err.error || err.message || 'Error del servidor al guardar el ajuste.';
            this.saving = false;
          }
        });
      }
    } else {
      // Ajuste de Existencia de Productos (Bobinas o Pallets)
      if (!confirm(`¿Estás seguro de que deseas guardar la conciliación de existencias físicas de Productos para el formato ${this.tipoSeleccionado}?`)) {
        return;
      }
      this.saving = true;
      this.inventarioService.guardarExistenciaProducto(this.productosInventory).subscribe({
        next: () => {
          this.successMessage = `¡Conciliación de existencias físicas de Productos (${this.tipoSeleccionado}) guardada correctamente!`;
          this.saving = false;
          this.loadProductosInventory();
        },
        error: (err) => {
          console.error('Error al guardar existencias de productos:', err);
          this.errorMessage = err.error?.message || err.error || err.message || 'Error del servidor al conciliar los productos.';
          this.saving = false;
        }
      });
    }
  }

  exportToCSV() {
    let csvContent = '';
    let fileName = '';

    if (this.activeTab === 'producto') {
      const headers = ['Producto', 'Categoría', 'Formato', 'Stock Sistema', 'Stock Físico', 'Diferencia'];
      const rows = this.productosInventory.map(i => [
        i.productoNombre,
        this.categoriaSeleccionada,
        this.tipoSeleccionado,
        i.cantidadSistema.toString(),
        i.cantidadReal.toString(),
        (i.cantidadReal - i.cantidadSistema).toString()
      ]);
      
      csvContent = [
        headers.join(','),
        ...rows.map(r => r.map(cell => `"${cell}"`).join(','))
      ].join('\n');
      
      fileName = `Existencias_Productos_${this.tipoSeleccionado}_${new Date().toISOString().split('T')[0]}.csv`;
    } else {
      const headers = ['Silo', 'Tipo Material', 'Lote Virgen Actual', 'Stock Sistema (kg)', 'Cantidad Física (kg)', 'Diferencia (kg)'];
      const rows = this.silosInventory.map(s => [
        s.siloNombre || '',
        s.tipoMaterial || '',
        s.loteVirgen || '',
        s.cantidadSistema.toString(),
        s.cantidadReal?.toString() || '0',
        ((s.cantidadReal || 0) - s.cantidadSistema).toString()
      ]);
      
      csvContent = [
        headers.join(','),
        ...rows.map(r => r.map(cell => `"${cell}"`).join(','))
      ].join('\n');
      
      fileName = `Existencias_Silos_${new Date().toISOString().split('T')[0]}.csv`;
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  exportToPDF() {
    if (this.activeTab === 'producto') {
      const headers = ['Producto', 'Categoría', 'Formato', 'Stock Sistema', 'Stock Físico', 'Diferencia'];
      const rows = this.productosInventory.map(i => [
        i.productoNombre,
        this.categoriaSeleccionada,
        this.tipoSeleccionado,
        i.cantidadSistema.toString(),
        i.cantidadReal.toString(),
        (i.cantidadReal - i.cantidadSistema).toString()
      ]);
      
      this.pdfService.exportTable(
        `Reporte de Existencias - Formato ${this.tipoSeleccionado}`,
        headers,
        rows,
        `Existencias_Productos_${this.tipoSeleccionado}_${new Date().toISOString().split('T')[0]}.pdf`
      );
    } else {
      const headers = ['Silo', 'Tipo Material', 'Lote Virgen Actual', 'Stock Sistema (kg)', 'Stock Físico (kg)', 'Diferencia (kg)'];
      const rows = this.silosInventory.map(s => [
        s.siloNombre || '',
        s.tipoMaterial || '',
        s.loteVirgen || '',
        s.cantidadSistema.toString(),
        s.cantidadReal?.toString() || '0',
        ((s.cantidadReal || 0) - s.cantidadSistema).toString()
      ]);
      
      this.pdfService.exportTable(
        'Reporte de Existencias - Silos de Materia Prima',
        headers,
        rows,
        `Existencias_Silos_${new Date().toISOString().split('T')[0]}.pdf`
      );
    }
  }
}
