import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduccionConfigService, ExtrusionProgramacion, ExtrusionOperacion } from '../../../core/services/produccion-config.service';

@Component({
  selector: 'app-tablero-produccion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up">
      <header class="module-header">
        <div class="title-area">
          <nav class="breadcrumb">Producción › Inicio</nav>
          <h1>Tablero de Producción</h1>
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
          
          <!-- TABLA 1: PROGRAMACIÓN -->
          <div class="section-card mb-6">
            <div class="section-header">
              <div class="header-title">
                <span class="dot-indicator blue"></span>
                <h3>Programación</h3>
              </div>
            </div>
            
            <div class="table-wrapper">
              <table class="premium-table">
                <thead>
                  <tr>
                    <th (click)="toggleSort('prog', 'fecha')">
                      Fecha Extrusora <span class="sort-icon">{{ sortDirProg() === 'asc' ? '↑' : '↓' }}</span>
                    </th>
                    <th><span class="th-inner">Turno <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span></th>
                    <th><span class="th-inner">Producto <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span></th>
                    <th><span class="th-inner">Operador <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span></th>
                    <th><span class="th-inner">Programado <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span></th>
                  </tr>
                </thead>
                <tbody>
                  @if (loading()) {
                    <tr><td colspan="5" class="loading-cell">Cargando programación...</td></tr>
                  } @else if (programacionExt().length === 0) {
                    <tr><td colspan="5" class="empty-cell">No hay órdenes programadas.</td></tr>
                  } @else {
                    @for (item of programacionExt(); track item.id) {
                      <tr>
                        <td>{{ item.fechaExtrusora | date:'dd/MM/yyyy' }}</td>
                        <td><span class="turno-badge">{{ item.turno }}</span></td>
                        <td><strong>{{ item.producto }}</strong></td>
                        <td>{{ item.operador }}</td>
                        <td class="font-bold">{{ item.programado | number }}</td>
                      </tr>
                    }
                  }
                </tbody>
              </table>
            </div>
          </div>

          <!-- TABLA 2: OPERACIÓN -->
          <div class="section-card">
            <div class="section-header">
              <div class="header-title">
                <span class="dot-indicator green"></span>
                <h3>Operación</h3>
              </div>
              <span class="badge-live pulse">En Vivo</span>
            </div>
            
            <div class="table-wrapper">
              <table class="premium-table">
                <thead>
                  <tr>
                    <th class="header-empty"></th> <!-- Estado -->
                    <th class="header-empty"></th> <!-- Editar -->
                    <th class="header-empty"></th>
                    <th class="header-empty"></th>
                    <th class="header-empty"></th>
                    <th (click)="toggleSort('oper', 'extrusora')">
                      Extrusora <span class="sort-icon">{{ sortDirOper() === 'asc' ? '↑' : '↓' }}</span>
                    </th>
                    <th><span class="th-inner">Turno <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span></th>
                    <th><span class="th-inner">Producto <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span></th>
                    <th><span class="th-inner">Operador <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span></th>
                    <th class="text-right"><span class="th-inner">Producido <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span></th>
                    <th class="text-right"><span class="th-inner">Tiempo Interrupción (min) <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span></th>
                    <th><span class="th-inner">En Curso <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span></th>
                    <th><span class="th-inner">Extrusión ID <svg class="chevron-icon" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span></th>
                  </tr>
                </thead>
                <tbody>
                  @if (loading()) {
                    <tr><td colspan="13" class="loading-cell">Cargando operación...</td></tr>
                  } @else if (operacionExt().length === 0) {
                    <tr><td colspan="13" class="empty-cell">Sin registros en curso.</td></tr>
                  } @else {
                    @for (item of operacionExt(); track item.id) {
                      <tr [class.row-active]="item.enCurso">
                        <td>
                          <span class="status-indicator" [attr.data-status]="item.status">
                            {{ item.status }}
                          </span>
                        </td>
                        <td>
                          <button class="btn-icon-edit" (click)="openEditModal(item.id)">
                            <span class="icon">✎</span>
                          </button>
                        </td>
                        <td class="td-empty"></td>
                        <td class="td-empty"></td>
                        <td class="td-empty"></td>
                        <td><strong>{{ item.extrusora }}</strong></td>
                        <td>{{ item.turno }}</td>
                        <td>{{ item.producto }}</td>
                        <td>{{ item.operador }}</td>
                        <td class="text-right font-bold">{{ item.producido | number }}</td>
                        <td class="text-right">{{ item.tiempoInterrupcion }}</td>
                        <td class="text-center">
                          <div class="toggle-status" [class.on]="item.enCurso"></div>
                        </td>
                        <td><code class="id-tag">{{ item.extrusionId }}</code></td>
                      </tr>
                    }
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      }

      <!-- MODAL DE EDICIÓN -->
      @if (showModal()) {
        <div class="modal-backdrop animate-fade-in" (click)="closeModal()">
          <div class="modal-container animate-slide-up" (click)="$event.stopPropagation()">
            <header class="modal-header">
              <h2>Información general</h2>
              <button class="btn-close" (click)="closeModal()">×</button>
            </header>
            
            <div class="modal-body">
              <div class="info-grid">
                <div class="info-col">
                  <label>Extrusora</label>
                  <p>{{ selectedExtrusion()?.extrusora || '---' }}</p>
                </div>
                <div class="info-col">
                  <label>Turno</label>
                  <p>{{ selectedExtrusion()?.turno || '---' }}</p>
                </div>
                <div class="info-col">
                  <label>Producto</label>
                  <p>{{ selectedExtrusion()?.producto || '---' }}</p>
                </div>
              </div>

              <div class="sub-section">
                <h4>Operador</h4>
                <p class="operador-name">{{ selectedExtrusion()?.operador || 'Sin asignar' }}</p>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- TAB PRENSADO (Placeholder) -->
      @if (activeTab() === 'prensado') {
        <div class="tab-content animate-move-up">
          <div class="empty-state">Módulo de Prensado en desarrollo.</div>
        </div>
      }
    </div>
  `,
  styles: [`
    .module-page { padding: 1.5rem 2.5rem; background: #f1f5f9; min-height: 100vh; }
    .breadcrumb { font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase; margin-bottom: 0.5rem; letter-spacing: 0.05em; }
    h1 { font-size: 2rem; font-weight: 800; color: #0f172a; margin: 0 0 2rem 0; letter-spacing: -0.02em; }

    .tab-bar { display: flex; gap: 0.5rem; border-bottom: 1px solid #cbd5e1; margin-bottom: 2rem; }
    .tab-btn { padding: 1rem 2rem; background: transparent; border: none; border-bottom: 4px solid transparent; margin-bottom: -1px; cursor: pointer; font-size: 1rem; font-weight: 700; color: #64748b; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); display: flex; align-items: center; gap: 0.75rem; }
    .tab-btn:hover { color: #10b981; background: #f8fafc; }
    .tab-btn.active { color: #10b981; border-bottom-color: #10b981; background: white; border-radius: 8px 8px 0 0; }

    .section-card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05); overflow: hidden; }
    .mb-6 { margin-bottom: 2rem; }
    
    .section-header { padding: 1.25rem 1.5rem; background: white; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; }
    .header-title { display: flex; align-items: center; gap: 0.75rem; }
    .header-title h3 { margin: 0; font-size: 1.1rem; font-weight: 800; color: #1e293b; }
    
    .dot-indicator { width: 10px; height: 10px; border-radius: 50%; }
    .dot-indicator.blue { background: #3b82f6; box-shadow: 0 0 8px #3b82f6; }
    .dot-indicator.green { background: #10b981; box-shadow: 0 0 8px #10b981; }

    .badge-live { padding: 0.4rem 0.8rem; background: #dcfce7; color: #15803d; border-radius: 20px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.025em; border: 1px solid #bbf7d0; }
    .pulse { animation: pulseAnim 2s infinite; }
    @keyframes pulseAnim { 0% { opacity: 1; } 50% { opacity: 0.6; } 100% { opacity: 1; } }

    .table-wrapper { overflow-x: auto; }
    .premium-table { width: 100%; border-collapse: collapse; min-width: 1000px; }
    .premium-table th { text-align: left; padding: 1rem 1.5rem; background: #f8fafc; color: #475569; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #e2e8f0; cursor: pointer; user-select: none; vertical-align: top; }
    .premium-table th:hover { background: #f1f5f9; }
    .premium-table td { padding: 1.1rem 1.5rem; border-bottom: 1px solid #f1f5f9; font-size: 0.9rem; color: #334155; }
    .premium-table tr:hover td { background: #f8fafc; }
    .row-active td { background: #f0fdf4 !important; }

    .sort-icon { font-size: 0.8rem; margin-left: 0.4rem; color: #94a3b8; }
    .th-inner { display: inline-flex; align-items: flex-start; gap: 0.35rem; }
    .chevron-icon { width: 10px; height: 6px; flex-shrink: 0; margin-top: 0.15em; color: #94a3b8; }
    .header-empty { width: 40px; pointer-events: none; }
    .td-empty { background: transparent !important; border: none !important; }

    .turno-badge { padding: 0.25rem 0.6rem; background: #f1f5f9; border-radius: 6px; color: #475569; font-size: 0.8rem; font-weight: 700; border: 1px solid #e2e8f0; }
    
    .status-indicator { padding: 0.35rem 0.75rem; border-radius: 8px; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.01em; display: inline-block; }
    .status-indicator[data-status="Programada"] { background: #dbeafe; color: #1e40af; }
    .status-indicator[data-status="EnProceso"] { background: #dcfce7; color: #166534; }
    .status-indicator[data-status="Intermedia"] { background: #fef3c7; color: #92400e; }
    .status-indicator[data-status="Terminada"] { background: #f1f5f9; color: #475569; }
    .status-indicator[data-status="PorProgramar"] { background: #fee2e2; color: #991b1b; }

    .btn-icon-edit { width: 32px; height: 32px; border-radius: 8px; border: 1px solid #e2e8f0; background: white; color: #3b82f6; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; font-size: 1rem; }
    .btn-icon-edit:hover { background: #3b82f6; color: white; border-color: #3b82f6; transform: scale(1.1); box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); }

    .toggle-status { width: 14px; height: 14px; border-radius: 50%; background: #cbd5e1; margin: 0 auto; transition: all 0.3s; }
    .toggle-status.on { background: #10b981; box-shadow: 0 0 8px #10b981; }

    .id-tag { background: #f8fafc; padding: 0.3rem 0.6rem; border-radius: 6px; color: #64748b; font-size: 0.8rem; font-family: 'JetBrains Mono', 'Fira Code', monospace; border: 1px solid #e2e8f0; }
    .text-right { text-align: right; }
    .text-center { text-align: center; }
    .font-bold { font-weight: 800; }
    .loading-cell, .empty-cell { text-align: center; padding: 4rem; color: #94a3b8; font-style: italic; }

    /* MODAL */
    .modal-backdrop { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .modal-container { background: white; border-radius: 24px; width: 90%; max-width: 600px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); overflow: hidden; }
    .modal-header { padding: 1.5rem 2rem; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; background: #f8fafc; }
    .modal-header h2 { margin: 0; font-size: 1.5rem; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; }
    .btn-close { background: transparent; border: none; font-size: 1.8rem; color: #64748b; cursor: pointer; line-height: 1; }
    .btn-close:hover { color: #0f172a; }

    .modal-body { padding: 2.5rem; }
    .info-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-bottom: 3rem; }
    .info-col label { display: block; font-size: 0.75rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
    .info-col p { font-size: 1.1rem; font-weight: 700; color: #1e293b; margin: 0; }

    .sub-section { border-top: 1px solid #f1f5f9; padding-top: 2rem; }
    .sub-section h4 { margin: 0 0 1rem 0; font-size: 0.9rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
    .operador-name { font-size: 1.25rem; font-weight: 800; color: #10b981; margin: 0; }

    .animate-move-up { animation: moveUp 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
    @keyframes moveUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .animate-fade-in { animation: fadeIn 0.3s ease; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .animate-slide-up { animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
    @keyframes slideUp { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  `]
})
export class TableroProduccionComponent implements OnInit {
  private svc = inject(ProduccionConfigService);

  activeTab   = signal<'extrusion' | 'prensado'>('extrusion');
  loading     = signal(false);
  
  programacionExt = signal<ExtrusionProgramacion[]>([]);
  operacionExt    = signal<ExtrusionOperacion[]>([]);
  
  sortDirProg = signal<'asc' | 'desc'>('asc');
  sortDirOper = signal<'asc' | 'desc'>('asc');

  showModal = signal(false);
  selectedExtrusion = signal<any>(null);

  ngOnInit() { this.loadExtrusion(); }

  setTab(tab: 'extrusion' | 'prensado') {
    this.activeTab.set(tab);
    if (tab === 'extrusion') this.loadExtrusion();
  }

  loadExtrusion() {
    this.loading.set(true);
    this.svc.getExtrusionProgramacion().subscribe({
      next: res => this.programacionExt.set(res),
      error: ()  => this.loading.set(false)
    });

    this.svc.getExtrusionOperacion().subscribe({
      next: res => { 
        this.operacionExt.set(res); 
        this.loading.set(false); 
      },
      error: ()  => this.loading.set(false)
    });
  }

  toggleSort(table: 'prog' | 'oper', column: string) {
    if (table === 'prog') {
      const dir = this.sortDirProg() === 'asc' ? 'desc' : 'asc';
      this.sortDirProg.set(dir);
      this.programacionExt.update(items => [...items].sort((a, b) => {
        const valA = a.fechaExtrusora;
        const valB = b.fechaExtrusora;
        return dir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }));
    } else {
      const dir = this.sortDirOper() === 'asc' ? 'desc' : 'asc';
      this.sortDirOper.set(dir);
      this.operacionExt.update(items => [...items].sort((a, b) => {
        const valA = a.extrusora;
        const valB = b.extrusora;
        return dir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }));
    }
  }

  openEditModal(id: string) {
    this.svc.getExtrusionDetail(id).subscribe(res => {
      this.selectedExtrusion.set(res);
      this.showModal.set(true);
    });
  }

  closeModal() {
    this.showModal.set(false);
    this.selectedExtrusion.set(null);
  }
}
