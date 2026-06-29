import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProduccionService } from '../../../core/services/produccion';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="wizard-container">
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
            <select [(ngModel)]="selectedMaquinaId" class="form-select">
              <option value="" disabled selected>Seleccione la máquina...</option>
              <option *ngFor="let maq of maquinas" [value]="maq.id">{{ maq.nombre }} ({{ maq.codigo }})</option>
            </select>
          </div>

          <div class="form-group">
            <label>Producto</label>
            <select [(ngModel)]="selectedProductoId" class="form-select">
              <option value="" disabled selected>Seleccione el producto...</option>
              <option *ngFor="let prod of productos" [value]="prod.id">{{ prod.nombre }} ({{ prod.codigo }})</option>
            </select>
          </div>

          <div class="btn-group" style="margin-top: 10px;">
            <button class="btn btn-teal" [disabled]="!selectedMaquinaId || !selectedProductoId" (click)="nextStep()">CONTINUAR</button>
          </div>
        </div>
      </div>

      <!-- Slide 3: Confirmación / Operar -->
      <div class="wizard-slide" *ngIf="currentStep === 3">
        <div class="illustration-container">
          <!-- Celular/Iniciar SVG -->
          <div class="phone-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="phone-svg">
              <rect x="5" y="2" width="14" height="20" rx="2" />
              <path d="M12 18h.01" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>

        <div class="wizard-content">
          <h1>Operar</h1>
          <p class="subtitle">Completar datos para iniciar operación</p>

          <!-- Resumen de Configuración -->
          <div class="summary-card">
            <div class="summary-item">
              <span class="label">Proceso:</span>
              <span class="value">{{ selectedProceso === 'extrusion' ? 'Extrusión' : 'Prensado' }}</span>
            </div>
            <div class="summary-item">
              <span class="label">Máquina:</span>
              <span class="value">{{ getSelectedMaquinaNombre() }}</span>
            </div>
            <div class="summary-item">
              <span class="label">Producto:</span>
              <span class="value">{{ getSelectedProductoNombre() }}</span>
            </div>
          </div>

          <div class="btn-group" style="margin-top: 15px;">
            <button class="btn btn-teal" [disabled]="isSubmitting" (click)="iniciarOperacion()">
              <span *ngIf="!isSubmitting">INICIAR OPERACIÓN</span>
              <span *ngIf="isSubmitting">INICIANDO...</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Indicadores de Pasos (Dots) -->
      <div class="wizard-indicators">
        <div class="dot" [class.active]="currentStep === 1" (click)="goToStep(1)"></div>
        <div class="dot" [class.active]="currentStep === 2" (click)="selectedProceso && goToStep(2)"></div>
        <div class="dot" [class.active]="currentStep === 3" (click)="selectedProceso && selectedMaquinaId && selectedProductoId && goToStep(3)"></div>
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
      padding: 24px 16px;
      color: var(--text-main);
      animation: fadeIn 0.3s ease-out;
    }

    .wizard-slide {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      max-width: 420px;
    }

    .illustration-container {
      margin-bottom: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 150px;
    }

    .illust-svg {
      width: 180px;
      height: 135px;
    }

    .pencil-icon-wrapper, .phone-icon-wrapper {
      width: 80px;
      height: 80px;
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
      width: 40px;
      height: 40px;
    }

    .wizard-content {
      width: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .wizard-content h1 {
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -0.5px;
      color: var(--text-main);
      margin: 0;
    }

    .wizard-content .subtitle {
      font-size: 14px;
      color: var(--text-muted);
      margin: 0 0 10px 0;
    }

    /* Formulario */
    .form-group {
      text-align: left;
      display: flex;
      flex-direction: column;
      gap: 6px;
      width: 100%;
    }

    .form-group label {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .form-select {
      background-color: #151f32;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      color: var(--text-main);
      padding: 12px;
      font-size: 15px;
      width: 100%;
      outline: none;
      transition: var(--transition-smooth);
    }

    .form-select:focus {
      border-color: var(--primary);
      box-shadow: 0 0 8px rgba(56, 189, 248, 0.25);
    }

    /* Resumen */
    .summary-card {
      background-color: #151f32;
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 16px;
      text-align: left;
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
    }

    .summary-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      padding-bottom: 8px;
    }

    .summary-item:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .summary-item .label {
      font-size: 13px;
      color: var(--text-muted);
    }

    .summary-item .value {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-main);
    }

    /* Botones */
    .btn-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
    }

    .btn {
      width: 100%;
      padding: 14px;
      font-size: 15px;
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
      margin: 24px 0;
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
      margin-top: 10px;
    }

    .close-btn {
      width: 44px;
      height: 44px;
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
      width: 20px;
      height: 20px;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class WizardComponent implements OnInit {
  private produccionService = inject(ProduccionService);
  private authService = inject(AuthService);
  private router = inject(Router);

  currentStep = 1;
  selectedProceso = '';
  maquinas: any[] = [];
  productos: any[] = [];
  selectedMaquinaId = '';
  selectedProductoId = '';

  isSubmitting = false;

  ngOnInit() {
    this.produccionService.getProductos().subscribe({
      next: (prods: any[]) => this.productos = prods,
      error: (err: any) => console.error('Error cargando productos:', err)
    });
  }

  selectProceso(proceso: string) {
    this.selectedProceso = proceso;
    this.selectedMaquinaId = '';
    this.maquinas = [];

    if (proceso === 'extrusion') {
      this.produccionService.getExtrusoras().subscribe({
        next: (exts: any[]) => this.maquinas = exts,
        error: (err: any) => console.error('Error cargando extrusoras:', err)
      });
    } else {
      this.produccionService.getPrensas().subscribe({
        next: (prensas: any[]) => this.maquinas = prensas,
        error: (err: any) => console.error('Error cargando prensas:', err)
      });
    }

    this.nextStep();
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
    this.currentStep = step;
  }

  getSelectedMaquinaNombre(): string {
    const maquina = this.maquinas.find(m => m.id === this.selectedMaquinaId);
    return maquina ? maquina.nombre : 'No seleccionada';
  }

  getSelectedProductoNombre(): string {
    const prod = this.productos.find(p => p.id === this.selectedProductoId);
    return prod ? prod.nombre : 'No seleccionado';
  }

  closeWizard() {
    this.router.navigate(['/']);
  }

  iniciarOperacion() {
    this.isSubmitting = true;
    const user = this.authService.currentUser();
    const operarioId = user?.operadorId || '00000000-0000-0000-0000-000000000000'; // Fallback o UUID vacío
    
    // Obtener turno dinámico
    let turnoId = '00000000-0000-0000-0000-000000000001'; // Turno default legacy

    if (this.selectedProceso === 'extrusion') {
      const request = {
        extrusoraId: this.selectedMaquinaId,
        operarioId: operarioId,
        turnoId: turnoId,
        productoId: this.selectedProductoId,
        siloVirgenId: '00000000-0000-0000-0000-000000000001', // Silo por defecto
        virgenKg: 1000,
        siloMolidoId: null,
        molidoKg: 0,
        metaKg: 5000,
        revHusilloVirgen: 45,
        revHusilloMolido: 0,
        lotePaqueteAditivos: 'LOT-AD-01',
        observaciones: 'Iniciado desde el Wizard PWA'
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
          alert('Error al iniciar extrusión. Verifique la conexión o el estado de la máquina.');
        }
      });

    } else {
      const request = {
        prensaId: this.selectedMaquinaId,
        operarioId: operarioId,
        turnoId: turnoId,
        productoId: this.selectedProductoId,
        troquelId: '00000000-0000-0000-0000-000000000001' // Troquel por defecto
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
          alert('Error al iniciar prensado. Verifique la conexión o el estado de la máquina.');
        }
      });
    }
  }
}
