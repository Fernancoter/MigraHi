import { Injectable, signal, computed } from '@angular/core';
import { Extrusora, Prensa } from './produccion';

/**
 * Servicio compartido de estado para el módulo de Extrusiones y Prensados.
 * El Shell lo actualiza cuando el usuario selecciona turno/extrusora/prensa.
 * Los componentes leen para reaccionar.
 */
@Injectable({ providedIn: 'root' })
export class ExtrusionStateService {
  /** Turno activo seleccionado desde el header */
  readonly turnoActivo = signal<{ id: string; nombre: string } | null>(null);

  /** Extrusora activa seleccionada desde el header */
  readonly extrusoraActiva = signal<Extrusora | null>(null);

  /** Prensa activa seleccionada desde el header */
  readonly prensaActiva = signal<Prensa | null>(null);

  /** Indica si ya se hizo al menos una selección de extrusora */
  readonly extrusoraSeleccionada = computed(() => this.extrusoraActiva() !== null);

  /** Indica si hay una interrupción activa en curso */
  readonly interrupcionEnCurso = signal<boolean>(false);

  /** Indica si la extrusión ya fue iniciada y está activa (En Proceso) */
  readonly extrusionIniciada = signal<boolean>(false);

  /** Callbacks de comunicación desde el Shell al componente principal */
  onTriggerInterrupcion?: () => void;
  onTriggerFinalizar?: () => void;
  onTriggerCambiarTroquel?: () => void;

  setTurno(turno: { id: string; nombre: string } | null) {
    this.turnoActivo.set(turno);
  }

  setExtrusora(ext: Extrusora | null) {
    this.extrusoraActiva.set(ext);
  }

  setPrensa(prensa: Prensa | null) {
    this.prensaActiva.set(prensa);
  }

  reset() {
    this.turnoActivo.set(null);
    this.extrusoraActiva.set(null);
    this.prensaActiva.set(null);
    this.interrupcionEnCurso.set(false);
    this.extrusionIniciada.set(false);
    this.onTriggerInterrupcion = undefined;
    this.onTriggerFinalizar = undefined;
    this.onTriggerCambiarTroquel = undefined;
  }
}
