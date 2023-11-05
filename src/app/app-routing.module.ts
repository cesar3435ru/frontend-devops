import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { adminGuard } from './guards/admin.guard';
import { HomeadminComponent } from './components/homeadmin/homeadmin.component';

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
    path: 'home',
    component: HomeadminComponent, children: [
      {
        path: '', // Ruta predeterminada dentro de 'home' (por ejemplo, el dashboard)
        component: HomeadminComponent
      },
    
    ],
    canActivate: [adminGuard]


  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
