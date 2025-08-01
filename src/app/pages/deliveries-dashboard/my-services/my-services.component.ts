import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-services',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

  ],
  templateUrl: './my-services.component.html',
  styleUrl: './my-services.component.css'
})
export class MyServicesComponent implements OnInit {
  domiciliario = {
    id: 'DOM-12345',
    nombre: 'Juan Pérez',
    activo: true,
    vehiculo: 'Moto - Honda CB190',
    telefono: '3001234567'
  };

  servicios = [
    {
      id: 'SERV-1001',
      tipo: 'Medicamentos urgentes',
      direccionRecogida: 'Farmacias La Salud, Calle 123',
      direccionEntrega: 'Carrera 45 #12-30, Apt 401',
      contactoEntrega: 'María González - 3109876543',
      instruccionesRecogida: 'Pedir factura con receta médica',
      fecha: new Date('2023-06-15'),
      horaRecogida: new Date('2023-06-15T10:00:00'),
      horaEntrega: new Date('2023-06-15T10:45:00'),
      estado: 'entregado',
      clienteId: 'CLI-789',
      imagenEvidencia: 'assets/ejemplo-entrega.jpg'
    },
    {
      id: 'SERV-1002',
      tipo: 'Muestras médicas',
      direccionRecogida: 'Clínica Sanitas, Consultorio 502',
      direccionEntrega: 'Laboratorio Labco, Torre B Piso 3',
      contactoEntrega: 'Recepción laboratorio',
      instruccionesRecogida: 'Manejar con cuidado - Cadena de frío',
      fecha: new Date('2023-06-14'),
      horaRecogida: new Date('2023-06-14T14:30:00'),
      horaEntrega: new Date('2023-06-14T15:15:00'),
      estado: 'entregado',
      clienteId: 'CLI-456',
      imagenEvidencia: 'assets/ejemplo-entrega2.jpg'
    },
    {
      id: 'SERV-1003',
      tipo: 'Equipo médico',
      direccionRecogida: 'Hospital Central, Almacén',
      direccionEntrega: 'Clínica del Norte, Sala de cirugía',
      contactoEntrega: 'Dr. Carlos Mendoza - 3151234567',
      instruccionesRecogida: 'Equipo frágil - Transportar verticalmente',
      fecha: new Date('2023-06-14'),
      horaRecogida: new Date('2023-06-14T09:00:00'),
      horaEntrega: new Date('2023-06-14T09:50:00'),
      estado: 'entregado',
      clienteId: 'CLI-123',
      imagenEvidencia: 'assets/ejemplo-entrega3.jpg'
    },
    {
      id: 'SERV-1004',
      tipo: 'Documentos médicos',
      direccionRecogida: 'Consultorio Dr. Rodríguez, Oficina 304',
      direccionEntrega: 'Aseguradora VidaPlena, Piso 5',
      contactoEntrega: 'Departamento de Reclamaciones',
      fecha: new Date('2023-06-13'),
      horaRecogida: new Date('2023-06-13T16:00:00'),
      horaEntrega: new Date('2023-06-13T16:40:00'),
      estado: 'entregado',
      clienteId: 'CLI-987',
      imagenEvidencia: 'assets/ejemplo-entrega4.jpg'
    },
    {
      id: 'SERV-1005',
      tipo: 'Medicamentos controlados',
      direccionRecogida: 'Farmacias Cruz Verde, Sede Norte',
      direccionEntrega: 'Calle 78 #45-12, Casa blanca portón negro',
      contactoEntrega: 'Sra. Laura Martínez - 3206543210',
      instruccionesRecogida: 'Verificar identificación al entregar',
      fecha: new Date('2023-06-12'),
      horaRecogida: new Date('2023-06-12T11:30:00'),
      horaEntrega: new Date('2023-06-12T12:15:00'),
      estado: 'entregado',
      clienteId: 'CLI-654',
      imagenEvidencia: 'assets/ejemplo-entrega5.jpg'
    }
  ];

  servicioActivo:any = {
    id: 'SERV-1006',
    tipo: 'Paquete médico urgente',
    direccionRecogida: 'Laboratorio Dinámico, Av. Principal #23-45',
    direccionEntrega: 'Clínica San Vicente, Urgencias',
    contactoEntrega: 'Enfermera Jefe - Ext. 502',
    instruccionesRecogida: 'Prioridad alta - Entregar en recepción de urgencias',
    fecha: new Date(),
    horaRecogida: new Date(),
    horaEntrega: null,
    estado: 'en_proceso',
    clienteId: 'CLI-321',
    progreso: 50
  };

  serviciosFiltrados:any = [...this.servicios];
  filterStatus = 'all';

  // Variables para modal de entrega
  showDeliveryProofModal = false;
  deliveryProofImage: string | null = null;
  deliveryComments = '';

  ngOnInit(): void {
    // Simular servicio activo
    this.serviciosFiltrados.unshift(this.servicioActivo);
    this.applyFilter();
  }

  // Métodos para manejar el estado activo/inactivo
  updateStatus(): void {
    const action = this.domiciliario.activo ? 'activado' : 'desactivado';
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: `Estado ${action}`,
      showConfirmButton: false,
      timer: 1500
    });

    // Aquí iría la llamada al servicio para actualizar el estado
    console.log('Estado actualizado:', this.domiciliario.activo);
  }

  // Métodos para el servicio activo
  getProgress(): number {
    if (this.servicioActivo.estado === 'pendiente') return 20;
    if (this.servicioActivo.estado === 'en_proceso') return 60;
    if (this.servicioActivo.estado === 'entregado') return 100;
    return 0;
  }

  // Métodos para el modal de entrega
  openDeliveryProofModal(): void {
    this.showDeliveryProofModal = true;
    this.deliveryProofImage = null;
    this.deliveryComments = '';
  }

  closeDeliveryProofModal(): void {
    this.showDeliveryProofModal = false;
  }

  handleImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.deliveryProofImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.deliveryProofImage = null;
  }

  confirmDelivery(): void {
    Swal.fire({
      title: '¿Confirmar entrega?',
      text: 'Esta acción registrará el servicio como completado',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#08A2CB',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Actualizar estado del servicio
        this.servicioActivo.estado = 'entregado';
        this.servicioActivo.horaEntrega = new Date();
        this.servicioActivo['imagenEvidencia'] = this.deliveryProofImage;

        // Mover a historial
        this.servicios.unshift({...this.servicioActivo});
        this.servicioActivo = null as any;
        this.applyFilter();

        this.closeDeliveryProofModal();

        Swal.fire(
          '¡Entrega confirmada!',
          'El servicio ha sido registrado como completado.',
          'success'
        );
      }
    });
  }

  // Métodos para filtrar servicios
  applyFilter(): void {
    if (this.filterStatus === 'all') {
      this.serviciosFiltrados = [...this.servicios];
      if (this.servicioActivo) {
        this.serviciosFiltrados.unshift(this.servicioActivo);
      }
    } else {
      this.serviciosFiltrados = this.servicios.filter(s => s.estado === this.filterStatus);
    }
  }

  getEstadoText(estado: string): string {
    switch(estado) {
      case 'pendiente': return 'Pendiente';
      case 'en_proceso': return 'En proceso';
      case 'entregado': return 'Entregado';
      case 'cancelado': return 'Cancelado';
      default: return estado;
    }
  }

  // Métodos para acciones de servicios
  startService(servicio: any): void {
    servicio.estado = 'en_proceso';
    this.servicioActivo = servicio;
    this.applyFilter();

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Servicio iniciado',
      showConfirmButton: false,
      timer: 1500
    });
  }

  setActiveService(servicio: any): void {
    this.servicioActivo = servicio;
    this.applyFilter();
  }

  viewServiceDetails(servicio: any): void {
    // Aquí iría la navegación a los detalles completos
    console.log('Ver detalles del servicio:', servicio.id);
    Swal.fire({
      title: `Detalles del servicio #${servicio.id}`,
      html: `
        <div class="text-left">
          <p><strong>Tipo:</strong> ${servicio.tipo}</p>
          <p><strong>Recoger en:</strong> ${servicio.direccionRecogida}</p>
          <p><strong>Entregar en:</strong> ${servicio.direccionEntrega}</p>
          <p><strong>Contacto:</strong> ${servicio.contactoEntrega}</p>
          <p><strong>Estado:</strong> ${this.getEstadoText(servicio.estado)}</p>
          ${servicio.instruccionesRecogida ? `<p><strong>Instrucciones:</strong> ${servicio.instruccionesRecogida}</p>` : ''}
        </div>
      `,
      confirmButtonColor: '#08A2CB'
    });
  }

  openChat(clienteId: string): void {
    // Aquí iría la lógica para abrir el chat
    console.log('Abrir chat con cliente:', clienteId);
    Swal.fire({
      title: 'Chat con cliente',
      text: 'Esta funcionalidad abriría el chat con el cliente en una implementación real',
      confirmButtonColor: '#08A2CB'
    });
  }

}
