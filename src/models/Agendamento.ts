import { Servico } from "./Servico";
import { DateTime } from "ionic-angular/umd";

export class Agendamento {
  id: number;
  servico: Servico;
  datahora: DateTime;
}