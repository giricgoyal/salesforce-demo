import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
import { ForgotPasswordComponent } from './forgotpassword.component';
import { AuthGuard } from '../../shared';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path:'login', 
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'requestotp',
        component: ForgotPasswordComponent
    }
];

export const AuthenticationRouteModule: ModuleWithProviders = RouterModule.forChild(routes);