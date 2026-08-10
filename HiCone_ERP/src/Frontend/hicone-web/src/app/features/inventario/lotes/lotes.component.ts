import { Component, OnInit, inject, ChangeDetectorRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventarioService, Lote, Silo, AuditLog } from '../../../core/services/inventario';
import { PdfExportService } from '../../../core/services/pdf-export.service';

@Component({
  selector: 'app-lotes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-fade-in">
      <div class="page-header-premium">
        <div class="title-section">
          <h1 class="premium-title">Lote</h1>
          <nav class="breadcrumb-modern">
            <span class="root">Inventarios</span>
            <span class="sep">&rsaquo;</span>
            <span class="active">Lotes</span>
          </nav>
        </div>
      </div>
      
      <div class="card-premium card-toolbar-top" style="margin-bottom: 0; border-bottom-left-radius: 0; border-bottom-right-radius: 0; position: relative; z-index: 100; overflow: visible;">
        <div class="toolbar-premium">
          <div class="toolbar-left">
            <div class="export-dropdown-wrapper">
              <button class="btn-export-qa" (click)="toggleExport($event)" title="Exportar datos">
                📥 Exportar <span class="chevron-down-qa">▾</span>
              </button>
              <div class="export-popover-qa shadow-premium" *ngIf="showExportSelector" (click)="$event.stopPropagation()">
                <button class="export-item-qa" (click)="exportToCSV(); showExportSelector = false">
                  <span class="export-icon">📊</span> Excel (CSV)
                </button>
                <button class="export-item-qa" (click)="exportToPDF(); showExportSelector = false">
                  <span class="export-icon">📕</span> PDF
                </button>
              </div>
            </div>
            <button class="btn-premium" (click)="openModal()">Agregar</button>
            
            <!-- Selector de Columnas (Imagen 3 y 4) -->
            <div class="dropdown-wrapper">
              <button class="btn-primary-green btn-cols" (click)="toggleColumnSelector($event)">Selecciona columnas <span class="chevron-down">▾</span></button>
              <div class="column-selector-popover shadow-premium" *ngIf="showColumnSelector" style="position: absolute; top: calc(100% + 4px); left: 0; z-index: 99999;">
                <div class="popover-search">
                  <input type="text" placeholder="" class="search-mini">
                </div>
                <div class="popover-sections custom-scroll">
                  <div class="popover-section">
                    <div class="section-title"><input type="checkbox" checked disabled> Fijas a la izquierda <span class="chevron-down">▾</span></div>
                    <label class="popover-item disabled" style="padding-left: 20px;"><input type="checkbox" checked disabled> (Ninguna)</label>
                  </div>
                  <div class="popover-section">
                    <div class="section-title"><input type="checkbox" [checked]="allColsVisible()" (change)="toggleAllCols()"> No fijas <span class="chevron-down">▾</span></div>
                    <div class="section-list" style="padding-left: 20px;">
                      <label *ngFor="let col of columns" class="popover-item">
                        <input type="checkbox" [(ngModel)]="col.visible"> {{ col.label }}
                      </label>
                    </div>
                  </div>
                  <div class="popover-section">
                    <div class="section-title"><input type="checkbox" checked disabled> Fijas a la derecha <span class="chevron-down">▾</span></div>
                    <label class="popover-item disabled" style="padding-left: 20px;"><input type="checkbox" checked disabled> (Ninguna)</label>
                  </div>
                </div>
                <div class="popover-footer">
                  <button class="btn-popover-reset" (click)="resetColumns()">↺</button>
                  <button class="btn-popover-apply" (click)="showColumnSelector = false">Actualizar</button>
                </div>
              </div>
            </div>
          </div>
          
          <div class="toolbar-right">
            <div class="filter-search-group-qa">
              <!-- Botón Filtro Avanzado -->
              <div class="dropdown-wrapper">
                <button class="btn-filter-funnel-qa" (click)="toggleSearchFilterDropdown($event)" title="Filtros avanzados">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>
                  <span class="chevron-down-funnel">▾</span>
                </button>
                
                <div class="filter-popover-qa shadow-premium" *ngIf="showSearchFilterDropdown" (click)="$event.stopPropagation()">
                  <div class="filter-item-qa" (click)="clearAllFilters()">
                    <span class="icon-circle-cross-dark">✖</span> Limpiar filtros
                  </div>
                  <div class="filter-item-qa" (click)="saveActiveFilters()">
                    <span class="icon-floppy-dark">💾</span> Guardar filtro como...
                  </div>
                  
                  <ng-container *ngIf="savedFilters.length > 0">
                    <div class="dropdown-divider"></div>
                    <div class="dropdown-header-saved">Filtros Guardados</div>
                    <div class="filter-item-qa saved-filter-item" *ngFor="let f of savedFilters" (click)="loadSavedFilter(f)">
                      <span>📁 {{ f.name }}</span>
                      <span class="btn-delete-saved-filter" (click)="deleteSavedFilter(f, $event)">🗑️</span>
                    </div>
                  </ng-container>
                </div>
              </div>
              
              <!-- Campo de Búsqueda Subrayado -->
              <div class="search-modern-underline-qa">
                <input type="text" placeholder="Buscar..." [(ngModel)]="searchQuery" (input)="onFilterChange()">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Gestionar Lote -->
      <div class="modal-overlay-premium" *ngIf="showModal" (click)="closeModal()">
        <div class="modal-card-premium animate-scale-in" style="max-width: 800px;" (click)="$event.stopPropagation()">
          <div class="modal-header-premium">
            <h3><span>🏷️</span> {{ modalMode === 'VIEW' ? 'Visualizar Lote' : modalMode === 'EDIT' ? 'Modificar Lote' : modalMode === 'DELETE' ? 'Eliminar Lote' : 'Agregar Lote' }}</h3>
            <button class="btn-icon-premium" (click)="closeModal()">✖️</button>
          </div>
          <form (ngSubmit)="handleModalSubmit()">
            <!-- Tab Headers for VIEW mode -->
            <div class="modal-tabs" *ngIf="modalMode === 'VIEW'">
              <button type="button" class="modal-tab-btn" [class.active]="activeTab === 'details'" (click)="activeTab = 'details'">📋 Detalles</button>
              <button type="button" class="modal-tab-btn" [class.active]="activeTab === 'audit'" (click)="activeTab = 'audit'; loadAuditHistory()">🕒 Historial de Auditoría</button>
            </div>

            <div class="modal-body-premium custom-scroll" [style.max-height]="'60vh'" [style.overflow-y]="'auto'">
              
              <!-- Regular details fields (visible in edit/add/delete OR when activeTab is details in view mode) -->
              <ng-container *ngIf="modalMode !== 'VIEW' || activeTab === 'details'">
                <div class="alert-delete" *ngIf="modalMode === 'DELETE'">
                  ⚠️ ¿Está seguro que desea eliminar este lote? Esta acción no se puede deshacer.
                </div>

                <!-- Silo Selection -->
                <div class="form-group-premium">
                  <label>Silo</label>
                  <select class="input-premium" [(ngModel)]="newLote.loteSiloId" name="silo" (change)="onSiloChange()" [disabled]="modalMode === 'VIEW' || modalMode === 'DELETE'">
                    <option value="">Seleccione un silo...</option>
                    <option *ngFor="let s of silos" [value]="s.id">{{ s.nombre }} ({{ s.codigo }})</option>
                  </select>
                </div>

                <!-- Silo Helpers -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                  <div class="form-group-premium">
                    <label>Máximo (kg)</label>
                    <div class="readonly-text" style="padding: 0.6rem 0.85rem; background: #f1f5f9; border-radius: 8px; font-weight: 600;">{{ (selectedSilo?.kgMaximo | number:'1.2-2') || '0.00' }}</div>
                  </div>
                  <div class="form-group-premium">
                    <label>Estado Material</label>
                    <div class="readonly-text" style="padding: 0.6rem 0.85rem; background: #f1f5f9; border-radius: 8px; font-weight: 600;">{{ selectedSilo?.estadoMaterial || '---' }}</div>
                  </div>
                </div>

                <!-- Embarque and Consumido -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                  <div class="form-group-premium">
                    <label>No. Embarque *</label>
                    <input type="text" class="input-premium" [(ngModel)]="newLote.loteEmbarque" name="embarque" required [disabled]="modalMode === 'VIEW' || modalMode === 'DELETE'">
                  </div>
                  <div class="form-group-premium" style="flex-direction: row; align-items: center; gap: 0.5rem; justify-content: flex-start; padding-top: 1.5rem;">
                    <input type="checkbox" class="legacy-checkbox" id="chk-consumido" [(ngModel)]="newLote.loteConsumido" name="consumido" [disabled]="modalMode === 'VIEW' || modalMode === 'DELETE'">
                    <label for="chk-consumido" style="margin: 0; cursor: pointer;">Consumido *</label>
                  </div>
                </div>

                <!-- Lote PO and Trunk No -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                  <div class="form-group-premium">
                    <label>Lote PO</label>
                    <input type="text" class="input-premium" [(ngModel)]="newLote.lotePO" name="lotePO" [disabled]="modalMode === 'VIEW' || modalMode === 'DELETE'">
                  </div>
                  <div class="form-group-premium">
                    <label>Trunk No</label>
                    <input type="text" class="input-premium" [(ngModel)]="newLote.loteTrunkNo" name="loteTrunkNo" [disabled]="modalMode === 'VIEW' || modalMode === 'DELETE'">
                  </div>
                </div>

                <div class="form-group-premium">
                  <label>Fecha Registro *</label>
                  <input type="date" class="input-premium" [ngModel]="newLote.loteFechaRegistro | date:'yyyy-MM-dd'" (ngModelChange)="newLote.loteFechaRegistro = $event" name="fecha" required [disabled]="modalMode === 'VIEW' || modalMode === 'DELETE'">
                </div>

                <div class="form-group-premium">
                  <label>Kg *</label>
                  <input type="number" class="input-premium" [(ngModel)]="newLote.loteKg" name="kg" required [disabled]="modalMode === 'VIEW' || modalMode === 'DELETE'">
                </div>

                <div class="form-group-premium">
                  <label>Paquete Aditivos *</label>
                  <select class="input-premium" [(ngModel)]="newLote.lotePaqueteAditivos" name="aditivos" [disabled]="modalMode === 'VIEW' || modalMode === 'DELETE'">
                    <option value="No Aplica">No Aplica</option>
                    <option value="Llorens-MB1">Llorens-MB1</option>
                    <option value="CCP-07A-164040 L">CCP-07A-164040 L</option>
                  </select>
                </div>

                <div class="form-group-premium">
                  <label>Tipo de Material *</label>
                  <select class="input-premium" [(ngModel)]="newLote.loteTipoMaterial" name="tipoMat" [disabled]="modalMode === 'VIEW' || modalMode === 'DELETE'">
                    <option value="PCR">PCR</option>
                    <option value="HDPE">HDPE</option>
                    <option value="PP">PP</option>
                    <option value="Mezcla">Mezcla</option>
                  </select>
                </div>
              </ng-container>

              <!-- Premium Neo-Cyber Timeline (visible in VIEW mode when activeTab is audit) -->
              <div class="audit-timeline-container custom-scroll" *ngIf="modalMode === 'VIEW' && activeTab === 'audit'">
                <div class="audit-timeline-loading" *ngIf="loadingAudit">
                  <div class="loader-premium"></div>
                  <span>Cargando historial de auditoría...</span>
                </div>
                
                <div class="audit-timeline-empty" *ngIf="!loadingAudit && auditLogs.length === 0">
                  🛸 No se encontraron registros de auditoría para este lote.
                </div>

                <div class="premium-timeline" *ngIf="!loadingAudit && auditLogs.length > 0">
                  <div class="timeline-item" *ngFor="let log of auditLogs; let i = index" [style.animation-delay]="(i * 0.05) + 's'">
                    <div class="timeline-badge" [class]="log.action.toLowerCase()">
                      {{ log.action === 'INSERT' ? '➕' : log.action === 'UPDATE' ? '✏️' : log.action === 'DELETE' ? '❌' : '🗄️' }}
                    </div>
                    <div class="timeline-card glass">
                      <div class="card-meta">
                        <span class="meta-user">👤 {{ log.username || 'Sistema' }}</span>
                        <span class="meta-date">📅 {{ log.timestamp | date:'dd/MM/yyyy HH:mm:ss' }}</span>
                      </div>
                      <div class="card-action-title" [class]="log.action.toLowerCase()">
                        Acción: {{ log.action === 'INSERT' ? 'Creación de Lote' : log.action === 'UPDATE' ? 'Modificación' : log.action === 'DELETE' ? 'Eliminación' : 'Archivado' }}
                      </div>
                      
                      <!-- Detalle de cambios en JSON -->
                      <div class="changes-list" *ngIf="log.action === 'UPDATE' && parseChanges(log.changesJson) as changes">
                        <div class="change-row" *ngFor="let c of changes">
                          <span class="change-field">{{ translateField(c.property) }}</span>
                          <div class="change-values">
                            <span class="val-old">{{ c.oldValue || 'N/A' }}</span>
                            <span class="val-arrow">➜</span>
                            <span class="val-new">{{ c.newValue || 'N/A' }}</span>
                          </div>
                        </div>
                      </div>

                      <div class="action-details" *ngIf="log.action === 'INSERT'">
                        Lote inicializado con éxito en el sistema.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div class="modal-footer-premium">
              <button type="submit" class="btn-premium" *ngIf="modalMode !== 'VIEW'" [class.btn-premium-danger]="modalMode === 'DELETE'">
                {{ modalMode === 'DELETE' ? 'ELIMINAR' : 'CONFIRMAR' }}
              </button>
              <button type="button" class="btn-premium-secondary" (click)="closeModal()">{{ modalMode === 'VIEW' ? 'CERRAR' : 'CANCELAR' }}</button>
            </div>
          </form>
        </div>
      </div>

      <div class="card-premium" style="border-top-left-radius: 0; border-top-right-radius: 0; border-top: none; position: relative; z-index: 1;">
        <div class="table-modern-container">
          <table class="table-modern">
            <thead>
              <tr>
                <th class="text-center"></th>
                <th class="text-center"></th>
                <th class="text-center"></th>
                
                <th *ngIf="isColVisible('loteNo')" class="rel-pos">
                  <div class="header-cell-content">
                    <span>Lote NO.</span>
                    <button class="filter-trigger-btn" [class.active]="activeDropdown === 'loteNo'" (click)="toggleDropdown('loteNo', $event)">
                      {{ sortColumn === 'loteNo' ? (sortAsc ? '↑' : '↓') : '▼' }}
                    </button>
                  </div>
                  <div class="col-filter-dropdown shadow-premium" *ngIf="activeDropdown === 'loteNo'" (click)="$event.stopPropagation()">
                    <div class="dropdown-item-action" (click)="setSort('loteNo', true)"><span class="icon">↑↓</span> Ordenar de A a Z</div>
                    <div class="dropdown-item-action" (click)="setSort('loteNo', false)"><span class="icon">↑↓</span> Ordenar de Z a A</div>
                    <div class="dropdown-divider"></div>
                    <div class="text-filter-box">
                      <input type="text" placeholder="Buscar..." [(ngModel)]="filterLoteNo" (input)="cdr.detectChanges()" class="text-filter-input">
                    </div>
                  </div>
                </th>

                <th *ngIf="isColVisible('lotePO')" class="rel-pos">
                  <div class="header-cell-content">
                    <span>Lote PO.</span>
                    <button class="filter-trigger-btn" [class.active]="activeDropdown === 'lotePO'" (click)="toggleDropdown('lotePO', $event)">
                      {{ sortColumn === 'lotePO' ? (sortAsc ? '↑' : '↓') : '▼' }}
                    </button>
                  </div>
                  <div class="col-filter-dropdown shadow-premium" *ngIf="activeDropdown === 'lotePO'" (click)="$event.stopPropagation()">
                    <div class="dropdown-item-action" (click)="setSort('lotePO', true)"><span class="icon">↑↓</span> Ordenar de A a Z</div>
                    <div class="dropdown-item-action" (click)="setSort('lotePO', false)"><span class="icon">↑↓</span> Ordenar de Z a A</div>
                    <div class="dropdown-divider"></div>
                    <div class="text-filter-box">
                      <input type="text" placeholder="Buscar..." [(ngModel)]="filterLotePO" (input)="cdr.detectChanges()" class="text-filter-input">
                    </div>
                  </div>
                </th>

                <th *ngIf="isColVisible('fecha')" class="rel-pos">
                  <div class="header-cell-content">
                    <span>Fecha Registro</span>
                    <button class="filter-trigger-btn" [class.active]="activeDropdown === 'fecha'" (click)="toggleDropdown('fecha', $event)">
                      {{ sortColumn === 'fecha' ? (sortAsc ? '↑' : '↓') : '▼' }}
                    </button>
                  </div>
                  <div class="col-filter-dropdown shadow-premium" *ngIf="activeDropdown === 'fecha'" (click)="$event.stopPropagation()">
                    <div class="dropdown-item-action" (click)="setSort('fecha', true)"><span class="icon">↑↓</span> Ordenar Antiguos</div>
                    <div class="dropdown-item-action" (click)="setSort('fecha', false)"><span class="icon">↑↓</span> Ordenar Recientes</div>
                  </div>
                </th>

                <th *ngIf="isColVisible('trunk')" class="rel-pos">
                  <div class="header-cell-content">
                    <span>Trunk No</span>
                    <button class="filter-trigger-btn" [class.active]="activeDropdown === 'trunk'" (click)="toggleDropdown('trunk', $event)">
                      {{ sortColumn === 'trunk' ? (sortAsc ? '↑' : '↓') : '▼' }}
                    </button>
                  </div>
                  <div class="col-filter-dropdown shadow-premium" *ngIf="activeDropdown === 'trunk'" (click)="$event.stopPropagation()">
                    <div class="dropdown-item-action" (click)="setSort('trunk', true)"><span class="icon">↑↓</span> Ordenar de A a Z</div>
                    <div class="dropdown-item-action" (click)="setSort('trunk', false)"><span class="icon">↑↓</span> Ordenar de Z a A</div>
                    <div class="dropdown-divider"></div>
                    <div class="text-filter-box">
                      <input type="text" placeholder="Buscar..." [(ngModel)]="filterTrunk" (input)="cdr.detectChanges()" class="text-filter-input">
                    </div>
                  </div>
                </th>

                <th *ngIf="isColVisible('tipoMat')" class="rel-pos">
                  <div class="header-cell-content">
                    <span>Tipo Material</span>
                    <button class="filter-trigger-btn" [class.active]="activeDropdown === 'tipoMat'" (click)="toggleDropdown('tipoMat', $event)">
                      {{ sortColumn === 'tipoMat' ? (sortAsc ? '↑' : '↓') : '▼' }}
                    </button>
                  </div>
                  <div class="col-filter-dropdown shadow-premium" *ngIf="activeDropdown === 'tipoMat'" (click)="$event.stopPropagation()">
                    <div class="dropdown-item-action" (click)="setSort('tipoMat', true)"><span class="icon">↑↓</span> Ordenar de A a Z</div>
                    <div class="dropdown-item-action" (click)="setSort('tipoMat', false)"><span class="icon">↑↓</span> Ordenar de Z a A</div>
                    <div class="dropdown-divider"></div>
                    <div class="text-filter-box">
                      <input type="text" placeholder="Buscar..." [(ngModel)]="filterTipoMat" (input)="cdr.detectChanges()" class="text-filter-input">
                    </div>
                  </div>
                </th>

                <th *ngIf="isColVisible('silo')" class="rel-pos">
                  <div class="header-cell-content">
                    <span>Silo</span>
                    <button class="filter-trigger-btn" [class.active]="activeDropdown === 'silo'" (click)="toggleDropdown('silo', $event)">
                      {{ sortColumn === 'silo' ? (sortAsc ? '↑' : '↓') : '▼' }}
                    </button>
                  </div>
                  <div class="col-filter-dropdown shadow-premium" *ngIf="activeDropdown === 'silo'" (click)="$event.stopPropagation()">
                    <div class="dropdown-item-action" (click)="setSort('silo', true)"><span class="icon">↑↓</span> Ordenar de A a Z</div>
                    <div class="dropdown-item-action" (click)="setSort('silo', false)"><span class="icon">↑↓</span> Ordenar de Z a A</div>
                  </div>
                </th>

                <th *ngIf="isColVisible('kgMaximo')" class="rel-pos text-right">
                  <div class="header-cell-content justify-end">
                    <span>Kg Maximo</span>
                    <button class="filter-trigger-btn" [class.active]="activeDropdown === 'kgMaximo'" (click)="toggleDropdown('kgMaximo', $event)">
                      {{ sortColumn === 'kgMaximo' ? (sortAsc ? '↑' : '↓') : '▼' }}
                    </button>
                  </div>
                  <div class="col-filter-dropdown shadow-premium text-left" *ngIf="activeDropdown === 'kgMaximo'" (click)="$event.stopPropagation()">
                    <div class="dropdown-item-action" (click)="setSort('kgMaximo', true)"><span class="icon">↑↓</span> Ordenar Menor a Mayor</div>
                    <div class="dropdown-item-action" (click)="setSort('kgMaximo', false)"><span class="icon">↑↓</span> Ordenar Mayor a Menor</div>
                  </div>
                </th>

                <th *ngIf="isColVisible('estadoMat')" class="rel-pos">
                  <div class="header-cell-content">
                    <span>Estado Material</span>
                    <button class="filter-trigger-btn" [class.active]="activeDropdown === 'estadoMat'" (click)="toggleDropdown('estadoMat', $event)">
                      {{ sortColumn === 'estadoMat' ? (sortAsc ? '↑' : '↓') : '▼' }}
                    </button>
                  </div>
                  <div class="col-filter-dropdown shadow-premium" *ngIf="activeDropdown === 'estadoMat'" (click)="$event.stopPropagation()">
                    <div class="dropdown-item-action" (click)="setSort('estadoMat', true)"><span class="icon">↑↓</span> Ordenar de A a Z</div>
                    <div class="dropdown-item-action" (click)="setSort('estadoMat', false)"><span class="icon">↑↓</span> Ordenar de Z a A</div>
                    <div class="dropdown-divider"></div>
                    <div class="text-filter-box">
                      <input type="text" placeholder="Buscar..." [(ngModel)]="filterEstadoMat" (input)="cdr.detectChanges()" class="text-filter-input">
                    </div>
                  </div>
                </th>

                <th *ngIf="isColVisible('kg')" class="rel-pos text-right">
                  <div class="header-cell-content justify-end">
                    <span>Kg</span>
                    <button class="filter-trigger-btn" [class.active]="activeDropdown === 'kg'" (click)="toggleDropdown('kg', $event)">
                      {{ sortColumn === 'kg' ? (sortAsc ? '↑' : '↓') : '▼' }}
                    </button>
                  </div>
                  <div class="col-filter-dropdown shadow-premium text-left" *ngIf="activeDropdown === 'kg'" (click)="$event.stopPropagation()">
                    <div class="dropdown-item-action" (click)="setSort('kg', true)"><span class="icon">↑↓</span> Ordenar Menor a Mayor</div>
                    <div class="dropdown-item-action" (click)="setSort('kg', false)"><span class="icon">↑↓</span> Ordenar Mayor a Menor</div>
                  </div>
                </th>

                <th *ngIf="isColVisible('consumido')" class="text-center">Consumido</th>
                <th *ngIf="isColVisible('paqueteAditivos')">Paquete Aditivos</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of paginatedLotes" class="grid-row" [class.row-consumido]="item.loteConsumido">
                <td class="text-center">
                  <button class="link-btn view" (click)="openModal('VIEW', item)">Visualizar</button>
                </td>
                <td class="text-center">
                  <button class="link-btn edit" (click)="openModal('EDIT', item)">Modificar</button>
                </td>
                <td class="text-center">
                  <button class="link-btn delete" (click)="openModal('DELETE', item)">Eliminar</button>
                </td>
                <td *ngIf="isColVisible('loteNo')" class="font-bold text-green-600">{{ item.loteEmbarque }}</td>
                <td *ngIf="isColVisible('lotePO')">{{ item.lotePO || '---' }}</td>
                <td *ngIf="isColVisible('fecha')">{{ item.loteFechaRegistro | date:'dd/MM/yy' }}</td>
                <td *ngIf="isColVisible('trunk')">{{ item.loteTrunkNo || '---' }}</td>
                <td *ngIf="isColVisible('tipoMat')"><span class="badge-legacy">{{ item.loteTipoMaterial }}</span></td>
                <td *ngIf="isColVisible('silo')">{{ getSiloNombre(item.loteSiloId) }}</td>
                <td *ngIf="isColVisible('kgMaximo')" class="text-right font-mono">{{ getSiloCapacidad(item.loteSiloId) | number:'1.2-2' }}</td>
                <td *ngIf="isColVisible('estadoMat')">{{ getSiloEstadoMaterial(item.loteSiloId) }}</td>
                <td *ngIf="isColVisible('kg')" class="text-right font-mono font-bold">{{ item.loteKg | number:'1.2-2' }}</td>
                <td *ngIf="isColVisible('consumido')" class="text-center">
                  <input type="checkbox" [checked]="item.loteConsumido" disabled class="legacy-table-checkbox">
                </td>
                <td *ngIf="isColVisible('paqueteAditivos')">{{ item.lotePaqueteAditivos || '---' }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Paginación Premium -->
        <div class="pagination-container-premium">
          <div class="pagination-info">Página {{ currentPage }} de {{ totalPages || 1 }}</div>
          <div class="pagination-controls">
            <button class="btn-page" [disabled]="currentPage === 1" (click)="goToPage(currentPage - 1)">Ant</button>
            <button class="btn-page" *ngFor="let page of getPagesList()" [class.active]="currentPage === page" (click)="goToPage(page)">
              {{ page }}
            </button>
            <button class="btn-page" [disabled]="currentPage === totalPages || totalPages === 0" (click)="goToPage(currentPage + 1)">Sig</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dropdown-wrapper { position: relative; display: inline-block; }
    .btn-cols { background: #4caf50 !important; color: white !important; border: 1px solid #43a047 !important; padding: 0.45rem 0.85rem !important; border-radius: 6px !important; font-weight: 600 !important; font-size: 0.85rem !important; cursor: pointer; display: inline-flex; align-items: center; gap: 0.4rem; }
    .btn-cols:hover { background: #43a047 !important; }

    .column-selector-popover { 
      position: absolute; top: calc(100% + 4px); left: 0; 
      background: #ffffff !important; width: 230px !important; 
      box-shadow: 0 6px 20px rgba(0,0,0,0.2) !important; z-index: 1000 !important; 
      border-radius: 8px !important; border: 1px solid #cbd5e1 !important; padding: 12px !important; 
      box-sizing: border-box; text-align: left;
    }
    .popover-search { margin-bottom: 8px; }
    .search-mini { width: 100%; box-sizing: border-box; padding: 6px 8px; border: 1px solid #4caf50; border-radius: 4px; font-size: 0.83rem; outline: none; background: white; color: #333; }
    .search-mini:focus { border-color: #388e3c; }
    .popover-sections { max-height: 280px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; }
    .popover-section { display: flex; flex-direction: column; gap: 4px; text-align: left; }
    .section-title { font-size: 0.83rem; font-weight: 600; color: #2e7d32; display: flex; align-items: center; gap: 6px; cursor: pointer; }
    .section-list { padding-left: 20px; display: flex; flex-direction: column; gap: 4px; }
    .popover-item { font-size: 0.82rem; color: #424242; display: flex; align-items: center; gap: 6px; cursor: pointer; margin: 0; }
    .popover-footer { margin-top: 12px; display: flex; gap: 8px; align-items: center; }
    .btn-popover-reset { background: #4caf50 !important; color: white !important; border: none !important; width: 34px !important; height: 32px !important; border-radius: 4px !important; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1rem !important; }
    .btn-popover-reset:hover { background: #43a047 !important; }
    .btn-popover-apply { flex: 1; background: #4caf50 !important; color: white !important; border: none !important; padding: 6px 0 !important; border-radius: 4px !important; font-weight: bold !important; font-size: 0.85rem !important; cursor: pointer; text-align: center; }
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
    /* Filtro Embudo & Buscador (IMAGEN 1 QA EXACTO) */
    .toolbar-right { display: flex; gap: 12px; align-items: center; }
    .btn-filter-funnel-qa { background: #ffffff; border: 1px solid #dcdde1; border-radius: 4px; padding: 0.4rem 0.6rem; height: 32px; display: inline-flex; align-items: center; justify-content: center; gap: 3px; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.08); transition: background 0.2s; }
    .btn-filter-funnel-qa:hover { background: #f8fafc; border-color: #cbd5e1; }
    .chevron-down-dark { font-size: 0.7rem; color: #334155; }

    .filter-popover-qa { position: absolute; top: calc(100% + 4px); right: 0; background: #ffffff !important; border: 1px solid #cbd5e1 !important; border-radius: 6px !important; width: 180px !important; box-shadow: 0 6px 20px rgba(0,0,0,0.15) !important; z-index: 99999 !important; padding: 6px 0 !important; box-sizing: border-box; }
    .filter-item-qa { display: flex; align-items: center; gap: 8px; padding: 0.55rem 0.9rem; font-size: 0.85rem; color: #334155; font-weight: 500; cursor: pointer; transition: background 0.15s; }
    .filter-item-qa:hover { background: #f1f5f9; color: #2e7d32; }

    .icon-circle-cross-dark { display: inline-flex; align-items: center; justify-content: center; width: 15px; height: 15px; background: #475569; color: white; border-radius: 50%; font-size: 8px; font-weight: bold; }
    .filter-item-qa:hover .icon-circle-cross-dark { background: #2e7d32; }
    .icon-floppy-dark { font-size: 0.9rem; color: #475569; }
    .filter-item-qa:hover .icon-floppy-dark { color: #2e7d32; }

    .search-underline-box { display: inline-flex; align-items: center; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 2px; transition: border-bottom-color 0.2s; width: 140px; }
    .search-underline-box:focus-within { border-bottom-color: #4caf50; }
    .search-input-underline { border: none; background: transparent; outline: none; font-size: 0.88rem; color: #334155; width: 100%; padding: 2px 0; }
    .search-input-underline::placeholder { color: #94a3b8; font-weight: 400; }

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
export class LotesComponent implements OnInit {
  private inventarioService = inject(InventarioService);
  private pdfService = inject(PdfExportService);
  public cdr = inject(ChangeDetectorRef);
  
  lotes: Lote[] = [];
  silos: Silo[] = [];
  selectedSilo: Silo | null = null;
  searchQuery = '';
  showModal = false;
  showColumnSelector = false;
  showExportSelector = false;
  modalMode: 'ADD' | 'VIEW' | 'EDIT' | 'DELETE' = 'ADD';
  newLote: Partial<Lote> = this.getDefaultLote();

  // Filtros Avanzados (QA Parity)
  filterSiloId = '';
  filterDateStart = '';
  filterDateEnd = '';
  filterConsumido = 'all';

  showSearchFilterDropdown = false;
  savedFilters: { name: string, state: any }[] = [];

  // Paginación
  currentPage = 1;
  pageSize = 10;
  
  // Table Filtering & Sorting State
  activeDropdown: string | null = null;
  sortColumn: string = '';
  sortAsc: boolean = true;
  filterLoteNo = '';
  filterLotePO = '';
  filterTrunk = '';
  filterTipoMat = '';
  filterEstadoMat = '';

  toggleDropdown(col: string, event: Event) {
    event.stopPropagation();
    this.activeDropdown = this.activeDropdown === col ? null : col;
    this.showSearchFilterDropdown = false;
    this.showColumnSelector = false;
    this.showExportSelector = false;
  }

  setSort(col: string, asc: boolean) {
    this.sortColumn = col;
    this.sortAsc = asc;
    this.activeDropdown = null;
    this.currentPage = 1;
    this.cdr.detectChanges();
  }

  columns = [
    { id: 'loteNo', label: 'Lote NO.', visible: true },
    { id: 'lotePO', label: 'Lote PO.', visible: true },
    { id: 'fecha', label: 'Fecha Registro', visible: true },
    { id: 'trunk', label: 'Trunk No', visible: true },
    { id: 'tipoMat', label: 'Tipo Material', visible: true },
    { id: 'silo', label: 'Silo', visible: true },
    { id: 'kgMaximo', label: 'Kg Maximo', visible: true },
    { id: 'estadoMat', label: 'Estado Material', visible: true },
    { id: 'kg', label: 'Kg', visible: true },
    { id: 'consumido', label: 'Consumido', visible: true },
    { id: 'paqueteAditivos', label: 'Paquete Aditivos', visible: true }
  ];

  ngOnInit() {
    this.loadData();
    this.loadFiltersFromStorage();
  }

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
      loteTipoMaterial: 'PCR',
      loteTrunkNo: ''
    };
  }

  activeTab: 'details' | 'audit' = 'details';
  auditLogs: AuditLog[] = [];
  loadingAudit = false;

  openModal(mode: 'ADD' | 'VIEW' | 'EDIT' | 'DELETE' = 'ADD', item: Lote | null = null) { 
    this.modalMode = mode;
    this.activeTab = 'details';
    this.auditLogs = [];
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
    this.activeTab = 'details';
    this.auditLogs = [];
    this.newLote = this.getDefaultLote(); 
    this.selectedSilo = null; 
    this.cdr.detectChanges();
  }

  loadAuditHistory() {
    if (!this.newLote.id) return;
    this.loadingAudit = true;
    this.inventarioService.getAuditHistory('Lote', this.newLote.id).subscribe({
      next: (data) => {
        this.auditLogs = data;
        this.loadingAudit = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar historial de lotes:', err);
        this.loadingAudit = false;
        this.cdr.detectChanges();
      }
    });
  }

  parseChanges(json?: string): any[] {
    if (!json) return [];
    try {
      return JSON.parse(json);
    } catch (e) {
      return [];
    }
  }

  translateField(field: string): string {
    const dict: Record<string, string> = {
      'Nombre': 'Nombre',
      'Codigo': 'Código',
      'CapacidadMaxima': 'Capacidad Máxima',
      'KgMinimo': 'Kg Mínimo',
      'KgMaximo': 'Kg Máximo',
      'EstadoMaterial': 'Estado de Material',
      'TipoMaterial': 'Tipo de Material',
      'Activo': 'Activo',
      'LoteKg': 'Kg Lote',
      'LoteEmbarque': 'No. Embarque',
      'LoteConsumido': 'Consumido',
      'LotePaqueteAditivos': 'Paquete Aditivos',
      'LoteTipoMaterial': 'Tipo de Material',
      'LoteSiloId': 'Silo Asociado',
      'LotePO': 'Lote PO',
      'LoteTrunkNo': 'Trunk No'
    };
    return dict[field] || field;
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

  getSiloCapacidad(id?: string): number {
    return this.silos.find(s => s.id === id)?.capacidadMaxima || 0;
  }

  getSiloEstadoMaterial(id?: string): string {
    return this.silos.find(s => s.id === id)?.estadoMaterial || '---';
  }

  onFilterChange() {
    this.currentPage = 1;
    this.cdr.detectChanges();
  }

  get filteredLotes() {
    const q = (this.searchQuery || '').toLowerCase();
    let result = this.lotes.filter(item => {
      const matchesSearch = !q || 
        (item.loteEmbarque || '').toLowerCase().includes(q) ||
        (item.lotePO || '').toLowerCase().includes(q) ||
        (item.loteTrunkNo || '').toLowerCase().includes(q);

      const matchesSilo = !this.filterSiloId || item.loteSiloId === this.filterSiloId;
      const matchesConsumido = this.filterConsumido === 'all' || item.loteConsumido.toString() === this.filterConsumido;

      let matchesDate = true;
      if (item.loteFechaRegistro) {
        const itemDate = new Date(item.loteFechaRegistro);
        if (this.filterDateStart) {
          const startDate = new Date(this.filterDateStart);
          if (itemDate < startDate) matchesDate = false;
        }
        if (this.filterDateEnd) {
          const endDate = new Date(this.filterDateEnd);
          endDate.setHours(23, 59, 59);
          if (itemDate > endDate) matchesDate = false;
        }
      }

      // Column filters
      const matchesLoteNo = !this.filterLoteNo || (item.loteEmbarque || '').toLowerCase().includes(this.filterLoteNo.toLowerCase());
      const matchesLotePO = !this.filterLotePO || (item.lotePO || '').toLowerCase().includes(this.filterLotePO.toLowerCase());
      const matchesTrunk = !this.filterTrunk || (item.loteTrunkNo || '').toLowerCase().includes(this.filterTrunk.toLowerCase());
      const matchesTipoMat = !this.filterTipoMat || (item.loteTipoMaterial || '').toLowerCase().includes(this.filterTipoMat.toLowerCase());
      const matchesEstadoMat = !this.filterEstadoMat || this.getSiloEstadoMaterial(item.loteSiloId).toLowerCase().includes(this.filterEstadoMat.toLowerCase());

      return matchesSearch && matchesSilo && matchesConsumido && matchesDate && 
             matchesLoteNo && matchesLotePO && matchesTrunk && matchesTipoMat && matchesEstadoMat;
    });

    if (this.sortColumn) {
      result.sort((a, b) => {
        let valA: any = '';
        let valB: any = '';
        switch(this.sortColumn) {
          case 'loteNo': valA = a.loteEmbarque; valB = b.loteEmbarque; break;
          case 'lotePO': valA = a.lotePO; valB = b.lotePO; break;
          case 'fecha': valA = a.loteFechaRegistro ? new Date(a.loteFechaRegistro).getTime() : 0; valB = b.loteFechaRegistro ? new Date(b.loteFechaRegistro).getTime() : 0; break;
          case 'trunk': valA = a.loteTrunkNo; valB = b.loteTrunkNo; break;
          case 'tipoMat': valA = a.loteTipoMaterial; valB = b.loteTipoMaterial; break;
          case 'silo': valA = this.getSiloNombre(a.loteSiloId); valB = this.getSiloNombre(b.loteSiloId); break;
          case 'kgMaximo': valA = this.getSiloCapacidad(a.loteSiloId); valB = this.getSiloCapacidad(b.loteSiloId); break;
          case 'estadoMat': valA = this.getSiloEstadoMaterial(a.loteSiloId); valB = this.getSiloEstadoMaterial(b.loteSiloId); break;
          case 'kg': valA = a.loteKg; valB = b.loteKg; break;
        }
        if (valA < valB) return this.sortAsc ? -1 : 1;
        if (valA > valB) return this.sortAsc ? 1 : -1;
        return 0;
      });
    }

    return result;
  }

  // Paginación Helpers
  get totalPages(): number {
    return Math.ceil(this.filteredLotes.length / this.pageSize);
  }

  get paginatedLotes(): Lote[] {
    const total = this.totalPages;
    if (this.currentPage > total && total > 0) {
      this.currentPage = total;
    }
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredLotes.slice(start, start + this.pageSize);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.cdr.detectChanges();
    }
  }

  getPagesList(): number[] {
    const list: number[] = [];
    const maxPagesToShow = 5;
    const total = this.totalPages;
    if (total <= maxPagesToShow) {
      for (let i = 1; i <= total; i++) list.push(i);
    } else {
      let start = Math.max(1, this.currentPage - 2);
      let end = Math.min(total, start + maxPagesToShow - 1);
      if (end - start < maxPagesToShow - 1) {
        start = Math.max(1, end - maxPagesToShow + 1);
      }
      for (let i = start; i <= end; i++) list.push(i);
    }
    return list.length > 0 ? list : [1];
  }

  @HostListener('document:click')
  closeDropdowns() {
    this.showSearchFilterDropdown = false;
    this.showColumnSelector = false;
    this.showExportSelector = false;
  }

  toggleExport(event: Event) {
    event.stopPropagation();
    this.showExportSelector = !this.showExportSelector;
    if (this.showExportSelector) {
      this.showColumnSelector = false;
      this.showSearchFilterDropdown = false;
    }
  }

  toggleSearchFilterDropdown(event: Event) {
    event.stopPropagation();
    this.showSearchFilterDropdown = !this.showSearchFilterDropdown;
    this.showColumnSelector = false;
    this.showExportSelector = false;
  }

  clearAllFilters() {
    this.searchQuery = '';
    this.filterSiloId = '';
    this.filterDateStart = '';
    this.filterDateEnd = '';
    this.filterConsumido = 'all';
    this.currentPage = 1;
    this.showSearchFilterDropdown = false;
    this.cdr.detectChanges();
  }

  saveActiveFilters() {
    this.showSearchFilterDropdown = false;
    const filterName = prompt('Ingrese un nombre para guardar el filtro activo:', 'Filtro Lotes ' + new Date().toLocaleDateString());
    if (!filterName) return;

    const filterState = {
      siloId: this.filterSiloId,
      dateStart: this.filterDateStart,
      dateEnd: this.filterDateEnd,
      consumido: this.filterConsumido,
      searchQuery: this.searchQuery
    };

    this.savedFilters.push({ name: filterName, state: filterState });
    localStorage.setItem('loteSavedFilters', JSON.stringify(this.savedFilters));
    alert(`El filtro "${filterName}" se ha guardado exitosamente.`);
    this.cdr.detectChanges();
  }

  loadSavedFilter(f: { name: string, state: any }) {

    const s = f.state;
    this.filterSiloId = s.siloId || '';
    this.filterDateStart = s.dateStart || '';
    this.filterDateEnd = s.dateEnd || '';
    this.filterConsumido = s.consumido || 'all';
    this.searchQuery = s.searchQuery || '';
    
    this.currentPage = 1;
    this.showSearchFilterDropdown = false;
    this.cdr.detectChanges();
  }

  deleteSavedFilter(f: { name: string, state: any }, event: Event) {
    event.stopPropagation();
    this.savedFilters = this.savedFilters.filter(item => item !== f);
    localStorage.setItem('loteSavedFilters', JSON.stringify(this.savedFilters));
    this.cdr.detectChanges();
  }

  loadFiltersFromStorage() {
    const stored = localStorage.getItem('loteSavedFilters');
    if (stored) {
      try {
        this.savedFilters = JSON.parse(stored);
      } catch (e) {
        this.savedFilters = [];
      }
    }
  }

  resetFilters() {
    this.filterSiloId = '';
    this.filterDateStart = '';
    this.filterDateEnd = '';
    this.filterConsumido = 'all';
    this.searchQuery = '';
    this.currentPage = 1;
    this.cdr.detectChanges();
  }

  archiveLote(lote: Lote) {
    if (confirm(`¿Desea archivar el lote ${lote.loteEmbarque}? El registro permanecerá en el sistema pero no se verá en la lista activa.`)) {
      if (lote.id) {
        this.inventarioService.deleteLote(lote.id).subscribe(() => this.loadData());
      }
    }
  }

  toggleColumnSelector(event?: Event) {
    event?.stopPropagation();
    this.showColumnSelector = !this.showColumnSelector;
    this.showSearchFilterDropdown = false;
    this.showExportSelector = false;
  }

  isColVisible(id: string): boolean { return this.columns.find(c => c.id === id)?.visible || false; }
  allColsVisible(): boolean { return this.columns.every(c => c.visible); }
  toggleAllCols() { const target = !this.allColsVisible(); this.columns.forEach(c => c.visible = target); }
  resetColumns() { this.columns.forEach(c => c.visible = true); }

  exportToCSV() {
    if (this.lotes.length === 0) return;
    
    const headers = ['Lote No.', 'Lote PO', 'Fecha Registro', 'Trunk No', 'Tipo Material', 'Silo', 'Kg Maximo', 'Estado Material', 'Kg', 'Consumido', 'Aditivos'];
    
    const rows = this.filteredLotes.map(l => [
      l.loteEmbarque || '',
      l.lotePO || '',
      l.loteFechaRegistro ? new Date(l.loteFechaRegistro).toLocaleDateString() : '',
      l.loteTrunkNo || '',
      l.loteTipoMaterial || '',
      this.getSiloNombre(l.loteSiloId),
      this.getSiloCapacidad(l.loteSiloId).toString(),
      this.getSiloEstadoMaterial(l.loteSiloId),
      l.loteKg?.toString() || '0',
      l.loteConsumido ? 'Si' : 'No',
      l.lotePaqueteAditivos || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

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
