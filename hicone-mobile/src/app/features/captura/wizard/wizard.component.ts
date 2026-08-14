import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProduccionService } from '../../../core/services/produccion';
import { AuthService } from '../../../core/services/auth.service';
import { InventarioService, Silo } from '../../../core/services/inventario.service';

@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="wizard-container" (touchstart)="onTouchStart($event)" (touchend)="onTouchEnd($event)">
      <!-- Slide 1: Selección de Operación -->
      <div class="wizard-slide" *ngIf="currentStep === 1">
        <div class="illustration-container">
          <!-- Ilustración de Operación SVG -->
          <svg viewBox="0 0 200 150" fill="none" class="illust-svg">
            <rect x="70" y="30" width="60" height="100" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
            <circle cx="100" cy="50" r="12" fill="#14b8a6" fill-opacity="0.2" stroke="#14b8a6" stroke-width="2"/>
            <path d="M90 90h20m-20 15h15" stroke="#64748b" stroke-width="2" stroke-linecap="round"/>
            <rect x="140" y="60" width="40" height="60" rx="6" fill="#1e293b" fill-opacity="0.6" stroke="#475569" stroke-width="1"/>
            <path d="M148 80h24m-24 10h16" stroke="#475569" stroke-width="1.5"/>
            <!-- Robot/Operario abstracto -->
            <circle cx="45" cy="75" r="10" fill="#38bdf8"/>
            <rect x="35" y="88" width="20" height="25" rx="5" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <path d="M30 95c0-5 30-5 30 0" stroke="#38bdf8" stroke-width="2"/>
          </svg>
        </div>

        <div class="wizard-content">
          <h1>Operación</h1>
          <p class="subtitle">Elija la operación que desea iniciar</p>

          <div class="btn-group">
            <button class="btn btn-teal" (click)="selectProceso('extrusion')">EXTRUSIÓN</button>
            <button class="btn btn-white" (click)="selectProceso('prensado')">PRENSADO</button>
          </div>
        </div>
      </div>

      <!-- Slide 2: Detalles (Máquina y Producto) -->
      <div class="wizard-slide" *ngIf="currentStep === 2">
        <div class="illustration-container">
          <!-- Icono de Lápiz/Detalles SVG -->
          <div class="pencil-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="pencil-svg">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
        </div>

        <div class="wizard-content">
          <h1>Detalles</h1>
          <p class="subtitle">Ingresar datos necesarios</p>

          <div class="form-group">
            <label>Máquina</label>
            <select [(ngModel)]="selectedMaquinaId" (change)="onMaquinaChange()" class="form-select">
              <option value="" disabled selected>Seleccione la máquina...</option>
              <option *ngFor="let maq of maquinas" [value]="maq.id">{{ maq.nombre }} ({{ maq.codigo }})</option>
            </select>
          </div>

          <div class="form-group">
            <label>Producto</label>
            <select [(ngModel)]="selectedProductoId" (change)="onProductoChange()" class="form-select" [disabled]="!selectedMaquinaId">
              <option value="" disabled selected>
                {{ !selectedMaquinaId ? 'Seleccione primero la máquina...' : 'Seleccione el producto...' }}
              </option>
              <option *ngFor="let prod of productosFiltrados" [value]="prod.id">{{ prod.codigo }}</option>
            </select>
            <p *ngIf="selectedMaquinaId && productosFiltrados.length === 0" class="no-products-warning">
              ⚠️ No hay productos configurados para esta máquina en la base de datos.
            </p>
          </div>

          <div class="btn-group" style="margin-top: 10px;">
            <button class="btn btn-teal" [disabled]="!selectedMaquinaId || !selectedProductoId" (click)="nextStep()">CONTINUAR</button>
          </div>
        </div>
      </div>

      <!-- Slide 3: Confirmación / Operar -->
      <div class="wizard-slide" *ngIf="currentStep === 3">
        <div class="wizard-content wizard-scrollable">
          <h1>Operar</h1>
          <p class="subtitle">Completar datos de inicio para la {{ selectedProceso === 'extrusion' ? 'Extrusora' : 'Prensa' }}</p>

          <div class="summary-card">
            <div class="summary-item">
              <span class="label">Máquina:</span>
              <span class="value">{{ getSelectedMaquinaNombre() }}</span>
            </div>
            <div class="summary-item">
              <span class="label">Producto:</span>
              <span class="value">{{ getSelectedProductoNombre() }}</span>
            </div>
          </div>

          <!-- FORMULARIO DE EXTRUSIÓN -->
          <div *ngIf="selectedProceso === 'extrusion'" class="process-form">
            <div class="form-row">
              <div class="form-group half-width">
                <label>Silo Virgen</label>
                <select [(ngModel)]="selectedSiloVirgenId" class="form-select">
                  <option value="" disabled selected>Silo Virgen...</option>
                  <option *ngFor="let s of silosVirgen" [value]="s.id">{{ s.nombre }} ({{ s.existenciaActual }} kg)</option>
                </select>
              </div>
              <div class="form-group half-width">
                <label>Virgen Kilos</label>
                <input type="number" [(ngModel)]="virgenKg" class="form-input" placeholder="0">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group half-width">
                <label>Silo Molido (Opc.)</label>
                <select [(ngModel)]="selectedSiloMolidoId" class="form-select">
                  <option value="">Ninguno</option>
                  <option *ngFor="let s of silosMolido" [value]="s.id">{{ s.nombre }} ({{ s.existenciaActual }} kg)</option>
                </select>
              </div>
              <div class="form-group half-width">
                <label>Molido Kilos</label>
                <input type="number" [(ngModel)]="molidoKg" class="form-input" placeholder="0">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group half-width">
                <label>RPM Husillo Virgen</label>
                <input type="number" [(ngModel)]="revHusilloVirgen" class="form-input" placeholder="0">
              </div>
              <div class="form-group half-width">
                <label>RPM Husillo Molido</label>
                <input type="number" [(ngModel)]="revHusilloMolido" class="form-input" placeholder="0">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group half-width">
                <label>Meta Kilos</label>
                <input type="number" [(ngModel)]="metaKg" class="form-input" placeholder="0">
              </div>
              <div class="form-group half-width">
                <label>Lote Aditivos</label>
                <input type="text" [(ngModel)]="lotePaqueteAditivos" class="form-input" placeholder="Lote...">
              </div>
            </div>

            <div class="form-group">
              <label>Observaciones</label>
              <textarea [(ngModel)]="observaciones" class="form-textarea" rows="2" placeholder="Observaciones de inicio..."></textarea>
            </div>
          </div>

          <!-- FORMULARIO DE PRENSADO -->
          <div *ngIf="selectedProceso === 'prensado'" class="process-form">
            <div class="form-group">
              <label>Troquel</label>
              <select [(ngModel)]="selectedTroquelId" class="form-select">
                <option value="" disabled selected>Seleccione el troquel...</option>
                <option *ngFor="let t of troqueles" [value]="t.id">{{ t.nombre }} ({{ t.codigo }})</option>
              </select>
            </div>

            <div class="form-group">
              <label>Observaciones</label>
              <textarea [(ngModel)]="observaciones" class="form-textarea" rows="3" placeholder="Observaciones de inicio..."></textarea>
            </div>
          </div>

          <div class="btn-group" style="margin-top: 15px;">
            <button class="btn btn-teal" [disabled]="isSubmitting || !isFormReady()" (click)="iniciarOperacion()">
              <span *ngIf="!isSubmitting">INICIAR OPERACIÓN</span>
              <span *ngIf="isSubmitting">INICIANDO...</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Indicadores de Pasos (Dots) -->
      <div class="wizard-indicators">
        <div class="dot" [class.active]="currentStep === 1" (click)="goToStep(1)"></div>
        <div class="dot" [class.active]="currentStep === 2" (click)="goToStep(2)"></div>
        <div class="dot" [class.active]="currentStep === 3" (click)="goToStep(3)"></div>
      </div>

      <!-- Botón de Cerrar (X) -->
      <div class="wizard-close-container">
        <button class="close-btn" (click)="closeWizard()" title="Cerrar Wizard">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .wizard-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      min-height: calc(100vh - 120px);
      padding: 16px 12px;
      color: var(--text-main);
      animation: fadeIn 0.3s ease-out;
      user-select: none;
    }

    .wizard-slide {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      max-width: 420px;
      animation: slideIn 0.3s ease-out;
      overflow: hidden;
    }

    .wizard-scrollable {
      max-height: calc(100vh - 200px);
      overflow-y: auto;
      padding-right: 4px;
      width: 100%;
    }

    /* Ocultar barra de scroll en navegadores basados en WebKit */
    .wizard-scrollable::-webkit-scrollbar {
      width: 4px;
    }
    .wizard-scrollable::-webkit-scrollbar-thumb {
      background: var(--border-color);
      border-radius: 2px;
    }

    .illustration-container {
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 120px;
    }

    .illust-svg {
      width: 150px;
      height: 110px;
    }

    .pencil-icon-wrapper, .phone-icon-wrapper {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background-color: rgba(56, 189, 248, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #38bdf8;
      box-shadow: 0 0 20px rgba(56, 189, 248, 0.15);
    }

    .pencil-svg, .phone-svg {
      width: 32px;
      height: 32px;
    }

    .wizard-content {
      width: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .wizard-content h1 {
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.5px;
      color: var(--text-main);
      margin: 0;
    }

    .wizard-content .subtitle {
      font-size: 13px;
      color: var(--text-muted);
      margin: 0 0 6px 0;
    }

    /* Formulario */
    .form-group {
      text-align: left;
      display: flex;
      flex-direction: column;
      gap: 5px;
      width: 100%;
      margin-bottom: 8px;
    }

    .form-group label {
      font-size: 11px;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .form-select, .form-input, .form-textarea {
      background-color: #151f32;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      color: var(--text-main);
      padding: 10px 12px;
      font-size: 14px;
      width: 100%;
      outline: none;
      transition: var(--transition-smooth);
      box-sizing: border-box;
    }

    .form-select:focus, .form-input:focus, .form-textarea:focus {
      border-color: var(--primary);
      box-shadow: 0 0 8px rgba(56, 189, 248, 0.25);
    }

    .form-textarea {
      resize: none;
    }

    .form-row {
      display: flex;
      gap: 10px;
      width: 100%;
    }

    .half-width {
      width: 50%;
    }

    .process-form {
      display: flex;
      flex-direction: column;
      gap: 4px;
      width: 100%;
      margin-top: 10px;
    }

    .no-products-warning {
      color: #f59e0b;
      font-size: 11px;
      margin-top: 4px;
      text-align: left;
    }

    /* Resumen */
    .summary-card {
      background-color: #151f32;
      border: 1px solid var(--border-color);
      border-radius: 10px;
      padding: 12px;
      text-align: left;
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
    }

    .summary-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      padding-bottom: 6px;
    }

    .summary-item:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .summary-item .label {
      font-size: 12px;
      color: var(--text-muted);
    }

    .summary-item .value {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-main);
    }

    /* Botones */
    .btn-group {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
    }

    .btn {
      width: 100%;
      padding: 12px;
      font-size: 14px;
      font-weight: 700;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      transition: var(--transition-smooth);
      letter-spacing: 0.5px;
    }

    .btn-teal {
      background-color: var(--primary);
      color: #080e1a;
    }

    .btn-teal:hover:not(:disabled) {
      background-color: #0ea5e9;
      transform: translateY(-1px);
    }

    .btn-teal:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-white {
      background-color: #ffffff;
      color: #080e1a;
      border: 1px solid #ffffff;
    }

    .btn-white:hover {
      background-color: rgba(255, 255, 255, 0.9);
      transform: translateY(-1px);
    }

    /* Indicadores */
    .wizard-indicators {
      display: flex;
      gap: 10px;
      margin: 16px 0;
    }

    .dot {
      width: 24px;
      height: 6px;
      border-radius: 3px;
      background-color: #1e293b;
      cursor: pointer;
      transition: var(--transition-smooth);
    }

    .dot.active {
      background-color: var(--primary);
      box-shadow: 0 0 8px rgba(56, 189, 248, 0.4);
    }

    /* Botón de Cerrar */
    .wizard-close-container {
      margin-top: 5px;
    }

    .close-btn {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      border: 1px solid var(--border-color);
      background-color: transparent;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: var(--transition-smooth);
    }

    .close-btn:hover {
      border-color: #ef4444;
      color: #ef4444;
      background-color: rgba(239, 68, 68, 0.05);
    }

    .close-btn svg {
      width: 18px;
      height: 18px;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideIn {
      from { opacity: 0; transform: translateX(30px); }
      to { opacity: 1; transform: translateX(0); }
    }
  `]
})
export class WizardComponent implements OnInit {
  private produccionService = inject(ProduccionService);
  private authService = inject(AuthService);
  private inventarioService = inject(InventarioService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  currentStep = 1;
  selectedProceso = 'extrusion';
  maquinas: any[] = [];
  productos: any[] = [];
  extrusoraProductos: any[] = [];
  productosFiltrados: any[] = [];

  selectedMaquinaId = '';
  selectedProductoId = '';

  // Parámetros de Mezcla e Inicio (Paso 3)
  silosVirgen: Silo[] = [];
  silosMolido: Silo[] = [];
  troqueles: any[] = [];

  selectedSiloVirgenId = '';
  virgenKg = 1000;
  selectedSiloMolidoId = '';
  molidoKg = 0;
  metaKg = 5000;
  revHusilloVirgen = 45;
  revHusilloMolido = 0;
  lotePaqueteAditivos = 'LOT-AD-01';
  observaciones = '';

  // Prensado
  selectedTroquelId = '';

  isSubmitting = false;
  private touchStartX = 0;

  ngOnInit() {
    // 1. Cargar catálogo base de productos (fallback)
    this.produccionService.getProductos().subscribe({
      next: (prods: any[]) => {
        this.productos = prods;
        if (this.selectedProceso !== 'extrusion') {
          this.productosFiltrados = prods;
        }
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('Error cargando productos:', err)
    });

    // 2. Cargar todas las relaciones Extrusora-Producto
    this.produccionService.getExtrusoraProductos().subscribe({
      next: (data: any[]) => {
        this.extrusoraProductos = data;
        this.onMaquinaChange(); // Filtrar inicialmente si ya hay máquina
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('Error cargando extrusora-productos:', err)
    });

    // 3. Cargar silos desde Inventario
    this.inventarioService.getSilos().subscribe({
      next: (silos: Silo[]) => {
        this.silosVirgen = silos.filter(s => s.estadoMaterial?.toLowerCase().includes('virgen'));
        this.silosMolido = silos.filter(s => s.estadoMaterial?.toLowerCase().includes('molido'));
        if (this.silosVirgen.length > 0) {
          this.selectedSiloVirgenId = this.silosVirgen[0].id;
        }
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('Error cargando silos:', err)
    });

    // 4. Cargar troqueles desde Catálogos
    this.produccionService.getTroqueles().subscribe({
      next: (troqs: any[]) => {
        this.troqueles = troqs;
        if (troqs.length > 0) {
          this.selectedTroquelId = troqs[0].id;
        }
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('Error cargando troqueles:', err)
    });

    // Cargar extrusoras por defecto
    this.cargarMaquinas();
  }

  cargarMaquinas() {
    this.maquinas = [];
    if (this.selectedProceso === 'extrusion') {
      this.produccionService.getExtrusoras().subscribe({
        next: (exts: any[]) => {
          this.maquinas = exts;
          this.cdr.detectChanges();
        },
        error: (err: any) => console.error('Error cargando extrusoras:', err)
      });
    } else {
      this.produccionService.getPrensas().subscribe({
        next: (prensas: any[]) => {
          this.maquinas = prensas;
          this.cdr.detectChanges();
        },
        error: (err: any) => console.error('Error cargando prensas:', err)
      });
    }
  }

  selectProceso(proceso: string) {
    this.selectedProceso = proceso;
    this.selectedMaquinaId = '';
    this.selectedProductoId = '';
    this.productosFiltrados = [];
    this.cargarMaquinas();
    this.nextStep();
  }

  onMaquinaChange() {
    this.selectedProductoId = '';
    if (this.selectedProceso === 'extrusion') {
      // Filtrar los productos configurados específicamente para esta extrusora
      const relaciones = this.extrusoraProductos.filter(ep => ep.extrusoraId === this.selectedMaquinaId);
      this.productosFiltrados = relaciones.map(ep => ep.producto).filter(p => !!p);
    } else {
      // Prensado: por defecto muestra todos los productos
      this.productosFiltrados = this.productos;
    }
  }

  onProductoChange() {
    // Si es extrusión, precargamos los valores predeterminados de la relación extrusora-producto
    if (this.selectedProceso === 'extrusion' && this.selectedMaquinaId && this.selectedProductoId) {
      const ep = this.extrusoraProductos.find(
        x => x.extrusoraId === this.selectedMaquinaId && x.productoId === this.selectedProductoId
      );
      if (ep) {
        this.virgenKg = ep.defaultVirgenKg !== undefined ? ep.defaultVirgenKg : 1000;
        this.molidoKg = ep.defaultMolidoKg !== undefined ? ep.defaultMolidoKg : 0;
        this.metaKg = ep.defaultMetaKg !== undefined ? ep.defaultMetaKg : 5000;
        this.revHusilloVirgen = ep.defaultRevHusilloVirgen !== undefined ? ep.defaultRevHusilloVirgen : 45;
        this.revHusilloMolido = ep.defaultRevHusilloMolido !== undefined ? ep.defaultRevHusilloMolido : 0;
      }
    }
  }

  isFormReady(): boolean {
    if (!this.selectedMaquinaId || !this.selectedProductoId) return false;
    if (this.selectedProceso === 'extrusion') {
      return !!this.selectedSiloVirgenId && this.virgenKg > 0 && this.metaKg > 0;
    } else {
      return !!this.selectedTroquelId;
    }
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(step: number) {
    // Validaciones básicas de navegación
    if (step === 2 && !this.selectedProceso) return;
    if (step === 3 && (!this.selectedMaquinaId || !this.selectedProductoId)) return;
    this.currentStep = step;
  }

  getSelectedMaquinaNombre(): string {
    const maquina = this.maquinas.find(m => m.id === this.selectedMaquinaId);
    return maquina ? maquina.nombre : 'No seleccionada';
  }

  getSelectedProductoNombre(): string {
    const prod = this.productosFiltrados.find(p => p.id === this.selectedProductoId);
    return prod ? prod.codigo : 'No seleccionado';
  }

  closeWizard() {
    this.router.navigate(['/']);
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    const touchEndX = event.changedTouches[0].screenX;
    const diff = this.touchStartX - touchEndX;

    if (diff > 60) {
      this.nextStep();
    } else if (diff < -60) {
      this.prevStep();
    }
  }

  iniciarOperacion() {
    if (!this.isFormReady()) return;
    this.isSubmitting = true;
    const user = this.authService.currentUser();

    this.produccionService.getOperarios().subscribe({
      next: (operarios: any[]) => {
        let operarioId = user?.operadorId || (operarios && operarios.length > 0 ? operarios[0].id : null);
        if (!operarioId && operarios && operarios.length > 0) {
          operarioId = operarios[0].id;
        }

        this.produccionService.getTurnos().subscribe({
          next: (turnos: any[]) => {
            const hour = new Date().getHours();
            let turno: any;
            if (hour >= 22 || hour < 6) {
              // Nocturno: buscar turno que contenga "3er" o "nocturno"
              turno = turnos.find(t => t.nombre?.toLowerCase().includes('3er') || t.nombre?.toLowerCase().includes('nocturno'));
            } else if (hour >= 14 && hour < 22) {
              // Vespertino
              turno = turnos.find(t => t.nombre?.toLowerCase().includes('vespertino'));
            } else {
              // Matutino
              turno = turnos.find(t => t.nombre?.toLowerCase().includes('matutino'));
            }
            // Si no matchea ninguno, usar el primero disponible
            const turnoId = turno?.id || (turnos.length > 0 ? turnos[0].id : null);

            if (!turnoId) {
              this.isSubmitting = false;
              alert('No se encontraron turnos configurados en el sistema.');
              return;
            }

        if (this.selectedProceso === 'extrusion') {
          const request = {
            extrusoraId: this.selectedMaquinaId,
            operarioId: operarioId,
            turnoId: turnoId,
            productoId: this.selectedProductoId,
            siloVirgenId: this.selectedSiloVirgenId,
            virgenKg: this.virgenKg,
            siloMolidoId: this.selectedSiloMolidoId || null,
            molidoKg: this.molidoKg || 0,
            metaKg: this.metaKg,
            revHusilloVirgen: this.revHusilloVirgen,
            revHusilloMolido: this.revHusilloMolido,
            lotePaqueteAditivos: this.lotePaqueteAditivos,
            observaciones: this.observaciones
          };

          this.produccionService.iniciarExtrusion(request).subscribe({
            next: (res: any) => {
              this.isSubmitting = false;
              alert('¡Proceso de Extrusión iniciado con éxito!');
              this.router.navigate(['/']);
            },
            error: (err: any) => {
              this.isSubmitting = false;
              console.error('Error al iniciar extrusión:', err);
              alert('Error al iniciar extrusión: ' + (err.error?.message || err.message || 'Verifique los parámetros.'));
            }
          });

        } else {
          const request = {
            prensaId: this.selectedMaquinaId,
            operarioId: operarioId,
            turnoId: turnoId,
            productoId: this.selectedProductoId,
            troquelId: this.selectedTroquelId
          };

          this.produccionService.iniciarPrensado(request).subscribe({
            next: (res: any) => {
              this.isSubmitting = false;
              alert('¡Proceso de Prensado iniciado con éxito!');
              this.router.navigate(['/']);
            },
            error: (err: any) => {
              this.isSubmitting = false;
              console.error('Error al iniciar prensado:', err);
              alert('Error al iniciar prensado: ' + (err.error?.message || err.message || 'Verifique la máquina.'));
            }
          });
        }
          },
          error: (errTurnos: any) => {
            this.isSubmitting = false;
            console.error('Error obteniendo turnos:', errTurnos);
            alert('Error al obtener los turnos del sistema.');
          }
        });
      },
      error: (err: any) => {
        this.isSubmitting = false;
        console.error('Error obteniendo listado de operarios:', err);
        alert('Error al obtener datos de los operarios.');
      }
    });
  }
}
