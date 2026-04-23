import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ArticulosListComponent } from './features/inventario/articulos-list/articulos-list';
import { ClientesListComponent } from './features/clientes/clientes-list/clientes-list';
import { VentasListComponent } from './features/ventas/ventas-list/ventas-list';
import { ProduccionListComponent } from './features/produccion/produccion-list/produccion-list';
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
      { path: 'inventario', component: ArticulosListComponent },
      { path: 'clientes', component: ClientesListComponent },
      { path: 'ventas', component: VentasListComponent },
      { path: 'produccion', component: ProduccionListComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
