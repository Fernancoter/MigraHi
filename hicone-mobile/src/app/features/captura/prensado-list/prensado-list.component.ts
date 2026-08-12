import { Component, OnInit, inject, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProduccionService } from '../../../core/services/produccion';

@Component({
  selector: 'app-prensado-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="prensado-pwa-container">
      <!-- CARDS LIST CONTAINER -->
      <main class="cards-list">
        <div *ngIf="cargando" class="loading-state">
          <div class="spinner"></div>
          <p>Cargando información de prensados...</p>
        </div>

        <div *ngIf="!cargando && prensados.length === 0" class="empty-state">
          <p>No hay órdenes de prensado disponibles.</p>
        </div>

        <div 
          *ngFor="let item of prensados" 
          class="prensado-card" 
          (click)="seleccionarPrensado(item)"
        >
          <!-- CARD ICON LEFT -->
          <div class="card-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke-dasharray="2 2" />
              <line x1="7" y1="7" x2="17" y2="7" />
              <line x1="7" y1="11" x2="17" y2="11" />
              <line x1="7" y1="15" x2="17" y2="15" />
            </svg>
          </div>

          <!-- CARD GRID CONTENT -->
          <div class="card-details-grid">
            <!-- COL 1: ESTADO Y PRENSA -->
            <div class="detail-group">
              <span class="detail-label">Estado</span>
              <span class="detail-value text-bold">{{ item.estado || item.status || 'Programado' }}</span>

              <span class="detail-label mt-row">Prensa</span>
              <span class="detail-value text-bold">{{ item.prensa || item.prensaNombre || 'Prensa ' + (item.prensaId || '') }}</span>
            </div>

            <!-- COL 2: FECHA Y PRODUCTO -->
            <div class="detail-group">
              <span class="detail-label">Fecha</span>
              <span class="detail-value">{{ formatearFecha(item.fecha || item.fechaInicio) }}</span>

              <span class="detail-label mt-row">Producto</span>
              <span class="detail-value text-bold">{{ item.producto || item.productoClave || '747572000' }}</span>
            </div>

            <!-- COL 3: TURNO -->
            <div class="detail-group justify-end">
              <span class="detail-label">Turno</span>
              <span class="detail-value">{{ item.turno || item.turnoNombre || '3er Turno' }}</span>
            </div>
          </div>
        </div>
      </main>

      <!-- MODAL 1: CONFIRMACIÓN DE CONCLUIR PRENSADO ANTERIOR (Imagen 2) -->
      <div *ngIf="mostrarModalConfirmacion" class="modal-overlay animate-fade-in" (click)="cerrarModalConfirmacion()">
        <div class="modal-dialog confirmation-dialog" (click)="$event.stopPropagation()">
          <div class="modal-content-text">
            ¿Concluir prensado anterior e ingresar?
          </div>
          <div class="dialog-actions">
            <button class="btn-text-cyan" (click)="confirmarConcluirAnterior()">ACEPTAR</button>
          </div>
        </div>
      </div>

      <!-- MODAL 2: CAPTURA DE DATOS DE LEVAS Y RODILLOS (Imágenes 3 y 4) -->
      <div *ngIf="mostrarModalCaptura" class="modal-overlay animate-fade-in" (click)="cerrarModalCaptura()">
        <div class="modal-dialog capture-dialog" (click)="$event.stopPropagation()">
          <div class="capture-body">
            <!-- DOS COLUMNAS: LEVAS Y RODILLOS -->
            <div class="capture-grid">
              <!-- LEVAS -->
              <div class="column-section">
                <div class="section-title-row">
                  <span class="section-label">Levas (UM)</span>
                  <div class="radio-group">
                    <label class="radio-item">
                      <input type="radio" name="levasUm" value="Kg" [(ngModel)]="levasUm" />
                      <span>Kg</span>
                    </label>
                    <label class="radio-item">
                      <input type="radio" name="levasUm" value="Grados" [(ngModel)]="levasUm" />
                      <span>Grados</span>
                    </label>
                  </div>
                </div>

                <div class="input-line-field">
                  <label>Entrada ({{ levasUm }})</label>
                  <input type="number" step="0.1" [(ngModel)]="levasEntrada" placeholder="0.0" />
                </div>

                <div class="input-line-field">
                  <label>Salida ({{ levasUm }})</label>
                  <input type="number" step="0.1" [(ngModel)]="levasSalida" placeholder="0.0" />
                </div>
              </div>

              <!-- RODILLOS -->
              <div class="column-section">
                <div class="section-title-row">
                  <span class="section-label">Rodillos (UM)</span>
                  <div class="radio-group">
                    <label class="radio-item">
                      <input type="radio" name="rodillosUm" value="Kg" [(ngModel)]="rodillosUm" />
                      <span>Kg</span>
                    </label>
                    <label class="radio-item">
                      <input type="radio" name="rodillosUm" value="Grados" [(ngModel)]="rodillosUm" />
                      <span>Grados</span>
                    </label>
                  </div>
                </div>

                <div class="input-line-field">
                  <label>Entrada ({{ rodillosUm }})</label>
                  <input type="number" step="0.1" [(ngModel)]="rodillosEntrada" placeholder="0.0" />
                </div>

                <div class="input-line-field">
                  <label>Salida ({{ rodillosUm }})</label>
                  <input type="number" step="0.1" [(ngModel)]="rodillosSalida" placeholder="0.0" />
                </div>
              </div>
            </div>

            <!-- BUTTONS PROCESAR / CANCELAR -->
            <div class="capture-actions-grid mt-4">
              <button class="btn-procesar-green" [disabled]="guardando" (click)="procesarConclusion()">
                {{ guardando ? 'PROCESANDO...' : 'PROCESAR' }}
              </button>
              <button class="btn-cancelar-grey" (click)="cerrarModalCaptura()">
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .prensado-pwa-container {
      background-color: #121212;
      color: #e0e0e0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    /* HEADER */
    .pwa-header {
      background-color: #1a1a1a;
      height: 56px;
      display: flex;
      align-items: center;
      padding: 0 12px;
      border-bottom: 1px solid #2a2a2a;
    }

    .btn-back {
      background: none;
      border: none;
      color: #e0e0e0;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .btn-back svg {
      width: 22px;
      height: 22px;
    }

    .header-title {
      font-size: 19px;
      font-weight: 500;
      margin: 0 0 0 12px;
      flex: 1;
      color: #ffffff;
    }

    .header-actions {
      display: flex;
      gap: 12px;
    }

    .header-icon-btn {
      background: none;
      border: none;
      color: #cccccc;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .header-icon-btn svg {
      width: 22px;
      height: 22px;
    }

    /* LIST */
    .cards-list {
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      flex: 1;
    }

    .loading-state, .empty-state {
      text-align: center;
      padding: 40px 20px;
      color: #888888;
    }

    .spinner {
      width: 32px;
      height: 32px;
      border: 3px solid #333;
      border-top-color: #00897b;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin: 0 auto 12px auto;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* CARD STYLING (Matching Image 1) */
    .prensado-card {
      background-color: #222222;
      border-radius: 4px;
      padding: 16px 14px;
      display: flex;
      align-items: center;
      gap: 16px;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0,0,0,0.4);
      transition: background-color 0.15s ease;
    }

    .prensado-card:active {
      background-color: #2c2c2c;
    }

    .card-icon-box {
      width: 60px;
      height: 60px;
      border: 2px stroke #444;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #444;
      flex-shrink: 0;
    }

    .card-icon-box svg {
      width: 48px;
      height: 48px;
    }

    .card-details-grid {
      display: grid;
      grid-template-columns: 1.2fr 1.2fr 1fr;
      gap: 8px;
      width: 100%;
    }

    .detail-group {
      display: flex;
      flex-direction: column;
    }

    .detail-group.justify-end {
      align-items: flex-start;
      margin-left: auto;
    }

    .detail-label {
      font-size: 13px;
      color: #aaaaaa;
      margin-bottom: 2px;
    }

    .detail-value {
      font-size: 14px;
      color: #ffffff;
    }

    .detail-value.text-bold {
      font-weight: 500;
    }

    .mt-row {
      margin-top: 10px;
    }

    /* MODAL OVERLAY */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.75);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      padding: 20px;
    }

    /* MODAL 1: CONFIRMATION DIALOG (Matching Image 2) */
    .confirmation-dialog {
      background-color: #424242;
      border-radius: 4px;
      width: 100%;
      max-width: 420px;
      padding: 24px 24px 16px 24px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.6);
    }

    .modal-content-text {
      color: #ffffff;
      font-size: 16px;
      font-weight: 400;
      line-height: 1.4;
      margin-bottom: 24px;
    }

    .dialog-actions {
      display: flex;
      justify-content: flex-end;
    }

    .btn-text-cyan {
      background: none;
      border: none;
      color: #00bfa5;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.5px;
      padding: 8px 12px;
      cursor: pointer;
    }

    /* MODAL 2: CAPTURE DIALOG (Matching Images 3 & 4) */
    .capture-dialog {
      background-color: #333333;
      border-radius: 4px;
      width: 100%;
      max-width: 580px;
      padding: 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.7);
    }

    .capture-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }

    @media (max-width: 540px) {
      .capture-grid {
        grid-template-columns: 1fr;
      }
    }

    .column-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .section-title-row {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .section-label {
      font-size: 14px;
      color: #dddddd;
      font-weight: 500;
    }

    .radio-group {
      display: flex;
      gap: 16px;
      margin-top: 4px;
    }

    .radio-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 14px;
      color: #ffffff;
      cursor: pointer;
    }

    .radio-item input[type="radio"] {
      accent-color: #00bfa5;
      width: 16px;
      height: 16px;
    }

    .input-line-field {
      display: flex;
      flex-direction: column;
      gap: 4px;
      position: relative;
    }

    .input-line-field label {
      font-size: 13px;
      color: #cccccc;
    }

    .input-line-field input {
      background: transparent;
      border: none;
      border-bottom: 1px solid #777777;
      color: #ffffff;
      font-size: 16px;
      padding: 6px 0;
      text-align: right;
      outline: none;
      width: 100%;
    }

    .input-line-field input:focus {
      border-bottom-color: #00bfa5;
    }

    .capture-actions-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 20px;
    }

    .btn-procesar-green {
      background-color: #00897b;
      color: #ffffff;
      border: none;
      border-radius: 4px;
      height: 48px;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.5px;
      cursor: pointer;
    }

    .btn-procesar-green:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-cancelar-grey {
      background-color: #424242;
      color: #cccccc;
      border: none;
      border-radius: 4px;
      height: 48px;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.5px;
      cursor: pointer;
    }
  `]
})
export class PrensadoListComponent implements OnInit {
  private prodService = inject(ProduccionService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  prensados: any[] = [];
  cargando = true;

  // Estado del flujo modal
  prensadoSeleccionado: any = null;
  mostrarModalConfirmacion = false;
  mostrarModalCaptura = false;
  guardando = false;

  // Formulario Levas / Rodillos
  levasUm: 'Kg' | 'Grados' = 'Kg';
  rodillosUm: 'Kg' | 'Grados' = 'Kg';
  levasEntrada = 0.0;
  levasSalida = 0.0;
  rodillosEntrada = 0.0;
  rodillosSalida = 0.0;

  ngOnInit() {
    this.cargarPrensados();
  }

  cargarPrensados() {
    this.cargando = true;
    this.prodService.getPrensadosOperacion().subscribe({
      next: (data) => {
        this.prensados = data || [];
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.prensados = [];
        this.cargando = false;
        this.cdr.markForCheck();
      }
    });
  }

  formatearFecha(fechaStr: any): string {
    if (!fechaStr) return '07/08/26 10:00';
    try {
      const d = new Date(fechaStr);
      const dia = String(d.getDate()).padStart(2, '0');
      const mes = String(d.getMonth() + 1).padStart(2, '0');
      const anio = String(d.getFullYear()).slice(-2);
      const horas = String(d.getHours()).padStart(2, '0');
      const mins = String(d.getMinutes()).padStart(2, '0');
      return `${dia}/${mes}/${anio} ${horas}:${mins}`;
    } catch {
      return String(fechaStr);
    }
  }

  seleccionarPrensado(item: any) {
    this.prensadoSeleccionado = item;
    this.mostrarModalConfirmacion = true;
  }

  cerrarModalConfirmacion() {
    this.mostrarModalConfirmacion = false;
  }

  confirmarConcluirAnterior() {
    this.mostrarModalConfirmacion = false;
    // Reset campos
    this.levasUm = 'Kg';
    this.rodillosUm = 'Kg';
    this.levasEntrada = 0.0;
    this.levasSalida = 0.0;
    this.rodillosEntrada = 0.0;
    this.rodillosSalida = 0.0;
    this.mostrarModalCaptura = true;
  }

  cerrarModalCaptura() {
    this.mostrarModalCaptura = false;
  }

  procesarConclusion() {
    if (!this.prensadoSeleccionado) return;
    this.guardando = true;

    const payload = {
      levasUnidadMedida: this.levasUm,
      rodillosUnidadMedida: this.rodillosUm,
      levasKgEntrada: this.levasUm === 'Kg' ? this.levasEntrada : 0,
      levasKgSalida: this.levasUm === 'Kg' ? this.levasSalida : 0,
      levasGradosEntrada: this.levasUm === 'Grados' ? this.levasEntrada : 0,
      levasGradosSalida: this.levasUm === 'Grados' ? this.levasSalida : 0,
      rodillosKgEntrada: this.rodillosUm === 'Kg' ? this.rodillosEntrada : 0,
      rodillosKgSalida: this.rodillosUm === 'Kg' ? this.rodillosSalida : 0,
      rodillosGradosEntrada: this.rodillosUm === 'Grados' ? this.rodillosEntrada : 0,
      rodillosGradosSalida: this.rodillosUm === 'Grados' ? this.rodillosSalida : 0,
      finProceso: new Date().toISOString()
    };

    this.prodService.concluirPrensado(this.prensadoSeleccionado.id, payload).subscribe({
      next: () => {
        this.guardando = false;
        this.mostrarModalCaptura = false;
        this.cargarPrensados();
      },
      error: () => {
        // En caso de mock o error de red, cerramos y recargamos
        this.guardando = false;
        this.mostrarModalCaptura = false;
        this.cargarPrensados();
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
