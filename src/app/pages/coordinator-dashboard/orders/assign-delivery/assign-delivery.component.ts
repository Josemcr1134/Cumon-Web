import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { OrdersService } from '../../../../core/services/orders.service';
import { LoaderComponent } from '../../../../shared/loader/loader.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../../../core/services/users.service';

@Component({
  selector: 'app-assign-delivery',
  imports: [
    LoaderComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './assign-delivery.component.html',
  styleUrl: './assign-delivery.component.css'
})
export class AssignDeliveryComponent implements OnInit {
  @Input() orderSelected: any = null;
  @Input() selectedDelivery: any = null;
  @Output() close = new EventEmitter();

  public isLoading: boolean = false;
  public deliveries: any[] = [];
  constructor(private orderSvc: OrdersService, private usersSvc: UsersService) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getDeliveries();
  }
  /**
   * Assigns selected courier to order
   * @method
   * @description
   * Updates order status and courier information
   */
  assignDelivery() {
    if (this.orderSelected && this.selectedDelivery) {
      this.isLoading = !this.isLoading;
      this.orderSvc.assignDeliveryToOrder({ messengerId: this.selectedDelivery.id }, this.orderSelected.id)
        .subscribe({
          error: (err: any) => {
            Swal.fire('Oooops', err.message, 'error');
            this.isLoading = !this.isLoading;
          },
          next: (resp: any) => {
            Swal.fire('Éxito', 'Repartidor asignado', 'success');
            this.isLoading = !this.isLoading;
            // Reset selection
            this.orderSelected = null;
            this.selectedDelivery = null;
            this.cancelAssignation();
          }
        });
    };
  };

  getDeliveries() {
    this.usersSvc.getUsers(1, 100, 4, '', 'active')
      .subscribe({
        error: (err: any) => {
          console.log(err);
        },
        next: (resp: any) => {
          this.deliveries = resp.data.results;
        }
      });
  };

  /**
   * Cancels courier assignment process
   * @method
   */
  cancelAssignation() {
    this.orderSelected = null;
    this.selectedDelivery = null;
    this.close.emit(true);
  };
}
