import { Component, OnInit } from '@angular/core';

import { Creator } from '../creator';
import { MarvelService } from '../marvel.service';

@Component({
    selector: 'app-creator-list',
    templateUrl: './creator-list.component.html',
    styleUrls: ['./creator-list.component.css'],
})
export class CreatorListComponent implements OnInit {
    creators: Creator[];

    constructor(private marvelService: MarvelService) {}

    ngOnInit(): void {
        this.getCreators();
    }

    getCreators(): void {
        this.creators = this.marvelService.getCreators();
    }
}
