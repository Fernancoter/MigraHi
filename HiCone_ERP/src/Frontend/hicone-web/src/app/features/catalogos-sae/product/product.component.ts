import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaeService, SaeProducto } from '../../../core/services/sae';

interface ColumnDef {
  key: string;
  label: string;
  visible: boolean;
}

@Component({
  selector: 'app-sae-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="wwp-container" (click)="onDocClick($event)">
      <div class="wwp-header">
        <h1>Product</h1>
        <div class="wwp-breadcrumbs">Reportes &gt; Product</div>
      </div>

      <div class="wwp-content" *ngIf="!showForm">
        <div class="wwp-toolbar">
          <div class="wwp-toolbar-left">
            <button class="btn-wwp-outline btn-add" title="Agregar Producto" (click)="openNewProduct()">
              <span class="icon">➕</span>
            </button>
            <div class="export-dropdown-wrapper">
              <button class="btn-wwp-outline" (click)="toggleExport($event)">
                <span class="icon">📥</span> Exportar <span class="caret">▼</span>
              </button>
              <div class="export-dropdown" *ngIf="showExportMenu">
                <button class="export-option" (click)="exportPDF()">📄 Exportar a PDF</button>
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
            <span class="filter-icon">🔍</span>
            <input type="text" class="wwp-search-input" placeholder="Buscar" [(ngModel)]="searchProd" (input)="filterProductos()">
          </div>
        </div>

        <div class="wwp-table-container">
          <table class="wwp-table">
            <thead>
              <tr>
                <th class="action-col"></th>
                <th class="action-col"></th>
                <th *ngIf="isVis('productNumber')" class="sortable" (click)="sortBy('productNumber')">Producto <span class="sort-icon">{{ getSortIcon('productNumber') }}</span></th>
                <th *ngIf="isVis('productName')" class="sortable" (click)="sortBy('productName')">Descripción <span class="sort-icon">{{ getSortIcon('productName') }}</span></th>
                <th *ngIf="isVis('unit')" class="sortable" (click)="sortBy('unit')">Unit <span class="sort-icon">{{ getSortIcon('unit') }}</span></th>
                <th *ngIf="isVis('cost')" class="sortable" (click)="sortBy('cost')">Cost <span class="sort-icon">{{ getSortIcon('cost') }}</span></th>
                <th *ngIf="isVis('tipoProducto')" class="sortable" (click)="sortBy('tipoProducto')">Tipo Producto <span class="sort-icon">{{ getSortIcon('tipoProducto') }}</span></th>
                <th *ngIf="isVis('packaging')" class="sortable" (click)="sortBy('packaging')">Packaging <span class="sort-icon">{{ getSortIcon('packaging') }}</span></th>
                <th *ngIf="isVis('subProductType')" class="sortable" (click)="sortBy('subProductType')">Sub Product Type <span class="sort-icon">{{ getSortIcon('subProductType') }}</span></th>
                <th *ngIf="isVis('exist')" class="sortable" (click)="sortBy('exist')">Exist <span class="sort-icon">{{ getSortIcon('exist') }}</span></th>
                <th *ngIf="isVis('group')" class="sortable" (click)="sortBy('group')">Group <span class="sort-icon">{{ getSortIcon('group') }}</span></th>
                <th *ngIf="isVis('piecesPlt')" class="sortable" (click)="sortBy('piecesPlt')">Pieces Plt <span class="sort-icon">{{ getSortIcon('piecesPlt') }}</span></th>
                <th *ngIf="isVis('product8020')" class="sortable" (click)="sortBy('product8020')">Product8020 <span class="sort-icon">{{ getSortIcon('product8020') }}</span></th>
                <th *ngIf="isVis('pallets')" class="sortable" (click)="sortBy('pallets')">Pallets <span class="sort-icon">{{ getSortIcon('pallets') }}</span></th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let p of filteredProductos">
                <td class="action-cell"><button class="btn-icon" (click)="editProduct(p)">✏️</button></td>
                <td class="action-cell"><button class="btn-icon" (click)="deleteProduct(p)">✖️</button></td>
                <td *ngIf="isVis('productNumber')">{{ p.productNumber }}</td>
                <td *ngIf="isVis('productName')">{{ p.productName }}</td>
                <td *ngIf="isVis('unit')">{{ p.unit || 'MILLAR' }}</td>
                <td *ngIf="isVis('cost')">{{ (p.cost || 0) | currency:'USD':'symbol':'1.2-2' }}</td>
                <td *ngIf="isVis('tipoProducto')">{{ p.tipoProducto || '' }}</td>
                <td *ngIf="isVis('packaging')">{{ p.packaging || '' }}</td>
                <td *ngIf="isVis('subProductType')">{{ p.subProductType || '' }}</td>
                <td *ngIf="isVis('exist')">{{ p.exist | number:'1.2-2' }}</td>
                <td *ngIf="isVis('group')">{{ p.group || '' }}</td>
                <td *ngIf="isVis('piecesPlt')">{{ p.piecesPlt | number:'1.2-2' }}</td>
                <td *ngIf="isVis('product8020')">{{ p.product8020 || '' }}</td>
                <td *ngIf="isVis('pallets')">{{ p.pallets }}</td>
              </tr>
              <tr *ngIf="filteredProductos.length === 0">
                <td [attr.colspan]="visibleCount() + 2" class="empty-row">No se encontraron registros</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="wwp-pagination">
          <div class="page-info">Página {{ currentPage }} de {{ totalPages }}</div>
          <div class="page-controls">
            <button class="btn-page" (click)="prevPage()" [disabled]="currentPage <= 1">Ant</button>
            <ng-container *ngFor="let pg of pageNumbers">
              <button class="btn-page" [class.active]="pg === currentPage" (click)="goToPage(pg)">{{ pg }}</button>
            </ng-container>
            <button class="btn-page" (click)="nextPage()" [disabled]="currentPage >= totalPages">Sig</button>
          </div>
        </div>
      </div>

      <!-- ═══════ FORMULARIO DE PRODUCTO ═══════ -->
      <div class="wwp-content centered-form-content" *ngIf="showForm">
        <div class="form-section-header">
          <span class="form-section-icon">▶</span> Información General
        </div>
          <div class="form-fields">
            <div class="form-group">
              <label class="form-label">Producto</label>
              <input type="text" class="form-input" [(ngModel)]="formData.productNumber" [disabled]="isEditing">
            </div>
            <div class="form-group">
              <label class="form-label">Descripción</label>
              <textarea class="form-textarea" [(ngModel)]="formData.productName" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Unit</label>
              <input type="text" class="form-input" [(ngModel)]="formData.unit">
            </div>
            <div class="form-group">
              <label class="form-label text-red-label">Cost</label>
              <input type="number" class="form-input" [(ngModel)]="formData.cost" step="0.01">
            </div>
            <div class="form-group">
              <label class="form-label">Tipo Producto</label>
              <input type="text" class="form-input" [(ngModel)]="formData.tipoProducto">
            </div>
            <div class="form-group">
              <label class="form-label">Packaging</label>
              <input type="text" class="form-input" [(ngModel)]="formData.packaging">
            </div>
            <div class="form-group">
              <label class="form-label">Sub Product Type</label>
              <input type="text" class="form-input" [(ngModel)]="formData.subProductType">
            </div>
            <div class="form-group">
              <label class="form-label">Exist</label>
              <input type="number" class="form-input" [(ngModel)]="formData.exist" step="0.01">
            </div>
            <div class="form-group">
              <label class="form-label">Group</label>
              <input type="text" class="form-input" [(ngModel)]="formData.group">
            </div>
            <div class="form-group">
              <label class="form-label text-red-label">Pieces Plt</label>
              <input type="number" class="form-input" [(ngModel)]="formData.piecesPlt" step="0.01">
            </div>
            <div class="form-group">
              <label class="form-label">Product8020</label>
              <input type="text" class="form-input" [(ngModel)]="formData.product8020">
            </div>
          </div>
        <div class="form-actions">
          <button class="btn-wwp-primary" (click)="confirmProduct()">CONFIRMAR</button>
          <button class="btn-cancel" (click)="cancelForm()">CANCELAR</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../catalogos-sae.component.css']
})
export class ProductComponent implements OnInit {
  private saeService = inject(SaeService);
  productos: SaeProducto[] = [];
  filteredProductos: SaeProducto[] = [];
  searchProd = '';

  // Sorting
  sortColumn = 'productName';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Pagination
  pageSize = 20;
  currentPage = 1;
  totalPages = 1;
  pageNumbers: number[] = [];
  allFiltered: SaeProducto[] = [];

  // Export
  showExportMenu = false;

  // Column Selector
  showColSelector = false;
  colSearchTxt = '';
  allColumns: ColumnDef[] = [
    { key: 'productNumber', label: 'Producto', visible: true },
    { key: 'productName', label: 'Descripción', visible: true },
    { key: 'unit', label: 'Unit', visible: true },
    { key: 'cost', label: 'Cost', visible: true },
    { key: 'tipoProducto', label: 'Tipo Producto', visible: true },
    { key: 'packaging', label: 'Packaging', visible: true },
    { key: 'subProductType', label: 'Sub Product Type', visible: true },
    { key: 'exist', label: 'Exist', visible: true },
    { key: 'group', label: 'Group', visible: true },
    { key: 'piecesPlt', label: 'Pieces Plt', visible: true },
    { key: 'product8020', label: 'Product8020', visible: true },
    { key: 'pallets', label: 'Pallets', visible: true },
  ];
  filteredCols: ColumnDef[] = [...this.allColumns];

  // Form
  showForm = false;
  isEditing = false;
  formData: any = {};

  ngOnInit() {
    this.loadProductos();
    this.filteredCols = [...this.allColumns];
  }

  loadProductos() {
    this.saeService.getProductos().subscribe(data => {
      this.productos = data;
      this.applyFilterAndSort();
    });
  }

  filterProductos() {
    this.currentPage = 1;
    this.applyFilterAndSort();
  }

  applyFilterAndSort() {
    const term = this.searchProd.toLowerCase();
    let result = this.productos.filter(p =>
      p.productNumber.toLowerCase().includes(term) ||
      p.productName.toLowerCase().includes(term)
    );
    // Sort
    const dir = this.sortDirection === 'asc' ? 1 : -1;
    result.sort((a, b) => {
      const va = this.getCellVal(a, this.sortColumn);
      const vb = this.getCellVal(b, this.sortColumn);
      if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir;
      return String(va).localeCompare(String(vb)) * dir;
    });
    this.allFiltered = result;
    this.totalPages = Math.max(1, Math.ceil(result.length / this.pageSize));
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
    this.pageNumbers = [];
    for (let i = 1; i <= this.totalPages; i++) this.pageNumbers.push(i);
    const start = (this.currentPage - 1) * this.pageSize;
    this.filteredProductos = result.slice(start, start + this.pageSize);
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
        const doc = new jsPDF({ orientation: 'landscape' });
        const autoTable = autotable.default;
        const headers = visCols.map(c => c.label);
        const rows = this.allFiltered.map(p => visCols.map(c => this.getCellVal(p, c.key)));
        doc.setFontSize(16); doc.text('Product Report', 14, 15);
        doc.setFontSize(10); doc.text(`Generado: ${new Date().toLocaleDateString()}`, 14, 22);
        autoTable(doc, { head: [headers], body: rows, startY: 28, styles: { fontSize: 7 }, headStyles: { fillColor: [22, 163, 74] } });
        doc.save(`Product_Report.pdf`);
      }).catch(err => console.error("Error loading autotable:", err));
    }).catch(err => console.error("Error loading jspdf:", err));
  }

  exportXLS() {
    this.showExportMenu = false;
    const visCols = this.allColumns.filter(c => c.visible);
    const headers = visCols.map(c => c.label);
    const rows = this.allFiltered.map(p => visCols.map(c => this.getCellVal(p, c.key)));
    let html = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">';
    html += '<head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';
    html += '<x:Name>Product</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>';
    html += '</x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>';
    html += '<table border="1"><thead><tr>';
    headers.forEach(h => html += `<th style="background-color:#16a34a;color:white;font-weight:bold;">${h}</th>`);
    html += '</tr></thead><tbody>';
    rows.forEach(row => { html += '<tr>'; row.forEach(cell => html += `<td>${cell}</td>`); html += '</tr>'; });
    html += '</tbody></table></body></html>';
    const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'Product_Report.xls'; a.click();
    URL.revokeObjectURL(url);
  }

  // Form - New/Edit
  openNewProduct() {
    this.isEditing = false;
    this.formData = { productNumber: '', productName: '', unit: '', cost: 0, tipoProducto: '', packaging: '', subProductType: '', exist: 0, group: '', piecesPlt: 0, product8020: '', pallets: 0, isActive: true };
    this.showForm = true;
  }

  editProduct(p: SaeProducto) {
    this.isEditing = true;
    this.formData = { ...p };
    this.showForm = true;
  }

  deleteProduct(p: SaeProducto) {
    if (confirm(`¿Eliminar el producto "${p.productNumber} - ${p.productName}"?`)) {
      // In a real scenario this would call an API delete endpoint
      this.productos = this.productos.filter(x => x.productNumber !== p.productNumber);
      this.applyFilterAndSort();
    }
  }

  confirmProduct() {
    if (!this.formData.productNumber) { alert('El campo Producto es requerido'); return; }
    if (this.isEditing) {
      const idx = this.productos.findIndex(p => p.productNumber === this.formData.productNumber);
      if (idx >= 0) this.productos[idx] = { ...this.formData };
    } else {
      this.productos.push({ ...this.formData });
    }
    this.applyFilterAndSort();
    this.showForm = false;
  }

  cancelForm() { this.showForm = false; }

  private getCellVal(p: SaeProducto, key: string): any {
    switch (key) {
      case 'productNumber': return p.productNumber;
      case 'productName': return p.productName;
      case 'unit': return p.unit || 'MILLAR';
      case 'cost': return p.cost || 0;
      case 'tipoProducto': return p.tipoProducto || '';
      case 'packaging': return p.packaging || '';
      case 'subProductType': return p.subProductType || '';
      case 'exist': return p.exist;
      case 'group': return p.group || '';
      case 'piecesPlt': return p.piecesPlt;
      case 'product8020': return p.product8020 || '';
      case 'pallets': return p.pallets;
      default: return '';
    }
  }
}
