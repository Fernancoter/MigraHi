import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '../../../../shared/directives/click-outside.directive';
import { ProduccionService } from '../../../../core/services/produccion';
import { NotificationService } from '../../../../core/services/notification.service';
import * as XLSX from 'xlsx';

export interface PrensaProducto {
  id?: string;
  prensaId?: string;
  prensa: string;
  item: string;
  carrete: string;
  aplicarFiltro: boolean;
}

@Component({
  selector: 'app-prensa-producto',
  standalone: true,
  imports: [CommonModule, FormsModule, ClickOutsideDirective],
  template: `
    <div class="module-page animate-fade-in" style="padding: 3rem; background: #fff; min-height: calc(100vh - 64px); position: relative;">
      <div class="page-header-premium">
        <div class="title-section">
          <h1 class="premium-title">Prensa Producto</h1>
          <nav class="breadcrumb-modern">
            <span class="root">Prensado</span>
            <span class="sep">&rsaquo;</span>
            <span class="active">Prensa Producto</span>
          </nav>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; margin-bottom: 1rem; padding-bottom: 0.5rem;">
        
        <!-- Izquierda: Exportar, Agregar, Selecciona columnas -->
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
          <button (click)="openModal(null, false)" style="background: white; color: #5cb85c; border: 1px solid #5cb85c; padding: 0.5rem 1.5rem; border-radius: 4px; cursor: pointer; font-size: 0.85rem;">Agregar</button>

          <!-- Selecciona Columnas -->
          <div style="position: relative;" (clickOutside)="isColumnsMenuOpen = false">
            <button (click)="toggleColumnsMenu()" style="background: #5cb85c; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font-size: 0.85rem; display: flex; align-items: center; gap: 0.5rem;">
              Selecciona columnas <span style="font-size: 0.6rem;">▼</span>
            </button>
            <div *ngIf="isColumnsMenuOpen" style="position: absolute; top: 100%; left: 0; background: white; border: 1px solid #e2e8f0; border-radius: 4px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); z-index: 50; width: 250px; padding: 1rem; margin-top: 0.5rem;">
              <input type="text" placeholder="" style="width: 100%; padding: 0.5rem; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 0.8rem; margin-bottom: 1rem; box-sizing: border-box;" />
              
              <div style="max-height: 300px; overflow-y: auto;">
                <div style="font-size: 0.8rem; color: #64748b; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                  <input type="checkbox" checked /> Fijas a la izquierda <span style="font-size: 0.6rem;">▼</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; font-size: 0.85rem; color: #334155; padding-left: 1.5rem;">
                  <input type="checkbox" checked disabled /> (Ninguna)
                </div>

                <div style="font-size: 0.8rem; color: #64748b; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                  <input type="checkbox" checked /> No fijas <span style="font-size: 0.6rem;">▼</span>
                </div>
                <div *ngFor="let col of columns" style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; font-size: 0.85rem; color: #334155; padding-left: 1.5rem;">
                  <input type="checkbox" [(ngModel)]="col.visible" /> {{ col.label }}
                </div>

                <div style="font-size: 0.8rem; color: #64748b; margin-top: 1rem; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                  <input type="checkbox" checked /> Fijas a la derecha <span style="font-size: 0.6rem;">▼</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; font-size: 0.85rem; color: #334155; padding-left: 1.5rem;">
                  <input type="checkbox" checked disabled /> (Ninguna)
                </div>
              </div>
              
              <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                <button style="background: #5cb85c; color: white; border: none; padding: 0.5rem; border-radius: 4px; cursor: pointer; width: 40px; font-size: 1.1rem; display: flex; align-items: center; justify-content: center;">↺</button>
                <button style="background: #5cb85c; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; flex-grow: 1;">Actualizar</button>
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
            <div *ngIf="isFilterMenuOpen" style="position: absolute; top: 100%; right: 0; background: white; border: 1px solid #e2e8f0; border-radius: 4px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); z-index: 99999; width: 200px; padding: 0.5rem;" (click)="$event.stopPropagation()">
              <button (click)="clearFilters(); $event.stopPropagation()" style="display: block; width: 100%; text-align: left; padding: 0.5rem; border: none; background: none; cursor: pointer; color: #334155; font-size: 0.85rem;">Limpiar Filtros</button>
              <button (click)="saveFilter(); $event.stopPropagation()" style="display: block; width: 100%; text-align: left; padding: 0.5rem; border: none; background: none; cursor: pointer; color: #334155; font-size: 0.85rem;">Guardar Filtro como...</button>
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

      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; margin-top: 1rem; min-width: 800px;">
          <thead>
            <tr>
              <!-- Acciones a la izquierda -->
              <th style="text-align: left; padding: 1rem; border-bottom: 1px solid #e2e8f0; width: 250px;"></th>
              
              <ng-container *ngFor="let col of columns">
                <th *ngIf="col.visible" style="text-align: left; padding: 1rem; color: #334155; font-size: 0.85rem; font-weight: bold; border-bottom: 1px solid #e2e8f0;">
                  {{ col.label }} <span style="color: #94a3b8; font-size: 0.7rem; margin-left: 0.3rem;">▼</span>
                </th>
              </ng-container>
            </tr>
          </thead>
          <tbody>
            @if (isLoading()) {
              <tr><td colspan="4" style="text-align:center; padding:2rem; color:#94a3b8;">Cargando...</td></tr>
            } @else if (paginatedItems().length === 0) {
              <tr><td [attr.colspan]="visibleColsCount + 1" style="text-align:center; padding:2rem; color:#94a3b8; font-style:italic;">No se encontraron resultados.</td></tr>
            } @else {
              @for (item of paginatedItems(); track item.id) {
                <tr>
                  <td style="padding: 1rem; border-bottom: 1px solid #f1f5f9; text-align: left;">
                    <button (click)="openModal(item, true)" style="background: none; border: none; color: #5cb85c; cursor: pointer; font-size: 0.85rem; margin-right: 1rem;">Visualizar</button>
                    <button (click)="openModal(item, false)" style="background: none; border: none; color: #5cb85c; cursor: pointer; font-size: 0.85rem; margin-right: 1rem;">Modificar</button>
                    <button (click)="eliminar(item)" style="background: none; border: none; color: #5cb85c; cursor: pointer; font-size: 0.85rem;">Eliminar</button>
                  </td>

                  <td *ngIf="columns[0].visible" style="padding: 1rem; border-bottom: 1px solid #f1f5f9; color: #334155; font-size: 0.85rem;">{{ item.prensa }}</td>
                  <td *ngIf="columns[1].visible" style="padding: 1rem; border-bottom: 1px solid #f1f5f9; color: #334155; font-size: 0.85rem;">{{ item.item }}</td>
                  <td *ngIf="columns[2].visible" style="padding: 1px; border-bottom: 1px solid #f1f5f9; color: #334155; font-size: 0.85rem;">{{ item.carrete }}</td>
                </tr>
              }
            }
          </tbody>
        </table>
      </div>

      <!-- Paginación -->
      @if (totalPages() > 1) {
        <div class="pagination-container">
          <button class="pag-btn" [disabled]="currentPage() === 1" (click)="prevPage()">‹</button>
          @for (p of getPages(currentPage(), totalPages()); track $index) {
            @if (p === '...') { <span class="pag-dots">...</span> }
            @else { <button class="pag-btn" [class.active]="currentPage() === p" (click)="setPage($any(p))">{{ p }}</button> }
          }
          <button class="pag-btn" [disabled]="currentPage() === totalPages()" (click)="nextPage()">›</button>
        </div>
      }

      <!-- Modal Agregar/Modificar/Visualizar -->
      <div *ngIf="isModalOpen" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; overflow-y: auto; padding: 2rem 0;">
        <div class="animate-move-up" style="background: #f8fafc; border-radius: 4px; width: 900px; max-width: 95%; box-shadow: 0 10px 25px rgba(0,0,0,0.1); overflow: hidden; margin: auto;">
          
          <!-- Header Modal -->
          <div style="background: white; padding: 1rem; border-bottom: 1px solid #e2e8f0;">
            <h2 style="margin: 0; font-size: 1rem; color: #334155; font-weight: 500; display: flex; align-items: center; gap: 0.5rem;">
              <span style="color: #5cb85c; font-size: 1.2rem;">🏷️</span> Información General
            </h2>
          </div>
          
          <!-- Body Modal -->
          <div style="padding: 2rem; background: white;">
            
            <div style="display: flex; flex-direction: column; gap: 2rem; margin-bottom: 2rem;">
              
              <!-- Prensa text -->
              <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                <label style="font-size: 0.8rem; color: #64748b; font-weight: 500;">Prensa</label>
                <div style="font-size: 1rem; color: #475569; padding-bottom: 0.5rem; border-bottom: 1px solid #e2e8f0;">
                  <ng-container *ngIf="isViewing || form.id">{{ form.prensa || '' }}</ng-container>
                  <select *ngIf="!isViewing && !form.id" [(ngModel)]="form.prensaId" style="border: none; outline: none; width: 100%; font-size: 1rem; color: #475569; background: transparent;">
                    <option [ngValue]="undefined">-- Selecciona una prensa --</option>
                    @for (p of prensas(); track p.id) { <option [ngValue]="p.id">{{ p.nombre }}</option> }
                  </select>
                </div>
              </div>

              <!-- Inputs central -->
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <!-- Columna Izquierda -->
                <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                  <div style="display: flex; align-items: flex-end; gap: 1rem;">
                    <label style="font-size: 0.8rem; color: #64748b; font-weight: 500; min-width: 120px; text-align: right;">Producto/Bobina</label>
                    <input type="text" [(ngModel)]="form.item" [readonly]="isViewing" style="padding: 0.2rem 0; border: none; border-bottom: 1px solid #e2e8f0; font-size: 0.9rem; outline: none; flex-grow: 1;" [ngStyle]="{'color': isViewing ? '#94a3b8' : '#334155'}">
                  </div>
                  
                  <div style="display: flex; align-items: flex-end; gap: 1rem; margin-left: 2rem;">
                    <label style="font-size: 0.8rem; color: #64748b; font-weight: 500; min-width: 120px; text-align: right;">Producto/Carrete</label>
                    <input type="text" [(ngModel)]="form.carrete" [readonly]="isViewing" style="padding: 0.2rem 0; border: none; border-bottom: 1px solid #e2e8f0; font-size: 0.9rem; outline: none; flex-grow: 1;" [ngStyle]="{'color': isViewing ? '#94a3b8' : '#334155'}">
                  </div>
                </div>

                <!-- Columna Derecha -->
                <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                  <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    <label style="font-size: 0.8rem; color: #64748b; font-weight: 500;">Aplicar filtros para dependencia de Producto</label>
                    <div>
                      <input type="checkbox" [(ngModel)]="form.aplicarFiltro" [disabled]="isViewing" style="width: 1rem; height: 1rem; border: 1px solid #cbd5e1;">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          
          <div style="padding: 1rem 2rem; background: #fff; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0;">
            <button *ngIf="!isViewing" (click)="saveModal()" style="background: #5cb85c; color: white; border: none; padding: 0.5rem 2rem; border-radius: 4px; cursor: pointer; font-size: 0.85rem; margin-right: 1rem;">CONFIRMAR</button>
            <button (click)="closeModal()" style="background: #94a3b8; color: white; border: none; padding: 0.5rem 2rem; border-radius: 4px; cursor: pointer; font-size: 0.85rem;">{{ isViewing ? 'CERRAR' : 'CANCELAR' }}</button>
          </div>

          <!-- Historial Auditoria -->
          <div style="background: white; padding: 1rem; border-bottom: 1px solid #e2e8f0; margin-top: 1rem;">
            <h2 style="margin: 0; font-size: 1rem; color: #334155; font-weight: 500; display: flex; align-items: center; gap: 0.5rem;">
              <span style="color: #5cb85c; font-size: 1.2rem;">🏷️</span> Historial Auditoria
            </h2>
          </div>
          
          <div style="padding: 1rem 2rem 2rem 2rem; display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; background: #f8fafc;">
            <!-- Change Log -->
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 4px;">
              <div style="padding: 0.75rem 1rem; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; color: #475569;">
                <span style="color: #5cb85c;">🏷️</span> Change Log
              </div>
              <div style="padding: 1rem;">
                <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; margin-bottom: 3rem;">
                  <thead>
                    <tr>
                      <th style="text-align: left; padding: 0.5rem; border-bottom: 1px solid #e2e8f0; color: #334155;">Date</th>
                      <th style="text-align: left; padding: 0.5rem; border-bottom: 1px solid #e2e8f0; color: #334155;">User</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colspan="2" style="padding: 1rem; text-align: center; color: #94a3b8; font-style: italic;">No changes</td>
                    </tr>
                  </tbody>
                </table>
                <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
                  <button style="border: 1px solid #e2e8f0; background: white; padding: 0.2rem 0.8rem; font-size: 0.8rem; color: #94a3b8; border-radius: 2px;">Ant</button>
                  <button style="border: 1px solid #e2e8f0; background: white; padding: 0.2rem 0.8rem; font-size: 0.8rem; color: #5cb85c; border-radius: 2px;">Sig</button>
                </div>
              </div>
            </div>

            <!-- Detail -->
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 4px;">
              <div style="padding: 0.75rem 1rem; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; color: #475569;">
                <span style="color: #5cb85c;">🏷️</span> Detail
              </div>
              <div style="padding: 1rem;">
                <!-- Vacío en la imagen -->
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-move-up { animation: moveUp .3s ease-out; }
    @keyframes moveUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

    .pagination-container { display:flex; justify-content:center; align-items:center; gap:.4rem; margin-top:1.5rem; }
    .pag-btn { height:2.1rem; min-width:2.1rem; padding:0 .5rem; border-radius:4px; border:1px solid #cbd5e1; background:white; color:#475569; font-weight:600; font-size:.85rem; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all .2s; }
    .pag-btn:hover:not(:disabled) { background:#f8fafc; color:#0f172a; }
    .pag-btn:disabled { opacity:.4; cursor:not-allowed; }
    .pag-btn.active { background:#5cb85c; border-color:#5cb85c; color:white; }
    .pag-dots { font-size:.85rem; color:#94a3b8; font-weight:700; padding:0 .2rem; }
  `]
})
export class PrensaProductoComponent implements OnInit {
  private svc = inject(ProduccionService);
  private notify = inject(NotificationService);

  searchText = signal<string>('');
  currentPage = signal<number>(1);
  pageSize = signal<number>(10);
  isLoading = signal<boolean>(false);

  items = signal<PrensaProducto[]>([]);
  prensas = signal<any[]>([]);

  isFilterMenuOpen = false;
  isColumnsMenuOpen = false;
  isExportMenuOpen = false;
  savedFilters: any[] = [];

  columns = [
    { key: 'prensa', label: 'Prensa', visible: true },
    { key: 'item', label: 'Item', visible: true },
    { key: 'carrete', label: 'Carrete', visible: true }
  ];

  get visibleColsCount() {
    return this.columns.filter(c => c.visible).length;
  }

  filteredItems = computed(() => {
    let list = this.items();
    const s = this.searchText().trim().toLowerCase();
    if (s) {
      list = list.filter(e => e.item?.toLowerCase().includes(s) || e.carrete?.toLowerCase().includes(s) || e.prensa?.toLowerCase().includes(s));
    }
    return list;
  });

  paginatedItems = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredItems().slice(start, start + this.pageSize());
  });

  totalPages = computed(() => Math.ceil(this.filteredItems().length / this.pageSize()) || 1);

  isModalOpen = false;
  isViewing = false;
  form: PrensaProducto = this.getEmptyForm();

  ngOnInit() {
    this.loadSavedFiltersFromStorage();
    this.loadData();
    this.svc.getPrensas().subscribe({ next: (data) => this.prensas.set(data), error: (err) => console.error(err) });
  }

  loadData() {
    this.isLoading.set(true);
    this.svc.getPrensaProductos().subscribe({
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

  getEmptyForm(): PrensaProducto {
    return {
      prensa: '',
      item: '',
      carrete: '',
      aplicarFiltro: false
    };
  }

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
    this.isFilterMenuOpen = false;
  }

  loadSavedFiltersFromStorage() {
    const raw = localStorage.getItem('hicone_saved_filters_prensa_prod');
    this.savedFilters = raw ? JSON.parse(raw) : [];
  }

  saveFilter() {
    this.isFilterMenuOpen = false;
    const filterName = prompt('Ingrese el nombre para este filtro:', 'Filtro Prensa-Producto ' + new Date().toLocaleDateString());
    if (!filterName) return;
    const newFilter = {
      id: 'F-' + Date.now(),
      name: filterName,
      state: { searchText: this.searchText() }
    };
    this.savedFilters.push(newFilter);
    localStorage.setItem('hicone_saved_filters_prensa_producto', JSON.stringify(this.savedFilters));
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
    localStorage.setItem('hicone_saved_filters_prensa_prod', JSON.stringify(this.savedFilters));
  }

  onSearchChange(value: string) {
    this.searchText.set(value);
    this.currentPage.set(1);
  }

  openModal(item: PrensaProducto | null, isViewing: boolean) {
    this.isViewing = isViewing;
    if (item) {
      this.form = { ...item };
    } else {
      this.form = this.getEmptyForm();
    }
    this.isModalOpen = true;
    this.isFilterMenuOpen = false;
    this.isColumnsMenuOpen = false;
    this.isExportMenuOpen = false;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveModal() {
    if (!this.form.id && !this.form.prensaId) {
      this.notify.warning('Selecciona una prensa.');
      return;
    }

    const request = {
      prensaId: this.form.prensaId,
      item: this.form.item,
      carrete: this.form.carrete,
      tenantId: '00000000-0000-0000-0000-000000000001'
    };

    if (this.form.id) {
      this.svc.updatePrensaProducto(this.form.id, request).subscribe({
        next: () => {
          this.notify.success('Registro de prensa producto actualizado exitosamente.');
          this.closeModal();
          this.loadData();
        },
        error: (err) => { console.error(err); this.notify.error('No se pudo guardar el cambio.'); }
      });
    } else {
      this.svc.createPrensaProducto(request).subscribe({
        next: () => {
          this.notify.success('Registro de prensa producto creado exitosamente.');
          this.closeModal();
          this.loadData();
        },
        error: (err) => { console.error(err); this.notify.error('No se pudo crear el registro.'); }
      });
    }
  }

  eliminar(item: PrensaProducto) {
    if (!item.id) return;
    if (confirm(`¿Estás seguro de eliminar el registro de la prensa ${item.prensa}?`)) {
      this.svc.deletePrensaProducto(item.id).subscribe({
        next: () => {
          this.notify.success('Registro eliminado exitosamente.');
          this.loadData();
        },
        error: (err) => { console.error(err); this.notify.error('No se pudo eliminar el registro.'); }
      });
    }
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

  exportCSV() {
    this.isExportMenuOpen = false;
    const dataToExport = this.paginatedItems().map(item => {
      const row: any = {};
      if (this.columns[0].visible) row[this.columns[0].label] = item.prensa;
      if (this.columns[1].visible) row[this.columns[1].label] = item.item;
      if (this.columns[2].visible) row[this.columns[2].label] = item.carrete;
      return row;
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'PrensaProducto');

    XLSX.writeFile(wb, `prensa_producto_${new Date().toISOString().slice(0,10)}.xlsx`);
  }
}
