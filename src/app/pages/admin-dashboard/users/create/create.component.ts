import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../../../core/services/users.service';
import Swal from 'sweetalert2';
import { GlobalService } from '../../../../core/services/global.service';
import { LoaderComponent } from '../../../../shared/loader/loader.component';

@Component({
  selector: 'app-create',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoaderComponent
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
  /**
    * Action Validation
   * @type {any}
   * @default null
   */
  @Input() editingUser: boolean = false;
  /**
   * Currently edited user (null when creating new)
   * @type {any}
   * @default null
   */
  @Input() userEmail: any = null;


  /**
   * Output event emitter to notify parent to close modal
   * @type {EventEmitter<void>}
   * @default null
   */
  @Output() close = new EventEmitter<boolean>();

  /**
   * Toggles password visibility in forms
   * @type {boolean}
   * @default false
   */
  showPassword = false;
  /**
   * Document types list visibility in forms
   * @type {boolean}
   * @default false
   */
  DocTypes: any = [];

  /**
   * Form group for user creation/editing
   * @type {FormGroup}
   */
  userForm: FormGroup;

  /**
   * Component constructor
   * @param fb FormBuilder service for reactive forms
   */

  public isLoading: boolean = false;
  public userId: any = null;
  constructor(private fb: FormBuilder, private userSvc: UsersService, private globalSvc: GlobalService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      document: ['', [Validators.required, , Validators.pattern(/^[0-9]+$/)]],
      documentTypeId: [null, Validators.required],
      roleId: [null, Validators.required],
      phone: ['', [Validators.required, , Validators.pattern(/^[0-9]+$/)]],
    });
  };

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getDocumentTypes();

    if (this.editingUser) {
      this.getUserById()
    }
  }

  saveUser() {
    if (this.userForm.valid) {
      if (this.editingUser) {
        this.updateUser();
      } else {
        this.createUser();
      }
    } else {
      Swal.fire('Atención', 'Por favor, completa todos los campos requeridos', 'info');
    }
  };

  createUser() {

    this.isLoading = !this.isLoading
    // Logic to create a new user
    this.userSvc.createUser(this.userForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        Swal.fire('Éxito', 'Usuario creado correctamente', 'success');
        this.closeUserModal();
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Error', err.error.messageType || 'Error', 'error');
        this.isLoading = false;
      }
    });
  };

  updateUser() {
    // Logic to update an existing user
    this.userSvc.updateUser(this.userForm.value, this.userId).subscribe({
      next: (res) => {
        console.log(res);
        Swal.fire('Éxito', 'Usuario actualizado correctamente', 'success');
        this.closeUserModal();
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Error', 'Hubo un problema al actualizar el usuario', 'error');
      }
    });

  };

  closeUserModal() {
    this.close.emit(true);
  };

  getDocumentTypes() {
    this.globalSvc.getDocumentTypes()
      .subscribe({
        next: (res: any) => {
          this.DocTypes = res.data;
        },
        error: (err) => {
          console.error(err);
          Swal.fire('Error', 'Hubo un problema al cargar los tipos de documento', 'error');
        }
      });
  };

  getUserById() {
    this.userSvc.getUserById(this.userEmail)
      .subscribe({
        error: (err: any) => {
          console.log(err);
        },
        next: (resp: any) => {
          console.log(resp)
          this.userForm.get('name')?.setValue(resp.data.name)
          this.userForm.get('email')?.setValue(resp.data.email)
          this.userForm.get('phone')?.setValue(resp.data.phone)
          this.userForm.get('roleId')?.setValue(resp.data.roleId)
          this.userForm.get('document')?.setValue(resp.data.document)
          this.userForm.get('documentTypeId')?.setValue(resp.data.documentType.id)
          this.userId = resp.data.id
        }
      })
  }
}
