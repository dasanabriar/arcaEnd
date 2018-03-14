import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../app/entity/user';
import { RegisterSearchedService} from '../../app/service/register-searched.service';
import { GLOBAL } from '../../app/service/global';



@IonicPage()
@Component({
  selector: 'page-register-searched',
  templateUrl: 'register-searched.html',
})
export class RegisterSearchedPage {
  private user:User = new User();
  constructor(public navCtrl: NavController, public navParams: NavParams, private registerSearchedService: RegisterSearchedService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterSearchedPage');
  }

  onSubmit(){
    console.log("Entro");
    this.registerSearchedService.makeFileRequest(GLOBAL.url+'upload-file', [], this.filesToUpload).then((result) =>{
      console.log(result);
  },(error)=>{
    console.log(error);
  }
);
    console.log(this.user);
  }

  public filesToUpload;
  public resultUpload;
    fileChangeEvent(fileInput:any){
      this.filesToUpload = <Array<File>>fileInput.target.files;
      console.log(this.filesToUpload);
    }


}
