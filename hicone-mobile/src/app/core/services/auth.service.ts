import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of, map, BehaviorSubject, from, switchMap } from 'rxjs';
import { OfflineStoreService } from '../offline/offline-store.service';
import { ApiConfigService } from './api-config.service';

export interface UserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  companyId: string;
  operadorId: number | null;
  roles: string[];
  permissions: string[];
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
  mustChangePassword?: boolean;
  userId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiConfig = inject(ApiConfigService);
  private get apiUrl() { return this.apiConfig.authUrl; }
  private readonly AUTH_KEY = 'hicone_auth_token';
  private readonly REFRESH_KEY = 'hicone_refresh_token';
  private readonly USER_KEY = 'hicone_user_data';
  private readonly REMEMBER_KEY = 'hicone_remember_me';

  private http = inject(HttpClient);
  private router = inject(Router);
  private offlineStore = inject(OfflineStoreService);

  // State
  private _isAuthenticated = signal<boolean>(false);
  private _currentUser = signal<UserDto | null>(null);

  // Compatibility Subject
  private currentUserSubject = new BehaviorSubject<UserDto | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Cached sync values
  private rawToken: string | null = null;
  private rawRememberedEmail: string | null = null;

  constructor() {
    this.initSession();
  }

  private async initSession() {
    try {
      const token = await this.offlineStore.get<string>(this.AUTH_KEY);
      const user = await this.offlineStore.get<UserDto>(this.USER_KEY);
      this.rawRememberedEmail = await this.offlineStore.get<string>(this.REMEMBER_KEY);
      
      this.rawToken = token;
      this._isAuthenticated.set(!!token);
      this._currentUser.set(user);
      this.currentUserSubject.next(user);
    } catch (e) {
      console.error('Error inicializando sesión en AuthService:', e);
    }
  }

  get isAuthenticated() {
    return this._isAuthenticated.asReadonly();
  }

  get currentUser() {
    return this._currentUser.asReadonly();
  }

  get currentUserValue(): UserDto | null {
    return this._currentUser();
  }

  login(credentials: { email: string; password: string; rememberMe: boolean }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, {
      email: credentials.email,
      password: credentials.password,
      deviceInfo: 'Dispositivo Móvil Planta PWA'
    }).pipe(
      switchMap(async (response) => {
        if (response.accessToken) {
          await this.setSession(response);
          
          if (credentials.rememberMe) {
            await this.offlineStore.set(this.REMEMBER_KEY, credentials.email);
            this.rawRememberedEmail = credentials.email;
          } else {
            await this.offlineStore.remove(this.REMEMBER_KEY);
            this.rawRememberedEmail = null;
          }
        }
        return response;
      })
    );
  }

  private getRolesAndPermissionsFromToken(token: string): { roles: string[], permissions: string[] } {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return { roles: [], permissions: [] };
      
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      
      // Extraer roles
      let roles: string[] = [];
      const roleClaim = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || payload['role'];
      if (roleClaim) {
        roles = Array.isArray(roleClaim) ? roleClaim : [roleClaim];
      }
      
      // Extraer permisos
      let permissions: string[] = [];
      const permissionClaim = payload['permission'];
      if (permissionClaim) {
        permissions = Array.isArray(permissionClaim) ? permissionClaim : [permissionClaim];
      }
      
      return { roles, permissions };
    } catch (e) {
      console.error('Error decodificando claims del token JWT:', e);
      return { roles: [], permissions: [] };
    }
  }

  private async setSession(response: LoginResponse) {
    response.user.fullName = `${response.user.firstName} ${response.user.lastName}`;
    
    // Decodificar roles y permisos desde las claims del token
    const tokenClaims = this.getRolesAndPermissionsFromToken(response.accessToken);
    response.user.roles = tokenClaims.roles;
    response.user.permissions = tokenClaims.permissions;

    if (!response.user.roles || response.user.roles.length === 0) {
      response.user.roles = ['Operador'];
    }
    if (!response.user.permissions) {
      response.user.permissions = [];
    }

    await this.offlineStore.set(this.AUTH_KEY, response.accessToken);
    await this.offlineStore.set(this.REFRESH_KEY, response.refreshToken);
    await this.offlineStore.set(this.USER_KEY, response.user);
    
    this.rawToken = response.accessToken;
    this._isAuthenticated.set(true);
    this._currentUser.set(response.user);
    this.currentUserSubject.next(response.user);

    // Vincular automáticamente al operario en local
    if (response.user.fullName) {
      await this.offlineStore.set('active_operator', response.user.fullName.toUpperCase());
    }
  }

  refreshToken(): Observable<boolean> {
    return from(this.offlineStore.get<string>(this.REFRESH_KEY)).pipe(
      switchMap((refreshToken) => {
        if (!refreshToken) return of(false);

        return this.http.post<{ accessToken: string }>(`${this.apiUrl}/refresh-token`, { refreshToken }).pipe(
          switchMap(async (res) => {
            await this.offlineStore.set(this.AUTH_KEY, res.accessToken);
            this.rawToken = res.accessToken;
            return true;
          }),
          catchError(() => {
            this.logout();
            return of(false);
          })
        );
      })
    );
  }

  async logout() {
    try {
      const refreshToken = await this.offlineStore.get<string>(this.REFRESH_KEY);
      if (refreshToken) {
        this.http.post(`${this.apiUrl}/logout`, { refreshToken }).subscribe({
          error: (err) => console.warn('Error al reportar logout al backend:', err)
        });
      }
    } catch (e) {
      console.warn('Fallo al recuperar token de refresco para logout:', e);
    }

    await this.offlineStore.remove(this.AUTH_KEY);
    await this.offlineStore.remove(this.REFRESH_KEY);
    await this.offlineStore.remove(this.USER_KEY);
    
    this.rawToken = null;
    this._isAuthenticated.set(false);
    this._currentUser.set(null);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getRememberedEmail(): string | null {
    return this.rawRememberedEmail;
  }

  getAccessToken(): string | null {
    return this.rawToken;
  }

  getToken(): string | null {
    return this.getAccessToken();
  }
}
