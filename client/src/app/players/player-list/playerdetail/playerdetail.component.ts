import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlayersService } from '../../../_services/players.service';
import { CommonModule } from '@angular/common';
import { Player } from '../../../_models/player';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YouTubePlayer } from '@angular/youtube-player';

@Component({
  selector: 'app-playerdetail',
  standalone: true,
  imports: [CommonModule, YouTubePlayer],
  templateUrl: './playerdetail.component.html',
  styleUrls: ['./playerdetail.component.css'],
})
export class PlayerdetailComponent implements OnInit, OnDestroy {
  //parentMessage: string = '';
  @Input() playerValue!: Player;
  @Input() player!: Player;
  @Input() players: Player[] = [];
  PLplayerList: string[] = [];

  private _selectedPlayer: Player | undefined;
  // new section for this component
  playerlists: Player[] = [];
  playerlist: string[] = [];
  playerlist2: string[] = [];
  urlCache = new Map<string, SafeResourceUrl>();

  // end new section
  search: string = '';
  private dataSubscription: Subscription | undefined;

  constructor(private playerService: PlayersService, private sanitizer: DomSanitizer) {
    this.playerService.getPlayers2().subscribe((players) => {
      this.players = players;
      console.log('PlayerDetailComponent getPlayers2', this.players.length);
      for (const player of this.players) {
        this.PLplayerList.push(player.playername.toString());
      }
      console.log('PlayerDetailComponent getPlayers2 PlplayerList', this.PLplayerList.length);

    });
    this.playerService.receiveMsg1().subscribe({
      next: (player: Player) => {
        this.player = player;
        console.log('Received player from receiveMsg1', player);
      },
      error: (err: any) => {
        console.error('Error receiving player from receiveMsg1:', err);
      },
    });

    //
  }

  ngOnInit() {}

  getEmbedURL(item: Player): SafeResourceUrl | undefined {
    // Check if the URL is already cached
    if (this.urlCache.has(item.playername)) {
      return this.urlCache.get(item.playername);
    } else {
      console.log('PlayerDetailComponent getEmbedURL', item.playername);
    }
    let z = 0;
    let i;// = 0;
    const playerlist2: string[] = [];
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].id === item.id) {
        z = i + 1;
        break;
      }
    }
    // Ensure z is a valid number and within bounds
    if (z < 0 || z > this.players.length) {
      z = 0;
    }
    for (let i = z; i < this.players.length; i++) {
      const names2 = this.players[i].playername;
      this.playerlist2.push(names2);
    }

    for (let i = 0; i < z; i++) {
      const names2 = this.players[i].playername;
      playerlist2.push(names2);
    }

    let url = this.urlCache.get(item.playername);

    const lnk1 = item.playername
    const lnk2 =
      '?rel=0?version=3&amp;autoplay=1&amp;controls=1&loop=1&playlist=' + playerlist2;

    if (!url) {
      url = this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://www.youtube.com/embed/' + lnk1 + '?enablejasapi=1; allow="accelerometer; autoplay=1;' + lnk2);
      console.log('PlayerDetailComponent getEmbedURL url', url);
      this.urlCache.set(item.playername, url);
    }
    return url;
  }

  ngOnDestroy() {
    this.dataSubscription?.unsubscribe();
  }
}
