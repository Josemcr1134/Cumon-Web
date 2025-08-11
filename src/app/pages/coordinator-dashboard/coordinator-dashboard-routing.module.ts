import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadComponent: () => import('./coordinator-dashboard.component').then( c => c.CoordinatorDashboardComponent),
    children:[
      {
        path:'orders',
        loadChildren: () => import('./orders/orders.module').then( o => o.OrdersModule)
      },
      {
        path:'metrics',
        loadChildren: () => import('../admin-dashboard/metrics/metrics.module').then( o => o.MetricsModule)
      },
      {
        path:'**',
        redirectTo:'metrics',
        pathMatch:'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordinatorDashboardRoutingModule { }
