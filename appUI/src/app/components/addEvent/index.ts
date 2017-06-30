import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { AddEventComponent } from './component';
import { AddEventRouteModule } from './routes';

@NgModule({
  imports: [
    AddEventRouteModule,
    SharedModule
  ],
  declarations: [
    AddEventComponent
  ]
})

export class AddEventModule {}