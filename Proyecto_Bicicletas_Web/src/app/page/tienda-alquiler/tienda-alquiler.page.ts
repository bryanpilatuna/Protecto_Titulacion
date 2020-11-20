import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { datosAlquiler } from '../../model/alquiler.interface';
import { DatosUsuario } from '../../model/user.interface';
import { Notificaciones } from '../../model/notificaciones.interface';
import {AlquileresService} from '../../services/alquileres.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
    tipo:'alquiler',
    idusuario:'',
    idtipo:'',
    color:'#D7F6FC',
    idtienda:'',
  }

  alquiler:datosAlquiler={
    idusuario:'',
    idtienda: '',
    fechadevolucion: this.fechaactual,
    fechaalquiler: this.fechaactual,
    bicicleta: '',
    fecha: this.fechaactual,
    aprobacion: false,
    anular:false,
    horaalquiler:'',
    horadevolucion:'',
  }

  constructor(private route: ActivatedRoute,
    public alertController: AlertController,
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
    this.notificacion.idtienda=this.tiendaid;
    this.notificacion.respuesta='Tu Alquiler ha sido aprobado';
    this.notificacion.visualizar='No';
    this.notificacion.idusuario=alquiler.idusuario;
    this.notificacion.idtipo=alquiler.id;
    this.alquilerservice.addNotificacion(this.notificacion);
    this.notificacion.respuesta='';

    this.alquilerservice.actualizarAlquiler(alquiler,id).then(() => {
      this.router.navigate(['/tienda-alquiler',this.tiendaid]);
    });

   
  }

  rechazaralquiler(alquiler:datosAlquiler,id:string){ 
    if(this.notificacion.respuesta=='')   {
      this.presentAlert();

    }else{
    this.notificacion.visualizar='No';
    this.notificacion.idusuario=alquiler.idusuario;
    this.notificacion.idtipo=alquiler.id;
    this.notificacion.idtienda=this.tiendaid;
    this.alquilerservice.addNotificacion(this.notificacion);
    this.notificacion.respuesta='';
    alquiler.aprobacion=false;
    alquiler.anular=true;
    this.alquilerservice.actualizarAlquiler(alquiler,id).then(() => {
      this.router.navigate(['/tienda-alquiler',this.tiendaid]);
    });
  }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atención',
      message: 'Por favor ingresa el motivo del rechazo',
      buttons: ['OK']
    });

    await alert.present();
  }


}
