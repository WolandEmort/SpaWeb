import { Component, OnInit } from '@angular/core'; // 1. Додаємо OnInit
import { CommonModule } from '@angular/common';
import { IProduct } from '@core/models/product.interface';
import { ItemCardComponent } from '../item-card/item-card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [
    CommonModule,
    ItemCardComponent,
    FormsModule
  ],
  templateUrl: './items-list.html',
  styleUrls: ['./items-list.css']
})
export class ItemsListComponent implements OnInit { // 2. Реалізуємо OnInit

  // Властивість для двосторонньої прив'язки з полем вводу
  public searchTerm: string = '';

  private allProducts: IProduct[] = []; // Для зберігання повного списку товарів
  public filteredProducts: IProduct[] = []; // Для відображення відфільтрованих товарів

  protected readonly searchText = {
    textSearchInput : 'Пошук за назвою товару...',
    searchTextFalse : 'На жаль, за вашим запитом нічого не знайдено.'
  }


  // 4. ngOnInit виконується один раз при ініціалізації компонента
  ngOnInit(): void {
    // Заповнюємо наш основний масив даними
    this.allProducts = [
      {
        id: 101,
        name: 'Пінка для вмивання "Pure Cloud"',
        brand: 'CleanFace',
        description: 'Легка пінка для глибокого очищення пор, не пересушує шкіру.',
        price: 380.00,
        imageUrl: 'https://placehold.co/150x180/7F00FF/FFFFFF?text=FOAM',
        category: 'Очищення',
        volume: '150 мл',
        inStock: true,
        details : 'Ніжна пінка з гіалуроновою кислотою та екстрактом зеленого чаю. Ідеально підходить для всіх типів шкіри, глибоко очищує та зволожує, не викликаючи відчуття стягнутості.'
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
        inStock: true,
        isBestseller: true,
        details : 'Стійкий тональний засіб із природним матовим фінішем та захистом SPF 15. Забезпечує середнє покриття, вирівнює тон шкіри та приховує недоліки протягом усього дня.'
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
        inStock: false,
        details: 'Інтенсивна нічна маска з морським колагеном. Підвищує еластичність шкіри, розгладжує дрібні зморшки та глибоко живить, поки ви спите. Гелева текстура швидко вбирається.'
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
        inStock: true,
        isBestseller: true,
        details: 'Натуральний скраб на основі меленої кави та тростинного цукру. Ефективно відлущує, стимулює мікроциркуляцію та допомагає у боротьбі з целюлітом. Олії кокоса та ши живлять шкіру.'
      }
    ];
    // На старті відфільтрований список є копією повного списку
    this.filteredProducts = this.allProducts;
  }

  /**
   * 5. Метод, що викликається при кожній зміні в полі пошуку
   */
  onSearch(): void {
    const filterText = this.searchTerm.toLowerCase();
    this.filteredProducts = this.allProducts.filter(product =>
      product.name.toLowerCase().includes(filterText)
    );
  }

  onProductSelected(product: IProduct): void {
    console.log('Обраний товар:', product);
  }
}
