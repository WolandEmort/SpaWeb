import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../core/models/product.interface';
import { ItemCardComponent } from '../item-card/item-card';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [
    CommonModule,
    ItemCardComponent
  ],
  templateUrl: './items-list.html',
  styleUrls: ['./items-list.css']
})
export class ItemsListComponent {

  /**
   * Масив тестових даних, які відображатимуться
   */
  products: IProduct[] = [
    {
      id: 101,
      name: 'Пінка для вмивання "Pure Cloud"',
      brand: 'CleanFace',
      description: 'Легка пінка для глибокого очищення пор, не пересушує шкіру.',
      price: 380.00,
      imageUrl: 'https://placehold.co/150x180/7F00FF/FFFFFF?text=FOAM',
      category: 'Очищення',
      volume: '150 мл',
      inStock: true
    },
    {
      id: 102,
      name: 'Тональний крем "Perfect Match"',
      brand: 'GlamLook',
      description: 'Стійкий тональний засіб із матовим фінішем та захистом SPF 15.',
      price: 799.00,
      imageUrl: 'https://placehold.co/150x180/FF69B4/FFFFFF?text=CREAM',
      category: 'Макіяж',
      volume: '30 мл',
      inStock: true
    },
    {
      id: 103,
      name: 'Нічна маска з колагеном',
      brand: 'BeautySleep',
      description: 'Інтенсивно відновлює шкіру під час сну, підвищуючи її еластичність.',
      price: 549.99,
      imageUrl: 'https://placehold.co/150x180/00FFFF/000000?text=MASK',
      category: 'Маска',
      volume: '100 мл',
      inStock: false
    },
    {
      id: 104,
      name: 'Скраб для тіла з кавовими зернами',
      brand: 'BodyCare',
      description: 'Натуральний скраб для відлущування та покращення мікроциркуляції.',
      price: 450.00,
      imageUrl: 'https://placehold.co/150x180/8B4513/FFFFFF?text=SCRUB',
      category: 'Догляд для тіла',
      volume: '250 г',
      inStock: true
    }
  ];


  /**
   * @param index Індекс елемента в масиві
   * @param product Сам елемент масиву (продукт)
   * @returns Унікальний ідентифікатор продукту
   */
  trackByProductId(index: number, product: IProduct): number {
    return product.id;
  }
}
