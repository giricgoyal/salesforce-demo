import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventDetailComponent } from './component';

const routes: Routes = [
    {
        path: '',
        component: EventDetailComponent
    }
];

export const EventDetailRouteModule: ModuleWithProviders = RouterModule.forChild(routes);