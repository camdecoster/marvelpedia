import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap, catchError, expand } from 'rxjs/operators';

import { Character } from './character';
import { Creator } from './creator';

@Injectable({
  providedIn: 'root',
})
export class MarvelService {
  private apiKey = 'd6744625a3ce5b48b2d73c89e3cff87e';
  private API_ENDPOINT_CHARACTERS = `https://gateway.marvel.com/v1/public/characters`;
  private API_ENDPOINT_CREATORS = `http://gateway.marvel.com/v1/public/creators`;

  // Do I need to add referrer?
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //   Referer: 'localhost',
    }),
  };

  constructor(private http: HttpClient) {}
  characters: Character[];
  creators: Creator[];

  getCharacters(): Observable<Character[]> {
    // API limits results to 100 results per query
    const limit = 100;

    // Start requesting at 0
    let offset = 0;

    return this.http
      .get<Character[]>(
        `${this.API_ENDPOINT_CHARACTERS}?apikey=${this.apiKey}&limit=${limit}&offset=${offset}`
      )
      .pipe(map((response: any) => response.data.results));
  }

  getCharacter(id: number): Observable<Character> {
    return this.http
      .get<Character[]>(
        `${this.API_ENDPOINT_CHARACTERS}/${id}?apikey=${this.apiKey}`
      )
      .pipe(map((response: any) => response.data.results));
  }

  getCreators(): Observable<Creator[]> {
    // API limits results to 100 results per query
    const limit = 100;

    // Start requesting at 0
    let offset = 0;

    return this.http
      .get<Creator[]>(
        `${this.API_ENDPOINT_CREATORS}?apikey=${this.apiKey}&limit=${limit}&offset=${offset}`
      )
      .pipe(map((response: any) => response.data.results));
  }

  getCreator(id: number): Observable<Creator> {
    return this.http
      .get<Creator[]>(
        `${this.API_ENDPOINT_CREATORS}/${id}?apikey=${this.apiKey}`
      )
      .pipe(map((response: any) => response.data.results));
  }
}
