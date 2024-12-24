import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

bootstrapApplication(AppComponent, {providers: [
  provideHttpClient(),
  provideRouter(routes),
  { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
]});