import { NgModule } from '@angular/core';
import { TipoDespesaListaComponent } from './tipo-despesa-lista/tipo-despesa-lista.component';
import { TipoDespesaFormComponent } from './tipo-despesa-form/tipo-despesa-form.component';
import { FormsModule } from '@angular/forms';
import { TipoDespesaService } from './tipo-despesa.service';
import { BrowserModule } from '@angular/platform-browser';
import { routingTipoDespesas } from './tipo-despesa.routes';
import { SimOuNaoPipe } from './simOuNao.pipe';

@NgModule({
    imports: [FormsModule, BrowserModule, routingTipoDespesas],
    declarations: [ TipoDespesaListaComponent, TipoDespesaFormComponent, SimOuNaoPipe ],
    providers: [TipoDespesaService]
})
export class TipoDespesaModule {}
