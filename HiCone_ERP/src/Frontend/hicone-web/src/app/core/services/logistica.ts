import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Embarque {
  id: string;
  codigo: string;
  orderDoc: string;
  remissionDoc: string;
  fecha: Date;
  estatus: string;
  cliente: string;
  transporte?: string;
  placas?: string;
  conductor?: string;
}

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogisticaService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/v1/logistica`;

  getEmbarquesActivos(): Observable<Embarque[]> {
    return this.http.get<Embarque[]>(`${this.apiUrl}/embarques/activos`);
  }

  crearEmbarqueDesdeSae(request: { orderDoc: string, remissionDoc: string }): Observable<Embarque> {
    return this.http.post<Embarque>(`${this.apiUrl}/embarques/desde-sae`, request);
  }

  validarPalet(embarqueId: string, noSeriePalet: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/embarques/${embarqueId}/validar-palet`, `"${noSeriePalet}"`);
  }

  finalizarEmbarque(id: string, elaboradoPor: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/embarques/${id}/finalizar`, `"${elaboradoPor}"`);
  }
}
