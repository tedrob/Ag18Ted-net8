import { Component, input } from '@angular/core';
import { Lottery } from '../../_models/lottery';
import { RouterLink } from '@angular/router';
import { PlayerListComponent } from "../../players/player-list/player-list.component";
import { LotteryListComponent } from "../lottery-list/lottery-list.component";

@Component({
  selector: 'app-lottery-card',
  standalone: true,
  imports: [RouterLink, PlayerListComponent, LotteryListComponent],
  templateUrl: './lottery-card.component.html',
  styleUrl: './lottery-card.component.css'
})
export class LotteryCardComponent {
  lottery = input.required<Lottery>();

}
