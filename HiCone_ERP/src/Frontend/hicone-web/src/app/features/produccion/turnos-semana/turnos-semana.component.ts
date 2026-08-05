import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduccionConfigService, Turno, Extrusora, Prensa, Producto, Operario } from '../../../core/services/produccion-config.service';

@Component({
  selector: 'app-turnos-semana',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up">
      <div class="page-header-premium">
        <div class="title-section">
          <h1 class="premium-title">Turnos Por Semana</h1>
          <nav class="breadcrumb-modern">
            <span class="root">Producción</span>
            <span class="sep">&rsaquo;</span>
            <span class="active">Turnos Por Semana</span>
          </nav>
        </div>
      </div>
      
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
                      <button class="export-item-qa">
                        <span class="export-icon">📊</span> Excel (CSV)
                      </button>
                      <button class="export-item-qa">
                        <span class="export-icon">📕</span> PDF
                      </button>
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
                <input type="text" [value]="fechaInicio()" (input)="updateFecha('inicio', $event)" style="border: none; outline: none; background: transparent; font-size: 0.95rem; color: #475569; width: 100%;" />
                <span style="color: #cbd5e1; font-size: 1.1rem; cursor: pointer;" (click)="toggleCalendar('inicio', $event)">📅</span>
              </div>
              @if (showCalendarMenu() === 'inicio') {
                <ng-container *ngTemplateOutlet="calendarTemplate; context: { type: 'inicio' }"></ng-container>
              }
            </div>
            <div class="date-field" style="flex: 1; border-bottom: 1px solid #cbd5e1; padding-bottom: 0.3rem; position: relative;">
              <label style="display: block; font-size: 0.75rem; color: #475569; font-weight: 600; margin-bottom: 0.5rem;">Fecha Fin *</label>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <input type="text" [value]="fechaFin()" (input)="updateFecha('fin', $event)" style="border: none; outline: none; background: transparent; font-size: 0.95rem; color: #475569; width: 100%;" />
                <span style="color: #cbd5e1; font-size: 1.1rem; cursor: pointer;" (click)="toggleCalendar('fin', $event)">📅</span>
              </div>
              @if (showCalendarMenu() === 'fin') {
                <ng-container *ngTemplateOutlet="calendarTemplate; context: { type: 'fin' }"></ng-container>
              }
            </div>
          </div>
          
          <!-- Action button -->
          <button (click)="showTables.set(true)" style="background: #4caf50; color: white; font-weight: 600; padding: 0.6rem 1.5rem; border: none; border-radius: 2px; margin-bottom: 2rem; cursor: pointer; font-size: 0.75rem; text-transform: uppercase;">PROGRAMAR O CONSULTAR</button>
          
          <!-- Inner Tabs -->
          <div class="inner-tabs-container" style="border: 1px solid #cbd5e1; border-radius: 2px;">
            <div class="inner-tabs" style="display: flex; border-bottom: 1px solid #cbd5e1; padding: 0 1rem; background: white; flex-wrap: wrap;">
              @if (activeMainTab() === 'extrusoras') {
                @for (maq of extrusoras(); track maq.id) {
                  <div class="inner-tab" 
                       [class.active]="activeInnerTab() === maq.id"
                       (click)="activeInnerTab.set(maq.id)">{{ maq.nombre }}</div>
                }
              } @else {
                @for (maq of prensas(); track maq.id) {
                  <div class="inner-tab" 
                       [class.active]="activeInnerTab() === maq.id"
                       (click)="activeInnerTab.set(maq.id)">{{ maq.nombre }}</div>
                }
              }
            </div>
            <div class="inner-tab-content" style="min-height: 80px; background: white;">
              @if (showTables()) {
                <div style="padding: 1.5rem;">
                  @if (turnos().length === 0) {
                    <div style="padding: 2rem; text-align: center; color: #94a3b8; font-style: italic; border: 1px dashed #cbd5e1; border-radius: 4px;">
                      No hay turnos registrados en la base de datos.
                    </div>
                  }
                  @for (turno of turnos(); track turno.id) {
                    <div style="border: 1px solid #cbd5e1; border-radius: 2px; margin-bottom: 1.5rem;">
                      <div style="padding: 0.5rem; display: flex; align-items: center; border-bottom: 1px solid #cbd5e1;">
                        <span class="icon" style="background: #4caf50; padding: 0.1rem 0.3rem; border-radius: 2px; color: white; margin-right: 0.5rem; font-size: 0.6rem;">◆</span>
                        <span style="color: #475569; font-weight: 600; font-size: 0.8rem;">{{ turno.nombre }}</span>
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
                            @for (dia of weekDays(); track dia.date) {
                              <tr style="border-bottom: 1px solid #f1f5f9;">
                                <td style="padding: 0.6rem 0.5rem; font-family: monospace; font-size: 0.7rem;">{{ getCelda(activeInnerTab(), dia.date, turno.id).extrusionIdLegacy || '---' }}</td>
                                <td style="padding: 0.6rem 0.5rem;">
                                  <span [ngStyle]="{'color': getCelda(activeInnerTab(), dia.date, turno.id).status ? '#005a70' : '#94a3b8'}">
                                    {{ getCelda(activeInnerTab(), dia.date, turno.id).status || 'PorProgramar' }}
                                  </span>
                                </td>
                                <td style="padding: 0.6rem 0.5rem;">{{ dia.date }}</td>
                                <td style="padding: 0.6rem 0.5rem;">
                                  <div style="display: flex; align-items: center; border-bottom: 1px solid #cbd5e1; width: max-content;">
                                    <span style="margin-right: 0.5rem;">{{ turno.horaInicio }}</span>
                                    <span style="color: #cbd5e1; font-size: 0.9rem;">📅</span>
                                  </div>
                                </td>
                                <td style="padding: 0.6rem 0.5rem;">{{ dia.name }}</td>
                                <td style="padding: 0.6rem 0.5rem;">
                                  <select [ngModel]="getCelda(activeInnerTab(), dia.date, turno.id).producto" (ngModelChange)="updateCelda(activeInnerTab(), dia.date, turno.id, 'producto', $event)" style="border: none; outline: none; border-bottom: 1px solid #cbd5e1; width: 100px; background: transparent; font-size: 0.75rem;">
                                    <option [value]="undefined"></option>
                                    @for (p of productos(); track p.id) {
                                      <option [value]="p.nombre">{{ p.nombre }}</option>
                                    }
                                  </select>
                                </td>
                                <td style="padding: 0.6rem 0.5rem; text-align: center;">
                                  <input type="number" [ngModel]="getCelda(activeInnerTab(), dia.date, turno.id).programado" (ngModelChange)="updateCelda(activeInnerTab(), dia.date, turno.id, 'programado', $event)" style="width: 50px; text-align: center; border: 1px solid #e2e8f0; border-radius: 2px; padding: 0.2rem;" />
                                </td>
                                <td style="padding: 0.6rem 0.5rem; text-align: center;">
                                  {{ getCelda(activeInnerTab(), dia.date, turno.id).producido || 0 }}
                                </td>
                                <td style="padding: 0.6rem 0.5rem;">
                                  <select [ngModel]="getCelda(activeInnerTab(), dia.date, turno.id).operarioId" (ngModelChange)="updateCelda(activeInnerTab(), dia.date, turno.id, 'operarioId', $event)" style="border: none; outline: none; border-bottom: 1px solid #cbd5e1; width: 120px; background: transparent; font-size: 0.75rem;">
                                    <option [value]="undefined"></option>
                                    @for (o of operarios(); track o.id) {
                                      <option [value]="o.id">{{ o.nombre }}</option>
                                    }
                                  </select>
                                </td>
                              </tr>
                            }
                            @if (weekDays().length === 0) {
                              <tr>
                                <td colspan="9" style="padding: 2rem; text-align: center; color: #94a3b8; font-style: italic; border: 1px dashed #cbd5e1; border-radius: 4px;">
                                  Seleccione la fecha de inicio para cargar la programación de la semana
                                </td>
                              </tr>
                            }
                          </tbody>
                        </table>
                        <div style="margin-top: 1rem;">
                          <button (click)="guardarProgramacion()" style="background: #4caf50; color: white; font-weight: 600; padding: 0.5rem 1.5rem; border: none; border-radius: 2px; cursor: pointer; font-size: 0.75rem;">GUARDAR</button>
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
      

    </div>

    <!-- Calendar Template -->
    <ng-template #calendarTemplate let-type="type">
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
          @for (day of [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]; track day) {
            <span class="calendar-day" 
                  [class.selected-day]="isDaySelected(day, type)"
                  (click)="selectDate(day, type)">
              {{ day }}
            </span>
          }
          <span style="color: #94a3b8;">1</span><span style="color: #94a3b8;">2</span><span style="color: #94a3b8;">3</span><span style="color: #94a3b8;">4</span>
        </div>
        <div style="margin-top: 1rem; border-top: 1px solid #e2e8f0; padding-top: 0.5rem; text-align: right;">
          <button (click)="limpiar(type)" style="border: 1px solid #cbd5e1; background: white; padding: 0.3rem 0.8rem; border-radius: 2px; cursor: pointer; font-size: 0.8rem; color: #475569;">Limpiar</button>
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
    .calendar-day {
      cursor: pointer;
      padding: 0.2rem;
      border-radius: 4px;
      transition: background 0.2s;
    }
    .calendar-day:hover {
      background: #e2e8f0;
    }
    .selected-day {
      background: #3b82f6 !important;
      color: white;
    }
  `],
  host: { '(click)': 'closeMenus()' }
})
export class TurnosSemanaComponent implements OnInit {
  private svc = inject(ProduccionConfigService);
  
  turnos = signal<Turno[]>([]);
  
  activeMainTab = signal<'extrusoras' | 'prensas'>('extrusoras');
  activeInnerTab = signal<string>('extrusora1');
  
  showGridMenu = signal(false);
  showCalendarMenu = signal<'inicio' | 'fin' | null>(null);
  showTables = signal(false);

  fechaInicio = signal('');
  fechaFin = signal('');

  weekDays = computed(() => {
    const inicio = this.fechaInicio();
    if (!inicio) return [];
    
    const parts = inicio.split('/');
    if (parts.length !== 3) return [];
    
    let day = parseInt(parts[0], 10);
    const daysName = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    
    return Array.from({length: 7}).map((_, i) => {
      const d = day + i;
      const formattedDay = d < 10 ? '0' + d : d;
      return { date: `${formattedDay}/${parts[1]}/${parts[2]}`, name: daysName[i % 7] };
    });
  });

  extrusoras = signal<Extrusora[]>([]);
  prensas = signal<Prensa[]>([]);
  productos = signal<Producto[]>([]);
  operarios = signal<Operario[]>([]);

  matriz = signal<Record<string, any>>({});

  getCelda(maquinaId: string, fecha: string, turnoId: string) {
    const key = `${maquinaId}_${fecha}_${turnoId}`;
    return this.matriz()[key] || { maquinaId, fecha, turnoId, programado: 0 };
  }

  updateCelda(maquinaId: string, fecha: string, turnoId: string, field: string, value: any) {
    const key = `${maquinaId}_${fecha}_${turnoId}`;
    const mat = { ...this.matriz() };
    if (!mat[key]) mat[key] = { maquinaId, fecha, turnoId, programado: 0 };
    mat[key][field] = value;
    this.matriz.set(mat);
  }

  guardarProgramacion() {
    const dias = Object.values(this.matriz()).map(c => ({
      maquinaId: c.maquinaId,
      // Convert DD/MM/YY or DD/MM/YYYY to YYYY-MM-DD
      fecha: this.parseDateString(c.fecha),
      turnoId: c.turnoId,
      producto: c.producto,
      operarioId: c.operarioId,
      programado: c.programado || 0
    }));

    if (dias.length === 0) return;

    if (this.activeMainTab() === 'extrusoras') {
      this.svc.saveProgramacionExtrusionBatch({ dias }).subscribe(() => {
        alert('Programación de extrusoras guardada con éxito');
      });
    } else {
      this.svc.saveProgramacionPrensadoBatch({ dias }).subscribe(() => {
        alert('Programación de prensas guardada con éxito');
      });
    }
  }

  parseDateString(dateStr: string): string {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      let y = parts[2];
      if (y.length === 2) y = '20' + y;
      return `${y}-${parts[1]}-${parts[0]}`;
    }
    return new Date().toISOString().split('T')[0];
  }

  ngOnInit() {
    this.svc.getTurnos().subscribe({
      next: (data: Turno[] | null) => this.turnos.set(data || []),
      error: (err: any) => {
        console.warn('Error fetching turnos', err);
        this.turnos.set([]);
      }
    });
    this.svc.getExtrusoras().subscribe(res => {
      this.extrusoras.set(res || []);
      if (res && res.length > 0 && this.activeMainTab() === 'extrusoras') {
        this.activeInnerTab.set(res[0].id);
      }
    });
    this.svc.getPrensas().subscribe(res => {
      this.prensas.set(res || []);
      if (res && res.length > 0 && this.activeMainTab() === 'prensas') {
        this.activeInnerTab.set(res[0].id);
      }
    });
    this.svc.getProductos({activo: true}).subscribe(res => this.productos.set(res || []));
    this.svc.getOperarios().subscribe(res => this.operarios.set(res || []));
  }

  setMainTab(tab: 'extrusoras' | 'prensas', event?: Event) {
    if (event) event.stopPropagation();
    this.activeMainTab.set(tab);
    if (tab === 'extrusoras') {
      const ext = this.extrusoras();
      if (ext.length > 0) this.activeInnerTab.set(ext[0].id);
    } else {
      const pr = this.prensas();
      if (pr.length > 0) this.activeInnerTab.set(pr[0].id);
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

  updateFecha(type: 'inicio' | 'fin', event: any) {
    if (type === 'inicio') {
      this.fechaInicio.set(event.target.value);
    } else {
      this.fechaFin.set(event.target.value);
    }
  }

  selectDate(day: number, type: 'inicio' | 'fin') {
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    if (type === 'inicio') {
      this.fechaInicio.set(`${formattedDay}/06/26`);
    } else {
      this.fechaFin.set(`${formattedDay}/06/26`);
    }
    this.closeMenus();
  }

  isDaySelected(day: number, type: 'inicio' | 'fin'): boolean {
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const val = type === 'inicio' ? this.fechaInicio() : this.fechaFin();
    return val.startsWith(`${formattedDay}/`);
  }

  limpiar(type: 'inicio' | 'fin') {
    if (type === 'inicio') {
      this.fechaInicio.set('');
    } else {
      this.fechaFin.set('');
    }
    this.closeMenus();
  }

  closeMenus() {
    this.showGridMenu.set(false);
    this.showCalendarMenu.set(null);
  }
}
