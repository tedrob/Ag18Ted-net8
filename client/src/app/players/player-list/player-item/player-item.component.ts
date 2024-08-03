import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Player } from '../../../_models/player';

@Component({
  selector: 'app-player-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './player-item.component.html',
  styleUrl: './player-item.component.css',
})
export class PlayerItemComponent {
  @Input() players: Player[] = [];
  @Input() index?: number;
}
