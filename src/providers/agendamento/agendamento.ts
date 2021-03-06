import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../AppSettings';
import { Agendamento } from '../../models/Agendamento';

/*
  Generated class for the AgendamentoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AgendamentoProvider {
  private API_MEUS_AGENDAMENTOS = AppSettings.API_ENDPOINT + 'meus-agendamentos';
  private API_AGENDAMENTO = AppSettings.API_ENDPOINT + 'agendamento';

  constructor(public http: HttpClient) {}

  getMeusAgendamentos (): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(this.API_MEUS_AGENDAMENTOS);
  }

  agendar (agendamento:Agendamento): Observable<Agendamento> {
    return this.http.post<Agendamento>(this.API_AGENDAMENTO, agendamento);
  }
}