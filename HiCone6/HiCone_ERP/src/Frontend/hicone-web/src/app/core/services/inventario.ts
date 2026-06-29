import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Articulo {
  id: string;
  codigo: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  existencia: number;
  categoriaId?: string;
  categoria?: { nombre: string };
}

export interface Silo {
  id: string;
  nombre: string;
  codigo: string;
  capacidadMaxima: number;
  existenciaActual: number;
  kgMinimo: number;
  kgMaximo: number;
  estadoMaterial: string;
  tipoMaterial: string;
  activo: boolean;
  estado: string;
  ubicacion: string;
}

export interface Existencia {
  id: string;
  fechaHora: string;
  usuario: string;
  estado: string;
  observaciones?: string;
}

export interface ExistenciaSilo {
  siloId: string;
  siloNombre: string;
  tipoMaterial: string;
  cantidadReal: number;
  loteVirgen: string;
}

export interface ExistenciaProducto {
  productoId: string;
  productoNombre: string;
  existenciaId: string;
  cantidadReal: number;
  cantidadSistema: number;
  millarSistema: number;
}

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5007/api/v1';

  getArticulos(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(`${this.apiUrl}/articulos`);
  }

  getSilos(): Observable<Silo[]> {
    return this.http.get<Silo[]>(`${this.apiUrl}/inventario/silos`);
  }

  createSilo(silo: Partial<Silo>): Observable<Silo> {
    return this.http.post<Silo>(`${this.apiUrl}/inventario/silo`, silo);
  }

  getExistencias(): Observable<Existencia[]> {
    return this.http.get<Existencia[]>(`${this.apiUrl}/inventario/existencias`);
  }

  getExistenciaProducto(existenciaId: string, categoria: string, tipoProducto: string): Observable<ExistenciaProducto[]> {
    return this.http.get<ExistenciaProducto[]>(`${this.apiUrl}/inventario/existencia-producto`, {
      params: { existenciaId, categoria, tipoProducto }
    });
  }

  getExistenciaSilo(existenciaId: string): Observable<ExistenciaSilo[]> {
    return this.http.get<ExistenciaSilo[]>(`${this.apiUrl}/inventario/existencia-silo`, {
      params: { existenciaId }
    });
  }
}
