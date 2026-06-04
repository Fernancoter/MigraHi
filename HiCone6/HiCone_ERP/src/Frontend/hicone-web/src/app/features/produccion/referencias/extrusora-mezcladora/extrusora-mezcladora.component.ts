import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-extrusora-mezcladora',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up" style="padding: 1.5rem 2.5rem; background: #fff; min-height: calc(100vh - 64px);">
      <header style="margin-bottom: 2rem;">
        <h1 style="font-size: 1.6rem; font-weight: normal; color: #5cb85c; margin: 0 0 0.2rem 0;">Extrusora Mezcladora</h1>
        <nav style="font-size: 0.75rem; color: #94a3b8;">Producción › Referencias › Extrusora Mezcladora</nav>
      </header>

      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; margin-bottom: 1rem; padding-bottom: 1rem;">
        <div style="display: flex; gap: 0.5rem;">
          <div class="dropdown" style="position: relative; display: inline-block;">
            <button style="background: white; color: #5cb85c; border: 1px solid #5cb85c; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font-size: 0.85rem; display: flex; align-items: center; gap: 0.25rem;">
              <span style="font-weight: bold;">⭳</span> Exportar <span>▼</span>
            </button>
          </div>
          <button style="background: white; color: #5cb85c; border: 1px solid #5cb85c; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font-size: 0.85rem;">
            Agregar
          </button>
          <button style="background: white; color: #5cb85c; border: 1px solid #5cb85c; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font-size: 0.85rem; display: flex; align-items: center; gap: 0.25rem;">
            Selecciona columnas <span>▼</span>
          </button>
        </div>
        
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="font-size: 1rem; color: #64748b; cursor: pointer;">▼</span>
          <input type="text" placeholder="Buscar" style="padding: 0.5rem; border: none; border-bottom: 1px solid #cbd5e1; outline: none; font-size: 0.85rem; width: 250px;">
        </div>
      </div>

      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; min-width: 1000px; border: 1px solid #f1f5f9;">
          <thead>
            <tr style="background-color: #ffffff;">
              <th style="width: 50px; padding: 1rem 0.5rem; border-bottom: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;"></th>
              <th style="width: 50px; padding: 1rem 0.5rem; border-bottom: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;"></th>
              <th style="width: 50px; padding: 1rem 0.5rem; border-bottom: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;"></th>
              <th style="text-align: left; padding: 1rem; color: #334155; font-size: 0.75rem; font-weight: bold; border-bottom: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">
                Extrusora <span style="font-size: 0.65rem; margin-left: 0.2rem; cursor:pointer;">▼</span>
              </th>
              <th style="text-align: right; padding: 1rem; color: #334155; font-size: 0.75rem; font-weight: bold; border-bottom: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">
                Virgen Min <span style="font-size: 0.65rem; margin-left: 0.2rem; cursor:pointer;">↑</span>
              </th>
              <th style="text-align: right; padding: 1rem; color: #334155; font-size: 0.75rem; font-weight: bold; border-bottom: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">
                Virgen Max <span style="font-size: 0.65rem; margin-left: 0.2rem; cursor:pointer;">▼</span>
              </th>
              <th style="text-align: right; padding: 1rem; color: #334155; font-size: 0.75rem; font-weight: bold; border-bottom: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">
                Molido Min <span style="font-size: 0.65rem; margin-left: 0.2rem; cursor:pointer;">▼</span>
              </th>
              <th style="text-align: right; padding: 1rem; color: #334155; font-size: 0.75rem; font-weight: bold; border-bottom: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">
                Molido Max <span style="font-size: 0.65rem; margin-left: 0.2rem; cursor:pointer;">▼</span>
              </th>
              <th style="text-align: right; padding: 1rem; color: #334155; font-size: 0.75rem; font-weight: bold; border-bottom: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">
                Kg Virgen <span style="font-size: 0.65rem; margin-left: 0.2rem; cursor:pointer;">▼</span>
              </th>
              <th style="text-align: right; padding: 1rem; color: #334155; font-size: 0.75rem; font-weight: bold; border-bottom: 1px solid #f1f5f9;">
                Kg Molido <span style="font-size: 0.65rem; margin-left: 0.2rem; cursor:pointer;">▼</span>
              </th>
            </tr>
          </thead>
          <tbody>
            @for (item of items(); track $index) {
              <tr class="grid-row">
                <td style="padding: 0.75rem 0.5rem; border-bottom: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9; text-align: center;">
                  <span style="color: #5cb85c; font-size: 0.8rem; cursor: pointer;">Visualizar</span>
                </td>
                <td style="padding: 0.75rem 0.5rem; border-bottom: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9; text-align: center;">
                  <span style="color: #5cb85c; font-size: 0.8rem; cursor: pointer;">Modificar</span>
                </td>
                <td style="padding: 0.75rem 0.5rem; border-bottom: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9; text-align: center;">
                  <span style="color: #5cb85c; font-size: 0.8rem; cursor: pointer;">Eliminar</span>
                </td>
                <td style="padding: 0.75rem 1rem; border-bottom: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9; color: #334155; font-size: 0.85rem;">{{ item.extrusora }}</td>
                <td style="padding: 0.75rem 1rem; border-bottom: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9; color: #5cb85c; font-size: 0.85rem; text-align: right;">{{ item.virgenMin | number:'1.2-2' }}</td>
                <td style="padding: 0.75rem 1rem; border-bottom: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9; color: #334155; font-size: 0.85rem; text-align: right;">{{ item.virgenMax | number:'1.2-2' }}</td>
                <td style="padding: 0.75rem 1rem; border-bottom: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9; color: #334155; font-size: 0.85rem; text-align: right;">{{ item.molidoMin | number:'1.2-2' }}</td>
                <td style="padding: 0.75rem 1rem; border-bottom: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9; color: #334155; font-size: 0.85rem; text-align: right;">{{ item.molidoMax | number:'1.2-2' }}</td>
                <td style="padding: 0.75rem 1rem; border-bottom: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9; color: #334155; font-size: 0.85rem; text-align: right;">{{ item.kgVirgen | number:'1.2-2' }}</td>
                <td style="padding: 0.75rem 1rem; border-bottom: 1px solid #f1f5f9; color: #334155; font-size: 0.85rem; text-align: right;">{{ item.kgMolido | number:'1.2-2' }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      
      <div style="margin-top: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
         <span style="font-size: 0.85rem; color: #64748b;"></span>
         <div style="display: flex; gap: 0.25rem;">
            <!-- Paginacion placeholder if needed -->
         </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-move-up { animation: moveUp .3s ease-out; }
    @keyframes moveUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
    .grid-row:hover { background-color: #f8fafc; }
  `]
})
export class ExtrusoraMezcladoraComponent {
  items = signal([
    { extrusora: 'Extrusora 1', virgenMin: 18.00, virgenMax: 18.00, molidoMin: 35.00, molidoMax: 35.00, kgVirgen: 7.20, kgMolido: 8.47 },
    { extrusora: 'Extrusora 1', virgenMin: 20.00, virgenMax: 20.00, molidoMin: 80.00, molidoMax: 80.00, kgVirgen: 3.20, kgMolido: 12.71 },
    { extrusora: 'Extrusora 1', virgenMin: 25.31, virgenMax: 25.31, molidoMin: 74.68, molidoMax: 74.68, kgVirgen: 4.00, kgMolido: 11.80 },
    { extrusora: 'Extrusora 1', virgenMin: 29.00, virgenMax: 29.00, molidoMin: 71.00, molidoMax: 71.00, kgVirgen: 3.60, kgMolido: 9.00 },
    { extrusora: 'Extrusora 1', virgenMin: 30.00, virgenMax: 30.00, molidoMin: 70.00, molidoMax: 70.00, kgVirgen: 4.80, kgMolido: 10.80 },
    { extrusora: 'Extrusora 1', virgenMin: 35.00, virgenMax: 35.00, molidoMin: 65.00, molidoMax: 65.00, kgVirgen: 5.60, kgMolido: 10.35 },
    { extrusora: 'Extrusora 1', virgenMin: 38.00, virgenMax: 38.00, molidoMin: 62.00, molidoMax: 62.00, kgVirgen: 5.80, kgMolido: 9.40 },
    { extrusora: 'Extrusora 1', virgenMin: 40.00, virgenMax: 40.00, molidoMin: 60.00, molidoMax: 60.00, kgVirgen: 5.60, kgMolido: 8.80 },
    { extrusora: 'Extrusora 1', virgenMin: 40.40, virgenMax: 40.40, molidoMin: 59.50, molidoMax: 59.50, kgVirgen: 6.40, kgMolido: 9.41 },
    { extrusora: 'Extrusora 1', virgenMin: 45.00, virgenMax: 45.00, molidoMin: 55.00, molidoMax: 55.00, kgVirgen: 7.20, kgMolido: 8.47 }
  ]);
}
