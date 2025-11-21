import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IProduct } from '@core/models/product.interface';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './item-card.html',
  styleUrls: ['./item-card.css']
})
export class ItemCardComponent {
  @Input({ required: true }) item!: IProduct;

  sales = environment.sales;
  min = environment.min;
  max = environment.max;

  // --- Конфігурація ---

  protected readonly labels = {
    buyButton: environment.buyText,
    outOfStock: environment.noneBuyText,
    detailsButton: 'Детальніше'
  };

  protected readonly currencyConfig = {
    code: environment.currency,
    display: 'symbol',
    digitsInfo: '1.2-2'
  };

  getButtonText(): string {
    return this.item.inStock ? this.labels.buyButton : this.labels.outOfStock;
  }

  isButtonDisabled(): boolean {
    return !this.item.inStock;
  }
}