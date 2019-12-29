import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CarrinhoService } from '../../service/carrinho.service';
import { Cart } from 'src/app/entity/cart';
import { Usuario } from 'src/app/entity/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { ItemService } from 'src/app/service/item.service';
import { Item } from 'src/app/entity/item';
import { ItemCart } from 'src/app/entity/itemCart';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  cart = new Cart();
  item = new Item();
  usuario: Usuario;
  id;
  selectedItem: number;
  items: Item[];



  constructor(private route: ActivatedRoute,
              private carrinhoService: CarrinhoService, private usuarioService: UsuarioService,
              private itemService: ItemService,
              private location: Location) { }

  ngOnInit() {
    this.getCart();
    this.listItems();

  }

  getCart() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.usuarioService.getUsuario(id).subscribe(
      usuario => {this.usuario = usuario; }
    );
    this.carrinhoService.getCarrinho(id).subscribe(
      cart => {this.cart = cart;
      }
    );
  }


  listItems() {
    this.itemService.getItemList().subscribe(
      data => {this.items = data;
      }
    );
  }

   addItem() {
    this.getCart();
    if (this.selectedItem) {
        if (this.cart.idUsuario === this.usuario.id) {
          console.log(this.cart);
        } else {
          // Post - Cart is empty
          this.cart = new Cart();
          this.cart.idUsuario = this.usuario.id;
          this.cart.itemCarts = [];
          const itemCart = new ItemCart();
          itemCart.idItem = this.selectedItem;
          itemCart.qtde = 1;
          this.carrinhoService.addItemCarrinho(this.cart).subscribe(
              cart => {this.cart = cart; }
            );
        }
      // post
      // else
      // put

      /* this.cart.idUsuario = 10;

      const itemCart = new ItemCart();
      itemCart.idItem = 12;
      itemCart.qtde = 1;
      this.cart.itemCarts.push(itemCart);
      itemCart.idItem = 4;
      itemCart.qtde = 1;
      this.cart.itemCarts.push(itemCart);

      console.log(this.cart);
      // Item {id: "99", nome: "testet", valor: "50"}
      console.log(this.item);

      this.carrinhoService.addItemCarrinho(this.cart).subscribe(

      ); */

    }
  }
  changeItem() {
    this.selectedItem = +this.selectedItem;
  }
}
