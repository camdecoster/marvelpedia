import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
    constructor(private tokenService: TokenService, public router: Router) {}
    canActivate(): boolean {
        if (!this.tokenService.hasAuthToken()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}
