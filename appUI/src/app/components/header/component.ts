import { Component, Inject } from '@angular/core';
import { APP_CONFIG } from '../../shared';
import { SessionService, AuthenticationService } from '../../shared';

@Component({
    selector: 'app-header',
    templateUrl: './component.html',
    styleUrls: ['./component.scss'],
    providers: []
})

export class AppHeaderComponent {
    public title = '';
    public fullName: string;
    public isAdmin: boolean;
    public isDoctor: boolean;

    constructor(private sessionService: SessionService, private authService: AuthenticationService) {
        this.title = APP_CONFIG.appTitle;
        this.fullName = this.sessionService.getSessionObj('fullname');
        this.isAdmin = this.sessionService.getSessionObj('is_admin') === 'true';
        this.isDoctor = this.sessionService.getSessionObj('access_type') === 'doctor';
    }

    toggleSidebar() {

    }

    logout() {
        this.authService.logout();
    }
}