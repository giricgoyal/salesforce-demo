import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { AppHeaderComponent } from './component';
import { AppSidebarModule } from '../sidebar';

@NgModule({
  imports: [
    AppSidebarModule,
    SharedModule
  ],
  declarations: [
    AppHeaderComponent
  ],
  exports: [AppHeaderComponent]
})

export class AppHeaderModule {}