import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { ShoppingCart } from '../entity/shoppingcart';
import { Contract } from '../entity/contract';
import { Injectable } from '@angular/core';



@Injectable()
export class ShoppingCartService {

  private urlEndPointFinal:string = 'http://localhost:8080/api/'; 
  private httpHeaders = new HttpHeaders({'conten-Type' : 'aplication/json'})

  constructor(private http: HttpClient) { }

 /** GET shoppingCart from the server */
getShoppingCart(idUsers): Observable<ShoppingCart> {
    return this.http.get<ShoppingCart>(`${this.urlEndPointFinal+ "getShoppingCartByIdUsersAndStatusActive"}/${idUsers}`,
     {headers: this.httpHeaders});
}

saveShoppingCart(shoppingCart: ShoppingCart): Observable<ShoppingCart>{
    console.log("save Shopping cart " + shoppingCart);
    return this.http.post<ShoppingCart>(`${this.urlEndPointFinal + "saveShoppingCart"}` , shoppingCart, {headers: this.httpHeaders});
}

deleteContract(contract: Contract): Observable<Contract>{
    console.log("delete contract " + contract);
    return this.http.delete<Contract>(`${this.urlEndPointFinal + "deleteContract"}/${contract.idContract}`,  {headers: this.httpHeaders});
}

}