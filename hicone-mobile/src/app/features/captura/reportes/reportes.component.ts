import { Component, OnInit, HostListener, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduccionService, Extrusora, Prensa } from '../../../core/services/produccion';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="reportes-container">
      <!-- MAIN CONTENT WRAPPER -->

      <div class="main-content">
        <!-- FILTER CARD (TOP CARD) -->
        <div class="filter-card">
          <!-- FECHA FIELD -->
          <div class="filter-box date-box" (click)="openDatePicker()">
            <span class="filter-label">Fecha</span>
            <span class="filter-value">{{ getFormattedDateShort(selectedDate) }}</span>
          </div>

          <!-- MACHINE FIELD (EXTRUSORA O PRENSA) -->
          <div class="filter-box machine-box" (click)="toggleMachineDropdown($event)">
            <span class="filter-label">{{ activeTab === 'extrusiones' ? 'Extrusora' : 'Prensa' }}</span>
            <div class="machine-select-trigger">
              <span class="filter-value">{{ getSelectedMachineName() }}</span>
              <svg viewBox="0 0 24 24" fill="currentColor" class="icon-caret">
                <path d="M7 10l5 5 5-5H7z"/>
              </svg>
            </div>

            <!-- DROPDOWN MENU FOR EXTRUSORAS / PRENSAS (IMAGES 4 & 5) -->
            <div class="dropdown-menu-dark" *ngIf="showMachineDropdown" (click)="$event.stopPropagation()">
              <div class="dropdown-item" 
                   [class.active]="selectedMachineId === ''" 
                   (click)="selectMachine('')">
                --Seleccione--
              </div>

              <!-- Extrusoras List -->
              <ng-container *ngIf="activeTab === 'extrusiones'">
                <div class="dropdown-item" 
                     *ngFor="let ext of extrusoras" 
                     [class.active]="selectedMachineId === ext.id" 
                     (click)="selectMachine(ext.id)">
                  {{ ext.nombre }}
                </div>
              </ng-container>

              <!-- Prensas List -->
              <ng-container *ngIf="activeTab === 'prensados'">
                <div class="dropdown-item" 
                     *ngFor="let pre of prensas" 
                     [class.active]="selectedMachineId === pre.id" 
                     (click)="selectMachine(pre.id)">
                  {{ pre.nombre }}
                </div>
              </ng-container>
            </div>
          </div>
        </div>

        <!-- REPORT DATA LIST / SUMMARY SECTION -->
        <div class="data-section">
          <div class="empty-state" *ngIf="selectedMachineId && reportes.length === 0 && !loading">
            <span class="empty-icon">📋</span>
            <p>No hay reportes para la fecha y máquina seleccionadas.</p>
          </div>

          <div class="loading-state" *ngIf="selectedMachineId && loading">
            <div class="spinner"></div>
            <p>Cargando información...</p>
          </div>


          <div class="report-cards-grid" *ngIf="reportes.length > 0 && !loading">
            <div class="report-card" *ngFor="let item of reportes">
              <div class="card-top">
                <span class="card-code">{{ item.codigo || item.id }}</span>
                <span class="card-badge" [class.success]="item.estado === 'Terminada' || item.estado === 'EnProceso'">
                  {{ item.estado || 'Programado' }}
                </span>
              </div>
              <div class="card-details">
                <div class="detail-row">
                  <span class="lbl">Máquina:</span>
                  <span class="val">{{ item.extrusora?.nombre || item.prensa?.nombre || 'General' }}</span>
                </div>
                <div class="detail-row">
                  <span class="lbl">Producto:</span>
                  <span class="val">{{ item.productoNombre || item.producto?.nombre || '--' }}</span>
                </div>
                <div class="detail-row">
                  <span class="lbl">Operador:</span>
                  <span class="val">{{ item.operario?.nombreCompleto || item.operador?.nombre || '--' }}</span>
                </div>
                <div class="detail-row">
                  <span class="lbl">Total:</span>
                  <span class="val bold">{{ item.totalBobinas || item.programado || 0 }} {{ activeTab === 'extrusiones' ? 'Bobinas' : 'Piezas' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- BOTTOM NAVIGATION TABS (EXTRUSIONES / PRENSADOS) -->
      <div class="bottom-nav">
        <div class="tab-item" 
             [class.active]="activeTab === 'extrusiones'" 
             (click)="switchTab('extrusiones')">
          <div class="icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="nav-icon">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
            </svg>
          </div>
          <span class="tab-label">EXTRUSIONES</span>
        </div>

        <div class="tab-item" 
             [class.active]="activeTab === 'prensados'" 
             (click)="switchTab('prensados')">
          <div class="icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="nav-icon">
              <path d="M4 6h16M4 10h16M4 14h16M4 18h16" stroke-linecap="round"/>
            </svg>
          </div>
          <span class="tab-label">PRENSADOS</span>
        </div>
      </div>

      <!-- CUSTOM DARK DATEPICKER MODAL (IMAGE 3) -->
      <div class="modal-overlay" *ngIf="showDatePicker" (click)="closeDatePicker()">
        <div class="datepicker-card" (click)="$event.stopPropagation()">
          <!-- LEFT BANNER WITH YEAR AND FORMATTED DAY -->
          <div class="picker-left-panel">
            <span class="picker-year">{{ tempDate.getFullYear() }}</span>
            <span class="picker-formatted-date">{{ getFormattedFullDate(tempDate) }}</span>
          </div>

          <!-- RIGHT CALENDAR GRID & MONTH NAV -->
          <div class="picker-right-panel">
            <div class="calendar-header">
              <button class="btn-month-nav" (click)="prevMonth()">&lt;</button>
              <span class="month-title">{{ getMonthYearTitle(pickerViewMonth) }}</span>
              <button class="btn-month-nav" (click)="nextMonth()">&gt;</button>
            </div>

            <!-- DAYS OF WEEK HEADER -->
            <div class="days-week-grid">
              <span>L</span><span>M</span><span>X</span><span>J</span><span>V</span><span>S</span><span>D</span>
            </div>

            <!-- DAYS MONTH GRID -->
            <div class="days-month-grid">
              <span *ngFor="let blank of calendarBlanks"></span>
              <button *ngFor="let day of calendarDays" 
                      class="day-cell" 
                      [class.selected]="isSameDay(day, tempDate)" 
                      (click)="selectTempDay(day)">
                {{ day.getDate() }}
              </button>
            </div>

            <!-- ACTION BUTTONS -->
            <div class="picker-actions">
              <button class="btn-picker-cancel" (click)="closeDatePicker()">CANCELAR</button>
              <button class="btn-picker-accept" (click)="confirmDatePicker()">ACEPTAR</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100vh;
      background-color: #121214;
      color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      box-sizing: border-box;
    }

    .reportes-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      width: 100%;
      background: #18181b;
      position: relative;
    }

    /* HEADER */
    .header-bar {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.25rem;
      background: #18181b;
      border-bottom: 1px solid #27272a;
    }

    .btn-back {
      background: transparent;
      border: none;
      color: #ffffff;
      padding: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon-back {
      width: 22px;
      height: 22px;
    }

    .header-title {
      font-size: 1.2rem;
      font-weight: 500;
      margin: 0;
      color: #ffffff;
    }

    /* MAIN CONTENT */
    .main-content {
      flex: 1;
      padding: 1.25rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      padding-bottom: 5rem;
    }

    /* FILTER CARD (IMAGES 1 & 2) */
    .filter-card {
      background: #27272a;
      border-radius: 4px;
      padding: 1rem 1.25rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      align-items: center;
      position: relative;
    }

    .filter-box {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      cursor: pointer;
      position: relative;
    }

    .filter-label {
      font-size: 0.85rem;
      color: #a1a1aa;
      font-weight: 400;
    }

    .filter-value {
      font-size: 0.95rem;
      color: #ffffff;
      font-weight: 400;
    }

    .machine-select-trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .icon-caret {
      width: 18px;
      height: 18px;
      color: #a1a1aa;
    }

    /* DROPDOWN MENU (IMAGES 4 & 5) */
    .dropdown-menu-dark {
      position: absolute;
      top: 100%;
      right: 0;
      width: 220px;
      background: #27272a;
      border: 1px solid #3f3f46;
      border-radius: 4px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
      z-index: 100;
      margin-top: 0.5rem;
      overflow: hidden;
    }

    .dropdown-item {
      padding: 0.85rem 1.25rem;
      font-size: 0.9rem;
      color: #e4e4e7;
      cursor: pointer;
      transition: background 0.2s;
    }

    .dropdown-item:hover, .dropdown-item.active {
      background: #3f3f46;
      color: #ffffff;
    }

    /* DATA SECTION */
    .data-section {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .empty-state, .loading-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem 1rem;
      color: #71717a;
      text-align: center;
      gap: 0.75rem;
    }

    .empty-icon { font-size: 2.5rem; }

    .spinner {
      width: 28px;
      height: 28px;
      border: 3px solid #3f3f46;
      border-top-color: #14b8a6;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin { to { transform: rotate(360deg); } }

    .report-cards-grid {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }

    .report-card {
      background: #27272a;
      border-radius: 6px;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      border: 1px solid #3f3f46;
    }

    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-code {
      font-size: 0.9rem;
      font-weight: 600;
      color: #ffffff;
    }

    .card-badge {
      font-size: 0.75rem;
      padding: 0.2rem 0.6rem;
      border-radius: 4px;
      background: #3f3f46;
      color: #a1a1aa;
    }

    .card-badge.success {
      background: #064e3b;
      color: #34d399;
    }

    .card-details {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      font-size: 0.85rem;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
    }

    .detail-row .lbl { color: #a1a1aa; }
    .detail-row .val { color: #ffffff; }
    .detail-row .val.bold { font-weight: 600; color: #2dd4bf; }

    /* BOTTOM NAV TABS (IMAGES 1 & 2) */
    .bottom-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 60px;
      background: #18181b;
      border-top: 1px solid #27272a;
      display: flex;
      z-index: 90;
    }

    .tab-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.25rem;
      cursor: pointer;
      color: #71717a;
      transition: color 0.2s;
    }

    .tab-item.active {
      color: #2dd4bf;
    }

    .icon-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .nav-icon {
      width: 20px;
      height: 20px;
    }

    .tab-label {
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.05em;
    }

    /* CUSTOM DARK DATEPICKER MODAL (IMAGE 3) */
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(3px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 1rem;
    }

    .datepicker-card {
      background: #2d2d30;
      border-radius: 4px;
      display: flex;
      width: 580px;
      max-width: 95vw;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
    }

    .picker-left-panel {
      background: #505054;
      width: 38%;
      padding: 1.5rem 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .picker-year {
      font-size: 0.95rem;
      color: #d1d5db;
    }

    .picker-formatted-date {
      font-size: 1.6rem;
      font-weight: 600;
      color: #ffffff;
      line-height: 1.2;
    }

    .picker-right-panel {
      background: #333336;
      width: 62%;
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .calendar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #ffffff;
    }

    .month-title {
      font-size: 0.95rem;
      font-weight: 600;
    }

    .btn-month-nav {
      background: transparent;
      border: none;
      color: #ffffff;
      font-size: 1.1rem;
      cursor: pointer;
      padding: 0.2rem 0.5rem;
    }

    .days-week-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      text-align: center;
      font-size: 0.75rem;
      color: #9ca3af;
      font-weight: 600;
    }

    .days-month-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 0.2rem;
      text-align: center;
    }

    .day-cell {
      background: transparent;
      border: none;
      color: #ffffff;
      font-size: 0.85rem;
      height: 32px;
      width: 32px;
      margin: 0 auto;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
    }

    .day-cell:hover {
      background: #4b5563;
    }

    .day-cell.selected {
      background: #2dd4bf;
      color: #111827;
      font-weight: 700;
    }

    .picker-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1.25rem;
      margin-top: auto;
      padding-top: 0.5rem;
    }

    .btn-picker-cancel, .btn-picker-accept {
      background: transparent;
      border: none;
      color: #2dd4bf;
      font-size: 0.85rem;
      font-weight: 700;
      cursor: pointer;
      letter-spacing: 0.05em;
    }

    .btn-picker-cancel:hover, .btn-picker-accept:hover {
      opacity: 0.8;
    }
  `]
})
export class ReportesComponent implements OnInit {
  private prodService = inject(ProduccionService);
  private location = inject(Location);
  private cdr = inject(ChangeDetectorRef);

  activeTab: 'extrusiones' | 'prensados' = 'extrusiones';
  selectedDate: Date = new Date();
  selectedMachineId: string = '';
  showMachineDropdown: boolean = false;

  extrusoras: Extrusora[] = [];
  prensas: Prensa[] = [];
  reportes: any[] = [];
  loading: boolean = false;

  // DatePicker Modal State
  showDatePicker: boolean = false;
  tempDate: Date = new Date();
  pickerViewMonth: Date = new Date();
  calendarDays: Date[] = [];
  calendarBlanks: number[] = [];

  @HostListener('document:click')
  onDocumentClick() {
    this.showMachineDropdown = false;
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.cargarMaquinas();
    this.cargarReportes();
  }

  goBack() {
    this.location.back();
  }

  switchTab(tab: 'extrusiones' | 'prensados') {
    this.activeTab = tab;
    this.selectedMachineId = '';
    this.showMachineDropdown = false;
    this.cargarReportes();
    this.cdr.detectChanges();
  }

  cargarMaquinas() {
    this.prodService.getExtrusoras().subscribe({
      next: (data) => {
        this.extrusoras = data || [];
        if (this.extrusoras.length === 0) {
          this.extrusoras = [
            { id: 'ext-1', codigo: 'EXT-01', nombre: 'Extrusora 1', estado: 'Disponible' },
            { id: 'ext-2', codigo: 'EXT-02', nombre: 'Extrusora 2', estado: 'Disponible' },
            { id: 'ext-3', codigo: 'EXT-03', nombre: 'Extrusora 3', estado: 'Disponible' }
          ];
        }
        this.cdr.detectChanges();
      },
      error: () => {
        this.extrusoras = [
          { id: 'ext-1', codigo: 'EXT-01', nombre: 'Extrusora 1', estado: 'Disponible' },
          { id: 'ext-2', codigo: 'EXT-02', nombre: 'Extrusora 2', estado: 'Disponible' },
          { id: 'ext-3', codigo: 'EXT-03', nombre: 'Extrusora 3', estado: 'Disponible' }
        ];
        this.cdr.detectChanges();
      }
    });

    this.prodService.getPrensas().subscribe({
      next: (data) => {
        this.prensas = data || [];
        if (this.prensas.length === 0) {
          this.prensas = [
            { id: 'pre-1', codigo: 'PRE-01', nombre: 'Prensa 1', estado: 'Disponible' },
            { id: 'pre-2', codigo: 'PRE-02', nombre: 'Prensa 2', estado: 'Disponible' },
            { id: 'pre-3', codigo: 'PRE-03', nombre: 'Prensa 3', estado: 'Disponible' },
            { id: 'pre-4', codigo: 'PRE-04', nombre: 'Prensa 4', estado: 'Disponible' },
            { id: 'pre-5', codigo: 'PRE-05', nombre: 'Prensa 5', estado: 'Disponible' }
          ];
        }
        this.cdr.detectChanges();
      },
      error: () => {
        this.prensas = [
          { id: 'pre-1', codigo: 'PRE-01', nombre: 'Prensa 1', estado: 'Disponible' },
          { id: 'pre-2', codigo: 'PRE-02', nombre: 'Prensa 2', estado: 'Disponible' },
          { id: 'pre-3', codigo: 'PRE-03', nombre: 'Prensa 3', estado: 'Disponible' },
          { id: 'pre-4', codigo: 'PRE-04', nombre: 'Prensa 4', estado: 'Disponible' },
          { id: 'pre-5', codigo: 'PRE-05', nombre: 'Prensa 5', estado: 'Disponible' }
        ];
        this.cdr.detectChanges();
      }
    });
  }

  toggleMachineDropdown(event: Event) {
    event.stopPropagation();
    this.showMachineDropdown = !this.showMachineDropdown;
    this.cdr.detectChanges();
  }

  selectMachine(id: string) {
    this.selectedMachineId = id;
    this.showMachineDropdown = false;
    this.cargarReportes();
    this.cdr.detectChanges();
  }

  getSelectedMachineName(): string {
    if (!this.selectedMachineId) return '--Seleccione--';
    if (this.activeTab === 'extrusiones') {
      const match = this.extrusoras.find(m => m.id === this.selectedMachineId);
      return match ? match.nombre : '--Seleccione--';
    } else {
      const match = this.prensas.find(m => m.id === this.selectedMachineId);
      return match ? match.nombre : '--Seleccione--';
    }
  }

  cargarReportes() {
    if (!this.selectedMachineId) {
      this.loading = false;
      this.reportes = [];
      this.cdr.detectChanges();
      return;
    }

    this.loading = true;
    this.cdr.detectChanges();
    const dateStr = this.getFormattedIsoDate(this.selectedDate);

    if (this.activeTab === 'extrusiones') {
      this.prodService.getExtrusiones().subscribe({
        next: (data) => {
          this.loading = false;
          let list = data || [];
          if (this.selectedMachineId) {
            list = list.filter(x => x.extrusoraId === this.selectedMachineId || x.extrusora?.id === this.selectedMachineId);
          }
          this.reportes = list;
          this.cdr.detectChanges();
        },
        error: () => {
          this.loading = false;
          this.reportes = [];
          this.cdr.detectChanges();
        }
      });
    } else {
      this.prodService.getPrensados().subscribe({
        next: (data) => {
          this.loading = false;
          let list = data || [];
          if (this.selectedMachineId) {
            list = list.filter(x => x.prensa?.id === this.selectedMachineId);
          }
          this.reportes = list;
          this.cdr.detectChanges();
        },
        error: () => {
          this.loading = false;
          this.reportes = [];
          this.cdr.detectChanges();
        }
      });
    }
  }


  // ── DATEPICKER MODAL LOGIC (IMAGE 3) ─────────────────────────────────
  openDatePicker() {
    this.tempDate = new Date(this.selectedDate);
    this.pickerViewMonth = new Date(this.tempDate.getFullYear(), this.tempDate.getMonth(), 1);
    this.renderCalendar();
    this.showDatePicker = true;
  }

  closeDatePicker() {
    this.showDatePicker = false;
  }

  confirmDatePicker() {
    this.selectedDate = new Date(this.tempDate);
    this.showDatePicker = false;
    this.cargarReportes();
  }

  prevMonth() {
    this.pickerViewMonth = new Date(this.pickerViewMonth.getFullYear(), this.pickerViewMonth.getMonth() - 1, 1);
    this.renderCalendar();
  }

  nextMonth() {
    this.pickerViewMonth = new Date(this.pickerViewMonth.getFullYear(), this.pickerViewMonth.getMonth() + 1, 1);
    this.renderCalendar();
  }

  renderCalendar() {
    const year = this.pickerViewMonth.getFullYear();
    const month = this.pickerViewMonth.getMonth();
    
    // First day of month
    const firstDayIndex = new Date(year, month, 1).getDay();
    // Adjust for Monday starting week: Sun (0) -> 6, Mon (1) -> 0
    const blanksCount = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
    this.calendarBlanks = Array(blanksCount).fill(0);

    const totalDays = new Date(year, month + 1, 0).getDate();
    const days: Date[] = [];
    for (let d = 1; d <= totalDays; d++) {
      days.push(new Date(year, month, d));
    }
    this.calendarDays = days;
  }

  selectTempDay(day: Date) {
    this.tempDate = new Date(day);
  }

  isSameDay(d1: Date, d2: Date): boolean {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  }

  getFormattedDateShort(date: Date): string {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yy = String(date.getFullYear()).substring(2);
    return `${dd}/${mm}/${yy}`;
  }

  getFormattedFullDate(date: Date): string {
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    
    const dayName = days[date.getDay()];
    const dayNum = date.getDate();
    const monthName = months[date.getMonth()];
    
    return `${dayName}, ${dayNum} ${monthName}`;
  }

  getMonthYearTitle(date: Date): string {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return `${months[date.getMonth()]} de ${date.getFullYear()}`;
  }

  getFormattedIsoDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
}
