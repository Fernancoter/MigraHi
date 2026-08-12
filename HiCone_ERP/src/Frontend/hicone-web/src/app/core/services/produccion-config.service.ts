import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Operario   { id: string; nombre: string; activo: boolean; fotografia?: string; userGuid?: string; }
export interface Turno      { id: string; nombre: string; clave?: string; horaInicio: string; horaFin: string; }
export interface Extrusora  { id: string; nombre: string; numeroExtrusora: string; imagen?: string; }
export interface ExtrusoraOperarioRow { id?: string; turnoId: string; turno: string; operarioId?: string; operario?: string; }
export interface Prensa     { id: string; numeroPrensa?: string; nombre: string; imagen?: string; marca?: string; modelo?: string; }
export interface Troquel    { id: string; secuencialId?: number; codigo: string; nombre: string; enPrensa?: string; estado: number; estadoNombre?: string; isActive: boolean; observaciones?: string; ciclosAcumulados?: number; ciclosVideoMantenimiento?: number; fechaUltimoMantenimiento?: string; productos?: any[]; prensaTroqueles?: any[]; }
export interface Silo       { id: string; nombre: string; capacidadKg: number; minimoKg: number; maximoKg: number; estadoMaterial?: string; tipoMaterial?: string; siloActivo: boolean; }
export interface Categoria  { id: string; nombre: string; }
export interface Producto   { id: string; categoriaId?: string; categoria?: string; productoBase?: string; clave: string; nombre: string; descripcion?: string; precioUnitario: number; tipoMaterial?: string; isActive: boolean; productoSAE?: string; }
export interface ExtrusoraProducto { id: string; extrusoraId: string; productoNombre: string; productoCalibre: number; productoAncho: string; productoLongitud: number; reposoMin: number; procesoMin: number; }
export interface ExtrusoraMezcladora { id: string; extrusoraId: string; virgenMin: number; virgenMax: number; moldoMin: number; moldoMax: number; kgVirgen: number; kgMoldo: number; }
export interface PrensaProducto { id: string; prensaId: string; item: string; carrete: string; }
export interface ProductoTerminado { id: string; terminadoPalets: number; carreteMiliar: number; paletMiliar: number; terminadoPeso: number; pesoCarrete: number; pesoPalet: number; conEtiqueta: boolean; etiquetable: boolean; producto?: string; codigoSAP?: string; }
export interface ConfiguracionSistema { id: string; key: string; valor: string; }
export interface ExtrusionItem { id: string; extrusora: string; turno: string; producto: string; operador: string; producido: number; tiempoInterrupcion: number; enCurso: boolean; extrusionId: number; fecha: string; programado: number; }
export interface PrensadoItem  { id: string; prensa: string; turno: string; producto: string; operador: string; producido: number; tiempoInterrupcion: number; enCurso: boolean; fecha: string; programado: number; }

export interface PrensadoProgramacion {
  id: string;
  fecha: string;
  prensa: string;
  turno: string;
  producto: string;
  operador: string;
  programado: number;
}

export interface PrensadoOperacion {
  id: string;
  status: string;
  prensa: string;
  turno: string;
  producto: string;
  operador: string;
  producido: number;
  tiempoInterrupcion: number;
  enCurso: boolean;
}

export interface PrensadoDetail {
  id: string;
  prensa: string;
  turno: string;
  producto: string;
  operador: string;
  operadorId: string | null;
  fecha: string;
  status: string;
  calibre: number;
  ancho: string;
  longitud: number;
  programado: number;
  producido: number;
  tiempoInterrupcionMin: number;
  enCurso: boolean;
  virgenKg?: number;
  meta?: number;
  molidoKg?: number;
  iniciaProceso?: string;
  finProceso?: string;
  loteSilo?: string;
  idLegacy?: number;
  prensaId?: string;
  turnoId?: string;
  productoId?: string;
  estado?: number;
  levasUnidadMedida?: string;
  levasKgEntrada?: number;
  levasKgSalida?: number;
  levasGradosEntrada?: number;
  levasGradosSalida?: number;
  rodillosUnidadMedida?: string;
  rodillosKgEntrada?: number;
  rodillosKgSalida?: number;
  rodillosGradosEntrada?: number;
  rodillosGradosSalida?: number;
  troquelId?: string | null;
  troquelNombre?: string;
}

export interface ExtrusionProgramacion {
  id: string;
  fechaExtrusora: string;
  turno: string;
  producto: string;
  operador: string;
  programado: number;
}

export interface ExtrusionOperacion {
  id: string;
  status: string;
  extrusora: string;
  turno: string;
  producto: string;
  operador: string;
  producido: number;
  tiempoInterrupcion: number;
  enCurso: boolean;
  extrusionId: number;
}

export interface Bobina {
  id: string;
  bobbinNo: number;
  serialNo: string;
  kg: number;
  scrapKg: number;
  thickness: number;
  observations: string;
  millReason: string;
  productName: string;
  reel: string;
  restStart: string;
  restMinutes: number;
  mill: string;
  station: string;
  carreras?: number;
  iniciaReposo?: string;
  minutosEnReposo?: number;
  horaInicio?: string;
  horaSalida?: string;
  estado?: number;
}

export interface ExtrusionDetail {
  id: string;
  extrusora: string;
  turno: string;
  producto: string;
  operador: string;
  operadorId: string;
  fecha: string;
  status: string;
  calibre: number;
  ancho: string;
  longitud: number;
  kgVirgen: number;
  target: number;
  kgMolido: number;
  processStart: string;
  processEnd: string;
  bobinas: Bobina[];
}

@Injectable({ providedIn: 'root' })
export class ProduccionConfigService {
  private http = inject(HttpClient);
  private base = `http://localhost:5007/api/v1/produccion`;

  // ── TABLERO ────────────────────────────────────────────────────────────────
  // ── TABLERO / EXTRUSIÓN ───────────────────────────────────────────────────
  getExtrusionProgramacion() { return this.http.get<ExtrusionProgramacion[]>(`${this.base}/extrusion/programacion`); }
  getExtrusionOperacion()   { return this.http.get<ExtrusionOperacion[]>(`${this.base}/extrusion/operacion`); }
  getExtrusionDetail(id: string) { return this.http.get<ExtrusionDetail>(`${this.base}/extrusion/${id}`); }
  patchExtrusionOperador(id: string, operarioId: string | null) {
    return this.http.patch(`${this.base}/extrusion/${id}/operador`, { operarioId });
  }
  addBobinasManual(extrusionId: string, data: any) {
    return this.http.post(`${this.base}/extrusion/${extrusionId}/bobinas`, data);
  }
  deleteBobina(extrusionId: string, bobinaId: string) {
    return this.http.delete(`${this.base}/extrusion/${extrusionId}/bobinas/${bobinaId}`);
  }
  deleteExtrusion(id: string) {
    return this.http.delete(`${this.base}/extrusion/${id}`);
  }
  saveProgramacionExtrusionBatch(payload: any) {
    return this.http.post(`${this.base}/extrusion/programacion/batch`, payload);
  }
  
  getTableroPrensado()  { return this.http.get<{ operacion: PrensadoItem[]  }>(`${this.base}/tablero/prensado`);  }

  getPrensadoProgramacion() { return this.http.get<PrensadoProgramacion[]>(`${this.base}/prensado/programacion`); }
  getPrensadoOperacion()   { return this.http.get<PrensadoOperacion[]>(`${this.base}/prensado/operacion`); }
  getPrensados()           { return this.http.get<any[]>(`${this.base}/prensados`); }
  getPrensadoDetail(id: string) { return this.http.get<PrensadoDetail>(`${this.base}/prensado/${id}`); }
  patchPrensadoOperador(id: string, operarioId: string | null) {
    return this.http.patch(`${this.base}/prensado/${id}/operador`, { operarioId });
  }
  updatePrensado(id: string, data: any) {
    return this.http.put(`${this.base}/prensado/${id}`, data);
  }
  deletePrensado(id: string) {
    return this.http.delete(`${this.base}/prensado/${id}`);
  }
  saveProgramacionPrensadoBatch(payload: any) {
    return this.http.post(`${this.base}/prensado/programacion/batch`, payload);
  }

  // ── OPERARIOS ──────────────────────────────────────────────────────────────
  getOperarios(search = '')   { return this.http.get<Operario[]>(`${this.base}/operarios?search=${search}`); }
  createOperario(op: Partial<Operario>) { return this.http.post<string>(`${this.base}/operarios`, op); }
  updateOperario(id: string, op: Partial<Operario>) { return this.http.put(`${this.base}/operarios/${id}`, op); }
  deleteOperario(id: string)  { return this.http.delete(`${this.base}/operarios/${id}`); }

  // ── PRODUCTOS ──────────────────────────────────────────────────────────────
  getProductos(params: { search?: string; categoriaId?: string; activo?: boolean } = {}) {
    const q = new URLSearchParams();
    if (params.search) q.set('search', params.search);
    if (params.categoriaId) q.set('categoriaId', params.categoriaId);
    if (params.activo !== undefined) q.set('activo', String(params.activo));
    return this.http.get<Producto[]>(`${this.base}/productos?${q}`);
  }
  createProducto(p: Partial<Producto>)          { return this.http.post<string>(`${this.base}/productos`, p); }
  updateProducto(id: string, p: Partial<Producto>) { return this.http.put(`${this.base}/productos/${id}`, p); }
  deleteProducto(id: string)                    { return this.http.delete(`${this.base}/productos/${id}`); }

  // ── CATÁLOGOS ──────────────────────────────────────────────────────────────
  getCategorias(search = '')   { return this.http.get<Categoria[]>(`${this.base}/catalogos/categorias?search=${search}`); }
  createCategoria(c: Partial<Categoria>) { return this.http.post<string>(`${this.base}/catalogos/categorias`, c); }
  updateCategoria(id: string, c: Partial<Categoria>) { return this.http.put(`${this.base}/catalogos/categorias/${id}`, c); }
  deleteCategoria(id: string)  { return this.http.delete(`${this.base}/catalogos/categorias/${id}`); }

  getTurnos()    { return this.http.get<Turno[]>(`${this.base}/catalogos/turnos`); }
  getCatalogosClaves() { return this.http.get<{id: string, valor: string}[]>(`${this.base}/catalogos/claves`); }
  createTurno(t: { nombre: string; clave?: string; horaInicio: string; horaFin: string; tenantId: string }) { return this.http.post<string>(`${this.base}/catalogos/turnos`, t); }
  updateTurno(id: string, t: any) { return this.http.put(`${this.base}/catalogos/turnos/${id}`, t); }
  deleteTurno(id: string)  { return this.http.delete(`${this.base}/catalogos/turnos/${id}`); }

  getExtrusoras(search = '')   { return this.http.get<Extrusora[]>(`${this.base}/catalogos/extrusoras?search=${search}`); }
  getExtrusora(id: string)      { return this.http.get<any>(`${this.base}/catalogos/extrusoras/${id}`); }
  createExtrusora(e: { nombre: string; numeroExtrusora: string; imagen?: string; tenantId: string }) { return this.http.post<string>(`${this.base}/catalogos/extrusoras`, e); }
  updateExtrusora(id: string, e: { nombre: string; numeroExtrusora: string; imagen?: string; tenantId: string }) { return this.http.put(`${this.base}/catalogos/extrusoras/${id}`, e); }
  deleteExtrusora(id: string)  { return this.http.delete(`${this.base}/catalogos/extrusoras/${id}`); }
  getExtrusoraOperarios(extrusoraId: string) { return this.http.get<ExtrusoraOperarioRow[]>(`${this.base}/catalogos/extrusoras/${extrusoraId}/operarios`); }
  upsertExtrusoraOperario(extrusoraId: string, turnoId: string, dto: { operarioId?: string; tenantId: string }) { return this.http.put(`${this.base}/catalogos/extrusoras/${extrusoraId}/operarios/${turnoId}`, dto); }
  saveExtrusoraOperariosBatch(extrusoraId: string, items: any[]) { return this.http.put(`${this.base}/catalogos/extrusoras/${extrusoraId}/operarios/batch`, items); }

  getPrensas(search = '')  { return this.http.get<Prensa[]>(`${this.base}/catalogos/prensas?search=${search}`); }
  createPrensa(p: Partial<Prensa>) { return this.http.post<string>(`${this.base}/catalogos/prensas`, p); }
  updatePrensa(id: string, p: Partial<Prensa>) { return this.http.put(`${this.base}/catalogos/prensas/${id}`, p); }
  deletePrensa(id: string) { return this.http.delete(`${this.base}/catalogos/prensas/${id}`); }

  getSilos(activo?: boolean)  { const q = activo !== undefined ? `?activo=${activo}` : ''; return this.http.get<Silo[]>(`${this.base}/catalogos/silos${q}`); }
  createSilo(s: Partial<Silo>) { return this.http.post<string>(`${this.base}/catalogos/silos`, s); }
  updateSilo(id: string, s: Partial<Silo>) { return this.http.put(`${this.base}/catalogos/silos/${id}`, s); }
  deleteSilo(id: string)      { return this.http.delete(`${this.base}/catalogos/silos/${id}`); }
  archivarSilo(id: string)    { return this.http.put(`${this.base}/catalogos/silos/${id}/archivar`, {}); }

  getMaterialEstados() { return this.http.get<{id: string, nombre: string}[]>(`${this.base}/catalogos/material-estados`); }
  getMaterialTipos() { return this.http.get<{id: string, nombre: string}[]>(`${this.base}/catalogos/material-tipos`); }

  // ── TROQUELES ──────────────────────────────────────────────────────────────
  getTroqueles(search = '') { return this.http.get<Troquel[]>(`${this.base}/catalogos/troqueles?search=${search}`); }
  getTroquelById(id: string) { return this.http.get<any>(`${this.base}/catalogos/troqueles/${id}`); }
  createTroquel(t: Partial<Troquel>) { return this.http.post<string>(`${this.base}/catalogos/troqueles`, t); }
  updateTroquel(id: string, t: Partial<Troquel>) { return this.http.put(`${this.base}/catalogos/troqueles/${id}`, t); }
  deleteTroquel(id: string) { return this.http.delete(`${this.base}/catalogos/troqueles/${id}`); }

  asignarPrensaTroquel(troquelId: string, prensaId: string, observaciones?: string) {
    return this.http.post<any>(`${this.base}/catalogos/troqueles/${troquelId}/prensa-troqueles`, { prensaId, observaciones });
  }
  desasignarPrensaTroquel(troquelId: string, prensaTroquelId: string) {
    return this.http.delete(`${this.base}/catalogos/troqueles/${troquelId}/prensa-troqueles/${prensaTroquelId}`);
  }
  addTroquelProducto(troquelId: string, productoId: string) {
    return this.http.post<any>(`${this.base}/catalogos/troqueles/${troquelId}/productos`, { productoId });
  }
  removeTroquelProducto(troquelId: string, troquelProductoId: string) {
    return this.http.delete(`${this.base}/catalogos/troqueles/${troquelId}/productos/${troquelProductoId}`);
  }
}
