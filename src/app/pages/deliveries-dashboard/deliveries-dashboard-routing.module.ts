import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveriesDashboardComponent } from './deliveries-dashboard.component';

const routes: Routes = [
  {
    path:'',
    component: DeliveriesDashboardComponent,
    children:[
      {
        path:'my-services',
        loadComponent: () => import('./my-services/my-services.component').then(m => m.MyServicesComponent)
      },
      {
        path:'**',
        redirectTo:'my-services',
        pathMatch:'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveriesDashboardRoutingModule { }
