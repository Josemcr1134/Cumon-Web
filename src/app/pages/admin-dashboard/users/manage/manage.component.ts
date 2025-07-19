import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
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
  // Datos de ejemplo
  users = [
    {
      id: 1,
      nombre: 'Dra. María Fernanda López',
      correo: 'maria.lopez@hospitalcentral.com',
      telefono: '3101234567',
      empresa: 'Hospital Central',
      cargo: 'Pediatra Jefe',
      estado: 'active',
      ultimoAcceso: new Date('2023-06-15'),
      permisos: {
        gestionEnvios: true,
        gestionRepartidores: false,
        gestionUsuarios: false,
        verReportes: true,
        configurarSistema: false
      }
    },
    {
      id: 2,
      nombre: 'Dr. Carlos Andrés Mendoza',
      correo: 'carlos.mendoza@clinicasanitas.com',
      telefono: '3152345678',
      empresa: 'Clínica Sanitas',
      cargo: 'Cardiólogo',
      estado: 'active',
      ultimoAcceso: new Date('2023-06-14'),
      permisos: {
        gestionEnvios: true,
        gestionRepartidores: false,
        gestionUsuarios: false,
        verReportes: false,
        configurarSistema: false
      }
    },
    {
      id: 3,
      nombre: 'Lic. Ana María Rodríguez',
      correo: 'ana.rodriguez@farmaciascruzverde.com',
      telefono: '3203456789',
      empresa: 'Farmacias Cruz Verde',
      cargo: 'Coordinadora Logística',
      estado: 'active',
      ultimoAcceso: new Date('2023-06-14'),
      permisos: {
        gestionEnvios: true,
        gestionRepartidores: true,
        gestionUsuarios: false,
        verReportes: true,
        configurarSistema: false
      }
    },
    {
      id: 4,
      nombre: 'Enf. Javier Eduardo Gómez',
      correo: 'javier.gomez@hospitalrosario.com',
      telefono: '3004567890',
      empresa: 'Hospital del Rosario',
      cargo: 'Enfermero Jefe',
      estado: 'active',
      ultimoAcceso: new Date('2023-06-13'),
      permisos: {
        gestionEnvios: true,
        gestionRepartidores: false,
        gestionUsuarios: false,
        verReportes: false,
        configurarSistema: false
      }
    },
    {
      id: 5,
      nombre: 'Dr. Luis Fernando Ramírez',
      correo: 'luis.ramirez@laboratoriodinamico.com',
      telefono: '3015678901',
      empresa: 'Laboratorio Dinámico',
      cargo: 'Patólogo',
      estado: 'active',
      ultimoAcceso: new Date('2023-06-12'),
      permisos: {
        gestionEnvios: true,
        gestionRepartidores: false,
        gestionUsuarios: false,
        verReportes: true,
        configurarSistema: false
      }
    },
    {
      id: 6,
      nombre: 'Dra. Sandra Milena Pérez',
      correo: 'sandra.perez@clinicasanfernando.com',
      telefono: '3026789012',
      empresa: 'Clínica San Fernando',
      cargo: 'Ginecóloga',
      estado: 'inactive',
      ultimoAcceso: new Date('2023-05-20'),
      permisos: {
        gestionEnvios: false,
        gestionRepartidores: false,
        gestionUsuarios: false,
        verReportes: false,
        configurarSistema: false
      }
    },
    {
      id: 7,
      nombre: 'Dr. Juan Pablo Castro',
      correo: 'juan.castro@hospitaluniversitario.com',
      telefono: '3037890123',
      empresa: 'Hospital Universitario',
      cargo: 'Traumatólogo',
      estado: 'active',
      ultimoAcceso: new Date('2023-06-10'),
      permisos: {
        gestionEnvios: true,
        gestionRepartidores: false,
        gestionUsuarios: false,
        verReportes: false,
        configurarSistema: false
      }
    },
    {
      id: 8,
      nombre: 'Lic. Daniela Alejandra Torres',
      correo: 'daniela.torres@farmaciasaves.com',
      telefono: '3048901234',
      empresa: 'Farmacias Aves',
      cargo: 'Gerente de Distribución',
      estado: 'active',
      ultimoAcceso: new Date('2023-06-09'),
      permisos: {
        gestionEnvios: true,
        gestionRepartidores: true,
        gestionUsuarios: false,
        verReportes: true,
        configurarSistema: false
      }
    },
    {
      id: 9,
      nombre: 'Dr. Oscar Eduardo Ruiz',
      correo: 'oscar.ruiz@centromedicoandino.com',
      telefono: '3059012345',
      empresa: 'Centro Médico Andino',
      cargo: 'Neurólogo',
      estado: 'pending',
      ultimoAcceso: new Date('2023-06-01'),
      permisos: {
        gestionEnvios: false,
        gestionRepartidores: false,
        gestionUsuarios: false,
        verReportes: false,
        configurarSistema: false
      }
    },
    {
      id: 10,
      nombre: 'Enf. Laura Valentina Sánchez',
      correo: 'laura.sanchez@clinicasanvicente.com',
      telefono: '3060123456',
      empresa: 'Clínica San Vicente',
      cargo: 'Enfermera Especializada',
      estado: 'active',
      ultimoAcceso: new Date('2023-06-08'),
      permisos: {
        gestionEnvios: true,
        gestionRepartidores: false,
        gestionUsuarios: false,
        verReportes: false,
        configurarSistema: false
      }
    },
    {
      id: 11,
      nombre: 'Dr. Ricardo Antonio Morales',
      correo: 'ricardo.morales@laboratoriolabco.com',
      telefono: '3071234567',
      empresa: 'Laboratorio Labco',
      cargo: 'Microbiólogo',
      estado: 'active',
      ultimoAcceso: new Date('2023-06-07'),
      permisos: {
        gestionEnvios: true,
        gestionRepartidores: false,
        gestionUsuarios: false,
        verReportes: true,
        configurarSistema: false
      }
    },
    {
      id: 12,
      nombre: 'Dra. Patricia Jiménez',
      correo: 'patricia.jimenez@hospitalitaliano.com',
      telefono: '3082345678',
      empresa: 'Hospital Italiano',
      cargo: 'Oncóloga',
      estado: 'active',
      ultimoAcceso: new Date('2023-06-06'),
      permisos: {
        gestionEnvios: true,
        gestionRepartidores: false,
        gestionUsuarios: false,
        verReportes: true,
        configurarSistema: false
      }
    },
    {
      id: 13,
      nombre: 'Lic. Andrés Felipe Gutiérrez',
      correo: 'andres.gutierrez@farmaciascafam.com',
      telefono: '3093456789',
      empresa: 'Farmacias Cafam',
      cargo: 'Director de Operaciones',
      estado: 'active',
      ultimoAcceso: new Date('2023-06-05'),
      permisos: {
        gestionEnvios: true,
        gestionRepartidores: true,
        gestionUsuarios: true,
        verReportes: true,
        configurarSistema: true
      }
    },
    {
      id: 14,
      nombre: 'Enf. Miguel Ángel Rojas',
      correo: 'miguel.rojas@clinicalasamericas.com',
      telefono: '3104567890',
      empresa: 'Clínica Las Américas',
      cargo: 'Enfermero Coordinador',
      estado: 'active',
      ultimoAcceso: new Date('2023-06-04'),
      permisos: {
        gestionEnvios: true,
        gestionRepartidores: false,
        gestionUsuarios: false,
        verReportes: false,
        configurarSistema: false
      }
    },
    {
      id: 15,
      nombre: 'Dr. Fernando José Herrera',
      correo: 'fernando.herrera@centrodiagnostico.com',
      telefono: '3115678901',
      empresa: 'Centro de Diagnóstico',
      cargo: 'Radiólogo',
      estado: 'inactive',
      ultimoAcceso: new Date('2023-04-15'),
      permisos: {
        gestionEnvios: false,
        gestionRepartidores: false,
        gestionUsuarios: false,
        verReportes: false,
        configurarSistema: false
      }
    },
    {
      id: 16,
      nombre: 'Dra. Carolina Estrada',
      correo: 'carolina.estrada@hospitalmilitar.com',
      telefono: '3126789012',
      empresa: 'Hospital Militar',
      cargo: 'Cirujana',
      estado: 'active',
      ultimoAcceso: new Date('2023-06-03'),
      permisos: {
        gestionEnvios: true,
        gestionRepartidores: false,
        gestionUsuarios: false,
        verReportes: true,
        configurarSistema: false
      }
    },
    {
      id: 17,
      nombre: 'Lic. David Leonardo Vargas',
      correo: 'david.vargas@farmaciassaludtotal.com',
      telefono: '3137890123',
      empresa: 'Farmacias Salud Total',
      cargo: 'Especialista en Cadena de Frío',
      estado: 'active',
      ultimoAcceso: new Date('2023-06-02'),
      permisos: {
        gestionEnvios: true,
        gestionRepartidores: true,
        gestionUsuarios: false,
        verReportes: true,
        configurarSistema: false
      }
    },
    {
      id: 18,
      nombre: 'Dr. Eduardo Antonio Silva',
      correo: 'eduardo.silva@clinicasanluis.com',
      telefono: '3148901234',
      empresa: 'Clínica San Luis',
      cargo: 'Internista',
      estado: 'pending',
      ultimoAcceso: new Date('2023-05-25'),
      permisos: {
        gestionEnvios: false,
        gestionRepartidores: false,
        gestionUsuarios: false,
        verReportes: false,
        configurarSistema: false
      }
    },
    {
      id: 19,
      nombre: 'Enf. Diana Marcela Ríos',
      correo: 'diana.rios@hospitalinfantil.com',
      telefono: '3159012345',
      empresa: 'Hospital Infantil',
      cargo: 'Enfermera Pediátrica',
      estado: 'active',
      ultimoAcceso: new Date('2023-06-01'),
      permisos: {
        gestionEnvios: true,
        gestionRepartidores: false,
        gestionUsuarios: false,
        verReportes: false,
        configurarSistema: false
      }
    },
    {
      id: 20,
      nombre: 'Dr. Alfonso Rodríguez',
      correo: 'alfonso.rodriguez@laboratorioslabgen.com',
      telefono: '3160123456',
      empresa: 'Laboratorios Labgen',
      cargo: 'Genetista',
      estado: 'active',
      ultimoAcceso: new Date('2023-05-30'),
      permisos: {
        gestionEnvios: true,
        gestionRepartidores: false,
        gestionUsuarios: false,
        verReportes: true,
        configurarSistema: false
      }
    }
  ];

  filteredUsers = [...this.users];
  companies = ['Hospital Central', 'Farmacias La Salud', 'Clínica del Norte', 'Laboratorios Diagnóstico', 'Otro'];
  roles = [
    'Médico Coordinador',
    'Enfermero Jefe',
    'Gerente de Operaciones',
    'Coordinador Logístico',
    'Auxiliar Administrativo',
    'Técnico de Laboratorio',
    'Otro'
  ];

  // Filtros
  searchQuery = '';
  companyFilter = '';
  roleFilter = '';
  currentPage = 1;
  itemsPerPage = 10;

  // Modal
  showUserModal = false;
  editingUser: any = null;
  showPassword = false;
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      empresa: ['', Validators.required],
      cargo: ['', Validators.required],
      estado: ['active', Validators.required],
      password: ['', [Validators.minLength(8)]],

    });
  }

  ngOnInit(): void {
    this.applyFilters();
  }

  // Filtros y paginación
  applyFilters(): void {
    this.filteredUsers = this.users.filter(user => {
      const matchesSearch =
        user.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.correo.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCompany = this.companyFilter ? user.empresa === this.companyFilter : true;
      const matchesRole = this.roleFilter ? user.cargo === this.roleFilter : true;
      return matchesSearch && matchesCompany && matchesRole;
    });
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.companyFilter = '';
    this.roleFilter = '';
    this.applyFilters();
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.users.length) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Modal y formulario
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

  closeUserModal(): void {
    this.showUserModal = false;
    this.userForm.reset();
    this.showPassword = false;
  }

  saveUser(): void {
    if (this.userForm.invalid) return;

    const formValue = this.userForm.value;
    const newUser = {
      id: this.editingUser ? this.editingUser.id : this.generateId(),
      nombre: formValue.nombre,
      correo: formValue.correo,
      telefono: formValue.telefono,
      empresa: formValue.empresa,
      departamento: formValue.departamento,
      cargo: formValue.cargo,
      estado: formValue.estado,
      ultimoAcceso: this.editingUser ? this.editingUser.ultimoAcceso : null,
      permisos: {
        gestionEnvios: formValue.puedeGestionarEnvios,
        gestionRepartidores: formValue.puedeGestionarRepartidores,
        gestionUsuarios: formValue.puedeGestionarUsuarios,
        verReportes: formValue.puedeVerReportes,
        configurarSistema: formValue.puedeConfigurarSistema
      }
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

  // Helpers
  getStatusText(status: string): string {
    switch(status) {
      case 'active': return 'Activo';
      case 'inactive': return 'Inactivo';
      case 'pending': return 'Pendiente';
      default: return status;
    }
  }

  generateId(): number {
    return Math.max(...this.users.map(u => u.id)) + 1;
  }

  // Eliminar usuario
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
        this.users = this.users.filter(u => u.id !== user.id);
        this.applyFilters();
        Swal.fire(
          'Eliminado',
          'El usuario ha sido eliminado del sistema.',
          'success'
        );
      }
    });
  }

  // Editar usuario
  editUser(user: any): void {
    this.openUserModal(user);
  }

}
