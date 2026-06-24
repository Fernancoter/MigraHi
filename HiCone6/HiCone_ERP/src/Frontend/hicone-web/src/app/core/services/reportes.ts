import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DrrExtrusionItem {
  id: string;
  extrusora: string;
  turno: string;
  operario: string;
  producto: string;
  programado: number;
  producido: number;
  target: number;
  eficiencia: number;
  tiempoInterrupcionMin: number;
  kgVirgen: number;
  kgMolido: number;
}

export interface DrrPrensadoItem {
  id: string;
  prensa: string;
  turno: string;
  operario: string;
  producto: string;
  programado: number;
  producido: number;
  target: number;
  eficiencia: number;
  tiempoInterrupcionMin: number;
  loteSilo: string;
}

export interface DrrReport {
  fecha: string;
  extrusiones: DrrExtrusionItem[];
  prensados: DrrPrensadoItem[];
}

export interface PalletEmbarqueItem {
  id: string;
  fecha: string;
  folio: string;
  clienteNombre: string;
  clienteGrupo: string;
  destinoEnvia: string;
  productoNombre: string;
  noPallet: string;
}

export interface CarretePalletItem {
  id: string;
  horaFinEnsamble?: string;
  paletNoSerie: string;
  paletTipo: string;
  paletEstatus: string;
  paletProductoNombre: string;
  carreteNoSerie: string;
}

export interface ExtrusionResultadoItem {
  id: string;
  fecha: string;
  extrusora: string;
  producto: string;
  turno: string;
  operario: string;
  bobinasMolino: number;
  bobinasReposo: number;
  velLaminadora: number;
  velHusillo: number;
  totalKg: number;
  totalMermaKg: number;
  comba: boolean;
  observaciones: string;
  siloNombre: string;
  loteSilo: string;
  revHusilloMolido: number;
  revHusilloVirgen: number;
  virgenKg: number;
  molidoKg: number;
}

export interface PrensadoResultadoItem {
  id: string;
  fecha: string;
  prensa: string;
  turno: string;
  operario: string;
  piezasBuenas: number;
  piezasMolino: number;
  mermaKg: number;
  noPalets: number;
  carretesSobrantes: number;
  observaciones: string;
  rpmLinea: string;
  gpmPrensa: number;
  gpmTotal: number;
  herramientas: string;
  levasUnidadMedida: string;
  levasKgEntrada: number;
  levasKgSalida: number;
  levasGradosEntrada: number;
  levasGradosSalida: number;
  rodillosUnidadMedida: string;
  rodillosKgEntrada: number;
  rodillosKgSalida: number;
  rodillosGradosEntrada: number;
  rodillosGradosSalida: number;
}

export interface OrdenEtiquetadoItem {
  id: string;
  noOrden: string;
  fechaInicio: string;
  fechaTermina: string;
  operadorNombre: string;
  turnoNombre: string;
  piezasBuenas: number;
  piezasMolino: number;
  etiquetadoraActiva: string;
  velLineaUno: string;
  velLineaDos: string;
  horasUtiles: number;
  eficiencia: number;
  observaciones: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5007/api/v1/reportes';

  getDrrReport(fecha: string): Observable<DrrReport> {
    return this.http.get<DrrReport>(`${this.apiUrl}/drr`, {
      params: { fecha }
    });
  }

  getPalletEmbarqueReport(): Observable<PalletEmbarqueItem[]> {
    return this.http.get<PalletEmbarqueItem[]>(`${this.apiUrl}/pallet-embarque`);
  }

  getCarretePalletReport(): Observable<CarretePalletItem[]> {
    return this.http.get<CarretePalletItem[]>(`${this.apiUrl}/carrete-pallet`);
  }

  getExtrusionResultadoReport(): Observable<ExtrusionResultadoItem[]> {
    return this.http.get<ExtrusionResultadoItem[]>(`${this.apiUrl}/extrusion-resultado`);
  }

  getPrensadoResultadoReport(): Observable<PrensadoResultadoItem[]> {
    return this.http.get<PrensadoResultadoItem[]>(`${this.apiUrl}/prensado-resultado`);
  }

  getOrdenEtiquetadoReport(): Observable<OrdenEtiquetadoItem[]> {
    return this.http.get<OrdenEtiquetadoItem[]>(`${this.apiUrl}/orden-etiquetado`);
  }
}
