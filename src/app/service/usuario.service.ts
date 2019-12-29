import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Usuario } from '../entity/usuario';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = 'http://localhost:8080/api/usuarios';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }

  // GET Method - List all
  getUsuarioList(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.baseUrl);
  }

  // GET Method - One
  getUsuario(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.baseUrl}/${id}`);
  }

  // POST Method - insert new usuario
  insertNewUsuario(newUsuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.baseUrl, newUsuario, this.httpOptions);

  }

  // DELETE
  deleteUsuario(usuario: Usuario | number) {
    const id = typeof usuario === 'number' ? usuario : usuario.id;
    const url = `${this.baseUrl}/${id}`;

    return this.httpClient.delete<Usuario>(url, this.httpOptions);
  }

  // UPDATE
  updateUsuario(updatedUsuario: Usuario): Observable<any> {
    return this.httpClient.put(this.baseUrl, updatedUsuario, this.httpOptions);
  }
}
