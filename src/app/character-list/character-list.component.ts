import { Component, OnInit } from '@angular/core';

import { Character } from '../character';
import { MarvelService } from '../marvel.service';

@Component({
    selector: 'app-character-list',
    templateUrl: './character-list.component.html',
    styleUrls: ['./character-list.component.css'],
})
export class CharacterListComponent implements OnInit {
    characters: Character[];

    constructor(private marvelService: MarvelService) {}

    ngOnInit(): void {
        this.getCharacters();
    }

    getCharacters(): void {
        this.characters = this.marvelService.getCharacters();
    }
}
