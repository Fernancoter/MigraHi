import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="login-page">
      <div class="login-card glass animate-fade-in">
        <div class="login-header">
          <img src="/assets/images/logo-hicone.png" alt="Hi-Cone Logo" class="company-logo" onerror="this.src='https://hicone.com/wp-content/uploads/2021/04/Hi-Cone-Logo-no-tagline.png';">
          <h1>Establecer Nueva Contraseña</h1>
          <p>Es obligatorio cambiar tu contraseña temporal antes de poder acceder por primera vez.</p>
        </div>

        <form [formGroup]="changeForm" (ngSubmit)="onSubmit()" class="login-form">
          <div class="form-group">
            <label for="currentPassword">Contraseña Temporal / Actual</label>
            <div class="input-wrapper" [class.error]="isFieldInvalid('currentPassword')">
              <span class="input-icon">🔑</span>
              <input 
                type="password" 
                id="currentPassword" 
                formControlName="currentPassword" 
                placeholder="Contraseña actual"
                autocomplete="current-password">
            </div>
            <div class="error-message" *ngIf="isFieldInvalid('currentPassword')">
              <span *ngIf="changeForm.get('currentPassword')?.errors?.['required']">Debe ingresar su contraseña actual</span>
            </div>
          </div>

          <div class="form-group">
            <label for="newPassword">Nueva Contraseña</label>
            <div class="input-wrapper" [class.error]="isFieldInvalid('newPassword')">
              <span class="input-icon">🔒</span>
              <input 
                type="password" 
                id="newPassword" 
                formControlName="newPassword" 
                placeholder="Mínimo 6 caracteres"
                autocomplete="new-password">
            </div>
            <div class="error-message" *ngIf="isFieldInvalid('newPassword')">
              <span *ngIf="changeForm.get('newPassword')?.errors?.['required']">La nueva contraseña es obligatoria</span>
              <span *ngIf="changeForm.get('newPassword')?.errors?.['minlength']">Debe tener al menos 6 caracteres</span>
            </div>
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirmar Nueva Contraseña</label>
            <div class="input-wrapper" [class.error]="isFieldInvalid('confirmPassword')">
              <span class="input-icon">🔒</span>
              <input 
                type="password" 
                id="confirmPassword" 
                formControlName="confirmPassword" 
                placeholder="Confirma la contraseña"
                autocomplete="new-password">
            </div>
            <div class="error-message" *ngIf="isFieldInvalid('confirmPassword')">
              <span *ngIf="changeForm.get('confirmPassword')?.errors?.['required']">Debe confirmar la contraseña</span>
              <span *ngIf="changeForm.get('confirmPassword')?.errors?.['passwordMismatch']">Las contraseñas no coinciden</span>
            </div>
          </div>

          <button type="submit" class="login-btn" [disabled]="isLoading()">
            <span *ngIf="!isLoading()">CAMBIAR CONTRASEÑA</span>
            <span *ngIf="isLoading()" class="loader"></span>
          </button>

          <div class="login-footer">
            <a routerLink="/login" class="back-link">Cancelar y volver al login</a>
          </div>
        </form>

        <div class="success-message animate-fade-in" *ngIf="successMessage()">
          {{ successMessage() }}
        </div>

        <div class="error-banner animate-fade-in" *ngIf="errorMessage()">
          ⚠️ {{ errorMessage() }}
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
      background: rgba(15, 23, 42, 0.7);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.15);
    }

    .login-header { text-align: center; margin-bottom: 1.5rem; }
    .company-logo { max-width: 200px; margin-bottom: 1.25rem; }
    h1 { font-size: 1.5rem; color: #ffffff; letter-spacing: -0.5px; margin-bottom: 0.5rem; }
    p { color: #cbd5e1; font-size: 0.875rem; line-height: 1.4; }

    .login-form { display: flex; flex-direction: column; gap: 1.2rem; }
    .form-group { display: flex; flex-direction: column; gap: 0.45rem; }
    label { font-size: 0.875rem; color: #f1f5f9; font-weight: 600; }

    .input-wrapper { position: relative; display: flex; align-items: center; }
    .input-icon { position: absolute; left: 1rem; opacity: 0.8; font-size: 1.1rem; }
    
    input {
      width: 100%;
      background: rgba(15, 23, 42, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 0.875rem 1rem 0.875rem 2.75rem;
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

    .error-message {
      color: #f87171;
      font-size: 0.8rem;
      font-weight: 600;
      margin-top: 0.15rem;
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
      margin-top: 0.5rem;
    }

    .login-btn:hover:not(:disabled) { background: #059669; transform: translateY(-1px); }
    .login-btn:disabled { opacity: 0.7; cursor: not-allowed; }

    .back-link { 
      display: block; 
      text-align: center; 
      color: var(--primary); 
      text-decoration: none; 
      font-weight: 600;
      font-size: 0.875rem;
    }
    
    .back-link:hover { text-decoration: underline; }

    .success-message {
      margin-top: 1.25rem;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.25);
      padding: 0.75rem;
      border-radius: var(--radius-md);
      color: #6ee7b7;
      text-align: center;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .error-banner {
      margin-top: 1.25rem;
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.25);
      padding: 0.75rem;
      border-radius: var(--radius-md);
      color: #fca5a5;
      text-align: center;
      font-size: 0.875rem;
      font-weight: 600;
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
export class ChangePasswordComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  userId: string | null = null;
  isLoading = signal(false);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  changeForm: FormGroup = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  });

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'] || null;
      if (!this.userId) {
        this.errorMessage.set('Identificador de usuario inválido. Regrese e intente de nuevo.');
        this.changeForm.disable();
      }
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.changeForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    this.errorMessage.set(null);
    this.successMessage.set(null);

    // Valida coincidencia de contraseñas
    const newPassword = this.changeForm.get('newPassword')?.value;
    const confirmPassword = this.changeForm.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
      this.changeForm.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    }

    if (this.changeForm.invalid || !this.userId) {
      this.changeForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    const { currentPassword } = this.changeForm.value;

    this.authService.changePassword(this.userId, currentPassword, newPassword).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.successMessage.set('Contraseña actualizada correctamente. Redirigiendo al login...');
        this.changeForm.reset();
        this.changeForm.disable();
        
        // Redirigir al login después de 2.5 segundos
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2500);
      },
      error: (err) => {
        this.isLoading.set(false);
        const errorMsg = err.error?.errors?.[0] || err.error?.message || 'Error al cambiar la contraseña. Verifique sus credenciales.';
        this.errorMessage.set(errorMsg);
      }
    });
  }
}
