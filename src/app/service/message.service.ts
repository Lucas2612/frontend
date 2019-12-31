import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  message;

  add(messagem: string) {

    this.message = messagem;
  }

  clear() {
    this.message = '';
  }

}
