import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, merge, Observable } from 'rxjs';
import { map, tap, catchError, expand } from 'rxjs/operators';

import { Character } from './character';
import { Creator } from './creator';
import { MarvelElement } from './marvel-element';

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
    // private apiKey = 'd6744625a3ce5b48b2d73c89e3cff87e';
    // private API_ENDPOINT_CHARACTERS = `https://gateway.marvel.com/v1/public/characters`;
    // private API_ENDPOINT_CREATORS = `http://gateway.marvel.com/v1/public/creators`;

    characters: Character[] = [];
    creators: Creator[] = [];

    constructor(private http: HttpClient) {
        // Get cache from local storage, if it exists
        const dataCache = JSON.parse(localStorage[CACHE_KEY] || '{}');

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
            //     let url =
            //         this._apiInfo.characters.url + '?' + parameterString;

            //     newResults = this.http.get<T>(url);
            //     newResults.subscribe((response: any) =>
            //         this.characters.push(...response.data.results)
            //     );
            //     queryParameters.offset += 100;
            // }
            this.setCache();
        });
    }

    // Get all characters from Marvel API
    getCharacters(): Character[] {
        // const dataCache = JSON.parse(localStorage[CACHE_KEY] || '[]');
        // if (dataCache.length > 0) {
        //     this.characters = dataCache;
        // } else if (this.characters.length === 0) {
        //     // Define API query parameters for getting blog ID, posts
        //     const queryParameters = {
        //         apikey: _apiInfo.key,
        //         // API limits results to 100 results per query
        //         limit: 100,
        //         // Start requesting at 0
        //         offset: 0,
        //     };

        //     // Create API query URL
        //     let parameterString = this.formatQueryParameters(queryParameters);
        //     let url = _apiInfo.characters.url + '?' + parameterString;

        //     // Make first API call to get total number of characters,
        //     // first 100 characters
        //     const firstResult = this.http.get<Character[]>(url);
        //     let total;

        //     firstResult.subscribe((response: any) => {
        //         let newResults;

        //         // Add first 100 characters to characters array
        //         this.characters.push(...response.data.results);

        //         // Increment query offset
        //         queryParameters.offset += 100;

        //         console.log(response.data.total);
        //         total = response.data.total;

        //         // Uncomment below to keep polling API until all characters are returned

        //         // while (queryParameters.offset < total) {
        //         //     // Create new API query URL
        //         //     let parameterString = this.formatQueryParameters(
        //         //         queryParameters
        //         //     );
        //         //     let url =
        //         //         this._apiInfo.characters.url + '?' + parameterString;

        //         //     newResults = this.http.get<Character[]>(url);
        //         //     newResults.subscribe((response: any) =>
        //         //         this.characters.push(...response.data.results)
        //         //     );
        //         //     queryParameters.offset += 100;
        //         // }
        //         localStorage[CACHE_KEY] = JSON.stringify(this.characters);
        //         console.log(this.characters);
        //     });

        //     // return firstResult.pipe(
        //     //     map((response: any) => response.data.results),
        //     //     catchError(this.handleError<Character[]>('getCharacters', []))
        //     // );
        // }

        return this.characters;
    }

    // getCharacter(id: number): Observable<Character> {
    getCharacter(id: number): Character {
        // If characters array is empty, fill it then return single character
        // if (this.characters.length === 0) {
        //     // Define API query parameters for getting blog ID, posts
        //     const queryParameters = {
        //         apikey: _apiInfo.key,
        //     };

        //     // Create API query URL
        //     let parameterString = this.formatQueryParameters(queryParameters);
        //     let url = `${_apiInfo.characters.url}/${id}?${parameterString}`;

        //     const newResult = this.http
        //         .get<Character[]>(url)
        //         .pipe(map((response: any) => response.data.results));

        //     return newResult.subscribe((character: Character[]) => character[0]);
        // } else {

        //     return this.characters.filter((character) => character.id === id)[0];
        // }
        // return this.http
        //     .get<Character[]>(
        //         `${this.API_ENDPOINT_CHARACTERS}/${id}?apikey=${this.apiKey}`
        //     )
        //     .pipe(map((response: any) => response.data.results));
        return this.characters.filter((character) => character.id === id)[0];
    }

    getCreators(): Creator[] {
        // return this.http
        //     .get<Creator[]>(
        //         `${this.API_ENDPOINT_CREATORS}?apikey=${this.apiKey}&limit=${limit}&offset=${offset}`
        //     )
        //     .pipe(map((response: any) => response.data.results));
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
