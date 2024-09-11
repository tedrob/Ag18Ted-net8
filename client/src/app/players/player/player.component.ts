import { Component, OnInit } from '@angular/core';
import { PlayerStartComponent } from './player-start/player-start.component';
import { PlayerCardComponent } from "./player-card/player-card.component";
import { PlayerListComponent } from "../player-list/player-list.component";

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [PlayerStartComponent, PlayerCardComponent, PlayerListComponent],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
