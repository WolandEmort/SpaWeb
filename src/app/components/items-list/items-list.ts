import { Component, OnInit } from '@angular/core'; // OnDestroy та Subscription більше не потрібні
import { CommonModule, AsyncPipe } from '@angular/common';
import { IProduct } from '@core/models/product.interface';
import { ItemCardComponent } from '../item-card/item-card';
import { FormsModule } from '@angular/forms';
import { DataService } from '@core/services/data.service';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [
    CommonModule,
    ItemCardComponent,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './items-list.html',
  styleUrls: ['./items-list.css']
})
export class ItemsListComponent implements OnInit {

  public searchTerm: string = '';
  public readonly mainMenuText: string = environment.mainMenuText;

  public products$: Observable<IProduct[]> | undefined;

  protected readonly searchText = {
    textSearchInput: 'Пошук за назвою товару...',
    searchTextFalse: 'На жаль, за вашим запитом нічого не знайдено.'
  };

  constructor(private dataService: DataService) { }

  // Завдання 3: Робота з AsyncPipe
  ngOnInit(): void {

    this.products$ = this.dataService.getItems();
  }

  // Завдання 5: Пошук
  onSearch(): void {
    // Сервіс оновлює BehaviorSubject, і products$ автоматично отримає нові дані
    this.dataService.search(this.searchTerm);
  }

  onProductSelected(product: IProduct): void {
    console.log('Обраний товар:', product);
  }

  // 3. ЗМІНА: ngOnDestroy видалено, оскільки AsyncPipe сам відписується.
}