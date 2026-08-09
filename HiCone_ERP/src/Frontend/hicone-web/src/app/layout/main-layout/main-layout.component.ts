import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { NavigationService } from '../../core/services/navigation.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SidebarComponent, HeaderComponent],
  template: `
    <div class="layout-container" (click)="onDocumentClick()">
      <app-header></app-header>
      
      <div class="body-container" [class.sidebar-mini]="!(isSidebarVisible$ | async)">
        <div class="sidebar-wrapper" [class.collapsed]="!(isSidebarVisible$ | async)">
           <app-sidebar></app-sidebar>
        </div>
        <main class="page-container animate-fade-in">
          <div class="page-main-content">
            <router-outlet></router-outlet>
          </div>
          <footer class="footer-bar-legacy">
            <span class="footer-label">Consultas a partir de la siguiente fecha:</span>
            
            <!-- CONTENEDOR DEL DATE PICKER CON POPOVER -->
            <div class="date-picker-wrapper" (click)="$event.stopPropagation()">
              <div class="date-input-box" (click)="toggleCalendar()">
                <span class="date-text">{{ formattedDate }}</span>
                <span class="calendar-icon-btn">📅</span>
              </div>

              <!-- POPOVER DEL CALENDARIO (ESTILO QA) -->
              <div *ngIf="showCalendar" class="calendar-popover animate-slide-up">
                <!-- CABECERA: NAVEGACIÓN Y DESPLEGABLES -->
                <div class="popover-header">
                  <button class="nav-arrow" (click)="changeMonth(-1)">&lsaquo;</button>
                  <div class="selects-row">
                    <select [value]="viewMonth" (change)="onMonthSelect($event)">
                      <option *ngFor="let m of months; let i = index" [value]="i">{{ m }}</option>
                    </select>
                    <select [value]="viewYear" (change)="onYearSelect($event)">
                      <option *ngFor="let y of years" [value]="y">{{ y }}</option>
                    </select>
                  </div>
                  <button class="nav-arrow" (click)="changeMonth(1)">&rsaquo;</button>
                </div>

                <!-- DÍAS DE LA SEMANA -->
                <div class="weekdays-grid">
                  <span>Do</span><span>Lu</span><span>Ma</span><span>Mi</span><span>Ju</span><span>Vi</span><span>Sa</span>
                </div>

                <!-- REJILLA DE DÍAS -->
                <div class="days-grid">
                  <button 
                    *ngFor="let item of calendarDays" 
                    class="day-btn" 
                    [class.other-month]="!item.isCurrentMonth"
                    [class.selected]="item.isSelected"
                    (click)="selectDay(item)"
                  >
                    {{ item.date.getDate() }}
                  </button>
                </div>

                <!-- PIE DEL POPOVER: BOTONES HOY Y LIMPIAR -->
                <div class="popover-footer-btns">
                  <button class="btn-pop-action" (click)="selectToday()">Hoy</button>
                  <button class="btn-pop-action" (click)="clearDate()">Limpiar</button>
                </div>
              </div>
            </div>

            <span class="copyright">Copyright 2026</span>
          </footer>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .layout-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      background-color: var(--bg-main);
    }
    
    .body-container {
      display: flex;
      flex: 1;
      overflow: hidden;
      position: relative;
    }
    
    .sidebar-wrapper {
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      width: 250px;
      overflow: hidden;
    }

    .sidebar-wrapper.collapsed {
      width: 76px;
    }

    .page-container {
      padding: 0;
      flex: 1;
      overflow-y: auto;
      background: white;
      transition: width 0.3s;
      display: flex;
      flex-direction: column;
    }

    .page-main-content {
      flex: 1;
    }

    /* DATE PICKER WRAPPER EN EL FOOTER */
    .date-picker-wrapper {
      position: relative;
      display: inline-block;
    }

    .date-input-box {
      display: flex;
      align-items: center;
      gap: 6px;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 3px 8px;
      background: #ffffff;
      cursor: pointer;
      font-size: 0.83rem;
      color: #334155;
      user-select: none;
      transition: border-color 0.2s;
    }

    .date-input-box:hover {
      border-color: #166534;
    }

    .date-text {
      font-weight: 500;
    }

    .calendar-icon-btn {
      font-size: 0.85rem;
    }

    /* CALENDAR POPOVER STYLING */
    .calendar-popover {
      position: absolute;
      bottom: calc(100% + 10px);
      left: 50%;
      transform: translateX(-50%);
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
      padding: 12px;
      width: 260px;
      z-index: 99999;
    }

    .calendar-popover::after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      width: 10px;
      height: 10px;
      background: #ffffff;
      border-right: 1px solid #cbd5e1;
      border-bottom: 1px solid #cbd5e1;
    }

    .popover-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .nav-arrow {
      background: none;
      border: none;
      font-size: 1.2rem;
      font-weight: bold;
      color: #475569;
      cursor: pointer;
      padding: 0 6px;
      border-radius: 4px;
    }

    .nav-arrow:hover {
      background: #f1f5f9;
      color: #166534;
    }

    .selects-row {
      display: flex;
      gap: 6px;
    }

    .selects-row select {
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 2px 4px;
      font-size: 0.8rem;
      color: #1e293b;
      outline: none;
      background: #f8fafc;
      font-weight: 600;
      cursor: pointer;
    }

    .weekdays-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      text-align: center;
      font-size: 0.75rem;
      font-weight: bold;
      color: #334155;
      margin-bottom: 6px;
    }

    .days-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 2px;
    }

    .day-btn {
      background: none;
      border: none;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      color: #1e293b;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.15s;
    }

    .day-btn:hover {
      background: #e2e8f0;
    }

    .day-btn.other-month {
      color: #cbd5e1;
    }

    .day-btn.selected {
      background: #1976d2;
      color: #ffffff;
      font-weight: bold;
    }

    .popover-footer-btns {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 10px;
      padding-top: 8px;
      border-top: 1px solid #f1f5f9;
    }

    .btn-pop-action {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 3px 10px;
      font-size: 0.75rem;
      color: #475569;
      cursor: pointer;
      font-weight: 500;
    }

    .btn-pop-action:hover {
      background: #f8fafc;
      border-color: #94a3b8;
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translate(-50%, 8px); }
      to { opacity: 1; transform: translate(-50%, 0); }
    }

    .animate-slide-up {
      animation: slideUp 0.2s ease-out forwards;
    }
  `]
})
export class MainLayoutComponent {
  isSidebarVisible$;
  showCalendar = false;

  viewDate: Date = new Date(2026, 4, 8); // Mayo 8, 2026
  selectedDate: Date | null = new Date(2026, 4, 8);

  months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  years: number[] = [];

  constructor(private navService: NavigationService) {
    this.isSidebarVisible$ = this.navService.isSidebarVisible$;
    for (let y = 2020; y <= 2030; y++) {
      this.years.push(y);
    }
  }

  get formattedDate(): string {
    if (!this.selectedDate) return '--/--/--';
    const d = String(this.selectedDate.getDate()).padStart(2, '0');
    const m = String(this.selectedDate.getMonth() + 1).padStart(2, '0');
    const y = String(this.selectedDate.getFullYear()).slice(-2);
    return `${d}/${m}/${y}`;
  }

  get viewMonth(): number { return this.viewDate.getMonth(); }
  get viewYear(): number { return this.viewDate.getFullYear(); }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

  onDocumentClick() {
    this.showCalendar = false;
  }

  changeMonth(delta: number) {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + delta, 1);
  }

  onMonthSelect(event: any) {
    const month = parseInt(event.target.value, 10);
    this.viewDate = new Date(this.viewDate.getFullYear(), month, 1);
  }

  onYearSelect(event: any) {
    const year = parseInt(event.target.value, 10);
    this.viewDate = new Date(year, this.viewDate.getMonth(), 1);
  }

  get calendarDays(): { date: Date, isCurrentMonth: boolean, isSelected: boolean }[] {
    const days: { date: Date, isCurrentMonth: boolean, isSelected: boolean }[] = [];
    const year = this.viewDate.getFullYear();
    const month = this.viewDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const startingDayOfWeek = firstDayOfMonth.getDay();

    const prevMonthLastDate = new Date(year, month, 0).getDate();

    // Días mes anterior
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const d = new Date(year, month - 1, prevMonthLastDate - i);
      days.push({ date: d, isCurrentMonth: false, isSelected: false });
    }

    // Días mes actual
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= lastDateOfMonth; i++) {
      const d = new Date(year, month, i);
      const isSel = !!(this.selectedDate && 
        this.selectedDate.getDate() === i && 
        this.selectedDate.getMonth() === month && 
        this.selectedDate.getFullYear() === year);
      days.push({ date: d, isCurrentMonth: true, isSelected: isSel });
    }

    // Días mes siguiente
    const remaining = (35 - days.length);
    const countNext = remaining < 0 ? (42 - days.length) : remaining;
    for (let i = 1; i <= countNext; i++) {
      const d = new Date(year, month + 1, i);
      days.push({ date: d, isCurrentMonth: false, isSelected: false });
    }

    return days;
  }

  selectDay(item: { date: Date, isCurrentMonth: boolean }) {
    this.selectedDate = new Date(item.date);
    this.viewDate = new Date(item.date);
    this.showCalendar = false;
  }

  selectToday() {
    const today = new Date();
    this.selectedDate = today;
    this.viewDate = today;
    this.showCalendar = false;
  }

  clearDate() {
    this.selectedDate = null;
    this.showCalendar = false;
  }
}
