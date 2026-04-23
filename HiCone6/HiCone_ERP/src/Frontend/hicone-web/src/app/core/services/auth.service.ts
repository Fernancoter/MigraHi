import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_KEY = 'hicone_auth_token';
  private readonly REMEMBER_KEY = 'hicone_remember_me';

  // State
  private _isAuthenticated = signal<boolean>(this.checkToken());

  constructor(private router: Router) {}

  get isAuthenticated() {
    return this._isAuthenticated.asReadonly();
  }

  private checkToken(): boolean {
    return !!localStorage.getItem(this.AUTH_KEY);
  }

  login(credentials: { email: string; password: string; rememberMe: boolean }) {
    // Simulated login logic
    // In a real scenario, this would call a backend API
    const token = 'simulated-jwt-token';
    
    if (credentials.rememberMe) {
      localStorage.setItem(this.REMEMBER_KEY, credentials.email);
    } else {
      localStorage.removeItem(this.REMEMBER_KEY);
    }

    localStorage.setItem(this.AUTH_KEY, token);
    this._isAuthenticated.set(true);
    
    return true;
  }

  logout() {
    localStorage.removeItem(this.AUTH_KEY);
    this._isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  getRememberedEmail(): string | null {
    return localStorage.getItem(this.REMEMBER_KEY);
  }
}
