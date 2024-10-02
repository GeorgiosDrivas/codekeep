import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedService } from '../user-service.service';
import { NgIf, CommonModule } from '@angular/common';
import { NgModel, FormsModule } from '@angular/forms';
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
  newName = '';

  constructor(private sharedService: SharedService, private router: Router) {}

  ngOnInit() {
    this.sharedService.userData$.subscribe((data) => {
      this.userData = data;
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

  changeName() {
    if (this.newName.length > 0) {
      // Call changeName from the service with id and new name
      this.sharedService.changeName(this.userData.id, this.newName).subscribe({
        next: () => {
          window.location.reload();
        },
        error: (err) => {
          console.error(err);
          alert("Error updating user's profile name: " + err.message);
        },
      });
    }
  }
}
