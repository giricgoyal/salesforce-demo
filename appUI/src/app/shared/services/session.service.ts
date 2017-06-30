import { Injectable } from '@angular/core';
import { APP_CONFIG } from '../config/app.config';

@Injectable()
export class SessionService {
    private storage: string;

    constructor () {
        this.storage = APP_CONFIG.storage;
    }

    getSessionObj(key){
        if (this.storage === 'localStorage') {
            return localStorage.getItem(key);
        }
    };

    setSessionObj(key, val){
        if (this.storage === 'localStorage') {
            localStorage.setItem(key, val);
        }
    };

    removeSessionObj(key){
        if (this.storage === 'localStorage') {
            localStorage.removeItem(key);
        }
    };
}