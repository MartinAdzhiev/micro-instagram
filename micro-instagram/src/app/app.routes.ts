import { Routes } from '@angular/router';
import { ListItemComponent } from './list-item/list-item.component';
import { DetailsComponent } from './details/details.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { UploadItemComponent } from './upload-item/upload-item.component';
import { routeGuard } from '../guards/route.guard';

export const routes: Routes = [
    {path: '', redirectTo: '/photos', pathMatch: 'full'}, 
    {path: 'photos', component: ListItemComponent},
    {path: 'details/:id', component: DetailsComponent, canActivate:[routeGuard]},
    {path: 'edit/:id', component: EditItemComponent, canActivate: [routeGuard]},
    {path: 'upload', component: UploadItemComponent},
    {path: '**' , component : ListItemComponent},
];
