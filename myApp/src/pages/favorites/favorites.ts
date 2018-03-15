import { Component,  OnInit } from '@angular/core';
import { NavController , NavParams} from 'ionic-angular';
import { User } from '../../app/entity/user';
import { UserService } from '../../app/service/user.service';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html'
})
export class FavoritesPage  implements OnInit {
  userLogged : User;
  favorites: User[];
  
  constructor(public navCtrl: NavController,  public navParams: NavParams, private userService: UserService) {
    this.userLogged = navParams.data;
  }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.getFavorites();
  }
  
  getFavorites(): void {
    let favoritesId = [];
    this.userLogged.favorites.forEach( favo => {
      if(favo.status == "Act") { 
        favoritesId.push(favo.idUserFavorite);
      }
    });
    
    this.userService.getUsersByIds(favoritesId)
      .subscribe(users1 => {
        this.favorites = users1
    });
    
 }

}
