import { Component, Inject, OnInit } from '@angular/core';
import { HttpService, AuthenticationService } from '../../shared';

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
    private showLoader: boolean;

    ngOnInit() {
        
    }

    constructor(httpService: HttpService, authService: AuthenticationService) {
        this.httpService = httpService;
        this.authService = authService;
        this.showLoader = false;
    }

    login() {
        this.showLoader = true;
        this.httpService.request('/users/login', 'POST', 'json', this.data, null, (response) => {
            console.log(response);
            this.authService.getToken(response, this.data, () => {
                this.showLoader = false;
            }, null);
        }, () => {
            this.showLoader = false;
        });
    }

    isLoginDisabled() {
        return !this.data.phonenumber || !this.data.password;
    }
}