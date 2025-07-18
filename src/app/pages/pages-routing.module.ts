import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then( a => a.AuthModule)
  },
  {
    path:'users-dashboard',
    loadChildren: () => import('./users-dashboard/users-dashboard.module').then( a => a.UsersDashboardModule)
  },
  {
    path:'admin-dashboard',
    loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then( a => a.AdminDashboardModule)
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
