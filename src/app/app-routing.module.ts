import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService as AuthGuard } from './auth-guard.service';

import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatorListComponent } from './creator-list/creator-list.component';
import { CreatorDetailComponent } from './creator-detail/creator-detail.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    // { path: '', canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    {
        path: 'characters',
        component: CharacterListComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'characters/:characterId',
        component: CharacterDetailComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'creators',
        component: CreatorListComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'creators/:creatorId',
        component: CreatorDetailComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
