import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Player } from '../_models/player';
import { of, tap } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { PlayerParams } from '../_models/playerParams';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  private http = inject(HttpClient);
  //private playerService = inject(PlayersService);
  baseUrl = environment.apiUrl;
  //currentPlayer = signal<Player | null>(null)
  //paginatedResult = signal<PaginatedResult<Player[]> | null>(null);
  //playerCache = new Map();
  //player = this.playerService.currentPlayer();
  players = signal<Player[]>([]);
  //playerParams = signal<PlayerParams>(new PlayerParams(this.player));

  getPlayers() {
    //const response = this.playerCache.get(Object.values(this.playerParams()).join('-'))
    return this.http.get<Player[]>(this.baseUrl + 'players').subscribe({
      next: (players) => this.players.set(players),
    });
  }

  getPlayer(playername: string) {
    const player = this.players().find((x) => x.playername === playername);
    if (player !== undefined) return of(player);

    return this.http.get<Player>(this.baseUrl + 'players/' + playername);
  }

  updatePlayer(player: Player) {
    return this.http.put(this.baseUrl + 'players', player).pipe(
      tap(() => {
        this.players.update((players) =>
          players.map((m) => (m.playername === player.playername ? player : m))
        );
      })
    );
  }
}
