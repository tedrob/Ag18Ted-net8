import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Player } from '../../../../_models/player';
import { PlayersService } from '../../../../_services/players.service';
import { map, Observable, Subscription } from 'rxjs';
import { SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testT-detail',
  standalone: true,
  templateUrl: './testT-detail.component.html',
  styleUrls: ['./testT-detail.component.css'],
  imports: [CommonModule],
})
export class TestTDetailComponent implements OnInit, OnDestroy {
  player: any;
  @Input() playerValue!: Player; // Input property for player
  @Input() player2: Player | undefined; // Input property for player
  id!: number;
  private _selectedPlayer: any;
  playerlists: Player[] = [];
  urlCache = new Map<string, SafeResourceUrl>();
  //playerService = inject(PlayersService);
  // @Output() playerChange: EventEmitter<Player> = new EventEmitter<Player>();
  // activatedRoute = inject(ActivatedRoute);
  playername$: Observable<string> | undefined;
  private dataSubscription: Subscription | undefined;

  constructor(private playerService: PlayersService) {
    this.dataSubscription = this.playerService.data$.subscribe(
      (data: Player) => {
        this.playerValue = data as any;
        console.log(
          'TestTDetailComponent dataSubscription',
          this.playerValue,
          data
        );
      }
    );
  }
  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.dataSubscription = this.playerService?.receiveMsg().subscribe({
      next: (data: Player) => {
        this.playerValue = data;
        console.log(
          'TestTDetailComponent ngOnInit receiveMsg',
          this.playerValue,
          ' data',data, ' urlCache', this.urlCache.get(this.playerValue.description)
        );
      },
      error: (err: any) => {
        console.error('Error receiving message:', err);
      },
    });
    console.log('PlayerDetailComponent ngOnInit', this.playerValue);
    this.playername$ = this.playerService.data$.pipe(
      map((player: Player) => player.description || '')
    );
  }

  getEmbedURL(item: Player | null): void {
    let z: number;
    const playerlist: Player[] = [];
    console.log('getEmbedURL item: ', item);

    this.playername$?.subscribe((playername) => {
      console.log('test playername: ' + playername);
      if (playername) {
        // Add your logic here, for example:
        console.log('Player name exists:', playername);
      }
    });
  }

  loadPlayers() {
       if (this.playerService) {
         this.playerService.getPlayers();
       }
    //   //console.log('test playerId: ' + this.playerService.players()[1]?.description + ' 1 ' + this.playerService.players().length);
  }


}
