import { Component, OnInit } from '@angular/core';
import { DatosUsuario } from '../../model/user.interface';
import { AdministradorService } from '../../services/administrador.service';
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-cliente-administrador',
  templateUrl: './cliente-administrador.page.html',
  styleUrls: ['./cliente-administrador.page.scss'],
})
export class ClienteAdministradorPage implements OnInit {
  usuarios: DatosUsuario[];
  pageActual: number= 1;
  constructor(private Service: AdministradorService,
    private router: Router,private Servicio:AuthService,private alertCtrl: AlertController,) { 
    this.Service.getUsuarios().subscribe((usuarios) =>{

      this.usuarios = usuarios;
    })
  }

  ngOnInit() {
  }

  buscar(busquedanombre){
    console.log(busquedanombre.value);
    this.Service.busquedauser(busquedanombre.value).subscribe((usuarios) =>{
      this.usuarios = usuarios;


    })
  }

  
  redihome(){
    this.router.navigate(['menu-administrador']);
  }


  rediperfil(){
    this.router.navigate(['perfil-administrador']);
  }

  redicrearadm(){
    this.router.navigate(['registro-administrador']);
  }

  reditienda(){
    this.router.navigate(['tienda-administrador']);
  }

  rediusuario(){
    this.router.navigate(['cliente-administrador']);
  }
  salir(){
    this.Servicio.logout();
  }

  async mensajeconfirmacionsalir() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      message: '¿Seguro de cerrar sesión?',
      buttons: [
       {
          text: 'Aceptar',
          handler: () => {
            this.salir();
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            console.log();
          }
        }
      ]
    });
    await alert.present();
  }

}
