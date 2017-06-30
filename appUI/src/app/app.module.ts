import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared';
import { MainModule, AuthenticationModule } from './components';
import { AppRouteModule } from './shared/config/app.routes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // BrowserModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    AppRouteModule
  ],
  bootstrap: [AppComponent]
})
  
export class AppModule { }
