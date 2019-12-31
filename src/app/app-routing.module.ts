import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemComponent } from './components/item/item.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { CompraComponent } from './components/compra/compra.component';
import { GrupoComponent } from './components/grupo/grupo.component';

const routes: Routes = [
  { path: '', redirectTo: '/item', pathMatch: 'full' },
  { path: 'item', component: ItemComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'carrinho/:id', component: CarrinhoComponent },
  { path: 'compra/:id', component: CompraComponent },
  { path: 'grupo', component: GrupoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
