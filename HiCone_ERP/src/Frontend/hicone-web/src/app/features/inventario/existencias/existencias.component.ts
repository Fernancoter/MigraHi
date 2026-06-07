import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InventarioService } from '../../../core/services/inventario.service';
import { PdfExportService } from '../../../core/services/pdf-export.service';

@Component({
  selector: 'app-existencias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container animate-fade-in">
      <div class="page-header-modern">
        <div class="header-info">
          <h1 class="page-title premium-title">Existencia</h1>
          <nav class="breadcrumb-modern">
            <span>Inventarios</span>
            <span class="separator">></span>
            <span class="active">Inventario</span>
          </nav>
        </div>
      </div>

      <div class="alert-container-fixed" *ngIf="successMessage || errorMessage">
        <div class="alert-premium success animate-fade-in" *ngIf="successMessage">
          <span class="icon">✓</span>
          <div class="content"><strong>¡Éxito!</strong><p>{{ successMessage }}</p></div>
        </div>
        <div class="alert-premium error animate-fade-in" *ngIf="errorMessage">
          <span class="icon">⚠️</span>
          <div class="content"><strong>Error</strong><p>{{ errorMessage }}</p></div>
        </div>
      </div>

      <div class="subtitle-text">
        {{ currentFechaHora }} {{ currentTurno }}
      </div>

      <div class="card-premium shadow-2xl relative-card">
        <div class="card-tabs">
          <button class="tab-btn" [class.active]="activeTab === 'bobinas'" (click)="selectTab('bobinas')">Bobinas</button>
          <button class="tab-btn" [class.active]="activeTab === 'pallets'" (click)="selectTab('pallets')">Pallets</button>
          <button class="tab-btn" [class.active]="activeTab === 'silos'" (click)="selectTab('silos')">Silos</button>
        </div>

        <!-- TABLA: Bobinas / Pallets -->
        <div class="table-modern-container" *ngIf="activeTab === 'bobinas' || activeTab === 'pallets'">
          <div class="loading-overlay" *ngIf="loading">⏳ Cargando datos...</div>
          <table class="table-modern" *ngIf="!loading">
            <thead>
              <tr>
                <th>Producto Nombre</th>
                <th class="text-right">Existencia Producto Cantidad</th>
                <th class="text-right">Existencia Producto Cantidad Sistema</th>
                <th class="text-right">Producido en Turno</th>
                <th class="text-right">En Turno Según Sistema</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of (activeTab === 'bobinas' ? bobinasInventory : palletsInventory)">
                <td><span class="product-name">{{item.productoNombre}}</span></td>
                <td class="text-right">
                   <input type="number" class="modern-input text-right" [(ngModel)]="item.cantidadReal">
                </td>
                <td class="text-right font-mono">{{item.cantidadSistema | number:'1.0-0'}}</td>
                <td class="text-right">
                   <input type="number" class="modern-input text-right bg-readonly" [ngModel]="0" readonly>
                </td>
                <td class="text-right font-mono">0</td>
              </tr>
              <tr *ngIf="(activeTab === 'bobinas' ? bobinasInventory : palletsInventory).length === 0">
                <td colspan="5" class="text-center empty-row">No se encontraron productos.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- TABLA: Silos -->
        <div class="table-modern-container" *ngIf="activeTab === 'silos'">
          <div class="loading-overlay" *ngIf="loading">⏳ Cargando datos...</div>
          <table class="table-modern" *ngIf="!loading">
            <thead>
              <tr>
                <th>Silo</th>
                <th>Tipo Material</th>
                <th>Estado Material</th>
                <th>Lote</th>
                <th class="text-right">Cantidad</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of silosInventory">
                <td>{{item.siloNombre}}</td>
                <td>{{item.tipoMaterial}}</td>
                <td>{{item.estadoMaterial}}</td>
                <td>{{item.loteVirgen || 'N/A'}}</td>
                <td class="text-right">
                   <input type="number" class="modern-input text-right" [(ngModel)]="item.cantidadReal">
                </td>
              </tr>
              <tr *ngIf="silosInventory.length === 0">
                <td colspan="5" class="text-center empty-row">No se encontraron registros de silos.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="card-footer-buttons">
          <button class="btn-premium confirm-btn" (click)="guardarExistencias()" [disabled]="saving">
            {{ saving ? 'GUARDANDO...' : 'CONFIRMAR' }}
          </button>
        </div>
      </div>
      
      <div class="page-footer-actions">
        <button class="btn-premium report-btn" (click)="exportToPDF()">
          REPORTE INVENTARIO
        </button>
      </div>
    </div>
  `,
  styles: [\n  .card-tabs { display: flex; gap: 1rem; border-bottom: 2px solid #e2e8f0; margin-bottom: 1.5rem; padding: 0 1.5rem; }\n  .tab-btn { padding: 0.75rem 1.5rem; font-weight: 600; color: #64748b; background: none; border: none; border-bottom: 3px solid transparent; cursor: pointer; transition: all 0.2s; font-size: 1rem; }\n  .tab-btn:hover { color: #10b981; }\n  .tab-btn.active { color: #10b981; border-bottom-color: #10b981; }\n  .loading-overlay { padding: 3rem; text-align: center; color: #64748b; font-weight: 600; }\n  .product-name { font-weight: 600; color: #1e293b; }\n  .modern-input { padding: 0.5rem; border: 1px solid #cbd5e1; border-radius: 6px; width: 100px; text-align: right; }\n  .modern-input:focus { outline: none; border-color: #10b981; box-shadow: 0 0 0 2px rgba(16,185,129,0.1); }\n  .bg-readonly { background: #f8fafc; color: #94a3b8; }\n  .empty-row { padding: 2rem !important; color: #94a3b8; }\n  .card-premium { padding: 1.5rem 0; }\n  .btn-report { background: #10b981; color: white; padding: 0.8rem 1.5rem; border-radius: 8px; border: none; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; }\n  .btn-report:hover { background: #059669; }\n  .action-bar { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem; border-top: 1px solid #e2e8f0; margin-top: 1.5rem; }\n  ] {
      background: #f8f9fa;
      border-color: #cbd5e1;
      color: #2e7d32;
    }
    .btn-page.active {
      background: #2e7d32;
      border-color: #2e7d32;
      color: white;
    }
    .btn-page[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Premium Modals Tabs */
    .modal-tabs {
      display: flex; background: #f8fafc; border-bottom: 2px solid #edf2f7;
      padding: 0 2rem; gap: 1rem;
    }
    .modal-tab-btn {
      padding: 1.2rem 1.5rem; background: none; border: none; border-bottom: 3px solid transparent;
      font-size: 1.05rem; font-weight: 600; color: #64748b; cursor: pointer;
      transition: all 0.2s ease-in-out;
    }
    .modal-tab-btn:hover { color: #2c3e50; }
    .modal-tab-btn.active {
      color: #5cb85c; border-bottom-color: #5cb85c;
    }

    /* Timeline Premium Neo-Cyber */
    .audit-timeline-container {
      grid-column: span 2; max-height: 450px; overflow-y: auto; padding: 1rem 0.5rem;
    }
    .audit-timeline-loading {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 1rem; padding: 3rem 0; color: #64748b; font-weight: 600;
    }
    .loader-premium {
      width: 40px; height: 40px; border: 4px solid #edf2f7; border-top-color: #5cb85c;
      border-radius: 50%; animation: spin 1s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .audit-timeline-empty {
      text-align: center; padding: 3rem 0; color: #64748b; font-size: 1.1rem;
    }
    
    .premium-timeline {
      position: relative; padding-left: 2.5rem; border-left: 3px solid #edf2f7;
      margin: 1rem 0; display: flex; flex-direction: column; gap: 2rem;
    }
    .timeline-item {
      position: relative; animation: slideInTimeline 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
    }
    @keyframes slideInTimeline {
      from { opacity: 0; transform: translateX(-20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    .timeline-badge {
      position: absolute; left: -3.65rem; top: 0.5rem; width: 2.2rem; height: 2.2rem;
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
      font-size: 1.1rem; border: 3px solid #fff; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
      background: #e2e8f0;
    }
    .timeline-badge.insert { background: #e6f4ea; border-color: #e6f4ea; color: #137333; }
    .timeline-badge.update { background: #e8f0fe; border-color: #e8f0fe; color: #1a73e8; }
    .timeline-badge.delete { background: #fce8e6; border-color: #fce8e6; color: #c5221f; }
    .timeline-badge.archive { background: #fef7e0; border-color: #fef7e0; color: #b06000; }

    .timeline-card.glass {
      background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(12px);
      border: 1px solid rgba(226, 232, 240, 0.8); border-radius: 12px;
      padding: 1.5rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);
      transition: all 0.2s ease;
    }
    .timeline-card.glass:hover {
      transform: translateY(-2px); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
      border-color: #cbd5e1;
    }
    .card-meta {
      display: flex; justify-content: space-between; font-size: 0.85rem;
      color: #94a3b8; margin-bottom: 0.6rem; font-weight: 600;
    }
    .meta-user { display: flex; align-items: center; gap: 0.3rem; }
    .card-action-title {
      font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem;
    }
    .card-action-title.insert { color: #137333; }
    .card-action-title.update { color: #1a73e8; }
    .card-action-title.delete { color: #c5221f; }
    .card-action-title.archive { color: #b06000; }

    .changes-list {
      display: flex; flex-direction: column; gap: 0.8rem; background: #f8fafc;
      border-radius: 8px; padding: 1rem; border: 1px solid #edf2f7;
    }
    .change-row {
      display: flex; justify-content: space-between; align-items: center;
      padding-bottom: 0.5rem; border-bottom: 1px dashed #edf2f7;
    }
    .change-row:last-child { padding-bottom: 0; border-bottom: none; }
    .change-field {
      font-size: 0.95rem; font-weight: 700; color: #475569;
    }
    .change-values {
      display: flex; align-items: center; gap: 0.6rem; font-family: 'JetBrains Mono', monospace;
      font-size: 0.95rem; font-weight: 600;
    }
    .val-old {
      color: #9b1c1c; background: #fde8e8; padding: 0.2rem 0.5rem; border-radius: 4px;
    }
    .val-arrow { color: #64748b; font-weight: bold; }
    .val-new {
      color: #137333; background: #e6f4ea; padding: 0.2rem 0.5rem; border-radius: 4px;
    }
    .action-details {
      font-size: 0.95rem; color: #64748b; line-height: 1.5;
    }
    
    @keyframes fadeInDropdown {
      from { opacity: 0; transform: translateY(5px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class ExistenciasComponent implements OnInit {
  private inventarioService = inject(InventarioService);
  private pdfService = inject(PdfExportService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  activeTab = 'bobinas';
  loading = false;
  saving = false;
  errorMessage = '';
  successMessage = '';
  
  currentExistenciaId = '00000000-0000-0000-0000-000000000000'; 
  currentFechaHora = '13/07/25';
  currentTurno = '1er Turno';
  
  silosInventory: any[] = [];
  bobinasInventory: any[] = [];
  palletsInventory: any[] = [];

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.currentExistenciaId = id;
      }
      this.loadAllData();
    });
  }

  selectTab(tab: string) {
    this.activeTab = tab;
    this.errorMessage = '';
    this.successMessage = '';
  }

  loadAllData() {
    this.loading = true;
    setTimeout(() => {
      this.bobinasInventory = [
        { productoNombre: '74757', cantidadSistema: 1346, cantidadReal: 98 },
        { productoNombre: '80637', cantidadSistema: 37, cantidadReal: 0 },
        { productoNombre: '80687', cantidadSistema: 11, cantidadReal: 0 },
        { productoNombre: '80957', cantidadSistema: 394, cantidadReal: 36 },
        { productoNombre: '80617', cantidadSistema: 166, cantidadReal: 0 },
        { productoNombre: '8063C2', cantidadSistema: 2204, cantidadReal: 59 },
        { productoNombre: '8095C2', cantidadSistema: 8, cantidadReal: 0 },
        { productoNombre: '8067C2', cantidadSistema: 0, cantidadReal: 0 }
      ];
      this.palletsInventory = [
        { productoNombre: '747572000', cantidadSistema: 156, cantidadReal: 43 },
        { productoNombre: '805972000', cantidadSistema: 0, cantidadReal: 0 },
        { productoNombre: '806072000', cantidadSistema: 0, cantidadReal: 0 },
        { productoNombre: '806372000', cantidadSistema: 53, cantidadReal: 0 },
        { productoNombre: '806872000', cantidadSistema: 40, cantidadReal: 30 },
        { productoNombre: '809572000', cantidadSistema: 16, cantidadReal: 22 },
        { productoNombre: '806372LHV', cantidadSistema: 0, cantidadReal: 0 }
      ];
      this.silosInventory = [
        { siloNombre: 'Silo 1', tipoMaterial: 'PCR', estadoMaterial: 'Virgen (pelet)', loteVirgen: '625NP0884N', cantidadReal: 21428 },
        { siloNombre: 'Silo 2', tipoMaterial: 'PCR', estadoMaterial: 'Molido', loteVirgen: 'N/A', cantidadReal: 30820 },
        { siloNombre: 'Silo 4', tipoMaterial: 'PCR', estadoMaterial: 'Molido', loteVirgen: 'N/A', cantidadReal: 20552 },
        { siloNombre: 'Silo 5', tipoMaterial: 'PCR', estadoMaterial: 'Molido', loteVirgen: 'N/A', cantidadReal: 5174 },
        { siloNombre: 'CAJA 55% PCR', tipoMaterial: 'PCR', estadoMaterial: 'Virgen (pelet)', loteVirgen: '624J7607N', cantidadReal: 0 },
        { siloNombre: 'Silo 3', tipoMaterial: 'PCR', estadoMaterial: 'Molido', loteVirgen: 'N/A', cantidadReal: 48027 },
        { siloNombre: 'Silo 7', tipoMaterial: 'PCR', estadoMaterial: 'Virgen (pelet)', loteVirgen: '625N7123N', cantidadReal: 49787 }
      ];
      this.loading = false;
    }, 500);
  }

  guardarExistencias() {
    this.errorMessage = '';
    this.successMessage = '';
    if (!confirm('¿Estás seguro de que deseas confirmar este inventario físico?')) {
      return;
    }
    this.saving = true;
    setTimeout(() => {
      this.successMessage = '¡Inventario guardado con éxito!';
      this.saving = false;
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }, 800);
  }

  exportToPDF() {
    this.successMessage = 'Generando Reporte PDF...';
    setTimeout(() => {
      this.successMessage = '';
    }, 2000);
  }
}
