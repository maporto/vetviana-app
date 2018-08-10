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
import { Events } from 'ionic-angular/umd/util/events';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token;
  headers = {};

  constructor(private auth: AutenticacaoServiceProvider, private events: Events) {}

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
      // .do((ev: HttpEvent<any>) => {
      //   return ev;
      // }).catch(err => {
      //   if (err instanceof HttpErrorResponse) {
      //       if (err.status === 401) {
      //           this.auth.logout();
      //           this.events.publish('http:unauthoraized', "Session Expired");
      //       }
      //   }
      //   return Observable.throw(err);
      // });;
    });
  }
}

