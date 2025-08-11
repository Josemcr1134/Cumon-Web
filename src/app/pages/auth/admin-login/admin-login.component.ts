import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

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
    FormsModule
  ],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  /**
   * Email del usuario para autenticación
   * @type {string}
   * @default ''
   *
   * @note
   * Actualmente se usa como campo simple para simular diferentes roles:
   * - 'admin' para acceso al dashboard de administrador
   * - 'coordinator' para acceso al dashboard de coordinador
   * - 'support' para acceso al área de soporte
   */
  public email: string = '';

  /**
   * Constructor del componente
   * @param router Servicio de Router de Angular para navegación
   */
  constructor(private router: Router) { }

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
    switch (this.email) {
      case 'admin':
        this.router.navigateByUrl('/admin-dashboard');
        break;
      case 'coordinator':
        this.router.navigateByUrl('/coordinator-dashboard');
        break;
      case 'support':
        this.router.navigateByUrl('/support-dashboard');
        break;
      default:
        // No se realiza navegación para valores no reconocidos
        break;
    }
  }
}
