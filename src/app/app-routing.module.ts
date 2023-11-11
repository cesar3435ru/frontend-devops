import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '', // Ruta raíz (redirige a 'login' por defecto)
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login', // Ruta predeterminada
    component: LoginComponent
  },

  {
    path: 'admin',
    loadChildren: () => import('./components/admin-components/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'agremiado',
    loadChildren: () => import('./components/agr-components/agremiado.module').then(m => m.AgremiadoModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
