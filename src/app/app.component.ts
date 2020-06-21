import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TokenService } from './token.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'marvelpedia';
    constructor(private router: Router, public tokenService: TokenService) {}

    logout() {
        this.tokenService.clearAuthToken();
        this.router.navigateByUrl('/login');
    }
}
