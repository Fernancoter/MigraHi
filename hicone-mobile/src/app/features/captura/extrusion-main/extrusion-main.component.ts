import { Component, OnInit, OnDestroy, inject, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { toObservable } from '@angular/core/rxjs-interop';
import { Subscription, switchMap, of, timeout, catchError, EMPTY } from 'rxjs';
import { ProduccionService, Bobina } from '../../../core/services/produccion';
import { OfflineStoreService } from '../../../core/offline/offline-store.service';
import { AuthService } from '../../../core/services/auth.service';
import { InventarioService, Silo } from '../../../core/services/inventario.service';
import { ExtrusionStateService } from '../../../core/services/extrusion-state.service';

@Component({
  selector: 'app-extrusion-main',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './extrusion-main.component.html',
  styleUrls: ['./extrusion-main.component.scss']
})
export class ExtrusionMainComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private produccionService = inject(ProduccionService);
  private offlineStore = inject(OfflineStoreService);
  private authService = inject(AuthService);
  private inventarioService = inject(InventarioService);
  public extrusionState = inject(ExtrusionStateService);

  // Estado de la orden activa
  extrusionActiva: any | null = null;
  bobinasExtrusion: Bobina[] = [];

  /**
   * cargandoOrden = true solo mientras espera la respuesta del API.
   * El cuadro de información se muestra INMEDIATAMENTE al seleccionar extrusora.
   * Los datos de la orden se cargan en segundo plano.
   */
  cargandoOrden = false;

  // Formulario de Registro de Bobina
  nuevaBobina = {
    origen: 'A',
    peso: 0,
    calibre: 1.25,
    desviacion: 0.001,
    color: 1,
    enviarMolino: false,
    mermaKg: 0,
    motivo: 1,
    observaciones: ''
  };

  siguienteBobinaNo = 1;
  saving = false;
  errorMessage = '';
  successMessage = '';

  // Modal Cierre
  mostrarModalCierre = false;
  cierreObservaciones = '';
  kpis = { totalBobinas: 0, totalBobinasMolidas: 0, kgProducidos: 0, kgMerma: 0, eficiencia: 85 };

  // Silos y Modal Mezcla
  silos: Silo[] = [];
  mostrarModalConsumo = false;
  consumoForm = {
    siloVirgenId: '',
    mezclaVirgen: 0,
    virgenKg: 0,
    siloMolidoId: '',
    mezclaMolido: 0,
    molidoKg: 0
  };

  private subs = new Subscription();

  constructor() {
    // Reaccionar cuando cambia la extrusora seleccionada en el header Shell.
    // Se muestra el cuadro INMEDIATAMENTE y la orden se carga en background.
    const extrusora$ = toObservable(this.extrusionState.extrusoraActiva);

    const sub = extrusora$.pipe(
      switchMap(ext => {
        if (!ext) {
          // Sin extrusora: limpiar estado
          this.extrusionActiva = null;
          this.bobinasExtrusion = [];
          this.cargandoOrden = false;
          return EMPTY;
        }

        // Mostrar cuadro INMEDIATAMENTE (sin bloquear UI)
        this.extrusionActiva = null;
        this.bobinasExtrusion = [];
        this.cargandoOrden = true;

        // Cargar orden en background con timeout de 8s
        return this.produccionService.getExtrusionActiva(ext.id).pipe(
          timeout(8000),
          catchError(() => {
            // Si falla (404 = sin orden activa, timeout, etc.) → mostrar cuadro vacío
            return of(null);
          })
        );
      })
    ).subscribe(orden => {
      this.extrusionActiva = orden || null;
      this.cargandoOrden = false;
      if (orden) {
        this.actualizarInformacionOrden();
      }
    });

    this.subs.add(sub);
  }

  ngOnInit(): void {
    this.cargarSilos();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  cargarSilos() {
    this.inventarioService.getSilos().subscribe({
      next: (data) => this.silos = data,
      error: (err) => console.error('Error cargando silos', err)
    });
  }

  actualizarInformacionOrden() {
    if (!this.extrusionActiva) return;
    const ext = this.extrusionState.extrusoraActiva();
    if (!ext) return;

    this.produccionService.getSiguienteBobinaNo(
      ext.id,
      this.extrusionActiva.productoId || this.extrusionActiva.producto?.id
    ).subscribe({
      next: (no: number) => { this.siguienteBobinaNo = no; },
      error: () => { this.siguienteBobinaNo = 1; }
    });

    this.produccionService.getBobinasByExtrusion(this.extrusionActiva.id).subscribe({
      next: (bobs: Bobina[]) => { this.bobinasExtrusion = bobs || []; },
      error: (err: any) => console.error('Error cargando bobinas:', err)
    });
  }

  registrarBobina() {
    if (this.nuevaBobina.peso <= 0) {
      this.mostrarMensaje('Ingrese un peso válido mayor a 0 Kg.', true);
      return;
    }
    this.saving = true;

    const request = {
      extrusionId: this.extrusionActiva.id,
      bobinaNo: this.siguienteBobinaNo,
      origen: this.nuevaBobina.origen,
      peso: this.nuevaBobina.peso,
      calibre: this.nuevaBobina.calibre,
      desviacion: this.nuevaBobina.desviacion,
      color: this.nuevaBobina.color,
      mermaKg: this.nuevaBobina.enviarMolino ? this.nuevaBobina.mermaKg : 0,
      motivo: this.nuevaBobina.enviarMolino ? this.nuevaBobina.motivo : 0,
      observaciones: this.nuevaBobina.observaciones || 'Registrado desde PWA móvil'
    };

    this.produccionService.guardarBobina(request).subscribe({
      next: () => {
        this.saving = false;
        this.mostrarMensaje('¡Bobina registrada exitosamente!');
        this.nuevaBobina.peso = 0;
        this.nuevaBobina.observaciones = '';
        this.actualizarInformacionOrden();
      },
      error: (err: any) => {
        this.saving = false;
        this.mostrarMensaje('Error: ' + (err.error?.message || err.message || 'Error al guardar bobina'), true);
      }
    });
  }

  abrirWizard() {
    this.router.navigate(['/wizard']);
  }

  abrirCierre() {
    if (!this.extrusionActiva) return;
    this.saving = true;
    this.produccionService.getExtrusionResultado(this.extrusionActiva.id).subscribe({
      next: (kpiResult: any) => {
        this.saving = false;
        this.kpis = {
          totalBobinas: kpiResult.totalBobinas || this.bobinasExtrusion.length,
          totalBobinasMolidas: kpiResult.totalBobinasMolidas || this.bobinasExtrusion.filter(b => b.estado === 'Molido' || b.estado === 6).length,
          kgProducidos: kpiResult.kgProducidos || this.bobinasExtrusion.reduce((a, c) => a + c.kg, 0),
          kgMerma: kpiResult.kgMerma || this.bobinasExtrusion.reduce((a, c) => a + (c.mermaKg || 0), 0),
          eficiencia: kpiResult.eficiencia || 90
        };
        this.cierreObservaciones = '';
        this.mostrarModalCierre = true;
      },
      error: () => {
        this.saving = false;
        this.kpis = {
          totalBobinas: this.bobinasExtrusion.length,
          totalBobinasMolidas: this.bobinasExtrusion.filter(b => b.estado === 'Molido' || b.estado === 6).length,
          kgProducidos: this.bobinasExtrusion.reduce((a, c) => a + c.kg, 0),
          kgMerma: this.bobinasExtrusion.reduce((a, c) => a + (c.mermaKg || 0), 0),
          eficiencia: 85
        };
        this.mostrarModalCierre = true;
      }
    });
  }

  confirmarCierre() {
    this.saving = true;
    this.produccionService.finalizarExtrusion(this.extrusionActiva.id, this.cierreObservaciones || 'Cerrado desde PWA').subscribe({
      next: () => {
        this.saving = false;
        this.mostrarModalCierre = false;
        alert('¡Orden finalizada y consolidada!');
        this.extrusionActiva = null;
        const ext = this.extrusionState.extrusoraActiva();
        if (ext) {
          this.cargandoOrden = true;
          this.produccionService.getExtrusionActiva(ext.id).pipe(
            catchError(() => of(null))
          ).subscribe(orden => {
            this.extrusionActiva = orden;
            this.cargandoOrden = false;
          });
        }
      },
      error: (err: any) => {
        this.saving = false;
        alert('Error al finalizar: ' + (err.error?.message || err.message));
      }
    });
  }

  abrirModalConsumo() {
    this.mostrarModalConsumo = true;
  }

  cerrarModalConsumo() {
    this.mostrarModalConsumo = false;
  }

  /** Botón APLICAR: guarda la mezcla sin cerrar el modal */
  aplicarConsumo() {
    if (!this.extrusionActiva) return;
    this.saving = true;
    const req = {
      siloVirgenId: this.consumoForm.siloVirgenId,
      virgenKg: this.consumoForm.virgenKg,
      siloMolidoId: this.consumoForm.siloMolidoId,
      molidoKg: this.consumoForm.molidoKg
    };
    this.produccionService.registrarConsumoExtrusion(this.extrusionActiva.id, req).subscribe({
      next: () => {
        this.saving = false;
        this.mostrarMensaje('¡Mezcla aplicada!');
      },
      error: (err: any) => {
        this.saving = false;
        this.mostrarMensaje('Error al aplicar: ' + (err.error?.message || err.message), true);
      }
    });
  }

  /** Botón PROCESAR: aplica mezcla y cierra el modal */
  procesarConsumo() {
    if (!this.extrusionActiva) {
      this.cerrarModalConsumo();
      return;
    }
    this.saving = true;
    const req = {
      siloVirgenId: this.consumoForm.siloVirgenId,
      virgenKg: this.consumoForm.virgenKg,
      siloMolidoId: this.consumoForm.siloMolidoId,
      molidoKg: this.consumoForm.molidoKg
    };
    this.produccionService.registrarConsumoExtrusion(this.extrusionActiva.id, req).subscribe({
      next: () => {
        this.saving = false;
        this.cerrarModalConsumo();
        this.mostrarMensaje('¡Mezcla registrada y procesada exitosamente!');
        this.actualizarInformacionOrden();
      },
      error: (err: any) => {
        this.saving = false;
        this.mostrarMensaje('Error al procesar: ' + (err.error?.message || err.message), true);
      }
    });
  }

  // Helpers
  getEstadoName(state: any): string {
    const map: { [key: string]: string } = {
      'EnReposo': 'En Reposo', 'EnProceso': 'En Proceso',
      'Molido': 'En Molino', 'Disponible': 'Disponible',
      '1': 'Disponible', '2': 'En Proceso', '3': 'En Reposo'
    };
    return map[String(state)] || String(state);
  }

  getEstadoClass(state: any): string {
    const s = String(state);
    if (s === 'EnProceso' || s === '2') return 'estado-proceso';
    if (s === 'EnReposo' || s === '3') return 'estado-reposo';
    return 'estado-sin';
  }

  getColorName(colorVal: number): string {
    const map: { [key: number]: string } = {
      1: 'Rojo 🔴', 2: 'Azul 🔵', 3: 'Verde 🟢',
      4: 'Amarillo 🟡', 5: 'Naranja 🟠', 6: 'Blanco ⚪'
    };
    return map[colorVal] || 'Otro';
  }

  private mostrarMensaje(text: string, isError = false) {
    if (isError) {
      this.errorMessage = text;
      setTimeout(() => this.errorMessage = '', 6000);
    } else {
      this.successMessage = text;
      setTimeout(() => this.successMessage = '', 5000);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
