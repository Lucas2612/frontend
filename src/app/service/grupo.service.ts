import { Injectable } from '@angular/core';
import { Grupo } from '../entity/grupo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  private baseUrl = 'http://localhost:8080/api/grupos';

  constructor(private httpClient: HttpClient) { }

  getGrupoCarrinhos(): Observable<Grupo[]> {
    return this.httpClient.get<Grupo[]>(this.baseUrl)
    ;
  }
}
