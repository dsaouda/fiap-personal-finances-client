import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Component({
    selector: 'conta-lista',
    templateUrl: './conta-lista.html'
})
export class ContaListaComponent {
    private http: Http;

    contructor(http: Http) {
        this.http = http;
    }

    
}
