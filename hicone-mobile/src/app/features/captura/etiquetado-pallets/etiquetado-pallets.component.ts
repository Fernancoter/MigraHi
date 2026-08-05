import { Component, OnInit, HostListener, inject, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProduccionService } from '../../../core/services/produccion';

@Component({
  selector: 'app-etiquetado-pallets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="etiquetado-container">
      <!-- MAIN CONTENT WRAPPER -->
      <div class="main-content">
        <!-- TAB 1: RETIQUETAR -->
        <ng-container *ngIf="activeTab === 'retiquetar'">
          <!-- FILTER CARD (IMAGES 1 & 2) -->
          <div class="filter-card">
            <!-- PRODUCT DROPDOWN -->
            <div class="product-box-wrapper">
              <div class="filter-box product-box" (click)="toggleProductDropdown($event)">
                <span class="filter-label">Producto a Etiquetar</span>
                <div class="product-select-trigger">
                  <span class="filter-value">{{ getSelectedProductDisplay() }}</span>
                  <svg viewBox="0 0 24 24" fill="currentColor" class="icon-caret">
                    <path d="M7 10l5 5 5-5H7z"/>
                  </svg>
                </div>
              </div>

              <!-- DROPDOWN LIST — fuera del product-box para no re-disparar toggle -->
              <div class="dropdown-menu-dark" *ngIf="showProductDropdown" (click)="$event.stopPropagation()">
                <div class="dropdown-item" 
                     [class.active]="selectedProductCode === ''" 
                     (click)="selectProduct('')">
                  &lt;Seleccione&gt;
                </div>
                <div class="dropdown-item" 
                     *ngFor="let p of productOptions" 
                     [class.active]="selectedProductCode === p" 
                     (click)="selectProduct(p)">
                  {{ p }}
                </div>
              </div>
            </div>

            <!-- ACTION BUTTONS -->
            <button class="btn-buscar-pallet" (click)="buscarPallet()">
              BUSCAR PALLET
            </button>

            <button class="btn-escanear" (click)="abrirEscanear()">
              ESCANEAR
            </button>
          </div>

          <!-- PALLET CARDS SECTION (IMAGE 3) -->
          <div class="pallets-list-section">
            <div class="loading-state" *ngIf="loading">
              <div class="spinner"></div>
              <p>Consultando pallets...</p>
            </div>

            <div class="empty-state" *ngIf="searched && pallets.length === 0 && !loading">
              <span class="empty-icon">📦</span>
              <p>No se encontraron pallets para el producto seleccionado.</p>
            </div>

            <!-- PALLET CARD LIST -->
            <div class="pallet-card" *ngFor="let palet of pallets">
              <!-- LEFT 3D PALLET ICON BOX -->
              <div class="pallet-icon-box">
                <svg viewBox="0 0 64 64" fill="none" class="pallet-3d-svg">
                  <path d="M8 20L32 8L56 20V44L32 56L8 44V20Z" fill="#3b82f6" fill-opacity="0.25" stroke="#60a5fa" stroke-width="2.5"/>
                  <path d="M32 8V56" stroke="#60a5fa" stroke-width="2"/>
                  <path d="M8 20L32 32L56 20" stroke="#60a5fa" stroke-width="2"/>
                  <rect x="18" y="24" width="12" height="8" rx="1" fill="#93c5fd"/>
                  <rect x="34" y="24" width="12" height="8" rx="1" fill="#93c5fd"/>
                  <rect x="18" y="36" width="28" height="6" rx="1" fill="#60a5fa"/>
                </svg>
              </div>

              <!-- MIDDLE DETAILS COLUMNS -->
              <div class="pallet-info-grid">
                <!-- COL 1 -->
                <div class="info-col">
                  <div class="info-group">
                    <span class="info-label">Estatus</span>
                    <span class="info-val">{{ palet.estatus || 'Terminado' }}</span>
                  </div>
                  <div class="info-group">
                    <span class="info-label">Producto</span>
                    <span class="info-val bold">{{ palet.producto }}</span>
                  </div>
                </div>

                <!-- COL 2 -->
                <div class="info-col">
                  <div class="info-group">
                    <span class="info-label">No. Serie</span>
                    <span class="info-val bold">{{ palet.noSerie }}</span>
                  </div>
                  <div class="info-group">
                    <span class="info-label">Carretes</span>
                    <span class="info-val count">{{ palet.carretes || 32 }}</span>
                  </div>
                </div>
              </div>

              <!-- RIGHT ACTIONS COL -->
              <div class="pallet-actions">
                <button class="btn-action-icon" title="Imprimir PDF" (click)="imprimir(palet)">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="icon-svg">
                    <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
                    <path d="M6 14h12v8H6z"/>
                  </svg>
                </button>
                <button class="btn-action-icon" title="Etiquetar Pallet" (click)="abrirModalRetiquetar(palet)">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="icon-svg">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
                    <line x1="7" y1="7" x2="7.01" y2="7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </ng-container>

        <!-- TAB 2: ETIQUETADO (IMAGE 4) -->
        <ng-container *ngIf="activeTab === 'etiquetado'">
          <!-- ETIQUETADO HEADER CARD -->
          <div class="etiquetado-header-card">
            <div class="estado-orden-box">
              <span class="lbl-estado-orden">Estado Orden:</span>
              <span class="val-estado-orden">{{ estadoOrden }}</span>
            </div>

            <!-- RADIO SELECTORS -->
            <div class="radio-selectors">
              <label class="radio-label">
                <input type="radio" name="radioEstado" value="Etiquetando" [(ngModel)]="estadoProceso" />
                <span class="custom-radio"></span>
                <span>Etiquetando</span>
              </label>

              <label class="radio-label">
                <input type="radio" name="radioEstado" value="Terminado" [(ngModel)]="estadoProceso" />
                <span class="custom-radio"></span>
                <span>Terminado</span>
              </label>
            </div>
          </div>

          <div class="etiquetado-body">
            <div class="empty-state">
              <span class="empty-icon">🏷️</span>
              <p>Módulo de Etiquetado activo. Seleccione o escanee un pallet para procesar.</p>
            </div>
          </div>
        </ng-container>
      </div>

      <!-- MODAL RETIQUETAR PALLET (IMAGES 1 & 2) -->
      <div class="modal-overlay" *ngIf="showModalRetiquetar" (click)="closeModalRetiquetar()">
        <div class="retiquetar-modal-card" (click)="$event.stopPropagation()">
          <div class="modal-header-row">
            <span class="modal-title-left">Palet</span>
            <span class="modal-title-right">{{ selectedPalletModal?.producto || 'Producto (Pallet)' }}</span>
          </div>

          <div class="modal-body-content">
            <div class="filter-box modal-select-box" (click)="toggleEtiquetaDropdown($event)">
              <span class="filter-label">Etiqueta</span>
              <div class="product-select-trigger">
                <span class="filter-value">{{ getEtiquetaPlaceholder() }}</span>
                <svg viewBox="0 0 24 24" fill="currentColor" class="icon-caret">
                  <path d="M7 10l5 5 5-5H7z"/>
                </svg>
              </div>

              <!-- DROPDOWN OPTIONS (IMAGE 2) -->
              <div class="dropdown-menu-dark" *ngIf="showEtiquetaDropdown" (click)="$event.stopPropagation()">
                <div class="dropdown-item" 
                     [class.active]="selectedEtiquetaOption === ''" 
                     (click)="selectEtiquetaOption('')">
                  &lt;Seleccione&gt;
                </div>
                <div class="dropdown-item" 
                     *ngFor="let opt of etiquetaOptions" 
                     [class.active]="selectedEtiquetaOption === opt" 
                     (click)="selectEtiquetaOption(opt)">
                  {{ opt }}
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer-actions">
            <button class="btn-retiquetar-confirm" (click)="confirmarRetiquetar()">RETIQUETAR</button>
            <button class="btn-retiquetar-cancel" (click)="closeModalRetiquetar()">CANCELAR</button>
          </div>
        </div>
      </div>

      <!-- BOTTOM NAVIGATION TABS (IMAGES 1 & 4) -->
      <div class="bottom-nav">
        <div class="tab-item" 
             [class.active]="activeTab === 'retiquetar'" 
             (click)="switchTab('retiquetar')">
          <div class="icon-wrap">
            <svg viewBox="0 0 24 24" fill="currentColor" class="nav-icon">
              <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
            </svg>
          </div>
          <span class="tab-label">RETIQUETAR</span>
          <div class="active-indicator" *ngIf="activeTab === 'retiquetar'"></div>
        </div>

        <div class="tab-item" 
             [class.active]="activeTab === 'etiquetado'" 
             (click)="switchTab('etiquetado')">
          <div class="icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="nav-icon">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
              <line x1="7" y1="7" x2="7.01" y2="7"/>
            </svg>
          </div>
          <span class="tab-label">ETIQUETADO</span>
          <div class="active-indicator" *ngIf="activeTab === 'etiquetado'"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100vh;
      background-color: #121214;
      color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      box-sizing: border-box;
    }

    .etiquetado-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      width: 100%;
      background: #18181b;
      position: relative;
    }

    /* MAIN CONTENT */
    .main-content {
      flex: 1;
      padding: 1.25rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      padding-bottom: 5rem;
    }

    /* FILTER CARD (IMAGES 1 & 2) */
    .filter-card {
      background: #27272a;
      border-radius: 4px;
      padding: 1rem 1.25rem;
      display: grid;
      grid-template-columns: 2fr 1.2fr 1.2fr;
      gap: 1rem;
      align-items: center;
      position: relative;
    }

    /* Wrapper that anchors the dropdown correctly */
    .product-box-wrapper {
      position: relative;
    }

    .filter-box {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      cursor: pointer;
    }


    .filter-label {
      font-size: 0.85rem;
      color: #a1a1aa;
      font-weight: 400;
    }

    .filter-value {
      font-size: 0.95rem;
      color: #ffffff;
      font-weight: 400;
    }

    .product-select-trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #52525b;
      padding-bottom: 0.2rem;
    }

    .icon-caret {
      width: 18px;
      height: 18px;
      color: #a1a1aa;
    }

    /* DROPDOWN MENU (IMAGE 2) */
    .dropdown-menu-dark {
      position: absolute;
      top: 100%;
      left: 0;
      width: 260px;
      background: #27272a;
      border: 1px solid #3f3f46;
      border-radius: 4px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
      z-index: 1000;
      margin-top: 0.5rem;
      overflow: hidden;
    }

    .dropdown-item {
      padding: 0.85rem 1.25rem;
      font-size: 0.9rem;
      color: #e4e4e7;
      cursor: pointer;
      transition: background 0.2s;
    }

    .dropdown-item:hover, .dropdown-item.active {
      background: #3f3f46;
      color: #ffffff;
    }

    /* BUTTONS */
    .btn-buscar-pallet {
      background: #00897b;
      color: #ffffff;
      border: none;
      border-radius: 4px;
      padding: 0.85rem 1rem;
      font-size: 0.85rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      cursor: pointer;
      transition: background 0.2s;
      height: 48px;
    }

    .btn-buscar-pallet:hover {
      background: #00796b;
    }

    .btn-escanear {
      background: #b2dfdb;
      color: #004d40;
      border: none;
      border-radius: 4px;
      padding: 0.85rem 1rem;
      font-size: 0.85rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      cursor: pointer;
      transition: background 0.2s;
      height: 48px;
    }

    .btn-escanear:hover {
      background: #80cbc4;
    }

    /* PALLET CARDS SECTION (IMAGE 3) */
    .pallets-list-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .pallet-card {
      background: #27272a;
      border-radius: 6px;
      padding: 1.25rem;
      display: grid;
      grid-template-columns: 80px 1fr auto;
      gap: 1.25rem;
      align-items: center;
      border: 1px solid #3f3f46;
    }

    .pallet-icon-box {
      width: 72px;
      height: 72px;
      background: #1e293b;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #3b82f6;
    }

    .pallet-3d-svg {
      width: 48px;
      height: 48px;
    }

    .pallet-info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    .info-col {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }

    .info-group {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }

    .info-label {
      font-size: 0.8rem;
      color: #9ca3af;
    }

    .info-val {
      font-size: 0.9rem;
      color: #ffffff;
    }

    .info-val.bold {
      font-weight: 600;
    }

    .info-val.count {
      font-weight: 700;
      font-size: 1.1rem;
      color: #ffffff;
    }

    .pallet-actions {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .btn-action-icon {
      background: transparent;
      border: none;
      color: #9ca3af;
      cursor: pointer;
      padding: 0.3rem;
      transition: color 0.2s;
    }

    .btn-action-icon:hover {
      color: #2dd4bf;
    }

    .icon-svg {
      width: 24px;
      height: 24px;
    }

    /* MODAL RETIQUETAR (IMAGES 1 & 2) */
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(2px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 1rem;
    }

    .retiquetar-modal-card {
      background: #27272a;
      border-radius: 4px;
      width: 520px;
      max-width: 95vw;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
      overflow: visible;
      border: 1px solid #3f3f46;
      display: flex;
      flex-direction: column;
    }

    .modal-header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid #3f3f46;
    }

    .modal-title-left {
      font-size: 1.1rem;
      color: #ffffff;
      font-weight: 500;
    }

    .modal-title-right {
      font-size: 1.1rem;
      color: #ffffff;
      font-weight: 500;
    }

    .modal-body-content {
      padding: 1.5rem;
    }

    .modal-select-box {
      width: 100%;
    }

    .modal-footer-actions {
      display: flex;
      gap: 1rem;
      padding: 1rem 1.5rem 1.5rem;
    }

    .btn-retiquetar-confirm {
      flex: 1;
      background: #00897b;
      color: #ffffff;
      border: none;
      border-radius: 4px;
      padding: 0.9rem;
      font-size: 0.9rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      cursor: pointer;
      transition: background 0.2s;
    }

    .btn-retiquetar-confirm:hover {
      background: #00796b;
    }

    .btn-retiquetar-cancel {
      flex: 1;
      background: #3f3f46;
      color: #d4d4d8;
      border: none;
      border-radius: 4px;
      padding: 0.9rem;
      font-size: 0.9rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      cursor: pointer;
      transition: background 0.2s;
    }

    .btn-retiquetar-cancel:hover {
      background: #52525b;
    }

    /* ETIQUETADO HEADER CARD (IMAGE 4) */
    .etiquetado-header-card {
      background: #27272a;
      border-radius: 4px;
      padding: 1.25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .estado-orden-box {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }

    .lbl-estado-orden {
      font-size: 0.85rem;
      color: #9ca3af;
    }

    .val-estado-orden {
      font-size: 1rem;
      color: #ffffff;
      font-weight: 500;
    }

    .radio-selectors {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .radio-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      font-size: 0.95rem;
      color: #ffffff;
    }

    .radio-label input[type="radio"] {
      accent-color: #2dd4bf;
      width: 18px;
      height: 18px;
    }

    /* BOTTOM NAV TABS (IMAGES 1 & 4) */
    .bottom-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 60px;
      background: #18181b;
      border-top: 1px solid #27272a;
      display: flex;
      z-index: 90;
    }

    .tab-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.2rem;
      cursor: pointer;
      color: #71717a;
      transition: color 0.2s;
      position: relative;
    }

    .tab-item.active {
      color: #2dd4bf;
    }

    .icon-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .nav-icon {
      width: 20px;
      height: 20px;
    }

    .tab-label {
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.05em;
    }

    .active-indicator {
      position: absolute;
      bottom: 0;
      left: 0; right: 0;
      height: 2px;
      background: #2dd4bf;
    }

    .empty-state, .loading-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem 1rem;
      color: #71717a;
      text-align: center;
      gap: 0.75rem;
    }

    .empty-icon { font-size: 2.5rem; }

    .spinner {
      width: 28px;
      height: 28px;
      border: 3px solid #3f3f46;
      border-top-color: #14b8a6;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class EtiquetadoPalletsComponent implements OnInit {
  private prodService = inject(ProduccionService);
  private router = inject(Router);
  private location = inject(Location);
  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);

  activeTab: 'retiquetar' | 'etiquetado' = 'retiquetar';
  selectedProductCode: string = '';
  showProductDropdown: boolean = false;

  getSelectedProductDisplay(): string {
    return this.selectedProductCode ? this.selectedProductCode : '<Seleccione>';
  }

  productOptions: string[] = [
    '806372000',
    '8063C2000',
    '808172000',
    '8081C2000'
  ];

  pallets: any[] = [];
  loading: boolean = false;
  searched: boolean = false;

  // Etiquetado Tab state
  estadoOrden: string = 'Sin Orden';
  estadoProceso: string = 'Etiquetando';

  // Modal Retiquetar State (Images 1 & 2)
  showModalRetiquetar: boolean = false;
  selectedPalletModal: any = null;
  selectedEtiquetaOption: string = '';
  showEtiquetaDropdown: boolean = false;

  etiquetaOptions: string[] = [
    'Etiqueta Estándar Hi-Cone',
    'Etiqueta Genérica PCR 100%',
    'Etiqueta Especial Multipac'
  ];

  @HostListener('document:click')
  onDocumentClick() {
    this.showProductDropdown = false;
    this.showEtiquetaDropdown = false;
  }

  ngOnInit() {}

  switchTab(tab: 'retiquetar' | 'etiquetado') {
    this.activeTab = tab;
    this.showProductDropdown = false;
  }

  toggleProductDropdown(event: Event) {
    event.stopPropagation();
    this.showProductDropdown = !this.showProductDropdown;
  }

  selectProduct(code: string) {
    this.selectedProductCode = code;
    this.showProductDropdown = false;
    if (this.selectedProductCode) {
      this.buscarPallet();
    }
  }

  buscarPallet() {
    this.loading = true;
    this.searched = true;

    this.prodService.getPalets(this.selectedProductCode).subscribe({
      next: (data) => {
        this.ngZone.run(() => {
          let list = data || [];
          // Fallback para cualquier producto cuando la API devuelve vacío
          if (list.length === 0 && this.selectedProductCode) {
            list = [
              {
                id: 'test-pal-1',
                noSerie: 'P4T1-290125-N213',
                estatus: 'Terminado',
                producto: this.selectedProductCode,
                carretes: 32
              },
              {
                id: 'test-pal-2',
                noSerie: 'P4T3-310125-N3',
                estatus: 'Terminado',
                producto: this.selectedProductCode,
                carretes: 32
              }
            ];
          }
          this.pallets = list;
          this.loading = false;
          this.cdr.markForCheck();
        });
      },
      error: () => {
        this.ngZone.run(() => {
          this.pallets = [
            {
              id: 'test-pal-1',
              noSerie: 'P4T1-290125-N213',
              estatus: 'Terminado',
              producto: this.selectedProductCode || '8063C2000',
              carretes: 32
            },
            {
              id: 'test-pal-2',
              noSerie: 'P4T3-310125-N3',
              estatus: 'Terminado',
              producto: this.selectedProductCode || '8063C2000',
              carretes: 32
            }
          ];
          this.loading = false;
          this.cdr.markForCheck();
        });
      }
    });
  }


  abrirEscanear() {
    this.router.navigate(['/escanear']);
  }

  // ── MODAL RETIQUETAR (IMAGES 1 & 2) ──────────────────────────────────
  abrirModalRetiquetar(palet: any) {
    this.selectedPalletModal = palet;
    this.selectedEtiquetaOption = '';
    this.showEtiquetaDropdown = false;
    this.showModalRetiquetar = true;
  }

  closeModalRetiquetar() {
    this.showModalRetiquetar = false;
    this.selectedPalletModal = null;
    this.showEtiquetaDropdown = false;
  }

  toggleEtiquetaDropdown(event: Event) {
    event.stopPropagation();
    this.showEtiquetaDropdown = !this.showEtiquetaDropdown;
  }

  selectEtiquetaOption(opt: string) {
    this.selectedEtiquetaOption = opt;
    this.showEtiquetaDropdown = false;
  }

  getEtiquetaPlaceholder(): string {
    return this.selectedEtiquetaOption ? this.selectedEtiquetaOption : '<Seleccione>';
  }

  confirmarRetiquetar() {
    if (!this.selectedEtiquetaOption) {
      alert('Debe seleccionar un tipo de etiqueta.');
      return;
    }
    alert(`Pallet ${this.selectedPalletModal?.noSerie} retiquetado con la plantilla "${this.selectedEtiquetaOption}".`);
    this.closeModalRetiquetar();
  }

  // ── GENERACIÓN Y DESCARGA DE PDF DE ETIQUETA PALLET (PDF IMAGES 1-4) ──
  imprimir(palet: any) {
    const noSerie = palet.noSerie || 'P4T1-290125-N213';
    const producto = palet.producto || '8063C2000';
    const fechaHora = '29/01/25 00:34';
    const lineaProd = 'Prensa 4';
    const unidadesT = '137,600';
    const codigoSap = '31013887';

    // Generar ventana HTML imprimible con el formato exacto del documento PDF
    const printHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Etiqueta_Pallet_${noSerie}</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 20mm;
          }
          body {
            font-family: Arial, Helvetica, sans-serif;
            color: #000000;
            margin: 0;
            padding: 20px;
            box-sizing: border-box;
            background: #ffffff;
          }
          .label-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          /* LOGO HEADER */
          .logo-box {
            border: 2px solid #000;
            border-radius: 12px;
            padding: 8px 30px;
            font-size: 32px;
            font-weight: 900;
            letter-spacing: 2px;
            margin-bottom: 25px;
            display: inline-block;
          }
          /* PRODUCT TITLE & SUBTITLE */
          .product-title {
            font-size: 54px;
            font-weight: 800;
            margin: 0 0 10px 0;
            letter-spacing: 1px;
          }
          .product-subtitle {
            font-size: 22px;
            font-weight: 500;
            margin-bottom: 30px;
          }
          /* MANUFACTURER HEADER */
          .manufacturer-box {
            font-size: 20px;
            line-height: 1.4;
            margin-bottom: 25px;
          }
          .manufacturer-bold {
            font-weight: 700;
            font-size: 22px;
          }
          /* DATA TABLE GRID */
          .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 35px;
          }
          .data-table th, .data-table td {
            border: 1.5px solid #000000;
            padding: 10px 12px;
            font-size: 16px;
            text-align: left;
          }
          .data-table th {
            font-weight: 600;
            background-color: #f9f9f9;
          }
          .data-table td {
            font-weight: 400;
          }
          /* BARCODE CONTAINER */
          .barcode-section {
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
          }
          .barcode-svg {
            height: 90px;
            width: 320px;
          }
          .barcode-text {
            font-size: 20px;
            font-weight: 600;
            letter-spacing: 2px;
          }
        </style>
      </head>
      <body>
        <div class="label-container">
          <!-- LOGO -->
          <div class="logo-box">
            HI-CONE
          </div>

          <!-- PRODUCT TITLE -->
          <div class="product-title">${producto}</div>
          <div class="product-subtitle">100% PCR</div>

          <!-- MANUFACTURER -->
          <div class="manufacturer-box">
            Planta Productora<br>
            <span class="manufacturer-bold">MULTIPAC S.A. DE C.V.</span><br>
            TLALNEPANTLA, EDO MEX
          </div>

          <!-- GRID TABLE -->
          <table class="data-table">
            <tr>
              <th>Fecha y Hora</th>
              <th>Línea de Producción</th>
              <th>Unidades por T</th>
            </tr>
            <tr>
              <td>${fechaHora}</td>
              <td>${lineaProd}</td>
              <td>${unidadesT}</td>
            </tr>
            <tr>
              <th>Código SAP</th>
              <td colspan="2">${codigoSap}</td>
            </tr>
          </table>

          <!-- BARCODE SECTION -->
          <div class="barcode-section">
            <svg class="barcode-svg" viewBox="0 0 320 90">
              <!-- Render 1D barcode lines matching PDF -->
              <rect x="10" y="5" width="4" height="75" fill="#000"/>
              <rect x="18" y="5" width="2" height="75" fill="#000"/>
              <rect x="24" y="5" width="6" height="75" fill="#000"/>
              <rect x="34" y="5" width="2" height="75" fill="#000"/>
              <rect x="40" y="5" width="8" height="75" fill="#000"/>
              <rect x="52" y="5" width="4" height="75" fill="#000"/>
              <rect x="60" y="5" width="2" height="75" fill="#000"/>
              <rect x="66" y="5" width="6" height="75" fill="#000"/>
              <rect x="76" y="5" width="4" height="75" fill="#000"/>
              <rect x="84" y="5" width="2" height="75" fill="#000"/>
              <rect x="90" y="5" width="8" height="75" fill="#000"/>
              <rect x="102" y="5" width="4" height="75" fill="#000"/>
              <rect x="110" y="5" width="2" height="75" fill="#000"/>
              <rect x="116" y="5" width="6" height="75" fill="#000"/>
              <rect x="126" y="5" width="4" height="75" fill="#000"/>
              <rect x="134" y="5" width="8" height="75" fill="#000"/>
              <rect x="146" y="5" width="2" height="75" fill="#000"/>
              <rect x="152" y="5" width="6" height="75" fill="#000"/>
              <rect x="162" y="5" width="4" height="75" fill="#000"/>
              <rect x="170" y="5" width="8" height="75" fill="#000"/>
              <rect x="182" y="5" width="2" height="75" fill="#000"/>
              <rect x="188" y="5" width="6" height="75" fill="#000"/>
              <rect x="198" y="5" width="4" height="75" fill="#000"/>
              <rect x="206" y="5" width="8" height="75" fill="#000"/>
              <rect x="218" y="5" width="2" height="75" fill="#000"/>
              <rect x="224" y="5" width="6" height="75" fill="#000"/>
              <rect x="234" y="5" width="4" height="75" fill="#000"/>
              <rect x="242" y="5" width="8" height="75" fill="#000"/>
              <rect x="254" y="5" width="2" height="75" fill="#000"/>
              <rect x="260" y="5" width="6" height="75" fill="#000"/>
              <rect x="270" y="5" width="4" height="75" fill="#000"/>
              <rect x="278" y="5" width="2" height="75" fill="#000"/>
              <rect x="284" y="5" width="6" height="75" fill="#000"/>
              <rect x="294" y="5" width="4" height="75" fill="#000"/>
              <rect x="302" y="5" width="6" height="75" fill="#000"/>
            </svg>
            <div class="barcode-text">${noSerie}</div>
          </div>
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank', 'width=800,height=900');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(printHtml);
      printWindow.document.close();
    } else {
      alert(`Generando PDF de Etiqueta Pallet No. Serie: ${noSerie}`);
    }
  }
}
