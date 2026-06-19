import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DrrExtrusionItem {
  id: string;
  extrusora: string;
  turno: string;
  operario: string;
  producto: string;
  programado: number;
  producido: number;
  target: number;
  eficiencia: number;
  tiempoInterrupcionMin: number;
  kgVirgen: number;
  kgMolido: number;
}

export interface DrrPrensadoItem {
  id: string;
  prensa: string;
  turno: string;
  operario: string;
  producto: string;
  programado: number;
  producido: number;
  target: number;
  eficiencia: number;
  tiempoInterrupcionMin: number;
  loteSilo: string;
}

export interface DrrReport {
  fecha: string;
  extrusiones: DrrExtrusionItem[];
  prensados: DrrPrensadoItem[];
}

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5007/api/v1/reportes';

  getDrrReport(fecha: string): Observable<DrrReport> {
    return this.http.get<DrrReport>(`${this.apiUrl}/drr`, {
      params: { fecha }
    });
  }
}
