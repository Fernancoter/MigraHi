import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InventarioService } from '../../../core/services/inventario';

@Component({
  selector: 'app-existencias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container animate-fade-in">
      <div class="page-header-premium">
        <div class="title-section">
          <h1 class="premium-title">Existencia</h1>
          <nav class="breadcrumb-modern">
            <span>Inventarios</span>
            <span class="sep">></span>
            <span class="active">Inventario</span>
          </nav>
        </div>
      </div>

      <div class="subtitle-text">
        {{ fechaHora || 'Cargando...' }} {{ turno }}
      </div>

      <div class="card-premium">
        <div class="card-tabs-premium">
          <button class="tab-btn-premium" [class.active]="activeTab === 'bobinas'" (click)="selectTab('bobinas')">Bobinas</button>
          <button class="tab-btn-premium" [class.active]="activeTab === 'pallets'" (click)="selectTab('pallets')">Pallets</button>
          <button class="tab-btn-premium" [class.active]="activeTab === 'silos'" (click)="selectTab('silos')">Silos</button>
        </div>

        <div class="table-modern-container" style="padding: 1.5rem 2rem 2rem 2rem;">
          <table class="table-modern">
            <thead>
              <tr>
                <th>Producto</th>
                <th class="text-right">Cantidad Real</th>
                <th class="text-right">Cantidad Sistema</th>
                <th class="text-right">Producido en Turno</th>
                <th class="text-right">En Turno Según Sistema</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of getActiveInventory()">
                <td>{{ item.producto }}</td>
                <td class="text-right">
                  <input type="number" class="input-premium text-right" style="width: 100px; display: inline-block;" [(ngModel)]="item.cantidadReal">
                </td>
                <td class="text-right font-mono">{{ item.cantidadSistema }}</td>
                <td class="text-right">
                  <input type="number" class="input-premium text-right" style="width: 100px; display: inline-block;" [(ngModel)]="item.producidoEnTurno" [disabled]="activeTab === 'silos'">
                </td>
                <td class="text-right font-mono">{{ item.enTurnoSegunSistema }}</td>
              </tr>
              <tr *ngIf="getActiveInventory().length === 0">
                <td colspan="5" class="empty-row-premium">No hay registros disponibles.</td>
              </tr>
            </tbody>
          </table>
          <div class="card-footer-actions">
            <button class="btn-premium" (click)="confirmar()">CONFIRMAR</button>
          </div>
        </div>
      </div>

      <div class="page-footer-actions">
        <button class="btn-premium-secondary" (click)="generarReporte()">REPORTE INVENTARIO</button>
      </div>
      
      <div class="bottom-bar-premium">
        Consultas a partir de la siguiente fecha: <span class="date-box">07/03/26 <span class="calendar-icon">📅</span></span> Copyright 2026
      </div>
    </div>
  `,
  styles: [`
    .card-tabs-premium {
      display: flex;
      border-bottom: 1px solid var(--border-color);
      background: #f8fafc;
      border-radius: 12px 12px 0 0;
      overflow: hidden;
    }
    .tab-btn-premium {
      padding: 1rem 2rem;
      background: none;
      border: none;
      font-size: 0.95rem;
      color: #64748b;
      cursor: pointer;
      border-bottom: 3px solid transparent;
      transition: all 0.2s;
      font-weight: 600;
    }
    .tab-btn-premium:hover {
      color: #1e293b;
      background: #f1f5f9;
    }
    .tab-btn-premium.active {
      color: #10b981;
      border-bottom-color: #10b981;
      font-weight: 700;
      background: #fff;
    }
    
    .card-footer-actions { display: flex; justify-content: flex-end; margin-top: 1.5rem; }
    .page-footer-actions { display: flex; justify-content: flex-end; margin-bottom: 4rem; }
    
    .bottom-bar-premium { border-top: 1px solid var(--border-color); padding-top: 1rem; padding-bottom: 1rem; font-size: 0.75rem; color: #64748b; display: flex; align-items: center; justify-content: center; gap: 0.5rem; position: absolute; bottom: 0; left: 3rem; right: 3rem; }
    .date-box { display: flex; align-items: center; gap: 0.3rem; font-weight: 600; color: #1e293b; }
    .calendar-icon { color: #a0aec0; }
  `]
})
export class ExistenciasComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private inventarioService = inject(InventarioService);
  
  existenciaId: string = '';
  fechaHora: string = '';
  turno: string = '';
  activeTab: 'bobinas' | 'pallets' | 'silos' = 'bobinas';
  
  bobinasInventory: any[] = [];
  palletsInventory: any[] = [];
  silosInventory: any[] = [];

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.existenciaId = params['id'];
      if (this.existenciaId) {
        this.cargarExistencias();
      }
    });
  }

  cargarExistencias() {
    // Silos
    this.inventarioService.getExistenciaSilo(this.existenciaId).subscribe({
      next: (data) => {
        this.silosInventory = data.map(item => ({
          siloId: item.siloId,
          producto: item.siloNombre,
          cantidadReal: item.cantidadReal,
          cantidadSistema: item.cantidadSistema,
          producidoEnTurno: 0,
          enTurnoSegunSistema: 0,
          tipoMaterial: item.tipoMaterial,
          loteVirgen: item.loteVirgen
        }));
      },
      error: (err) => console.error('Error al cargar existencias de silos:', err)
    });

    // Bobinas (using default "Bobinas de Empaque" category name)
    this.inventarioService.getExistenciaProducto(this.existenciaId, 'Bobinas de Empaque', 'Bobina').subscribe({
      next: (data) => {
        this.bobinasInventory = data.map(item => ({
          productoId: item.productoId,
          producto: item.productoNombre,
          cantidadReal: item.cantidadReal,
          cantidadSistema: item.cantidadSistema,
          producidoEnTurno: item.producidoEnTurno,
          enTurnoSegunSistema: item.enTurnoSegunSistema
        }));
      },
      error: (err) => console.error('Error al cargar existencias de bobinas:', err)
    });

    // Pallets
    this.inventarioService.getExistenciaProducto(this.existenciaId, 'Bobinas de Empaque', 'Pallet').subscribe({
      next: (data) => {
        this.palletsInventory = data.map(item => ({
          productoId: item.productoId,
          producto: item.productoNombre,
          cantidadReal: item.cantidadReal,
          cantidadSistema: item.cantidadSistema,
          producidoEnTurno: item.producidoEnTurno,
          enTurnoSegunSistema: item.enTurnoSegunSistema
        }));
      },
      error: (err) => console.error('Error al cargar existencias de pallets:', err)
    });
  }

  selectTab(tab: 'bobinas' | 'pallets' | 'silos') {
    this.activeTab = tab;
  }

  getActiveInventory() {
    if (this.activeTab === 'bobinas') return this.bobinasInventory;
    if (this.activeTab === 'pallets') return this.palletsInventory;
    return this.silosInventory;
  }

  confirmar() {
    if (this.activeTab === 'silos') {
      const ajustes = this.silosInventory.map(item => ({
        siloId: item.siloId,
        siloNombre: item.producto,
        tipoMaterial: item.tipoMaterial,
        cantidadSistema: item.cantidadSistema,
        cantidadReal: item.cantidadReal,
        loteVirgen: item.loteVirgen
      }));
      this.inventarioService.updateExistenciasSilos(ajustes).subscribe({
        next: () => {
          alert('Inventario de silos guardado correctamente.');
          this.cargarExistencias();
        },
        error: (err) => alert('Error al guardar existencias de silos: ' + err.message)
      });
    } else {
      const inventory = this.activeTab === 'bobinas' ? this.bobinasInventory : this.palletsInventory;
      const items = inventory.map(item => ({
        productoId: item.productoId,
        productoNombre: item.producto,
        existenciaId: this.existenciaId,
        cantidadReal: item.cantidadReal,
        cantidadSistema: item.cantidadSistema,
        producidoEnTurno: item.producidoEnTurno || 0,
        enTurnoSegunSistema: item.enTurnoSegunSistema || 0
      }));
      this.inventarioService.guardarExistenciaProducto(items).subscribe({
        next: () => {
          alert(`Inventario de ${this.activeTab} guardado correctamente.`);
          this.cargarExistencias();
        },
        error: (err) => alert(`Error al guardar existencias de ${this.activeTab}: ` + err.message)
      });
    }
  }

  generarReporte() {
    console.log('Generando reporte...');
  }
}
