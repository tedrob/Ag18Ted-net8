import { Component, inject, OnInit } from '@angular/core';
import { PlayersService } from '../../_services/players.service';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../../_models/player';

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [],
  templateUrl: './player-detail.component.html',
  styleUrl: './player-detail.component.css'
})
export class PlayerDetailComponent implements OnInit{
  private playerService = inject(PlayersService);
  private route = inject(ActivatedRoute);
  player?: Player;

  ngOnInit(): void {
  }

  loadPlayer() {}

}
