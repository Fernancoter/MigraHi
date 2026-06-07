import { Component, OnInit, HostListener, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { InventarioService } from '../../../core/services/inventario.service';
import { PdfExportService } from '../../../core/services/pdf-export.service';

interface InventarioRecord {
  id: string;
  fechaHora: string;
  turno: string;
}

interface ColumnDef {
  id: string;
  label: string;
  visible: boolean;
}

@Component({
  selector: 'app-inventario-index',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="page-container animate-fade-in">
      <div class="page-header-modern">
        <div class="header-info">
          <h1 class="page-title premium-title">Existencia</h1>
          <nav class="breadcrumb-modern">
            <span>Inventarios</span>
            <span class="separator">></span>
            <span class="active">Inventario</span>
          </nav>
        </div>
      </div>

      <div class="card-premium shadow-2xl">
        <div class="toolbar-premium">
          <div class="toolbar-left">
            <button class="btn-icon add-btn" (click)="abrirModalNuevo()">
              <span class="icon">+</span>
            </button>
            <div class="dropdown-container">
              <button class="btn-toolbar" (click)="toggleExport($event)">
                <span class="icon">📤</span> Exportar <span class="arrow">▼</span>
              </button>
              <div class="dropdown-menu shadow-premium" *ngIf="showExportSelector" (click)="$event.stopPropagation()">
                <div class="dropdown-item" (click)="exportToCSV()">📄 Excel (CSV)</div>
                <div class="dropdown-item" (click)="exportToPDF()">📕 PDF</div>
              </div>
            </div>
            <div class="dropdown-container">
              <button class="btn-toolbar" (click)="toggleColumns($event)">
                <span class="icon">📋</span> Selecciona columnas <span class="arrow">▼</span>
              </button>
              <div class="dropdown-menu shadow-premium" *ngIf="showColumnSelector" (click)="$event.stopPropagation()">
                <label class="dropdown-item custom-checkbox" *ngFor="let col of columns">
                  <input type="checkbox" [(ngModel)]="col.visible" (change)="saveColumnsState()">
                  <span class="checkmark"></span>
                  {{ col.label }}
                </label>
              </div>
            </div>
            <button class="btn-toolbar btn-icon">
              <span class="icon">📡</span>
            </button>
          </div>
          <div class="toolbar-right">
            <div class="search-funnel-group">
              
              <input type="text" class="search-input" placeholder="Buscar" [(ngModel)]="searchQuery" (input)="aplicarFiltros()">
            </div>
          </div>
        </div>

        <div class="table-modern-container">
          <table class="table-modern">
            <thead>
              <tr>
                <th class="action-header"></th>
                <th class="action-header"></th>
                <th *ngIf="isColVisible('fechaHora')" class="rel-pos">
                  <div class="header-cell-content">
                    <span>Fecha Hora</span>
                    <button class="filter-trigger-btn" [class.active]="activeDropdown === 'fechaHora'" (click)="toggleDropdown('fechaHora', $event)">
                      {{ sortColumn === 'fechaHora' ? (sortAsc ? '↑' : '↓') : '▼' }}
                    </button>
                  </div>
                  <div class="col-filter-dropdown shadow-premium" *ngIf="activeDropdown === 'fechaHora'" (click)="$event.stopPropagation()">
                    <div class="dropdown-item-action" (click)="setSort('fechaHora', true)"><span class="icon">↑↓</span> Ordenar Antiguos</div>
                    <div class="dropdown-item-action" (click)="setSort('fechaHora', false)"><span class="icon">↑↓</span> Ordenar Recientes</div>
                  </div>
                </th>
                <th *ngIf="isColVisible('turno')" class="rel-pos">
                  <div class="header-cell-content">
                    <span>Turno</span>
                    <button class="filter-trigger-btn" [class.active]="activeDropdown === 'turno'" (click)="toggleDropdown('turno', $event)">
                      {{ sortColumn === 'turno' ? (sortAsc ? '↑' : '↓') : '▼' }}
                    </button>
                  </div>
                  <div class="col-filter-dropdown shadow-premium text-left" *ngIf="activeDropdown === 'turno'" (click)="$event.stopPropagation()">
                    <div class="dropdown-item-action" (click)="setSort('turno', true)"><span class="icon">↑↓</span> Ordenar A-Z</div>
                    <div class="dropdown-item-action" (click)="setSort('turno', false)"><span class="icon">↑↓</span> Ordenar Z-A</div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of paginatedRegistros">
                <td class="action-cell">
                  <div class="dropdown-container">
                    <button class="btn-hamburger" (click)="toggleActionMenu(item.id, $event)">☰</button>
                    <div class="dropdown-menu action-menu shadow-premium" *ngIf="openActionMenuId === item.id" (click)="$event.stopPropagation()">
                      <div class="dropdown-item-action" (click)="irADetalle(item.id)">✏️ Modificar</div>
                      <div class="dropdown-item-action del" (click)="eliminarRegistro(item.id)">❌ Eliminar</div>
                    </div>
                  </div>
                </td>
                <td class="action-cell">
                  <a class="action-link-gx" (click)="irADetalle(item.id)">Inventario</a>
                </td>
                <td *ngIf="isColVisible('fechaHora')"><span class="datetime-cell">{{ item.fechaHora }}</span></td>
                <td *ngIf="isColVisible('turno')"><span class="turno-cell">{{ item.turno }}</span></td>
              </tr>
              <tr *ngIf="filteredRegistros.length === 0">
                <td colspan="4" class="text-center empty-row-premium">
                  🛸 No se encontraron registros de inventario.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="pagination-container-premium" *ngIf="filteredRegistros.length > 0">
          <div class="pagination-info">
            Página {{ currentPage }} de {{ totalPages }}
          </div>
          <div class="pagination-buttons">
            <button class="btn-page" [disabled]="currentPage === 1" (click)="goToPage(currentPage - 1)">Ant</button>
            <button *ngFor="let p of getPagesList()" class="btn-page number" [class.active]="currentPage === p" (click)="goToPage(p)">{{ p }}</button>
            <button class="btn-page" [disabled]="currentPage === totalPages" (click)="goToPage(currentPage + 1)">Sig</button>
          </div>
        </div>
      </div>

      <!-- Alertas -->
      <div class="alert-container-fixed" *ngIf="successMessage || errorMessage">
        <div class="alert-premium success animate-fade-in" *ngIf="successMessage">
          <span class="icon">✓</span>
          <div class="content">
            <strong>¡Éxito!</strong>
            <p>{{ successMessage }}</p>
          </div>
        </div>
        <div class="alert-premium error animate-fade-in" *ngIf="errorMessage">
          <span class="icon">⚠️</span>
          <div class="content">
            <strong>Error</strong>
            <p>{{ errorMessage }}</p>
          </div>
        </div>
      </div>

      <!-- Modal Eliminar -->
      <div class="modal-overlay" *ngIf="showModal && modalMode === 'DELETE'" (click)="showModal = false">
        <div class="legacy-card-premium animate-scale-in" (click)="$event.stopPropagation()">
          <div class="modal-header-legacy bg-danger">
            Eliminar Inventario
          </div>
          <div class="modal-body-legacy">
            <p class="modal-info text-danger" style="font-size: 1rem; color: #b91c1c; font-weight: 500;">¿Está completamente seguro de que desea eliminar este registro?</p>
            <p class="modal-info">Esta acción realizará un borrado lógico (Soft-Delete).</p>
          </div>
          <div class="modal-footer-legacy">
            <button class="btn-legacy secondary" (click)="showModal = false">Cancelar</button>
            <button class="btn-legacy danger" (click)="confirmarEliminar()" [disabled]="isSubmitting">
              {{ isSubmitting ? 'Eliminando...' : 'Eliminar Permanentemente' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Modal Agregar -->
      <div class="modal-overlay" *ngIf="showModal && modalMode === 'ADD'" (click)="showModal = false">
        <div class="legacy-card-premium animate-scale-in" (click)="$event.stopPropagation()">
          <div class="modal-header-legacy">
            Iniciar Nuevo Inventario
          </div>
          <div class="modal-body-legacy">
            <p class="modal-info">Seleccione el turno correspondiente para iniciar la captura de inventario.</p>
            <div class="form-row-modern-modal">
              <label class="legacy-label">Turno</label>
              <select class="legacy-input" [(ngModel)]="nuevoTurno">
                <option value="1er Turno">1er Turno</option>
                <option value="2do Turno">2do Turno</option>
                <option value="3er Turno">3er Turno</option>
              </select>
            </div>
          </div>
          <div class="modal-footer-legacy">
            <button class="btn-legacy secondary" (click)="showModal = false">Cancelar</button>
            <button class="btn-legacy" (click)="crearInventario()" [disabled]="isSubmitting">
              {{ isSubmitting ? 'Iniciando...' : 'Comenzar Captura' }}
            </button>
          </div>
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
    .btn-legacy:active { transform: translateY(0); }
    .btn-legacy.primary { background: #5cb85c; color: white; border-color: #4cae4c; }
    .btn-legacy.primary:hover { background: #449d44; }
    
    .btn-quick-xls {
      background: white; border: 1px solid #2e7d32; color: #2e7d32;
      padding: 0.8rem 1.2rem; border-radius: 8px; font-size: 1.1rem; cursor: pointer;
      font-weight: 600; display: flex; align-items: center; gap: 0.4rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05); transition: all 0.3s;
    }
    .btn-quick-xls:hover {
      background: #e8f5e9; transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(46,125,50,0.1);
    }
    
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
      background: none; border: none; color: #2e7d32; padding: 0.2rem 0.5rem; 
      cursor: pointer; font-size: 0.95rem; font-weight: 600;
      transition: color 0.2s;
    }
    .link-btn:hover { color: #1b5e20; text-decoration: underline; }
    .link-btn.delete { color: #d9534f; }
    .link-btn.delete:hover { color: #c9302c; }

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
    .btn-danger:hover { background: #c9302c !important; }

    /* Modal Legacy (Imagen 2) */
    .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(4px); }
    .legacy-card { background: white; width: 90%; max-width: 800px; border-radius: 12px; border: 1px solid #eee; box-shadow: 0 20px 40px rgba(0,0,0,0.2); overflow: hidden; }
    .modal-header-legacy { padding: 1.5rem 2rem; background: #fcfcfc; border-bottom: 1px solid #eee; color: #2c3e50; font-size: 1.3rem; font-weight: 700; display: flex; align-items: center; gap: 1rem; }
    .modal-body-legacy { padding: 2.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
    .form-row { border-bottom: 1px solid #f5f5f5; padding-bottom: 1rem; display: flex; flex-direction: column; gap: 0.6rem; }
    .form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; grid-column: span 2; }
    .legacy-label { font-size: 0.9rem; color: #7f8c8d; font-weight: 600; }
    .legacy-input, .legacy-select { border: 1px solid #edf2f7; background: #f8fafc; border-radius: 8px; padding: 0.8rem 1rem; width: 100%; outline: none; font-size: 1rem; transition: border-color 0.2s; }
    .legacy-input:focus { border-color: #5cb85c; background: #fff; }
    .readonly-text { padding: 0.8rem 1rem; background: #f1f2f6; border-radius: 8px; font-weight: bold; color: #2c3e50; }
    .checkbox-container-legacy { padding: 0.5rem 0; }
    .legacy-checkbox { width: 20px; height: 20px; cursor: pointer; accent-color: #5cb85c; }
    .modal-footer-legacy { padding: 1.5rem 2.5rem; background: #fcfcfc; display: flex; justify-content: flex-end; gap: 1rem; border-top: 1px solid #eee; }
    .btn-confirm { background: #5cb85c; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 6px; font-weight: 600; cursor: pointer; }
    .btn-cancel { background: #f1f2f6; border: none; padding: 0.8rem 1.5rem; border-radius: 6px; font-weight: 600; cursor: pointer; }
    .btn-danger { background: #d9534f !important; border-color: #d43f3a !important; }

    /* Estilos Filtros Avanzados (Embudo) */
    .search-funnel-group {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      position: relative;
    }
    
    .btn-funnel-search {
      background: white;
      border: 1px solid #dcdde1;
      border-radius: 4px;
      height: 34px;
      padding: 0 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.25rem;
      cursor: pointer;
      color: #2c3e50;
      transition: all 0.2s;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .btn-funnel-search:hover {
      background: #f8f9fa;
      border-color: #cbd5e1;
    }
    .btn-funnel-search .funnel-icon {
      color: #2c3e50;
    }
    .btn-funnel-search .arrow-mini {
      font-size: 0.55rem;
      color: #2c3e50;
      margin-left: 1px;
    }
    
    .search-filter-dropdown {
      position: absolute;
      top: calc(100% + 4px);
      right: 0;
      background: white;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      width: 280px;
      box-shadow: 0 6px 15px rgba(0,0,0,0.12);
      z-index: 200;
      padding: 0.75rem 0;
      display: flex;
      flex-direction: column;
      animation: fadeInDropdown 0.15s ease-out;
    }
    
    .dropdown-filter-section {
      padding: 0.25rem 1rem 0.5rem 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .dropdown-filter-group-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
    }
    .dropdown-filter-group {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }
    .dropdown-filter-label {
      font-size: 0.65rem;
      font-weight: 800;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .dropdown-filter-select, .dropdown-filter-input {
      width: 100%;
      padding: 0.35rem 0.5rem;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      font-size: 0.85rem;
      background: #f8fafc;
      color: #334155;
      font-weight: 600;
      outline: none;
      cursor: pointer;
      transition: all 0.2s;
    }
    .dropdown-filter-select:focus, .dropdown-filter-input:focus {
      border-color: #2e7d32;
      background: white;
    }
    
    .icon-circle-cross {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 13px;
      height: 13px;
      background-color: #64748b;
      color: white;
      border-radius: 50%;
      font-size: 7px;
      font-weight: bold;
      line-height: 1;
    }
    .dropdown-item-action:hover .icon-circle-cross {
      background-color: #2e7d32;
    }
    .icon-floppy {
      font-size: 0.9rem;
      color: #64748b;
    }
    .dropdown-item-action:hover .icon-floppy {
      color: #2e7d32;
    }
    
    .dropdown-header-saved {
      padding: 0.4rem 1rem;
      font-size: 0.7rem;
      font-weight: 800;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .saved-filter-item {
      justify-content: space-between !important;
    }
    
    .btn-delete-saved-filter {
      opacity: 0.5;
      cursor: pointer;
      transition: opacity 0.2s;
      font-size: 0.95rem;
    }
    .btn-delete-saved-filter:hover {
      opacity: 1;
      color: #d9534f;
    }
    
    .search-modern-underline {
      position: relative;
      border-bottom: 1.5px solid #dcdde1;
      width: 180px;
      display: flex;
      align-items: center;
      transition: border-bottom-color 0.2s;
    }
    .search-modern-underline:focus-within {
      border-bottom-color: #2e7d32;
    }
    .search-modern-underline input {
      width: 100%;
      border: none;
      background: transparent;
      padding: 0.4rem 0.1rem;
      font-size: 0.95rem;
      outline: none;
      color: #2c3e50;
      font-family: inherit;
    }
    .search-modern-underline input::placeholder {
      color: #a0aec0;
      font-weight: 500;
    }

    .dropdown-item-action {
      display: flex; align-items: center; gap: 0.75rem; padding: 0.6rem 1rem;
      font-size: 0.9rem; color: #4a5568; cursor: pointer; transition: background 0.2s;
      font-weight: 600;
    }
    .dropdown-item-action:hover { background: #f7fafc; color: #2e7d32; }
    .dropdown-item-action .icon { color: #a0aec0; font-size: 0.85rem; width: 16px; text-align: center; }
    .dropdown-item-action:hover .icon { color: #2e7d32; }
    .dropdown-divider { height: 1px; background: #edf2f7; margin: 0.4rem 0; }
    
    .legacy-table-checkbox {
      width: 18px; height: 18px; cursor: not-allowed; accent-color: #2e7d32;
    }

    
    .rel-pos { position: relative; }
    .header-cell-content { display: flex; align-items: center; gap: 0.4rem; justify-content: space-between; width: 100%; }
    .justify-end { justify-content: flex-end; }
    .filter-trigger-btn { background: none; border: none; color: #a0aec0; cursor: pointer; padding: 0.1rem 0.3rem; font-size: 0.7rem; border-radius: 3px; transition: all 0.2s; }
    .filter-trigger-btn:hover { background: #e2e8f0; color: #4a5568; }
    .filter-trigger-btn.active { color: #2e7d32; font-weight: bold; background: #e8f5e9; }
    .col-filter-dropdown { position: absolute; top: calc(100% + 5px); left: 0; background: white; border: 1px solid #e2e8f0; border-radius: 8px; z-index: 1000; min-width: 220px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); padding: 0.5rem 0; animation: fadeInDropdown 0.2s ease-out; }
    .col-filter-dropdown.text-left { left: auto; right: 0; }
    .text-filter-box { padding: 0.5rem 1rem; }
    .text-filter-input { width: 100%; padding: 0.5rem; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 0.85rem; outline: none; transition: border-color 0.2s; }
    .text-filter-input:focus { border-color: #2e7d32; }
    
    /* Paginación */
    .pagination-container-premium {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 2rem;
      padding: 0.8rem 1.5rem;
      background: white;
      border-radius: 8px;
      border: 1px solid #edf2f7;
      box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    }
    .pagination-info {
      font-size: 0.95rem;
      color: #64748b;
      font-weight: 600;
    }
    .pagination-controls {
      display: flex;
      gap: 0.4rem;
      align-items: center;
    }
    .btn-page {
      background: white;
      border: 1px solid #dcdde1;
      color: #2c3e50;
      padding: 0.45rem 0.9rem;
      font-size: 0.9rem;
      font-weight: 600;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 32px;
      height: 32px;
    }
    .btn-page:hover:not([disabled]) {
      background: #f8f9fa;
      border-color: #cbd5e1;
      color: #2e7d32;
    }
    .btn-page.active {
      background: #2e7d32;
      border-color: #2e7d32;
      color: white;
    }
    .btn-page[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Premium Modals Tabs */
    .modal-tabs {
      display: flex; background: #f8fafc; border-bottom: 2px solid #edf2f7;
      padding: 0 2rem; gap: 1rem;
    }
    .modal-tab-btn {
      padding: 1.2rem 1.5rem; background: none; border: none; border-bottom: 3px solid transparent;
      font-size: 1.05rem; font-weight: 600; color: #64748b; cursor: pointer;
      transition: all 0.2s ease-in-out;
    }
    .modal-tab-btn:hover { color: #2c3e50; }
    .modal-tab-btn.active {
      color: #5cb85c; border-bottom-color: #5cb85c;
    }

    /* Timeline Premium Neo-Cyber */
    .audit-timeline-container {
      grid-column: span 2; max-height: 450px; overflow-y: auto; padding: 1rem 0.5rem;
    }
    .audit-timeline-loading {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 1rem; padding: 3rem 0; color: #64748b; font-weight: 600;
    }
    .loader-premium {
      width: 40px; height: 40px; border: 4px solid #edf2f7; border-top-color: #5cb85c;
      border-radius: 50%; animation: spin 1s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .audit-timeline-empty {
      text-align: center; padding: 3rem 0; color: #64748b; font-size: 1.1rem;
    }
    
    .premium-timeline {
      position: relative; padding-left: 2.5rem; border-left: 3px solid #edf2f7;
      margin: 1rem 0; display: flex; flex-direction: column; gap: 2rem;
    }
    .timeline-item {
      position: relative; animation: slideInTimeline 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
    }
    @keyframes slideInTimeline {
      from { opacity: 0; transform: translateX(-20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    .timeline-badge {
      position: absolute; left: -3.65rem; top: 0.5rem; width: 2.2rem; height: 2.2rem;
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
      font-size: 1.1rem; border: 3px solid #fff; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
      background: #e2e8f0;
    }
    .timeline-badge.insert { background: #e6f4ea; border-color: #e6f4ea; color: #137333; }
    .timeline-badge.update { background: #e8f0fe; border-color: #e8f0fe; color: #1a73e8; }
    .timeline-badge.delete { background: #fce8e6; border-color: #fce8e6; color: #c5221f; }
    .timeline-badge.archive { background: #fef7e0; border-color: #fef7e0; color: #b06000; }

    .timeline-card.glass {
      background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(12px);
      border: 1px solid rgba(226, 232, 240, 0.8); border-radius: 12px;
      padding: 1.5rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);
      transition: all 0.2s ease;
    }
    .timeline-card.glass:hover {
      transform: translateY(-2px); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
      border-color: #cbd5e1;
    }
    .card-meta {
      display: flex; justify-content: space-between; font-size: 0.85rem;
      color: #94a3b8; margin-bottom: 0.6rem; font-weight: 600;
    }
    .meta-user { display: flex; align-items: center; gap: 0.3rem; }
    .card-action-title {
      font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem;
    }
    .card-action-title.insert { color: #137333; }
    .card-action-title.update { color: #1a73e8; }
    .card-action-title.delete { color: #c5221f; }
    .card-action-title.archive { color: #b06000; }

    .changes-list {
      display: flex; flex-direction: column; gap: 0.8rem; background: #f8fafc;
      border-radius: 8px; padding: 1rem; border: 1px solid #edf2f7;
    }
    .change-row {
      display: flex; justify-content: space-between; align-items: center;
      padding-bottom: 0.5rem; border-bottom: 1px dashed #edf2f7;
    }
    .change-row:last-child { padding-bottom: 0; border-bottom: none; }
    .change-field {
      font-size: 0.95rem; font-weight: 700; color: #475569;
    }
    .change-values {
      display: flex; align-items: center; gap: 0.6rem; font-family: 'JetBrains Mono', monospace;
      font-size: 0.95rem; font-weight: 600;
    }
    .val-old {
      color: #9b1c1c; background: #fde8e8; padding: 0.2rem 0.5rem; border-radius: 4px;
    }
    .val-arrow { color: #64748b; font-weight: bold; }
    .val-new {
      color: #137333; background: #e6f4ea; padding: 0.2rem 0.5rem; border-radius: 4px;
    }
    .action-details {
      font-size: 0.95rem; color: #64748b; line-height: 1.5;
    }
    
    @keyframes fadeInDropdown {
      from { opacity: 0; transform: translateY(5px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class InventarioIndexComponent implements OnInit {
  private router = inject(Router);
  
  registros: InventarioRecord[] = [];
  filteredRegistros: InventarioRecord[] = [];
  paginatedRegistros: InventarioRecord[] = [];

  columns: ColumnDef[] = [
    { id: 'fechaHora', label: 'Fecha Hora', visible: true },
    { id: 'turno', label: 'Turno', visible: true }
  ];

  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  searchQuery = '';
  activeDropdown: string | null = null;
  sortColumn = '';
  sortAsc = true;

  showExportSelector = false;
  showColumnSelector = false;
  openActionMenuId: string | null = null;

  showModal = false;
  modalMode: 'ADD' | 'DELETE' = 'ADD';
  itemToDelete: string | null = null;
  nuevoTurno = '1er Turno';
  isSubmitting = false;

  successMessage = '';
  errorMessage = '';

  ngOnInit() {
    this.cargarMockData();
  }

  cargarMockData() {
    this.registros = [
      { id: '655', fechaHora: '24/07/25', turno: '2do Turno' },
      { id: '654', fechaHora: '22/07/25', turno: '2do Turno' },
      { id: '653', fechaHora: '21/07/25', turno: '2do Turno' },
      { id: '652', fechaHora: '13/07/25', turno: '1er Turno' },
      { id: '651', fechaHora: '12/07/25', turno: '1er Turno' },
      { id: '650', fechaHora: '10/07/25', turno: '1er Turno' },
      { id: '649', fechaHora: '10/07/25', turno: '2do Turno' }
    ];
    this.aplicarFiltros();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.openActionMenuId = null;
    this.showExportSelector = false;
    this.showColumnSelector = false;
    this.activeDropdown = null;
  }

  toggleExport(event: Event) {
    event.stopPropagation();
    this.showExportSelector = !this.showExportSelector;
    this.showColumnSelector = false;
    this.openActionMenuId = null;
    this.activeDropdown = null;
  }

  toggleColumns(event: Event) {
    event.stopPropagation();
    this.showColumnSelector = !this.showColumnSelector;
    this.showExportSelector = false;
    this.openActionMenuId = null;
    this.activeDropdown = null;
  }

  toggleActionMenu(id: string, event: Event) {
    event.stopPropagation();
    this.openActionMenuId = this.openActionMenuId === id ? null : id;
    this.showExportSelector = false;
    this.showColumnSelector = false;
    this.activeDropdown = null;
  }

  toggleDropdown(col: string, event: Event) {
    event.stopPropagation();
    this.activeDropdown = this.activeDropdown === col ? null : col;
    this.openActionMenuId = null;
  }

  setSort(col: string, asc: boolean) {
    this.sortColumn = col;
    this.sortAsc = asc;
    this.activeDropdown = null;
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    let result = [...this.registros];
    
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(r => 
        r.fechaHora.toLowerCase().includes(query) || 
        r.turno.toLowerCase().includes(query)
      );
    }

    if (this.sortColumn) {
      result.sort((a, b) => {
        const valA = (a as any)[this.sortColumn];
        const valB = (b as any)[this.sortColumn];
        if (valA < valB) return this.sortAsc ? -1 : 1;
        if (valA > valB) return this.sortAsc ? 1 : -1;
        return 0;
      });
    }

    this.filteredRegistros = result;
    this.currentPage = 1;
    this.recalcularPaginacion();
  }

  recalcularPaginacion() {
    this.totalPages = Math.ceil(this.filteredRegistros.length / this.pageSize) || 1;
    this.updatePaginatedList();
  }

  updatePaginatedList() {
    const start = (this.currentPage - 1) * this.pageSize;
    this.paginatedRegistros = this.filteredRegistros.slice(start, start + this.pageSize);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedList();
    }
  }

  getPagesList(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) pages.push(i);
    return pages;
  }

  isColVisible(id: string): boolean {
    return this.columns.find(c => c.id === id)?.visible ?? false;
  }

  saveColumnsState() {}

  irADetalle(id: string) {
    this.router.navigate(['/inventario/existencias/detalle', id]);
  }

  abrirModalNuevo() {
    this.modalMode = 'ADD';
    this.nuevoTurno = '1er Turno';
    this.showModal = true;
  }

  crearInventario() {
    this.isSubmitting = true;
    setTimeout(() => {
      this.isSubmitting = false;
      this.showModal = false;
      this.irADetalle('new-' + Date.now());
    }, 600);
  }

  eliminarRegistro(id: string) {
    this.itemToDelete = id;
    this.modalMode = 'DELETE';
    this.showModal = true;
  }

  confirmarEliminar() {
    this.isSubmitting = true;
    setTimeout(() => {
      this.registros = this.registros.filter(r => r.id !== this.itemToDelete);
      this.aplicarFiltros();
      this.isSubmitting = false;
      this.showModal = false;
      this.showTransactionAlert('Registro eliminado correctamente.', 'success');
    }, 600);
  }

  showTransactionAlert(msg: string, type: 'success' | 'error') {
    if (type === 'success') this.successMessage = msg;
    else this.errorMessage = msg;
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 3000);
  }

  exportToCSV() {}
  exportToPDF() {}
}
