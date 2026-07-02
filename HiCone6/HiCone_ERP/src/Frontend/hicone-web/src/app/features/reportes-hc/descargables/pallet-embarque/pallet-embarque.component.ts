import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportesService, PalletEmbarqueItem } from '../../../../core/services/reportes';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pallet-embarque',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up">
      <!-- Encabezado del Módulo -->
      <header class="module-header-container" style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
        <div class="title-area">
          <nav class="breadcrumb">Reportes HC › Descargables › Pallet_Embarque</nav>
          <h1 class="page-title">Pallet Embarque</h1>
        </div>

        <!-- Barra de Acciones y Filtros -->
        <div class="actions-toolbar" style="display: flex; width: 100%; align-items: center; justify-content: space-between;">
          <div class="toolbar-left" style="display: flex; gap: 1.5rem; align-items: center;">
            <div class="search-box">
              <span class="search-label">Buscar por Cliente/Folio</span>
              <input type="text" [(ngModel)]="searchTerm" placeholder="Escribe para buscar..." class="field-input" style="width: 250px;" />
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
            <button class="btn btn-primary" (click)="loadReport()">
              Actualizar
            </button>
          </div>
        </div>
      </header>

      <!-- Tabla de Datos -->
      <div class="content-card">
        <table class="data-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Folio Embarque</th>
              <th>Cliente</th>
              <th>Grupo</th>
              <th>Destino / Envía</th>
              <th>Producto</th>
              <th>No. Pallet</th>
            </tr>
          </thead>
          <tbody>
            @if (loading()) {
              <tr>
                <td colspan="7" class="empty-state">Cargando registros de embarques...</td>
              </tr>
            } @else if (filteredItems().length === 0) {
              <tr>
                <td colspan="7" class="empty-state">No se encontraron registros de embarques de pallets</td>
              </tr>
            } @else {
              @for (item of filteredItems(); track item.id) {
                <tr>
                  <td class="col-nombre">{{ item.fecha | date:'dd/MM/yyyy' }}</td>
                  <td>{{ item.folio }}</td>
                  <td>{{ item.clienteNombre }}</td>
                  <td>{{ item.clienteGrupo }}</td>
                  <td>{{ item.destinoEnvia }}</td>
                  <td>{{ item.productoNombre }}</td>
                  <td style="font-weight: 600; color: #475569;">{{ item.noPallet }}</td>
                </tr>
              }
            }
          </tbody>
        </table>
      </div>

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

    /* Input */
    .search-box { display: flex; flex-direction: column; position: relative; }
    .search-label { font-size: 0.75rem; color: #94a3b8; font-weight: 600; margin-bottom: 0.1rem; }
    .search-box .field-input {
      border: none;
      border-bottom: 1px solid #cbd5e1;
      border-radius: 0;
      padding: 0.4rem 0;
      font-size: 0.9rem;
      background: transparent;
      outline: none;
      transition: border-color 0.2s;
    }
    .search-box .field-input:focus {
      border-bottom-color: #5cb85c;
    }

    /* Data Table */
    .content-card { background: white; border-radius: 8px; border: 1px solid #e2e8f0; overflow: visible; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th { text-align: left; padding: 1rem; background: #f8fafc; color: #64748b; font-size: .75rem; font-weight: 800; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; }
    .data-table td { padding: .85rem 1rem; border-bottom: 1px solid #f1f5f9; font-size: .875rem; color: #334155; }
    .data-table tr:hover td { background: #f8fafc; }
    .empty-state { text-align: center; padding: 3.5rem; color: #94a3b8; font-style: italic; }

    .col-nombre { font-weight: 700; color: #5cb85c; }

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
export class PalletEmbarqueComponent implements OnInit {
  private reportesService = inject(ReportesService);

  searchTerm = '';
  loading = signal(false);
  items = signal<PalletEmbarqueItem[]>([]);
  showExportOptions = signal(false);

  filteredItems = computed(() => {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) return this.items();
    return this.items().filter(item => 
      item.folio.toLowerCase().includes(term) ||
      item.clienteNombre.toLowerCase().includes(term) ||
      item.clienteGrupo.toLowerCase().includes(term) ||
      item.productoNombre.toLowerCase().includes(term) ||
      item.noPallet.toLowerCase().includes(term)
    );
  });

  ngOnInit() {
    this.loadReport();
  }

  loadReport() {
    this.loading.set(true);
    this.reportesService.getPalletEmbarqueReport().subscribe({
      next: (data) => {
        this.items.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error cargando Pallet Embarque:', err);
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
    const dataToExport = this.filteredItems().map(item => ({
      'Fecha': new Date(item.fecha).toLocaleDateString(),
      'Folio Embarque': item.folio,
      'Cliente': item.clienteNombre,
      'Grupo': item.clienteGrupo,
      'Destino / Envía': item.destinoEnvia,
      'Producto': item.productoNombre,
      'No. Pallet': item.noPallet
    }));

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    XLSX.utils.book_append_sheet(wb, ws, 'Pallet Embarque');
    XLSX.writeFile(wb, 'Reporte_Pallet_Embarque.xlsx');
  }

  exportPDF() {
    this.showExportOptions.set(false);
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    let rows = '';
    this.filteredItems().forEach(item => {
      rows += `
        <tr>
          <td>${new Date(item.fecha).toLocaleDateString()}</td>
          <td>${item.folio}</td>
          <td>${item.clienteNombre}</td>
          <td>${item.clienteGrupo}</td>
          <td>${item.destinoEnvia}</td>
          <td>${item.productoNombre}</td>
          <td>${item.noPallet}</td>
        </tr>
      `;
    });

    printWindow.document.write(`
      <html>
        <head>
          <title>Reporte Pallet Embarque</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 2rem; color: #1e293b; background-color: #f8fafc; }
            .header-area { margin-bottom: 2rem; border-bottom: 2px solid #5cb85c; padding-bottom: 1rem; }
            h1 { color: #5cb85c; margin: 0; font-size: 1.8rem; }
            .date-subtitle { color: #64748b; font-size: 0.95rem; margin-top: 0.2rem; }
            table { width: 100%; border-collapse: collapse; margin-top: 1rem; background: white; border-radius: 6px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
            th, td { padding: 10px 14px; border-bottom: 1px solid #e2e8f0; text-align: left; font-size: 0.8rem; }
            th { background: #f8fafc; font-weight: bold; color: #475569; text-transform: uppercase; font-size: 0.7rem; }
          </style>
        </head>
        <body>
          <div class="header-area">
            <h1>Reporte Embarque Pallet</h1>
            <div class="date-subtitle">Generado el: ${new Date().toLocaleString()}</div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Folio</th>
                <th>Cliente</th>
                <th>Grupo</th>
                <th>Destino</th>
                <th>Producto</th>
                <th>No. Pallet</th>
              </tr>
            </thead>
            <tbody>
              ${rows ? rows : '<tr><td colspan="7" style="text-align:center; font-style:italic;">No se encontraron registros</td></tr>'}
            </tbody>
          </table>
          <script>window.onload = function() { window.print(); window.close(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }
}
