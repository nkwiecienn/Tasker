import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
// start with npm run start:json-server
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
