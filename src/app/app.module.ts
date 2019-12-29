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

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    UsuarioComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ItemService, UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
