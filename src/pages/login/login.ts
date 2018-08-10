import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AutenticacaoServiceProvider } from '../../providers/autenticacao-service/autenticacao-service';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  podeVer = true;
  credential = {
    email: '',
    password: ''
  };
  buscando = false;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AutenticacaoServiceProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login (credential) {
    this.buscando = true;
    this.authService.login(credential.email,credential.password).subscribe(
      (user) => {
        this.navCtrl.setRoot(HomePage);        
      },
      (error) => {
        this.buscando = false;
      }
    );
  }
}
