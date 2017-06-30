import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'event-detail-component',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class EventDetailComponent {
    public eventDetails: any;
    constructor(private router: Router) {
        this.eventDetails = {
            Title__c: 'Event 1',
            id: 'event1',
            Description__c: 'Event Description',
            Start__c: new Date(),
            End__c: new Date(),
            Registration_Limit__c: 50,
            Remaining_Seats__c: 10,
            Status__c: 'Open'
        }
    }

    goToAddSession() {
        this.router.navigate(['/add-session'])
    }
}