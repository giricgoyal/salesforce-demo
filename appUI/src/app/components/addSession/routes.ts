import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSessionComponent } from './component';

const routes: Routes = [
    {
        path: '',
        component: AddSessionComponent
    }
];

export const AddSessionRouteModule: ModuleWithProviders = RouterModule.forChild(routes);