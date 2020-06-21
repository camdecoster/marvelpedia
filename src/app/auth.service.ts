import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor() {}

    postLogin(credentials) {
        const { username, password } = credentials;
        if (username === 'marveluser' && password === 'test123') {
            return 'faketoken';
        } else {
            return '';
        }
    }
}
