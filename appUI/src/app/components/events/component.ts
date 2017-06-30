import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'events-list-component',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class EventsListComponent {
    public eventsList: any;

    constructor(private router: Router) {
        this.eventsList = [{
            Title__c: 'Event 1',
            id__c: 'event1',
            Description__c: 'Event Description',
            Start__c: new Date(),
            End__c: new Date(),
            Registration_Limit__c: 50,
            Remaining_Seats__c: 10,
            Status__c: 'Open'
        },
        {
            Title__c: 'Event 2',
            id__c: 'event2',
            Description__c: 'Event Description',
            Start__c: new Date(),
            End__c: new Date(),
            Registration_Limit__c: 50,
            Remaining_Seats__c: 10,
            Status__c: 'Closed'
        },{
            Title__c: 'Event 3',
            id__c: 'event3',
            Description__c: 'Event Description',
            Start__c: new Date(),
            End__c: new Date(),
            Registration_Limit__c: 50,
            Remaining_Seats__c: 50,
            Status__c: 'Sold Out'
        }];
    }

    goToAddEvent() {
        this.router.navigate(['/add-event']);
    }
}