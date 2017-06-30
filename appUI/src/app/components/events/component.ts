import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'events-list-component',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class EventsListComponent {
    constructor(private router: Router) {
        // this.router = router;
    }

    goToAddEvent() {
        this.router.navigate(['/app/add-event']);
    }
}