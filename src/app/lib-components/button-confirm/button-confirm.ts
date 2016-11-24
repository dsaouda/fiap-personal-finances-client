import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'button-confirm',
    template: `
        <a href="#" (click)="clickHandler($event)">
            <i *ngIf="icone != null" class="{{icone}}"></i>
        </a>
    ` 
})
export class ButtonConfirm {

    @Input() icone: string = null;
    @Input() message: string;
    @Output() click = new EventEmitter();

    private clickHandler(e: Event) {
        e.preventDefault();
        e.stopImmediatePropagation();

        if (confirm(this.message)) {
            this.click.emit(null);
            return ;
        }
    }

}