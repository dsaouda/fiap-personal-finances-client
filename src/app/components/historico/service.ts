import {Http, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {HistoricoModel} from './model';
import {Observable} from 'rxjs';
import {AppService} from '../../app.service';
import {Env} from '../../../../.env';

@Injectable()
export class HistoricoService {
    private uriBase = '/historicos';
    
    constructor(private service: AppService, private http: Http) {}

    importar(values) {

        let headers = new Headers();
        let formData:FormData = new FormData();
        formData.append('arquivo', values.arquivo, values.arquivo.name);
        formData.append('conta_id', values.conta_id);
        
        return this.http.post(`${Env.URL_API}${this.uriBase}/importar`, formData, {
            headers: headers
        });
    }

    buscar(id: number): Observable<HistoricoModel> {
        return this.service.get(`${this.uriBase}/${id}`).map( res => res.json());
    }

    private mudarStatus(historico: HistoricoModel, status: string) {
        return this.service.patch(`${this.uriBase}/${historico.id}`, {status: status});
    }

    finalizar(historico: HistoricoModel) {
        return this.mudarStatus(historico, 'P');
    }

    abrir(historico: HistoricoModel) {
        return this.mudarStatus(historico, 'A');
    }

    statusPagamentos(filtro: any) {
        return this.service
            .get(`/status-pagamentos?dtFrom=${filtro.dtFrom}&dtTo=${filtro.dtTo}`)
            .map(res => res.json());
    }

    listarAbertas(contaId: number): Observable<Array<HistoricoModel>> {
        return this.service
            .get(`${this.uriBase}?status=A&contaId=${contaId}`)
            .map(res => res.json());
    }

    listarFinalizados(filtro: any): Observable<Array<HistoricoModel>> {
        //&contaId=7
        return this.service
            .get(`${this.uriBase}?status=P&dtFrom=${filtro.dtFrom}&dtTo=${filtro.dtTo}&contaId=${filtro.contaId}`)
            .map(res => res.json());
    }

    save(historico: HistoricoModel): Observable<Response> {
        if (historico.id > 0) {
            return this.service.put(`${this.uriBase}/${historico.id}`, historico);
        }

        return this.service.post(this.uriBase, historico);
    }

    remover(id: number):Observable<Response> {
        return this.service.delete(`${this.uriBase}/${id}`);
    }
}