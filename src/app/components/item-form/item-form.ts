import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '@core/services/data.service';
import { IProduct } from '@core/models/product.interface';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './item-form.html',
  styleUrls: ['./item-form.css']
})
export class ItemFormComponent {

  // --- КОНФІГУРАЦІЯ ІНТЕРФЕЙСУ (UI) ---
  protected readonly formUI = {
    title: 'Додати новий товар ✨',
    submitBtn: 'Створити товар',

    // Тексти для полів
    labels: {
      name: 'Назва товару',
      brand: 'Бренд',
      price: 'Ціна (UAH)',
      volume: 'Об\'єм',
      description: 'Опис',
      imageUrl: 'Посилання на фото (URL)' // 🆕 Додано
    },

    // Плейсхолдери
    placeholders: {
      name: 'Наприклад: Крем для обличчя',
      brand: 'Наприклад: CleanFace',
      volume: '50 мл',
      description: 'Короткий опис товару...',
      imageUrl: 'https://example.com/image.jpg' // 🆕 Додано
    },

    // Повідомлення про помилки
    errors: {
      name: 'Назва обов\'язкова (мінімум 3 символи)',
      brand: 'Бренд обов\'язковий',
      price: 'Вкажіть коректну ціну',
      volume: 'Вкажіть об\'єм',
      description: 'Опис обов\'язковий',
      imageUrl: 'Додайте посилання на зображення' // 🆕 Додано
    }
  };

  // --- ФОРМА ---
  itemForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    brand: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    price: new FormControl(0, [Validators.required, Validators.min(0.01)]),

    // 🛠 ЗМІНЕНО: Тепер за замовчуванням порожньо, щоб спрацював валідатор
    imageUrl: new FormControl('', [Validators.required]),

    category: new FormControl('Догляд', [Validators.required]),
    volume: new FormControl('', [Validators.required])
  });

  constructor(
      private dataService: DataService,
      private router: Router
  ) {}

  onSubmit(): void {
    if (this.itemForm.valid) {
      const newItem: IProduct = {
        id: Date.now(),
        inStock: true,
        ...this.itemForm.value as any
      };

      this.dataService.addItem(newItem);
      this.itemForm.reset();
      this.router.navigate(['/items']);
    } else {
      this.itemForm.markAllAsTouched();
    }
  }
}