import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventarioService, Silo } from '../../../core/services/inventario';
import { PdfExportService } from '../../../core/services/pdf-export.service';

@Component({
  selector: 'app-silos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up">
      <div class="page-header-premium">
        <div class="title-section">
          <h1 class="premium-title">🏺 Gestión de Silos</h1>
          <nav class="breadcrumb-modern">
            <span class="root">Inventarios</span>
            <span class="sep">></span>
            <span class="active">Silos</span>
          </nav>
        </div>
        
        <div class="toolbar-premium">
          <div class="btn-group-modern">
            <div class="dropdown-container">
              <button class="btn-legacy secondary" (click)="showExportSelector = !showExportSelector">📥 Exportar <span class="arrow">▼</span></button>
              <div class="column-selector-dropdown shadow-premium" *ngIf="showExportSelector" style="width: 150px;">
                <div class="column-list custom-scroll">
                  <div class="column-group">
                    <label class="item-label export-item" (click)="exportToCSV(); showExportSelector = false">📄 Excel (CSV)</label>
                    <label class="item-label export-item" (click)="exportToPDF(); showExportSelector = false">📕 PDF</label>
                  </div>
                </div>
              </div>
            </div>
            <button class="btn-legacy secondary" (click)="openModal()">Agregar</button>
            
            <!-- Selector de Columnas (Imagen 1) -->
            <div class="dropdown-container">
              <button class="btn-legacy primary" (click)="toggleColumnSelector()">Selecciona columnas <span class="arrow">▼</span></button>
              <div class="column-selector-dropdown shadow-premium" *ngIf="showColumnSelector">
                <div class="dropdown-header">
                  <input type="text" placeholder="Filtrar..." class="search-mini">
                </div>
                <div class="column-list custom-scroll">
                  <div class="column-group">
                    <label class="group-label"><input type="checkbox" checked disabled> Fijas a la izquierda</label>
                    <label class="item-label"><input type="checkbox" checked disabled> (Ninguna)</label>
                  </div>
                  <div class="column-group">
                    <label class="group-label"><input type="checkbox" [checked]="allNonFixedVisible()" (change)="toggleAllNonFixed()"> No fijas</label>
                    <div class="items">
                      <label *ngFor="let col of columns" class="item-label">
                        <input type="checkbox" [(ngModel)]="col.visible"> {{ col.label }}
                      </label>
                    </div>
                  </div>
                </div>
                <div class="dropdown-footer">
                  <button class="btn-reset" (click)="resetColumns()">↺</button>
                  <button class="btn-update" (click)="showColumnSelector = false">Actualizar</button>
                </div>
              </div>
            </div>
          </div>
          <div class="search-modern">
            <input type="text" placeholder="Buscar..." [(ngModel)]="searchQuery">
            <span class="search-icon">🔍</span>
          </div>
        </div>
      </div>

      <!-- Modal Legacy (Imagen 2) -->
      <div class="modal-overlay" *ngIf="showModal" (click)="closeModal()">
        <div class="modal-card legacy-card animate-scale-in" (click)="$event.stopPropagation()">
          <div class="modal-header-legacy">
            <span class="header-icon">🏗️</span> 
            {{ modalMode === 'VIEW' ? 'Visualizar Silo' : modalMode === 'EDIT' ? 'Modificar Silo' : modalMode === 'DELETE' ? 'Eliminar Silo' : 'Agregar Silo' }}
          </div>
          <form (ngSubmit)="handleModalSubmit()">
            <div class="modal-body-legacy custom-scroll">
              
              <div class="alert-delete" *ngIf="modalMode === 'DELETE'">
                ⚠️ ¿Está seguro que desea eliminar este silo? Esta acción no se puede deshacer.
              </div>

              <div class="form-row">
                <label class="legacy-label">Código *</label>
                <input type="text" class="legacy-input" [(ngModel)]="newSilo.codigo" name="codigo" required [disabled]="modalMode === 'VIEW' || modalMode === 'DELETE'">
              </div>

              <div class="form-row">
                <label class="legacy-label">Nombre *</label>
                <input type="text" class="legacy-input" [(ngModel)]="newSilo.nombre" name="nombre" required [disabled]="modalMode === 'VIEW' || modalMode === 'DELETE'">
              </div>

              <div class="form-row">
                <label class="legacy-label">Capacidad (kg)</label>
                <input type="number" class="legacy-input" [(ngModel)]="newSilo.capacidadMaxima" name="capacidad" [disabled]="modalMode === 'VIEW' || modalMode === 'DELETE'">
              </div>

              <div class="form-row">
                <label class="legacy-label">Mínimo (kg)</label>
                <input type="number" class="legacy-input" [(ngModel)]="newSilo.kgMinimo" name="minimo" [disabled]="modalMode === 'VIEW' || modalMode === 'DELETE'">
              </div>

              <div class="form-row">
                <label class="legacy-label">Máximo (kg)</label>
                <input type="number" class="legacy-input" [(ngModel)]="newSilo.kgMaximo" name="maximo" [disabled]="modalMode === 'VIEW' || modalMode === 'DELETE'">
              </div>

              <div class="form-row">
                <label class="legacy-label">Estado Material</label>
                <select class="legacy-select" [(ngModel)]="newSilo.estadoMaterial" name="estadoMat" [disabled]="modalMode === 'VIEW' || modalMode === 'DELETE'">
                  <option value="Virgen (pelet)">Virgen (pelet)</option>
                  <option value="Molido">Molido</option>
                  <option value="Mezcla">Mezcla</option>
                </select>
              </div>

              <div class="form-row">
                <label class="legacy-label">Tipo de Material</label>
                <select class="legacy-select" [(ngModel)]="newSilo.tipoMaterial" name="tipoMat" [disabled]="modalMode === 'VIEW' || modalMode === 'DELETE'">
                  <option value="PCR">PCR</option>
                  <option value="HDPE">HDPE</option>
                  <option value="PP">PP</option>
                </select>
              </div>

              <div class="form-row">
                <label class="legacy-label">Activo</label>
                <input type="checkbox" class="legacy-checkbox" [(ngModel)]="newSilo.activo" name="activo" [disabled]="modalMode === 'VIEW' || modalMode === 'DELETE'">
              </div>

            </div>
            <div class="modal-footer-legacy">
              <button type="submit" class="btn-confirm" *ngIf="modalMode !== 'VIEW'" [class.btn-danger]="modalMode === 'DELETE'">
                {{ modalMode === 'DELETE' ? 'ELIMINAR' : 'CONFIRMAR' }}
              </button>
              <button type="button" class="btn-cancel" (click)="closeModal()">{{ modalMode === 'VIEW' ? 'CERRAR' : 'CANCELAR' }}</button>
            </div>
          </form>
        </div>
      </div>

      <div class="content-container">
        <div class="table-card shadow-premium">
          <table class="premium-grid">
            <thead>
              <tr>
                <th class="text-center sticky-col">Archivar</th>
                <th class="text-center sticky-col">Visualizar</th>
                <th *ngIf="isColVisible('nombre')">Nombre</th>
                <th *ngIf="isColVisible('capacidad')" class="text-right">Capacidad (kg)</th>
                <th *ngIf="isColVisible('minimo')" class="text-right">Mínimo (kg)</th>
                <th *ngIf="isColVisible('maximo')" class="text-right">Máximo (kg)</th>
                <th *ngIf="isColVisible('estadoMat')">Estado de Material</th>
                <th *ngIf="isColVisible('tipoMat')">Tipo de Material</th>
                <th *ngIf="isColVisible('activo')" class="text-center">Silo Activo</th>
                <th class="text-center">Modificar</th>
                <th class="text-center">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let s of filteredSilos" class="grid-row">
                <td class="text-center"><button class="link-btn archive" (click)="archiveSilo(s)">Archivar</button></td>
                <td class="text-center"><button class="link-btn view" (click)="openModal('VIEW', s)">Visualizar</button></td>
                
                <td *ngIf="isColVisible('nombre')" class="font-semibold">{{ s.nombre }}</td>
                <td *ngIf="isColVisible('capacidad')" class="text-right font-mono">{{ s.capacidadMaxima | number:'1.2-2' }}</td>
                <td *ngIf="isColVisible('minimo')" class="text-right font-mono">{{ s.kgMinimo | number:'1.2-2' }}</td>
                <td *ngIf="isColVisible('maximo')" class="text-right font-mono">{{ s.kgMaximo | number:'1.2-2' }}</td>
                <td *ngIf="isColVisible('estadoMat')">{{ s.estadoMaterial }}</td>
                <td *ngIf="isColVisible('tipoMat')">{{ s.tipoMaterial }}</td>
                <td *ngIf="isColVisible('activo')" class="text-center">
                  <div class="legacy-check-display" [class.checked]="s.activo"></div>
                </td>
                
                <td class="text-center"><button class="link-btn edit" (click)="openModal('EDIT', s)">Modificar</button></td>
                <td class="text-center"><button class="link-btn delete" (click)="openModal('DELETE', s)">Eliminar</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .module-page { padding: 3rem; background: #fdfdfd; min-height: 100vh; font-family: 'Open Sans', Arial, sans-serif; position: relative; }
    .page-header-premium { margin-bottom: 3rem; border-bottom: 2px solid #f0f0f0; padding-bottom: 1.5rem; }
    .premium-title { font-size: 2.2rem; color: #2c3e50; margin: 0; font-weight: 700; letter-spacing: -0.5px; }
    .breadcrumb-modern { font-size: 1rem; color: #7f8c8d; margin-top: 0.5rem; }

    .toolbar-premium { 
      display: flex; justify-content: space-between; align-items: center; 
      margin-top: 2rem; gap: 1rem; flex-wrap: wrap;
    }
    .btn-group-modern { display: flex; gap: 1.2rem; align-items: center; }
    
    .btn-legacy {
      padding: 0.8rem 1.6rem; border-radius: 8px; font-size: 1.1rem; cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); border: 1px solid #dcdde1; 
      background: #fff; color: #2f3640; font-weight: 600;
      display: flex; align-items: center; gap: 0.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .btn-legacy:hover { 
      transform: translateY(-2px); 
      box-shadow: 0 4px 12px rgba(0,0,0,0.1); 
      border-color: #5cb85c;
    }
    .btn-legacy.primary { background: #5cb85c; color: white; border-color: #4cae4c; }
    
    .dropdown-container { position: relative; }
    .premium-grid { width: 100%; border-collapse: separate; border-spacing: 0; border: 1px solid #f0f0f0; border-radius: 12px; overflow: hidden; }
    .premium-grid th { 
      padding: 1.2rem 1rem; background: #f8f9fa; text-align: left; 
      font-size: 0.95rem; font-weight: 700; color: #34495e; 
      border-bottom: 2px solid #edf2f7; text-transform: uppercase; letter-spacing: 0.5px;
    }
    .grid-row { transition: background 0.2s; }
    .grid-row:hover { background: #f9fbf9 !important; }
    .grid-row td { padding: 1.2rem 1rem; font-size: 1.05rem; color: #2c3e50; border-bottom: 1px solid #f0f0f0; }

    .link-btn { 
      background: #f1f2f6; border: none; color: #5cb85c; padding: 0.5rem 1rem; 
      border-radius: 6px; cursor: pointer; font-size: 0.95rem; font-weight: 600;
      transition: all 0.2s;
    }
    .link-btn:hover { background: #5cb85c; color: white; }

    .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(4px); }
    .legacy-card { background: white; width: 90%; max-width: 800px; border-radius: 12px; border: 1px solid #eee; box-shadow: 0 20px 40px rgba(0,0,0,0.2); overflow: hidden; }
    .modal-header-legacy { padding: 1.5rem 2rem; background: #fcfcfc; border-bottom: 1px solid #eee; color: #2c3e50; font-size: 1.3rem; font-weight: 700; display: flex; align-items: center; gap: 1rem; }
    .modal-body-legacy { padding: 2.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
    .form-row { border-bottom: 1px solid #f5f5f5; padding-bottom: 1rem; display: flex; flex-direction: column; gap: 0.6rem; }
    .legacy-label { font-size: 0.9rem; color: #7f8c8d; font-weight: 600; }
    .legacy-input, .legacy-select { border: 1px solid #edf2f7; background: #f8fafc; border-radius: 8px; padding: 0.8rem 1rem; width: 100%; outline: none; font-size: 1rem; transition: border-color 0.2s; }
    .legacy-input:focus { border-color: #5cb85c; background: #fff; }
    .modal-footer-legacy { padding: 1.5rem 2.5rem; background: #fcfcfc; display: flex; justify-content: flex-end; gap: 1rem; border-top: 1px solid #eee; }
    
    .search-modern { position: relative; width: 350px; }
    .search-modern input { 
      width: 100%; padding: 0.9rem 1.5rem 0.9rem 3rem; 
      border: 2px solid #edf2f7; border-radius: 10px; font-size: 1.1rem;
    }
    .search-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); font-size: 1.2rem; opacity: 0.5; }
    .text-right { text-align: right; }
    .text-center { text-align: center; }
    .font-mono { font-family: 'JetBrains Mono', monospace; font-weight: 600; }
    .arrow { font-size: 0.8rem; margin-left: 0.6rem; transition: transform 0.3s; }
    .dropdown-container:hover .arrow { transform: rotate(180deg); }

    .alert-delete {
      background: #fdf2f2; border: 1px solid #f8b4b4; color: #9b1c1c;
      padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; font-size: 1rem;
      font-weight: 600; grid-column: span 2;
    }
    .btn-confirm { background: #5cb85c; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 6px; font-weight: 600; cursor: pointer; }
    .btn-cancel { background: #f1f2f6; border: none; padding: 0.8rem 1.5rem; border-radius: 6px; font-weight: 600; cursor: pointer; }
    .btn-danger { background: #d9534f !important; border-color: #d43f3a !important; }
  `]
})
export class SilosComponent implements OnInit {
  private inventarioService = inject(InventarioService);
  private pdfService = inject(PdfExportService);
  private cdr = inject(ChangeDetectorRef);
  
  searchQuery = '';
  silos: Silo[] = [];
  showModal = false;
  showColumnSelector = false;
  showExportSelector = false;
  modalMode: 'ADD' | 'VIEW' | 'EDIT' | 'DELETE' = 'ADD';
  
  newSilo: Partial<Silo> = this.getDefaultSilo();

  columns = [
    { id: 'nombre', label: 'Nombre', visible: true },
    { id: 'capacidad', label: 'Capacidad (kg)', visible: true },
    { id: 'minimo', label: 'Mínimo (kg)', visible: true },
    { id: 'maximo', label: 'Máximo (kg)', visible: true },
    { id: 'estadoMat', label: 'Estado de Material', visible: true },
    { id: 'tipoMat', label: 'Tipo de Material', visible: true },
    { id: 'activo', label: 'Silo Activo', visible: true }
  ];

  ngOnInit() {
    this.loadSilos();
  }

  loadSilos() {
    this.inventarioService.getSilos().subscribe({
      next: (data) => {
        this.silos = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar silos:', err)
    });
  }

  getDefaultSilo(): Partial<Silo> {
    return {
      nombre: '',
      codigo: '',
      capacidadMaxima: 0,
      kgMinimo: 0,
      kgMaximo: 0,
      estadoMaterial: 'Virgen (pelet)',
      tipoMaterial: 'PCR',
      activo: true
    };
  }

  openModal(mode: 'ADD' | 'VIEW' | 'EDIT' | 'DELETE' = 'ADD', item: Silo | null = null) { 
    this.modalMode = mode;
    if (item) {
      this.newSilo = { ...item };
    } else {
      this.newSilo = this.getDefaultSilo();
    }
    this.showModal = true; 
    this.cdr.detectChanges();
  }

  closeModal() { 
    this.showModal = false; 
    this.newSilo = this.getDefaultSilo(); 
    this.cdr.detectChanges();
  }

  handleModalSubmit() {
    if (this.modalMode === 'VIEW') {
      this.closeModal();
      return;
    }
    if (this.modalMode === 'DELETE') {
      this.executeDelete();
      return;
    }
    this.saveSilo();
  }

  saveSilo() {
    if (!this.newSilo.nombre) return;
    
    const obs = (this.modalMode === 'EDIT' && this.newSilo.id)
      ? this.inventarioService.updateSilo(this.newSilo.id, this.newSilo)
      : this.inventarioService.createSilo(this.newSilo);

    obs.subscribe({
      next: () => { 
        this.loadSilos(); 
        this.closeModal(); 
      },
      error: (err) => alert('Error: ' + err.message)
    });
  }

  executeDelete() {
    if (this.newSilo.id) {
      this.inventarioService.deleteSilo(this.newSilo.id).subscribe({
        next: () => {
          this.loadSilos();
          this.closeModal();
        },
        error: (err) => alert('Error al eliminar: ' + err.message)
      });
    }
  }

  deleteSilo(silo: Silo) {
    this.openModal('DELETE', silo);
  }

  editSilo(silo: Silo) {
    this.newSilo = { ...silo };
    this.showModal = true;
  }

  archiveSilo(silo: Silo) {
    if (confirm(`¿Desea archivar el silo ${silo.nombre}?`)) {
      this.inventarioService.createSilo({ ...silo, activo: false }).subscribe(() => this.loadSilos());
    }
  }

  // Lógica del Selector de Columnas
  toggleColumnSelector() {
    this.showColumnSelector = !this.showColumnSelector;
  }

  isColVisible(id: string): boolean {
    return this.columns.find(c => c.id === id)?.visible || false;
  }

  allNonFixedVisible(): boolean {
    return this.columns.every(c => c.visible);
  }

  toggleAllNonFixed() {
    const target = !this.allNonFixedVisible();
    this.columns.forEach(c => c.visible = target);
  }

  resetColumns() {
    this.columns.forEach(c => c.visible = true);
  }

  get filteredSilos() {
    const q = (this.searchQuery || '').toLowerCase();
    return this.silos.filter(s => 
      (s.nombre || '').toLowerCase().includes(q) || 
      (s.codigo || '').toLowerCase().includes(q)
    );
  }

  exportToCSV() {
    if (this.silos.length === 0) return;
    const headers = ['Nombre', 'Código', 'Capacidad (kg)', 'Existencia Actual', 'Mínimo (kg)', 'Máximo (kg)', 'Estado Material', 'Tipo Material', 'Activo'];
    const rows = this.filteredSilos.map(s => [
      s.nombre || '',
      s.codigo || '',
      s.capacidadMaxima?.toString() || '0',
      s.existenciaActual?.toString() || '0',
      s.kgMinimo?.toString() || '0',
      s.kgMaximo?.toString() || '0',
      s.estadoMaterial || '',
      s.tipoMaterial || '',
      s.activo ? 'Si' : 'No'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Silos_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  exportToPDF() {
    if (this.silos.length === 0) return;
    const headers = ['Nombre', 'Código', 'Capacidad', 'Stock Actual', 'Mínimo', 'Máximo', 'Material'];
    const data = this.filteredSilos.map(s => [
      s.nombre || '',
      s.codigo || '',
      s.capacidadMaxima?.toString() || '0',
      s.existenciaActual?.toString() || '0',
      s.kgMinimo?.toString() || '0',
      s.kgMaximo?.toString() || '0',
      s.tipoMaterial || ''
    ]);

    this.pdfService.exportTable(
      'Gestión de Silos - Reporte',
      headers,
      data,
      `Silos_Report_${new Date().toISOString().split('T')[0]}.pdf`
    );
  }
}
