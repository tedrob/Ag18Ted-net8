import { Component, input } from '@angular/core';
import { Player } from '../../_models/player';

@Component({
  selector: 'app-player-card',
  standalone: true,
  imports: [],
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.css'
})
export class PlayerCardComponent {
  player = input.required<Player>()

}
