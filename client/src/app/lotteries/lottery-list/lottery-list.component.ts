import { Component, inject, OnInit } from '@angular/core';
import { LotteriesService } from '../../_services/lotteries.service';
import { LotteryCardComponent } from '../lottery-card/lottery-card.component';

@Component({
  selector: 'app-lottery-list',
  standalone: true,
  templateUrl: './lottery-list.component.html',
  styleUrl: './lottery-list.component.css',
})
export class LotteryListComponent implements OnInit {
  lotteryService = inject(LotteriesService);

  ngOnInit(): void {
    if (this.lotteryService.lotteries().length === 0) this.loadLotteries();
  }

  loadLotteries() {
    this.lotteryService.getLotteries();
  }
}
