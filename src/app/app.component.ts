import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedService } from './user-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'snippetsFrontend';
  user = {};

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    localStorage.clear();
    // const storedUser = localStorage.getItem('user');

    // if (storedUser) {
    //   const user = JSON.parse(storedUser);
    //   this.sharedService.setUserData(user);
    // }
  }
}
