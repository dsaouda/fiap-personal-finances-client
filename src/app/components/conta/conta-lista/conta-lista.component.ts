import { Component, OnInit } from '@angular/core';
import {ContaService} from '../conta.service';
import {ContaModel} from '../conta.model';

@Component({
    selector: 'conta-lista',
    templateUrl: './conta-lista.html'
})
export class ContaListaComponent implements OnInit {
    
    contas: Array<ContaModel>;

    constructor(private service: ContaService) {
        this.contas = new Array<ContaModel>();
    }

    ngOnInit() {
        this.onListar();
    }

    onListar() {
        this.service.listar().subscribe((contas: Array<ContaModel>) => {
            this.contas = contas;
        });
    }

    onExcluir(conta: ContaModel) {
        this.service.remover(conta.id).subscribe( () => {

            this.onListar();

        }, (error) => alert('ERRO'));
    }

    onEditar(conta: ContaModel) {
        console.log(conta);
    }
    
}
