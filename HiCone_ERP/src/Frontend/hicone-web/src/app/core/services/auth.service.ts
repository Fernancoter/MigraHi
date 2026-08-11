import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of, map, BehaviorSubject } from 'rxjs';

import { environment } from '../../../environments/environment';

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
  private readonly apiUrl = `${environment.apiUrl}/api/auth`;
  private readonly AUTH_KEY = 'hicone_auth_token';
  private readonly REFRESH_KEY = 'hicone_refresh_token';
  private readonly USER_KEY = 'hicone_user_data';
  private readonly REMEMBER_KEY = 'hicone_remember_me';

  private http = inject(HttpClient);
  private router = inject(Router);

  // State
  private _isAuthenticated = signal<boolean>(this.checkToken());
  private _currentUser = signal<UserDto | null>(this.getUserFromStorage());

  // Compatibility Subject for layout components
  private currentUserSubject = new BehaviorSubject<UserDto | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  get isAuthenticated() {
    return this._isAuthenticated.asReadonly();
  }

  get currentUser() {
    return this._currentUser.asReadonly();
  }

  get currentUserValue(): UserDto | null {
    return this._currentUser();
  }

  private checkToken(): boolean {
    return !!localStorage.getItem(this.AUTH_KEY);
  }

  private getUserFromStorage(): UserDto | null {
    const data = localStorage.getItem(this.USER_KEY);
    return data ? JSON.parse(data) : null;
  }

  login(credentials: { email: string; password: string; rememberMe: boolean }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, {
      email: credentials.email,
      password: credentials.password,
      deviceInfo: navigator.userAgent
    }).pipe(
      tap(response => {
        if (response.accessToken) {
          this.setSession(response);
          
          if (credentials.rememberMe) {
            localStorage.setItem(this.REMEMBER_KEY, credentials.email);
          } else {
            localStorage.removeItem(this.REMEMBER_KEY);
          }
        }
      })
    );
  }

  changePassword(userId: string, currentPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password`, {
      userId,
      currentPassword,
      newPassword
    });
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  private setSession(response: LoginResponse) {
    // Calcular campos de compatibilidad para el header y sidebar
    response.user.fullName = response.user.fullName || `${response.user.firstName || ''} ${response.user.lastName || ''}`.trim();
    
    // Superusuario admin y roles calculados por el backend
    if (!response.user.roles || response.user.roles.length === 0) {
      if (response.user.email?.toLowerCase().includes('admin') || response.user.firstName?.toLowerCase().includes('admin')) {
        response.user.roles = ['Administrador'];
      } else {
        response.user.roles = ['Usuario'];
      }
    } else if (response.user.email?.toLowerCase().includes('admin') && !response.user.roles.includes('Administrador')) {
      response.user.roles.push('Administrador');
    }

    if (!response.user.permissions) {
      response.user.permissions = [];
    }

    localStorage.setItem(this.AUTH_KEY, response.accessToken);
    localStorage.setItem(this.REFRESH_KEY, response.refreshToken);
    localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
    
    this._isAuthenticated.set(true);
    this._currentUser.set(response.user);
    this.currentUserSubject.next(response.user);
  }

  refreshToken(): Observable<boolean> {
    const refreshToken = localStorage.getItem(this.REFRESH_KEY);
    if (!refreshToken) return of(false);

    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/refresh-token`, { refreshToken })
      .pipe(
        map(res => {
          localStorage.setItem(this.AUTH_KEY, res.accessToken);
          return true;
        }),
        catchError(() => {
          this.logout();
          return of(false);
        })
      );
  }

  logout() {
    const refreshToken = localStorage.getItem(this.REFRESH_KEY);
    if (refreshToken) {
      this.http.post(`${this.apiUrl}/logout`, { refreshToken }).subscribe();
    }

    localStorage.removeItem(this.AUTH_KEY);
    localStorage.removeItem(this.REFRESH_KEY);
    localStorage.removeItem(this.USER_KEY);
    
    this._isAuthenticated.set(false);
    this._currentUser.set(null);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  hasPermission(permissionCode: string): boolean {
    return this._currentUser()?.permissions?.includes(permissionCode) || false;
  }

  getRememberedEmail(): string | null {
    return localStorage.getItem(this.REMEMBER_KEY);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.AUTH_KEY);
  }

  /** Alias utilizado por los módulos de seguridad */
  getToken(): string | null {
    return this.getAccessToken();
  }
}

