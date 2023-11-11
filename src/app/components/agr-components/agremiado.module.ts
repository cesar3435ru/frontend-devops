import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { HomeagrComponent } from './homeagr/homeagr.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
const routes: Routes = [
  {
    path: 'home-agr',
    component: HomeagrComponent,
    children: [
      { path: 'solicitudes', component: SolicitudesComponent },
    ],
  }
]


@NgModule({
  declarations: [
    HomeagrComponent,
    SolicitudesComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [HomeagrComponent,
  ]
})
export class AgremiadoModule { }
