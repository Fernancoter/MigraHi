import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ExistenciaProducto {
  productoId: number;
  productoNombre: string;
  existenciaId: number;
  cantidadReal: number;
  cantidadSistema: number;
  millarSistema: number;
}

export interface ExistenciaSilo {
  siloId: number;
  siloNombre: string;
  tipoMaterial: string;
  cantidadReal: number;
  loteVirgen: string;
}

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private apiUrl = `${environment.apiUrl}/api/v1/inventario`;

  constructor(private http: HttpClient) { }

  getExistenciaProducto(existenciaId: number, categoria: string, tipoProducto: string): Observable<ExistenciaProducto[]> {
    return this.http.get<ExistenciaProducto[]>(`${this.apiUrl}/existencia-producto`, {
      params: { existenciaId, categoria, tipoProducto }
    });
  }

  getExistenciaSilo(existenciaId: number): Observable<ExistenciaSilo[]> {
    return this.http.get<ExistenciaSilo[]>(`${this.apiUrl}/existencia-silo`, {
      params: { existenciaId }
    });
  }
}
