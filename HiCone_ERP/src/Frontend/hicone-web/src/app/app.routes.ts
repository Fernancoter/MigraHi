import { Routes } from '@angular/router';
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
      { path: 'inventario/lotes', component: LotesComponent },
      { path: 'inventario/cierre-mes', component: CierreMesComponent },
      { path: 'inventario/existencias', component: ExistenciasComponent },
      { path: 'inventario/silos', component: SilosComponent },
      { path: 'inventario', component: ArticulosListComponent },
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
      { path: 'embarques', component: EmbarquesComponent },
      { path: 'embarques/carga/:id', loadComponent: () => import('./features/embarques/carga-camion/carga-camion').then(m => m.CargaCamionComponent) },
      { path: 'calidad', component: CalidadComponent },
      { path: 'calidad/defectos', loadComponent: () => import('./features/calidad/defectos-list.component').then(m => m.DefectosListComponent) },
      { path: 'calidad/reclamos', loadComponent: () => import('./features/calidad/reclamos-list.component').then(m => m.ReclamosListComponent) },
      { path: 'calidad/reclamos/:id', loadComponent: () => import('./features/calidad/reclamo-detail.component').then(m => m.ReclamoDetailComponent) },
      { path: 'calidad/consultar', loadComponent: () => import('./features/calidad/consultar-carrete.component').then(m => m.ConsultarCarreteComponent) },
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
      { path: 'catalogos-sae', component: CatalogosSaeComponent },
      { path: 'informes', component: DashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
