import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styles: [`
    :host { display:block; }
    button[disabled], a[aria-disabled="true"] { cursor: default; opacity: .5; }
  `],
  template: `
  <nav class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 select-none"
       role="navigation" aria-label="Pagination">
    <!-- Prev -->
    <div class="-mt-px flex w-0 flex-1">
      <a
        href="javascript:void(0)"
        class="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        [attr.aria-disabled]="isFirst() ? 'true' : null"
        (click)="prev()">
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="mr-3 size-5 text-gray-400">
          <path d="M18 10a.75.75 0 0 1-.75.75H4.66l2.1 1.95a.75.75 0 1 1-1.02 1.1l-3.5-3.25a.75.75 0 0 1 0-1.1l3.5-3.25a.75.75 0 1 1 1.02 1.1l-2.1 1.95h12.59A.75.75 0 0 1 18 10Z" clip-rule="evenodd" fill-rule="evenodd" />
        </svg>
        Anterior
      </a>
    </div>

    <!-- Page links -->
    <div class="hidden md:-mt-px md:flex" *ngIf="totalPages() > 1">
      <ng-container *ngFor="let p of visiblePages(); trackBy: trackPage">
        <span *ngIf="p === '…'"
              class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
          …
        </span>

        <a *ngIf="p !== '…'"
          href="javascript:void(0)"
          [attr.aria-current]="p === page ? 'page' : null"
          class="inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium"
          [class.border-indigo-500]="p === page"
          [class.text-indigo-600]="p === page"
          [class.border-transparent]="p !== page"
          [class.text-gray-500]="p !== page"
          [class.hover\:text-gray-700]="p !== page"
          [class.hover\:border-gray-300]="p !== page"
          (click)="goTo(+p)">
          {{ p }}
        </a>
      </ng-container>
    </div>

    <!-- Next -->
    <div class="-mt-px flex w-0 flex-1 justify-end">
      <a
        href="javascript:void(0)"
        class="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        [attr.aria-disabled]="isLast() ? 'true' : null"
        (click)="next()">
        Siguiente
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="ml-3 size-5 text-gray-400">
          <path d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z" clip-rule="evenodd" fill-rule="evenodd" />
        </svg>
      </a>
    </div>
  </nav>

  <!-- Barra de info y (opcional) selector de pageSize -->
  <div class="mt-3 flex items-center justify-center text-sm text-gray-600">
    <div>
      Mostrando
      <span class="font-medium">{{ startItemIndex() }}</span>
      –
      <span class="font-medium">{{ endItemIndex() }}</span>
      de
      <span class="font-medium">{{ totalItems }}</span>
    </div>


  </div>
  `
})
export class PaginationComponent {
  /** Página actual (1-based) */
  @Input({ required: true }) page = 1;

  /** Tamaño de página */
  @Input({ required: true }) pageSize = 10;

  /** Total de items */
  @Input({ required: true }) totalItems = 0;

  /** Máximo de enlaces numéricos visibles (incluye extremos). Suele verse bien entre 5 y 9. */
  @Input() maxLinks = 7;

  /** Opcional: para mostrar selector de tamaño de página */
  @Input() pageSizeOptions: number[] | null = null;

  /** Emite al cambiar de página */
  @Output() pageChange = new EventEmitter<number>();

  /** Emite si cambia el tamaño de página (opcional) */
  @Output() pageSizeChange = new EventEmitter<number>();

  totalPages = computed(() => {
    const tp = Math.max(1, Math.ceil(this.totalItems / Math.max(1, this.pageSize)));
    // clamp page si cambian inputs
    if (this.page > tp) {
      queueMicrotask(() => this.goTo(tp));
    } else if (this.page < 1) {
      queueMicrotask(() => this.goTo(1));
    }
    return tp;
  });

  startItemIndex = computed(() => {
    if (this.totalItems === 0) return 0;
    return (this.page - 1) * this.pageSize + 1;
  });

  endItemIndex = computed(() => {
    return Math.min(this.page * this.pageSize, this.totalItems);
  });

  isFirst() { return this.page <= 1; }
  isLast() { return this.page >= this.totalPages(); }

  goTo(p: number) {
    const t = this.totalPages();
    const clamped = Math.min(Math.max(1, Math.trunc(p)), t);
    if (clamped !== this.page) {
      this.page = clamped;
      this.pageChange.emit(this.page);
    }
  }

  next() { if (!this.isLast()) this.goTo(this.page + 1); }
  prev() { if (!this.isFirst()) this.goTo(this.page - 1); }
  first() { this.goTo(1); }
  last() { this.goTo(this.totalPages()); }

  changePageSize(ps: number) {
    // Mantiene el primer índice visible al cambiar pageSize
    const firstIndex = (this.page - 1) * this.pageSize + 1;
    this.pageSize = Number(ps);
    const newPage = Math.max(1, Math.ceil(firstIndex / this.pageSize));
    this.pageSizeChange.emit(this.pageSize);
    this.goTo(newPage);
  }

  /** Devuelve páginas con puntos suspensivos */
  visiblePages(): (number | '…')[] {
    const total = this.totalPages();
    const max = Math.max(5, this.maxLinks);
    if (total <= max) return Array.from({ length: total }, (_, i) => i + 1);

    const current = this.page;
    const side = Math.floor((max - 3) / 2); // espacio alrededor del current
    const pages: (number | '…')[] = [];

    const showLeft = Math.max(2, current - side);
    const showRight = Math.min(total - 1, current + side);

    pages.push(1);
    if (showLeft > 2) pages.push('…');

    for (let p = showLeft; p <= showRight; p++) pages.push(p);

    if (showRight < total - 1) pages.push('…');
    pages.push(total);

    return pages;
  }

  trackPage = (_: number, p: number | '…') => (typeof p === 'number' ? p : `ellipsis-${_}`);
}
