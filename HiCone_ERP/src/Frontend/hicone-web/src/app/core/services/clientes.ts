import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cliente {
  id: string;
  codigo: string;
  nombre: string;
  direccion?: string;
  telefono?: string;
  email?: string;
  rfc?: string;
  isActive: boolean;
  limiteCredito?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5007/api/v1/clientes';

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  getCliente(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  createCliente(cliente: Partial<Cliente>): Observable<string> {
    return this.http.post<string>(this.apiUrl, cliente);
  }
}
