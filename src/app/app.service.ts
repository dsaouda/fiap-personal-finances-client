import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Env} from '../../.env';
import {Observable} from 'rxjs';

@Injectable()
export class AppService {
    private options: RequestOptions;

    private url: string = Env.URL_API;
    
    constructor(private http: Http) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.options = new RequestOptions();
        this.options.headers = headers;
    }

    post(uri: string, body: any, options?: RequestOptions) {
        options = options || this.options;
        return this.http.post(this.url + uri, body, options);
    }

    get(uri: string, params?: Object, options?: RequestOptions): Observable<Response> {
        return this.http.get(this.url + uri, options);
    }

    put(uri: string, body: any, options?: RequestOptions) {
        options = options || this.options;
        return this.http.put(this.url + uri, body, options);
    }

    patch(uri: string, body: any, options?: RequestOptions) {
        options = options || this.options;
        return this.http.patch(this.url + uri, body, options);
    }

    delete(uri: string, options?: RequestOptions) {
        options = options || this.options;
        return this.http.delete(this.url + uri, options);
    }
}