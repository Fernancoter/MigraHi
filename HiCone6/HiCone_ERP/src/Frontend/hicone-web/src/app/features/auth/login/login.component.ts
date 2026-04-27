import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-page">
      <div class="login-card glass animate-fade-in">
        <div class="login-header">
          <div class="logo-large">HI-CONE</div>
          <h1>Bienvenido a HiCone<span class="text-primary">ERP</span></h1>
          <p>Ingresa tus credenciales para acceder</p>
        </div>

        <form (ngSubmit)="onLogin()" class="login-form">
          <div class="form-group">
            <label for="email">Correo Electrónico</label>
            <div class="input-wrapper">
              <span class="input-icon">✉️</span>
              <input type="email" id="email" [(ngModel)]="email" name="email" placeholder="admin@hicone.com" required>
            </div>
          </div>

          <div class="form-group">
            <label for="password">Contraseña</label>
            <div class="input-wrapper">
              <span class="input-icon">🔒</span>
              <input type="password" id="password" [(ngModel)]="password" name="password" placeholder="••••••••" required>
            </div>
          </div>

          <div class="error-msg" *ngIf="errorMessage">
            {{ errorMessage }}
          </div>

          <button type="submit" class="login-btn" [disabled]="loading">
            {{ loading ? 'Cargando...' : 'Iniciar Sesión' }}
          </button>
        </form>

        <div class="login-footer">
          <p>¿No tienes cuenta? <a href="#">Contacta al administrador</a></p>
        </div>
      </div>
      
      <div class="login-bg">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      height: 100vh;
      width: 100vw;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      background: #2c3e50;
    }

    .login-card {
      width: 440px;
      padding: 3rem;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 8px;
      z-index: 10;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
    }

    .login-header { text-align: center; margin-bottom: 2.5rem; }

    .logo-large {
      padding: 0.5rem 1rem;
      border: 3px solid var(--primary);
      color: var(--primary);
      font-weight: 900;
      font-size: 2rem;
      margin: 0 auto 1.5rem;
      display: inline-block;
    }

    h1 { font-size: 1.5rem; margin-bottom: 0.5rem; color: #2c3e50; }
    p { color: #7f8c8d; font-size: 0.875rem; }
    .text-primary { color: var(--primary); }

    .login-form { display: flex; flex-direction: column; gap: 1.5rem; }
    .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
    label { font-size: 0.875rem; font-weight: 600; color: #34495e; }

    .input-wrapper { position: relative; display: flex; align-items: center; }
    .input-icon { position: absolute; left: 1rem; }

    input {
      width: 100%;
      background: white;
      border: 1px solid #dcdde1;
      padding: 0.75rem 1rem 0.75rem 2.5rem;
      border-radius: 4px;
      transition: all 0.2s;
    }

    input:focus { outline: none; border-color: var(--primary); }

    .login-btn {
      background: var(--primary);
      color: white;
      border: none;
      padding: 0.875rem;
      border-radius: 4px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
    }

    .login-btn:hover:not(:disabled) { background: var(--primary-hover); }
    .login-btn:disabled { opacity: 0.7; cursor: not-allowed; }

    .error-msg {
      color: #e74c3c;
      font-size: 0.8rem;
      font-weight: 600;
      text-align: center;
    }

    .login-bg { position: absolute; inset: 0; z-index: 1; }
    .orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.2; }
    .orb-1 { width: 600px; height: 600px; background: var(--primary); top: -200px; right: -200px; }
    .orb-2 { width: 500px; height: 500px; background: #3d5a80; bottom: -100px; left: -100px; }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.loading = true;
    this.errorMessage = '';

    this.authService.login({ email: this.email, password: this.password, rememberMe: false }).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = err?.error?.errors?.[0] ?? 'Correo o contraseña incorrectos';
        this.loading = false;
      }
    });
  }
}
