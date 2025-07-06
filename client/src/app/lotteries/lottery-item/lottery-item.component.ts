import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { Lottery } from '../../_models/lottery';
import { LotteriesService } from '../../_services/lotteries.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lottery-item',
  imports: [CommonModule],
  templateUrl: './lottery-item.component.html',
  styleUrls: ['./lottery-item.component.css'],
})
export class LotteryItemComponent implements OnInit {
  @Output() selectedLotteryEvent = new EventEmitter<string>();
  lotterryItem: Lottery | null = null;
  lotteryService = inject(LotteriesService);
  data = inject(LotteriesService);
  status!: string;
  lotterys: Lottery[] = [];
  OutputSignal = signal<Lottery>(this.lotterys[0] || ({} as Lottery));

  constructor() {}

  sendMsg(msg: Lottery) {
    msg = this.lotterryItem!;
    this.lotteryService.sendMsg(msg);
  }

  ngOnInit() {
    this.lotteryService.getLotteries();
    this.data.lotteryChanged.subscribe((status: string) => {
      this.status = 'on';
    });
    this.loadLotterys();
  }

  loadLotterys() {
    this.lotterys = this.lotteryService.lotteries();
    this.lotteryService.getLotteries();

    this.lotteryService.getLotteries().subscribe((lotteries) => {
      this.lotterys = lotteries;
    });
  }

  onSelectedLottery(lottery: Lottery) {
    this.selectedLotteryEvent.emit(lottery.lotteryname);
    this.lotterryItem = lottery;
    this.OutputSignal.set(lottery);
    this.sendMsg(lottery);
    if (this.lotterryItem) {
      this.lotterryItem = lottery;
    }
    this.sendMsg(lottery); // Add any additional logic here if needed
  }
}
