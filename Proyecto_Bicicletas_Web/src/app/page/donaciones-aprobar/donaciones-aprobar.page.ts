import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { datosDonacion } from '../../model/donacion.interface';
import { Notificaciones} from '../../model/notificaciones.interface';
import {DonacionesService} from '../../services/donaciones.service';
import { NotificacionesTienda}from '../../model/notificaciones.interface';
import {NotificacionesService} from '../../services/notificaciones.service';
import { DatosUsuario } from '../../model/user.interface';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-donaciones-aprobar',
  templateUrl: './donaciones-aprobar.page.html',
  styleUrls: ['./donaciones-aprobar.page.scss'],
})
export class DonacionesAprobarPage implements OnInit {
  tiendaid=null;
  notificacionesAlqui:NotificacionesTienda[];
  numeroalqui=0;
  false=false;
  true=true;
  pageActual: number= 1;
  donaciones:datosDonacion[];
  usuarios:DatosUsuario[];
  notificaciones:Notificaciones[];
  fechaactual: Date = new Date();

  donacion:datosDonacion={
    iddonante:'',
    fechadonacion:this.fechaactual,
    fechasolicitud:this.fechaactual,
    estado:'',
    descripcion:'',
    aprobacion:false,
    idtienda:'',
    anular:false,
    modo:'',
    direccion:'',
    respuesta:'',
  }

  notificacion:Notificaciones={
    respuesta:'',
    visualizar:'',
    fecha: this.fechaactual,
    tipo:'donacion',
    idusuario:'',
    idtipo:'',
    color:'#D7F6FC',
    idtienda:'',
    
  }
  constructor(private route: ActivatedRoute,
    public alertController: AlertController,
    private notificacionesService:NotificacionesService,
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
    this.donaciones = donaciones.filter(donaciones=>donaciones.aprobacion==false && donaciones.anular==false); 
   
    })

    
    //this.desactivarnoti();
  }
  notificacionesalquiler(){
    this.notificacionesService.getMisnotificaciones(this.tiendaid).subscribe((notificaciones) =>{
      this.notificacionesAlqui=notificaciones.filter(notificaciones=>notificaciones.visualizar=='No' && notificaciones.tipo=='Donacion');
      this.numeroalqui=this.notificacionesAlqui.length;
      for (let index = 0; index < this.numeroalqui; index++) {
        this.notificacionesAlqui[index].visualizar='Si';
        this.notificacionesService.updateNotificacion(this.notificacionesAlqui[index],this.notificacionesAlqui[index].id)
        
      }
    })
  }

  

  updateDonacion(acdonacion:datosDonacion,iddonacion:string){
    acdonacion.aprobacion=true;
    this.donacionesservice.actualizarDonacion(acdonacion,iddonacion).then(() => {
      this.router.navigate(['/tienda-donacion']);
      
    });
    

  }

  aprobar(donacion:datosDonacion,id:string){
    donacion.aprobacion=true;
    this.notificacion.idtienda=this.tiendaid;
    this.notificacion.respuesta='Tu donación ha sido aprobado, en breve nos pondremos en contacto contigo';
    this.notificacion.visualizar='No';
    this.notificacion.idusuario=donacion.iddonante;
    this.notificacion.idtipo=donacion.id;
    donacion.respuesta='Aprobada';
    this.donacionesservice.addNotificacion(this.notificacion);
    this.notificacion.respuesta='';
    
    this.donacionesservice.actualizarDonacion(donacion,id).then(() => {
      //this.notificacionesalquiler();
      this.router.navigate(['/tienda-donacion']);
    });

      }

  rechazar(donacion:datosDonacion,id:string){
    if(this.notificacion.respuesta=='')   {
      this.presentAlert();

    }
    else{
      //this.notificacionesalquiler();
      donacion.aprobacion=false;
      donacion.anular=true;
      this.notificacion.idtienda=this.tiendaid;
      this.notificacion.visualizar='No';
      this.notificacion.idusuario=donacion.iddonante;
      this.notificacion.idtipo=donacion.id;
      donacion.respuesta=this.notificacion.respuesta;
      
      this.donacionesservice.addNotificacion(this.notificacion);
      this.notificacion.respuesta='';
      this.donacionesservice.actualizarDonacion(donacion,id).then(() => {
        this.router.navigate(['/tienda-donacion']);
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
