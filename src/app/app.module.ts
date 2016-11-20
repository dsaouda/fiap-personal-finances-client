import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';

//modulos do sistema
import { routing } from './app.routes';

import { ContaModule } from './components/conta/conta.module';
import { routingContas } from './components/conta/conta.routes';

import { TipoDespesaModule } from './components/tipo-despesa/tipo-despesa.module';
import { routingTipoDespesas } from './components/tipo-despesa/tipo-despesa.routes';

import { HistoricoModule } from './components/historico/module';
import { routingHistoricos } from './components/historico/routes';

import { AppComponent } from './app.component';
import { AppNotFoundComponent } from './app-notfound.component';

import {AppService} from './app.service';

import 'rxjs/add/operator/map';

@NgModule({
  declarations: [
    AppComponent,
    AppNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ContaModule,
    TipoDespesaModule,
    HistoricoModule,
    routingContas,
    routingTipoDespesas,
    routingHistoricos,
    routing
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
