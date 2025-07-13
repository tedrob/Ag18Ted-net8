import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { User } from '../_models/user';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  hubUrl = environment.hubUrl;
  hubConnection?: HubConnection;
  private toastr = inject(ToastrService);
  private router = inject(Router);
  onlineUsers = signal<string[]>([]);

  createHubConnection(user: User) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch(error => console.log(error));

    this.hubConnection.on('UserOnline', userId => {
      this.onlineUsers.update(users => [...users, userId])
    });

    this.hubConnection.on('UserOffline', userId => {
      this.onlineUsers.update(users => users.filter(x => x !== userId));
    });

    this.hubConnection.on('GetOnlineUsers', userIds => {
      this.onlineUsers.set(userIds)
    })

    this.hubConnection.on('NewMessageReceived', ({username, knownAs}) => {
      this.toastr.info(knownAs + ' has sent you a new message! Click me to see it')
        .onTap
        .pipe(take(1))
        .subscribe(() => this.router.navigateByUrl('/members/' + username + '?tab=Messages'))
    })
  }

  stopHubConnection() {
    if (this.hubConnection?.state === HubConnectionState.Connected) {
      this.hubConnection.stop().catch(error => console.log(error))
    }
  }

}
