import { Component, OnInit } from '@angular/core';
import { Grupo } from 'src/app/entity/grupo';
import { GrupoService } from 'src/app/service/grupo.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {

  grupos: Grupo[];
  constructor(private grupoService: GrupoService) { }

  ngOnInit() {
    this.getGrupos();
  }

  getGrupos() {
    this.grupoService.getGrupoCarrinhos().subscribe(
      grupos => {this.grupos = grupos;
      });
  }

  getTotal(): number {
    let total = 0;
    for (const grupo of this.grupos) {
      total = total + grupo.valorTotal;
    }
    return total;
  }
}
