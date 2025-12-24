import { Routes } from '@angular/router';

// Компоненти магазину
import { ItemsListComponent } from './components/items-list/items-list';
import { ItemDetailsComponent } from './components/item-details/item-details';
import { ItemFormComponent } from './components/item-form/item-form';

// Компоненти авторизації (перевірте, чи вірні шляхи до папок)
import { LoginComponent } from 'app/features/auth/login/login';
import { Register } from 'app/features/auth/register/register';

// Охоронець (Guard)
import { authGuard } from '@core/auth/auth.guard';

export const routes: Routes = [
  // 1. Перенаправлення з пустой адреси на каталог
  { path: '', redirectTo: 'items', pathMatch: 'full' },

  // 2. Публічні сторінки (Каталог та Деталі)
  {
    path: 'items',
    component: ItemsListComponent,
    title: 'Каталог товарів'
  },
  {
    path: 'items/:id',
    component: ItemDetailsComponent,
    title: 'Деталі товару'
  },

  // 3. Сторінки авторизації
  {
    path: 'login',
    component: LoginComponent,
    title: 'Вхід в систему'
  },
  {
    path: 'register',
    component: Register,
    title: 'Реєстрація'
  },

  // 4. ЗАХИЩЕНІ СТОРІНКИ
  {
    path: 'admin/add-item',
    component: ItemFormComponent,
    title: 'Додати новий товар',
    canActivate: [authGuard]
  },

  // 5. Wildcard
  { path: '**', redirectTo: 'items' }
];