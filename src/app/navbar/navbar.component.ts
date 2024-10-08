import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  userData: any; // Must change type to something else
  settingsToggle = false;
  newName = 'New Name';
  newUsername = '';
  newPassword = '';
  showPasswordValue = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.userData$.subscribe((data) => {
      this.userData = data;
      this.newName = this.userData?.name;
      this.newUsername = this.userData?.username;
      this.newPassword = this.userData?.password;
    });
  }

  logOut() {
    localStorage.removeItem('user');
    this.router.navigate(['']);
    setInterval(() => {
      location.reload();
    }, 50);
  }

  settings() {
    this.settingsToggle = !this.settingsToggle;
  }

  showPassword() {
    this.showPasswordValue = !this.showPasswordValue;
  }

  editUser() {
    if (this.newName.length > 0) {
      // Call changeName from the service with id and new name
      this.userService
        .editUser(
          this.userData.id,
          this.newName ? this.newName : this.userData.name,
          this.newUsername ? this.newUsername : this.userData.userName,
          this.newPassword ? this.newPassword : this.userData.password
        )
        .subscribe({
          next: () => {
            // Update userData directly so the change reflects in the UI
            this.userData.name = this.newName;
            this.newName = '';
            this.newUsername = '';
            this.newPassword = '';
            this.settingsToggle = false;
          },
          error: (err) => {
            console.error(err);
            alert("Error updating user's profile name: " + err.message);
          },
        });
    }
  }
}
