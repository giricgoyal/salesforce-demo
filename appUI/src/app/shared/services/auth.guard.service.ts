import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthenticationService, private router: Router) {}

    canActivate() {
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['']);
            return false;
        }
        return true;
    }
}