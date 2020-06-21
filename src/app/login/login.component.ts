import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { TokenService } from '../token.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    loginForm;

    constructor(
        private auth: AuthService,
        private formBuilder: FormBuilder,
        private router: Router,
        private tokenService: TokenService
    ) {
        this.loginForm = this.formBuilder.group({
            username: '',
            password: '',
        });
    }

    ngOnInit(): void {}

    onSubmit(loginInfo) {
        const token = this.auth.postLogin(loginInfo);
        if (!!token) {
            this.tokenService.saveAuthToken(token);
            this.router.navigateByUrl('/');
        }
    }
}
