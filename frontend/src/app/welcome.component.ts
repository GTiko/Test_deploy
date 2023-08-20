import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  template: `

   <header>
    <h1>Welcome to Track and Split Expense</h1>
  </header>

  <main>
    <section class="hero">
      <div class="hero-text">
        <h2>Effortless Expense Tracking and Sharing</h2>
        <h2>Track and split expenses with your friends, roommates, or colleagues. Keep everyone on the same page and never worry about who owes what.</h2>
      </div>

      <section >
      <a [routerLink]="['', 'login']" class="login-btn">Login</a>
      <a [routerLink]="['', 'signup']" class="signup-btn">Sign Up</a>
    </section>
    </section>

 
  </main>


  `,
  styles: [
  ]
})
export class WelcomeComponent {

}
