import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { MainComponent } from './component';
import { AppHeaderModule } from '../header';
import { MainRouteModule } from './routes';

@NgModule({
  imports: [
    AppHeaderModule,
    MainRouteModule,
    SharedModule
  ],
  declarations: [
    MainComponent
  ]
})

export class MainModule {}