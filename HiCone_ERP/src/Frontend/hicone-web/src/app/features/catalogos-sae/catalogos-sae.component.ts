import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaeService, SaeProducto, SaePedido, SaeCliente, SaeRemision } from '../../core/services/sae';
import { LucideRefreshCw, LucideX } from '@lucide/angular';

@Component({
  selector: 'app-catalogos-sae',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideRefreshCw, LucideX],
  template: `
    <div class="module-container">
      <header class="page-header">
        <div class="header-left">
          <h1>Catálogos Maestros SAE</h1>
          <p class="subtitle">Consulta de inventarios, productos, clientes y pedidos registrados en Aspel SAE</p>
        </div>
        <div class="header-right">
          <button class="btn-legacy" (click)="onSync()" [disabled]="syncing">
            {{ syncing ? 'Sincronizando...' : '' }}
            <ng-container *ngIf="!syncing"><svg lucideRefreshCw [size]="14"></svg> Sincronizar con SAE</ng-container>
          </button>
        </div>
      </header>

      <!-- Tabs -->
      <div class="tab-bar">
        <button class="tab-item" [class.active]="activeTab === 'inv'" (click)="activeTab = 'inv'">📦 Inventario SAE</button>
        <button class="tab-item" [class.active]="activeTab === 'clt'" (click)="switchTab('clt')">👥 Clientes</button>
        <button class="tab-item" [class.active]="activeTab === 'ped'" (click)="switchTab('ped')">📋 Pedidos</button>
      </div>

      <!-- TAB: Inventario de Productos -->
      <div class="card-table" *ngIf="activeTab === 'inv'">
        <div class="table-toolbar">
          <div class="search-wrapper">
            <input type="text" placeholder="Buscar por clave o descripción..." [(ngModel)]="searchProd" (input)="filterProductos()">
          </div>
          <div class="toolbar-info">
            <span class="badge">{{ filteredProductos.length }} producto(s)</span>
          </div>
        </div>
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Clave Artículo</th>
                <th>Descripción</th>
                <th>Unidad</th>
                <th>Precio</th>
                <th>Estatus</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let p of filteredProductos">
                <td class="cell-bold">{{ p.productNumber }}</td>
                <td>{{ p.productName }}</td>
                <td>{{ p.unit || 'Pza' }}</td>
                <td class="cell-number">{{ (p.price || 0) | currency:'MXN' }}</td>
                <td>
                  <span class="pill" [class.pill-active]="p.isActive" [class.pill-inactive]="!p.isActive">
                    {{ p.isActive ? 'Activo' : 'Inactivo' }}
                  </span>
                </td>
              </tr>
              <tr *ngIf="filteredProductos.length === 0">
                <td colspan="5" class="empty-row">No hay productos. Presiona "Sincronizar con SAE" para importar datos.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- TAB: Clientes -->
      <div class="card-table" *ngIf="activeTab === 'clt'">
        <div class="table-toolbar">
          <div class="search-wrapper">
            <input type="text" placeholder="Buscar por clave o nombre..." [(ngModel)]="searchCli" (input)="filterClientes()">
          </div>
          <div class="toolbar-info">
            <span class="badge">{{ filteredClientes.length }} cliente(s)</span>
          </div>
        </div>
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Clave</th>
                <th>Nombre / Razón Social</th>
                <th>Grupo Consolidado</th>
                <th>Dirección de Envío</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Estatus</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let c of filteredClientes">
                <td class="cell-bold">{{ c.customerCode }}</td>
                <td>{{ c.customerName }}</td>
                <td>{{ c.consolidatedName || '—' }}</td>
                <td>{{ c.shipping || '—' }}</td>
                <td>{{ c.phone || '—' }}</td>
                <td>{{ c.email || '—' }}</td>
                <td>
                  <span class="pill pill-active">Activo</span>
                </td>
              </tr>
              <tr *ngIf="filteredClientes.length === 0">
                <td colspan="7" class="empty-row">No hay clientes cargados. Presiona "Sincronizar con SAE".</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- TAB: Pedidos -->
      <div class="card-table" *ngIf="activeTab === 'ped'">
        <div class="table-toolbar">
          <div class="search-wrapper">
            <input type="text" placeholder="Buscar por folio o cliente..." [(ngModel)]="searchPed" (input)="filterPedidos()">
          </div>
          <div class="toolbar-info">
            <span class="badge badge-warn">{{ pedidosPendientes }} pendiente(s)</span>
            <span class="badge">{{ filteredPedidos.length }} total</span>
          </div>
        </div>
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Folio Pedido</th>
                <th>Cliente</th>
                <th>Fecha Pedido</th>
                <th>Fecha Entrega</th>
                <th>Importe Total</th>
                <th>Estatus</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let p of filteredPedidos" [class.row-procesada]="p.procesada">
                <td class="cell-bold">{{ p.orderDoc }}</td>
                <td>{{ p.customerName || p.customerCode }}</td>
                <td>{{ p.orderDate | date:'dd/MM/yyyy' }}</td>
                <td>{{ p.orderDeliveryDate ? (p.orderDeliveryDate | date:'dd/MM/yyyy') : '—' }}</td>
                <td class="cell-number">{{ p.totalAmount | currency:'MXN' }}</td>
                <td>
                  <span class="pill" [class.pill-active]="p.procesada" [class.pill-pending]="!p.procesada">
                    {{ p.procesada ? 'Procesado' : 'Pendiente' }}
                  </span>
                </td>
                <td>
                  <button class="btn-sm" (click)="verDetalle(p)" title="Ver detalle">👁️ Ver</button>
                </td>
              </tr>
              <tr *ngIf="filteredPedidos.length === 0">
                <td colspan="7" class="empty-row">No hay pedidos cargados.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- MODAL: Detalle de Pedido -->
      <div class="modal-overlay" *ngIf="showDetalle" (click)="showDetalle = false">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>Detalle del Pedido {{ detalleOrder?.orderDoc }}</h2>
            <button class="modal-close" (click)="showDetalle = false"><svg lucideX [size]="14"></svg></button>
          </div>
          <div class="modal-body" *ngIf="detalleOrder">
            <div class="detail-grid">
              <div class="detail-item">
                <span class="label">Cliente:</span>
                <span class="value">{{ detalleOrder.customerName || detalleOrder.customerCode }}</span>
              </div>
              <div class="detail-item">
                <span class="label">Fecha Pedido:</span>
                <span class="value">{{ detalleOrder.orderDate | date:'dd/MM/yyyy' }}</span>
              </div>
              <div class="detail-item">
                <span class="label">Fecha Entrega:</span>
                <span class="value">{{ detalleOrder.orderDeliveryDate ? (detalleOrder.orderDeliveryDate | date:'dd/MM/yyyy') : 'Sin definir' }}</span>
              </div>
              <div class="detail-item">
                <span class="label">Importe Total:</span>
                <span class="value bold">{{ detalleOrder.totalAmount | currency:'MXN' }}</span>
              </div>
              <div class="detail-item">
                <span class="label">Estatus:</span>
                <span class="value">
                  <span class="pill" [class.pill-active]="detalleOrder.procesada" [class.pill-pending]="!detalleOrder.procesada">
                    {{ detalleOrder.procesada ? 'Procesado' : 'Pendiente' }}
                  </span>
                </span>
              </div>
            </div>

            <h3 style="margin-top: 1.5rem; margin-bottom: 1rem;">Remisiones Asociadas</h3>
            <table *ngIf="detalleRemisiones.length > 0">
              <thead>
                <tr>
                  <th>Folio Remisión</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Fecha</th>
                  <th>Destino</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let r of detalleRemisiones">
                  <td class="cell-bold">{{ r.remissionDoc }}</td>
                  <td>{{ r.productNumber }}</td>
                  <td class="cell-number">{{ r.quantity | number }}</td>
                  <td>{{ r.remissionDate | date:'dd/MM/yyyy' }}</td>
                  <td>{{ r.shipping || '—' }}</td>
                </tr>
              </tbody>
            </table>
            <p *ngIf="detalleRemisiones.length === 0" style="color: #94a3b8; text-align: center; padding: 2rem;">
              No hay remisiones asociadas a este pedido.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .module-container { padding: 1.5rem 2rem; }

    .page-header {
      display: flex; justify-content: space-between; align-items: flex-start;
      margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 2px solid #e2e8f0;
    }
    .page-header h1 { font-size: 1.5rem; font-weight: 800; color: #1e293b; margin: 0 0 0.25rem 0; }
    .subtitle { color: #64748b; font-size: 0.85rem; margin: 0; }

    .btn-legacy {
      background: linear-gradient(135deg, #16a34a, #15803d); color: white; border: none;
      padding: 0.6rem 1.4rem; border-radius: 6px; font-weight: 700; font-size: 0.85rem;
      cursor: pointer; box-shadow: 0 2px 8px rgba(22,163,74,0.3); transition: all 0.2s;
    }
    .btn-legacy:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(22,163,74,0.4); }
    .btn-legacy:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

    .tab-bar {
      display: flex; gap: 0; border-bottom: 2px solid #e2e8f0; margin-bottom: 1.5rem;
    }
    .tab-item {
      background: none; border: none; padding: 0.75rem 1.5rem; font-size: 0.9rem; font-weight: 600;
      color: #64748b; cursor: pointer; border-bottom: 3px solid transparent; margin-bottom: -2px; transition: all 0.2s;
    }
    .tab-item:hover { color: #16a34a; }
    .tab-item.active { color: #16a34a; border-bottom-color: #16a34a; }

    .card-table {
      background: #fff; border: 1px solid #e2e8f0; border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04); overflow: hidden;
    }

    .table-toolbar {
      display: flex; justify-content: space-between; align-items: center;
      padding: 1rem 1.25rem; border-bottom: 1px solid #f1f5f9;
    }
    .search-wrapper {
      position: relative; width: 350px;
    }
    .search-wrapper input {
      width: 100%; padding: 0.5rem 0.75rem; border: 1px solid #e2e8f0; border-radius: 6px;
      font-size: 0.85rem; outline: none; transition: border-color 0.2s;
    }
    .search-wrapper input:focus { border-color: #16a34a; }
    .toolbar-info { display: flex; gap: 0.5rem; }
    .badge {
      padding: 0.3rem 0.75rem; border-radius: 20px; font-size: 0.75rem; font-weight: 700;
      background: #f1f5f9; color: #475569;
    }
    .badge-warn { background: #fef3c7; color: #92400e; }

    .table-scroll { overflow-x: auto; }

    table { width: 100%; border-collapse: collapse; }
    thead th {
      text-align: left; padding: 0.75rem 1.25rem; font-size: 0.8rem; font-weight: 700;
      color: #475569; background: #f8fafc; border-bottom: 1px solid #e2e8f0; white-space: nowrap;
    }
    tbody td {
      padding: 0.7rem 1.25rem; font-size: 0.85rem; color: #334155;
      border-bottom: 1px solid #f1f5f9;
    }
    tbody tr:hover { background: #f8fafc; }
    .row-procesada { opacity: 0.65; }

    .cell-bold { font-weight: 700; color: #1e293b; }
    .cell-number { font-weight: 600; font-variant-numeric: tabular-nums; }
    .empty-row { text-align: center; padding: 2.5rem !important; color: #94a3b8; font-style: italic; }

    .pill {
      display: inline-block; padding: 0.2rem 0.6rem; border-radius: 20px; font-size: 0.7rem;
      font-weight: 700; background: #e2e8f0; color: #475569;
    }
    .pill-active { background: #dcfce7; color: #166534; }
    .pill-inactive { background: #fee2e2; color: #991b1b; }
    .pill-pending { background: #fef3c7; color: #92400e; }

    .btn-sm {
      background: none; border: 1px solid #e2e8f0; padding: 0.3rem 0.6rem; border-radius: 4px;
      font-size: 0.75rem; cursor: pointer; font-weight: 600; color: #475569; transition: all 0.2s;
    }
    .btn-sm:hover { background: #f1f5f9; border-color: #16a34a; color: #16a34a; }

    /* Modal */
    .modal-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center;
      z-index: 9999; animation: fadeIn 0.2s;
    }
    .modal-content {
      background: white; border-radius: 12px; width: 90%; max-width: 800px; max-height: 85vh;
      overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.15); animation: slideUp 0.3s;
    }
    .modal-header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 1.25rem 1.5rem; border-bottom: 1px solid #e2e8f0;
    }
    .modal-header h2 { font-size: 1.15rem; font-weight: 700; margin: 0; }
    .modal-close {
      background: none; border: none; font-size: 1.25rem; cursor: pointer;
      color: #94a3b8; padding: 0.25rem 0.5rem; border-radius: 4px;
    }
    .modal-close:hover { background: #f1f5f9; color: #1e293b; }
    .modal-body { padding: 1.5rem; }
    .modal-body table { margin-top: 0.5rem; }

    .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .detail-item { display: flex; flex-direction: column; }
    .detail-item .label { font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 0.25rem; }
    .detail-item .value { font-size: 0.9rem; color: #1e293b; }
    .bold { font-weight: 700; }

    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  `]
})
export class CatalogosSaeComponent implements OnInit {
  private saeService = inject(SaeService);
  activeTab = 'inv';
  syncing = false;

  // Productos
  productos: SaeProducto[] = [];
  filteredProductos: SaeProducto[] = [];
  searchProd = '';

  // Clientes
  clientes: SaeCliente[] = [];
  filteredClientes: SaeCliente[] = [];
  searchCli = '';

  // Pedidos
  pedidos: SaePedido[] = [];
  filteredPedidos: SaePedido[] = [];
  searchPed = '';
  pedidosPendientes = 0;

  // Detalle
  showDetalle = false;
  detalleOrder: SaePedido | null = null;
  detalleRemisiones: SaeRemision[] = [];

  ngOnInit() {
    this.loadProductos();
  }

  switchTab(tab: string) {
    this.activeTab = tab;
    if (tab === 'clt' && this.clientes.length === 0) this.loadClientes();
    if (tab === 'ped' && this.pedidos.length === 0) this.loadPedidos();
  }

  loadProductos() {
    this.saeService.getProductos().subscribe(data => {
      this.productos = data;
      this.filteredProductos = data;
    });
  }

  loadClientes() {
    this.saeService.getClientes().subscribe(data => {
      this.clientes = data;
      this.filteredClientes = data;
    });
  }

  loadPedidos() {
    this.saeService.getAllOrdenes().subscribe(data => {
      this.pedidos = data;
      this.filteredPedidos = data;
      this.pedidosPendientes = data.filter(p => !p.procesada).length;
    });
  }

  filterProductos() {
    const term = this.searchProd.toLowerCase();
    this.filteredProductos = this.productos.filter(p =>
      p.productNumber.toLowerCase().includes(term) ||
      p.productName.toLowerCase().includes(term)
    );
  }

  filterClientes() {
    const term = this.searchCli.toLowerCase();
    this.filteredClientes = this.clientes.filter(c =>
      c.customerCode.toLowerCase().includes(term) ||
      c.customerName.toLowerCase().includes(term)
    );
  }

  filterPedidos() {
    const term = this.searchPed.toLowerCase();
    this.filteredPedidos = this.pedidos.filter(p =>
      p.orderDoc.toLowerCase().includes(term) ||
      (p.customerName || '').toLowerCase().includes(term) ||
      (p.customerCode || '').toLowerCase().includes(term)
    );
  }

  onSync() {
    this.syncing = true;
    this.saeService.sincronizar().subscribe({
      next: () => {
        this.syncing = false;
        this.loadProductos();
        if (this.clientes.length > 0) this.loadClientes();
        if (this.pedidos.length > 0) this.loadPedidos();
        alert('Sincronización con SAE completada exitosamente');
      },
      error: () => {
        this.syncing = false;
        alert('Error al sincronizar con SAE');
      }
    });
  }

  verDetalle(pedido: SaePedido) {
    this.detalleOrder = pedido;
    this.detalleRemisiones = [];
    this.showDetalle = true;
    this.saeService.getRemisiones(pedido.orderDoc).subscribe(data => {
      this.detalleRemisiones = data;
    });
  }
}
