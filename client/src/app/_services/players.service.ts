import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Player } from '../_models/player';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;

  getPlayers() {
    return this.http.get<Player[]>(
      this.baseUrl + 'players'
    );
  }

  getPlayer(playername: string) {
    return this.http.get<Player>(
      this.baseUrl + 'players/' + playername
    );
  }
}
