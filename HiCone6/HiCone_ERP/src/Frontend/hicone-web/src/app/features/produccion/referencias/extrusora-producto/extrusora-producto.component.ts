import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-extrusora-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up" style="padding: 1.5rem 2.5rem; background: #fff; min-height: calc(100vh - 64px);">
      <header style="margin-bottom: 2rem;">
        <h1 style="font-size: 1.6rem; font-weight: normal; color: #5cb85c; margin: 0 0 0.2rem 0;">Extrusora Producto</h1>
        <nav style="font-size: 0.75rem; color: #94a3b8;">Producción › Referencias › Extrusora Producto</nav>
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
              <th style="text-align: left; padding: 1rem; color: #334155; font-size: 0.75rem; font-weight: bold; border-bottom: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">
                Producto Nombre <span style="font-size: 0.65rem; margin-left: 0.2rem; cursor:pointer;">▼</span>
              </th>
              <th style="text-align: left; padding: 1rem; color: #334155; font-size: 0.75rem; font-weight: bold; border-bottom: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">
                Producto Calibre <span style="font-size: 0.65rem; margin-left: 0.2rem; cursor:pointer;">▼</span>
              </th>
              <th style="text-align: left; padding: 1rem; color: #334155; font-size: 0.75rem; font-weight: bold; border-bottom: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">
                Producto Ancho <span style="font-size: 0.65rem; margin-left: 0.2rem; cursor:pointer;">▼</span>
              </th>
              <th style="text-align: left; padding: 1rem; color: #334155; font-size: 0.75rem; font-weight: bold; border-bottom: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">
                Producto Longitud <span style="font-size: 0.65rem; margin-left: 0.2rem; cursor:pointer;">▼</span>
              </th>
              <th style="text-align: right; padding: 1rem; color: #334155; font-size: 0.75rem; font-weight: bold; border-bottom: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">
                Reposo (min) <span style="font-size: 0.65rem; margin-left: 0.2rem; cursor:pointer;">▼</span>
              </th>
              <th style="text-align: right; padding: 1rem; color: #334155; font-size: 0.75rem; font-weight: bold; border-bottom: 1px solid #f1f5f9;">
                Proceso (min) <span style="font-size: 0.65rem; margin-left: 0.2rem; cursor:pointer;">▼</span>
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
                <td style="padding: 0.75rem 1rem; border-bottom: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9; color: #334155; font-size: 0.85rem;">{{ item.productoNombre }}</td>
                <td style="padding: 0.75rem 1rem; border-bottom: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9; color: #334155; font-size: 0.85rem;">{{ item.productoCalibre }}</td>
                <td style="padding: 0.75rem 1rem; border-bottom: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9; color: #334155; font-size: 0.85rem;">{{ item.productoAncho }}</td>
                <td style="padding: 0.75rem 1rem; border-bottom: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9; color: #334155; font-size: 0.85rem;">{{ item.productoLongitud }}</td>
                <td style="padding: 0.75rem 1rem; border-bottom: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9; color: #334155; font-size: 0.85rem; text-align: right;">{{ item.reposo }}</td>
                <td style="padding: 0.75rem 1rem; border-bottom: 1px solid #f1f5f9; color: #334155; font-size: 0.85rem; text-align: right;">{{ item.proceso }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      
      <div style="margin-top: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
         <span style="font-size: 0.85rem; color: #64748b;">Página 1 de 4</span>
         <div style="display: flex; gap: 0.25rem;">
            <button style="border: 1px solid #e2e8f0; background: white; color: #64748b; padding: 0.25rem 0.5rem; border-radius: 4px; cursor: pointer;">Ant</button>
            <button style="border: 1px solid #5cb85c; background: #5cb85c; color: white; padding: 0.25rem 0.75rem; border-radius: 4px; cursor: pointer;">1</button>
            <button style="border: 1px solid #e2e8f0; background: white; color: #64748b; padding: 0.25rem 0.75rem; border-radius: 4px; cursor: pointer;">2</button>
            <button style="border: 1px solid #e2e8f0; background: white; color: #64748b; padding: 0.25rem 0.75rem; border-radius: 4px; cursor: pointer;">3</button>
            <button style="border: 1px solid #e2e8f0; background: white; color: #64748b; padding: 0.25rem 0.75rem; border-radius: 4px; cursor: pointer;">4</button>
            <button style="border: 1px solid #e2e8f0; background: white; color: #64748b; padding: 0.25rem 0.5rem; border-radius: 4px; cursor: pointer;">Sig</button>
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
export class ExtrusoraProductoComponent {
  items = signal([
    { extrusora: 'Extrusora 1', productoNombre: '74750', productoCalibre: '0.015', productoAncho: '2315/16', productoLongitud: '17950', reposo: 720, proceso: 90 },
    { extrusora: 'Extrusora 1', productoNombre: '74757', productoCalibre: '0.015', productoAncho: '2315/16', productoLongitud: '17950', reposo: 1440, proceso: 90 },
    { extrusora: 'Extrusora 1', productoNombre: '80607', productoCalibre: '0.013', productoAncho: '2315/16', productoLongitud: '19400', reposo: 1440, proceso: 90 },
    { extrusora: 'Extrusora 1', productoNombre: '80630', productoCalibre: '0.015', productoAncho: '2315/16', productoLongitud: '19400', reposo: 720, proceso: 90 },
    { extrusora: 'Extrusora 1', productoNombre: '80637', productoCalibre: '0.015', productoAncho: '2315/16', productoLongitud: '19400', reposo: 1440, proceso: 90 },
    { extrusora: 'Extrusora 1', productoNombre: '80680', productoCalibre: '0.013', productoAncho: '2315/16', productoLongitud: '9250', reposo: 720, proceso: 90 },
    { extrusora: 'Extrusora 1', productoNombre: '80687', productoCalibre: '0.013', productoAncho: '2315/16', productoLongitud: '9250', reposo: 1440, proceso: 90 },
    { extrusora: 'Extrusora 1', productoNombre: '80950', productoCalibre: '0.013', productoAncho: '2315/16', productoLongitud: '19300', reposo: 720, proceso: 90 },
    { extrusora: 'Extrusora 1', productoNombre: '80957', productoCalibre: '0.013', productoAncho: '2315/16', productoLongitud: '19300', reposo: 1440, proceso: 90 },
    { extrusora: 'Extrusora 2', productoNombre: '74750', productoCalibre: '0.015', productoAncho: '2315/16', productoLongitud: '8750', reposo: 720, proceso: 90 }
  ]);
}
