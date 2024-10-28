import { Component, computed, inject, OnInit } from '@angular/core';
import { PlayersService } from '../../../_services/players.service';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Player } from '../../../_models/player';

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [],
  templateUrl: '../player-detail/player-detail.component.html',
  styleUrl: '../player-detail/player-detail.component.css'
})
export class PlayerDetailComponent implements OnInit {
  playerService = inject(PlayersService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  routerEvents = toSignal(this.router.events);
  displayPlayerName = computed(() => {
    let playerName: any = 'nothing to display';

    if (this.routerEvents()) {
      playerName = this.activatedRoute.snapshot.paramMap.get('playername')
    }

    return playerName;
  });
  player?: Player;


  ngOnInit(): void {
    this.loadPlayer();
  }

  loadPlayer() {
    const playername = this.activatedRoute.snapshot.paramMap.get('playername');
    console.log('old p-detail '+ this.player);
    if (!playername) return;
    this.playerService.getPlayer(playername).subscribe({
      next: player => this.player = player
    })
  }

}
