import { Component, OnInit, inject, ChangeDetectorRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventarioService, Silo, AuditLog } from '../../../core/services/inventario';
import { PdfExportService } from '../../../core/services/pdf-export.service';

@Component({
  selector: 'app-silos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up">
      <div class="page-header-modern">
        <div class="title-section">
          <h1 class="premium-title">Silo</h1>
          <nav class="breadcrumb-modern">
            <span class="root">Inventarios</span>
            <span class="sep">></span>
            <span class="active">Silos</span>
          </nav>
        </div>
        
        <div class="toolbar-premium">
          <div class="btn-group-modern">
            <div class="dropdown-container">
              <button class="btn-legacy secondary" (click)="showExportSelector = !showExportSelector">📥 Exportar <span class="arrow">▼</span></button>
              <div class="column-selector-dropdown shadow-premium" *ngIf="showExportSelector" style="width: 150px;">
                <div class="column-list custom-scroll">
                  <div class="column-group">
                    <label class="item-label export-item" (click)="exportToCSV(); showExportSelector = false">📄 Excel (CSV)</label>
                    <label class="item-label export-item" (click)="exportToPDF(); showExportSelector = false">📕 PDF</label>
                  </div>
                </div>
              </div>
            </div>
            <button class="btn-legacy secondary" (click)="openModal()">Agregar</button>
            
            <!-- Selector de Columnas (Imagen 1) -->
            <div class="dropdown-container">
              <button class="btn-legacy" (click)="toggleColumnSelector()">Selecciona columnas <span class="arrow">▼</span></button>
              <div class="column-selector-dropdown shadow-premium" *ngIf="showColumnSelector">
                <div class="dropdown-header">
                  <input type="text" placeholder="Filtrar..." class="search-mini">
                </div>
                <div class="column-list custom-scroll">
                  <div class="column-group">
                    <label class="group-label"><input type="checkbox" checked disabled> Fijas a la izquierda</label>
                    <label class="item-label"><input type="checkbox" checked disabled> (Ninguna)</label>
                  </div>
                  <div class="column-group">
                    <label class="group-label"><input type="checkbox" [checked]="allNonFixedVisible()" (change)="toggleAllNonFixed()"> No fijas</label>
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
          
          <div class="search-funnel-group">
            <div class="dropdown-container">
              <button class="btn-funnel-search" (click)="toggleSearchFilterDropdown($event)">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" class="funnel-icon">
                  <path d="M10,18H14V16H10V18M3,6V8H21V6H3M6,13H18V11H6V13Z" />
                </svg>
                <span class="arrow-mini">▼</span>
              </button>
              
              <div class="search-filter-dropdown shadow-premium" *ngIf="showSearchFilterDropdown" (click)="$event.stopPropagation()">
                <!-- Sección de Filtros Avanzados Compactos dentro del Embudo -->
                <div class="dropdown-filter-section">
                  <div class="dropdown-filter-group">
                    <label class="dropdown-filter-label">TIPO MATERIAL</label>
                    <select class="dropdown-filter-select" [(ngModel)]="filterTipoMaterial" (change)="cdr.detectChanges()">
                      <option value="">-- Todos --</option>
                      <option value="PCR">PCR</option>
                      <option value="HDPE">HDPE</option>
                      <option value="PP">PP</option>
                      <option value="Mezcla">Mezcla</option>
                    </select>
                  </div>
                  <div class="dropdown-filter-group">
                    <label class="dropdown-filter-label">ESTADO SILO</label>
                    <select class="dropdown-filter-select" [(ngModel)]="filterEstadoSilo" (change)="cdr.detectChanges()">
                      <option value="all">Todos</option>
                      <option value="true">Activos</option>
                      <option value="false">Inactivos</option>
                    </select>
                  </div>
                </div>
                
                <div class="dropdown-divider"></div>
                
                <div class="dropdown-item-action" (click)="clearAllFilters()">
                  <span class="icon-circle-cross">✖</span> Limpiar filtros
                </div>
                <div class="dropdown-item-action" (click)="saveActiveFilters()">
                  <span class="icon-floppy">💾</span> Guardar filtro como...
                </div>
                
                <ng-container *ngIf="savedFilters.length > 0">
                  <div class="dropdown-divider"></div>
                  <div class="dropdown-header-saved">Filtros Guardados</div>
                  <div class="dropdown-item-action saved-filter-item" *ngFor="let f of savedFilters" (click)="loadSavedFilter(f)">
                    <span><span class="icon">📁</span> {{ f.name }}</span>
                    <span class="btn-delete-saved-filter" (click)="deleteSavedFilter(f, $event)">🗑️</span>
                  </div>
                </ng-container>
              </div>
            </div>
            
            <div class="search-modern-underline">
              <input type="text" placeholder="Buscar..." [(ngModel)]="searchQuery" (input)="cdr.detectChanges()">
            </div>
          </div>
        </div>

      </div>

      <!-- Modal Legacy (Imagen 2) -->
      <div class="modal-overlay" *ngIf="showModal" (click)="closeModal()">
        <div class="legacy-card-premium animate-scale-in" (click)="$event.stopPropagation()">
          <div class="modal-header-legacy">
            
            {{ modalMode === 'VIEW' ? 'Visualizar Silo' : modalMode === 'EDIT' ? 'Modificar Silo' : modalMode === 'DELETE' ? 'Eliminar Silo' : modalMode === 'CONSUMO' ? 'Registrar Salida' : 'Agregar Silo' }}
          </div>
          <form (ngSubmit)="handleModalSubmit()">
            <!-- Tab Headers for VIEW mode -->
            <div class="modal-tabs" *ngIf="modalMode === 'VIEW'">
              <button type="button" class="modal-tab-btn" [class.active]="activeTab === 'details'" (click)="activeTab = 'details'">📋 Detalles</button>
              <button type="button" class="modal-tab-btn" [class.active]="activeTab === 'audit'" (click)="activeTab = 'audit'; loadAuditHistory()">🕒 Historial de Auditoría</button>
            </div>

            <div class="modal-body-legacy custom-scroll">
              
              <ng-container *ngIf="modalMode === 'CONSUMO'">
                <div class="form-row" style="grid-column: span 2;">
                  <label class="legacy-label">Existencia Actual (kg)</label>
                  <input type="number" class="legacy-input" [value]="newSilo.existenciaActual" disabled>
                </div>
                <div class="form-row">
                  <label class="legacy-label">Kilos a Descontar *</label>
                  <input type="number" class="legacy-input" [(ngModel)]="consumoKilos" name="consumoKilos" required min="0.01" [max]="newSilo.existenciaActual || 0">
                </div>
                <div class="form-row">
                  <label class="legacy-label">Motivo *</label>
                  <input type="text" class="legacy-input" [(ngModel)]="consumoMotivo" name="consumoMotivo" required placeholder="Ej. Consumo por Extrusión">
                </div>
              </ng-container>

              <!-- Regular details fields (visible in edit/add/delete OR when activeTab is details in view mode) -->
              <ng-container *ngIf="modalMode !== 'CONSUMO' && (modalMode !== 'VIEW' || activeTab === 'details')">
                <div class="alert-delete" *ngIf="modalMode === 'DELETE'">
                  ⚠️ ¿Está seguro que desea eliminar este silo? Esta acción no se puede deshacer.
                </div>

                <div class="form-row">
                  <label class="legacy-label">Código *</label>
                  <input type="text" class="legacy-input" [(ngModel)]="newSilo.codigo" name="codigo" required [disabled]="modalMode === 'VIEW' || modalMode === 'DELETE'">
                </div>

                <div class="form-row">
                  <label class="legacy-label">Nombre *</label>
                  <input type="text" class="legacy-input" [(ngModel)]="newSilo.nombre" name="nombre" required [disabled]="modalMode === 'VIEW' || modalMode === 'DELETE'">
                </div>

                <div class="form-row">
                  <label class="legacy-label">Capacidad (kg)</label>
                  <input type="number" class="legacy-input" [(ngModel)]="newSilo.capacidadMaxima" name="capacidad" [disabled]="modalMode === 'VIEW' || modalMode === 'DELETE'">
                </div>

                <div class="form-row">
                  <label class="legacy-label">Mínimo (kg)</label>
                  <input type="number" class="legacy-input" [(ngModel)]="newSilo.kgMinimo" name="minimo" [disabled]="modalMode === 'VIEW' || modalMode === 'DELETE'">
                </div>

                <div class="form-row">
                  <label class="legacy-label">Máximo (kg)</label>
                  <input type="number" class="legacy-input" [(ngModel)]="newSilo.kgMaximo" name="maximo" [disabled]="modalMode === 'VIEW' || modalMode === 'DELETE'">
                </div>

                <div class="form-row">
                  <label class="legacy-label">Estado Material</label>
                  <select class="legacy-select" [(ngModel)]="newSilo.estadoMaterial" name="estadoMat" [disabled]="modalMode === 'VIEW' || modalMode === 'DELETE'">
                    <option value="Virgen (pelet)">Virgen (pelet)</option>
                    <option value="Molido">Molido</option>
                    <option value="Mezcla">Mezcla</option>
                  </select>
                </div>

                <div class="form-row">
                  <label class="legacy-label">Tipo de Material</label>
                  <select class="legacy-select" [(ngModel)]="newSilo.tipoMaterial" name="tipoMat" [disabled]="modalMode === 'VIEW' || modalMode === 'DELETE'">
                    <option value="PCR">PCR</option>
                    <option value="HDPE">HDPE</option>
                    <option value="PP">PP</option>
                  </select>
                </div>

                <div class="form-row">
                  <label class="legacy-label">Activo</label>
                  <input type="checkbox" class="legacy-checkbox" [(ngModel)]="newSilo.activo" name="activo" [disabled]="modalMode !== 'ADD'">
                </div>
              </ng-container>

              <!-- Premium Neo-Cyber Timeline (visible in VIEW mode when activeTab is audit) -->
              <div class="audit-timeline-container custom-scroll" *ngIf="modalMode === 'VIEW' && activeTab === 'audit'">
                <div class="audit-timeline-loading" *ngIf="loadingAudit">
                  <div class="loader-premium"></div>
                  <span>Cargando historial de auditoría...</span>
                </div>
                
                <div class="audit-timeline-empty" *ngIf="!loadingAudit && auditLogs.length === 0">
                  🛸 No se encontraron registros de auditoría para este silo.
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
                        Acción: {{ log.action === 'INSERT' ? 'Creación de Silo' : log.action === 'UPDATE' ? 'Modificación' : log.action === 'DELETE' ? 'Eliminación' : 'Archivado' }}
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
                        Silo inicializado con éxito en el sistema.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div class="modal-footer-legacy">
              <button type="submit" class="btn-confirm" *ngIf="modalMode !== 'VIEW'" [class.btn-danger]="modalMode === 'DELETE'">
                {{ modalMode === 'DELETE' ? 'ELIMINAR' : 'CONFIRMAR' }}
              </button>
              <button type="button" class="btn-cancel" (click)="closeModal()">{{ modalMode === 'VIEW' ? 'CERRAR' : 'CANCELAR' }}</button>
            </div>
          </form>
        </div>
      </div>

      <div class="content-container">
        <div class="table-card shadow-premium">
          <table class="premium-grid">
            <thead>
              <tr>
                <th class="text-center sticky-col">Archivar</th>
                <th class="text-center sticky-col">Visualizar</th>
                <th *ngIf="isColVisible('nombre')" class="rel-pos">
                  <div class="header-cell-content">
                    <span>Nombre</span>
                    <button class="filter-trigger-btn" [class.active]="activeDropdown === 'nombre'" (click)="toggleDropdown('nombre', $event)">
                      {{ sortColumn === 'nombre' ? (sortAsc ? '↑' : '↓') : '▼' }}
                    </button>
                  </div>
                  <!-- Dropdown para Nombre -->
                  <div class="col-filter-dropdown shadow-premium text-left" *ngIf="activeDropdown === 'nombre'" (click)="$event.stopPropagation()">
                    <div class="dropdown-item-action" (click)="setSort('nombre', true)">
                      <span class="icon">↑↓</span> Ordenar de A a Z
                    </div>
                    <div class="dropdown-item-action" (click)="setSort('nombre', false)">
                      <span class="icon">↑↓</span> Ordenar de Z a A
                    </div>
                    <div class="dropdown-divider"></div>
                    <div class="dropdown-item-action" (click)="pinColumn('nombre', 'left')">
                      <span class="icon">⊞</span> Fijar a la izquierda
                    </div>
                    <div class="dropdown-item-action" (click)="pinColumn('nombre', 'right')">
                      <span class="icon">⊞</span> Fijar a la derecha
                    </div>
                    <div class="dropdown-divider"></div>
                    <div class="dropdown-search-box">
                      <input type="text" placeholder="Buscar..." [(ngModel)]="filterNombreSearch" (input)="filterNamesList()" (keydown.enter)="applyNombreSearchFilter($event)" class="dropdown-search-input">
                      <span class="search-mini-icon">🔍</span>
                    </div>
                    <div class="dropdown-checkbox-list custom-scroll">
                      <div class="checkbox-list-item" *ngFor="let nameOpt of filteredUniqueNames">
                        <label>
                          <input type="checkbox" [(ngModel)]="filterNombreSelected[nameOpt.name]" (change)="cdr.detectChanges()">
                          {{ nameOpt.name }} ({{ nameOpt.count }})
                        </label>
                      </div>
                    </div>
                  </div>
                </th>
                <th *ngIf="isColVisible('capacidad')" class="rel-pos text-right">
                  <div class="header-cell-content justify-end">
                    <span>Capacidad (kg)</span>
                    <button class="filter-trigger-btn" [class.active]="activeDropdown === 'capacidad'" (click)="toggleDropdown('capacidad', $event)">
                      {{ sortColumn === 'capacidad' ? (sortAsc ? '↑' : '↓') : '▼' }}
                    </button>
                  </div>
                  <!-- Dropdown para Capacidad -->
                  <div class="col-filter-dropdown shadow-premium text-left" *ngIf="activeDropdown === 'capacidad'" (click)="$event.stopPropagation()">
                    <div class="dropdown-item-action" (click)="setSort('capacidad', true)">
                      <span class="icon">↑↓</span> Ordenar de A a Z
                    </div>
                    <div class="dropdown-item-action" (click)="setSort('capacidad', false)">
                      <span class="icon">↑↓</span> Ordenar de Z a A
                    </div>
                    <div class="dropdown-divider"></div>
                    <div class="dropdown-item-action" (click)="pinColumn('capacidad', 'left')">
                      <span class="icon">⊞</span> Fijar a la izquierda
                    </div>
                    <div class="dropdown-item-action" (click)="pinColumn('capacidad', 'right')">
                      <span class="icon">⊞</span> Fijar a la derecha
                    </div>
                    <div class="dropdown-divider"></div>
                    <div class="numeric-filter-box">
                      <div class="num-filter-row">
                        <label>Desde</label>
                        <input type="number" [(ngModel)]="filterCapacidadDesde" class="num-filter-input" (input)="cdr.detectChanges()">
                      </div>
                      <div class="num-filter-row">
                        <label>Hasta</label>
                        <input type="number" [(ngModel)]="filterCapacidadHasta" class="num-filter-input" (input)="cdr.detectChanges()">
                      </div>
                      <button class="btn-num-filter-search" (click)="applyNumericFilter()">Buscar</button>
                    </div>
                  </div>
                </th>
                <th *ngIf="isColVisible('minimo')" class="rel-pos text-right">
                  <div class="header-cell-content justify-end">
                    <span>Mínimo (kg)</span>
                    <button class="filter-trigger-btn" [class.active]="activeDropdown === 'minimo'" (click)="toggleDropdown('minimo', $event)">
                      {{ sortColumn === 'minimo' ? (sortAsc ? '↑' : '↓') : '▼' }}
                    </button>
                  </div>
                  <!-- Dropdown para Minimo -->
                  <div class="col-filter-dropdown shadow-premium text-left" *ngIf="activeDropdown === 'minimo'" (click)="$event.stopPropagation()">
                    <div class="dropdown-item-action" (click)="setSort('minimo', true)">
                      <span class="icon">↑↓</span> Ordenar de A a Z
                    </div>
                    <div class="dropdown-item-action" (click)="setSort('minimo', false)">
                      <span class="icon">↑↓</span> Ordenar de Z a A
                    </div>
                    <div class="dropdown-divider"></div>
                    <div class="dropdown-item-action" (click)="pinColumn('minimo', 'left')">
                      <span class="icon">⊞</span> Fijar a la izquierda
                    </div>
                    <div class="dropdown-item-action" (click)="pinColumn('minimo', 'right')">
                      <span class="icon">⊞</span> Fijar a la derecha
                    </div>
                    <div class="dropdown-divider"></div>
                    <div class="numeric-filter-box">
                      <div class="num-filter-row">
                        <label>Desde</label>
                        <input type="number" [(ngModel)]="filterMinimoDesde" class="num-filter-input" (input)="cdr.detectChanges()">
                      </div>
                      <div class="num-filter-row">
                        <label>Hasta</label>
                        <input type="number" [(ngModel)]="filterMinimoHasta" class="num-filter-input" (input)="cdr.detectChanges()">
                      </div>
                      <button class="btn-num-filter-search" (click)="applyNumericFilter()">Buscar</button>
                    </div>
                  </div>
                </th>
                <th *ngIf="isColVisible('maximo')" class="rel-pos text-right">
                  <div class="header-cell-content justify-end">
                    <span>Máximo (kg)</span>
                    <button class="filter-trigger-btn" [class.active]="activeDropdown === 'maximo'" (click)="toggleDropdown('maximo', $event)">
                      {{ sortColumn === 'maximo' ? (sortAsc ? '↑' : '↓') : '▼' }}
                    </button>
                  </div>
                  <!-- Dropdown para Maximo -->
                  <div class="col-filter-dropdown shadow-premium text-left" *ngIf="activeDropdown === 'maximo'" (click)="$event.stopPropagation()">
                    <div class="dropdown-item-action" (click)="setSort('maximo', true)">
                      <span class="icon">↑↓</span> Ordenar de A a Z
                    </div>
                    <div class="dropdown-item-action" (click)="setSort('maximo', false)">
                      <span class="icon">↑↓</span> Ordenar de Z a A
                    </div>
                    <div class="dropdown-divider"></div>
                    <div class="dropdown-item-action" (click)="pinColumn('maximo', 'left')">
                      <span class="icon">⊞</span> Fijar a la izquierda
                    </div>
                    <div class="dropdown-item-action" (click)="pinColumn('maximo', 'right')">
                      <span class="icon">⊞</span> Fijar a la derecha
                    </div>
                    <div class="dropdown-divider"></div>
                    <div class="numeric-filter-box">
                      <div class="num-filter-row">
                        <label>Desde</label>
                        <input type="number" [(ngModel)]="filterMaximoDesde" class="num-filter-input" (input)="cdr.detectChanges()">
                      </div>
                      <div class="num-filter-row">
                        <label>Hasta</label>
                        <input type="number" [(ngModel)]="filterMaximoHasta" class="num-filter-input" (input)="cdr.detectChanges()">
                      </div>
                      <button class="btn-num-filter-search" (click)="applyNumericFilter()">Buscar</button>
                    </div>
                  </div>
                </th>
                <th *ngIf="isColVisible('estadoMat')" class="rel-pos">
                  <div class="header-cell-content">
                    <span>Estado de Material</span>
                    <button class="filter-trigger-btn" [class.active]="activeDropdown === 'estadoMat'" (click)="toggleDropdown('estadoMat', $event)">
                      {{ sortColumn === 'estadoMat' ? (sortAsc ? '↑' : '↓') : '▼' }}
                    </button>
                  </div>
                  <!-- Dropdown para Estado de Material -->
                  <div class="col-filter-dropdown shadow-premium text-left" *ngIf="activeDropdown === 'estadoMat'" (click)="$event.stopPropagation()">
                    <div class="dropdown-item-action" (click)="setSort('estadoMat', true)">
                      <span class="icon">↑↓</span> Ordenar de A a Z
                    </div>
                    <div class="dropdown-item-action" (click)="setSort('estadoMat', false)">
                      <span class="icon">↑↓</span> Ordenar de Z a A
                    </div>
                    <div class="dropdown-divider"></div>
                    <div class="dropdown-item-action" (click)="pinColumn('estadoMat', 'left')">
                      <span class="icon">⊞</span> Fijar a la izquierda
                    </div>
                    <div class="dropdown-item-action" (click)="pinColumn('estadoMat', 'right')">
                      <span class="icon">⊞</span> Fijar a la derecha
                    </div>
                    <div class="dropdown-divider"></div>
                    <div class="dropdown-checkbox-list custom-scroll" style="max-height: 180px;">
                      <div class="checkbox-list-item" *ngFor="let est of uniqueEstados">
                        <label>
                          <input type="checkbox" [(ngModel)]="filterEstadoMatSelected[est]" (change)="cdr.detectChanges()">
                          {{ est }}
                        </label>
                      </div>
                    </div>
                    <div class="dropdown-divider"></div>
                    <div style="padding: 0.5rem 1rem;">
                      <button class="btn-num-filter-search" style="width: 100%;" (click)="applySelectionFilter('estadoMat')">Filtrar Seleccionados</button>
                    </div>
                  </div>
                </th>
                <th *ngIf="isColVisible('tipoMat')" class="rel-pos">
                  <div class="header-cell-content">
                    <span>Tipo de Material</span>
                    <button class="filter-trigger-btn" [class.active]="activeDropdown === 'tipoMat'" (click)="toggleDropdown('tipoMat', $event)">
                      {{ sortColumn === 'tipoMat' ? (sortAsc ? '↑' : '↓') : '▼' }}
                    </button>
                  </div>
                  <!-- Dropdown para Tipo de Material -->
                  <div class="col-filter-dropdown shadow-premium text-left" *ngIf="activeDropdown === 'tipoMat'" (click)="$event.stopPropagation()">
                    <div class="dropdown-item-action" (click)="setSort('tipoMat', true)">
                      <span class="icon">↑↓</span> Ordenar de A a Z
                    </div>
                    <div class="dropdown-item-action" (click)="setSort('tipoMat', false)">
                      <span class="icon">↑↓</span> Ordenar de Z a A
                    </div>
                    <div class="dropdown-divider"></div>
                    <div class="dropdown-item-action" (click)="pinColumn('tipoMat', 'left')">
                      <span class="icon">⊞</span> Fijar a la izquierda
                    </div>
                    <div class="dropdown-item-action" (click)="pinColumn('tipoMat', 'right')">
                      <span class="icon">⊞</span> Fijar a la derecha
                    </div>
                    <div class="dropdown-divider"></div>
                    <div class="dropdown-checkbox-list custom-scroll" style="max-height: 180px;">
                      <div class="checkbox-list-item" *ngFor="let tip of uniqueTipos">
                        <label>
                          <input type="checkbox" [(ngModel)]="filterTipoMatSelected[tip]" (change)="cdr.detectChanges()">
                          {{ tip }}
                        </label>
                      </div>
                    </div>
                    <div class="dropdown-divider"></div>
                    <div style="padding: 0.5rem 1rem;">
                      <button class="btn-num-filter-search" style="width: 100%;" (click)="applySelectionFilter('tipoMat')">Filtrar Seleccionados</button>
                    </div>
                  </div>
                </th>
                <th *ngIf="isColVisible('activo')" class="rel-pos text-center">
                  <div class="header-cell-content justify-center">
                    <span>Silo Activo</span>
                    <button class="filter-trigger-btn" [class.active]="activeDropdown === 'activo'" (click)="toggleDropdown('activo', $event)">
                      {{ sortColumn === 'activo' ? (sortAsc ? '↑' : '↓') : '▼' }}
                    </button>
                  </div>
                  <!-- Dropdown para Silo Activo -->
                  <div class="col-filter-dropdown shadow-premium text-left" *ngIf="activeDropdown === 'activo'" (click)="$event.stopPropagation()">
                    <div class="dropdown-item-action" (click)="setSort('activo', true)">
                      <span class="icon">↑↓</span> Ordenar de A a Z
                    </div>
                    <div class="dropdown-item-action" (click)="setSort('activo', false)">
                      <span class="icon">↑↓</span> Ordenar de Z a A
                    </div>
                    <div class="dropdown-divider"></div>
                    <div class="dropdown-item-action" (click)="pinColumn('activo', 'left')">
                      <span class="icon">⊞</span> Fijar a la izquierda
                    </div>
                    <div class="dropdown-item-action" (click)="pinColumn('activo', 'right')">
                      <span class="icon">⊞</span> Fijar a la derecha
                    </div>
                    <div class="dropdown-divider"></div>
                    
                    <div class="dropdown-item-action" (click)="setActivoFilter('all')">
                      <span class="icon">✖</span> Limpiar búsqueda
                    </div>
                    <div class="dropdown-item-action" (click)="setActivoFilter('marcado')">
                      <span class="icon">⏳</span> Marcado
                    </div>
                    <div class="dropdown-item-action" (click)="setActivoFilter('desmarcado')">
                      <span class="icon"></span> Desmarcado
                    </div>
                  </div>
                </th>
                <th class="text-center">Modificar</th>
                <th class="text-center">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let s of filteredSilos" class="grid-row">
                <td class="text-center"><button class="link-btn archive" (click)="archiveSilo(s)">Archivar</button></td>
                <td class="text-center"><button class="link-btn view" (click)="openModal('VIEW', s)">Visualizar</button></td>
                
                <td *ngIf="isColVisible('nombre')" class="font-semibold">{{ s.nombre }}</td>
                <td *ngIf="isColVisible('capacidad')" class="text-right font-mono">{{ s.capacidadMaxima | number:'1.2-2' }}</td>
                <td *ngIf="isColVisible('minimo')" class="text-right font-mono">{{ s.kgMinimo | number:'1.2-2' }}</td>
                <td *ngIf="isColVisible('maximo')" class="text-right font-mono">{{ s.kgMaximo | number:'1.2-2' }}</td>
                <td *ngIf="isColVisible('estadoMat')">{{ s.estadoMaterial }}</td>
                <td *ngIf="isColVisible('tipoMat')">{{ s.tipoMaterial }}</td>
                <td *ngIf="isColVisible('activo')" class="text-center">
                  <input type="checkbox" [checked]="s.activo" disabled class="legacy-table-checkbox">
                </td>
                
                <td class="text-center"><button class="link-btn edit" (click)="openModal('EDIT', s)">Modificar</button></td>
                <td class="text-center"><button class="link-btn delete" (click)="openModal('DELETE', s)">Eliminar</button></td>
              </tr>
            </tbody>
          </table>
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
  `] })
export class SilosComponent implements OnInit {
  private inventarioService = inject(InventarioService);
  private pdfService = inject(PdfExportService);
  public cdr = inject(ChangeDetectorRef);
  
  searchQuery = '';
  silos: Silo[] = [];
  showModal = false;
  showColumnSelector = false;
  showExportSelector = false;
  modalMode: 'ADD' | 'VIEW' | 'EDIT' | 'DELETE' | 'CONSUMO' = 'ADD';
  consumoKilos: number = 0;
  consumoMotivo: string = '';
  
  // Filtros Avanzados
  filterTipoMaterial = '';
  filterEstadoSilo = 'all';
  
  showSearchFilterDropdown = false;
  savedFilters: { name: string, state: any }[] = [];

  // Dropdown menus state
  activeDropdown: string | null = null;
  sortColumn: string = '';
  sortAsc: boolean = true;
  
  filterNombreSearch = '';
  filterNombreSelected: { [key: string]: boolean } = {};
  
  filterCapacidadDesde: number | null = null;
  filterCapacidadHasta: number | null = null;
  
  filterExistenciaDesde: number | null = null;
  filterExistenciaHasta: number | null = null;
  
  filterMinimoDesde: number | null = null;
  filterMinimoHasta: number | null = null;
  
  filterMaximoDesde: number | null = null;
  filterMaximoHasta: number | null = null;
  
  pinnedColumns: { [key: string]: 'left' | 'right' | null } = {};
  filterEstadoMatSelected: { [key: string]: boolean } = {};
  filterTipoMatSelected: { [key: string]: boolean } = {};
  filterActivoState: 'all' | 'marcado' | 'desmarcado' = 'all';

  allUniqueNames: { name: string, count: number }[] = [];
  filteredUniqueNames: { name: string, count: number }[] = [];
  uniqueEstados: string[] = [];
  uniqueTipos: string[] = [];

  updateUniqueFilters() {
    // 1. Unique Names
    const nameCounts: { [key: string]: number } = {};
    this.silos.forEach(s => {
      if (s.nombre) {
        nameCounts[s.nombre] = (nameCounts[s.nombre] || 0) + 1;
      }
    });
    this.allUniqueNames = Object.keys(nameCounts).map(name => ({
      name,
      count: nameCounts[name]
    }));
    this.filterNamesList();

    // 2. Unique Estados
    const estadoSet = new Set<string>();
    this.silos.forEach(s => {
      if (s.estadoMaterial) estadoSet.add(s.estadoMaterial);
    });
    this.uniqueEstados = estadoSet.size > 0 ? Array.from(estadoSet) : ['Virgen (pelet)', 'Molido'];

    // 3. Unique Tipos
    const tipoSet = new Set<string>();
    this.silos.forEach(s => {
      if (s.tipoMaterial) tipoSet.add(s.tipoMaterial);
    });
    this.uniqueTipos = tipoSet.size > 0 ? Array.from(tipoSet) : ['PCR', 'DOW', 'PCR 100%'];
  }

  filterNamesList() {
    if (this.filterNombreSearch) {
      const q = this.filterNombreSearch.toLowerCase();
      this.filteredUniqueNames = this.allUniqueNames.filter(item => 
        item.name.toLowerCase().includes(q)
      );
    } else {
      this.filteredUniqueNames = [...this.allUniqueNames];
    }
    this.cdr.detectChanges();
  }

  applyNombreSearchFilter(event: Event) {
    event.preventDefault();
    this.filteredUniqueNames.forEach(item => {
      this.filterNombreSelected[item.name] = true;
    });
    this.activeDropdown = null;
    this.cdr.detectChanges();
  }

  applySelectionFilter(columnId: string) {
    this.activeDropdown = null;
    this.cdr.detectChanges();
  }

  setActivoFilter(state: 'all' | 'marcado' | 'desmarcado') {
    this.filterActivoState = state;
    this.activeDropdown = null;
    this.cdr.detectChanges();
  }

  @HostListener('document:click')
  closeDropdowns() {
    this.activeDropdown = null;
    this.showSearchFilterDropdown = false;
  }

  toggleSearchFilterDropdown(event: Event) {
    event.stopPropagation();
    this.showSearchFilterDropdown = !this.showSearchFilterDropdown;
    if (this.showSearchFilterDropdown) {
      this.activeDropdown = null; // close other column dropdowns
    }
  }

  clearAllFilters() {
    this.resetFilters();
    this.showSearchFilterDropdown = false;
  }

  saveActiveFilters() {
    this.showSearchFilterDropdown = false;
    const filterName = prompt('Ingrese un nombre para guardar el filtro activo:', 'Filtro Silos ' + new Date().toLocaleDateString());
    if (!filterName) return;

    const filterState = {
      tipoMaterial: this.filterTipoMaterial,
      estadoSilo: this.filterEstadoSilo,
      searchQuery: this.searchQuery,
      sortColumn: this.sortColumn,
      sortAsc: this.sortAsc,
      filterNombreSearch: this.filterNombreSearch,
      filterNombreSelected: { ...this.filterNombreSelected },
      filterCapacidadDesde: this.filterCapacidadDesde,
      filterCapacidadHasta: this.filterCapacidadHasta,
      filterExistenciaDesde: this.filterExistenciaDesde,
      filterExistenciaHasta: this.filterExistenciaHasta,
      filterMinimoDesde: this.filterMinimoDesde,
      filterMinimoHasta: this.filterMinimoHasta,
      filterMaximoDesde: this.filterMaximoDesde,
      filterMaximoHasta: this.filterMaximoHasta,
      filterEstadoMatSelected: { ...this.filterEstadoMatSelected },
      filterTipoMatSelected: { ...this.filterTipoMatSelected },
      filterActivoState: this.filterActivoState
    };

    this.savedFilters.push({ name: filterName, state: filterState });
    localStorage.setItem('siloSavedFilters', JSON.stringify(this.savedFilters));
    alert(`El filtro "${filterName}" se ha guardado exitosamente.`);
    this.cdr.detectChanges();
  }

  loadSavedFilter(f: { name: string, state: any }) {
    const s = f.state;
    this.filterTipoMaterial = s.tipoMaterial;
    this.filterEstadoSilo = s.estadoSilo;
    this.searchQuery = s.searchQuery;
    this.sortColumn = s.sortColumn;
    this.sortAsc = s.sortAsc;
    this.filterNombreSearch = s.filterNombreSearch || '';
    this.filterNombreSelected = s.filterNombreSelected || {};
    this.filterCapacidadDesde = s.filterCapacidadDesde;
    this.filterCapacidadHasta = s.filterCapacidadHasta;
    this.filterExistenciaDesde = s.filterExistenciaDesde;
    this.filterExistenciaHasta = s.filterExistenciaHasta;
    this.filterMinimoDesde = s.filterMinimoDesde;
    this.filterMinimoHasta = s.filterMinimoHasta;
    this.filterMaximoDesde = s.filterMaximoDesde;
    this.filterMaximoHasta = s.filterMaximoHasta;
    this.filterEstadoMatSelected = s.filterEstadoMatSelected || {};
    this.filterTipoMatSelected = s.filterTipoMatSelected || {};
    this.filterActivoState = s.filterActivoState || 'all';
    
    this.filterNamesList();
    this.showSearchFilterDropdown = false;
    this.cdr.detectChanges();
  }

  deleteSavedFilter(f: { name: string, state: any }, event: Event) {
    event.stopPropagation();
    this.savedFilters = this.savedFilters.filter(item => item !== f);
    localStorage.setItem('siloSavedFilters', JSON.stringify(this.savedFilters));
    this.cdr.detectChanges();
  }

  loadFiltersFromStorage() {
    const stored = localStorage.getItem('siloSavedFilters');
    if (stored) {
      try {
        this.savedFilters = JSON.parse(stored);
      } catch (e) {
        this.savedFilters = [];
      }
    }
  }

  toggleDropdown(columnId: string, event: Event) {
    event.stopPropagation();
    if (this.activeDropdown === columnId) {
      this.activeDropdown = null;
    } else {
      this.activeDropdown = columnId;
    }
  }

  setSort(columnId: string, asc: boolean) {
    this.sortColumn = columnId;
    this.sortAsc = asc;
    this.activeDropdown = null;
    this.cdr.detectChanges();
  }

  pinColumn(columnId: string, direction: 'left' | 'right') {
    this.pinnedColumns[columnId] = this.pinnedColumns[columnId] === direction ? null : direction;
    this.activeDropdown = null;
    this.cdr.detectChanges();
  }

  applyNumericFilter() {
    this.activeDropdown = null;
    this.cdr.detectChanges();
  }

  newSilo: Partial<Silo> = this.getDefaultSilo();

  columns = [
    { id: 'nombre', label: 'Nombre', visible: true },
    { id: 'capacidad', label: 'Capacidad (kg)', visible: true },
    { id: 'existencia', label: 'Existencia (kg)', visible: true },
    { id: 'minimo', label: 'Mínimo (kg)', visible: true },
    { id: 'maximo', label: 'Máximo (kg)', visible: true },
    { id: 'estadoMat', label: 'Estado de Material', visible: true },
    { id: 'tipoMat', label: 'Tipo de Material', visible: true },
    { id: 'activo', label: 'Silo Activo', visible: true }
  ];

  ngOnInit() {
    this.loadSilos();
    this.loadFiltersFromStorage();
  }

  loadSilos() {
    this.inventarioService.getSilos().subscribe({
      next: (data) => {
        this.silos = data;
        this.updateUniqueFilters();
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar silos:', err)
    });
  }

  getDefaultSilo(): Partial<Silo> {
    return {
      nombre: '',
      codigo: '',
      capacidadMaxima: 0,
      kgMinimo: 0,
      kgMaximo: 0,
      estadoMaterial: 'Virgen (pelet)',
      tipoMaterial: 'PCR',
      activo: true
    };
  }

  activeTab: 'details' | 'audit' = 'details';
  auditLogs: AuditLog[] = [];
  loadingAudit = false;

  openModal(mode: 'ADD' | 'VIEW' | 'EDIT' | 'DELETE' | 'CONSUMO' = 'ADD', item: Silo | null = null) { 
    this.modalMode = mode;
    this.activeTab = 'details';
    this.auditLogs = [];
    this.consumoKilos = 0;
    this.consumoMotivo = '';
    if (item) {
      this.newSilo = { ...item };
    } else {
      this.newSilo = this.getDefaultSilo();
    }
    this.showModal = true; 
    this.cdr.detectChanges();
  }

  closeModal() { 
    this.showModal = false; 
    this.activeTab = 'details';
    this.auditLogs = [];
    this.newSilo = this.getDefaultSilo(); 
    this.cdr.detectChanges();
  }

  loadAuditHistory() {
    if (!this.newSilo.id) return;
    this.loadingAudit = true;
    this.inventarioService.getAuditHistory('Silo', this.newSilo.id).subscribe({
      next: (data) => {
        this.auditLogs = data;
        this.loadingAudit = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar historial de silos:', err);
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
      'LoteSiloId': 'Silo Asociado'
    };
    return dict[field] || field;
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
    if (this.modalMode === 'CONSUMO') {
      this.registrarConsumo();
      return;
    }
    this.saveSilo();
  }

  registrarConsumo() {
    if (!this.newSilo.id || this.consumoKilos <= 0 || !this.consumoMotivo) return;
    this.inventarioService.registrarConsumoSilo(this.newSilo.id, this.consumoKilos, this.consumoMotivo).subscribe({
      next: () => {
        this.loadSilos();
        this.closeModal();
      },
      error: (err) => alert('Error al registrar consumo: ' + err?.error?.message || err.message)
    });
  }

  saveSilo() {
    if (!this.newSilo.nombre) return;
    
    const obs = (this.modalMode === 'EDIT' && this.newSilo.id)
      ? this.inventarioService.updateSilo(this.newSilo.id, this.newSilo)
      : this.inventarioService.createSilo(this.newSilo);

    obs.subscribe({
      next: () => { 
        this.loadSilos(); 
        this.closeModal(); 
      },
      error: (err) => alert('Error: ' + err.message)
    });
  }

  executeDelete() {
    if (this.newSilo.id) {
      this.inventarioService.deleteSilo(this.newSilo.id).subscribe({
        next: () => {
          this.loadSilos();
          this.closeModal();
        },
        error: (err) => alert('Error al eliminar: ' + err.message)
      });
    }
  }

  deleteSilo(silo: Silo) {
    this.openModal('DELETE', silo);
  }

  editSilo(silo: Silo) {
    this.newSilo = { ...silo };
    this.showModal = true;
  }

  archiveSilo(silo: Silo) {
    if (confirm(`¿Desea archivar el silo ${silo.nombre}? El registro no se borrará pero dejará de ser visible en el listado activo.`)) {
      if (silo.id) {
        this.inventarioService.deleteSilo(silo.id).subscribe(() => this.loadSilos());
      }
    }
  }

  // Lógica del Selector de Columnas
  toggleColumnSelector() {
    this.showColumnSelector = !this.showColumnSelector;
  }

  isColVisible(id: string): boolean {
    return this.columns.find(c => c.id === id)?.visible || false;
  }

  allNonFixedVisible(): boolean {
    return this.columns.every(c => c.visible);
  }

  toggleAllNonFixed() {
    const target = !this.allNonFixedVisible();
    this.columns.forEach(c => c.visible = target);
  }

  resetColumns() {
    this.columns.forEach(c => c.visible = true);
  }

  resetFilters() {
    this.filterTipoMaterial = '';
    this.filterEstadoSilo = 'all';
    this.searchQuery = '';
    this.sortColumn = '';
    this.sortAsc = true;
    this.filterNombreSearch = '';
    this.filterNombreSelected = {};
    this.filterCapacidadDesde = null;
    this.filterCapacidadHasta = null;
    this.filterExistenciaDesde = null;
    this.filterExistenciaHasta = null;
    this.filterMinimoDesde = null;
    this.filterMinimoHasta = null;
    this.filterMaximoDesde = null;
    this.filterMaximoHasta = null;
    this.filterEstadoMatSelected = {};
    this.filterTipoMatSelected = {};
    this.filterActivoState = 'all';
    this.activeDropdown = null;
    this.cdr.detectChanges();
  }

  get filteredSilos() {
    let result = [...this.silos];
    
    // 1. Busqueda general
    const q = (this.searchQuery || '').toLowerCase();
    if (q) {
      result = result.filter(s => 
        (s.nombre || '').toLowerCase().includes(q) || 
        (s.codigo || '').toLowerCase().includes(q)
      );
    }
    
    // 2. Filtros de barra (Tipo Material & Estado Silo)
    if (this.filterTipoMaterial) {
      result = result.filter(s => s.tipoMaterial === this.filterTipoMaterial);
    }
    if (this.filterEstadoSilo !== 'all') {
      result = result.filter(s => s.activo.toString() === this.filterEstadoSilo);
    }
    
    // 3. Filtro de Nombre por checkbox
    const selectedNombres = Object.keys(this.filterNombreSelected).filter(k => this.filterNombreSelected[k]);
    if (selectedNombres.length > 0) {
      result = result.filter(s => this.filterNombreSelected[s.nombre]);
    }
    
    // 4. Filtro Capacidad
    if (this.filterCapacidadDesde !== null && this.filterCapacidadDesde !== undefined) {
      result = result.filter(s => (s.capacidadMaxima || 0) >= this.filterCapacidadDesde!);
    }
    if (this.filterCapacidadHasta !== null && this.filterCapacidadHasta !== undefined) {
      result = result.filter(s => (s.capacidadMaxima || 0) <= this.filterCapacidadHasta!);
    }
    
    // Filtro Existencia
    if (this.filterExistenciaDesde !== null && this.filterExistenciaDesde !== undefined) {
      result = result.filter(s => (s.existenciaActual || 0) >= this.filterExistenciaDesde!);
    }
    if (this.filterExistenciaHasta !== null && this.filterExistenciaHasta !== undefined) {
      result = result.filter(s => (s.existenciaActual || 0) <= this.filterExistenciaHasta!);
    }
    
    // 5. Filtro Minimo
    if (this.filterMinimoDesde !== null && this.filterMinimoDesde !== undefined) {
      result = result.filter(s => (s.kgMinimo || 0) >= this.filterMinimoDesde!);
    }
    if (this.filterMinimoHasta !== null && this.filterMinimoHasta !== undefined) {
      result = result.filter(s => (s.kgMinimo || 0) <= this.filterMinimoHasta!);
    }
    
    // 6. Filtro Maximo
    if (this.filterMaximoDesde !== null && this.filterMaximoDesde !== undefined) {
      result = result.filter(s => (s.kgMaximo || 0) >= this.filterMaximoDesde!);
    }
    if (this.filterMaximoHasta !== null && this.filterMaximoHasta !== undefined) {
      result = result.filter(s => (s.kgMaximo || 0) <= this.filterMaximoHasta!);
    }
    
    // 8. Filtro Estado de Material por checkbox
    const selectedEstados = Object.keys(this.filterEstadoMatSelected).filter(k => this.filterEstadoMatSelected[k]);
    if (selectedEstados.length > 0) {
      result = result.filter(s => this.filterEstadoMatSelected[s.estadoMaterial]);
    }

    // 9. Filtro Tipo de Material por checkbox
    const selectedTipos = Object.keys(this.filterTipoMatSelected).filter(k => this.filterTipoMatSelected[k]);
    if (selectedTipos.length > 0) {
      result = result.filter(s => this.filterTipoMatSelected[s.tipoMaterial]);
    }

    // 10. Filtro Silo Activo
    if (this.filterActivoState === 'marcado') {
      result = result.filter(s => s.activo === true);
    } else if (this.filterActivoState === 'desmarcado') {
      result = result.filter(s => s.activo === false);
    }
    
    // 7. Ordenamiento
    if (this.sortColumn) {
      result.sort((a: any, b: any) => {
        let valA = a[this.sortColumn === 'capacidad' ? 'capacidadMaxima' : this.sortColumn === 'minimo' ? 'kgMinimo' : this.sortColumn === 'maximo' ? 'kgMaximo' : this.sortColumn === 'existencia' ? 'existenciaActual' : this.sortColumn === 'activo' ? 'activo' : this.sortColumn];
        let valB = b[this.sortColumn === 'capacidad' ? 'capacidadMaxima' : this.sortColumn === 'minimo' ? 'kgMinimo' : this.sortColumn === 'maximo' ? 'kgMaximo' : this.sortColumn === 'existencia' ? 'existenciaActual' : this.sortColumn === 'activo' ? 'activo' : this.sortColumn];
        
        if (typeof valA === 'string') {
          valA = valA.toLowerCase();
          valB = (valB || '').toLowerCase();
        }
        
        if (valA === null || valA === undefined) return 1;
        if (valB === null || valB === undefined) return -1;
        
        if (valA < valB) return this.sortAsc ? -1 : 1;
        if (valA > valB) return this.sortAsc ? 1 : -1;
        return 0;
      });
    }
    
    return result;
  }

  exportToCSV() {
    if (this.silos.length === 0) return;
    const headers = ['Nombre', 'Código', 'Capacidad (kg)', 'Existencia Actual', 'Mínimo (kg)', 'Máximo (kg)', 'Estado Material', 'Tipo Material', 'Activo'];
    const rows = this.filteredSilos.map(s => [
      s.nombre || '',
      s.codigo || '',
      s.capacidadMaxima?.toString() || '0',
      s.existenciaActual?.toString() || '0',
      s.kgMinimo?.toString() || '0',
      s.kgMaximo?.toString() || '0',
      s.estadoMaterial || '',
      s.tipoMaterial || '',
      s.activo ? 'Si' : 'No'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Silos_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  exportToPDF() {
    if (this.silos.length === 0) return;
    const headers = ['Nombre', 'Código', 'Capacidad', 'Stock Actual', 'Mínimo', 'Máximo', 'Material'];
    const data = this.filteredSilos.map(s => [
      s.nombre || '',
      s.codigo || '',
      s.capacidadMaxima?.toString() || '0',
      s.existenciaActual?.toString() || '0',
      s.kgMinimo?.toString() || '0',
      s.kgMaximo?.toString() || '0',
      s.tipoMaterial || ''
    ]);

    this.pdfService.exportTable(
      'Gestión de Silos - Reporte',
      headers,
      data,
      `Silos_Report_${new Date().toISOString().split('T')[0]}.pdf`
    );
  }
}
