import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduccionConfigService, Silo } from '../../../../core/services/produccion-config.service';

@Component({
  selector: 'app-silos-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="module-page animate-move-up">
      <header class="module-header">
        <div class="title-area">
          <nav class="breadcrumb">Producción › Catálogos › Silos</nav>
          <h1>Silo</h1>
        </div>
        <div class="header-actions">
          <button class="btn btn-secondary" (click)="toggleActivo()">{{ filtroActivo()===undefined ? 'Todos' : filtroActivo() ? 'Solo Activos' : 'Solo Inactivos' }}</button>
          <button class="btn btn-primary" (click)="openCreate()">+ Agregar</button>
        </div>
      </header>
      <div class="content-card">
        <table class="data-table">
          <thead>
            <tr>
              <th colspan="3"></th>
              <th>Nombre ↑</th>
              <th>Capacidad (kg) ↑</th>
              <th>Mínimo (kg) ↑</th>
              <th>Máximo (kg) ↑</th>
              <th>Estado de Material ↑</th>
              <th>Tipo de Material ↑</th>
              <th>Silo Activo ↑</th>
            </tr>
          </thead>
          <tbody>
            @if (loading()) { <tr><td colspan="10" class="empty-state">Cargando...</td></tr> }
            @else if (items().length===0) { <tr><td colspan="10" class="empty-state">No se encontraron registros<br><small>Filtrando por Filtro principal y Silo Activo</small></td></tr> }
            @else {
              @for (item of items(); track item.id) {
                <tr>
                  <td><button class="action-btn view"   (click)="view(item)">Visualizar</button></td>
                  <td><button class="action-btn edit"   (click)="edit(item)">Modificar</button></td>
                  <td><button class="action-btn delete" (click)="del(item)">Eliminar</button></td>
                  <td>{{ item.nombre }}</td>
                  <td class="text-right">{{ item.capacidadKg | number }}</td>
                  <td class="text-right">{{ item.minimoKg | number }}</td>
                  <td class="text-right">{{ item.maximoKg | number }}</td>
                  <td>{{ item.estadoMaterial }}</td>
                  <td>{{ item.tipoMaterial }}</td>
                  <td><input type="checkbox" [checked]="item.siloActivo" disabled></td>
                </tr>
              }
            }
          </tbody>
        </table>
      </div>
      @if (showModal()) {
        <div class="modal-overlay" (click)="closeModal()">
          <div class="modal-card wide" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h3>{{ modalMode()==='create'?'Nuevo Silo':modalMode()==='edit'?'Modificar Silo':'Silo' }}</h3>
              <button class="modal-close" (click)="closeModal()">✕</button>
            </div>
            <div class="modal-body two-col">
              <div>
                <label class="field-label">Nombre *</label>
                <input class="field-input" type="text" [(ngModel)]="form.nombre" [disabled]="modalMode()==='view'" />
              </div>
              <div>
                <label class="field-label">Capacidad (kg)</label>
                <input class="field-input" type="number" [(ngModel)]="form.capacidadKg" [disabled]="modalMode()==='view'" />
              </div>
              <div>
                <label class="field-label">Mínimo (kg)</label>
                <input class="field-input" type="number" [(ngModel)]="form.minimoKg" [disabled]="modalMode()==='view'" />
              </div>
              <div>
                <label class="field-label">Máximo (kg)</label>
                <input class="field-input" type="number" [(ngModel)]="form.maximoKg" [disabled]="modalMode()==='view'" />
              </div>
              <div>
                <label class="field-label">Estado de Material</label>
                <input class="field-input" type="text" [(ngModel)]="form.estadoMaterial" [disabled]="modalMode()==='view'" />
              </div>
              <div>
                <label class="field-label">Tipo de Material</label>
                <input class="field-input" type="text" [(ngModel)]="form.tipoMaterial" [disabled]="modalMode()==='view'" />
              </div>
              <div class="full-width checkbox-row">
                <input type="checkbox" id="siloActivo" [(ngModel)]="form.siloActivo" [disabled]="modalMode()==='view'" />
                <label for="siloActivo" class="field-label" style="display:inline;margin-left:.5rem">Silo Activo</label>
              </div>
            </div>
            <div class="modal-footer">
              @if (modalMode()!=='view') { <button class="btn btn-primary" (click)="save()">Guardar</button> }
              <button class="btn btn-secondary" (click)="closeModal()">Cerrar</button>
            </div>
          </div>
        </div>
      }
    </div>`,
  styles:[`.module-page{padding:1.5rem 2.5rem}.breadcrumb{font-size:.75rem;color:#94a3b8;font-weight:600;text-transform:uppercase;margin-bottom:.25rem}h1{font-size:1.8rem;font-weight:800;color:#1e293b;margin:0}.module-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:1.5rem}.header-actions{display:flex;gap:.75rem}.btn{padding:.5rem 1.2rem;border-radius:8px;border:none;cursor:pointer;font-size:.875rem;font-weight:600;transition:all .2s}.btn-primary{background:#10b981;color:white}.btn-secondary{background:#f1f5f9;color:#475569;border:1px solid #e2e8f0}.content-card{background:white;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden;overflow-x:auto}.data-table{width:100%;border-collapse:collapse}.data-table th{text-align:left;padding:.875rem 1rem;background:#f8fafc;color:#64748b;font-size:.75rem;font-weight:700;border-bottom:1px solid #e2e8f0;white-space:nowrap}.data-table td{padding:.75rem 1rem;border-bottom:1px solid #f1f5f9;font-size:.875rem;color:#334155;white-space:nowrap}.data-table tr:hover td{background:#f8fafc}.empty-state{text-align:center;padding:2.5rem;color:#94a3b8;font-style:italic}.action-btn{padding:.3rem .8rem;border-radius:6px;border:none;cursor:pointer;font-size:.78rem;font-weight:600}.action-btn.view{background:#e0f2fe;color:#0369a1}.action-btn.edit{background:#fef3c7;color:#92400e}.action-btn.delete{background:#fee2e2;color:#991b1b}.text-right{text-align:right}.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;z-index:1000}.modal-card{background:white;border-radius:16px;width:440px;box-shadow:0 20px 60px rgba(0,0,0,.2);overflow:hidden}.modal-card.wide{width:600px}.modal-header{padding:1.25rem 1.5rem;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center}.modal-header h3{margin:0;font-size:1.1rem;font-weight:700;color:#1e293b}.modal-close{background:none;border:none;font-size:1.2rem;cursor:pointer;color:#94a3b8}.modal-body{padding:1.5rem;display:flex;flex-direction:column;gap:1rem}.modal-body.two-col{display:grid;grid-template-columns:1fr 1fr;gap:1rem}.full-width{grid-column:1/-1}.checkbox-row{display:flex;align-items:center;gap:.5rem}.field-label{font-size:.8rem;font-weight:600;color:#64748b;margin-bottom:.3rem;display:block}.field-input{width:100%;padding:.6rem .875rem;border-radius:8px;border:1px solid #e2e8f0;font-size:.875rem;outline:none;box-sizing:border-box}.field-input:focus{border-color:#10b981;box-shadow:0 0 0 3px rgba(16,185,129,.15)}.field-input:disabled{background:#f8fafc;color:#94a3b8}.modal-footer{padding:1rem 1.5rem;border-top:1px solid #e2e8f0;display:flex;gap:.75rem;justify-content:flex-end}.animate-move-up{animation:moveUp .3s ease}@keyframes moveUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`]
})
export class SilosCatalogoComponent implements OnInit {
  private svc = inject(ProduccionConfigService);
  items = signal<Silo[]>([]); loading = signal(true); showModal = signal(false);
  modalMode = signal<'view'|'edit'|'create'>('view'); filtroActivo = signal<boolean|undefined>(true); form: any = {};
  ngOnInit() { this.load(); }
  load() { this.loading.set(true); this.svc.getSilos(this.filtroActivo()).subscribe({ next: d => { this.items.set(d); this.loading.set(false); }, error:()=>this.loading.set(false) }); }
  toggleActivo() { const v = this.filtroActivo(); this.filtroActivo.set(v===true?false:v===false?undefined:true); this.load(); }
  view(i:Silo){this.form={...i};this.modalMode.set('view');this.showModal.set(true);}
  edit(i:Silo){this.form={...i};this.modalMode.set('edit');this.showModal.set(true);}
  openCreate(){this.form={siloActivo:true};this.modalMode.set('create');this.showModal.set(true);}
  closeModal(){this.showModal.set(false);this.form={};}
  save(){
    if(this.modalMode()==='create') this.svc.createSilo(this.form).subscribe(()=>{this.closeModal();this.load();});
    else if(this.form.id) this.svc.updateSilo(this.form.id,this.form).subscribe(()=>{this.closeModal();this.load();});
  }
  del(i:Silo){if(confirm(`¿Eliminar "${i.nombre}"?`))this.svc.deleteSilo(i.id).subscribe(()=>this.load());}
}
