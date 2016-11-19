import {Http, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {ContaModel} from './conta.model';
import {Observable} from 'rxjs';
import {AppService} from '../../app.service';

@Injectable()
export class ContaService {
    private uriBase = '/contas';
    
    constructor(private service: AppService, http: Http) {
        
    }

    buscar(id: number): Observable<ContaModel> {
        return this.service.get(`${this.uriBase}/${id}`).map( res => res.json());
    }

    listar(): Observable<Array<ContaModel>> {
        return this.service.get(this.uriBase).map(res => res.json());
    }

    save(conta: ContaModel): Observable<Response> {
        if (conta.id > 0) {
            return this.service.put(`${this.uriBase}/${conta.id}`, conta);
        }

        return this.service.post(this.uriBase, conta);
    }

    remover(id: number):Observable<Response> {
        return this.service.delete(`${this.uriBase}/${id}`);
    }
}