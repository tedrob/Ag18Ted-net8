import { Component, inject, OnInit } from '@angular/core';
import { LotteriesService } from '../../_services/lotteries.service';
import { Lottery } from '../../_models/lottery';

@Component({
  selector: 'app-lottery-list',
  standalone: true,
  imports: [],
  templateUrl: './lottery-list.component.html',
  styleUrl: './lottery-list.component.css'
})
export class LotteryListComponent implements OnInit {
  private lotteryService = inject(LotteriesService);
  lotteries: Lottery[] = [];

  ngOnInit(): void {
    this.loadLotteries();
  }

  loadLotteries() {
    this.lotteryService.geLotteries().subscribe({
      next: lotteries => this.lotteries = lotteries
    })
  }

}
