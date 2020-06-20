import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MarvelService } from '../marvel.service';
import { Character } from '../character';

@Component({
    selector: 'app-character-detail',
    templateUrl: './character-detail.component.html',
    styleUrls: ['./character-detail.component.css'],
})
export class CharacterDetailComponent implements OnInit {
    character: Character;
    constructor(
        private route: ActivatedRoute,
        private marvelService: MarvelService,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.getCharacter();
    }

    getCharacter(): void {
        const characterId = +this.route.snapshot.paramMap.get('characterId');
        // this.marvelService
        //   .getCharacter(characterId)
        //   .subscribe((character) => (this.character = character[0]));
        this.character = this.marvelService.getCharacter(characterId);
    }

    goBack(): void {
        this.location.back();
    }

    toggleFavorite(): void {
        this.marvelService.setFavorite(
            this.character.id,
            !this.character.favorite,
            this.marvelService.getCharacters()
        );
    }
}
