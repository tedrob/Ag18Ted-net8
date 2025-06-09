import { Component, inject, OnInit } from '@angular/core';
import { PlayersService } from '../../_services/players.service';
import { PlayerStartComponent } from '../player-start/player-start.component';
import { PlayerItemComponent } from './player-item/player-item.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../../_models/player';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PlayerdetailComponent } from './playerdetail/playerdetail.component';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [
    CommonModule,
    PlayerStartComponent,
    PlayerItemComponent,
    PlayerdetailComponent,
  ],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.css',
})
export class PlayerListComponent implements OnInit {
  playerService = inject(PlayersService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  player: Player[] = [];
  playerlists: Player[] = [];
  playerValue = 'test player value';

  playerChanged = new Subject<Player[]>();
  players: any;
  parentMessage: string = 'PlayerListComponent parent message';

  ngOnInit(): void {}

  loadPlayers() {
    this.playerService.getPlayers();
  }
}
