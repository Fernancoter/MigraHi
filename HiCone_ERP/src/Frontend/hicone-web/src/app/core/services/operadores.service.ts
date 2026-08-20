import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface OperadorDto {
  id: string;
  operadorNombre: string;
  operadorUserGUID: string;
  activo: boolean;
  username?: string; // Para mostrar el usuario vinculado
}

@Injectable({
  providedIn: 'root'
})
export class OperadoresService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://localhost:5007/api/Operadores';

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getOperadores(): Observable<OperadorDto[]> {
    return this.http.get<OperadorDto[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  createOperador(operador: { nombre: string, codigo?: string, userGUID?: string }): Observable<OperadorDto> {
    return this.http.post<OperadorDto>(this.apiUrl, operador, { headers: this.getHeaders() });
  }

  habilitar(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/habilitar`, {}, { headers: this.getHeaders() });
  }

  deshabilitar(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/deshabilitar`, {}, { headers: this.getHeaders() });
  }
}
