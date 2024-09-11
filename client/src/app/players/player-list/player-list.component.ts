import { Component, inject, OnInit } from '@angular/core';
import { PlayersService } from '../../_services/players.service';
import { Player } from '../../_models/player';
import { PlayerStartComponent } from '../player-start/player-start.component';
import { PlayerCardComponent } from '../player-card/player-card.component';
import { PlayerItemComponent } from './player-item/player-item.component';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { PlayerDetailComponent } from '../player-detail/player-detail.component';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [
    PlayerStartComponent,
    PlayerCardComponent,
    PlayerItemComponent,
    PlayerDetailComponent,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.css',
})
export class PlayerListComponent implements OnInit {
  playerService = inject(PlayersService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  //players: Player[] = [];

  ngOnInit(): void {
    if (this.playerService.players().length === 0) this.loadPlayers();
  }

  loadPlayers() {
    this.playerService.getPlayers();
  }
}
