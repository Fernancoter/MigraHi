import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

export interface ConfiguracionSistema {
  id?: string;
  key: string;
  valor: string;
}

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up" style="padding: 1.5rem 2.5rem; background: #fff; min-height: calc(100vh - 64px); position: relative;">
      <header style="margin-bottom: 2rem;">
        <h1 style="font-size: 1.6rem; font-weight: normal; color: #1e293b; margin: 0 0 0.2rem 0;">Configuración</h1>
        <nav style="font-size: 0.75rem; color: #94a3b8;">Producción › Referencias › Configuración</nav>
      </header>

      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; margin-bottom: 1rem;">
        <div style="display: flex; gap: 2rem; align-items: center;">
          <div style="padding: 0.5rem 1rem; color: #5cb85c; border-bottom: 2px solid #5cb85c; font-weight: bold;">
            Configuración
          </div>
          <div style="position: relative; width: 250px;">
            <input type="text" [ngModel]="searchText()" (ngModelChange)="onSearchChange($event)"
                   placeholder="Key" 
                   class="search-input" />
          </div>
        </div>
        <button (click)="openModal()" style="background: #5cb85c; color: white; border: none; padding: 0.5rem 1.5rem; border-radius: 4px; cursor: pointer; font-size: 0.85rem; margin-bottom: 0.5rem;">Agregar</button>
      </div>

      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="text-align: left; padding: 1rem; color: #334155; font-size: 0.85rem; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Key</th>
            <th style="text-align: left; padding: 1rem; color: #334155; font-size: 0.85rem; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Valor</th>
            <th style="text-align: right; padding: 1rem; border-bottom: 1px solid #e2e8f0; width: 200px;"></th>
          </tr>
        </thead>
        <tbody>
          @if (isLoading()) {
            <tr><td colspan="3" style="text-align:center; padding:2rem; color:#94a3b8;">Cargando...</td></tr>
          } @else if (paginatedItems().length === 0) {
            <tr><td colspan="3" style="text-align:center; padding:2rem; color:#94a3b8; font-style:italic;">No se encontraron resultados.</td></tr>
          } @else {
            @for (item of paginatedItems(); track item.id || item.key) {
              <tr>
                <td style="padding: 1rem; border-bottom: 1px solid #f1f5f9; color: #5cb85c; font-size: 0.85rem;">{{ item.key }}</td>
                <td style="padding: 1rem; border-bottom: 1px solid #f1f5f9; color: #334155; font-size: 0.85rem;">{{ item.valor }}</td>
                <td style="padding: 1rem; border-bottom: 1px solid #f1f5f9; text-align: right;">
                  <button (click)="openModal(item)" style="background: none; border: none; color: #5cb85c; cursor: pointer; font-size: 0.85rem; margin-right: 1rem;">Modificar</button>
                  <button (click)="eliminar(item)" style="background: none; border: none; color: #5cb85c; cursor: pointer; font-size: 0.85rem;">Eliminar</button>
                </td>
              </tr>
            }
          }
        </tbody>
      </table>

      <!-- Paginación -->
      @if (totalPages() > 1) {
        <div class="pagination-container">
          <button class="pag-btn" [disabled]="currentPage() === 1" (click)="prevPage()">‹</button>
          @for (p of getPages(currentPage(), totalPages()); track $index) {
            @if (p === '...') { <span class="pag-dots">...</span> }
            @else { <button class="pag-btn" [class.active]="currentPage() === p" (click)="setPage($any(p))">{{ p }}</button> }
          }
          <button class="pag-btn" [disabled]="currentPage() === totalPages()" (click)="nextPage()">›</button>
        </div>
      }
      
      <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #e2e8f0; font-size: 0.75rem; color: #64748b; display: flex; align-items: center; gap: 2rem;">
        <span>Consultas a partir de la siguiente fecha:</span>
        <span style="display: flex; align-items: center; gap: 0.5rem; border: 1px solid #e2e8f0; padding: 0.2rem 0.5rem; border-radius: 4px;">03/03/20 <span style="color: #94a3b8; font-size: 0.8rem;">📅</span></span>
        <span>Copyright 2023</span>
      </div>

      <!-- Modal Agregar/Modificar -->
      <div *ngIf="isModalOpen" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;">
        <div class="animate-move-up" style="background: white; padding: 2rem; border-radius: 8px; width: 400px; max-width: 90%; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
          <h2 style="margin: 0 0 1.5rem 0; font-size: 1.25rem; color: #1e293b; font-weight: 500;">
            {{ isEditing ? 'Modificar Configuración' : 'Agregar Configuración' }}
          </h2>
          
          <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem;">
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <label style="font-size: 0.85rem; color: #475569; font-weight: 500;">Key</label>
              <input type="text" [(ngModel)]="form.key" style="padding: 0.5rem; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 0.9rem; outline: none; width: 100%; box-sizing: border-box;" placeholder="Ej. BaseUrl">
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <label style="font-size: 0.85rem; color: #475569; font-weight: 500;">Valor</label>
              <input type="text" [(ngModel)]="form.valor" style="padding: 0.5rem; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 0.9rem; outline: none; width: 100%; box-sizing: border-box;" placeholder="Ej. https://...">
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 1rem;">
            <button (click)="closeModal()" style="background: white; color: #64748b; border: 1px solid #cbd5e1; padding: 0.5rem 1.5rem; border-radius: 4px; cursor: pointer; font-size: 0.85rem;">Cancelar</button>
            <button (click)="saveModal()" style="background: #5cb85c; color: white; border: none; padding: 0.5rem 1.5rem; border-radius: 4px; cursor: pointer; font-size: 0.85rem;" [disabled]="isSaving">
              {{ isSaving ? 'Guardando...' : 'Guardar' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-move-up { animation: moveUp .3s ease-out; }
    @keyframes moveUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
    
    .search-input { border:none; background:transparent; font-size:.9rem; outline:none; padding: 0.5rem; width: 100%; border-bottom: 2px solid transparent; transition: border-color 0.2s; color: #334155; }
    .search-input:focus { border-bottom-color: #5cb85c; }
    .search-input::placeholder { color: #94a3b8; }

    .pagination-container { display:flex; justify-content:center; align-items:center; gap:.4rem; margin-top:1.5rem; }
    .pag-btn { height:2.1rem; min-width:2.1rem; padding:0 .5rem; border-radius:4px; border:1px solid #cbd5e1; background:white; color:#475569; font-weight:600; font-size:.85rem; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all .2s; }
    .pag-btn:hover:not(:disabled) { background:#f8fafc; color:#0f172a; }
    .pag-btn:disabled { opacity:.4; cursor:not-allowed; }
    .pag-btn.active { background:#5cb85c; border-color:#5cb85c; color:white; }
    .pag-dots { font-size:.85rem; color:#94a3b8; font-weight:700; padding:0 .2rem; }
  `]
})
export class ConfiguracionComponent implements OnInit {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5007/api/v1/produccion/referencias/configuracion';

  searchText = signal<string>('');
  currentPage = signal<number>(1);
  pageSize = signal<number>(8);
  isLoading = signal<boolean>(false);
  isSaving = false;

  items = signal<ConfiguracionSistema[]>([]);

  filteredItems = computed(() => {
    let list = this.items();
    const s = this.searchText().trim().toLowerCase();
    if (s) {
      list = list.filter(e => e.key.toLowerCase().includes(s));
    }
    return list;
  });

  paginatedItems = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredItems().slice(start, start + this.pageSize());
  });

  totalPages = computed(() => Math.ceil(this.filteredItems().length / this.pageSize()) || 1);

  isModalOpen = false;
  isEditing = false;
  form: ConfiguracionSistema = { key: '', valor: '' };

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading.set(true);
    this.http.get<ConfiguracionSistema[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.items.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar configuración:', err);
        this.isLoading.set(false);
      }
    });
  }

  onSearchChange(value: string) {
    this.searchText.set(value);
    this.currentPage.set(1);
  }

  openModal(item?: ConfiguracionSistema) {
    if (item) {
      this.isEditing = true;
      this.form = { ...item };
    } else {
      this.isEditing = false;
      this.form = { key: '', valor: '' };
    }
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.isSaving = false;
  }

  saveModal() {
    if (!this.form.key || !this.form.valor) return;
    this.isSaving = true;
    
    if (this.isEditing && this.form.id) {
      this.http.put(`${this.apiUrl}/${this.form.id}`, this.form).subscribe({
        next: () => {
          this.loadData();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error actualizando:', err);
          this.isSaving = false;
        }
      });
    } else {
      this.http.post(this.apiUrl, this.form).subscribe({
        next: () => {
          this.loadData();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error creando:', err);
          this.isSaving = false;
        }
      });
    }
  }

  eliminar(item: ConfiguracionSistema) {
    if (!item.id) return;
    if (confirm(`¿Estás seguro de eliminar la configuración '${item.key}'?`)) {
      this.http.delete(`${this.apiUrl}/${item.id}`).subscribe({
        next: () => this.loadData(),
        error: (err) => console.error('Error eliminando:', err)
      });
    }
  }

  /* ── Pagination ───────────────────────────────────── */
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
}
