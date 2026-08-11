import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

export type ModuleType = 'INVENTARIO' | 'EXTRUSIÓN' | 'PRENSADO' | 'EMBARQUES' | 'CALIDAD' | 'SEGURIDAD' | 'CONFIGURACIÓN' | 'REPORTES_SAE' | 'CATÁLOGOS_SAE' | 'SISTEMA' | 'CONFIGURACION_PRODUCCION' | null;

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private sidebarVisibleSubject = new BehaviorSubject<boolean>(true);
  public isSidebarVisible$ = this.sidebarVisibleSubject.asObservable();

  private activeModuleSubject = new BehaviorSubject<ModuleType>('SISTEMA');
  public activeModule$ = this.activeModuleSubject.asObservable();

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.detectModule(event.urlAfterRedirects);
    });
    
    setTimeout(() => {
        this.detectModule(this.router.url);
    });
  }

  toggleSidebar() {
    this.sidebarVisibleSubject.next(!this.sidebarVisibleSubject.value);
  }
  
  setSidebarState(isOpen: boolean) {
    this.sidebarVisibleSubject.next(isOpen);
  }

  public setActiveModule(module: ModuleType) {
    this.activeModuleSubject.next(module);
  }

  private detectModule(url: string) {
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('/configurar-produccion')) {
      this.activeModuleSubject.next('CONFIGURACION_PRODUCCION');
    } else if (lowerUrl.includes('/inventario') || lowerUrl.includes('/silos') || lowerUrl.includes('/lotes') || lowerUrl.includes('/cierre-mes')) {
      this.activeModuleSubject.next('INVENTARIO');
    } else if (lowerUrl.includes('/produccion/prensado') || lowerUrl.includes('tab=prensado')) {
      this.activeModuleSubject.next('PRENSADO');
    } else if (lowerUrl.includes('/produccion/extrusion') || lowerUrl.includes('tab=extrusion')) {
      this.activeModuleSubject.next('EXTRUSIÓN');
    } else if (lowerUrl.includes('/produccion') || lowerUrl.includes('/extrusiones') || lowerUrl.includes('/bobinas')) {
      // Preservar si ya es EXTRUSIÓN o PRENSADO al compartir la misma ruta base
      const current = this.activeModuleSubject.value;
      if (current !== 'EXTRUSIÓN' && current !== 'PRENSADO') {
        this.activeModuleSubject.next('EXTRUSIÓN');
      }
    } else if (lowerUrl.includes('/calidad')) {
      this.activeModuleSubject.next('CALIDAD');
    } else if (lowerUrl.includes('/embarques')) {
      this.activeModuleSubject.next('EMBARQUES');
    } else if (lowerUrl.includes('/seguridad')) {
      this.activeModuleSubject.next('SEGURIDAD');
    } else if (lowerUrl.includes('/configuracion')) {
      this.activeModuleSubject.next('CONFIGURACIÓN');
    } else if (lowerUrl.includes('/reportes-sae')) {
      this.activeModuleSubject.next('REPORTES_SAE');
    } else if (lowerUrl.includes('/catalogos-sae') || lowerUrl.includes('/clientes') || lowerUrl.includes('/ventas')) {
      this.activeModuleSubject.next('CATÁLOGOS_SAE');
    } else {
      // Solo volvemos a SISTEMA si la URL es estrictamente el dashboard global
      if (lowerUrl.endsWith('/dashboard') || lowerUrl === '/') {
         // Mantener el módulo actual si ya estamos en uno específico
         if (!this.activeModuleSubject.value || this.activeModuleSubject.value === 'SISTEMA') {
           this.activeModuleSubject.next('SISTEMA');
         }
      }
    }
  }
}
