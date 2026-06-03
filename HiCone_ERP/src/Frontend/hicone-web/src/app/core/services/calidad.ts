import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Reclamo {
  id: string;
  codigo: string;
  fecha: Date;
  estatus: string;
  cliente: string;
  orderDoc: string;
  descripcion: string;
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

  abrirReclamo(request: any): Observable<Reclamo> {
    return this.http.post<Reclamo>(`${this.apiUrl}/reclamos`, request);
  }

  reportarDefecto(request: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/defectos/reportar`, request);
  }

  getTrazabilidad(noSerie: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/trazabilidad/${noSerie}`);
  }
}
