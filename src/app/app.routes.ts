import {Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: 'add-page',
        loadComponent: () => import('src/app/entities/pages/add-page/add-page.component').then(c => c.AddPageComponent)
    },
    {
        path: 'grid-page',
        loadComponent: () => import('src/app/entities/pages/grid-page/grid-page.component').then(c => c.GridPageComponent)},
    {
        path: '',
        redirectTo: 'add-page',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'add-page',
        pathMatch: 'full'
    },
];
