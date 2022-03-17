import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { AuthenticationService } from "./authentication.service";
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from "../environments/environment"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'app';
  baseUrl = environment.apiUrl;
  constructor(private _authService: AuthenticationService, private _router: Router) { }
  ngOnInit(): void {

    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(this.baseUrl + "notify")
      .build();

    connection.start().then(function () {
      console.log('SignalR Connected!');
    }).catch(function (err) {
      return console.error(err.toString());
    });

    connection.on("BroadcastMessage", (payload: string) => {
      if (payload == "logout") {
        this._authService.logout();
        this._router.navigate(["/login"]);
      }
      else {
        console.log(payload);
      }
    });
  }

}
