import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import {HistoricoModel} from '../model';
import {TipoDespesaModel} from '../../tipo-despesa/tipo-despesa.model';
import {ContaModel} from '../../conta/conta.model';
import {HistoricoService} from '../service';
import {TipoDespesaService} from '../../tipo-despesa/tipo-despesa.service';
import {ContaService} from '../../conta/conta.service';
import {SessionStorageService} from 'ng2-webstorage';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

@Component({
    selector: 'importar-form',
    templateUrl: './importar-form.html'
})
export class ImportarFormComponent implements OnInit {
    
    contas: Array<any>;    
    form : FormGroup;
    files: FileList;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: HistoricoService,        
        private contaService: ContaService,
        fb: FormBuilder
    ) {
        this.contas = [];        
        this.form = fb.group({            
            'conta_id' : [null, Validators.required],
            'arquivo': [null, Validators.required],            
        });
    }

    onChange(event) {
        this.files = event.srcElement.files;        
    }

    ngOnInit() {
        this.contaService.listar().subscribe(contas => {
            this.contas = contas.map(e => ({value: e.id, label: e.nome}));
        });
    }

    onSubmit(event: MouseEvent) {
        event.preventDefault();
        
        this.service.importar({conta_id: this.form.value.conta_id, arquivo: this.files.item(0)}).subscribe((r) => {
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
