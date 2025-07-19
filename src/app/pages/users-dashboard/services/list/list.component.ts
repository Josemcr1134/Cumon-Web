import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  public data =[
  {
      "id": 1,
      "fecha": "12-05-2025",
      "procedencia": "Calle 99c # 43 150",
      "destino": "Cra 53 # 82 242",
      "nombreDestinatario": "Carlos Mendoza",
      "mercancia": "Extra Grande",
      "ciudad": "Barranquilla",
      "estado": "Entregada"
    },
    {
      "id": 2,
      "fecha": "15-05-2025",
      "procedencia": "Av. 68 # 23 45",
      "destino": "Carrera 15 # 32 89",
      "nombreDestinatario": "María Rodríguez",
      "mercancia": "Grande",
      "ciudad": "Bogotá",
      "estado": "En curso"
    },
    {
      "id": 3,
      "fecha": "18-05-2025",
      "procedencia": "Calle 10 # 5 67",
      "destino": "Diagonal 25 # 14 30",
      "nombreDestinatario": "José Gutiérrez",
      "mercancia": "Mediano",
      "ciudad": "Medellín",
      "estado": "Pendiente"
    },
    {
      "id": 4,
      "fecha": "20-05-2025",
      "procedencia": "Carrera 7 # 40 12",
      "destino": "Av. Circunvalar # 62 50",
      "nombreDestinatario": "Ana Contreras",
      "mercancia": "Pequeño",
      "ciudad": "Cali",
      "estado": "Cancelado"
    },
    {
      "id": 5,
      "fecha": "22-05-2025",
      "procedencia": "Calle 80 # 11 45",
      "destino": "Carrera 45 # 80 23",
      "nombreDestinatario": "Luisa Fernández",
      "mercancia": "Extra Grande",
      "ciudad": "Cartagena",
      "estado": "Entregada"
    }
  ];
  searchTerm: string = '';
  filteredEnvios: any[] = this.data;

  filterTable() {
    if (!this.searchTerm) {
      this.filteredEnvios = this.data;
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredEnvios = this.data.filter(envio =>
      envio.fecha.toLowerCase().includes(searchTermLower) ||
      envio.procedencia.toLowerCase().includes(searchTermLower) ||
      envio.destino.toLowerCase().includes(searchTermLower) ||
      envio.mercancia.toLowerCase().includes(searchTermLower) ||
      envio.ciudad.toLowerCase().includes(searchTermLower) ||
      envio.estado.toLowerCase().includes(searchTermLower)
    );
  }
}
