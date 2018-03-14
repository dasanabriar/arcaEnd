import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { SearchPage } from '../pages/search/search';
import { PerfilPage } from '../pages/perfil/perfil';
import { RegisterPage } from '../pages/register/register';
import { RegisterSearchedPage } from'../pages/register-searched/register-searched';


import { LoginService} from './service/login.service';
import { RegisterSearchedService} from './service/register-searched.service';
import { UserService} from './service/user.service';
import { HttpClientModule } from '@angular/common/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AlertComponent } from '../pages/alert/alert.component';
import { AlertService} from '../pages/alert/alert.service';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    AlertComponent,
    SearchPage,
    PerfilPage,
    RegisterSearchedPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SearchPage,
    PerfilPage,
    RegisterPage,
    RegisterSearchedPage
  ],
  providers: [
    StatusBar,
    SplashScreen, 
    LoginService,
    UserService,
    AlertService,
    RegisterSearchedService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
