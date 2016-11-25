import { RouterModule, Routes } from '@angular/router';
import { AppNotFoundComponent } from './app-notfound.component';
import { BemVindoComponent } from './bemvindo.component';

const appRoutes: Routes  = [
    { path: '', component: BemVindoComponent },
    { path: '**', component: AppNotFoundComponent}    
];

export const routing = RouterModule.forRoot(appRoutes);
