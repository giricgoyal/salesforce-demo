import { Component, Inject } from '@angular/core';
import { APP_CONFIG } from '../../shared';
import { HttpService } from '../../shared';

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

    constructor(private httpService: HttpService) {
        this.title = APP_CONFIG.appTitle;
    }

    login() {
        this.httpService.request('salesforce/login-link', 'GET', 'json', null, null, (resp) => {
            window.location.href = resp.url;
        }, (err) => {
            console.log(err);
        });
    }

    logout() {
        
    }
}