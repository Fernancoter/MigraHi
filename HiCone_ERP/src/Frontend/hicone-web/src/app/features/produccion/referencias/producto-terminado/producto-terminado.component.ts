import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '../../../../shared/directives/click-outside.directive';
import { ProduccionService } from '../../../../core/services/produccion';
import { NotificationService } from '../../../../core/services/notification.service';
import * as XLSX from 'xlsx';

export interface ProductoTerminado {
  id?: string;
  terminadoPalets: number;
  carreteMiliar: number;
  paletMiliar: number;
  terminadoPeso: number;
  pesoCarrete: number;
  pesoPalet: number;
  conEtiqueta: boolean;
  etiquetable: boolean;
  producto: string;
  codigoSap: string;
  mrd: number;
}

export interface ColumnDef {
  key: keyof ProductoTerminado;
  label: string;
  visible: boolean;
  pin: 'left' | 'right' | 'none';
}

@Component({
  selector: 'app-producto-terminado',
  standalone: true,
  imports: [CommonModule, FormsModule, ClickOutsideDirective],
  template: `
    <div class="module-page animate-fade-in" style="padding: 3rem; background: #fff; min-height: calc(100vh - 64px); position: relative;">
      <div class="page-header-premium">
        <div class="title-section">
          <h1 class="premium-title">Producto Terminado</h1>
          <nav class="breadcrumb-modern">
            <span class="root">Prensado</span>
            <span class="sep">&rsaquo;</span>
            <span class="active">Producto Terminado</span>
          </nav>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; margin-bottom: 1rem; padding-bottom: 0.5rem;">
        
        <!-- Izquierda: Exportar, Selecciona columnas -->
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <!-- Exportar -->
          <div class="export-dropdown-wrapper">
            <button class="btn-export-qa" (click)="toggleExportMenu()" title="Exportar datos">
              📥 Exportar <span class="chevron-down-qa">▾</span>
            </button>
            <div class="export-popover-qa shadow-premium" *ngIf="isExportMenuOpen" (click)="$event.stopPropagation()">
              <button class="export-item-qa" (click)="exportCSV()">
                <span class="export-icon">📊</span> Excel (CSV)
              </button>
              <button class="export-item-qa">
                <span class="export-icon">📕</span> PDF
              </button>
            </div>
          </div>

          <!-- Agregar -->
          <button (click)="openCreate()" style="background: white; color: #5cb85c; border: 1px solid #5cb85c; padding: 0.5rem 1.5rem; border-radius: 4px; cursor: pointer; font-size: 0.85rem;">Agregar</button>

          <!-- Selecciona Columnas -->
          <div style="position: relative;" (clickOutside)="isColumnsMenuOpen = false">
            <button (click)="toggleColumnsMenu()" style="background: #5cb85c; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font-size: 0.85rem; display: flex; align-items: center; gap: 0.5rem;">
              Selecciona columnas <span style="font-size: 0.6rem;">▼</span>
            </button>
            <div *ngIf="isColumnsMenuOpen" style="position: absolute; top: 100%; left: 0; background: white; border: 1px solid #e2e8f0; border-radius: 4px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); z-index: 50; width: 250px; padding: 1rem; margin-top: 0.5rem;">
              <input type="text" placeholder="Buscar..." style="width: 100%; padding: 0.5rem; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 0.8rem; margin-bottom: 1rem; box-sizing: border-box;" />
              
              <div style="font-size: 0.8rem; font-weight: bold; color: #64748b; margin-bottom: 0.5rem;">Fijas a la izquierda <span style="font-size: 0.6rem;">▼</span></div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; font-size: 0.85rem; color: #334155;">
                <input type="checkbox" [checked]="getColumnsByPin('left').length === 0" disabled /> (Ninguna)
              </div>
              <div *ngFor="let col of columns" style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; font-size: 0.85rem; color: #334155;">
                <input type="checkbox" [checked]="col.pin === 'left'" (change)="togglePin(col, 'left')" /> {{ col.label }}
              </div>

              <div style="font-size: 0.8rem; font-weight: bold; color: #64748b; margin-bottom: 0.5rem; margin-top: 1rem;">No fijas <span style="font-size: 0.6rem;">▼</span></div>
              <div *ngFor="let col of columns" style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; font-size: 0.85rem; color: #334155;">
                <input type="checkbox" [(ngModel)]="col.visible" (change)="onVisibilityChange(col)" /> {{ col.label }}
              </div>

              <div style="font-size: 0.8rem; font-weight: bold; color: #64748b; margin-bottom: 0.5rem; margin-top: 1rem;">Fijas a la derecha <span style="font-size: 0.6rem;">▼</span></div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; font-size: 0.85rem; color: #334155;">
                <input type="checkbox" [checked]="getColumnsByPin('right').length === 0" disabled /> (Ninguna)
              </div>
              <div *ngFor="let col of columns" style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; font-size: 0.85rem; color: #334155;">
                <input type="checkbox" [checked]="col.pin === 'right'" (change)="togglePin(col, 'right')" /> {{ col.label }}
              </div>
              
              <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                <button (click)="resetColumns()" style="background: #5cb85c; color: white; border: none; padding: 0.5rem; border-radius: 4px; cursor: pointer;">↺</button>
                <button (click)="isColumnsMenuOpen = false" style="background: #5cb85c; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; flex-grow: 1;">Actualizar</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Derecha: Filtro, Buscar -->
        <div class="filter-search-group-qa">
          <!-- Botón Filtro Avanzado -->
          <div class="dropdown-wrapper">
            <button class="btn-filter-funnel-qa" (click)="$event.stopPropagation(); toggleFilterMenu()" title="Filtros avanzados">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              <span class="chevron-down-funnel">▾</span>
            </button>
            <!-- Filter Dropdown -->
            <div *ngIf="isFilterMenuOpen" style="position: absolute; top: 100%; right: 0; background: white; border: 1px solid #e2e8f0; border-radius: 4px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); z-index: 99999; width: 210px; padding: 0.5rem;" (click)="$event.stopPropagation()">
              <button (click)="clearFilters(); $event.stopPropagation()" style="display: block; width: 100%; text-align: left; padding: 0.5rem; border: none; background: none; cursor: pointer; color: #334155; font-size: 0.85rem;">Limpiar filtros</button>
              <button (click)="saveFilters(); $event.stopPropagation()" style="display: block; width: 100%; text-align: left; padding: 0.5rem; border: none; background: none; cursor: pointer; color: #334155; font-size: 0.85rem;">Guardar filtro como...</button>
              <div *ngIf="savedFilters.length > 0">
                <div style="height: 1px; background: #e2e8f0; margin: 0.5rem 0;"></div>
                <div style="font-size: 0.7rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; padding: 0.25rem 0.5rem;">Filtros Guardados</div>
                <div *ngFor="let f of savedFilters" (click)="loadSavedFilter(f); $event.stopPropagation()" style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; font-size: 0.85rem; color: #334155; cursor: pointer;">
                  <span>📁 {{ f.name }}</span>
                  <span (click)="deleteSavedFilter(f, $event); $event.stopPropagation()" style="cursor: pointer; opacity: 0.6; padding: 2px;">🗑️</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Campo de Búsqueda Subrayado -->
          <div class="search-modern-underline-qa">
            <input type="text" [ngModel]="searchText()" (ngModelChange)="onSearchChange($event)" placeholder="Buscar..." />
          </div>
        </div>
      </div>

      @if (!viewMode() && !editMode()) {
      <div class="table-responsive" style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: separate; border-spacing: 0; margin-top: 1rem; min-width: 1200px;">
          <thead>
            <tr>
              <th title="Visualizar" style="width: 60px; text-align: center; padding: 1rem; border-bottom: 1px solid #e2e8f0; background: white; position: sticky; left: 0; z-index: 20; cursor: help;">Vis</th>
              <th title="Modificar" style="width: 60px; text-align: center; padding: 1rem; border-bottom: 1px solid #e2e8f0; background: white; position: sticky; left: 60px; z-index: 20; cursor: help;">Mod</th>
              <th title="Eliminar" style="width: 60px; text-align: center; padding: 1rem; border-bottom: 1px solid #e2e8f0; background: white; position: sticky; left: 120px; z-index: 20; cursor: help;">Eli</th>
              <ng-container *ngFor="let col of activeColumns">
                <th [ngStyle]="getThStyle(col)" style="text-align: left; padding: 1rem; color: #334155; font-size: 0.85rem; font-weight: bold; border-bottom: 1px solid #e2e8f0; background: white; cursor: pointer; user-select: none;" (click)="toggleSort(col.key)">
                  {{ col.label }} <span style="font-size: 0.6rem; color: #94a3b8;">{{ sortColumn() === col.key ? (sortDirection() === 'asc' ? '▲' : '▼') : '▼' }}</span>
                </th>
              </ng-container>
            </tr>
          </thead>
          <tbody>
            @if (isLoading()) {
              <tr><td [attr.colspan]="activeColumns.length + 3" style="text-align:center; padding:2rem; color:#94a3b8;">Cargando...</td></tr>
            } @else if (paginatedItems().length === 0) {
              <tr><td [attr.colspan]="activeColumns.length + 3" style="text-align:center; padding:2rem; color:#94a3b8; font-style:italic;">No se encontraron resultados.</td></tr>
            } @else {
              @for (item of paginatedItems(); track item.id) {
                <tr class="table-row">
                  <td style="padding: 1rem; border-bottom: 1px solid #f1f5f9; text-align: center; background: white; position: sticky; left: 0; z-index: 10;">
                    <button (click)="openView(item)" style="background: none; border: none; color: #3b82f6; cursor: pointer; font-size: 1.1rem;" title="Visualizar">👁️</button>
                  </td>
                  <td style="padding: 1rem; border-bottom: 1px solid #f1f5f9; text-align: center; background: white; position: sticky; left: 60px; z-index: 10;">
                    <button (click)="openEdit(item)" style="background: none; border: none; color: #eab308; cursor: pointer; font-size: 1.1rem;" title="Modificar">✏️</button>
                  </td>
                  <td style="padding: 1rem; border-bottom: 1px solid #f1f5f9; text-align: center; background: white; position: sticky; left: 120px; z-index: 10;">
                    <button (click)="openDeleteConfirm(item.id!)" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 1.1rem;" title="Eliminar">🗑️</button>
                  </td>
                  <ng-container *ngFor="let col of activeColumns">
                    <td [ngStyle]="getTdStyle(col)" style="padding: 1rem; border-bottom: 1px solid #f1f5f9; color: #334155; font-size: 0.85rem; background: inherit;">
                      <ng-container *ngIf="col.key === 'conEtiqueta' || col.key === 'etiquetable'; else textCell">
                        <input type="checkbox" [checked]="item[col.key]" disabled />
                      </ng-container>
                      <ng-template #textCell>
                        {{ item[col.key] }}
                      </ng-template>
                    </td>
                  </ng-container>
                </tr>
              }
            }
          </tbody>
        </table>
      </div>

      <!-- Paginación -->
      @if (totalPages() > 1) {
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
          <div style="font-size: 0.85rem; color: #64748b;">Página {{ currentPage() }} de {{ totalPages() }}</div>
          <div class="pagination-container">
            <button class="pag-btn" [disabled]="currentPage() === 1" (click)="prevPage()">Ant</button>
            @for (p of getPages(currentPage(), totalPages()); track $index) {
              @if (p === '...') { <span class="pag-dots">...</span> }
              @else { <button class="pag-btn" [class.active]="currentPage() === p" (click)="setPage($any(p))">{{ p }}</button> }
            }
            <button class="pag-btn" [disabled]="currentPage() === totalPages()" (click)="nextPage()">Sig</button>
          </div>
        </div>
      }
      } <!-- END DE IF (!viewMode() && !editMode()) -->

      <!-- FORMULARIO PANTALLA COMPLETA (Visualizar o Modificar) -->
      @if (viewMode() || editMode()) {
        <div class="form-container animate-fade-in" style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; margin-top: 1rem;">
          <div style="background: #f8fafc; padding: 1rem; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; gap: 0.5rem; border-top-left-radius: 8px; border-top-right-radius: 8px;">
            <span style="color: #5cb85c; font-size: 1.2rem;">🏷️</span>
            <h3 style="margin: 0; color: #334155; font-size: 1rem;">Información General</h3>
          </div>
          
          <div style="padding: 2rem;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem;">
              @if (form.id) {
                <div class="form-group">
                  <label>Terminado Id</label>
                  <input type="text" [value]="form.id" disabled class="form-control" />
                </div>
              }
              <div class="form-group">
                <label>Producto Nombre</label>
                <input type="text" [(ngModel)]="form.producto" [disabled]="viewMode()" class="form-control" />
              </div>
              <div class="form-group">
                <label>Código SAP</label>
                <input type="text" [(ngModel)]="form.codigoSap" [disabled]="viewMode()" class="form-control" />
              </div>
              <div class="form-group">
                <label>Terminado Palets <span style="font-size: 0.72rem; color: #64748b; font-weight: normal;">(Entero)</span></label>
                <input type="number" step="1" [(ngModel)]="form.terminadoPalets" [disabled]="viewMode()" class="form-control" />
              </div>
              <div class="form-group">
                <label>Carrete Millar <span style="font-size: 0.72rem; color: #64748b; font-weight: normal;">(Entero)</span></label>
                <input type="number" step="1" [(ngModel)]="form.carreteMiliar" [disabled]="viewMode()" class="form-control" />
              </div>
              <div class="form-group">
                <label>Palet Millar <span style="font-size: 0.72rem; color: #64748b; font-weight: normal;">(Entero)</span></label>
                <input type="number" step="1" [(ngModel)]="form.paletMiliar" [disabled]="viewMode()" class="form-control" />
              </div>
              <div class="form-group">
                <label>Terminado Peso</label>
                <input type="number" [(ngModel)]="form.terminadoPeso" [disabled]="viewMode()" class="form-control" />
              </div>
              <div class="form-group">
                <label>Peso Carrete</label>
                <input type="number" [(ngModel)]="form.pesoCarrete" [disabled]="viewMode()" class="form-control" />
              </div>
              <div class="form-group">
                <label>Peso Palet</label>
                <input type="number" [(ngModel)]="form.pesoPalet" [disabled]="viewMode()" class="form-control" />
              </div>
              <div class="form-group">
                <label>MRD <span style="font-size: 0.72rem; color: #64748b; font-weight: normal;">(Entero)</span></label>
                <input type="number" step="1" [(ngModel)]="form.mrd" [disabled]="viewMode()" class="form-control" />
              </div>
              <div class="form-group" style="display: flex; align-items: center; gap: 0.5rem; margin-top: 1.5rem;">
                <input type="checkbox" [(ngModel)]="form.conEtiqueta" [disabled]="viewMode()" />
                <label style="margin: 0;">Con Etiqueta</label>
              </div>
              <div class="form-group" style="display: flex; align-items: center; gap: 0.5rem; margin-top: 1.5rem;">
                <input type="checkbox" [(ngModel)]="form.etiquetable" [disabled]="viewMode()" />
                <label style="margin: 0;">Etiquetable</label>
              </div>
            </div>

            @if (saveError()) { <div style="margin-top: 1rem; padding: 0.6rem 0.8rem; background: #fef2f2; color: #dc2626; border-radius: 7px; font-size: 0.82rem; font-weight: 600;">{{ saveError() }}</div> }

            <div style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid #e2e8f0; display: flex; gap: 1rem;">
              <button (click)="cancelView()" class="btn-cancel">CANCELAR</button>
              @if (editMode()) {
                <button class="btn-save" [disabled]="saving()" (click)="saveEdit()">{{ saving() ? 'GUARDANDO...' : 'GUARDAR' }}</button>
                @if (form.id) {
                  <button class="btn-delete" (click)="openDeleteConfirm(form.id!)" style="margin-left: auto;">ELIMINAR</button>
                }
              }
            </div>
          </div>

          <!-- Auditoria -->
          <div style="background: #f8fafc; padding: 1rem; border-bottom: 1px solid #e2e8f0; border-top: 1px solid #e2e8f0; display: flex; align-items: center; gap: 0.5rem;">
            <span style="color: #5cb85c; font-size: 1.2rem;">🏷️</span>
            <h3 style="margin: 0; color: #334155; font-size: 1rem;">Historial Auditoria</h3>
          </div>
          <div style="padding: 2rem; display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
            <div style="border: 1px solid #e2e8f0; border-radius: 4px;">
              <div style="padding: 1rem; border-bottom: 1px solid #e2e8f0; background: #f8fafc; font-weight: bold; color: #64748b; font-size: 0.9rem;">Change Log</div>
              <div style="padding: 1rem; min-height: 100px; text-align: center; color: #94a3b8; font-size: 0.85rem;">
                <table style="width: 100%;">
                  <tr><th>Date</th><th>User</th></tr>
                  <tr><td colspan="2" style="padding-top: 1rem;">Sin cambios registrados</td></tr>
                </table>
              </div>
            </div>
            <div style="border: 1px solid #e2e8f0; border-radius: 4px;">
              <div style="padding: 1rem; border-bottom: 1px solid #e2e8f0; background: #f8fafc; font-weight: bold; color: #64748b; font-size: 0.9rem;">Detail</div>
              <div style="padding: 1rem; min-height: 100px;"></div>
            </div>
          </div>
        </div>
      }

      <!-- MODAL ELIMINAR -->
      @if (showDeleteModal()) {
        <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.5); z-index: 9999; display: flex; align-items: center; justify-content: center;">
          <div style="background: white; padding: 2rem; border-radius: 8px; width: 400px; text-align: center; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
            <div style="font-size: 3rem; color: #ef4444; margin-bottom: 1rem;">⚠️</div>
            <h2 style="margin-top: 0;">Confirmar Eliminación</h2>
            <p style="color: #64748b; margin-bottom: 2rem;">¿Estás seguro que deseas eliminar este registro permanentemente?</p>
            <div style="display: flex; gap: 1rem; justify-content: center;">
              <button (click)="showDeleteModal.set(false)" class="btn-cancel">Cancelar</button>
              <button (click)="confirmDelete()" class="btn-delete">Eliminar</button>
            </div>
          </div>
        </div>
      }

    </div>
  `,
  styles: [`
    .animate-move-up { animation: moveUp .3s ease-out; }
    @keyframes moveUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

    .animate-fade-in { animation: fadeIn .3s ease-out; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

    .table-row { transition: background-color 0.2s; background: white; }
    .table-row:hover { background: #f8fafc; }
    .table-row:hover td { background: #f8fafc; } /* Inherit hover background for sticky cells */

    .pagination-container { display:flex; justify-content:center; align-items:center; gap:.4rem; }
    .pag-btn { height:2.1rem; min-width:2.1rem; padding:0 .5rem; border-radius:4px; border:1px solid #cbd5e1; background:white; color:#475569; font-weight:600; font-size:.85rem; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all .2s; }
    .pag-btn:hover:not(:disabled) { background:#f8fafc; color:#0f172a; }
    .pag-btn:disabled { opacity:.4; cursor:not-allowed; }
    .pag-btn.active { background:#5cb85c; border-color:#5cb85c; color:white; }
    .pag-dots { font-size:.85rem; color:#94a3b8; font-weight:700; padding:0 .2rem; }
    
    .form-group { display: flex; flex-direction: column; }
    .form-group label { font-size: 0.85rem; color: #64748b; font-weight: 600; margin-bottom: 0.25rem; }
    .form-control { padding: 0.5rem; border: 1px solid #cbd5e1; border-radius: 4px; color: #334155; font-size: 0.9rem; }
    .form-control:disabled { background: #f1f5f9; color: #94a3b8; }
    
    .btn-cancel { padding: 0.6rem 1.5rem; background: #94a3b8; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600; transition: background 0.2s; }
    .btn-cancel:hover { background: #64748b; }
    .btn-save { padding: 0.6rem 1.5rem; background: #5cb85c; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600; transition: background 0.2s; }
    .btn-save:hover { background: #4cae4c; }
    .btn-delete { padding: 0.6rem 1.5rem; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600; transition: background 0.2s; }
    .btn-delete:hover { background: #dc2626; }
  `]
})
export class ProductoTerminadoComponent implements OnInit {
  private svc = inject(ProduccionService);
  private notify = inject(NotificationService);

  searchText = signal<string>('');
  sortColumn = signal<keyof ProductoTerminado | null>(null);
  sortDirection = signal<'asc' | 'desc'>('asc');
  currentPage = signal<number>(1);
  pageSize = signal<number>(10);
  isLoading = signal<boolean>(false);

  items = signal<ProductoTerminado[]>([]);

  viewMode = signal<boolean>(false);
  editMode = signal<boolean>(false);
  selectedItem = signal<ProductoTerminado | null>(null);
  form: Partial<ProductoTerminado> = {};
  saving = signal<boolean>(false);
  saveError = signal<string>('');

  showDeleteModal = signal<boolean>(false);
  itemToDelete = signal<string | null>(null);

  isFilterMenuOpen = false;
  isColumnsMenuOpen = false;
  isExportMenuOpen = false;
  savedFilters: any[] = [];

  columns: ColumnDef[] = [
    { key: 'terminadoPalets', label: 'Terminado Palets', visible: true, pin: 'none' },
    { key: 'carreteMiliar', label: 'Carrete Millar', visible: true, pin: 'none' },
    { key: 'paletMiliar', label: 'Palet Millar', visible: true, pin: 'none' },
    { key: 'terminadoPeso', label: 'Terminado Peso', visible: true, pin: 'none' },
    { key: 'pesoCarrete', label: 'Peso Carrete', visible: true, pin: 'none' },
    { key: 'pesoPalet', label: 'Peso Palet', visible: true, pin: 'none' },
    { key: 'conEtiqueta', label: 'Con Etiqueta', visible: true, pin: 'none' },
    { key: 'etiquetable', label: 'Etiquetable', visible: true, pin: 'none' },
    { key: 'producto', label: 'Producto', visible: true, pin: 'none' },
    { key: 'codigoSap', label: 'Código SAP', visible: true, pin: 'none' },
    { key: 'mrd', label: 'MRD', visible: true, pin: 'none' }
  ];

  ngOnInit() {
    this.loadSavedFiltersFromStorage();
    this.loadData();
    const savedFilter = localStorage.getItem('productoTerminadoSearch');
    if (savedFilter) {
      this.searchText.set(savedFilter);
    }
  }

  loadData() {
    this.isLoading.set(true);
    this.svc.getProductosTerminados().subscribe({
      next: (data) => {
        this.items.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.items.set([]);
        this.isLoading.set(false);
      }
    });
  }

  get activeColumns(): ColumnDef[] {
    // Ordenar: Fijas izquierda, No fijas, Fijas derecha
    const left = this.columns.filter(c => c.visible && c.pin === 'left');
    const none = this.columns.filter(c => c.visible && c.pin === 'none');
    const right = this.columns.filter(c => c.visible && c.pin === 'right');
    return [...left, ...none, ...right];
  }

  getColumnsByPin(pin: 'left' | 'right' | 'none'): ColumnDef[] {
    return this.columns.filter(c => c.pin === pin && c.visible);
  }

  togglePin(col: ColumnDef, pinState: 'left' | 'right') {
    if (col.pin === pinState) {
      col.pin = 'none'; // unpin
    } else {
      col.pin = pinState; // pin
      col.visible = true; // force visible
    }
  }

  onVisibilityChange(col: ColumnDef) {
    if (!col.visible) {
      col.pin = 'none';
    }
  }

  resetColumns() {
    this.columns.forEach(c => {
      c.visible = true;
      c.pin = 'none';
    });
  }

  getThStyle(col: ColumnDef): any {
    if (col.pin === 'left') return { position: 'sticky', left: '180px', zIndex: 15 }; // 60+60+60 = 180
    if (col.pin === 'right') return { position: 'sticky', right: '0', zIndex: 15 };
    return {};
  }

  getTdStyle(col: ColumnDef): any {
    if (col.pin === 'left') return { position: 'sticky', left: '180px', zIndex: 5 };
    if (col.pin === 'right') return { position: 'sticky', right: '0', zIndex: 5 };
    return {};
  }

  filteredItems = computed(() => {
    let list = this.items();
    const s = this.searchText().trim().toLowerCase();
    if (s) {
      list = list.filter(e =>
        (e.producto?.toLowerCase() || '').includes(s) ||
        (e.codigoSap?.toLowerCase() || '').includes(s)
      );
    }

    const col = this.sortColumn();
    if (col) {
      const dir = this.sortDirection() === 'asc' ? 1 : -1;
      list = [...list].sort((a: any, b: any) => {
        const va = a[col];
        const vb = b[col];
        if (va == null && vb == null) return 0;
        if (va == null) return -1 * dir;
        if (vb == null) return 1 * dir;
        if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir;
        return String(va).localeCompare(String(vb)) * dir;
      });
    }

    return list;
  });

  toggleSort(col: keyof ProductoTerminado) {
    if (this.sortColumn() === col) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(col);
      this.sortDirection.set('asc');
    }
  }

  paginatedItems = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredItems().slice(start, start + this.pageSize());
  });

  totalPages = computed(() => Math.ceil(this.filteredItems().length / this.pageSize()) || 1);

  toggleFilterMenu() {
    this.isFilterMenuOpen = !this.isFilterMenuOpen;
    this.isColumnsMenuOpen = false;
    this.isExportMenuOpen = false;
  }

  toggleColumnsMenu() {
    this.isColumnsMenuOpen = !this.isColumnsMenuOpen;
    this.isFilterMenuOpen = false;
    this.isExportMenuOpen = false;
  }

  toggleExportMenu() {
    this.isExportMenuOpen = !this.isExportMenuOpen;
    this.isFilterMenuOpen = false;
    this.isColumnsMenuOpen = false;
  }

  clearFilters() {
    this.searchText.set('');
    localStorage.removeItem('productoTerminadoSearch');
    this.isFilterMenuOpen = false;
  }

  loadSavedFiltersFromStorage() {
    const raw = localStorage.getItem('hicone_saved_filters_prod_term');
    this.savedFilters = raw ? JSON.parse(raw) : [];
  }

  saveFilters() {
    this.isFilterMenuOpen = false;
    const filterName = prompt('Ingrese el nombre para este filtro:', 'Filtro Producto Terminado ' + new Date().toLocaleDateString());
    if (!filterName) return;
    const newFilter = {
      id: 'F-' + Date.now(),
      name: filterName,
      state: { searchText: this.searchText() }
    };
    this.savedFilters.push(newFilter);
    localStorage.setItem('hicone_saved_filters_prod_term', JSON.stringify(this.savedFilters));
    this.notify.success('Filtro guardado con éxito.');
  }

  loadSavedFilter(f: any) {
    this.searchText.set(f.state?.searchText || '');
    this.currentPage.set(1);
    this.isFilterMenuOpen = false;
  }

  deleteSavedFilter(f: any, event: MouseEvent) {
    event.stopPropagation();
    this.savedFilters = this.savedFilters.filter(item => item.id !== f.id);
    localStorage.setItem('hicone_saved_filters_prod_term', JSON.stringify(this.savedFilters));
  }

  onSearchChange(value: string) {
    this.searchText.set(value);
    this.currentPage.set(1);
  }

  /* ── Pagination ───────────────────────────────────── */
  prevPage() { if (this.currentPage() > 1) this.currentPage.update(p => p - 1); }
  nextPage() { if (this.currentPage() < this.totalPages()) this.currentPage.update(p => p + 1); }
  setPage(p: number) { this.currentPage.set(p); }

  getPages(current: number, total: number): (number | string)[] {
    if (total <= 1) return [];
    const pages: (number | string)[] = [1];
    if (current > 3) pages.push('...');
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
    if (current < total - 2) pages.push('...');
    if (total > 1) pages.push(total);
    return pages;
  }

  /* ── Formularios y Modales ───────────────────────── */
  openView(item: ProductoTerminado) {
    this.selectedItem.set({...item});
    this.form = {...item};
    this.viewMode.set(true);
    this.editMode.set(false);
  }

  openEdit(item: ProductoTerminado) {
    this.selectedItem.set({...item});
    this.form = {...item};
    this.saveError.set('');
    this.editMode.set(true);
    this.viewMode.set(false);
  }

  openCreate() {
    this.selectedItem.set(null);
    this.form = {
      producto: '', codigoSap: '',
      terminadoPalets: 0, terminadoPeso: 0,
      carreteMiliar: 0, paletMiliar: 0,
      pesoCarrete: 0, pesoPalet: 0,
      conEtiqueta: false, etiquetable: true,
      mrd: 0
    };
    this.saveError.set('');
    this.editMode.set(true);
    this.viewMode.set(false);
  }

  cancelView() {
    this.viewMode.set(false);
    this.editMode.set(false);
    this.selectedItem.set(null);
    this.form = {};
  }

  saveEdit() {
    if (this.form.carreteMiliar != null && Number(this.form.carreteMiliar) % 1 !== 0) {
      this.notify.warning('El campo "Carrete Millar" solo acepta números enteros (sin decimales).');
      return;
    }
    if (this.form.paletMiliar != null && Number(this.form.paletMiliar) % 1 !== 0) {
      this.notify.warning('El campo "Palet Millar" solo acepta números enteros (sin decimales).');
      return;
    }
    if (this.form.terminadoPalets != null && Number(this.form.terminadoPalets) % 1 !== 0) {
      this.notify.warning('El campo "Terminado Palets" solo acepta números enteros (sin decimales).');
      return;
    }
    if (this.form.mrd != null && Number(this.form.mrd) % 1 !== 0) {
      this.notify.warning('El campo "MRD" solo acepta números enteros (sin decimales).');
      return;
    }

    this.saving.set(true);
    this.saveError.set('');

    const request = {
      producto: this.form.producto,
      codigoSap: this.form.codigoSap,
      terminadoPalets: this.form.terminadoPalets,
      terminadoPeso: this.form.terminadoPeso,
      carreteMiliar: this.form.carreteMiliar,
      paletMiliar: this.form.paletMiliar,
      pesoCarrete: this.form.pesoCarrete,
      pesoPalet: this.form.pesoPalet,
      conEtiqueta: this.form.conEtiqueta,
      etiquetable: this.form.etiquetable,
      mrd: this.form.mrd,
      tenantId: '00000000-0000-0000-0000-000000000001'
    };

    const done = () => {
      this.saving.set(false);
      this.notify.success('Producto terminado guardado exitosamente.');
      this.cancelView();
      this.loadData();
    };
    const onError = (err: any) => {
      this.saving.set(false);
      this.notify.error(err?.error?.message || 'Ocurrió un error al guardar.');
      this.saveError.set(err?.error?.message || 'Ocurrió un error al guardar.');
    };

    if (this.form.id) {
      this.svc.updateProductoTerminado(this.form.id, request).subscribe({ next: done, error: onError });
    } else {
      this.svc.createProductoTerminado(request).subscribe({ next: done, error: onError });
    }
  }

  openDeleteConfirm(id: string) {
    this.itemToDelete.set(id);
    this.showDeleteModal.set(true);
  }

  confirmDelete() {
    const id = this.itemToDelete();
    if (id) {
      this.svc.deleteProductoTerminado(id).subscribe({
        next: () => {
          this.notify.success('Registro eliminado exitosamente.');
          this.showDeleteModal.set(false);
          this.itemToDelete.set(null);
          if (this.viewMode() || this.editMode()) this.cancelView();
          this.loadData();
        },
        error: (err) => {
          console.error(err);
          this.notify.error('No se pudo eliminar el registro.');
          this.showDeleteModal.set(false);
          this.itemToDelete.set(null);
        }
      });
      return;
    }
    this.showDeleteModal.set(false);
    this.itemToDelete.set(null);
  }

  exportCSV() {
    this.isExportMenuOpen = false;
    const dataToExport = this.paginatedItems().map(item => {
      const row: any = {};
      this.activeColumns.forEach(col => {
        row[col.label] = item[col.key];
      });
      return row;
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'ProductoTerminado');

    XLSX.writeFile(wb, `producto_terminado_${new Date().toISOString().slice(0,10)}.xlsx`);
  }
}
