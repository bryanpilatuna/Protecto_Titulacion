import { Component, OnInit } from '@angular/core';
import { DatosUsuario } from '../../model/user.interface';
import { AdministradorService } from '../../services/administrador.service';
@Component({
  selector: 'app-cliente-administrador',
  templateUrl: './cliente-administrador.page.html',
  styleUrls: ['./cliente-administrador.page.scss'],
})
export class ClienteAdministradorPage implements OnInit {
  usuarios: DatosUsuario[];
  constructor(private Service: AdministradorService) { 
    this.Service.getUsuarios().subscribe((usuarios) =>{
      console.log('Todoss', usuarios);
      this.usuarios = usuarios;
    })
  }

  ngOnInit() {
  }

}
