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
import { ExtrusorasCatalogoComponent } from './features/produccion/catalogos/extrusoras/extrusoras.component';
import { PrensasCatalogoComponent } from './features/produccion/catalogos/prensas/prensas.component';
import { SilosCatalogoComponent } from './features/produccion/catalogos/silos/silos.component';
import { OperariosCatalogoComponent } from './features/produccion/catalogos/operarios/operarios.component';
import { ProductosCatalogoComponent } from './features/produccion/catalogos/productos/productos.component';

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
      { path: 'produccion/catalogos/extrusoras', component: ExtrusorasCatalogoComponent },
      { path: 'produccion/catalogos/prensas', component: PrensasCatalogoComponent },
      { path: 'produccion/catalogos/silos', component: SilosCatalogoComponent },
      { path: 'produccion/operarios', component: OperariosCatalogoComponent },
      { path: 'produccion/productos', component: ProductosCatalogoComponent },
      { path: 'produccion/extrusion', component: ProduccionListComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
