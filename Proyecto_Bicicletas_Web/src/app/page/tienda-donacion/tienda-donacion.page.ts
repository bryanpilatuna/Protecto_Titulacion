import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { datosDonacion } from '../../model/donacion.interface';
import { Notificaciones} from '../../model/notificaciones.interface';
import {DonacionesService} from '../../services/donaciones.service';
import { DatosUsuario } from '../../model/user.interface';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tienda-donacion',
  templateUrl: './tienda-donacion.page.html',
  styleUrls: ['./tienda-donacion.page.scss'],
})
export class TiendaDonacionPage implements OnInit {
  tiendaid=null;
  false=false;
  true=true;
  donaciones:datosDonacion[];
  usuarios:DatosUsuario[];
  notificaciones:Notificaciones[];
  fechaactual: Date = new Date();

 
  constructor(private route: ActivatedRoute,
    public alertController: AlertController,
    private donacionesservice: DonacionesService,private router: Router,
    private Service: AuthService,) {
      var user = firebase.auth().currentUser.uid;
      this.tiendaid = user;

      this.donacionesservice.getUsuarios().subscribe((usuarios) =>{
        this.usuarios = usuarios;

      })
     }

  ngOnInit() {
  //this.tiendaid=this.route.snapshot.params['id'];
  this.donacionesservice.getDonacionTienda(this.tiendaid).subscribe((donaciones) =>{
  this.donaciones = donaciones;  
 
  })
  }

  
  redihome(){
    this.router.navigate(['/menu-tienda']);
  }
  
  rediperfil(){
    this.router.navigate(['/editar-tienda']);
  
  
  }
  redibicicletas(){
    this.router.navigate(['/mis-bicis']);
  }
  redidonaciones(){
    this.router.navigate(['/tienda-donacion']);
  }
  redialquileres(){
    this.router.navigate(['/tienda-alquiler']);
  }
  
  redinotifi(){
    this.router.navigate(['/notificaciones-tienda']);
      
  
  
  }
  salir(){
  
    this.Service.logout();
  }
 

}
