import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin-login/admin-login.component').then(a => a.AdminLoginComponent)
  },
  {
    path: 'platform',
    loadComponent: () => import('./main/main.component').then(m => m.MainComponent),
    children: [
      {
        path: 'register',
        loadComponent: () => import('./register/register.component').then(a => a.RegisterComponent)
      },
      {
        path: 'send-recover-email',
        loadComponent: () => import('./send-recover-email/send-recover-email.component').then(a => a.SendRecoverEmailComponent)
      },
      {
        path: 'set-new-password/:isRecover',
        loadComponent: () => import('./set-new-password/set-new-password.component').then(a => a.SetNewPasswordComponent)
      },
      {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
