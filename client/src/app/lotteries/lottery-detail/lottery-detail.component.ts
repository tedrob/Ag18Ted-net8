import { Component, inject, OnInit } from '@angular/core';
import { LotteriesService } from '../../_services/lotteries.service';
import { ActivatedRoute } from '@angular/router';
import { Lottery } from '../../_models/lottery';

@Component({
  selector: 'app-lottery-detail',
  standalone: true,
  imports: [],
  templateUrl: './lottery-detail.component.html',
  styleUrl: './lottery-detail.component.css'
})
export class LotteryDetailComponent implements OnInit{
  private lotteryService = inject(LotteriesService);
  private route = inject(ActivatedRoute);
  lottery?: Lottery;

  ngOnInit(): void {
  }

  loadLottery() {}

}
