import { Component, OnInit } from '@angular/core';
import {HistoricoService} from '../service';
import {HistoricoModel} from '../model';
import {ContaService} from '../../conta/conta.service';
import {ContaModel} from '../../conta/conta.model';
import {SessionStorageService} from 'ng2-webstorage';
import * as moment from 'moment';
import {AppComponent} from '../../../app.component';

@Component({
    selector: 'historico-lista',
    templateUrl: './historico-lista.html',
    styleUrls: ['../style.css'],
})
export class HistoricoListaComponent implements OnInit {
    
    loading: string = '0';
    historicosAbertos: Array<HistoricoModel>;
    historicosFinalizados: Array<HistoricoModel>;
    
    filtro: any = {};
    contas: Array<ContaModel>;
    conta: ContaModel;
    previsaoSaldo: Number = null;
    statusPagamentos: any;

    constructor(
        private service: HistoricoService, 
        private contaService: ContaService, 
        private session: SessionStorageService
    ) {
        this.historicosAbertos = new Array<HistoricoModel>();
        this.historicosFinalizados = new Array<HistoricoModel>();
        this.statusPagamentos = new Array<any>();
        this.conta = new ContaModel();

        let primeiroDiaDoMes = moment().startOf('month').format('YYYY-MM-DD');
        let ultimoDiaDoMes = moment().endOf('month').format('YYYY-MM-DD');

        //criar valor padrão
        if (this.session.retrieve('filtro') === null || Object.keys(this.session.retrieve('filtro')).length === 0) {
            this.filtro = {
                dtFrom: primeiroDiaDoMes,
                dtTo: ultimoDiaDoMes,
                contaId: 0,
            }

            this.session.store('filtro', this.filtro);
        } else {
            this.filtro = this.session.retrieve('filtro');
        }

        
    }

    ngOnInit() {
        this.contaService.listar().subscribe((contas) => {
            this.contas = contas;

            this.onListarAbertas();
            this.onListarFinalizados();
            this.onStatusPagamentos();
        });
    }

    onStatusPagamentos() {
        this.service.statusPagamentos(this.filtro).subscribe(s => this.statusPagamentos = s);
    }

    onFiltroConta(event) {
        AppComponent.mensagem = 'OK';
        this.filtro.contaId = Number(event.target.value);

        this.session.store('filtro', this.filtro);

        this.onListarAbertas();
        this.onListarFinalizados();
        this.onStatusPagamentos();
    }

    private buscarConta() {
        if (this.filtro.contaId > 0) {
            this.contaService
                .buscar(this.filtro.contaId)
                .subscribe((conta: ContaModel) => {
                    this.conta = conta;

                    if (this.historicosAbertos.length > 0) {
                        this.previsaoSaldo = Math.round(conta.saldo + this.historicosAbertos.map(h => h.valor).reduce( (v1, v2) => v1+v2));
                    } else {
                        this.previsaoSaldo = null;
                    }
                });
        }
    }

    onFiltrar() {
        this.session.store('filtro', this.filtro);
        this.onListarFinalizados();
        this.onStatusPagamentos();
    }

    onListarAbertas() {
        this.loading = 'true';

        this.service.listarAbertas(this.filtro.contaId).subscribe((historicos: Array<HistoricoModel>) => {
            this.historicosAbertos = historicos;

            this.buscarConta();

            this.loading = 'false';
        });

    }

    onListarFinalizados() {
        this.loading = 'true';
        this.service.listarFinalizados(this.filtro)
            .subscribe((historicos: Array<HistoricoModel>) => {
                this.historicosFinalizados = historicos;

                this.loading = 'false';
            });

    }

    onExcluir(historico: HistoricoModel) {
        this.loading = 'true';

        this.service.remover(historico.id).subscribe( () => {
            this.onListarAbertas();
        }, (error) => alert('ERRO'));                
    }

    onFinalizar(historico: HistoricoModel) {
        this.loading = 'true';

        this.service.finalizar(historico).subscribe(() => {
            this.onListarAbertas();
            this.onListarFinalizados();
            this.onStatusPagamentos();
        });
    }

    onAbrir(historico: HistoricoModel) {
        this.loading = 'true';

        this.service.abrir(historico).subscribe(() => {
            this.onListarAbertas();
            this.onListarFinalizados();
            this.onStatusPagamentos();
        });
    }
    
}
