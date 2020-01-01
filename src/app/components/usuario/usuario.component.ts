import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Usuario } from 'src/app/entity/usuario';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[];
  novoUsuario = new Usuario();
  searchText;

  constructor(private usuarioService: UsuarioService, private messageService: MessageService) { }

  ngOnInit() {
    this.listUsuarios();
    this.messageService.clear();
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
    let valid = true;
    for (const tempUsuario of this.usuarios) {
       if (tempUsuario.nome === this.novoUsuario.nome) {
         this.messageService.add('nome de usuário já existente');
         valid = false;
       }
       if (tempUsuario.id === +this.novoUsuario.id) {
         this.messageService.add('Id de usuário já existente');
         valid = false;
       }
    }

    // test email
    if (!this.validateEmail(this.novoUsuario.email)) {
      this.messageService.add('Inserir email no formato correto');
      valid = false;
    }
    if (valid) {
      this.usuarioService.insertNewUsuario(this.novoUsuario).
      subscribe(novoUsuario => this.usuarios.push(novoUsuario));
      this.novoUsuario = new Usuario();
    }
  }

   validateEmail(email: string) {
    // const regexp = new RegExp('^[a-zA-Z]{1}([a-zA-Z]|\d|\W)*@([a-zA-Z]|\d)+.([a-zA-Z])+$');
    const regexp = new RegExp(`^[a-zA-Z]{1}[a-zA-A0-9_|\\.]*@[a-zA-Z0-9_]*\\.[a-zA-Z0-9_]+$`);
    const result = regexp.test(email);
    return result;
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
