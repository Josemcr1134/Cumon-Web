import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrdersService } from '../../../../core/services/orders.service';

@Component({
  selector: 'app-evidences-modal',
  imports: [
    CommonModule
  ],
  templateUrl: './evidences-modal.component.html',
  styleUrl: './evidences-modal.component.css'
})
export class EvidencesModalComponent implements OnInit {
  @Input() orderId: number | null = null;
  @Output() close = new EventEmitter();

  public data: any = null;
  public evidences: any[] = [];
  public isLoading: boolean = false;
  constructor(private orderSvc: OrdersService) { }

  ngOnInit(): void {
    this.getEvidences();
  }

  getEvidences() {
    this.isLoading = !this.isLoading;
    this.orderSvc.getOrderEvidences(this.orderId!).subscribe({
      next: (res: any) => {
        this.data = res.data;
        res.data.forEach((element: any) => {
          if (element.toStatus == 'Delivered') {
            this.evidences = element.orderEvidences;
          }
        })


        console.log(res)
        this.isLoading = !this.isLoading;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = !this.isLoading;
      }
    });
  };

  goAway() {
    this.close.emit(true);
  };



  // Añade estas utilidades al componente del modal
  allowedImg = ['.jpg', '.jpeg', '.png', 'image/jpg', 'image/jpeg', 'image/png', '.webp', 'image/webp'];
  allowedPdf = ['.pdf', 'application/pdf'];
  allowedDoc = ['.doc', '.docx', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

  isImage(extOrMime?: string): boolean {
    const v = (extOrMime || '').toLowerCase();
    return this.allowedImg.some(x => v.includes(x));
  }

  isPdf(extOrMime?: string): boolean {
    const v = (extOrMime || '').toLowerCase();
    return this.allowedPdf.some(x => v.includes(x));
  }

  isDoc(extOrMime?: string): boolean {
    const v = (extOrMime || '').toLowerCase();
    return this.allowedDoc.some(x => v.includes(x));
  }

  // Ícono inline (SVG string) según tipo (simple y ligero)
  getIcon(extOrMime?: string): string {
    if (this.isImage(extOrMime)) {
      return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5a2 2 0 0 0-2-2H5..."/></svg>`;
    }
    if (this.isPdf(extOrMime)) {
      return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 2h7l5 5v15a2 2 0 0 1-2 2H6..."/></svg>`;
    }
    return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16..."/></svg>`;
  }

  // Acciones
  downloadEvidence(ev: any) {
    const url = ev.urlFile || ev.url;
    if (!url) return;
    const a = document.createElement('a');
    a.href = url;
    a.download = ev.originalName || 'evidencia';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  async copyLink(ev: any) {
    const url = ev.urlFile || ev.url;
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      // Opcional: muestra un toast
    } catch {
      // Fallback: prompt
      window.prompt('Copia el enlace:', url);
    }
  }

  // Si quieres permitir eliminar desde el modal:
  canDelete = true;
  removeEvidence(index: number) {
    // Emite evento o manipula el array según tu flujo:
    this.evidences.splice(index, 1);
  }

}
