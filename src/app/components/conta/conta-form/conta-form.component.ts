import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import {ContaModel} from '../conta.model';
import {ContaService} from '../conta.service';

@Component({
    selector: 'conta-form',
    templateUrl: './conta-form.html'
})
export class ContaFormComponent implements OnInit {
    
    conta: ContaModel;
    
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: ContaService
    ) {
        this.conta = new ContaModel();
    }

    ngOnInit() {
        this.route.params.subscribe((params) => {

            if (params['id']) {

                this.service.buscar(params['id']).subscribe((conta: ContaModel ) => {
                    this.conta = conta;
                });

            }
        });
    }

    onSubmit(event: MouseEvent) {
        event.preventDefault();

        this.service.save(this.conta).subscribe((r) => {
            console.log(r);

            this.router.navigate(['/contas']);

        }, (error) => {
            console.log('ERRO');
        });
    }

    onCancelar(event: MouseEvent) {
        event.preventDefault();
        this.router.navigate(['/contas']);
        
    }

}
