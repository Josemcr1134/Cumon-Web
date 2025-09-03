import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ListComponent } from '../components/list/list.component';
import { NewComponent } from '../components/new/new.component';
import { AlertComponent } from '../../../../shared/alert/alert.component';
import { ZoneService } from '../../../../core/services/zone.services';
import Swal from 'sweetalert2';
import { LoaderComponent } from '../../../../shared/loader/loader.component';
import { PaginationComponent } from '../../../../shared/pagination/pagination.component';

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
    NewComponent,
    AlertComponent,
    LoaderComponent,
    PaginationComponent
  ],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css'
})
export class ManagementComponent implements OnInit {
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
  public zones: any[] = [];

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
  public isLoading: boolean = false;
  public page: number = 1;
  public pageSize: number = 10;
  public search: string = '';
  public totalItems: number = 0;
  constructor(private zoneSvc: ZoneService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getZones();
  }

  addZone(data: any) {
    this.isLoading = !this.isLoading;

    this.zoneSvc.createZone(data)
      .subscribe({
        error: (err: any) => {
          Swal.fire('Oooops', err.message, 'error');
          this.isLoading = !this.isLoading;
        },
        next: (resp: any) => {
          Swal.fire('Éxito', 'Zona generada', 'success');
          this.isLoading = !this.isLoading;
          this.zoneSelected = null;

          this.showNewZoneForm = false;
          this.getZones();
        }
      });
  };

  updateZone(data: any) {

    this.zoneSvc.updateZone({ id: this.zoneSelected.id, ...data })
      .subscribe({
        error: (err: any) => {
          Swal.fire('Oooops', err.message, 'error');
        },
        next: (resp: any) => {
          Swal.fire('Éxito', 'Zona Actualizada', 'success');
          this.zoneSelected = null;
          this.showNewZoneForm = false;
        }
      });
  };

  getZones() {
    this.isLoading = !this.isLoading;
    this.zoneSvc.getZones(this.page, this.pageSize, this.search)
      .subscribe({
        error: (err: any) => {
          this.isLoading = !this.isLoading;

        },
        next: (resp: any) => {
          console.log(resp)
          this.zones = resp.data.results;
          this.totalItems = resp.data.pageCount * this.pageSize;
          this.isLoading = !this.isLoading;
        }
      });
  };

  onPage(p: number) {
    if (p === this.page) return;
    this.page = p;
    this.getZones();
  };

  onPageSize(ps: number) {
    if (ps === this.pageSize) return;
    this.pageSize = ps;
    this.page = 1;   // al cambiar tamaño, vuelve al inicio
    this.getZones();
  };

  onSubmit(event: any) {
    const dataToSave = {
      name: event.name,
      cityId: event.city,
      description: event.description,
      geographicPoints: event.geographicPoints.map((e: any) => {
        return {
          name: e.name,
          latitude: e.latitude,
          longitude: e.longitude,
          id: e.id
        }
      })
    };

    if (this.zoneSelected !== null) {
      this.updateZone(dataToSave);
    } else {
      this.addZone(dataToSave)
    };

  }

  /**
   * Selecciona una zona para edición
   * @method
   * @param {Object} z - Zona seleccionada
   */
  selectZone(z: any) {
    this.zoneSvc.getZoneById(z.id)
      .subscribe({
        error: (err: any) => {
          console.log(err)
        },
        next: (resp: any) => {
          this.zoneSelected = resp.data;
          this.showNewZoneForm = true;
        }
      });
  };

  /**
   * Prepara el componente para crear una nueva zona
   * @method
   */
  newZone() {
    this.zoneSelected = null;
    this.showNewZoneForm = true;
  }
}
