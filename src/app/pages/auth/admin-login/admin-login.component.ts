import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LoaderComponent } from '../../../shared/loader/loader.component';

/**
 * Componente para el login de administradores y roles relacionados
 *
 * @Component
 * @selector app-admin-login
 *
 * @description
 * Este componente maneja el proceso de autenticación para diferentes roles:
 * - Administrador
 * - Coordinador
 * - Soporte
 *
 * @example
 * <app-admin-login></app-admin-login>
 */
@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    LoaderComponent
  ],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  /**
   * Email del usuario para autenticación
   * @type {string}
   * @default ''
   */
  public email: string = 'jhon98sanchez@gmail.com';
  /**
   * Contraseña del usuario para autenticación
   * @type {string}
   * @default ''
   */
  public password: string = 'newPassword1234';
  /**
   * Manejar el loader
   * @type {boolean}
   * @default false
   */
  public isLoading: boolean = false;

  /**
   * Constructor del componente
   * @param router Servicio de Router de Angular para navegación
   */
  constructor(private authSvc: AuthService, private router: Router) { }

  /**
   * Maneja el proceso de login basado en el email ingresado
   *
   * @method
   * @description
   * Redirige a diferentes dashboards según el valor del email:
   * - 'admin' → /admin-dashboard
   * - 'coordinator' → /coordinator-dashboard
   * - 'support' → /support
   *
   * @example
   * // Cuando email es 'admin'
   * component.email = 'admin';
   * component.login(); // Navegará a /admin-dashboard
   */
  login() {
    const data = {
      email: this.email,
      password: this.password
    };
    this.isLoading = !this.isLoading
    this.authSvc.login(data)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.isLoading = !this.isLoading

          sessionStorage.setItem('accessToken', res.data.accessToken);
          sessionStorage.setItem('refreshToken', res.data.refreshToken);
          // sessionStorage.setItem('role', res.role);
          // Redirigir según el rol del usuario
          this.router.navigateByUrl('/admin-dashboard');
        },
        error: (err) => {
          console.log(err);
          alert('Error en la autenticación. Verifique sus credenciales.');
          this.isLoading = !this.isLoading
        }
      });

    // switch (this.email) {
    //   case 'admin':
    //     this.router.navigateByUrl('/admin-dashboard');
    //     break;
    //   case 'coordinator':
    //     this.router.navigateByUrl('/coordinator-dashboard');
    //     break;
    //   case 'support':
    //     this.router.navigateByUrl('/support-dashboard');
    //     break;
    //   default:
    //     // No se realiza navegación para valores no reconocidos
    //     break;
    // }
  }
}
