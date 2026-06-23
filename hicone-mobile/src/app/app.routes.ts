import { Routes } from '@angular/router';
import { CapturaShellComponent } from './layout/captura-shell/captura-shell.component';
import { CapturaHomeComponent } from './features/captura/home/home.component';
import { EscanearComponent } from './features/captura/escanear/escanear.component';
import { TroquelComponent } from './features/captura/troquel/troquel.component';
import { CarreraComponent } from './features/captura/carrera/carrera.component';

export const routes: Routes = [
  {
    path: '',
    component: CapturaShellComponent,
    children: [
      { path: '', component: CapturaHomeComponent },
      { path: 'escanear', component: EscanearComponent },
      { path: 'troquel', component: TroquelComponent },
      { path: 'carrera', component: CarreraComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
