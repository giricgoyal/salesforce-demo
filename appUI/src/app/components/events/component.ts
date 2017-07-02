import { Component, Inject, OnInit } from '@angular/core';
import { HttpService, AuthenticationService } from '../../shared';
import { Router } from '@angular/router';

@Component({
    selector: 'events-list-component',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class EventsListComponent implements OnInit {
    public eventsList: any;

    constructor(private router: Router, private httpService: HttpService) {
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

    ngOnInit() {
        this.getEvents();
    }

    goToAddEvent() {
        this.router.navigate(['/add-event']);
    }

    getEvents() {
        this.httpService.request('salesforce/events', 'GET', 'json', null, null, (resp) => {
            console.log(resp);
        }, (err) => {
            console.log(err);
        });
    }
}