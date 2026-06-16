import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reportes-placeholder',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="module-page animate-move-up">
      <header class="module-header-container" style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem;">
        <div class="title-area">
          <nav class="breadcrumb">{{ breadcrumb }}</nav>
          <h1>{{ titulo }}</h1>
        </div>
      </header>

      <div class="content-card placeholder-card">
        <div class="placeholder-icon">🚧</div>
        <h2 class="placeholder-title">Módulo en construcción</h2>
        <p class="placeholder-text">Este módulo se encuentra en desarrollo y estará disponible próximamente.</p>
      </div>
    </div>
  `,
  styles: [`
    .module-page { padding: 1.5rem 2.5rem; }
    .breadcrumb { font-size: .75rem; color: #94a3b8; font-weight: 600; text-transform: uppercase; margin-bottom: .25rem; }
    h1 { font-size: 1.8rem; font-weight: 800; color: #1e293b; margin: 0; }

    .content-card { background: white; border-radius: 8px; border: 1px solid #e2e8f0; overflow: visible; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }

    .placeholder-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      text-align: center;
      min-height: 350px;
    }

    .placeholder-icon {
      font-size: 3.5rem;
      margin-bottom: 1rem;
    }

    .placeholder-title {
      font-size: 1.4rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 0.5rem 0;
    }

    .placeholder-text {
      font-size: 0.9rem;
      color: #94a3b8;
      margin: 0;
      max-width: 400px;
    }

    .animate-move-up { animation: moveUp .3s ease-out; }
    @keyframes moveUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class ReportesPlaceholderComponent {
  @Input() breadcrumb = 'Reportes HC';
  @Input() titulo = 'Reportes HC';
}
