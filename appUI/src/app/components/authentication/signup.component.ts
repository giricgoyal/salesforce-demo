import { Component, Inject } from '@angular/core';
import { HttpService, AuthenticationService } from '../../shared';

@Component({
    selector: 'signup-component',
    templateUrl: './signup.component.html',
    styleUrls: ['./component.scss'],
    providers: []
})

export class SignupComponent {
    private httpService: HttpService;
    private authService: AuthenticationService;

    constructor(httpService: HttpService, authService: AuthenticationService) {
        this.httpService = httpService;
        this.authService = authService;
    }
}