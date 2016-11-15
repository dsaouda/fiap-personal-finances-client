import { RouterModule, Routes } from '@angular/router';
import { AppNotFoundComponent } from './app-notfound.component';

const appRoutes: Routes  = [
    { path: '**', component: AppNotFoundComponent },
];

export const routing = RouterModule.forRoot(appRoutes);
