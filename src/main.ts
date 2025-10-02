import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { Layout } from './app/core/layout/layout';
import { routes } from './app/app.routes';

bootstrapApplication(Layout, appConfig)
  .catch((err) => console.error(err));
