import { Routes } from '@angular/router';
import { PlayerComponent } from './player.component';
import { authGuard } from '../../_guards/auth.guard';
import { PlayerDetailComponent } from '../player/player-detail/player-detail.component';
import { PlayerListComponent } from '../player/player-list/player-list.component';

export const playerRoutes: Routes = [
  {
    path: 'players/player',
    title: 'players/player',
    component: PlayerComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {path: 'players/player', component:PlayerListComponent},
      {path: 'players/player/:playername', component:PlayerDetailComponent},
    ]
  }
];
