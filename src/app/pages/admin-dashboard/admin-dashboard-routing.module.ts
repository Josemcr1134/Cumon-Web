import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';

const routes: Routes = [
  {
    path:'',
    component: AdminDashboardComponent,
    children:[
      {
        path:'metrics',
        loadChildren: () => import('./metrics/metrics.module').then( s => s.MetricsModule)
      },
      {
        path:'zones',
        loadChildren: () => import('./zones/zones.module').then( s => s.ZonesModule)
      },

       {
         path:'users',
         loadChildren: () => import('./users/users.module').then( s => s.UsersModule)
       },
       {
         path:'logs',
         loadChildren: () => import('./activity/activity.module').then( s => s.ActivityModule)
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
export class AdminDashboardRoutingModule { }
