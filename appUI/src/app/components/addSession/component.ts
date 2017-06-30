import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'add-session-component',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class AddSessionComponent {
    constructor(private router: Router) {
        // this.router = router;
    }   
}