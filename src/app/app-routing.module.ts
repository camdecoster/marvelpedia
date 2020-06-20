import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatorListComponent } from './creator-list/creator-list.component';
import { CreatorDetailComponent } from './creator-detail/creator-detail.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'characters', component: CharacterListComponent },
    { path: 'characters/:characterId', component: CharacterDetailComponent },
    { path: 'creators', component: CreatorListComponent },
    { path: 'creators/:creatorId', component: CreatorDetailComponent },
];

@NgModule({
    imports: [CommonModule, RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
