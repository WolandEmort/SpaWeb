import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../core/models/product.interface';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-card.html',
  styleUrls: ['./item-card.css']
})
export class ItemCardComponent {
  @Input({ required: true }) item!: IProduct;

  // Конфігурація текстів
  protected readonly labels = {
    buyButton: 'Купити',
    outOfStock: 'Немає в наявності'
  };

  // Конфігурація валюти
  protected readonly currencyConfig = {
    code: 'UAH',
    display: 'symbol',
    digitsInfo: '1.2-2'
  };

  /**
   * Отримує текст кнопки залежно від наявності товару
   */
  getButtonText(): string {
    return this.item.inStock ? this.labels.buyButton : this.labels.outOfStock;
  }

  /**
   * Перевіряє, чи кнопка має бути disabled
   */
  isButtonDisabled(): boolean {
    return !this.item.inStock;
  }
}
