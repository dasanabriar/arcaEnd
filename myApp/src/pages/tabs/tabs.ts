import { Component } from '@angular/core';
import {  NavParams} from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { SearchPage } from '../search/search';
import { User } from '../../app/entity/user';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  userLogged : User;
  tab1Root = SearchPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(public navParams: NavParams) {
    this.userLogged = navParams.get("userLogged");
  }
}
