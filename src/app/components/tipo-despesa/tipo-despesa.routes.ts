import { RouterModule, Routes } from '@angular/router';
import { TipoDespesaListaComponent } from './tipo-despesa-lista/tipo-despesa-lista.component';
import { TipoDespesaFormComponent } from './tipo-despesa-form/tipo-despesa-form.component';

const appRoutes: Routes  = [
    { path: 'tipo-despesas', component: TipoDespesaListaComponent },
    { path: 'tipo-despesas/novo', component: TipoDespesaFormComponent },
    { path: 'tipo-despesas/editar/:id', component: TipoDespesaFormComponent }
];

export const routingTipoDespesas = RouterModule.forRoot(appRoutes);
