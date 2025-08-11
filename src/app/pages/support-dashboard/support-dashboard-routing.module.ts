import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadComponent: () => import('./support-dashboard.component').then( s => s.SupportDashboardComponent),
    children:[
      {
        path:'logs',
        loadChildren:() => import('../admin-dashboard/activity/activity.module').then( l => l.ActivityModule)
      },
      {
        path:'**',
        redirectTo:'logs',
        pathMatch:'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportDashboardRoutingModule { }
