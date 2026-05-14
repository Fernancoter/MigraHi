import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventarioService, Lote, Silo } from '../../../core/services/inventario';
import { PdfExportService } from '../../../core/services/pdf-export.service';

@Component({
  selector: 'app-lotes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up">
      <div class="page-header-premium">
        <div class="title-section">
          <h1 class="premium-title">📦 Lote</h1>
          <nav class="breadcrumb-modern">
            <span class="root">Inventarios</span>
            <span class="sep">></span>
            <span class="active">Lotes</span>
          </nav>
        </div>
        
        <div class="toolbar-premium">
          <div class="btn-group-modern">
            <div class="dropdown-container">
              <button class="btn-legacy secondary" (click)="showExportSelector = !showExportSelector">📥 Exportar <span class="arrow">▼</span></button>
              <div class="export-dropdown shadow-premium" *ngIf="showExportSelector">
                <div class="export-option" (click)="exportToCSV(); showExportSelector = false">
                  📊 Excel (CSV)
                </div>
                <div class="export-option" (click)="exportToPDF(); showExportSelector = false">
                  📕 PDF
                </div>
              </div>
            </div>
            <button class="btn-legacy secondary" (click)="openModal()">Agregar</button>
            <div class="dropdown-container">
              <button class="btn-legacy primary" (click)="toggleColumnSelector()">Selecciona columnas <span class="arrow">▼</span></button>
              <div class="column-selector-dropdown shadow-premium" *ngIf="showColumnSelector">
                <div class="dropdown-header"><input type="text" placeholder="Filtrar..." class="search-mini"></div>
                <div class="column-list custom-scroll">
                  <div class="column-group">
                    <label class="group-label"><input type="checkbox" checked disabled> Fijas a la izquierda</label>
                    <label class="item-label"><input type="checkbox" checked disabled> (Ninguna)</label>
                  </div>
                  <div class="column-group">
                    <label class="group-label"><input type="checkbox" [checked]="allColsVisible()" (change)="toggleAllCols()"> No fijas</label>
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

      <!-- Modal Gestionar Lote (Fiel a Imagen 1) -->
      <div class="modal-overlay" *ngIf="showModal" (click)="closeModal()">
        <div class="modal-card legacy-card animate-scale-in" (click)="$event.stopPropagation()">
          <div class="modal-header-legacy">
            <span class="header-icon">🏷️</span> 
            {{ modalMode === 'VIEW' ? 'Visualizar Lote' : modalMode === 'EDIT' ? 'Modificar Lote' : modalMode === 'DELETE' ? 'Eliminar Lote' : 'Agregar Lote' }}
          </div>
          <form (ngSubmit)="handleModalSubmit()">
            <div class="modal-body-legacy custom-scroll">
              
              <div class="alert-delete" *ngIf="modalMode === 'DELETE'">
                ⚠️ ¿Está seguro que desea eliminar este lote? Esta acción no se puede deshacer.
              </div>

              <!-- Silo Selection -->
              <div class="form-row">
                <label class="legacy-label">Silo</label>
                <select class="legacy-select" [(ngModel)]="newLote.loteSiloId" name="silo" (change)="onSiloChange()" [disabled]="modalMode === 'VIEW' || modalMode === 'DELETE'">
                  <option value="">Seleccione un silo...</option>
                  <option *ngFor="let s of silos" [value]="s.id">{{ s.nombre }} ({{ s.codigo }})</option>
                </select>
              </div>

              <!-- Silo Helpers -->
              <div class="form-grid-2">
                <div class="form-row">
                  <label class="legacy-label">Máximo (kg)</label>
                  <div class="readonly-text">{{ (selectedSilo?.kgMaximo | number:'1.2-2') || '0.00' }}</div>
                </div>
                <div class="form-row">
                  <label class="legacy-label">Estado Material</label>
                  <div class="readonly-text">{{ selectedSilo?.estadoMaterial || '---' }}</div>
                </div>
              </div>

              <!-- Embarque and Consumido -->
              <div class="form-grid-2">
                <div class="form-row">
                  <label class="legacy-label">No. Embarque *</label>
                  <input type="text" class="legacy-input" [(ngModel)]="newLote.loteEmbarque" name="embarque" required [disabled]="modalMode === 'VIEW' || modalMode === 'DELETE'">
                </div>
                <div class="form-row">
                  <label class="legacy-label">Consumido *</label>
                  <div class="checkbox-container-legacy">
                    <input type="checkbox" class="legacy-checkbox" [(ngModel)]="newLote.loteConsumido" name="consumido" [disabled]="modalMode === 'VIEW' || modalMode === 'DELETE'">
                  </div>
                </div>
              </div>

              <div class="form-row">
                <label class="legacy-label">Fecha Registro *</label>
                <input type="date" class="legacy-input" [ngModel]="newLote.loteFechaRegistro | date:'yyyy-MM-dd'" (ngModelChange)="newLote.loteFechaRegistro = $event" name="fecha" required [disabled]="modalMode === 'VIEW' || modalMode === 'DELETE'">
              </div>

              <div class="form-row">
                <label class="legacy-label">Kg *</label>
                <input type="number" class="legacy-input" [(ngModel)]="newLote.loteKg" name="kg" required [disabled]="modalMode === 'VIEW' || modalMode === 'DELETE'">
              </div>

              <div class="form-row">
                <label class="legacy-label">Paquete Aditivos *</label>
                <select class="legacy-select" [(ngModel)]="newLote.lotePaqueteAditivos" name="aditivos" [disabled]="modalMode === 'VIEW' || modalMode === 'DELETE'">
                  <option value="No Aplica">No Aplica</option>
                  <option value="Llorens-MB1">Llorens-MB1</option>
                  <option value="CCP-07A-164040 L">CCP-07A-164040 L</option>
                </select>
              </div>

              <div class="form-row">
                <label class="legacy-label">Tipo de Material *</label>
                <select class="legacy-select" [(ngModel)]="newLote.loteTipoMaterial" name="tipoMat" [disabled]="modalMode === 'VIEW' || modalMode === 'DELETE'">
                  <option value="PCR">PCR</option>
                  <option value="HDPE">HDPE</option>
                  <option value="PP">PP</option>
                  <option value="Mezcla">Mezcla</option>
                </select>
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
                <th class="text-center">Archivar</th>
                <th class="text-center">Visualizar</th>
                <th *ngIf="isColVisible('loteNo')">Lote NO.</th>
                <th *ngIf="isColVisible('lotePO')">Lote PO.</th>
                <th *ngIf="isColVisible('fecha')">Fecha Registro</th>
                <th *ngIf="isColVisible('trunk')">Trunk No</th>
                <th *ngIf="isColVisible('tipoMat')">Tipo Material</th>
                <th *ngIf="isColVisible('silo')">Silo</th>
                <th *ngIf="isColVisible('kg')" class="text-right">Kg</th>
                <th *ngIf="isColVisible('consumido')" class="text-center">Consumido</th>
                <th *ngIf="isColVisible('aditivos')">Paquete Aditivos</th>
                <th class="text-center">Modificar</th>
                <th class="text-center">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of filteredLotes" class="grid-row" [class.row-consumido]="item.loteConsumido">
                <td class="text-center"><button class="link-btn archive">Archivar</button></td>
                <td class="text-center"><button class="link-btn view" (click)="openModal('VIEW', item)">Visualizar</button></td>
                <td *ngIf="isColVisible('loteNo')" class="font-bold text-green-600">{{ item.loteEmbarque }}</td>
                <td *ngIf="isColVisible('lotePO')">{{ item.lotePO || '---' }}</td>
                <td *ngIf="isColVisible('fecha')">{{ item.loteFechaRegistro | date:'dd/MM/yy' }}</td>
                <td *ngIf="isColVisible('trunk')">{{ item.loteTrunkNo || '---' }}</td>
                <td *ngIf="isColVisible('tipoMat')"><span class="badge-legacy">{{ item.loteTipoMaterial }}</span></td>
                <td *ngIf="isColVisible('silo')">{{ getSiloNombre(item.loteSiloId) }}</td>
                <td *ngIf="isColVisible('kg')" class="text-right font-mono font-bold">{{ item.loteKg | number:'1.2-2' }}</td>
                <td *ngIf="isColVisible('consumido')" class="text-center">
                   <div class="legacy-check-display" [class.checked]="item.loteConsumido"></div>
                </td>
                <td *ngIf="isColVisible('aditivos')">{{ item.lotePaqueteAditivos || '---' }}</td>
                <td class="text-center"><button class="link-btn edit" (click)="openModal('EDIT', item)">Modificar</button></td>
                <td class="text-center"><button class="link-btn delete" (click)="openModal('DELETE', item)">Eliminar</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="footer-info-legacy">
         <div class="legend">Consultas a partir de la siguiente fecha:</div>
         <div class="date-box">23/01/26 📅</div>
         <div class="copyright">Copyright 2023</div>
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
    .btn-legacy:active { transform: translateY(0); }
    .btn-legacy.primary { background: #5cb85c; color: white; border-color: #4cae4c; }
    .btn-legacy.primary:hover { background: #449d44; }
    
    .dropdown-container { position: relative; }
    .export-dropdown {
      position: absolute; top: 120%; left: 0; width: 200px; background: #ffffff;
      border: 1px solid #ddd; border-radius: 8px; z-index: 1000; 
      box-shadow: 0 8px 24px rgba(0,0,0,0.15); padding: 0.6rem 0;
      animation: slideIn 0.2s ease-out;
    }
    @keyframes slideIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

    .export-option {
      padding: 1rem 1.5rem; cursor: pointer; display: block; font-size: 1.05rem; color: #2f3640;
      transition: all 0.2s;
    }
    .export-option:hover { background: #f1f2f6; color: #5cb85c; padding-left: 1.8rem; }

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
    .link-btn.delete:hover { background: #d9534f; }

    .search-modern { position: relative; width: 350px; }
    .search-modern input { 
      width: 100%; padding: 0.9rem 1.5rem 0.9rem 3rem; 
      border: 2px solid #edf2f7; border-radius: 10px; font-size: 1.1rem;
      transition: all 0.3s;
    }
    .search-modern input:focus { border-color: #5cb85c; outline: none; box-shadow: 0 0 0 4px rgba(92,184,92,0.1); }
    .search-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); font-size: 1.2rem; opacity: 0.5; }

    .text-right { text-align: right; }
    .text-center { text-align: center; }
    .font-mono { font-family: 'JetBrains Mono', monospace; font-weight: 600; }
    .arrow { font-size: 0.8rem; margin-left: 0.6rem; transition: transform 0.3s; }
    .dropdown-container:hover .arrow { transform: rotate(180deg); }

    .alert-delete {
      background: #fdf2f2; border: 1px solid #f8b4b4; color: #9b1c1c;
      padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; font-size: 1rem;
      font-weight: 600;
    }
    .btn-danger { background: #d9534f !important; border-color: #d43f3a !important; }
    .btn-danger:hover { background: #c9302c !important; }
  `]
})
export class LotesComponent implements OnInit {
  private inventarioService = inject(InventarioService);
  private pdfService = inject(PdfExportService);
  private cdr = inject(ChangeDetectorRef);
  
  lotes: Lote[] = [];
  silos: Silo[] = [];
  selectedSilo: Silo | null = null;
  searchQuery = '';
  showModal = false;
  showColumnSelector = false;
  showExportSelector = false;
  modalMode: 'ADD' | 'VIEW' | 'EDIT' | 'DELETE' = 'ADD';
  newLote: Partial<Lote> = this.getDefaultLote();

  columns = [
    { id: 'loteNo', label: 'Lote NO.', visible: true },
    { id: 'lotePO', label: 'Lote PO.', visible: true },
    { id: 'fecha', label: 'Fecha Registro', visible: true },
    { id: 'trunk', label: 'Trunk No', visible: true },
    { id: 'tipoMat', label: 'Tipo Material', visible: true },
    { id: 'silo', label: 'Silo', visible: true },
    { id: 'kg', label: 'Kg', visible: true },
    { id: 'consumido', label: 'Consumido', visible: true },
    { id: 'aditivos', label: 'Paquete Aditivos', visible: true }
  ];

  ngOnInit() { this.loadData(); }

  loadData() {
    console.log('Cargando lotes y silos...');
    this.inventarioService.getLotes().subscribe({
      next: (data) => {
        console.log('Lotes cargados:', data);
        this.lotes = data;
        this.cdr.detectChanges(); // Arregla el bug de carga inicial
      },
      error: (err) => console.error('Error cargando lotes:', err)
    });
    this.inventarioService.getSilos().subscribe({
      next: (data) => {
        this.silos = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error cargando silos:', err)
    });
  }

  getDefaultLote(): Partial<Lote> {
    return {
      loteEmbarque: '',
      lotePO: '',
      loteFechaRegistro: new Date(),
      loteSiloId: '',
      loteKg: 0,
      loteConsumido: false,
      lotePaqueteAditivos: 'No Aplica',
      loteTipoMaterial: 'PCR'
    };
  }

  openModal(mode: 'ADD' | 'VIEW' | 'EDIT' | 'DELETE' = 'ADD', item: Lote | null = null) { 
    this.modalMode = mode;
    if (item) {
      this.newLote = { ...item };
      this.onSiloChange();
    } else {
      this.newLote = this.getDefaultLote();
    }
    this.showModal = true; 
    this.cdr.detectChanges();
  }

  closeModal() { 
    this.showModal = false; 
    this.newLote = this.getDefaultLote(); 
    this.selectedSilo = null; 
    this.cdr.detectChanges();
  }

  onSiloChange() {
    this.selectedSilo = this.silos.find(s => s.id === this.newLote.loteSiloId) || null;
    if (this.selectedSilo && this.modalMode === 'ADD') {
      this.newLote.loteTipoMaterial = this.selectedSilo.tipoMaterial;
    }
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
    this.saveLote();
  }

  saveLote() {
    if (!this.newLote.loteEmbarque) return;
    
    const obs = this.modalMode === 'EDIT' && this.newLote.id
      ? this.inventarioService.updateLote(this.newLote.id, this.newLote)
      : this.inventarioService.createLote(this.newLote);

    obs.subscribe({
      next: () => { 
        this.loadData(); 
        this.closeModal(); 
      },
      error: (err) => {
        const errorMsg = err.error?.message || err.error || 'Error al guardar el lote';
        alert('❌ ' + errorMsg);
      }
    });
  }

  executeDelete() {
    if (this.newLote.id) {
      this.inventarioService.deleteLote(this.newLote.id).subscribe({
        next: () => {
          this.loadData();
          this.closeModal();
        },
        error: (err) => alert('Error al eliminar: ' + err.message)
      });
    }
  }

  deleteLote(lote: Lote) {
    this.openModal('DELETE', lote);
  }

  getSiloNombre(id?: string): string { return this.silos.find(s => s.id === id)?.nombre || '---'; }
  toggleColumnSelector() { this.showColumnSelector = !this.showColumnSelector; }
  isColVisible(id: string): boolean { return this.columns.find(c => c.id === id)?.visible || false; }
  allColsVisible(): boolean { return this.columns.every(c => c.visible); }
  toggleAllCols() { const target = !this.allColsVisible(); this.columns.forEach(c => c.visible = target); }
  resetColumns() { this.columns.forEach(c => c.visible = true); }

  get filteredLotes() {
    const q = (this.searchQuery || '').toLowerCase();
    return this.lotes.filter(l => 
      (l.loteEmbarque || '').toLowerCase().includes(q) ||
      (l.lotePO || '').toLowerCase().includes(q)
    );
  }

  exportToCSV() {
    if (this.lotes.length === 0) return;
    
    // Preparar los datos
    const headers = ['Lote No.', 'Lote PO', 'Fecha Registro', 'Trunk No', 'Tipo Material', 'Silo', 'Kg', 'Consumido', 'Aditivos'];
    
    const rows = this.filteredLotes.map(l => [
      l.loteEmbarque || '',
      l.lotePO || '',
      l.loteFechaRegistro ? new Date(l.loteFechaRegistro).toLocaleDateString() : '',
      l.loteTrunkNo || '',
      l.loteTipoMaterial || '',
      this.getSiloNombre(l.loteSiloId),
      l.loteKg?.toString() || '0',
      l.loteConsumido ? 'Si' : 'No',
      l.lotePaqueteAditivos || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Crear y descargar archivo
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Lotes_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  exportToPDF() {
    if (this.lotes.length === 0) return;
    
    const headers = ['Lote No.', 'Lote PO', 'Fecha Registro', 'Trunk No', 'Tipo Material', 'Silo', 'Kg', 'Consumido', 'Aditivos'];
    
    const data = this.filteredLotes.map(l => [
      l.loteEmbarque || '',
      l.lotePO || '',
      l.loteFechaRegistro ? new Date(l.loteFechaRegistro).toLocaleDateString() : '',
      l.loteTrunkNo || '',
      l.loteTipoMaterial || '',
      this.getSiloNombre(l.loteSiloId),
      l.loteKg?.toString() || '0',
      l.loteConsumido ? 'Si' : 'No',
      l.lotePaqueteAditivos || ''
    ]);

    this.pdfService.exportTable(
      'Lote List', 
      headers, 
      data, 
      `Lotes_Report_${new Date().toISOString().split('T')[0]}.pdf`
    );
  }
}
