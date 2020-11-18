import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { datosDonacion } from '../../model/donacion.interface';
import { Notificaciones} from '../../model/notificaciones.interface';
import {DonacionesService} from '../../services/donaciones.service';
import { DatosUsuario } from '../../model/user.interface';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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

  donacion:datosDonacion={
    iddonante:'',
    fechadonacion:this.fechaactual,
    estado:'',
    descripcion:'',
    aprobacion:false,
    idtienda:'',
    anular:false,

  }

  notificacion:Notificaciones={
    respuesta:'',
    visualizar:'',
    fecha: this.fechaactual,
    tipo:'donacion',
    idusuario:'',
    idtipo:'',
    color:'##D7F6FC',
    
  }
  constructor(private route: ActivatedRoute,
    public alertController: AlertController,
    private donacionesservice: DonacionesService,
    private router: Router) {
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

  updateDonacion(acdonacion:datosDonacion,iddonacion:string){
    acdonacion.aprobacion=true;
    this.donacionesservice.actualizarDonacion(acdonacion,iddonacion).then(() => {
      this.router.navigate(['/tienda-donacion',this.tiendaid]);
      
    });
    

  }

  aprobar(donacion:datosDonacion,id:string){
    donacion.aprobacion=true;
    this.notificacion.respuesta='Tu donación ha sido aprobado, en breve nos pondremos en contacto contigo';
    this.notificacion.visualizar='No';
    this.notificacion.idusuario=donacion.iddonante;
    this.notificacion.idtipo=donacion.id;
    this.donacionesservice.addNotificacion(this.notificacion);


    this.donacionesservice.actualizarDonacion(donacion,id).then(() => {
      this.router.navigate(['/tienda-donacion',this.tiendaid]);
    });

      }

  rechazar(donacion:datosDonacion,id:string){
    if(this.notificacion.respuesta=='')   {
      this.presentAlert();

    }
    else{
      donacion.aprobacion=false;
      donacion.anular=true;
      this.notificacion.visualizar='No';
      this.notificacion.idusuario=donacion.iddonante;
      this.notificacion.idtipo=donacion.id;
      this.donacionesservice.addNotificacion(this.notificacion);
      this.notificacion.respuesta='';
      this.donacionesservice.actualizarDonacion(donacion,id).then(() => {
        this.router.navigate(['/tienda-donacion',this.tiendaid]);
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
