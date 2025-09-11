import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OrdersService } from '../../../../core/services/orders.service';
import { PaginationComponent } from '../../../../shared/pagination/pagination.component';
import { LoaderComponent } from '../../../../shared/loader/loader.component';
import { UsersService } from '../../../../core/services/users.service';

/**
 * Interface representing a user for activity logs
 */
interface UsuarioLog {
  id: number;
  name: string;
  roleId: 1 | 2 | 3 | 4;
}

/**
 * Interface representing a linked order in activity logs
 */
interface PedidoVinculado {
  id: number;
  codigo: string;
}

/**
 * Interface representing an activity log entry
 */
interface LogActividad {
  id: number;
  user: UsuarioLog;
  orderId?: number;
  fromStatus?: string;
  toStatus?: string;
  createDate: Date;
  observation?: string;
}

/**
 * Component for displaying and filtering system activity logs
 *
 * @Component
 * @selector app-list
 *
 * @description
 * Provides functionality to:
 * - Display system activity logs with detailed information
 * - Filter logs by user, action type, and date range
 * - View detailed log information
 * - Export filtered logs
 * - Paginate through log entries
 *
 * @example
 * <app-list></app-list>
 */
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PaginationComponent,
    LoaderComponent
  ]
})
export class ListComponent {
  /**
   * Reference to window object (used in template)
   */
  public window = window;

  /**
   * Controls visibility of mobile filters panel
   * @type {boolean}
   * @default false
   */
  public showMobileFilters: boolean = false;

  /**
   * Sample user data for log entries
   * @type {UsuarioLog[]}
   */
  users: UsuarioLog[] = [];

  /**
   * Sample activity log data
   * @type {LogActividad[]}
   */
  logs: LogActividad[] = [];

  // Filter properties
  /**
   * Currently selected user filter
   * @type {number | null}
   * @default null
   */
  userFilter: number | null = null;

  searchUser: string = '';

  /**
   * Currently selected action type filter
   * @type {string | null}
   * @default null
   */
  actionFilter: string | null = null;
  /**
   * Currently selected order number type filter
   * @type {string | null}
   * @default null
   */
  orderFilter: string | null = null;

  /**
   * Start date for date range filter
   * @type {string | null}
   * @default null
   */
  dateFrom: string | null = null;

  /**
   * End date for date range filter
   * @type {string | null}
   * @default null
   */
  dateTo: string | null = null;

  // Pagination properties
  /**
   * Current page number
   * @type {number}
   * @default 1
   */
  currentPage = 1;

  /**
   * Number of items to display per page
   * @type {number}
   * @default 10
   */
  itemsPerPage = 10;
  /**
   * Number of items
   * @type {number}
   * @default 10
   */
  totalItems = 0;

  /**
   * Filtered log entries based on current filters
   * @type {LogActividad[]}
   */
  filteredLogs: LogActividad[] = [];

  /**
   * Currently selected log entry for detailed view
   * @type {LogActividad | null}
   * @default null
   */
  selectedLog: LogActividad | null = null;

  public isLoading: boolean = false;
  /**
   * Component constructor
   * @description
   * Initializes component and applies default filters
   */
  constructor(private orderSvc: OrdersService, private usersSvc: UsersService) {
    this.applyFilters();
    this.getUsers()
  }

  /**
   * Applies current filters to log data
   * @method
   * @description
   * Filters logs based on:
   * - Selected user
   * - Selected action type
   * - Date range
   * Resets pagination to first page after filtering
   */
  applyFilters(): void {
    this.isLoading = true;
    this.orderSvc.getOrderHistory(this.currentPage, this.itemsPerPage, this.dateFrom, this.dateTo, this.userFilter, this.orderFilter,)
      .subscribe({
        error: (err: any) => {
          this.isLoading = false;
          console.error('Error fetching order history', err);
        },
        next: (res: any) => {
          this.isLoading = false;
          console.log('Order history fetched', res);
          this.logs = res.data.results;
          this.totalItems = res.data.rowCount;
        },
        complete: () => {
          this.isLoading = false;
          console.log('Order history fetch complete');
        }
      })
  }

  /**
   * Resets all filters to default values
   * @method
   */
  resetFilters(): void {
    this.userFilter = null;
    this.actionFilter = null;
    this.dateFrom = null;
    this.dateTo = null;
    this.applyFilters();
  }

  /**
   * Handles export functionality for filtered logs
   * @method
   * @description
   * In a real implementation, this would generate an export file (CSV, Excel, etc.)
   */
  exportLogs(): void {
    console.log('Exportando logs:', this.filteredLogs);
    // In a real app, use a library like json2csv or similar
  }

  /**
   * Opens detailed view for a log entry
   * @method
   * @param log Log entry to display
   */
  openLogDetails(log: LogActividad): void {
    this.selectedLog = log;
  }


  onPage(p: number) {
    if (p === this.currentPage) return;
    this.currentPage = p;
    this.applyFilters();
  };

  getUsers() {
    this.isLoading = true;
    this.usersSvc.getUsers(1, 30, null, this.searchUser, '').subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.users = res.data.results;
      },
      error: (err: any) => {
        this.isLoading = false;
        console.error('Error fetching users', err);
      },

    })
  }
}
