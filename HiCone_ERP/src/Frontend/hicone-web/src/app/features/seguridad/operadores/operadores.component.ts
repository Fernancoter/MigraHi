import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OperadoresService, OperadorDto } from '../../../core/services/operadores.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import { timer } from 'rxjs';

@Component({
  selector: 'app-operadores',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="module-page animate-fade-in">
      <header class="module-header">
        <div class="title-area">
          <nav class="breadcrumb">Seguridad › Operadores</nav>
          <h1>👷 Gestión de Operadores</h1>
          <p>Administra el estado de los operadores y su acceso al repositorio.</p>
        </div>
      </header>

      <div class="alert alert-error" *ngIf="errorMsg()">⚠️ {{ errorMsg() }}</div>
      <div class="alert alert-success" *ngIf="successMsg()">✅ {{ successMsg() }}</div>

      <div class="data-container">
        <div class="loading-state" *ngIf="isLoading()">
          <span class="spinner"></span> Cargando operadores...
        </div>

        <table class="data-table" *ngIf="!isLoading()">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Código</th>
              <th>Usuario Vinculado</th>
              <th>Estado</th>
              <th class="text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let o of operadores()">
              <td>
                <div class="operador-info">
                  <span class="avatar">{{ o.operadorNombre.charAt(0) }}</span>
                  <strong>{{ o.operadorNombre }}</strong>
                </div>
              </td>
              <td><code class="code-badge">{{ o.id.substring(0,8) }}</code></td>
              <td>
                <span class="badge badge-outline" *ngIf="o.username">@{{ o.username }}</span>
                <span class="text-muted" *ngIf="!o.username">No vinculado</span>
              </td>
              <td>
                <span class="status-badge" [class.active]="o.activo">
                  {{ o.activo ? 'Habilitado' : 'Deshabilitado' }}
                </span>
              </td>
              <td class="text-right">
                <button *ngIf="o.activo" class="btn-action btn-disable" (click)="deshabilitar(o)" [disabled]="isProcessing() === o.id">
                  {{ isProcessing() === o.id ? '...' : 'Deshabilitar' }}
                </button>
                <button *ngIf="!o.activo" class="btn-action btn-enable" (click)="habilitar(o)" [disabled]="isProcessing() === o.id">
                  {{ isProcessing() === o.id ? '...' : 'Habilitar' }}
                </button>
              </td>
            </tr>
            <tr *ngIf="operadores().length === 0">
              <td colspan="5" class="empty-row">No se encontraron operadores.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .module-page { padding: 1.5rem 2.5rem; }
    .module-header { margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center; }
    h1 { font-size: 1.8rem; font-weight: 800; color: #1e293b; margin: 0; }
    .breadcrumb { font-size: 0.75rem; color: #94a3b8; margin-bottom: 0.5rem; font-weight: 600; text-transform: uppercase; }
    
    .data-container { background: white; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th { text-align: left; padding: 1rem; background: #f8fafc; color: #64748b; font-size: 0.75rem; font-weight: 700; border-bottom: 1px solid #e2e8f0; }
    .data-table td { padding: 1rem; border-bottom: 1px solid #f1f5f9; font-size: 0.85rem; }
    
    .operador-info { display: flex; align-items: center; gap: 0.75rem; }
    .avatar { width: 32px; height: 32px; border-radius: 50%; background: #6366f1; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.8rem; }
    
    .status-badge { padding: 0.25rem 0.6rem; border-radius: 9999px; font-size: 0.7rem; font-weight: 700; background: #fee2e2; color: #991b1b; }
    .status-badge.active { background: #dcfce7; color: #166534; }
    
    .badge { padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; }
    .badge-outline { border: 1px solid #e2e8f0; color: #64748b; }
    .code-badge { background: #f1f5f9; padding: 0.2rem 0.4rem; border-radius: 4px; color: #64748b; font-size: 0.75rem; font-family: monospace; }
    
    .btn-action { padding: 0.4rem 0.8rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; cursor: pointer; transition: all 0.2s; border: 1px solid transparent; }
    .btn-disable { background: #fee2e2; color: #b91c1c; }
    .btn-disable:hover { background: #fecaca; }
    .btn-enable { background: #dcfce7; color: #15803d; }
    .btn-enable:hover { background: #bbf7d0; }
    
    .btn-primary { background: #2e7d32; color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 8px; font-weight: 700; cursor: pointer; }
    .btn-primary:hover { background: #1b5e20; }
    .btn-secondary { background: #f1f5f9; color: #475569; border: none; padding: 0.6rem 1.2rem; border-radius: 8px; font-weight: 600; cursor: pointer; }

    .text-right { text-align: right; }
    .text-muted { color: #94a3b8; }
    .empty-row { text-align: center; padding: 3rem; color: #64748b; font-style: italic; }
    
    .alert { padding: 1rem; border-radius: 8px; margin-bottom: 1rem; font-size: 0.9rem; }
    .alert-error { background: #fef2f2; border: 1px solid #fee2e2; color: #991b1b; }
    .alert-success { background: #f0fdf4; border: 1px solid #dcfce7; color: #166534; }

    /* Modal Styles */
    .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .modal-box { background: white; border-radius: 12px; width: 100%; max-width: 500px; overflow: hidden; }
    .modal-header { padding: 1.2rem 1.5rem; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
    .modal-header h2 { margin: 0; font-size: 1.2rem; color: #1e293b; }
    .modal-close { background: none; border: none; font-size: 1.5rem; color: #94a3b8; cursor: pointer; }
    .modal-form { padding: 1.5rem; }
    .form-group { margin-bottom: 1.2rem; }
    .form-group label { display: block; font-size: 0.85rem; font-weight: 600; color: #64748b; margin-bottom: 0.4rem; }
    .form-control { width: 100%; padding: 0.7rem; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; }
    .field-error { color: #ef4444; font-size: 0.75rem; margin-top: 0.2rem; display: block; }
    .field-help { font-size: 0.75rem; color: #94a3b8; margin-top: 0.4rem; }
    .modal-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem; }

    .loading-state { padding: 3rem; text-align: center; color: #64748b; }
    .spinner { border: 3px solid #f3f3f3; border-top: 3px solid #6366f1; border-radius: 50%; width: 20px; height: 20px; animation: spin 1s linear infinite; display: inline-block; margin-right: 0.5rem; vertical-align: middle; }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  `]
})
export class OperadoresComponent implements OnInit {
  private operadoresService = inject(OperadoresService);
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  operadores = signal<OperadorDto[]>([]);
  availableUsers: any[] = [];
  isLoading = signal(true);
  isProcessing = signal<string | null>(null);
  errorMsg = signal<string | null>(null);
  successMsg = signal<string | null>(null);

  constructor() {}

  ngOnInit() {
    this.loadOperadores();
    this.loadUsers();
  }

  loadOperadores() {
    this.isLoading.set(true);
    this.operadoresService.getOperadores().subscribe({
      next: (data) => {
        this.operadores.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMsg.set('Error al cargar la lista de operadores.');
        this.isLoading.set(false);
      }
    });
  }

  loadUsers() {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.authService.getToken()}` });
    this.http.get<any[]>(`${environment.apiUrl}/api/users`, { headers }).subscribe({
      next: (data) => this.availableUsers = data,
      error: () => console.error('Error al cargar usuarios para vinculación')
    });
  }

  habilitar(o: OperadorDto) {
    this.isProcessing.set(o.id);
    this.operadoresService.habilitar(o.id).subscribe({
      next: () => {
        this.successMsg.set(`Operador ${o.operadorNombre} habilitado.`);
        this.isProcessing.set(null);
        this.loadOperadores();
        timer(3000).subscribe(() => this.successMsg.set(null));
      },
      error: () => {
        this.errorMsg.set('Error al habilitar.');
        this.isProcessing.set(null);
      }
    });
  }

  deshabilitar(o: OperadorDto) {
    this.isProcessing.set(o.id);
    this.operadoresService.deshabilitar(o.id).subscribe({
      next: () => {
        this.successMsg.set(`Operador ${o.operadorNombre} deshabilitado.`);
        this.isProcessing.set(null);
        this.loadOperadores();
        timer(3000).subscribe(() => this.successMsg.set(null));
      },
      error: () => {
        this.errorMsg.set('Error al deshabilitar.');
        this.isProcessing.set(null);
      }
    });
  }
}
