import { Component, inject, OnInit } from '@angular/core';
import { PlayersService } from '../../_services/players.service';
import { Player } from '../../_models/player';
import { PlayerStartComponent } from '../player-start/player-start.component';
import { PlayerCardComponent } from '../player-card/player-card.component';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [PlayerStartComponent, PlayerCardComponent],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.css'
})
export class PlayerListComponent implements OnInit {
  private playerService = inject(PlayersService);
  players: Player[] = [];

  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers() {
    this.playerService.getPlayers().subscribe({
      next: players => this.players = players
    })
  }

}
