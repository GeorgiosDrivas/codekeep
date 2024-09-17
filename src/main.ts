import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/main/app.component';
import { provideRouter } from '@angular/router';
import routeConfig from './routes';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routeConfig), provideHttpClient()],
}).catch((err) => console.error(err));
