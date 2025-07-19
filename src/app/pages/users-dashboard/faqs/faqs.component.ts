import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-faqs',
  imports: [
    CommonModule
  ],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.css'
})
export class FaqsComponent {
// Agrega esta propiedad a tu componente
activeFAQ: number | null = null;

// Y este método para manejar el acordeón
toggleFAQ(index: number): void {
  this.activeFAQ = this.activeFAQ === index ? null : index;
}
}
