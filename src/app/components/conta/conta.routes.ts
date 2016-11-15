import { RouterModule, Routes } from '@angular/router';
import { ContaListaComponent } from './conta-lista/conta-lista.component';
import { ContaFormComponent } from './conta-form/conta-form.component';

const appRoutes: Routes  = [
    { path: 'contas', component: ContaListaComponent },
    { path: 'contas/novo', component: ContaFormComponent },
    { path: 'contas/editar/:id', component: ContaFormComponent }
];

export const routingContas = RouterModule.forRoot(appRoutes);
