import { Injectable } from '@angular/core';
import { User } from '../entity/user';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from '../../app/service/global';

@Injectable()
export class RegisterSearchedService{
  public url:string;
  constructor(){
    this.url = GLOBAL.url;
  }


  makeFileRequest(url:String, params:Array<String>, files:Array<File>){
    return new Promise((resolve, reject)=>{
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      for(var i = 0; i<files.length;i++){
            formData.append('uploads', files[i]);
      }
      
      xhr.open("POST", url, true);
      xhr.send(formData);
    });
  }
}
