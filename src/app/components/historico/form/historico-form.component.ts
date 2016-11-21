import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import {HistoricoModel} from '../model';
import {TipoDespesaModel} from '../../tipo-despesa/tipo-despesa.model';
import {ContaModel} from '../../conta/conta.model';
import {HistoricoService} from '../service';
import {TipoDespesaService} from '../../tipo-despesa/tipo-despesa.service';
import {ContaService} from '../../conta/conta.service';
import {SessionStorageService} from 'ng2-webstorage';

@Component({
    selector: 'historico-form',
    templateUrl: './historico-form.html'
})
export class HistoricoFormComponent implements OnInit {
    
    historico: HistoricoModel;
    contas: Array<ContaModel>;
    categorias: Array<TipoDespesaModel>;
    
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: HistoricoService,
        private tipoDespesaService: TipoDespesaService,
        private contaService: ContaService,
        private session: SessionStorageService
    ) {
        this.historico = new HistoricoModel();

        let filtro = session.retrieve('filtro');
        
        if (filtro.contaId) {
            this.historico.conta_id = filtro.contaId;
        }
    }

    ngOnInit() {
        this.route.params.subscribe((params) => {

            if (params['id']) {

                this.tipoDespesaService.listar().subscribe(
                    tipoDespesas => {
                        this.categorias = tipoDespesas

                        this.contaService.listar().subscribe(contas => {
                            this.contas = contas

                            this.service.buscar(params['id']).subscribe((historico: HistoricoModel ) => {
                                this.historico = historico;
                            });
                        });
                    });
            } else {
                this.tipoDespesaService.listar().subscribe(tipoDespesas => this.categorias = tipoDespesas);
                this.contaService.listar().subscribe(contas => this.contas = contas);
            }
        });
    }

    onSubmit(event: MouseEvent) {
        event.preventDefault();

        this.service.save(this.historico).subscribe((r) => {
            console.log(r);

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
