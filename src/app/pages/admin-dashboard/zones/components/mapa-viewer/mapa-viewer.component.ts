import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

/**
 * Interface para representar un punto geográfico en el mapa
 */
interface GeographicPoint {
  name: string;
  latitude: number;
  longitude: number;
}

/**
 * Componente para visualizar puntos geográficos en un mapa estático
 *
 * @Component
 * @selector app-mapa-viewer
 *
 * @description
 * Muestra un mapa estático con marcadores para los puntos geográficos proporcionados.
 * Utiliza la API de Google Maps Static y muestra una lista de los puntos debajo del mapa.
 *
 * @example
 * <app-mapa-viewer
 *   [geographicPoints]="pointsArray">
 * </app-mapa-viewer>
 */
@Component({
  selector: 'app-mapa-viewer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mt-4 border rounded-lg overflow-hidden">
      <div *ngIf="!geographicPoints?.length" class="p-4 bg-gray-100 text-center">
        No hay puntos para mostrar
      </div>
      <div *ngIf="geographicPoints?.length">
        <img
          [src]="mapUrl"
          alt="Mapa de ubicaciones"
          class="w-full h-96 object-cover"
          (error)="handleImageError()"
        >
        <div class="p-3 bg-white grid grid-cols-1 md:grid-cols-3 gap-2">
          <div *ngFor="let punto of geographicPoints" class="border-b pb-2">
            <h3 class="font-bold text-sm">{{ punto.name }}</h3>
            <p class="text-xs text-gray-600">
              Lat: {{ punto.latitude }},
              Lng: {{ punto.longitude }}
            </p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class MapaViewerComponent implements OnChanges {
  /**
   * Array de puntos geográficos a mostrar en el mapa
   * @input
   * @type {GeographicPoint[]}
   * @default []
   */
  @Input() geographicPoints: GeographicPoint[] = [];

  /**
   * URL generada para el mapa estático de Google
   * @type {string}
   * @default ''
   */
  mapUrl: string = '';

  /**
   * Coordenadas por defecto (Bogotá) cuando no hay puntos
   * @type {[number, number]}
   * @private
   */
  private defaultCenter = [4.6097, -74.0817]; // Bogotá como centro por defecto

  /**
   * Maneja cambios en los inputs del componente
   * @method
   * @param changes Objeto con los cambios detectados
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['geographicPoints'] && this.geographicPoints?.length) {
      this.generateMapUrl();
    } else {
      this.mapUrl = '';
    }

    console.log(this.geographicPoints)
  }

  /**
   * Genera la URL para el mapa estático de Google Maps
   * @method
   * @private
   * @description
   * Construye la URL con:
   * - Centro en el primer punto o ubicación por defecto
   * - Marcadores para todos los puntos (máximo 10)
   * - Zoom adecuado según cantidad de puntos
   */
  private generateMapUrl(): void {
    try {
      const centerPoint = this.geographicPoints[0] || {
        latitud: this.defaultCenter[0],
        longitud: this.defaultCenter[1]
      };

      const markers = this.geographicPoints
        .slice(0, 10) // Limitar a 10 marcadores (límite de la API)
        .map(p => `color:red|${p.latitude},${p.longitude}`)
        .join('&markers=');

      this.mapUrl = `
        https://maps.googleapis.com/maps/api/staticmap?
        center=${centerPoint.latitude},${centerPoint.longitude}&
        zoom=10&
        size=800x400&
        markers=${markers}&
        scale=2&
        key=AIzaSyC5D8ZetaiD8Te_WBnjQNIXAwijY_Zfvgs
      `.replace(/\s/g, '');
    } catch (error) {
      console.error('Error generating map URL:', error);
      this.mapUrl = '';
    }
  }

  /**
   * Determina el nivel de zoom adecuado según la cantidad de puntos
   * @method
   * @private
   * @param pointCount Cantidad de puntos geográficos
   * @returns {number} Nivel de zoom recomendado
   */
  private getZoomLevel(pointCount: number): number {
    if (pointCount === 1) return 14;
    if (pointCount <= 3) return 12;
    if (pointCount <= 5) return 11;
    return 10;
  }

  /**
   * Maneja errores al cargar la imagen del mapa
   * @method
   */
  handleImageError(): void {
    console.warn('Error al cargar el mapa estático');
    this.mapUrl = '';
  }
}
