import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://localhost:5007/api/v1/inventario';

  getSilos(): Observable<Silo[]> {
    return this.http.get<Silo[]>(`${this.apiUrl}/silos`);
  }
}
