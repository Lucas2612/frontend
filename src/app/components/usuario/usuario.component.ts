import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Usuario } from 'src/app/entity/usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[];
  novoUsuario = new Usuario();

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.listUsuarios();
  }

  listUsuarios() {
    this.usuarioService.getUsuarioList().subscribe(
      data => {
        this.usuarios = data;
      }
    );
  }

  insertNewUsuario() {
    // Calling the service to insert new usuario
    this.usuarioService.insertNewUsuario(this.novoUsuario).
    subscribe(novoUsuario => this.usuarios.push(novoUsuario));
    this.novoUsuario = new Usuario();
  }

  deleteUsuario(deletedUsuario: Usuario): void {
    this.usuarios = this.usuarios.filter(h => h !== deletedUsuario);
    this.usuarioService.deleteUsuario(deletedUsuario).subscribe();
  }

  updateUsuario(updatedUsuario: Usuario): void {
    this.usuarioService.updateUsuario(updatedUsuario)
      .subscribe();
  }

}
