import { Component, inject, OnInit } from '@angular/core';
import { TestTItemComponent } from './testT-item/testT-item.component';
import {
  RouterModule,
} from '@angular/router';
import { TestTDetailComponent } from './testT-item/testT-detail/testT-detail.component';
import { PlayersService } from '../../_services/players.service';

@Component({
  selector: 'app-testT-list',
  standalone: true,
  templateUrl: './testT-list.component.html',
  styleUrls: ['./testT-list.component.css'],
  imports: [
    TestTItemComponent,
    RouterModule,
    TestTDetailComponent
],
})
export class TestTListComponent implements OnInit {
  playerService = inject(PlayersService);

  ngOnInit(): void {
    if (this.playerService.players().length === 0) this.loadPlayers();
  }

  loadPlayers() {
    this.playerService.getPlayers();
  }
}
