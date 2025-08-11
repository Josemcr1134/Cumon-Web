import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

/**
 * Interface representing a user for activity logs
 */
interface UsuarioLog {
  id: number;
  nombre: string;
  role: 'administrador' | 'coordinador' | 'mensajero' | 'soporte';
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
  usuario: UsuarioLog;
  accion: 'creación' | 'modificación' | 'eliminación' | 'cambio_estado' | 'login' | 'logout';
  entidadAfectada: 'pedido' | 'usuario' | 'repartidor' | 'vehículo' | 'configuración';
  idEntidadAfectada?: number;
  estadoAnterior?: string;
  estadoNuevo?: string;
  fechaHora: Date;
  observaciones?: string;
  pedidoVinculado?: PedidoVinculado;
  ipOrigen: string;
  dispositivo: string;
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
    RouterModule
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
  users: UsuarioLog[] = [
    { id: 1, nombre: 'Dra. María Fernanda López', role: 'administrador' },
    { id: 2, nombre: 'Dr. Carlos Andrés Mendoza', role: 'coordinador' },
    { id: 3, nombre: 'Lic. Ana María Rodríguez', role: 'administrador' },
    { id: 4, nombre: 'Enf. Javier Eduardo Gómez', role: 'coordinador' },
    { id: 5, nombre: 'Dr. Luis Fernando Ramírez', role: 'coordinador' }
  ];

  /**
   * Sample activity log data
   * @type {LogActividad[]}
   */
  logs: LogActividad[] = [
   {
      id: 1,
      usuario: this.users[0],
      accion: 'cambio_estado',
      entidadAfectada: 'pedido',
      idEntidadAfectada: 1258,
      estadoAnterior: 'pendiente',
      estadoNuevo: 'asignado',
      fechaHora: new Date('2023-06-15T09:30:45'),
      observaciones: 'Reasignación por falla técnica del repartidor original',
      pedidoVinculado: { id: 1258, codigo: 'PED-2023-1258' },
      ipOrigen: '192.168.1.45',
      dispositivo: 'Windows 10 - Chrome'
    },
    {
      id: 2,
      usuario: this.users[2],
      accion: 'modificación',
      entidadAfectada: 'repartidor',
      idEntidadAfectada: 42,
      fechaHora: new Date('2023-06-15T10:15:22'),
      observaciones: 'Actualización de datos vehiculares',
      ipOrigen: '10.0.0.123',
      dispositivo: 'macOS - Safari'
    },
    {
      id: 3,
      usuario: this.users[1],
      accion: 'creación',
      entidadAfectada: 'pedido',
      idEntidadAfectada: 1259,
      fechaHora: new Date('2023-06-15T11:05:18'),
      pedidoVinculado: { id: 1259, codigo: 'PED-2023-1259' },
      ipOrigen: '172.16.32.10',
      dispositivo: 'Android - App móvil'
    },
    {
      id: 4,
      usuario: this.users[0],
      accion: 'cambio_estado',
      entidadAfectada: 'usuario',
      idEntidadAfectada: 9,
      estadoAnterior: 'pendiente',
      estadoNuevo: 'activo',
      fechaHora: new Date('2023-06-15T14:30:00'),
      observaciones: 'Aprobación de nuevo usuario después de verificación',
      ipOrigen: '192.168.1.100',
      dispositivo: 'Windows 11 - Edge'
    },
    {
      id: 5,
      usuario: this.users[0],
      accion: 'login',
      entidadAfectada: 'usuario',
      idEntidadAfectada: 1,
      fechaHora: new Date('2023-06-15T08:05:12'),
      ipOrigen: '192.168.1.45',
      dispositivo: 'Windows 10 - Chrome'
    },
    {
      id: 6,
      usuario: this.users[3],
      accion: 'eliminación',
      entidadAfectada: 'vehículo',
      idEntidadAfectada: 15,
      fechaHora: new Date('2023-06-14T16:20:33'),
      observaciones: 'Vehículo dado de baja por siniestro',
      ipOrigen: '10.0.1.22',
      dispositivo: 'Windows 10 - Firefox'
    },
    {
      id: 7,
      usuario: this.users[4],
      accion: 'modificación',
      entidadAfectada: 'configuración',
      fechaHora: new Date('2023-06-14T17:45:10'),
      observaciones: 'Actualización de parámetros del sistema',
      ipOrigen: '192.168.1.75',
      dispositivo: 'Linux - Chrome'
    }
  ];

  // Filter properties
  /**
   * Currently selected user filter
   * @type {number | null}
   * @default null
   */
  userFilter: number | null = null;

  /**
   * Currently selected action type filter
   * @type {string | null}
   * @default null
   */
  actionFilter: string | null = null;

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

  /**
   * Component constructor
   * @description
   * Initializes component and applies default filters
   */
  constructor() {
    this.applyFilters();
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
    this.filteredLogs = this.logs.filter(log => {
      // Filter by user
      if (this.userFilter && log.usuario.id !== this.userFilter) {
        return false;
      }

      // Filter by action type
      if (this.actionFilter && log.accion !== this.actionFilter) {
        return false;
      }

      // Filter by start date
      if (this.dateFrom) {
        const fromDate = new Date(this.dateFrom);
        if (log.fechaHora < fromDate) {
          return false;
        }
      }

      // Filter by end date
      if (this.dateTo) {
        const toDate = new Date(this.dateTo);
        toDate.setDate(toDate.getDate() + 1); // Include entire selected day
        if (log.fechaHora >= toDate) {
          return false;
        }
      }

      return true;
    });

    this.currentPage = 1;
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

  /**
   * Gets paginated log entries for current page
   * @readonly
   * @returns {LogActividad[]} Log entries for current page
   */
  get paginatedLogs(): LogActividad[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredLogs.slice(startIndex, startIndex + this.itemsPerPage);
  }

  /**
   * Navigates to next page of log entries
   * @method
   */
  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.filteredLogs.length) {
      this.currentPage++;
    }
  }

  /**
   * Navigates to previous page of log entries
   * @method
   */
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  /**
   * Formats action text for display
   * @method
   * @param action Action type to format
   * @returns {string} Formatted action text
   */
  getActionText(action: string): string {
    return action.replace('_', ' ');
  }
}
