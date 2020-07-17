import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ApiResponse } from './apiResponse';
import { Character } from './character';
import { Creator } from './creator';

// Declare information to access relevant API's
const _apiInfo = {
    characters: {
        url: 'https://gateway.marvel.com/v1/public/characters',
    },
    creators: {
        url: 'https://gateway.marvel.com/v1/public/creators',
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
                console.log('GETTING CHARACTER CACHE');
                this.characters = dataCache.characters;
            }
            // If it doesn't, query API to get data
            else {
                console.log('REQUESTING CHARACTER RESULTS');
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

    async requestApiData<T>(
        endpoint: string,
        resultsArray: T[]
    ): Promise<void> {
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
        // let response = await this.http.get<ApiResponse>(url).toPromise();
        let response = await this.getApiData(queryParameters, endpoint);
        console.log(response);

        // Get total number of results available
        // let total = response.data.total;
        // Limit this for now because Local Storage has a limit of 520000 characters and getting
        // all data goes above this
        let total = 301;

        let newResults = (response.data.results as unknown) as Array<T>;
        console.log(newResults);

        // Add first 100 results to results array
        resultsArray.push(...newResults);

        // Increment query offset
        queryParameters.offset += 100;

        // Uncomment below to keep polling API until all results are returned
        while (queryParameters.offset < total) {
            let response = await this.getApiData(queryParameters, endpoint);
            newResults = (response.data.results as unknown) as Array<T>;

            resultsArray.push(...newResults);

            queryParameters.offset += 100;
        }
        console.log('setting cache');
        this.setCache();
    }

    // Create API query URL, then fetch data from API
    async getApiData(queryParameters, siteUrl: string) {
        console.log('`getApiData` ran');

        // Create API query URL for getting blog ID
        let parameterString = this.formatQueryParameters(queryParameters);
        let url = siteUrl + '?' + parameterString;
        try {
            // Get info from API
            const response = await this.http.get<ApiResponse>(url).toPromise();

            // Make sure response is OK before proceeding
            if (response.status !== 'Ok') {
                throw new Error(response.status);
            }
            return response;
        } catch (error) {
            throw error;
        }
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
        element.favorite = isFavorite;
        this.setCache();
    }

    setCache(): void {
        localStorage[CACHE_KEY] = JSON.stringify({
            characters: this.characters,
            creators: this.creators,
        });
    }
}
