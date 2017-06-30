import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { EventDetailComponent } from './component';
import { EventDetailRouteModule } from './routes';

@NgModule({
  imports: [
    EventDetailRouteModule,
    SharedModule
  ],
  declarations: [
    EventDetailComponent
  ]
})

export class EventDetailModule {}