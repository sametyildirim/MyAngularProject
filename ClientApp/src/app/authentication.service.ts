import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { map } from "rxjs/operators";

import {environment} from "../environments/environment"
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _authChangeSub = new Subject<boolean>()
  public authChanged = this._authChangeSub.asObservable();
  private isUserAuthenticated: boolean = false;

  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this._authChangeSub.next(isAuthenticated);
  }

  login(body:any) {
    return this.http
      .post<any>(this.baseUrl + "Account/login", body)
      .pipe(
        map(data => {
          if (data.isAuthSuccessful) {
            //do some action
            localStorage.setItem("IsLogin", "true")
            this.isUserAuthenticated = true;
          } 
          return data
        })
      )
  }
  public logout = () => {
    localStorage.removeItem("token");
    this.isUserAuthenticated = false;
    this.sendAuthStateChangeNotification(false);
  }
  get isLoggedIn(): boolean {

    return this.isUserAuthenticated;
  }
  public getToken(): any {
    return localStorage.getItem('token');
  }



}