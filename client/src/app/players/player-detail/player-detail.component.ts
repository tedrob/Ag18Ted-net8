import { Component, inject, OnInit } from '@angular/core';
import { PlayersService } from '../../_services/players.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../../_models/player';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [],
  templateUrl: '../player-detail/player-detail.component.html',
  styleUrl: '../player-detail/player-detail.component.css',
})
export class PlayerDetailComponent implements OnInit {
  private sanitizer = inject(DomSanitizer);
  private playerService = inject(PlayersService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  player?: Player;
  id!: number;

  ngOnInit(): void {
    this.loadPlayer();
  }

  loadPlayer() {
    const playername = this.activatedRoute.snapshot.paramMap.get('playername');
    console.log("test no playername returned "+ playername)
    if (!playername) return;
    this.playerService.getPlayer(playername).subscribe({
      next: (player) => {
        this.player = player;
        console.log("test ")
      },
    });
  }
}
