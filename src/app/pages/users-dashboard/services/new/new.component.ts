import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2'
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
  isImmediate: boolean | undefined;

  // Data models
  pickupData = {
    city: '',
    address: '',
    references: ''
  };

  destinationData = {
    city: '',
    address: '',
    references: '',
    recipientName: '',
    recipientPhone: ''
  };

  packageData = {
    size: '',
    declaredValue: null as number | null,
    description: ''
  };

  paymentData = {
    method: '',
    promoCode: '',
    discount: 0
  };

  scheduledData = {
    date: '',
    time: ''
  };

  assignedDriver = {
    name: 'Juan Pérez',
    vehicle: 'Motocicleta - Honda CB190',
    eta: '15',
    rating: '4.8'
  };

  driverDistance = '1.2';
  driverETA = '8';

  // Static data
  packageSizes = [
    { value: 'small', label: 'Pequeño', dimensions: 'Hasta 30x30x30 cm' },
    { value: 'medium', label: 'Mediano', dimensions: 'Hasta 50x50x50 cm' },
    { value: 'large', label: 'Grande', dimensions: 'Hasta 80x80x80 cm' },
    { value: 'extra_large', label: 'Extra Grande', dimensions: 'Más de 80x80x80 cm' }
  ];

  paymentMethods = [
    { value: 'credit_card', label: 'Tarjeta de crédito', icon: 'assets/credit-card.png' },
    { value: 'debit_card', label: 'Tarjeta de débito', icon: 'assets/debit-card.png' },
    { value: 'paypal', label: 'PayPal', icon: 'assets/paypal.png' },
    { value: 'cash', label: 'Efectivo al recoger', icon: 'assets/cash.png' }
  ];

  availableTimes = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
    '04:00 PM', '05:00 PM', '06:00 PM'
  ];

  get minDate(): string {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Minimum is tomorrow
    return today.toISOString().split('T')[0];
  }

  get steps(): any[] {
    if (this.isImmediate === undefined) return [];

    return this.isImmediate ? [
      { label: 'Tipo', disabled: false },
      { label: 'Recogida', disabled: this.currentStep < 2 },
      { label: 'Paquete', disabled: this.currentStep < 3 },
      { label: 'Pago', disabled: this.currentStep < 4 },
      { label: 'Confirmación', disabled: this.currentStep < 5 },
      { label: 'Repartidor', disabled: this.currentStep < 6 },
      { label: 'Entrega', disabled: this.currentStep < 7 }
    ] : [
      { label: 'Tipo', disabled: false },
      { label: 'Recogida', disabled: this.currentStep < 2 },
      { label: 'Paquete', disabled: this.currentStep < 3 },
      { label: 'Programar', disabled: this.currentStep < 4 },
      { label: 'Pago', disabled: this.currentStep < 5 },
      { label: 'Confirmación', disabled: this.currentStep < 6 }
    ];
  }

  selectServiceType(immediate: boolean): void {
    this.isImmediate = immediate;
  }

  nextStep(): void {
    if (this.currentStep === 6 && !this.isImmediate) {
      this.completeService();
      return;
    }

    if (this.currentStep < (this.isImmediate ? 7 : 6)) {
      this.currentStep++;
    }

    // Simulate driver assignment
    if (this.currentStep === 6 && this.isImmediate) {
      setTimeout(() => {
        this.assignedDriver = {
          name: 'Juan Pérez',
          vehicle: 'Motocicleta - Honda CB190',
          eta: '15',
          rating: '4.8'
        };
      }, 2000);
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(step: number): void {
    const maxStep = this.isImmediate ? 7 : 6;
    if (step >= 1 && step <= maxStep && step <= this.currentStep) {
      this.currentStep = step;
    }
  }

  getPackageSizeLabel(size: string): string {
    const found = this.packageSizes.find(s => s.value === size);
    return found ? found.label : '';
  }

  calculateSubtotal(): number {
    // Simple pricing based on package size
    switch(this.packageData.size) {
      case 'small': return 50;
      case 'medium': return 80;
      case 'large': return 120;
      case 'extra_large': return 200;
      default: return 0;
    }
  }

  calculateTotal(): number {
    const subtotal = this.calculateSubtotal() + Number(this.packageData.declaredValue || 0) ;
    return subtotal - (this.paymentData.discount || 0);
  }

  applyPromoCode(): void {
    if (this.paymentData.promoCode === 'ENVIO20') {
      this.paymentData.discount = this.calculateSubtotal() * 0.2; // 20% discount
      Swal.fire({
        icon: 'success',
        title: '¡Código aplicado!',
        text: 'Se ha aplicado un 20% de descuento a tu envío',
        confirmButtonColor: '#08A2CB'
      });
    } else {
      this.paymentData.discount = 0;
      Swal.fire({
        icon: 'error',
        title: 'Código inválido',
        text: 'El código promocional ingresado no es válido',
        confirmButtonColor: '#08A2CB'
      });
    }
  }

  processPayment(): void {
    // Simulate payment processing
    Swal.fire({
      title: 'Procesando pago...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();

        setTimeout(() => {
          Swal.fire({
            icon: 'success',
            title: '¡Pago exitoso!',
            text: 'Tu pago ha sido procesado correctamente',
            confirmButtonColor: '#08A2CB'
          }).then(() => {
            this.nextStep();
          });
        }, 1500);
      }
    });
  }

  formatScheduledDate(): string {
    if (!this.scheduledData.date || !this.scheduledData.time) return '';

    const date = new Date(this.scheduledData.date);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    const formattedDate = date.toLocaleDateString('es-MX', options);

    return `${formattedDate} a las ${this.scheduledData.time}`;
  }

  completeService(): void {
    Swal.fire({
      icon: 'success',
      title: '¡Servicio completado!',
      text: 'Gracias por usar nuestro servicio de envíos',
      confirmButtonColor: '#08A2CB'
    }).then(() => {
      // Reset form
      this.currentStep = 1;
      this.isImmediate = undefined;
      this.pickupData = { city: '', address: '', references: '' };
      this.packageData = { size: '', declaredValue: null, description: '' };
      this.paymentData = { method: '', promoCode: '', discount: 0 };
      this.scheduledData = { date: '', time: '' };
    });
  }
}
