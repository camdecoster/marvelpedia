import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatorListComponent } from './creator-list/creator-list.component';
import { CreatorDetailComponent } from './creator-detail/creator-detail.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'characters', component: CharacterListComponent },
  { path: 'characters/:characterId', component: CharacterDetailsComponent },
  { path: 'creators', component: CreatorListComponent },
  { path: 'creators/:creatorId', component: CreatorDetailComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CharacterListComponent,
    DashboardComponent,
    CreatorListComponent,
    CreatorDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
