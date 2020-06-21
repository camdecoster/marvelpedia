import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

import { Character } from './character';
import { Creator } from './creator';

// Declare information to access relevant API's
const _apiInfo = {
    characters: {
        url: 'https://gateway.marvel.com/v1/public/characters',
    },
    creators: {
        url: 'http://gateway.marvel.com/v1/public/creators',
    },
    key: 'd6744625a3ce5b48b2d73c89e3cff87e',
};

const CACHE_KEY = 'httpMarvelCache';

@Injectable({
    providedIn: 'root',
})
export class MarvelService {
    // Define member variables
    characters: Character[] = [];
    creators: Creator[] = [];

    constructor(private http: HttpClient) {
        // Get cache from local storage, if it exists
        const dataCache = JSON.parse(localStorage[CACHE_KEY] || '{}');

        // ADD TIME CHECK FOR CACHE TO SEE IF IT SHOULD BE UPDATED

        // If cache exists, try to save contents
        if (!!dataCache) {
            // If character cache exists, save contents
            if (!!dataCache.characters) {
                this.characters = dataCache.characters;
            }
            // If it doesn't, query API to get data
            else {
                this.requestApiData<Character>(
                    _apiInfo.characters.url,
                    this.characters
                );
            }
            // If creator cache exists, save contents
            if (!!dataCache.creators) {
                console.log('GETTING CREATOR CACHE');
                this.creators = dataCache.creators;
            }
            // If it doesn't, query API to get data
            else {
                console.log('REQUESTING CREATOR RESULTS');
                this.requestApiData<Creator>(
                    _apiInfo.creators.url,
                    this.creators
                );
            }
        }
    }

    requestApiData<T>(endpoint: string, resultsArray: T[]): void {
        // Define API query parameters for getting blog ID, posts
        const queryParameters = {
            apikey: _apiInfo.key,
            // API limits results to 100 results per query
            limit: 100,
            // Start requesting at 0
            offset: 0,
        };

        // Create API query URLs
        let parameterString = this.formatQueryParameters(queryParameters);
        let url = endpoint + '?' + parameterString;

        // Make first API call to get total number of results,
        // first 100 results
        const firstResult = this.http.get<T[]>(url);
        let total;

        firstResult.subscribe((response: any) => {
            let newResults;

            // Add first 100 results to results array
            resultsArray.push(...response.data.results);

            // Increment query offset
            queryParameters.offset += 100;

            // console.log(response.data.total);
            total = response.data.total;

            // Uncomment below to keep polling API until all results are returned

            // while (queryParameters.offset < total) {
            //     // Create new API query URL
            //     let parameterString = this.formatQueryParameters(
            //         queryParameters
            //     );
            //     let url = endpoint + '?' + parameterString;

            //     newResults = this.http.get<T>(url);
            //     newResults.subscribe((response: any) => {
            //         resultsArray.push(...response.data.results);
            //         this.setCache();
            //     });
            //     queryParameters.offset += 100;
            // }
            this.setCache();
        });
    }

    // Get all characters from Marvel API
    getCharacters(): Character[] {
        return this.characters;
    }

    getCharacter(id: number): Character {
        return this.characters.filter((character) => character.id === id)[0];
    }

    getCreators(): Creator[] {
        return this.creators;
    }

    getCreator(id: number): Creator {
        return this.creators.filter((creator) => creator.id === id)[0];
    }

    // Generate query string that concatenates all API parameters in proper format
    private formatQueryParameters(queryParameters) {
        // console.log('`formatQueryParameters` ran');

        const parameterString = Object.keys(queryParameters).map(
            (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(
                    queryParameters[key]
                )}`
        );
        return parameterString.join('&');
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(`${operation} failed: ${error.message}`); // log to console instead

            // TODO: better job of transforming error for user consumption
            //   this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    setFavorite(id: number, isFavorite: boolean, elementArray): void {
        const index: number = elementArray.findIndex(
            (element) => element.id === id
        );
        const element = elementArray[index];
        console.log(element);
        element.favorite = isFavorite;
        console.log(
            `${typeof element} favorite status changed to ${element.favorite}`
        );
        this.setCache();
    }

    setCache(): void {
        localStorage[CACHE_KEY] = JSON.stringify({
            characters: this.characters,
            creators: this.creators,
        });
    }
}
