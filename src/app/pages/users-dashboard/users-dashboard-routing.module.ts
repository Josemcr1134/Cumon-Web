import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersDashboardComponent } from './users-dashboard.component';

const routes: Routes = [
  {
    path:'',
    component: UsersDashboardComponent,
    children:[
      {
        path:'services',
        loadChildren:() => import('./services/services.module').then( s => s.ServicesModule)
      },
      {
        path:'faqs',
        loadComponent:() => import('./faqs/faqs.component').then( s => s.FaqsComponent)
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
export class UsersDashboardRoutingModule { }
