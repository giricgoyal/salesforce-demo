import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { APP_CONFIG } from '..';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ToasterInjectableService } from './toaster.service';

@Injectable()
export class HttpService {
    private headers;
    private http: Http;
    private toasterService: ToasterInjectableService;

    constructor (http: Http, toasterService: ToasterInjectableService) {
        this.http = http;
        this.toasterService = toasterService;
        this.headers = new Headers();
    }


    private extractData(res: Response) {
        let body = res.json();
        return body.result || body;
    }

    private handleError (error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        let err;
        if (error instanceof Response) {
            const body = error.json() || '';
            err = body.message;
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
    
        console.log(errMsg);
        return Observable.throw(err);
    }

    setHttpDefaultsHeadersCommonAuthorization(header) {
        this.headers.set('Authorization', header);
    }
    
    request(url, method, dataType, data, params, successFn, errorFn) {
        this.http.request(APP_CONFIG.api + url, {
            method: method,
            body: data,
            headers: this.headers
        })
        .map(this.extractData)
        .catch(this.handleError)
        .subscribe(
            res => successFn(res),
            err => {
                this.toasterService.error('Error', err);
                if (errorFn) {
                    errorFn(err);
                }
            }
        );
    }
}