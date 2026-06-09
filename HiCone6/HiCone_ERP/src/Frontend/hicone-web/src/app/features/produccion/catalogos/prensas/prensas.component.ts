import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduccionConfigService, Prensa } from '../../../../core/services/produccion-config.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-prensas-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up" (click)="closeAllDropdowns()">

      <!-- ═══════ ENCABEZADO ═══════ -->
      <header class="module-header">
        <div class="title-area">
          <nav class="breadcrumb">Producción › Catálogos › Prensas</nav>
          <h1>Catálogo de Prensas</h1>
        </div>

        <div class="actions-toolbar">
          <!-- LEFT -->
          <div class="toolbar-left">

            <!-- Exportar -->
            <div class="dropdown-wrapper">
              <button class="btn btn-secondary" (click)="toggleExportDropdown($event)">
                <span>⬇</span> Exportar
              </button>
              @if (showExportOptions()) {
                <div class="dd-popover animate-slide-up" (click)="$event.stopPropagation()">
                  <div class="dd-item" (click)="exportCSV()">Excel</div>
                  <div class="dd-item" (click)="exportPDF()">PDF</div>
                </div>
              }
            </div>

            <!-- Agregar -->
            <button class="btn btn-primary" (click)="openCreate()">+ Agregar</button>

            <!-- Selecciona columnas -->
            <div class="dropdown-wrapper">
              <button class="btn btn-secondary btn-cols" (click)="toggleColumnDropdown($event)">
                ☰ Selecciona columnas ▾
              </button>
              @if (showColumnSelector()) {
                <div class="col-sel-popover animate-slide-up" (click)="$event.stopPropagation()">
                  <input class="col-search" type="text" placeholder="Buscar..." />
                  <!-- Fijas a la izquierda -->
                  <div class="col-group">
                    <label class="col-group-label">
                      <input type="checkbox" disabled checked /> Fijas a la izquierda ▾
                    </label>
                    <div class="col-subitem">
                      <label><input type="checkbox" disabled /> (Ninguna)</label>
                    </div>
                  </div>
                  <!-- No fijas -->
                  <div class="col-group">
                    <label class="col-group-label">
                      <input type="checkbox" [checked]="allColsVisible()" (change)="toggleAllCols()" /> No fijas ▾
                    </label>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('nombre')" (change)="toggleCol('nombre')" /> Prensa</label>
                    </div>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('imagen')" (change)="toggleCol('imagen')" /> Imagen</label>
                    </div>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('marca')" (change)="toggleCol('marca')" /> Marca</label>
                    </div>
                    <div class="col-subitem">
                      <label><input type="checkbox" [checked]="isColVisible('modelo')" (change)="toggleCol('modelo')" /> Modelo</label>
                    </div>
                  </div>
                  <!-- Fijas a la derecha -->
                  <div class="col-group">
                    <label class="col-group-label">
                      <input type="checkbox" disabled checked /> Fijas a la derecha ▾
                    </label>
                    <div class="col-subitem">
                      <label><input type="checkbox" disabled /> (Ninguna)</label>
                    </div>
                  </div>
                  <button class="btn-actualizar" (click)="showColumnSelector.set(false)">↺ Actualizar</button>
                </div>
              }
            </div>
          </div>

          <div style="flex:1"></div>

          <!-- RIGHT: Filtro + Buscar -->
          <div class="toolbar-right">
            <!-- Icono Filtro -->
            <div class="dropdown-wrapper">
              <button class="filter-btn" (click)="toggleFilterDropdown($event)" title="Filtros">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                </svg>
              </button>
              @if (showFilterMenu()) {
                <div class="filter-popover animate-slide-up" (click)="$event.stopPropagation()">
                  <div class="filter-item filter-buscar">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    Buscar
                  </div>
                  <div class="filter-divider"></div>
                  <div class="filter-item" (click)="clearFilter()">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                    <span style="color:#e53e3e">Limpiar filtros</span>
                  </div>
                  <div class="filter-item" (click)="saveFilter()">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
                    </svg>
                    Guardar filtro como...
                  </div>
                </div>
              }
            </div>
            <!-- Búsqueda -->
            <div class="search-box">
              <svg class="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input class="search-input" type="text" placeholder="Buscar..."
                [ngModel]="searchText()"
                (ngModelChange)="searchText.set($event); currentPage.set(1)" />
            </div>
          </div>
        </div>
      </header>

      <!-- ═══════ TABLA ═══════ -->
      <div class="content-card">
        <table class="data-table">
          <thead>
            <tr>
              <th class="th-action"></th>
              <th class="th-action"></th>
              <th class="th-action"></th>
              @if (isColVisible('nombre'))  { <th>Prensa</th> }
              @if (isColVisible('imagen'))  { <th>Imagen</th> }
              @if (isColVisible('marca'))   { <th>Marca</th> }
              @if (isColVisible('modelo'))  { <th>Modelo</th> }
            </tr>
          </thead>
          <tbody>
            @if (loading()) {
              <tr><td [attr.colspan]="visibleCount()" class="empty-state">Cargando prensas...</td></tr>
            } @else if (paginatedItems().length === 0) {
              <tr><td [attr.colspan]="visibleCount()" class="empty-state">No se encontraron prensas registradas</td></tr>
            } @else {
              @for (item of paginatedItems(); track item.id) {
                <tr>
                  <td class="td-action"><button class="action-btn view"   (click)="openViewModal(item)">Visualizar</button></td>
                  <td class="td-action"><button class="action-btn edit"   (click)="openEditModal(item)">Modificar</button></td>
                  <td class="td-action"><button class="action-btn delete" (click)="confirmDelete(item)">Eliminar</button></td>
                  @if (isColVisible('nombre'))  { <td class="col-nombre">{{ item.nombre }}</td> }
                  @if (isColVisible('imagen'))  { <td>{{ item.imagen || '—' }}</td> }
                  @if (isColVisible('marca'))   { <td>{{ item.marca || '—' }}</td> }
                  @if (isColVisible('modelo'))  { <td>{{ item.modelo || '—' }}</td> }
                </tr>
              }
            }
          </tbody>
        </table>
      </div>

      <!-- Paginación -->
      @if (totalPages() > 1) {
        <div class="pagination-container animate-move-up">
          <button class="pag-btn" [disabled]="currentPage() === 1" (click)="prevPage()">‹</button>
          @for (p of getPages(currentPage(), totalPages()); track $index) {
            @if (p === '...') { <span class="pag-dots">...</span> }
            @else { <button class="pag-btn" [class.active]="currentPage() === p" (click)="setPage($any(p))">{{ p }}</button> }
          }
          <button class="pag-btn" [disabled]="currentPage() === totalPages()" (click)="nextPage()">›</button>
        </div>
      }

      <!-- ═══════════════════════════════════════════
           MODAL CREAR / MODIFICAR (Gestionar Prensa)
      ═══════════════════════════════════════════ -->
      @if (showModal() && !modalReadOnly()) {
        <div class="modal-overlay" (click)="closeModal()">
          <div class="modal-card erp-modal" (click)="$event.stopPropagation()">

            <!-- Cabecera -->
            <div class="gestionar-header">
              <div>
                <h2 class="gestionar-title">Gestionar Prensa</h2>
                <div class="gestionar-breadcrumb">Producción &rsaquo; Catálogos &rsaquo; Prensas</div>
              </div>
            </div>

            <!-- Panel Información General -->
            <div class="erp-panel">
              <div class="erp-panel-header">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                Información General
              </div>
              <div class="erp-panel-body">

                <!-- Número de Prensa -->
                <div class="erp-field">
                  <label class="erp-label">Número de Prensa</label>
                  <div class="erp-select-wrapper">
                    <select class="erp-select" [(ngModel)]="form.numeroPrensa">
                      <option value="">-- Seleccionar --</option>
                      @for (c of claves(); track c.id) {
                        <option [value]="c.valor">{{ c.valor }}</option>
                      }
                    </select>
                  </div>
                </div>

                <div class="erp-separator"></div>

                <!-- Prensa (nombre) -->
                <div class="erp-field">
                  <label class="erp-label erp-label-blue">Prensa</label>
                  <input class="erp-input erp-input-blue" type="text" [(ngModel)]="form.nombre" placeholder="Ej. Prensa 1" />
                </div>

                <!-- Imagen -->
                <div class="erp-field">
                  <label class="erp-label">Imagen</label>
                  <input class="erp-input" type="text" [(ngModel)]="form.imagen" placeholder="URL o nombre de imagen" />
                </div>

                <!-- Marca -->
                <div class="erp-field">
                  <label class="erp-label">Marca</label>
                  <input class="erp-input" type="text" [(ngModel)]="form.marca" placeholder="Ej. Siemens" />
                </div>

                <!-- Modelo -->
                <div class="erp-field">
                  <label class="erp-label">Modelo</label>
                  <input class="erp-input" type="text" [(ngModel)]="form.modelo" placeholder="Ej. XR-2000" />
                </div>

              </div>
            </div>

            <!-- Botones -->
            <div class="gestionar-footer">
              <button class="btn-confirmar" (click)="save()">CONFIRMAR</button>
              <button class="btn-cancelar" (click)="closeModal()">CANCELAR</button>
            </div>

          </div>
        </div>
      }

      <!-- ═══════════════════════════════════════════
           MODAL VISUALIZAR (Solo Lectura)
      ═══════════════════════════════════════════ -->
      @if (showModal() && modalReadOnly()) {
        <div class="modal-overlay" (click)="closeModal()">
          <div class="modal-card erp-modal" (click)="$event.stopPropagation()">

            <!-- Panel Información General -->
            <div class="erp-panel">
              <div class="erp-panel-header">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                Información General
              </div>
              <div class="erp-panel-body">

                <div class="erp-field">
                  <label class="erp-label">Número de Prensa</label>
                  <div class="erp-readonly-value">{{ viewItem()?.numeroPrensa || '—' }}</div>
                </div>

                <div class="erp-separator"></div>

                <div class="erp-field">
                  <label class="erp-label erp-label-blue">Prensa</label>
                  <div class="erp-readonly-value erp-readonly-blue">{{ viewItem()?.nombre || '—' }}</div>
                </div>

                <div class="erp-field">
                  <label class="erp-label">Imagen</label>
                  <div class="erp-readonly-value">{{ viewItem()?.imagen || '—' }}</div>
                </div>

                <div class="erp-field">
                  <label class="erp-label">Marca</label>
                  <div class="erp-readonly-value">{{ viewItem()?.marca || '—' }}</div>
                </div>

                <div class="erp-field">
                  <label class="erp-label">Modelo</label>
                  <div class="erp-readonly-value">{{ viewItem()?.modelo || '—' }}</div>
                </div>

              </div>
            </div>

            <!-- Botón cancelar -->
            <div class="gestionar-footer">
              <button class="btn-cancelar" (click)="closeModal()">CANCELAR</button>
            </div>

            <!-- Panel Historial Auditoría (maquetado visual) -->
            <div class="erp-panel audit-panel">
              <div class="erp-panel-header">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                Historial Auditoría
              </div>
              <div class="audit-body">
                <div class="audit-col">
                  <div class="audit-col-header">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                    Change Log
                  </div>
                  <table class="audit-table">
                    <thead><tr><th>Date</th><th>User</th></tr></thead>
                    <tbody><tr><td colspan="2" class="audit-empty"></td></tr></tbody>
                  </table>
                  <div class="audit-pag"><span>Ant</span> <span>Sig</span></div>
                </div>
                <div class="audit-col">
                  <div class="audit-col-header">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                    Detail
                  </div>
                  <div class="audit-detail-box"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      }

      <!-- ═══════════════════════════════════════════
           MODAL CONFIRMACIÓN ELIMINAR
      ═══════════════════════════════════════════ -->
      @if (showDeleteConfirm()) {
        <div class="modal-overlay" (click)="showDeleteConfirm.set(false)">
          <div class="confirm-modal" (click)="$event.stopPropagation()">
            <h3 class="confirm-title">Eliminar Prensa</h3>
            <p class="confirm-msg">¿Está seguro que desea <strong>eliminar</strong> la prensa <em>"{{ itemToDelete()?.nombre }}"</em>? Esta acción no se puede deshacer.</p>
            <div class="confirm-actions">
              <button class="btn-confirmar-del" (click)="doDelete()">Eliminar</button>
              <button class="btn-cancelar" (click)="showDeleteConfirm.set(false)">Cancelar</button>
            </div>
          </div>
        </div>
      }

    </div>
  `,
  styles: [`
    /* ── Layout ── */
    .module-page { padding: 1.5rem 2.5rem; font-family: 'Inter', sans-serif; }
    .breadcrumb  { font-size:.72rem; color:#94a3b8; font-weight:700; text-transform:uppercase; letter-spacing:.05em; }
    h1           { font-size:1.75rem; font-weight:800; color:#1e293b; margin:0 0 .25rem; }
    .module-header { display:flex; flex-direction:column; gap:1rem; margin-bottom:1.5rem; }

    .actions-toolbar { display:flex; width:100%; align-items:center; gap:.5rem; }
    .toolbar-left    { display:flex; gap:.6rem; align-items:center; }
    .toolbar-right   { display:flex; gap:.6rem; align-items:center; }

    /* ── Buttons ── */
    .btn { padding:.52rem 1.1rem; border-radius:7px; border:none; cursor:pointer; font-size:.82rem; font-weight:700; transition:all .18s; display:flex; align-items:center; gap:.35rem; }
    .btn-primary   { background:#3faa5a; color:#fff; box-shadow:0 3px 8px rgba(63,170,90,.25); }
    .btn-primary:hover { background:#35924d; transform:translateY(-1px); }
    .btn-secondary { background:#fff; color:#475569; border:1px solid #e2e8f0; }
    .btn-secondary:hover { background:#f8fafc; border-color:#cbd5e1; }
    .btn-cols { font-size:.78rem; padding:.48rem .9rem; }

    /* ── Search ── */
    .search-box   { position:relative; }
    .search-icon  { position:absolute; left:.7rem; top:50%; transform:translateY(-50%); color:#94a3b8; }
    .search-input { padding:.48rem .75rem .48rem 2rem; border:1px solid #e2e8f0; border-radius:7px; font-size:.82rem; outline:none; width:200px; color:#334155; }
    .search-input:focus { border-color:#3faa5a; box-shadow:0 0 0 3px rgba(63,170,90,.12); }

    /* ── Filter btn ── */
    .filter-btn { background:#fff; border:1px solid #e2e8f0; border-radius:7px; padding:.48rem .7rem; cursor:pointer; color:#475569; display:flex; align-items:center; }
    .filter-btn:hover { background:#f8fafc; }

    /* ── Dropdown / popover ── */
    .dropdown-wrapper { position:relative; }
    .dd-popover  { position:absolute; left:0; top:110%; background:#fff; border:1px solid #e2e8f0; border-radius:10px; box-shadow:0 8px 20px rgba(0,0,0,.1); z-index:200; min-width:140px; overflow:hidden; }
    .dd-item     { padding:.6rem 1rem; font-size:.82rem; font-weight:600; color:#334155; cursor:pointer; }
    .dd-item:hover { background:#f1f5f9; }

    /* ── Column Selector ── */
    .col-sel-popover { position:absolute; left:0; top:110%; background:#fff; border:1px solid #e2e8f0; border-radius:10px; box-shadow:0 8px 24px rgba(0,0,0,.12); z-index:200; width:240px; padding:.75rem; }
    .col-search { width:100%; box-sizing:border-box; padding:.38rem .6rem; border:1px solid #e2e8f0; border-radius:6px; font-size:.8rem; margin-bottom:.5rem; outline:none; }
    .col-group { margin-bottom:.25rem; }
    .col-group-label { display:flex; align-items:center; gap:.4rem; font-size:.82rem; font-weight:700; color:#334155; cursor:pointer; padding:.2rem 0; }
    .col-subitem { padding-left:1.4rem; display:flex; flex-direction:column; gap:.2rem; }
    .col-subitem label { display:flex; align-items:center; gap:.4rem; font-size:.8rem; color:#475569; cursor:pointer; padding:.15rem 0; }
    .btn-actualizar { width:100%; margin-top:.5rem; padding:.45rem; background:#3faa5a; color:#fff; border:none; border-radius:6px; font-size:.8rem; font-weight:700; cursor:pointer; }
    .btn-actualizar:hover { background:#35924d; }

    /* ── Filter popover ── */
    .filter-popover { position:absolute; right:0; top:110%; background:#fff; border:1px solid #e2e8f0; border-radius:10px; box-shadow:0 8px 24px rgba(0,0,0,.12); z-index:200; width:210px; overflow:hidden; }
    .filter-item { display:flex; align-items:center; gap:.5rem; padding:.6rem 1rem; font-size:.82rem; font-weight:600; color:#334155; cursor:pointer; }
    .filter-item:hover { background:#f8fafc; }
    .filter-buscar { background:#f8fafc; }
    .filter-divider { height:1px; background:#e2e8f0; margin:.15rem 0; }

    /* ── Table ── */
    .content-card { background:#fff; border-radius:12px; border:1px solid #e2e8f0; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,.04); margin-top:1rem; }
    .data-table   { width:100%; border-collapse:collapse; }
    .data-table th { text-align:left; padding:.85rem 1rem; background:#f8fafc; color:#64748b; font-size:.72rem; font-weight:800; text-transform:uppercase; letter-spacing:.04em; border-bottom:1px solid #e2e8f0; }
    .data-table td { padding:.78rem 1rem; border-bottom:1px solid #f1f5f9; font-size:.83rem; color:#334155; }
    .data-table tr:last-child td { border-bottom:none; }
    .data-table tr:hover td { background:#f8fafc; }
    .th-action, .td-action { width:80px; }
    .col-nombre { font-weight:700; color:#1e293b; }
    .empty-state { text-align:center; padding:3rem; color:#94a3b8; font-style:italic; }

    /* ── Action buttons ── */
    .action-btn { padding:.3rem .75rem; border-radius:5px; border:none; cursor:pointer; font-size:.75rem; font-weight:700; transition:all .15s; }
    .action-btn.view   { background:rgba(14,165,233,.09);  color:#0284c7; }
    .action-btn.view:hover { background:rgba(14,165,233,.18); }
    .action-btn.edit   { background:rgba(245,158,11,.09);  color:#d97706; }
    .action-btn.edit:hover { background:rgba(245,158,11,.18); }
    .action-btn.delete { background:rgba(239,68,68,.09);   color:#dc2626; }
    .action-btn.delete:hover { background:rgba(239,68,68,.18); }

    /* ── Pagination ── */
    .pagination-container { display:flex; justify-content:center; align-items:center; gap:.35rem; margin-top:1.4rem; }
    .pag-btn { height:2rem; min-width:2rem; padding:0 .45rem; border-radius:7px; border:1px solid #e2e8f0; background:#fff; color:#475569; font-weight:700; font-size:.82rem; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all .18s; }
    .pag-btn:hover:not(:disabled) { background:#f8fafc; border-color:#cbd5e1; }
    .pag-btn:disabled { opacity:.4; cursor:not-allowed; }
    .pag-btn.active { background:#3faa5a; border-color:#3faa5a; color:#fff; }
    .pag-dots { font-size:.82rem; color:#94a3b8; padding:0 .2rem; }

    /* ── ERP Modal ── */
    .modal-overlay { position:fixed; inset:0; background:rgba(15,23,42,.35); backdrop-filter:blur(4px); display:flex; align-items:flex-start; justify-content:center; z-index:1000; padding:1.5rem; overflow-y:auto; animation:fadeIn .22s ease; }
    .modal-card.erp-modal { background:#fff; border-radius:10px; width:100%; max-width:680px; box-shadow:0 20px 50px rgba(0,0,0,.15); overflow:hidden; animation:zoomIn .22s ease; margin:auto; }

    .gestionar-header { padding:1rem 1.25rem .75rem; border-bottom:2px solid #e2e8f0; }
    .gestionar-title  { margin:0; font-size:1.1rem; font-weight:800; color:#1e293b; }
    .gestionar-breadcrumb { font-size:.72rem; color:#94a3b8; margin-top:.15rem; }

    /* ERP Panel */
    .erp-panel { border:1px solid #d1d5db; border-radius:6px; margin:.75rem; overflow:hidden; }
    .erp-panel-header { display:flex; align-items:center; gap:.45rem; padding:.5rem .9rem; background:#f9fafb; border-bottom:1px solid #d1d5db; font-size:.78rem; font-weight:700; color:#374151; }
    .erp-panel-body   { padding:.75rem 1rem; display:flex; flex-direction:column; gap:.5rem; }

    .erp-field  { display:flex; flex-direction:column; gap:.2rem; }
    .erp-label  { font-size:.72rem; font-weight:600; color:#6b7280; }
    .erp-label-blue { color:#3b82f6; }
    .erp-input  { padding:.42rem .7rem; border:none; border-bottom:1px solid #d1d5db; font-size:.88rem; color:#1f2937; outline:none; background:transparent; }
    .erp-input:focus { border-bottom-color:#3faa5a; }
    .erp-input-blue { border-bottom-color:#3b82f6; color:#1d4ed8; }
    .erp-input-blue:focus { border-bottom-color:#1d4ed8; }
    .erp-select-wrapper { position:relative; }
    .erp-select { width:100%; padding:.42rem .7rem; border:none; border-bottom:1px solid #d1d5db; font-size:.88rem; color:#1f2937; background:transparent; outline:none; appearance:none; cursor:pointer; }
    .erp-select:focus { border-bottom-color:#3faa5a; }
    .erp-separator { height:1px; background:#e5e7eb; margin:.1rem 0; }

    /* Readonly values */
    .erp-readonly-value      { font-size:.88rem; color:#1f2937; padding:.42rem 0; border-bottom:1px solid #e5e7eb; min-height:1.8rem; }
    .erp-readonly-blue       { color:#1d4ed8; }

    /* Footer buttons */
    .gestionar-footer { display:flex; gap:.75rem; padding:.75rem 1rem; border-top:1px solid #e5e7eb; }
    .btn-confirmar { padding:.48rem 1.4rem; background:#3faa5a; color:#fff; border:none; border-radius:5px; font-size:.82rem; font-weight:700; cursor:pointer; }
    .btn-confirmar:hover { background:#35924d; }
    .btn-cancelar  { padding:.48rem 1.1rem; background:#9ca3af; color:#fff; border:none; border-radius:5px; font-size:.82rem; font-weight:700; cursor:pointer; }
    .btn-cancelar:hover { background:#6b7280; }

    /* Audit panel */
    .audit-panel { margin:.75rem; margin-top:0; }
    .audit-body  { display:flex; gap:1rem; padding:.75rem; }
    .audit-col   { flex:1; }
    .audit-col-header { display:flex; align-items:center; gap:.4rem; font-size:.75rem; font-weight:700; color:#374151; margin-bottom:.4rem; }
    .audit-table { width:100%; border-collapse:collapse; font-size:.75rem; border:1px solid #e5e7eb; }
    .audit-table th { background:#f9fafb; padding:.3rem .5rem; text-align:left; color:#6b7280; font-weight:700; border-bottom:1px solid #e5e7eb; }
    .audit-table td { padding:.3rem .5rem; color:#374151; }
    .audit-empty { text-align:center; height:3rem; }
    .audit-pag   { display:flex; justify-content:flex-end; gap:.5rem; margin-top:.3rem; font-size:.72rem; color:#3b82f6; cursor:pointer; }
    .audit-detail-box { border:1px solid #e5e7eb; border-radius:4px; min-height:60px; background:#f9fafb; }

    /* Delete confirm modal */
    .confirm-modal { background:#fff; border-radius:10px; width:420px; padding:1.75rem; box-shadow:0 20px 50px rgba(0,0,0,.15); animation:zoomIn .22s ease; }
    .confirm-title { margin:0 0 .75rem; font-size:1.05rem; font-weight:800; color:#1e293b; }
    .confirm-msg   { font-size:.875rem; color:#475569; line-height:1.6; margin-bottom:1.25rem; }
    .confirm-actions { display:flex; gap:.75rem; }
    .btn-confirmar-del { padding:.48rem 1.4rem; background:#dc2626; color:#fff; border:none; border-radius:5px; font-size:.82rem; font-weight:700; cursor:pointer; }
    .btn-confirmar-del:hover { background:#b91c1c; }

    /* Animations */
    .animate-move-up  { animation:moveUp .28s ease-out; }
    .animate-slide-up { animation:slideUp .18s ease-out; }
    @keyframes moveUp  { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
    @keyframes slideUp { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
    @keyframes zoomIn  { from { opacity:0; transform:scale(.95); } to { opacity:1; transform:scale(1); } }
  `]
})
export class PrensasCatalogoComponent implements OnInit {
  private svc = inject(ProduccionConfigService);

  items    = signal<Prensa[]>([]);
  claves   = signal<{id: string, valor: string}[]>([]);
  loading  = signal(true);

  showModal         = signal(false);
  modalReadOnly     = signal(false);
  showDeleteConfirm = signal(false);
  showColumnSelector = signal(false);
  showExportOptions  = signal(false);
  showFilterMenu     = signal(false);

  form: Partial<Prensa & { numeroPrensa?: string; imagen?: string }> = {};
  private _viewItem = signal<Prensa | null>(null);
  viewItem = this._viewItem.asReadonly();
  itemToDelete = signal<Prensa | null>(null);

  searchText  = signal('');
  currentPage = signal(1);
  pageSize    = signal(8);

  visibleColumns = signal<string[]>(['nombre', 'imagen', 'marca', 'modelo']);

  ngOnInit() { this.load(); }

  load() {
    this.loading.set(true);
    this.svc.getCatalogosClaves().subscribe({
      next: c => this.claves.set(c),
      error: e => console.error('Error cargando claves', e)
    });
    this.svc.getPrensas().subscribe({
      next: data => { this.items.set(data); this.loading.set(false); },
      error: ()   => this.loading.set(false)
    });
  }

  filteredItems = computed(() => {
    const s = this.searchText().trim().toLowerCase();
    return s ? this.items().filter(p => p.nombre.toLowerCase().includes(s)) : this.items();
  });

  paginatedItems = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredItems().slice(start, start + this.pageSize());
  });

  totalPages = computed(() => Math.ceil(this.filteredItems().length / this.pageSize()) || 1);

  visibleCount = computed(() => 3 + this.visibleColumns().length);

  allColsVisible = computed(() => ['nombre','imagen','marca','modelo'].every(c => this.visibleColumns().includes(c)));

  isColVisible(col: string) { return this.visibleColumns().includes(col); }
  toggleCol(col: string) {
    this.visibleColumns.update(cols =>
      cols.includes(col) ? cols.filter(c => c !== col) : [...cols, col]
    );
  }
  toggleAllCols() {
    if (this.allColsVisible()) this.visibleColumns.set([]);
    else this.visibleColumns.set(['nombre','imagen','marca','modelo']);
  }

  prevPage() { if (this.currentPage() > 1) this.currentPage.update(p => p - 1); }
  nextPage() { if (this.currentPage() < this.totalPages()) this.currentPage.update(p => p + 1); }
  setPage(p: number) { this.currentPage.set(p); }

  getPages(current: number, total: number): (number | string)[] {
    if (total <= 1) return [];
    const pages: (number | string)[] = [1];
    if (current > 3) pages.push('...');
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
    if (current < total - 2) pages.push('...');
    if (total > 1) pages.push(total);
    return pages;
  }

  toggleColumnDropdown(e: Event) { e.stopPropagation(); this.showColumnSelector.update(v => !v); this.showExportOptions.set(false); this.showFilterMenu.set(false); }
  toggleExportDropdown(e: Event) { e.stopPropagation(); this.showExportOptions.update(v => !v); this.showColumnSelector.set(false); this.showFilterMenu.set(false); }
  toggleFilterDropdown(e: Event) { e.stopPropagation(); this.showFilterMenu.update(v => !v); this.showColumnSelector.set(false); this.showExportOptions.set(false); }
  closeAllDropdowns()             { this.showColumnSelector.set(false); this.showExportOptions.set(false); this.showFilterMenu.set(false); }

  clearFilter()  { this.searchText.set(''); this.showFilterMenu.set(false); }
  saveFilter()   { this.showFilterMenu.set(false); }

  openCreate() {
    this.form = { nombre: '', numeroPrensa: '', imagen: '', marca: '', modelo: '' };
    this.modalReadOnly.set(false);
    this.showModal.set(true);
    this.closeAllDropdowns();
  }

  openEditModal(item: Prensa) {
    this.form = { ...item };
    this.modalReadOnly.set(false);
    this.showModal.set(true);
    this.closeAllDropdowns();
  }

  openViewModal(item: Prensa) {
    this._viewItem.set(item);
    this.form = { ...item };
    this.modalReadOnly.set(true);
    this.showModal.set(true);
    this.closeAllDropdowns();
  }

  closeModal() {
    this.showModal.set(false);
    this.form = {};
    this._viewItem.set(null);
  }

  save() {
    if (!this.form.nombre?.trim()) { alert('El campo Prensa es requerido.'); return; }
    const payload = {
      numeroPrensa: (this.form as any).numeroPrensa || undefined,
      nombre:       this.form.nombre!,
      imagen:       (this.form as any).imagen || undefined,
      marca:        this.form.marca || undefined,
      modelo:       this.form.modelo || undefined,
      tenantId:     '00000000-0000-0000-0000-000000000001'
    } as any;
    if (!this.form.id) {
      this.svc.createPrensa(payload).subscribe({
        next: () => { this.closeModal(); this.load(); },
        error: e => { console.error(e); alert('Error al guardar.'); }
      });
    } else {
      this.svc.updatePrensa(this.form.id, payload).subscribe({
        next: () => { this.closeModal(); this.load(); },
        error: e => { console.error(e); alert('Error al actualizar.'); }
      });
    }
  }

  confirmDelete(item: Prensa) {
    this.itemToDelete.set(item);
    this.showDeleteConfirm.set(true);
  }

  doDelete() {
    const item = this.itemToDelete();
    if (!item) return;
    this.svc.deletePrensa(item.id).subscribe({
      next: () => { this.showDeleteConfirm.set(false); this.itemToDelete.set(null); this.load(); },
      error: e => { console.error(e); alert('Error al eliminar.'); }
    });
  }

  exportCSV() {
    this.showExportOptions.set(false);
    
    const dataToExport = this.filteredItems().map(item => ({
      ID: item.id,
      NúmeroPrensa: item.numeroPrensa || '',
      Prensa: item.nombre,
      Imagen: item.imagen || '',
      Marca: item.marca || '',
      Modelo: item.modelo || ''
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Prensas');

    XLSX.writeFile(wb, `prensas_${new Date().toISOString().slice(0,10)}.xlsx`);
  }

  exportPDF() {
    this.showExportOptions.set(false);
    const w = window.open('', '_blank');
    if (!w) return;
    let heads = '';
    if (this.isColVisible('nombre')) heads += '<th>Prensa</th>';
    if (this.isColVisible('imagen')) heads += '<th>Imagen</th>';
    if (this.isColVisible('marca'))  heads += '<th>Marca</th>';
    if (this.isColVisible('modelo')) heads += '<th>Modelo</th>';
    let rows = '';
    this.filteredItems().forEach(p => {
      rows += '<tr>';
      if (this.isColVisible('nombre')) rows += `<td>${p.nombre}</td>`;
      if (this.isColVisible('imagen')) rows += `<td>${(p as any).imagen || ''}</td>`;
      if (this.isColVisible('marca'))  rows += `<td>${p.marca || ''}</td>`;
      if (this.isColVisible('modelo')) rows += `<td>${p.modelo || ''}</td>`;
      rows += '</tr>';
    });
    w.document.write(`<html><head><title>Reporte Prensas</title>
      <style>body{font-family:sans-serif;padding:2rem}table{width:100%;border-collapse:collapse}th,td{padding:10px 14px;border:1px solid #e2e8f0;font-size:.85rem}th{background:#f1f5f9;font-weight:700}</style>
      </head><body><h2>Reporte de Prensas</h2><p>${new Date().toLocaleString()}</p>
      <table><thead><tr>${heads}</tr></thead><tbody>${rows}</tbody></table>
      <script>window.onload=()=>{window.print();window.close();}<\/script></body></html>`);
    w.document.close();
  }
}
