import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _currentUser: any;
  constructor(private httpclient: HttpClient, private router: Router) {
    try {
      const currentUser: any = localStorage.getItem('currentUser');
      this._currentUser = JSON.parse(currentUser);
    } catch (error) {
      this._currentUser = null;
    }
  }
  set currentUser(user) {
    this._currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  get currentUser() {
    return this._currentUser;
  }
}
