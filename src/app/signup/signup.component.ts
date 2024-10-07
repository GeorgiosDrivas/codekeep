import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user-service.service';
import { NgModel, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  fullNameField: string = '';
  usernameField: string = '';
  passwordField: string = '';
  confirmPasswordField: string = '';

  showPasswordValue = false;
  showVerifyPasswordValue = false;
  route: ActivatedRoute = inject(ActivatedRoute);

  constructor(private userService: UserService, private router: Router) {}

  submit() {
    if (this.passwordField === this.confirmPasswordField) {
      this.userService
        .signUp(this.fullNameField, this.usernameField, this.passwordField)
        .subscribe({
          next: () => {
            this.router.navigate(['/sign-in']);
          },
        });
    } else {
      this.passwordField = '';
      this.confirmPasswordField = '';
      alert('Your password fields must match.');
    }
  }

  showPassword() {
    this.showPasswordValue = !this.showPasswordValue;
  }

  showVerifyPassword() {
    this.showVerifyPasswordValue = !this.showVerifyPasswordValue;
  }
}
