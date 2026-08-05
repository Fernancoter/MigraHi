import { Routes } from '@angular/router';

// Módulo Configurar Producción
import { TableroProduccionComponent } from './features/produccion/tablero/tablero.component';
import { CategoriasComponent } from './features/produccion/catalogos/categorias/categorias.component';
import { TurnosCatalogoComponent } from './features/produccion/catalogos/turnos/turnos.component';
import { ExtrusorasCatalogoComponent } from './features/produccion/catalogos/extrusoras/extrusoras.component';
import { PrensasCatalogoComponent } from './features/produccion/catalogos/prensas/prensas.component';
import { SilosCatalogoComponent } from './features/produccion/catalogos/silos/silos.component';
import { OperariosCatalogoComponent } from './features/produccion/catalogos/operarios/operarios.component';
import { ProductosCatalogoComponent } from './features/produccion/catalogos/productos/productos.component';
import { ProduccionConfiguracionComponent } from './features/produccion/referencias/configuracion/configuracion.component';
import { ExtrusoraProductoComponent } from './features/produccion/referencias/extrusora-producto/extrusora-producto.component';
import { ExtrusoraMezcladoraComponent } from './features/produccion/referencias/extrusora-mezcladora/extrusora-mezcladora.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ArticulosListComponent } from './features/inventario/articulos-list/articulos-list';
import { ClientesListComponent } from './features/clientes/clientes-list/clientes-list';
import { VentasListComponent } from './features/ventas/ventas-list/ventas-list';
import { ProduccionListComponent } from './features/produccion/produccion-list/produccion-list';
import { ExtrusionOperadorComponent } from './features/produccion/extrusion-operador/extrusion-operador';
import { ExtrusionInicioComponent } from './features/produccion/extrusion-inicio/extrusion-inicio';
import { TurnosSemanaComponent } from './features/produccion/turnos-semana/turnos-semana';
import { ExtrusorasListComponent } from './features/produccion/extrusoras-list/extrusoras-list';
import { ExtrusoraProductoListComponent } from './features/produccion/extrusora-producto-list/extrusora-producto-list';
import { ExtrusionesListComponent } from './features/produccion/extrusiones-list/extrusiones-list';
import { BobinasListComponent } from './features/produccion/bobinas-list/bobinas-list';
import { ExtrusionInterrupcionesListComponent } from './features/produccion/extrusion-interrupciones-list/extrusion-interrupciones-list';
import { TroquelesCatalogoComponent } from './features/produccion/catalogos/troqueles/troqueles.component';
import { PrensadosListComponent } from './features/produccion/prensados-list/prensados-list';
import { InicioPrensadoComponent } from './features/produccion/inicio-prensado/inicio-prensado.component';
import { TurnosSemanaPrensadoComponent } from './features/produccion/turnos-semana-prensado/turnos-semana-prensado';

import { CarrerasListComponent } from './features/produccion/carreras-list/carreras-list';
import { CarretesListComponent } from './features/produccion/carretes-list/carretes-list';
import { PaletsListComponent } from './features/produccion/palets-list/palets-list';
import { InterrupcionesListComponent } from './features/produccion/interrupciones-list/interrupciones-list';
import { EmbarquesComponent } from './features/embarques/embarques.component';
import { CalidadComponent } from './features/calidad/calidad.component';
import { ConfiguracionComponent } from './features/configuracion/configuracion.component';
import { SilosComponent } from './features/inventario/silos/silos.component';
import { CatalogosSaeComponent } from './features/catalogos-sae/catalogos-sae.component';
import { ReportesSaeComponent } from './features/reportes-sae/reportes-sae.component';
import { SeguridadComponent } from './features/seguridad/seguridad.component';
import { LotesComponent } from './features/inventario/lotes/lotes.component';
import { CierreMesComponent } from './features/inventario/cierre-mes/cierre-mes.component';
import { ExistenciasComponent } from './features/inventario/existencias/existencias.component';
import { InventarioIndexComponent } from './features/inventario/inventario-index/inventario-index.component';
import { authGuard } from './core/guards/auth.guard';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './features/auth/change-password/change-password.component';
import { SeguridadInicioComponent } from './features/seguridad/inicio/seguridad-inicio.component';
import { UsuariosComponent } from './features/seguridad/usuarios/usuarios.component';
import { RolesComponent } from './features/seguridad/roles/roles.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'inventario/inicio', loadComponent: () => import('./features/inventario/inicio/inicio').then(m => m.Inicio) },
      { path: 'inventario/lotes', component: LotesComponent },
      { path: 'inventario/cierre-mes', component: CierreMesComponent },
      { path: 'inventario/silos', component: SilosComponent },
      { path: 'inventario/existencias', component: InventarioIndexComponent },
      { path: 'inventario/existencias/detalle/:id', component: ExistenciasComponent },
      { path: 'clientes', component: ClientesListComponent },
      { path: 'ventas', component: VentasListComponent },
      { path: 'produccion', component: ProduccionListComponent },
      { path: 'produccion/extrusion', component: ExtrusionOperadorComponent },
      { path: 'produccion/extrusion/inicio', component: ExtrusionInicioComponent },
      { path: 'produccion/extrusion/turnos', component: TurnosSemanaComponent },
      { path: 'produccion/extrusion/extrusoras', component: ExtrusorasListComponent },
      { path: 'produccion/extrusion/extrusora-producto', component: ExtrusoraProductoListComponent },
      { path: 'produccion/extrusion/operacion/extrusiones', component: ExtrusionesListComponent },
      { path: 'produccion/extrusion/operacion/bobinas', component: BobinasListComponent },
      { path: 'produccion/extrusion/operacion/interrupciones', component: ExtrusionInterrupcionesListComponent },
      { path: 'produccion/prensado/inicio', component: InicioPrensadoComponent },
      { path: 'produccion/prensado/turnos-semana', component: TurnosSemanaPrensadoComponent },

      { path: 'produccion/prensado/catalogos/troqueles', component: TroquelesCatalogoComponent },
      { path: 'produccion/prensado/catalogos/prensas', component: PrensasCatalogoComponent },
      { path: 'produccion/prensado/operacion/prensados', component: PrensadosListComponent },
      { path: 'produccion/prensado/operacion/carreras', component: CarrerasListComponent },
      { path: 'produccion/prensado/operacion/carretes', component: CarretesListComponent },
      { path: 'produccion/prensado/operacion/palets', component: PaletsListComponent },
      { path: 'produccion/prensado/operacion/interrupciones', component: InterrupcionesListComponent },
      { path: 'embarques', component: EmbarquesComponent },
      { path: 'embarques/carga/:id', loadComponent: () => import('./features/embarques/carga-camion/carga-camion').then(m => m.CargaCamionComponent) },
      {
        path: 'calidad',
        children: [
          { path: '', component: CalidadComponent },
          { path: 'reclamos', loadComponent: () => import('./features/calidad/reclamos-list.component').then(m => m.ReclamosListComponent) },
          { path: 'reclamos/:id', loadComponent: () => import('./features/calidad/reclamo-detail.component').then(m => m.ReclamoDetailComponent) },
          { path: 'defectos', loadComponent: () => import('./features/calidad/defectos-list.component').then(m => m.DefectosListComponent) },
          { path: 'consultar', loadComponent: () => import('./features/calidad/consultar-carrete.component').then(m => m.ConsultarCarreteComponent) }
        ]
      },
      {
        path: 'seguridad',
        component: SeguridadComponent,
        children: [
          { path: '', component: SeguridadInicioComponent },
          { path: 'usuarios', component: UsuariosComponent },
          { path: 'roles', component: RolesComponent }
        ]
      },
      { path: 'configuracion', component: ConfiguracionComponent },
      { path: 'reportes-sae', component: ReportesSaeComponent },
      { path: 'reportes-sae/orders-price', loadComponent: () => import('./features/reportes-sae/report-orders-price.component').then(m => m.ReportOrdersPriceComponent) },
      { path: 'reportes-sae/presupuesto', loadComponent: () => import('./features/reportes-sae/edit-budget.component').then(m => m.EditBudgetComponent) },
      { path: 'reportes-sae/itw-outlook', loadComponent: () => import('./features/reportes-sae/itw-outlook.component').then(m => m.ItwOutlookComponent) },
      { path: 'reportes-sae/realtime-inventory', loadComponent: () => import('./features/reportes-sae/realtime-inventory.component').then(m => m.RealtimeInventoryComponent) },
      { path: 'catalogos-sae', component: CatalogosSaeComponent },
      { path: 'catalogos-sae/customer', loadComponent: () => import('./features/catalogos-sae/customer/customer.component').then(m => m.CustomerComponent) },
      { path: 'catalogos-sae/outlook', loadComponent: () => import('./features/catalogos-sae/outlook/outlook.component').then(m => m.OutlookComponent) },
      { path: 'catalogos-sae/budget', loadComponent: () => import('./features/catalogos-sae/budget/budget.component').then(m => m.BudgetComponent) },
      { path: 'catalogos-sae/price', loadComponent: () => import('./features/catalogos-sae/price/price.component').then(m => m.PriceComponent) },
      { path: 'catalogos-sae/product', loadComponent: () => import('./features/catalogos-sae/product/product.component').then(m => m.ProductComponent) },
      { path: 'catalogos-sae/salesperson', loadComponent: () => import('./features/catalogos-sae/salesperson/salesperson.component').then(m => m.SalesPersonComponent) },
      { path: 'informes', component: DashboardComponent },
      
      // Módulo Configurar Producción
      { path: 'configurar-produccion', component: TableroProduccionComponent },
      { path: 'configurar-produccion/turnos-semana', component: TurnosSemanaComponent },
      { path: 'configurar-produccion/catalogos/categorias', component: CategoriasComponent },
      { path: 'configurar-produccion/catalogos/turnos', component: TurnosCatalogoComponent },
      { path: 'configurar-produccion/catalogos/extrusoras', component: ExtrusorasCatalogoComponent },
      { path: 'configurar-produccion/catalogos/prensas', component: PrensasCatalogoComponent },
      { path: 'configurar-produccion/catalogos/silos', component: SilosCatalogoComponent },
      { path: 'configurar-produccion/operarios', component: OperariosCatalogoComponent },
      { path: 'configurar-produccion/productos', component: ProductosCatalogoComponent },
      { path: 'configurar-produccion/referencias/configuracion', component: ProduccionConfiguracionComponent },
      { path: 'configurar-produccion/referencias/extrusora-producto', component: ExtrusoraProductoComponent },
      { path: 'configurar-produccion/referencias/extrusora-mezcladora', component: ExtrusoraMezcladoraComponent },
      { path: 'configurar-produccion/referencias/prensa-producto', loadComponent: () => import('./features/produccion/referencias/prensa-producto/prensa-producto.component').then(m => m.PrensaProductoComponent) },
      { path: 'configurar-produccion/referencias/producto-terminado', loadComponent: () => import('./features/produccion/referencias/producto-terminado/producto-terminado.component').then(m => m.ProductoTerminadoComponent) },
      
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
