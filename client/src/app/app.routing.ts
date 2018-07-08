import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { UserLstComponent } from './user/user.lst.component';
import { UserAddComponent } from './user/user.add.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page.not.found.component';
import { MessageLstComponent } from './message/message.lst.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'messages',
        component: MessageLstComponent
    },
    {
        path: 'users',
        component: UserLstComponent
    },
    {
        path: 'users/add',
        component: UserAddComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    { 
        path: '**', 
        component: PageNotFoundComponent 
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { enableTracing: false });
