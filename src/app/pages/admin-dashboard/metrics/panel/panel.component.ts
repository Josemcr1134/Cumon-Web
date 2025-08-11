import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * Interface representing a metric card for dashboard display
 */
interface MetricCard {
  title: string;
  value: string | number;
  icon: string;
  change: number;
  changeType: 'positive' | 'negative';
  description?: string;
}

/**
 * Interface representing courier performance metrics
 */
interface CourierPerformance {
  id: number;
  name: string;
  zone: string;
  assigned: number;
  delivered: number;
  successRate: number;
  avgTime: number;
  satisfaction: number;
}

/**
 * Interface representing zone-specific metrics
 */
interface ZoneMetric {
  name: string;
  totalOrders: number;
  delivered: number;
  pending: number;
  id: any;
}

/**
 * Dashboard panel component for displaying delivery metrics and analytics
 *
 * @Component
 * @selector app-panel
 *
 * @description
 * Provides a comprehensive dashboard view with:
 * - Key performance metrics cards
 * - Courier performance statistics
 * - Zone-based delivery analytics
 * - Advanced filtering capabilities
 * - Data export functionality
 *
 * @example
 * <app-panel></app-panel>
 */
@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PanelComponent implements OnInit {
  // Filter properties
  /**
   * Current time range filter ('week', 'month', etc.)
   * @type {string}
   * @default 'week'
   */
  timeRange: string = 'week';

  /**
   * Currently selected zone filter
   * @type {string}
   * @default ''
   */
  zoneFilter: string = '';

  /**
   * Currently selected courier filter
   * @type {string}
   * @default ''
   */
  courierFilter: string = '';

  /**
   * Start date for custom date range filter
   * @type {string}
   */
  startDate: string = '';

  /**
   * End date for custom date range filter
   * @type {string}
   */
  endDate: string = '';

  /**
   * Controls visibility of advanced filters panel
   * @type {boolean}
   * @default false
   */
  showAdvancedFilters: boolean = false;

  /**
   * Time period for chart data display
   * @type {string}
   * @default 'week'
   */
  chartPeriod: string = 'week';

  // Sample data
  /**
   * Key delivery performance metrics
   * @type {{
   *   totalOrders: number,
   *   ordersChange: number,
   *   deliveredOrders: number,
   *   deliveryRate: number,
   *   avgDeliveryTime: number,
   *   timeChange: number,
   *   satisfactionRate: number,
   *   satisfactionChange: number
   * }}
   */
  metrics = {
    totalOrders: 342,
    ordersChange: 12.5,
    deliveredOrders: 298,
    deliveryRate: 87.1,
    avgDeliveryTime: 45,
    timeChange: -3,
    satisfactionRate: 92,
    satisfactionChange: 2.5
  };

  /**
   * Courier performance data
   * @type {CourierPerformance[]}
   */
  courierPerformance: CourierPerformance[] = [
    { id: 1, name: 'Juan Pérez', zone: 'Norte', assigned: 45, delivered: 42, successRate: 93, avgTime: 38, satisfaction: 4.8 },
    { id: 2, name: 'María Gómez', zone: 'Sur', assigned: 38, delivered: 35, successRate: 92, avgTime: 42, satisfaction: 4.7 },
    { id: 3, name: 'Carlos Rojas', zone: 'Centro', assigned: 52, delivered: 48, successRate: 92, avgTime: 47, satisfaction: 4.6 },
    { id: 4, name: 'Ana López', zone: 'Este', assigned: 41, delivered: 37, successRate: 90, avgTime: 51, satisfaction: 4.5 },
    { id: 5, name: 'Pedro Sánchez', zone: 'Oeste', assigned: 36, delivered: 32, successRate: 89, avgTime: 49, satisfaction: 4.4 }
  ];

  /**
   * Zone-specific metrics
   * @type {ZoneMetric[]}
   */
   zones: ZoneMetric[] = [
    {id:1,  name: 'Norte', totalOrders: 120, delivered: 110, pending: 10 },
    {id:2,  name: 'Sur', totalOrders: 95, delivered: 85, pending: 10 },
    {id:3,  name: 'Centro', totalOrders: 150, delivered: 140, pending: 10 },
    {id:4,  name: 'Este', totalOrders: 80, delivered: 70, pending: 10 },
    {id:5,  name: 'Oeste', totalOrders: 65, delivered: 55, pending: 10 }
  ];


  /**
   * List of available couriers for filtering
   * @type {Array<{id: number, name: string}>}
   */
  couriers = [
    { id: 1, name: 'Juan Pérez' },
    { id: 2, name: 'María Gómez' },
    { id: 3, name: 'Carlos Rojas' },
    { id: 4, name: 'Ana López' },
    { id: 5, name: 'Pedro Sánchez' }
  ];

  /**
   * List of available zones for filtering
   * @type {Array<{id: string, name: string}>}
   */
  zonesList = [
    { id: 'norte', name: 'Norte' },
    { id: 'sur', name: 'Sur' },
    { id: 'centro', name: 'Centro' },
    { id: 'este', name: 'Este' },
    { id: 'oeste', name: 'Oeste' }
  ];


  // Pagination
  /**
   * Current page number for courier performance table
   * @type {number}
   * @default 1
   */
  currentPage: number = 1;

  /**
   * Number of items to display per page
   * @type {number}
   * @default 5
   */
  itemsPerPage: number = 5;

  /**
   * Total number of couriers (for pagination)
   * @type {number}
   */
  totalCouriers: number = this.courierPerformance.length;

  /**
   * Form group for filter controls
   * @type {FormGroup}
   */
  filtersForm: FormGroup;

  /**
   * Component constructor
   * @param fb FormBuilder service for reactive forms
   */
  constructor(private fb: FormBuilder) {
    this.filtersForm = this.fb.group({
      timeRange: ['week'],
      zone: [''],
      courier: [''],
      startDate: [''],
      endDate: ['']
    });
  }

  /**
   * Angular lifecycle hook - initializes component
   * @method
   */
  ngOnInit(): void {
    this.setDefaultDates();
  }

  /**
   * Sets default date range (last 7 days)
   * @method
   */
  setDefaultDates(): void {
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);

    this.startDate = lastWeek.toISOString().split('T')[0];
    this.endDate = today.toISOString().split('T')[0];
  }

  /**
   * Applies current filters to dashboard data
   * @method
   * @description
   * In a real implementation, this would call an API service
   * Currently simulates filtered data with random values
   */
  applyFilters(): void {
    console.log('Aplicando filtros:', {
      timeRange: this.timeRange,
      zoneFilter: this.zoneFilter,
      courierFilter: this.courierFilter,
      startDate: this.startDate,
      endDate: this.endDate
    });

    // Simulate API call with timeout
    setTimeout(() => {
      this.metrics = {
        totalOrders: Math.floor(Math.random() * 400) + 100,
        ordersChange: (Math.random() * 20 - 5),
        deliveredOrders: Math.floor(Math.random() * 350) + 80,
        deliveryRate: Math.floor(Math.random() * 20) + 80,
        avgDeliveryTime: Math.floor(Math.random() * 30) + 30,
        timeChange: (Math.random() * 10 - 5),
        satisfactionRate: Math.floor(Math.random() * 15) + 85,
        satisfactionChange: (Math.random() * 5 - 1)
      };
    }, 500);
  }

  /**
   * Handles export functionality for dashboard metrics
   * @method
   * @description
   * In a real implementation, this would generate an Excel/PDF report
   */
  exportMetrics(): void {
    console.log('Exportando métricas...');
    alert('Métricas exportadas correctamente');
  }

  /**
   * Navigates to previous page of courier performance data
   * @method
   */
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  /**
   * Navigates to next page of courier performance data
   * @method
   */
  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.totalCouriers) {
      this.currentPage++;
    }
  }

  /**
   * Generates metric cards for dashboard display
   * @method
   * @returns {MetricCard[]} Array of metric card objects
   */
  getMetricCards(): MetricCard[] {
    return [
      {
        title: 'Total pedidos',
        value: this.metrics.totalOrders,
        icon: 'chart-bar',
        change: this.metrics.ordersChange,
        changeType: this.metrics.ordersChange >= 0 ? 'positive' : 'negative',
        description: 'vs periodo anterior'
      },
      // ... (other cards remain the same)
    ];
  }

  /**
   * Gets paginated courier performance data
   * @method
   * @returns {CourierPerformance[]} Current page of courier data
   */
  getPaginatedCouriers(): CourierPerformance[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.courierPerformance.slice(startIndex, startIndex + this.itemsPerPage);
  }
}
