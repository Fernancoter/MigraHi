import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduccionConfigService, ExtrusionItem, PrensadoItem } from '../../../core/services/produccion-config.service';

@Component({
  selector: 'app-tablero-produccion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="module-page animate-move-up">
      <header class="module-header">
        <div class="title-area">
          <nav class="breadcrumb">Producción › Inicio</nav>
          <h1>Tablero Producción</h1>
        </div>
      </header>

      <!-- TABS -->
      <div class="tab-bar">
        <button class="tab-btn" [class.active]="activeTab() === 'extrusion'" (click)="setTab('extrusion')">
          <span class="tab-icon">⚙️</span> Extrusión
        </button>
        <button class="tab-btn" [class.active]="activeTab() === 'prensado'" (click)="setTab('prensado')">
          <span class="tab-icon">🔨</span> Prensado
        </button>
      </div>

      <!-- TAB EXTRUSIÓN -->
      @if (activeTab() === 'extrusion') {
        <div class="tab-content animate-move-up">
          <div class="section-card">
            <div class="section-header">
              <h3>Operación</h3>
              <span class="badge-live">En Vivo</span>
            </div>
            @if (loading()) {
              <div class="empty-state">Cargando...</div>
            } @else if (extrusionData().length === 0) {
              <div class="empty-state">Sin registros de extrusión activos.</div>
            } @else {
              <div class="table-wrapper">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Estado</th>
                      <th>Extrusora ↑</th>
                      <th>Turno</th>
                      <th>Producto</th>
                      <th>Operador</th>
                      <th class="text-right">Producido</th>
                      <th class="text-right">T. Interrupción (min)</th>
                      <th>En Curso</th>
                      <th>Extrusión ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (item of extrusionData(); track item.id) {
                      <tr>
                        <td>
                          <span class="status-pill" [class.active]="item.enCurso" [class.paused]="!item.enCurso">
                            {{ item.enCurso ? 'En Proceso' : 'Pausado' }}
                          </span>
                        </td>
                        <td><strong>{{ item.extrusora }}</strong></td>
                        <td>{{ item.turno }}</td>
                        <td>{{ item.producto }}</td>
                        <td>{{ item.operador }}</td>
                        <td class="text-right font-bold">{{ item.producido | number }}</td>
                        <td class="text-right">{{ item.tiempoInterrupcion }}</td>
                        <td><input type="checkbox" [checked]="item.enCurso" disabled></td>
                        <td><code class="id-tag">{{ item.extrusionId }}</code></td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            }
          </div>
        </div>
      }

      <!-- TAB PRENSADO -->
      @if (activeTab() === 'prensado') {
        <div class="tab-content animate-move-up">
          <div class="section-card">
            <div class="section-header">
              <h3>Operación</h3>
              <span class="badge-live">En Vivo</span>
            </div>
            @if (loading()) {
              <div class="empty-state">Cargando...</div>
            } @else if (prensadoData().length === 0) {
              <div class="empty-state">Sin registros de prensado activos.</div>
            } @else {
              <div class="table-wrapper">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Estado</th>
                      <th>Prensa ↑</th>
                      <th>Turno</th>
                      <th>Producto</th>
                      <th>Operador</th>
                      <th class="text-right">Producido</th>
                      <th class="text-right">T. Interrupción (min)</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (item of prensadoData(); track item.id) {
                      <tr>
                        <td>
                          <span class="status-pill" [class.active]="item.enCurso" [class.paused]="!item.enCurso">
                            {{ item.enCurso ? 'En Proceso' : 'Pausado' }}
                          </span>
                        </td>
                        <td><strong>{{ item.prensa }}</strong></td>
                        <td>{{ item.turno }}</td>
                        <td>{{ item.producto }}</td>
                        <td>{{ item.operador }}</td>
                        <td class="text-right font-bold">{{ item.producido | number }}</td>
                        <td class="text-right">{{ item.tiempoInterrupcion }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .module-page { padding: 1.5rem 2.5rem; }
    .breadcrumb { font-size: 0.75rem; color: #94a3b8; font-weight: 600; text-transform: uppercase; margin-bottom: 0.5rem; }
    h1 { font-size: 1.8rem; font-weight: 800; color: #1e293b; margin: 0 0 1.5rem 0; }

    .tab-bar { display: flex; gap: 0; border-bottom: 2px solid #e2e8f0; margin-bottom: 1.5rem; }
    .tab-btn { padding: 0.75rem 1.5rem; background: transparent; border: none; border-bottom: 3px solid transparent; margin-bottom: -2px; cursor: pointer; font-size: 0.9rem; font-weight: 600; color: #64748b; transition: all 0.2s; display: flex; align-items: center; gap: 0.5rem; }
    .tab-btn:hover { color: #10b981; }
    .tab-btn.active { color: #10b981; border-bottom-color: #10b981; }
    .tab-icon { font-size: 1rem; }

    .tab-content { animation: slideIn 0.2s ease; }
    @keyframes slideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

    .section-card { background: white; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; margin-bottom: 1.5rem; }
    .section-header { padding: 1rem 1.5rem; background: #f8fafc; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
    .section-header h3 { margin: 0; font-size: 1rem; font-weight: 700; color: #1e293b; }

    .badge-live { padding: 0.25rem 0.7rem; background: #dcfce7; color: #166534; border-radius: 20px; font-size: 0.7rem; font-weight: 700; }

    .table-wrapper { overflow-x: auto; }
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th { text-align: left; padding: 0.875rem 1rem; background: #f8fafc; color: #64748b; font-size: 0.75rem; font-weight: 700; border-bottom: 1px solid #e2e8f0; white-space: nowrap; }
    .data-table td { padding: 0.875rem 1rem; border-bottom: 1px solid #f1f5f9; font-size: 0.85rem; color: #334155; }
    .data-table tr:hover td { background: #f8fafc; }

    .status-pill { padding: 0.25rem 0.65rem; border-radius: 20px; font-size: 0.72rem; font-weight: 700; }
    .status-pill.active { background: #dcfce7; color: #166534; }
    .status-pill.paused { background: #fef3c7; color: #92400e; }

    .id-tag { background: #f1f5f9; padding: 0.2rem 0.5rem; border-radius: 4px; color: #64748b; font-size: 0.75rem; font-family: monospace; }
    .text-right { text-align: right; }
    .font-bold { font-weight: 700; }
    .empty-state { padding: 3rem; text-align: center; color: #94a3b8; font-style: italic; }
    .animate-move-up { animation: moveUp 0.3s ease; }
    @keyframes moveUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class TableroProduccionComponent implements OnInit {
  private svc = inject(ProduccionConfigService);

  activeTab   = signal<'extrusion' | 'prensado'>('extrusion');
  loading     = signal(false);
  extrusionData = signal<ExtrusionItem[]>([]);
  prensadoData  = signal<PrensadoItem[]>([]);

  ngOnInit() { this.loadTab('extrusion'); }

  setTab(tab: 'extrusion' | 'prensado') {
    this.activeTab.set(tab);
    this.loadTab(tab);
  }

  private loadTab(tab: 'extrusion' | 'prensado') {
    this.loading.set(true);
    if (tab === 'extrusion') {
      this.svc.getTableroExtrusion().subscribe({
        next: res => { this.extrusionData.set(res.operacion); this.loading.set(false); },
        error: ()  => this.loading.set(false)
      });
    } else {
      this.svc.getTableroPrensado().subscribe({
        next: res => { this.prensadoData.set(res.operacion); this.loading.set(false); },
        error: ()  => this.loading.set(false)
      });
    }
  }
}
