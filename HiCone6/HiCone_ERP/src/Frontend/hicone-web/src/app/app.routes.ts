import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ArticulosListComponent } from './features/inventario/articulos-list/articulos-list';
import { ClientesListComponent } from './features/clientes/clientes-list/clientes-list';
import { VentasListComponent } from './features/ventas/ventas-list/ventas-list';
import { ProduccionListComponent } from './features/produccion/produccion-list/produccion-list';
import { EmbarquesComponent } from './features/embarques/embarques.component';
import { CalidadComponent } from './features/calidad/calidad.component';
import { ConfiguracionComponent } from './features/configuracion/configuracion.component';
import { SilosComponent } from './features/inventario/silos/silos.component';
import { CatalogosSaeComponent } from './features/catalogos-sae/catalogos-sae.component';
import { ReportesSaeComponent } from './features/reportes-sae/reportes-sae.component';
import { SeguridadComponent } from './features/seguridad/seguridad.component';
import { SeguridadInicioComponent } from './features/seguridad/inicio/seguridad-inicio.component';
import { UsuariosComponent } from './features/seguridad/usuarios/usuarios.component';
import { RolesComponent } from './features/seguridad/roles/roles.component';
import { authGuard } from './core/guards/auth.guard';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';
// Módulo Configurar Producción
import { TableroProduccionComponent } from './features/produccion/tablero/tablero.component';
import { CategoriasComponent } from './features/produccion/catalogos/categorias/categorias.component';
import { TurnosCatalogoComponent } from './features/produccion/catalogos/turnos/turnos.component';
import { TurnosSemanaComponent } from './features/produccion/turnos-semana/turnos-semana.component';
import { ExtrusorasCatalogoComponent } from './features/produccion/catalogos/extrusoras/extrusoras.component';
import { PrensasCatalogoComponent } from './features/produccion/catalogos/prensas/prensas.component';
import { SilosCatalogoComponent } from './features/produccion/catalogos/silos/silos.component';
import { OperariosCatalogoComponent } from './features/produccion/catalogos/operarios/operarios.component';
import { ProductosCatalogoComponent } from './features/produccion/catalogos/productos/productos.component';
import { ReportesPlaceholderComponent } from './features/reportes-hc/placeholder/reportes-placeholder.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'inventario/silos', component: SilosComponent },
      { path: 'inventario', component: ArticulosListComponent },
      { path: 'clientes', component: ClientesListComponent },
      { path: 'ventas', component: VentasListComponent },
      { path: 'embarques', component: EmbarquesComponent },
      { path: 'calidad', component: CalidadComponent },
      { path: 'configuracion', component: ConfiguracionComponent },
      { path: 'reportes-sae', component: ReportesSaeComponent },
      { path: 'catalogos-sae', component: CatalogosSaeComponent },
      { path: 'informes', component: DashboardComponent },
      // Seguridad
      {
        path: 'seguridad',
        component: SeguridadComponent,
        children: [
          { path: '', component: SeguridadInicioComponent },
          { path: 'usuarios', component: UsuariosComponent },
          { path: 'roles', component: RolesComponent }
        ]
      },
      // Configurar Producción
      { path: 'produccion', component: TableroProduccionComponent },
      { path: 'produccion/inicio', component: TableroProduccionComponent },
      { path: 'produccion/catalogos/categorias', component: CategoriasComponent },
      { path: 'produccion/catalogos/turnos', component: TurnosCatalogoComponent },
      { path: 'produccion/turnos-semana', component: TurnosSemanaComponent },
      { path: 'produccion/catalogos/extrusoras', component: ExtrusorasCatalogoComponent },
      { path: 'produccion/catalogos/prensas', component: PrensasCatalogoComponent },
      { path: 'produccion/catalogos/silos', component: SilosCatalogoComponent },
      { path: 'produccion/operarios', component: OperariosCatalogoComponent },
      { path: 'produccion/productos', component: ProductosCatalogoComponent },
      { path: 'produccion/extrusion', component: ProduccionListComponent },
      { path: 'produccion/referencias/configuracion', component: ConfiguracionComponent },
      { path: 'produccion/referencias/extrusora-producto', loadComponent: () => import('./features/produccion/referencias/extrusora-producto/extrusora-producto.component').then(m => m.ExtrusoraProductoComponent) },
      { path: 'produccion/referencias/extrusora-mezcladora', loadComponent: () => import('./features/produccion/referencias/extrusora-mezcladora/extrusora-mezcladora.component').then(m => m.ExtrusoraMezcladoraComponent) },
      { path: 'produccion/referencias/prensa-producto', loadComponent: () => import('./features/produccion/referencias/prensa-producto/prensa-producto.component').then(m => m.PrensaProductoComponent) },
      { path: 'produccion/referencias/producto-terminado', loadComponent: () => import('./features/produccion/referencias/producto-terminado/producto-terminado.component').then(m => m.ProductoTerminadoComponent) },
      
      // Reportes HC
      { 
        path: 'reportes-hc/inicio', 
        component: ReportesPlaceholderComponent, 
        data: { titulo: 'Reportes HC', breadcrumb: 'Reportes HC' } 
      },
      { 
        path: 'reportes-hc/observaciones/causas-interrupcion', 
        loadComponent: () => import('./features/reportes-hc/observaciones/causas-interrupcion/causas-interrupcion.component').then(m => m.CausasInterrupcionComponent) 
      },
      { 
        path: 'reportes-hc/observaciones/extrusoras', 
        loadComponent: () => import('./features/reportes-hc/observaciones/extrusoras/extrusoras-observacion.component').then(m => m.ExtrusorasObservacionComponent) 
      },
      { 
        path: 'reportes-hc/observaciones/prensas', 
        loadComponent: () => import('./features/reportes-hc/observaciones/prensas/prensas-observacion.component').then(m => m.PrensasObservacionComponent) 
      },
      { 
        path: 'reportes-hc/descargables/drr', 
        loadComponent: () => import('./features/reportes-hc/descargables/drr/drr.component').then(m => m.DrrComponent) 
      },
      { 
        path: 'reportes-hc/existencia', 
        loadComponent: () => import('./features/reportes-hc/existencia/reporte-existencia.component').then(m => m.ReporteExistenciaComponent) 
      },
      { 
        path: 'reportes-hc/descargables/pallet-embarque', 
        loadComponent: () => import('./features/reportes-hc/descargables/pallet-embarque/pallet-embarque.component').then(m => m.PalletEmbarqueComponent)
      },
      { 
        path: 'reportes-hc/descargables/carrete-pallet', 
        loadComponent: () => import('./features/reportes-hc/descargables/carrete-pallet/carrete-pallet.component').then(m => m.CarretePalletComponent)
      },
      { 
        path: 'reportes-hc/resumenes/extrusion', 
        loadComponent: () => import('./features/reportes-hc/resumenes/extrusion/resumen-extrusion.component').then(m => m.ResumenExtrusionComponent)
      },
      { 
        path: 'reportes-hc/resumenes/prensado', 
        loadComponent: () => import('./features/reportes-hc/resumenes/prensado/resumen-prensado.component').then(m => m.ResumenPrensadoComponent)
      },
      { 
        path: 'reportes-hc/etiquetado/ordenes', 
        loadComponent: () => import('./features/reportes-hc/etiquetado/ordenes/ordenes-etiquetado.component').then(m => m.OrdenesEtiquetadoComponent)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
