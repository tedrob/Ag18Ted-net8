import { RouterModule, Routes } from '@angular/router';
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
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { preventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { memberDetailedResolver } from './_resolvers/member-detailed.resolver';
import { TestThisComponent } from './testThis/testThis.component';
import { TestTStartComponent } from './testThis/testT-start/testT-start.component';
import { TestTListComponent } from './testThis/testT-list/testT-list.component';
import { TestTDetailComponent } from './testThis/testT-list/testT-item/testT-detail/testT-detail.component';
import { NgModule } from '@angular/core';
import { TestTItemComponent } from './testThis/testT-list/testT-item/testT-item.component';
import { testThisRoutes } from './testThis/testThis.routes';
import { PlayersComponent } from './players/players.component';
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
      {
        path: 'members/:username',
        component: MemberDetailComponent,
        resolve: { member: memberDetailedResolver },
      },
      {
        path: 'member/edit',
        component: MemberEditComponent,
        canDeactivate: [preventUnsavedChangesGuard],
      },
      {
        path: 'players',
        title: 'PlayersT',
        component: PlayersComponent,
      },
      {
        path: 'players',
        title: 'PlayersA',
        component: PlayerListComponent,
        children: [
          {
            path: 'player-detail/:player.description',
            component: PlayerDetailComponent,
          },
        ],
      },
      { path: 'games', component: GameListComponent },
      { path: 'games/:id', component: GameDetailComponent },
      {
        path: 'lotteries',
        component: LotteryListComponent,
        children: [
          {
            path: 'lottery-detail/:lottery.description',
            component: LotteryDetailComponent,
          },
        ],
      },
      { path: 'lists', component: ListsComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'admin', component: AdminPanelComponent, canActivate: [adminGuard] },
      // {
      //   path: 'testThis',
      //   title: 'testTi',
      //   component: TestThisComponent,
      //   children: [
      //     { path: 'testT-start/testT-start', component: TestTStartComponent },
      //     {
      //       path: 'testT-list/testT-list',
      //       component: TestTListComponent,
      //       pathMatch: 'full',
      //       children: [
      //         {
      //           path: 'testT-item/testT',
      //           component: TestTItemComponent,
      //           pathMatch: 'full',
      //         },
      //         {
      //           path: 'testT-detail/:testT-detail',
      //           component: TestTDetailComponent,
      //           pathMatch: 'full',
      //         },
      //       ],
      //     },
      //   ],
      // },
      {path: 'admin', component: AdminPanelComponent, canActivate: [adminGuard]}
    ],
  },
  { path: 'errors', component: TestErrorsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: HomeComponent, pathMatch: 'full' },
];

// @NgModule({
//   imports: [
//     RouterModule.forRoot(routes, { useHash: true }),
//     RouterModule.forRoot(routes, { useHash: true }),
//     RouterModule.forChild(testThisRoutes),
//   ],
// })
// export class AppRoutingModule {}
