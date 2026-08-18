import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { ProduccionService, Bobina } from '../../../core/services/produccion';
import { AuthService } from '../../../core/services/auth.service';
import { DialogService } from '../../../core/services/dialog.service';
import { ExtrusionStateService } from '../../../core/services/extrusion-state.service';

@Component({
  selector: 'app-prensado-main',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './prensado-main.component.html',
  styleUrls: ['./prensado-main.component.scss']
})
export class PrensadoMainComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private prodService = inject(ProduccionService);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);
  private dialog = inject(DialogService);
  private extrusionState = inject(ExtrusionStateService);

  prensadoId = '';
  prensado: any | null = null;
  carreras: any[] = [];
  cargando = true;
  saving = false;

  // Alertas
  errorMessage = '';
  successMessage = '';

  // Control de Navegación y Tiempos
  activeTab: 'insumo' | 'carrera' | 'palet' = 'insumo';
  tiempoTranscurrido = '00:00:00';
  palets: any[] = [];
  cargandoPalets = false;

  // Escaneo/Montaje de Bobina
  mostrarModalBobina = false;
  bobinasDisponibles: Bobina[] = [];
  cargandoBobinas = false;
  selectedBobinaId = '';

  // Carrera Activa
  carreraActiva: any | null = null;
  cargandoCarrera = false;

  // Modal Cierre Prensado
  mostrarModalCierre = false;
  levasUm: 'Kg' | 'Grados' = 'Kg';
  rodillosUm: 'Kg' | 'Grados' = 'Kg';
  levasEntrada = 0.0;
  levasSalida = 0.0;
  rodillosEntrada = 0.0;
  rodillosSalida = 0.0;

  // Menú superior de 3 puntos e Interrupciones / Cambiar Troquel
  mostrarMenuOpciones = false;
  mostrarModalInterrupcion = false;
  causasInterrupcion: any[] = [];
  interrupcionMotivo = '';
  interrupcionCausaId = '';
  interrupcionActiva: any = null;
  tiempoInterrupcionStr = '00:00:00';
  
  mostrarModalCambiarTroquel = false;
  troqueles: any[] = [];
  selectedTroquelId = '';

  private subs = new Subscription();

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.prensadoId = params['id'] || '';
      if (this.prensadoId) {
        // Asignar callbacks al servicio global de estado para que el header los invoque
        this.extrusionState.onTriggerInterrupcion = () => {
          this.seleccionarInterrupcion();
        };
        this.extrusionState.onTriggerFinalizar = () => {
          this.abrirModalCierre();
        };
        this.extrusionState.onTriggerCambiarTroquel = () => {
          this.seleccionarCambiarTroquel();
        };

        this.cargarDatos();
        this.cargarCausasInterrupcion();
        this.cargarTroqueles();
      } else {
        this.router.navigate(['/prensado']);
      }
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.extrusionState.onTriggerInterrupcion = undefined;
    this.extrusionState.onTriggerFinalizar = undefined;
    this.extrusionState.onTriggerCambiarTroquel = undefined;
  }

  cargarDatos() {
    this.cargando = true;
    this.prodService.getPrensado(this.prensadoId).subscribe({
      next: (detail) => {
        this.prensado = detail;
        
        // Sincronizar el estado de interrupción con el servicio global para el header
        this.extrusionState.interrupcionEnCurso.set(detail.interrupcionEnCurso || false);

        // Map active interrupcion if it exists
        if (detail.activeInterrupcionId) {
          this.interrupcionActiva = {
            id: detail.activeInterrupcionId,
            causaId: detail.activeInterrupcionCausaId,
            horaInicio: detail.activeInterrupcionHoraInicio
          };
        } else {
          this.interrupcionActiva = null;
        }

        this.cargarCarreras();
        this.cargarBobinasDisponibles();
        this.cargarPalets();
        this.iniciarContadorTiempo();
      },
      error: (err) => {
        this.cargando = false;
        this.mostrarMensaje('Error al cargar orden de prensado: ' + (err.error?.message || err.message), true);
        this.cdr.detectChanges();
      }
    });
  }

  iniciarContadorTiempo() {
    this.subs.unsubscribe();
    this.subs = new Subscription();
    
    this.subs.add(
      timer(0, 1000).subscribe(() => {
        if (this.prensado && this.prensado.iniciaProceso) {
          const inicio = new Date(this.prensado.iniciaProceso).getTime();
          const ahora = new Date().getTime();
          const diffMs = ahora - inicio;
          if (diffMs > 0) {
            const hrs = Math.floor(diffMs / 3600000);
            const mins = Math.floor((diffMs % 3600000) / 60000);
            const secs = Math.floor((diffMs % 60000) / 1000);
            this.tiempoTranscurrido = `${this.padZero(hrs)}:${this.padZero(mins)}:${this.padZero(secs)}`;
          } else {
            this.tiempoTranscurrido = '00:00:00';
          }
        } else {
          this.tiempoTranscurrido = '00:00:00';
        }
        this.cdr.detectChanges();
      })
    );
  }

  private padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  cargarPalets() {
    this.cargandoPalets = true;
    this.prodService.getPalets(this.prensado?.producto).subscribe({
      next: (data) => {
        this.palets = (data || []).filter((p: any) => 
          p.prensaId === this.prensado?.prensaId || p.producto === this.prensado?.producto
        );
        this.cargandoPalets = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.cargandoPalets = false;
        console.error('Error al cargar palets:', err);
        this.cdr.detectChanges();
      }
    });
  }

  crearPalet() {
    if (!this.prensado) return;
    this.cargandoPalets = true;
    const request = {
      productoId: this.prensado.productoId,
      operarioId: this.prensado.operadorId,
      prensaId: this.prensado.prensaId
    };
    this.prodService.crearPalet(request).subscribe({
      next: (res: any) => {
        this.mostrarMensaje(`¡Palet ${res.noSerie} creado con éxito!`);
        this.cargarPalets();
      },
      error: (err) => {
        this.cargandoPalets = false;
        this.mostrarMensaje('Error al crear palet: ' + (err.error?.message || err.message), true);
        this.cdr.detectChanges();
      }
    });
  }

  cerrarPalet(id: string) {
    this.cargandoPalets = true;
    this.prodService.finalizarPalet(id).subscribe({
      next: () => {
        this.mostrarMensaje('¡Palet cerrado con éxito!');
        this.cargarPalets();
      },
      error: (err) => {
        this.cargandoPalets = false;
        this.mostrarMensaje('Error al cerrar palet: ' + (err.error?.message || err.message), true);
        this.cdr.detectChanges();
      }
    });
  }

  cargarCarreras() {
    this.prodService.getPrensadoCarreras(this.prensadoId).subscribe({
      next: (data) => {
        this.carreras = data || [];
        // Buscar si hay alguna carrera activa (en proceso)
        this.carreraActiva = this.carreras.find(c => c.estado === 1 || c.estado === 'EnProceso') || null;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.cargando = false;
        console.error('Error cargando carreras:', err);
        this.cdr.detectChanges();
      }
    });
  }

  // --- Montaje de Bobina ---
  cargarBobinasDisponibles() {
    this.cargandoBobinas = true;
    this.prodService.getBobinasDisponibles().subscribe({
      next: (data) => {
        this.bobinasDisponibles = data || [];
        this.cargandoBobinas = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.cargandoBobinas = false;
        console.error('Error al obtener bobinas disponibles:', err);
        this.cdr.detectChanges();
      }
    });
  }

  async montarBobinaSeleccionadaById() {
    if (!this.selectedBobinaId) {
      this.mostrarMensaje('Debe seleccionar una bobina de la lista.', true);
      return;
    }
    const bobina = this.bobinasDisponibles.find(b => b.id === this.selectedBobinaId);
    if (!bobina) return;

    // Calcular horas en reposo
    const horasReposo = bobina.iniciaReposo ? ((new Date().getTime() - new Date(bobina.iniciaReposo).getTime()) / (1000 * 60 * 60)).toFixed(2) : '0.00';
    
    // Confirmar montaje (Imagen 1)
    const mensajeConfirm = `¿Desea montar en prensa la bobina ${bobina.noSerie}-Disponible- tiempo: ${horasReposo} hora(s)?`;
    const ok = await this.dialog.confirm(mensajeConfirm, 'Confirmar Montaje');
    if (!ok) {
      return;
    }

    this.saving = true;
    this.prodService.montarBobina(this.prensadoId, bobina.id).subscribe({
      next: () => {
        this.saving = false;
        this.mostrarMensaje(`¡Bobina ${bobina.noSerie} montada exitosamente en la prensa!`);
        this.selectedBobinaId = '';
        this.cargarDatos();
      },
      error: (err) => {
        this.saving = false;
        this.mostrarMensaje('Error al montar bobina: ' + (err.error?.message || err.message), true);
        this.cdr.detectChanges();
      }
    });
  }

  async escanearBobina() {
    const code = prompt("Escanee o ingrese el código de serie de la Bobina (ej: B-080225-03-035A):");
    if (!code) return;

    const serial = code.trim().toUpperCase();
    const bobina = this.bobinasDisponibles.find(b => b.noSerie.toUpperCase() === serial);
    
    if (bobina) {
      this.selectedBobinaId = bobina.id;
      this.montarBobinaSeleccionadaById();
    } else {
      this.saving = true;
      this.mostrarMensaje('Buscando bobina...', false);
      
      this.prodService.getBobinasDisponibles().subscribe({
        next: async (allBobinas) => {
          const found = allBobinas.find(b => b.noSerie.toUpperCase() === serial);
          if (found) {
            // Calcular horas en reposo
            const horasReposo = found.iniciaReposo ? ((new Date().getTime() - new Date(found.iniciaReposo).getTime()) / (1000 * 60 * 60)).toFixed(2) : '0.00';
            
            // Confirmar montaje (Imagen 1)
            const mensajeConfirm = `¿Desea montar en prensa la bobina ${found.noSerie}-Disponible- tiempo: ${horasReposo} hora(s)?`;
            const ok = await this.dialog.confirm(mensajeConfirm, 'Confirmar Montaje');
            if (!ok) {
              this.saving = false;
              this.successMessage = '';
              this.cdr.detectChanges();
              return;
            }

            this.prodService.montarBobina(this.prensadoId, found.id).subscribe({
              next: () => {
                this.saving = false;
                this.mostrarMensaje(`¡Bobina ${found.noSerie} montada exitosamente!`);
                this.cargarDatos();
              },
              error: (err) => {
                this.saving = false;
                this.mostrarMensaje('Error al montar bobina escaneada: ' + (err.error?.message || err.message), true);
                this.cdr.detectChanges();
              }
            });
          } else {
            this.saving = false;
            this.mostrarMensaje(`La bobina "${serial}" no existe o no está en estado Aprobada/Disponible.`, true);
            this.cdr.detectChanges();
          }
        },
        error: (err) => {
          this.saving = false;
          this.mostrarMensaje('Error al buscar bobina: ' + (err.error?.message || err.message), true);
          this.cdr.detectChanges();
        }
      });
    }
  }

  // --- Carreras y Carretes ---
  iniciarNuevaCarrera() {
    if (!this.prensado.activeBobinaId) {
      this.mostrarMensaje('Debe montar una bobina en la prensa antes de iniciar una carrera.', true);
      return;
    }
    if (this.carreraActiva) {
      this.mostrarMensaje('Ya hay una carrera en proceso. Termínela antes de iniciar otra.', true);
      return;
    }

    this.cargandoCarrera = true;
    this.prodService.iniciarCarrera(this.prensadoId).subscribe({
      next: () => {
        this.mostrarMensaje('Carrera iniciada. Se generaron 6 carretes.');
        this.cargarCarreras();
        this.cargandoCarrera = false;
      },
      error: (err) => {
        this.cargandoCarrera = false;
        this.mostrarMensaje('Error al iniciar carrera: ' + (err.error?.message || err.message), true);
        this.cdr.detectChanges();
      }
    });
  }

  toggleDefectoCarrete(carrete: any) {
    const nuevoEstado = (carrete.estado === 3 || carrete.estado === 'Rechazado') ? 2 : 3;
    const anteriorEstado = carrete.estado;
    
    carrete.estado = nuevoEstado;
    this.cdr.detectChanges();

    const request = {
      noLinea: carrete.noLinea,
      estado: nuevoEstado,
      molino: nuevoEstado === 3 ? 1 : 0,
      terminaPalet: carrete.terminaPalet || false,
      paletSerie: carrete.paletSerie || null,
      observaciones: carrete.observaciones || (nuevoEstado === 3 ? 'Scrap desde PWA móvil' : '')
    };

    this.prodService.updateCarrete(carrete.id, request).subscribe({
      next: () => {
        this.mostrarMensaje(`Carrete de la línea ${carrete.noLinea} actualizado.`);
      },
      error: (err) => {
        carrete.estado = anteriorEstado;
        this.mostrarMensaje('Error al actualizar carrete: ' + (err.error?.message || err.message), true);
        this.cdr.detectChanges();
      }
    });
  }

  finalizarCarreraActiva() {
    if (!this.carreraActiva) return;

    this.cargandoCarrera = true;
    this.prodService.finalizarCarrera(this.carreraActiva.id).subscribe({
      next: () => {
        this.mostrarMensaje('Carrera finalizada exitosamente.');
        this.carreraActiva = null;
        this.cargarCarreras();
        this.cargandoCarrera = false;
      },
      error: (err) => {
        this.cargandoCarrera = false;
        this.mostrarMensaje('Error al finalizar carrera: ' + (err.error?.message || err.message), true);
        this.cdr.detectChanges();
      }
    });
  }

  // --- Cierre de Prensado ---
  abrirModalCierre() {
    this.levasUm = 'Kg';
    this.rodillosUm = 'Kg';
    this.levasEntrada = 0;
    this.levasSalida = 0;
    this.rodillosEntrada = 0;
    this.rodillosSalida = 0;
    this.mostrarModalCierre = true;
  }

  cerrarModalCierre() {
    this.mostrarModalCierre = false;
  }

  confirmarCierre() {
    this.saving = true;
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

    this.prodService.concluirPrensado(this.prensadoId, payload).subscribe({
      next: () => {
        this.saving = false;
        this.mostrarModalCierre = false;
        alert('¡Prensado finalizado y consolidado exitosamente!');
        this.router.navigate(['/prensado']);
      },
      error: (err) => {
        this.saving = false;
        this.mostrarMensaje('Error al concluir prensado: ' + (err.error?.message || err.message), true);
        this.cdr.detectChanges();
      }
    });
  }

  // --- Helpers ---
  private mostrarMensaje(text: string, isError = false) {
    if (isError) {
      this.errorMessage = text;
      timer(6000).subscribe(() => {
        this.errorMessage = '';
        this.cdr.markForCheck();
      });
    } else {
      this.successMessage = text;
      timer(5000).subscribe(() => {
        this.successMessage = '';
        this.cdr.markForCheck();
      });
    }
    this.cdr.detectChanges();
  }

  goBack() {
    this.router.navigate(['/prensado']);
  }

  isCarreteDefectuoso(c: any, lineNo: number): boolean {
    const carrete = (c.carretes || []).find((cr: any) => cr.noLinea === lineNo);
    return carrete ? (carrete.estado === 3 || carrete.estado === 'Rechazado') : false;
  }

  toggleCarreteDefectoByLine(c: any, lineNo: number) {
    const carrete = (c.carretes || []).find((cr: any) => cr.noLinea === lineNo);
    if (carrete) {
      this.toggleDefectoCarrete(carrete);
    }
  }

  cargarCausasInterrupcion() {
    this.prodService.getCausasInterrupcion().subscribe({
      next: (data) => {
        this.causasInterrupcion = data || [];
      },
      error: (err) => {
        console.error('Error cargando causas interrupcion:', err);
      }
    });
  }

  cargarTroqueles() {
    this.prodService.getTroqueles().subscribe({
      next: (data) => {
        this.troqueles = data || [];
      },
      error: (err) => {
        console.error('Error cargando troqueles:', err);
      }
    });
  }

  toggleMenuOpciones() {
    this.mostrarMenuOpciones = !this.mostrarMenuOpciones;
  }

  seleccionarInterrupcion() {
    this.mostrarMenuOpciones = false;
    if (this.prensado?.interrupcionEnCurso) {
      this.reanudarProceso();
    } else {
      this.interrupcionMotivo = '';
      this.interrupcionCausaId = '';
      this.mostrarModalInterrupcion = true;
      this.cdr.detectChanges();
    }
  }

  registrarInterrupcion() {
    if (!this.interrupcionMotivo.trim()) {
      this.mostrarMensaje('Debe especificar el motivo de la interrupción.', true);
      return;
    }
    if (!this.interrupcionCausaId) {
      this.mostrarMensaje('Debe seleccionar una causa.', true);
      return;
    }

    this.saving = true;
    const request = {
      entidadId: this.prensadoId,
      causaId: this.interrupcionCausaId,
      descripcion: this.interrupcionMotivo
    };

    this.prodService.registrarInterrupcionPrensado(request).subscribe({
      next: (res: any) => {
        this.saving = false;
        this.interrupcionActiva = res;
        this.mostrarModalInterrupcion = false;
        this.mostrarMensaje('¡Interrupción registrada con éxito!');
        this.cargarDatos();
      },
      error: (err: any) => {
        this.saving = false;
        this.mostrarMensaje('Error al registrar interrupción: ' + (err.error?.message || err.message), true);
        this.cdr.detectChanges();
      }
    });
  }

  async reanudarProceso() {
    const ok = await this.dialog.confirm(
      '¿Desea reanudar el proceso de prensado y terminar la interrupción activa?',
      'Confirmar Reanudación'
    );
    if (ok) {
      this.saving = true;
      this.prodService.finalizarInterrupcionPrensadoActiva(this.prensadoId).subscribe({
        next: () => {
          this.saving = false;
          this.mostrarMensaje('¡Proceso reanudado con éxito!');
          this.cargarDatos();
        },
        error: (err: any) => {
          this.saving = false;
          this.mostrarMensaje('Error al reanudar proceso: ' + (err.error?.message || err.message), true);
          this.cdr.detectChanges();
        }
      });
    }
  }

  seleccionarFinalizar() {
    this.mostrarMenuOpciones = false;
    if (this.carreraActiva) {
      alert('Debe terminar y validar todas las carreras'); // Imagen 2
      return;
    }
    this.abrirModalCierre();
  }

  seleccionarCambiarTroquel() {
    this.mostrarMenuOpciones = false;
    this.selectedTroquelId = this.prensado?.troquelId || '';
    this.mostrarModalCambiarTroquel = true;
    this.cdr.detectChanges();
  }

  cambiarTroquel() {
    if (!this.selectedTroquelId) {
      this.mostrarMensaje('Debe seleccionar un troquel de la lista.', true);
      return;
    }

    this.saving = true;
    const updateRequest = {
      fecha: this.prensado.fecha,
      estado: this.prensado.estado,
      operarioId: this.prensado.operadorId,
      troquelId: this.selectedTroquelId,
      levasUnidadMedida: this.prensado.levasUnidadMedida || 'Kg',
      rodillosUnidadMedida: this.prensado.rodillosUnidadMedida || 'Kg',
      levasKgEntrada: this.prensado.levasKgEntrada || 0,
      levasKgSalida: this.prensado.levasKgSalida || 0,
      levasGradosEntrada: this.prensado.levasGradosEntrada || 0,
      levasGradosSalida: this.prensado.levasGradosSalida || 0,
      rodillosKgEntrada: this.prensado.rodillosKgEntrada || 0,
      rodillosKgSalida: this.prensado.rodillosKgSalida || 0,
      rodillosGradosEntrada: this.prensado.rodillosGradosEntrada || 0,
      rodillosGradosSalida: this.prensado.rodillosGradosSalida || 0,
      iniciaProceso: this.prensado.iniciaProceso,
      finProceso: this.prensado.finProceso,
      calibre: this.prensado.calibre || 0,
      ancho: this.prensado.ancho || '',
      longitud: this.prensado.longitud || 0,
      virgenKg: this.prensado.virgenKg || 0,
      molidoKg: this.prensado.molidoKg || 0,
      meta: this.prensado.meta || 0,
      loteSilo: this.prensado.loteSilo || ''
    };

    this.prodService.updatePrensado(this.prensadoId, updateRequest).subscribe({
      next: () => {
        this.saving = false;
        this.mostrarModalCambiarTroquel = false;
        this.mostrarMensaje('¡Troquel cambiado exitosamente!');
        this.cargarDatos();
      },
      error: (err: any) => {
        this.saving = false;
        this.mostrarMensaje('Error al cambiar troquel: ' + (err.error?.message || err.message), true);
        this.cdr.detectChanges();
      }
    });
  }

  cerrarModalInterrupcion() {
    this.mostrarModalInterrupcion = false;
  }

  cerrarModalCambiarTroquel() {
    this.mostrarModalCambiarTroquel = false;
  }
}
