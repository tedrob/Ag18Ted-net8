import { ApplicationConfig } from '@angular/core';
import { PlayersService } from '../_services/players.service';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withPreloading,
  withViewTransitions,
} from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from '../_interceptors/error.interceptor';
import { jwtInterceptor } from '../_interceptors/jwt.interceptor';
import { loadingInterceptor } from '../_interceptors/loading.interceptor';
import { playersRoutes } from '../players/players.routes';

export const playersConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      playersRoutes,
      withComponentInputBinding(),
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      withViewTransitions()
    ),
    provideHttpClient(
      withInterceptors([errorInterceptor, jwtInterceptor, loadingInterceptor])
    ),
    [PlayersService],
  ],
};
