import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeadminComponent } from './homeadmin/homeadmin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule, Routes } from '@angular/router';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';
const routes: Routes = [
  {
    path: 'h-admin',
    component: LayoutAdminComponent,
    children: [
      { path: 'home-admin', component: HomeadminComponent },
      { path: 'add-admin', component: AddAdminComponent },
    ],
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
    RouterModule.forChild(routes)
  ],
  exports: [HomeadminComponent,
    AddAdminComponent
  ]
})
export class AdminModule { }
