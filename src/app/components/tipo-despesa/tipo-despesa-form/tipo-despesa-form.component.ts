import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import {TipoDespesaModel} from '../tipo-despesa.model';
import {TipoDespesaService} from '../tipo-despesa.service';

@Component({
    selector: 'tipo-despesa-form',
    templateUrl: './tipo-despesa-form.html'
})
export class TipoDespesaFormComponent implements OnInit {
    
    tipoDespesa: TipoDespesaModel;
    
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: TipoDespesaService
    ) {
        this.tipoDespesa = new TipoDespesaModel();
    }

    ngOnInit() {
        this.route.params.subscribe((params) => {

            if (params['id']) {

                this.service.buscar(params['id']).subscribe((tipoDespesa: TipoDespesaModel ) => {
                    this.tipoDespesa = tipoDespesa;
                });

            }
        });
    }

    onSubmit(event: MouseEvent) {
        event.preventDefault();

        this.service.save(this.tipoDespesa).subscribe((r) => {
            console.log(r);

            this.router.navigate(['/tipo-despesas']);

        }, (error) => {
            console.log('ERRO');
        });
    }

    onCancelar(event: MouseEvent) {
        event.preventDefault();
        this.router.navigate(['/tipo-despesas']);
        
    }

}
