import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlayersService } from '../_services/players.service';
import { TestTListComponent } from './testT-list/testT-list.component';
import { TestTStartComponent } from './testT-start/testT-start.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testThis',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TestTListComponent,
    TestTStartComponent
],
  templateUrl: './testThis.component.html',
  styleUrls: ['./testThis.component.css'],
})
export class TestThisComponent implements OnInit {
  playerService = inject(PlayersService);
  //private router = inject(Router);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  playerId!: string;

  constructor() {
    this.loadPlayers();
  }

  ngOnInit(): void {

  }

  loadPlayers() {
    this.playerService.getPlayers();
  }
}
