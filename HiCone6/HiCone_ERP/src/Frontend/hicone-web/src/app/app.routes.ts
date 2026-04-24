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
import { authGuard } from './core/guards/auth.guard';

import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';

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
      { path: 'produccion', component: ProduccionListComponent },
      { path: 'embarques', component: EmbarquesComponent },
      { path: 'calidad', component: CalidadComponent },
      { path: 'seguridad', component: SeguridadComponent },
      { path: 'configuracion', component: ConfiguracionComponent },
      { path: 'reportes-sae', component: ReportesSaeComponent },
      { path: 'catalogos-sae', component: CatalogosSaeComponent },
      { path: 'informes', component: DashboardComponent },     // Placeholder funcional
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
