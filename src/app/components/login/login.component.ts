import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private route: Router) {}

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'you mus enter a value';
    }
    return this.email.hasError('email') ? 'Enter a valid email' : '';
  }

  onSubmit() {
    if (this.email.valid || this.password.valid)
      this.route.navigate(['/', 'dashboard']);
  }
}
