import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduccionService, CausaInterrupcion, Extrusion } from '../../../core/services/produccion';

@Component({
  selector: 'app-extrusion-interrupciones-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up" (click)="closeAllDropdowns()">

      <div class="page-header-premium">
        <div class="title-section">
          <h1 class="premium-title">Extrusión Interrupción</h1>
          <nav class="breadcrumb-modern">
            <span class="root">Extrusión</span>
            <span class="sep">&rsaquo;</span>
            <span class="root">Operación</span>
            <span class="sep">&rsaquo;</span>
            <span class="active">Interrupciones</span>
          </nav>
        </div>
      </div>

      <!-- VISTA LISTADO -->
      <div class="card-premium" *ngIf="viewState() === 'list'">
        <div class="toolbar-premium">
          <div class="toolbar-left">
            <button class="btn-action-insert" (click)="irAAgregar()" title="Insertar">
              📄<span class="plus-icon">+</span>
            </button>

            <div class="dropdown-wrapper">
              <button class="btn btn-secondary" (click)="toggleExportDropdown($event)">
                <span>⬇</span> Exportar
              </button>
              @if (showExportOptions()) {
                <div class="dd-popover animate-slide-up" (click)="$event.stopPropagation()">
                  <div class="dd-item" (click)="exportCSV()">Excel (CSV)</div>
                  <div class="dd-item" (click)="exportPDF()">PDF</div>
                </div>
              }
            </div>

            <div class="dropdown-wrapper">
              <button class="btn btn-secondary btn-cols" (click)="toggleColumnDropdown($event)">
                ☰ Selecciona columnas ▾
              </button>
              @if (showColumnSelector()) {
                <div class="col-sel-popover animate-slide-up" (click)="$event.stopPropagation()">
                  <div class="col-group">
                    <label class="col-group-label">
                      <input type="checkbox" [checked]="allColsVisible()" (change)="toggleAllCols()" /> Mostrar Columnas ▾
                    </label>
                    <div class="col-subitem-grid">
                      <label><input type="checkbox" [checked]="isColVisible('extrusionId')" (change)="toggleCol('extrusionId')" /> Extrusión ID</label>
                      <label><input type="checkbox" [checked]="isColVisible('fecha')" (change)="toggleCol('fecha')" /> Fecha</label>
                      <label><input type="checkbox" [checked]="isColVisible('estado')" (change)="toggleCol('estado')" /> Estado</label>
                      <label><input type="checkbox" [checked]="isColVisible('horaInicioExtrusion')" (change)="toggleCol('horaInicioExtrusion')" /> Hora Inicio Ext.</label>
                      <label><input type="checkbox" [checked]="isColVisible('horaFinExtrusion')" (change)="toggleCol('horaFinExtrusion')" /> Hora Fin Ext.</label>
                      <label><input type="checkbox" [checked]="isColVisible('turno')" (change)="toggleCol('turno')" /> Turno</label>
                      <label><input type="checkbox" [checked]="isColVisible('operador')" (change)="toggleCol('operador')" /> Operador</label>
                      <label><input type="checkbox" [checked]="isColVisible('extrusora')" (change)="toggleCol('extrusora')" /> Extrusora</label>
                      <label><input type="checkbox" [checked]="isColVisible('producto')" (change)="toggleCol('producto')" /> Producto</label>
                      <label><input type="checkbox" [checked]="isColVisible('tipoMaterial')" (change)="toggleCol('tipoMaterial')" /> Tipo de Material</label>
                      <label><input type="checkbox" [checked]="isColVisible('interrupcionId')" (change)="toggleCol('interrupcionId')" /> Interrupción ID</label>
                      <label><input type="checkbox" [checked]="isColVisible('concluida')" (change)="toggleCol('concluida')" /> Concluida</label>
                      <label><input type="checkbox" [checked]="isColVisible('horaInicio')" (change)="toggleCol('horaInicio')" /> Hora Inicio Int.</label>
                      <label><input type="checkbox" [checked]="isColVisible('horaFin')" (change)="toggleCol('horaFin')" /> Hora Fin Int.</label>
                      <label><input type="checkbox" [checked]="isColVisible('motivo')" (change)="toggleCol('motivo')" /> Motivo</label>
                      <label><input type="checkbox" [checked]="isColVisible('tiempo')" (change)="toggleCol('tiempo')" /> Tiempo (Seg)</label>
                      <label><input type="checkbox" [checked]="isColVisible('causaCodigo')" (change)="toggleCol('causaCodigo')" /> Down Time Code</label>
                      <label><input type="checkbox" [checked]="isColVisible('causaTipo')" (change)="toggleCol('causaTipo')" /> Clasificación</label>
                    </div>
                  </div>
                  <button class="btn-actualizar" (click)="showColumnSelector.set(false)">↺ Actualizar</button>
                </div>
              }
            </div>
          </div>

          <div style="flex:1"></div>

          <div class="toolbar-right">
            <div class="search-box">
              <span class="search-icon">🔍</span>
              <input class="search-input" type="text" placeholder="Buscar..." [ngModel]="searchText()" (ngModelChange)="searchText.set($event)" />
            </div>
          </div>
        </div>

        <!-- TABLA -->
        <div class="content-card">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 80px;">Acciones</th>
                @if (isColVisible('extrusionId')) { <th>Extrusión ID</th> }
                @if (isColVisible('fecha')) { <th>Fecha</th> }
                @if (isColVisible('estado')) { <th>Estado</th> }
                @if (isColVisible('horaInicioExtrusion')) { <th>Hora de Inicio</th> }
                @if (isColVisible('horaFinExtrusion')) { <th>Hora de Fin</th> }
                @if (isColVisible('turno')) { <th>Turno</th> }
                @if (isColVisible('operador')) { <th>Operador</th> }
                @if (isColVisible('extrusora')) { <th>Extrusora</th> }
                @if (isColVisible('producto')) { <th>Producto</th> }
                @if (isColVisible('tipoMaterial')) { <th>Tipo de Material</th> }
                @if (isColVisible('interrupcionId')) { <th>Interrupción ID</th> }
                @if (isColVisible('concluida')) { <th>Concluida</th> }
                @if (isColVisible('horaInicio')) { <th>Hora de Inicio de Interrupción</th> }
                @if (isColVisible('horaFin')) { <th>Hora de Fin de Interrupción</th> }
                @if (isColVisible('motivo')) { <th>Motivo</th> }
                @if (isColVisible('tiempo')) { <th>Tiempo</th> }
                @if (isColVisible('causaCodigo')) { <th>Down Time Code</th> }
                @if (isColVisible('causaTipo')) { <th>Clasificación</th> }
              </tr>
            </thead>
            <tbody>
              @for (item of paginatedItems(); track item.id; let idx = $index) {
                <tr>
                  <td class="td-actions">
                    <span class="action-btn-pencil" (click)="irAModificar(item)" title="Modificar">✏️</span>
                    <span class="action-btn-cross" (click)="eliminar(item)" title="Eliminar">❌</span>
                  </td>
                  @if (isColVisible('extrusionId')) { <td>{{ item.extrusionIdLegacy || getShortId(item.extrusionId) }}</td> }
                  @if (isColVisible('fecha')) { <td>{{ item.fecha | date:'dd/MM/yy' }} 00:00</td> }
                  @if (isColVisible('estado')) { <td>{{ item.estado || '—' }}</td> }
                  @if (isColVisible('horaInicioExtrusion')) { <td>{{ item.horaInicioExtrusion | date:'dd/MM/yy HH:mm' }}</td> }
                  @if (isColVisible('horaFinExtrusion')) { <td>{{ item.horaFinExtrusion ? (item.horaFinExtrusion | date:'dd/MM/yy HH:mm') : '—' }}</td> }
                  @if (isColVisible('turno')) { <td>{{ item.turno }}</td> }
                  @if (isColVisible('operador')) { <td>{{ item.operador | uppercase }}</td> }
                  @if (isColVisible('extrusora')) { <td style="color: #10b981; font-weight: 700;">{{ item.extrusora }}</td> }
                  @if (isColVisible('producto')) { <td>{{ item.producto }}</td> }
                  @if (isColVisible('tipoMaterial')) { <td>{{ item.tipoMaterial }}</td> }
                  @if (isColVisible('interrupcionId')) { <td>{{ getShortId(item.id) }}</td> }
                  @if (isColVisible('concluida')) {
                    <td class="text-center">
                      <input type="checkbox" [checked]="item.concluida" disabled />
                    </td>
                  }
                  @if (isColVisible('horaInicio')) { <td>{{ item.horaInicio | date:'dd/MM/yy HH:mm' }}</td> }
                  @if (isColVisible('horaFin')) { <td>{{ item.horaFin ? (item.horaFin | date:'dd/MM/yy HH:mm') : '—' }}</td> }
                  @if (isColVisible('motivo')) { <td>{{ item.descripcion || '—' }}</td> }
                  @if (isColVisible('tiempo')) { 
                    <td>
                      <strong>{{ getDurationSeconds(item) }}</strong>
                    </td>
                  }
                  @if (isColVisible('causaCodigo')) { <td>{{ item.causaCodigo }} - {{ item.causaDescripcion }}</td> }
                  @if (isColVisible('causaTipo')) { <td>{{ item.causaTipo }}</td> }
                </tr>
              }
              @if (paginatedItems().length === 0) {
                <tr>
                  <td [attr.colspan]="visibleCount() + 1" class="empty-state">No se encontraron interrupciones.</td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <!-- Paginación -->
        @if (totalPages() > 1) {
          <div class="pagination-container">
            <button class="pag-btn" [disabled]="currentPage() === 1" (click)="prevPage()">&laquo;</button>
            @for (p of getPages(currentPage(), totalPages()); track p) {
              @if (p === '...') {
                <span class="pag-dots">...</span>
              } @else {
                <button class="pag-btn" [class.active]="currentPage() === p" (click)="setPage(p)">{{ p }}</button>
              }
            }
            <button class="pag-btn" [disabled]="currentPage() === totalPages()" (click)="nextPage()">&raquo;</button>
          </div>
        }
      </div>

      <!-- FORMULARIO AGREGAR / EDITAR (ESTILO QA IMAGEN 1) -->
      <div class="card-qa-form" *ngIf="viewState() === 'add' || viewState() === 'edit'">
        <div class="panel-header-qa">
          <span class="icon-square-green"></span>
          <span>Información General</span>
        </div>

        <div class="form-body-qa">
          <!-- Interrupcion Id (Primary Key / legacy numeric ID) -->
          <div class="qa-field-group">
            <label class="qa-field-label">Interrupcion Id</label>
            <div class="qa-field-value-readonly">{{ formModel.extrusionInterrupcionIdNum || getShortId(formModel.id) }}</div>
          </div>

          <!-- Extrusión Id -->
          <div class="qa-field-group">
            <label class="qa-field-label">Extrusion Id</label>
            <div class="qa-field-value-readonly" *ngIf="formModel.extrusionIdLegacy">
              {{ formModel.extrusionIdLegacy }}
            </div>
            <select [(ngModel)]="formModel.extrusionId" (change)="onExtrusionChange($event)" class="input-premium" [disabled]="viewState() === 'edit'">
              <option value="">-- Selecciona Extrusión --</option>
              <option *ngFor="let ex of activeExtrusiones" [value]="ex.id">
                ID: {{ ex.extrusionIdLegacy || getShortId(ex.id) }} - {{ ex.extrusora?.nombre }} - {{ ex.productoNombre || ex.producto?.nombre }} ({{ ex.fechaInicio | date:'dd/MM/yy' }})
              </option>
            </select>
          </div>

          <!-- Interrupción / Causa Id -->
          <div class="qa-field-group">
            <label class="qa-field-label">Interrupcion Id (Down Time Code)</label>
            <div class="qa-field-value-readonly" *ngIf="formModel.causaCodigo">
              {{ formModel.causaCodigo }}
            </div>
            <select [(ngModel)]="formModel.causaId" (change)="onCausaChange($event)" class="input-premium">
              <option value="">-- Selecciona Down Time Code / Causa --</option>
              <option *ngFor="let c of causas" [value]="c.id">
                {{ c.codigo }} - {{ c.descripcion }} ({{ c.tipo }})
              </option>
            </select>
          </div>

          <!-- Tiempos y Estado -->
          <div class="premium-form-grid" style="margin-top: 1rem;">
            <div class="form-group-premium">
              <label class="qa-field-label">Hora de Inicio de Interrupción</label>
              <input type="datetime-local" [(ngModel)]="formModel.horaInicio" class="input-premium" />
            </div>

            <div class="form-group-premium">
              <label class="qa-field-label">Hora de Fin de Interrupción</label>
              <input type="datetime-local" [(ngModel)]="formModel.horaFin" class="input-premium" />
            </div>

            <div class="form-group-premium checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" [(ngModel)]="formModel.concluida" />
                <span>Interrupción Concluida</span>
              </label>
            </div>
          </div>

          <!-- Descripción / Motivo -->
          <div class="qa-field-group" style="margin-top: 1rem;">
            <label class="qa-field-label">Motivo (Descripción detallada)</label>
            <textarea [(ngModel)]="formModel.descripcion" class="input-premium textarea-premium" placeholder="Detalla el motivo del paro de producción..."></textarea>
          </div>
        </div>

        <div class="qa-buttons-container">
          <button class="btn-confirmar-qa" (click)="guardar()" [disabled]="!isFormValid()">CONFIRMAR</button>
          <button class="btn-cancelar-qa" (click)="volverAListado()">CANCELAR</button>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .module-page { padding: 3rem; font-family: 'Inter', sans-serif; }
    h1           { font-size:1.75rem; font-weight:800; color:#1e293b; margin:0 0 .25rem; }
    .card-premium { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: visible; box-shadow: 0 1px 3px rgba(0,0,0,.04); padding: 1.5rem; margin-top: 1rem; }
    
    .toolbar-premium { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; }
    .toolbar-left { display: flex; gap: 0.75rem; align-items: center; }
    .toolbar-right { display: flex; gap: 0.75rem; align-items: center; }

    .btn-action-insert {
      background: #3faa5a; color: #fff; border: none; border-radius: 6px;
      font-size: 1.25rem; font-weight: bold; width: 42px; height: 38px;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: background 0.2s; position: relative;
    }
    .btn-action-insert:hover { background: #2f8c47; }
    .plus-icon { font-size: 0.85rem; position: absolute; right: 6px; top: 6px; }

    .btn { padding:.52rem 1.1rem; border-radius:7px; border:none; cursor:pointer; font-size:.82rem; font-weight:700; transition:all .18s; display:flex; align-items:center; gap:.35rem; }
    .btn-primary   { background:#3faa5a; color:#fff; }
    .btn-primary:hover:not(:disabled) { background:#2f8c47; }
    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-secondary { background:#fff; color:#475569; border:1px solid #e2e8f0; }
    .btn-secondary:hover { background:#f8fafc; border-color:#cbd5e1; }
    
    .search-box   { position:relative; }
    .search-icon  { position:absolute; left:.7rem; top:50%; transform:translateY(-50%); color:#94a3b8; }
    .search-input { padding:.48rem .75rem .48rem 2rem; border:1px solid #e2e8f0; border-radius:7px; font-size:.82rem; outline:none; width:220px; color:#334155; }
    .search-input:focus { border-color:#3faa5a; box-shadow:0 0 0 3px rgba(63,170,90,.12); }

    .dropdown-wrapper { position:relative; }
    .dd-popover  { position:absolute; left:0; top:110%; background:#fff; border:1px solid #e2e8f0; border-radius:10px; box-shadow:0 8px 20px rgba(0,0,0,.1); z-index:200; min-width:140px; overflow:hidden; }
    .dd-item     { padding:.6rem 1rem; font-size:.82rem; font-weight:600; color:#334155; cursor:pointer; }
    .dd-item:hover { background:#f1f5f9; }

    .col-sel-popover { position:absolute; left:0; top:110%; background:#fff; border:1px solid #e2e8f0; border-radius:10px; box-shadow:0 8px 24px rgba(0,0,0,.12); z-index:200; width:340px; padding:.75rem; }
    .col-group-label { display:flex; align-items:center; gap:.4rem; font-size:.82rem; font-weight:700; color:#334155; cursor:pointer; padding:.2rem 0; }
    .col-subitem-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.4rem; padding-left: 0.5rem; margin-top: 0.5rem; }
    .col-subitem-grid label { display:flex; align-items:center; gap:.4rem; font-size:.78rem; color:#475569; cursor:pointer; }
    .btn-actualizar { width:100%; margin-top:.75rem; padding:.45rem; background:#3faa5a; color:#fff; border:none; border-radius:6px; font-size:.8rem; font-weight:700; cursor:pointer; }

    .content-card { background:#fff; border-radius:12px; border:1px solid #e2e8f0; overflow-x:auto; box-shadow:0 1px 3px rgba(0,0,0,.04); }
    .data-table   { width:100%; border-collapse:collapse; min-width:1400px; }
    .data-table th { text-align:left; padding:.85rem 1rem; background:#f8fafc; color:#64748b; font-size:.72rem; font-weight:800; text-transform:uppercase; letter-spacing:.04em; border-bottom:1px solid #e2e8f0; }
    .data-table td { padding:.78rem 1rem; border-bottom:1px solid #f1f5f9; font-size:.83rem; color:#334155; }
    .data-table tr:hover td { background:#f8fafc; }
    
    .td-actions { display: flex; gap: 0.6rem; align-items: center; justify-content: center; }
    .action-btn-pencil, .action-btn-cross { cursor: pointer; font-size: 0.95rem; filter: grayscale(20%); transition: transform 0.15s; }
    .action-btn-pencil:hover, .action-btn-cross:hover { transform: scale(1.2); }

    .empty-state { text-align:center; padding:3rem; color:#94a3b8; font-style:italic; }

    .pagination-container { display:flex; justify-content:center; align-items:center; gap:.35rem; margin-top:1.4rem; }
    .pag-btn { height:2rem; min-width:2rem; padding:0 .45rem; border-radius:7px; border:1px solid #e2e8f0; background:#fff; color:#475569; font-weight:700; font-size:.82rem; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all .18s; }
    .pag-btn:hover:not(:disabled) { background:#f8fafc; border-color:#cbd5e1; }
    .pag-btn:disabled { opacity:.4; cursor:not-allowed; }
    .pag-btn.active { background:#3faa5a; border-color:#3faa5a; color:#fff; }

    /* FORM QA ESTILO IMAGEN 1 STYLES */
    .card-qa-form {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 1.75rem;
      max-width: 850px;
      margin-top: 1.25rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    }
    .panel-header-qa {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-size: 0.95rem;
      font-weight: 700;
      color: #334155;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid #e2e8f0;
      margin-bottom: 1.5rem;
    }
    .icon-square-green {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      background-color: #3faa5a;
      border-radius: 2px;
    }
    .qa-field-group {
      margin-bottom: 1.25rem;
    }
    .qa-field-label {
      font-size: 0.8rem;
      font-weight: 600;
      color: #64748b;
      margin-bottom: 0.35rem;
      display: block;
    }
    .qa-field-value-readonly {
      font-size: 0.95rem;
      color: #334155;
      font-weight: 500;
      padding: 0.4rem 0;
      border-bottom: 1px solid #e2e8f0;
      margin-bottom: 0.5rem;
    }
    .btn-confirmar-qa {
      background-color: #3faa5a;
      color: #ffffff;
      font-weight: 700;
      font-size: 0.82rem;
      padding: 0.6rem 1.8rem;
      border-radius: 5px;
      border: none;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      transition: background 0.15s;
    }
    .btn-confirmar-qa:hover:not(:disabled) {
      background-color: #2f8c47;
    }
    .btn-confirmar-qa:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .btn-cancelar-qa {
      background-color: #808080;
      color: #ffffff;
      font-weight: 700;
      font-size: 0.82rem;
      padding: 0.6rem 1.8rem;
      border-radius: 5px;
      border: none;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      transition: background 0.15s;
    }
    .btn-cancelar-qa:hover {
      background-color: #6c757d;
    }
    .qa-buttons-container {
      display: flex;
      gap: 0.75rem;
      margin-top: 1.75rem;
      align-items: center;
    }

    .pad-form { padding: 2rem; max-width: 800px; margin: 1rem auto; }
    .form-header { border-bottom: 1px solid #e2e8f0; padding-bottom: 0.75rem; margin-bottom: 1.5rem; }
    .subtitle-text { font-size: 1.15rem; font-weight: 800; color: #1e293b; }
    .form-body { display: flex; flex-direction: column; }
    .premium-form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
    .form-group-premium { display: flex; flex-direction: column; gap: 0.4rem; }
    .form-group-premium label { font-size: 0.8rem; font-weight: 700; color: #475569; }
    .input-premium { padding: 0.65rem 0.85rem; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.85rem; outline: none; background: #fff; font-family: inherit; }
    .input-premium:focus { border-color: #3faa5a; box-shadow: 0 0 0 3px rgba(63, 170, 90, 0.1); }
    
    .checkbox-group { justify-content: center; }
    .checkbox-label { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }
    .checkbox-label input { width: 16px; height: 16px; accent-color: #3faa5a; }
    .checkbox-label span { font-size: 0.85rem; font-weight: 600; color: #334155; }

    .textarea-premium { min-height: 100px; resize: vertical; }
    .full-width { grid-column: span 2; }
    .form-footer { display: flex; justify-content: flex-end; gap: 0.75rem; border-top: 1px solid #e2e8f0; padding-top: 1.25rem; margin-top: 1.5rem; }
  `]
})
export class ExtrusionInterrupcionesListComponent implements OnInit {
  private svc = inject(ProduccionService);

  viewState = signal<'list' | 'add' | 'edit'>('list');
  items = signal<any[]>([]);
  activeExtrusiones: Extrusion[] = [];
  causas: CausaInterrupcion[] = [];

  searchText = signal('');
  currentPage = signal(1);
  pageSize = signal(10);

  showColumnSelector = signal(false);
  showExportOptions = signal(false);

  // Columnas por defecto (emulando Screenshot 1 + Screenshot 2 combinadas)
  visibleColumns = signal<string[]>([
    'extrusionId', 'fecha', 'estado', 'extrusora', 'producto',
    'tipoMaterial', 'concluida', 'horaInicio', 'horaFin', 'motivo', 'tiempo', 'causaCodigo'
  ]);

  formModel = {
    id: '',
    extrusionInterrupcionIdNum: '',
    extrusionId: '',
    extrusionIdLegacy: '',
    causaId: '',
    causaCodigo: '',
    descripcion: '',
    horaInicio: '',
    horaFin: '',
    concluida: false
  };

  onCausaChange(e: any) {
    const selectedId = e.target.value;
    const found = this.causas.find(c => c.id === selectedId);
    if (found) {
      this.formModel.causaCodigo = `${found.codigo} - ${found.descripcion}`;
    } else {
      this.formModel.causaCodigo = '';
    }
  }

  onExtrusionChange(e: any) {
    const selectedId = e.target.value;
    const found = this.activeExtrusiones.find(ex => ex.id === selectedId);
    if (found) {
      this.formModel.extrusionIdLegacy = found.extrusionIdLegacy ? found.extrusionIdLegacy.toString() : this.getShortId(found.id);
    } else {
      this.formModel.extrusionIdLegacy = '';
    }
  }

  ngOnInit() {
    this.load();
    this.loadCatalogos();
  }

  load() {
    this.svc.getInterrupcionesExtrusion().subscribe({
      next: (data) => this.items.set(data),
      error: (err) => console.error(err)
    });
  }

  loadCatalogos() {
    // Cargar causas
    this.svc.getCausasInterrupcion().subscribe({
      next: (data) => this.causas = data,
      error: (err) => console.error(err)
    });

    // Cargar extrusiones para asociar
    this.svc.getExtrusiones().subscribe({
      next: (data) => {
        // Filtrar solo órdenes vigentes
        this.activeExtrusiones = data.filter(e => e.estado !== 'Programada');
      },
      error: (err) => console.error(err)
    });
  }

  // Filtrado y Búsqueda
  filteredItems = computed(() => {
    const s = this.searchText().trim().toLowerCase();
    return s ? this.items().filter(item => 
      (item.extrusora?.toLowerCase().includes(s)) ||
      (item.causaDescripcion?.toLowerCase().includes(s)) ||
      (item.descripcion?.toLowerCase().includes(s)) ||
      (item.operador?.toLowerCase().includes(s)) ||
      (item.producto?.toLowerCase().includes(s)) ||
      (item.extrusionIdLegacy?.toString().includes(s))
    ) : this.items();
  });

  paginatedItems = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredItems().slice(start, start + this.pageSize());
  });

  totalPages = computed(() => Math.ceil(this.filteredItems().length / this.pageSize()) || 1);
  visibleCount = computed(() => this.visibleColumns().length);

  allColsVisible = computed(() => [
    'extrusionId', 'fecha', 'estado', 'horaInicioExtrusion', 'horaFinExtrusion',
    'turno', 'operador', 'extrusora', 'producto', 'tipoMaterial',
    'interrupcionId', 'concluida', 'horaInicio', 'horaFin', 'motivo', 'tiempo', 'causaCodigo', 'causaTipo'
  ].every(c => this.visibleColumns().includes(c)));

  isColVisible(col: string) { return this.visibleColumns().includes(col); }
  toggleCol(col: string) {
    this.visibleColumns.update(cols =>
      cols.includes(col) ? cols.filter(c => c !== col) : [...cols, col]
    );
  }
  toggleAllCols() {
    if (this.allColsVisible()) this.visibleColumns.set([]);
    else this.visibleColumns.set([
      'extrusionId', 'fecha', 'estado', 'horaInicioExtrusion', 'horaFinExtrusion',
      'turno', 'operador', 'extrusora', 'producto', 'tipoMaterial',
      'interrupcionId', 'concluida', 'horaInicio', 'horaFin', 'motivo', 'tiempo', 'causaCodigo', 'causaTipo'
    ]);
  }

  // Paginación helpers
  prevPage() { if (this.currentPage() > 1) this.currentPage.update(p => p - 1); }
  nextPage() { if (this.currentPage() < this.totalPages()) this.currentPage.update(p => p + 1); }
  setPage(p: number | string) { if (typeof p === 'number') this.currentPage.set(p); }

  getPages(current: number, total: number): (number | string)[] {
    if (total <= 1) return [];
    const pages: (number | string)[] = [1];
    if (current > 3) pages.push('...');
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
    if (current < total - 2) pages.push('...');
    if (total > 1) pages.push(total);
    return pages;
  }

  // Toggles de menús
  toggleColumnDropdown(e: Event) { e.stopPropagation(); this.showColumnSelector.update(v => !v); this.showExportOptions.set(false); }
  toggleExportDropdown(e: Event) { e.stopPropagation(); this.showExportOptions.update(v => !v); this.showColumnSelector.set(false); }
  closeAllDropdowns()             { this.showColumnSelector.set(false); this.showExportOptions.set(false); }

  // Helpers de datos
  getShortId(id: string | undefined): string {
    if (!id) return '';
    return id.substring(0, 8).toUpperCase();
  }

  getDurationSeconds(item: any): number {
    const start = new Date(item.horaInicio).getTime();
    const end = item.horaFin ? new Date(item.horaFin).getTime() : Date.now();
    return Math.round((end - start) / 1000);
  }

  // Acciones
  irAAgregar() {
    this.formModel = {
      id: '',
      extrusionInterrupcionIdNum: 'NUEVO',
      extrusionId: '',
      extrusionIdLegacy: '',
      causaId: '',
      causaCodigo: '',
      descripcion: '',
      horaInicio: this.formatDateTimeLocal(new Date()),
      horaFin: '',
      concluida: false
    };
    this.viewState.set('add');
  }

  irAModificar(item: any) {
    this.formModel = {
      id: item.id,
      extrusionInterrupcionIdNum: item.extrusionInterrupcionId || this.getShortId(item.id),
      extrusionId: item.extrusionId,
      extrusionIdLegacy: item.extrusionIdLegacy ? item.extrusionIdLegacy.toString() : this.getShortId(item.extrusionId),
      causaId: item.causaId || '',
      causaCodigo: item.causaCodigo ? `${item.causaCodigo} - ${item.causaDescripcion}` : (item.causaId ? this.getShortId(item.causaId) : ''),
      descripcion: item.descripcion || '',
      horaInicio: this.formatDateTimeLocal(item.horaInicio),
      horaFin: this.formatDateTimeLocal(item.horaFin),
      concluida: item.concluida
    };
    this.viewState.set('edit');
  }

  eliminar(item: any) {
    const idLegacy = item.extrusionIdLegacy || this.getShortId(item.extrusionId);
    if (confirm(`¿Estás seguro de eliminar la interrupción ID ${this.getShortId(item.id)} asociada a la Extrusión ${idLegacy}?`)) {
      this.svc.deleteInterrupcionExtrusion(item.id).subscribe({
        next: () => {
          this.load();
        },
        error: (err) => console.error(err)
      });
    }
  }

  volverAListado() {
    this.viewState.set('list');
  }

  isFormValid(): boolean {
    return !!this.formModel.extrusionId && !!this.formModel.causaId && !!this.formModel.horaInicio;
  }

  guardar() {
    if (!this.isFormValid()) return;

    const payload = {
      extrusionId: this.formModel.extrusionId,
      causaId: this.formModel.causaId,
      descripcion: this.formModel.descripcion,
      horaInicio: new Date(this.formModel.horaInicio).toISOString(),
      horaFin: this.formModel.horaFin ? new Date(this.formModel.horaFin).toISOString() : null,
      concluida: this.formModel.concluida
    };

    if (this.viewState() === 'add') {
      this.svc.registrarInterrupcionManual(payload).subscribe({
        next: () => {
          this.load();
          this.volverAListado();
        },
        error: (err) => alert(err.error?.message || 'Error al guardar')
      });
    } else {
      this.svc.updateInterrupcionExtrusion(this.formModel.id, payload).subscribe({
        next: () => {
          this.load();
          this.volverAListado();
        },
        error: (err) => alert(err.error?.message || 'Error al actualizar')
      });
    }
  }

  // Exportar helpers
  exportCSV() {
    this.showExportOptions.set(false);
    let csv = '\uFEFF';
    const heads: string[] = [];
    if (this.isColVisible('extrusionId')) heads.push('Extrusión ID');
    if (this.isColVisible('fecha')) heads.push('Fecha');
    if (this.isColVisible('estado')) heads.push('Estado');
    if (this.isColVisible('horaInicioExtrusion')) heads.push('Hora Inicio Ext.');
    if (this.isColVisible('horaFinExtrusion')) heads.push('Hora Fin Ext.');
    if (this.isColVisible('turno')) heads.push('Turno');
    if (this.isColVisible('operador')) heads.push('Operador');
    if (this.isColVisible('extrusora')) heads.push('Extrusora');
    if (this.isColVisible('producto')) heads.push('Producto');
    if (this.isColVisible('tipoMaterial')) heads.push('Tipo Material');
    if (this.isColVisible('interrupcionId')) heads.push('Interrupción ID');
    if (this.isColVisible('concluida')) heads.push('Estatus');
    if (this.isColVisible('horaInicio')) heads.push('Hora Inicio Int.');
    if (this.isColVisible('horaFin')) heads.push('Hora Fin Int.');
    if (this.isColVisible('motivo')) heads.push('Motivo');
    if (this.isColVisible('tiempo')) heads.push('Tiempo (Seg)');
    if (this.isColVisible('causaCodigo')) heads.push('Down Time Code');
    if (this.isColVisible('causaTipo')) heads.push('Clasificación');

    csv += heads.join(';') + '\n';
    this.filteredItems().forEach(item => {
      const row: string[] = [];
      if (this.isColVisible('extrusionId')) row.push((item.extrusionIdLegacy || this.getShortId(item.extrusionId)).toString());
      if (this.isColVisible('fecha')) row.push(item.fecha ? new Date(item.fecha).toLocaleDateString() + ' 00:00' : '');
      if (this.isColVisible('estado')) row.push(item.estado || '');
      if (this.isColVisible('horaInicioExtrusion')) row.push(item.horaInicioExtrusion ? new Date(item.horaInicioExtrusion).toLocaleString() : '');
      if (this.isColVisible('horaFinExtrusion')) row.push(item.horaFinExtrusion ? new Date(item.horaFinExtrusion).toLocaleString() : '');
      if (this.isColVisible('turno')) row.push(item.turno || '');
      if (this.isColVisible('operador')) row.push(item.operador || '');
      if (this.isColVisible('extrusora')) row.push(item.extrusora || '');
      if (this.isColVisible('producto')) row.push(item.producto || '');
      if (this.isColVisible('tipoMaterial')) row.push(item.tipoMaterial || '');
      if (this.isColVisible('interrupcionId')) row.push(this.getShortId(item.id));
      if (this.isColVisible('concluida')) row.push(item.concluida ? 'Concluida' : 'Activa');
      if (this.isColVisible('horaInicio')) row.push(item.horaInicio ? new Date(item.horaInicio).toLocaleString() : '');
      if (this.isColVisible('horaFin')) row.push(item.horaFin ? new Date(item.horaFin).toLocaleString() : '');
      if (this.isColVisible('motivo')) row.push(item.descripcion || '');
      if (this.isColVisible('tiempo')) row.push(this.getDurationSeconds(item).toString());
      if (this.isColVisible('causaCodigo')) row.push(`${item.causaCodigo} - ${item.causaDescripcion}`);
      if (this.isColVisible('causaTipo')) row.push(item.causaTipo || '');
      csv += row.join(';') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `interrupciones_extrusion_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }

  exportPDF() {
    this.showExportOptions.set(false);
    alert('Función de exportar a PDF en desarrollo. Descargue en CSV (Excel) para ver todos los datos.');
  }

  // Date formatting utility
  private formatDateTimeLocal(d: Date | string | undefined): string {
    if (!d) return '';
    const date = new Date(d);
    const tzoffset = date.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(date.getTime() - tzoffset)).toISOString().slice(0, 16);
    return localISOTime;
  }
}
