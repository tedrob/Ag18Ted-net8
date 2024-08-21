import { Component, inject, OnInit } from '@angular/core';
import { PlayersService } from '../../../_services/players.service';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../../../_models/player';

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [],
  templateUrl: '../player-detail/player-detail.component.html',
  styleUrl: '../player-detail/player-detail.component.css'
})
export class PlayerDetailComponent implements OnInit {
  private playerService = inject(PlayersService);
  private route = inject(ActivatedRoute)
  player?: Player;

  ngOnInit(): void {
    this.loadPlayer();
  }

  loadPlayer() {
    const playername = this.route.snapshot.paramMap.get('playername');
    if (!playername) return;
    this.playerService.getPlayer(playername).subscribe({
      next: player => this.player = player
    })
  }

}
