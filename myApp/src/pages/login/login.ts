import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginService} from '../../app/service/login.service';
import { User } from '../../app/entity/user';
import { TabsPage} from '../tabs/tabs';
import { AlertService } from '../alert/alert.service';
import { RegisterPage } from '../register/register'



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
            this.navCtrl.push(TabsPage,  {
              userLogged: data
            });
          },
        error => {

            this.alertService.error('Usuario o password incorrecto');
        });

  }
  public registerAction(): void{
      this.navCtrl.push(RegisterPage);
  }

}
