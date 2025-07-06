import { Component, inject, OnInit } from '@angular/core';
import { LotteriesService } from '../../_services/lotteries.service';
import { LotteryStartComponent } from "../lottery-start/lottery-start.component";
import { LotteryItemComponent } from "../lottery-item/lottery-item.component";
import { LotteryDetailComponent } from '../lottery-detail/lottery-detail.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lottery-list',
  standalone: true,
  templateUrl: './lottery-list.component.html',
  styleUrl: './lottery-list.component.css',
  imports: [CommonModule, LotteryStartComponent, LotteryItemComponent, LotteryDetailComponent],
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
