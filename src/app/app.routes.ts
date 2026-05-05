import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { UsersList } from './features/users-list/users-list';

export const routes: Routes = [
    {path: '', component: Dashboard},
    {path: 'users', component: UsersList},
    {path: '**', redirectTo: '' }
];
