import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'add-event-component',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class AddEventComponent {
    constructor(private router: Router) {
        // this.router = router;
    }   
}