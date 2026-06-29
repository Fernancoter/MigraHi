import { Routes } from '@angular/router';
import { CapturaShellComponent } from './layout/captura-shell/captura-shell.component';
import { CapturaHomeComponent } from './features/captura/home/home.component';
import { EscanearComponent } from './features/captura/escanear/escanear.component';
import { TroquelComponent } from './features/captura/troquel/troquel.component';
import { CarreraComponent } from './features/captura/carrera/carrera.component';
import { PrensadoMenuComponent } from './features/captura/prensado-menu/prensado-menu.component';
import { WizardComponent } from './features/captura/wizard/wizard.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: CapturaShellComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: CapturaHomeComponent },
      { path: 'escanear', component: EscanearComponent },
      { path: 'prensado', component: PrensadoMenuComponent },
      { path: 'troquel', component: TroquelComponent },
      { path: 'carrera', component: CarreraComponent },
      { path: 'wizard', component: WizardComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];


