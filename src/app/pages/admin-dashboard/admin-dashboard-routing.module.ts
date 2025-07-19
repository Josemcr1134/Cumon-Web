import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';

const routes: Routes = [
  {
    path:'',
    component: AdminDashboardComponent,
    children:[
      {
        path:'services',
        loadChildren: () => import('./services/services.module').then( s => s.ServicesModule)
      },
      {
        path:'dealers',
        loadChildren: () => import('./dealers/dealers.module').then( s => s.DealersModule)
      },
       {
         path:'users',
         loadChildren: () => import('./users/users.module').then( s => s.UsersModule)
       },
      {
        path:'**',
        redirectTo:'services',
        pathMatch:'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
