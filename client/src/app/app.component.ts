import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { AccountService } from './_services/account.service';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { PresenceService } from './_services/presence.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, NavComponent, NgxSpinnerComponent],
})
export class AppComponent implements OnInit {
  private http = inject(HttpClient);
  private accountService = inject(AccountService);
  private presence = inject(PresenceService);
  protected members = signal<any>([]);

  async ngOnInit() {
    this.members.set(await this.getMembers());
    this.members.set(await this.setCurrentUser());
  }

  async getMembers() {
    try {
      return await lastValueFrom (
        this.http.get('https://localhost:5001/api/members')
      );
    } catch (error) {
      console.error('Error fetching members:', error);
    }
    return this.http.get('https://localhost:5001/api/members');
  }

  async setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
    this.presence.createHubConnection(user);
  }
}
