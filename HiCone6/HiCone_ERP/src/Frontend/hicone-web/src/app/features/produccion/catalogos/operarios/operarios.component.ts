import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduccionConfigService, Operario } from '../../../../core/services/produccion-config.service';

@Component({
  selector: 'app-operarios-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up">
      <!-- Encabezado del Módulo -->
      <header class="module-header">
        <div class="title-area">
          <nav class="breadcrumb">Producción › Catálogos › Operarios</nav>
          <h1>Operarios</h1>
        </div>
        
        <!-- Barra de Acciones Premium -->
        <div class="actions-toolbar" style="display: flex; gap: 0.75rem; align-items: center;">
          
          <!-- Filtro de Búsqueda -->
          <div class="search-box" style="position: relative;">
            <span class="search-icon" style="position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: #94a3b8;">🔍</span>
            <input 
              class="field-input" 
              type="text" 
              style="padding-left: 2.2rem; width: 220px;" 
              placeholder="Buscar operario..." 
              [ngModel]="searchText()" 
              (ngModelChange)="searchText.set($event)"
            />
          </div>

          <!-- Toggle de Filtros de Estado -->
          <button 
            class="btn btn-secondary" 
            [class.active-filter]="showActiveOnly()" 
            (click)="toggleActiveOnly()"
            title="Filtrar por estado activo"
            style="display: flex; align-items: center; gap: 0.3rem;"
          >
            <span>🔄</span> {{ showActiveOnly() ? 'Todos' : 'Activos' }}
          </button>

          <!-- Selector de Columnas -->
          <div class="dropdown-wrapper" style="position: relative;">
            <button class="btn btn-secondary" (click)="toggleColumnDropdown()" style="display: flex; align-items: center; gap: 0.3rem;">
              <span>📊</span> Columnas
            </button>
            @if (showColumnSelector()) {
              <div class="column-selector-popover animate-slide-up" (click)="$event.stopPropagation()" style="position: absolute; right: 0; top: 110%; background: white; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); padding: 1rem; width: 200px; z-index: 100;">
                <h4 style="margin: 0 0 0.5rem 0; font-size: 0.8rem; font-weight: 800; color: #64748b; text-transform: uppercase;">Seleccionar Columnas</h4>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                  <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: #334155; cursor: pointer;">
                    <input type="checkbox" [checked]="isColVisible('id')" (change)="toggleCol('id')"> ID
                  </label>
                  <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: #334155; cursor: pointer;">
                    <input type="checkbox" [checked]="isColVisible('nombre')" (change)="toggleCol('nombre')"> Nombre
                  </label>
                  <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: #334155; cursor: pointer;">
                    <input type="checkbox" [checked]="isColVisible('activo')" (change)="toggleCol('activo')"> Estado
                  </label>
                </div>
              </div>
            }
          </div>

          <!-- Dropdown de Exportar -->
          <div class="dropdown-wrapper" style="position: relative;">
            <button class="btn btn-secondary" (click)="toggleExportDropdown()" style="display: flex; align-items: center; gap: 0.3rem;">
              <span>⬇️</span> Exportar
            </button>
            @if (showExportOptions()) {
              <div class="column-selector-popover animate-slide-up" style="position: absolute; right: 0; top: 110%; background: white; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); overflow: hidden; width: 150px; z-index: 100;">
                <div class="dropdown-item" (click)="exportCSV()" style="padding: 0.6rem 1rem; font-size: 0.85rem; color: #334155; cursor: pointer; transition: background 0.15s;">Excel (CSV)</div>
                <div class="dropdown-item" (click)="exportPDF()" style="padding: 0.6rem 1rem; font-size: 0.85rem; color: #334155; cursor: pointer; transition: background 0.15s; border-top: 1px solid #f1f5f9;">PDF</div>
              </div>
            }
          </div>

          <!-- Botón Agregar -->
          <button class="btn btn-primary" (click)="openCreate()">+ Agregar</button>
        </div>
      </header>

      <!-- Tabla de Datos Premium -->
      <div class="content-card" style="margin-top: 1rem;">
        <table class="data-table">
          <thead>
            <tr>
              <th colspan="3" style="width: 150px;">Acciones</th>
              @if (isColVisible('id')) { <th>ID</th> }
              @if (isColVisible('nombre')) { <th>Nombre</th> }
              @if (isColVisible('activo')) { <th>Estado</th> }
            </tr>
          </thead>
          <tbody>
            @if (loading()) { 
              <tr><td colspan="6" class="empty-state">Cargando operarios...</td></tr> 
            }
            @else if (filteredItems().length === 0) { 
              <tr><td colspan="6" class="empty-state">No se encontraron operarios registrados</td></tr> 
            }
            @else {
              @for (item of filteredItems(); track item.id) {
                <tr>
                  <td style="width: 50px; padding-right: 0.25rem;">
                    <button class="action-btn view" (click)="view(item)">Ver</button>
                  </td>
                  <td style="width: 50px; padding-left: 0.25rem; padding-right: 0.25rem;">
                    <button class="action-btn edit" (click)="edit(item)">Editar</button>
                  </td>
                  <td style="width: 50px; padding-left: 0.25rem;">
                    <button class="action-btn delete" (click)="del(item)">Borrar</button>
                  </td>
                  @if (isColVisible('id')) { 
                    <td><code class="id-tag" style="background: #f1f5f9; padding: 0.2rem 0.4rem; border-radius: 4px; font-size: 0.78rem;">{{ item.id.substring(0,8) }}</code></td> 
                  }
                  @if (isColVisible('nombre')) { 
                    <td style="font-weight: 700; color: #1e293b;">{{ item.nombre }}</td> 
                  }
                  @if (isColVisible('activo')) {
                    <td>
                      <span 
                        class="status-indicator" 
                        [attr.data-status]="item.activo ? 'Activo' : 'Inactivo'"
                        style="padding: 0.25rem 0.6rem; border-radius: 9999px; font-size: 0.72rem; font-weight: 800; text-transform: uppercase;"
                        [style.background]="item.activo ? 'rgba(16, 185, 129, 0.1)' : 'rgba(148, 163, 184, 0.1)'"
                        [style.color]="item.activo ? '#10b981' : '#64748b'"
                      >
                        {{ item.activo ? 'Activo' : 'Inactivo' }}
                      </span>
                    </td>
                  }
                </tr>
              }
            }
          </tbody>
        </table>
      </div>

      <!-- Modal de Operario -->
      @if (showModal()) {
        <div class="modal-overlay" (click)="closeModal()">
          <div class="modal-card" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h3>{{ modalMode() === 'create' ? 'Nuevo Operario' : modalMode() === 'edit' ? 'Modificar Operario' : 'Operario' }}</h3>
              <button class="modal-close" (click)="closeModal()">✕</button>
            </div>
            <div class="modal-body">
              <label class="field-label">Nombre *</label>
              <input class="field-input" type="text" [(ngModel)]="form.nombre" [disabled]="modalMode()==='view'" placeholder="Nombre completo del operario..." />
              
              <label class="field-label" style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; margin-top: 0.5rem;">
                <input type="checkbox" [(ngModel)]="form.activo" [disabled]="modalMode()==='view'" />
                <span>Operario Activo</span>
              </label>
            </div>
            <div class="modal-footer">
              @if (modalMode() !== 'view') { 
                <button class="btn btn-primary" (click)="save()">Guardar</button> 
              }
              <button class="btn btn-secondary" (click)="closeModal()">Cerrar</button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .module-page { padding: 1.5rem 2.5rem; }
    .breadcrumb { font-size: .75rem; color: #94a3b8; font-weight: 600; text-transform: uppercase; margin-bottom: .25rem; }
    h1 { font-size: 1.8rem; font-weight: 800; color: #1e293b; margin: 0; }
    .module-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem; }
    .btn { padding: .5rem 1.2rem; border-radius: 8px; border: none; cursor: pointer; font-size: .875rem; font-weight: 600; transition: all .2s; }
    .btn-primary { background: #10b981; color: white; }
    .btn-primary:hover { background: #059669; }
    .btn-secondary { background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0; }
    .btn-secondary:hover { background: #e2e8f0; }
    .active-filter { background: rgba(16, 185, 129, 0.15) !important; color: #10b981 !important; border-color: rgba(16, 185, 129, 0.3) !important; }
    .content-card { background: white; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th { text-align: left; padding: .875rem 1rem; background: #f8fafc; color: #64748b; font-size: .75rem; font-weight: 700; border-bottom: 1px solid #e2e8f0; }
    .data-table td { padding: .75rem 1rem; border-bottom: 1px solid #f1f5f9; font-size: .875rem; color: #334155; }
    .data-table tr:hover td { background: #f8fafc; }
    .empty-state { text-align: center; padding: 2.5rem; color: #94a3b8; font-style: italic; }
    .action-btn { padding: .3rem .8rem; border-radius: 6px; border: none; cursor: pointer; font-size: .78rem; font-weight: 600; transition: all .15s; }
    .action-btn.view { background: #e0f2fe; color: #0369a1; }
    .action-btn.edit { background: #fef3c7; color: #92400e; }
    .action-btn.delete { background: #fee2e2; color: #991b1b; }
    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.4); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .modal-card { background: white; border-radius: 16px; width: 440px; box-shadow: 0 20px 60px rgba(0,0,0,.2); overflow: hidden; }
    .modal-header { padding: 1.25rem 1.5rem; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
    .modal-header h3 { margin: 0; font-size: 1.1rem; font-weight: 700; color: #1e293b; }
    .modal-close { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #94a3b8; }
    .modal-body { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
    .field-label { font-size: .8rem; font-weight: 600; color: #64748b; margin-bottom: .3rem; display: block; }
    .field-input { width: 100%; padding: .6rem .875rem; border-radius: 8px; border: 1px solid #e2e8f0; font-size: .875rem; outline: none; box-sizing: border-box; }
    .field-input:focus { border-color: #10b981; box-shadow: 0 0 0 3px rgba(16,185,129,.15); }
    .modal-footer { padding: 1rem 1.5rem; border-top: 1px solid #e2e8f0; display: flex; gap: .75rem; justify-content: flex-end; }
    .animate-move-up { animation: moveUp .3s ease; }
    @keyframes moveUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
    .dropdown-item:hover { background: #f1f5f9; }
  `]
})
export class OperariosCatalogoComponent implements OnInit {
  private svc = inject(ProduccionConfigService);
  
  items = signal<Operario[]>([]);
  loading = signal(true);
  showModal = signal(false);
  modalMode = signal<'view' | 'edit' | 'create'>('view');
  form: any = {};

  // Actions & Popover States
  searchText = signal<string>('');
  showActiveOnly = signal<boolean>(false);
  showColumnSelector = signal<boolean>(false);
  showExportOptions = signal<boolean>(false);
  
  visibleColumns = signal<string[]>(['nombre', 'activo']);

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.svc.getOperarios().subscribe({
      next: data => {
        this.items.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  filteredItems = computed(() => {
    let list = this.items();

    const search = this.searchText().trim().toLowerCase();
    if (search) {
      list = list.filter(op => op.nombre.toLowerCase().includes(search));
    }

    if (this.showActiveOnly()) {
      list = list.filter(op => op.activo);
    }

    return list;
  });

  // Toggles
  toggleActiveOnly() {
    this.showActiveOnly.update(v => !v);
  }

  toggleColumnDropdown() {
    this.showColumnSelector.update(v => !v);
    this.showExportOptions.set(false);
  }

  toggleExportDropdown() {
    this.showExportOptions.update(v => !v);
    this.showColumnSelector.set(false);
  }

  isColVisible(colName: string): boolean {
    return this.visibleColumns().includes(colName);
  }

  toggleCol(colName: string) {
    this.visibleColumns.update(cols => {
      if (cols.includes(colName)) {
        return cols.filter(c => c !== colName);
      } else {
        return [...cols, colName];
      }
    });
  }

  // CRUD
  view(item: Operario) {
    this.form = { ...item };
    this.modalMode.set('view');
    this.showModal.set(true);
  }

  edit(item: Operario) {
    this.form = { ...item };
    this.modalMode.set('edit');
    this.showModal.set(true);
  }

  openCreate() {
    this.form = { nombre: '', activo: true };
    this.modalMode.set('create');
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.form = {};
  }

  save() {
    const payload = {
      nombre: this.form.nombre,
      activo: this.form.activo
    };

    if (this.modalMode() === 'create') {
      this.svc.createOperario(payload).subscribe(() => {
        this.closeModal();
        this.load();
      });
    } else if (this.form.id) {
      this.svc.updateOperario(this.form.id, payload).subscribe(() => {
        this.closeModal();
        this.load();
      });
    }
  }

  del(item: Operario) {
    if (confirm(`¿Está seguro de eliminar al operario "${item.nombre}"?`)) {
      this.svc.deleteOperario(item.id).subscribe(() => this.load());
    }
  }

  // Export options
  exportCSV() {
    this.showExportOptions.set(false);
    let csvContent = '\uFEFFID;Nombre;Estado\n';
    this.filteredItems().forEach(op => {
      csvContent += `${op.id};${op.nombre};${op.activo ? 'Activo' : 'Inactivo'}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `operarios_reporte_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  exportPDF() {
    this.showExportOptions.set(false);
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    let tableRows = '';
    this.filteredItems().forEach(op => {
      tableRows += `
        <tr>
          <td>${op.id.substring(0,8)}</td>
          <td>${op.nombre}</td>
          <td>${op.activo ? 'Activo' : 'Inactivo'}</td>
        </tr>`;
    });

    printWindow.document.write(`
      <html>
        <head>
          <title>Reporte de Operarios</title>
          <style>
            body { font-family: sans-serif; padding: 2rem; color: #1e293b; }
            h1 { color: #10b981; margin-bottom: 0.5rem; }
            table { width: 100%; border-collapse: collapse; margin-top: 1.5rem; }
            th, td { padding: 8px 12px; border: 1px solid #cbd5e1; text-align: left; }
            th { background: #f1f5f9; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>Reporte de Operarios</h1>
          <p>Generado el: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
          <script>window.onload = function() { window.print(); window.close(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }
}
