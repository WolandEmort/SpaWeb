import { Routes } from '@angular/router';
// 1. Імпортуємо головний компонент, який містить список товарів
import { App } from './app';


export const routes: Routes = [
  {
    // 2. Визначаємо роут: якщо шлях '/', відображати компонент App
    path: '',
    component: App,
    title: 'Каталог товарів'
  }
];
