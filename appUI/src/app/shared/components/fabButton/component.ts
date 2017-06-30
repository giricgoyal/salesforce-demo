import { Component, Input, OnChanges, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'fab-button',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class FabButtonComponent implements OnChanges {
    @Input() type: string;
    @Output() clickfn: EventEmitter<any> = new EventEmitter();

    private initials;
    public icon: string;

    constructor(){

    }

    ngOnInit() {
        
    }

    ngOnChanges($changeObj) {
        if ($changeObj.type && $changeObj.type.currentValue) {
            if ($changeObj.type.currentValue.toLowerCase() == "add") {
                this.icon = "add";
            }
            if ($changeObj.type.currentValue.toLowerCase() == "edit") {
                this.icon = "edit";
            }
        }
    }

    onClickFn() {
        this.clickfn.emit();
    }
}