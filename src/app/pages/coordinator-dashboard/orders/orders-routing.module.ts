import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'list',
    loadComponent: () => import('../../coordinator-dashboard/orders/list/list.component').then( l => l.ListComponent)
  },
  {
    path:'new',
    loadComponent: () => import('../../coordinator-dashboard/orders/new/new.component').then( l => l.NewComponent)
  },
  {
    path:'bulk',
    loadComponent: () => import('../../coordinator-dashboard/orders/bulk-upload/bulk-upload.component').then( l => l.BulkUploadComponent)
  },
  {
    path:'**',
    redirectTo:'list',
    pathMatch:'full'
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
