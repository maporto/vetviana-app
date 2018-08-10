import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AgendamentoProvider } from '../../providers/agendamento/agendamento';
import { Agendamento } from '../../models/Agendamento';
import { Events } from 'ionic-angular';

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
  private agendamentos:Agendamento[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private agendaService: AgendamentoProvider,
    public loadingCtrl: LoadingController,
    public events: Events,
  ) {
    
    events.subscribe('agendamento:created', (agendamento, time) => {
      this.agendamentos.push(agendamento);
    });
  }
  
  ionViewDidLoad() {
    const loader = this.loadingCtrl.create({content: "Carregando..."});
    loader.present();
    this.agendaService.getMeusAgendamentos().subscribe((agendamentos: Agendamento[]) => {
      this.agendamentos = agendamentos;
      loader.dismiss();
    });
  }
  
  ionViewWillEnter() {

  }
}
