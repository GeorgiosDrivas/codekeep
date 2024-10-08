import { Component } from '@angular/core';
import { HeadingTextComponent } from '../heading-text/heading-text.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeadingTextComponent, RouterModule],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {}
