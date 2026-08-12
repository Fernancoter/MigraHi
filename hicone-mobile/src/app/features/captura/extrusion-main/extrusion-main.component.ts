import { Component, OnInit, OnDestroy, inject, effect, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { toObservable } from '@angular/core/rxjs-interop';
import { Subscription, switchMap, of, timeout, catchError, EMPTY, timer } from 'rxjs';
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

  // Menú Intermedio (HICONE_SDExtrusionIntermedia)
  mostrarMenuIntermedio = false;
  mostrarListaBobinasModal = false;

  // Modal Bobina
  mostrarModalBobina = false;

  // Modal Cierre
  mostrarModalCierre = false;
  cierreObservaciones = '';
  kpis = { totalBobinas: 0, totalBobinasMolidas: 0, kgProducidos: 0, kgMerma: 0, eficiencia: 85 };

  // Silos y Modal Mezcla
  silos: Silo[] = [];
  mostrarModalConsumo = false;
  mostrarAlertaMezcladora = false;
  mensajeAlertaMezcladora = 'Para obtener la combinación de kg molidos y kg virgen debe configurar las referencias en ExtrusoraMezcladora';

  consumoForm = {
    siloVirgenId: '',
    mezclaVirgen: 80,
    virgenKg: 160,
    siloMolidoId: '',
    mezclaMolido: 20,
    molidoKg: 40
  };

  recalcularKilosMezcla() {
    const meta = 200;
    const pVirgen = this.consumoForm.mezclaVirgen || 0;
    const pMolido = this.consumoForm.mezclaMolido || 0;
    this.consumoForm.virgenKg = Number(((meta * pVirgen) / 100).toFixed(2));
    this.consumoForm.molidoKg = Number(((meta * pMolido) / 100).toFixed(2));
  }

  private subs = new Subscription();

  private cdr = inject(ChangeDetectorRef);

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
          this.cdr.detectChanges();
          return EMPTY;
        }

        // Mostrar cuadro INMEDIATAMENTE (sin bloquear UI)
        this.extrusionActiva = null;
        this.bobinasExtrusion = [];
        this.cargandoOrden = true;
        this.cdr.detectChanges();

        // Cargar orden en background con timeout de 8s
        return this.produccionService.getExtrusionActiva(ext.id).pipe(
          timeout(8000),
          catchError(() => {
            // Si falla (404 = sin orden activa, timeout, etc.) → mostrar cuadro vacío
            this.cargandoOrden = false;
            this.cdr.detectChanges();
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
      this.cdr.detectChanges();
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

    if (this.extrusionActiva.virgenKg > 0 || this.extrusionActiva.molidoKg > 0) {
      this.consumoForm.virgenKg = this.extrusionActiva.virgenKg;
      this.consumoForm.molidoKg = this.extrusionActiva.molidoKg;
      const total = (this.extrusionActiva.virgenKg || 0) + (this.extrusionActiva.molidoKg || 0);
      if (total > 0) {
        this.consumoForm.mezclaVirgen = Number(((this.extrusionActiva.virgenKg / total) * 100).toFixed(0));
        this.consumoForm.mezclaMolido = Number(((this.extrusionActiva.molidoKg / total) * 100).toFixed(0));
      }
    }
    if (this.extrusionActiva.siloVirgenId) this.consumoForm.siloVirgenId = this.extrusionActiva.siloVirgenId;
    if (this.extrusionActiva.siloMolidoId) this.consumoForm.siloMolidoId = this.extrusionActiva.siloMolidoId;

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

  abrirMenuIntermedio() {
    this.mostrarMenuIntermedio = true;
  }

  cerrarMenuIntermedio() {
    this.mostrarMenuIntermedio = false;
  }

  opcionIniciarExtrusion() {
    this.cerrarMenuIntermedio();
    this.abrirWizard();
  }

  opcionRegistrarBobina() {
    this.cerrarMenuIntermedio();
    this.abrirModalBobina();
  }

  opcionConfigurarMezcla() {
    this.cerrarMenuIntermedio();
    this.abrirModalConsumo();
  }

  opcionVerBobinas() {
    this.cerrarMenuIntermedio();
    this.mostrarListaBobinasModal = true;
  }

  opcionCerrarOrden() {
    this.cerrarMenuIntermedio();
    this.abrirCierre();
  }

  abrirModalBobina() {
    this.nuevaBobina.calibre = this.extrusionActiva?.calibre || 15;
    this.mostrarModalBobina = true;
  }

  cerrarModalBobina() {
    this.mostrarModalBobina = false;
  }

  guardarBobinaCompleta() {
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
        this.cerrarModalBobina();
        this.mostrarMensaje('¡Bobina registrada exitosamente!');
        this.nuevaBobina.peso = 0;
        this.nuevaBobina.observaciones = '';
        this.actualizarInformacionOrden();
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.saving = false;
        this.mostrarMensaje('Error al registrar bobina: ' + (err.error?.message || err.message), true);
        this.cdr.detectChanges();
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
    this.guardarOCrearMezcla(false);
  }

  /** Botón PROCESAR: aplica mezcla y cierra el modal */
  procesarConsumo() {
    this.guardarOCrearMezcla(true);
  }

  private guardarOCrearMezcla(cerrarModal: boolean) {
    const ext = this.extrusionState.extrusoraActiva();
    if (!ext) {
      this.mostrarMensaje('Por favor selecciona una Extrusora en el encabezado (icono de engrane ⚙️).', true);
      return;
    }

    this.saving = true;

    // Si ya existe una orden activa en esta extrusora
    if (this.extrusionActiva) {
      const defaultSiloId = this.silos.length > 0 ? this.silos[0].id : null;
      const req = {
        siloVirgenId: (this.consumoForm.siloVirgenId && this.consumoForm.siloVirgenId !== '') ? this.consumoForm.siloVirgenId : defaultSiloId,
        virgenKg: this.consumoForm.virgenKg || 160,
        siloMolidoId: (this.consumoForm.siloMolidoId && this.consumoForm.siloMolidoId !== '') ? this.consumoForm.siloMolidoId : null,
        molidoKg: this.consumoForm.molidoKg || 40
      };
      this.produccionService.registrarConsumoExtrusion(this.extrusionActiva.id, req).subscribe({
        next: () => {
          this.saving = false;
          if (cerrarModal) this.cerrarModalConsumo();
          this.mostrarMensaje(cerrarModal ? '¡Mezcla registrada y procesada exitosamente!' : '¡Mezcla aplicada!');
          this.actualizarInformacionOrden();
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          this.saving = false;
          this.mostrarMensaje('Error al aplicar mezcla: ' + (err.error?.message || err.message), true);
          this.cdr.detectChanges();
        }
      });
    } else {
      // Si aún no hay orden activa, la creamos e iniciamos la extrusión
      const turno = this.extrusionState.turnoActivo();
      const initReq = {
        extrusoraId: ext.id,
        turnoId: turno?.id || null,
        siloVirgenId: this.consumoForm.siloVirgenId || null,
        virgenKg: this.consumoForm.virgenKg || 0,
        siloMolidoId: this.consumoForm.siloMolidoId || null,
        molidoKg: this.consumoForm.molidoKg || 0,
        observaciones: 'Iniciado desde PWA móvil'
      };

      this.produccionService.iniciarExtrusion(initReq).subscribe({
        next: (ordenNueva) => {
          this.saving = false;
          this.extrusionActiva = ordenNueva;
          if (cerrarModal) this.cerrarModalConsumo();
          this.mostrarMensaje('¡Orden de Extrusión iniciada y mezcla registrada!');
          this.actualizarInformacionOrden();
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          this.saving = false;
          this.mostrarMensaje('Error al iniciar orden: ' + (err.error?.message || err.message), true);
          this.cdr.detectChanges();
        }
      });
    }
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
      this.cdr.markForCheck();
      timer(6000).subscribe(() => {
        this.errorMessage = '';
        this.cdr.markForCheck();
      });
    } else {
      this.successMessage = text;
      this.cdr.markForCheck();
      timer(5000).subscribe(() => {
        this.successMessage = '';
        this.cdr.markForCheck();
      });
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
