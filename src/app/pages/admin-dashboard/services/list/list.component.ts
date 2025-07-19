import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  public data = [
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
      }
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
      }
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
      }
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
      }
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

   searchTerm: string = '';
  filteredEnvios: any[] = this.data;
  repartidores = [
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

   selectedRepartidor: any = null;
  envioSeleccionado: any = null;

  filterTable() {
    if (!this.searchTerm) {
      this.filteredEnvios = this.data;
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredEnvios = this.data.filter(envio =>
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



  getRepartidoresDisponibles() {
    return this.repartidores.filter(rep =>
      rep.estado === 'active' || rep.estado === 'on_delivery'
    ).sort((a, b) => {
      // Priorizar repartidores con menos entregas recientes
      return a.ultimoServicio.getTime() - b.ultimoServicio.getTime();
    });
  }

  seleccionarEnvioParaAsignar(envio: any) {
    if (envio.estado === 'Pendiente') {
      this.envioSeleccionado = envio;
      this.selectedRepartidor = null;
    }
  }

  asignarRepartidor() {
    if (this.envioSeleccionado && this.selectedRepartidor) {
      // Actualizar el estado del envío
      this.envioSeleccionado.estado = 'En curso';

      // Guardar toda la información del repartidor, no solo el nombre
      this.envioSeleccionado.repartidor = {
        id: this.selectedRepartidor.id,
        nombre: this.selectedRepartidor.nombre,
        telefono: this.selectedRepartidor.telefono,
        vehiculo: this.selectedRepartidor.vehiculo
      };

      // Actualizar estado del repartidor
      this.selectedRepartidor.estado = 'on_delivery';
      this.selectedRepartidor.ultimoServicio = new Date();

      // Resetear la selección
      this.envioSeleccionado = null;
      this.selectedRepartidor = null;
    }
  }

  cancelarAsignacion() {
    this.envioSeleccionado = null;
    this.selectedRepartidor = null;
  }

  getEstadoRepartidor(estado: string): string {
    switch(estado) {
      case 'active': return 'Disponible';
      case 'on_delivery': return 'En entrega';
      case 'inactive': return 'Inactivo';
      default: return estado;
    }
  }

  repartidorDetalle: any = null;

  mostrarDetalleRepartidor(repartidor: any) {
    // Buscar el repartidor completo en el array
    this.repartidorDetalle = this.repartidores.find(r => r.id === repartidor.id) || repartidor;
  }

}
