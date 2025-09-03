import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GlobalService } from '../../../../core/services/global.service';
import { UsersService } from '../../../../core/services/users.service';
import { OrdersService } from '../../../../core/services/orders.service';
import { ZoneService } from '../../../../core/services/zone.services';

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
export class NewComponent implements OnInit {
  currentStep = 1;
  registrationType: 'manual' | 'bulk' | undefined;

  // Data models for manual registration
  manualServiceData = {
    orderType: '' as 'Sobre' | 'Caja' | 'Bolsa' | '',
    quantity: null as number | null,
    value: 0 as number | null,
    document: '',
    orderNumber: '',
    observation: '',
    address: '',
    entryDate: '',
    geographicalAreaId: '',
    messengerId: '',
  };

  public Regions: any[] = [];
  public Municipalities: any[] = [];
  public regionSelected: any = null;
  public citySelected: any = null;
  // Static data
  packageTypes = [
    { value: 'Packet', label: 'Sobre' },
    { value: 'Box', label: 'Caja' },
    { value: 'Bag', label: 'Bolsa' }
  ];

  availableRoutes: any[] = [];

  availableDrivers: any[] = [];

  // Steps configuration
  steps = [
    { label: 'Tipo de registro', disabled: false },
    { label: 'Información básica', disabled: this.currentStep < 2 },
    { label: 'Detalles del envío', disabled: this.currentStep < 3 },
    { label: 'Confirmación', disabled: this.currentStep < 4 }
  ];

  constructor(private router: Router, private globalSvc: GlobalService, private usersSvc: UsersService, private ordersSvc: OrdersService, private zoneSvc: ZoneService) { }

  ngOnInit(): void {
    this.getRegions();
    this.getDrivers();
  }
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
      // this.manualServiceData.pdf = file;
    }
  }

  // Validation methods
  validateStep1(): boolean {
    return !!this.manualServiceData.document &&
      !!this.manualServiceData.orderNumber &&
      !!this.manualServiceData.entryDate;
  }

  validateStep2(): boolean {
    return !!this.manualServiceData.orderType &&
      !!this.manualServiceData.quantity &&
      this.manualServiceData.quantity > 0;
  }

  validateStep3(): boolean {
    return !!this.manualServiceData.geographicalAreaId &&
      !!this.manualServiceData.address
  };

  // Form submission
  submitManualService(): void {
    // Here you would typically send the data to your backend
    Swal.fire({
      title: 'Procesando envío...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();

        this.ordersSvc.createOrder(this.manualServiceData)
          .subscribe({
            error: (err: any) => {
              Swal.fire('Oooops', err.message, 'error');
            },
            next: (resp: any) => {
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
          })
      }
    });
  }

  // Reset form
  resetForm(): void {
    this.currentStep = 1;
    this.registrationType = undefined;
    this.regionSelected = null;
    this.citySelected = null;
    this.manualServiceData = {
      document: '',
      orderNumber: '',
      entryDate: '',
      orderType: '',
      quantity: null,
      value: 0,
      observation: '',
      geographicalAreaId: '',
      address: '',
      messengerId: '',
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


  getRegions() {
    this.globalSvc.getRegions()
      .subscribe({
        error: (err: any) => {

        },
        next: (resp: any) => {
          this.Regions = resp.data;
        }
      })
  };

  getRegionById() {
    this.globalSvc.getRegionById(this.regionSelected)
      .subscribe({
        error: (err: any) => {
          console.log(err);
        },
        next: (resp: any) => {
          this.Municipalities = resp.data.cities;
        }
      });
  };

  getZonesByCity() {
    this.zoneSvc.getZonesByCity(this.citySelected)
      .subscribe({
        error: (err: any) => {
          console.log(err);
        },
        next: (resp: any) => {
          this.availableRoutes = resp.data;
        }
      });
  };

  getDrivers() {
    this.usersSvc.getUsers(1, 100, 4, '', 'active')
      .subscribe({
        error: (err: any) => {
          console.log(err)
        },
        next: (resp: any) => {
          this.availableDrivers = resp.data.results;
        }
      });
  };


}
