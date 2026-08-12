import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SaeService, SaeBudget, SaeCliente, SaeProducto } from '../../../core/services/sae';

interface ColumnDef {
  key: string;
  label: string;
  visible: boolean;
}

import { LucideFileText, LucideSearch } from '@lucide/angular';

@Component({
  selector: 'app-sae-budget',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideFileText, LucideSearch],
  template: `
    <div class="wwp-container" (click)="onDocumentClick($event)">
      <div class="wwp-header">
        <h1>Budget</h1>
        <div class="wwp-breadcrumbs">Reportes &gt; Budget</div>
      </div>

      <div class="wwp-content">
        <div class="wwp-toolbar">
          <div class="wwp-toolbar-left">
            <button class="btn-wwp-outline btn-add" title="Editar presupuesto" (click)="goToEditBudget()">
              <span class="icon">➕</span>
            </button>
            <div class="export-dropdown-wrapper">
              <button class="btn-wwp-outline" (click)="toggleExportMenu($event)">
                <span class="icon">📥</span> Exportar <span class="caret">▼</span>
              </button>
              <div class="export-dropdown" *ngIf="showExportMenu">
                <button class="export-option" (click)="exportPDF()"><svg lucideFileText [size]="14"></svg> Exportar a PDF</button>
                <button class="export-option" (click)="exportXLS()">📊 Exportar a Excel (XLS)</button>
              </div>
            </div>
            <!-- Column Selector -->
            <div class="col-selector-wrapper">
              <button class="btn-wwp-primary-col" (click)="toggleColumnSelector($event)">
                Selecciona columnas <span class="caret-white">▼</span>
              </button>
              <div class="col-selector-dropdown" *ngIf="showColumnSelector">
                <div class="col-selector-search">
                  <input type="text" placeholder="" [(ngModel)]="colSearchTxt" (input)="filterColumns()">
                </div>
                <div class="col-selector-list">
                  <!-- Fijas a la izquierda -->
                  <div class="col-section-header">
                    <label><input type="checkbox" checked disabled> Fijas a la izquierda <span class="caret-sm">▼</span></label>
                  </div>
                  <div class="col-section-item indent">
                    <label><input type="checkbox" checked disabled> (Ninguna)</label>
                  </div>
                  <!-- No fijas -->
                  <div class="col-section-header">
                    <label><input type="checkbox" [checked]="allVisible()" (change)="toggleAll($event)"> No fijas <span class="caret-sm">▼</span></label>
                  </div>
                  <ng-container *ngFor="let col of filteredColumns">
                    <div class="col-section-item indent">
                      <label><input type="checkbox" [(ngModel)]="col.visible"> {{ col.label }}</label>
                    </div>
                  </ng-container>
                  <!-- Fijas a la derecha -->
                  <div class="col-section-header">
                    <label><input type="checkbox" checked disabled> Fijas a la derecha <span class="caret-sm">▼</span></label>
                  </div>
                  <div class="col-section-item indent">
                    <label><input type="checkbox" checked disabled> (Ninguna)</label>
                  </div>
                </div>
                <div class="col-selector-footer">
                  <button class="btn-col-reset" (click)="resetColumns()">↩</button>
                  <button class="btn-wwp-primary" (click)="applyColumns()">Actualizar</button>
                </div>
              </div>
            </div>
          </div>
          <div class="wwp-toolbar-right">
            <span class="filter-icon"><svg lucideSearch [size]="14"></svg></span>
            <input type="text" class="wwp-search-input" placeholder="Buscar" [(ngModel)]="searchTxt" (input)="filterBudgets()">
          </div>
        </div>

        <div class="wwp-table-container" id="budget-table">
          <table class="wwp-table">
            <thead>
              <tr>
                <th *ngIf="isVisible('customerCode')" class="sortable" (click)="sortBy('customerCode')">Código Cliente <span class="sort-icon">{{ getSortIcon('customerCode') }}</span></th>
                <th *ngIf="isVisible('customerName')" class="sortable" (click)="sortBy('customerName')">Cliente <span class="sort-icon">{{ getSortIcon('customerName') }}</span></th>
                <th *ngIf="isVisible('shipping')" class="sortable" (click)="sortBy('shipping')">Envió <span class="sort-icon">{{ getSortIcon('shipping') }}</span></th>
                <th *ngIf="isVisible('group')" class="sortable" (click)="sortBy('group')">Grupo <span class="sort-icon">{{ getSortIcon('group') }}</span></th>
                <th *ngIf="isVisible('description')" class="sortable" (click)="sortBy('description')">Descripción <span class="sort-icon">{{ getSortIcon('description') }}</span></th>
                <th *ngIf="isVisible('year')" class="sortable" (click)="sortBy('year')">Year <span class="sort-icon">{{ getSortIcon('year') }}</span></th>
                <th *ngIf="isVisible('month')" class="sortable" (click)="sortBy('month')">Month <span class="sort-icon">{{ getSortIcon('month') }}</span></th>
                <th *ngIf="isVisible('real')" class="sortable" (click)="sortBy('real')">Real <span class="sort-icon">{{ getSortIcon('real') }}</span></th>
                <th *ngIf="isVisible('estimated')" class="sortable" (click)="sortBy('estimated')">Estimated <span class="sort-icon">{{ getSortIcon('estimated') }}</span></th>
                <th *ngIf="isVisible('outlook')" class="sortable" (click)="sortBy('outlook')">Outlook <span class="sort-icon">{{ getSortIcon('outlook') }}</span></th>
                <th *ngIf="isVisible('price')" class="sortable" (click)="sortBy('price')">Price <span class="sort-icon">{{ getSortIcon('price') }}</span></th>
                <th *ngIf="isVisible('priceOutlook')" class="sortable" (click)="sortBy('priceOutlook')">Price Outlook <span class="sort-icon">{{ getSortIcon('priceOutlook') }}</span></th>
                <th *ngIf="isVisible('dif')" class="sortable" (click)="sortBy('dif')">Dif <span class="sort-icon">{{ getSortIcon('dif') }}</span></th>
                <th *ngIf="isVisible('difP')" class="sortable" (click)="sortBy('difP')">Dif % <span class="sort-icon">{{ getSortIcon('difP') }}</span></th>
                <th *ngIf="isVisible('difPrev')" class="sortable" (click)="sortBy('difPrev')">Dif Previous <span class="sort-icon">{{ getSortIcon('difPrev') }}</span></th>
                <th *ngIf="isVisible('previous')" class="sortable" (click)="sortBy('previous')">Previous <span class="sort-icon">{{ getSortIcon('previous') }}</span></th>
                <th *ngIf="isVisible('previousP')" class="sortable" (click)="sortBy('previousP')">Previous P <span class="sort-icon">{{ getSortIcon('previousP') }}</span></th>
                <th *ngIf="isVisible('realAccum')" class="sortable" (click)="sortBy('realAccum')">Real Accumulated <span class="sort-icon">{{ getSortIcon('realAccum') }}</span></th>
                <th *ngIf="isVisible('estAccum')" class="sortable" (click)="sortBy('estAccum')">Estimated Accumulated <span class="sort-icon">{{ getSortIcon('estAccum') }}</span></th>
                <th *ngIf="isVisible('accumDif')" class="sortable" (click)="sortBy('accumDif')">Accumulated Dif <span class="sort-icon">{{ getSortIcon('accumDif') }}</span></th>
                <th *ngIf="isVisible('prevAccum')" class="sortable" (click)="sortBy('prevAccum')">Previous Accumulated <span class="sort-icon">{{ getSortIcon('prevAccum') }}</span></th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let b of filteredBudgets">
                <td *ngIf="isVisible('customerCode')">{{ b.customerCode }}</td>
                <td *ngIf="isVisible('customerName')">{{ getCustomerName(b.customerCode) }}</td>
                <td *ngIf="isVisible('shipping')">{{ getCustomerShipping(b.customerCode) }}</td>
                <td *ngIf="isVisible('group')">{{ b.consolidatedName || 'General' }}</td>
                <td *ngIf="isVisible('description')">{{ getProductName(b.productNumber) }}</td>
                <td *ngIf="isVisible('year')">{{ b.budgetYear }}</td>
                <td *ngIf="isVisible('month')">{{ b.budgetMonth }}</td>
                <td *ngIf="isVisible('real')">{{ b.budgetReal | number:'1.0-0' }}</td>
                <td *ngIf="isVisible('estimated')">{{ b.budgetEstimated | number:'1.0-0' }}</td>
                <td *ngIf="isVisible('outlook')">{{ b.budgetOutlook | number:'1.0-0' }}</td>
                <td *ngIf="isVisible('price')">{{ b.budgetPrice | currency:'USD' }}</td>
                <td *ngIf="isVisible('priceOutlook')">{{ b.budgetPriceOutlook | currency:'USD' }}</td>
                <td *ngIf="isVisible('dif')" [ngClass]="{'text-red': (b.budgetReal - b.budgetEstimated) < 0}">{{ (b.budgetReal - b.budgetEstimated) | number:'1.0-0' }}</td>
                <td *ngIf="isVisible('difP')" [ngClass]="{'text-red': getDifPercent(b) < 0}">{{ getDifPercent(b) | number:'1.2-2' }}%</td>
                <td *ngIf="isVisible('difPrev')">0</td>
                <td *ngIf="isVisible('previous')">0</td>
                <td *ngIf="isVisible('previousP')">0%</td>
                <td *ngIf="isVisible('realAccum')">{{ b.budgetReal | number:'1.0-0' }}</td>
                <td *ngIf="isVisible('estAccum')">{{ b.budgetEstimated | number:'1.0-0' }}</td>
                <td *ngIf="isVisible('accumDif')">{{ (b.budgetReal - b.budgetEstimated) | number:'1.0-0' }}</td>
                <td *ngIf="isVisible('prevAccum')">0</td>
              </tr>
              <tr *ngIf="filteredBudgets.length === 0">
                <td [attr.colspan]="visibleCount()" class="empty-row">No se encontraron registros</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../catalogos-sae.component.css']
})
export class BudgetComponent implements OnInit {
  private saeService = inject(SaeService);
  private router = inject(Router);
  budgets: SaeBudget[] = [];
  filteredBudgets: SaeBudget[] = [];
  clientes: SaeCliente[] = [];
  productos: SaeProducto[] = [];
  searchTxt = '';
  showExportMenu = false;
  showColumnSelector = false;
  colSearchTxt = '';
  sortColumn = 'customerCode';
  sortDirection: 'asc' | 'desc' = 'asc';

  allColumns: ColumnDef[] = [
    { key: 'customerCode', label: 'Código Cliente', visible: true },
    { key: 'customerName', label: 'Cliente', visible: true },
    { key: 'shipping', label: 'Envió', visible: true },
    { key: 'group', label: 'Grupo', visible: true },
    { key: 'description', label: 'Descripción', visible: true },
    { key: 'year', label: 'Year', visible: true },
    { key: 'month', label: 'Month', visible: true },
    { key: 'real', label: 'Real', visible: true },
    { key: 'estimated', label: 'Estimated', visible: true },
    { key: 'outlook', label: 'Outlook', visible: true },
    { key: 'price', label: 'Price', visible: true },
    { key: 'priceOutlook', label: 'Price Outlook', visible: true },
    { key: 'dif', label: 'Dif', visible: true },
    { key: 'difP', label: 'Dif P', visible: true },
    { key: 'difPrev', label: 'Dif Previous', visible: false },
    { key: 'previous', label: 'Previous', visible: false },
    { key: 'previousP', label: 'Previous P', visible: false },
    { key: 'realAccum', label: 'Real Accumulated', visible: false },
    { key: 'estAccum', label: 'Estimated Accumulated', visible: false },
    { key: 'accumDif', label: 'Accumulated Dif', visible: false },
    { key: 'prevAccum', label: 'Previous Accumulated', visible: false },
  ];

  filteredColumns: ColumnDef[] = [...this.allColumns];

  ngOnInit() {
    this.saeService.getClientes().subscribe(c => this.clientes = c);
    this.saeService.getProductos().subscribe(p => this.productos = p);
    this.loadBudgets();
    this.filteredColumns = [...this.allColumns];
  }

  loadBudgets() {
    this.saeService.getBudgets(new Date().getFullYear()).subscribe(data => {
      this.budgets = data;
      this.filteredBudgets = data;
      this.applySorting();
    });
  }

  filterBudgets() {
    const term = this.searchTxt.toLowerCase();
    this.filteredBudgets = this.budgets.filter(b =>
      b.customerCode.toLowerCase().includes(term) ||
      b.productNumber.toLowerCase().includes(term)
    );
    this.applySorting();
  }

  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applySorting();
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) return '▼';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  applySorting() {
    const dir = this.sortDirection === 'asc' ? 1 : -1;
    this.filteredBudgets = [...this.filteredBudgets].sort((a, b) => {
      const valA = this.getCellValue(a, this.sortColumn);
      const valB = this.getCellValue(b, this.sortColumn);
      if (typeof valA === 'number' && typeof valB === 'number') {
        return (valA - valB) * dir;
      }
      return String(valA).localeCompare(String(valB)) * dir;
    });
  }

  getCustomerName(code: string): string {
    return this.clientes.find(c => c.customerCode === code)?.customerName || code;
  }

  getCustomerShipping(code: string): string {
    return this.clientes.find(c => c.customerCode === code)?.shipping || '';
  }

  getProductName(code: string): string {
    return this.productos.find(p => p.productNumber === code)?.productName || code;
  }

  getDifPercent(b: SaeBudget): number {
    if (!b.budgetEstimated || b.budgetEstimated === 0) return 0;
    return ((b.budgetReal - b.budgetEstimated) / b.budgetEstimated) * 100;
  }

  goToEditBudget() {
    this.router.navigate(['/reportes-sae/presupuesto']);
  }

  // --- Export ---
  toggleExportMenu(e: Event) {
    e.stopPropagation();
    this.showExportMenu = !this.showExportMenu;
    this.showColumnSelector = false;
  }

  // --- Column Selector ---
  toggleColumnSelector(e: Event) {
    e.stopPropagation();
    this.showColumnSelector = !this.showColumnSelector;
    this.showExportMenu = false;
    if (this.showColumnSelector) {
      this.colSearchTxt = '';
      this.filteredColumns = [...this.allColumns];
    }
  }

  filterColumns() {
    const term = this.colSearchTxt.toLowerCase();
    this.filteredColumns = this.allColumns.filter(c => c.label.toLowerCase().includes(term));
  }

  isVisible(key: string): boolean {
    return this.allColumns.find(c => c.key === key)?.visible ?? true;
  }

  visibleCount(): number {
    return this.allColumns.filter(c => c.visible).length;
  }

  allVisible(): boolean {
    return this.allColumns.every(c => c.visible);
  }

  toggleAll(e: Event) {
    const checked = (e.target as HTMLInputElement).checked;
    this.allColumns.forEach(c => c.visible = checked);
  }

  resetColumns() {
    this.allColumns.forEach(c => {
      // Default: first 14 visible, rest hidden
      const defaultVisible = ['customerCode','customerName','shipping','group','description','year','month','real','estimated','outlook','price','priceOutlook','dif','difP'];
      c.visible = defaultVisible.includes(c.key);
    });
    this.filteredColumns = [...this.allColumns];
  }

  applyColumns() {
    this.showColumnSelector = false;
  }

  onDocumentClick(e: Event) {
    const target = e.target as HTMLElement;
    if (!target.closest('.export-dropdown-wrapper')) {
      this.showExportMenu = false;
    }
    if (!target.closest('.col-selector-wrapper')) {
      this.showColumnSelector = false;
    }
  }

  // --- Exports ---
  exportPDF() {
    this.showExportMenu = false;
    import('jspdf').then(jspdf => {
      import('jspdf-autotable').then(autotable => {
        const jsPDF = jspdf.jsPDF;
        const autoTable = (autotable as any).default;
        const doc = new jsPDF({ orientation: 'landscape' });
        const visibleCols = this.allColumns.filter(c => c.visible);
        const headers = visibleCols.map(c => c.label);
        const rows = this.filteredBudgets.map(b => {
          return visibleCols.map(col => this.getCellValue(b, col.key));
        });

        doc.setFontSize(16);
        doc.text('Budget Report', 14, 15);
        doc.setFontSize(10);
        doc.text(`Generado: ${new Date().toLocaleDateString()}`, 14, 22);

        autoTable(doc, {
          head: [headers],
          body: rows,
          startY: 28,
          styles: { fontSize: 7 },
          headStyles: { fillColor: [22, 163, 74] }
        });

        doc.save(`Budget_Report_${new Date().getFullYear()}.pdf`);
      }).catch(err => console.error("Error loading autotable:", err));
    }).catch(err => console.error("Error loading jspdf:", err));
  }

  exportXLS() {
    this.showExportMenu = false;
    const visibleCols = this.allColumns.filter(c => c.visible);
    const headers = visibleCols.map(c => c.label);
    const rows = this.filteredBudgets.map(b => visibleCols.map(col => this.getCellValue(b, col.key)));

    let html = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">';
    html += '<head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';
    html += '<x:Name>Budget</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>';
    html += '</x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>';
    html += '<table border="1"><thead><tr>';
    headers.forEach(h => html += `<th style="background-color:#16a34a;color:white;font-weight:bold;">${h}</th>`);
    html += '</tr></thead><tbody>';
    rows.forEach(row => {
      html += '<tr>';
      row.forEach(cell => html += `<td>${cell}</td>`);
      html += '</tr>';
    });
    html += '</tbody></table></body></html>';

    const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Budget_Report_${new Date().getFullYear()}.xls`;
    a.click();
    URL.revokeObjectURL(url);
  }

  private getCellValue(b: SaeBudget, key: string): any {
    switch(key) {
      case 'customerCode': return b.customerCode;
      case 'customerName': return this.getCustomerName(b.customerCode);
      case 'shipping': return this.getCustomerShipping(b.customerCode);
      case 'group': return b.consolidatedName || 'General';
      case 'description': return this.getProductName(b.productNumber);
      case 'year': return b.budgetYear;
      case 'month': return b.budgetMonth;
      case 'real': return b.budgetReal;
      case 'estimated': return b.budgetEstimated;
      case 'outlook': return b.budgetOutlook;
      case 'price': return b.budgetPrice;
      case 'priceOutlook': return b.budgetPriceOutlook;
      case 'dif': return b.budgetReal - b.budgetEstimated;
      case 'difP': return b.budgetEstimated ? (((b.budgetReal - b.budgetEstimated) / b.budgetEstimated) * 100).toFixed(2) + '%' : '0%';
      case 'difPrev': return 0;
      case 'previous': return 0;
      case 'previousP': return '0%';
      case 'realAccum': return b.budgetReal;
      case 'estAccum': return b.budgetEstimated;
      case 'accumDif': return b.budgetReal - b.budgetEstimated;
      case 'prevAccum': return 0;
      default: return '';
    }
  }
}
