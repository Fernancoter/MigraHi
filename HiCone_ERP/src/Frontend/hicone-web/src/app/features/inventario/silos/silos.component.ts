import { Component, OnInit, inject } from '@angular/core';
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

      <!-- Modal para Gestionar Silo (Imagen 2) -->
      <div class="modal-overlay" *ngIf="showModal" (click)="closeModal()">
        <div class="modal-card legacy-card animate-scale-in" (click)="$event.stopPropagation()">
          <div class="modal-header-legacy">
            <span class="header-icon">🏷️</span> Información General
          </div>
          <form (ngSubmit)="saveSilo()">
            <div class="modal-body-legacy">
              <div class="form-row">
                <label class="legacy-label">Id</label>
                <div class="readonly-val">{{ newSilo.id || '0' }}</div>
              </div>

              <div class="form-row">
                <label class="legacy-label">Silo Activo</label>
                <input type="checkbox" class="legacy-checkbox" [(ngModel)]="newSilo.activo" name="activo">
              </div>

              <div class="form-row">
                <label class="legacy-label">Nombre</label>
                <input type="text" class="legacy-input" [(ngModel)]="newSilo.nombre" name="nombre" required>
              </div>

              <div class="form-row">
                <label class="legacy-label">Capacidad (kg)</label>
                <input type="number" class="legacy-input" [(ngModel)]="newSilo.capacidadMaxima" name="capacidad">
              </div>

              <div class="form-row">
                <label class="legacy-label">Mínimo (kg)</label>
                <input type="number" class="legacy-input" [(ngModel)]="newSilo.kgMinimo" name="minimo">
              </div>

              <div class="form-row">
                <label class="legacy-label">Máximo (kg)</label>
                <input type="number" class="legacy-input" [(ngModel)]="newSilo.kgMaximo" name="maximo">
              </div>

              <div class="form-row">
                <label class="legacy-label">Estado Material</label>
                <select class="legacy-select" [(ngModel)]="newSilo.estadoMaterial" name="estadoMat">
                  <option value="Virgen (pelet)">Virgen (pelet)</option>
                  <option value="Molido">Molido</option>
                  <option value="Mezcla">Mezcla</option>
                </select>
              </div>

              <div class="form-row">
                <label class="legacy-label">Material</label>
                <select class="legacy-select" [(ngModel)]="newSilo.tipoMaterial" name="tipoMat">
                  <option value="PCR">PCR</option>
                  <option value="HDPE">HDPE</option>
                  <option value="PP">PP</option>
                </select>
              </div>
            </div>
            <div class="modal-footer-legacy">
              <button type="submit" class="btn-confirm">CONFIRMAR</button>
              <button type="button" class="btn-cancel" (click)="closeModal()">CANCELAR</button>
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
                <td class="text-center"><button class="link-btn view">Visualizar</button></td>
                
                <td *ngIf="isColVisible('nombre')" class="font-semibold">{{ s.nombre }}</td>
                <td *ngIf="isColVisible('capacidad')" class="text-right font-mono">{{ s.capacidadMaxima | number:'1.2-2' }}</td>
                <td *ngIf="isColVisible('minimo')" class="text-right font-mono">{{ s.kgMinimo | number:'1.2-2' }}</td>
                <td *ngIf="isColVisible('maximo')" class="text-right font-mono">{{ s.kgMaximo | number:'1.2-2' }}</td>
                <td *ngIf="isColVisible('estadoMat')">{{ s.estadoMaterial }}</td>
                <td *ngIf="isColVisible('tipoMat')">{{ s.tipoMaterial }}</td>
                <td *ngIf="isColVisible('activo')" class="text-center">
                  <div class="legacy-check-display" [class.checked]="s.activo"></div>
                </td>
                
                <td class="text-center"><button class="link-btn edit" (click)="editSilo(s)">Modificar</button></td>
                <td class="text-center"><button class="link-btn delete">Eliminar</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .module-page { padding: 2rem; background: #fff; min-height: 100vh; font-family: 'Open Sans', Arial, sans-serif; }
    
    .page-header-premium { margin-bottom: 2rem; border-bottom: 1px solid #eee; padding-bottom: 1rem; }
    .premium-title { font-size: 1.5rem; color: #5cb85c; margin: 0; font-weight: 400; }
    .breadcrumb-modern { font-size: 0.85rem; color: #999; margin-top: 0.25rem; }
    .breadcrumb-modern .active { color: #999; }

    .toolbar-premium { display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; }
    .btn-group-modern { display: flex; gap: 0.75rem; }
    
    .btn-legacy {
      padding: 0.5rem 1rem; border-radius: 4px; font-size: 0.9rem; cursor: pointer;
      transition: all 0.2s; border: 1px solid #ccc; background: #fff; color: #5cb85c;
    }
    .btn-legacy.primary { background: #5cb85c; color: white; border-color: #4cae4c; }
    .btn-legacy.primary:hover { background: #449d44; }
    .btn-legacy.secondary:hover { background: #f9f9f9; border-color: #adadad; }
    .btn-legacy .arrow { font-size: 0.7rem; margin-left: 0.5rem; opacity: 0.7; }

    .dropdown-container { position: relative; }
    .column-selector-dropdown {
      position: absolute; top: 110%; right: 0; width: 250px; background: white;
      border: 1px solid #ccc; border-radius: 4px; z-index: 100; padding: 1rem;
    }
    .dropdown-header { margin-bottom: 1rem; }
    .search-mini { width: 100%; padding: 0.4rem; border: 1px solid #eee; border-radius: 4px; }
    .column-list { max-height: 300px; overflow-y: auto; }
    .column-group { margin-bottom: 0.75rem; }
    .group-label { display: flex; align-items: center; gap: 0.5rem; font-weight: 700; font-size: 0.85rem; color: #333; }
    .items { padding-left: 1.5rem; display: flex; flex-direction: column; gap: 0.4rem; }
    .item-label { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: #666; cursor: pointer; }
    .dropdown-footer { margin-top: 1rem; border-top: 1px solid #eee; padding-top: 0.75rem; display: flex; gap: 0.5rem; }
    .btn-reset { background: #5cb85c; color: white; border: none; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer; }
    .btn-update { background: #5cb85c; color: white; border: none; padding: 0.4rem; flex-grow: 1; border-radius: 4px; font-weight: 700; cursor: pointer; }

    .premium-grid { width: 100%; border-collapse: collapse; border: 1px solid #eee; }
    .premium-grid th { padding: 1rem; background: #fff; text-align: left; font-size: 0.85rem; font-weight: 400; color: #333; border: 1px solid #eee; }
    .grid-row td { padding: 1rem; font-size: 0.85rem; color: #333; border: 1px solid #eee; }
    .link-btn { background: none; border: none; color: #5cb85c; cursor: pointer; font-size: 0.85rem; text-decoration: none; }
    .link-btn:hover { text-decoration: underline; }

    /* Modal Legacy (Imagen 2) */
    .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .legacy-card { background: white; width: 90%; max-width: 1000px; border-radius: 4px; border: 1px solid #ccc; }
    .modal-header-legacy { padding: 1rem; background: #f9f9f9; border-bottom: 1px solid #eee; color: #5cb85c; font-size: 0.9rem; }
    .modal-body-legacy { padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; }
    .form-row { border-bottom: 1px solid #eee; padding-bottom: 1rem; display: flex; flex-direction: column; gap: 0.5rem; }
    .legacy-label { font-size: 0.8rem; color: #999; }
    .readonly-val { font-size: 0.9rem; color: #333; }
    .legacy-input, .legacy-select { border: none; border-bottom: 1px solid #eee; padding: 0.5rem 0; width: 100%; outline: none; font-size: 0.9rem; }
    .legacy-input:focus { border-bottom-color: #5cb85c; }
    .legacy-checkbox { width: 1.2rem; height: 1.2rem; cursor: pointer; accent-color: #5cb85c; }
    .modal-footer-legacy { padding: 1rem; display: flex; gap: 0.5rem; }
    .btn-confirm { background: #5cb85c; color: white; border: none; padding: 0.6rem 1.5rem; border-radius: 4px; font-size: 0.85rem; cursor: pointer; }
    .btn-cancel { background: #777; color: white; border: none; padding: 0.6rem 1.5rem; border-radius: 4px; font-size: 0.85rem; cursor: pointer; }

    .legacy-check-display { width: 16px; height: 16px; border: 1px solid #ccc; margin: 0 auto; position: relative; }
    .legacy-check-display.checked::after { content: '✓'; position: absolute; top: -4px; left: 2px; color: #5cb85c; font-weight: bold; }

    .search-modern { position: relative; width: 250px; }
    .search-modern input { width: 100%; padding: 0.5rem 1rem 0.5rem 2.5rem; border: 1px solid #ccc; border-radius: 4px; }
    .search-icon { position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); opacity: 0.4; }

    .export-item { padding: 0.5rem; cursor: pointer; display: block; font-size: 0.85rem; color: #333; }
    .export-item:hover { background: #f1f5f9; }
  `]
})
export class SilosComponent implements OnInit {
  private inventarioService = inject(InventarioService);
  private pdfService = inject(PdfExportService);
  
  searchQuery = '';
  silos: Silo[] = [];
  showModal = false;
  showColumnSelector = false;
  showExportSelector = false;
  
  newSilo: Partial<Silo> = this.getDefaultSilo();

  // Configuración de columnas (Imagen 1)
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
    console.log('Cargando silos desde el servicio...');
    this.inventarioService.getSilos().subscribe({
      next: (data) => {
        console.log('Silos cargados exitosamente:', data);
        this.silos = data;
      },
      error: (err) => {
        console.error('Error al cargar silos:', err);
        // Fallback or alert if necessary
      }
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

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.newSilo = this.getDefaultSilo();
  }

  saveSilo() {
    if (!this.newSilo.nombre) {
      alert('El nombre del silo es obligatorio');
      return;
    }
    
    console.log('Intentando guardar silo:', this.newSilo);
    
    if (this.newSilo.id) {
      this.inventarioService.updateSilo(this.newSilo.id, this.newSilo).subscribe({
        next: (res) => {
          this.loadSilos();
          this.closeModal();
        },
        error: (err) => {
          alert('Hubo un error al actualizar el silo. Revisa la consola.');
        }
      });
    } else {
      this.inventarioService.createSilo(this.newSilo).subscribe({
        next: (res) => {
          this.loadSilos();
          this.closeModal();
        },
        error: (err) => {
          alert('Hubo un error al guardar el silo. Revisa la consola.');
        }
      });
    }
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
