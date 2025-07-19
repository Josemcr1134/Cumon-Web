import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  public data = [
    {
      "id": 1,
      "fecha": "12-05-2025",
      "procedencia": "Calle 99c # 43 150",
      "destino": "Cra 53 # 82 242",
      "nombreDestinatario": "Carlos Mendoza",
      "mercancia": "Extra Grande",
      "ciudad": "Barranquilla",
      "estado": "Entregada",
      "remitente": "Pedro Martínez"
    },
    {
      "id": 2,
      "fecha": "15-05-2025",
      "procedencia": "Av. 68 # 23 45",
      "destino": "Carrera 15 # 32 89",
      "nombreDestinatario": "María Rodríguez",
      "mercancia": "Grande",
      "ciudad": "Bogotá",
      "estado": "En curso",
      "remitente": "Juan Pérez"
    },
    {
      "id": 3,
      "fecha": "18-05-2025",
      "procedencia": "Calle 10 # 5 67",
      "destino": "Diagonal 25 # 14 30",
      "nombreDestinatario": "José Gutiérrez",
      "mercancia": "Mediano",
      "ciudad": "Medellín",
      "estado": "Pendiente",
      "remitente": "Laura González"
    },
    {
      "id": 4,
      "fecha": "20-05-2025",
      "procedencia": "Carrera 7 # 40 12",
      "destino": "Av. Circunvalar # 62 50",
      "nombreDestinatario": "Ana Contreras",
      "mercancia": "Pequeño",
      "ciudad": "Cali",
      "estado": "Cancelado",
      "remitente": "Diego Sánchez"
    },
    {
      "id": 5,
      "fecha": "22-05-2025",
      "procedencia": "Calle 80 # 11 45",
      "destino": "Carrera 45 # 80 23",
      "nombreDestinatario": "Luisa Fernández",
      "mercancia": "Extra Grande",
      "ciudad": "Cartagena",
      "estado": "Entregada",
      "remitente": "Sofía Ramírez"
    },
    {
      "id": 6,
      "fecha": "25-05-2025",
      "procedencia": "Carrera 20 # 35 10",
      "destino": "Calle 45 # 22 15",
      "nombreDestinatario": "Andrés López",
      "mercancia": "Grande",
      "ciudad": "Bucaramanga",
      "estado": "En curso",
      "remitente": "Camila Torres"
    },
    {
      "id": 7,
      "fecha": "28-05-2025",
      "procedencia": "Av. 30 # 12 34",
      "destino": "Carrera 10 # 5 67",
      "nombreDestinatario": "Daniel Castro",
      "mercancia": "Mediano",
      "ciudad": "Pereira",
      "estado": "Pendiente",
      "remitente": "Ricardo Mendez"
    },
    {
      "id": 8,
      "fecha": "30-05-2025",
      "procedencia": "Calle 15 # 8 90",
      "destino": "Diagonal 40 # 25 60",
      "nombreDestinatario": "Patricia Ruiz",
      "mercancia": "Pequeño",
      "ciudad": "Santa Marta",
      "estado": "Entregada",
      "remitente": "Oscar Jiménez"
    },
    {
      "id": 9,
      "fecha": "02-06-2025",
      "procedencia": "Carrera 50 # 70 12",
      "destino": "Av. 80 # 45 30",
      "nombreDestinatario": "Fernando Herrera",
      "mercancia": "Extra Grande",
      "ciudad": "Manizales",
      "estado": "Cancelado",
      "remitente": "Adriana Silva"
    },
    {
      "id": 10,
      "fecha": "05-06-2025",
      "procedencia": "Calle 25 # 18 42",
      "destino": "Carrera 30 # 25 15",
      "nombreDestinatario": "Gabriela Morales",
      "mercancia": "Grande",
      "ciudad": "Cúcuta",
      "estado": "En curso",
      "remitente": "Hugo Rojas"
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
      envio.nombreDestinatario.toLowerCase().includes(searchTermLower) ||
      envio.mercancia.toLowerCase().includes(searchTermLower) ||
      envio.ciudad.toLowerCase().includes(searchTermLower) ||
      envio.estado.toLowerCase().includes(searchTermLower) ||
      envio.remitente.toLowerCase().includes(searchTermLower)
    );
  }
}
