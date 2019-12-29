import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cart } from '../entity/cart';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';
import { ItemCart } from '../entity/itemCart';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private baseUrl = 'http://localhost:8080/api/carrinhos';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  getCarrinho(usuarioId: number): Observable<Cart> {
    return this.httpClient.get<Cart>(this.baseUrl).pipe(
      catchError(this.handleError<Cart>('getCart'))
    );
  }

  /* getItemCartList(idUsuario: number): Observable<ItemCart[]> {
    return this.httpClient.get<ItemCart[]>(`${this.itemCartUrl}/${idUsuario}`)
    .pipe(
      catchError(this.handleError<ItemCart[]>('ListCartItems', []))
    );
  } */

  // POST Method - insert new carrinho
  addItemCarrinho(newCarrinho: Cart): Observable<Cart> {
    return this.httpClient.post<Cart>(this.baseUrl, newCarrinho, this.httpOptions)
    ;
  }

 /*  insertNewItem(newItem: Item): Observable<Item> {
    console.log(newItem);
    return this.httpClient.post<Item>(this.baseUrl, newItem, this.httpOptions)
    ;
  } */

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // sending  message
      console.error(error);
      this.messageService.add(`${operation} failed`);
      return of(result as T);
    };
  }

}
