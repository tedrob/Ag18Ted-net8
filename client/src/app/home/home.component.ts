import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [RegisterComponent]
})
export class HomeComponent implements OnInit{
  http = inject(HttpClient);
  registerMode = false;
  users: any;
  players: any;

  ngOnInit(): void {
      this.getUsers();
      this.getPlayers();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log('Request has completed')
    });
  }

  getPlayers() {
    this.http.get('https://localhost:5001/api/players').subscribe({
      next: response => this.players = response,
      error: error => console.log(error),
      complete: () => console.log('Request has completed')
    });
  }
}
