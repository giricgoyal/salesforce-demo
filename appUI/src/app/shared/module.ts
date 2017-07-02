import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MdButtonModule, MdCheckboxModule, MdSidenavModule, MdMenuModule, MdIconModule, MdCardModule, MdInputModule, MdDatepickerModule, MdNativeDateModule, MdChipsModule } from '@angular/material';

import { HttpService, SessionService, AuthenticationService, AuthGuard } from './services';
import { AppLoaderComponent, NameInitialsComponent, FabButtonComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,
    MdButtonModule,
    MdCheckboxModule,
    MdSidenavModule,
    MdMenuModule,
    MdIconModule,
    MdCardModule,
    MdInputModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdChipsModule
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
    RouterModule,
    AppLoaderComponent,
    NameInitialsComponent,
    FabButtonComponent,
    MdButtonModule,
    MdCheckboxModule,
    MdSidenavModule,
    MdMenuModule,
    MdIconModule,
    MdCardModule,
    MdInputModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdChipsModule
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ HttpService, SessionService, AuthenticationService, AuthGuard ]
    }
  }
}