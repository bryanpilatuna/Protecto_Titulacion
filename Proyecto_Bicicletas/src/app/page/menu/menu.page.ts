import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import {User} from '../../model/user.interface';
import {UsuarioService} from '../../service/usuario.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  name: string;
  id: string;
  usuarios: User[];
  constructor(private authservice : AuthService, private router: Router,private usuarioService:UsuarioService) { }

  ngOnInit() {
    
    this.authservice.getUsuario().subscribe(user => {
      this.id = user.uid;
      //this.name = user.displayName;
    });

    /*this.usuarioService.getUsuarios().subscribe((usuarios) =>{
      console.log('Usuarios', usuarios);
      this.usuarios = usuarios;
    
    })*/
  }

  pageperfile(){
    this.router.navigate(['profile']);
  }
  salir(){
    this.authservice.logout();
  }

}
