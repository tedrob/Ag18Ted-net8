import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Lottery } from '../_models/lottery';
import { Observable, of, Subject, tap } from 'rxjs';
import { LotteryParams } from '../_models/lotteryParams';

@Injectable({
  providedIn: 'root',
})
export class LotteriesService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;
  lotteries = signal<Lottery[]>([]);
  lotteryParams = signal<LotteryParams>(new LotteryParams(null));
  lotteryChange = signal<Lottery | null>(null);
  lotteryChanged: any;
  private data = new Subject<Lottery>();
  data$ = this.data.asObservable();
  subject = new Subject<Lottery>();
  lotterySubject = new Subject<Lottery>();

  getLotteries(): Observable<Lottery[]> {
    return this.http.get<Lottery[]>(this.baseUrl + 'lotteries').pipe(
      tap((lotteries) => {
        this.lotteries.set(lotteries);
      })
    );
  }

  getLottery(lottername: string) {
    const lottery = this.lotteries().find((x) => x.lotteryname === lottername);
    if (lottery !== undefined) return of(lottery);

    return this.http.get<Lottery>(this.baseUrl + 'lotteries/' + lottername);
  }

  sendMsg(msg: Lottery) {
    this.lotterySubject.next(msg);
  }
  receiveMsg1(): Observable<Lottery> {
    return this.lotterySubject.asObservable();
  }

  updateLottery(lottery: Lottery) {
    return this.http.put(this.baseUrl + 'lotteries', lottery).pipe(
      tap(() => {
        this.lotteries.update((lotteries) =>
          lotteries.map((m) => (m.lotteryname === lottery.lotteryname ? lottery : m))
        );
      })
    );
  }
}
