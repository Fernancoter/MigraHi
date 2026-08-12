import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaeService, SaeCliente } from '../../../core/services/sae';

interface ColumnDef {
  key: string;
  label: string;
  visible: boolean;
}

import { LucidePencil, LucideX, LucideFileText, LucideSearch } from '@lucide/angular';

@Component({
  selector: 'app-sae-customer',
  standalone: true,
  imports: [CommonModule, FormsModule, LucidePencil, LucideX, LucideFileText, LucideSearch],
  template: `
    <div class="wwp-container" (click)="onDocClick($event)">
      <div class="wwp-header">
        <h1>Clientes</h1>
        <div class="wwp-breadcrumbs">Reportes &gt; Customer</div>
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
            <input type="text" class="wwp-search-input" placeholder="Buscar" [(ngModel)]="searchCli" (input)="filterData()">
          </div>
        </div>

        <div class="wwp-table-container">
          <table class="wwp-table">
            <thead>
              <tr>
                <th class="action-col"></th>
                <th class="action-col"></th>
                <th *ngIf="isVis('customerCode')" class="sortable" (click)="sortBy('customerCode')">Clave SAE <span class="sort-icon">{{ getSortIcon('customerCode') }}</span></th>
                <th *ngIf="isVis('customerName')" class="sortable" (click)="sortBy('customerName')">Cliente <span class="sort-icon">{{ getSortIcon('customerName') }}</span></th>
                <th *ngIf="isVis('rfc')" class="sortable" (click)="sortBy('rfc')">RFC <span class="sort-icon">{{ getSortIcon('rfc') }}</span></th>
                <th *ngIf="isVis('consolidatedName')" class="sortable" (click)="sortBy('consolidatedName')">Grupo <span class="sort-icon">{{ getSortIcon('consolidatedName') }}</span></th>
                <th *ngIf="isVis('shipping')" class="sortable" (click)="sortBy('shipping')">Envío <span class="sort-icon">{{ getSortIcon('shipping') }}</span></th>
                <th *ngIf="isVis('isActive')" class="sortable" (click)="sortBy('isActive')">Estatus <span class="sort-icon">{{ getSortIcon('isActive') }}</span></th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let c of pagedData">
                <td class="action-cell"><button class="btn-icon" (click)="editRecord(c)"><svg lucidePencil [size]="14"></svg></button></td>
                <td class="action-cell"><button class="btn-icon" (click)="deleteRecord(c)"><svg lucideX [size]="14"></svg></button></td>
                <td *ngIf="isVis('customerCode')">{{ c.customerCode }}</td>
                <td *ngIf="isVis('customerName')">{{ c.customerName }}</td>
                <td *ngIf="isVis('rfc')">{{ c.rfc || 'XXX' }}</td>
                <td *ngIf="isVis('consolidatedName')">{{ c.consolidatedName || 'SIN GRUPO' }}</td>
                <td *ngIf="isVis('shipping')">{{ c.shipping || '—' }}</td>
                <td *ngIf="isVis('isActive')">{{ c.isActive ? 'A' : 'S' }}</td>
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

      <!-- ═══════ FORMULARIO DE CUSTOMER ═══════ -->
      <div class="wwp-content centered-form-content" *ngIf="showForm">
        <div class="form-section-header">
          <span class="form-section-icon">▶</span> Información General
        </div>
        <div class="form-fields">
          <div class="form-group">
            <label class="form-label">Clave SAE</label>
            <input type="text" class="form-input" [(ngModel)]="formData.customerCode" [disabled]="isEditing">
          </div>
          <div class="form-group">
            <label class="form-label">Cliente (Nombre)</label>
            <input type="text" class="form-input" [(ngModel)]="formData.customerName">
          </div>
          <div class="form-group">
            <label class="form-label">RFC</label>
            <input type="text" class="form-input" [(ngModel)]="formData.rfc">
          </div>
          <div class="form-group">
            <label class="form-label">Grupo (Consolidated Name)</label>
            <input type="text" class="form-input" [(ngModel)]="formData.consolidatedName">
          </div>
          <div class="form-group">
            <label class="form-label">Envío (Shipping)</label>
            <input type="text" class="form-input" [(ngModel)]="formData.shipping">
          </div>
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" class="form-input" [(ngModel)]="formData.email">
          </div>
          <div class="form-group">
            <label class="form-label">Teléfono</label>
            <input type="text" class="form-input" [(ngModel)]="formData.phone">
          </div>
          <div class="form-group">
            <label class="form-label">Estatus Activo</label>
            <div style="padding: 0.5rem 0;">
              <input type="checkbox" [(ngModel)]="formData.isActive" style="width: 18px; height: 18px;">
            </div>
          </div>
        </div>
        <div class="form-actions">
          <button class="btn-wwp-primary" (click)="confirmRecord()">CONFIRMAR</button>
          <button class="btn-cancel" (click)="cancelForm()">CANCELAR</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../catalogos-sae.component.css']
})
export class CustomerComponent implements OnInit {
  private saeService = inject(SaeService);
  Math = Math;
  
  data: SaeCliente[] = [];
  allFiltered: SaeCliente[] = [];
  pagedData: SaeCliente[] = [];
  searchCli = '';

  // Sorting
  sortColumn = 'customerName';
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
    { key: 'customerCode', label: 'Clave SAE', visible: true },
    { key: 'customerName', label: 'Cliente', visible: true },
    { key: 'rfc', label: 'RFC', visible: true },
    { key: 'consolidatedName', label: 'Grupo', visible: true },
    { key: 'shipping', label: 'Envío', visible: true },
    { key: 'isActive', label: 'Estatus', visible: true }
  ];
  filteredCols: ColumnDef[] = [...this.allColumns];

  // Form
  showForm = false;
  isEditing = false;
  formData: Partial<SaeCliente> = {};

  ngOnInit() {
    this.loadData();
    this.filteredCols = [...this.allColumns];
  }

  loadData() {
    this.saeService.getClientes().subscribe(res => {
      this.data = res;
      this.applyFilterAndSort();
    });
  }

  filterData() {
    this.currentPage = 1;
    this.applyFilterAndSort();
  }

  applyFilterAndSort() {
    const term = this.searchCli.toLowerCase();
    let result = this.data.filter(c =>
      c.customerCode.toLowerCase().includes(term) ||
      c.customerName.toLowerCase().includes(term) ||
      (c.rfc || '').toLowerCase().includes(term)
    );
    // Sort
    const dir = this.sortDirection === 'asc' ? 1 : -1;
    result.sort((a, b) => {
      const va = this.getCellVal(a, this.sortColumn);
      const vb = this.getCellVal(b, this.sortColumn);
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
        const rows = this.allFiltered.map(c => visCols.map(col => this.getCellVal(c, col.key)));
        doc.setFontSize(16); doc.text('Customer Report', 14, 15);
        doc.setFontSize(10); doc.text(`Generado: ${new Date().toLocaleDateString()}`, 14, 22);
        autoTable(doc, { head: [headers], body: rows, startY: 28, headStyles: { fillColor: [22, 163, 74] } });
        doc.save(`Customer_Report.pdf`);
      }).catch(err => console.error("Error loading autotable:", err));
    }).catch(err => console.error("Error loading jspdf:", err));
  }

  exportXLS() {
    this.showExportMenu = false;
    const visCols = this.allColumns.filter(c => c.visible);
    const headers = visCols.map(c => c.label);
    const rows = this.allFiltered.map(c => visCols.map(col => this.getCellVal(c, col.key)));
    let html = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">';
    html += '<head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';
    html += '<x:Name>Customer</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>';
    html += '</x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>';
    html += '<table border="1"><thead><tr>';
    headers.forEach(h => html += `<th style="background-color:#16a34a;color:white;font-weight:bold;">${h}</th>`);
    html += '</tr></thead><tbody>';
    rows.forEach(row => { html += '<tr>'; row.forEach(cell => html += `<td>${cell}</td>`); html += '</tr>'; });
    html += '</tbody></table></body></html>';
    const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'Customer_Report.xls'; a.click();
    URL.revokeObjectURL(url);
  }

  // Form - New/Edit
  openNew() {
    this.isEditing = false;
    this.formData = { customerCode: '', customerName: '', rfc: '', consolidatedName: '', shipping: '', email: '', phone: '', isActive: true };
    this.showForm = true;
  }

  editRecord(c: SaeCliente) {
    this.isEditing = true;
    this.formData = { ...c };
    this.showForm = true;
  }

  deleteRecord(c: SaeCliente) {
    if (confirm(`¿Eliminar al cliente "${c.customerName}"?`)) {
      this.data = this.data.filter(x => x.customerCode !== c.customerCode);
      this.applyFilterAndSort();
    }
  }

  confirmRecord() {
    if (!this.formData.customerCode) { alert('El campo Clave SAE es requerido'); return; }
    if (this.isEditing) {
      const idx = this.data.findIndex(c => c.customerCode === this.formData.customerCode);
      if (idx >= 0) this.data[idx] = this.formData as SaeCliente;
    } else {
      this.data.push(this.formData as SaeCliente);
    }
    this.applyFilterAndSort();
    this.showForm = false;
  }

  cancelForm() { this.showForm = false; }

  private getCellVal(c: SaeCliente, key: string): any {
    switch (key) {
      case 'customerCode': return c.customerCode;
      case 'customerName': return c.customerName;
      case 'rfc': return c.rfc || 'XXX';
      case 'consolidatedName': return c.consolidatedName || 'SIN GRUPO';
      case 'shipping': return c.shipping || '—';
      case 'isActive': return c.isActive ? 'A' : 'S';
      default: return '';
    }
  }
}
