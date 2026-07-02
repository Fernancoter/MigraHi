import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventarioService, Existencia, ExistenciaSilo, ExistenciaProducto } from '../../../core/services/inventario';
import { ProduccionConfigService, Categoria } from '../../../core/services/produccion-config.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reporte-existencia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up">
      <!-- Encabezado del Módulo -->
      <header class="module-header-container" style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
        <div class="title-area">
          <nav class="breadcrumb">Reportes HC › Descargables › Existencia</nav>
          <h1 class="page-title">Reporte de Existencia</h1>
        </div>

        <!-- Barra de Acciones y Filtros -->
        <div class="actions-toolbar" style="display: flex; width: 100%; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
          <div class="toolbar-left" style="display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap;">
            <!-- Selector de Corte de Inventario (Existencia) -->
            <div class="search-box">
              <span class="search-label">Corte de Inventario (Fecha)</span>
              <select [(ngModel)]="selectedExistenciaId" (change)="onExistenciaChange()" class="field-select" style="width: 250px;">
                <option value="">Selecciona un corte...</option>
                @for (ext of existencias(); track ext.id) {
                  <option [value]="ext.id">
                    {{ ext.fechaHora | date:'dd/MM/yyyy HH:mm' }} - {{ ext.usuario }} ({{ ext.estado }})
                  </option>
                }
              </select>
            </div>

            <!-- Selector de Categoría de Producto -->
            <div class="search-box">
              <span class="search-label">Categoría de Producto</span>
              <select [(ngModel)]="selectedCategoryName" (change)="onCategoryChange()" class="field-select" style="width: 200px;">
                <option value="">Selecciona categoría...</option>
                @for (cat of categories(); track cat.id) {
                  <option [value]="cat.nombre">{{ cat.nombre }}</option>
                }
              </select>
            </div>

            <!-- Dropdown de Exportar -->
            <div class="dropdown-wrapper" style="margin-top: 1.1rem;">
              <button class="btn-export" (click)="toggleExportDropdown($event)" style="height: 38px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Exportar <span style="font-size: 0.7rem;">▼</span>
              </button>
              @if (showExportOptions()) {
                <div class="column-selector-popover animate-slide-up">
                  <div class="dropdown-item" (click)="exportExcel()">Excel</div>
                  <div class="dropdown-item" (click)="exportPDF()">PDF</div>
                </div>
              }
            </div>
          </div>

          <div class="toolbar-right" style="margin-top: 1.1rem;">
            <button class="btn btn-primary" (click)="reloadData()">
              Actualizar
            </button>
          </div>
        </div>
      </header>

      <!-- Pestañas de Navegación del Reporte -->
      <div class="tabs-container" style="display: flex; gap: 1rem; border-bottom: 2px solid #e2e8f0; margin-bottom: 1.5rem;">
        <button class="tab-button" [class.active]="activeTab() === 'silos'" (click)="activeTab.set('silos')">
          Existencia en Silos
        </button>
        <button class="tab-button" [class.active]="activeTab() === 'productos'" (click)="activeTab.set('productos')">
          Existencia en Productos
        </button>
      </div>

      <!-- Tabla de Datos (Silos) -->
      @if (activeTab() === 'silos') {
        <div class="content-card" style="overflow-x: auto;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Silo</th>
                <th>Tipo Material</th>
                <th>Cantidad Real</th>
                <th>Lote Virgen</th>
              </tr>
            </thead>
            <tbody>
              @if (loading()) {
                <tr>
                  <td colspan="4" class="empty-state">Cargando existencias en silos...</td>
                </tr>
              } @else if (silosData().length === 0) {
                <tr>
                  <td colspan="4" class="empty-state">No hay registros de silos para el corte seleccionado</td>
                </tr>
              } @else {
                @for (item of silosData(); track item.siloId) {
                  <tr>
                    <td style="font-weight: 600; color: #1e293b;">{{ item.siloNombre }}</td>
                    <td>{{ item.tipoMaterial }}</td>
                    <td style="font-weight: 700; color: #15803d;">{{ item.cantidadReal | number:'1.2-2' }} kg</td>
                    <td>{{ item.loteVirgen }}</td>
                  </tr>
                }
              }
            </tbody>
          </table>
        </div>
      }

      <!-- Tabla de Datos (Productos) -->
      @if (activeTab() === 'productos') {
        <div class="content-card" style="overflow-x: auto;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad Real</th>
                <th>Cantidad Sistema</th>
                <th>Diferencia</th>
              </tr>
            </thead>
            <tbody>
              @if (loading()) {
                <tr>
                  <td colspan="4" class="empty-state">Cargando existencias de productos...</td>
                </tr>
              } @else if (productosData().length === 0) {
                <tr>
                  <td colspan="4" class="empty-state">Selecciona un corte y categoría con productos registrados</td>
                </tr>
              } @else {
                @for (item of productosData(); track item.productoId) {
                  <tr>
                    <td style="font-weight: 600; color: #1e293b;">{{ item.productoNombre }}</td>
                    <td>{{ item.cantidadReal | number:'1.2-2' }}</td>
                    <td>{{ item.cantidadSistema | number:'1.2-2' }}</td>
                    <td [style.color]="item.cantidadReal - item.cantidadSistema < 0 ? '#ef4444' : '#15803d'" style="font-weight: 700;">
                      {{ (item.cantidadReal - item.cantidadSistema) | number:'1.2-2' }}
                    </td>
                  </tr>
                }
              }
            </tbody>
          </table>
        </div>
      }

      <!-- Footer -->
      <footer class="page-footer" style="margin-top: 3rem;">
        <div class="footer-left">
          <span>Copyright 2023 - HiCone ERP</span>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .module-page { padding: 1.5rem 2.5rem; }
    .breadcrumb { font-size: .75rem; color: #94a3b8; font-weight: 600; text-transform: uppercase; margin-bottom: .25rem; }
    .page-title { font-size: 1.8rem; font-weight: 800; color: #5cb85c; margin: 0; }
    .actions-toolbar { display: flex; gap: 0.75rem; align-items: center; margin-top: 1rem; }

    /* Tab Buttons */
    .tab-button {
      padding: 0.75rem 1.5rem;
      border: none;
      background: none;
      font-size: 0.95rem;
      font-weight: 700;
      color: #64748b;
      cursor: pointer;
      border-bottom: 3px solid transparent;
      transition: all 0.2s;
    }
    .tab-button.active {
      color: #5cb85c;
      border-bottom-color: #5cb85c;
    }
    .tab-button:hover {
      color: #334155;
    }

    /* Buttons */
    .btn { padding: .55rem 1.25rem; border-radius: 6px; border: none; cursor: pointer; font-size: .85rem; font-weight: 600; transition: all .2s; }
    .btn-primary { background: #5cb85c; color: white; border: 1px solid #4cae4c; }
    .btn-primary:hover { background: #449d44; }

    .btn-export {
      background: white;
      color: #5cb85c;
      border: 1px solid #5cb85c;
      border-radius: 4px;
      padding: 0.55rem 1rem;
      font-size: 0.85rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-export:hover {
      background: #f8fafc;
      border-color: #4cae4c;
      color: #449d44;
    }

    /* Inputs and Selects */
    .search-box { display: flex; flex-direction: column; position: relative; }
    .search-label { font-size: 0.75rem; color: #94a3b8; font-weight: 600; margin-bottom: 0.2rem; }
    .search-box .field-select {
      border: none;
      border-bottom: 1px solid #cbd5e1;
      border-radius: 0;
      padding: 0.4rem 0;
      font-size: 0.9rem;
      background: transparent;
      outline: none;
      transition: border-color 0.2s;
      cursor: pointer;
    }
    .search-box .field-select:focus {
      border-bottom-color: #5cb85c;
    }

    /* Data Table */
    .content-card { background: white; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
    .data-table { width: 100%; border-collapse: collapse; min-width: 800px; }
    .data-table th { text-align: left; padding: 1rem; background: #f8fafc; color: #64748b; font-size: .75rem; font-weight: 800; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; }
    .data-table td { padding: .85rem 1rem; border-bottom: 1px solid #f1f5f9; font-size: .875rem; color: #334155; white-space: nowrap; }
    .data-table tr:hover td { background: #f8fafc; }
    .empty-state { text-align: center; padding: 3.5rem; color: #94a3b8; font-style: italic; }

    /* Popovers */
    .dropdown-wrapper { position: relative; }
    .column-selector-popover {
      position: absolute;
      left: 0;
      top: 110%;
      background: white;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      box-shadow: 0 6px 16px rgba(0,0,0,0.12);
      z-index: 100;
      min-width: 150px;
    }
    .dropdown-item { padding: 0.65rem 1rem; font-size: 0.85rem; color: #334155; cursor: pointer; transition: background 0.15s; font-weight: 500; display: flex; align-items: center; gap: 0.5rem; }
    .dropdown-item:hover { background: #f1f5f9; color: #0f172a; }

    /* Footer */
    .page-footer { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-top: 1px solid #e2e8f0; color: #94a3b8; font-size: 0.8rem; }
  `]
})
export class ReporteExistenciaComponent implements OnInit {
  private inventarioService = inject(InventarioService);
  private produccionConfigService = inject(ProduccionConfigService);

  activeTab = signal<'silos' | 'productos'>('silos');
  loading = signal(false);
  showExportOptions = signal(false);

  // Lists
  existencias = signal<Existencia[]>([]);
  categories = signal<Categoria[]>([]);

  // Selected values
  selectedExistenciaId = '';
  selectedCategoryName = '';

  // Data results
  silosData = signal<ExistenciaSilo[]>([]);
  productosData = signal<ExistenciaProducto[]>([]);

  ngOnInit() {
    this.loadInitialFilters();
  }

  loadInitialFilters() {
    this.loading.set(true);
    
    // Load cuts (Existencias)
    this.inventarioService.getExistencias().subscribe({
      next: (exts: Existencia[]) => {
        this.existencias.set(exts);
        if (exts.length > 0) {
          this.selectedExistenciaId = exts[0].id;
        }

        // Load categories
        this.produccionConfigService.getCategorias().subscribe({
          next: (cats: Categoria[]) => {
            this.categories.set(cats);
            if (cats.length > 0) {
              const defaultCat = cats.find((c: Categoria) => c.nombre.toLowerCase().includes('bobina')) || cats[0];
              this.selectedCategoryName = defaultCat.nombre;
            }
            this.reloadData();
          },
          error: (err: any) => {
            console.error('Error cargando categorias:', err);
            this.loading.set(false);
          }
        });
      },
      error: (err: any) => {
        console.error('Error cargando existencias:', err);
        this.loading.set(false);
      }
    });
  }

  onExistenciaChange() {
    this.reloadData();
  }

  onCategoryChange() {
    this.loadProductos();
  }

  reloadData() {
    if (!this.selectedExistenciaId) {
      this.silosData.set([]);
      this.productosData.set([]);
      this.loading.set(false);
      return;
    }

    this.loading.set(true);
    
    // Load silos
    this.inventarioService.getExistenciaSilo(this.selectedExistenciaId).subscribe({
      next: (silos: ExistenciaSilo[]) => {
        this.silosData.set(silos);
        this.loadProductos();
      },
      error: (err: any) => {
        console.error('Error cargando silos:', err);
        this.loading.set(false);
      }
    });
  }

  loadProductos() {
    if (!this.selectedExistenciaId || !this.selectedCategoryName) {
      this.productosData.set([]);
      this.loading.set(false);
      return;
    }

    this.inventarioService.getExistenciaProducto(this.selectedExistenciaId, this.selectedCategoryName, '').subscribe({
      next: (prods: ExistenciaProducto[]) => {
        this.productosData.set(prods);
        this.loading.set(false);
      },
      error: (err: any) => {
        console.error('Error cargando productos:', err);
        this.loading.set(false);
      }
    });
  }

  toggleExportDropdown(event: Event) {
    event.stopPropagation();
    this.showExportOptions.update(v => !v);
  }

  exportExcel() {
    this.showExportOptions.set(false);
    
    const silosSheetData = this.silosData().map(item => ({
      'Silo': item.siloNombre,
      'Tipo Material': item.tipoMaterial,
      'Cantidad Real (Kg)': item.cantidadReal,
      'Lote Virgen': item.loteVirgen
    }));

    const productosSheetData = this.productosData().map(item => ({
      'Producto': item.productoNombre,
      'Cantidad Real': item.cantidadReal,
      'Cantidad Sistema': item.cantidadSistema,
      'Diferencia': item.cantidadReal - item.cantidadSistema
    }));

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    
    const wsSilos = XLSX.utils.json_to_sheet(silosSheetData);
    XLSX.utils.book_append_sheet(wb, wsSilos, 'Existencia Silos');

    if (productosSheetData.length > 0) {
      const wsProds = XLSX.utils.json_to_sheet(productosSheetData);
      XLSX.utils.book_append_sheet(wb, wsProds, 'Existencia Productos');
    }

    XLSX.writeFile(wb, `Reporte_Existencia_${this.selectedExistenciaId.substring(0, 8)}.xlsx`);
  }

  exportPDF() {
    this.showExportOptions.set(false);
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    let silosRows = '';
    this.silosData().forEach(item => {
      silosRows += `
        <tr>
          <td>${item.siloNombre}</td>
          <td>${item.tipoMaterial}</td>
          <td>${item.cantidadReal.toFixed(2)} kg</td>
          <td>${item.loteVirgen}</td>
        </tr>
      `;
    });

    let productosRows = '';
    this.productosData().forEach(item => {
      productosRows += `
        <tr>
          <td>${item.productoNombre}</td>
          <td>${item.cantidadReal.toFixed(2)}</td>
          <td>${item.cantidadSistema.toFixed(2)}</td>
          <td style="font-weight:bold; color: ${item.cantidadReal - item.cantidadSistema < 0 ? '#b91c1c' : '#15803d'}">
            ${(item.cantidadReal - item.cantidadSistema).toFixed(2)}
          </td>
        </tr>
      `;
    });

    printWindow.document.write(`
      <html>
        <head>
          <title>Reporte de Existencia</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 2.5rem; color: #1e293b; background-color: #f8fafc; }
            .header-area { margin-bottom: 2rem; border-bottom: 2px solid #5cb85c; padding-bottom: 1rem; }
            h1 { color: #5cb85c; margin: 0; font-size: 1.8rem; }
            .date-subtitle { color: #64748b; font-size: 0.95rem; margin-top: 0.2rem; }
            .section-title { font-size: 1.25rem; font-weight: bold; color: #334155; margin-top: 2rem; margin-bottom: 0.8rem; }
            table { width: 100%; border-collapse: collapse; margin-top: 0.5rem; background: white; border-radius: 6px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
            th, td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; text-align: left; font-size: 0.8rem; }
            th { background: #f8fafc; font-weight: bold; color: #475569; text-transform: uppercase; font-size: 0.7rem; }
          </style>
        </head>
        <body>
          <div class="header-area">
            <h1>Reporte de Existencia (Silos y Productos)</h1>
            <div class="date-subtitle">Corte ID: ${this.selectedExistenciaId}</div>
            <div class="date-subtitle">Categoría Producto Filtro: ${this.selectedCategoryName}</div>
            <div class="date-subtitle" style="font-size: 0.8rem;">Generado el: ${new Date().toLocaleString()}</div>
          </div>

          <div class="section-title">Existencia en Silos</div>
          <table>
            <thead>
              <tr>
                <th>Silo</th>
                <th>Tipo Material</th>
                <th>Cantidad Real</th>
                <th>Lote Virgen</th>
              </tr>
            </thead>
            <tbody>
              \${silosRows ? silosRows : '<tr><td colspan="4" style="text-align:center; font-style:italic;">No hay silos registrados</td></tr>'}
            </tbody>
          </table>

          <div class="section-title">Existencia en Productos</div>
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad Real</th>
                <th>Cantidad Sistema</th>
                <th>Diferencia</th>
              </tr>
            </thead>
            <tbody>
              \${productosRows ? productosRows : '<tr><td colspan="4" style="text-align:center; font-style:italic;">No hay productos registrados para esta categoría</td></tr>'}
            </tbody>
          </table>
          <script>window.onload = function() { window.print(); window.close(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }
}
