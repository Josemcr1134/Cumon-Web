import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { MapaViewerComponent } from '../mapa-viewer/mapa-viewer.component';
import { ZoneService } from '../../../../../core/services/zone.services';
import { LoaderComponent } from '../../../../../shared/loader/loader.component';

/**
 * Interface para representar un punto geográfico
 */
interface GeographicPoint {
  name: string;
  latitud: number;
  longitud: number;
}

/**
 * Componente para creación/edición de nuevas zonas geográficas
 *
 * @Component
 * @selector app-new
 *
 * @description
 * Componente que maneja el formulario para:
 * - Crear nuevas zonas geográficas
 * - Editar zonas existentes
 * - Gestionar puntos geográficos asociados
 *
 * @example
 * <app-new
 *   [data]="zoneData"
 *   (zonaSubmit)="handleSubmit($event)"
 *   (cancel)="handleCancel()">
 * </app-new>
 */
@Component({
  selector: 'app-new',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MapaViewerComponent,
    ReactiveFormsModule,
    LoaderComponent
  ],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css'
})
export class NewComponent implements OnInit, OnChanges {
  /**
   * EventEmitter para enviar los datos del formulario al componente padre
   * @event
   * @type {EventEmitter<any>}
   */
  @Output() zonaSubmit = new EventEmitter<any>();

  /**
   * EventEmitter para notificar la cancelación al componente padre
   * @event
   * @type {EventEmitter<any>}
   */
  @Output() cancel = new EventEmitter<any>();
  @Output() refresh = new EventEmitter<any>();

  /**
   * Datos de la zona a editar (opcional)
   * @input
   * @type {any}
   */
  @Input() data: any;

  /**
   * FormGroup para el formulario de zona geográfica
   * @type {FormGroup}
   */
  zoneForm: FormGroup;

  /**
   * Constructor del componente
   * @param fb Servicio FormBuilder para crear formularios reactivos
   */
  constructor(private fb: FormBuilder, private zoneSvc: ZoneService) {
    this.zoneForm = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      description: ['', Validators.required],
      geographicPoints: this.fb.array([])
    });
  }

  public isLoading: boolean = false;

  /**
   * Inicialización del componente
   * @method
   */
  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Maneja cambios en las propiedades de entrada
   * @method
   * @param changes Objeto con los cambios detectados
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.loadData();
  }

  /**
   * Carga los datos en el formulario cuando hay información de entrada
   * @method
   */
  loadData(): void {
    // Limpiar el FormArray antes de cargar nuevos datos
    this.ArrayPoints.clear();
    if (this.data) {
      this.zoneForm.get('name')?.setValue(this.data.name);
      this.zoneForm.get('city')?.setValue(this.data.city);
      this.zoneForm.get('description')?.setValue(this.data.description);

      this.data.geographicPoints.forEach((g: any) => {
        const pointGroup = this.createZoneGroupForm();
        pointGroup.patchValue({
          name: g.name,
          latitude: g.latitude,
          longitude: g.longitude,
          id: g.id,
          geographicalAreaId: g.geographicalAreaId
        });
        this.ArrayPoints.push(pointGroup);
      });
    } else {
      this.zoneForm.reset();
    }
  }

  /**
   * Getter para acceder al FormArray de puntos geográficos
   * @returns {FormArray} El FormArray de puntos geográficos
   */
  get ArrayPoints(): FormArray {
    return this.zoneForm.get('geographicPoints') as FormArray;
  }

  /**
   * Crea un FormGroup para un punto geográfico
   * @method
   * @returns {FormGroup} FormGroup configurado para un punto geográfico
   */
  createZoneGroupForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      latitude: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
      longitude: ['', [Validators.required, Validators.min(-180), Validators.max(180)]],
      geographicalAreaId: ['']
    });
  }

  /**
   * Agrega un nuevo punto geográfico al formulario
   * @method
   */
  agregarPunto() {
    this.ArrayPoints.push(this.createZoneGroupForm());
  }

  /**
   * Elimina un punto geográfico del formulario
   * @method
   * @param id Id del punto a eliminar
   */
  eliminarPunto(id: any) {
    this.isLoading = !this.isLoading;
    this.zoneSvc.deletePoint(id)
      .subscribe({
        error: (err: any) => {
          console.log(err);
          Swal.fire('Oooops', err.message, 'error');
          this.isLoading = !this.isLoading;
        },
        next: (resp: any) => {
          Swal.fire('Éxito', 'Punto eliminado', 'success');

          this.refresh.emit(true);
          this.isLoading = !this.isLoading;
        }
      });
  };

  /**
   * Maneja el envío del formulario
   * @method
   * @description
   * Valida el formulario y:
   * - Si es válido, emite los datos y resetea el formulario
   * - Si no es válido, muestra un mensaje de error
   */
  onSubmit() {
    if (this.zoneForm.valid) {
      this.zonaSubmit.emit(this.zoneForm.value);
      this.zoneForm.reset();
      this.ArrayPoints.clear();
      this.agregarPunto();
    } else {
      console.log(this.zoneForm.value)
      Swal.fire('Atención', 'Debes llenar todos los campos del formulario', 'info');
    }
  }
}
