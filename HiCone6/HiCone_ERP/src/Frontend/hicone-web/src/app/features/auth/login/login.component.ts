import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-page">
      <div class="login-card glass animate-fade-in">
        <div class="login-header">
          <div class="logo-large">H</div>
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

          <div class="form-options">
            <label class="checkbox-label">
              <input type="checkbox"> Recordarme
            </label>
            <a href="#" class="forgot-link">¿Olvidaste tu contraseña?</a>
          </div>

          <button type="submit" class="login-btn">
            Iniciar Sesión
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
      background: #020617;
    }

    .login-card {
      width: 440px;
      padding: 3rem;
      border-radius: var(--radius-lg);
      z-index: 10;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }

    .login-header {
      text-align: center;
      margin-bottom: 2.5rem;
    }

    .logo-large {
      width: 60px;
      height: 60px;
      background: var(--primary);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 2rem;
      color: white;
      margin: 0 auto 1.5rem;
      box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
    }

    h1 { font-size: 1.5rem; margin-bottom: 0.5rem; color: white; }
    p { color: #94a3b8; font-size: 0.875rem; }
    .text-primary { color: var(--primary); }

    .login-form { display: flex; flex-direction: column; gap: 1.5rem; }

    .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
    label { font-size: 0.875rem; font-weight: 500; color: #cbd5e1; }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-icon {
      position: absolute;
      left: 1rem;
      color: #64748b;
    }

    input {
      width: 100%;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.75rem 1rem 0.75rem 2.5rem;
      border-radius: var(--radius-md);
      color: white;
      transition: all 0.2s;
    }

    input:focus {
      outline: none;
      border-color: var(--primary);
      background: rgba(255, 255, 255, 0.08);
      box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
    }

    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.875rem;
    }

    .checkbox-label { color: #94a3b8; display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }
    .forgot-link { color: var(--primary); text-decoration: none; font-weight: 500; }

    .login-btn {
      background: var(--primary);
      color: white;
      border: none;
      padding: 0.875rem;
      border-radius: var(--radius-md);
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      margin-top: 1rem;
    }

    .login-btn:hover {
      background: var(--primary-hover);
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.4);
    }

    .login-footer { margin-top: 2rem; text-align: center; font-size: 0.875rem; color: #64748b; }
    .login-footer a { color: #cbd5e1; text-decoration: none; font-weight: 600; }

    .login-bg { position: absolute; inset: 0; z-index: 1; }
    .orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.4; }
    .orb-1 { width: 400px; height: 400px; background: var(--primary); top: -100px; right: -100px; }
    .orb-2 { width: 300px; height: 300px; background: #4f46e5; bottom: -50px; left: -50px; }
  `]
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router) {}

  onLogin() {
    // Simulación de login demo
    this.router.navigate(['/dashboard']);
  }
}
