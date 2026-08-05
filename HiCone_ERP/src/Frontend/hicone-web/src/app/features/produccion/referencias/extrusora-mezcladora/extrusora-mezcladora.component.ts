import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '../../../../shared/directives/click-outside.directive';
import * as XLSX from 'xlsx';

export interface ExtrusoraMezcladora {
  id?: string;
  extrusoraId: string;
  extrusora: string;
  virgenMin: number;
  virgenMax: number;
  molidoMin: number;
  molidoMax: number;
  kgVirgen: number;
  kgMolido: number;
}

@Component({
  selector: 'app-extrusora-mezcladora',
  standalone: true,
  imports: [CommonModule, FormsModule, ClickOutsideDirective],
  template: `
    <div class="module-page animate-fade-in" style="padding: 3rem; background: #fff; min-height: calc(100vh - 64px); position: relative;">
      <div class="page-header-premium">
        <div class="title-section">
          <h1 class="premium-title">Extrusora Mezcladora</h1>
          <nav class="breadcrumb-modern">
            <span class="root">Producción</span>
            <span class="sep">&rsaquo;</span>
            <span class="root">Referencias</span>
            <span class="sep">&rsaquo;</span>
            <span class="active">Extrusora Mezcladora</span>
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
        <div style="display: flex; gap: 1rem; align-items: center;">
          <!-- Filter Dropdown Trigger -->
          <div style="position: relative;" (click)="toggleFilterMenu()" (clickOutside)="isFilterMenuOpen = false">
            <button style="background: none; border: none; color: #64748b; cursor: pointer; padding-right: 0.5rem; display: flex; align-items: center;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            </button>
            
            <!-- Filter Dropdown -->
            <div *ngIf="isFilterMenuOpen" style="position: absolute; top: 100%; right: 0; background: white; border: 1px solid #e2e8f0; border-radius: 4px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); z-index: 50; width: 200px; padding: 0.5rem;">
              <button (click)="clearFilters(); $event.stopPropagation()" style="display: block; width: 100%; text-align: left; padding: 0.5rem; border: none; background: none; cursor: pointer; color: #334155; font-size: 0.85rem;">Limpiar Filtros</button>
              <button style="display: block; width: 100%; text-align: left; padding: 0.5rem; border: none; background: none; cursor: pointer; color: #334155; font-size: 0.85rem;">Guardar Filtro como...</button>
            </div>
          </div>

          <div style="position: relative; width: 250px;">
            <input type="text" [ngModel]="searchText()" (ngModelChange)="onSearchChange($event)"
                   placeholder="Buscar" 
                   style="border: none; background: transparent; font-size: 0.9rem; outline: none; padding: 0.5rem; width: 100%; border-bottom: 2px solid transparent; transition: border-color 0.2s; color: #334155;" />
          </div>
        </div>
      </div>

      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; margin-top: 1rem; min-width: 1000px;">
          <thead>
            <tr>
              <!-- Acciones a la izquierda -->
              <th style="text-align: left; padding: 1rem; border-bottom: 1px solid #e2e8f0; width: 250px;"></th>
              
              <ng-container *ngFor="let col of columns">
                <th *ngIf="col.visible" style="text-align: left; padding: 1rem; color: #334155; font-size: 0.85rem; font-weight: bold; border-bottom: 1px solid #e2e8f0;">
                  {{ col.label }} <span *ngIf="col.key === 'extrusora'" style="color: #94a3b8; font-size: 0.7rem; margin-left: 0.3rem;">⚙️</span>
                </th>
              </ng-container>
            </tr>
          </thead>
          <tbody>
            @if (paginatedItems().length === 0) {
              <tr><td [attr.colspan]="visibleColsCount + 1" style="text-align:center; padding:2rem; color:#94a3b8; font-style:italic;">No se encontraron resultados.</td></tr>
            } @else {
              @for (item of paginatedItems(); track item.id) {
                <tr>
                  <td style="padding: 1rem; border-bottom: 1px solid #f1f5f9; text-align: left;">
                    <button (click)="openModal(item, true)" style="background: none; border: none; color: #5cb85c; cursor: pointer; font-size: 0.85rem; margin-right: 1rem;">Visualizar</button>
                    <button (click)="openModal(item, false)" style="background: none; border: none; color: #5cb85c; cursor: pointer; font-size: 0.85rem; margin-right: 1rem;">Modificar</button>
                    <button (click)="eliminar(item)" style="background: none; border: none; color: #5cb85c; cursor: pointer; font-size: 0.85rem;">Eliminar</button>
                  </td>

                  <td *ngIf="columns[0].visible" style="padding: 1rem; border-bottom: 1px solid #f1f5f9; color: #334155; font-size: 0.85rem;">{{ item.extrusora }}</td>
                  <td *ngIf="columns[1].visible" style="padding: 1rem; border-bottom: 1px solid #f1f5f9; color: #5cb85c; font-size: 0.85rem;">{{ item.virgenMin | number:'1.2-2' }}</td>
                  <td *ngIf="columns[2].visible" style="padding: 1rem; border-bottom: 1px solid #f1f5f9; color: #334155; font-size: 0.85rem;">{{ item.virgenMax | number:'1.2-2' }}</td>
                  <td *ngIf="columns[3].visible" style="padding: 1rem; border-bottom: 1px solid #f1f5f9; color: #334155; font-size: 0.85rem;">{{ item.molidoMin | number:'1.2-2' }}</td>
                  <td *ngIf="columns[4].visible" style="padding: 1rem; border-bottom: 1px solid #f1f5f9; color: #334155; font-size: 0.85rem;">{{ item.molidoMax | number:'1.2-2' }}</td>
                  <td *ngIf="columns[5].visible" style="padding: 1rem; border-bottom: 1px solid #f1f5f9; color: #334155; font-size: 0.85rem;">{{ item.kgVirgen | number:'1.2-2' }}</td>
                  <td *ngIf="columns[6].visible" style="padding: 1rem; border-bottom: 1px solid #f1f5f9; color: #334155; font-size: 0.85rem;">{{ item.kgMolido | number:'1.2-2' }}</td>
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
      <div *ngIf="isModalOpen" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;">
        <div class="animate-move-up" style="background: white; border-radius: 4px; width: 800px; max-width: 90%; box-shadow: 0 10px 25px rgba(0,0,0,0.1); overflow: hidden;">
          
          <!-- Header Modal -->
          <div style="background: white; padding: 1rem; border-bottom: 1px solid #e2e8f0;">
            <h2 style="margin: 0; font-size: 1rem; color: #334155; font-weight: 500; display: flex; align-items: center; gap: 0.5rem;">
              <span style="color: #5cb85c; font-size: 1.2rem;">🏷️</span> Información General
            </h2>
          </div>
          
          <!-- Body Modal -->
          <div style="padding: 2rem;">
            <div style="display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 2rem;">
              
              <!-- Fila 1 -->
              <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                <label style="font-size: 0.85rem; color: #475569; font-weight: 500;">Extrusora Id</label>
                <input type="text" [(ngModel)]="form.extrusoraId" [readonly]="isViewing" style="padding: 0.5rem 0; border: none; border-bottom: 1px solid #5cb85c; font-size: 0.9rem; outline: none; width: 100%; box-sizing: border-box;" [ngStyle]="{'color': isViewing ? '#94a3b8' : '#334155'}">
              </div>

              <!-- Fila 2 -->
              <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                <label style="font-size: 0.85rem; color: #475569; font-weight: 500;">Extrusora</label>
                <input type="text" [(ngModel)]="form.extrusora" [readonly]="isViewing" style="padding: 0.5rem 0; border: none; border-bottom: 1px solid #e2e8f0; font-size: 0.9rem; outline: none; width: 100%; box-sizing: border-box;" [ngStyle]="{'color': isViewing ? '#94a3b8' : '#334155'}">
              </div>

              <!-- Fila 3 -->
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                  <label style="font-size: 0.85rem; color: #475569; font-weight: 500;">Virgen Min</label>
                  <input type="number" [(ngModel)]="form.virgenMin" [readonly]="isViewing" style="padding: 0.5rem 0; border: none; border-bottom: 1px solid #e2e8f0; font-size: 0.9rem; outline: none; width: 100%; box-sizing: border-box;" [ngStyle]="{'color': isViewing ? '#94a3b8' : '#334155'}">
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                  <label style="font-size: 0.85rem; color: #475569; font-weight: 500;">Virgen Max</label>
                  <input type="number" [(ngModel)]="form.virgenMax" [readonly]="isViewing" style="padding: 0.5rem 0; border: none; border-bottom: 1px solid #e2e8f0; font-size: 0.9rem; outline: none; width: 100%; box-sizing: border-box;" [ngStyle]="{'color': isViewing ? '#94a3b8' : '#334155'}">
                </div>
              </div>

              <!-- Fila 4 -->
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                  <label style="font-size: 0.85rem; color: #475569; font-weight: 500;">Molido Min</label>
                  <input type="number" [(ngModel)]="form.molidoMin" [readonly]="isViewing" style="padding: 0.5rem 0; border: none; border-bottom: 1px solid #e2e8f0; font-size: 0.9rem; outline: none; width: 100%; box-sizing: border-box;" [ngStyle]="{'color': isViewing ? '#94a3b8' : '#334155'}">
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                  <label style="font-size: 0.85rem; color: #475569; font-weight: 500;">Molido Max</label>
                  <input type="number" [(ngModel)]="form.molidoMax" [readonly]="isViewing" style="padding: 0.5rem 0; border: none; border-bottom: 1px solid #e2e8f0; font-size: 0.9rem; outline: none; width: 100%; box-sizing: border-box;" [ngStyle]="{'color': isViewing ? '#94a3b8' : '#334155'}">
                </div>
              </div>

              <!-- Fila 5 -->
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                  <label style="font-size: 0.85rem; color: #475569; font-weight: 500;">Kg Virgen</label>
                  <input type="number" [(ngModel)]="form.kgVirgen" [readonly]="isViewing" style="padding: 0.5rem 0; border: none; border-bottom: 1px solid #e2e8f0; font-size: 0.9rem; outline: none; width: 100%; box-sizing: border-box;" [ngStyle]="{'color': isViewing ? '#94a3b8' : '#334155'}">
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                  <label style="font-size: 0.85rem; color: #475569; font-weight: 500;">Kg Molido</label>
                  <input type="number" [(ngModel)]="form.kgMolido" [readonly]="isViewing" style="padding: 0.5rem 0; border: none; border-bottom: 1px solid #e2e8f0; font-size: 0.9rem; outline: none; width: 100%; box-sizing: border-box;" [ngStyle]="{'color': isViewing ? '#94a3b8' : '#334155'}">
                </div>
              </div>

            </div>

            <div style="display: flex; gap: 1rem;">
              <button *ngIf="!isViewing" (click)="saveModal()" style="background: #5cb85c; color: white; border: none; padding: 0.5rem 2rem; border-radius: 4px; cursor: pointer; font-size: 0.85rem;">CONFIRMAR</button>
              <button (click)="closeModal()" style="background: #94a3b8; color: white; border: none; padding: 0.5rem 2rem; border-radius: 4px; cursor: pointer; font-size: 0.85rem;">{{ isViewing ? 'CERRAR' : 'CANCELAR' }}</button>
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
export class ExtrusoraMezcladoraComponent implements OnInit {
  searchText = signal<string>('');
  currentPage = signal<number>(1);
  pageSize = signal<number>(10);

  // Datos simulados por ahora
  items = signal<ExtrusoraMezcladora[]>([]);

  isFilterMenuOpen = false;
  isColumnsMenuOpen = false;
  isExportMenuOpen = false;

  columns = [
    { key: 'extrusora', label: 'Extrusora', visible: true },
    { key: 'virgenMin', label: 'Virgen Min', visible: true },
    { key: 'virgenMax', label: 'Virgen Max', visible: true },
    { key: 'molidoMin', label: 'Molido Min', visible: true },
    { key: 'molidoMax', label: 'Molido Max', visible: true },
    { key: 'kgVirgen', label: 'Kg Virgen', visible: true },
    { key: 'kgMolido', label: 'Kg Molido', visible: true }
  ];

  get visibleColsCount() {
    return this.columns.filter(c => c.visible).length;
  }

  filteredItems = computed(() => {
    let list = this.items();
    const s = this.searchText().trim().toLowerCase();
    if (s) {
      list = list.filter(e => e.extrusora?.toLowerCase().includes(s));
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
  form: ExtrusoraMezcladora = this.getEmptyForm();

  ngOnInit() {
    // La data será proveída por la API o cargada dinámicamente.
    this.items.set([]);
  }

  getEmptyForm(): ExtrusoraMezcladora {
    return {
      extrusoraId: '0',
      extrusora: '',
      virgenMin: 0.00,
      virgenMax: 0.00,
      molidoMin: 0.00,
      molidoMax: 0.00,
      kgVirgen: 0.00,
      kgMolido: 0.00
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

  onSearchChange(value: string) {
    this.searchText.set(value);
    this.currentPage.set(1);
  }

  openModal(item: ExtrusoraMezcladora | null, isViewing: boolean) {
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
    // Si estamos editando y tiene ID
    if (this.form.id) {
      const current = this.items();
      const index = current.findIndex(x => x.id === this.form.id);
      if (index !== -1) {
        current[index] = { ...this.form };
        this.items.set([...current]);
      }
    } else {
      // Es un registro nuevo
      const newItem = { ...this.form, id: Date.now().toString() };
      this.items.set([newItem, ...this.items()]);
    }
    this.closeModal();
  }

  eliminar(item: ExtrusoraMezcladora) {
    if (confirm(`¿Estás seguro de eliminar el registro de ${item.extrusora}?`)) {
      const current = this.items().filter(x => x.id !== item.id);
      this.items.set(current);
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
      if (this.columns[0].visible) row[this.columns[0].label] = item.extrusora;
      if (this.columns[1].visible) row[this.columns[1].label] = item.virgenMin;
      if (this.columns[2].visible) row[this.columns[2].label] = item.virgenMax;
      if (this.columns[3].visible) row[this.columns[3].label] = item.molidoMin;
      if (this.columns[4].visible) row[this.columns[4].label] = item.molidoMax;
      if (this.columns[5].visible) row[this.columns[5].label] = item.kgVirgen;
      if (this.columns[6].visible) row[this.columns[6].label] = item.kgMolido;
      return row;
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'ExtrusoraMezcladora');

    XLSX.writeFile(wb, `extrusora_mezcladora_${new Date().toISOString().slice(0,10)}.xlsx`);
  }
}
