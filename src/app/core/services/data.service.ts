import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, map } from 'rxjs'; // Імпортуємо Observable та 'of'
import { IProduct } from '@core/models/product.interface';

@Injectable({providedIn: 'root'})
export class DataService {

  //перенесли масив з даними з компонента
  private allProducts: IProduct[] = [
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
      details: 'Ніжна пінка з гіалуроновою кислотою та екстрактом зеленого чаю. Ідеально підходить для всіх типів шкіри, глибоко очищує та зволожує, не викликаючи відчуття стягнутості.'
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
      details: 'Стійкий тональний засіб із природним матовим фінішем та захистом SPF 15. Забезпечує середнє покриття, вирівнює тон шкіри та приховує недоліки протягом усього дня.'
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

  //Завдання 4 лаб 6
  private productsSubject = new BehaviorSubject<IProduct[]>(this.allProducts);

  constructor() {
  }

  //Завдання 2 лаб 6(без використання of)
  getItems(): Observable<IProduct[]> {
    return this.productsSubject.asObservable();
  }

  public search(searchTerm: string): void {
    const filterText = searchTerm.toLowerCase();

    const filteredProducts = this.allProducts.filter(product =>
      product.name.toLowerCase().includes(filterText)
    );

    this.productsSubject.next(filteredProducts);

  }
  getItemById(id: number): Observable<IProduct | undefined> {
    const product = this.allProducts.find(p => p.id === id);
    return of(product);
  }
}
