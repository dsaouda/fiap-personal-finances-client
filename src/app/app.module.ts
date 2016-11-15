import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//modulos do sistema
import { routing } from './app.routes';
import { ContaModule } from './components/conta/conta.module';
import { routingContas } from './components/conta/conta.routes';

import { AppComponent } from './app.component';
import { AppNotFoundComponent } from './app-notfound.component';

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
    routingContas,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
