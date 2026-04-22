import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="login-page">
      <div class="login-card glass animate-fade-in">
        <div class="login-header">
          <img src="/assets/images/logo-hicone.png" alt="Hi-Cone Logo" class="company-logo">
          <p>Ingresa tus credenciales para acceder</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onLogin()" class="login-form">
          <div class="form-group">
            <label for="email">Nombre de Usuario o Email</label>
            <div class="input-wrapper" [class.error]="isFieldInvalid('email')">
              <span class="input-icon">✉️</span>
              <input 
                type="email" 
                id="email" 
                formControlName="email" 
                placeholder="usuario@hicone.com"
                autocomplete="username">
            </div>
            <div class="error-message" *ngIf="isFieldInvalid('email')">
              <span *ngIf="loginForm.get('email')?.errors?.['required']">Debe ingresar el nombre de usuario</span>
              <span *ngIf="loginForm.get('email')?.errors?.['email']">Formato de correo inválido</span>
            </div>
          </div>

          <div class="form-group">
            <label for="password">Contraseña</label>
            <div class="input-wrapper" [class.error]="isFieldInvalid('password')">
              <span class="input-icon">🔒</span>
              <input 
                [type]="showPassword() ? 'text' : 'password'" 
                id="password" 
                formControlName="password" 
                placeholder="••••••••"
                autocomplete="current-password">
              <button 
                type="button" 
                class="password-toggle" 
                (click)="togglePasswordVisibility()"
                [attr.aria-label]="showPassword() ? 'Ocultar contraseña' : 'Mostrar contraseña'"
                [title]="showPassword() ? 'Ocultar contraseña' : 'Mostrar contraseña'">
                <svg *ngIf="!showPassword()" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                <svg *ngIf="showPassword()" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
              </button>
            </div>
            <div class="error-message" *ngIf="isFieldInvalid('password')">
              Debe ingresar la contraseña
            </div>
          </div>

          <div class="form-options">
            <label class="checkbox-label">
              <input type="checkbox" formControlName="rememberMe"> Mantenme logueado
            </label>
            <a routerLink="/forgot-password" class="forgot-link">¿Se te olvidó tu contraseña?</a>
          </div>

          <button type="submit" class="login-btn" [disabled]="isLoading()">
            <span *ngIf="!isLoading()">Iniciar Sesión</span>
            <span *ngIf="isLoading()" class="loader"></span>
          </button>
        </form>

        <div class="login-footer">
          <p>¿Aún no tienes cuenta? <a routerLink="/register">Crear una ahora</a></p>
          
          <div class="apk-download">
            <a href="http://erphi-cone.com/erp/HICONE.apk" target="_blank" class="apk-link">
              <span class="apk-icon">📱</span>
              Descargar APK
            </a>
          </div>
        </div>

        <div class="gam-error" *ngIf="errorMessage()">
          {{ errorMessage() }}
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
      background: linear-gradient(rgba(2, 6, 23, 0.4), rgba(2, 6, 23, 0.4)), 
                  url('/assets/images/login-bg.png') no-repeat center center;
      background-size: cover;
    }

    .login-card {
      width: 440px;
      padding: 2.5rem;
      border-radius: var(--radius-lg);
      z-index: 10;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      position: relative;
    }

    .login-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .company-logo {
      max-width: 250px;
      height: auto;
      object-fit: contain;
      margin: 0 auto 1.5rem;
      display: block;
      /* Using the native image design (black background + white letters) */
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    }

    h1 { font-size: 1.5rem; margin-bottom: 0.5rem; color: white; }
    p { color: #94a3b8; font-size: 0.875rem; }
    .text-primary { color: var(--primary); }

    .login-form { display: flex; flex-direction: column; gap: 1.25rem; }

    .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
    label { font-size: 0.875rem; font-weight: 500; color: #cbd5e1; }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      transition: all 0.2s;
    }

    .input-icon {
      position: absolute;
      left: 1rem;
      font-size: 1.1rem;
      filter: grayscale(1);
      opacity: 0.6;
    }

    input {
      width: 100%;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.875rem 3rem 0.875rem 2.75rem;
      border-radius: var(--radius-md);
      color: white;
      font-size: 0.95rem;
      transition: all 0.2s;
    }

    .password-toggle {
      position: absolute;
      right: 0.75rem;
      background: none;
      border: none;
      color: #94a3b8;
      cursor: pointer;
      font-size: 1.2rem;
      padding: 0.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s;
      z-index: 5;
    }

    .password-toggle:hover {
      color: var(--primary);
    }

    input:focus {
      outline: none;
      border-color: var(--primary);
      background: rgba(255, 255, 255, 0.08);
      box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
    }

    .input-wrapper.error input {
      border-color: var(--danger);
      background: rgba(239, 68, 68, 0.05);
    }

    .error-message {
      color: var(--danger);
      font-size: 0.75rem;
      font-weight: 500;
      padding-left: 0.25rem;
    }

    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.8125rem;
      margin-top: 0.25rem;
    }

    .checkbox-label { color: #94a3b8; display: flex; align-items: center; gap: 0.6rem; cursor: pointer; }
    .checkbox-label input { width: 16px; height: 16px; margin: 0; cursor: pointer; }
    .forgot-link { color: var(--primary); text-decoration: none; font-weight: 500; transition: color 0.2s; }
    .forgot-link:hover { color: var(--primary-hover); text-decoration: underline; }

    .login-btn {
      background: var(--primary);
      color: white;
      border: none;
      padding: 0.9rem;
      border-radius: var(--radius-md);
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s;
      margin-top: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .login-btn:hover:not(:disabled) {
      background: var(--primary-hover);
      transform: translateY(-1px);
      box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3);
    }

    .login-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .login-footer { 
      margin-top: 2rem; 
      text-align: center; 
      font-size: 0.875rem; 
      color: #64748b;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .login-footer a { color: #cbd5e1; text-decoration: none; font-weight: 600; }
    .login-footer a:hover { text-decoration: underline; }

    .apk-download {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 1rem;
    }

    .apk-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(255, 255, 255, 0.03);
      padding: 0.6rem 1.25rem;
      border-radius: 50px;
      border: 1px solid rgba(255, 255, 255, 0.05);
      color: #94a3b8 !important;
      font-size: 0.8125rem;
      transition: all 0.2s;
    }

    .apk-link:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.1);
      transform: translateY(-1px);
    }

    .apk-icon { font-size: 1rem; }

    .gam-error {
      margin-top: 1.5rem;
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.2);
      padding: 0.75rem;
      border-radius: var(--radius-md);
      color: #fca5a5;
      font-size: 0.8125rem;
      text-align: center;
      animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }

    @keyframes shake {
      10%, 90% { transform: translate3d(-1px, 0, 0); }
      20%, 80% { transform: translate3d(2px, 0, 0); }
      30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
      40%, 60% { transform: translate3d(4px, 0, 0); }
    }

    .loader {
      width: 20px;
      height: 20px;
      border: 2px solid white;
      border-bottom-color: transparent;
      border-radius: 50%;
      display: inline-block;
      animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .login-bg { position: absolute; inset: 0; z-index: 1; }
    .orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.4; }
    .orb-1 { width: 400px; height: 400px; background: var(--primary); top: -100px; right: -100px; }
    .orb-2 { width: 300px; height: 300px; background: #059669; bottom: -50px; left: -50px; }
  `]
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rememberMe: [false]
  });

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  showPassword = signal(false);

  ngOnInit() {
    const rememberedEmail = this.authService.getRememberedEmail();
    if (rememberedEmail) {
      this.loginForm.patchValue({
        email: rememberedEmail,
        rememberMe: true
      });
    }
  }

  togglePasswordVisibility() {
    this.showPassword.update(v => !v);
  }

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    // Simulated delay for better UX
    setTimeout(() => {
      const success = this.authService.login(this.loginForm.value);
      
      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage.set('Usuario o contraseña incorrectos (GAM79)');
        this.isLoading.set(false);
      }
    }, 1200);
  }
}
