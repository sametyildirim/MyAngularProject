import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "./../authentication.service";
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent  implements OnInit {
  isExpanded = false;
  public isUserAuthenticated: boolean = false;
  constructor(private _authService: AuthenticationService,private _router: Router) { }
  ngOnInit(): void {
    this._authService.authChanged
    .subscribe(res => {
      this.isUserAuthenticated = res;
    })
  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  public logout = () => {
    this._authService.logout();
    this._router.navigate(["/login"]);
  }
}
