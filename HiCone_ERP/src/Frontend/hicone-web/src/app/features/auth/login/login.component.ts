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
      <div class="login-card glass animate-fade-in">
        <div class="login-header">
          <img src="assets/images/logo-hicone.png" alt="Hi-Cone Logo" class="company-logo" onerror="this.src='https://hicone.com/wp-content/uploads/2021/04/Hi-Cone-Logo-no-tagline.png';">
          <p>Ingresa tus credenciales para acceder</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onLogin()" class="login-form">
          <div class="form-group">
            <label for="email">Nombre de Usuario o Email</label>
            <div class="input-wrapper" [class.error]="isFieldInvalid('email')">
              <span class="input-icon">✉️</span>            <input 
                type="text" 
                id="email" 
                formControlName="email" 
                placeholder="usuario123"
                autocomplete="username"
                (focus)="clearErrorMessage()">
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
                autocomplete="current-password"
                (focus)="clearErrorMessage()">
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
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
      background: rgba(15, 23, 42, 0.7); /* Deep dark glass background */
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.15);
    }

    .login-header { text-align: center; margin-bottom: 2rem; }
    .company-logo { max-width: 250px; margin-bottom: 1.5rem; }
    h1 { font-size: 1.6rem; color: #ffffff; letter-spacing: -0.5px; }
    p { color: #cbd5e1; font-size: 0.95rem; }
    .modal-subtitle { color: #cbd5e1; font-size: 0.95rem; margin-top: 0.25rem; }

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
      color: #cbd5e1;
      font-size: 0.875rem;
      cursor: pointer;
      user-select: none;
      white-space: nowrap;
    }

    .checkbox-label input {
      width: 18px;
      height: 18px;
      margin: 0;
      cursor: pointer;
      accent-color: var(--primary);
    }

    .forgot-link {
      color: var(--primary);
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 600;
    }
    .form-group { display: flex; flex-direction: column; gap: 0.45rem; }
    label { font-size: 0.95rem; color: #f1f5f9; font-weight: 600; margin-bottom: 0.1rem; }

    .input-wrapper { position: relative; display: flex; align-items: center; }
    .input-icon { position: absolute; left: 1rem; opacity: 0.8; font-size: 1.1rem; }

    input {
      width: 100%;
      background: rgba(15, 23, 42, 0.65); /* Rich dark background inside input */
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 0.9rem 1rem 0.9rem 2.75rem;
      border-radius: var(--radius-md);
      color: #ffffff;
      font-size: 1.05rem;
      transition: all 0.2s;
    }

    input:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.25);
      background: rgba(15, 23, 42, 0.8);
    }

    input.input-error {
      border-color: #f87171 !important;
      box-shadow: 0 0 0 4px rgba(248, 113, 113, 0.2) !important;
    }

    .error-message {
      color: #f87171;
      font-size: 0.825rem;
      font-weight: 600;
      margin-top: 0.25rem;
      text-align: left;
    }

    .password-toggle {
      position: absolute; right: 0.75rem;
      background: none; border: none; color: #94a3b8; cursor: pointer;
    }

    .login-btn {
      background: var(--primary);
      color: #ffffff;
      border: none;
      padding: 0.95rem;
      border-radius: var(--radius-md);
      font-weight: 700;
      font-size: 1.05rem;
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
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.65);
      background: rgba(15, 23, 42, 0.7); /* Deep dark glass background */
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.15);
    }

    .modal-header { text-align: center; margin-bottom: 2.5rem; }
    .modal-header h2 { font-size: 1.8rem; color: #ffffff; }
    .modal-header p { color: #cbd5e1; }
    
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
      background: rgba(255, 255, 255, 0.08);
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 0.9rem;
      border-radius: var(--radius-md);
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.3);
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

    .gam-error {
      color: #e74c3c;
      font-size: 0.875rem;
      font-weight: 600;
      text-align: center;
      margin-top: 1rem;
    }

    .apk-download {
      margin-top: 1rem;
      text-align: center;
    }

    .apk-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: #cbd5e1;
      text-decoration: none;
      font-size: 0.875rem;
      transition: all 0.2s;
    }

    .apk-link:hover {
      color: white;
    }
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

    // Clear error message when the form value changes (typing/editing)
    this.loginForm.valueChanges.subscribe(() => {
      this.clearErrorMessage();
    });
  }

  togglePasswordVisibility() {
    this.showPassword.update(v => !v);
  }

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  clearErrorMessage() {
    if (this.errorMessage()) {
      this.errorMessage.set(null);
    }
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
          this.isLoading.set(false);
          this.router.navigate(['/change-password'], { queryParams: { userId: response.userId } });
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        const errorMsg = err.error?.errors?.[0] || err.error?.message || 'Error al iniciar sesión. Inténtelo de nuevo.';
        this.errorMessage.set(errorMsg);
      }
    });
  }
}
