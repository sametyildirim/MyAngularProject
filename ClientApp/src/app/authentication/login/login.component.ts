import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControlName,
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from "./../../authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  title = "User-Login";
  submitted: boolean = false;
  loginForm: FormGroup = new FormGroup({}) ;
  public errorMessage: string = '';
  public showError: boolean = false;
  private _returnUrl: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private _router: Router, 
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    let body = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    //console.log(body)
    this.authService.login(body).subscribe((data: any) => {
      localStorage.setItem("token", data.token);
      this._router.navigate([this._returnUrl]);
      this.authService.sendAuthStateChangeNotification(data.isAuthSuccessful);
      
    },
    (error:any) => {
      this.errorMessage = error.error.errorMessage;
      this.showError = true;
      console.log(error.error.errorMessage);
    });
  }
}