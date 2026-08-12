import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ProduccionService, Extrusora, Operario, Turno, Producto, Extrusion, Bobina } from '../../../core/services/produccion';
import { InventarioService, Silo } from '../../../core/services/inventario';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-extrusion-operador',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './extrusion-operador.html',
  styleUrls: ['./extrusion-operador.css']
})
export class ExtrusionOperadorComponent implements OnInit {
  private prodService = inject(ProduccionService);
  private invService = inject(InventarioService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  // Catálogos
  extrusoras: Extrusora[] = [];
  operarios: Operario[] = [];
  turnos: Turno[] = [];
  productos: Producto[] = [];
  silos: Silo[] = [];

  // Estado del operador
  extrusoraSeleccionada: any = null;
  extrusionActiva: any = null;
  loading = false;
  saving = false;
  errorMessage = '';
  successMessage = '';

  // Consecutivo BobinaNo calculado
  siguienteBobinaNo = 1;

  // Formulario Inauguración
  inauguracion = {
    operarioId: '',
    turnoId: '',
    productoId: '',
    siloVirgenId: '',
    virgenKg: 0,
    siloMolidoId: '',
    molidoKg: 0,
    metaKg: 1000,
    revHusilloVirgen: 0,
    revHusilloMolido: 0,
    lotePaqueteAditivos: '',
    observaciones: ''
  };

  // Formularios de Estación A y B
  estacionA = {
    peso: 0,
    calibre: 0,
    desviacion: 0,
    color: 1, // Rojo por defecto
    enviarMolino: false,
    mermaKg: 0,
    motivo: 1, // FallaMecanica por defecto
    observaciones: ''
  };

  estacionB = {
    peso: 0,
    calibre: 0,
    desviacion: 0,
    color: 2, // Azul por defecto
    enviarMolino: false,
    mermaKg: 0,
    motivo: 1,
    observaciones: ''
  };

  // Últimas Bobinas registradas
  ultimaBobinaA: Bobina | null = null;
  ultimaBobinaB: Bobina | null = null;

  // Visualizador de sticker
  stickerBobina: Bobina | null = null;
  stickerEstacion: 'A' | 'B' = 'A';

  // Modal de Cierre
  mostrarModalCierre = false;
  cierreObservaciones = '';
  kpis = {
    totalBobinas: 0,
    totalBobinasMolidas: 0,
    kgProducidos: 0,
    kgMerma: 0,
    eficiencia: 0
  };

  // Historial completo de bobinas en la extrusión activa
  bobinasExtrusion: Bobina[] = [];

  // Formulario y Modal de Recalibración
  mostrarModalRecalibrar = false;
  recalibracion = {
    calibre: null as number | null,
    ancho: null as number | null,
    longitud: null as number | null
  };

  // Modal de Rechazo (Molino)
  mostrarModalRechazar = false;
  bobinaAProcesar: Bobina | null = null;
  motivoRechazo = 1;
  observacionesRechazo = '';

  // Modal de Transferencia (Reasignar Turno)
  mostrarModalTransferir = false;
  extrusionDestinoId = '';
  extrusionesDisponibles: any[] = [];

  ngOnInit() {
    this.cargarCatalogos();
  }

  cargarCatalogos() {
    this.loading = true;
    this.prodService.getExtrusoras().subscribe({
      next: (data) => {
        this.extrusoras = data;
        this.loading = false;
        // Si hay una sola extrusora, seleccionarla por defecto
        if (this.extrusoras.length === 1) {
          this.seleccionarExtrusora(this.extrusoras[0]);
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar extrusoras:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });

    this.prodService.getOperarios().subscribe((data: Operario[]) => { this.operarios = data; this.cdr.detectChanges(); });
    this.prodService.getProductos().subscribe((data: Producto[]) => { this.productos = data; this.cdr.detectChanges(); });
    this.prodService.getTurnos().subscribe((data: Turno[]) => { this.turnos = data; this.cdr.detectChanges(); });
    this.invService.getSilos().subscribe((data: Silo[]) => { this.silos = data; this.cdr.detectChanges(); });
  }

  seleccionarExtrusora(ext: Extrusora) {
    this.extrusoraSeleccionada = ext;
    this.extrusionActiva = null;
    this.errorMessage = '';
    this.successMessage = '';
    this.cargarExtrusionActiva();
  }

  cargarExtrusionActiva() {
    if (!this.extrusoraSeleccionada) return;
    this.loading = true;
    this.prodService.getExtrusionActiva(this.extrusoraSeleccionada.id)
      .pipe(
        catchError(err => {
          // Si da 404, significa que no hay orden activa, lo cual es normal
          return of(null);
        })
      )
      .subscribe({
        next: (data) => {
          this.extrusionActiva = data;
          this.loading = false;
          if (this.extrusionActiva) {
            this.inauguracion.productoId = this.extrusionActiva.producto?.id || '';
            // Rellenar valores por defecto para mediciones basados en el producto
            if (this.extrusionActiva.producto) {
              this.estacionA.calibre = this.extrusionActiva.producto.calibre;
              this.estacionB.calibre = this.extrusionActiva.producto.calibre;
            }
            this.cargarSiguienteConsecutivo();
            this.cargarUltimasBobinas();
            this.cargarBobinasExtrusion();
          }
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al cargar orden activa:', err);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  cargarSiguienteConsecutivo() {
    if (!this.extrusoraSeleccionada || !this.inauguracion.productoId) return;
    this.prodService.getSiguienteBobinaNo(this.extrusoraSeleccionada.id, this.inauguracion.productoId)
      .subscribe((no: number) => {
        this.siguienteBobinaNo = no;
        this.cdr.detectChanges();
      });
  }

  cargarUltimasBobinas() {
    if (!this.extrusionActiva || !this.extrusionActiva.id) return;
    // Si la extrusión activa trae bobinas, tomamos las últimas de origen A y B
    if (this.extrusionActiva.totalBobinas && this.extrusionActiva.totalBobinas > 0) {
      // Las bobinas del backend se cargan en la extrusión activa
      const bobs = (this.extrusionActiva as any).bobinas || [];
      const bobA = bobs.filter((b: any) => b.bobinaOrigen === 'A').sort((a: any, b: any) => b.bobinaNo - a.bobinaNo)[0];
      const bobB = bobs.filter((b: any) => b.bobinaOrigen === 'B').sort((a: any, b: any) => b.bobinaNo - a.bobinaNo)[0];
      if (bobA) this.ultimaBobinaA = bobA;
      if (bobB) this.ultimaBobinaB = bobB;
    }
  }

  getSilosVirgenes(): Silo[] {
    return this.silos.filter(s => s.tipoMaterial === 'Virgen' || s.estadoMaterial?.toLowerCase().includes('virgen'));
  }

  getSilosMolidos(): Silo[] {
    return this.silos.filter(s => s.tipoMaterial === 'Molido' || s.estadoMaterial?.toLowerCase().includes('molido') || s.estadoMaterial?.toLowerCase().includes('reproceso'));
  }

  getSiloExistencia(siloId: string): number {
    return this.silos.find(s => s.id === siloId)?.existenciaActual || 0;
  }

  inaugurarOrden() {
    if (!this.extrusoraSeleccionada) return;
    this.errorMessage = '';
    this.successMessage = '';

    // Validaciones
    if (!this.inauguracion.operarioId) { this.errorMessage = 'Debe seleccionar un operario.'; return; }
    if (!this.inauguracion.turnoId) { this.errorMessage = 'Debe seleccionar un turno.'; return; }
    if (!this.inauguracion.productoId) { this.errorMessage = 'Debe seleccionar un producto.'; return; }
    if (!this.inauguracion.siloVirgenId) { this.errorMessage = 'Debe seleccionar un Silo Virgen.'; return; }
    if (this.inauguracion.virgenKg <= 0) { this.errorMessage = 'La cantidad de material virgen debe ser mayor a 0.'; return; }

    const stockVirgen = this.getSiloExistencia(this.inauguracion.siloVirgenId);
    if (this.inauguracion.virgenKg > stockVirgen) {
      this.errorMessage = `Cantidad excede existencia en Silo Virgen (${stockVirgen} Kg disponibles).`;
      return;
    }

    if (this.inauguracion.siloMolidoId && this.inauguracion.molidoKg > 0) {
      const stockMolido = this.getSiloExistencia(this.inauguracion.siloMolidoId);
      if (this.inauguracion.molidoKg > stockMolido) {
        this.errorMessage = `Cantidad excede existencia en Silo Molido (${stockMolido} Kg disponibles).`;
        return;
      }
    }

    this.saving = true;
    const request = {
      extrusoraId: this.extrusoraSeleccionada.id,
      operarioId: this.inauguracion.operarioId,
      turnoId: this.inauguracion.turnoId,
      productoId: this.inauguracion.productoId,
      siloVirgenId: this.inauguracion.siloVirgenId,
      virgenKg: this.inauguracion.virgenKg,
      siloMolidoId: this.inauguracion.siloMolidoId || null,
      molidoKg: this.inauguracion.molidoKg,
      metaKg: this.inauguracion.metaKg,
      revHusilloVirgen: this.inauguracion.revHusilloVirgen,
      revHusilloMolido: this.inauguracion.revHusilloMolido,
      lotePaqueteAditivos: this.inauguracion.lotePaqueteAditivos,
      observaciones: this.inauguracion.observaciones
    };

    this.prodService.iniciarExtrusion(request).subscribe({
      next: (data) => {
        this.extrusionActiva = data;
        this.successMessage = '¡Orden de Extrusión Inaugurada con Éxito!';
        this.saving = false;
        // Rellenar valores por defecto para mediciones basados en el producto
        if (this.extrusionActiva.producto) {
          this.estacionA.calibre = this.extrusionActiva.producto.calibre;
          this.estacionB.calibre = this.extrusionActiva.producto.calibre;
        }
        // Actualizar silos localmente
        this.invService.getSilos().subscribe((s: Silo[]) => { this.silos = s; this.cdr.detectChanges(); });
        this.cargarSiguienteConsecutivo();
        this.cargarUltimasBobinas();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al inaugurar orden:', err);
        this.errorMessage = err.error?.message || 'Error del servidor al inaugurar orden.';
        this.saving = false;
        this.cdr.detectChanges();
      }
    });
  }

  guardarEstacion(estacion: 'A' | 'B') {
    if (!this.extrusionActiva) return;
    this.errorMessage = '';
    this.successMessage = '';

    const data = estacion === 'A' ? this.estacionA : this.estacionB;

    // Validaciones
    if (data.peso <= 0) {
      this.errorMessage = `El peso de la Estación ${estacion} debe ser mayor a 0.`;
      return;
    }
    if (data.calibre <= 0) {
      this.errorMessage = `El calibre de la Estación ${estacion} debe ser mayor a 0.`;
      return;
    }
    if (data.enviarMolino) {
      if (data.mermaKg <= 0) {
        this.errorMessage = `Si envía al molino la Estación ${estacion}, los Kg de Merma deben ser mayores a 0.`;
        return;
      }
      if (data.mermaKg > data.peso) {
        this.errorMessage = `Los Kg de Merma de la Estación ${estacion} no pueden exceder el peso total del rollo.`;
        return;
      }
    }

    this.saving = true;
    const request = {
      extrusionId: this.extrusionActiva.id,
      bobinaNo: this.siguienteBobinaNo,
      origen: estacion,
      peso: data.peso,
      calibre: data.calibre,
      desviacion: data.desviacion,
      color: Number(data.color),
      mermaKg: data.enviarMolino ? data.mermaKg : 0,
      motivo: data.enviarMolino ? Number(data.motivo) : 0,
      observaciones: data.observaciones
    };

    this.prodService.guardarBobina(request).subscribe({
      next: (bobina) => {
        this.successMessage = `¡Bobina de Estación ${estacion} guardada con éxito!`;
        this.saving = false;

        if (estacion === 'A') {
          this.ultimaBobinaA = bobina;
          this.estacionA.peso = 0;
          this.estacionA.desviacion = 0;
          this.estacionA.enviarMolino = false;
          this.estacionA.mermaKg = 0;
          this.estacionA.observaciones = '';
        } else {
          this.ultimaBobinaB = bobina;
          this.estacionB.peso = 0;
          this.estacionB.desviacion = 0;
          this.estacionB.enviarMolino = false;
          this.estacionB.mermaKg = 0;
          this.estacionB.observaciones = '';
        }

        // Mostrar Sticker flotante
        this.stickerBobina = bobina;
        this.stickerEstacion = estacion;

        // Si es Estación A, recalculamos el consecutivo BobinaNo del backend
        this.cargarSiguienteConsecutivo();
        // Recargar silos localmente para ver actualización de molido
        this.invService.getSilos().subscribe((s: Silo[]) => { this.silos = s; this.cdr.detectChanges(); });
        // Recargar lista completa de bobinas
        this.cargarBobinasExtrusion();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al guardar bobina:', err);
        this.errorMessage = err.error?.message || 'Error del servidor al registrar bobina.';
        this.saving = false;
        this.cdr.detectChanges();
      }
    });
  }

  cerrarSticker() {
    this.stickerBobina = null;
  }

  imprimirSticker() {
    window.print();
  }

  abrirCierre() {
    if (!this.extrusionActiva) return;
    this.loading = true;
    
    // Recargar datos más recientes para el resumen final
    this.prodService.getExtrusionActiva(this.extrusionActiva.extrusoraId).subscribe({
      next: (data) => {
        this.extrusionActiva = data;
        const bobs = (this.extrusionActiva as any).bobinas || [];
        const totalBobs = bobs.length;
        const molidas = bobs.filter((b: any) => b.estado === 'Molido' || b.estado === 6).length;
        const totalKg = bobs.reduce((sum: number, b: any) => sum + b.kg, 0);
        const mermasSum = bobs.reduce((sum: number, b: any) => sum + (b.mermaKg || 0), 0);
        const meta = this.extrusionActiva?.metaKg || 1000;

        this.kpis = {
          totalBobinas: totalBobs,
          totalBobinasMolidas: molidas,
          kgProducidos: totalKg,
          kgMerma: mermasSum,
          eficiencia: Math.min(Math.round((totalKg / meta) * 100), 100)
        };

        this.loading = false;
        this.mostrarModalCierre = true;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al abrir modal de cierre:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  confirmarCierre() {
    if (!this.extrusionActiva) return;
    this.saving = true;
    this.prodService.finalizarExtrusion(this.extrusionActiva.id, this.cierreObservaciones || undefined)
      .subscribe({
        next: () => {
          this.successMessage = '¡Orden de Extrusión Finalizada Correctamente!';
          this.extrusionActiva = null;
          this.mostrarModalCierre = false;
          this.saving = false;
          this.ultimaBobinaA = null;
          this.ultimaBobinaB = null;
          this.stickerBobina = null;
          this.cierreObservaciones = '';
          
          // Recargar catálogo de silos y extrusoras
          this.cargarCatalogos();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al finalizar extrusión:', err);
          this.errorMessage = 'No se pudo finalizar la orden de extrusión.';
          this.saving = false;
          this.cdr.detectChanges();
        }
      });
  }

  cancelarCierre() {
    this.mostrarModalCierre = false;
    this.cierreObservaciones = '';
  }

  getColorName(colorVal: any): string {
    const val = Number(colorVal);
    switch (val) {
      case 1: return 'Rojo 🔴';
      case 2: return 'Azul 🔵';
      case 3: return 'Verde 🟢';
      case 4: return 'Amarillo 🟡';
      case 5: return 'Naranja 🟠';
      case 6: return 'Blanco ⚪';
      default: return 'Sin Asignar 🟡';
    }
  }

  getMotivoName(motivoVal: any): string {
    const val = Number(motivoVal);
    switch (val) {
      case 1: return 'Falla Mecánica';
      case 2: return 'Limpieza / Contaminación';
      default: return 'No Aplica';
    }
  }

  // --- Métodos de Gestión y Acciones Transaccionales de Bobina ---
  cargarBobinasExtrusion() {
    if (!this.extrusionActiva || !this.extrusionActiva.id) return;
    this.prodService.getBobinasByExtrusion(this.extrusionActiva.id).subscribe({
      next: (bobs) => {
        this.bobinasExtrusion = bobs;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar bobinas de extrusión:', err)
    });
  }

  getEstadoBobinaName(estadoVal: any): string {
    const val = Number(estadoVal);
    switch (val) {
      case 1: return 'En Proceso';
      case 2: return 'En Reposo';
      case 3: return 'En Prensado';
      case 4: return 'Utilizada';
      case 5: return 'Rechazada';
      case 6: return 'Molido (Reciclaje)';
      case 7: return 'Pausada';
      case 8: return 'Desmontada';
      case 9: return 'Transferida';
      case 10: return 'Consumida';
      case 11: return 'En Medición';
      case 12: return 'Disponible';
      default: return 'Desconocido';
    }
  }

  pausarBobina(bobina: Bobina) {
    this.errorMessage = '';
    this.successMessage = '';
    this.saving = true;
    this.prodService.pausarBobina(bobina.id).subscribe({
      next: () => {
        this.successMessage = `¡Bobina ${bobina.noSerie} pausada correctamente!`;
        this.saving = false;
        this.cargarBobinasExtrusion();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al pausar bobina:', err);
        this.errorMessage = err.error?.message || 'Error del servidor al pausar la bobina.';
        this.saving = false;
        this.cdr.detectChanges();
      }
    });
  }

  validarBobina(bobina: Bobina) {
    this.errorMessage = '';
    this.successMessage = '';
    this.saving = true;
    this.prodService.validarBobina(bobina.id).subscribe({
      next: () => {
        this.successMessage = `¡Bobina ${bobina.noSerie} validada correctamente (Disponible para Prensado)!`;
        this.saving = false;
        this.cargarBobinasExtrusion();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al validar bobina:', err);
        this.errorMessage = err.error?.message || 'Error del servidor al validar la bobina.';
        this.saving = false;
        this.cdr.detectChanges();
      }
    });
  }

  abrirRechazarBobina(bobina: Bobina) {
    this.bobinaAProcesar = bobina;
    this.motivoRechazo = 1;
    this.observacionesRechazo = '';
    this.mostrarModalRechazar = true;
  }

  confirmarRechazoBob() {
    if (!this.bobinaAProcesar) return;
    this.errorMessage = '';
    this.successMessage = '';
    this.saving = true;
    this.prodService.rechazarBobina(this.bobinaAProcesar.id, Number(this.motivoRechazo), this.observacionesRechazo || undefined)
      .subscribe({
        next: () => {
          this.successMessage = `¡Bobina ${this.bobinaAProcesar!.noSerie} rechazada y enviada a molino correctamente!`;
          this.mostrarModalRechazar = false;
          this.saving = false;
          this.bobinaAProcesar = null;
          this.cargarBobinasExtrusion();
          // Recargar silos localmente para ver actualización de molido
          this.invService.getSilos().subscribe((s: Silo[]) => { this.silos = s; this.cdr.detectChanges(); });
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al rechazar bobina:', err);
          this.errorMessage = err.error?.message || 'Error del servidor al rechazar la bobina.';
          this.saving = false;
          this.cdr.detectChanges();
        }
      });
  }

  abrirTransferirBobina(bobina: Bobina) {
    this.bobinaAProcesar = bobina;
    this.extrusionDestinoId = '';
    this.extrusionesDisponibles = [];
    this.loading = true;
    
    this.prodService.getExtrusiones().subscribe({
      next: (exts) => {
        // Mostrar órdenes activas excluyendo la actual
        this.extrusionesDisponibles = exts.filter(e => e.id !== this.extrusionActiva.id && e.estado !== 'Finalizada');
        this.loading = false;
        this.mostrarModalTransferir = true;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar extrusiones para transferir:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  confirmarTransferenciaBob() {
    if (!this.bobinaAProcesar || !this.extrusionDestinoId) return;
    this.errorMessage = '';
    this.successMessage = '';
    this.saving = true;
    this.prodService.transferirBobina(this.bobinaAProcesar.id, this.extrusionDestinoId).subscribe({
      next: () => {
        this.successMessage = `¡Bobina ${this.bobinaAProcesar!.noSerie} reasignada con éxito!`;
        this.mostrarModalTransferir = false;
        this.saving = false;
        this.bobinaAProcesar = null;
        this.cargarBobinasExtrusion();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al transferir bobina:', err);
        this.errorMessage = err.error?.message || 'Error del servidor al reasignar la bobina.';
        this.saving = false;
        this.cdr.detectChanges();
      }
    });
  }

  // --- Recalibración ---
  abrirRecalibrar() {
    if (!this.extrusionActiva) return;
    this.recalibracion.calibre = this.extrusionActiva.producto?.calibre || null;
    this.recalibracion.ancho = this.extrusionActiva.producto?.ancho || null;
    this.recalibracion.longitud = null;
    this.mostrarModalRecalibrar = true;
  }

  guardarRecalibracion() {
    if (!this.extrusionActiva) return;
    this.errorMessage = '';
    this.successMessage = '';
    this.saving = true;
    
    this.prodService.recalibrarExtrusion(
      this.extrusionActiva.id, 
      { 
        calibre: this.recalibracion.calibre || undefined, 
        ancho: this.recalibracion.ancho || undefined, 
        longitud: this.recalibracion.longitud || undefined 
      }
    ).subscribe({
      next: () => {
        this.successMessage = '¡Recalibración de medidas de extrusión aplicada con éxito!';
        this.mostrarModalRecalibrar = false;
        this.saving = false;
        this.cargarExtrusionActiva(); // Recargar datos de la orden
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al recalibrar extrusión:', err);
        this.errorMessage = err.error?.message || 'Error del servidor al aplicar recalibración.';
        this.saving = false;
        this.cdr.detectChanges();
      }
    });
  }
}
