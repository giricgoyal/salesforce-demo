import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    // {
    //     path: '', 
    //     loadChildren: 'app/components/authentication/index#AuthenticationModule'
    // },
    {
        path: '',
        loadChildren: 'app/components/main/index#MainModule'
    },
    {
        path: 'auth',
        loadChildren: 'app/components/authentication/index#AuthenticationModule'
    }
];

export const AppRouteModule: ModuleWithProviders = RouterModule.forRoot(routes);