import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface VentaDetalle {
  id?: string;
  articuloId: string;
  cantidad: number;
  precioUnitario: number;
  importe: number;
  articulo?: { nombre: string; codigo: string };
}

export interface Venta {
  id: string;
  folio: string;
  fecha: Date;
  clienteId: string;
  cliente?: { nombre: string; codigo: string };
  subtotal: number;
  impuesto: number;
  total: number;
  observaciones?: string;
  detalles: VentaDetalle[];
}

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5007/api/v1/ventas';

  getVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.apiUrl);
  }

  getVenta(id: string): Observable<Venta> {
    return this.http.get<Venta>(`${this.apiUrl}/${id}`);
  }

  createVenta(venta: Partial<Venta>): Observable<string> {
    return this.http.post<string>(this.apiUrl, venta);
  }
}
