import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Operario   { id: string; nombre: string; activo: boolean; }
export interface Turno      { id: string; nombre: string; horaInicio: string; horaFin: string; }
export interface Extrusora  { id: string; nombre: string; }
export interface Prensa     { id: string; nombre: string; marca?: string; modelo?: string; }
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

@Injectable({ providedIn: 'root' })
export class ProduccionConfigService {
  private http = inject(HttpClient);
  private base = `http://localhost:5007/api/v1/produccion`;

  // ── TABLERO ────────────────────────────────────────────────────────────────
  // ── TABLERO / EXTRUSIÓN ───────────────────────────────────────────────────
  getExtrusionProgramacion() { return this.http.get<ExtrusionProgramacion[]>(`${this.base}/extrusion/programacion`); }
  getExtrusionOperacion()   { return this.http.get<ExtrusionOperacion[]>(`${this.base}/extrusion/operacion`); }
  getExtrusionDetail(id: string) { return this.http.get<any>(`${this.base}/extrusion/${id}`); }
  
  getTableroPrensado()  { return this.http.get<{ operacion: PrensadoItem[]  }>(`${this.base}/tablero/prensado`);  }

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
  createTurno(t: { nombre: string; horaInicio: string; horaFin: string; tenantId: string }) { return this.http.post<string>(`${this.base}/catalogos/turnos`, t); }
  updateTurno(id: string, t: any) { return this.http.put(`${this.base}/catalogos/turnos/${id}`, t); }
  deleteTurno(id: string)  { return this.http.delete(`${this.base}/catalogos/turnos/${id}`); }

  getExtrusoras(search = '')   { return this.http.get<Extrusora[]>(`${this.base}/catalogos/extrusoras?search=${search}`); }
  createExtrusora(e: Partial<Extrusora>) { return this.http.post<string>(`${this.base}/catalogos/extrusoras`, e); }
  updateExtrusora(id: string, e: Partial<Extrusora>) { return this.http.put(`${this.base}/catalogos/extrusoras/${id}`, e); }
  deleteExtrusora(id: string)  { return this.http.delete(`${this.base}/catalogos/extrusoras/${id}`); }

  getPrensas(search = '')  { return this.http.get<Prensa[]>(`${this.base}/catalogos/prensas?search=${search}`); }
  createPrensa(p: Partial<Prensa>) { return this.http.post<string>(`${this.base}/catalogos/prensas`, p); }
  updatePrensa(id: string, p: Partial<Prensa>) { return this.http.put(`${this.base}/catalogos/prensas/${id}`, p); }
  deletePrensa(id: string) { return this.http.delete(`${this.base}/catalogos/prensas/${id}`); }

  getSilos(activo?: boolean)  { const q = activo !== undefined ? `?activo=${activo}` : ''; return this.http.get<Silo[]>(`${this.base}/catalogos/silos${q}`); }
  createSilo(s: Partial<Silo>) { return this.http.post<string>(`${this.base}/catalogos/silos`, s); }
  updateSilo(id: string, s: Partial<Silo>) { return this.http.put(`${this.base}/catalogos/silos/${id}`, s); }
  deleteSilo(id: string)      { return this.http.delete(`${this.base}/catalogos/silos/${id}`); }
}
