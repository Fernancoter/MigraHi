import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Maquina {
  id: string;
  codigo: string;
  nombre: string;
  tipo: string;
  estado: string;
}

export interface Operario {
  id: string;
  numeroEmpleado: string;
  nombreCompleto: string;
}

export interface Turno {
  id: string;
  nombre: string;
  horaInicio: string;
  horaFin: string;
}

export interface Interrupcion {
  id: string;
  horaInicio: Date;
  horaFin?: Date;
  motivo: string;
  descripcion?: string;
  concluida: boolean;
  extrusionId: string;
  duracionMinutos?: number;
}

export interface Extrusion {
  id: string;
  codigo: string;
  fechaInicio: Date;
  fechaFin?: Date;
  estado: string;
  maquinaId: string;
  maquina?: Maquina;
  operarioId: string;
  operario?: Operario;
  turnoId?: string;
  turno?: Turno;
  bobinas?: Bobina[];
  interrupciones?: Interrupcion[];
}

export interface Bobina {
  id: string;
  codigo: string;
  pesoNeto: number;
  metros: number;
  fechaProduccion: Date;
  turno: string;
  estado: string;
  paletId?: string;
  extrusionId?: string;
}

export interface Palet {
  id: string;
  codigo: string;
  tipo: string;
  horaInicioEnsamble?: Date;
  horaFinEnsamble?: Date;
  estado: string;
  bobinas: Bobina[];
}

@Injectable({
  providedIn: 'root'
})
export class ProduccionService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5007/api/v1/produccion';

  // Palets y Bobinas
  getPalets(): Observable<Palet[]> {
    return this.http.get<Palet[]>(`${this.apiUrl}/palets`);
  }

  getBobinas(): Observable<Bobina[]> {
    return this.http.get<Bobina[]>(`${this.apiUrl}/bobinas`);
  }

  createBobina(bobina: Partial<Bobina>): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/bobinas`, bobina);
  }

  // Extrusiones
  getExtrusiones(): Observable<Extrusion[]> {
    return this.http.get<Extrusion[]>(`${this.apiUrl}/extrusiones`);
  }

  createExtrusion(extrusion: Partial<Extrusion>): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/extrusiones`, extrusion);
  }

  finalizarExtrusion(id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/extrusiones/${id}/finalizar`, {});
  }

  // Catálogos
  getMaquinas(): Observable<Maquina[]> {
    return this.http.get<Maquina[]>(`${this.apiUrl}/maquinas`);
  }

  getOperarios(): Observable<Operario[]> {
    return this.http.get<Operario[]>(`${this.apiUrl}/operarios`);
  }

  // Interrupciones
  createInterrupcion(interrupcion: Partial<Interrupcion>): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/interrupciones`, interrupcion);
  }
}
