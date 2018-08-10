import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AutenticacaoServiceProvider,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login (credential) {
    const loader = this.loadingCtrl.create({content: "Carregando..."});
    loader.present();
    this.authService.login(credential.email,credential.password).subscribe(
      (user) => {
        this.navCtrl.setRoot(HomePage);        
      },(error) => {}, () => {loader.dismiss();}
    );
  }
}
