import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompraService } from 'src/app/service/compra.service';
import { Compra } from 'src/app/entity/compra';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  compras;
  usuario;

  constructor(private route: ActivatedRoute,
              private compraService: CompraService,
              private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.getCompras();
    this.getUsuario();
  }

  getCompras() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.compraService.getCompraList(id).subscribe(
      compras => {this.compras = compras;
      });
    console.log(this.compras);
  }

  getTotal(): number {
    let total = 0;
    for (const compra of this.compras) {
      total = total + compra.valorTotal;
    }
    return total;
  }

  getUsuario() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.usuarioService.getUsuario(id).subscribe(
    usuario => {this.usuario = usuario; }
    );
  }
}
