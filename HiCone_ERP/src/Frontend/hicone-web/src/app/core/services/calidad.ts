import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Reclamo {
  id: string;
  codigo: string;
  fecha: Date;
  estatus: number | string;
  cliente: string;
  orderDoc: string;
  descripcion: string;
  accionCorrectiva?: string;
  observaciones?: string;
  fechaCierre?: Date;
  cerradoPor?: string;
  detalles?: ReclamoDetalle[];
}

export interface ReclamoDetalle {
  id: string;
  reclamoId: string;
  noSeriePallet?: string;
  noSerieCarrete?: string;
  tipoDefecto: number;
  cantidadMillares: number;
  descripcion?: string;
  yaReportado: boolean;
  fechaRegistro: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CalidadService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5007/api/v1/calidad';

  getReclamosActivos(): Observable<Reclamo[]> {
    return this.http.get<Reclamo[]>(`${this.apiUrl}/reclamos/activos`);
  }

  getReclamos(): Observable<Reclamo[]> {
    return this.http.get<Reclamo[]>(`${this.apiUrl}/reclamos`);
  }

  getReclamoById(id: string): Observable<Reclamo> {
    return this.http.get<Reclamo>(`${this.apiUrl}/reclamos/${id}`);
  }

  getDefectos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/defectos`);
  }

  abrirReclamo(request: any): Observable<Reclamo> {
    return this.http.post<Reclamo>(`${this.apiUrl}/reclamos`, request);
  }

  agregarDetalleReclamo(reclamoId: string, request: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/reclamos/${reclamoId}/detalles`, request);
  }

  resolverReclamo(reclamoId: string, request: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/reclamos/${reclamoId}/resolver`, request);
  }

  reportarDefecto(request: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/defectos/reportar`, request);
  }

  getTrazabilidad(noSerie: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/trazabilidad/${noSerie}`);
  }
}

