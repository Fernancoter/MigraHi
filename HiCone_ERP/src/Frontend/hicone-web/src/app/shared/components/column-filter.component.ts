import { Component, Input, Output, EventEmitter, ElementRef, HostListener, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-column-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="title-filter-wrapper">
      <!-- Título de la columna con la flecha clickeable -->
      <div class="title-header-btn" (click)="togglePopover($event)" [class.is-filtered]="hasActiveFilter()">
        <span class="title-text">{{ title }}</span>
        <span class="filter-arrow">{{ isOpen ? '▴' : '▾' }}</span>
        <span *ngIf="hasActiveFilter()" class="active-dot">●</span>
      </div>

      <!-- POPUP FLOTANTE DE FILTRO POR COLUMNA (ESTILO QA WORKWITHPLUS) -->
      <div *ngIf="isOpen" class="filter-popover-card shadow-premium" (click)="$event.stopPropagation()">
        
        <!-- Opciones de Ordenamiento (Asc / Desc) -->
        <div class="popover-sort-section" *ngIf="sortable">
          <button class="sort-opt-btn" (click)="applySort('asc')">
            <span class="sort-icon">⬆</span> Ordenar Ascendente
          </button>
          <button class="sort-opt-btn" (click)="applySort('desc')">
            <span class="sort-icon">⬇</span> Ordenar Descendente
          </button>
          <div class="popover-divider"></div>
        </div>

        <div class="popover-body-content">
          <!-- Filtro tipo Texto libre -->
          <div *ngIf="type === 'text'" class="filter-group">
            <label class="filter-label">Buscar en {{ title }}:</label>
            <div class="input-with-clear">
              <input
                type="text"
                class="popover-input"
                placeholder="Escribe para buscar..."
                [(ngModel)]="filterValue"
                (keyup.enter)="applyFilter()"
              />
              <span *ngIf="filterValue" class="clear-icon" (click)="filterValue = ''">✖</span>
            </div>
          </div>

          <!-- Filtro tipo Desplegable / Seleccionar -->
          <div *ngIf="type === 'select'" class="filter-group">
            <label class="filter-label">Seleccionar {{ title }}:</label>
            <select class="popover-select" [(ngModel)]="filterValue">
              <option value="">(Todos)</option>
              <option *ngFor="let opt of parsedOptions" [value]="opt.value">{{ opt.label }}</option>
            </select>
          </div>

          <!-- Filtro tipo Rango Numérico -->
          <div *ngIf="type === 'range'" class="filter-group">
            <label class="filter-label">Rango {{ title }}:</label>
            <div class="range-inputs-row">
              <input
                type="number"
                class="popover-input range-box"
                placeholder="Desde / Min"
                [(ngModel)]="minValue"
              />
              <span class="range-dash">-</span>
              <input
                type="number"
                class="popover-input range-box"
                placeholder="Hasta / Max"
                [(ngModel)]="maxValue"
              />
            </div>
          </div>

          <!-- Filtro tipo Rango Fecha -->
          <div *ngIf="type === 'dateRange'" class="filter-group">
            <label class="filter-label">Rango de Fechas:</label>
            <div class="date-inputs-row">
              <div class="date-field">
                <span class="date-lbl">Desde:</span>
                <input type="date" class="popover-input date-box" [(ngModel)]="minDate" />
              </div>
              <div class="date-field">
                <span class="date-lbl">Hasta:</span>
                <input type="date" class="popover-input date-box" [(ngModel)]="maxDate" />
              </div>
            </div>
          </div>
        </div>

        <!-- Botones de Acción (Limpiar / Aplicar) -->
        <div class="popover-footer-actions">
          <button class="btn-popover-clear" (click)="clearFilter()">Limpiar</button>
          <button class="btn-popover-apply" (click)="applyFilter()">Aplicar</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .title-filter-wrapper {
      position: relative;
      display: inline-flex;
      align-items: center;
      width: 100%;
      user-select: none;
    }

    .title-header-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      padding: 2px 4px;
      border-radius: 4px;
      transition: background 0.15s ease;
      font-weight: inherit;
    }

    .title-header-btn:hover {
      background: rgba(0, 0, 0, 0.05);
    }

    .title-header-btn.is-filtered {
      color: #10b981;
      font-weight: 700;
    }

    .filter-arrow {
      font-size: 0.75rem;
      opacity: 0.7;
    }

    .active-dot {
      font-size: 0.6rem;
      color: #10b981;
      margin-left: 2px;
    }

    /* POPOVER CARD FLOTANTE ESTILO QA */
    .filter-popover-card {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      min-width: 220px;
      max-width: 280px;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.18);
      z-index: 9999;
      padding: 10px 12px;
      font-size: 0.8rem;
      color: #334155;
      text-align: left;
    }

    .popover-sort-section {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 8px;
    }

    .sort-opt-btn {
      background: none;
      border: none;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.78rem;
      color: #475569;
      cursor: pointer;
      text-align: left;
      width: 100%;
    }

    .sort-opt-btn:hover {
      background: #f1f5f9;
      color: #1e293b;
    }

    .sort-icon {
      font-size: 0.85rem;
      color: #64748b;
    }

    .popover-divider {
      height: 1px;
      background: #e2e8f0;
      margin: 4px 0;
    }

    .filter-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 10px;
    }

    .filter-label {
      font-size: 0.75rem;
      font-weight: 600;
      color: #64748b;
    }

    .input-with-clear {
      position: relative;
      display: flex;
      align-items: center;
    }

    .popover-input, .popover-select {
      width: 100%;
      padding: 5px 8px;
      font-size: 0.8rem;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      outline: none;
      background: #ffffff;
      color: #1e293b;
      box-sizing: border-box;
    }

    .popover-input:focus, .popover-select:focus {
      border-color: #4caf50;
      box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.15);
    }

    .clear-icon {
      position: absolute;
      right: 8px;
      cursor: pointer;
      font-size: 0.7rem;
      color: #94a3b8;
    }

    .clear-icon:hover {
      color: #ef4444;
    }

    .range-inputs-row {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .range-box {
      width: 50%;
    }

    .range-dash {
      font-size: 0.8rem;
      color: #94a3b8;
    }

    .date-inputs-row {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .date-field {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
    }

    .date-lbl {
      font-size: 0.72rem;
      color: #64748b;
    }

    .date-box {
      width: 140px;
    }

    /* ACCIONES DE PIE (LIMPIAR / APLICAR) */
    .popover-footer-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid #e2e8f0;
    }

    .btn-popover-clear {
      background: none;
      border: none;
      color: #64748b;
      font-weight: 600;
      font-size: 0.75rem;
      cursor: pointer;
      padding: 4px 8px;
    }

    .btn-popover-clear:hover {
      color: #ef4444;
    }

    .btn-popover-apply {
      background: #4caf50;
      border: none;
      color: #ffffff;
      font-weight: 600;
      font-size: 0.75rem;
      padding: 4px 12px;
      border-radius: 4px;
      cursor: pointer;
    }

    .btn-popover-apply:hover {
      background: #43a047;
    }
  `]
})
export class ColumnFilterComponent implements OnInit, OnDestroy {
  private elementRef = inject(ElementRef);

  // Event bus estático para notificar a otras columnas que se cierren automáticamente
  private static activeFilter$ = new Subject<ColumnFilterComponent>();
  private activeSub?: Subscription;

  @Input() title: string = '';
  @Input() type: 'text' | 'select' | 'range' | 'dateRange' = 'text';
  @Input() placeholder: string = '';
  @Input() options: any[] = [];
  @Input() sortable: boolean = true;

  @Output() filterChange = new EventEmitter<any>();
  @Output() sortChange = new EventEmitter<'asc' | 'desc'>();

  isOpen: boolean = false;

  filterValue: any = '';
  minValue: number | null = null;
  maxValue: number | null = null;
  minDate: string = '';
  maxDate: string = '';

  ngOnInit() {
    // Escuchar cuando cualquier otra columna abre su popover para cerrar esta
    this.activeSub = ColumnFilterComponent.activeFilter$.subscribe(openedComp => {
      if (openedComp !== this) {
        this.isOpen = false;
      }
    });
  }

  ngOnDestroy() {
    this.activeSub?.unsubscribe();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.isOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  togglePopover(event: MouseEvent) {
    event.stopPropagation();
    const willOpen = !this.isOpen;
    this.isOpen = willOpen;
    if (willOpen) {
      ColumnFilterComponent.activeFilter$.next(this);
    }
  }

  get parsedOptions(): { label: string; value: any }[] {
    if (!this.options) return [];
    return this.options.map(opt => {
      if (typeof opt === 'object' && opt !== null) {
        return { label: opt.label || opt.nombre || opt.value, value: opt.value !== undefined ? opt.value : opt.id };
      }
      return { label: String(opt), value: opt };
    });
  }

  hasActiveFilter(): boolean {
    if (this.type === 'text' || this.type === 'select') {
      return this.filterValue !== '' && this.filterValue !== null && this.filterValue !== undefined;
    }
    if (this.type === 'range') {
      return (this.minValue !== null && this.minValue !== undefined && this.minValue !== ('' as any)) ||
             (this.maxValue !== null && this.maxValue !== undefined && this.maxValue !== ('' as any));
    }
    if (this.type === 'dateRange') {
      return !!(this.minDate || this.maxDate);
    }
    return false;
  }

  applyFilter() {
    this.isOpen = false;
    if (this.type === 'text' || this.type === 'select') {
      this.filterChange.emit({ type: this.type, value: this.filterValue });
    } else if (this.type === 'range') {
      this.filterChange.emit({ type: 'range', min: this.minValue, max: this.maxValue });
    } else if (this.type === 'dateRange') {
      this.filterChange.emit({ type: 'dateRange', min: this.minDate, max: this.maxDate });
    }
  }

  applySort(dir: 'asc' | 'desc') {
    this.isOpen = false;
    this.sortChange.emit(dir);
  }

  clearFilter() {
    this.filterValue = '';
    this.minValue = null;
    this.maxValue = null;
    this.minDate = '';
    this.maxDate = '';
    this.isOpen = false;
    this.filterChange.emit({ type: this.type, value: '' });
  }
}
