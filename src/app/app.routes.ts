import { Routes } from '@angular/router';
import { App } from './app';
import { ItemsListComponent } from './components/items-list/items-list';
import { ItemDetailsComponent } from './components/item-details/item-details';
import { environment } from 'environments/environment';

export const routes: Routes = [
  // 1. Головна сторінка (Каталог)
  { path: '', component: ItemsListComponent },

  // 2. Сторінка товару
  { path: 'items/:id', component: ItemDetailsComponent },


  { path: '**', redirectTo: '' },

  {
    path: '',
    component: App,
    title: environment.mainMenuText
  },
  {
    path: 'items',
    component: ItemsListComponent,
  },

  {
    path: 'items/:id',
    component: ItemDetailsComponent,
    title: 'Деталі товару'
  },

  {
    path: '',
    redirectTo: '/items',
    pathMatch: 'full'
  }
];
