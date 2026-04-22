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

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5007/api/v1/articulos'; // Standard dev port

  getArticulos(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.apiUrl);
  }

  createArticulo(articulo: Partial<Articulo>): Observable<string> {
    return this.http.post<string>(this.apiUrl, articulo);
  }
}
