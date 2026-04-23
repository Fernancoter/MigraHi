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
      <!-- Tarjeta de Login -->
      <div class="login-card glass animate-fade-in" *ngIf="!showRegister()">
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
                type="text" 
                id="email" 
                formControlName="email" 
                placeholder="usuario123"
                autocomplete="username">
            </div>
            <div class="error-message" *ngIf="isFieldInvalid('email')">
              <span *ngIf="loginForm.get('email')?.errors?.['required']">Debe ingresar el nombre de usuario</span>
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
          <p>¿Aún no tienes cuenta? <button type="button" class="link-btn" (click)="toggleRegister(true)">Crear una ahora</button></p>
          
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

      <!-- Modal de Registro Flotante -->
      <div class="register-modal glass animate-scale-up" *ngIf="showRegister()">
        <div class="modal-header">
          <h2>Registrarse</h2>
          <p>Crea tu cuenta para acceder al ecosistema Hi-Cone</p>
        </div>

        <form [formGroup]="registerForm" (ngSubmit)="onRegister()" class="register-grid">
          <div class="form-group">
            <label>Nombre de Usuario *</label>
            <input type="text" formControlName="username" placeholder="usuario123">
          </div>
          <div class="form-group">
            <label>Email *</label>
            <input type="email" formControlName="email" placeholder="email@ejemplo.com">
          </div>
          <div class="form-group">
            <label>Contraseña *</label>
            <input type="password" formControlName="password" placeholder="••••••••">
          </div>
          <div class="form-group">
            <label>Confirmación de contraseña *</label>
            <input type="password" formControlName="confirmPassword" placeholder="••••••••">
          </div>
          <div class="form-group">
            <label>Nombre</label>
            <input type="text" formControlName="firstName" placeholder="Tu nombre">
          </div>
          <div class="form-group">
            <label>Apellido</label>
            <input type="text" formControlName="lastName" placeholder="Tu apellido">
          </div>

          <div class="modal-actions">
            <button type="submit" class="login-btn" [disabled]="isLoading()">REGISTRARSE</button>
            <button type="button" class="btn-secondary" (click)="toggleRegister(false)">VOLVER</button>
          </div>
        </form>
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
    }

    .login-header { text-align: center; margin-bottom: 2rem; }
    .company-logo { max-width: 250px; margin-bottom: 1.5rem; }
    h1 { font-size: 1.5rem; color: white; }
    p { color: #94a3b8; font-size: 0.875rem; }

    .login-form { display: flex; flex-direction: column; gap: 1.25rem; }
    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin: 0.5rem 0 1.25rem 0;
      flex-wrap: nowrap;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #94a3b8;
      font-size: 0.8125rem;
      cursor: pointer;
      user-select: none;
      white-space: nowrap;
    }

    .checkbox-label input {
      width: 16px;
      height: 16px;
      margin: 0;
      cursor: pointer;
      accent-color: var(--primary);
    }

    .forgot-link {
      color: var(--primary);
      text-decoration: none;
      font-size: 0.8125rem;
      font-weight: 500;
    }
    .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
    label { font-size: 0.875rem; color: #cbd5e1; }

    .input-wrapper { position: relative; display: flex; align-items: center; }
    .input-icon { position: absolute; left: 1rem; opacity: 0.6; }

    input {
      width: 100%;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.875rem 1rem 0.875rem 2.75rem;
      border-radius: var(--radius-md);
      color: white;
      transition: all 0.2s;
    }

    input:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
    }

    .password-toggle {
      position: absolute; right: 0.75rem;
      background: none; border: none; color: #94a3b8; cursor: pointer;
    }

    .login-btn {
      background: var(--primary);
      color: white;
      border: none;
      padding: 0.9rem;
      border-radius: var(--radius-md);
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .link-btn {
      background: none; border: none; color: white; font-weight: 600; cursor: pointer; padding: 0;
    }
    .link-btn:hover { text-decoration: underline; }

    .register-modal {
      width: 700px;
      padding: 3rem;
      border-radius: var(--radius-lg);
      z-index: 20;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
    }

    .modal-header { text-align: center; margin-bottom: 2.5rem; }
    .modal-header h2 { font-size: 1.8rem; color: white; }
    
    .register-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    .modal-actions {
      grid-column: span 2;
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.05);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.9rem;
      border-radius: var(--radius-md);
      font-weight: 600;
      cursor: pointer;
    }

    .login-bg { position: absolute; inset: 0; z-index: 1; }
    .orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.4; }
    .orb-1 { width: 400px; height: 400px; background: var(--primary); top: -100px; right: -100px; }
    .orb-2 { width: 300px; height: 300px; background: #059669; bottom: -50px; left: -50px; }

    @keyframes scale-up {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    .animate-scale-up { animation: scale-up 0.3s ease-out; }

    .loader {
      width: 20px; height: 20px;
      border: 2px solid white; border-bottom-color: transparent;
      border-radius: 50%; display: inline-block;
      animation: rotation 1s linear infinite;
    }
    @keyframes rotation { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  `]
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rememberMe: [false]
  });

  registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
    firstName: [''],
    lastName: ['']
  });

  isLoading = signal(false);
  showRegister = signal(false);
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

  toggleRegister(show: boolean) {
    this.showRegister.set(show);
    this.errorMessage.set(null);
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

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        if (response.mustChangePassword) {
          this.router.navigate(['/change-password'], { queryParams: { userId: response.user?.id } });
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        const errorMsg = err.error?.errors?.[0] || 'Error al iniciar sesión. Inténtelo de nuevo.';
        this.errorMessage.set(errorMsg);
      }
    });
  }

  onRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      this.toggleRegister(false);
      this.errorMessage.set('Cuenta creada con éxito. Ya puedes iniciar sesión.');
    }, 2000);
  }
}
