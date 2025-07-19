import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bulk-upload',
  imports: [
    FormsModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './bulk-upload.component.html',
  styleUrl: './bulk-upload.component.css'
})
export class BulkUploadComponent {
  bulkCurrentStep = 1;
  bulkSteps = ['Subir archivo', 'Pago', 'Confirmación'];
  bulkServices: any[] = [];
  paymentMethod = '';
  bulkReference = '';
  transactionDate = new Date();

  constructor(private router:Router){}
  handleFileUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Simulamos la lectura del archivo Excel
      this.parseExcelFile(file);
    }
  }

  parseExcelFile(file: File): void {
    // En una implementación real usarías una librería como xlsx
    // Aquí simulamos datos de ejemplo
    Swal.fire({
      title: 'Procesando archivo...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();

        setTimeout(() => {
          this.bulkServices = [
            { origen: 'Hospital Central, Calle 123', destino: 'Clínica Sanitas, Av. Principal', tipo: 'Medicamentos', costo: 45 },
            { origen: 'Laboratorio Labco, Carrera 45', destino: 'Hospital Central, Calle 123', tipo: 'Muestras médicas', costo: 60 },
            { origen: 'Farmacias Cruz Verde, Centro Comercial', destino: 'Residencia Calle 78 #45-12', tipo: 'Medicamentos', costo: 35 },
            { origen: 'Clínica San Vicente, Diagonal 23', destino: 'Laboratorio Dinámico, Av. Siempreviva', tipo: 'Documentos médicos', costo: 50 },
            { origen: 'Hospital Universitario, Carrera 7', destino: 'Clínica Las Américas, Calle 34', tipo: 'Equipo médico', costo: 80 },
            { origen: 'Centro Médico Andino, Transversal 12', destino: 'Farmacias La Salud, Local 45', tipo: 'Medicamentos', costo: 40 }
          ];
          Swal.close();
        }, 1500);
      }
    });
  }

  downloadTemplate(): void {
    // Simular descarga de plantilla
    const link = document.createElement('a');
    link.href = '/assets/templates/cumon-plantilla-servicios.xlsx';
    link.download = 'cumon-plantilla-servicios.xlsx';
    link.click();

    Swal.fire({
      icon: 'success',
      title: 'Plantilla descargada',
      text: 'El archivo plantilla se ha descargado correctamente',
      confirmButtonColor: '#08A2CB'
    });
  }

  calculateBulkSubtotal(): number {
    return this.bulkServices.reduce((sum, service) => sum + (service.costo || 50), 0);
  }

  calculateBulkDiscount(): number {
    const subtotal = this.calculateBulkSubtotal();
    if (this.bulkServices.length >= 20) return subtotal * 0.15; // 15% descuento
    if (this.bulkServices.length >= 10) return subtotal * 0.10; // 10% descuento
    if (this.bulkServices.length >= 5) return subtotal * 0.05;  // 5% descuento
    return 0;
  }

  calculateBulkTotal(): number {
    return this.calculateBulkSubtotal() - this.calculateBulkDiscount();
  }

  nextBulkStep(): void {
    if (this.bulkCurrentStep < 3) {
      this.bulkCurrentStep++;
    }
  }

  prevBulkStep(): void {
    if (this.bulkCurrentStep > 1) {
      this.bulkCurrentStep--;
    }
  }

  processBulkPayment(): void {
    // Simular procesamiento de pago
    Swal.fire({
      title: 'Procesando pago...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();

        setTimeout(() => {
          this.bulkReference = 'CM-' + Math.floor(100000 + Math.random() * 900000);
          this.transactionDate = new Date();
          this.nextBulkStep();
          Swal.close();
        }, 2000);
      }
    });
  }

  getPaymentMethodText(): string {
    switch(this.paymentMethod) {
      case 'credit_card': return 'Tarjeta de crédito';
      case 'transfer': return 'Transferencia bancaria';
      case 'corporate': return 'Cuenta corporativa';
      default: return '';
    }
  }

  finishBulkProcess(): void {
    // Aquí iría la navegación de regreso al dashboard
    Swal.fire({
      icon: 'success',
      title: 'Proceso completado',
      text: 'Puedes ver el estado de tus servicios en tu panel de control',
      confirmButtonColor: '#08A2CB'
    });

    this.router.navigateByUrl('/users-dashboard/services/list')
  }

  cancelBulkProcess(): void {
    // Aquí iría la navegación de regreso al inicio
    Swal.fire({
      title: '¿Cancelar carga masiva?',
      text: 'Los datos no guardados se perderán',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#08A2CB',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'Continuar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('/users-dashboard/services/list')
      }
    });
  }
}
