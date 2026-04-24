import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule],
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
        </div>
      </div>
    </div>
  `,
  styles: [`
    .module-page { padding: 2rem; max-width: 900px; margin: 0 auto; }
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
  `]
})
export class ConfiguracionComponent {
  user: any;

  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.currentUser();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
