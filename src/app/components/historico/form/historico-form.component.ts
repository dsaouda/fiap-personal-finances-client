import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import {HistoricoModel} from '../model';
import {HistoricoService} from '../service';

@Component({
    selector: 'historico-form',
    templateUrl: './historico-form.html'
})
export class HistoricoFormComponent implements OnInit {
    
    historico: HistoricoModel;
    
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: HistoricoService
    ) {
        this.historico = new HistoricoModel();
    }

    ngOnInit() {
        this.route.params.subscribe((params) => {

            if (params['id']) {

                this.service.buscar(params['id']).subscribe((historico: HistoricoModel ) => {
                    this.historico = historico;
                });

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
