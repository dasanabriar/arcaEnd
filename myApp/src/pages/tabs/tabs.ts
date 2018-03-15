import { Component } from '@angular/core';
import {  NavParams} from 'ionic-angular';
import { AboutPage } from '../about/about';
import { FavoritesPage } from '../favorites/favorites';
import { SearchPage } from '../search/search';
import { User } from '../../app/entity/user';
import { ShoppingCartService } from '../../app/service/shoppingcart.service';

import { ShoppingCartPage } from '../shoppingcart/shoppingcart';
import { ShoppingCart } from '../../app/entity/shoppingcart';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  userLogged : User;
  tab1Root = SearchPage;
  tab2Root = AboutPage;
  tab3Root = FavoritesPage;
  tab4Root = ShoppingCartPage;
  

  constructor(public navParams: NavParams, private shoppingCartService: ShoppingCartService) {
    this.userLogged = navParams.get("userLogged");
    shoppingCartService.getShoppingCart(this.userLogged.idUsers).subscribe(shopppingCart => {
      this.userLogged.shoppingcart = shopppingCart; 
      console.log("this.userLogged.shoppingcart " + this.userLogged.shoppingcart.idShoppingCart);
      if(this.userLogged.shoppingcart ==  null || this.userLogged.shoppingcart.idUsers ==  null) {
        this.userLogged.shoppingcart = new ShoppingCart();
        this.userLogged.shoppingcart.idUsers = this.userLogged.idUsers;
        this.userLogged.shoppingcart.status = "ACT";
      }
      if(this.userLogged.shoppingcart.contracts == null) {
        this.userLogged.shoppingcart.contracts = [];
      }
      
      this.userLogged.nContracts = this.userLogged.shoppingcart.contracts.length;
    });
  }

}
