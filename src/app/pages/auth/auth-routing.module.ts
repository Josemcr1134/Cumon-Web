import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadComponent: () => import('./main/main.component').then( m => m.MainComponent),
    children:[
      {
        path:'login',
        loadComponent: () => import('./login/login.component').then(a => a.LoginComponent)
      },
      {
        path:'register',
        loadComponent: () => import('./register/register.component').then(a => a.RegisterComponent)
      },
      {
        path:'send-recover-email',
        loadComponent: () => import('./send-recover-email/send-recover-email.component').then(a => a.SendRecoverEmailComponent)
      },
      {
        path:'set-new-password',
        loadComponent: () => import('./set-new-password/set-new-password.component').then(a => a.SetNewPasswordComponent)
      },
      {
        path:'**',
        redirectTo:'login',
        pathMatch:'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
