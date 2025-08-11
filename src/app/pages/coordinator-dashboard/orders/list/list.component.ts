import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
    RouterModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
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

  public data = [
    {
      idPedido: 'PED-2023-001',
      orden: 'ORD-1001',
      fecha: new Date('2023-05-15'),
      tipo: 'Caja',
      cantidad: 2,
      valor: 125.50,
      ruta: 'Ruta Norte',
      direccion: 'Calle 123 #45-67',
      ciudad: 'Bogotá',
      conductor: {
        id: 'C001',
        nombre: 'Juan Pérez' ,
        "vehiculo": {
          "tipo": "Motocicleta",
          "placa": "ABC123",
          "marca": "Honda",
          "modelo": "CB190"
        }
      },
      estado: 'Entregada',
      pdf: 'comprobante-ped-001.pdf',
      observaciones: 'Fragil, manejar con cuidado'
    },
    {
      idPedido: 'PED-2023-002',
      orden: 'ORD-1002',
      fecha: new Date('2023-05-16'),
      tipo: 'Sobre',
      cantidad: 1,
      valor: 35.00,
      ruta: 'Ruta Centro',
      direccion: 'Avenida Principal #12-34',
      ciudad: 'Medellín',
      conductor: null,
      estado: 'Pendiente',
      pdf: null,
      observaciones: 'Documentos importantes'
    },
    {
      idPedido: 'PED-2023-003',
      orden: 'ORD-1003',
      fecha: new Date('2023-05-17'),
      tipo: 'Bolsa',
      cantidad: 5,
      valor: 80.75,
      ruta: 'Ruta Sur',
      direccion: 'Carrera 56 #78-90',
      ciudad: 'Cali',
      conductor: {
        id: 'C001',
        nombre: 'Juan Pérez' ,
        "vehiculo": {
          "tipo": "Motocicleta",
          "placa": "ABC123",
          "marca": "Honda",
          "modelo": "CB190"
        }
      },
      estado: 'En curso',
      pdf: null,
      observaciones: 'Ropa deportiva'
    },
    {
      idPedido: 'PED-2023-004',
      orden: 'ORD-1004',
      fecha: new Date('2023-05-18'),
      tipo: 'Caja',
      cantidad: 3,
      valor: 210.00,
      ruta: 'Ruta Este',
      direccion: 'Diagonal 23 #45-67',
      ciudad: 'Barranquilla',
      conductor: null,
      estado: 'Cancelado',
      pdf: null,
      observaciones: 'Cancelado por cliente'
    },
    {
      idPedido: 'PED-2023-005',
      orden: 'ORD-1005',
      fecha: new Date('2023-05-19'),
      tipo: 'Bolsa',
      cantidad: 2,
      valor: 45.50,
      ruta: 'Ruta Oeste',
      direccion: 'Transversal 34 #56-78',
      ciudad: 'Cartagena',
        conductor: {
        id: 'C001',
        nombre: 'Juan Pérez' ,
        "vehiculo": {
          "tipo": "Motocicleta",
          "placa": "ABC123",
          "marca": "Honda",
          "modelo": "CB190"
        }
      },
      estado: 'Entregada',
      pdf: 'comprobante-ped-005.pdf',
      observaciones: 'Alimentos perecederos'
    }
  ];
  showMobileFilters:boolean = false;

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
  filteredEnvios: any[] = this.data;

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
  repartidores  = [
    {
      id: 1,
      nombre: 'Juan Pérez',
      tipoIdentificacion: 'CC',
      identificacion: '123456789',
      telefono: '3001234567',
      email: 'juan@cumon.com',
      vehiculo: {
        tipo: 'Motocicleta',
        placa: 'ABC123',
        marca: 'Honda',
        modelo: 'CB190'
      },
      certificaciones: ['Primeros Auxilios', 'Manejo de Muestras'],
      estado: 'active',
      ultimoServicio: new Date('2023-05-15'),
      fechaIngreso: new Date('2022-01-10')
    },
    {
      id: 2,
      nombre: 'María Gómez',
      tipoIdentificacion: 'CC',
      identificacion: '987654321',
      telefono: '3107654321',
      email: 'maria@cumon.com',
      vehiculo: {
        tipo: 'Automóvil',
        placa: 'XYZ789',
        marca: 'Hyundai',
        modelo: 'Tucson'
      },
      certificaciones: ['Primeros Auxilios', 'Cadena de Frío', 'BPM'],
      estado: 'on_delivery',
      ultimoServicio: new Date('2023-05-20'),
      fechaIngreso: new Date('2021-11-15')
    },
    {
      id: 3,
      nombre: 'Carlos Rojas',
      tipoIdentificacion: 'CE',
      identificacion: 'PA123456',
      telefono: '3204567890',
      email: 'carlos@cumon.com',
      vehiculo: {
        tipo: 'Motocicleta',
        placa: 'DEF456',
        marca: 'Yamaha',
        modelo: 'FZ 2.0'
      },
      certificaciones: ['Manejo de Muestras'],
      estado: 'inactive',
      ultimoServicio: new Date('2023-04-30'),
      fechaIngreso: new Date('2023-02-01')
    }
  ];


  /**
   * Currently selected courier for assignment
   * @type {any}
   * @default null
   */
  selectedRepartidor: any = null;

  /**
   * Currently selected order for courier assignment
   * @type {any}
   * @default null
   */
  envioSeleccionado: any = null;

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
  repartidorDetalle: any = null;

  /**
   * Filters orders based on search term
   * @method
   * @description
   * Searches across multiple order fields:
   * - Date, origin, destination, recipient
   * - Package type, city, status, sender
   */
  filterTable() {
    if (!this.searchTerm) {
      this.filteredEnvios = this.data;
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredEnvios = this.data.filter(envio =>
      envio.ciudad.toLowerCase().includes(searchTermLower) ||
      envio.estado.toLowerCase().includes(searchTermLower)
    );
  }

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
    return this.repartidores.filter(rep =>
      rep.estado === 'active' || rep.estado === 'on_delivery'
    ).sort((a, b) => {
      return a.ultimoServicio.getTime() - b.ultimoServicio.getTime();
    });
  }

  /**
   * Selects an order for courier assignment
   * @method
   * @param envio Order to assign courier to
   */
  seleccionarEnvioParaAsignar(envio: any) {
    if (envio.estado === 'Pendiente') {
      this.envioSeleccionado = envio;
      this.selectedRepartidor = null;
    }
  }

  /**
   * Assigns selected courier to order
   * @method
   * @description
   * Updates order status and courier information
   */
  asignarRepartidor() {
    if (this.envioSeleccionado && this.selectedRepartidor) {
      // Update order status
      this.envioSeleccionado.estado = 'En curso';

      // Save complete courier info
      this.envioSeleccionado.repartidor = {
        id: this.selectedRepartidor.id,
        nombre: this.selectedRepartidor.nombre,
        telefono: this.selectedRepartidor.telefono,
        vehiculo: this.selectedRepartidor.vehiculo
      };

      // Update courier status
      this.selectedRepartidor.estado = 'on_delivery';
      this.selectedRepartidor.ultimoServicio = new Date();

      // Reset selection
      this.envioSeleccionado = null;
      this.selectedRepartidor = null;
    }
  }

  /**
   * Cancels courier assignment process
   * @method
   */
  cancelarAsignacion() {
    this.envioSeleccionado = null;
    this.selectedRepartidor = null;
  }

  /**
   * Translates courier status for display
   * @method
   * @param estado Status code
   * @returns {string} Formatted status text
   */
  getEstadoRepartidor(estado: string): string {
    switch(estado) {
      case 'active': return 'Disponible';
      case 'on_delivery': return 'En entrega';
      case 'inactive': return 'Inactivo';
      default: return estado;
    }
  }

  /**
   * Shows detailed view of a courier
   * @method
   * @param repartidor Courier to display
   */
  mostrarDetalleRepartidor(repartidor: any) {
    this.repartidorDetalle = this.repartidores.find(r => r.id === repartidor.id) || repartidor;
  }
}
