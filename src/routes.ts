import { Routes } from '@angular/router';
import { SignInComponent } from './app/sign-in/sign-in.component';
import { HomePageComponent } from './app/home-page/home-page.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { SignupComponent } from './app/signup/signup.component';
const routeConfig: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'Home Page',
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    title: 'Sign in',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
  },
  {
    path: 'sign-up',
    component: SignupComponent,
    title: 'Sign Up',
  },
];

export default routeConfig;
