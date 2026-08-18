import { Component, OnInit, HostListener, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduccionService, Prensa, Producto, Operario } from '../../../core/services/produccion';
import { NotificationService } from '../../../core/services/notification.service';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { timer } from 'rxjs';

@Component({
  selector: 'app-turnos-semana-prensado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-fade-in">
      <!-- Cabecera -->
      <div class="page-header-premium">
        <div class="title-section">
          <h1 class="premium-title">Turnos Por Semana Prensas</h1>
          <nav class="breadcrumb-modern">
            <span class="root">Prensado</span>
            <span class="sep">&rsaquo;</span>
            <span class="active">Turnos Por Semana</span>
          </nav>
        </div>
      </div>

      <!-- Contenedor Principal -->
      <div class="content-card glass shadow-sm">
        <div class="card-header-bar">
          <span class="green-flag-icon"></span>
          <span class="header-title">Prensas</span>
        </div>
        
        <div class="inner-padding">
          <!-- Alerta verde de inicio de semana -->
          <div class="info-alert-box-legacy">
            <span class="legacy-alert-icon">🟢</span>
            <span class="alert-text">Seleccione el Inicio de semana para generar la plantilla de turnos.</span>
          </div>

          <!-- Tabla Azul de Resumen Pivot (Prensado) -->
          <div class="resumen-container-legacy">
            <div class="resumen-table-header">
              <span class="drag-title-text">Arrastre los filtros aquí</span>
              <div class="options-menu-container">
                <button class="btn-hamburger" (click)="toggleOpciones($event)">☰</button>
                
                <!-- Popover de Opciones -->
                <div class="opciones-popover animate-slide-up" *ngIf="mostrarOpciones" (click)="$event.stopPropagation()">
                  <div class="popover-header">
                    <span>Opciones</span>
                    <button class="btn-popover-close" (click)="mostrarOpciones = false">×</button>
                  </div>
                  <div class="popover-body">
                    <button class="export-item-qa" (click)="exportarExcel()">
                      <span class="export-icon">📊</span> Excel (CSV)
                    </button>
                    <button class="export-item-qa" (click)="exportarPDF()">
                      <span class="export-icon">📕</span> PDF
                    </button>
                    
                    <div class="popover-divider"></div>
                    <div class="popover-section-title">Columnas visibles</div>
                    
                    <label class="popover-checkbox-row">
                      <input type="checkbox" [(ngModel)]="visibleCols.productoId">
                      <span>Prensado Producto Id</span>
                    </label>
                    <label class="popover-checkbox-row">
                      <input type="checkbox" [(ngModel)]="visibleCols.producto">
                      <span>Producto</span>
                    </label>
                    <label class="popover-checkbox-row">
                      <input type="checkbox" [(ngModel)]="visibleCols.prensaId">
                      <span>Prensado Prensa Id</span>
                    </label>
                    <label class="popover-checkbox-row">
                      <input type="checkbox" [(ngModel)]="visibleCols.prensa">
                      <span>Prensa</span>
                    </label>
                    <label class="popover-checkbox-row">
                      <input type="checkbox" [(ngModel)]="visibleCols.programado">
                      <span>Programado</span>
                    </label>
                    <label class="popover-checkbox-row">
                      <input type="checkbox" [(ngModel)]="visibleCols.fabricado">
                      <span>Producido</span>
                    </label>
                    <label class="popover-checkbox-row">
                      <input type="checkbox" [(ngModel)]="visibleCols.diferencia">
                      <span>Diferencia</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tabla de datos de resumen -->
            <div class="table-scroll-resumen">
              <table class="resumen-grid-table">
                <thead>
                  <tr>
                    <th *ngIf="visibleCols.productoId">Prensado Producto Id</th>
                    <th *ngIf="visibleCols.producto">Producto</th>
                    <th *ngIf="visibleCols.prensaId">Prensado Prensa Id</th>
                    <th *ngIf="visibleCols.prensa">Prensa</th>
                    <th *ngIf="visibleCols.programado" class="text-right">Programado</th>
                    <th *ngIf="visibleCols.fabricado" class="text-right">Producido</th>
                    <th *ngIf="visibleCols.diferencia" class="text-right">Diferencia</th>
                  </tr>
                </thead>
                <tbody>
                  <ng-container *ngFor="let group of groupedResumen">
                    <tr *ngFor="let row of group.rows; let first = first">
                      <td *ngIf="visibleCols.productoId">{{ row.productoId }}</td>
                      <td *ngIf="visibleCols.producto && first" [attr.rowspan]="group.rows.length" class="grouped-cell font-bold">
                        <span class="collapse-icon">−</span> {{ group.producto }}
                      </td>
                      <td *ngIf="visibleCols.prensaId">{{ row.prensaId || row.extrusoraId }}</td>
                      <td *ngIf="visibleCols.prensa">{{ row.prensa || row.extrusora }}</td>
                      <td *ngIf="visibleCols.programado" class="text-right">{{ row.programado | number }}</td>
                      <td *ngIf="visibleCols.fabricado" class="text-right">{{ row.fabricado | number }}</td>
                      <td *ngIf="visibleCols.diferencia" class="text-right">{{ row.diferencia | number }}</td>
                    </tr>
                    <tr class="subtotal-row">
                      <td *ngIf="visibleCols.productoId"></td>
                      <td *ngIf="visibleCols.producto" class="font-bold">Total para {{ group.producto }}</td>
                      <td *ngIf="visibleCols.prensaId"></td>
                      <td *ngIf="visibleCols.prensa"></td>
                      <td *ngIf="visibleCols.programado" class="text-right font-bold">{{ group.subtotal.programado | number }}</td>
                      <td *ngIf="visibleCols.fabricado" class="text-right font-bold">{{ group.subtotal.fabricado | number }}</td>
                      <td *ngIf="visibleCols.diferencia" class="text-right font-bold">{{ group.subtotal.diferencia | number }}</td>
                    </tr>
                  </ng-container>

                  <tr *ngIf="resumen.length === 0">
                    <td [attr.colspan]="getColspanCount()" class="text-center text-muted py-4">
                      No hay datos de resumen cargados. Especifique fechas y haga clic en PROGRAMAR O CONSULTAR.
                    </td>
                  </tr>

                  <tr class="grand-total-row" *ngIf="resumen.length > 0">
                    <td *ngIf="visibleCols.productoId"></td>
                    <td *ngIf="visibleCols.producto" class="font-bold">TOTAL</td>
                    <td *ngIf="visibleCols.prensaId"></td>
                    <td *ngIf="visibleCols.prensa"></td>
                    <td *ngIf="visibleCols.programado" class="text-right font-bold">{{ totalResumen.programado | number }}</td>
                    <td *ngIf="visibleCols.fabricado" class="text-right font-bold">{{ totalResumen.fabricado | number }}</td>
                    <td *ngIf="visibleCols.diferencia" class="text-right font-bold">{{ totalResumen.diferencia | number }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Controles de fecha -->
          <div class="date-controls-grid">
            <div class="control-group">
              <label class="control-label">Fecha Inicio *</label>
              <div class="input-wrapper">
                <input type="date" [(ngModel)]="fechaInicio" class="form-input-legacy">
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Fecha Fin *</label>
              <div class="input-wrapper">
                <input type="date" [(ngModel)]="fechaFin" class="form-input-legacy">
              </div>
            </div>
          </div>

          <button class="btn-legacy-submit" (click)="consultarTurnos()" [disabled]="loading">
            {{ loading ? 'CARGANDO...' : 'PROGRAMAR O CONSULTAR' }}
          </button>

          <!-- Banner de éxito al guardar -->
          <div *ngIf="mensajeExito" class="success-alert-banner animate-fade-in">
            ✓ {{ mensajeExito }}
          </div>

          <!-- Tabs de Prensas -->
          <div class="tabs-container-legacy">
            <div class="tabs-header-legacy">
              <button *ngFor="let prn of prensas; let i = index" 
                      class="tab-link-legacy" 
                      [class.active]="selectedTabIndex === i"
                      (click)="selectedTabIndex = i">
                {{ prn.prensaNombre || prn.nombre }}
              </button>
            </div>

            <div class="tab-body-legacy">
              <!-- Se despliegan los turnos de la prensa seleccionada -->
              <div class="tab-pane-content" *ngIf="prensasData.length > 0 && selectedTabIndex < prensasData.length">
                <div class="shift-cards-container">
                  <div class="shift-card" *ngFor="let shift of prensasData[selectedTabIndex].turnos">
                    <div class="shift-card-header">
                      <span class="green-flag-icon"></span>
                      <h4>{{ shift.turnoNombre }}</h4>
                    </div>

                    <div class="shift-card-body">
                      <div class="table-scroll">
                        <table class="shift-details-table">
                          <thead>
                            <tr>
                              <th>Prensado ID</th>
                              <th>Estado</th>
                              <th>Fecha</th>
                              <th>Día</th>
                              <th style="min-width: 190px;">Producto</th>
                              <th style="width: 100px;" class="text-right">Plan</th>
                              <th class="text-right">Producido</th>
                              <th style="min-width: 220px;">Operador</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr *ngFor="let dia of shift.dias" [ngClass]="{'row-disabled': dia.estado !== 'Programada'}">
                               <td>{{ dia.prensadoIdLegacy || dia.extrusionIdLegacy || '' }}</td>
                              <td>
                                <span class="badge-status" [ngClass]="getStatusClass(dia.estado)">
                                  {{ getEstadoLabel(dia.estado) }}
                                </span>
                              </td>
                              <td>{{ dia.fecha | date:'dd/MM/yy HH:mm' }}</td>
                              <td>{{ dia.dia | titlecase }}</td>
                              
                              <!-- Desplegable con Buscador de Producto (Imágenes 3 y 4) -->
                              <td class="cell-dropdown-relative">
                                <div *ngIf="dia.estado === 'Programada'" class="custom-combobox" (click)="$event.stopPropagation()">
                                  <div class="combobox-selected" (click)="toggleDropdown(dia, 'producto')">
                                    <span>{{ getProductoDisplay(dia.productoId) }}</span>
                                    <span class="arrow-icon">▼</span>
                                  </div>
                                  <div class="combobox-menu animate-slide-up" *ngIf="activeDropdown === dia.prensadoId + '_producto'">
                                    <div class="combobox-search-box">
                                      <input type="text" placeholder="🔍 Buscar clave de producto..." [(ngModel)]="searchProductoText" (click)="$event.stopPropagation()" class="search-input-inner">
                                    </div>
                                    <div class="combobox-options-list">
                                      <div *ngFor="let p of getFilteredProductos()" 
                                           class="combobox-option" 
                                           [class.selected]="p.id === dia.productoId"
                                           (click)="selectProducto(dia, p)">
                                        {{ p.codigo || p.nombre }}
                                      </div>
                                      <div *ngIf="getFilteredProductos().length === 0" class="combobox-empty">
                                        No hay coincidencias
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <span *ngIf="dia.estado !== 'Programada'" class="read-only-text font-bold">{{ dia.productoNombre }}</span>
                              </td>

                              <!-- Plan Input / Text -->
                              <td>
                                <input *ngIf="dia.estado === 'Programada'" type="number" [(ngModel)]="dia.plan" class="table-input-legacy text-right" style="width: 80px;">
                                <span *ngIf="dia.estado !== 'Programada'" class="read-only-text text-right font-bold">{{ dia.plan | number }}</span>
                              </td>

                              <!-- Producido (Read only) -->
                              <td class="text-right">{{ dia.producido | number }}</td>

                              <!-- Desplegable con Buscador de Operador (Imagen 3) -->
                              <td class="cell-dropdown-relative">
                                <div *ngIf="dia.estado === 'Programada'" class="custom-combobox" (click)="$event.stopPropagation()">
                                  <div class="combobox-selected" (click)="toggleDropdown(dia, 'operador')">
                                    <span>{{ getOperarioDisplay(dia.operarioId) }}</span>
                                    <span class="arrow-icon">▼</span>
                                  </div>
                                  <div class="combobox-menu animate-slide-up" *ngIf="activeDropdown === dia.prensadoId + '_operador'">
                                    <div class="combobox-search-box">
                                      <input type="text" placeholder="🔍 Buscar operador..." [(ngModel)]="searchOperadorText" (click)="$event.stopPropagation()" class="search-input-inner">
                                    </div>
                                    <div class="combobox-options-list">
                                      <div *ngFor="let op of getFilteredOperarios()" 
                                           class="combobox-option" 
                                           [class.selected]="op.id === dia.operarioId"
                                           (click)="selectOperario(dia, op)">
                                        {{ op.nombreCompleto | uppercase }}
                                      </div>
                                      <div *ngIf="getFilteredOperarios().length === 0" class="combobox-empty">
                                        No hay coincidencias
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <span *ngIf="dia.estado !== 'Programada'" class="read-only-text">{{ dia.operarioNombre | uppercase }}</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div class="shift-card-actions">
                        <button class="btn-save-shift" (click)="guardarShift(shift)">GUARDAR</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Empty state si no hay datos -->
              <div *ngIf="prensasData.length === 0" class="tab-pane-content text-center py-8">
                <p class="empty-state-msg">No hay registros de programación cargados para el rango de fechas seleccionado.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .module-page { padding: 3rem; background: #f8fafc; min-height: 100%; font-family: 'Outfit', sans-serif; }
    .breadcrumb-modern { font-size: 0.8rem; color: #64748b; margin-bottom: 0.5rem; font-weight: 500; }
    .premium-title { font-size: 1.75rem; font-weight: 800; color: #166534; margin: 0 0 1.5rem 0; }

    .content-card { background: white; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.04); overflow: visible; margin-bottom: 1.5rem; }
    
    .card-header-bar { 
      background: #fafafa; 
      padding: 1.25rem 1.5rem; 
      border-bottom: 1px solid #e2e8f0; 
      display: flex; 
      align-items: center; 
      gap: 0.5rem;
      border-radius: 12px 12px 0 0;
    }
    .green-flag-icon {
      width: 12px;
      height: 12px;
      background: #166534;
      clip-path: polygon(0% 0%, 100% 0%, 75% 50%, 100% 100%, 0% 100%);
      display: inline-block;
    }
    .header-title { font-weight: 800; color: #166534; font-size: 1rem; }
    
    .inner-padding { padding: 1.5rem; }

    .info-alert-box-legacy { 
      display: flex; 
      align-items: center; 
      gap: 0.75rem; 
      background: #ffffff; 
      border: 1px solid #cbd5e1; 
      border-radius: 10px; 
      padding: 0.85rem 1.25rem; 
      margin-bottom: 1.5rem; 
      box-shadow: 0 1px 3px rgba(0,0,0,0.02);
    }
    .legacy-alert-icon { font-size: 0.9rem; }
    .alert-text { font-size: 0.85rem; color: #334155; font-weight: 600; }

    .success-alert-banner {
      background-color: #dcfce7;
      color: #15803d;
      border: 1px solid #bbf7d0;
      padding: 0.75rem 1.25rem;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 700;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }

    /* Pivot Resumen Table Layout */
    .resumen-container-legacy {
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      margin-bottom: 1.5rem;
      background: #f8fafc;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.03);
    }
    .resumen-table-header {
      background: #f1f5f9;
      padding: 0.75rem 1.25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e2e8f0;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
    }
    .drag-title-text { font-size: 0.75rem; color: #475569; font-weight: 700; }
    .options-menu-container { position: relative; }
    .btn-hamburger { background: transparent; border: none; font-size: 1.1rem; color: #475569; cursor: pointer; padding: 0.2rem 0.5rem; }
    .btn-hamburger:hover { background: rgba(0,0,0,0.05); border-radius: 4px; }

    .opciones-popover {
      position: absolute;
      top: 100%;
      right: 0;
      width: 230px;
      background: white;
      border: 1px solid #cbd5e1;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      z-index: 100;
      border-radius: 8px;
      padding: 0.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .popover-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #166534;
      color: white;
      padding: 0.4rem 0.75rem;
      font-size: 0.85rem;
      font-weight: 700;
      border-radius: 6px 6px 0 0;
      margin: -0.5rem -0.5rem 0.25rem -0.5rem;
    }
    .btn-popover-close { background: transparent; border: none; color: white; font-size: 1.1rem; cursor: pointer; }
    .btn-export-option {
      background: transparent;
      border: none;
      text-align: left;
      padding: 0.5rem 0.75rem;
      font-size: 0.8rem;
      color: #166534;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      border-radius: 4px;
    }
    .btn-export-option:hover { background: #f1f5f9; }
    .popover-divider { height: 1px; background: #e2e8f0; margin: 0.25rem 0; }
    .popover-section-title { font-size: 0.75rem; font-weight: 700; color: #64748b; padding: 0.25rem 0.75rem; }
    .popover-checkbox-row { display: flex; align-items: center; gap: 0.5rem; padding: 0.35rem 0.75rem; cursor: pointer; font-size: 0.8rem; color: #334155; }
    .popover-checkbox-row:hover { background: #f8fafc; }

    .table-scroll-resumen { overflow-x: auto; }
    .resumen-grid-table { width: 100%; border-collapse: collapse; }
    .resumen-grid-table th {
      background: #166534;
      color: white;
      font-size: 0.8rem;
      font-weight: 700;
      padding: 0.6rem 0.85rem;
      text-align: left;
      border-right: 1px solid #14532d;
      white-space: nowrap;
    }
    .resumen-grid-table td {
      background: white;
      font-size: 0.85rem;
      color: #334155;
      padding: 0.5rem 0.85rem;
      border-bottom: 1px solid #cbd5e1;
      border-right: 1px solid #e2e8f0;
      white-space: nowrap;
    }
    .grouped-cell { background: #f8fafc !important; vertical-align: middle; }
    .collapse-icon { color: #1e3f66; font-weight: bold; margin-right: 0.25rem; }
    .subtotal-row td { background: #eceff1; font-weight: bold; color: #37474f; }
    .grand-total-row td { background: #cfd8dc; font-weight: bold; color: #263238; border-bottom: 2px solid #90a4ae; }

    .date-controls-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; max-width: 600px; margin-bottom: 1.5rem; }
    .control-group { display: flex; flex-direction: column; gap: 0.35rem; }
    .control-label { font-size: 0.8rem; font-weight: 700; color: #334155; }
    .input-wrapper { position: relative; display: flex; align-items: center; }
    .form-input-legacy { width: 100%; border: 1px solid #cbd5e1; border-radius: 4px; padding: 0.5rem; font-size: 0.85rem; outline: none; font-family: inherit; }

    .btn-legacy-submit { 
      background: #4caf50; 
      color: white; 
      border: none; 
      padding: 0.65rem 1.5rem; 
      border-radius: 4px; 
      font-weight: 700; 
      font-size: 0.85rem; 
      cursor: pointer; 
      box-shadow: 0 2px 4px rgba(76,175,80,0.25); 
      transition: background 0.2s; 
    }
    .btn-legacy-submit:hover:not([disabled]) { background: #43a047; }
    .btn-legacy-submit[disabled] { opacity: 0.7; cursor: not-allowed; }

    .tabs-container-legacy { margin-top: 2rem; border: 1px solid #cbd5e1; border-radius: 4px; overflow: hidden; }
    .tabs-header-legacy { display: flex; background: #f8fafc; border-bottom: 1px solid #cbd5e1; overflow-x: auto; }
    .tab-link-legacy { 
      background: transparent; 
      border: none; 
      padding: 0.85rem 1.5rem; 
      font-weight: 700; 
      color: #64748b; 
      cursor: pointer; 
      position: relative; 
      font-size: 0.85rem; 
      white-space: nowrap;
    }
    .tab-link-legacy.active { color: #2e7d32; }
    .tab-link-legacy.active::after { content: ''; position: absolute; bottom: -1px; left: 0; width: 100%; height: 3px; background: #2e7d32; }
    
    .tab-body-legacy { padding: 1.5rem; background: white; }
    .shift-cards-container { display: flex; flex-direction: column; gap: 2rem; }
    .shift-card { border: 1px solid #cbd5e1; border-radius: 6px; overflow: visible; }
    .shift-card-header { background: #f8fafc; padding: 0.75rem 1rem; border-bottom: 1px solid #cbd5e1; display: flex; align-items: center; gap: 0.5rem; }
    .shift-card-header h4 { margin: 0; font-size: 0.95rem; font-weight: 700; color: #334155; }
    .shift-card-body { padding: 1.25rem; }
    .table-scroll { overflow-x: auto; overflow-y: visible; }
    .shift-details-table { width: 100%; border-collapse: collapse; text-align: left; }
    .shift-details-table th { font-size: 0.75rem; font-weight: 700; color: #475569; padding: 0.6rem 0.75rem; border-bottom: 2px solid #e2e8f0; white-space: nowrap; }
    .shift-details-table td { padding: 0.5rem 0.75rem; border-bottom: 1px solid #f1f5f9; font-size: 0.85rem; color: #334155; vertical-align: middle; white-space: nowrap; }
    .row-disabled { background-color: #fafafa; }

    .badge-status {
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-size: 0.72rem;
      font-weight: 700;
      color: white;
      text-transform: capitalize;
      display: inline-block;
      text-align: center;
      min-width: 80px;
    }
    .badge-status.terminada { background-color: #2e7d32; }
    .badge-status.programada { background-color: #1976d2; }
    .badge-status.proceso { background-color: #f57c00; }
    
    .table-input-legacy { padding: 0.3rem 0.5rem; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 0.8rem; font-family: inherit; outline: none; }
    .table-input-legacy:focus { border-color: #4caf50; }
    .read-only-text { display: inline-block; font-size: 0.85rem; }

    /* Estilos de Desplegables con Buscador (Imágenes 3 y 4) */
    .cell-dropdown-relative { position: relative; }
    .custom-combobox { position: relative; width: 100%; cursor: pointer; }
    .combobox-selected {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.35rem 0.6rem;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      background: white;
      font-size: 0.8rem;
      color: #334155;
      font-weight: 600;
    }
    .combobox-selected:hover { border-color: #4caf50; }
    .arrow-icon { font-size: 0.65rem; color: #64748b; margin-left: 0.5rem; }

    .combobox-menu {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      min-width: 220px;
      background: white;
      border: 1px solid #cbd5e1;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      z-index: 200;
      border-radius: 4px;
      margin-top: 2px;
      overflow: hidden;
    }
    .combobox-search-box { padding: 0.4rem; background: #f8fafc; border-bottom: 1px solid #e2e8f0; }
    .search-input-inner {
      width: 100%;
      border: 1px solid #cbd5e1;
      border-radius: 3px;
      padding: 0.35rem 0.5rem;
      font-size: 0.78rem;
      outline: none;
      font-family: inherit;
    }
    .search-input-inner:focus { border-color: #4caf50; }
    .combobox-options-list { max-height: 180px; overflow-y: auto; }
    .combobox-option {
      padding: 0.45rem 0.65rem;
      font-size: 0.8rem;
      color: #334155;
      cursor: pointer;
      border-bottom: 1px solid #f1f5f9;
    }
    .combobox-option:hover { background: #f0fdf4; color: #166534; font-weight: 600; }
    .combobox-option.selected { background: #dcfce7; color: #15803d; font-weight: 700; }
    .combobox-empty { padding: 0.5rem; font-size: 0.75rem; color: #94a3b8; text-align: center; font-style: italic; }

    .shift-card-actions { display: flex; justify-content: flex-start; margin-top: 1rem; }
    .btn-save-shift {
      background: #4caf50;
      color: white;
      border: none;
      padding: 0.5rem 1.75rem;
      border-radius: 4px;
      font-weight: 700;
      font-size: 0.8rem;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(76,175,80,0.2);
      transition: all 0.2s;
    }
    .btn-save-shift:hover { background: #43a047; transform: translateY(-1px); }

    .text-center { text-align: center; }
    .text-right { text-align: right; }
    .font-bold { font-weight: bold; }
    .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
    .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
    .text-muted { color: #64748b; }
    .empty-state-msg { color: #94a3b8; font-style: italic; font-size: 0.85rem; }
  `]
})
export class TurnosSemanaPrensadoComponent implements OnInit {
  private prodService = inject(ProduccionService);
  private cdr = inject(ChangeDetectorRef);
  private notify = inject(NotificationService);
  
  prensas: any[] = [];
  selectedTabIndex = 0;
  fechaInicio: string = '';
  fechaFin: string = '';
  
  loading: boolean = false;
  mostrarOpciones: boolean = false;
  mensajeExito: string = '';

  // Catálogos
  catalogoProductos: Producto[] = [];
  catalogoOperarios: Operario[] = [];

  // Controladores de desplegables con buscador
  activeDropdown: string | null = null;
  searchProductoText: string = '';
  searchOperadorText: string = '';

  // Visibilidad de columnas en tabla resumen
  visibleCols = {
    productoId: false,
    producto: true,
    prensaId: false,
    prensa: true,
    programado: true,
    fabricado: true,
    diferencia: true
  };

  // Datos provenientes del backend
  resumen: any[] = [];
  prensasData: any[] = [];

  @HostListener('document:click')
  onDocumentClick() {
    this.mostrarOpciones = false;
    this.activeDropdown = null;
  }

  ngOnInit() {

    // Cargar catálogos
    this.prodService.getProductos().subscribe(data => this.catalogoProductos = data || []);
    this.prodService.getOperarios().subscribe(data => this.catalogoOperarios = data || []);
    
    this.prodService.getPrensas().subscribe({
      next: (data) => {
        this.prensas = data || [];
      },
      error: (err) => console.error('Error al cargar prensas:', err)
    });

    // Rango de fechas por defecto
    const today = new Date();
    const dayOfWeek = today.getDay();
    
    const startOfWeek = new Date(today);
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startOfWeek.setDate(today.getDate() + diffToMonday);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 4);

    this.fechaInicio = this.formatDate(startOfWeek);
    this.fechaFin = this.formatDate(endOfWeek);
  }

  formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  toggleOpciones(event: Event) {
    event.stopPropagation();
    this.mostrarOpciones = !this.mostrarOpciones;
  }

  toggleDropdown(dia: any, type: 'producto' | 'operador') {
    const key = dia.prensadoId + '_' + type;
    if (this.activeDropdown === key) {
      this.activeDropdown = null;
    } else {
      this.activeDropdown = key;
      this.searchProductoText = '';
      this.searchOperadorText = '';
    }
  }

  getProductoDisplay(productoId: string): string {
    const p = this.catalogoProductos.find(x => x.id === productoId);
    return p ? (p.codigo || p.nombre) : '-- Seleccione Producto --';
  }

  getOperarioDisplay(operarioId: string): string {
    const op = this.catalogoOperarios.find(x => x.id === operarioId);
    return op ? op.nombreCompleto.toUpperCase() : '-- Seleccione Operador --';
  }

  getFilteredProductos(): Producto[] {
    if (!this.searchProductoText.trim()) return this.catalogoProductos;
    const txt = this.searchProductoText.toLowerCase();
    return this.catalogoProductos.filter(p => 
      (p.codigo && p.codigo.toLowerCase().includes(txt)) || 
      (p.nombre && p.nombre.toLowerCase().includes(txt))
    );
  }

  getFilteredOperarios(): Operario[] {
    if (!this.searchOperadorText.trim()) return this.catalogoOperarios;
    const txt = this.searchOperadorText.toLowerCase();
    return this.catalogoOperarios.filter(op => 
      op.nombreCompleto && op.nombreCompleto.toLowerCase().includes(txt)
    );
  }

  selectProducto(dia: any, producto: Producto) {
    dia.productoId = producto.id;
    dia.productoNombre = producto.codigo || producto.nombre;
    this.activeDropdown = null;
  }

  selectOperario(dia: any, operario: Operario) {
    dia.operarioId = operario.id;
    dia.operarioNombre = operario.nombreCompleto;
    this.activeDropdown = null;
  }

  getColspanCount(): number {
    return Object.values(this.visibleCols).filter(val => val).length;
  }

  get groupedResumen(): any[] {
    const groups: { [key: string]: any } = {};
    for (const r of this.resumen) {
      const pName = r.producto || 'Sin Producto';
      if (!groups[pName]) {
        groups[pName] = {
          producto: pName,
          rows: [],
          subtotal: { programado: 0, fabricado: 0, diferencia: 0 }
        };
      }
      groups[pName].rows.push(r);
      groups[pName].subtotal.programado += (r.programado || 0);
      groups[pName].subtotal.fabricado += (r.fabricado || 0);
      groups[pName].subtotal.diferencia += (r.diferencia || 0);
    }
    return Object.values(groups);
  }

  get totalResumen() {
    let programado = 0;
    let fabricado = 0;
    let diferencia = 0;
    for (const r of this.resumen) {
      programado += (r.programado || 0);
      fabricado += (r.fabricado || 0);
      diferencia += (r.diferencia || 0);
    }
    return { programado, fabricado, diferencia };
  }

  getStatusClass(estado: any): string {
    const st = String(estado).toLowerCase();
    if (st.includes('3') || st.includes('finalizada') || st.includes('terminada')) return 'terminada';
    if (st.includes('1') || st.includes('programada') || st.includes('creada')) return 'programada';
    if (st.includes('2') || st.includes('proceso')) return 'proceso';
    return '';
  }

  getEstadoLabel(estado: any): string {
    const st = String(estado).toLowerCase();
    if (st.includes('3') || st.includes('finalizada') || st.includes('terminada')) return 'Terminada';
    if (st.includes('1') || st.includes('programada') || st.includes('creada')) return 'Programada';
    if (st.includes('2') || st.includes('proceso')) return 'En Proceso';
    return 'Por Programar';
  }

  consultarTurnos(clearMsg: boolean = true) {
    if (!this.fechaInicio || !this.fechaFin) {
      this.notify.warning('Por favor especifique la Fecha de Inicio y Fecha Fin.');
      return;
    }
    this.loading = true;
    this.cdr.detectChanges();
    if (clearMsg) {
      this.mensajeExito = '';
    }
    this.prodService.getTurnosSemanaPrensado(this.fechaInicio, this.fechaFin).subscribe({
      next: (data) => {
        this.loading = false;
        this.resumen = data.resumen || [];
        this.prensasData = data.prensas || data.extrusoras || [];
        if (data.prensas && data.prensas.length > 0) {
          this.prensas = data.prensas;
        }
        if (this.selectedTabIndex >= this.prensasData.length) {
          this.selectedTabIndex = 0;
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al consultar turnos de prensado:', err);
        this.notify.error(err.error?.message || err.message || 'Ocurrió un error en el servidor.');
        this.cdr.detectChanges();
      }
    });
  }

  guardarShift(shift: any) {
    const batch = shift.dias
      .filter((d: any) => {
        const st = String(d.estado).toLowerCase();
        return st.includes('programada') || st.includes('1') || st.includes('creada') || st.includes('por programar');
      })
      .map((d: any) => ({
        prensadoId: d.prensadoId || d.extrusionId,
        productoId: (d.productoId && d.productoId !== 'null' && d.productoId !== 'undefined') ? d.productoId : null,
        operarioId: (d.operarioId && d.operarioId !== 'null' && d.operarioId !== 'undefined') ? d.operarioId : null,
        plan: Number(d.plan) || 0
      }));

    if (batch.length === 0) {
      this.notify.info('No hay registros modificables en este turno.');
      return;
    }

    this.prodService.guardarTurnosSemanaPrensado(batch).subscribe({
      next: (res: any) => {
        const msg = res?.message || 'Información actualizada exitosamente.';
        this.mensajeExito = msg;
        this.notify.success(msg);
        this.cdr.markForCheck();
        timer(5000).subscribe(() => {
          this.mensajeExito = '';
          this.cdr.markForCheck();
        });
        this.consultarTurnos(false);
      },
      error: (err) => {
        console.error('Error al guardar programación:', err);
        this.notify.error(err.error?.message || 'Error al guardar la programación de turno de prensado.');
      }
    });
  }


  // Exportaciones
  exportarExcel() {
    if (this.resumen.length === 0) {
      this.notify.warning('No hay datos en la tabla para exportar.');
      return;
    }

    const dataToExport = this.resumen.map(r => {
      const row: any = {};
      if (this.visibleCols.productoId) row['Prensado Producto Id'] = r.productoId;
      if (this.visibleCols.producto) row['Producto'] = r.producto;
      if (this.visibleCols.prensaId) row['Prensado Prensa Id'] = r.prensaId || r.extrusoraId;
      if (this.visibleCols.prensa) row['Prensa'] = r.prensa || r.extrusora;
      if (this.visibleCols.programado) row['Programado'] = r.programado;
      if (this.visibleCols.fabricado) row['Producido'] = r.fabricado;
      if (this.visibleCols.diferencia) row['Diferencia'] = r.diferencia;
      return row;
    });

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Resumen_Semanal_Prensado');
    XLSX.writeFile(wb, `Reporte_Resumen_Turnos_Prensado_${this.fechaInicio}_al_${this.fechaFin}.xlsx`);
  }

  exportarPDF() {
    if (this.resumen.length === 0) {
      this.notify.warning('No hay datos en la tabla para exportar.');
      return;
    }

    const doc = new jsPDF({ orientation: 'portrait' });
    const headers: string[] = [];
    const keys: string[] = [];

    if (this.visibleCols.producto) { headers.push('Producto'); keys.push('producto'); }
    if (this.visibleCols.prensa) { headers.push('Prensa'); keys.push('prensa'); }
    if (this.visibleCols.programado) { headers.push('Programado'); keys.push('programado'); }
    if (this.visibleCols.fabricado) { headers.push('Producido'); keys.push('fabricado'); }
    if (this.visibleCols.diferencia) { headers.push('Diferencia'); keys.push('diferencia'); }

    const rows = this.resumen.map(r => keys.map(k => String(r[k] || '0')));

    const totalRow: string[] = [];
    if (this.visibleCols.producto) totalRow.push('TOTAL');
    if (this.visibleCols.prensa) totalRow.push('');
    if (this.visibleCols.programado) totalRow.push(String(this.totalResumen.programado));
    if (this.visibleCols.fabricado) totalRow.push(String(this.totalResumen.fabricado));
    if (this.visibleCols.diferencia) totalRow.push(String(this.totalResumen.diferencia));
    rows.push(totalRow);

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(30, 63, 102);
    doc.text('Resumen Semanal de Prensado', 14, 15);
    
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Rango: ${this.fechaInicio} al ${this.fechaFin}`, 14, 22);

    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: 28,
      theme: 'grid',
      styles: { fontSize: 9, cellPadding: 4 },
      headStyles: { fillColor: [30, 63, 102], textColor: [255, 255, 255], fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 247, 250] }
    });

    doc.save(`Resumen_Semanal_Prensado_${this.fechaInicio}_${this.fechaFin}.pdf`);
  }

  exportarHTML() {
    if (this.resumen.length === 0) {
      this.notify.warning('No hay datos en la tabla para exportar.');
      return;
    }

    let htmlContent = `
      <html>
        <head>
          <title>Resumen Semanal de Prensado</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
            h1 { color: #1e3f66; margin-bottom: 5px; }
            h3 { color: #666; margin-top: 0; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th { background-color: #1e3f66; color: white; padding: 10px; text-align: left; font-size: 14px; border: 1px solid #153050; }
            td { padding: 10px; border: 1px solid #cbd5e1; font-size: 13px; }
            tr:nth-child(even) { background-color: #f8fafc; }
            .font-bold { font-weight: bold; }
            .text-right { text-align: right; }
          </style>
        </head>
        <body>
          <h1>Resumen Semanal de Prensado</h1>
          <h3>Rango de fechas: ${this.fechaInicio} al ${this.fechaFin}</h3>
          <table>
            <thead>
              <tr>
    `;

    if (this.visibleCols.productoId) htmlContent += '<th>Prensado Producto Id</th>';
    if (this.visibleCols.producto) htmlContent += '<th>Producto</th>';
    if (this.visibleCols.prensaId) htmlContent += '<th>Prensado Prensa Id</th>';
    if (this.visibleCols.prensa) htmlContent += '<th>Prensa</th>';
    if (this.visibleCols.programado) htmlContent += '<th class="text-right">Programado</th>';
    if (this.visibleCols.fabricado) htmlContent += '<th class="text-right">Producido</th>';
    if (this.visibleCols.diferencia) htmlContent += '<th class="text-right">Diferencia</th>';

    htmlContent += `
              </tr>
            </thead>
            <tbody>
    `;

    for (const group of this.groupedResumen) {
      for (let idx = 0; idx < group.rows.length; idx++) {
        const row = group.rows[idx];
        htmlContent += '<tr>';
        if (this.visibleCols.productoId) htmlContent += `<td>${row.productoId || ''}</td>`;
        if (this.visibleCols.producto) {
          if (idx === 0) {
            htmlContent += `<td rowspan="${group.rows.length}" class="font-bold">${group.producto}</td>`;
          }
        }
        if (this.visibleCols.prensaId) htmlContent += `<td>${row.prensaId || row.extrusoraId || ''}</td>`;
        if (this.visibleCols.prensa) htmlContent += `<td>${row.prensa || row.extrusora || ''}</td>`;
        if (this.visibleCols.programado) htmlContent += `<td class="text-right">${row.programado || 0}</td>`;
        if (this.visibleCols.fabricado) htmlContent += `<td class="text-right">${row.fabricado || 0}</td>`;
        if (this.visibleCols.diferencia) htmlContent += `<td class="text-right">${row.diferencia || 0}</td>`;
        htmlContent += '</tr>';
      }
      htmlContent += '<tr style="background-color: #eceff1; font-weight: bold;">';
      if (this.visibleCols.productoId) htmlContent += '<td></td>';
      if (this.visibleCols.producto) htmlContent += `<td>Total para ${group.producto}</td>`;
      if (this.visibleCols.prensaId) htmlContent += '<td></td>';
      if (this.visibleCols.prensa) htmlContent += '<td></td>';
      if (this.visibleCols.programado) htmlContent += `<td class="text-right">${group.subtotal.programado}</td>`;
      if (this.visibleCols.fabricado) htmlContent += `<td class="text-right">${group.subtotal.fabricado}</td>`;
      if (this.visibleCols.diferencia) htmlContent += `<td class="text-right">${group.subtotal.diferencia}</td>`;
      htmlContent += '</tr>';
    }

    htmlContent += '<tr style="background-color: #cfd8dc; font-weight: bold; border-top: 2px solid #90a4ae;">';
    if (this.visibleCols.productoId) htmlContent += '<td></td>';
    if (this.visibleCols.producto) htmlContent += '<td>TOTAL</td>';
    if (this.visibleCols.prensaId) htmlContent += '<td></td>';
    if (this.visibleCols.prensa) htmlContent += '<td></td>';
    if (this.visibleCols.programado) htmlContent += `<td class="text-right">${this.totalResumen.programado}</td>`;
    if (this.visibleCols.fabricado) htmlContent += `<td class="text-right">${this.totalResumen.fabricado}</td>`;
    if (this.visibleCols.diferencia) htmlContent += `<td class="text-right">${this.totalResumen.diferencia}</td>`;
    htmlContent += '</tr>';

    htmlContent += `
            </tbody>
          </table>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    } else {
      this.notify.warning('El navegador bloqueó la ventana emergente de impresión.');
    }
  }
}
