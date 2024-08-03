import { Routes } from '@angular/router';
import { PlayerComponent } from './player.component';
import { authGuard } from '../../_guards/auth.guard';

export const playerRoutes: Routes = [
  {
    path: 'player',
    title: 'player',
    component: PlayerComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [

    ]
  }
];
