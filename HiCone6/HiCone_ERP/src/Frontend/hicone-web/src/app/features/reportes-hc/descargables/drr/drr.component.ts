import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportesService, DrrReport, DrrExtrusionItem, DrrPrensadoItem } from '../../../../core/services/reportes';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-drr',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up">
      <!-- Encabezado del Módulo -->
      <header class="module-header-container" style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
        <div class="title-area">
          <nav class="breadcrumb">Reportes HC › Descargables › DRR</nav>
          <h1 class="page-title">Reporte DRR</h1>
        </div>

        <!-- Barra de Acciones y Filtros -->
        <div class="actions-toolbar" style="display: flex; width: 100%; align-items: center; justify-content: space-between;">
          <div class="toolbar-left" style="display: flex; gap: 1rem; align-items: center;">
            <div class="search-box" style="margin-right: 0.5rem;">
              <span class="search-label">Fecha del Reporte</span>
              <input type="date" [(ngModel)]="fechaFiltro" (ngModelChange)="loadDrrReport()" class="field-input" style="width: 150px; padding: 0.4rem 0;" />
            </div>

            <button class="btn btn-primary" (click)="loadDrrReport()" style="height: 38px; display: flex; align-items: center; justify-content: center; margin-top: 1.1rem;">
              Aplicar Filtro
            </button>

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

          <div class="toolbar-right">
          </div>
        </div>
      </header>

      <!-- Grid de Tablas Consolidadas -->
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        
        <!-- Bloque de Extrusión -->
        <div class="content-card">
          <div class="table-title-bar" style="padding: 1rem 1.5rem; border-bottom: 1px solid #e2e8f0; background: #f8fafc;">
            <h2 style="font-size: 1.1rem; font-weight: 700; color: #475569; margin: 0;">Corridas de Extrusión</h2>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Extrusora</th>
                <th>Turno</th>
                <th>Operario</th>
                <th>Producto</th>
                <th>Programado (Kg)</th>
                <th>Producido (Kg)</th>
                <th>Target (Kg)</th>
                <th>Eficiencia (%)</th>
                <th>Merma Kg (Molido)</th>
                <th>Int. (Min)</th>
              </tr>
            </thead>
            <tbody>
              @if (loading()) {
                <tr>
                  <td colspan="10" class="empty-state">Cargando registros de extrusión...</td>
                </tr>
              } @else if (!reportData() || reportData()!.extrusiones.length === 0) {
                <tr>
                  <td colspan="10" class="empty-state">No se encontraron registros de extrusión</td>
                </tr>
              } @else {
                @for (item of reportData()!.extrusiones; track item.id) {
                  <tr>
                    <td class="col-nombre">{{ item.extrusora }}</td>
                    <td>{{ item.turno }}</td>
                    <td>{{ item.operario }}</td>
                    <td>{{ item.producto }}</td>
                    <td>{{ item.programado | number:'1.2-2' }}</td>
                    <td>{{ item.producido | number:'1.0-0' }}</td>
                    <td>{{ item.target | number:'1.2-2' }}</td>
                    <td>
                      <span [style.color]="item.eficiencia >= 90 ? '#10b981' : '#f59e0b'" style="font-weight: 700;">
                        {{ item.eficiencia | number:'1.2-2' }}%
                      </span>
                    </td>
                    <td>{{ item.kgMolido | number:'1.2-2' }}</td>
                    <td>{{ item.tiempoInterrupcionMin }} min</td>
                  </tr>
                }
              }
            </tbody>
          </table>
        </div>

        <!-- Bloque de Prensado -->
        <div class="content-card">
          <div class="table-title-bar" style="padding: 1rem 1.5rem; border-bottom: 1px solid #e2e8f0; background: #f8fafc;">
            <h2 style="font-size: 1.1rem; font-weight: 700; color: #475569; margin: 0;">Corridas de Prensado</h2>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Prensa</th>
                <th>Turno</th>
                <th>Operario</th>
                <th>Producto</th>
                <th>Programado (Carr.)</th>
                <th>Producido (Carr.)</th>
                <th>Target (Carr.)</th>
                <th>Eficiencia (%)</th>
                <th>Lote Silo</th>
                <th>Int. (Min)</th>
              </tr>
            </thead>
            <tbody>
              @if (loading()) {
                <tr>
                  <td colspan="10" class="empty-state">Cargando registros de prensado...</td>
                </tr>
              } @else if (!reportData() || reportData()!.prensados.length === 0) {
                <tr>
                  <td colspan="10" class="empty-state">No se encontraron registros de prensado</td>
                </tr>
              } @else {
                @for (item of reportData()!.prensados; track item.id) {
                  <tr>
                    <td class="col-nombre">{{ item.prensa }}</td>
                    <td>{{ item.turno }}</td>
                    <td>{{ item.operario }}</td>
                    <td>{{ item.producto }}</td>
                    <td>{{ item.programado | number:'1.2-2' }}</td>
                    <td>{{ item.producido | number:'1.0-0' }}</td>
                    <td>{{ item.target | number:'1.2-2' }}</td>
                    <td>
                      <span [style.color]="item.eficiencia >= 90 ? '#10b981' : '#f59e0b'" style="font-weight: 700;">
                        {{ item.eficiencia | number:'1.2-2' }}%
                      </span>
                    </td>
                    <td>{{ item.loteSilo }}</td>
                    <td>{{ item.tiempoInterrupcionMin }} min</td>
                  </tr>
                }
              }
            </tbody>
          </table>
        </div>

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

    /* Date field input */
    .search-box { display: flex; flex-direction: column; position: relative; }
    .search-label { font-size: 0.75rem; color: #94a3b8; font-weight: 600; margin-bottom: 0.1rem; }
    .search-box .field-input {
      border: none;
      border-bottom: 1px solid #cbd5e1;
      border-radius: 0;
      padding: 0.4rem 0;
      font-size: 0.9rem;
      background: transparent;
      width: 150px;
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
export class DrrComponent implements OnInit {
  private reportesService = inject(ReportesService);

  fechaFiltro = new Date().toISOString().split('T')[0];
  loading = signal(false);
  reportData = signal<DrrReport | null>(null);
  showExportOptions = signal(false);

  ngOnInit() {
    this.loadDrrReport();
  }

  loadDrrReport() {
    this.loading.set(true);
    this.reportesService.getDrrReport(this.fechaFiltro).subscribe({
      next: (data) => {
        this.reportData.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error cargando DRR:', err);
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
    const data = this.reportData();
    if (!data) return;

    // Sheet 1: Extrusion
    const extData = data.extrusiones.map(item => ({
      'Extrusora': item.extrusora,
      'Turno': item.turno,
      'Operario': item.operario,
      'Producto': item.producto,
      'Programado (Kg)': item.programado,
      'Producido (Kg)': item.producido,
      'Target (Kg)': item.target,
      'Eficiencia (%)': item.eficiencia,
      'Merma Kg (Molido)': item.kgMolido,
      'Int. (Min)': item.tiempoInterrupcionMin
    }));

    // Sheet 2: Prensado
    const prenData = data.prensados.map(item => ({
      'Prensa': item.prensa,
      'Turno': item.turno,
      'Operario': item.operario,
      'Producto': item.producto,
      'Programado (Carr.)': item.programado,
      'Producido (Carr.)': item.producido,
      'Target (Carr.)': item.target,
      'Eficiencia (%)': item.eficiencia,
      'Lote Silo': item.loteSilo,
      'Int. (Min)': item.tiempoInterrupcionMin
    }));

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const wsExt = XLSX.utils.json_to_sheet(extData);
    const wsPren = XLSX.utils.json_to_sheet(prenData);

    XLSX.utils.book_append_sheet(wb, wsExt, 'Extrusión DRR');
    XLSX.utils.book_append_sheet(wb, wsPren, 'Prensado DRR');

    XLSX.writeFile(wb, `Reporte_DRR_${this.fechaFiltro}.xlsx`);
  }

  exportPDF() {
    this.showExportOptions.set(false);
    const data = this.reportData();
    if (!data) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    let extrusionRows = '';
    data.extrusiones.forEach(item => {
      extrusionRows += `
        <tr>
          <td>${item.extrusora}</td>
          <td>${item.turno}</td>
          <td>${item.operario}</td>
          <td>${item.producto}</td>
          <td>${item.programado.toFixed(2)}</td>
          <td>${item.producido}</td>
          <td>${item.target.toFixed(2)}</td>
          <td>${item.eficiencia.toFixed(2)}%</td>
          <td>${item.kgMolido.toFixed(2)}</td>
          <td>${item.tiempoInterrupcionMin} min</td>
        </tr>
      `;
    });

    let prensadoRows = '';
    data.prensados.forEach(item => {
      prensadoRows += `
        <tr>
          <td>${item.prensa}</td>
          <td>${item.turno}</td>
          <td>${item.operario}</td>
          <td>${item.producto}</td>
          <td>${item.programado.toFixed(2)}</td>
          <td>${item.producido}</td>
          <td>${item.target.toFixed(2)}</td>
          <td>${item.eficiencia.toFixed(2)}%</td>
          <td>${item.loteSilo}</td>
          <td>${item.tiempoInterrupcionMin} min</td>
        </tr>
      `;
    });

    printWindow.document.write(`
      <html>
        <head>
          <title>Reporte DRR - ${this.fechaFiltro}</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 2rem; color: #1e293b; background-color: #f8fafc; }
            .header-area { margin-bottom: 2rem; border-bottom: 2px solid #5cb85c; padding-bottom: 1rem; }
            h1 { color: #5cb85c; margin: 0; font-size: 1.8rem; }
            .date-subtitle { color: #64748b; font-size: 0.95rem; margin-top: 0.2rem; }
            .section-title { font-size: 1.2rem; color: #334155; margin-top: 2rem; margin-bottom: 0.8rem; border-left: 4px solid #5cb85c; padding-left: 0.5rem; font-weight: 700; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 2rem; background: white; border-radius: 6px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
            th, td { padding: 10px 14px; border-bottom: 1px solid #e2e8f0; text-align: left; font-size: 0.8rem; }
            th { background: #f8fafc; font-weight: bold; color: #475569; text-transform: uppercase; font-size: 0.7rem; }
            tr:last-child td { border-bottom: none; }
          </style>
        </head>
        <body>
          <div class="header-area">
            <h1>Daily Run Report (DRR)</h1>
            <div class="date-subtitle">Fecha del reporte: ${new Date(this.fechaFiltro + 'T00:00:00').toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
            <div class="date-subtitle" style="font-size: 0.8rem;">Generado el: ${new Date().toLocaleString()}</div>
          </div>

          <div class="section-title">Corridas de Extrusión</div>
          <table>
            <thead>
              <tr>
                <th>Extrusora</th>
                <th>Turno</th>
                <th>Operario</th>
                <th>Producto</th>
                <th>Prog. (Kg)</th>
                <th>Prod. (Kg)</th>
                <th>Target (Kg)</th>
                <th>Efic. (%)</th>
                <th>Merma (Kg)</th>
                <th>Int. (Min)</th>
              </tr>
            </thead>
            <tbody>
              ${extrusionRows ? extrusionRows : '<tr><td colspan="10" style="text-align:center; font-style:italic;">No se encontraron registros de extrusión</td></tr>'}
            </tbody>
          </table>

          <div class="section-title">Corridas de Prensado</div>
          <table>
            <thead>
              <tr>
                <th>Prensa</th>
                <th>Turno</th>
                <th>Operario</th>
                <th>Producto</th>
                <th>Prog. (Carr.)</th>
                <th>Prod. (Carr.)</th>
                <th>Target (Carr.)</th>
                <th>Efic. (%)</th>
                <th>Lote Silo</th>
                <th>Int. (Min)</th>
              </tr>
            </thead>
            <tbody>
              ${prensadoRows ? prensadoRows : '<tr><td colspan="10" style="text-align:center; font-style:italic;">No se encontraron registros de prensado</td></tr>'}
            </tbody>
          </table>

          <script>window.onload = function() { window.print(); window.close(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }
}
