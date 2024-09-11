import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Lottery } from '../_models/lottery';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LotteriesService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;
  lotteries = signal<Lottery[]>([]);

  getLotteries() {
    return this.http.get<Lottery[]>(this.baseUrl + 'lotteries').subscribe({
      next: (lotteries) => this.lotteries.set(lotteries),
    });
  }

  getLottery(lottername: string) {
    const lottery = this.lotteries().find((x) => x.lotteryname === lottername);
    if (lottery !== undefined) return of(lottery);

    return this.http.get<Lottery>(this.baseUrl + 'lotteries/' + lottername);
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
