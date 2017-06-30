import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { EventsListComponent } from './component';
import { EventsListRouteModule } from './routes';

@NgModule({
  imports: [
    EventsListRouteModule,
    SharedModule
  ],
  declarations: [
    EventsListComponent
  ]
})

export class EventsListModule {}