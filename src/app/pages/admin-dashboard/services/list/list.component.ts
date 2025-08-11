import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * Component for displaying and managing shipping/delivery records
 *
 * @Component
 * @selector app-list
 *
 * @description
 * Provides functionality to:
 * - Display a list of shipping records
 * - Filter and search shipments
 * - Assign delivery personnel
 * - View delivery evidence
 * - Manage shipment status
 *
 * @example
 * <app-list></app-list>
 */
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  /**
   * Sample shipment data (in a real app, this would come from a service)
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
    // ... (shipment data remains the same)
  ];

  /**
   * Current search term for filtering shipments
   * @type {string}
   * @default ''
   */
  searchTerm: string = '';

  /**
   * Filtered list of shipments based on current search term
   * @type {Array}
   */
  filteredEnvios: any[] = this.data;

  /**
   * List of available delivery personnel
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
  repartidores = [
    // ... (delivery personnel data remains the same)
        {
      "id": 1,
      "fecha": "12-05-2025",
      "procedencia": "Calle 99c # 43 150",
      "destino": "Cra 53 # 82 242",
      "nombreDestinatario": "Carlos Mendoza",
      "mercancia": "Extra Grande",
      "ciudad": "Barranquilla",
      "estado": "Entregada",
      "remitente": "Pedro Martínez",
      "repartidor": {
        "id": 1,
        "nombre": "Juan Pérez",
        "telefono": "3001234567",
        "vehiculo": {
          "tipo": "Motocicleta",
          "placa": "ABC123",
          "marca": "Honda",
          "modelo": "CB190"
        }
      },
      "evidencias": [
        {
          "tipo": "firma",
          "url": "/assets/evidencias/firma-1.jpg",
          "fechaHora": "2025-05-12T14:30:00"
        },
        {
          "tipo": "foto",
          "url": "/assets/evidencias/entrega-1.jpg",
          "fechaHora": "2025-05-12T14:32:00",
          "descripcion": "Paquete entregado en recepción"
        }
      ]

    },
    {
      "id": 2,
      "fecha": "15-05-2025",
      "procedencia": "Av. 68 # 23 45",
      "destino": "Carrera 15 # 32 89",
      "nombreDestinatario": "María Rodríguez",
      "mercancia": "Grande",
      "ciudad": "Bogotá",
      "estado": "En curso",
      "remitente": "Juan Pérez",
      "repartidor": {
        "id": 2,
        "nombre": "María Gómez",
        "telefono": "3107654321",
        "vehiculo": {
          "tipo": "Automóvil",
          "placa": "XYZ789",
          "marca": "Hyundai",
          "modelo": "Tucson"
        }
      },

    },
    {
      "id": 3,
      "fecha": "18-05-2025",
      "procedencia": "Calle 10 # 5 67",
      "destino": "Diagonal 25 # 14 30",
      "nombreDestinatario": "José Gutiérrez",
      "mercancia": "Mediano",
      "ciudad": "Medellín",
      "estado": "Pendiente",
      "remitente": "Laura González"
    },
    {
      "id": 4,
      "fecha": "20-05-2025",
      "procedencia": "Carrera 7 # 40 12",
      "destino": "Av. Circunvalar # 62 50",
      "nombreDestinatario": "Ana Contreras",
      "mercancia": "Pequeño",
      "ciudad": "Cali",
      "estado": "Cancelado",
      "remitente": "Diego Sánchez"
    },
    {
      "id": 5,
      "fecha": "22-05-2025",
      "procedencia": "Calle 80 # 11 45",
      "destino": "Carrera 45 # 80 23",
      "nombreDestinatario": "Luisa Fernández",
      "mercancia": "Extra Grande",
      "ciudad": "Cartagena",
      "estado": "Entregada",
      "remitente": "Sofía Ramírez",
      "repartidor": {
        "id": 1,
        "nombre": "Juan Pérez",
        "telefono": "3001234567",
        "vehiculo": {
          "tipo": "Motocicleta",
          "placa": "ABC123",
          "marca": "Honda",
          "modelo": "CB190"
        }
      },
          "evidencias": [
        {
          "tipo": "firma",
          "url": "/assets/evidencias/firma-1.jpg",
          "fechaHora": "2025-05-12T14:30:00"
        },
        {
          "tipo": "foto",
          "url": "/assets/evidencias/entrega-1.jpg",
          "fechaHora": "2025-05-12T14:32:00",
          "descripcion": "Paquete entregado en recepción"
        }
      ]
    },
    {
      "id": 6,
      "fecha": "25-05-2025",
      "procedencia": "Carrera 20 # 35 10",
      "destino": "Calle 45 # 22 15",
      "nombreDestinatario": "Andrés López",
      "mercancia": "Grande",
      "ciudad": "Bucaramanga",
      "estado": "En curso",
      "remitente": "Camila Torres",
      "repartidor": {
        "id": 2,
        "nombre": "María Gómez",
        "telefono": "3107654321",
        "vehiculo": {
          "tipo": "Automóvil",
          "placa": "XYZ789",
          "marca": "Hyundai",
          "modelo": "Tucson"
        }
      }
    },
    {
      "id": 7,
      "fecha": "28-05-2025",
      "procedencia": "Av. 30 # 12 34",
      "destino": "Carrera 10 # 5 67",
      "nombreDestinatario": "Daniel Castro",
      "mercancia": "Mediano",
      "ciudad": "Pereira",
      "estado": "Pendiente",
      "remitente": "Ricardo Mendez"
    },
    {
      "id": 8,
      "fecha": "30-05-2025",
      "procedencia": "Calle 15 # 8 90",
      "destino": "Diagonal 40 # 25 60",
      "nombreDestinatario": "Patricia Ruiz",
      "mercancia": "Pequeño",
      "ciudad": "Santa Marta",
      "estado": "Entregada",
      "remitente": "Oscar Jiménez",
      "repartidor": {
        "id": 1,
        "nombre": "Juan Pérez",
        "telefono": "3001234567",
        "vehiculo": {
          "tipo": "Motocicleta",
          "placa": "ABC123",
          "marca": "Honda",
          "modelo": "CB190"
        }
      },
      "evidencias": [
        {
          "tipo": "firma",
          "url": "/assets/evidencias/firma-1.jpg",
          "fechaHora": "2025-05-12T14:30:00"
        },
        {
          "tipo": "foto",
          "url": "/assets/evidencias/entrega-1.jpg",
          "fechaHora": "2025-05-12T14:32:00",
          "descripcion": "Paquete entregado en recepción"
        }
      ]
    },
    {
      "id": 9,
      "fecha": "02-06-2025",
      "procedencia": "Carrera 50 # 70 12",
      "destino": "Av. 80 # 45 30",
      "nombreDestinatario": "Fernando Herrera",
      "mercancia": "Extra Grande",
      "ciudad": "Manizales",
      "estado": "Cancelado",
      "remitente": "Adriana Silva"
    },
    {
      "id": 10,
      "fecha": "05-06-2025",
      "procedencia": "Calle 25 # 18 42",
      "destino": "Carrera 30 # 25 15",
      "nombreDestinatario": "Gabriela Morales",
      "mercancia": "Grande",
      "ciudad": "Cúcuta",
      "estado": "En curso",
      "remitente": "Hugo Rojas",
      "repartidor": {
        "id": 3,
        "nombre": "Carlos Rojas",
        "telefono": "3204567890",
        "vehiculo": {
          "tipo": "Motocicleta",
          "placa": "DEF456",
          "marca": "Yamaha",
          "modelo": "FZ 2.0"
        }
      }
    }
  ];

  /**
   * Currently selected delivery personnel for assignment
   * @type {any}
   * @default null
   */
  selectedRepartidor: any = null;

  /**
   * Currently selected shipment for assignment
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
   * Evidence items currently displayed in modal
   * @type {Array}
   * @default []
   */
  evidenciasSeleccionadas: any[] = [];

  /**
   * Detailed view of a delivery person
   * @type {any}
   * @default null
   */
  repartidorDetalle: any = null;

  /**
   * Filters shipments based on current search term
   * @method
   */
  filterTable() {
    if (!this.searchTerm) {
      this.filteredEnvios = this.data;
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredEnvios = this.data.filter((envio:any) =>
      envio.fecha.toLowerCase().includes(searchTermLower) ||
      envio.procedencia.toLowerCase().includes(searchTermLower) ||
      envio.destino.toLowerCase().includes(searchTermLower) ||
      envio.nombreDestinatario.toLowerCase().includes(searchTermLower) ||
      envio.mercancia.toLowerCase().includes(searchTermLower) ||
      envio.ciudad.toLowerCase().includes(searchTermLower) ||
      envio.estado.toLowerCase().includes(searchTermLower) ||
      envio.remitente.toLowerCase().includes(searchTermLower)
    );
  }

  /**
   * Displays evidence modal for a completed shipment
   * @method
   * @param envio Shipment containing evidence to display
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
   * Gets list of available delivery personnel
   * @method
   * @returns {Array} Filtered and sorted list of available delivery personnel
   */
  getRepartidoresDisponibles() {
    return this.repartidores.filter((rep:any) =>
      rep.estado === 'active' || rep.estado === 'on_delivery'
    ).sort((a:any, b:any) => {
      // Priorizar repartidores con menos entregas recientes
      return a.ultimoServicio.getTime() - b.ultimoServicio.getTime();
    });
  }



  /**
   * Selects a shipment for delivery personnel assignment
   * @method
   * @param envio Shipment to be assigned
   */
  seleccionarEnvioParaAsignar(envio: any) {
    if (envio.estado === 'Pendiente') {
      this.envioSeleccionado = envio;
      this.selectedRepartidor = null;
    }
  }

  /**
   * Assigns selected delivery personnel to shipment
   * @method
   */
  asignarRepartidor() {
    if (this.envioSeleccionado && this.selectedRepartidor) {
      // Update shipment status
      this.envioSeleccionado.estado = 'En curso';

      // Save complete delivery personnel info
      this.envioSeleccionado.repartidor = {
        id: this.selectedRepartidor.id,
        nombre: this.selectedRepartidor.nombre,
        telefono: this.selectedRepartidor.telefono,
        vehiculo: this.selectedRepartidor.vehiculo
      };

      // Update delivery personnel status
      this.selectedRepartidor.estado = 'on_delivery';
      this.selectedRepartidor.ultimoServicio = new Date();

      // Reset selection
      this.envioSeleccionado = null;
      this.selectedRepartidor = null;
    }
  }

  /**
   * Cancels delivery personnel assignment process
   * @method
   */
  cancelarAsignacion() {
    this.envioSeleccionado = null;
    this.selectedRepartidor = null;
  }

  /**
   * Translates delivery personnel status codes to display text
   * @method
   * @param estado Status code
   * @returns {string} Display text for status
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
   * Shows detailed view of a delivery person
   * @method
   * @param repartidor Delivery person to display
   */
  mostrarDetalleRepartidor(repartidor: any) {
    // Find complete delivery person record
    this.repartidorDetalle = this.repartidores.find((r:any) => r.id === repartidor.id) || repartidor;
  }
}
