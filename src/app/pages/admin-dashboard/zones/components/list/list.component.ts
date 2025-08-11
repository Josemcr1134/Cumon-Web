import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * Componente para listar y seleccionar zonas geográficas
 *
 * @Component
 * @selector app-list
 *
 * @description
 * Muestra una lista de zonas geográficas y permite seleccionar una para ver detalles.
 * Emite un evento cuando se selecciona una zona.
 *
 * @example
 * <app-list
 *   [zones]="zonesArray"
 *   (zoneSelected)="onZoneSelected($event)">
 * </app-list>
 */
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  /**
   * Lista de zonas geográficas a mostrar
   * @input
   * @type {Array<any>}
   * @default []
   */
  @Input() zones: any[] = [];

  /**
   * Evento que se emite cuando se selecciona una zona
   * @output
   * @type {EventEmitter<any>}
   */
  @Output() zoneSelected = new EventEmitter<any>();

  /**
   * Zona actualmente seleccionada
   * @type {any}
   */
  public selectedZone: any = null;

  /**
   * Inicialización del componente
   * @method
   * @description
   * Selecciona automáticamente la primera zona de la lista al inicializar
   */
  ngOnInit(): void {
    if (this.zones.length > 0) {
      this.selectZone(this.zones[0]);
    }
  }

  /**
   * Selecciona una zona y emite el evento
   * @method
   * @param z Zona seleccionada
   */
  selectZone(z: any): void {
    this.selectedZone = z;
    this.zoneSelected.emit(z);
  }
}
