import { Component, inject, OnInit } from '@angular/core';
import { PlayersService } from '../../../_services/players.service';
import { PlayerStartComponent } from '../player-start/player-start.component';
import { PlayerCardComponent } from '../player-card/player-card.component';
import { PlayerDetailComponent } from '../player-detail/player-detail.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [PlayerStartComponent, PlayerCardComponent, PlayerDetailComponent, RouterLink, RouterOutlet],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.css',
})
export class PlayerListComponent implements OnInit {
  playerService = inject(PlayersService);

  ngOnInit(): void {
    if (this.playerService.players().length === 0) this.loadPlayers();
  }

  loadPlayers() {
    this.playerService.getPlayers();
  }
}
