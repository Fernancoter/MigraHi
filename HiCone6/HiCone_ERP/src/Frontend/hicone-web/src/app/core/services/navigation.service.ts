import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

export type ModuleType = 'INVENTARIO' | 'EXTRUSIÓN' | 'PRODUCCIÓN' | 'SISTEMA' | 'SEGURIDAD' | null;

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

  private detectModule(url: string) {
    if (url.includes('/seguridad')) {
      this.activeModuleSubject.next('SEGURIDAD');
    } else if (url.includes('/produccion')) {
      // Rutas /produccion/* → módulo PRODUCCIÓN (Configurar Producción)
      this.activeModuleSubject.next('PRODUCCIÓN');
    } else if (url.includes('/inventario') || url.includes('/silos')) {
      this.activeModuleSubject.next('INVENTARIO');
    } else if (url.includes('/extrusiones') || url.includes('/bobinas')) {
      // Compatibilidad legacy
      this.activeModuleSubject.next('EXTRUSIÓN');
    } else {
      this.activeModuleSubject.next('SISTEMA');
    }
  }
}
