import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEventComponent } from './component';

const routes: Routes = [
    {
        path: '',
        component: AddEventComponent
    }
];

export const AddEventRouteModule: ModuleWithProviders = RouterModule.forChild(routes);