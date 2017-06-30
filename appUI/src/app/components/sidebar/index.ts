import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { AppSidebarComponent } from './component';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        AppSidebarComponent
    ],
    exports: [AppSidebarComponent]
})

export class AppSidebarModule {}