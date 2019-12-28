import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Item } from '../entity/item';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

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

  constructor(private httpClient: HttpClient) { }

  // GET Method - List all
  getItemList(): Observable<Item> {
    return this.httpClient.get<Item>(this.baseUrl);
  }

  // POST Method - insert new item
  insertNewItem(newItem: Item): Observable<Item> {
    return this.httpClient.post<Item>(this.baseUrl, newItem, this.httpOptions);

  }

  // DELETE
  deleteItem(item: Item | number) {
    const id = typeof item === 'number' ? item : item.id;
    const url = `${this.baseUrl}/${id}`;

    return this.httpClient.delete<Item>(url, this.httpOptions);
  }

  // UPDATE
  updateItem(updatedItem: Item): Observable<any> {
    return this.httpClient.put(this.baseUrl, updatedItem, this.httpOptions);
  }

  /* insertNewItem(newItem: Item){

    console.log(this.httpClient.post<Item>(this.baseUrl, newItem, this.httpOptions));
  }
 */
 /*  getItemList(): Observable<Item[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.items)
    );
  } */
}





interface GetResponse {
  _embedded: {
    items: Item[];
  };
}
