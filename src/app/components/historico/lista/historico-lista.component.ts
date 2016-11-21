import { Component, OnInit } from '@angular/core';
import {HistoricoService} from '../service';
import {HistoricoModel} from '../model';
import {ContaService} from '../../conta/conta.service';
import {ContaModel} from '../../conta/conta.model';
import {SessionStorageService} from 'ng2-webstorage';
import * as moment from 'moment';

@Component({
    selector: 'historico-lista',
    templateUrl: './historico-lista.html',
    styleUrls: ['../style.css'],
})
export class HistoricoListaComponent implements OnInit {
    
    historicosAbertos: Array<HistoricoModel>;
    historicosFinalizados: Array<HistoricoModel>;
    
    filtro: any = {};
    contas: Array<ContaModel>;
    conta: ContaModel;
    previsaoSaldo: Number = null;
    

    constructor(
        private service: HistoricoService, 
        private contaService: ContaService, 
        private session: SessionStorageService
    ) {
        this.historicosAbertos = new Array<HistoricoModel>();
        this.historicosFinalizados = new Array<HistoricoModel>();
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
        });
    }

    onFiltroConta(event) {
        this.filtro.contaId = Number(event.target.value);

        this.session.store('filtro', this.filtro);

        this.onListarAbertas();
        this.onListarFinalizados();
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
    }

    onListarAbertas() {
        
        this.service.listarAbertas(this.filtro.contaId).subscribe((historicos: Array<HistoricoModel>) => {
            this.historicosAbertos = historicos;

            this.buscarConta();
        });

    }

    onListarFinalizados() {
        this.service.listarFinalizados(this.filtro)
            .subscribe((historicos: Array<HistoricoModel>) => {
                this.historicosFinalizados = historicos;
            });

    }

    onExcluir(historico: HistoricoModel) {
        this.service.remover(historico.id).subscribe( () => {

            this.onListarAbertas();

        }, (error) => alert('ERRO'));
    }

    onFinalizar(historico: HistoricoModel) {
        this.service.finalizar(historico).subscribe(() => {
            this.onListarAbertas();
            this.onListarFinalizados();
        });
    }

    onAbrir(historico: HistoricoModel) {
        this.service.abrir(historico).subscribe(() => {
            this.onListarAbertas();
            this.onListarFinalizados();
        });
    }
    
}
