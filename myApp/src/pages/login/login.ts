import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginService} from './login.service';
import { User } from './user';
import { TabsPage} from '../tabs/tabs';
import { AlertService } from '../alert/alert.service';


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
  private user:User = new User();
  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: LoginService, private alertService: AlertService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  public loginAction(): void{
    this.loginService.loginAction(this.user)
        .subscribe(
          data => {
            this.navCtrl.push(TabsPage);
          },
        error => {

            this.alertService.error('Usuario o password incorrecto');
        });

  }

}
