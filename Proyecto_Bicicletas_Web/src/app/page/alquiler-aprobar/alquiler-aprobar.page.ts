import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { datosAlquiler } from '../../model/alquiler.interface';
import { DatosUsuario } from '../../model/user.interface';
import { Notificaciones } from '../../model/notificaciones.interface';
import { NotificacionesTienda}from '../../model/notificaciones.interface';
import {AlquileresService} from '../../services/alquileres.service';
import {NotificacionesService} from '../../services/notificaciones.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-alquiler-aprobar',
  templateUrl: './alquiler-aprobar.page.html',
  styleUrls: ['./alquiler-aprobar.page.scss'],
})
export class AlquilerAprobarPage implements OnInit {
  tiendaid=null;
    notificacionesAlqui:NotificacionesTienda[];
  alquileres:datosAlquiler[];
  numeroalqui=0;
  usuarios:DatosUsuario[];
  pageActual: number= 1;
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
    respuesta:'',
  }
  constructor(private route: ActivatedRoute,
    public alertController: AlertController,
    private alquilerservice: AlquileresService,
    private notificacionesService:NotificacionesService,
    private router: Router) { 
      var user = firebase.auth().currentUser.uid;
      this.tiendaid = user;

      this.alquilerservice.getUsuarios().subscribe((usuarios) =>{
        this.usuarios = usuarios;

      })

    }

    ngOnInit() {
      this.alquilerservice.getalquileresTienda(this.tiendaid).subscribe((alquileres) =>{
      this.alquileres = alquileres.filter(alquileres=>alquileres.aprobacion==false &&alquileres.anular==false );
     
      })
      

///////////Desactivar notificaciones
      }
      notificacionesalquiler(){
        this.notificacionesService.getMisnotificaciones(this.tiendaid).subscribe((notificaciones) =>{
          this.notificacionesAlqui=notificaciones.filter(notificaciones=>notificaciones.visualizar=='No' && notificaciones.tipo=='Alquiler');
          this.numeroalqui=this.notificacionesAlqui.length;
          for (let index = 0; index < this.numeroalqui; index++) {
            this.notificacionesAlqui[index].visualizar='Si';
            this.notificacionesService.updateNotificacion(this.notificacionesAlqui[index],this.notificacionesAlqui[index].id)
            
          }
        })
      }
     
    
      updateAlquiler(acalquiler:datosAlquiler,id:string){
       
      acalquiler.aprobacion=true;
      this.alquilerservice.actualizarAlquiler(acalquiler,id).then(() => {
      this.router.navigate(['/tienda-alquiler']);
      
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
        alquiler.respuesta='Alquiler Aprobado';
        //this.notificacionesalquiler();
        this.alquilerservice.actualizarAlquiler(alquiler,id).then(() => {
          this.router.navigate(['/tienda-alquiler']);
        });
    
       
      }
    
      rechazaralquiler(alquiler:datosAlquiler,id:string){ 
        if(this.notificacion.respuesta=='')   {
          this.presentAlert();
    
        }else{
         // this.notificacionesalquiler();
        this.notificacion.visualizar='No';
        this.notificacion.idusuario=alquiler.idusuario;
        this.notificacion.idtipo=alquiler.id;
        this.notificacion.idtienda=this.tiendaid;
        alquiler.respuesta=this.notificacion.respuesta;
        this.alquilerservice.addNotificacion(this.notificacion);
        this.notificacion.respuesta='';
        alquiler.aprobacion=false;
        alquiler.anular=true;
        this.alquilerservice.actualizarAlquiler(alquiler,id).then(() => {
          this.router.navigate(['/tienda-alquiler']);
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
