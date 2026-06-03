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
  cantidadSistema: number;
  cantidadReal: number;
  loteVirgen?: string;
}

export interface ExistenciaHistorico {
  id: string;
  fecha: string;
  hora: string;
  usuario: string;
  observaciones: string;
  estado: string;
}

export interface AuditLog {
  id: string;
  entityName: string;
  entityId: string;
  action: string;
  username?: string;
  changesJson?: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5007/api/v1/Inventario';

  getAuditHistory(entityName: string, entityId: string): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(`${this.apiUrl}/audit/${entityName}/${entityId}`);
  }

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

  deleteSilo(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/silo/${id}`);
  }

  getLotes(): Observable<Lote[]> {
    return this.http.get<Lote[]>(`${this.apiUrl}/lotes`);
  }

  createLote(lote: Partial<Lote>): Observable<Lote> {
    return this.http.post<Lote>(`${this.apiUrl}/lote`, lote);
  }

  updateLote(id: string, lote: Partial<Lote>): Observable<Lote> {
    return this.http.put<Lote>(`${this.apiUrl}/lote/${id}`, lote);
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

  // --- Existencias Histórico (Cierres) ---
  getHistorialCierres(): Observable<ExistenciaHistorico[]> {
    return this.http.get<ExistenciaHistorico[]>(`http://localhost:5007/api/v1/ExistenciasHistorico`);
  }

  crearNuevoCierre(usuario: string, observaciones: string): Observable<string> {
    return this.http.post<string>(`http://localhost:5007/api/v1/ExistenciasHistorico/Cierre`, {
      usuario,
      observaciones
    });
  }

  completarCierre(id: string, ajustes: ExistenciaSiloDto[]): Observable<any> {
    return this.http.put(`http://localhost:5007/api/v1/ExistenciasHistorico/${id}/Completar`, ajustes);
  }

  deleteCierre(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`http://localhost:5007/api/v1/ExistenciasHistorico/${id}`);
  }

  registrarConsumoSilo(id: string, kilos: number, motivo: string): Observable<Silo> {
    return this.http.post<Silo>(`${this.apiUrl}/silo/${id}/consumo`, { kilos, motivo });
  }

  // --- Gestión de Existencias Físicas ---
  getExistenciaProducto(existenciaId: string, categoria: string, tipoProducto: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/existencia-producto`, {
      params: { existenciaId, categoria, tipoProducto }
    });
  }

  guardarExistenciaProducto(items: any[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/existencia-producto/guardar`, items);
  }

  getExistencias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/existencias`);
  }

  abrirExistencia(turnoId: string, fechaHora: string, observaciones?: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/existencia/abrir`, { turnoId, fechaHora, observaciones });
  }
}
