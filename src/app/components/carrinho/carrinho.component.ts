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
import { MessageService } from 'src/app/service/message.service';

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
              private messageService: MessageService
              ) { }

  ngOnInit() {
    this.getCart();
    this.getUsuario();
    this.listItems();
    this.messageService.clear();
    console.log('Carrinho init');
  }

  getUsuario() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.usuarioService.getUsuario(id).subscribe(
    usuario => {this.usuario = usuario; }
    );
  }

  getCart() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.carrinhoService.getCarrinho(id).subscribe(
      cart => {this.cart = cart;
               this.updateItems();
      });
    console.log(this.cart);
  }

  updateItems() {
    if (this.cart !== null) {
      for (const itemCart of this.cart.itemCarts) {
        this.itemService.getItem(itemCart.item.id).subscribe(
          data => {itemCart.item = data; }
        );
      }
    }
  }

  listItems() {
    this.itemService.getItemList().subscribe(
      data => {this.items = data;
      }
    );
  }

  removeItem() {
    this.getCart();
    if (this.selectedItem) {

      if (this.cart !== null) {
        let i = 0;
        console.log(this.cart);
        for (const itemCart of this.cart.itemCarts) {
          if (itemCart.item.id === this.selectedItem) {
            // item exists
            // verify if ==1
            if (itemCart.qtde === 1) {
              // remove
              this.cart.itemCarts.splice(i, 1);
            } else {
              // minus 1
              itemCart.qtde -= 1;
            }
          }
          i++;
        }
        if (this.cart.itemCarts.length === 0) {
          // remove cart
          this.carrinhoService.deleteCart(this.cart).subscribe(
            cart => { this.cart = new Cart(); }
          );
        } else {
          // put
          this.carrinhoService.changeQtde(this.cart).subscribe(
            cart => {this.cart = cart; }
        );
        }
        console.log(this.cart);
      }
    }
  }

  addItem() {
  this.getCart();
  if (this.selectedItem) {
    console.log('selecteditem: ' + this.selectedItem);
    // cart exists
    console.log('cart: ' + this.cart);
    if (this.cart !== null) {
      // check if item exists
      for (const itemCart of this.cart.itemCarts) {
        if (itemCart.item.id === this.selectedItem) {
          console.log('item exists');
          itemCart.qtde += 1;
          this.carrinhoService.changeQtde(this.cart).subscribe(
            cart => {this.cart = cart; }
        );
          this.getCart();
          return;
        }
      }

      console.log('item doesnt exist');
      // item doesn't exist
      const newItemCart = new ItemCart();
      newItemCart.item.id = this.selectedItem;
      newItemCart.qtde = 1;
      this.cart.itemCarts.push(newItemCart);
      this.carrinhoService.changeQtde(this.cart).subscribe(
        cart => {this.cart = cart; }
    );


      console.log(this.cart);
      } else {
        // Post - Cart is empty
        this.cart = new Cart();
        this.cart.id = this.usuario.id;
        this.cart.itemCarts = [];
        const newItemCart = new ItemCart();
        newItemCart.item.id = this.selectedItem;
        newItemCart.qtde = 1;
        this.cart.itemCarts.push(newItemCart);
        this.carrinhoService.addItemNovoCarrinho(this.cart).subscribe(
            cart => {this.cart = cart; }
        );
      }
    }
  this.getCart();
  }

  changeItem() {
    this.selectedItem = +this.selectedItem;
  }
}
