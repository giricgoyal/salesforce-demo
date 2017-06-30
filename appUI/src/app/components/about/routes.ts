import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './component';

const routes: Routes = [
    {
        path: '',
        component: AboutComponent
    }
];

export const AboutRouteModule: ModuleWithProviders = RouterModule.forChild(routes);