import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the HomePage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  agendarRoot = 'AgendarPage'
  meusAgendamentosRoot = 'MeusAgendamentosPage'


  constructor(public navCtrl: NavController) {}

}
