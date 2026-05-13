import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InventarioService, ExistenciaHistorico } from '../../../core/services/inventario';
import { PdfExportService } from '../../../core/services/pdf-export.service';

@Component({
  selector: 'app-cierre-mes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container animate-fade-in">
      <div class="page-header-modern">
        <div class="header-info">
          <h1 class="page-title">Cierre de Mes</h1>
          <nav class="breadcrumb-modern">
            <span>Inventarios</span>
            <span class="separator">/</span>
            <span class="active">Cierre de Mes</span>
          </nav>
        </div>
        <div class="header-actions">
          <div class="dropdown-container" style="display: inline-block; margin-right: 0.5rem;">
            <button class="btn-legacy secondary" (click)="showExportSelector = !showExportSelector">📥 Exportar <span class="arrow">▼</span></button>
            <div class="column-selector-dropdown shadow-premium" *ngIf="showExportSelector" style="width: 150px; right: 0;">
              <div class="column-list custom-scroll">
                <div class="column-group">
                  <label class="item-label export-item" (click)="exportToCSV(); showExportSelector = false">📄 Excel (CSV)</label>
                  <label class="item-label export-item" (click)="exportToPDF(); showExportSelector = false">📕 PDF</label>
                </div>
              </div>
            </div>
          </div>
          <button class="btn-primary-modern" (click)="abrirModalNuevoCierre()">
            <span class="icon">➕</span> Nuevo Cierre
          </button>
        </div>
      </div>

      <!-- Modal para Nuevo Cierre -->
      <div class="modal-overlay" *ngIf="showModal">
        <div class="modal-content-premium animate-fade-in shadow-2xl">
          <div class="modal-header">
            <h2>Generar Nuevo Cierre de Mes</h2>
            <button class="btn-close" (click)="showModal = false">×</button>
          </div>
          <div class="modal-body">
            <p class="modal-info">Esta acción tomará una fotografía instantánea del stock actual del sistema para todos los silos y artículos.</p>
            <div class="form-group-modern">
              <label>Observaciones o Motivo (Opcional)</label>
              <textarea class="modern-input" [(ngModel)]="observacionesNuevoCierre" rows="3" placeholder="Ej. Cierre fin de semana, Auditoría interna..."></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn-legacy secondary" (click)="showModal = false">Cancelar</button>
            <button class="btn-legacy primary" (click)="crearCierreYContinuar()" [disabled]="isSubmitting">
              {{ isSubmitting ? 'Generando...' : 'Crear y Capturar Físico' }}
            </button>
          </div>
        </div>
      </div>

      <div class="card-premium shadow-2xl">
        <div class="table-modern-container">
          <table class="table-modern">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha Cierre</th>
                <th>Usuario</th>
                <th>Observaciones</th>
                <th>Estado</th>
                <th class="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of data">
                <td><span class="badge-id">#{{item.id}}</span></td>
                <td>
                  <div class="date-box">
                    <span class="main-date">{{item.fecha}}</span>
                    <span class="sub-date">{{item.hora}}</span>
                  </div>
                </td>
                <td>{{item.usuario}}</td>
                <td>{{item.observaciones}}</td>
                <td>
                  <span class="status-pill" [class.status-active]="item.estado === 'Completado'">
                    {{item.estado}}
                  </span>
                </td>
                <td class="text-center">
                  <button class="btn-icon-modern" title="Ver Detalle / Capturar Físico" (click)="verDetalle(item.id)">
                    {{ item.estado === 'Abierto' ? '📝' : '👁️' }}
                  </button>
                  <button class="btn-icon-modern" title="Imprimir Reporte">🖨️</button>
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
    
    .card-premium { background: white; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; }
    .table-modern-container { overflow-x: auto; }
    .table-modern { width: 100%; border-collapse: collapse; text-align: left; }
    .table-modern th { background: #f1f5f9; padding: 1rem 1.5rem; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #475569; letter-spacing: 0.05em; }
    .table-modern td { padding: 1.25rem 1.5rem; border-bottom: 1px solid #f1f5f9; color: #334155; font-size: 0.9rem; }
    .table-modern tr:hover { background: #f8fafc; }

    .badge-id { background: #e2e8f0; color: #475569; padding: 0.25rem 0.6rem; border-radius: 6px; font-family: monospace; font-weight: 600; }
    .date-box { display: flex; flex-direction: column; }
    .main-date { font-weight: 700; color: #1e293b; }
    .sub-date { font-size: 0.75rem; color: #64748b; }
    
    .status-pill { padding: 0.35rem 0.75rem; border-radius: 20px; font-size: 0.75rem; font-weight: 700; background: #fee2e2; color: #991b1b; }
    .status-active { background: #dcfce7; color: #166534; }

    .btn-primary-modern { background: #166534; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 10px; font-weight: 600; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.5rem; }
    .btn-primary-modern:hover { background: #14532d; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(22, 101, 52, 0.2); }
    
    .btn-icon-modern { background: transparent; border: none; font-size: 1.1rem; cursor: pointer; padding: 0.4rem; border-radius: 6px; transition: background 0.2s; }
    .btn-icon-modern:hover { background: #f1f5f9; }

    .modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .modal-content-premium { background: white; border-radius: 16px; width: 90%; max-width: 500px; display: flex; flex-direction: column; overflow: hidden; border: 1px solid #e2e8f0; }
    .modal-header { padding: 1.25rem 1.5rem; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; background: #f8fafc; }
    .modal-header h2 { margin: 0; font-size: 1.25rem; font-weight: 700; color: #1e293b; }
    .btn-close { background: transparent; border: none; font-size: 1.5rem; color: #94a3b8; cursor: pointer; line-height: 1; transition: color 0.2s; }
    .btn-close:hover { color: #ef4444; }
    .modal-body { padding: 1.5rem; flex: 1; overflow-y: auto; }
    .modal-info { font-size: 0.9rem; color: #64748b; margin-bottom: 1rem; line-height: 1.4; }
    .form-group-modern { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.25rem; }
    .form-group-modern label { font-size: 0.85rem; font-weight: 600; color: #475569; }
    .modern-input { border: 1px solid #cbd5e1; border-radius: 8px; padding: 0.75rem 1rem; font-size: 0.95rem; font-family: inherit; transition: all 0.2s; outline: none; background: #f8fafc; width: 100%; box-sizing: border-box; }
    .modern-input:focus { border-color: #16a34a; background: white; box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1); }
    .modal-footer { padding: 1.25rem 1.5rem; border-top: 1px solid #f1f5f9; display: flex; justify-content: flex-end; gap: 1rem; background: #f8fafc; }
    
    .btn-legacy { padding: 0.6rem 1.2rem; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s; border: none; font-size: 0.9rem; }
    .btn-legacy.secondary { background: white; border: 1px solid #cbd5e1; color: #475569; }
    .btn-legacy.secondary:hover { background: #f1f5f9; }
    .btn-legacy.primary { background: #166534; color: white; }
    .btn-legacy.primary:hover { background: #14532d; transform: translateY(-1px); }
    .btn-legacy:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

    .animate-fade-in { animation: fadeIn 0.4s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

    .dropdown-container { position: relative; }
    .column-selector-dropdown { position: absolute; top: 110%; right: 0; background: white; border: 1px solid #ccc; border-radius: 4px; z-index: 100; padding: 0.5rem; }
    .export-item { padding: 0.5rem; cursor: pointer; display: block; font-size: 0.85rem; color: #333; }
    .export-item:hover { background: #f1f5f9; }
    .arrow { font-size: 0.7rem; margin-left: 0.5rem; opacity: 0.7; }
  `]
})
export class CierreMesComponent implements OnInit {
  private inventarioService = inject(InventarioService);
  private pdfService = inject(PdfExportService);
  private router = inject(Router);

  data: ExistenciaHistorico[] = [];
  
  showModal = false;
  showExportSelector = false;
  observacionesNuevoCierre = '';
  isSubmitting = false;

  ngOnInit() {
    this.cargarHistorial();
  }

  cargarHistorial() {
    console.log('Cargando historial de cierres...');
    this.inventarioService.getHistorialCierres().subscribe({
      next: (cierres) => {
        console.log('Historial cargado:', cierres);
        this.data = cierres;
      },
      error: (err) => console.error('Error cargando historial', err)
    });
  }

  abrirModalNuevoCierre() {
    this.observacionesNuevoCierre = '';
    this.showModal = true;
  }

  crearCierreYContinuar() {
    this.isSubmitting = true;
    this.inventarioService.crearNuevoCierre('Admin', this.observacionesNuevoCierre).subscribe({
      next: (nuevoId) => {
        this.isSubmitting = false;
        this.showModal = false;
        // Navegar a la pantalla de Existencias pasándole el ID
        this.router.navigate(['/inventario/existencias'], { queryParams: { id: nuevoId } });
      },
      error: (err) => {
        console.error('Error creando cierre', err);
        this.isSubmitting = false;
        alert('Hubo un error al generar el cierre de mes.');
      }
    });
  }

  verDetalle(id: string) {
    this.router.navigate(['/inventario/existencias'], { queryParams: { id: id } });
  }

  exportToCSV() {
    if (this.data.length === 0) return;
    const headers = ['ID', 'Fecha', 'Hora', 'Usuario', 'Observaciones', 'Estado'];
    const rows = this.data.map(item => [
      item.id,
      item.fecha,
      item.hora,
      item.usuario,
      item.observaciones,
      item.estado
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Historial_Cierres_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  exportToPDF() {
    if (this.data.length === 0) return;
    const headers = ['ID', 'Fecha', 'Hora', 'Usuario', 'Estado'];
    const tableData = this.data.map(item => [
      item.id,
      item.fecha,
      item.hora,
      item.usuario,
      item.estado
    ]);

    this.pdfService.exportTable(
      'Historial de Cierres de Mes',
      headers,
      tableData,
      `Reporte_Cierres_${new Date().toISOString().split('T')[0]}.pdf`
    );
  }
}
