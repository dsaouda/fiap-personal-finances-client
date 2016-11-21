import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import {HistoricoModel} from '../model';
import {TipoDespesaModel} from '../../tipo-despesa/tipo-despesa.model';
import {ContaModel} from '../../conta/conta.model';
import {HistoricoService} from '../service';
import {TipoDespesaService} from '../../tipo-despesa/tipo-despesa.service';
import {ContaService} from '../../conta/conta.service';
import {SessionStorageService} from 'ng2-webstorage';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'historico-form',
    templateUrl: './historico-form.html'
})
export class HistoricoFormComponent implements OnInit {
    
    contas: Array<any>;
    categorias: Array<any>;
    historicoForm : FormGroup;
    
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: HistoricoService,
        private tipoDespesaService: TipoDespesaService,
        private contaService: ContaService,
        private session: SessionStorageService,
        fb: FormBuilder
    ) {
        this.categorias = [];
        this.contas = [];
        
        this.historicoForm = fb.group({
            'id': [null],
            'conta_id' : [null, Validators.required],
            'categoria_id': [null, Validators.required],
            'docto': [null],
            'descricao': [null, Validators.required],
            'observacao': [null],
            'valor': [null, Validators.required],
            'data_movimento': [null, Validators.required],
        });
    }

    ngOnInit() {
        this.route.params.subscribe((params) => {

            if (params['id']) {

                this.tipoDespesaService.listar().subscribe(
                    tipoDespesas => {
                        this.categorias = tipoDespesas.map(e => ({value: e.id, label: e.nome}));
                        
                        this.contaService.listar().subscribe(contas => {
                            this.contas = contas.map(e => ({value: e.id, label: e.nome}));

                            this.service.buscar(params['id']).subscribe((historico: HistoricoModel ) => {
                                this.historicoForm.patchValue(historico);
                            });
                        });
                    });
            } else {
                
                this.contaService.listar().subscribe(contas => {
                    this.contas = contas.map(e => ({value: e.id, label: e.nome}));
                });

                this.tipoDespesaService.listar().subscribe(tipoDespesas => { 
                    this.categorias = tipoDespesas.map(e => ({value: e.id, label: e.nome}));
                    
                    let filtro = this.session.retrieve('filtro');
                    if (filtro.contaId) {
                        this.historicoForm.patchValue({conta_id: filtro.contaId});
                    }
                });
            }
        });
    }

    onSubmit(event: MouseEvent) {
        event.preventDefault();

        this.service.save(this.historicoForm.value).subscribe((r) => {
            this.router.navigate(['/historicos']);
        }, (error) => {
            console.log('ERRO');
        });
    }

    onCancelar(event: MouseEvent) {
        event.preventDefault();
        this.router.navigate(['/historicos']);
    }

}
