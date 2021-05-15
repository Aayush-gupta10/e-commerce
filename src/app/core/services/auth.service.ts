import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError, tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,
              private route: Router) {

                const isLoggedIn: boolean = JSON.parse(localStorage.getItem('isloggedIN'));
                if (isLoggedIn)
                {
                  console.log(isLoggedIn);
                  this.isLoggedIn$.next(isLoggedIn);
                }
              }

    private AUTH_SERVICE_BASE_URL = '/assets/DataBase';

  login(user: User): Observable<User> {
    const url = `${this.AUTH_SERVICE_BASE_URL}/userDB.json`;
    return this.http.get<any>(`${url}`)
      .pipe(
        map(txs => txs.find(txn => txn.username === user.username && txn.password === user.password )));
  }

  logout(): void
  {
    this.isLoggedIn$.next(false);
    localStorage.setItem('isloggedIN' , JSON.stringify(false));
  }
}
