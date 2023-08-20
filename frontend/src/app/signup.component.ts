import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from './auth/data.service';
import { ISingUp } from './users/IUser.interface';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  template: `
  <header style="display: flex; justify-content: space-around;">
    <h1  [routerLink]="['', 'welcome']" class="home">Home</h1>
    <h1>Welcome to Track and Split Expense</h1>
  </header>
  <div id="loginSignUp">
    <h2 [ngStyle]="{'display':'flex','justify-content':'center'}">SignUp</h2>

    <div *ngIf="isLoading" class="loading-indicator">
      <div class="loading-spinner"></div>
    </div>

    <form [formGroup]="signupForm" (ngSubmit)="signup()" id="loginForm">
      <input type="text" placeholder="Full-name" formControlName="fullname" />
      <br />
      <input type="email" placeholder="Email" formControlName="email" /> <br />
      <input
        type="password"
        placeholder="Password"
        formControlName="password"
      />
      <br />
      <button type="submit" class="btn btn-primary">Signup</button>
    </form>
    <p style="display: flex; flex-direction: column; align-items: center;">
      <a [routerLink]="['', 'login']">Already have account</a>
    </p>
    </div>
  `,
  styles: [],
})
export class SignupComponent {
  private router = inject(Router);
  private userData = inject(DataService);
  private toastr = inject(ToastrService);


  signupForm = inject(FormBuilder).nonNullable.group({
    fullname: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  isLoading: boolean = false; 

  signup() {

    this.isLoading = true;

    this.userData
      .signup(this.signupForm.value as ISingUp)
      .subscribe((response) => {
        if (response.success) {
          this.toastr.success("Signup successfully!");
          this.router.navigate(['', 'login']);
        } else {
          this.toastr.error(response.data);
        }
        this.isLoading = false;
      });
  }
}
