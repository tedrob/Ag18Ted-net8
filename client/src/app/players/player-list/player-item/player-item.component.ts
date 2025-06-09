import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  inject,
  signal,
} from '@angular/core';
import { Player } from '../../../_models/player';
import { CommonModule } from '@angular/common';
import { PlayersService } from '../../../_services/players.service';

@Component({
  selector: 'app-player-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-item.component.html',
  styleUrl: './player-item.component.css',
})
export class PlayerItemComponent implements OnInit {
  @Output() selectedPlayerEvent = new EventEmitter<string>();
  playerItem: Player | null = null;
  playerService = inject(PlayersService);
  // new section for this component
  status!: string;
  players: Player[] = [];
  OutputSignal = signal<Player>(this.players[0] || ({} as Player));

  // end new section

  constructor(private data: PlayersService) {}

  sendMsg(msg: Player) {
    msg = this.playerItem!;
    this.playerService.sendMsg(msg);
  }
  sendMsg1(msg: Player) {
    msg = this.playerItem!;
    this.playerService.sendMsg1(msg);
  }

  ngOnInit(): void {
    this.playerService.getPlayers();
    this.data.currentPlayerChange.subscribe((status: string) => {
      this.status = 'on';
    });
    this.loadPlayers();
    //console.log('PlayerItemComponent ngOnInit', this.players.length)
  }
  loadPlayers() {
    this.players = this.playerService.players();
    this.playerService.getPlayers2();

    this.playerService.getPlayers2().subscribe((players) => {
      this.players = players;
    });
  }

  onSelectedPlayer(player: Player) {
    this.selectedPlayerEvent.emit(player.description);
    this.playerItem = player;
    this.OutputSignal.set(player);
    this.sendMsg(player);
    this.sendMsg1(player);
    if (this.playerItem) {
      this.playerItem = player;
    }

    this.sendMsg(player);
    this.sendMsg1(player);
  }
}
