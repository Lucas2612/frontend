import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Item } from '../entity/item';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../service/message.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private baseUrl = 'http://localhost:8080/api/items';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  // GET Method - List all
  getItemList(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(this.baseUrl)
    .pipe(
      catchError(this.handleError<Item[]>('ListItems', []))
    );
  }

  // GET Method - one
  getItem(idItem: number): Observable<Item> {
    return this.httpClient.get<Item>(`${this.baseUrl}/${idItem}`)
    .pipe(
      catchError(this.handleError<Item>('get Item'))
    );
  }

  // POST Method - insert new item
  insertNewItem(newItem: Item): Observable<Item> {
    console.log(newItem);
    return this.httpClient.post<Item>(this.baseUrl, newItem, this.httpOptions)
    .pipe(
      tap(_ => this.messageService.add(`inserted item id=${newItem.id}`)),
      catchError(this.handleError<Item>('inserting Item'))
    )
    ;
  }

  // DELETE
  deleteItem(item: Item | number) {
    const id = typeof item === 'number' ? item : item.id;
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete<Item>(url, this.httpOptions).pipe(
    tap(_ => this.messageService.add(`deleted item id=${id}`)),
      catchError(this.handleError<Item>('deleting item'))
    );
  }

  // UPDATE
  updateItem(updatedItem: Item): Observable<any> {
    return this.httpClient.put(this.baseUrl, updatedItem, this.httpOptions).pipe(
    tap(_ => this.messageService.add(`updated item id=${updatedItem.id}`)),
      catchError(this.handleError<any>('deleting item'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // sending  message
      // console.error(error);
      this.messageService.add(`${operation} failed`);
      return null;
    };
  }
}

