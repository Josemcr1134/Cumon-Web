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
      "mercancia": "Extra Grande",
      "ciudad": "Barranquilla",
      "estado": "Entregada"
    },
    {
      "id": 2,
      "fecha": "15-05-2025",
      "procedencia": "Av. 68 # 23 45",
      "destino": "Carrera 15 # 32 89",
      "mercancia": "Grande",
      "ciudad": "Bogotá",
      "estado": "En curso"
    },
    {
      "id": 3,
      "fecha": "18-05-2025",
      "procedencia": "Calle 10 # 5 67",
      "destino": "Diagonal 25 # 14 30",
      "mercancia": "Mediano",
      "ciudad": "Medellín",
      "estado": "Pendiente"
    },
    {
      "id": 4,
      "fecha": "20-05-2025",
      "procedencia": "Carrera 7 # 40 12",
      "destino": "Av. Circunvalar # 62 50",
      "mercancia": "Pequeño",
      "ciudad": "Cali",
      "estado": "Cancelado"
    },
    {
      "id": 5,
      "fecha": "22-05-2025",
      "procedencia": "Calle 80 # 11 45",
      "destino": "Carrera 45 # 80 23",
      "mercancia": "Extra Grande",
      "ciudad": "Cartagena",
      "estado": "Entregada"
    },
    {
      "id": 6,
      "fecha": "25-05-2025",
      "procedencia": "Av. Boyacá # 15 67",
      "destino": "Calle 72 # 10 45",
      "mercancia": "Grande",
      "ciudad": "Bucaramanga",
      "estado": "En curso"
    },
    {
      "id": 7,
      "fecha": "28-05-2025",
      "procedencia": "Carrera 30 # 25 10",
      "destino": "Av. Las Américas # 45 67",
      "mercancia": "Mediano",
      "ciudad": "Pereira",
      "estado": "Pendiente"
    },
    {
      "id": 8,
      "fecha": "01-06-2025",
      "procedencia": "Calle 50 # 20 30",
      "destino": "Diagonal 16 # 28 40",
      "mercancia": "Pequeño",
      "ciudad": "Santa Marta",
      "estado": "Cancelado"
    },
    {
      "id": 9,
      "fecha": "05-06-2025",
      "procedencia": "Av. Santander # 35 20",
      "destino": "Carrera 8 # 12 45",
      "mercancia": "Extra Grande",
      "ciudad": "Manizales",
      "estado": "Entregada"
    },
    {
      "id": 10,
      "fecha": "10-06-2025",
      "procedencia": "Calle 100 # 11 22",
      "destino": "Av. Caracas # 45 67",
      "mercancia": "Grande",
      "ciudad": "Ibagué",
      "estado": "En curso"
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
