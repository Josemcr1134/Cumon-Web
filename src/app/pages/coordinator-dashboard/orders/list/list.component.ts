import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OrdersService } from '../../../../core/services/orders.service';
import { LoaderComponent } from '../../../../shared/loader/loader.component';
import { PaginationComponent } from '../../../../shared/pagination/pagination.component';
import { UsersService } from '../../../../core/services/users.service';
import { ZoneService } from '../../../../core/services/zone.services';
import Swal from 'sweetalert2';
import { AssignDeliveryComponent } from '../assign-delivery/assign-delivery.component';

/**
 * Component for managing and displaying shipping orders
 * @Component
 * @selector app-list
 *
 * @description
 * Provides functionality to:
 * - List and filter shipping orders
 * - View delivery evidence
 * - Assign couriers to pending orders
 * - View courier details
 * - Track order status
 *
 * @example
 * <app-list></app-list>
 */
@Component({
  selector: 'app-list',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LoaderComponent,
    PaginationComponent,
    AssignDeliveryComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  /**
   * Sample shipping orders data
   * @type {Array<{
   *   id: number,
   *   fecha: string,
   *   procedencia: string,
   *   destino: string,
   *   nombreDestinatario: string,
   *   mercancia: string,
   *   ciudad: string,
   *   estado: string,
   *   remitente: string,
   *   repartidor?: {
   *     id: number,
   *     nombre: string,
   *     telefono: string,
   *     vehiculo: {
   *       tipo: string,
   *       placa: string,
   *       marca: string,
   *       modelo: string
   *     }
   *   },
   *   evidencias?: Array<{
   *     tipo: string,
   *     url: string,
   *     fechaHora: string,
   *     descripcion?: string
   *   }>
   * }>}
   */

  public data: any[] = [

  ];
  showMobileFilters: boolean = false;

  /**
   * Current search term for filtering orders
   * @type {string}
   * @default ''
   */
  searchTerm: string = '';

  /**
   * Filtered orders based on search term
   * @type {Array}
   */

  /**
   * List of available couriers
   * @type {Array<{
   *   id: number,
   *   nombre: string,
   *   tipoIdentificacion: string,
   *   identificacion: string,
   *   telefono: string,
   *   email: string,
   *   vehiculo: {
   *     tipo: string,
   *     placa: string,
   *     marca: string,
   *     modelo: string
   *   },
   *   certificaciones: string[],
   *   estado: string,
   *   ultimoServicio: Date,
   *   fechaIngreso: Date
   * }>}
   */
  deliveries: any = [];


  /**
   * Currently selected courier for assignment
   * @type {any}
   * @default null
   */
  selectedDelivery: any = null;

  /**
   * Currently selected order for courier assignment
   * @type {any}
   * @default null
   */
  orderSelected: any = null;

  /**
   * Controls visibility of evidence modal
   * @type {boolean}
   * @default false
   */
  evidenciasModalVisible = false;

  /**
   * Evidence items to display in modal
   * @type {Array}
   * @default []
   */
  evidenciasSeleccionadas: any[] = [];

  /**
   * Detailed view of a courier
   * @type {any}
   * @default null
   */
  deliveryDetail: any = null;

  constructor(private orderSvc: OrdersService, private usersSvc: UsersService, private zonesSvc: ZoneService) { }
  /**
   * Filters orders based on search term
   * @method
   * @description
   * Searches across multiple order fields:
   * - Date, origin, destination, recipient
   * - Package type, city, status, sender
   */

  public totalItems: number = 0;
  public page: number = 1;
  public pageSize: number = 10;
  public zoneId: any = null;
  public messengerId: any = null;
  public startDate: string = "";
  public endDate: string = "";
  public search: string = "";
  public orderStatus: any = null;
  public isLoading: boolean = false;
  public zones: any[] = [];
  public statusList: any[] = [
    {
      id: 1,
      label: 'Pendiente de asignación'
    },
    {
      id: 2,
      label: 'Conductor Asignado'
    },
    {
      id: 3,
      label: 'En Curso'
    },
    {
      id: 4,
      label: 'Entregado'
    },
    {
      id: 5,
      label: 'Cancelado'
    },
    {
      id: 6,
      label: 'Entrega Fallída'
    },
  ];

  ngOnInit(): void {
    this.getZones();
    this.getDeliveries();
    this.filterTable();
  };

  filterTable() {
    this.isLoading = !this.isLoading;

    const data = {
      page: this.page,
      pageSize: this.pageSize,
      areaId: this.zoneId,
      messengerId: this.messengerId,
      startDate: this.startDate,
      endDate: this.endDate,
      search: this.search,
      orderStatus: this.orderStatus
    };

    this.orderSvc.getOrders(data)
      .subscribe({
        error: (err: any) => {
          this.isLoading = !this.isLoading;
        },
        next: (resp: any) => {
          this.isLoading = !this.isLoading;
          this.data = resp.data.results;
          this.totalItems = resp.data.pageCount * this.pageSize;
        }
      });
  };

  cleanFilters() {
    this.zoneId = null;
    this.messengerId = null;
    this.startDate = '';
    this.endDate = '';
    this.search = '';
    this.orderStatus = null;
    this.filterTable();
  };

  onPage(p: number) {
    if (p === this.page) return;
    this.page = p;
    this.filterTable();
  };

  onPageSize(ps: number) {
    if (ps === this.pageSize) return;
    this.pageSize = ps;
    this.page = 1;   // al cambiar tamaño, vuelve al inicio
    this.filterTable();
  };

  getZones() {
    this.zonesSvc.getZones(1, 100, '')
      .subscribe({
        error: (err: any) => {
          console.log(err);
        },
        next: (resp: any) => {
          this.zones = resp.data.results;
        }
      });
  };

  getDeliveries() {
    this.usersSvc.getUsers(1, 100, 4, '', '')
      .subscribe({
        error: (err: any) => {
          console.log(err);
        },
        next: (resp: any) => {
          this.deliveries = resp.data.results;
        }
      });
  };

  /**
   * Opens modal with delivery evidence
   * @method
   * @param envio Order containing evidence to display
   */
  mostrarEvidencias(envio: any) {
    if (envio.estado === 'Entregada' && envio.evidencias) {
      this.evidenciasSeleccionadas = envio.evidencias;
      this.evidenciasModalVisible = true;
    }
  }

  /**
   * Closes evidence modal
   * @method
   */
  cerrarEvidencias() {
    this.evidenciasModalVisible = false;
    this.evidenciasSeleccionadas = [];
  }

  /**
   * Gets available couriers for assignment
   * @method
   * @returns {Array} Filtered and sorted list of available couriers
   * @description
   * Prioritizes couriers with fewer recent deliveries
   */
  getRepartidoresDisponibles() {
    return this.deliveries.filter((rep: any) =>
      rep.estado === 'active' || rep.estado === 'on_delivery'
    ).sort((a: any, b: any) => {
      return a.ultimoServicio.getTime() - b.ultimoServicio.getTime();
    });
  }

  /**
   * Selects an order for courier assignment
   * @method
   * @param envio Order to assign courier to
   */
  seleccionarEnvioParaAsignar(envio: any) {
    if (envio.status === 'PendingDriverAssignment') {
      this.orderSelected = envio;
      this.selectedDelivery = null;
    }
  }


  /**
   * Shows detailed view of a courier
   * @method
   * @param repartidor Courier to display
   */
  mostrarDetalleRepartidor(repartidor: any) {
    this.deliveryDetail = this.deliveries.find((r: any) => r.id === repartidor.id) || repartidor;
  }

  closeAssignModal(event: boolean) {
    this.orderSelected = null;
    this.selectedDelivery = null;
    this.filterTable();
  };

}
