import { Component, OnInit, OnDestroy, inject, effect, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { toObservable } from '@angular/core/rxjs-interop';
import { Subscription, switchMap, of, timeout, catchError, EMPTY, timer } from 'rxjs';
import { ProduccionService, Bobina, CausaInterrupcion } from '../../../core/services/produccion';
import { OfflineStoreService } from '../../../core/offline/offline-store.service';
import { AuthService } from '../../../core/services/auth.service';
import { InventarioService, Silo } from '../../../core/services/inventario.service';
import { DialogService } from '../../../core/services/dialog.service';
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
  private dialog = inject(DialogService);

  // Estado de la orden activa
  extrusionActiva: any | null = null;
  bobinasExtrusion: Bobina[] = [];
  esProgramada = false;

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
  tiempoExtrusionStr = '00:00:00';
  tiempoBobinaStr = '00:00:00';
  tiempoRestanteTurnoStr = '00:00:00';
  horarioTurnoStr = '';
  timerInterval: any;

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

  // Tab/Dashboard variables
  activeTab = 'reposo';
  bobinaAProcesar: Bobina | null = null;
  mostrarModalRechazoDirecto = false;
  motivoRechazoDirecto = 1;
  observacionesRechazoDirecto = '';

  // Interrupciones (Downtime estilo QA)
  causasInterrupcion: CausaInterrupcion[] = [];
  mostrarModalInterrupcion = false;
  interrupcionMotivo = '';
  interrupcionCausaId = '';
  tiempoInterrupcionStr = '00:00:00';
  interrupcionActiva: any = null;

  // Formulario de Medición (QA)
  medicionForm = {
    tipoDestino: 'reposo', // 'reposo' | 'molino'
    espesor: 0.00,
    kg: 0.00,
    desviacionEstandar: 0.000,
    colorEstacion: 0, // SinAsignar
    motivoMolino: 0,  // NoAplica
    observaciones: ''
  };

  // Reasignación / Transferencia (QA)
  ordenesProgramadas: any[] = [];
  mostrarModalTransferencia = false;
  bobinaATransferir: Bobina | null = null;
  destinoTransferenciaId = '';

  get bobinaEnTurnoMedicion(): Bobina | null {
    const list = this.bobinasEnMedicion;
    return list.length > 0 ? list[0] : null;
  }

  get bobinasEnProceso(): any[] {
    if (this.extrusionActiva) {
      return [{
        bobinaNo: this.siguienteBobinaNo,
        bobinaOrigen: this.nuevaBobina.origen || 'A',
        estado: 1, // EnProceso
        noSerie: `B-PENDIENTE-${this.siguienteBobinaNo}`
      }];
    }
    return [];
  }

  get bobinasEnMedicion(): Bobina[] {
    return this.bobinasExtrusion.filter(b => b.estado === 11 || String(b.estado) === 'EnMedicion' || b.estado === 1 || String(b.estado) === 'EnProceso');
  }

  get bobinasEnReposo(): Bobina[] {
    return this.bobinasExtrusion.filter(b => b.estado === 2 || String(b.estado) === 'EnReposo' || b.estado === 12 || String(b.estado) === 'Disponible');
  }

  get bobinasMolido(): Bobina[] {
    return this.bobinasExtrusion.filter(b => b.estado === 6 || String(b.estado) === 'Molido' || b.estado === 5 || String(b.estado) === 'Rechazada');
  }
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
          this.esProgramada = false;
          this.cargandoOrden = false;
          this.cdr.detectChanges();
          return EMPTY;
        }

        // Mostrar cuadro INMEDIATAMENTE (sin bloquear UI)
        this.extrusionActiva = null;
        this.bobinasExtrusion = [];
        this.esProgramada = false;
        this.cargandoOrden = true;
        this.cdr.detectChanges();

        // Cargar orden en background con timeout de 8s
        return this.produccionService.getExtrusionActivaOProgramada(ext.id).pipe(
          timeout(8000),
          catchError(() => {
            // Si falla (404 = sin orden activa, timeout, etc.) → mostrar cuadro vacío
            this.cargandoOrden = false;
            this.esProgramada = false;
            this.cdr.detectChanges();
            return of(null);
          })
        );
      })
    ).subscribe(orden => {
      this.extrusionActiva = orden || null;
      this.esProgramada = this.extrusionActiva && (this.extrusionActiva.estado === 1 || String(this.extrusionActiva.estado) === 'Programada');
      this.cargandoOrden = false;
      if (orden) {
        this.actualizarInformacionOrden();
        const interrupcionEnCursoVal = orden.interrupcionEnCurso || orden.InterrupcionEnCurso || false;
        this.extrusionState.interrupcionEnCurso.set(interrupcionEnCursoVal);
        // NO iniciar automáticamente al seleccionar extrusora; permitir vista previa y selección de turno previa
        this.extrusionState.extrusionIniciada.set(false);
        
        const list = orden.interrupciones || orden.Interrupciones || [];
        const activeInt = list.find((i: any) => i.concluida === false || i.Concluida === false || !i.concluida || !i.Concluida) || null;
        if (activeInt) {
          this.interrupcionActiva = activeInt;
        } else if (interrupcionEnCursoVal && this.interrupcionActiva) {
          // Mantener si ya existe
        } else {
          this.interrupcionActiva = null;
        }
      } else {
        this.extrusionState.interrupcionEnCurso.set(false);
        this.extrusionState.extrusionIniciada.set(false);
        this.interrupcionActiva = null;
      }
      this.cdr.detectChanges();
    });

    this.subs.add(sub);
  }

  turnosDisponibles: any[] = [];

  ngOnInit(): void {
    this.cargarSilos();
    this.cargarCausasInterrupcion();
    this.cargarTurnos();

    // Vincular callbacks del Header Shell
    this.extrusionState.onTriggerInterrupcion = () => {
      this.abrirModalInterrupcion();
    };
    this.extrusionState.onTriggerFinalizar = () => {
      this.abrirCierre();
    };

    this.timerInterval = setInterval(() => {
      this.recalcularTiempos();
    }, 1000);
  }

  cargarTurnos() {
    this.produccionService.getTurnos().pipe(
      catchError(() => of([]))
    ).subscribe(list => {
      this.turnosDisponibles = list || [];
      if (!this.extrusionState.turnoActivo() && this.turnosDisponibles.length > 0) {
        this.extrusionState.setTurno({ id: this.turnosDisponibles[0].id, nombre: this.turnosDisponibles[0].nombre });
      }
      this.cdr.detectChanges();
    });
  }

  seleccionarTurnoRapido(t: any) {
    this.extrusionState.setTurno({ id: t.id, nombre: t.nombre });
    this.cdr.detectChanges();
  }

  iniciarOContinuarTrabajo() {
    const ext = this.extrusionState.extrusoraActiva();
    if (!ext) return;

    if (!this.extrusionState.turnoActivo()) {
      if (this.turnosDisponibles.length > 0) {
        this.extrusionState.setTurno({ id: this.turnosDisponibles[0].id, nombre: this.turnosDisponibles[0].nombre });
      } else {
        this.errorMessage = 'Por favor selecciona un Turno antes de iniciar.';
        this.cdr.detectChanges();
        return;
      }
    }

    this.errorMessage = '';

    if (this.esProgramada || !this.extrusionActiva) {
      this.mostrarModalConsumo = true;
      this.cdr.detectChanges();
    } else {
      this.extrusionState.extrusionIniciada.set(true);
      this.cdr.detectChanges();
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  parseDateSafe(dateVal: any): Date {
    if (!dateVal) return new Date();
    if (dateVal instanceof Date) return dateVal;
    let dateStr = String(dateVal);
    // Si la fecha del backend no tiene zona horaria, pero sabemos que está guardada en UTC (UtcNow)
    if (!dateStr.endsWith('Z') && !dateStr.includes('+') && !dateStr.includes('-')) {
      dateStr = dateStr + 'Z';
    } else if (dateStr.includes('T') && !dateStr.endsWith('Z') && !dateStr.includes('+') && dateStr.lastIndexOf('-') < dateStr.indexOf('T')) {
      // Tiene un guión pero solo para el formato YYYY-MM-DD, no para zona horaria
      dateStr = dateStr + 'Z';
    }
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  }

  recalcularTiempos() {
    if (!this.extrusionActiva) {
      this.tiempoExtrusionStr = '00:00:00';
      this.tiempoBobinaStr = '00:00:00';
      return;
    }

    const activeExt = this.extrusionActiva as any;
    const fechaInicioVal = activeExt.fechaInicio || activeExt.FechaInicio;

    // 1. Tiempo de Extrusión: desde extrusionActiva.fechaInicio
    if (fechaInicioVal) {
      const start = this.parseDateSafe(fechaInicioVal).getTime();
      const now = Date.now();
      const diff = Math.max(0, now - start);
      this.tiempoExtrusionStr = this.formatDuration(diff);
    } else {
      this.tiempoExtrusionStr = '00:00:00';
    }

    // 2. Tiempo de la bobina en proceso (Enrollándose)
    let bobinaStart = fechaInicioVal ? this.parseDateSafe(fechaInicioVal).getTime() : Date.now();
    if (this.bobinasExtrusion && this.bobinasExtrusion.length > 0) {
      const completed = [...this.bobinasExtrusion].filter(b => (b as any).fechaProduccion || (b as any).FechaProduccion);
      if (completed.length > 0) {
        completed.sort((a, b) => 
          this.parseDateSafe((b as any).fechaProduccion || (b as any).FechaProduccion).getTime() - 
          this.parseDateSafe((a as any).fechaProduccion || (a as any).FechaProduccion).getTime()
        );
        bobinaStart = this.parseDateSafe((completed[0] as any).fechaProduccion || (completed[0] as any).FechaProduccion).getTime();
      }
    }
    const diffBobina = Math.max(0, Date.now() - bobinaStart);
    this.tiempoBobinaStr = this.formatDuration(diffBobina);

    // 3. Tiempo de la interrupción activa (si aplica)
    const interrupcionEnCursoVal = activeExt.interrupcionEnCurso || activeExt.InterrupcionEnCurso;
    if (interrupcionEnCursoVal && this.interrupcionActiva) {
      const horaInicioVal = this.interrupcionActiva.horaInicio || this.interrupcionActiva.HoraInicio;
      const startInt = this.parseDateSafe(horaInicioVal).getTime();
      const now = Date.now();
      const diffInt = Math.max(0, now - startInt);
      this.tiempoInterrupcionStr = this.formatDuration(diffInt);
    } else {
      this.tiempoInterrupcionStr = '00:00:00';
    }

    // 4. Tiempo Restante del Turno Seleccionado
    const turnoActivo = this.extrusionState.turnoActivo();
    if (turnoActivo) {
      const t = (this.turnosDisponibles || []).find(x => x.id === turnoActivo.id) || turnoActivo;
      if (t.horaInicio && t.horaFin) {
        this.horarioTurnoStr = `${String(t.horaInicio).substring(0, 5)} - ${String(t.horaFin).substring(0, 5)}`;
        this.tiempoRestanteTurnoStr = this.calcularTiempoRestanteTurno(String(t.horaFin));
      } else {
        this.horarioTurnoStr = '';
        this.tiempoRestanteTurnoStr = '--:--:--';
      }
    } else {
      this.horarioTurnoStr = '';
      this.tiempoRestanteTurnoStr = '00:00:00';
    }

    this.cdr.detectChanges();
  }

  calcularTiempoRestanteTurno(horaFinStr: string): string {
    if (!horaFinStr) return '00:00:00';
    const now = new Date();
    const parts = horaFinStr.split(':');
    const endHours = parseInt(parts[0], 10) || 0;
    const endMinutes = parseInt(parts[1], 10) || 0;

    const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHours, endMinutes, 0);

    // Si la hora de fin es menor o igual a la hora actual, asumimos turno nocturno que concluye al día siguiente
    if (endDate.getTime() <= now.getTime()) {
      endDate.setDate(endDate.getDate() + 1);
    }

    const diff = endDate.getTime() - now.getTime();
    return this.formatDuration(Math.max(0, diff));
  }

  formatDuration(ms: number): string {
    const totalSecs = Math.floor(ms / 1000);
    const hours = Math.floor(totalSecs / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const seconds = totalSecs % 60;
    return [hours, minutes, seconds].map(v => String(v).padStart(2, '0')).join(':');
  }

  cargarSilos() {
    this.inventarioService.getSilos().subscribe({
      next: (data) => {
        this.silos = data;
        this.cdr.detectChanges();
      },
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
    ).pipe(catchError(() => of(this.siguienteBobinaNo))).subscribe({
      next: (no: number) => {
        if (no && no > 0) this.siguienteBobinaNo = no;
        this.cdr.detectChanges();
      }
    });

    this.produccionService.getBobinasByExtrusion(this.extrusionActiva.id).pipe(catchError(() => of([]))).subscribe({
      next: (bobs: Bobina[]) => {
        if (bobs && bobs.length > 0) {
          this.bobinasExtrusion = bobs;
        }
        this.cdr.detectChanges();
      }
    });

    this.produccionService.getExtrusionActivaOProgramada(ext.id).pipe(catchError(() => of(null))).subscribe({
      next: (ordRes: any) => {
        if (ordRes) {
          this.extrusionActiva = ordRes;
          this.cdr.detectChanges();
        }
      }
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
      next: (res: any) => {
        this.saving = false;
        this.cerrarModalBobina();
        this.mostrarMensaje('¡Bobina registrada exitosamente!');
        this.nuevaBobina.peso = 0;
        this.nuevaBobina.observaciones = '';

        // Actualización optimista e instantánea (0ms) de contadores y lista local
        const newBob: Bobina = res || {
          id: `temp-${Date.now()}`,
          noSerie: `B-${request.bobinaNo}${request.origen}`,
          bobinaNo: request.bobinaNo,
          kg: request.peso,
          espesor: request.calibre,
          fechaProduccion: new Date(),
          estado: request.mermaKg > 0 ? 6 : 11,
          mermaKg: request.mermaKg,
          extrusionId: request.extrusionId
        };

        const currentBobs = [...this.bobinasExtrusion];
        const existingIdx = currentBobs.findIndex(b => b.bobinaNo === newBob.bobinaNo || b.id === newBob.id);
        if (existingIdx >= 0) {
          currentBobs[existingIdx] = newBob;
        } else {
          currentBobs.unshift(newBob);
        }
        this.bobinasExtrusion = currentBobs;
        this.siguienteBobinaNo = request.bobinaNo + 1;

        if (this.extrusionActiva) {
          this.extrusionActiva.producido = (this.extrusionActiva.producido || 0) + request.peso;
          this.extrusionActiva.totalBobinas = (this.extrusionActiva.totalBobinas || 0) + 1;
        }

        this.cdr.detectChanges();
        this.actualizarInformacionOrden();
      },
      error: (err: any) => {
        this.saving = false;
        this.mostrarMensaje('Error: ' + (err.error?.message || err.message || 'Error al guardar bobina'), true);
        this.cdr.detectChanges();
      }
    });
  }

  abrirAccionCard() {
    if (this.esProgramada) {
      this.mostrarModalConsumo = true;
      this.cdr.detectChanges();
    } else {
      this.abrirMenuIntermedio();
    }
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
      next: (res: any) => {
        this.saving = false;
        this.cerrarModalBobina();
        this.mostrarMensaje('¡Bobina registrada exitosamente!');
        this.nuevaBobina.peso = 0;
        this.nuevaBobina.observaciones = '';

        const newBob: Bobina = res || {
          id: `temp-${Date.now()}`,
          noSerie: `B-${request.bobinaNo}${request.origen}`,
          bobinaNo: request.bobinaNo,
          kg: request.peso,
          espesor: request.calibre,
          fechaProduccion: new Date(),
          estado: request.mermaKg > 0 ? 6 : 11,
          mermaKg: request.mermaKg,
          extrusionId: request.extrusionId
        };

        const currentBobs = [...this.bobinasExtrusion];
        const existingIdx = currentBobs.findIndex(b => b.bobinaNo === newBob.bobinaNo || b.id === newBob.id);
        if (existingIdx >= 0) {
          currentBobs[existingIdx] = newBob;
        } else {
          currentBobs.unshift(newBob);
        }
        this.bobinasExtrusion = currentBobs;
        this.siguienteBobinaNo = request.bobinaNo + 1;

        if (this.extrusionActiva) {
          this.extrusionActiva.producido = (this.extrusionActiva.producido || 0) + request.peso;
          this.extrusionActiva.totalBobinas = (this.extrusionActiva.totalBobinas || 0) + 1;
        }

        this.cdr.detectChanges();
        this.actualizarInformacionOrden();
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

    // VALIDACIÓN: No permitir finalizar si hay bobinas en medición (pendiente de aprobación/rechazo)
    if (this.bobinasEnMedicion.length > 0) {
      this.mostrarMensaje('Debe validar las bobinas que se encuentran En Medición antes de finalizar.', true);
      return;
    }

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
    this.produccionService.finalizarExtrusion(this.extrusionActiva.id, this.cierreObservaciones || undefined).subscribe({
      next: () => {
        this.saving = false;
        this.mostrarModalCierre = false;
        alert('¡Orden finalizada y consolidada!');
        this.extrusionActiva = null;
        this.extrusionState.extrusionIniciada.set(false);
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

    // Si es una orden programada, la iniciamos
    if (this.esProgramada && this.extrusionActiva) {
      if (!this.consumoForm.siloVirgenId) {
        this.saving = false;
        this.mostrarMensaje('Debe seleccionar un silo de material virgen.', true);
        return;
      }

      const payload = {
        siloVirgenId: this.consumoForm.siloVirgenId,
        virgenKg: this.consumoForm.virgenKg || 160,
        siloMolidoId: this.consumoForm.siloMolidoId || null,
        molidoKg: this.consumoForm.molidoKg || 40
      };

      this.produccionService.iniciarExtrusionProgramada(this.extrusionActiva.id, payload).subscribe({
        next: () => {
          this.saving = false;
          this.esProgramada = false;
          if (cerrarModal) this.cerrarModalConsumo();
          this.mostrarMensaje('¡Orden programada iniciada con éxito!');
          
          // Recargar orden para que ahora cargue como activa (En Proceso)
          this.cargandoOrden = true;
          this.produccionService.getExtrusionActivaOProgramada(ext.id).subscribe({
            next: (orden) => {
              this.extrusionActiva = orden;
              this.esProgramada = false;
              this.cargandoOrden = false;
              this.actualizarInformacionOrden();
              this.cdr.detectChanges();
            },
            error: () => {
              this.cargandoOrden = false;
              this.cdr.detectChanges();
            }
          });
        },
        error: (err) => {
          this.saving = false;
          this.mostrarMensaje('Error al iniciar orden programada: ' + (err.error?.message || err.message), true);
          this.cdr.detectChanges();
        }
      });
      return;
    }

    // Si ya existe una orden activa en esta extrusora
    if (this.extrusionActiva && !this.esProgramada) {
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

  setActiveTab(tab: string) {
    this.activeTab = tab;
    if (tab === 'medicion') {
      this.inicializarFormMedicion();
    }
    this.cdr.detectChanges();
  }

  terminarEnrollamiento(b: any) {
    this.opcionRegistrarBobina();
  }

  validarBobinaDirecta(b: Bobina) {
    this.produccionService.validarBobina(b.id).subscribe({
      next: () => {
        this.mostrarMensaje('¡Bobina validada y aprobada para prensado!');
        this.actualizarInformacionOrden();
      },
      error: (err) => {
        this.mostrarMensaje('Error al validar bobina: ' + (err.error?.message || err.message), true);
      }
    });
  }

  abrirModalRechazoDirecto(b: Bobina) {
    this.bobinaAProcesar = b;
    this.motivoRechazoDirecto = 1;
    this.observacionesRechazoDirecto = '';
    this.mostrarModalRechazoDirecto = true;
    this.cdr.detectChanges();
  }

  confirmarRechazoDirecto() {
    if (!this.bobinaAProcesar) return;
    this.produccionService.rechazarBobina(
      this.bobinaAProcesar.id,
      Number(this.motivoRechazoDirecto),
      this.observacionesRechazoDirecto || undefined
    ).subscribe({
      next: () => {
        this.mostrarMensaje('Bobina enviada a trituración/molino.');
        this.mostrarModalRechazoDirecto = false;
        this.bobinaAProcesar = null;
        this.actualizarInformacionOrden();
      },
      error: (err) => {
        this.mostrarMensaje('Error al rechazar bobina: ' + (err.error?.message || err.message), true);
      }
    });
  }

  getMotivoName(motivo: any): string {
    const code = Number(motivo);
    switch(code) {
      case 1: return 'Defecto Calibre';
      case 2: return 'Defecto Bobina';
      case 3: return 'Defecto Carrete';
      case 4: return 'Fuera de Peso';
      case 5: return 'Daño Físico';
      default: return 'No Aplica';
    }
  }

  iniciarOrdenProgramada() {
    if (!this.extrusionActiva) return;
    if (!this.consumoForm.siloVirgenId) {
      this.mostrarMensaje('Debe seleccionar un silo de material virgen.', true);
      return;
    }
    if (this.consumoForm.virgenKg <= 0) {
      this.mostrarMensaje('Los kg de material virgen deben ser mayores a 0.', true);
      return;
    }

    this.saving = true;
    this.cdr.detectChanges();

    const payload = {
      siloVirgenId: this.consumoForm.siloVirgenId,
      virgenKg: this.consumoForm.virgenKg,
      siloMolidoId: this.consumoForm.siloMolidoId || null,
      molidoKg: this.consumoForm.molidoKg || 0
    };

    this.produccionService.iniciarExtrusionProgramada(this.extrusionActiva.id, payload).subscribe({
      next: (res) => {
        this.saving = false;
        this.esProgramada = false;
        this.mostrarMensaje('¡Orden programada iniciada con éxito!');
        
        // Volver a cargar la orden activa
        const ext = this.extrusionState.extrusoraActiva();
        if (ext) {
          this.cargandoOrden = true;
          this.produccionService.getExtrusionActivaOProgramada(ext.id).subscribe({
            next: (orden) => {
              this.extrusionActiva = orden;
              this.esProgramada = false;
              this.cargandoOrden = false;
              if (orden) {
                this.extrusionState.extrusionIniciada.set(true);
                this.actualizarInformacionOrden();
              }
              this.cdr.detectChanges();
            },
            error: () => {
              this.cargandoOrden = false;
              this.cdr.detectChanges();
            }
          });
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.saving = false;
        this.mostrarMensaje(err.error?.message || 'Error al iniciar orden programada.', true);
        this.cdr.detectChanges();
      }
    });
  }

  // ── MÉTODOS DE INTERRUPCIONES (QA) ──────────────────────────────────
  cargarCausasInterrupcion() {
    this.produccionService.getCausasInterrupcion().subscribe({
      next: (causas) => {
        this.causasInterrupcion = causas;
        this.cdr.detectChanges();
      }
    });
  }

  abrirModalInterrupcion() {
    if (!this.extrusionActiva) return;
    if (this.extrusionActiva.interrupcionEnCurso) {
      this.reanudarProceso();
      return;
    }
    this.interrupcionMotivo = '';
    this.interrupcionCausaId = '';
    this.mostrarModalInterrupcion = true;
    this.cdr.detectChanges();
  }

  registrarInterrupcion() {
    if (!this.interrupcionMotivo.trim()) {
      this.mostrarMensaje('Debe especificar el motivo de la interrupción.', true);
      return;
    }
    if (!this.interrupcionCausaId) {
      this.mostrarMensaje('Debe seleccionar una causa (Down Time Code).', true);
      return;
    }

    this.saving = true;
    this.cdr.detectChanges();

    const request = {
      entidadId: this.extrusionActiva.id,
      causaId: this.interrupcionCausaId,
      descripcion: this.interrupcionMotivo
    };

    this.produccionService.registrarInterrupcionExtrusion(request).subscribe({
      next: (res) => {
        this.saving = false;
        this.interrupcionActiva = res;
        this.mostrarModalInterrupcion = false;
        this.mostrarMensaje('¡Interrupción registrada con éxito!');
        this.recargarOrdenActual();
      },
      error: (err) => {
        this.saving = false;
        this.mostrarMensaje(err.error?.message || 'Error al registrar interrupción.', true);
        this.cdr.detectChanges();
      }
    });
  }

  async reanudarProceso() {
    const ok = await this.dialog.confirm(
      '¿Desea reanudar el proceso de extrusión y terminar la interrupción activa?',
      'Confirmar Reanudación'
    );
    if (ok) {
      this.saving = true;
      this.cdr.detectChanges();
      this.produccionService.finalizarInterrupcionExtrusionActiva(this.extrusionActiva.id).subscribe({
        next: () => {
          this.saving = false;
          this.mostrarMensaje('¡Proceso reanudado con éxito!');
          this.recargarOrdenActual();
        },
        error: (err) => {
          this.saving = false;
          this.mostrarMensaje(err.error?.message || 'Error al reanudar proceso.', true);
          this.cdr.detectChanges();
        }
      });
    }
  }

  recargarOrdenActual() {
    const ext = this.extrusionState.extrusoraActiva();
    if (ext) {
      this.cargandoOrden = true;
      this.cdr.detectChanges();
      this.produccionService.getExtrusionActivaOProgramada(ext.id).subscribe({
        next: (orden) => {
          this.extrusionActiva = orden;
          this.esProgramada = false;
          this.cargandoOrden = false;
          if (orden) {
            this.actualizarInformacionOrden();
            const interrupcionEnCursoVal = orden.interrupcionEnCurso || orden.InterrupcionEnCurso || false;
            this.extrusionState.interrupcionEnCurso.set(interrupcionEnCursoVal);
            this.extrusionState.extrusionIniciada.set(true);
            
            const list = orden.interrupciones || orden.Interrupciones || [];
            const activeInt = list.find((i: any) => i.concluida === false || i.Concluida === false || !i.concluida || !i.Concluida) || null;
            if (activeInt) {
              this.interrupcionActiva = activeInt;
            } else if (interrupcionEnCursoVal && this.interrupcionActiva) {
              // Mantener si ya existe
            } else {
              this.interrupcionActiva = null;
            }
            
            // Inicializar el formulario con la bobina activa en medición
            this.inicializarFormMedicion();
          } else {
            this.extrusionState.interrupcionEnCurso.set(false);
            this.extrusionState.extrusionIniciada.set(false);
            this.interrupcionActiva = null;
          }
          this.cdr.detectChanges();
        },
        error: () => {
          this.cargandoOrden = false;
          this.cdr.detectChanges();
        }
      });
    }
  }

  // ── MÉTODOS DE FORMULARIO DE MEDICIÓN (QA) ──────────────────────────
  inicializarFormMedicion() {
    const bobina = this.bobinaEnTurnoMedicion;
    if (bobina) {
      this.medicionForm.espesor = bobina.espesor || 0.00;
      this.medicionForm.kg = bobina.kg || 0.00;
      this.medicionForm.desviacionEstandar = bobina.desviacionEstandar || 0.000;
      this.medicionForm.colorEstacion = bobina.colorEstacion || 0;
      this.medicionForm.motivoMolino = bobina.motivoMolino || 0;
      this.medicionForm.observaciones = bobina.observaciones || '';
      this.medicionForm.tipoDestino = bobina.estado === 'Molido' || bobina.estado === 6 ? 'molino' : 'reposo';
    } else {
      this.medicionForm.espesor = 0.00;
      this.medicionForm.kg = 0.00;
      this.medicionForm.desviacionEstandar = 0.000;
      this.medicionForm.colorEstacion = 0;
      this.medicionForm.motivoMolino = 0;
      this.medicionForm.observaciones = '';
      this.medicionForm.tipoDestino = 'reposo';
    }
    this.cdr.detectChanges();
  }

  onTipoDestinoChange() {
    if (this.medicionForm.tipoDestino === 'molino') {
      this.medicionForm.motivoMolino = 1; // Defecto Calibre por defecto
    } else {
      this.medicionForm.motivoMolino = 0; // N/A
    }
    this.cdr.detectChanges();
  }

  validarBobinaMedicion() {
    const bobina = this.bobinaEnTurnoMedicion;
    if (!bobina) {
      this.mostrarMensaje('No hay ninguna bobina en la cola de medición.', true);
      return;
    }

    if (this.medicionForm.espesor <= 0) {
      this.mostrarMensaje('El espesor de la bobina debe ser mayor a 0.', true);
      return;
    }

    if (this.medicionForm.kg <= 0) {
      this.mostrarMensaje('El peso en Kg de la bobina debe ser mayor a 0.', true);
      return;
    }

    this.saving = true;
    this.cdr.detectChanges();

    const payload = {
      espesor: this.medicionForm.espesor,
      kg: this.medicionForm.kg,
      desviacionEstandar: this.medicionForm.desviacionEstandar,
      colorEstacion: Number(this.medicionForm.colorEstacion),
      observaciones: this.medicionForm.observaciones,
      estado: this.medicionForm.tipoDestino === 'molino' ? 6 : 2, // 6 = Molido, 2 = EnReposo
      motivoMolino: this.medicionForm.tipoDestino === 'molino' ? Number(this.medicionForm.motivoMolino) : 0
    };

    this.produccionService.actualizarBobina(bobina.id, payload).subscribe({
      next: () => {
        this.saving = false;
        this.mostrarMensaje(
          this.medicionForm.tipoDestino === 'molino' 
            ? '¡Bobina descartada y enviada a molino!' 
            : '¡Bobina validada con éxito (En Reposo)!'
        );
        this.recargarOrdenActual();
      },
      error: (err) => {
        this.saving = false;
        this.mostrarMensaje(err.error?.message || 'Error al validar la bobina.', true);
        this.cdr.detectChanges();
      }
    });
  }

  // ── MÉTODOS DE IMPRESIÓN Y ETIQUETADO CON QR ─────────────────────
  bobinaAImprimir: Bobina | null = null;
  mostrarModalImpresion = false;

  getQrUrl(noSerie: string): string {
    const text = encodeURIComponent(noSerie || 'B-001');
    return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${text}`;
  }

  imprimirEtiquetaBobina(b: Bobina) {
    this.bobinaAImprimir = b;
    this.mostrarModalImpresion = true;
    this.cdr.detectChanges();
  }

  cerrarModalImpresion() {
    this.mostrarModalImpresion = false;
    this.bobinaAImprimir = null;
    this.cdr.detectChanges();
  }

  ejecutarImpresionBobina() {
    if (!this.bobinaAImprimir) return;
    const b = this.bobinaAImprimir;
    const extNombre = this.extrusionState.extrusoraActiva()?.nombre || 'Extrusora 1';
    const turnoNombre = this.extrusionState.turnoActivo()?.nombre || 'Matutino';
    const prodNombre = this.extrusionActiva?.productoNombre || this.extrusionActiva?.producto?.nombre || 'Producto Estándar';
    const fechaStr = new Date(b.fechaProduccion || Date.now()).toLocaleString('es-MX');
    const qrUrl = this.getQrUrl(b.noSerie);

    const printWindow = window.open('', '_blank', 'width=600,height=700');
    if (!printWindow) {
      alert('Por favor permita las ventanas emergentes (popups) para imprimir la etiqueta.');
      return;
    }

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Etiqueta_${b.noSerie}</title>
        <style>
          @page { size: 4in 3in; margin: 0; }
          body {
            font-family: 'Segoe UI', Arial, sans-serif;
            margin: 0;
            padding: 15px;
            background: #ffffff;
            color: #000000;
            box-sizing: border-box;
          }
          .ticket-card {
            border: 2px solid #000;
            border-radius: 8px;
            padding: 12px;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 6px;
          }
          .header h2 { margin: 0; font-size: 18px; font-weight: 800; }
          .header p { margin: 2px 0 0 0; font-size: 11px; text-transform: uppercase; font-weight: 600; }
          .body-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
          }
          .qr-box {
            width: 140px;
            height: 140px;
            flex-shrink: 0;
          }
          .qr-box img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
          .details {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 5px;
            font-size: 12px;
          }
          .field {
            display: flex;
            flex-direction: column;
          }
          .field-label { font-size: 10px; font-weight: 700; color: #555; text-transform: uppercase; }
          .field-value { font-size: 14px; font-weight: 800; }
          .footer {
            border-top: 1px dashed #000;
            padding-top: 6px;
            display: flex;
            justify-content: space-between;
            font-size: 10px;
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <div class="ticket-card">
          <div class="header">
            <h2>HI-CONE MÉXICO</h2>
            <p>ETIQUETA DE CONTROL DE BOBINA DE EXTRUSIÓN</p>
          </div>
          <div class="body-row">
            <div class="qr-box">
              <img src="${qrUrl}" alt="QR ${b.noSerie}" />
            </div>
            <div class="details">
              <div class="field">
                <span class="field-label">Folio QR / Serie:</span>
                <span class="field-value" style="font-family: monospace; font-size: 15px; color: #000;">${b.noSerie}</span>
              </div>
              <div class="field">
                <span class="field-label">Bobina #:</span>
                <span class="field-value">#${b.bobinaNo} (Origen: ${b.bobinaOrigen || 'A'})</span>
              </div>
              <div class="field">
                <span class="field-label">Peso / Calibre:</span>
                <span class="field-value">${b.kg} Kg • ${b.espesor} mm</span>
              </div>
              <div class="field">
                <span class="field-label">Producto:</span>
                <span class="field-value">${prodNombre}</span>
              </div>
            </div>
          </div>
          <div class="footer">
            <span>Máquina: ${extNombre}</span>
            <span>Turno: ${turnoNombre}</span>
            <span>Fecha: ${fechaStr}</span>
          </div>
        </div>
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 500);
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  }

  abrirTransferenciaBobina(b: Bobina) {
    this.bobinaATransferir = b;
    const ext = this.extrusionState.extrusoraActiva();
    if (ext) {
      this.produccionService.getExtrusiones().subscribe({
        next: (res) => {
          // Filtrar órdenes programadas en la misma extrusora
          this.ordenesProgramadas = res.filter(o => 
            o.extrusoraId === ext.id && 
            o.id !== this.extrusionActiva.id && 
            (String(o.estado) === '1' || String(o.estado) === 'Programada')
          );
          if (this.ordenesProgramadas.length === 0) {
            alert('No hay otras órdenes programadas en esta extrusora para transferir.');
            return;
          }
          this.destinoTransferenciaId = this.ordenesProgramadas[0].id;
          this.mostrarModalTransferencia = true;
          this.cdr.detectChanges();
        },
        error: () => {
          this.mostrarMensaje('Error al obtener la lista de órdenes.', true);
        }
      });
    }
  }

  confirmarTransferencia() {
    if (!this.bobinaATransferir || !this.destinoTransferenciaId) return;
    this.saving = true;
    this.cdr.detectChanges();
    this.produccionService.transferirBobina(this.bobinaATransferir.id, this.destinoTransferenciaId).subscribe({
      next: () => {
        this.saving = false;
        this.mostrarModalTransferencia = false;
        this.mostrarMensaje('¡Bobina transferida con éxito!');
        this.recargarOrdenActual();
      },
      error: (err) => {
        this.saving = false;
        this.mostrarMensaje(err.error?.message || 'Error al transferir bobina.', true);
        this.cdr.detectChanges();
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
