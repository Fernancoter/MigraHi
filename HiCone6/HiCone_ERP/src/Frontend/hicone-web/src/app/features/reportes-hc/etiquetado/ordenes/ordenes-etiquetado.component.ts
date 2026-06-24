import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportesService, OrdenEtiquetadoItem } from '../../../../core/services/reportes';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-ordenes-etiquetado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up">
      <!-- Encabezado del Módulo -->
      <header class="module-header-container" style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
        <div class="title-area">
          <nav class="breadcrumb">Reportes HC › Etiquetado › Órdenes</nav>
          <h1 class="page-title">Órdenes de Etiquetado</h1>
        </div>

        <!-- Barra de Acciones y Filtros -->
        <div class="actions-toolbar" style="display: flex; width: 100%; align-items: center; justify-content: space-between;">
          <div class="toolbar-left" style="display: flex; gap: 1.5rem; align-items: center;">
            <div class="search-box">
              <span class="search-label">Buscar por No. Orden/Operador/Turno</span>
              <input type="text" [(ngModel)]="searchTerm" placeholder="Escribe para buscar..." class="field-input" style="width: 280px;" />
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
      <div class="content-card" style="overflow-x: auto;">
        <table class="data-table">
          <thead>
            <tr>
              <th>No. Orden</th>
              <th>Fecha Inicio</th>
              <th>Fecha Término</th>
              <th>Operador</th>
              <th>Turno</th>
              <th>Piezas Buenas</th>
              <th>Piezas Molino</th>
              <th>Etiquetadora Activa</th>
              <th>Velocidad (Línea 1 / Línea 2)</th>
              <th>Horas Útiles</th>
              <th>Eficiencia</th>
              <th>Observaciones</th>
            </tr>
          </thead>
          <tbody>
            @if (loading()) {
              <tr>
                <td colspan="12" class="empty-state">Cargando órdenes de etiquetado...</td>
              </tr>
            } @else if (filteredItems().length === 0) {
              <tr>
                <td colspan="12" class="empty-state">No se encontraron órdenes de etiquetado</td>
              </tr>
            } @else {
              @for (item of filteredItems(); track item.id) {
                <tr>
                  <td style="font-weight: 700; color: #1e293b;">{{ item.noOrden }}</td>
                  <td>{{ item.fechaInicio | date:'dd/MM/yyyy HH:mm' }}</td>
                  <td>{{ item.fechaTermina | date:'dd/MM/yyyy HH:mm' }}</td>
                  <td class="col-nombre">{{ item.operadorNombre }}</td>
                  <td>{{ item.turnoNombre }}</td>
                  <td style="font-weight: 600; color: #1e293b;">{{ item.piezasBuenas | number }} pzas</td>
                  <td style="color: #64748b;">{{ item.piezasMolino | number }} pzas</td>
                  <td>
                    <span class="status-badge status-active">
                      {{ item.etiquetadoraActiva }}
                    </span>
                  </td>
                  <td>{{ item.velLineaUno }} / {{ item.velLineaDos }}</td>
                  <td>{{ item.horasUtiles | number:'1.1-1' }} hrs</td>
                  <td>
                    <span class="status-badge" [ngClass]="{
                      'efficiency-high': item.eficiencia >= 85,
                      'efficiency-mid': item.eficiencia >= 70 && item.eficiencia < 85,
                      'efficiency-low': item.eficiencia < 70
                    }">
                      {{ item.eficiencia }}%
                    </span>
                  </td>
                  <td class="col-observaciones">{{ item.observaciones }}</td>
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
    .content-card { background: white; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
    .data-table { width: 100%; border-collapse: collapse; min-width: 1200px; }
    .data-table th { text-align: left; padding: 1rem; background: #f8fafc; color: #64748b; font-size: .75rem; font-weight: 800; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; }
    .data-table td { padding: .85rem 1rem; border-bottom: 1px solid #f1f5f9; font-size: .875rem; color: #334155; white-space: nowrap; }
    .data-table tr:hover td { background: #f8fafc; }
    .empty-state { text-align: center; padding: 3.5rem; color: #94a3b8; font-style: italic; }

    .col-nombre { font-weight: 700; color: #5cb85c; }
    .col-observaciones { max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

    /* Badges */
    .status-badge {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
    }
    .status-active {
      background-color: #dcfce7;
      color: #15803d;
    }
    .efficiency-high {
      background-color: #dcfce7;
      color: #15803d;
    }
    .efficiency-mid {
      background-color: #fef9c3;
      color: #a16207;
    }
    .efficiency-low {
      background-color: #fee2e2;
      color: #b91c1c;
    }

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
export class OrdenesEtiquetadoComponent implements OnInit {
  private reportesService = inject(ReportesService);

  searchTerm = '';
  loading = signal(false);
  items = signal<OrdenEtiquetadoItem[]>([]);
  showExportOptions = signal(false);

  filteredItems = computed(() => {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) return this.items();
    return this.items().filter(item => 
      item.noOrden.toLowerCase().includes(term) ||
      item.operadorNombre.toLowerCase().includes(term) ||
      item.turnoNombre.toLowerCase().includes(term) ||
      item.etiquetadoraActiva.toLowerCase().includes(term) ||
      (item.observaciones && item.observaciones.toLowerCase().includes(term))
    );
  });

  ngOnInit() {
    this.loadReport();
  }

  loadReport() {
    this.loading.set(true);
    this.reportesService.getOrdenEtiquetadoReport().subscribe({
      next: (data) => {
        this.items.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error cargando Órdenes Etiquetado:', err);
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
      'No. Orden': item.noOrden,
      'Fecha Inicio': new Date(item.fechaInicio).toLocaleString(),
      'Fecha Término': new Date(item.fechaTermina).toLocaleString(),
      'Operador': item.operadorNombre,
      'Turno': item.turnoNombre,
      'Piezas Buenas': item.piezasBuenas,
      'Piezas Molino': item.piezasMolino,
      'Etiquetadora Activa': item.etiquetadoraActiva,
      'Velocidad Línea 1': item.velLineaUno,
      'Velocidad Línea 2': item.velLineaDos,
      'Horas Útiles': item.horasUtiles,
      'Eficiencia (%)': item.eficiencia,
      'Observaciones': item.observaciones
    }));

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    XLSX.utils.book_append_sheet(wb, ws, 'Etiquetado');
    XLSX.writeFile(wb, 'Reporte_Ordenes_Etiquetado.xlsx');
  }

  exportPDF() {
    this.showExportOptions.set(false);
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    let rows = '';
    this.filteredItems().forEach(item => {
      rows += `
        <tr>
          <td>${item.noOrden}</td>
          <td>${new Date(item.fechaInicio).toLocaleString()}</td>
          <td>${new Date(item.fechaTermina).toLocaleString()}</td>
          <td>${item.operadorNombre}</td>
          <td>${item.turnoNombre}</td>
          <td>${item.piezasBuenas}</td>
          <td>${item.piezasMolino}</td>
          <td>${item.etiquetadoraActiva}</td>
          <td>${item.velLineaUno}/${item.velLineaDos}</td>
          <td>${item.horasUtiles.toFixed(1)}</td>
          <td>${item.eficiencia}%</td>
        </tr>
      `;
    });

    printWindow.document.write(`
      <html>
        <head>
          <title>Reporte de Órdenes de Etiquetado</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 2.5rem; color: #1e293b; background-color: #f8fafc; }
            .header-area { margin-bottom: 2rem; border-bottom: 2px solid #5cb85c; padding-bottom: 1rem; }
            h1 { color: #5cb85c; margin: 0; font-size: 1.8rem; }
            .date-subtitle { color: #64748b; font-size: 0.95rem; margin-top: 0.2rem; }
            table { width: 100%; border-collapse: collapse; margin-top: 1rem; background: white; border-radius: 6px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
            th, td { padding: 8px 10px; border-bottom: 1px solid #e2e8f0; text-align: left; font-size: 0.75rem; }
            th { background: #f8fafc; font-weight: bold; color: #475569; text-transform: uppercase; font-size: 0.65rem; }
          </style>
        </head>
        <body>
          <div class="header-area">
            <h1>Reporte de Órdenes de Etiquetado</h1>
            <div class="date-subtitle">Generado el: ${new Date().toLocaleString()}</div>
          </div>
          <table>
            <thead>
              <tr>
                <th>No. Orden</th>
                <th>Fecha Inicio</th>
                <th>Fecha Término</th>
                <th>Operador</th>
                <th>Turno</th>
                <th>Pzas Buenas</th>
                <th>Pzas Molino</th>
                <th>Etiquetadora</th>
                <th>Velocidad</th>
                <th>Horas</th>
                <th>Eficiencia</th>
              </tr>
            </thead>
            <tbody>
              \${rows ? rows : '<tr><td colspan="11" style="text-align:center; font-style:italic;">No se encontraron registros</td></tr>'}
            </tbody>
          </table>
          <script>window.onload = function() { window.print(); window.close(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }
}
