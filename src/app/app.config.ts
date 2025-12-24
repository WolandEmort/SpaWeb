import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // Тут лежать ваші шляхи
import { provideHttpClient, withInterceptors } from '@angular/common/http';

// Імпортуємо ваші інтерцептори
import { authInterceptor } from '@core/auth/auth.interceptor';
// import { baseUrlInterceptor } from '@core/interceptors/base-url.interceptor'; // Розкоментуйте, якщо створили цей файл

export const appConfig: ApplicationConfig = {
  providers: [
    // Оптимізація Angular
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Підключення маршрутизації
    provideRouter(routes),

    // Підключення HTTP клієнта з інтерцепторами
    provideHttpClient(
        withInterceptors([
          // baseUrlInterceptor, // 1. Спочатку додаємо URL (якщо використовуєте)
          authInterceptor      // 2. Потім додаємо токен
        ])
    )
  ]
};