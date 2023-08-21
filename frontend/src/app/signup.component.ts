import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from './auth/data.service';
import { ISingUp } from './users/IUser.interface';
import { ToastrService } from 'ngx-toastr';

import { faHome } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-signup',
  template: `
  <header style="display: flex; justify-content: space-around;">
    <h1  [routerLink]="['', 'welcome']" class="home">
      <fa-icon [icon]="faHome"></fa-icon>
    </h1>
    <h1>Track and Split Expense</h1>
  </header>
  <div id="loginSignUp">

    <div *ngIf="isLoading" class="loading-indicator">
      <div class="loading-spinner"></div>
    </div>

    <form [formGroup]="signupForm" (ngSubmit)="signup()" id="loginForm">
      <h1>SignUp</h1>
      <input type="text" placeholder="Name" formControlName="fullname" />
      <br />
      <input type="email" placeholder="Email" formControlName="email" /> <br />
      <input
        type="password"
        placeholder="Password"
        formControlName="password"
      />
      <br />
      <button type="submit" class="btn btn-primary">Signup</button>

      <p style="display: flex; flex-direction: column; align-items: center;">
        <a [routerLink]="['', 'login']">Already have account</a>
      </p>
    </form>

    </div>
  `,
  styles: [],
})
export class SignupComponent {
  private router = inject(Router);
  private userData = inject(DataService);
  private toastr = inject(ToastrService);
  
  faHome = faHome




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
