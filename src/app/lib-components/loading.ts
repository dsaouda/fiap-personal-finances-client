import {Component, Input} from '@angular/core';

@Component({
    selector: 'loading',
    template: `
        
        <div *ngIf="show === 'true'" class="status-pagamentos btn-warning loading">{{message}}</div>

    ` ,
    styles: [
        '.loading { top: 50px; position: absolute; z-index: 9999; padding: 10px; left: 50%; margin-left: -100px; }'
    ]
})
export class Loading {
    @Input() show: string;
    @Input() message: string = 'Carregado...';
}