import { Component, input } from '@angular/core';
import { Lottery } from '../../_models/lottery';
import { LotteryListComponent } from "../lottery-list/lottery-list.component";

@Component({
  selector: 'app-lottery-card',
  standalone: true,
  imports: [LotteryListComponent],
  templateUrl: './lottery-card.component.html',
  styleUrl: './lottery-card.component.css'
})
export class LotteryCardComponent {
  lottery = input.required<Lottery>();

}
