import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ToasterModule } from 'angular2-toaster';
import { RouterModule } from '@angular/router';
import { MdButtonModule, MdCheckboxModule, MdSidenavModule, MdMenuModule, MdIconModule, MdCardModule } from '@angular/material';

import { HttpService, ToasterInjectableService, SessionService, AuthenticationService, AuthGuard } from './services';
import { AppLoaderComponent, NameInitialsComponent, FabButtonComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ToasterModule,
    RouterModule,
    MdButtonModule,
    MdCheckboxModule,
    MdSidenavModule,
    MdMenuModule,
    MdIconModule,
    MdCardModule
  ],
  declarations: [
    AppLoaderComponent,
    NameInitialsComponent,
    FabButtonComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ToasterModule,
    RouterModule,
    AppLoaderComponent,
    NameInitialsComponent,
    FabButtonComponent,
    MdButtonModule,
    MdCheckboxModule,
    MdSidenavModule,
    MdMenuModule,
    MdIconModule,
    MdCardModule
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ HttpService, ToasterInjectableService, SessionService, AuthenticationService, AuthGuard ]
    }
  }
}