import { Component, input } from '@angular/core';
import { Player } from '../../../_models/player';
import { PlayerStartComponent } from '../player-start/player-start.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlayerListComponent } from "../player-list/player-list.component";

@Component({
  selector: 'app-player-card',
  standalone: true,
  imports: [CommonModule, RouterLink, PlayerStartComponent, PlayerListComponent],
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.css'
})
export class PlayerCardComponent {
  player = input.required<Player>();

}
