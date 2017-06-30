import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'name-initials',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class NameInitialsComponent implements OnChanges {
    @Input() name: string;

    private initials;

    constructor(){

    }

    ngOnChanges($changeObj) {
        if ($changeObj.name && $changeObj.name.currentValue) {
            this.getInitials();
        }
    }

    getInitials() {
        let nameArr = this.name.trim().split(' ');

        if (nameArr.length) {
            if (nameArr.length > 1) {
                this.initials = nameArr[0][0] + nameArr[nameArr.length - 1][0];
            } else {
                this.initials = nameArr[0][0];
            }
        }
    }
}