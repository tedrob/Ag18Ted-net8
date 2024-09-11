import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Player } from '../../../_models/player';
import { AccountService } from '../../../_services/account.service';
import { PlayersService } from '../../../_services/players.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-player-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './player-edit.component.html',
  styleUrl: './player-edit.component.css'
})
export class PlayerEditComponent implements OnInit {
  @HostListener('window:beforeunload', ['$event']) notify($event:any){
    // if  (this.editForm?.dirty) {
    //   $event.returnValue = true;
    // }
  }
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
