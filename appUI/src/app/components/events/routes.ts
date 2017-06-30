import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsListComponent } from './component';

const routes: Routes = [
    {
        path: '',
        component: EventsListComponent
    }
];

export const EventsListRouteModule: ModuleWithProviders = RouterModule.forChild(routes);