import { Injectable } from '@angular/core';

const TOKEN_KEY = 'marvelpedia-token';

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    constructor() {}

    saveAuthToken(token): void {
        localStorage.setItem(TOKEN_KEY, token);
    }

    getAuthToken() {
        return localStorage.getItem(TOKEN_KEY);
    }

    clearAuthToken(): void {
        localStorage.removeItem(TOKEN_KEY);
    }

    hasAuthToken(): boolean {
        return !!this.getAuthToken();
    }
}
