import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
import { ForgotPasswordComponent } from './forgotpassword.component';
import { SharedModule, AuthenticationService } from '../../shared';
import { AuthenticationRouteModule } from './routes';

@NgModule({
  imports: [
    AuthenticationRouteModule,
    SharedModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent
  ]
})

export class AuthenticationModule {
  constructor(private authService: AuthenticationService) {
    if (this.authService.isAuthenticated()) {
      this.authService.redirectAfterAuth();
    }
  }
}