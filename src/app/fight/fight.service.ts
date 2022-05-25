import { Injectable } from '@angular/core';
import {
  HttpTransportType,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from '@microsoft/signalr';
import { delay, fromEvent, shareReplay, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fight } from './fight.model';

@Injectable({ providedIn: 'root' })
export class FightService {
  private hubConnection = new HubConnectionBuilder()
    .withUrl(environment.webSocketUri(), {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets,
    })
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Information)
    .build();
  update = fromEvent<Fight>(this.hubConnection, 'Update').pipe(shareReplay(1));
  restartOnClose = fromEvent(this.hubConnection, 'close')
    .pipe(
      delay(5000),
      switchMap(() => this.hubConnection.start())
    )
    .subscribe();
  constructor() {}

  public join(identifier: string) {
    this.hubConnection
      .start()
      .then(() => this.hubConnection.invoke('Join', identifier));
  }

  public share(identifier: string, fight: Fight) {
    if (this.hubConnection.state == HubConnectionState.Connected) {
      this.hubConnection.invoke('Share', identifier, fight);
    }
  }
}
