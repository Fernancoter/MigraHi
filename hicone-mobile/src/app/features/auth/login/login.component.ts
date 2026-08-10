import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="login-container">
      <!-- PANEL IZQUIERDO: Imagen RingCycles con Texto Welcome Back -->
      <div class="split-left">
        <div class="bg-animation"></div>
        <div class="bg-overlay"></div>
        <div class="welcome-content">
          <h1 class="metallic-text">Welcome back!</h1>
        </div>
      </div>

      <!-- PANEL DERECHO: Formulario sobre fondo verde translúcido -->
      <div class="split-right">
        <div class="login-card-glass animate-fade-in">
          <!-- Avatar de usuario circular -->
          <div class="avatar-container">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
            </svg>
          </div>

          <form [formGroup]="loginForm" (ngSubmit)="onLogin()" class="login-form">
            <!-- Campo Usuario / Email -->
            <div class="form-group">
              <div class="input-line-wrapper" [class.error]="isFieldInvalid('email')">
                <span class="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input 
                  type="text" 
                  id="email" 
                  formControlName="email" 
                  placeholder="User"
                  autocomplete="username">
              </div>
              <div class="error-msg-inline" *ngIf="isFieldInvalid('email')">
                El usuario o correo es obligatorio
              </div>
            </div>

            <!-- Campo Contraseña -->
            <div class="form-group">
              <div class="input-line-wrapper" [class.error]="isFieldInvalid('password')">
                <span class="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input 
                  [type]="showPassword() ? 'text' : 'password'" 
                  id="password" 
                  formControlName="password" 
                  placeholder="Password"
                  autocomplete="current-password">
                <button 
                  type="button" 
                  class="password-toggle-btn" 
                  (click)="togglePasswordVisibility()" 
                  [attr.aria-label]="showPassword() ? 'Ocultar contraseña' : 'Mostrar contraseña'"
                  [title]="showPassword() ? 'Ocultar contraseña' : 'Mostrar contraseña'">
                  <svg *ngIf="!showPassword()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg *ngIf="showPassword()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                </button>
              </div>
              <div class="error-msg-inline" *ngIf="isFieldInvalid('password')">
                La contraseña es obligatoria
              </div>
            </div>

            <!-- Opciones del Formulario (Remember me / Forgot password) -->
            <div class="form-options">
              <label class="remember-label">
                <input type="checkbox" formControlName="rememberMe">
                Remember me
              </label>
              <a href="javascript:void(0)" (click)="forgotPassword()" class="forgot-link">Forgot Password?</a>
            </div>

            <!-- Botón LOGIN -->
            <button type="submit" class="login-btn" [disabled]="isLoading()">
              <span *ngIf="!isLoading()">LOGIN</span>
              <span *ngIf="isLoading()" class="loader"></span>
            </button>
          </form>

          <div class="form-footer">
            <p>New here? <a href="javascript:void(0)" (click)="showRegisterMsg()" class="register-link">Create an Account</a></p>
          </div>

          <!-- Banner de Error -->
          <div class="error-banner animate-slide-up" *ngIf="errorMessage()">
            <span>⚠️</span> {{ errorMessage() }}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      height: 100vh;
      width: 100vw;
      overflow: hidden;
      font-family: var(--font-primary);
      position: relative;
    }

    /* ─────────────────────────────────────────────────────────────────────────
       PANEL IZQUIERDO (50% de la pantalla - RingCycles con movimiento)
       ───────────────────────────────────────────────────────────────────────── */
    .split-left {
      width: 50%;
      height: 100%;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
    }

    .bg-animation {
      position: absolute;
      top: -10%;
      left: -10%;
      width: 120%;
      height: 120%;
      background: url('/login-bg.png') no-repeat center center;
      background-size: cover;
      z-index: 1;
      animation: slowKenBurns 28s infinite ease-in-out;
    }

    .bg-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(2, 6, 23, 0.95) 100%);
      z-index: 2;
    }

    .welcome-content {
      position: relative;
      z-index: 5;
      max-width: 600px;
      text-align: left;
      animation: slideInFromLeft 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .metallic-text {
      font-size: 68px; /* Tamaño mucho más grande */
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: -2px;
      margin: 0;
      
      /* Gradiente de metal pulido y reflexivo */
      background: linear-gradient(
        110deg, 
        #94a3b8 0%, 
        #e2e8f0 20%, 
        #ffffff 40%, 
        #cbd5e1 60%, 
        #94a3b8 80%,
        #ffffff 100%
      );
      background-size: 200% auto;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      
      /* Relieve tridimensional mediante sombras */
      filter: drop-shadow(0 4px 15px rgba(0, 0, 0, 0.7));
      
      /* Animación de reflejo de luz continuo */
      animation: shineMetal 7s linear infinite;
    }

    @keyframes shineMetal {
      0% { background-position: 0% center; }
      100% { background-position: 200% center; }
    }

    /* ─────────────────────────────────────────────────────────────────────────
       PANEL DERECHO (50% de la pantalla - Formulario Verde Translúcido)
       ───────────────────────────────────────────────────────────────────────── */
    .split-right {
      width: 50%;
      height: 100%;
      background: rgba(10, 31, 23, 0.85); /* Tonalidad verde transparente */
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border-left: 1px solid rgba(255, 255, 255, 0.05);
      z-index: 5;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      transition: var(--transition-smooth);
    }

    /* Glassmorphic login card floating */
    .login-card-glass {
      width: 100%;
      max-width: 385px;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 36px;
      padding: 48px 32px 32px 32px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
      position: relative;
    }

    /* Avatar superior circular */
    .avatar-container {
      width: 84px;
      height: 84px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.15);
      margin: 0 auto 36px auto;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.35);
    }

    .avatar-container svg {
      width: 48px;
      height: 48px;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    /* Input estilo línea inferior plana */
    .input-line-wrapper {
      display: flex;
      align-items: center;
      background: transparent;
      border-bottom: 1.5px solid rgba(255, 255, 255, 0.35);
      padding: 6px 0;
      transition: all 0.25s;
    }

    .input-line-wrapper:focus-within {
      border-bottom-color: var(--primary);
    }

    .input-line-wrapper.error {
      border-bottom-color: var(--danger);
    }

    .input-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.7);
      padding-left: 4px;
    }

    .input-icon svg {
      width: 20px;
      height: 20px;
    }

    .input-line-wrapper input {
      width: 100%;
      background: transparent;
      border: none;
      padding: 10px 12px;
      font-size: 16px;
      color: #ffffff;
      font-weight: 400;
    }

    .input-line-wrapper input:focus {
      outline: none;
    }

    .input-line-wrapper input::placeholder {
      color: rgba(255, 255, 255, 0.55);
    }

    /* ── Corregir fondo blanco del autofill del navegador ───────────────────── */
    .input-line-wrapper input:-webkit-autofill,
    .input-line-wrapper input:-webkit-autofill:hover,
    .input-line-wrapper input:-webkit-autofill:focus,
    .input-line-wrapper input:-webkit-autofill:active {
      /* Truco: un box-shadow inset enorme cubre el fondo blanco del autofill */
      -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
      box-shadow: 0 0 0 1000px transparent inset !important;
      /* Forzar color de texto blanco aunque el navegador aplique su tema */
      -webkit-text-fill-color: #ffffff !important;
      /* Transición muy lenta para que el browser no pueda "flashear" el blanco */
      transition: background-color 99999s ease-in-out 0s;
      caret-color: #ffffff;
    }

    .error-msg-inline {
      color: #f87171;
      font-size: 11px;
      font-weight: 500;
      margin-left: 4px;
      margin-top: 2px;
    }

    /* Opciones: Remember Me y Forgot Password */
    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      margin-top: 4px;
    }

    .remember-label {
      color: rgba(255, 255, 255, 0.85);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      user-select: none;
    }

    .remember-label input {
      cursor: pointer;
      accent-color: #0d9488;
      width: 16px;
      height: 16px;
    }

    .forgot-link {
      color: rgba(255, 255, 255, 0.85);
      text-decoration: none;
      font-weight: 500;
      transition: var(--transition-smooth);
    }

    .forgot-link:hover {
      color: var(--primary);
      text-decoration: underline;
    }

    /* Botón LOGIN con gradiente y bordes circulares */
    .login-btn {
      background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%);
      color: white;
      font-size: 15px;
      font-weight: 600;
      letter-spacing: 1px;
      padding: 15px;
      border: none;
      border-radius: 30px;
      cursor: pointer;
      transition: var(--transition-smooth);
      box-shadow: 0 4px 12px rgba(13, 148, 136, 0.25);
      margin-top: 16px;
    }

    .login-btn:hover:not(:disabled) {
      background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
      box-shadow: 0 6px 16px rgba(13, 148, 136, 0.4);
    }

    .login-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .form-footer {
      margin-top: 28px;
      text-align: center;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.7);
    }

    .register-link {
      color: #14b8a6;
      text-decoration: none;
      font-weight: 600;
      transition: var(--transition-smooth);
    }

    .register-link:hover {
      color: #38bdf8;
      text-decoration: underline;
    }

    /* Banner de Error */
    .error-banner {
      background-color: rgba(239, 68, 68, 0.25);
      border: 1px solid var(--danger);
      color: #fca5a5;
      border-radius: 8px;
      padding: 12px;
      font-size: 13px;
      font-weight: 500;
      margin-top: 20px;
      display: flex;
      align-items: center;
      gap: 8px;
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

    .password-toggle-btn {
      background: transparent;
      border: none;
      color: rgba(255, 255, 255, 0.6);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-right: 8px;
      transition: var(--transition-smooth);
    }

    .password-toggle-btn:hover {
      color: var(--primary);
    }

    .password-toggle-btn svg {
      width: 20px;
      height: 20px;
    }

    /* ─────────────────────────────────────────────────────────────────────────
       RESPONSIVIDAD MÓVIL
       ───────────────────────────────────────────────────────────────────────── */
    @media (max-width: 768px) {
      .login-container::before {
        content: '';
        position: absolute;
        inset: 0;
        background: url('/login-bg.png') no-repeat center center;
        background-size: cover;
        opacity: 0.2;
        z-index: 1;
        animation: slowKenBurns 32s infinite ease-in-out;
      }

      .split-left {
        display: none; /* Ocultar bienvenida en celular */
      }

      .split-right {
        width: 100%;
        background: rgba(10, 31, 23, 0.92); /* Verde más opaco en celular */
        border-left: none;
        z-index: 2;
      }
    }

    /* Animaciones */
    @keyframes rotation {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes slowKenBurns {
      0% { transform: scale(1.02) translate(0, 0); }
      50% { transform: scale(1.1) translate(-1%, -0.5%); }
      100% { transform: scale(1.02) translate(0, 0); }
    }

    @keyframes slideInFromLeft {
      from { opacity: 0; transform: translateX(-30px); }
      to { opacity: 1; transform: translateX(0); }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rememberMe: [true]
  });

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  returnUrl = '/';
  showPassword = signal(false);

  togglePasswordVisibility() {
    this.showPassword.update(v => !v);
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
    // Auto-completar usuario recordado
    const remembered = this.authService.getRememberedEmail();
    if (remembered) {
      this.loginForm.patchValue({
        email: remembered,
        rememberMe: true
      });
    }
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
        this.isLoading.set(false);
        if (response.mustChangePassword) {
          this.errorMessage.set('Su cuenta requiere un cambio de contraseña obligatorio. Por favor, inicie sesión primero en el portal web del ERP (http://localhost:4200) para actualizar su contraseña.');
        } else {
          this.router.navigateByUrl(this.returnUrl);
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        console.error('Error de login:', err);
        const errorMsg = err.error?.errors?.[0] || err.error?.message || 'Error al iniciar sesión. Verifique sus credenciales.';
        this.errorMessage.set(errorMsg);
      }
    });
  }

  showRegisterMsg() {
    alert('Para crear una cuenta de operario, solicítelo al administrador del ERP en el módulo de Seguridad.');
  }

  forgotPassword() {
    alert('Para recuperar su contraseña, comuníquese con el departamento de soporte de sistemas en planta.');
  }
}
