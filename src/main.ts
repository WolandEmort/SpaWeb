import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideRouter } from '@angular/router';

// ✅ Запускаємо кореневий компонент App (selector: 'app-root')
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
