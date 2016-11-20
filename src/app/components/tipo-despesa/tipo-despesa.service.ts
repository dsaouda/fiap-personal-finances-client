import {Http, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {TipoDespesaModel} from './tipo-despesa.model';
import {Observable} from 'rxjs';
import {AppService} from '../../app.service';

@Injectable()
export class TipoDespesaService {
    private uriBase = '/categorias';
    
    constructor(private service: AppService, http: Http) {
        
    }

    buscar(id: number): Observable<TipoDespesaModel> {
        return this.service.get(`${this.uriBase}/${id}`).map( res => res.json());
    }

    listar(): Observable<Array<TipoDespesaModel>> {
        return this.service.get(this.uriBase).map(res => res.json());
    }

    save(tipoDespesa: TipoDespesaModel): Observable<Response> {
        if (tipoDespesa.id > 0) {
            return this.service.put(`${this.uriBase}/${tipoDespesa.id}`, tipoDespesa);
        }

        return this.service.post(this.uriBase, tipoDespesa);
    }

    remover(id: number):Observable<Response> {
        return this.service.delete(`${this.uriBase}/${id}`);
    }
}