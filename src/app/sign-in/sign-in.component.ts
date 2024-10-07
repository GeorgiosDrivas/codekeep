import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgModel, FormsModule } from '@angular/forms';
import { UserService } from '../services/user-service.service';
import { User } from '../../types';
import { NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  route: ActivatedRoute = inject(ActivatedRoute);

  usernameField = '';
  passwordField = '';
  errorMessage = '';

  showPasswordValue = false;
  loading = false;

  constructor(private userService: UserService, private router: Router) {}

  signUp() {
    this.router.navigate(['/sign-up']);
  }

  login() {
    this.loading = true;
    this.userService.login(this.usernameField, this.passwordField).subscribe({
      next: (user: User) => {
        this.userService.setUserData(user);

        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/dashboard']);
        this.loading = false;
      },
    });
  }

  showPassword() {
    this.showPasswordValue = !this.showPasswordValue;
  }
}
