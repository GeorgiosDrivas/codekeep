import { Component } from '@angular/core';
import { HeadingImageComponent } from '../heading-image/heading-image.component';
import { HeadingTextComponent } from '../heading-text/heading-text.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeadingImageComponent, HeadingTextComponent, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
