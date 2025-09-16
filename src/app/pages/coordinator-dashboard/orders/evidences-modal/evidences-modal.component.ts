import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrdersService } from '../../../../core/services/orders.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
  constructor(private orderSvc: OrdersService, private sanitizer: DomSanitizer) { }

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
  getIcon(extOrMime?: string): SafeHtml {
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                </svg>
                `;
    if (this.isImage(extOrMime)) {
      svg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            `;
    } else if (this.isPdf(extOrMime)) {
      svg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              `;
    }
    return this.sanitizer.bypassSecurityTrustHtml(svg);
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
