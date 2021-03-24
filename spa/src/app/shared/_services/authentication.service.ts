import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AccountSystem } from '../_models';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.accountSubject = new BehaviorSubject<AccountSystem>(null);
    this.account = this.accountSubject.asObservable();
  }

  public get accountValue(): AccountSystem {
    return this.accountSubject.value;
  }
  private accountSubject: BehaviorSubject<AccountSystem>;
  public account: Observable<AccountSystem>;

  // helper methods

  private refreshTokenTimeout;

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/auth/authenticate`, { username, password }, { withCredentials: true })
      .pipe(map(account => {
        this.accountSubject.next(account);
        this.startRefreshTokenTimer();
        return account;
      }));
  }

  logout() {
    this.http.post<any>(`${environment.apiUrl}/auth/revoke-token`, {}, { withCredentials: true }).subscribe();
    this.stopRefreshTokenTimer();
    this.accountSubject.next(null);
    this.router.navigate(['/login']);
  }

  refreshToken() {
    return this.http.post<any>(`${environment.apiUrl}/auth/refresh-token`, {}, { withCredentials: true })
      .pipe(map((account) => {
        this.accountSubject.next(account);
        this.startRefreshTokenTimer();
        return account;
      }));
  }

  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(this.accountValue.jwtToken.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
