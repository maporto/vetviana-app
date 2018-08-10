import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AgendamentoProvider } from '../../providers/agendamento/agendamento';
import { Agendamento } from '../../models/Agendamento';

/**
 * Generated class for the MeusAgendamentosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-meus-agendamentos',
  templateUrl: 'meus-agendamentos.html',
})
export class MeusAgendamentosPage {
  agendamentos:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private agendaService: AgendamentoProvider) {
    this.agendaService.getMeusAgendamentos().subscribe((agendamentos: Agendamento[]) => {
      this.agendamentos = agendamentos;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeusAgendamentosPage');
  }

}
