import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Compra } from '../entity/compra';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private baseUrl = 'http://localhost:8080/api/compras';

  constructor(private httpClient: HttpClient) { }

  getCompraList(usuarioId: number): Observable<Compra[]> {
    console.log(usuarioId);
    return this.httpClient.get<Compra[]>(`${this.baseUrl}/${usuarioId}`)
    ;
  }
}
