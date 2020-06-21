import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor() {}

    // public isAuthenticated(): boolean {
    //     const token = localStorage.getItem('token');
    //     // Check whether the token is expired and return
    //     // true or false
    //     return !this.jwtHelper.isTokenExpired(token);
    //     this.jwtHelper.
    //   }

    postLogin(credentials) {
        const { username, password } = credentials;
        if (username === 'marveluser' && password === 'test123') {
            // user authenticated
            // route user to homepage
            console.log('authenticated');
            // this.tokenService.saveAuthToken('faketoken');
            // this.router
            return 'faketoken';
        } else {
            return '';
        }
    }
}
