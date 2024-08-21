import { ApplicationConfig } from '@angular/core';
import { playerRoutes } from './player.routes';
import {
  PreloadAllModules,
  provideRouter,
  withInMemoryScrolling,
  withPreloading,
  withViewTransitions,
} from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from '../../_interceptors/error.interceptor';
import { jwtInterceptor } from '../../_interceptors/jwt.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const playerConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      playerRoutes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      withViewTransitions()
    ),
    provideHttpClient(withInterceptors([errorInterceptor, jwtInterceptor])),
    provideAnimations(),
    provideToastr({
      positionClass: 'toastr-bottom-right',
    }),
  ],
};
