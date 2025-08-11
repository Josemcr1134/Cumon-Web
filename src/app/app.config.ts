import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

/**
 * Configuración principal de la aplicación Angular
 *
 * @description
 * Este objeto define los proveedores fundamentales para la aplicación:
 * - Configuración de detección de cambios de Zone.js
 * - Enrutador principal con las rutas definidas
 * - Cliente HTTP para peticiones a APIs
 *
 * @type {ApplicationConfig}
 *
 * @example
 * bootstrapApplication(AppComponent, appConfig)
 *   .catch(err => console.error(err));
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Configura Zone.js para optimizar la detección de cambios
    provideZoneChangeDetection({
      eventCoalescing: true  // Combina eventos similares para mejor rendimiento
    }),

    // Provee el enrutador con las rutas definidas
    provideRouter(routes),

    // Provee el cliente HTTP para realizar peticiones
    provideHttpClient()
  ]
};
