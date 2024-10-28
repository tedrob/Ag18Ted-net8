import { Routes } from '@angular/router';
import { PlayerComponent } from './player.component';
import { authGuard } from '../../_guards/auth.guard';
import { PlayerDetailComponent } from '../player/player-detail/player-detail.component';
import { PlayerListComponent } from '../player/player-list/player-list.component';
import { PlayerEditComponent } from '../player-edit/player-edit.component';
import { preventUnsavedChangesGuard } from '../../_guards/prevent-unsaved-changes.guard';

export const playerRoutes: Routes = [
  {
    path: 'player',
    title: 'Player',
    component: PlayerComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: 'player', component: PlayerListComponent },
      { path: 'player/:playername', component: PlayerDetailComponent },
      {
        path: 'players/player/:id/edit',
        component: PlayerEditComponent,
        canDeactivate: [preventUnsavedChangesGuard],
      },
    ],
  },
];
