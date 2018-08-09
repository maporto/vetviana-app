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
  public podeVer: boolean = false;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AutenticacaoServiceProvider) {
    authService.userIsLogged().then(token => {
      this.podeVer = true;
      if (token) {
        this.entrar()
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login (email: string, password: string ) {
    this.authService.login(email,password).subscribe(
      (user) => {
        this.entrar();
      }
    );
  }
  
  entrar() {
    this.navCtrl.setRoot(HomePage);        
  }

}
