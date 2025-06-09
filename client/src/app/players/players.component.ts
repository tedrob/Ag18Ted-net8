import { Component, OnInit } from '@angular/core';
import { PlayerListComponent } from "./player-list/player-list.component";
import { Player } from '../_models/player';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [PlayerListComponent],
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
player: Player | undefined;

  constructor() { }

  ngOnInit() {
  }

}
