import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {HttpClientModule } from '@angular/common/http';
import { ItemService } from './service/item.service';
import { ItemComponent } from './components/item/item.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioService } from './service/usuario.service';
import { AppRoutingModule } from './app-routing.module';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageService } from './service/message.service';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { CarrinhoService } from './service/carrinho.service';
import { CompraComponent } from './components/compra/compra.component';
import { CompraService } from './service/compra.service';
import { GrupoComponent } from './components/grupo/grupo.component';
import { GrupoService } from './service/grupo.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    UsuarioComponent,
    MessagesComponent,
    CarrinhoComponent,
    CompraComponent,
    GrupoComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    Ng2SearchPipeModule
  ],
  providers: [ItemService, UsuarioService, MessageService,
    CarrinhoService, CompraService, GrupoService, CarrinhoComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
