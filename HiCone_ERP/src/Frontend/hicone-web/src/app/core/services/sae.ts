import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface SaeProducto {
  productNumber: string;
  productName: string;
  unit?: string;
  price?: number;
  cost: number;
  tipoProducto?: string;
  packaging?: string;
  subProductType?: string;
  exist: number;
  group?: string;
  piecesPlt: number;
  product8020?: string;
  pallets: number;
  isActive: boolean;
}

export interface SaePedido {
  id?: string;
  orderDoc: string;
  orderDate: Date;
  orderDeliveryDate?: Date;
  customerCode: string;
  customerName?: string;
  totalAmount: number;
  procesada: boolean;
}

export interface SaeRemision {
  remissionDoc: string;
  orderDoc: string;
  remissionDate: Date;
  productNumber?: string;
  quantity: number;
  customerCode?: string;
  customerName?: string;
  shipping?: string;
}

export interface SaeCliente {
  customerCode: string;
  customerName: string;
  consolidatedName?: string;
  shipping?: string;
  email?: string;
  phone?: string;
  rfc?: string;
  isActive: boolean;
}

export interface SaeBudget {
  customerCode: string;
  customerName?: string;
  consolidatedName?: string;
  productNumber: string;
  budgetYear: number;
  budgetMonth: number;
  budgetEstimated: number;
  budgetReal: number;
  budgetOutlook: number;
  budgetPrice: number;
  budgetPriceOutlook: number;
}

export interface SaeSalesPerson {
  salesPersonName: string;
  salesPersonActive: boolean;
}

export interface SaeBudgetSummary {
  productNumber: string;
  consolidatedName: string;
  totalEstimated: number;
  totalReal: number;
  compliancePercent: number;
}

export interface SaeKPIs {
  ventasTotalesMes: number;
  pedidosPendientes: number;
  totalPedidos: number;
  crecimientoVsMesAnterior: number;
}

export interface OrderDetail {
  order: SaePedido;
  remisiones: SaeRemision[];
}

export interface ItwOutlookRow {
  productNumber: string;
  consolidatedName: string;
  currentStock: number;
  pendingOrders: number;
  budgetRemaining: number;
  coveragePercent: number;
  status: string; // 'CRITICAL', 'WARNING', 'OK'
}

export interface RealtimeInventoryRow {
  productNumber: string;
  productName: string;
  silosTotal: number;
  bobinasTotal: number;
  totalStock: number;
  saeDemand: number;
  balance: number;
}

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaeService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/v1/sae`;

  // Productos
  getProductos(): Observable<SaeProducto[]> {
    return this.http.get<SaeProducto[]>(`${this.apiUrl}/productos`);
  }

  // Clientes
  getClientes(): Observable<SaeCliente[]> {
    return this.http.get<SaeCliente[]>(`${this.apiUrl}/clientes`);
  }

  getSalesPersons(): Observable<SaeSalesPerson[]> {
    return this.http.get<SaeSalesPerson[]>(`${this.apiUrl}/salespersons`);
  }

  // Órdenes
  getOrdenesPendientes(): Observable<SaePedido[]> {
    return this.http.get<SaePedido[]>(`${this.apiUrl}/ordenes-pendientes`);
  }

  getPedidos(): Observable<SaePedido[]> {
    return this.getOrdenesPendientes();
  }

  getAllOrdenes(): Observable<SaePedido[]> {
    return this.http.get<SaePedido[]>(`${this.apiUrl}/ordenes`);
  }

  getOrderDetail(orderDoc: string): Observable<OrderDetail> {
    return this.http.get<OrderDetail>(`${this.apiUrl}/ordenes/${encodeURIComponent(orderDoc)}`);
  }

  getRemisiones(orderDoc: string): Observable<SaeRemision[]> {
    return this.http.get<SaeRemision[]>(`${this.apiUrl}/remisiones/${encodeURIComponent(orderDoc)}`);
  }

  // Presupuestos
  getBudgets(year: number, consolidatedName?: string, productNumber?: string): Observable<SaeBudget[]> {
    let url = `${this.apiUrl}/budgets?year=${year}`;
    if (consolidatedName) url += `&consolidatedName=${encodeURIComponent(consolidatedName)}`;
    if (productNumber) url += `&productNumber=${encodeURIComponent(productNumber)}`;
    return this.http.get<SaeBudget[]>(url);
  }

  saveBudgets(budgets: SaeBudget[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/budgets`, budgets);
  }

  getReporteFTB(anio: number, mes: number): Observable<SaeBudgetSummary[]> {
    return this.http.get<SaeBudgetSummary[]>(`${this.apiUrl}/reporte-ftb?anio=${anio}&mes=${mes}`).pipe(
      catchError(() => of([]))
    );
  }

  // ITW y Realtime
  getItwOutlook(): Observable<ItwOutlookRow[]> {
    return this.http.get<ItwOutlookRow[]>(`${this.apiUrl}/itw-outlook`).pipe(
      catchError(() => of([]))
    );
  }

  getRealtimeInventory(): Observable<RealtimeInventoryRow[]> {
    return this.http.get<RealtimeInventoryRow[]>(`${this.apiUrl}/realtime-inventory`).pipe(
      catchError(() => of([]))
    );
  }

  // KPIs
  getKPIs(): Observable<SaeKPIs> {
    return this.http.get<SaeKPIs>(`${this.apiUrl}/kpis`).pipe(
      catchError(() => of({ ventasTotalesMes: 0, pedidosPendientes: 0, totalPedidos: 0, crecimientoVsMesAnterior: 0 }))
    );
  }

  // Sincronización
  sincronizar(): Observable<any> {
    return this.http.post(`${this.apiUrl}/sincronizar`, {});
  }
}
