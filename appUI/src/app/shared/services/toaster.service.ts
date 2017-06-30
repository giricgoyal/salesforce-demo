
import { Injectable } from '@angular/core';
import { ToasterService, ToasterConfig } from 'angular2-toaster';

@Injectable()
export class ToasterInjectableService {
    private toasterService: ToasterService

    constructor (toasterService: ToasterService) {
        this.toasterService = toasterService;
    }

    getConfig() {
        return new ToasterConfig({
            showCloseButton: false, 
            tapToDismiss: true, 
            timeout: 5000
        });
    }

    success(title, body) {
        this.toasterService.pop('success', title, body);
    }

    warning(title, body) {
        this.toasterService.pop('warning', title, body);
    }

    error(title, body) {
        this.toasterService.pop('error', title, body);
    }

    info(title, body) {
        this.toasterService.pop('info', title, body);
    }
}