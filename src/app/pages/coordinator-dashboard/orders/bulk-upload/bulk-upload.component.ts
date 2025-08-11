import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

/**
 * Component for bulk upload of shipping services
 *
 * @Component
 * @selector app-bulk-upload
 *
 * @description
 * Provides a multi-step process for:
 * - Uploading and processing bulk service requests via Excel files
 * - Calculating costs and applying volume discounts
 * - Processing payments for multiple services
 * - Confirming bulk service creation
 *
 * @example
 * <app-bulk-upload></app-bulk-upload>
 */
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
  /**
   * Current step in the bulk upload process
   * @type {number}
   * @default 1
   */
  bulkCurrentStep = 1;

  /**
   * Steps in the bulk upload process
   * @type {string[]}
   */
  bulkSteps = ['Subir archivo', 'Pago', 'Confirmación'];

  /**
   * List of services from uploaded file
   * @type {Array<{
   *   origen: string,
   *   destino: string,
   *   tipo: string,
   *   costo: number
   * }>}
   * @default []
   */
  bulkServices: any[] = [];

  /**
   * Selected payment method
   * @type {string}
   * @default ''
   */
  paymentMethod = '';

  /**
   * Payment reference number
   * @type {string}
   * @default ''
   */
  bulkReference = '';

  /**
   * Transaction date
   * @type {Date}
   */
  transactionDate = new Date();

  /**
   * Component constructor
   * @param router Angular Router service
   */
  constructor(private router: Router) {}

  /**
   * Handles file upload event
   * @method
   * @param event File input change event
   */
  handleFileUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.parseExcelFile(file);
    }
  }

  /**
   * Simulates parsing of Excel file (mock implementation)
   * @method
   * @param file Uploaded Excel file
   * @description
   * In a real implementation, would use a library like xlsx
   */
  parseExcelFile(file: File): void {
    Swal.fire({
      title: 'Procesando archivo...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();

        setTimeout(() => {
          this.bulkServices = [
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
                estado: 'Registrado',
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
                estado: 'Registrado',
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
                estado: 'Registrado',
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
                estado: 'Registrado',
                pdf: null,
                observaciones: null
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
                estado: 'Registrado',
                pdf:null,
                observaciones: null
              }
          ];
          Swal.close();
        }, 1500);
      }
    });
  }

  /**
   * Downloads Excel template for bulk upload
   * @method
   */
  downloadTemplate(): void {
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



  /**
   * Advances to next step in bulk process
   * @method
   */
  nextBulkStep(): void {
    if (this.bulkCurrentStep < 2) {
      this.bulkCurrentStep++;
    }
  }

  /**
   * Returns to previous step in bulk process
   * @method
   */
  prevBulkStep(): void {
    if (this.bulkCurrentStep > 1) {
      this.bulkCurrentStep--;
    }
  }




  /**
   * Completes bulk process and navigates to services list
   * @method
   */
  finishBulkProcess(): void {
    Swal.fire({
      icon: 'success',
      title: 'Proceso completado',
      text: 'Puedes ver el estado de tus servicios en tu panel de control',
      confirmButtonColor: '#08A2CB'
    });

    this.router.navigateByUrl('/coordinator-dashboard/orders/list')
  }

  /**
   * Cancels bulk process with confirmation
   * @method
   */
  cancelBulkProcess(): void {
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
        this.router.navigateByUrl('/coordinator-dashboard/orders/list')
      }
    });
  }
}
