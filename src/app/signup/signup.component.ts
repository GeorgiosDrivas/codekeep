import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../user-service.service';
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

  showPasswordValue = false;
  route: ActivatedRoute = inject(ActivatedRoute);

  constructor(private sharedService: SharedService, private router: Router) {}

  submit() {
    this.sharedService
      .signUp(this.fullNameField, this.usernameField, this.passwordField)
      .subscribe({
        next: () => {
          this.router.navigate(['/sign-in']);
        },
      });
  }

  showPassword() {
    this.showPasswordValue = !this.showPasswordValue;
  }
}
