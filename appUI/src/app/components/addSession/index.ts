import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { AddSessionComponent } from './component';
import { AddSessionRouteModule } from './routes';

@NgModule({
  imports: [
    AddSessionRouteModule,
    SharedModule
  ],
  declarations: [
    AddSessionComponent
  ]
})

export class AddSessionModule {}