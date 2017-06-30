import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { AboutComponent } from './component';
import { AboutRouteModule } from './routes';

@NgModule({
  imports: [
    AboutRouteModule,
    SharedModule
  ],
  declarations: [
    AboutComponent
  ]
})

export class AboutModule {}