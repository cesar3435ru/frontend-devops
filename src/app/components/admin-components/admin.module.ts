import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeadminComponent } from './homeadmin/homeadmin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { AdminsComponent } from './admins/admins.component';
import { AgremiadosComponent } from './agremiados/agremiados.component';
import { EditadminComponent } from './editadmin/editadmin.component';
import { EditagreComponent } from './editagre/editagre.component';
import { InfoagresComponent } from './infoagres/infoagres.component';
import { AinfoeditComponent } from './ainfoedit/ainfoedit.component';
import { SolicitudesaComponent } from './solicitudesa/solicitudesa.component';
import { SafeUrlPipe } from 'src/app/pipes/safe-url.pipe';
const routes: Routes = [
  {
    path: 'admin',
    component: LayoutAdminComponent,

    children: [
      { path: 'home', component: HomeadminComponent },
      { path: 'admins', component: AdminsComponent },
      { path: 'editadmin/:id', component: EditadminComponent },
      { path: 'agremiados', component: AgremiadosComponent },
      { path: 'editagre/:id', component: EditagreComponent },
      { path: 'info-agres', component: InfoagresComponent },
      { path: 'agre/:id', component: AinfoeditComponent },
      { path: 'solicitudes', component: SolicitudesaComponent },



    ],
    canActivate: [AdminGuard]

  }
]



@NgModule({
  declarations: [
    HomeadminComponent,
    LayoutAdminComponent,
    AdminsComponent,
    AgremiadosComponent,
    EditadminComponent,
    EditagreComponent,
    InfoagresComponent,
    AinfoeditComponent,
    SolicitudesaComponent,
    SafeUrlPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule
  ],
  exports: [HomeadminComponent, EditadminComponent,
    EditagreComponent
  ]
})
export class AdminModule { }
