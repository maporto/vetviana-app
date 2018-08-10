import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { AutenticacaoServiceProvider } from './autenticacao-service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token;
  headers = {};

  constructor(private auth: AutenticacaoServiceProvider) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.auth.getToken().mergeMap((token) => {
      this.token = token;
      if (token) {
          request = request.clone({
              setHeaders: {
                  Authorization: `Bearer ${this.token}`,
                  'Content-Type': 'application/json'
              }
          });
      }
      return next.handle(request)
      .do((ev: HttpEvent<any>) => {
        return ev;
      }).catch(err => {
        if (err instanceof HttpErrorResponse) {
          this.auth.logout().subscribe();
        }
        return Observable.throw(err);
      });;
    });
  }
}

