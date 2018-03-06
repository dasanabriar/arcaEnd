
import { Injectable } from '@angular/core';
import { User } from '../entity/user';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService{
 private urlEndPoint:string = 'http://localhost:8080/api/login';
 private httpHeaders = new HttpHeaders({'conten-Type' : 'aplication/json'})

 constructor(private http: HttpClient){}

 loginAction(user:User): Observable<User>{
   console.log(user);
   return this.http.get<User>(`${this.urlEndPoint}/${user.userName}/${user.password}`);
 }
}
