import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-fade-in">
      <header class="module-header">
        <h1>⚙️ Ajustes del Sistema</h1>
        <p>Configuración de cuenta, perfil y preferencias</p>
      </header>

      <div class="config-grid">
        <div class="config-card profile-card">
          <div class="avatar-large">AD</div>
          <div class="profile-info">
            <h2>{{ user?.name }}</h2>
            <p>{{ user?.email }}</p>
            <span class="role-tag">{{ user?.role }}</span>
          </div>
          <hr>
          <button (click)="onLogout()" class="btn-logout">
            <span>🚪</span> Cerrar Sesión
          </button>
        </div>

        <div class="config-card settings-list">
          <div class="card-header">
            <h3>⚙️ Configuración del Sistema</h3>
          </div>
          
          <section class="config-section">
            <h4>🔗 Integración SAE</h4>
            <div class="setting-item">
              <div class="info">
                <p class="label">Sincronización Automática</p>
                <p class="desc">Actualizar stock en SAE al finalizar embarques</p>
              </div>
              <input type="checkbox" checked>
            </div>
            <div class="setting-item">
              <div class="info">
                <p class="label">Base de Datos SAE</p>
                <p class="desc">Host: 192.168.1.50 / DB: SAEDB_HICONE</p>
              </div>
              <button class="btn-outline">Probar Conexión</button>
            </div>
          </section>

          <section class="config-section">
            <h4>🏭 Parámetros de Planta</h4>
            <div class="setting-item">
              <div class="info">
                <p class="label">Tiempo de Reposo Estándar</p>
                <p class="desc">Minutos requeridos antes del prensado</p>
              </div>
              <input type="number" value="1440" class="input-small">
            </div>
            <div class="setting-item">
              <div class="info">
                <p class="label">Alerta de Merma Crítica</p>
                <p class="desc">Notificar si la merma supera el 5%</p>
              </div>
              <input type="checkbox" checked>
            </div>
          </section>

          <!-- Sección de Configuración de Reportes PDF -->
          <section class="config-section">
            <h4>📄 Plantilla de Reportes PDF</h4>
            <p class="section-desc" style="font-size: 0.8rem; color: #64748b; margin-top: -1rem; margin-bottom: 1.5rem;">
              Personaliza el logotipo y la información de contacto que aparecen en la cabecera de las exportaciones a PDF.
            </p>
            
            <div class="form-grid-modern">
              <div class="form-group-modern">
                <label class="modern-label">Nombre de la Empresa</label>
                <input type="text" class="modern-input-field" [(ngModel)]="companyName" placeholder="Ej. HiCone Packaging Solutions">
              </div>
              <div class="form-group-modern">
                <label class="modern-label">Teléfono de Contacto</label>
                <input type="text" class="modern-input-field" [(ngModel)]="companyPhone" placeholder="Ej. +52 81 1234 5678">
              </div>
              <div class="form-group-modern">
                <label class="modern-label">Correo Electrónico</label>
                <input type="email" class="modern-input-field" [(ngModel)]="companyEmail" placeholder="Ej. contacto@hicone.com">
              </div>
              <div class="form-group-modern">
                <label class="modern-label">Dirección Fiscal / Física</label>
                <input type="text" class="modern-input-field" [(ngModel)]="companyAddress" placeholder="Ej. Av. Industrias #456, Monterrey">
              </div>
              <div class="form-group-modern full-width" style="margin-top: 0.5rem;">
                <label class="modern-label">Logotipo de la Empresa (PNG / JPG)</label>
                <div class="logo-uploader-container">
                  <img *ngIf="companyLogo" [src]="companyLogo" class="preview-logo-img" alt="Logo Vista Previa">
                  <div *ngIf="!companyLogo" class="logo-placeholder-box">⚠️ Logotipo por Defecto (Sistema)</div>
                  
                  <label class="logo-upload-btn">
                    📁 Cargar Logotipo
                    <input type="file" style="display: none;" accept="image/*" (change)="onLogoFileSelected($event)">
                  </label>
                  <button type="button" class="btn-danger-outline" *ngIf="companyLogo" (click)="clearCompanyLogo()">
                    🗑️ Quitar
                  </button>
                </div>
              </div>
            </div>

            <div class="btn-save-container">
              <button type="button" class="btn-legacy-save" (click)="saveReportSettings()">
                💾 Guardar Cambios de PDF
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .module-page { padding: 2rem; max-width: 950px; margin: 0 auto; }
    .module-header { margin-bottom: 3rem; text-align: center; }
    h1 { font-size: 2rem; color: #2c3e50; }
    
    .config-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 2rem; }
    .config-card { background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 12px -2px rgba(0,0,0,0.05); border: 1px solid var(--border-color); overflow: hidden; }
    .settings-list { padding: 0; }
    .card-header { padding: 1.5rem 2rem; border-bottom: 1px solid var(--border-color); background: #f8fafc; }
    .card-header h3 { font-size: 1rem; font-weight: 700; color: var(--text-main); margin: 0; }
 
    .config-section { padding: 2rem; border-bottom: 1px solid #f1f5f9; }
    .config-section:last-child { border-bottom: none; }
    .config-section h4 { font-size: 0.85rem; font-weight: 700; color: var(--primary); text-transform: uppercase; margin-bottom: 1.5rem; letter-spacing: 0.5px; }
    
    .setting-item { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; }
    .setting-item .label { font-weight: 600; color: #334155; margin: 0; font-size: 0.9rem; }
    .setting-item .desc { font-size: 0.8rem; color: #64748b; margin: 0; }
    
    .btn-outline { padding: 0.5rem 1rem; border: 1px solid var(--primary); color: var(--primary); background: transparent; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-size: 0.8rem; }
    .btn-outline:hover { background: var(--primary); color: white; }
    
    .input-small { width: 80px; padding: 0.4rem; border: 1px solid #cbd5e1; border-radius: 4px; text-align: center; font-weight: 700; color: var(--text-main); }
    
    .avatar-large { width: 80px; height: 80px; background: linear-gradient(135deg, var(--primary) 0%, #064e3b 100%); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 700; margin: 0 auto 1.5rem; box-shadow: 0 4px 6px -1px var(--primary-light); }
    
    .btn-logout { width: 100%; padding: 0.75rem; background: #fff1f2; color: #be123c; border: 1px solid #fecdd3; border-radius: 8px; font-weight: 700; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-top: 1rem; }
    .btn-logout:hover { background: #be123c; color: white; transform: translateY(-2px); }

    /* Formulario PDF Moderno */
    .form-grid-modern { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-top: 1rem; }
    .form-group-modern { display: flex; flex-direction: column; gap: 0.4rem; }
    .form-group-modern.full-width { grid-column: span 2; }
    .modern-label { font-size: 0.75rem; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.3px; }
    .modern-input-field { border: 1px solid #cbd5e1; border-radius: 8px; padding: 0.6rem 0.8rem; font-size: 0.9rem; background: #f8fafc; transition: all 0.2s; outline: none; width: 100%; box-sizing: border-box; }
    .modern-input-field:focus { border-color: var(--primary); background: white; box-shadow: 0 0 0 3px rgba(22, 101, 52, 0.1); }
    
    .logo-uploader-container { display: flex; align-items: center; gap: 1.25rem; margin-top: 0.4rem; flex-wrap: wrap; }
    .preview-logo-img { max-width: 160px; max-height: 55px; object-fit: contain; border: 1px dashed var(--primary); padding: 4px; border-radius: 8px; background: #f0fdf4; }
    .logo-placeholder-box { font-size: 0.8rem; color: #64748b; font-style: italic; border: 1px dashed #cbd5e1; padding: 0.6rem 1.2rem; border-radius: 8px; background: #f8fafc; }
    
    .logo-upload-btn { padding: 0.55rem 1.1rem; cursor: pointer; border-radius: 8px; border: 1px solid #cbd5e1; background: white; font-weight: 600; font-size: 0.825rem; color: #334155; transition: all 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
    .logo-upload-btn:hover { background: #f1f5f9; border-color: #94a3b8; }
    
    .btn-danger-outline { padding: 0.55rem 1.1rem; border: 1px solid #fecdd3; color: #e11d48; background: #fff5f5; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-size: 0.825rem; }
    .btn-danger-outline:hover { background: #ffe4e6; border-color: #fda4af; }
    
    .btn-save-container { display: flex; justify-content: flex-end; margin-top: 1.75rem; border-top: 1px solid #f1f5f9; padding-top: 1.25rem; }
    .btn-legacy-save { padding: 0.65rem 1.35rem; background: var(--primary); color: white; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; transition: all 0.2s; font-size: 0.875rem; box-shadow: 0 2px 4px rgba(22, 101, 52, 0.25); }
    .btn-legacy-save:hover { background: #14532d; transform: translateY(-1px); box-shadow: 0 4px 6px rgba(22, 101, 52, 0.3); }
  `]
})
export class ConfiguracionComponent implements OnInit {
  user: any;

  // Parámetros de Reporte PDF
  companyName = 'DVelop Software Solutions';
  companyPhone = '+33 1 23 45 67 89';
  companyEmail = 'info@dvelop.com';
  companyAddress = '15 Rue de la Paix, Paris, France';
  companyLogo: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    const rawUser = this.authService.currentUserValue;
    if (rawUser) {
      this.user = {
        name: rawUser.fullName || `${rawUser.firstName} ${rawUser.lastName}`,
        email: rawUser.email,
        role: rawUser.roles?.[0] || 'Administrador'
      };
    }
  }

  ngOnInit() {
    this.companyName = localStorage.getItem('hicone_pdf_company_name') || 'DVelop Software Solutions';
    this.companyPhone = localStorage.getItem('hicone_pdf_company_phone') || '+33 1 23 45 67 89';
    this.companyEmail = localStorage.getItem('hicone_pdf_company_email') || 'info@dvelop.com';
    this.companyAddress = localStorage.getItem('hicone_pdf_company_address') || '15 Rue de la Paix, Paris, France';
    this.companyLogo = localStorage.getItem('hicone_pdf_company_logo') || null;
  }

  onLogoFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.companyLogo = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  clearCompanyLogo() {
    this.companyLogo = null;
  }

  saveReportSettings() {
    localStorage.setItem('hicone_pdf_company_name', this.companyName);
    localStorage.setItem('hicone_pdf_company_phone', this.companyPhone);
    localStorage.setItem('hicone_pdf_company_email', this.companyEmail);
    localStorage.setItem('hicone_pdf_company_address', this.companyAddress);
    if (this.companyLogo) {
      localStorage.setItem('hicone_pdf_company_logo', this.companyLogo);
    } else {
      localStorage.removeItem('hicone_pdf_company_logo');
    }
    alert('¡La plantilla y logotipo de los reportes PDF se han guardado con éxito!');
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
