import { NgModule } from '@angular/core';
import { ContaListaComponent } from './conta-lista/conta-lista.component';
import { ContaFormComponent } from './conta-form/conta-form.component';
import { FormsModule } from '@angular/forms';
import { ContaService } from './conta.service';
import { BrowserModule } from '@angular/platform-browser';
import { routingContas } from './conta.routes';

@NgModule({
    imports: [FormsModule, BrowserModule, routingContas],
    declarations: [ ContaListaComponent, ContaFormComponent ],
    providers: [ContaService]
})
export class ContaModule {}
