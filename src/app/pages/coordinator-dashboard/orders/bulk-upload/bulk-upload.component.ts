import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { OrdersService } from '../../../../core/services/orders.service';
import { LoaderComponent } from '../../../../shared/loader/loader.component';

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
    CommonModule,
    LoaderComponent
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

  public isLoading: boolean = false;
  public processId: any = null;
  public bulkFile: any = null;
  constructor(private router: Router, private orderSvc: OrdersService) { }

  /**
   * Handles file upload event
   * @method
   * @param event File input change event
   */
  handleFileUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.bulkFile = file;
    };
  };



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
  };


  startBulkProcess() {
    this.isLoading = !this.isLoading;
    if (this.bulkFile !== null) {
      this.orderSvc.createBulkOrder()
        .subscribe({
          error: (err: any) => {
            console.log(err);
            this.isLoading = !this.isLoading;
          },
          next: (resp: any) => {
            this.isLoading = !this.isLoading;
            this.processId = resp.data.id;
            this.sendBulkFile(resp.data.presignedUrl)
          }
        });
    } else {
      Swal.fire('Atención', 'Debes cargar un archivo con servicios a realizar', 'info')
    };
  };

  sendBulkFile(url: string) {
    this.isLoading = !this.isLoading;
    let fd = new FormData();
    fd.append('file', this.bulkFile)

    this.orderSvc.sendBulkFile(url, fd)
      .subscribe({
        error: (err: any) => {
          Swal.fire('Oooops', err.message, 'error');
          this.isLoading = !this.isLoading;
        },
        next: (resp: any) => {
          this.isLoading = !this.isLoading;
          this.nextBulkStep();
        }
      });
  };
}
