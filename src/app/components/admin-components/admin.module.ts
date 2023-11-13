import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeadminComponent } from './homeadmin/homeadmin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule, Routes } from '@angular/router';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminGuard } from 'src/app/guards/admin.guard';
const routes: Routes = [
  {
    path: 'h-admin',
    component: LayoutAdminComponent,
    
    children: [
      { path: 'home-admin', component: HomeadminComponent },
      { path: 'add-admin', component: AddAdminComponent },
    ],
    canActivate: [AdminGuard]

  }
]



@NgModule({
  declarations: [
    HomeadminComponent,
    AddAdminComponent,
    LayoutAdminComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  exports: [HomeadminComponent,
    AddAdminComponent
  ]
})
export class AdminModule { }
