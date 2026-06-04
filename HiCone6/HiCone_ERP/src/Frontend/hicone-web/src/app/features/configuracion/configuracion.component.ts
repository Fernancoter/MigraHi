import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up" style="padding: 1.5rem 2.5rem; background: #fff; min-height: calc(100vh - 64px); position: relative;">
      <header style="margin-bottom: 2rem;">
        <h1 style="font-size: 1.6rem; font-weight: normal; color: #1e293b; margin: 0 0 0.2rem 0;">Configuración</h1>
        <nav style="font-size: 0.75rem; color: #94a3b8;">Producción › Referencias › Configuración</nav>
      </header>

      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; margin-bottom: 1rem;">
        <div style="display: flex; gap: 2rem;">
          <div style="padding: 0.5rem 1rem; color: #64748b; cursor: pointer;">Configuración</div>
          <div style="padding: 0.5rem 1rem; color: #5cb85c; cursor: pointer; border-bottom: 2px solid #5cb85c;">Key</div>
        </div>
        <button (click)="openModal()" style="background: #5cb85c; color: white; border: none; padding: 0.5rem 1.5rem; border-radius: 4px; cursor: pointer; font-size: 0.85rem; margin-bottom: 0.5rem;">Agregar</button>
      </div>

      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="text-align: left; padding: 1rem; color: #334155; font-size: 0.85rem; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Key</th>
            <th style="text-align: left; padding: 1rem; color: #334155; font-size: 0.85rem; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Valor</th>
            <th style="text-align: right; padding: 1rem; border-bottom: 1px solid #e2e8f0; width: 200px;"></th>
          </tr>
        </thead>
        <tbody>
          @for (item of items(); track item.key) {
            <tr>
              <td style="padding: 1rem; border-bottom: 1px solid #f1f5f9; color: #5cb85c; font-size: 0.85rem;">{{ item.key }}</td>
              <td style="padding: 1rem; border-bottom: 1px solid #f1f5f9; color: #334155; font-size: 0.85rem;">{{ item.valor }}</td>
              <td style="padding: 1rem; border-bottom: 1px solid #f1f5f9; text-align: right;">
                <button (click)="openModal(item)" style="background: none; border: none; color: #5cb85c; cursor: pointer; font-size: 0.85rem; margin-right: 1rem;">Modificar</button>
                <button style="background: none; border: none; color: #5cb85c; cursor: pointer; font-size: 0.85rem;">Eliminar</button>
              </td>
            </tr>
          }
        </tbody>
      </table>
      
      <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #e2e8f0; font-size: 0.75rem; color: #64748b; display: flex; align-items: center; gap: 2rem;">
        <span>Consultas a partir de la siguiente fecha:</span>
        <span style="display: flex; align-items: center; gap: 0.5rem; border: 1px solid #e2e8f0; padding: 0.2rem 0.5rem; border-radius: 4px;">03/03/20 <span style="color: #94a3b8; font-size: 0.8rem;">📅</span></span>
        <span>Copyright 2023</span>
      </div>

      <!-- Modal Agregar/Modificar -->
      <div *ngIf="isModalOpen" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;">
        <div class="animate-move-up" style="background: white; padding: 2rem; border-radius: 8px; width: 400px; max-width: 90%; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
          <h2 style="margin: 0 0 1.5rem 0; font-size: 1.25rem; color: #1e293b; font-weight: 500;">
            {{ isEditing ? 'Modificar Configuración' : 'Agregar Configuración' }}
          </h2>
          
          <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem;">
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <label style="font-size: 0.85rem; color: #475569; font-weight: 500;">Key</label>
              <input type="text" [(ngModel)]="form.key" [disabled]="isEditing" style="padding: 0.5rem; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 0.9rem; outline: none; width: 100%; box-sizing: border-box;" placeholder="Ej. BaseUrl">
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <label style="font-size: 0.85rem; color: #475569; font-weight: 500;">Valor</label>
              <input type="text" [(ngModel)]="form.valor" style="padding: 0.5rem; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 0.9rem; outline: none; width: 100%; box-sizing: border-box;" placeholder="Ej. https://...">
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 1rem;">
            <button (click)="closeModal()" style="background: white; color: #64748b; border: 1px solid #cbd5e1; padding: 0.5rem 1.5rem; border-radius: 4px; cursor: pointer; font-size: 0.85rem;">Cancelar</button>
            <button (click)="saveModal()" style="background: #5cb85c; color: white; border: none; padding: 0.5rem 1.5rem; border-radius: 4px; cursor: pointer; font-size: 0.85rem;">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-move-up { animation: moveUp .3s ease-out; }
    @keyframes moveUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class ConfiguracionComponent {
  items = signal([
    { key: 'BaseUrl', valor: 'https://erphi-cone.com/erp/' },
    { key: 'CategoriaBobina', valor: 'Bobina' },
    { key: 'CategoriaCarrete', valor: 'Carrete' },
    { key: 'EscaneoPaletExterno', valor: '1' },
    { key: 'ExtrusionAyudaURL', valor: 'https://nedi.mx/knowledge/article/941' },
    { key: 'FilasLoteReporte', valor: '11' },
    { key: 'IISReportes', valor: '' },
    { key: 'MaterialBobina', valor: '3' },
    { key: 'NOTIFICACION_EMBARQUE', valor: 'cfernandez@hi-cone.com, valvarez@hi-cone.com, basiliop@hi-cone.com, oservin@hi-cone.com' },
    { key: 'PaletNo_0_29_11_2024', valor: '' }
  ]);

  isModalOpen = false;
  isEditing = false;
  form = { key: '', valor: '' };

  openModal(item?: any) {
    if (item) {
      this.isEditing = true;
      this.form = { key: item.key, valor: item.valor };
    } else {
      this.isEditing = false;
      this.form = { key: '', valor: '' };
    }
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveModal() {
    if (!this.form.key || !this.form.valor) return;
    
    if (this.isEditing) {
      this.items.update(list => list.map(i => i.key === this.form.key ? { ...i, valor: this.form.valor } : i));
    } else {
      this.items.update(list => {
        if (!list.find(i => i.key === this.form.key)) {
           return [...list, { ...this.form }];
        }
        return list;
      });
    }
    this.closeModal();
  }
}
