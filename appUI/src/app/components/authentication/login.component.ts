import { Component, Inject, OnInit } from '@angular/core';
import { HttpService, AuthenticationService } from '../../shared';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./component.scss']
})

export class LoginComponent implements OnInit {
    data = {
        phonenumber: '',
        password: ''
    };

    private httpService: HttpService;
    private authService: AuthenticationService;
    private activatedRoute: ActivatedRoute;
    private showLoader: boolean;

    constructor(httpService: HttpService, authService: AuthenticationService, activatedRoute: ActivatedRoute) {
        this.httpService = httpService;
        this.authService = authService;
        this.activatedRoute = activatedRoute;
        this.showLoader = false;
    }

    ngOnInit() {
        let code = this.activatedRoute.snapshot.queryParams['code'];
        console.log(code);
        this.getTokens(code);
    }

    getTokens(code) {
        this.httpService.request(`salesforce/token?code=${code}`, 'GET', 'json', null, null, (response) => {
            console.log(response);
            
        }, () => {

        });
    }
}