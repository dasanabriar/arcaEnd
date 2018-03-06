import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, AlertController , NavParams } from 'ionic-angular';
import { User } from '../../app/entity/user';
import { Favorite } from '../../app/entity/favorite';
import { UserService } from '../../app/service/user.service';
import { PerfilPage} from '../perfil/perfil';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage implements OnInit {
  @ViewChild('slider') private slider;
  numbersTest = [0,1,2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  preferenceSexs = [];
  users: User[];
  usersDummy: User[];
  firstLoad = true;
  imageToShow: any;
  single_img: Object;
  viewSlide: boolean;
  constructor(public navCtrl: NavController, private alertCtrl: AlertController,  private userService: UserService) {
    
  }

  ngOnInit() {
    this.viewSlide = true;
    this.getUsers();
   }
   
   getUsers(): void {
    this.userService.getUsersDummy()
      .subscribe(users => { 
        this.usersDummy = users;
        
        this.usersDummy[0].preferences.forEach(prefe =>{
          this.preferenceSexs.push(prefe.sexType.idSexType);
        });
        
        this.userService.getUsers(this.usersDummy[0].city, 0, this.preferenceSexs)
        .subscribe(users1 => {
          this.users = users1
          this.updateFavoritesList();
        });

      });
      
   }

   changeView():void {
    this.viewSlide = (this.viewSlide) ? false : true;
   }

  showAlert():void {
    let alert = this.alertCtrl.create({
      title: 'Busqueda',
      inputs:[ 
      {
        type: 'checkbox',
        label: 'Negra',
        value: 'value1',
        checked	: true
      },
      {
        type: 'checkbox',
        label: 'Blanca',
        value: 'value2',
        checked	: false
      }],
      
      buttons: ['Accept','Cancel']
    });
    alert.present();
  }

  updateFavoritesList():void {
    this.users.forEach( us => {
      let favorite : Favorite;
      favorite =  this.getFavorite(us);
      if(favorite && favorite.status == 'Act'){
        us.isFavorite = true;
      } else {
        us.isFavorite = false;
      }
    });
 }

  addFavorite(user:User):void {
    let favorite : Favorite;
    favorite = this.getFavorite(user);
    if(!favorite){
      favorite = new Favorite(user.idUsers, this.usersDummy[0].idUsers, 'Ina');
    }
    favorite.status = (favorite.status == 'Act') ? 'Ina' : 'Act';
    this.userService.addFavorite(favorite).subscribe(favoriteUpdated => {
      favorite = this.getFavorite(user);
      if(!favorite){
        this.usersDummy[0].favorites.push(favoriteUpdated);
      } else {
        favorite = favoriteUpdated;
      }
      this.updateFavoritesList();
    }); 
    
  }

  getFavorite(user:User): Favorite {
    let favorite : Favorite;
    favorite = this.usersDummy[0].favorites.find(favo => favo.idUserFavorite == user.idUsers);
    return favorite;
  }

  addCarPurchase():void {

  }

  goToPerfil(user:User):void{
    console.log("Should open Page");
    this.navCtrl.push(PerfilPage,  {
      userChoosed: user
    });
  }
}
