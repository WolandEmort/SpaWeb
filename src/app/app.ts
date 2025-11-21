import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemsListComponent } from './components/items-list/items-list';
import { Header } from '@core/header/header';
import { Footer } from '@core/footer/footer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ItemsListComponent,
    Header,
    Footer,
    CommonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('BeautyShop');
}
