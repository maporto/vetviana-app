import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/User';
import { tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

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
  public token: string;
  private postLogin = 'http://192.168.25.147/vetviana-srv/server.php/api/login';

  constructor(public http: HttpClient, private storage: Storage) {
  //  storage.get('token').then((token) => this.token = token ? token : null);
  }

  login (username: string, password: string): Observable<User> {
    let credentials = JSON.stringify({ email: username, password: password });
      return this.http.post<User>(this.postLogin, credentials, httpOptions).pipe(
        tap((user:User) => {
          this.token = user.api_token;
          this.storage.set('token', this.token);
        })
      );
  }

  userIsLogged() {
    return this.storage.get('token').then(val => {
      if (val !== undefined) {
        return val;
      } else {
        return false
      }
    });
  }

	logout(): void {
		this.token = null;
		this.storage.remove('token');
	}
}
