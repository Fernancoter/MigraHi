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

export interface Extrusora {
  id: string;
  codigo: string;
  nombre: string;
  estado: string;
  capacidadKgHora?: number;
}

export interface Prensa {
  id: string;
  codigo: string;
  nombre: string;
  estado: string;
}

export interface Producto {
  id: string;
  codigo: string;
  nombre: string;
  calibre: number;
  ancho: number;
}

export interface Extrusion {
  id: string;
  codigo: string;
  fechaInicio: Date;
  fechaFin?: Date;
  estado: string;
  extrusoraId: string;
  extrusora?: Extrusora;
  operarioId: string;
  operario?: Operario;
  turnoId?: string;
  turno?: Turno;
  producto?: Producto;
  totalBobinas?: number;
}

export interface Bobina {
  id: string;
  noSerie: string;
  bobinaNo: number;
  kg: number;
  espesor: number;
  fechaProduccion: Date;
  estado: string;
  extrusionId?: string;
}

export interface Prensado {
  id: string;
  fecha: Date;
  estado: string;
  prensa?: Prensa;
  producto?: Producto;
  operario?: Operario;
}

export interface CausaInterrupcion {
  id: string;
  codigo: string;
  descripcion: string;
  tipo: string;
}

export interface Interrupcion {
  id: string;
  horaInicio: Date;
  horaFin?: Date;
  motivo?: string;
  descripcion?: string;
  concluida: boolean;
  duracionMinutos?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProduccionService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5007/api/v1/produccion';

  // ── Extrusión ─────────────────────────────────────────────────────────
  getExtrusiones(): Observable<Extrusion[]> {
    return this.http.get<Extrusion[]>(`${this.apiUrl}/extrusiones`);
  }

  iniciarExtrusion(request: any): Observable<Extrusion> {
    return this.http.post<Extrusion>(`${this.apiUrl}/extrusion/iniciar`, request);
  }

  finalizarExtrusion(id: string, motivo?: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/extrusion/${id}/finalizar`, motivo ? `"${motivo}"` : null);
  }

  registrarBobina(extrusionId: string, request: any): Observable<Bobina> {
    return this.http.post<Bobina>(`${this.apiUrl}/extrusion/${extrusionId}/registrar-bobina`, request);
  }

  // ── Prensado ───────────────────────────────────────────────────────────
  getPrensados(): Observable<Prensado[]> {
    return this.http.get<Prensado[]>(`${this.apiUrl}/prensados`);
  }

  iniciarPrensado(request: any): Observable<Prensado> {
    return this.http.post<Prensado>(`${this.apiUrl}/prensado/iniciar`, request);
  }

  // ── Interrupciones (Downtime) ──────────────────────────────────────────
  getCausasInterrupcion(): Observable<CausaInterrupcion[]> {
    return this.http.get<CausaInterrupcion[]>(`${this.apiUrl}/causas-interrupcion`);
  }

  registrarInterrupcionExtrusion(request: { entidadId: string, causaId: string, descripcion?: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/extrusion/interrupcion`, request);
  }

  finalizarInterrupcionExtrusion(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/extrusion/interrupcion/${id}/finalizar`, {});
  }

  registrarInterrupcionPrensado(request: { entidadId: string, causaId: string, descripcion?: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/prensado/interrupcion`, request);
  }

  finalizarInterrupcionPrensado(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/prensado/interrupcion/${id}/finalizar`, {});
  }

  // ── Catálogos ─────────────────────────────────────────────────────────
  getExtrusoras(): Observable<Extrusora[]> {
    return this.http.get<Extrusora[]>(`${this.apiUrl}/maquinas/extrusoras`);
  }

  getPrensas(): Observable<Prensa[]> {
    return this.http.get<Prensa[]>(`${this.apiUrl}/maquinas/prensas`);
  }

  getOperarios(): Observable<Operario[]> {
    return this.http.get<Operario[]>(`${this.apiUrl}/operarios`);
  }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/productos`);
  }

  // ── Bobinas Disponibles ───────────────────────────────────────────────
  getBobinasDisponibles(): Observable<Bobina[]> {
    return this.http.get<Bobina[]>(`${this.apiUrl}/disponibilidad/bobinas`);
  }
}
