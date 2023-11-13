import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeagrComponent } from './homeagr/homeagr.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { AgremiadoGuard } from 'src/app/guards/agremiado.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
const routes: Routes = [
  {
    path: 'h-agr',
    component: HomeagrComponent,
    // canActivate: [AgremiadoGuard],
    children: [
      { path: 'solicitudes', component: SolicitudesComponent },
    ],
    canActivate: [AgremiadoGuard]
  }
]


@NgModule({
  declarations: [
    HomeagrComponent,
    SolicitudesComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  exports: [HomeagrComponent, SolicitudesComponent,
  ]
})
export class AgremiadoModule { }
