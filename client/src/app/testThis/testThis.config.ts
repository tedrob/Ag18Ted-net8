import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withPreloading,
  withViewTransitions,
} from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import { testThisRoutes } from './testThis.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from '../_interceptors/error.interceptor';
import { jwtInterceptor } from '../_interceptors/jwt.interceptor';
import { loadingInterceptor } from '../_interceptors/loading.interceptor';
import { PlayersService } from '../_services/players.service';

export const testThisconfig: ApplicationConfig = {
  providers: [
    provideRouter(
      testThisRoutes,
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
