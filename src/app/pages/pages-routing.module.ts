import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then( a => a.AuthModule)
  },
  {
    path:'admin-dashboard',
    loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then( a => a.AdminDashboardModule)
  },
  {
    path:'coordinator-dashboard',
    loadChildren: () => import('./coordinator-dashboard/coordinator-dashboard.module').then( a => a.CoordinatorDashboardModule)
  },
  {
    path:'support-dashboard',
    loadChildren: () => import('./support-dashboard/support-dashboard.module').then( a => a.SupportDashboardModule)
  },
  {
    path:'users-dashboard',
    loadChildren: () => import('./users-dashboard/users-dashboard.module').then( a => a.UsersDashboardModule)
  },
  {
    path:'deliveries-dashboard',
    loadChildren: () => import('./deliveries-dashboard/deliveries-dashboard.module').then( a => a.DeliveriesDashboardModule)
  },
  {
    path:'**',
    redirectTo:'auth',
    pathMatch:'full'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
