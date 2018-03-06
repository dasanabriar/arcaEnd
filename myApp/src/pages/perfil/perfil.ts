import { Component } from '@angular/core';
import { NavController , NavParams} from 'ionic-angular';
import { User } from '../../app/entity/user';
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {
  userChoosed : User;
  
  constructor(public navCtrl: NavController,  public navParams: NavParams) {
    this.userChoosed = navParams.get("userChoosed");
  }

  

}
