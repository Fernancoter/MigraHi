import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Maquina {
  id: string;
  codigo: string;
  nombre: string;
  tipo: string;
  estado: string;
}

export interface Operario {
  id: string;
  numeroEmpleado: string;
  nombreCompleto: string;
}

export interface Turno {
  id: string;
  nombre: string;
  horaInicio: string;
  horaFin: string;
}

export interface Extrusora {
  id: string;
  codigo: string;
  nombre: string;
  estado: string;
  capacidadKgHora?: number;
}

export interface ExtrusoraProducto {
  id: string;
  extrusoraId: string;
  extrusora?: Extrusora;
  productoId: string;
  producto?: Producto;
  defaultCalibre: number;
  defaultAncho: number;
  defaultLongitud: number;
  defaultVirgenKg: number;
  defaultMolidoKg: number;
  defaultRevHusilloVirgen: number;
  defaultRevHusilloMolido: number;
  defaultMetaKg: number;
  defaultMinutosReposo: number;
  isActive: boolean;
}

export interface Prensa {
  id: string;
  codigo: string;
  nombre: string;
  estado: string;
}

export interface Producto {
  id: string;
  codigo: string;
  nombre: string;
  calibre: number;
  ancho: number;
}

export interface Extrusion {
  id: string;
  codigo: string;
  fechaInicio: Date;
  fechaFin?: Date;
  estado: string;
  extrusoraId: string;
  extrusora?: Extrusora;
  operarioId: string;
  operario?: Operario;
  turnoId?: string;
  turno?: Turno;
  producto?: Producto;
  productoNombre?: string;
  totalBobinas?: number;
  metaKg?: number;
  tiempoInterrupcion?: number;
  lotePaqueteAditivos?: string;
  iniciaProceso?: Date;
  finProceso?: Date;
  extrusionIdLegacy?: number;
  programado?: number;
  producido?: number;
}

export interface Bobina {
  id: string;
  noSerie: string;
  bobinaNo: number;
  kg: number;
  espesor: number;
  fechaProduccion: Date;
  estado: any;
  extrusionId?: string;
  colorEstacion?: any;
  motivoMolino?: any;
  bobinaOrigen?: string;
  mermaKg?: number;
}

export interface Prensado {
  id: string;
  fecha: Date;
  estado: string;
  prensa?: Prensa;
  producto?: Producto;
  operario?: Operario;
}

export interface CausaInterrupcion {
  id: string;
  codigo: string;
  descripcion: string;
  tipo: string;
}

export interface Interrupcion {
  id: string;
  horaInicio: Date;
  horaFin?: Date;
  motivo?: string;
  descripcion?: string;
  concluida: boolean;
  duracionMinutos?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProduccionService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5007/api/v1/produccion';

  // ── Extrusión ─────────────────────────────────────────────────────────
  getExtrusiones(): Observable<Extrusion[]> {
    return this.http.get<Extrusion[]>(`${this.apiUrl}/extrusiones`);
  }

  iniciarExtrusion(request: any): Observable<Extrusion> {
    return this.http.post<Extrusion>(`${this.apiUrl}/extrusion/iniciar`, request);
  }

  finalizarExtrusion(id: string, motivo?: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/extrusion/${id}/finalizar`, motivo ? `"${motivo}"` : null);
  }

  guardarBobina(request: any): Observable<Bobina> {
    return this.http.post<Bobina>(`${this.apiUrl}/extrusion/guardar-bobina`, request);
  }

  getExtrusionActiva(extrusoraId: string): Observable<Extrusion> {
    return this.http.get<Extrusion>(`${this.apiUrl}/extrusion/activa/${extrusoraId}`);
  }

  getSiguienteBobinaNo(extrusoraId: string, productoId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/extrusion/siguiente-bobina-no?extrusoraId=${extrusoraId}&productoId=${productoId}`);
  }

  registrarBobina(extrusionId: string, request: any): Observable<Bobina> {
    return this.http.post<Bobina>(`${this.apiUrl}/extrusion/${extrusionId}/registrar-bobina`, request);
  }

  // ── Prensado ───────────────────────────────────────────────────────────
  getPrensados(): Observable<Prensado[]> {
    return this.http.get<Prensado[]>(`${this.apiUrl}/prensados`);
  }

  iniciarPrensado(request: any): Observable<Prensado> {
    return this.http.post<Prensado>(`${this.apiUrl}/prensado/iniciar`, request);
  }

  // ── Interrupciones (Downtime) ──────────────────────────────────────────
  getCausasInterrupcion(): Observable<CausaInterrupcion[]> {
    return this.http.get<CausaInterrupcion[]>(`${this.apiUrl}/causas-interrupcion`);
  }

  registrarInterrupcionExtrusion(request: { entidadId: string, causaId: string, descripcion?: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/extrusion/interrupcion`, request);
  }

  finalizarInterrupcionExtrusion(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/extrusion/interrupcion/${id}/finalizar`, {});
  }

  finalizarInterrupcionExtrusionActiva(extrusionId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/extrusion/interrupcion/activa/${extrusionId}/finalizar`, {});
  }

  registrarInterrupcionPrensado(request: { entidadId: string, causaId: string, descripcion?: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/prensado/interrupcion`, request);
  }

  finalizarInterrupcionPrensado(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/prensado/interrupcion/${id}/finalizar`, {});
  }

  finalizarInterrupcionPrensadoActiva(prensadoId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/prensado/interrupcion/activa/${prensadoId}/finalizar`, {});
  }

  // ── Catálogos ─────────────────────────────────────────────────────────
  getExtrusoras(): Observable<Extrusora[]> {
    return this.http.get<Extrusora[]>(`${this.apiUrl}/maquinas/extrusoras`);
  }

  getPrensas(): Observable<Prensa[]> {
    return this.http.get<Prensa[]>(`${this.apiUrl}/maquinas/prensas`);
  }

  getOperarios(): Observable<Operario[]> {
    return this.http.get<Operario[]>(`${this.apiUrl}/operarios`);
  }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/productos`);
  }

  getTurnos(): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.apiUrl}/turnos`);
  }

  // ── Bobinas Disponibles ───────────────────────────────────────────────
  getBobinasDisponibles(): Observable<Bobina[]> {
    return this.http.get<Bobina[]>(`${this.apiUrl}/disponibilidad/bobinas`);
  }

  // ── Gestión de Bobinas ───────────────────────────────────────────────
  pausarBobina(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/bobina/${id}/pausar`, {});
  }

  rechazarBobina(id: string, motivo: number, observaciones?: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/bobina/${id}/rechazar`, { motivo, observaciones });
  }

  validarBobina(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/bobina/${id}/validar`, {});
  }

  transferirBobina(id: string, extrusionDestinoId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/bobina/${id}/transferir`, { extrusionDestinoId });
  }

  // ── Recalibración ───────────────────────────────────────────────────
  recalibrarExtrusion(id: string, request: { calibre?: number, ancho?: number, longitud?: number }): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/extrusion/${id}/recalibrar`, request);
  }

  // ── Resultado y KPIs ────────────────────────────────────────────────
  getExtrusionResultado(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/extrusion/${id}/resultado`);
  }

  getExtrusion(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/extrusion/${id}`);
  }

  createExtrusion(request: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/extrusion`, request);
  }

  updateExtrusion(id: string, request: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/extrusion/${id}`, request);
  }


  deleteExtrusion(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/extrusion/${id}`);
  }

  // ── Consultas de Extrusión ──────────────────────────────────────────
  getHistorialExtrusiones(desde?: string, hasta?: string, extrusoraId?: string, productoId?: string): Observable<any[]> {
    let params = '';
    if (desde) params += `desde=${desde}&`;
    if (hasta) params += `hasta=${hasta}&`;
    if (extrusoraId) params += `extrusoraId=${extrusoraId}&`;
    if (productoId) params += `productoId=${productoId}&`;
    return this.http.get<any[]>(`${this.apiUrl}/extrusiones/historial?${params}`);
  }

  getTurnoActivo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/turno-activo`);
  }

  getBobinasByExtrusion(extrusionId: string): Observable<Bobina[]> {
    return this.http.get<Bobina[]>(`${this.apiUrl}/extrusion/${extrusionId}/bobinas`);
  }

  getExtrusoraProductos(): Observable<ExtrusoraProducto[]> {
    return this.http.get<ExtrusoraProducto[]>(`${this.apiUrl}/extrusora-productos`);
  }

  getExtrusoraProducto(id: string): Observable<ExtrusoraProducto> {
    return this.http.get<ExtrusoraProducto>(`${this.apiUrl}/extrusora-productos/${id}`);
  }

  createExtrusoraProducto(ep: Partial<ExtrusoraProducto>): Observable<ExtrusoraProducto> {
    return this.http.post<ExtrusoraProducto>(`${this.apiUrl}/extrusora-productos`, ep);
  }

  updateExtrusoraProducto(id: string, ep: Partial<ExtrusoraProducto>): Observable<ExtrusoraProducto> {
    return this.http.put<ExtrusoraProducto>(`${this.apiUrl}/extrusora-productos/${id}`, ep);
  }

  deleteExtrusoraProducto(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/extrusora-productos/${id}`);
  }

  // ── Turnos por Semana ──────────────────────────────────────────────────
  getTurnosSemana(fechaInicio: string, fechaFin: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/extrusion/turnos-semana?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
  }

  guardarTurnosSemana(batch: any[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/extrusion/turnos-semana/guardar`, batch);
  }
}
