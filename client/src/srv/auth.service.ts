import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt'
import { IUser } from '../models/IUser';

@Injectable()
export class AuthService {
    get Token(): string {
        return localStorage.getItem('token');
    }

    set Token(value) {
        localStorage.setItem('token', value);
    }

    get IsAuthenticated() {
        // get the token
        const token = this.Token;
        // return a boolean reflecting whether or not the token is expired
        return tokenNotExpired(null, token);
    }

    get User() : IUser {
        if (this.IsAuthenticated) {
            return JSON.parse(localStorage.getItem("user"));
        } else {
            return null;
        }
    }
}