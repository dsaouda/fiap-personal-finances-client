import { Component, OnInit } from '@angular/core';
import {TipoDespesaService} from '../tipo-despesa.service';
import {TipoDespesaModel} from '../tipo-despesa.model';

@Component({
    selector: 'tipo-despesa-lista',
    templateUrl: './tipo-despesa-lista.html'
})
export class TipoDespesaListaComponent implements OnInit {
    
    tipoDespesas: Array<TipoDespesaModel>;

    constructor(private service: TipoDespesaService) {
        this.tipoDespesas = new Array<TipoDespesaModel>();
    }

    ngOnInit() {
        this.onListar();
    }

    onListar() {
        this.service.listar().subscribe((tipoDespesas: Array<TipoDespesaModel>) => {
            this.tipoDespesas = tipoDespesas;
        });
    }

    onExcluir(tipoDespesa: TipoDespesaModel) {
        this.service.remover(tipoDespesa.id).subscribe( () => {

            this.onListar();

        }, (error) => alert('ERRO'));
    }

    onEditar(tipoDespesa: TipoDespesaModel) {
        console.log(tipoDespesa);
    }
    
}
