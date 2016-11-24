import { RouterModule, Routes } from '@angular/router';
import { HistoricoListaComponent } from './lista/historico-lista.component';
import { HistoricoFormComponent } from './form/historico-form.component';
import { ImportarFormComponent } from './form/importar-form.component';

const appRoutes: Routes  = [
    { path: 'historicos', component: HistoricoListaComponent },
    { path: 'historicos/novo', component: HistoricoFormComponent },
    { path: 'historicos/importar', component: ImportarFormComponent },
    { path: 'historicos/editar/:id', component: HistoricoFormComponent }
];

export const routingHistoricos = RouterModule.forRoot(appRoutes);
