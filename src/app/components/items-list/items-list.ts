import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '@core/models/product.interface';
import { ItemCardComponent } from '../item-card/item-card';
import { FormsModule } from '@angular/forms';
import { DataService } from '@core/services/data.service'; // 1. Імпортуємо наш сервіс

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
export class ItemsListComponent implements OnInit {

  public searchTerm: string = '';
  private allProducts: IProduct[] = [];
  public filteredProducts: IProduct[] = [];

  protected readonly searchText = {
    textSearchInput : 'Пошук за назвою товару...',
    searchTextFalse : 'На жаль, за вашим запитом нічого не знайдено.'
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // Викликаємо метод getItems() з сервісу.
    this.dataService.getItems().subscribe(data => {
      // Коли дані прийдуть, ми записуємо їх у наші масиви
      this.allProducts = data;
      this.filteredProducts = data;
    });
  }

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
