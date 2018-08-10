import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { AutenticacaoServiceProvider } from '../providers/autenticacao-service/autenticacao-service';
import { IonicStorageModule } from '@ionic/storage';
import { AgendamentoProvider } from '../providers/agendamento/agendamento';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../providers/autenticacao-service/interceptor';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr);
import { HomePage } from '../pages/home/home';
import { HomePageModule } from '../pages/home/home.module';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HomePageModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AutenticacaoServiceProvider,
    AgendamentoProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class AppModule {}
