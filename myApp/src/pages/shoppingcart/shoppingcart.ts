import { Component,  OnInit } from '@angular/core';
import { NavController , NavParams} from 'ionic-angular';
import { User } from '../../app/entity/user';
import { UserService } from '../../app/service/user.service';

@Component({
  selector: 'page-shoppingcart',
  templateUrl: 'shoppingcart.html'
})
export class ShoppingCartPage  implements OnInit {
  userLogged : User;
  usersChoosed: User[];
  
  constructor(public navCtrl: NavController,  public navParams: NavParams, private userService: UserService) {
    this.userLogged = navParams.data;
  }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.getShoppingCart();
  }
  
  getShoppingCart(): void {
    let shoopingCarts = [];
    this.userLogged.shoppingcart.contracts.forEach( contract => {
      shoopingCarts.push(contract.idUserHired);
      
    });
    
    this.userService.getUsersByIds(shoopingCarts)
      .subscribe(users1 => {
        this.usersChoosed = users1
    });
    
 }

}
