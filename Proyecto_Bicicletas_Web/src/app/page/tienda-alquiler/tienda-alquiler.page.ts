import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { datosAlquiler } from '../../model/alquiler.interface';
import { DatosUsuario } from '../../model/user.interface';
import { Notificaciones } from '../../model/notificaciones.interface';
import {AlquileresService} from '../../services/alquileres.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tienda-alquiler',
  templateUrl: './tienda-alquiler.page.html',
  styleUrls: ['./tienda-alquiler.page.scss'],
})
export class TiendaAlquilerPage implements OnInit {
  tiendaid=null;
  alquileres:datosAlquiler[];
  usuarios:DatosUsuario[];
  fechaactual: Date = new Date();

  notificacion:Notificaciones={
    respuesta:'',
    visualizar:'',
    fecha: this.fechaactual,
    tipo:'Alquiler',
    idusuario:'',
    idalquiler:'',
  }

  alquiler:datosAlquiler={
    idusuario:'',
    idtienda: '',
    fechadevolucion: this.fechaactual,
    fechaalquiler: this.fechaactual,
    bicicleta: '',
    fecha: this.fechaactual,
    aprobacion: false,
    anular:false
  }

  constructor(private route: ActivatedRoute,
    private alquilerservice: AlquileresService,
    private router: Router) { 
      var user = firebase.auth().currentUser.uid;
      this.tiendaid = user;

      this.alquilerservice.getUsuarios().subscribe((usuarios) =>{
        this.usuarios = usuarios;

      })

    }

  ngOnInit() {
  this.alquilerservice.getalquileresTienda(this.tiendaid).subscribe((alquileres) =>{
  this.alquileres = alquileres;  
 
  })

  }

  updateAlquiler(acalquiler:datosAlquiler,id:string){
  acalquiler.aprobacion=true;
  this.alquilerservice.actualizarAlquiler(acalquiler,id).then(() => {
  this.router.navigate(['/tienda-alquiler',this.tiendaid]);
  
    });

    
  }

  aprobaralquiler(alquiler:datosAlquiler,id:string){
    alquiler.aprobacion=true;
    this.notificacion.respuesta='Tu Alquiler ha sido aprobado';
    this.notificacion.visualizar='No';
    this.notificacion.idusuario=alquiler.idusuario;
    this.notificacion.idalquiler=alquiler.id;
    this.alquilerservice.addNotificacion(this.notificacion);

    this.alquilerservice.actualizarAlquiler(alquiler,id).then(() => {
      this.router.navigate(['/tienda-alquiler',this.tiendaid]);
    });

   
  }

  rechazaralquiler(alquiler:datosAlquiler,id:string){ 
    this.notificacion.respuesta='Tu Alquiler ha sido rechazado';
    this.notificacion.visualizar='No';
    this.notificacion.idusuario=alquiler.idusuario;
    this.notificacion.idalquiler=alquiler.id;
    this.alquilerservice.addNotificacion(this.notificacion);
    alquiler.aprobacion=false;
    alquiler.anular=true;
    this.alquilerservice.actualizarAlquiler(alquiler,id).then(() => {
      this.router.navigate(['/tienda-alquiler',this.tiendaid]);
    });

  }

}
