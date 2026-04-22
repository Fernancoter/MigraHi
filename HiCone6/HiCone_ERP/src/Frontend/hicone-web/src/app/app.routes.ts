import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ArticulosListComponent } from './features/inventario/articulos-list/articulos-list';
import { ClientesListComponent } from './features/clientes/clientes-list/clientes-list';
import { VentasListComponent } from './features/ventas/ventas-list/ventas-list';
import { ProduccionListComponent } from './features/produccion/produccion-list/produccion-list';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
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
