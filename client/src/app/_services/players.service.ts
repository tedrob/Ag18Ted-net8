import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Player } from '../_models/player';
import { BehaviorSubject, Observable, of, Subject, tap } from 'rxjs';
import { PlayerParams } from '../_models/playerParams';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  // new section for this service
  private playerChangeSource = new BehaviorSubject('OFF');
  currentPlayerChange = this.playerChangeSource.asObservable();
  changePlayerStatus(status: string) {
    this.playerChangeSource.next(status);
    console.log('PlayersService changePlayerStatus', status);
  }
  //private data = new Subject<string>();
  private data = new Subject<Player>();

  data$ = this.data.asObservable();

  subject = new Subject<Player>();
  playerSubject = new Subject<Player>();

  sendMsg(msg: Player) {
    this.subject.next(msg);
  }
  receiveMsg(): Observable<Player> {
    return this.subject.asObservable();
  }
  sendMsg1(msg: Player) {
    this.playerSubject.next(msg);
  }
  receiveMsg1(): Observable<Player> {
    return this.playerSubject.asObservable();
  }

  // end new section

  playerChange = signal<Player | null>(null);

  players = signal<Player[]>([]);
  playerParams = signal<PlayerParams>(new PlayerParams(null));
  playerChanged: any;

  getPlayers() {
    return this.http.get<Player[]>(this.baseUrl + 'players').subscribe({
      next: (players) => this.players.set(players),
    });
  }

  getPlayers2(): Observable<Player[]> {
    return this.http.get<Player[]>(this.baseUrl + 'players').pipe(
      tap((players) => {
        this.players.set(players); // Update the signal with the fetched 
        //console.log('PlayersService getPlayers2', players.length);
      })
    );
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
