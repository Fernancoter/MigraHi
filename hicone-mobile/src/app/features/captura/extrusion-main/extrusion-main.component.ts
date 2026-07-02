import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProduccionService, Extrusora, Extrusion, Bobina } from '../../../core/services/produccion';
import { OfflineStoreService } from '../../../core/offline/offline-store.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-extrusion-main',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './extrusion-main.component.html',
  styleUrls: ['./extrusion-main.component.scss']
})
export class ExtrusionMainComponent implements OnInit {
  private router = inject(Router);
  private produccionService = inject(ProduccionService);
  private offlineStore = inject(OfflineStoreService);
  private authService = inject(AuthService);

  extrusoras: Extrusora[] = [];
  extrusoraSeleccionada: Extrusora | null = null;
  extrusionActiva: any | null = null;
  bobinasExtrusion: Bobina[] = [];

  // Formulario de Registro de Bobina
  nuevaBobina = {
    origen: 'A',
    peso: 0,
    calibre: 1.25,
    desviacion: 0.001,
    color: 1,
    enviarMolino: false,
    mermaKg: 0,
    motivo: 1,
    observaciones: ''
  };

  siguienteBobinaNo = 1;
  saving = false;
  errorMessage = '';
  successMessage = '';

  // Modal de Cierre de Orden
  mostrarModalCierre = false;
  cierreObservaciones = '';
  kpis = {
    totalBobinas: 0,
    totalBobinasMolidas: 0,
    kgProducidos: 0,
    kgMerma: 0,
    eficiencia: 85
  };

  ngOnInit(): void {
    this.cargarExtrusoras();
  }

  cargarExtrusoras() {
    this.produccionService.getExtrusoras().subscribe({
      next: (data: Extrusora[]) => {
        this.extrusoras = data;
        // Intentar autoseleccionar si hay una guardada
        this.offlineStore.get<string>('active_extrusora_id').then(cachedId => {
          if (cachedId) {
            const ext = this.extrusoras.find(e => e.id === cachedId);
            if (ext) {
              this.seleccionarExtrusora(ext);
            }
          }
        });
      },
      error: (err: any) => console.error('Error cargando extrusoras:', err)
    });
  }

  seleccionarExtrusora(ext: Extrusora) {
    this.extrusoraSeleccionada = ext;
    this.offlineStore.set('active_extrusora_id', ext.id);
    this.cargarExtrusionActiva(ext.id);
  }

  deseleccionarMaquina() {
    this.extrusoraSeleccionada = null;
    this.extrusionActiva = null;
    this.bobinasExtrusion = [];
    this.offlineStore.set('active_extrusora_id', null);
  }

  cargarExtrusionActiva(extrusoraId: string) {
    this.errorMessage = '';
    this.successMessage = '';
    this.produccionService.getExtrusionActiva(extrusoraId).subscribe({
      next: (order: any) => {
        if (order) {
          this.extrusionActiva = order;
          // Cargar consecutivo y bobinas
          this.actualizarInformacionOrden();
        } else {
          this.extrusionActiva = null;
        }
      },
      error: (err: any) => {
        console.error('Error al obtener orden activa:', err);
        this.extrusionActiva = null;
      }
    });
  }

  actualizarInformacionOrden() {
    if (!this.extrusionActiva) return;

    // Obtener siguiente correlativo de bobina
    this.produccionService.getSiguienteBobinaNo(this.extrusoraSeleccionada!.id, this.extrusionActiva.productoId || this.extrusionActiva.producto?.id).subscribe({
      next: (no: number) => {
        this.siguienteBobinaNo = no;
      },
      error: (err: any) => {
        console.error('Error obteniendo consecutivo:', err);
        this.siguienteBobinaNo = 1;
      }
    });

    // Obtener bobinas registradas
    this.produccionService.getBobinasByExtrusion(this.extrusionActiva.id).subscribe({
      next: (bobs: Bobina[]) => {
        this.bobinasExtrusion = bobs || [];
      },
      error: (err: any) => console.error('Error cargando bobinas:', err)
    });
  }

  registrarBobina() {
    if (this.nuevaBobina.peso <= 0) {
      this.mostrarMensaje('Ingrese un peso válido mayor a 0 Kg.', true);
      return;
    }

    this.saving = true;
    this.errorMessage = '';
    this.successMessage = '';

    const request = {
      extrusionId: this.extrusionActiva.id,
      bobinaNo: this.siguienteBobinaNo,
      origen: this.nuevaBobina.origen,
      peso: this.nuevaBobina.peso,
      calibre: this.nuevaBobina.calibre,
      desviacion: this.nuevaBobina.desviacion,
      color: this.nuevaBobina.color,
      mermaKg: this.nuevaBobina.enviarMolino ? this.nuevaBobina.mermaKg : 0,
      motivo: this.nuevaBobina.enviarMolino ? this.nuevaBobina.motivo : 0,
      observaciones: this.nuevaBobina.observaciones || 'Registrado desde PWA móvil'
    };

    this.produccionService.guardarBobina(request).subscribe({
      next: (bob: Bobina) => {
        this.saving = false;
        this.mostrarMensaje('¡Bobina registrada exitosamente y sincronizada en el ERP!');
        this.nuevaBobina.peso = 0; // Limpiar peso
        this.nuevaBobina.observaciones = '';
        this.actualizarInformacionOrden();
      },
      error: (err: any) => {
        this.saving = false;
        console.error('Error al registrar bobina:', err);
        const msg = err.error?.message || err.message || 'No se pudo guardar la bobina. Verifique conexión.';
        this.mostrarMensaje('Error: ' + msg, true);
      }
    });
  }

  abrirWizard() {
    this.router.navigate(['/wizard']);
  }

  // Modales y KPIs
  abrirCierre() {
    if (!this.extrusionActiva) return;

    this.saving = true;
    this.produccionService.getExtrusionResultado(this.extrusionActiva.id).subscribe({
      next: (kpiResult: any) => {
        this.saving = false;
        this.kpis = {
          totalBobinas: kpiResult.totalBobinas || this.bobinasExtrusion.length,
          totalBobinasMolidas: kpiResult.totalBobinasMolidas || this.bobinasExtrusion.filter(b => b.estado === 'Molido' || b.estado === 6).length,
          kgProducidos: kpiResult.kgProducidos || this.bobinasExtrusion.reduce((acc, curr) => acc + curr.kg, 0),
          kgMerma: kpiResult.kgMerma || this.bobinasExtrusion.reduce((acc, curr) => acc + (curr.mermaKg || 0), 0),
          eficiencia: kpiResult.eficiencia || 90
        };
        this.cierreObservaciones = '';
        this.mostrarModalCierre = true;
      },
      error: (err: any) => {
        this.saving = false;
        // Fallback local en caso de fallo del KPI API
        this.kpis = {
          totalBobinas: this.bobinasExtrusion.length,
          totalBobinasMolidas: this.bobinasExtrusion.filter(b => b.estado === 'Molido' || b.estado === 6).length,
          kgProducidos: this.bobinasExtrusion.reduce((acc, curr) => acc + curr.kg, 0),
          kgMerma: this.bobinasExtrusion.reduce((acc, curr) => acc + (curr.mermaKg || 0), 0),
          eficiencia: 85
        };
        this.cierreObservaciones = '';
        this.mostrarModalCierre = true;
      }
    });
  }

  confirmarCierre() {
    this.saving = true;
    const obs = this.cierreObservaciones || 'Cerrado desde PWA móvil';
    this.produccionService.finalizarExtrusion(this.extrusionActiva.id, obs).subscribe({
      next: () => {
        this.saving = false;
        this.mostrarModalCierre = false;
        alert('¡Orden de Extrusión finalizada y consolidada en el ERP con éxito!');
        this.extrusionActiva = null;
        if (this.extrusoraSeleccionada) {
          this.cargarExtrusionActiva(this.extrusoraSeleccionada.id);
        }
      },
      error: (err: any) => {
        this.saving = false;
        console.error('Error al finalizar extrusión:', err);
        alert('Error al finalizar orden: ' + (err.error?.message || err.message));
      }
    });
  }

  getColorName(colorVal: number): string {
    const map: { [key: number]: string } = {
      1: 'Rojo 🔴',
      2: 'Azul 🔵',
      3: 'Verde 🟢',
      4: 'Amarillo 🟡',
      5: 'Naranja 🟠',
      6: 'Blanco ⚪'
    };
    return map[colorVal] || 'Otro';
  }

  getEstadoName(state: any): string {
    const map: { [key: string]: string } = {
      'EnReposo': 'En Reposo',
      'EnProceso': 'En Proceso',
      'Molido': 'En Molino',
      'Disponible': 'Disponible'
    };
    return map[state] || String(state);
  }

  private mostrarMensaje(text: string, isError = false) {
    if (isError) {
      this.errorMessage = text;
      setTimeout(() => this.errorMessage = '', 6000);
    } else {
      this.successMessage = text;
      setTimeout(() => this.successMessage = '', 5000);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
