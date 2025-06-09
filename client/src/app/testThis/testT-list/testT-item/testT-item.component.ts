import {
  Component,
  inject,
  OnInit,
  signal,
  Output,
  EventEmitter,
} from '@angular/core';
import { PlayersService } from '../../../_services/players.service';
import { RouterModule } from '@angular/router';
import { Player } from '../../../_models/player';

@Component({
  selector: 'app-testT-item',
  standalone: true,
  templateUrl: './testT-item.component.html',
  styleUrls: ['./testT-item.component.css'],
  imports: [RouterModule],
})
export class TestTItemComponent implements OnInit {
  //readonly players = input<Player[]>([]);
  @Output() playerSelected = new EventEmitter<string>(); // readonly index = input<number>();
  playerItem: Player | null = null;
  players: Player[] = [];
  OutputSignal = signal<Player>(this.players[0] || ({} as Player));
  playerService = inject(PlayersService);
  status: string = 'off';

  constructor(private data: PlayersService) {
    console.log('step 1 - constructor');
  }

  ngOnInit() {
    if (this.playerService.players().length === 0) this.loadPlayers();

    this.playerService.getPlayers();
    this.data.currentPlayerChange.subscribe((status: string) => {
      this.status = 'on';
      console.log(
        'step 2 - ngOnInit',
        'this status = ',
        this.status,
        'players length = ',
        this.playerService.players().length
      );
    });
    this.loadPlayers();
    this.players = this.playerService.players();
    console.log(
      'TestTItemComponent ngOnInit',
      this.players.length,
      ' status = ',
      this.status
    );
  }
  sendMsg(msg: Player) {
    msg = this.playerItem || ({} as Player);
    this.playerService.sendMsg(msg);
    console.log('PlayerItemComponent sendMsg', msg, ' status', this.status);
  }
  sendMsg1(player: Player) {
    const description = this.OutputSignal().description;
    this.playerService.sendMsg1(player);
    console.log(
      'PlayerItemComponent sendMsg1',
      description,
      'player',
      player,
      ' status',
      this.status
    );
  }

  loadPlayers() {
    this.players = this.playerService.players();
    console.log('TestTItemComponent loadPlayers', this.players.length);
    this.playerService.getPlayers2();
  }

  onSelectedPlayer(player: Player) {
    this.playerSelected.emit(player.description);
    this.playerItem = player;
    this.OutputSignal.set(player);
    this.sendMsg(player);
    this.sendMsg1(player);
    console.log(
      'TestTItemComponent onSelectedPlayer ',
      player.description,
      'id = ', player.id,
      ' status = ',
      this.status
    );
  }
}
