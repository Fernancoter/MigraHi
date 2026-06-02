import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-turnos-semana',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="module-page animate-move-up">
      <header class="module-header-container" style="display: flex; flex-direction: column; margin-bottom: 1.5rem;">
        <div class="title-area">
          <nav class="breadcrumb">Producción <span style="margin: 0 0.5rem; color: #9ca3af;">›</span> Turnos Por Semana</nav>
          <h1 style="color: #10b981; font-weight: normal; margin-top: 0.2rem;">Turnos Por Semana</h1>
        </div>
      </header>
      
      <div class="content-card" style="padding: 0; border: 1px solid #cbd5e1; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); background: white;">
        
        <!-- Main Tabs -->
        <div class="main-tabs" style="display: flex; border-bottom: 1px solid #cbd5e1; padding: 0 1rem; margin-top: 0.5rem;">
          <div class="tab" 
               [class.active]="activeMainTab() === 'extrusoras'"
               (click)="setMainTab('extrusoras', $event)">
            Extrusoras
          </div>
          <div class="tab" 
               [class.active]="activeMainTab() === 'prensas'"
               (click)="setMainTab('prensas', $event)">
            Prensas
          </div>
        </div>
        
        <div class="tab-content" style="padding: 1.5rem;">
          
          <!-- Info banner -->
          <div class="info-banner" style="border: 1px solid #cbd5e1; border-radius: 2px; padding: 1.2rem; margin-bottom: 2rem;">
            <div style="display: flex; align-items: center; margin-bottom: 1rem;">
              <span class="icon text-white" style="background: #4caf50; border-radius: 2px; display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; margin-right: 0.8rem;">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.41l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.22-1.05-.59-1.41zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>
              </span>
              <span style="color: #475569; font-weight: 500; font-size: 0.85rem;">Seleccione el inicio de semana para generar la plantilla de turnos</span>
            </div>
            
            <!-- Legacy Grid Header -->
            <div class="legacy-grid-header" style="max-width: 500px; font-family: Arial, sans-serif; border: 1px solid #cbd5e1;">
              <!-- Grouping area -->
              <div style="background: #94a3b8; color: #1e293b; padding: 0.3rem 0.5rem; display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; position: relative;">
                <span>Arrastre los filtros aquí</span>
                <span style="font-size: 1.1rem; cursor: pointer; color: #334155; font-weight: bold;" (click)="toggleGridMenu($event)">≡</span>
                
                <!-- Grid Menu Popover -->
                @if (showGridMenu()) {
                  <div class="grid-menu-popover" style="position: absolute; top: 100%; right: 0; background: white; border: 1px solid #cbd5e1; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 100; width: 220px; font-family: sans-serif; display: flex; flex-direction: column;" (click)="$event.stopPropagation()">
                    <div style="background: #005a70; color: white; padding: 0.5rem; display: flex; justify-content: space-between; align-items: center; font-weight: bold;">
                      <span style="margin: 0 auto; font-size: 0.85rem;">Opciones</span>
                      <span style="cursor: pointer; font-size: 1rem;" (click)="showGridMenu.set(false)">✕</span>
                    </div>
                    <div style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; display: flex; flex-direction: column; gap: 0.5rem;">
                      <div class="menu-item">
                        <span style="color: #005a70; font-weight: bold; margin-right: 0.5rem; font-size: 1rem;">⬇</span> Exportar a HTML
                      </div>
                      <div class="menu-item">
                        <span style="color: #005a70; font-weight: bold; margin-right: 0.5rem; font-size: 1rem;">⬇</span> Exportar a PDF
                      </div>
                      <div class="menu-item">
                        <span style="color: #005a70; font-weight: bold; margin-right: 0.5rem; font-size: 1rem;">⬇</span> Exportar a XLSX
                      </div>
                    </div>
                    <div style="padding: 0.5rem;">
                      <div style="margin-bottom: 0.5rem; font-size: 0.75rem; color: #334155;">Columnas visibles</div>
                      <div style="display: flex; flex-direction: column; gap: 0.4rem;">
                        <label class="col-checkbox"><input type="checkbox"> <span>Extrusion Producto Id</span></label>
                        <label class="col-checkbox"><input type="checkbox" checked> <span>Producto</span></label>
                        <label class="col-checkbox"><input type="checkbox"> <span>Extrusion {{ activeMainTab() === 'extrusoras' ? 'Extrusora' : 'Prensa' }} Id</span></label>
                        <label class="col-checkbox"><input type="checkbox" checked> <span>{{ activeMainTab() === 'extrusoras' ? 'Extrusora' : 'Prensa' }}</span></label>
                        <label class="col-checkbox"><input type="checkbox" checked> <span>Programado</span></label>
                        <label class="col-checkbox"><input type="checkbox" checked> <span>Fabricado</span></label>
                        <label class="col-checkbox"><input type="checkbox" checked> <span>Diferencia</span></label>
                      </div>
                    </div>
                  </div>
                }
              </div>
              <!-- Column headers -->
              <div style="display: flex; background: #005a70; color: white; font-size: 0.75rem; font-weight: bold;">
                <div style="flex: 1.5; padding: 0.3rem 0.5rem; border-right: 1px solid rgba(255,255,255,0.3); display: flex; align-items: center; justify-content: space-between;">
                  Producto <span style="font-size: 0.5rem;">▲</span>
                </div>
                <div style="flex: 1.2; padding: 0.3rem 0.5rem; border-right: 1px solid rgba(255,255,255,0.3); display: flex; align-items: center; justify-content: space-between;">
                  {{ activeMainTab() === 'extrusoras' ? 'Extrusora' : 'Prensa' }} <span style="font-size: 0.5rem;">▲</span>
                </div>
                <div style="flex: 1.3; padding: 0.3rem 0.5rem; border-right: 1px solid rgba(255,255,255,0.3); display: flex; align-items: center; justify-content: center;">
                  Programado
                </div>
                <div style="flex: 1; padding: 0.3rem 0.5rem; border-right: 1px solid rgba(255,255,255,0.3); display: flex; align-items: center; justify-content: center;">
                  Fabricado
                </div>
                <div style="flex: 1; padding: 0.3rem 0.5rem; display: flex; align-items: center; justify-content: center;">
                  Diferencia
                </div>
              </div>
            </div>
          </div>
          
          <!-- Date fields -->
          <div class="date-fields-container" style="display: flex; gap: 3rem; margin-bottom: 1.5rem; width: 100%;">
            <div class="date-field" style="flex: 1; border-bottom: 1px solid #cbd5e1; padding-bottom: 0.3rem; position: relative;">
              <label style="display: block; font-size: 0.75rem; color: #475569; font-weight: 600; margin-bottom: 0.5rem;">Fecha Inicio *</label>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <input type="text" value="01/06/26" style="border: none; outline: none; background: transparent; font-size: 0.95rem; color: #475569; width: 100%;" />
                <span style="color: #cbd5e1; font-size: 1.1rem; cursor: pointer;" (click)="toggleCalendar('inicio', $event)">📅</span>
              </div>
              @if (showCalendarMenu() === 'inicio') {
                <ng-container *ngTemplateOutlet="calendarTemplate"></ng-container>
              }
            </div>
            <div class="date-field" style="flex: 1; border-bottom: 1px solid #cbd5e1; padding-bottom: 0.3rem; position: relative;">
              <label style="display: block; font-size: 0.75rem; color: #475569; font-weight: 600; margin-bottom: 0.5rem;">Fecha Fin *</label>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <input type="text" value="07/06/26" style="border: none; outline: none; background: transparent; font-size: 0.95rem; color: #475569; width: 100%;" />
                <span style="color: #cbd5e1; font-size: 1.1rem; cursor: pointer;" (click)="toggleCalendar('fin', $event)">📅</span>
              </div>
              @if (showCalendarMenu() === 'fin') {
                <ng-container *ngTemplateOutlet="calendarTemplate"></ng-container>
              }
            </div>
          </div>
          
          <!-- Action button -->
          <button (click)="showTables.set(true)" style="background: #4caf50; color: white; font-weight: 600; padding: 0.6rem 1.5rem; border: none; border-radius: 2px; margin-bottom: 2rem; cursor: pointer; font-size: 0.75rem; text-transform: uppercase;">PROGRAMAR O CONSULTAR</button>
          
          <!-- Inner Tabs -->
          <div class="inner-tabs-container" style="border: 1px solid #cbd5e1; border-radius: 2px;">
            <div class="inner-tabs" style="display: flex; border-bottom: 1px solid #cbd5e1; padding: 0 1rem; background: white; flex-wrap: wrap;">
              @if (activeMainTab() === 'extrusoras') {
                <div class="inner-tab" 
                     [class.active]="activeInnerTab() === 'extrusora1'"
                     (click)="activeInnerTab.set('extrusora1')">Extrusora 1</div>
                <div class="inner-tab" 
                     [class.active]="activeInnerTab() === 'extrusora2'"
                     (click)="activeInnerTab.set('extrusora2')">Extrusora 2</div>
                <div class="inner-tab" 
                     [class.active]="activeInnerTab() === 'extrusora3'"
                     (click)="activeInnerTab.set('extrusora3')">Extrusora 3</div>
              } @else {
                <div class="inner-tab" 
                     [class.active]="activeInnerTab() === 'prensa1'"
                     (click)="activeInnerTab.set('prensa1')">Prensa 1</div>
                <div class="inner-tab" 
                     [class.active]="activeInnerTab() === 'prensa2'"
                     (click)="activeInnerTab.set('prensa2')">Prensa 2</div>
                <div class="inner-tab" 
                     [class.active]="activeInnerTab() === 'prensa3'"
                     (click)="activeInnerTab.set('prensa3')">Prensa 3</div>
                <div class="inner-tab" 
                     [class.active]="activeInnerTab() === 'prensa4'"
                     (click)="activeInnerTab.set('prensa4')">Prensa 4</div>
                <div class="inner-tab" 
                     [class.active]="activeInnerTab() === 'prensa5'"
                     (click)="activeInnerTab.set('prensa5')">Prensa 5</div>
              }
            </div>
            <div class="inner-tab-content" style="min-height: 80px; background: white;">
              @if (showTables()) {
                <div style="padding: 1.5rem;">
                  @for (turno of [
                    { name: '1er Turno', time: '00:00', op: 'LUIS CESAR OROPEZA ORTEGA', idStart: 22440 },
                    { name: '2do Turno', time: '08:00', op: 'GUADALUPE ROMERO TORRES', idStart: 22447 },
                    { name: '3er Turno', time: '15:00', op: 'FILEMON VILCHIS ROMERO', idStart: 22454 }
                  ]; track turno.name) {
                    <div style="border: 1px solid #cbd5e1; border-radius: 2px; margin-bottom: 1.5rem;">
                      <div style="padding: 0.5rem; display: flex; align-items: center; border-bottom: 1px solid #cbd5e1;">
                        <span class="icon" style="background: #4caf50; padding: 0.1rem 0.3rem; border-radius: 2px; color: white; margin-right: 0.5rem; font-size: 0.6rem;">◆</span>
                        <span style="color: #475569; font-weight: 600; font-size: 0.8rem;">{{ turno.name }}</span>
                      </div>
                      <div style="padding: 1rem; overflow-x: auto;">
                        <table style="width: 100%; border-collapse: collapse; min-width: 800px; font-size: 0.75rem; color: #475569;">
                          <thead>
                            <tr style="border-bottom: 2px solid #f1f5f9; text-align: left;">
                              <th style="padding: 0.5rem; font-weight: bold;">Extrusión ID</th>
                              <th style="padding: 0.5rem; font-weight: bold;">Estado</th>
                              <th style="padding: 0.5rem; font-weight: bold;">Fecha</th>
                              <th style="padding: 0.5rem; font-weight: bold;">Hora</th>
                              <th style="padding: 0.5rem; font-weight: bold;">Día</th>
                              <th style="padding: 0.5rem; font-weight: bold;">Producto</th>
                              <th style="padding: 0.5rem; font-weight: bold; text-align: center;">Plan</th>
                              <th style="padding: 0.5rem; font-weight: bold; text-align: center;">Producido</th>
                              <th style="padding: 0.5rem; font-weight: bold;">Operador</th>
                            </tr>
                          </thead>
                          <tbody>
                            @for (dia of ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']; track dia; let i = $index) {
                              <tr style="border-bottom: 1px solid #f1f5f9;">
                                <td style="padding: 0.6rem 0.5rem;">{{ turno.idStart + i }}</td>
                                <td style="padding: 0.6rem 0.5rem;">Por Programar</td>
                                <td style="padding: 0.6rem 0.5rem;">0{{ i + 1 }}/06/26 {{ turno.time }}</td>
                                <td style="padding: 0.6rem 0.5rem;">
                                  <div style="display: flex; align-items: center; border-bottom: 1px solid #cbd5e1; width: max-content;">
                                    <span style="margin-right: 0.5rem;">{{ turno.time }}</span>
                                    <span style="color: #cbd5e1; font-size: 0.9rem;">📅</span>
                                  </div>
                                </td>
                                <td style="padding: 0.6rem 0.5rem;">{{ dia }}</td>
                                <td style="padding: 0.6rem 0.5rem;">
                                  <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #cbd5e1; width: 100px;">
                                    <span>74757</span>
                                    <span style="font-size: 0.5rem;">▼</span>
                                  </div>
                                </td>
                                <td style="padding: 0.6rem 0.5rem; text-align: center;">0</td>
                                <td style="padding: 0.6rem 0.5rem; text-align: center;">0</td>
                                <td style="padding: 0.6rem 0.5rem;">
                                  <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #cbd5e1; width: max-content; gap: 0.5rem;">
                                    <span>{{ turno.op }}</span>
                                    <span style="font-size: 0.5rem;">▼</span>
                                  </div>
                                </td>
                              </tr>
                            }
                          </tbody>
                        </table>
                        <div style="margin-top: 1rem;">
                          <button style="background: #4caf50; color: white; font-weight: 600; padding: 0.5rem 1.5rem; border: none; border-radius: 2px; cursor: pointer; font-size: 0.75rem;">GUARDAR</button>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              }
            </div>
          </div>
          
        </div>
      </div>
      
      <!-- Footer -->
      <footer style="margin-top: 1.5rem; padding-top: 0.5rem; border-top: 1px solid #cbd5e1; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; color: #475569; gap: 1rem;">
        <span style="font-weight: 600; font-size: 0.8rem;">Consultas a partir de la siguiente fecha:</span>
        <div style="display: flex; align-items: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 0.1rem; gap: 0.5rem; min-width: 80px; justify-content: space-between;">
          <span style="color: #94a3b8;">01/03/28</span>
          <span style="color: #cbd5e1; font-size: 1rem; cursor: pointer;">📅</span>
        </div>
        <span style="color: #64748b; font-size: 0.75rem; margin-left: 0.5rem;">Copyright 2023</span>
      </footer>
    </div>

    <!-- Calendar Template -->
    <ng-template #calendarTemplate>
      <div class="calendar-popover" style="position: absolute; top: 100%; right: 0; background: white; border: 1px solid #cbd5e1; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 100; width: 250px; font-family: sans-serif; padding: 1rem;" (click)="$event.stopPropagation()">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <span style="cursor: pointer; padding: 0.2rem; font-weight: bold;">&lt;</span>
          <div style="display: flex; gap: 0.5rem;">
            <select style="padding: 0.2rem; border: 1px solid #cbd5e1; border-radius: 2px;"><option>Junio</option></select>
            <select style="padding: 0.2rem; border: 1px solid #cbd5e1; border-radius: 2px;"><option>2026</option></select>
          </div>
          <span style="cursor: pointer; padding: 0.2rem; font-weight: bold;">&gt;</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-size: 0.8rem; font-weight: bold; margin-bottom: 0.5rem; color: #1e293b;">
          <span>Do</span><span>Lu</span><span>Ma</span><span>Mi</span><span>Ju</span><span>Vi</span><span>Sa</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-size: 0.85rem; row-gap: 0.8rem; color: #334155;">
          <span style="color: #94a3b8;">31</span>
          <span style="background: #3b82f6; color: white; border-radius: 4px; padding: 0.2rem;">1</span>
          <span>2</span><span>3</span><span>4</span><span>5</span><span>6</span>
          <span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span>
          <span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span>
          <span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span>
          <span>28</span><span>29</span><span>30</span>
          <span style="color: #94a3b8;">1</span><span style="color: #94a3b8;">2</span><span style="color: #94a3b8;">3</span><span style="color: #94a3b8;">4</span>
          <span style="color: #94a3b8;">5</span><span style="color: #94a3b8;">6</span><span style="color: #94a3b8;">7</span><span style="color: #94a3b8;">8</span><span style="color: #94a3b8;">9</span><span style="color: #94a3b8;">10</span><span style="color: #94a3b8;">11</span>
        </div>
        <div style="margin-top: 1rem; border-top: 1px solid #e2e8f0; padding-top: 0.5rem; text-align: right;">
          <button style="border: 1px solid #cbd5e1; background: white; padding: 0.3rem 0.8rem; border-radius: 2px; cursor: pointer; font-size: 0.8rem; color: #475569;">Limpiar</button>
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    .tab {
      padding: 1rem;
      color: #64748b;
      cursor: pointer;
      font-weight: 500;
      font-size: 0.9rem;
      border-bottom: 2px solid transparent;
      transition: all 0.2s ease;
    }
    .tab.active {
      color: #10b981;
      font-weight: 600;
      border-bottom: 2px solid #10b981;
    }
    .inner-tab {
      padding: 1rem;
      color: #64748b;
      cursor: pointer;
      font-size: 0.85rem;
      font-weight: 500;
      transition: all 0.2s ease;
    }
    .inner-tab.active {
      color: #10b981;
    }
    .menu-item {
      font-size: 0.85rem;
      color: #1e293b;
      cursor: pointer;
      display: flex;
      align-items: center;
    }
    .menu-item:hover {
      background: #f1f5f9;
    }
    .col-checkbox {
      font-size: 0.8rem;
      color: #1e293b;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }
    .col-checkbox input[type="checkbox"] {
      width: 14px;
      height: 14px;
      cursor: pointer;
    }
  `],
  host: { '(click)': 'closeMenus()' }
})
export class TurnosSemanaComponent {
  activeMainTab = signal<'extrusoras' | 'prensas'>('extrusoras');
  activeInnerTab = signal<string>('extrusora1');
  
  showGridMenu = signal(false);
  showCalendarMenu = signal<'inicio' | 'fin' | null>(null);
  showTables = signal(false);

  setMainTab(tab: 'extrusoras' | 'prensas', event?: Event) {
    if (event) event.stopPropagation();
    this.activeMainTab.set(tab);
    if (tab === 'extrusoras') {
      this.activeInnerTab.set('extrusora1');
    } else {
      this.activeInnerTab.set('prensa1');
    }
    this.closeMenus();
  }

  toggleGridMenu(event: Event) {
    event.stopPropagation();
    this.showGridMenu.set(!this.showGridMenu());
    this.showCalendarMenu.set(null);
  }

  toggleCalendar(type: 'inicio' | 'fin', event: Event) {
    event.stopPropagation();
    if (this.showCalendarMenu() === type) {
      this.showCalendarMenu.set(null);
    } else {
      this.showCalendarMenu.set(type);
      this.showGridMenu.set(false);
    }
  }

  closeMenus() {
    this.showGridMenu.set(false);
    this.showCalendarMenu.set(null);
  }
}
