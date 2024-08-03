import { Component, inject, OnInit } from '@angular/core';
import { PlayersService } from '../../_services/players.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerListComponent } from '../player-list/player-list.component';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [PlayerListComponent],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
  private playerService = inject(PlayersService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {}
}
