import { Component, ElementRef, Input } from '@angular/core';

@Component({
    selector: 'loader',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class AppLoaderComponent {
    el: ElementRef;
    private height;
    private width;

    @Input() showLoader: boolean;

    constructor(el: ElementRef){
        this.el = el; 
    }

    ngAfterViewInit() {
        this.height = this.el.nativeElement.parentElement.clientHeight;
        this.width = this.el.nativeElement.parentElement.clientWidth;
    }
}