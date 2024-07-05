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

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: 'about', component: AboutComponent },
      { path: 'members',component: MemberListComponent},
      { path: 'members/:id', component: MemberDetailComponent },
      { path: 'players', component: PlayerListComponent },
      { path: 'players/:id', component: PlayerDetailComponent },
      { path: 'games', component: GameListComponent },
      { path: 'games/:id', component: GameDetailComponent },
      { path: 'lotteries', component: LotteryListComponent },
      { path: 'lotteries', component: LotteryDetailComponent },
      { path: 'lists', component: ListsComponent },
      { path: 'messages', component: MessagesComponent },
    ],
  },
  { path: '**', component: HomeComponent, pathMatch: 'full' },
];
