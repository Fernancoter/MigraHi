import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';

const STORAGE_KEY = 'hicone_custom_api_url';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  private _baseUrl = signal<string>(this.loadInitialUrl());

  get baseUrl() {
    return this._baseUrl.asReadonly();
  }

  private loadInitialUrl(): string {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved.trim()) {
      return saved.trim().replace(/\/+$/, '');
    }
    return environment.apiUrl.replace(/\/+$/, '');
  }

  getApiBaseUrl(): string {
    return this._baseUrl();
  }

  setCustomBaseUrl(url: string): void {
    const cleanUrl = url.trim().replace(/\/+$/, '');
    localStorage.setItem(STORAGE_KEY, cleanUrl);
    this._baseUrl.set(cleanUrl);
  }

  resetBaseUrl(): void {
    localStorage.removeItem(STORAGE_KEY);
    this._baseUrl.set(environment.apiUrl.replace(/\/+$/, ''));
  }

  get authUrl(): string {
    return `${this._baseUrl()}/api/auth`;
  }

  get produccionUrl(): string {
    return `${this._baseUrl()}/api/v1/produccion`;
  }

  get inventarioUrl(): string {
    return `${this._baseUrl()}/api/v1/inventario`;
  }

  get catalogosUrl(): string {
    return `${this._baseUrl()}/api/v1/catalogos`;
  }

  url(path: string): string {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${this._baseUrl()}${cleanPath}`;
  }
}
