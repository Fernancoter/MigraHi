import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaeService, SaeSalesPerson } from '../../../core/services/sae';

interface ColumnDef {
  key: string;
  label: string;
  visible: boolean;
}

import { LucidePencil, LucideX, LucideFileText, LucideSearch } from '@lucide/angular';

@Component({
  selector: 'app-sae-salesperson',
  standalone: true,
  imports: [CommonModule, FormsModule, LucidePencil, LucideX, LucideFileText, LucideSearch],
  template: `
    <div class="wwp-container" (click)="onDocClick($event)">
      <div class="wwp-header">
        <h1>Sales Person</h1>
        <div class="wwp-breadcrumbs">Reportes &gt; SalesPerson</div>
      </div>

      <div class="wwp-content" *ngIf="!showForm">
        <div class="wwp-toolbar">
          <div class="wwp-toolbar-left">
            <button class="btn-wwp-outline btn-add" title="Agregar" (click)="openNew()">
              <span class="icon">➕</span>
            </button>
            <div class="export-dropdown-wrapper">
              <button class="btn-wwp-outline" (click)="toggleExport($event)">
                <span class="icon">📥</span> Exportar <span class="caret">▼</span>
              </button>
              <div class="export-dropdown" *ngIf="showExportMenu">
                <button class="export-option" (click)="exportPDF()"><svg lucideFileText [size]="14"></svg> Exportar a PDF</button>
                <button class="export-option" (click)="exportXLS()">📊 Exportar a Excel (XLS)</button>
              </div>
            </div>
            <!-- Column Selector -->
            <div class="col-selector-wrapper">
              <button class="btn-wwp-primary-col" (click)="toggleColSelector($event)">
                Selecciona columnas <span class="caret-white">▼</span>
              </button>
              <div class="col-selector-dropdown" *ngIf="showColSelector">
                <div class="col-selector-search">
                  <input type="text" placeholder="" [(ngModel)]="colSearchTxt" (input)="filterCols()">
                </div>
                <div class="col-selector-list">
                  <div class="col-section-header">
                    <label><input type="checkbox" checked disabled> Fijas a la izquierda <span class="caret-sm">▼</span></label>
                  </div>
                  <div class="col-section-item indent">
                    <label><input type="checkbox" checked disabled> (Ninguna)</label>
                  </div>
                  <div class="col-section-header">
                    <label><input type="checkbox" [checked]="allColsVisible()" (change)="toggleAllCols($event)"> No fijas <span class="caret-sm">▼</span></label>
                  </div>
                  <ng-container *ngFor="let col of filteredCols">
                    <div class="col-section-item indent">
                      <label><input type="checkbox" [(ngModel)]="col.visible"> {{ col.label }}</label>
                    </div>
                  </ng-container>
                  <div class="col-section-header">
                    <label><input type="checkbox" checked disabled> Fijas a la derecha <span class="caret-sm">▼</span></label>
                  </div>
                  <div class="col-section-item indent">
                    <label><input type="checkbox" checked disabled> (Ninguna)</label>
                  </div>
                </div>
                <div class="col-selector-footer">
                  <button class="btn-col-reset" (click)="resetCols()">↩</button>
                  <button class="btn-wwp-primary" (click)="showColSelector=false">Actualizar</button>
                </div>
              </div>
            </div>
          </div>
          <div class="wwp-toolbar-right">
            <span class="filter-icon"><svg lucideSearch [size]="14"></svg></span>
            <input type="text" class="wwp-search-input" placeholder="Buscar" [(ngModel)]="searchSP" (input)="filterData()">
          </div>
        </div>

        <div class="wwp-table-container">
          <table class="wwp-table">
            <thead>
              <tr>
                <th class="action-col"></th>
                <th class="action-col"></th>
                <th *ngIf="isVis('salesPersonName')" class="sortable" (click)="sortBy('salesPersonName')">Person Name <span class="sort-icon">{{ getSortIcon('salesPersonName') }}</span></th>
                <th *ngIf="isVis('salesPersonActive')" class="sortable" (click)="sortBy('salesPersonActive')">Person Active <span class="sort-icon">{{ getSortIcon('salesPersonActive') }}</span></th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let s of pagedData">
                <td class="action-cell"><button class="btn-icon" (click)="editRecord(s)"><svg lucidePencil [size]="14"></svg></button></td>
                <td class="action-cell"><button class="btn-icon" (click)="deleteRecord(s)"><svg lucideX [size]="14"></svg></button></td>
                <td *ngIf="isVis('salesPersonName')">{{ s.salesPersonName }}</td>
                <td *ngIf="isVis('salesPersonActive')">
                  <input type="checkbox" [checked]="s.salesPersonActive" disabled>
                </td>
              </tr>
              <tr *ngIf="pagedData.length === 0">
                <td [attr.colspan]="visibleCount() + 2" class="empty-row">No se encontraron registros</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="wwp-pagination">
          <div class="page-info">Página {{ currentPage }} de {{ Math.max(1, totalPages) }}</div>
          <div class="page-controls">
            <button class="btn-page" (click)="prevPage()" [disabled]="currentPage <= 1">Ant</button>
            <ng-container *ngFor="let pg of pageNumbers">
              <button class="btn-page" [class.active]="pg === currentPage" (click)="goToPage(pg)">{{ pg }}</button>
            </ng-container>
            <button class="btn-page" (click)="nextPage()" [disabled]="currentPage >= totalPages">Sig</button>
          </div>
        </div>
      </div>

      <!-- ═══════ FORMULARIO DE SALESPERSON ═══════ -->
      <div class="wwp-content centered-form-content" *ngIf="showForm">
        <div class="form-section-header">
          <span class="form-section-icon">▶</span> Información General
        </div>
        <div class="form-fields">
          <div class="form-group">
            <label class="form-label">Person Name</label>
            <input type="text" class="form-input" [(ngModel)]="formData.salesPersonName" [disabled]="isEditing">
          </div>
          <div class="form-group">
            <label class="form-label">Person Active</label>
            <div style="padding: 0.5rem 0;">
              <input type="checkbox" [(ngModel)]="formData.salesPersonActive" style="width: 18px; height: 18px;">
            </div>
          </div>
        </div>
        <div *ngIf="formValidationError" style="color: #dc2626; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.75rem;">{{ formValidationError }}</div>
        <div class="form-actions">
          <button class="btn-wwp-primary" (click)="confirmRecord()">CONFIRMAR</button>
          <button class="btn-cancel" (click)="cancelForm()">CANCELAR</button>
        </div>
      </div>

      <!-- Modal Confirmar Eliminar -->
      <div class="modal-overlay" *ngIf="showDeleteConfirmModal" (click)="showDeleteConfirmModal = false">
        <div class="modal-card confirm-modal animate-scale-in" (click)="$event.stopPropagation()" style="background: white; border-radius: 12px; padding: 1.75rem; width: 380px; box-shadow: 0 12px 30px rgba(0,0,0,0.2); text-align: center; border: 1px solid #cbd5e1;">
          <h3 style="margin-top: 0; color: #1e293b; font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem;">Eliminar Vendedor</h3>
          <p style="font-size: 0.88rem; color: #475569; margin-bottom: 1.5rem;">
            ¿Está seguro que desea eliminar al vendedor <strong>"{{ itemToDelete?.salesPersonName }}"</strong>?
          </p>
          <div style="display: flex; justify-content: center; gap: 12px;">
            <button style="background: #ef4444; color: white; border: none; padding: 0.55rem 1.4rem; border-radius: 6px; font-weight: 700; font-size: 0.85rem; cursor: pointer; box-shadow: 0 2px 4px rgba(239, 68, 68, 0.25);" (click)="executeDeleteRecord()">Eliminar</button>
            <button style="background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; padding: 0.55rem 1.4rem; border-radius: 6px; font-weight: 600; font-size: 0.85rem; cursor: pointer;" (click)="showDeleteConfirmModal = false">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../catalogos-sae.component.css']
})
export class SalesPersonComponent implements OnInit {
  private saeService = inject(SaeService);
  Math = Math;
  
  data: SaeSalesPerson[] = [];
  allFiltered: SaeSalesPerson[] = [];
  pagedData: SaeSalesPerson[] = [];
  searchSP = '';

  // Sorting
  sortColumn = 'salesPersonName';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Pagination
  pageSize = 20;
  currentPage = 1;
  totalPages = 1;
  pageNumbers: number[] = [];

  // Export
  showExportMenu = false;

  // Column Selector
  showColSelector = false;
  colSearchTxt = '';
  allColumns: ColumnDef[] = [
    { key: 'salesPersonName', label: 'Person Name', visible: true },
    { key: 'salesPersonActive', label: 'Person Active', visible: true }
  ];
  filteredCols: ColumnDef[] = [...this.allColumns];

  // Form
  showForm = false;
  isEditing = false;
  formData: Partial<SaeSalesPerson> = {};

  showDeleteConfirmModal = false;
  itemToDelete: SaeSalesPerson | null = null;
  formValidationError = '';

  ngOnInit() {
    this.loadData();
    this.filteredCols = [...this.allColumns];
  }

  loadData() {
    this.saeService.getSalesPersons().subscribe(res => {
      this.data = res;
      this.applyFilterAndSort();
    });
  }

  filterData() {
    this.currentPage = 1;
    this.applyFilterAndSort();
  }

  applyFilterAndSort() {
    const term = this.searchSP.toLowerCase();
    let result = this.data.filter(s =>
      s.salesPersonName.toLowerCase().includes(term)
    );
    // Sort
    const dir = this.sortDirection === 'asc' ? 1 : -1;
    result.sort((a, b) => {
      const va = this.getCellVal(a, this.sortColumn);
      const vb = this.getCellVal(b, this.sortColumn);
      if (typeof va === 'boolean' && typeof vb === 'boolean') {
        return (va === vb ? 0 : va ? -1 : 1) * dir;
      }
      return String(va).localeCompare(String(vb)) * dir;
    });
    this.allFiltered = result;
    this.totalPages = Math.max(1, Math.ceil(result.length / this.pageSize));
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
    this.pageNumbers = [];
    for (let i = 1; i <= this.totalPages; i++) this.pageNumbers.push(i);
    const start = (this.currentPage - 1) * this.pageSize;
    this.pagedData = result.slice(start, start + this.pageSize);
  }

  // Pagination
  prevPage() { if (this.currentPage > 1) { this.currentPage--; this.applyFilterAndSort(); } }
  nextPage() { if (this.currentPage < this.totalPages) { this.currentPage++; this.applyFilterAndSort(); } }
  goToPage(pg: number) { this.currentPage = pg; this.applyFilterAndSort(); }

  // Sorting
  sortBy(col: string) {
    if (this.sortColumn === col) { this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'; }
    else { this.sortColumn = col; this.sortDirection = 'asc'; }
    this.applyFilterAndSort();
  }
  getSortIcon(col: string): string {
    if (this.sortColumn !== col) return '▼';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  // Column visibility
  isVis(key: string): boolean { return this.allColumns.find(c => c.key === key)?.visible ?? true; }
  visibleCount(): number { return this.allColumns.filter(c => c.visible).length; }
  allColsVisible(): boolean { return this.allColumns.every(c => c.visible); }
  toggleAllCols(e: Event) { const chk = (e.target as HTMLInputElement).checked; this.allColumns.forEach(c => c.visible = chk); }
  resetCols() { this.allColumns.forEach(c => c.visible = true); this.filteredCols = [...this.allColumns]; }
  toggleColSelector(e: Event) { e.stopPropagation(); this.showColSelector = !this.showColSelector; this.showExportMenu = false; if (this.showColSelector) { this.colSearchTxt = ''; this.filteredCols = [...this.allColumns]; } }
  filterCols() { const t = this.colSearchTxt.toLowerCase(); this.filteredCols = this.allColumns.filter(c => c.label.toLowerCase().includes(t)); }

  // Export
  toggleExport(e: Event) { e.stopPropagation(); this.showExportMenu = !this.showExportMenu; this.showColSelector = false; }

  onDocClick(e: Event) {
    const t = e.target as HTMLElement;
    if (!t.closest('.export-dropdown-wrapper')) this.showExportMenu = false;
    if (!t.closest('.col-selector-wrapper')) this.showColSelector = false;
  }

  exportPDF() {
    this.showExportMenu = false;
    const visCols = this.allColumns.filter(c => c.visible);
    import('jspdf').then(jspdf => {
      import('jspdf-autotable').then(autotable => {
        const jsPDF = jspdf.jsPDF;
        const autoTable = autotable.default || (autotable as any).default;
        const doc = new jsPDF();
        const headers = visCols.map(c => c.label);
        const rows = this.allFiltered.map(s => visCols.map(c => this.getCellVal(s, c.key) === true ? 'Yes' : (this.getCellVal(s, c.key) === false ? 'No' : this.getCellVal(s, c.key))));
        doc.setFontSize(16); doc.text('SalesPerson Report', 14, 15);
        doc.setFontSize(10); doc.text(`Generado: ${new Date().toLocaleDateString()}`, 14, 22);
        autoTable(doc, { head: [headers], body: rows, startY: 28, headStyles: { fillColor: [22, 163, 74] } });
        doc.save(`SalesPerson_Report.pdf`);
      }).catch(err => console.error("Error loading autotable:", err));
    }).catch(err => console.error("Error loading jspdf:", err));
  }

  exportXLS() {
    this.showExportMenu = false;
    const visCols = this.allColumns.filter(c => c.visible);
    const headers = visCols.map(c => c.label);
    const rows = this.allFiltered.map(s => visCols.map(c => this.getCellVal(s, c.key) === true ? 'Yes' : (this.getCellVal(s, c.key) === false ? 'No' : this.getCellVal(s, c.key))));
    let html = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">';
    html += '<head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';
    html += '<x:Name>SalesPerson</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>';
    html += '</x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>';
    html += '<table border="1"><thead><tr>';
    headers.forEach(h => html += `<th style="background-color:#16a34a;color:white;font-weight:bold;">${h}</th>`);
    html += '</tr></thead><tbody>';
    rows.forEach(row => { html += '<tr>'; row.forEach(cell => html += `<td>${cell}</td>`); html += '</tr>'; });
    html += '</tbody></table></body></html>';
    const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'SalesPerson_Report.xls'; a.click();
    URL.revokeObjectURL(url);
  }

  // Form - New/Edit
  openNew() {
    this.isEditing = false;
    this.formData = { salesPersonName: '', salesPersonActive: true };
    this.showForm = true;
  }

  editRecord(s: SaeSalesPerson) {
    this.isEditing = true;
    this.formData = { ...s };
    this.showForm = true;
  }

  deleteRecord(s: SaeSalesPerson) {
    this.itemToDelete = s;
    this.showDeleteConfirmModal = true;
  }

  executeDeleteRecord() {
    if (this.itemToDelete) {
      this.data = this.data.filter(x => x.salesPersonName !== this.itemToDelete?.salesPersonName);
      this.applyFilterAndSort();
    }
    this.showDeleteConfirmModal = false;
    this.itemToDelete = null;
  }

  confirmRecord() {
    if (!this.formData.salesPersonName) {
      this.formValidationError = 'El campo Person Name es requerido.';
      return;
    }
    this.formValidationError = '';
    if (this.isEditing) {
      const idx = this.data.findIndex(s => s.salesPersonName === this.formData.salesPersonName);
      if (idx >= 0) this.data[idx] = this.formData as SaeSalesPerson;
    } else {
      this.data.push(this.formData as SaeSalesPerson);
    }
    this.applyFilterAndSort();
    this.showForm = false;
  }

  cancelForm() { this.showForm = false; }

  private getCellVal(s: SaeSalesPerson, key: string): any {
    switch (key) {
      case 'salesPersonName': return s.salesPersonName;
      case 'salesPersonActive': return s.salesPersonActive;
      default: return '';
    }
  }
}
