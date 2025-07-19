import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  // Datos de ejemplo
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

  filteredRepartidores = [...this.repartidores];
  vehicleTypes = ['Motocicleta', 'Automóvil', 'Camioneta', 'Bicicleta', 'Carga Pesada'];
  availableCertifications = [
    'Primeros Auxilios',
    'Manejo de Muestras',
    'Cadena de Frío',
    'BPM',
    'Infectología',
    'Emergencias Médicas',
    'Transporte Pacientes'
  ];
  selectedCertifications: string[] = [];

  // Filtros
  searchQuery = '';
  vehicleFilter = '';
  statusFilter = '';
  currentPage = 1;
  itemsPerPage = 10;

  // Modal
  showRepartidorModal = false;
  editingRepartidor: any = null;
  repartidorForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.repartidorForm = this.fb.group({
      tipoIdentificacion: ['', Validators.required],
      identificacion: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.email]],
      tipoVehiculo: ['', Validators.required],
      placa: ['', Validators.required],
      marca: [''],
      modelo: [''],
      certificaciones: [[]],
      estado: ['active', Validators.required],
      fechaIngreso: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.applyFilters();
  }

  // Filtros y paginación
  applyFilters(): void {
    this.filteredRepartidores = this.repartidores.filter(repartidor => {
      const matchesSearch = repartidor.nombre.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesVehicle = this.vehicleFilter ? repartidor.vehiculo.tipo === this.vehicleFilter : true;
      const matchesStatus = this.statusFilter ? repartidor.estado === this.statusFilter : true;
      return matchesSearch && matchesVehicle && matchesStatus;
    });
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.vehicleFilter = '';
    this.statusFilter = '';
    this.applyFilters();
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.repartidores.length) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Modal y formulario
  openRepartidorModal(repartidor?: any): void {
    this.editingRepartidor = repartidor || null;

    if (repartidor) {
      this.selectedCertifications = [...repartidor.certificaciones];
      this.repartidorForm.patchValue({
        ...repartidor,
        apellido: repartidor.nombre.split(' ')[1] || '',
        nombre: repartidor.nombre.split(' ')[0],
        ...repartidor.vehiculo,
        tipoVehiculo: repartidor.vehiculo.tipo,
        fechaIngreso: this.formatDateForInput(repartidor.fechaIngreso)
      });
    } else {
      this.selectedCertifications = [];
      this.repartidorForm.reset({
        estado: 'active',
        certificaciones: []
      });
    }

    this.showRepartidorModal = true;
  }

  closeRepartidorModal(): void {
    this.showRepartidorModal = false;
    this.repartidorForm.reset();
    this.selectedCertifications = [];
  }

  toggleCertification(cert: string): void {
    if (this.selectedCertifications.includes(cert)) {
      this.selectedCertifications = this.selectedCertifications.filter(c => c !== cert);
    } else {
      this.selectedCertifications.push(cert);
    }
    this.repartidorForm.patchValue({ certificaciones: this.selectedCertifications });
  }

  saveRepartidor(): void {
    if (this.repartidorForm.invalid) return;

    const formValue = this.repartidorForm.value;
    const newRepartidor = {
      id: this.editingRepartidor ? this.editingRepartidor.id : this.generateId(),
      nombre: `${formValue.nombre} ${formValue.apellido}`,
      tipoIdentificacion: formValue.tipoIdentificacion,
      identificacion: formValue.identificacion,
      telefono: formValue.telefono,
      email: formValue.email,
      vehiculo: {
        tipo: formValue.tipoVehiculo,
        placa: formValue.placa,
        marca: formValue.marca,
        modelo: formValue.modelo
      },
      certificaciones: this.selectedCertifications,
      estado: formValue.estado,
      fechaIngreso: new Date(formValue.fechaIngreso),
      ultimoServicio: this.editingRepartidor ? this.editingRepartidor.ultimoServicio : null
    };

    if (this.editingRepartidor) {
      const index = this.repartidores.findIndex(r => r.id === this.editingRepartidor.id);
      this.repartidores[index] = newRepartidor;
      Swal.fire({
        icon: 'success',
        title: 'Repartidor actualizado',
        text: 'La información del repartidor se ha actualizado correctamente',
        confirmButtonColor: '#08A2CB'
      });
    } else {
      this.repartidores.unshift(newRepartidor);
      Swal.fire({
        icon: 'success',
        title: 'Repartidor creado',
        text: 'El nuevo repartidor ha sido registrado en el sistema',
        confirmButtonColor: '#08A2CB'
      });
    }

    this.applyFilters();
    this.closeRepartidorModal();
  }

  // Helpers
  getEstadoText(estado: string): string {
    switch(estado) {
      case 'active': return 'Activo';
      case 'inactive': return 'Inactivo';
      case 'on_delivery': return 'En servicio';
      case 'on_leave': return 'En permiso';
      default: return estado;
    }
  }

  formatDateForInput(date: Date): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  generateId(): number {
    return Math.max(...this.repartidores.map(r => r.id)) + 1;
  }

  // Eliminar repartidor
  confirmDelete(repartidor: any): void {
    Swal.fire({
      title: '¿Eliminar repartidor?',
      text: `¿Estás seguro de eliminar a ${repartidor.nombre}? Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#08A2CB',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.repartidores = this.repartidores.filter(r => r.id !== repartidor.id);
        this.applyFilters();
        Swal.fire(
          'Eliminado',
          'El repartidor ha sido eliminado del sistema.',
          'success'
        );
      }
    });
  }

  // Editar repartidor
  editRepartidor(repartidor: any): void {
    this.openRepartidorModal(repartidor);
  }

}
