import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="login-page">
      <div class="login-card glass animate-fade-in">
        <div class="login-header">
          <img src="/assets/images/logo-hicone.png" alt="Hi-Cone Logo" class="company-logo">
          <h1>Recuperar contraseña</h1>
          <p>Ingresa tu correo electrónico para recibir las instrucciones de recuperación.</p>
        </div>

        <form [formGroup]="forgotForm" (ngSubmit)="onSubmit()" class="login-form">
          <div class="form-group">
            <label for="email">Correo Electrónico</label>
            <div class="input-wrapper" [class.error]="isFieldInvalid('email')">
              <span class="input-icon">✉️</span>
              <input 
                type="email" 
                id="email" 
                formControlName="email" 
                placeholder="usuario@hicone.com"
                autocomplete="email">
            </div>
            <div class="error-message" *ngIf="isFieldInvalid('email')">
              <span *ngIf="forgotForm.get('email')?.errors?.['required']">Debe ingresar su correo electrónico</span>
              <span *ngIf="forgotForm.get('email')?.errors?.['email']">Ingrese un correo electrónico válido</span>
            </div>
          </div>

          <button type="submit" class="btn-submit" [disabled]="isLoading()">
            <span *ngIf="!isLoading()">Enviar Instrucciones</span>
            <span *ngIf="isLoading()" class="loader"></span>
          </button>
        </form>

        <div class="success-message" *ngIf="isSubmitted()">
          Contraseña temporal enviada. Revisa tu bandeja de entrada.
        </div>

        <div class="login-footer">
          <a routerLink="/login" class="back-link">Volver al inicio de sesión</a>
        </div>
      </div>
      
      <div class="login-bg">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
      </div>
    </div>
  `,
  styles: [`
    /* Reutilizando los estilos core del login para consistencia visual */
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
    .company-logo { max-width: 200px; margin-bottom: 1.5rem; }
    h1 { font-size: 1.5rem; color: white; margin-bottom: 0.5rem; }
    p { color: #94a3b8; font-size: 0.875rem; line-height: 1.5; }

    .login-form { display: flex; flex-direction: column; gap: 1.5rem; }
    .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
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

    .login-btn {
      background: var(--primary);
      color: white;
      border: none;
      padding: 1rem;
      border-radius: var(--radius-md);
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .login-btn:hover:not(:disabled) { background: var(--primary-hover); transform: translateY(-1px); }
    .login-btn:disabled { opacity: 0.7; cursor: not-allowed; }

    .back-link { 
      display: block; 
      text-align: center; 
      color: var(--primary); 
      text-decoration: none; 
      font-weight: 500;
      margin-top: 1rem;
    }
    
    .back-link:hover { text-decoration: underline; }

    .success-message {
      margin-top: 1.5rem;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.2);
      padding: 0.75rem;
      border-radius: var(--radius-md);
      color: #6ee7b7;
      text-align: center;
      font-size: 0.875rem;
    }

    .login-bg { position: absolute; inset: 0; z-index: 1; }
    .orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.4; }
    .orb-1 { width: 400px; height: 400px; background: var(--primary); top: -100px; right: -100px; }
    .orb-2 { width: 300px; height: 300px; background: #059669; bottom: -50px; left: -50px; }

    .loader {
      width: 20px; height: 20px;
      border: 2px solid white; border-bottom-color: transparent;
      border-radius: 50%; display: inline-block;
      animation: rotation 1s linear infinite;
    }

    @keyframes rotation { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  `]
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  
  forgotForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  isLoading = signal(false);
  isSubmitted = signal(false);

  onSubmit() {
    if (this.forgotForm.invalid) return;
    
    this.isLoading.set(true);
    this.authService.forgotPassword(this.forgotForm.value.email).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.isSubmitted.set(true);
      },
      error: (err) => {
        this.isLoading.set(false);
        alert(err.error?.error || err.error?.Error || 'Ocurrió un error al enviar el correo.');
      }
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.forgotForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
