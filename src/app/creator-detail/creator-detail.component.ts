import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MarvelService } from '../marvel.service';
import { Creator } from '../creator';

@Component({
    selector: 'app-creator-detail',
    templateUrl: './creator-detail.component.html',
    styleUrls: ['./creator-detail.component.css'],
})
export class CreatorDetailComponent implements OnInit {
    creator: Creator;
    constructor(
        private route: ActivatedRoute,
        private marvelService: MarvelService,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.getCreator();
    }

    getCreator(): void {
        const creatorId = +this.route.snapshot.paramMap.get('creatorId');
        this.creator = this.marvelService.getCreator(creatorId);
    }

    goBack(): void {
        this.location.back();
    }

    toggleFavorite(): void {
        this.marvelService.setFavorite(
            this.creator.id,
            !this.creator.favorite,
            this.marvelService.getCreators()
        );
    }
}
