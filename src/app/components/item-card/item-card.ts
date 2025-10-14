import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '@core/models/product.interface';
import { environment } from 'environments/environment';
import {ItemsListComponent} from '../items-list/items-list';


@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-card.html',
  styleUrls: ['./item-card.css']
})

export class ItemCardComponent {
  @Input({ required: true }) item!: IProduct;
  sales = environment.sales;
  min = environment.min;
  max = environment.max;

  @Output() details = new EventEmitter<IProduct>();

  public isTooltipVisible: boolean = false;

  // --- Конфігурація ---

  protected readonly labels = {
    buyButton: 'Купити',
    outOfStock: 'Немає в наявності',
    detailsButton: 'Детальніше' // Додано для шаблону
  };

  protected readonly currencyConfig = {
    code: 'UAH',
    display: 'symbol',
    digitsInfo: '1.2-2'
  };

  constructor(private el: ElementRef) {}

  // --- Методи ---

  toggleTooltip(event: MouseEvent): void {
    event.stopPropagation();
    this.isTooltipVisible = !this.isTooltipVisible;
    this.details.emit(this.item);
  }

  getButtonText(): string {
    return this.item.inStock ? this.labels.buyButton : this.labels.outOfStock;
  }

  isButtonDisabled(): boolean {
    return !this.item.inStock;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.isTooltipVisible && !this.el.nativeElement.contains(event.target)) {
      this.isTooltipVisible = false;
    }
  }
}
