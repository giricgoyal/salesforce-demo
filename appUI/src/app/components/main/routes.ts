import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './component';
import { AuthGuard } from '../../shared';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children : [
            {
                path: 'about',
                loadChildren: '../about/index#AboutModule',
                // canActivate: [AuthGuard]
            },
            {
                path: 'events',
                loadChildren: '../events/index#EventsListModule'
            },
            {
                path: 'add-event',
                loadChildren: '../addEvent/index#AddEventModule'
            }
        ]
    }
];

export const MainRouteModule: ModuleWithProviders = RouterModule.forChild(routes);
