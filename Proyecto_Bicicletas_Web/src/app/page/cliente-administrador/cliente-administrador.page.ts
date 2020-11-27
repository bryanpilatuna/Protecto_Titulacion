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
  pageActual: number= 1;
  constructor(private Service: AdministradorService) { 
    this.Service.getUsuarios().subscribe((usuarios) =>{

      this.usuarios = usuarios;
    })
  }

  ngOnInit() {
  }

  buscar(busquedanombre){
    this.Service.busquedauser(busquedanombre.value).subscribe((usuarios) =>{
      this.usuarios = usuarios;
      console.log(usuarios);

    })
  }

}
