import { NgModule } from '@angular/core';
import { HistoricoListaComponent } from './lista/historico-lista.component';
import { HistoricoFormComponent } from './form/historico-form.component';
import { FormsModule } from '@angular/forms';
import { HistoricoService } from './service';
import { BrowserModule } from '@angular/platform-browser';
import { routingHistoricos } from './routes';
import {Ng2Webstorage} from 'ng2-webstorage';
import {MomentModule} from 'angular2-moment';

@NgModule({
    imports: [FormsModule, BrowserModule, routingHistoricos, Ng2Webstorage, MomentModule],
    declarations: [ HistoricoListaComponent, HistoricoFormComponent ],
    providers: [HistoricoService]
})
export class HistoricoModule {}
