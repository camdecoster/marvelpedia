import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { CreatorDetailComponent } from './creator-detail/creator-detail.component';
import { CreatorListComponent } from './creator-list/creator-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [
        AppComponent,
        CharacterListComponent,
        CharacterDetailComponent,
        DashboardComponent,
        CreatorListComponent,
        CreatorDetailComponent,
        LoginComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
