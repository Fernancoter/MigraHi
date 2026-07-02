import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CalidadService } from '../../core/services/calidad';

@Component({
  selector: 'app-consultar-carrete',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">Consultar Carrete</h1>
        <div class="breadcrumb">
          <span class="breadcrumb-item">Calidad</span>
          <span class="breadcrumb-separator">›</span>
          <span class="breadcrumb-item active">Consultar</span>
        </div>
      </div>
      
      <div class="page-content">
        <div class="form-container">
          <div class="form-group-inline">
            <label class="form-label">Código Carrete</label>
            <input 
              type="text" 
              class="search-input" 
              [(ngModel)]="searchNoSerie" 
              (keyup.enter)="consultarTrazabilidad()"
            >
          </div>
          <button class="btn-green" (click)="consultarTrazabilidad()">Buscar Carrete</button>
        </div>
        
        <!-- Aquí irían los resultados en una tabla tradicional si se encuentran,
             pero según la captura, la vista inicial está vacía abajo del formulario -->
        <div class="results-container" *ngIf="trazabilidad">
          <table class="gx-table" style="margin-top: 30px;">
            <thead>
              <tr>
                <th>Carrete</th>
                <th>Estado</th>
                <th>Prensa</th>
                <th>Extrusora</th>
                <th>Bobina</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ trazabilidad.carrete.noSerie }}</td>
                <td>{{ trazabilidad.carrete.estado }}</td>
                <td>{{ trazabilidad.prensado.prensa || 'N/A' }}</td>
                <td>{{ trazabilidad.extrusion?.extrusora || 'N/A' }}</td>
                <td>{{ trazabilidad.extrusion?.bobinaNo || 'N/A' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      background-color: #ffffff;
      min-height: calc(100vh - 60px);
      display: flex;
      flex-direction: column;
    }
    .page-header {
      padding: 15px 20px 5px 20px;
      border-bottom: 1px solid #e0e0e0;
    }
    .page-title {
      color: #5cb85c;
      font-size: 22px;
      font-weight: 500;
      margin: 0 0 5px 0;
    }
    .breadcrumb {
      font-size: 13px;
      color: #999;
      display: flex;
      align-items: center;
      gap: 5px;
      margin-bottom: 10px;
    }
    .breadcrumb-item { color: #999; }
    .breadcrumb-separator { font-size: 14px; }
    .breadcrumb-item.active { color: #777; }
    
    .page-content {
      padding: 20px 30px;
      flex: 1;
    }

    .form-container {
      display: flex;
      align-items: flex-end;
      gap: 20px;
      margin-top: 20px;
    }
    .form-group-inline {
      display: flex;
      flex-direction: column;
      width: 300px;
    }
    .form-label {
      font-size: 12px;
      font-weight: 600;
      color: #333;
      margin-bottom: 5px;
    }
    .search-input {
      border: none;
      border-bottom: 1px solid #5cb85c;
      padding: 5px 0;
      outline: none;
      font-size: 14px;
    }

    .btn-green {
      background: #5cb85c;
      color: white;
      border: none;
      padding: 8px 15px;
      border-radius: 3px;
      cursor: pointer;
      font-weight: bold;
      font-size: 13px;
    }

    .gx-table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid #ddd;
    }
    .gx-table th {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: left;
      font-weight: 600;
      color: #333;
      font-size: 15px;
      background: #f9f9f9;
    }
    .gx-table td {
      border: 1px solid #ddd;
      padding: 10px 12px;
      font-size: 14px;
    }
  `]
})
export class ConsultarCarreteComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private calidadService = inject(CalidadService);

  searchNoSerie = '';
  trazabilidad: any = null;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchNoSerie = params['search'];
        this.consultarTrazabilidad();
      }
    });
  }

  consultarTrazabilidad() {
    if (!this.searchNoSerie) return;
    this.calidadService.getTrazabilidad(this.searchNoSerie).subscribe({
      next: (data) => {
        this.trazabilidad = data;
      },
      error: () => {
        alert('No se encontró trazabilidad para este número de serie.');
        this.trazabilidad = null;
      }
    });
  }
}
