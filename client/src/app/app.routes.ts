import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { PlayerListComponent } from './players/player-list/player-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { PlayerDetailComponent } from './players/player-detail/player-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AboutComponent } from './about/about/about.component';
import { GameDetailComponent } from './games/game-detail/game-detail.component';
import { GameListComponent } from './games/game-list/game-list.component';
import { LotteryListComponent } from './lotteries/lottery-list/lottery-list.component';
import { LotteryDetailComponent } from './lotteries/lottery-detail/lottery-detail.component';
import { authGuard } from './_guards/auth.guard';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { PlayerEditComponent } from './players/player-edit/player-edit.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { preventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { PlayerComponent } from './players/player/player.component';
import { memberDetailedResolver } from './_resolvers/member-detailed.resolver';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { adminGuard } from './_guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: 'about', component: AboutComponent },
      { path: 'members', component: MemberListComponent },
      { path: 'members/:username', component: MemberDetailComponent,
          resolve: {member: memberDetailedResolver} },
      {
        path: 'member/edit',
        component: MemberEditComponent,
        canDeactivate: [preventUnsavedChangesGuard],
      },
      { path: 'players', component: PlayerListComponent },
      { path: 'players/playername', component: PlayerDetailComponent },
      { path: 'players/:id', component: PlayerDetailComponent },
      { path: 'players/edit', component: PlayerEditComponent },


      { path: 'games', component: GameListComponent },
      { path: 'games/:id', component: GameDetailComponent },
      { path: 'lotteries', component: LotteryListComponent },
      { path: 'lotteries', component: LotteryDetailComponent },
      { path: 'lists', component: ListsComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'admin', component: AdminPanelComponent, canActivate: [adminGuard]},

      { path: 'player',
        title: 'Player',
        component: PlayerComponent,
        children: [

          { path: 'player', component: PlayerListComponent },
          { path: 'player/:playername', component: PlayerDetailComponent },
          { path: 'player/:id', component: PlayerDetailComponent }
        ],
      },
    ],
  },
  { path: 'errors', component: TestErrorsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: HomeComponent, pathMatch: 'full' },
];
