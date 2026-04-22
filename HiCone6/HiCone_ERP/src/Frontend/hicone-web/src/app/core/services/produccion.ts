import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Bobina {
  id: string;
  codigo: string;
  pesoNeto: number;
  metros: number;
  fechaProduccion: Date;
  turno: string;
  paletId?: string;
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

  getPalets(): Observable<Palet[]> {
    return this.http.get<Palet[]>(`${this.apiUrl}/palets`);
  }

  getBobinas(): Observable<Bobina[]> {
    return this.http.get<Bobina[]>(`${this.apiUrl}/bobinas`);
  }
}
