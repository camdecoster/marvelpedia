import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MarvelService } from '../marvel.service';
import { Character } from '../character';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css'],
})
export class CharacterDetailsComponent implements OnInit {
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
    this.marvelService
      .getCharacter(characterId)
      .subscribe((character) => (this.character = character[0]));
  }

  goBack(): void {
    this.location.back();
  }
}
