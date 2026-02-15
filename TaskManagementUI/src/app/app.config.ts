import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import Aura from '@primeuix/themes/aura';
import { MessageService, ConfirmationService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    providePrimeNG({
            theme: {
                preset: Aura
            }
        }),
    MessageService,
    ConfirmationService
  ]
};
