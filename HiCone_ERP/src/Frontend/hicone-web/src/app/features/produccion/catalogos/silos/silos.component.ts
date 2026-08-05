import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduccionConfigService, Silo } from '../../../../core/services/produccion-config.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-silos-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up">
      <div class="page-header-premium">
        <div class="title-section">
          <h1 class="premium-title">Catálogo de Silos</h1>
          <nav class="breadcrumb-modern">
            <span class="root">Producción</span>
            <span class="sep">&rsaquo;</span>
            <span class="root">Catálogos</span>
            <span class="sep">&rsaquo;</span>
            <span class="active">Silos</span>
          </nav>
        </div>
      </div>
        
      <!-- Barra de Acciones Premium -->
      <div class="actions-toolbar" style="display: flex; width: 100%; align-items: center; margin-bottom: 1.5rem;">
          
          <!-- LEFT SIDE -->
          <div class="toolbar-left" style="display: flex; gap: 0.75rem; align-items: center;">
            <!-- Dropdown de Exportar -->
            <div class="export-dropdown-wrapper">
              <button class="btn-export-qa" (click)="toggleExportDropdown($event)" title="Exportar datos">
                📥 Exportar <span class="chevron-down-qa">▾</span>
              </button>
              @if (showExportOptions()) {
                <div class="export-popover-qa shadow-premium" (click)="$event.stopPropagation()">
                  <button class="export-item-qa" (click)="exportCSV()">
                    <span class="export-icon">📊</span> Excel (CSV)
                  </button>
                  <button class="export-item-qa" (click)="exportPDF()">
                    <span class="export-icon">📕</span> PDF
                  </button>
                </div>
              }
            </div>

            <!-- Botón Agregar -->
            <button class="btn btn-primary" style="background: #5cb85c; border-radius: 4px; padding: 0.4rem 0.8rem;" (click)="openCreate()">Agregar</button>

            <!-- Selector de Columnas -->
            <div class="dropdown-wrapper">
              <button class="btn btn-primary" (click)="toggleColumnDropdown($event)" style="display: flex; align-items: center; gap: 0.4rem; background: #5cb85c; border-radius: 4px; padding: 0.4rem 0.8rem;">
                Selecciona columnas <span style="font-size: 0.6rem;">▼</span>
              </button>
              @if (showColumnSelector()) {
                <div class="column-selector-popover animate-slide-up" (click)="$event.stopPropagation()" style="width: 240px; padding: 0;">
                  <div style="padding: 0.5rem;">
                    <input type="text" class="field-input" style="padding: 0.4rem; margin-bottom: 0.5rem;" />
                    
                    <div class="column-group">
                      <label style="font-weight: bold; margin-bottom: 0.3rem;"><input type="checkbox" checked> Fijas a la izquierda</label>
                      <label style="margin-left: 1.5rem;"><input type="checkbox" checked disabled> (Ninguna)</label>
                    </div>
                    
                    <div class="column-group" style="margin-top: 0.5rem;">
                      <label style="font-weight: bold; margin-bottom: 0.3rem;"><input type="checkbox" checked> No fijas</label>
                      <div class="column-list" style="margin-left: 1.5rem; max-height: 200px; overflow-y: auto;">
                        <label><input type="checkbox" [checked]="isColVisible('nombre')" (change)="toggleCol('nombre')"> Nombre</label>
                        <label><input type="checkbox" [checked]="isColVisible('capacidadKg')" (change)="toggleCol('capacidadKg')"> Capacidad (kg)</label>
                        <label><input type="checkbox" [checked]="isColVisible('minimoKg')" (change)="toggleCol('minimoKg')"> Mínimo (kg)</label>
                        <label><input type="checkbox" [checked]="isColVisible('maximoKg')" (change)="toggleCol('maximoKg')"> Máximo (kg)</label>
                        <label><input type="checkbox" [checked]="isColVisible('estadoMaterial')" (change)="toggleCol('estadoMaterial')"> Estado de Material</label>
                        <label><input type="checkbox" [checked]="isColVisible('tipoMaterial')" (change)="toggleCol('tipoMaterial')"> Tipo de Material</label>
                        <label><input type="checkbox" [checked]="isColVisible('siloActivo')" (change)="toggleCol('siloActivo')"> Silo Activo</label>
                      </div>
                    </div>
                    
                    <div class="column-group" style="margin-top: 0.5rem;">
                      <label style="font-weight: bold; margin-bottom: 0.3rem;"><input type="checkbox" checked> Fijas a la derecha</label>
                      <label style="margin-left: 1.5rem;"><input type="checkbox" checked disabled> (Ninguna)</label>
                    </div>
                  </div>
                  
                  <div style="display: flex; gap: 0.5rem; padding: 0.5rem; border-top: 1px solid #e2e8f0; background: #f8fafc;">
                    <button class="btn btn-primary" style="background: #5cb85c; padding: 0.4rem; border-radius: 4px; display: flex; align-items: center; justify-content: center;" (click)="resetCols()">↺</button>
                    <button class="btn btn-primary" style="background: #5cb85c; flex: 1; border-radius: 4px;" (click)="updateCols()">Actualizar</button>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- FLEXIBLE SPACE -->
          <div class="toolbar-spacer" style="flex: 1;"></div>

          <!-- RIGHT SIDE -->
          <div class="toolbar-right" style="display: flex; gap: 0.75rem; align-items: center;">
            <!-- Menú de Filtros -->
            <div class="dropdown-wrapper">
              <button class="btn btn-secondary" (click)="toggleFilterDropdown($event)" style="padding: 0.4rem 0.6rem; display: flex; align-items: center; border-radius: 4px; border: 1px solid #e2e8f0; font-size: 1rem; color: #64748b;">
                <svg viewBox="0 0 24 24" width="16" height="16" style="margin-right: 4px;"><path fill="currentColor" d="M14,12V19.88C14.04,20.18 13.94,20.5 13.71,20.71C13.32,21.1 12.69,21.1 12.3,20.71L10.29,18.7C10.06,18.47 9.96,18.16 10,17.87V12H9.97L4.21,4.62C3.87,4.19 3.95,3.56 4.38,3.22C4.57,3.08 4.78,3 5,3V3H19V3C19.22,3 19.43,3.08 19.62,3.22C20.05,3.56 20.13,4.19 19.79,4.62L14.03,12H14Z" /></svg>
                <span style="font-size: 0.6rem;">▼</span>
              </button>
              @if (showFilterOptions()) {
                <div class="column-selector-popover animate-slide-up" style="width: auto; right: 0; left: auto; padding: 0.5rem 0;">
                  <div class="dropdown-item" (click)="clearFilters()" style="display: flex; align-items: center; gap: 0.5rem;"><span style="color: #64748b;">✖</span> Limpiar filtros</div>
                  <div class="dropdown-item" style="display: flex; align-items: center; gap: 0.5rem;"><span style="color: #64748b;">💾</span> Guardar filtro como...</div>
                </div>
              }
            </div>

            <!-- Filtro de Búsqueda -->
            <div class="search-box">
              <input 
                class="field-input" 
                type="text" 
                placeholder="Buscar" 
                [ngModel]="searchText()" 
                (ngModelChange)="searchText.set($event); currentPage.set(1)"
                style="border-radius: 0; border: none; border-bottom: 1px solid #e2e8f0; padding: 0.4rem; box-shadow: none; width: 200px;"
              />
            </div>
          </div>
        </div>

      <!-- Tabla de Datos Premium -->
      <div class="content-card" style="margin-top: 1rem; position: relative; min-height: 300px;">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 70px;"></th> <!-- Ver -->
              <th style="width: 70px;"></th> <!-- Editar -->
              <th style="width: 70px;"></th> <!-- Archivar -->
              <th style="width: 70px;"></th> <!-- Borrar -->
              @if (isColVisible('nombre')) { <th>Nombre</th> }
              @if (isColVisible('capacidadKg')) { <th>Capacidad</th> }
              @if (isColVisible('minimoKg')) { <th>Mínimo</th> }
              @if (isColVisible('maximoKg')) { <th>Máximo</th> }
              @if (isColVisible('estadoMaterial')) { <th>Estado</th> }
              @if (isColVisible('tipoMaterial')) { <th>Tipo</th> }
              @if (isColVisible('siloActivo')) { <th>Activo</th> }
            </tr>
          </thead>
          <tbody>
            @if (loading()) { 
              <tr><td colspan="11" class="empty-state">Cargando silos...</td></tr> 
            }
            @else if (paginatedItems().length === 0) { 
              <tr><td colspan="11" class="empty-state">No se encontraron silos registrados</td></tr> 
            }
            @else {
              @for (item of paginatedItems(); track item.id) {
                <tr>
                  <td style="width: 70px;">
                    <button class="action-btn view" (click)="openViewModal(item)">Visualizar</button>
                  </td>
                  <td style="width: 70px;">
                    <button class="action-btn edit" (click)="openEditModal(item)">Modificar</button>
                  </td>
                  <td style="width: 70px;">
                    <button class="action-btn" style="background: rgba(100, 116, 139, 0.1); color: #475569;" (click)="archivar(item)">Archivar</button>
                  </td>
                  <td style="width: 70px;">
                    <button class="action-btn delete" (click)="del(item)">Eliminar</button>
                  </td>
                  @if (isColVisible('nombre')) { <td class="col-nombre">{{ item.nombre }}</td> }
                  @if (isColVisible('capacidadKg')) { <td>{{ item.capacidadKg }} kg</td> }
                  @if (isColVisible('minimoKg')) { <td>{{ item.minimoKg }} kg</td> }
                  @if (isColVisible('maximoKg')) { <td>{{ item.maximoKg }} kg</td> }
                  @if (isColVisible('estadoMaterial')) { <td>{{ item.estadoMaterial }}</td> }
                  @if (isColVisible('tipoMaterial')) { <td>{{ item.tipoMaterial }}</td> }
                  @if (isColVisible('siloActivo')) { 
                    <td>
                      <span class="status-badge" [class.active]="item.siloActivo">{{ item.siloActivo ? 'Sí' : 'No' }}</span>
                    </td> 
                  }
                </tr>
              }
            }
          </tbody>
        </table>
      </div>

      <!-- Paginación Premium -->
      @if (totalPages() > 1) {
        <div class="pagination-container animate-move-up">
          <button class="pag-btn" [disabled]="currentPage() === 1" (click)="prevPage()">‹</button>
          
          @for (p of getPages(currentPage(), totalPages()); track $index) {
            @if (p === '...') {
              <span class="pag-dots">...</span>
            } @else {
              <button class="pag-btn page-num" [class.active]="currentPage() === p" (click)="setPage($any(p))">
                {{ p }}
              </button>
            }
          }
          
          <button class="pag-btn" [disabled]="currentPage() === totalPages()" (click)="nextPage()">›</button>
        </div>
      }

      <!-- Modal Agregar / Editar -->
      @if (showModal()) {
        <div class="modal-overlay" (click)="closeModal()">
          <div class="modal-card" style="width: 750px; border-radius: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); border: 1px solid #e2e8f0;" (click)="$event.stopPropagation()">
            <div class="modal-header" style="background: white; border-bottom: none; padding: 1.5rem 1.75rem 0 1.75rem;">
              <h3 style="color: #5cb85c; font-size: 1.4rem; font-weight: normal;">Gestionar Silo</h3>
              <button class="modal-close" (click)="closeModal()">✕</button>
            </div>
            <div style="padding: 0 1.75rem 1rem 1.75rem; font-size: 0.8rem; color: #94a3b8; display: flex; gap: 0.5rem; align-items: center;">
              <span>Producción</span> <span style="font-weight: bold;">›</span> <span>Catálogos</span> <span style="font-weight: bold;">›</span> <span>Silos</span>
            </div>
            
            <div class="modal-body" style="padding: 0 1.75rem 1.75rem 1.75rem; display: flex; flex-direction: column; gap: 1rem;">
              <div style="border: 1px solid #e2e8f0; padding: 1rem; background: white;">
                <h4 style="margin: 0 0 1.5rem 0; display: flex; align-items: center; gap: 0.5rem; color: #64748b; font-size: 0.9rem; font-weight: normal;">
                  <span style="background: #5cb85c; color: white; width: 16px; height: 16px; display: inline-flex; align-items: center; justify-content: center; font-size: 10px;">+</span> 
                  Información General
                </h4>
                
                <div class="form-row" style="margin-bottom: 0.8rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.4rem;">
                  <label class="field-label" style="text-transform: none; color: #334155; font-size: 0.8rem; font-weight: normal;">Id</label>
                  <div style="font-size: 0.85rem; color: #64748b; padding: 0.4rem 0;">{{ form.id ? form.id : '0' }}</div>
                </div>
                
                <div class="form-row" style="margin-bottom: 0.8rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.4rem;">
                  <label class="field-label" style="text-transform: none; color: #334155; font-size: 0.8rem; font-weight: normal;">Silo Activo</label>
                  <input type="checkbox" [(ngModel)]="form.siloActivo" [disabled]="modalReadOnly()" style="width: auto; margin-top: 0.4rem;" />
                </div>

                <div class="form-row" style="margin-bottom: 0.8rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.4rem;">
                  <label class="field-label" style="text-transform: none; color: #334155; font-size: 0.8rem; font-weight: normal;">Nombre</label>
                  <input class="field-input-clean" type="text" [(ngModel)]="form.nombre" [disabled]="modalReadOnly()" />
                </div>

                <div class="form-row" style="margin-bottom: 0.8rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.4rem;">
                  <label class="field-label" style="text-transform: none; color: #334155; font-size: 0.8rem; font-weight: normal;">Capacidad (kg)</label>
                  <input class="field-input-clean" type="number" [(ngModel)]="form.capacidadKg" [disabled]="modalReadOnly()" />
                </div>

                <div class="form-row" style="margin-bottom: 0.8rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.4rem;">
                  <label class="field-label" style="text-transform: none; color: #334155; font-size: 0.8rem; font-weight: normal;">Mínimo (kg)</label>
                  <input class="field-input-clean" type="number" [(ngModel)]="form.minimoKg" [disabled]="modalReadOnly()" />
                </div>

                <div class="form-row" style="margin-bottom: 0.8rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.4rem;">
                  <label class="field-label" style="text-transform: none; color: #334155; font-size: 0.8rem; font-weight: normal;">Máximo (kg)</label>
                  <input class="field-input-clean" type="number" [(ngModel)]="form.maximoKg" [disabled]="modalReadOnly()" />
                </div>

                <div class="form-row" style="margin-bottom: 0.8rem; border-bottom: 2px solid #5cb85c; padding-bottom: 0.4rem;">
                  <label class="field-label" style="text-transform: none; color: #334155; font-size: 0.8rem; font-weight: normal;">Estado Material</label>
                  <select class="field-input-clean" [(ngModel)]="form.estadoMaterial" [disabled]="modalReadOnly()">
                    <option [ngValue]="null"></option>
                    @for (es of estadosMaterial(); track es.id) {
                      <option [ngValue]="es.nombre">{{ es.nombre }}</option>
                    }
                  </select>
                </div>

                <div class="form-row" style="margin-bottom: 0.8rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.4rem;">
                  <label class="field-label" style="text-transform: none; color: #334155; font-size: 0.8rem; font-weight: normal;">Material</label>
                  <select class="field-input-clean" [(ngModel)]="form.tipoMaterial" [disabled]="modalReadOnly()">
                    <option [ngValue]="null"></option>
                    @for (tm of tiposMaterial(); track tm.id) {
                      <option [ngValue]="tm.nombre">{{ tm.nombre }}</option>
                    }
                  </select>
                </div>
              </div>
            </div>

            <div class="modal-footer" style="background: white; border-top: none; padding-top: 0; padding-bottom: 1.5rem; justify-content: flex-start; padding-left: 1.75rem;">
              @if (modalReadOnly()) { 
                <button class="btn btn-primary" style="background: #5cb85c; border-radius: 2px; padding: 0.5rem 1.5rem; border: none; font-size: 0.75rem; font-weight: normal;" (click)="closeModal()">CERRAR</button>
              } @else {
                <button class="btn btn-primary" style="background: #5cb85c; border-radius: 2px; padding: 0.5rem 1.5rem; border: none; font-size: 0.75rem; font-weight: normal;" (click)="save()">CONFIRMAR</button> 
                <button class="btn btn-secondary" style="background: #94a3b8; color: white; border: none; border-radius: 2px; padding: 0.5rem 1.5rem; font-size: 0.75rem; font-weight: normal;" (click)="closeModal()">CANCELAR</button>
              }
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .module-page { padding: 3rem; }
    .breadcrumb { font-size: .75rem; color: #94a3b8; font-weight: 600; text-transform: uppercase; margin-bottom: .25rem; }
    h1 { font-size: 1.8rem; font-weight: 800; color: #1e293b; margin: 0; }
    .actions-toolbar { display: flex; gap: 0.75rem; align-items: center; }
    .btn { padding: .55rem 1.25rem; border-radius: 8px; border: none; cursor: pointer; font-size: .875rem; font-weight: 600; transition: all .2s; }
    .btn-primary { background: #10b981; color: white; box-shadow: 0 4px 10px rgba(16, 185, 129, 0.2); }
    .btn-primary:hover { opacity: 0.9; }
    .btn-secondary { background: white; color: #475569; border: 1px solid #e2e8f0; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
    .btn-secondary:hover { background: #f8fafc; }
    .search-box { position: relative; }
    .field-input { width: 100%; padding: .65rem .875rem; border-radius: 8px; border: 1px solid #e2e8f0; font-size: .875rem; outline: none; box-sizing: border-box; font-weight: 500; color: #334155; transition: all 0.2s; }
    .field-input-clean { width: 100%; border: none; font-size: 0.85rem; outline: none; background: transparent; padding: 0.2rem 0; color: #334155; }
    .content-card { background: white; border-radius: 12px; border: 1px solid #e2e8f0; overflow: visible; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
    
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th { text-align: left; padding: 1rem; background: #f8fafc; color: #64748b; font-size: .75rem; font-weight: 800; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; position: relative; }
    .data-table td { padding: .85rem 1rem; border-bottom: 1px solid #f1f5f9; font-size: .875rem; color: #334155; }
    .data-table tr:hover td { background: #f8fafc; }
    .empty-state { text-align: center; padding: 3.5rem; color: #94a3b8; font-style: italic; }
    
    .col-nombre { font-weight: 700; color: #1e293b; }
    
    .action-btn { padding: .35rem .9rem; border-radius: 6px; border: none; cursor: pointer; font-size: .78rem; font-weight: 700; transition: all .15s; text-align: center; }
    .action-btn.view { background: rgba(14, 165, 233, 0.08); color: #0284c7; }
    .action-btn.view:hover { background: rgba(14, 165, 233, 0.15); }
    .action-btn.edit { background: rgba(245, 158, 11, 0.08); color: #d97706; }
    .action-btn.edit:hover { background: rgba(245, 158, 11, 0.15); }
    .action-btn.delete { background: rgba(239, 68, 68, 0.08); color: #dc2626; }
    .action-btn.delete:hover { background: rgba(239, 68, 68, 0.15); }
    
    .status-badge { padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 700; background: #f1f5f9; color: #64748b; }
    .status-badge.active { background: rgba(16, 185, 129, 0.15); color: #059669; }

    .dropdown-wrapper { position: relative; }
    .column-selector-popover { position: absolute; left: 0; top: 110%; background: white; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.15); padding: 0; width: 180px; z-index: 100; }
    .column-group { font-size: 0.85rem; color: #334155; }
    .column-list { display: flex; flex-direction: column; gap: 0.3rem; }
    .column-list label { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; color: #334155; cursor: pointer; }
    .dropdown-item { padding: 0.65rem 1rem; font-size: 0.85rem; color: #334155; cursor: pointer; transition: background 0.15s; font-weight: 500; }
    .dropdown-item:hover { background: #f1f5f9; }
    
    .modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.35); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; animation: fadeIn 0.25s ease; }
    .modal-card { background: white; border-radius: 16px; width: 480px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15); overflow: hidden; animation: zoomIn 0.25s ease; border: 1px solid #e2e8f0; }
    .modal-header h3 { margin: 0; font-size: 1.15rem; font-weight: 800; color: #1e293b; letter-spacing: -0.02em; }
    .modal-close { background: none; border: none; font-size: 1.1rem; cursor: pointer; color: #94a3b8; transition: color 0.15s; }
    .modal-close:hover { color: #475569; }
    .form-row { display: flex; flex-direction: column; gap: 0.15rem; }
    .field-label { font-size: .8rem; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; }
    
    .pagination-container { display: flex; justify-content: center; align-items: center; gap: 0.4rem; margin-top: 1.5rem; }
    .pag-btn { height: 2.1rem; min-width: 2.1rem; padding: 0 0.5rem; border-radius: 8px; border: 1px solid #e2e8f0; background: white; color: #475569; font-weight: 700; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
    .pag-btn:hover:not(:disabled) { background: #f8fafc; border-color: #cbd5e1; color: #1e293b; }
    .pag-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .pag-btn.active { background: #10b981; border-color: #10b981; color: white; box-shadow: 0 2px 6px rgba(16,185,129,0.25); }
    .pag-dots { font-size: 0.85rem; color: #94a3b8; font-weight: 700; padding: 0 0.2rem; }
    
    .animate-move-up { animation: moveUp .3s ease-out; }
    .animate-slide-up { animation: slideUp .2s ease-out; }
    @keyframes moveUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes zoomIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
  `]
})
export class SilosCatalogoComponent implements OnInit {
  private svc = inject(ProduccionConfigService);
  
  items = signal<Silo[]>([]);
  loading = signal(true);
  showModal = signal(false);
  modalReadOnly = signal(false);
  form: Partial<Silo> = {};

  searchText = signal<string>('');
  showColumnSelector = signal<boolean>(false);
  showExportOptions = signal<boolean>(false);
  showFilterOptions = signal<boolean>(false);
  visibleColumns = signal<string[]>(['nombre', 'capacidadKg', 'minimoKg', 'maximoKg', 'estadoMaterial', 'tipoMaterial', 'siloActivo']);

  currentPage = signal<number>(1);
  pageSize = signal<number>(8);

  estadosMaterial = signal<{id: string, nombre: string}[]>([]);
  tiposMaterial = signal<{id: string, nombre: string}[]>([]);

  ngOnInit() {
    this.load();
    this.svc.getMaterialEstados().subscribe(res => this.estadosMaterial.set(res));
    this.svc.getMaterialTipos().subscribe(res => this.tiposMaterial.set(res));
  }

  load() {
    this.loading.set(true);
    this.svc.getSilos().subscribe({
      next: data => {
        this.items.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  filteredItems = computed(() => {
    let list = this.items();
    const search = this.searchText().trim().toLowerCase();
    if (search) {
      list = list.filter(op => op.nombre.toLowerCase().includes(search));
    }
    return list;
  });

  paginatedItems = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredItems().slice(start, start + this.pageSize());
  });

  totalPages = computed(() => {
    return Math.ceil(this.filteredItems().length / this.pageSize()) || 1;
  });

  toggleColumnDropdown(event: Event) {
    event.stopPropagation();
    this.showColumnSelector.update(v => !v);
    this.showExportOptions.set(false);
    this.showFilterOptions.set(false);
  }

  toggleExportDropdown(event: Event) {
    event.stopPropagation();
    this.showExportOptions.update(v => !v);
    this.showColumnSelector.set(false);
    this.showFilterOptions.set(false);
  }

  toggleFilterDropdown(event: Event) {
    event.stopPropagation();
    this.showFilterOptions.update(v => !v);
    this.showColumnSelector.set(false);
    this.showExportOptions.set(false);
  }

  clearFilters() {
    this.searchText.set('');
    this.showFilterOptions.set(false);
    this.currentPage.set(1);
  }

  resetCols() {
    this.visibleColumns.set(['nombre', 'capacidadKg', 'minimoKg', 'maximoKg', 'estadoMaterial', 'tipoMaterial', 'siloActivo']);
  }

  updateCols() {
    this.showColumnSelector.set(false);
  }

  isColVisible(colName: string): boolean {
    return this.visibleColumns().includes(colName);
  }

  toggleCol(colName: string) {
    this.visibleColumns.update(cols => {
      if (cols.includes(colName)) return cols.filter(c => c !== colName);
      return [...cols, colName];
    });
  }

  prevPage() { if (this.currentPage() > 1) this.currentPage.update(p => p - 1); }
  nextPage() { if (this.currentPage() < this.totalPages()) this.currentPage.update(p => p + 1); }
  setPage(p: number) { this.currentPage.set(p); }

  getPages(current: number, total: number): (number | string)[] {
    if (total <= 1) return [];
    const pages: (number | string)[] = [1];
    if (current > 3) pages.push('...');
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (current < total - 2) pages.push('...');
    if (total > 1) pages.push(total);
    return pages;
  }

  openViewModal(item: Silo) {
    this.form = { ...item };
    this.modalReadOnly.set(true);
    this.showModal.set(true);
    this.showColumnSelector.set(false);
    this.showExportOptions.set(false);
    this.showFilterOptions.set(false);
  }

  openEditModal(item: Silo) {
    this.form = { ...item };
    this.modalReadOnly.set(false);
    this.showModal.set(true);
    this.showColumnSelector.set(false);
    this.showExportOptions.set(false);
    this.showFilterOptions.set(false);
  }

  openCreate() {
    this.form = { nombre: '', capacidadKg: 0, minimoKg: 0, maximoKg: 0, estadoMaterial: '', tipoMaterial: '', siloActivo: true };
    this.modalReadOnly.set(false);
    this.showModal.set(true);
    this.showColumnSelector.set(false);
    this.showExportOptions.set(false);
    this.showFilterOptions.set(false);
  }

  closeModal() {
    this.showModal.set(false);
    this.form = {};
  }

  save() {
    if (!this.form.nombre || !this.form.nombre.trim()) {
      alert('El campo Nombre es requerido.');
      return;
    }
    
    if (!this.form.id) {
      this.svc.createSilo(this.form).subscribe(() => {
        this.closeModal();
        this.load();
      });
    } else {
      this.svc.updateSilo(this.form.id, this.form).subscribe(() => {
        this.closeModal();
        this.load();
      });
    }
  }

  del(item: Silo) {
    if (confirm(`¿Está seguro de que desea eliminar el silo "${item.nombre}" permanentemente?`)) {
      this.svc.deleteSilo(item.id).subscribe(() => {
        this.load();
        if (this.currentPage() > this.totalPages()) this.currentPage.set(this.totalPages());
      });
    }
  }

  archivar(item: Silo) {
    if (confirm(`¿Está seguro de archivar el silo "${item.nombre}"? Dejará de verse en este listado.`)) {
      this.svc.archivarSilo(item.id).subscribe(() => {
        this.load();
      });
    }
  }

  exportCSV() {
    this.showExportOptions.set(false);
    
    const dataToExport = this.filteredItems().map(item => ({
      ID: item.id,
      Nombre: item.nombre,
      Capacidad: item.capacidadKg || 0,
      Mínimo: item.minimoKg || 0,
      Máximo: item.maximoKg || 0,
      EstadoMaterial: item.estadoMaterial || '',
      TipoMaterial: item.tipoMaterial || '',
      Activo: item.siloActivo ? 'Sí' : 'No'
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Silos');

    XLSX.writeFile(wb, `silos_${new Date().toISOString().slice(0,10)}.xlsx`);
  }

  exportPDF() {
    this.showExportOptions.set(false);
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    let headers = '';
    if (this.isColVisible('nombre')) headers += `<th>Silo</th>`;
    if (this.isColVisible('capacidadKg')) headers += `<th>Capacidad</th>`;
    if (this.isColVisible('minimoKg')) headers += `<th>Mínimo</th>`;
    if (this.isColVisible('maximoKg')) headers += `<th>Máximo</th>`;
    if (this.isColVisible('estadoMaterial')) headers += `<th>Estado Material</th>`;
    if (this.isColVisible('tipoMaterial')) headers += `<th>Tipo Material</th>`;
    if (this.isColVisible('siloActivo')) headers += `<th>Activo</th>`;

    let tableRows = '';
    this.filteredItems().forEach(op => {
      tableRows += `<tr>`;
      if (this.isColVisible('nombre')) tableRows += `<td>\${op.nombre}</td>`;
      if (this.isColVisible('capacidadKg')) tableRows += `<td>\${op.capacidadKg || 0}</td>`;
      if (this.isColVisible('minimoKg')) tableRows += `<td>\${op.minimoKg || 0}</td>`;
      if (this.isColVisible('maximoKg')) tableRows += `<td>\${op.maximoKg || 0}</td>`;
      if (this.isColVisible('estadoMaterial')) tableRows += `<td>\${op.estadoMaterial || ''}</td>`;
      if (this.isColVisible('tipoMaterial')) tableRows += `<td>\${op.tipoMaterial || ''}</td>`;
      if (this.isColVisible('siloActivo')) tableRows += `<td>\${op.siloActivo ? 'Sí' : 'No'}</td>`;
      tableRows += `</tr>`;
    });

    printWindow.document.write(`
      <html>
        <head>
          <title>Reporte de Silos</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 2rem; color: #1e293b; background-color: #f8fafc; }
            h1 { color: #10b981; margin-bottom: 0.2rem; font-size: 1.8rem; }
            p { color: #64748b; font-size: 0.9rem; margin-bottom: 1.5rem; }
            table { width: 100%; border-collapse: collapse; margin-top: 1rem; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
            th, td { padding: 12px 16px; border-bottom: 1px solid #e2e8f0; text-align: left; font-size: 0.875rem; }
            th { background: #f1f5f9; font-weight: bold; color: #475569; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em; }
            tr:last-child td { border-bottom: none; }
          </style>
        </head>
        <body>
          <h1>Reporte de Silos</h1>
          <p>Generado el: \${new Date().toLocaleString()}</p>
          <table>
            <thead><tr>\${headers}</tr></thead>
            <tbody>\${tableRows}</tbody>
          </table>
          <script>window.onload = function() { window.print(); window.close(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }
}
