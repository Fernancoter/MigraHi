import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-turnos-semana',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="module-page animate-move-up">
      <header class="module-header-container" style="display: flex; flex-direction: column; margin-bottom: 1.5rem;">
        <div class="title-area">
          <nav class="breadcrumb">Producción <span style="margin: 0 0.5rem; color: #9ca3af;">›</span> Turnos Por Semana</nav>
          <h1 style="color: #10b981; font-weight: normal; margin-top: 0.2rem;">Turnos Por Semana</h1>
        </div>
      </header>
      
      <div class="content-card" style="padding: 0; border: 1px solid #cbd5e1; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); background: white;">
        
        <!-- Main Tabs -->
        <div class="main-tabs" style="display: flex; border-bottom: 1px solid #cbd5e1; padding: 0 1rem; margin-top: 0.5rem;">
          <div class="tab" 
               [class.active]="activeMainTab() === 'extrusoras'"
               (click)="activeMainTab.set('extrusoras')">
            Extrusoras
          </div>
          <div class="tab" 
               [class.active]="activeMainTab() === 'prensas'"
               (click)="activeMainTab.set('prensas')">
            Prensas
          </div>
        </div>
        
        <div class="tab-content" style="padding: 1.5rem;">
          
          <!-- Info banner -->
          <div class="info-banner" style="display: flex; align-items: center; border: 1px solid #cbd5e1; border-radius: 2px; padding: 1.2rem; margin-bottom: 2rem;">
            <span class="icon text-white" style="background: #4caf50; border-radius: 2px; display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; margin-right: 0.8rem;">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.41l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.22-1.05-.59-1.41zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>
            </span>
            <span style="color: #475569; font-weight: 500; font-size: 0.85rem;">Seleccione el inicio de semana para generar la plantilla de turnos</span>
          </div>
          
          <!-- Date fields -->
          <div class="date-fields-container" style="display: flex; gap: 3rem; margin-bottom: 1.5rem; width: 100%;">
            <div class="date-field" style="flex: 1; border-bottom: 1px solid #cbd5e1; padding-bottom: 0.3rem;">
              <label style="display: block; font-size: 0.75rem; color: #475569; font-weight: 600; margin-bottom: 0.5rem;">Fecha Inicio *</label>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <input type="text" value="01/06/26" style="border: none; outline: none; background: transparent; font-size: 0.95rem; color: #475569; width: 100%;" />
                <span style="color: #cbd5e1; font-size: 1.1rem; cursor: pointer;">📅</span>
              </div>
            </div>
            <div class="date-field" style="flex: 1; border-bottom: 1px solid #cbd5e1; padding-bottom: 0.3rem;">
              <label style="display: block; font-size: 0.75rem; color: #475569; font-weight: 600; margin-bottom: 0.5rem;">Fecha Fin *</label>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <input type="text" value="07/06/26" style="border: none; outline: none; background: transparent; font-size: 0.95rem; color: #475569; width: 100%;" />
                <span style="color: #cbd5e1; font-size: 1.1rem; cursor: pointer;">📅</span>
              </div>
            </div>
          </div>
          
          <!-- Action button -->
          <button style="background: #4caf50; color: white; font-weight: 600; padding: 0.6rem 1.5rem; border: none; border-radius: 2px; margin-bottom: 2rem; cursor: pointer; font-size: 0.75rem; text-transform: uppercase;">PROGRAMAR O CONSULTAR</button>
          
          <!-- Inner Tabs -->
          <div class="inner-tabs-container" style="border: 1px solid #cbd5e1; border-radius: 2px;">
            <div class="inner-tabs" style="display: flex; border-bottom: 1px solid #cbd5e1; padding: 0 1rem; background: white;">
              <div class="inner-tab" 
                   [class.active]="activeInnerTab() === 'extrusora1'"
                   (click)="activeInnerTab.set('extrusora1')">
                Extrusora 1
              </div>
              <div class="inner-tab" 
                   [class.active]="activeInnerTab() === 'extrusora2'"
                   (click)="activeInnerTab.set('extrusora2')">
                Extrusora 2
              </div>
              <div class="inner-tab" 
                   [class.active]="activeInnerTab() === 'extrusora3'"
                   (click)="activeInnerTab.set('extrusora3')">
                Extrusora 3
              </div>
            </div>
            <div class="inner-tab-content" style="min-height: 80px; background: white;">
              <!-- Empty space as in screenshot -->
            </div>
          </div>
          
        </div>
      </div>
      
      <!-- Footer -->
      <footer style="margin-top: 1.5rem; padding-top: 0.5rem; border-top: 1px solid #cbd5e1; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; color: #475569; gap: 1rem;">
        <span style="font-weight: 600; font-size: 0.8rem;">Consultas a partir de la siguiente fecha:</span>
        <div style="display: flex; align-items: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 0.1rem; gap: 0.5rem; min-width: 80px; justify-content: space-between;">
          <span style="color: #94a3b8;">01/03/28</span>
          <span style="color: #cbd5e1; font-size: 1rem; cursor: pointer;">📅</span>
        </div>
        <span style="color: #64748b; font-size: 0.75rem; margin-left: 0.5rem;">Copyright 2023</span>
      </footer>
    </div>
  `,
  styles: [`
    .tab {
      padding: 1rem;
      color: #64748b;
      cursor: pointer;
      font-weight: 500;
      font-size: 0.9rem;
      border-bottom: 2px solid transparent;
      transition: all 0.2s ease;
    }
    .tab.active {
      color: #10b981;
      font-weight: 600;
      border-bottom: 2px solid #10b981;
    }
    .inner-tab {
      padding: 1rem;
      color: #64748b;
      cursor: pointer;
      font-size: 0.85rem;
      font-weight: 500;
      transition: all 0.2s ease;
    }
    .inner-tab.active {
      color: #10b981;
    }
  `]
})
export class TurnosSemanaComponent {
  activeMainTab = signal<'extrusoras' | 'prensas'>('extrusoras');
  activeInnerTab = signal<'extrusora1' | 'extrusora2' | 'extrusora3'>('extrusora1');
}
