import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListComponent } from '../components/list/list.component';
import { NewComponent } from '../components/new/new.component';

/**
 * Componente para la gestión de zonas geográficas
 *
 * @Component
 * @selector app-management
 *
 * @description
 * Este componente permite:
 * - Visualizar el listado de zonas geográficas disponibles
 * - Agregar nuevas zonas con sus puntos geográficos
 * - Seleccionar zonas existentes para edición
 *
 * @example
 * <app-management></app-management>
 */
@Component({
  selector: 'app-management',
  standalone: true,
  imports: [
    CommonModule,
    ListComponent,
    NewComponent
  ],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css'
})
export class ManagementComponent {
  /**
   * Controla la visualización del formulario de nueva zona
   * @type {boolean}
   * @default false
   */
  public showNewZoneForm: boolean = false;

  /**
   * Listado de zonas geográficas con sus puntos de referencia
   * @type {Array<{
   *   name: string,
   *   city: string,
   *   geographic_points: Array<{
   *     name: string,
   *     coordinates: [number, number]
   *   }>
   * }>}
   */
  public zones = [
    {
      "name": "Andina - Bogotá",
      "city": "Bogotá",
      "geographic_points": [
        {
          "name": "Cerro de Monserrate",
          "coordinates": [4.6047, -74.0657]
        },
        {
          "name": "Parque Simón Bolívar",
          "coordinates": [4.6573, -74.0937]
        },
        {
          "name": "Salto del Tequendama",
          "coordinates": [4.4669, -74.2956]
        }
      ]
    },
    {
      "name": "Caribe - Cartagena",
      "city": "Cartagena",
      "geographic_points": [
        {
          "name": "Castillo San Felipe",
          "coordinates": [10.4236, -75.5363]
        },
        {
          "name": "Playa Blanca (Barú)",
          "coordinates": [10.1978, -75.7407]
        },
        {
          "name": "Volcán del Totumo",
          "coordinates": [10.7389, -75.2386]
        }
      ]
    },
    {
      "name": "Pacífico - Buenaventura",
      "city": "Buenaventura",
      "geographic_points": [
        {
          "name": "Bahía Málaga",
          "coordinates": [3.8833, -77.2833]
        },
        {
          "name": "Playa La Barra",
          "coordinates": [3.9206, -77.3614]
        }
      ]
    },
    {
      "name": "Amazonía - Leticia",
      "city": "Leticia",
      "geographic_points": [
        {
          "name": "Parque Amacayacu",
          "coordinates": [-3.8167, -70.2667]
        },
        {
          "name": "Lagos de Tarapoto",
          "coordinates": [-3.7833, -70.3833]
        }
      ]
    },
    {
      "name": "Eje Cafetero - Armenia",
      "city": "Armenia",
      "geographic_points": [
        {
          "name": "Valle del Cocora",
          "coordinates": [4.6372, -75.4928]
        },
        {
          "name": "Parque del Café",
          "coordinates": [4.5389, -75.7675]
        }
      ]
    }
  ];

  /**
   * Zona geográfica actualmente seleccionada
   * @type {any}
   * @default null
   */
  public zoneSelected: any = null;

  /**
   * Agrega una nueva zona al listado
   * @method
   * @param {Object} event - Datos de la nueva zona
   * @param {string} event.nameZone - Nombre de la zona
   * @param {string} event.city - Ciudad principal
   * @param {Array} event.geographicPoints - Puntos geográficos
   */
  addZone(event: any) {
    const dataToSave = {
      name: event.nameZone,
      city: event.city,
      geographic_points: event.geographicPoints.map((e: any) => {
        return {
          name: e.name,
          coordinates: [e.latitud, e.longitud]
        }
      })
    };
    this.showNewZoneForm = false;
    this.zones.push(dataToSave);
  }

  /**
   * Selecciona una zona para edición
   * @method
   * @param {Object} z - Zona seleccionada
   */
  selectZone(z: any) {
    this.zoneSelected = z;
    this.showNewZoneForm = true;
  }

  /**
   * Prepara el componente para crear una nueva zona
   * @method
   */
  newZone() {
    this.zoneSelected = null;
    this.showNewZoneForm = true;
  }
}
