import { Component, OnInit } from '@angular/core';
import {HistoricoService} from '../service';
import {HistoricoModel} from '../model';
import {ContaService} from '../../conta/conta.service';
import {ContaModel} from '../../conta/conta.model';
import {SessionStorageService} from 'ng2-webstorage';

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
    previsaoSaldo: Number = 0;
    

    constructor(private service: HistoricoService, private contaService: ContaService, private session: SessionStorageService) {
        this.historicosAbertos = new Array<HistoricoModel>();
        this.historicosFinalizados = new Array<HistoricoModel>();
        this.conta = new ContaModel();

        //criar valor padrão
        if (Object.keys(this.session.retrieve('filtro')).length === 0) {
            this.filtro = {
                dtFrom: '2016-11-01',
                dtTo: '2016-11-30',
                contaId: 0,
            }

            this.session.store('filtro', this.filtro);
        } else {
            this.filtro = this.session.retrieve('filtro');
        }

        
    }

    ngOnInit() {
        this.onListarAbertas();
        this.onListarFinalizados();
        
        this.buscarConta();

        this.contaService.listar().subscribe((contas) => {
            this.contas = contas;
        });
    }

    onFiltroConta(event) {
        this.filtro.contaId = Number(event.target.value);

        this.session.store('filtro', this.filtro);

        this.onListarAbertas();
        this.onListarFinalizados();
    }

    private buscarConta() {
        if (this.filtro.contaId) {
            this.contaService
                .buscar(this.filtro.contaId)
                .subscribe((conta: ContaModel) => {
                    this.conta = conta;

                    this.previsaoSaldo = Math.round(conta.saldo + this.historicosAbertos.map(h => h.valor).reduce( (v1, v2) => v1+v2));
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
