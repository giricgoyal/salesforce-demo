import { Injectable } from '@angular/core';
import { HttpService, SessionService } from '../../shared/services';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
    private httpService: HttpService;
    private sessionService: SessionService;
    private routerState: ActivatedRoute;
    private router: Router;

    constructor(httpService: HttpService, sessionService: SessionService, routerState: ActivatedRoute, router: Router) {
        this.httpService = httpService;
        this.sessionService = sessionService;
        this.routerState = routerState;
        this.router = router;
    }

    redirectAfterAuth() {
        this.routerState.params.subscribe(params => {
            if (params['redirecturl']) {
                window.location.href = params['redirecturl'];    
            }
            else {
                this.router.navigate(['/app/about']);
            }
        });
    }

    isAuthenticated(){
        return !!this.sessionService.getSessionObj('user_id');
    };

    isAdmin() {
        return this.sessionService.getSessionObj('is_admin') === 'true';
    }

    getUserId() {
        return this.sessionService.getSessionObj('user_id');
    }
    getAccessType() {
        return this.sessionService.getSessionObj('access_type');
    }

    logout(){
        this.sessionService.removeSessionObj('client_id');
        this.sessionService.removeSessionObj('client_secret');
        this.sessionService.removeSessionObj('access_token');
        this.sessionService.removeSessionObj('refresh_token');
        this.sessionService.removeSessionObj('token_type');
        this.sessionService.removeSessionObj('user_id');
        this.sessionService.removeSessionObj('is_admin');
        this.sessionService.removeSessionObj('fullname');

        this.router.navigate(['/login']);
    }

    getToken(obj, userObj, successFn, errorFn){
        let data = {
            grant_type: 'password',
            client_id: obj.clientId,
            client_secret: obj.clientSecret,
            username: userObj.phonenumber,
            password: userObj.password
        };

        this.httpService.request('/oauth/token', 'POST', 'json', data, null, (response) => {
            this.sessionService.setSessionObj('client_id', data.client_id);
            this.sessionService.setSessionObj('client_secret', data.client_secret);
            this.sessionService.setSessionObj('access_token', response.access_token);
            this.sessionService.setSessionObj('refresh_token', response.refresh_token);
            this.sessionService.setSessionObj('token_type', response.token_type);
            this.sessionService.setSessionObj('fullname', obj.firstname + ' ' + obj.lastname);
            this.sessionService.setSessionObj('user_id', obj.userId);
            if (obj.is_admin) {
                this.sessionService.setSessionObj('is_admin', obj.is_admin);
            }

            this.httpService.setHttpDefaultsHeadersCommonAuthorization('Bearer ' + response.access_token);

            this.redirectAfterAuth();

            if (successFn) {
                successFn();
            }
        }, null);
    };
}