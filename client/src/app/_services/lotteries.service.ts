import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Lottery } from '../_models/lottery';

@Injectable({
  providedIn: 'root',
})
export class LotteriesService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;

  geLotteries() {
    return this.http.get<Lottery[]>(
      this.baseUrl + 'lotteries'
    );
  }

  getLottery(lottername: string) {
    return this.http.get<Lottery>(
      this.baseUrl + 'lotteries/'
    );
  }
}
