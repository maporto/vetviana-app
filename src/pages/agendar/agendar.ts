import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AgendamentoProvider } from '../../providers/agendamento/agendamento';
import { ServicoProvider } from '../../providers/servico/servico';
import { Agendamento } from '../../models/Agendamento';
import { Servico } from '../../models/Servico';
import { DatePicker } from '@ionic-native/date-picker';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';

/**
 * Generated class for the AgendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agendar',
  templateUrl: 'agendar.html',
})
export class AgendarPage {
  private agendamento: Agendamento = new Agendamento();
  public servicos: Servico[];
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public events: Events,
    private agendaService: AgendamentoProvider,
    private servicoService: ServicoProvider,
    private datePicker: DatePicker,
  ) {
    const loader = this.loadingCtrl.create({content: "Carregando..."});
    loader.present();
    this.servicoService.getServicos().subscribe((servicosServer: Servico[]) => {
      this.servicos = servicosServer;
      loader.dismiss();
    });
  }

  ionViewDidLoad() {}

  selectData(): Promise<Date> {
    return this.datePicker.show({
      date: new Date(),
      mode: 'datetime',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_TRADITIONAL,
      locale: 'pt-Br',
      minDate: new Date(),
      is24Hour: true 
    });
  }

  agendar() {
    this.selectData().then((data) => {
      console.log(data.toISOString());
      this.agendamento.datahora = data;
      console.log(this.agendamento);
      // this.enviar(this.agendamento);
    });
  }

  enviar(agendamento: Agendamento) {
    const loader = this.loadingCtrl.create({content: "Agendando..."});
    loader.present();
    this.agendaService.agendar(agendamento).subscribe((agendamento: Agendamento) => {  
      this.events.publish('agendamento:created', agendamento, Date.now());
    },(error) => {},() => {
      loader.dismiss();
    });
  }
}
