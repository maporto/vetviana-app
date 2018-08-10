import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../AppSettings';
import { Servico } from '../../models/Servico';

/*
  Generated class for the AgendamentoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicoProvider {
  private API_SERVICO = AppSettings.API_ENDPOINT + 'servico';

  constructor(public http: HttpClient) {}

  getServicos (): Observable<Servico[]> {
    return this.http.get<Servico[]>(this.API_SERVICO);
  }
}