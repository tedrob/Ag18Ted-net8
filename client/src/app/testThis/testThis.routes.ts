import { TestThisComponent } from './testThis.component';
import { TestTStartComponent } from './testT-start/testT-start.component';
import { TestTListComponent } from './testT-list/testT-list.component';
import { TestTItemComponent } from './testT-list/testT-item/testT-item.component';
import { TestTDetailComponent } from './testT-list/testT-item/testT-detail/testT-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { authGuard } from '../_guards/auth.guard';

export const testThisRoutes: Routes = [
  {
    path: 'testThis',
    title: 'TestThis',
    component: TestThisComponent,
    children: [
      {
        path: 'testT-start',
        component: TestTStartComponent,
        pathMatch: 'full',
      },
      {
        path: 'testT-list',
        title: 'list',
        component: TestTListComponent,
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        //pathMatch: 'full',
        children: [
          {
            path: 'testT-item',
            title: '',
            component: TestTItemComponent,
            //pathMatch: 'full',
          },
          {
            path: 'testT-detail/:playername',
            component: TestTDetailComponent,
            //pathMatch: 'full',
          },
        ],
      },
      //  {
      //    path: ':player.description',
      //    title: 'detail',
      //    component: TestTDetailComponent,
      //    pathMatch: 'full',
      //  },
    ],
  },
];

import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(testThisRoutes),
  ],
  exports: [RouterModule],
})
export class TestThisRoutingModule {}
