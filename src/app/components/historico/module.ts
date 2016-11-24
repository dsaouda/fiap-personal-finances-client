import { NgModule } from '@angular/core';
import { HistoricoListaComponent } from './lista/historico-lista.component';
import { HistoricoFormComponent } from './form/historico-form.component';
import { ImportarFormComponent } from './form/importar-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoricoService } from './service';
import { BrowserModule } from '@angular/platform-browser';
import { routingHistoricos } from './routes';
import {Ng2Webstorage} from 'ng2-webstorage';
import {MomentModule} from 'angular2-moment';
import {SelectModule} from 'angular2-select';

@NgModule({
    imports: [FormsModule, BrowserModule, routingHistoricos, Ng2Webstorage, MomentModule, SelectModule, ReactiveFormsModule],
    declarations: [ HistoricoListaComponent, HistoricoFormComponent, ImportarFormComponent ],
    providers: [HistoricoService]
})
export class HistoricoModule {}
