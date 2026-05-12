import { Component, OnInit, inject } from '@angular/core';
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
              <div class="column-selector-dropdown shadow-premium" *ngIf="showExportSelector">
                <div class="column-list custom-scroll">
                  <div class="column-group">
                    <label class="item-label export-item" (click)="exportToCSV(); showExportSelector = false">📄 Excel (CSV)</label>
                    <label class="item-label export-item" (click)="exportToPDF(); showExportSelector = false">📕 PDF</label>
                  </div>
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
            <span class="header-icon">🏷️</span> Información General
          </div>
          <form (ngSubmit)="saveLote()">
            <div class="modal-body-legacy custom-scroll">
              
              <!-- Silo Selection -->
              <div class="form-row">
                <label class="legacy-label">Silo</label>
                <select class="legacy-select" [(ngModel)]="newLote.loteSiloId" name="silo" (change)="onSiloChange()">
                  <option value="">Seleccione un silo...</option>
                  <option *ngFor="let s of silos" [value]="s.id">{{ s.nombre }} ({{ s.codigo }})</option>
                </select>
              </div>

              <!-- Silo Helpers (ReadOnly like image) -->
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
                  <input type="text" class="legacy-input" [(ngModel)]="newLote.loteEmbarque" name="embarque" required>
                </div>
                <div class="form-row">
                  <label class="legacy-label">Consumido *</label>
                  <div class="checkbox-container-legacy">
                    <input type="checkbox" class="legacy-checkbox" [(ngModel)]="newLote.loteConsumido" name="consumido">
                  </div>
                </div>
              </div>

              <div class="form-row">
                <label class="legacy-label">Fecha Registro *</label>
                <input type="date" class="legacy-input" [ngModel]="newLote.loteFechaRegistro | date:'yyyy-MM-dd'" (ngModelChange)="newLote.loteFechaRegistro = $event" name="fecha" required>
              </div>

              <div class="form-row">
                <label class="legacy-label">Kg *</label>
                <input type="number" class="legacy-input" [(ngModel)]="newLote.loteKg" name="kg" required>
              </div>

              <div class="form-row">
                <label class="legacy-label">Paquete Aditivos *</label>
                <select class="legacy-select" [(ngModel)]="newLote.lotePaqueteAditivos" name="aditivos">
                  <option value="No Aplica">No Aplica</option>
                  <option value="Llorens-MB1">Llorens-MB1</option>
                  <option value="CCP-07A-164040 L">CCP-07A-164040 L</option>
                </select>
              </div>

              <div class="form-row">
                <label class="legacy-label">Tipo de Material *</label>
                <select class="legacy-select" [(ngModel)]="newLote.loteTipoMaterial" name="tipoMat">
                  <option value="PCR">PCR</option>
                  <option value="HDPE">HDPE</option>
                  <option value="PP">PP</option>
                  <option value="Mezcla">Mezcla</option>
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
                <td class="text-center"><button class="link-btn view">Visualizar</button></td>
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
                <td class="text-center"><button class="link-btn edit">Modificar</button></td>
                <td class="text-center"><button class="link-btn delete" (click)="deleteLote(item)">Eliminar</button></td>
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
    .module-page { padding: 2rem; background: #fff; min-height: 100vh; font-family: 'Open Sans', Arial, sans-serif; position: relative; }
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
    .btn-legacy.secondary:hover { background: #f9f9f9; }

    .column-selector-dropdown { position: absolute; top: 110%; right: 0; width: 250px; background: white; border: 1px solid #ccc; border-radius: 4px; z-index: 100; padding: 1rem; }
    .premium-grid { width: 100%; border-collapse: collapse; border: 1px solid #eee; }
    .premium-grid th { padding: 0.75rem; background: #fff; text-align: left; font-size: 0.8rem; font-weight: 700; color: #333; border: 1px solid #eee; }
    .grid-row td { padding: 0.75rem; font-size: 0.85rem; color: #333; border: 1px solid #eee; }
    .link-btn { background: none; border: none; color: #5cb85c; cursor: pointer; font-size: 0.85rem; }

    /* Modal Fiel a la Imagen 1 */
    .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .legacy-card { background: white; width: 90%; max-width: 900px; border-radius: 4px; border: 1px solid #ccc; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
    .modal-header-legacy { padding: 1rem; background: #fff; border-bottom: 1px solid #eee; color: #5cb85c; font-size: 1rem; }
    .modal-body-legacy { padding: 2rem; max-height: 600px; overflow-y: auto; }
    .form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
    .form-row { margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; border-bottom: 1px solid #eee; padding-bottom: 0.5rem; }
    .legacy-label { font-size: 0.8rem; color: #999; }
    .readonly-text { font-size: 0.9rem; color: #333; padding: 0.4rem 0; min-height: 24px; }
    .legacy-input, .legacy-select { border: none; padding: 0.4rem 0; width: 100%; outline: none; font-size: 0.95rem; background: transparent; }
    .legacy-checkbox { width: 20px; height: 20px; cursor: pointer; accent-color: #5cb85c; }
    .checkbox-container-legacy { padding: 0.4rem 0; }
    
    .modal-footer-legacy { padding: 1.5rem 2rem; display: flex; gap: 0.5rem; }
    .btn-confirm { background: #5cb85c; color: white; border: none; padding: 0.75rem 2rem; border-radius: 4px; font-weight: bold; cursor: pointer; }
    .btn-cancel { background: #999; color: white; border: none; padding: 0.75rem 2rem; border-radius: 4px; cursor: pointer; }

    /* Footer Info */
    .footer-info-legacy { position: fixed; bottom: 0; left: 0; width: 100%; padding: 0.5rem 2rem; background: #fff; border-top: 1px solid #eee; display: flex; align-items: center; gap: 1rem; font-size: 0.8rem; color: #666; }
    .date-box { border: 1px solid #eee; padding: 0.2rem 0.5rem; border-radius: 4px; }
    .copyright { margin-left: auto; }

    .text-right { text-align: right; }
    .text-center { text-align: center; }
    .export-item { padding: 0.5rem; cursor: pointer; display: block; }
    .export-item:hover { background: #f1f5f9; }
  `]
})
export class LotesComponent implements OnInit {
  private inventarioService = inject(InventarioService);
  private pdfService = inject(PdfExportService);
  
  lotes: Lote[] = [];
  silos: Silo[] = [];
  selectedSilo: Silo | null = null;
  searchQuery = '';
  showModal = false;
  showColumnSelector = false;
  showExportSelector = false;
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
    this.inventarioService.getLotes().subscribe(data => this.lotes = data);
    this.inventarioService.getSilos().subscribe(data => this.silos = data);
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

  openModal() { this.showModal = true; }
  closeModal() { this.showModal = false; this.newLote = this.getDefaultLote(); this.selectedSilo = null; }

  onSiloChange() {
    this.selectedSilo = this.silos.find(s => s.id === this.newLote.loteSiloId) || null;
    if (this.selectedSilo) {
      this.newLote.loteTipoMaterial = this.selectedSilo.tipoMaterial;
    }
  }

  saveLote() {
    if (!this.newLote.loteEmbarque) return;
    this.inventarioService.createLote(this.newLote).subscribe({
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

  deleteLote(lote: Lote) {
    if (lote.id && confirm(`¿Desea eliminar el lote ${lote.loteEmbarque}?`)) {
      this.inventarioService.deleteLote(lote.id).subscribe(() => this.loadData());
    }
  }

  getSiloNombre(id?: string): string { return this.silos.find(s => s.id === id)?.nombre || '---'; }
  toggleColumnSelector() { this.showColumnSelector = !this.showColumnSelector; }
  isColVisible(id: string): boolean { return this.columns.find(c => c.id === id)?.visible || false; }
  allColsVisible(): boolean { return this.columns.every(c => c.visible); }
  toggleAllCols() { const target = !this.allColsVisible(); this.columns.forEach(c => c.visible = target); }
  resetColumns() { this.columns.forEach(c => c.visible = true); }

  get filteredLotes() {
    const q = this.searchQuery.toLowerCase();
    return this.lotes.filter(l => (l.loteEmbarque?.toLowerCase() || '').includes(q));
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
