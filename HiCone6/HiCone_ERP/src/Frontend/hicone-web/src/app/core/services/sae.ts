import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SaeProducto {
  claveArticulo: string;
  descripcion: string;
  existencia: number;
  linea: string;
  precio: number;
  estatus: string;
}

export interface SaePedido {
  folio: string;
  claveCliente: string;
  fecha: Date;
  importe: number;
  estatus: string;
}

export interface SaePresupuesto {
  anio: number;
  mes: number;
  producto: string;
  cliente: string;
  cantidadEstimada: number;
  cantidadReal: number;
}

@Injectable({
  providedIn: 'root'
})
export class SaeService {
  private apiUrl = 'http://localhost:5007/api/v1/sae';

  constructor(private http: HttpClient) { }

  getInventario(): Observable<SaeProducto[]> {
    return this.http.get<SaeProducto[]>(`${this.apiUrl}/inventario`);
  }

  getPedidos(): Observable<SaePedido[]> {
    return this.http.get<SaePedido[]>(`${this.apiUrl}/pedidos`);
  }

  getReporteFTB(anio: number, mes: number): Observable<SaePresupuesto[]> {
    return this.http.get<SaePresupuesto[]>(`${this.apiUrl}/reporte-ftb?anio=${anio}&mes=${mes}`);
  }

  sincronizar(): Observable<any> {
    return this.http.post(`${this.apiUrl}/sincronizar`, {});
  }
}
