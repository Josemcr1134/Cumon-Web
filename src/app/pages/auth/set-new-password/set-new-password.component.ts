import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../../shared/loader/loader.component';

@Component({
  selector: 'app-set-new-password',
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    LoaderComponent
  ],
  templateUrl: './set-new-password.component.html',
  styleUrl: './set-new-password.component.css'
})
export class SetNewPasswordComponent {

  public newPassword: string = '';
  public currentPassword: string = '';
  public isLoading: boolean = false;
  public isRecover: string | null = null;

  constructor(private authSvc: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: any) => {
      this.isRecover = params.isRecover;
    });
  };

  onSubmit() {
    if (this.isRecover == '0') {
      this.setFirstPassword()
    } else {

    }
  }

  setFirstPassword() {
    const data = {
      email: sessionStorage.getItem('tempMail'),
      password: this.currentPassword,
      newPassword: this.newPassword
    };
    this.isLoading = !this.isLoading
    this.authSvc.login(data)
      .subscribe({
        error: (err: any) => {
          this.isLoading = !this.isLoading
          Swal.fire('Oooops', err.error.message, 'error');
        },
        next: (resp: any) => {
          Swal.fire('Éxito', 'Contraseña actualizada', 'success')
          this.isLoading = !this.isLoading
          this.router.navigateByUrl('/auth');
        }
      });
  };
}
