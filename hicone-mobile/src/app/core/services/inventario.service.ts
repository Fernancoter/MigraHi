import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from './api-config.service';

export interface Silo {
  id: string;
  nombre: string;
  capacidadMax?: number;
  existenciaActual?: number;
  tipoMaterial?: string;
  estadoMaterial?: string;
}

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private http = inject(HttpClient);
  private apiConfig = inject(ApiConfigService);
  private get apiUrl() { return this.apiConfig.inventarioUrl; }

  getSilos(): Observable<Silo[]> {
    return this.http.get<Silo[]>(`${this.apiUrl}/silos`);
  }
}
