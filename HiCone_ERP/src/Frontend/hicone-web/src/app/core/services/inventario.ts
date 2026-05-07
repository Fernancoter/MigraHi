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

export interface Lote {
  id?: string;
  loteEmbarque?: string;
  lotePO?: string;
  loteFechaRegistro?: Date;
  loteTrunkNo?: string;
  loteTipoMaterial?: string;
  loteSiloId?: string;
  loteSiloNombre?: string;
  loteKg: number;
  loteConsumido: boolean;
  lotePaqueteAditivos?: string;
}

export interface ExistenciaSiloDto {
  siloId: string;
  siloNombre?: string;
  tipoMaterial?: string;
  cantidadReal: number;
  loteVirgen?: string;
}

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5007/api/v1/Inventario';

  getArticulos(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(`http://localhost:5007/api/v1/articulos`);
  }

  getSilos(): Observable<Silo[]> {
    return this.http.get<Silo[]>(`${this.apiUrl}/silos`);
  }

  createSilo(silo: Partial<Silo>): Observable<Silo> {
    return this.http.post<Silo>(`${this.apiUrl}/silo`, silo);
  }

  updateSilo(id: string, silo: Partial<Silo>): Observable<Silo> {
    return this.http.put<Silo>(`${this.apiUrl}/silo/${id}`, silo);
  }

  getLotes(): Observable<Lote[]> {
    return this.http.get<Lote[]>(`${this.apiUrl}/lotes`);
  }

  createLote(lote: Partial<Lote>): Observable<Lote> {
    return this.http.post<Lote>(`${this.apiUrl}/lote`, lote);
  }

  deleteLote(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/lote/${id}`);
  }

  getExistenciaSilo(existenciaId: string): Observable<ExistenciaSiloDto[]> {
    return this.http.get<ExistenciaSiloDto[]>(`${this.apiUrl}/existencia-silo?existenciaId=${existenciaId}`);
  }

  updateExistenciasSilos(ajustes: ExistenciaSiloDto[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/existencia-silo/guardar`, ajustes);
  }
}
