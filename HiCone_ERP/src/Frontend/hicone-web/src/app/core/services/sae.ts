import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SaeProducto {
  productNumber: string;
  productName: string;
  stock?: number;
  isActive: boolean;
}

export interface SaePedido {
  orderDoc: string;
  clientCode: string;
  date: Date;
  totalAmount: number;
  // Aliases para compatibilidad con UI antigua sin cambiar diseño
  folio?: string;
  claveCliente?: string;
  fecha?: Date;
  importe?: number;
  estatus?: string;
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
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5007/api/v1/sae';

  getProductos(): Observable<SaeProducto[]> {
    return this.http.get<SaeProducto[]>(`${this.apiUrl}/productos`);
  }

  // Alias para compatibilidad con componentes que usan getInventario
  getInventario(): Observable<SaeProducto[]> {
    return this.getProductos();
  }

  getOrdenesPendientes(): Observable<SaePedido[]> {
    return this.http.get<SaePedido[]>(`${this.apiUrl}/ordenes-pendientes`);
  }

  // Alias para compatibilidad con componentes que usan getPedidos
  getPedidos(): Observable<SaePedido[]> {
    return this.getOrdenesPendientes();
  }

  getReporteFTB(anio: number, mes: number): Observable<SaePresupuesto[]> {
    // Retornamos vacío por ahora si el endpoint no existe, para no romper el build
    return this.http.get<SaePresupuesto[]>(`${this.apiUrl}/reporte-ftb?anio=${anio}&mes=${mes}`);
  }

  sincronizar(): Observable<any> {
    return this.http.post(`${this.apiUrl}/sincronizar`, {});
  }
}
