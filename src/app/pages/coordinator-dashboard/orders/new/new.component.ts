import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css'
})
export class NewComponent {
  currentStep = 1;
  registrationType: 'manual' | 'bulk' | undefined;

  // Data models for manual registration
  manualServiceData = {
    document: '',
    order: '',
    date: '',
    type: '' as 'Sobre' | 'Caja' | 'Bolsa' | '',
    quantity: null as number | null,
    value: null as number | null,
    observations: '',
    route: '',
    address: '',
    city: '',
    driver: '',
    pdf: null as File | null
  };

  // Static data
  packageTypes = [
    { value: 'Sobre', label: 'Sobre' },
    { value: 'Caja', label: 'Caja' },
    { value: 'Bolsa', label: 'Bolsa' }
  ];

  availableRoutes = [
    'Ruta Norte', 'Ruta Sur', 'Ruta Este', 'Ruta Oeste', 'Ruta Centro'
  ];

  availableDrivers = [
    { id: '1', name: 'Juan Pérez' },
    { id: '2', name: 'María García' },
    { id: '3', name: 'Carlos López' }
  ];

  // Steps configuration
  steps = [
    { label: 'Tipo de registro', disabled: false },
    { label: 'Información básica', disabled: this.currentStep < 2 },
    { label: 'Detalles del envío', disabled: this.currentStep < 3 },
    { label: 'Confirmación', disabled: this.currentStep < 4 }
  ];

  constructor(private router: Router) {}

  // Navigation methods
  selectRegistrationType(type: 'manual' | 'bulk'): void {
    this.registrationType = type;
    if (type === 'bulk') {
      this.startBulkProcess();
    } else {
      this.nextStep();
    }
  }

  nextStep(): void {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(step: number): void {
    if (step >= 1 && step <= 4 && step <= this.currentStep) {
      this.currentStep = step;
    }
  }

  // File handling
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        Swal.fire({
          icon: 'error',
          title: 'Archivo demasiado grande',
          text: 'El tamaño máximo permitido es 2MB',
          confirmButtonColor: '#08A2CB'
        });
        return;
      }
      if (!file.name.endsWith('.pdf')) {
        Swal.fire({
          icon: 'error',
          title: 'Formato no válido',
          text: 'Solo se permiten archivos PDF',
          confirmButtonColor: '#08A2CB'
        });
        return;
      }
      this.manualServiceData.pdf = file;
    }
  }

  // Validation methods
  validateStep1(): boolean {
    return !!this.manualServiceData.document &&
           !!this.manualServiceData.order &&
           !!this.manualServiceData.date;
  }

  validateStep2(): boolean {
    return !!this.manualServiceData.type &&
           !!this.manualServiceData.quantity &&
           this.manualServiceData.quantity > 0;
  }

  validateStep3(): boolean {
    return !!this.manualServiceData.route &&
           !!this.manualServiceData.address &&
           !!this.manualServiceData.city &&
           !!this.manualServiceData.driver;
  }

  // Form submission
  submitManualService(): void {
    // Here you would typically send the data to your backend
    Swal.fire({
      title: 'Procesando envío...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();

        setTimeout(() => {
          Swal.fire({
            icon: 'success',
            title: '¡Envío registrado!',
            text: 'El envío manual ha sido registrado correctamente',
            confirmButtonColor: '#08A2CB'
          }).then(() => {
            this.resetForm();
          });
        }, 1500);
      }
    });
  }

  // Reset form
  resetForm(): void {
    this.currentStep = 1;
    this.registrationType = undefined;
    this.manualServiceData = {
      document: '',
      order: '',
      date: '',
      type: '',
      quantity: null,
      value: null,
      observations: '',
      route: '',
      address: '',
      city: '',
      driver: '',
      pdf: null
    };
  }

  // Bulk process navigation
  startBulkProcess(): void {
    this.router.navigateByUrl('/coordinator-dashboard/orders/bulk');
  }

  // Helper to get today's date in YYYY-MM-DD format
  get todayDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}
