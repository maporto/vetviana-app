import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/User';
import { tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { AppSettings } from '../AppSettings';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { App } from 'ionic-angular';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

/*
  Generated class for the AutenticacaoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AutenticacaoServiceProvider {
  private postLogin = AppSettings.API_ENDPOINT + 'login';
  private getUser = AppSettings.API_ENDPOINT + 'user';

  constructor(public http: HttpClient, private storage: Storage, private app: App) {
    // storage.get('token').then((token) => this.token = token ? token : null);
  }

  login (username: string, password: string): Observable<User> {
    let credentials = JSON.stringify({ email: username, password: password });
      return this.http.post<User>(this.postLogin, credentials, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }).pipe(
        tap((user:User) => {
          this.storage.set('token', user.api_token);
        })
      );
  }

  userIsLogged(): Observable<boolean> {
    return this.getToken().switchMap((token) => {
      if (!token) {
        return Observable.of(false);
      }
      return this.http.get<User>(this.getUser, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Beaber ' + token })
      }).map((user:User) => {
        return user ? true : false;
      });
    });
  }

	logout(): Observable<boolean> {
    return fromPromise(this.storage.remove('token')).pipe(
      tap(result => {
        this.app.getActiveNav().push('LoginPage');
        return true;
      })
    );
  }

  getToken() {
    return fromPromise(this.storage.get('token'));
  }
}
 