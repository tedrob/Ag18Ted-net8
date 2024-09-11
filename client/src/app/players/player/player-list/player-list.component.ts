import { Component, inject, OnInit } from '@angular/core';
import { PlayerStartComponent } from '../player-start/player-start.component';
import { PlayersService } from '../../../_services/players.service';
import { Player } from '../../../_models/player';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [CommonModule, PlayerStartComponent],
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
