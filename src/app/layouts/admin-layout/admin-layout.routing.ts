import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { MapsComponent } from '../../maps/maps.component';
import { NewsPageComponent } from 'app/news-page/news-page.component';
import { MusicPageComponent } from 'app/music-page/music-page.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'news', component: NewsPageComponent},
    { path: 'music', component: MusicPageComponent}
];
