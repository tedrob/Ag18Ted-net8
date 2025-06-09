import { Component, input } from '@angular/core';
import { Player } from '../../_models/player';
import { PlayerListComponent } from "../player-list/player-list.component";

@Component({
  selector: 'app-player-card',
  standalone: true,
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.css',
  imports: [PlayerListComponent],
})
export class PlayerCardComponent {
  player = input.required<Player>()

}
