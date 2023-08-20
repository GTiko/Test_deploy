import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from './auth/data.service';
import { ILogin, IState } from './users/IUser.interface';
import jwt_decode from 'jwt-decode';
import { environment as env } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  template: `
  <header style="display: flex; justify-content: space-around;">
    <h1  [routerLink]="['', 'welcome']" class="home">Home</h1>
    <h1>Welcome to Track and Split Expense</h1>
  </header>
  <div id="loginSignUp">
    <h2> Login</h2>
    
    <div *ngIf="isLoading" class="loading-indicator">
      <div class="loading-spinner"></div>
    </div>


    <form [formGroup]="loginForm" (ngSubmit)="login()" id="loginForm">
      <input type="email" placeholder="email" formControlName="email" /> <br />
      <input type="password" placeholder="password" formControlName="password" /> <br />
      <button type="submit" class="btn btn-primary" >Login</button>
    </form>
    <p style="display: flex; flex-direction: column; align-items: center;">
      <a [routerLink]="['', 'signup']">Create new account</a>
    </p>
    </div>
  `,
  styles: [],


})
export class LoginComponent {
  private router = inject(Router);
  private dataService = inject(DataService);
  private toastr = inject(ToastrService);


  isLoading: boolean = false; 

  loginForm = inject(FormBuilder).nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  login() {
    this.isLoading = true;

    this.dataService
      .login(this.loginForm.value as ILogin)
      .subscribe((response) => {
        if (response.success) {
          this.router.navigate(['', 'users']);
          localStorage.setItem(env.KEY, JSON.stringify(response.data));
          const stateTemp: IState = {
            ...jwt_decode(response.data),
            token: response.data,
          };
          this.dataService.state.set(stateTemp);
        } else {
          this.toastr.error('Wrong username or password');
        }
        this.isLoading = false;
      });
  }
}
