import { Routes } from '@angular/router';
import { CapturaShellComponent } from './layout/captura-shell/captura-shell.component';
import { CapturaHomeComponent } from './features/captura/home/home.component';
import { EscanearComponent } from './features/captura/escanear/escanear.component';
import { TroquelComponent } from './features/captura/troquel/troquel.component';
import { CarreraComponent } from './features/captura/carrera/carrera.component';
import { PrensadoListComponent } from './features/captura/prensado-list/prensado-list.component';
import { PrensadoMainComponent } from './features/captura/prensado-main/prensado-main.component';
import { WizardComponent } from './features/captura/wizard/wizard.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { ExtrusionMainComponent } from './features/captura/extrusion-main/extrusion-main.component';
import { ReportesComponent } from './features/captura/reportes/reportes.component';
import { EtiquetadoPalletsComponent } from './features/captura/etiquetado-pallets/etiquetado-pallets.component';
import { ManualAyudaComponent } from './features/captura/manual-ayuda/manual-ayuda.component';

export const routes: Routes = [
  {
    path: '',
    component: CapturaShellComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: CapturaHomeComponent },
      { path: 'escanear', component: EscanearComponent },
      { path: 'prensado', component: PrensadoListComponent },
      { path: 'prensado-main', component: PrensadoMainComponent },
      { path: 'troquel', component: TroquelComponent },
      { path: 'carrera', component: CarreraComponent },
      { path: 'wizard', component: WizardComponent },
      { path: 'extrusion', component: ExtrusionMainComponent },
      { path: 'reportes', component: ReportesComponent },
      { path: 'etiquetado-pallets', component: EtiquetadoPalletsComponent },
      { path: 'manual', component: ManualAyudaComponent }
    ]
  },


  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];
