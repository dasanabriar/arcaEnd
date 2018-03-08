import { Component,  OnInit } from '@angular/core';
import { NavController, AlertController , NavParams } from 'ionic-angular';
import { User } from '../../app/entity/user';
import { Favorite } from '../../app/entity/favorite';
import { UserService } from '../../app/service/user.service';
import { PerfilPage} from '../perfil/perfil';
import { TypeSearch } from '../../app/util/typesearch';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage implements OnInit {
  numbersTest = [0,1,2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  preferenceSexs = [];
  users: User[];
  usersOriginal : User[];
  
  criteriasSearch = [];
  imageToShow: any;
  single_img: Object;
  viewSlide: boolean;
  userLogged: User;
  
  constructor(public navCtrl: NavController, private alertCtrl: AlertController,  private userService: UserService,
    public navParams: NavParams) {
    this.userLogged = navParams.data;
  }

  ngOnInit() {
    this.viewSlide = true;
    this.getUsers();
    this.createSearchCritearia();
  }

  createSearchCritearia(): void {
    let criteria1 = new TypeSearch('checkbox', 'Menor o igual 30 años', 'Menor', false);
    let criteria2 = new TypeSearch('checkbox', 'Mayor a 30 años', 'Mayor', false);
    let criteria3 = new TypeSearch('checkbox', 'Solo compañia', 'Compania', false);
    let criteria4 = new TypeSearch('checkbox', 'Solo Sexo', 'Sexo', false);
    
    
    this.criteriasSearch.push(criteria1);
    this.criteriasSearch.push(criteria2);
    this.criteriasSearch.push(criteria3);
    this.criteriasSearch.push(criteria4);
  }
   
   getUsers(): void {
      this.userLogged.preferences.forEach(prefe =>{
        this.preferenceSexs.push(prefe.sexType.idSexType);
      });

      this.userService.getUsers(this.userLogged.city, 0, this.preferenceSexs)
        .subscribe(users1 => {
          this.users = users1
          this.updateFavoritesList();
          this.usersOriginal = this.users;
        });
      
   }

   // se buscar inicialmente por edad y por tipo de servicio
   searchUser(data):void {
     this.users = this.usersOriginal;
     this.criteriasSearch.forEach( crit => {
        crit.checked = false;
     });
     for(let i = 0; i < data.length; i++){
        let element =  data[i];
        if(element == 'Menor') {
          this.users = this.users.filter(user => user.age <= 30); 
          this.criteriasSearch[0].checked = true;
        } else if(element == 'Mayor') {
          this.users = this.users.filter(user => user.age > 30);  
          this.criteriasSearch[1].checked = true;
        } else if(element == 'Compania') {
          this.users = this.users.filter(user => this.validateOfferService(user, 1));  
          this.criteriasSearch[2].checked = true;
        } else if(element == 'Sexo') {
          this.users = this.users.filter(user => this.validateOfferService(user, 2));  
          this.criteriasSearch[3].checked = true;
        }
      };
   }
   
   validateOfferService(user: User, codeService) : boolean {
    let valid = false;  
    user.clientServicesType.forEach( clientSerTyp => {
      if(clientSerTyp.serviceType.codeService == codeService) {
          valid = true;
        }
      }
    );
    return valid;
   }

   changeView():void {
    this.viewSlide = (this.viewSlide) ? false : true;
   }

  showAlert():void {
    let alert = this.alertCtrl.create({
      title: 'Busqueda',
      inputs:[ 
      {
        type: this.criteriasSearch[0].type,
        label: this.criteriasSearch[0].label,
        value: this.criteriasSearch[0].value,
        checked	: this.criteriasSearch[0].checked,
      },
      {
        type: this.criteriasSearch[1].type,
        label: this.criteriasSearch[1].label,
        value: this.criteriasSearch[1].value,
        checked	: this.criteriasSearch[1].checked,
      },
      {
        type: this.criteriasSearch[2].type,
        label: this.criteriasSearch[2].label,
        value: this.criteriasSearch[2].value,
        checked	: this.criteriasSearch[2].checked,
      },
      {
        type: this.criteriasSearch[3].type,
        label: this.criteriasSearch[3].label,
        value: this.criteriasSearch[3].value,
        checked	: this.criteriasSearch[3].checked,
      }
    ],
      
      buttons: [
        {
          text: 'Accept',
          handler: data => {
            console.log(data);
            this.searchUser(data);
          }
        },
        {
          text: 'Cancel',
          handler: () => {
          console.log('Cancel clicked');
          }
        }
        ]
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
      favorite = new Favorite(user.idUsers, this.userLogged.idUsers, 'Ina');
    }
    favorite.status = (favorite.status == 'Act') ? 'Ina' : 'Act';
    this.userService.addFavorite(favorite).subscribe(favoriteUpdated => {
      favorite = this.getFavorite(user);
      if(!favorite){
        this.userLogged.favorites.push(favoriteUpdated);
      } else {
        favorite = favoriteUpdated;
      }
      this.updateFavoritesList();
    }); 
    
  }

  getFavorite(user:User): Favorite {
    let favorite : Favorite;
    favorite = this.userLogged.favorites.find(favo => favo.idUserFavorite == user.idUsers);
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
