import { Injectable, signal, computed } from '@angular/core';
import { Extrusora } from './produccion';

/**
 * Servicio compartido de estado para el módulo de Extrusiones.
 * El Shell lo actualiza cuando el usuario selecciona turno/extrusora.
 * El componente ExtrusionMain lo lee para reaccionar.
 */
@Injectable({ providedIn: 'root' })
export class ExtrusionStateService {
  /** Turno activo seleccionado desde el header */
  readonly turnoActivo = signal<{ id: string; nombre: string } | null>(null);

  /** Extrusora activa seleccionada desde el header */
  readonly extrusoraActiva = signal<Extrusora | null>(null);

  /** Indica si ya se hizo al menos una selección de extrusora */
  readonly extrusoraSeleccionada = computed(() => this.extrusoraActiva() !== null);

  setTurno(turno: { id: string; nombre: string } | null) {
    this.turnoActivo.set(turno);
  }

  setExtrusora(ext: Extrusora | null) {
    this.extrusoraActiva.set(ext);
  }

  reset() {
    this.turnoActivo.set(null);
    this.extrusoraActiva.set(null);
  }
}
