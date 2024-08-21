import { Component, inject, OnInit } from '@angular/core';
import { Player } from '../../../_models/player';
import { AccountService } from '../../../_services/account.service';
import { PlayersService } from '../../../_services/players.service';

@Component({
  selector: 'app-player-edit',
  standalone: true,
  imports: [],
  templateUrl: './player-edit.component.html',
  styleUrl: './player-edit.component.css'
})
export class PlayerEditComponent implements OnInit {
  player?: Player;
  private accountService = inject(AccountService);
  private playerService = inject(PlayersService);

  ngOnInit(): void {
    this.loadPlayer();
  }

  loadPlayer() {
    const user = this.accountService.currentUser();
    if (!user) return;
    this.playerService.getPlayer(user.username).subscribe({
      next: player => this.player = player
    })
  }
}
