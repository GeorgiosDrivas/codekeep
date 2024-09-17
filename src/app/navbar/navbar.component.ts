import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedService } from '../user-service.service';
import { NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  userData: any; // Must change type to something else

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
}
