import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../entity/user';
import { Injectable } from '@angular/core';
import { City } from '../entity/city';
import { Favorite } from '../entity/favorite';

@Injectable()
export class UserService {

  
  private urlEndPoint:string = 'http://localhost:8080/api/getUserByCityAndTypeAndPreferences'; 
  private urlEndPointFinal:string = 'http://localhost:8080/api/'; 
  private httpHeaders = new HttpHeaders({'conten-Type' : 'aplication/json'})

  constructor(private http: HttpClient) { }

 /** GET heroes from the server */
  getUsers(city : City, userType, preferences): Observable<User[]> {
    return this.http.get<User[]>(`${this.urlEndPoint}/${city.idCity}/${userType}/${preferences}`, {headers: this.httpHeaders});
  }

  getUsersByIds(idUsers): Observable<User[]> {
    return this.http.get<User[]>(`${this.urlEndPointFinal + "getFavorites"}/${idUsers}`, {headers: this.httpHeaders});
  }
  
  addFavorite(favorite: Favorite): Observable<Favorite>{
    if(favorite.idFavorite == undefined){
      return this.http.post<Favorite>(`${this.urlEndPointFinal + "saveFavorite"}` , favorite, {headers: this.httpHeaders});
    } else {
      return this.http.put<Favorite>(`${this.urlEndPointFinal + "updateFavorite"}`, favorite, {headers: this.httpHeaders});
    }
    
  }
}
