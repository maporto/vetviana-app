import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/User';
import { tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { AppSettings } from '../AppSettings';
import { Observer } from 'rxjs/Observer';
import { fromPromise } from 'rxjs/observable/fromPromise';
/*
  Generated class for the AutenticacaoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AutenticacaoServiceProvider {
  private postLogin = AppSettings.API_ENDPOINT + 'login';

  constructor(public http: HttpClient, private storage: Storage) {
    // storage.get('token').then((token) => this.token = token ? token : null);
  }

  login (username: string, password: string): Observable<User> {
    let credentials = JSON.stringify({ email: username, password: password });
      return this.http.post<User>(this.postLogin, credentials, httpOptions).pipe(
        tap((user:User) => {
          this.storage.set('token', user.api_token);
        })
      );
  }

  userIsLogged(): boolean {
    return Observable.create((observer: Observer<boolean>) => {
      this.storage.get('token').then(token => {
        return token ? true : false;
      });
    });
  }

	logout(): void {
		this.storage.remove('token');
  }

  getToken() {
    return fromPromise(this.storage.get('token'));
  }
}
 