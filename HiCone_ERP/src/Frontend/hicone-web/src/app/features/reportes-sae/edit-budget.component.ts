import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaeService, SaeBudget, SaeCliente, SaeProducto } from '../../core/services/sae';

interface BudgetRow {
  customerCode: string;
  customerName: string;
  shipping: string;
  consolidatedName: string;
  productNumber: string;
  months: { [key: number]: number };
}

@Component({
  selector: 'app-edit-budget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="wwp-container">
      <div class="wwp-header">
        <h1>Edit Budget</h1>
        <div class="wwp-breadcrumbs">Reportes &gt; Budget</div>
      </div>

      <div class="wwp-content">
        <h2 class="sub-title">Update Budget</h2>
        
        <div class="wwp-filters-panel">
          <div class="filter-row">
            <label>Consolidated Name</label>
            <select [(ngModel)]="filterConsolidatedName">
              <option value="">(Ninguno)</option>
              <option *ngFor="let g of groups" [value]="g">{{ g }}</option>
            </select>
          </div>
          <div class="filter-row">
            <label>Product Number</label>
            <select [(ngModel)]="filterProductNumber">
              <option value="">(Ninguno)</option>
              <option *ngFor="let p of products" [value]="p.productNumber">{{ p.productNumber }} - {{ p.productName }}</option>
            </select>
          </div>
          <div class="filter-row">
            <label>Budget Year</label>
            <select [(ngModel)]="filterYear">
              <option value="">(Ninguno)</option>
              <option [value]="currentYear - 1">{{ currentYear - 1 }}</option>
              <option [value]="currentYear">{{ currentYear }}</option>
              <option [value]="currentYear + 1">{{ currentYear + 1 }}</option>
            </select>
          </div>
        </div>

        <button class="btn-wwp-primary mb-3" (click)="loadBudgets()">REFRESH DATA</button>

        <div class="wwp-table-container">
          <table class="wwp-table matrix-table">
            <thead>
              <tr>
                <th class="col-wide">Customer Name</th>
                <th class="col-wide">Shipping</th>
                <th *ngFor="let m of months">{{ m }}</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let row of matrixData">
                <td class="cell-bold">{{ row.customerName }}</td>
                <td>{{ row.shipping }}</td>
                <td *ngFor="let m of [1,2,3,4,5,6,7,8,9,10,11,12]">
                  <input type="number" class="matrix-input" [(ngModel)]="row.months[m]" (change)="recalculateTotals()">
                </td>
              </tr>
              <tr *ngIf="matrixData.length === 0">
                <td colspan="14" class="empty-row" style="border-bottom: 2px solid #16a34a;">No se encontraron registros</td>
              </tr>
              <tr class="total-row">
                <td class="cell-bold">TOTAL</td>
                <td>:</td>
                <td *ngFor="let m of [1,2,3,4,5,6,7,8,9,10,11,12]" class="cell-bold">
                  {{ totals[m] || 0 | number:'1.0-0' }}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <th *ngFor="let m of months">{{ m }}</th>
              </tr>
            </tfoot>
          </table>
        </div>
        
        <button class="btn-wwp-primary mt-3" (click)="saveData()" [disabled]="saving">
          {{ saving ? 'UPDATING...' : 'UPDATE DATA' }}
        </button>
      </div>
    </div>
  `,
  styleUrls: ['../catalogos-sae/catalogos-sae.component.css']
})
export class EditBudgetComponent implements OnInit {
  private saeService = inject(SaeService);

  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  currentYear = new Date().getFullYear();

  filterConsolidatedName = '';
  filterProductNumber = '';
  filterYear: any = this.currentYear;

  groups: string[] = [];
  products: SaeProducto[] = [];
  clientes: SaeCliente[] = [];

  originalBudgets: SaeBudget[] = [];
  matrixData: BudgetRow[] = [];
  totals: { [key: number]: number } = {};
  saving = false;

  ngOnInit() {
    this.saeService.getProductos().subscribe(p => this.products = p);
    this.saeService.getClientes().subscribe(c => {
      this.clientes = c;
      const grps = new Set<string>();
      c.forEach(x => { if (x.consolidatedName) grps.add(x.consolidatedName); });
      this.groups = Array.from(grps).sort();
    });
  }

  loadBudgets() {
    if (!this.filterYear || !this.filterProductNumber) {
      alert('Please select a Product Number and Budget Year to refresh data.');
      return;
    }

    this.saeService.getBudgets(this.filterYear, this.filterConsolidatedName || undefined, this.filterProductNumber).subscribe(data => {
      this.originalBudgets = data;
      this.buildMatrix();
    });
  }

  buildMatrix() {
    const map = new Map<string, BudgetRow>();

    let validCustomers = this.clientes;
    if (this.filterConsolidatedName) {
      validCustomers = validCustomers.filter(c => c.consolidatedName === this.filterConsolidatedName);
    }

    validCustomers.forEach(c => {
      map.set(c.customerCode, {
        customerCode: c.customerCode,
        customerName: c.customerName,
        shipping: c.shipping || '',
        consolidatedName: c.consolidatedName || 'General',
        productNumber: this.filterProductNumber,
        months: { 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0 }
      });
    });

    this.originalBudgets.forEach(b => {
      if (map.has(b.customerCode)) {
        map.get(b.customerCode)!.months[b.budgetMonth] = b.budgetEstimated;
      }
    });

    this.matrixData = Array.from(map.values()).sort((a, b) => a.customerName.localeCompare(b.customerName));
    this.recalculateTotals();
  }

  recalculateTotals() {
    for (let m = 1; m <= 12; m++) {
      this.totals[m] = this.matrixData.reduce((sum, row) => sum + (Number(row.months[m]) || 0), 0);
    }
  }

  saveData() {
    this.saving = true;
    const toSave: SaeBudget[] = [];

    this.matrixData.forEach(row => {
      for (let m = 1; m <= 12; m++) {
        const val = Number(row.months[m]) || 0;

        const existing = this.originalBudgets.find(x =>
          x.customerCode === row.customerCode && x.budgetMonth === m && x.productNumber === this.filterProductNumber
        );

        toSave.push({
          customerCode: row.customerCode,
          customerName: row.customerName,
          consolidatedName: row.consolidatedName,
          productNumber: this.filterProductNumber,
          budgetYear: Number(this.filterYear),
          budgetMonth: m,
          budgetEstimated: val,
          budgetReal: existing ? existing.budgetReal : 0,
          budgetOutlook: existing ? existing.budgetOutlook : 0,
          budgetPrice: existing ? existing.budgetPrice : 0,
          budgetPriceOutlook: existing ? existing.budgetPriceOutlook : 0
        });
      }
    });

    this.saeService.saveBudgets(toSave).subscribe({
      next: () => {
        this.saving = false;
        alert('Data updated successfully');
        this.loadBudgets();
      },
      error: () => {
        this.saving = false;
        alert('Error updating data');
      }
    });
  }
}
