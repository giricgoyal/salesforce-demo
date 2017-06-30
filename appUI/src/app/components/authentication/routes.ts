import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthGuard } from '../../shared';

const routes: Routes = [
    {
        path:'login/oauth/_callback', 
        component: LoginComponent
    }
];

export const AuthenticationRouteModule: ModuleWithProviders = RouterModule.forChild(routes);