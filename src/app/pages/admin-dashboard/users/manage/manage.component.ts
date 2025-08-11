import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

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
    ReactiveFormsModule
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
   *   nombre: string,
   *   correo: string,
   *   document: string,
   *   documentType: string,
   *   role: string,
   *   estado: string
   * }>}
   */
  public users =  [
    {
      id: 1,
      nombre: 'Dra. María Fernanda López',
      correo: 'maria.lopez@hospitalcentral.com',
      document: '12345678',
      documentType: 'CC',
      role: 'Coordinador',
      estado: 'activo'
    },
    {
      id: 2,
      nombre: 'Dr. Carlos Andrés Mendoza',
      correo: 'carlos.mendoza@clinicasanitas.com',
      document: '23456789',
      documentType: 'CC',
      role: 'Coordinador',
      estado: 'activo'
    },
    {
      id: 3,
      nombre: 'Lic. Ana María Rodríguez',
      correo: 'ana.rodriguez@farmaciascruzverde.com',
      document: '34567890',
      documentType: 'CC',
      role: 'Administrador',
      estado: 'activo'
    },
    {
      id: 4,
      nombre: 'Enf. Javier Eduardo Gómez',
      correo: 'javier.gomez@hospitalrosario.com',
      document: '45678901',
      documentType: 'CC',
      role: 'Coordinador',
      estado: 'activo'
    },
    {
      id: 5,
      nombre: 'Dr. Luis Fernando Ramírez',
      correo: 'luis.ramirez@laboratoriodinamico.com',
      document: '56789012',
      documentType: 'CC',
      role: 'Coordinador',
      estado: 'activo'
    },
    {
      id: 6,
      nombre: 'Dra. Sandra Milena Pérez',
      correo: 'sandra.perez@clinicasanfernando.com',
      document: '67890123',
      documentType: 'CC',
      role: 'Soporte',
      estado: 'inactivo'
    },
    {
      id: 7,
      nombre: 'Dr. Juan Pablo Castro',
      correo: 'juan.castro@hospitaluniversitario.com',
      document: '78901234',
      documentType: 'CC',
      role: 'Coordinador',
      estado: 'activo'
    },
    {
      id: 8,
      nombre: 'Lic. Daniela Alejandra Torres',
      correo: 'daniela.torres@farmaciasaves.com',
      document: '89012345',
      documentType: 'CC',
      role: 'Administrador',
      estado: 'activo'
    },
    {
      id: 9,
      nombre: 'Dr. Oscar Eduardo Ruiz',
      correo: 'oscar.ruiz@centromedicoandino.com',
      document: '90123456',
      documentType: 'CC',
      role: 'mensajero',
      estado: 'inactivo'
    },
    {
      id: 10,
      nombre: 'Enf. Laura Valentina Sánchez',
      correo: 'laura.sanchez@clinicasanvicente.com',
      document: '01234567',
      documentType: 'CC',
      role: 'Coordinador',
      estado: 'activo'
    },
    {
      id: 11,
      nombre: 'Dr. Ricardo Antonio Morales',
      correo: 'ricardo.morales@laboratoriolabco.com',
      document: '11223344',
      documentType: 'CC',
      role: 'Coordinador',
      estado: 'activo'
    },
    {
      id: 12,
      nombre: 'Dra. Patricia Jiménez',
      correo: 'patricia.jimenez@hospitalitaliano.com',
      document: '22334455',
      documentType: 'CC',
      role: 'Coordinador',
      estado: 'activo'
    },
    {
      id: 13,
      nombre: 'Lic. Andrés Felipe Gutiérrez',
      correo: 'andres.gutierrez@farmaciascafam.com',
      document: '33445566',
      documentType: 'CC',
      role: 'Administrador',
      estado: 'activo'
    },
    {
      id: 14,
      nombre: 'Enf. Miguel Ángel Rojas',
      correo: 'miguel.rojas@clinicalasamericas.com',
      document: '44556677',
      documentType: 'CC',
      role: 'Coordinador',
      estado: 'activo'
    },
    {
      id: 15,
      nombre: 'Dr. Fernando José Herrera',
      correo: 'fernando.herrera@centrodiagnostico.com',
      document: '55667788',
      documentType: 'CC',
      role: 'Mensajero',
      estado: 'inactivo'
    },
    {
      id: 16,
      nombre: 'Dra. Carolina Estrada',
      correo: 'carolina.estrada@hospitalmilitar.com',
      document: '66778899',
      documentType: 'CC',
      role: 'Coordinador',
      estado: 'activo'
    },
    {
      id: 17,
      nombre: 'Lic. David Leonardo Vargas',
      correo: 'david.vargas@farmaciassaludtotal.com',
      document: '77889900',
      documentType: 'CC',
      role: 'Administrador',
      estado: 'activo'
    },
    {
      id: 18,
      nombre: 'Dr. Eduardo Antonio Silva',
      correo: 'eduardo.silva@clinicasanluis.com',
      document: '88990011',
      documentType: 'CC',
      role: 'mensajero',
      estado: 'inactivo'
    },
    {
      id: 19,
      nombre: 'Enf. Diana Marcela Ríos',
      correo: 'diana.rios@hospitalinfantil.com',
      document: '99001122',
      documentType: 'CC',
      role: 'Coordinador',
      estado: 'activo'
    },
    {
      id: 20,
      nombre: 'Dr. Alfonso Rodríguez',
      correo: 'alfonso.rodriguez@laboratorioslabgen.com',
      document: '00112233',
      documentType: 'CC',
      role: 'Coordinador',
      estado: 'activo'
    }
  ];

  /**
   * Filtered list of users based on current filters
   * @type {Array}
   */
  filteredUsers = [...this.users];

  /**
   * Available user roles for filtering/creation
   * @type {string[]}
   */
  roles = [
    'Mensajero',
    'Administrador',
    'Soporte',
    'Coordinador',
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
   * @type {string}
   * @default ''
   */
  roleFilter = '';

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

  /**
   * Form group for user creation/editing
   * @type {FormGroup}
   */
  userForm: FormGroup;

  /**
   * Component constructor
   * @param fb FormBuilder service for reactive forms
   */
  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      document: ['', Validators.required],
      documentType: ['', Validators.required],
      role: ['', Validators.required],
      estado: ['active', Validators.required],
      password: ['', [Validators.minLength(8)]],
    });
  }

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
    this.filteredUsers = this.users.filter((user:any) => {
      const matchesSearch =
        user.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.correo.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesRole = this.roleFilter ? user.role === this.roleFilter : true;
      return matchesSearch && matchesRole;
    });
  }

  /**
   * Resets all filters to default values
   * @method
   */
  resetFilters(): void {
    this.searchQuery = '';
    this.roleFilter = '';
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
   * Opens user modal for creation/editing
   * @method
   * @param user Optional user object to edit (null for new user)
   */
  openUserModal(user?: any): void {
    this.editingUser = user || null;

    if (user) {
      this.userForm.patchValue({
        ...user,
      });
      this.userForm.get('password')?.clearValidators();
    } else {
      this.userForm.reset({
        estado: 'active',
      });
      this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(8)]);
    }

    this.showUserModal = true;
  }

  /**
   * Closes user modal and resets form
   * @method
   */
  closeUserModal(): void {
    this.showUserModal = false;
    this.userForm.reset();
    this.showPassword = false;
  }

  /**
   * Saves user data (create or update)
   * @method
   */
  saveUser(): void {
    if (this.userForm.invalid) return;

    const formValue = this.userForm.value;
    const newUser = {
      id: this.editingUser ? this.editingUser.id : this.generateId(),
      nombre: formValue.nombre,
      correo: formValue.correo,
      role: formValue.role,
      estado: formValue.estado,
      document: formValue.document,
      documentType: formValue.documentType
    };

    if (this.editingUser) {
      const index = this.users.findIndex(u => u.id === this.editingUser.id);
      this.users[index] = newUser;
      Swal.fire({
        icon: 'success',
        title: 'Usuario actualizado',
        text: 'La información del usuario se ha actualizado correctamente',
        confirmButtonColor: '#08A2CB'
      });
    } else {
      this.users.unshift(newUser);
      Swal.fire({
        icon: 'success',
        title: 'Usuario creado',
        text: 'El nuevo usuario ha sido registrado en el sistema',
        confirmButtonColor: '#08A2CB'
      });
    }

    this.applyFilters();
    this.closeUserModal();
  }


  /**
   * Converts status code to display text
   * @method
   * @param status Status code
   * @returns {string} Display text for status
   */
  getStatusText(status: string): string {
    switch(status) {
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
    return Math.max(...this.users.map((u:any) => u.id)) + 1;
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
        this.users = this.users.filter((u:any) => u.id !== user.id);
        this.applyFilters();
        Swal.fire(
          'Eliminado',
          'El usuario ha sido eliminado del sistema.',
          'success'
        );
      }
    });
  }

  /**
   * Opens edit modal for specified user
   * @method
   * @param user User to edit
   */
  editUser(user: any): void {
    this.openUserModal(user);
  }
}
