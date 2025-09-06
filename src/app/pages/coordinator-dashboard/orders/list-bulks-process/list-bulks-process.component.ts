import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrdersService } from '../../../../core/services/orders.service';
import { Router, RouterModule } from '@angular/router';
import { LoaderComponent } from '../../../../shared/loader/loader.component';
import { PaginationComponent } from '../../../../shared/pagination/pagination.component';

@Component({
  selector: 'app-list-bulks-process',
  imports: [
    CommonModule,
    FormsModule,
    LoaderComponent,
    PaginationComponent,
    RouterModule
  ],
  templateUrl: './list-bulks-process.component.html',
  styleUrl: './list-bulks-process.component.css'
})
export class ListBulksProcessComponent implements OnInit {

  public isLoading: boolean = false;
  public Data: any[] = [];
  public page: number = 1;
  public totalItems: number = 0;
  public pageSize: number = 10;
  public status: string | null = null;
  public startDate: string = '';
  public endDate: string = '';
  public statusList: any[] = [
    {
      id: 'PendingUpload',
      label: 'Pendiente por procesar'
    },
    {
      id: 'Completed',
      label: 'Completado'
    },
    {
      id: 'Processing',
      label: 'Procesando'
    },
    {
      id: 'Processing',
      label: 'Completado con errores'
    },

  ];
  constructor(private orderSvc: OrdersService, private router: Router) { }

  ngOnInit(): void {
    this.getBulksProcess()
  }

  getBulksProcess() {
    this.isLoading = !this.isLoading;
    this.orderSvc.getBulksProcess(this.page, this.pageSize, this.startDate, this.endDate, this.status)
      .subscribe({
        error: (err: any) => {
          console.log(err);
          this.isLoading = !this.isLoading;
        },
        next: (resp: any) => {
          console.log(resp)
          this.totalItems = resp.data.rowCount;
          this.Data = resp.data.results;
          this.isLoading = !this.isLoading;
        }
      });
  };



  cleanFilters() {
    this.startDate = '';
    this.endDate = '';
    this.status = null;
    this.getBulksProcess();
  };

  onPage(p: number) {
    if (p === this.page) return;
    this.page = p;
    this.getBulksProcess();
  };
}
