import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * Rutas del módulo de usuarios
 * @type {Routes}
 *
 * @description
 * Configuración de rutas para el módulo de usuarios:
 * - Ruta principal carga el componente de gestión de usuarios de forma lazy
 */
const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./manage/manage.component').then(m => m.ManageComponent)
  }
];

/**
 * Módulo de routing para la funcionalidad de usuarios
 *
 * @NgModule
 *
 * @description
 * Configura y exporta las rutas específicas para el módulo de usuarios,
 * implementando carga lazy del componente principal para mejor performance.
 *
 * @example
 * // En el módulo principal de usuarios:
 * @NgModule({
 *   imports: [UsersRoutingModule]
 * })
 * export class UsersModule {}
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
