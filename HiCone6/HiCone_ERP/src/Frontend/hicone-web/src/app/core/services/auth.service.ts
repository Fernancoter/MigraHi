import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of, map } from 'rxjs';

export interface UserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  companyId: string;
  operadorId: number | null;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
  mustChangePassword?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:5007/api/auth';
  private readonly AUTH_KEY = 'hicone_auth_token';
  private readonly REFRESH_KEY = 'hicone_refresh_token';
  private readonly USER_KEY = 'hicone_user_data';
  private readonly REMEMBER_KEY = 'hicone_remember_me';

  private http = inject(HttpClient);
  private router = inject(Router);

  // State
  private _isAuthenticated = signal<boolean>(this.checkToken());
  private _currentUser = signal<UserDto | null>(this.getUserFromStorage());

  get isAuthenticated() {
    return this._isAuthenticated.asReadonly();
  }

  get currentUser() {
    return this._currentUser.asReadonly();
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

  private setSession(response: LoginResponse) {
    localStorage.setItem(this.AUTH_KEY, response.accessToken);
    localStorage.setItem(this.REFRESH_KEY, response.refreshToken);
    localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
    
    this._isAuthenticated.set(true);
    this._currentUser.set(response.user);
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
    this.router.navigate(['/login']);
  }

  getRememberedEmail(): string | null {
    return localStorage.getItem(this.REMEMBER_KEY);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.AUTH_KEY);
  }
}
