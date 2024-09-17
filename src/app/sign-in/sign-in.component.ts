import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgModel, FormsModule } from '@angular/forms';
import { SharedService } from '../user-service.service';
import { User } from '../../types';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  route: ActivatedRoute = inject(ActivatedRoute);

  usernameField = '';
  passwordField = '';
  errorMessage = '';
  showPasswordValue = false;

  constructor(private sharedService: SharedService, private router: Router) {}

  signUp() {
    this.router.navigate(['/sign-up']);
  }

  login() {
    this.sharedService.login(this.usernameField, this.passwordField).subscribe({
      next: (user: User) => {
        this.sharedService.setUserData(user);

        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/dashboard']);
      },
    });
  }

  showPassword() {
    this.showPasswordValue = !this.showPasswordValue;
  }
}
