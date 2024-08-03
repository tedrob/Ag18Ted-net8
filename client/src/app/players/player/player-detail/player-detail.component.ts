import { Component } from '@angular/core';
import { Player } from '../../../_models/player';

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [],
  templateUrl: './player-detail.component.html',
  styleUrl: './player-detail.component.css'
})
export class PlayerDetailComponent {
  player?: Player;

}
