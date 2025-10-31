import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '@core/models/product.interface';
import { ItemCardComponent } from '../item-card/item-card';
import { FormsModule } from '@angular/forms';
import { DataService } from '@core/services/data.service';
import { Subscription } from 'rxjs';

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
export class ItemsListComponent implements OnInit, OnDestroy {

  public searchTerm: string = '';

  public filteredProducts: IProduct[] = []; // Цей масив тепер заповнюється з сервісу

  private productsSubscription: Subscription | undefined;

  protected readonly searchText = {
    textSearchInput: 'Пошук за назвою товару...',
    searchTextFalse: 'На жаль, за вашим запитом нічого не знайдено.'
  };

  constructor(private dataService: DataService) { }

//Завдання 3 лаб 6
  ngOnInit(): void {
    this.productsSubscription = this.dataService.getItems().subscribe(products => {
      this.filteredProducts = products;
    });
  }

//Завдання 5 лаб 6(запит на пошук)
  onSearch(): void {
    this.dataService.search(this.searchTerm);
  }

  onProductSelected(product: IProduct): void {
    console.log('Обраний товар:', product);
  }

 //Видалення
  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
