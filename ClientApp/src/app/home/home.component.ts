import { Component, Inject } from '@angular/core';
import { AuthenticationService } from "./../authentication.service";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public welcomeMessage: string = "";
  constructor(private _authService: AuthenticationService,private _router: Router,http: HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    if (!_authService.isLoggedIn) {
      _router.navigate(['/login']);
    };
    http.get<resultHome>(baseUrl + 'home').subscribe(result => {
      this.welcomeMessage = result.message;
    }, error => console.error(error));
  }
}
interface resultHome {
  message:string
}
