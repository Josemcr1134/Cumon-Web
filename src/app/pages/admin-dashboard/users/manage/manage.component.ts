import { CommonModule } from '@angular/common';
import { Component, createComponent, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CreateComponent } from '../create/create.component';
import { UsersService } from '../../../../core/services/users.service';
import { LoaderComponent } from '../../../../shared/loader/loader.component';

/**
 * Component for managing users in the platform
 *
 * @Component
 * @selector app-manage
 *
 * @description
 * Provides comprehensive user management functionality including:
 * - User listing with filtering and pagination
 * - Create, read, update, and delete (CRUD) operations
 * - Role-based user management
 * - Form validation and user status management
 *
 * @example
 * <app-manage></app-manage>
 */
@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CreateComponent,
    LoaderComponent
  ],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent implements OnInit {
  /**
   * Controls visibility of mobile filters panel
   * @type {boolean}
   * @default false
   */
  public showMobileFilters: boolean = false;

  /**
   * Sample user data (in a real app, this would come from a service)
   * @type {Array<{
   *   id: number,
   *   name: string,
   *   email: string,
   *   phone: string,
   *   document: string,
   *   documentTypeId: string,
   *   roleId: string,
   * }>}
   */
  public users: any[] = [];


  /**
   * Available user roles for filtering/creation
   * @type {string[]}
   */
  roles = [
    {
      id: 1,
      label: 'Administrador'
    },
    {
      id: 2,
      label: 'Coordinador'
    },
    {
      id: 3,
      label: 'Soporte'
    },
    {
      id: 4,
      label: 'Mensajero'
    }
  ];

  // Filter properties
  /**
   * Current search query for filtering users
   * @type {string}
   * @default ''
   */
  searchQuery = '';

  /**
   * Current role filter value
   * @type {any}
   * @default null
   */
  roleFilter: any = null;

  /**
   * Current pagination page
   * @type {number}
   * @default 1
   */
  currentPage = 1;

  /**
   * Number of items to show per page
   * @type {number}
   * @default 10
   */
  itemsPerPage = 10;

  // Modal properties
  /**
   * Controls visibility of user modal
   * @type {boolean}
   * @default false
   */
  showUserModal = false;

  /**
   * Currently edited user (null when creating new)
   * @type {any}
   * @default null
   */
  editingUser: any = null;

  /**
   * Toggles password visibility in forms
   * @type {boolean}
   * @default false
   */
  showPassword = false;

  public isLoading: boolean = false;
  public totalItems: number = 0;
  public userId: any = null
  constructor(private userSvc: UsersService) { }

  /**
   * Angular lifecycle hook - initializes component
   * @method
   */
  ngOnInit(): void {
    this.applyFilters();
  }

  /**
   * Applies current filters to user list
   * @method
   */
  applyFilters(): void {
    this.isLoading = !this.isLoading;

    this.userSvc.getUsers(this.currentPage, this.itemsPerPage, this.roleFilter, this.searchQuery)
      .subscribe({
        error: (err: any) => {
          this.isLoading = !this.isLoading;
          console.log(err);
        },
        next: (resp: any) => {
          this.isLoading = !this.isLoading;
          this.totalItems = resp.data.pageCount * resp.data.pageSize;
          this.users = resp.data.results;
        }
      })
  }

  /**
   * Resets all filters to default values
   * @method
   */
  resetFilters(): void {
    this.searchQuery = '';
    this.roleFilter = null;
    this.applyFilters();
  }

  /**
   * Navigates to next page of results
   * @method
   */
  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.users.length) {
      this.currentPage++;
    }
  }

  /**
   * Navigates to previous page of results
   * @method
   */
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }



  /**
   * Closes user modal and resets form
   * @method
   */
  closeUserModal(): void {
    this.showUserModal = false;
  }


  /**
   * Converts status code to display text
   * @method
   * @param status Status code
   * @returns {string} Display text for status
   */
  getStatusText(status: string): string {
    switch (status) {
      case 'active': return 'Activo';
      case 'inactive': return 'Inactivo';
      case 'pending': return 'Pendiente';
      default: return status;
    }
  }

  /**
   * Generates new ID for user creation
   * @method
   * @returns {number} New unique ID
   */
  generateId(): number {
    return Math.max(...this.users.map((u: any) => u.id)) + 1;
  }

  /**
   * Shows confirmation dialog before deleting user
   * @method
   * @param user User to be deleted
   */
  confirmDelete(user: any): void {
    Swal.fire({
      title: '¿Eliminar usuario?',
      text: `¿Estás seguro de eliminar a ${user.nombre}? Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#08A2CB',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.users = this.users.filter((u: any) => u.id !== user.id);
        this.applyFilters();
        Swal.fire(
          'Eliminado',
          'El usuario ha sido eliminado del sistema.',
          'success'
        );
      }
    });
  }

  openUserModal(isEditing: boolean, userId?: any): void {
    this.editingUser = isEditing;
    this.userId = userId;
    this.showUserModal = true;
  };

}
