import { Component, OnInit } from '@angular/core';
import { datosDonacion } from '../../model/donacion.interface';
import { DonacionService } from '../../service/donacion.service';
import { NotificaciontiendaService} from '../../service/notificaciontienda.service';
import { datosTiendas } from '../../model/tienda.interface';
import { NotificacionesTienda } from '../../model/notificaciones.interface';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-formulario-donacion',
  templateUrl: './formulario-donacion.page.html',
  styleUrls: ['./formulario-donacion.page.scss'],
})
export class FormularioDonacionPage implements OnInit {
  mensaje:string;
  tiendas: datosTiendas[];
  donanteid= null;
  fechaactual: Date = new Date();
  notificaciones:NotificacionesTienda= {
    visualizar: 'No',
    fecha: this.fechaactual,
    tipo:'Donacion',
    idusuario:'',
    idtienda:''
  };
  donacion: datosDonacion = {
    iddonante: '',
    fechadonacion: this.fechaactual,
    fechasolicitud:this.fechaactual,
    estado: '',
    descripcion: '',
    aprobacion: false,
    idtienda: '',
    anular:false,
    modo:'',
    direccion:'',

  };
  formGroup: FormGroup; 
  
  constructor(
    private route: ActivatedRoute, 
    private nav: NavController,
    private donacionService: DonacionService, 
    private loadingController: LoadingController,
    public formBuilder: FormBuilder,
    public Service:NotificaciontiendaService,
    private alertCtrl: AlertController,
     ) {
      var user = firebase.auth().currentUser.uid;
      this.donanteid = user;
      this.crearvalidaciones();
      }
     



  ngOnInit() {
    this.donacion.iddonante=this.donanteid;
    this.donacion.fechadonacion=this.fechaactual;
    this.donacionService.getTiendasActivas().subscribe((tiendas) =>{
      this.tiendas = tiendas;
    })
    this.donacion.direccion=".";
    
  }

  async mensajeconfirmacion() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      message: this.mensaje,
      buttons: [
       {
          text: 'Aceptar',
          handler: () => {
            //this.nav.navigateForward('menu');
          }
        }
      ]
    });
    await alert.present();
  }

  onSelectChange(){

    var element = <HTMLInputElement> document.getElementById("dir");
    if(this.donacion.modo=="A mi domicilio"){
      element.style.display = 'inline';
    }else{
      element.style.display = 'none';
    }
    
  }

   //Crear validaciones para el form 
   crearvalidaciones(){
    const fechaControl = new FormControl('', Validators.compose([
        Validators.required,


    ]));
    const tiendaControl = new FormControl('', Validators.compose([
      Validators.required,
    ]));

    const estadoControl = new FormControl('', Validators.compose([
      Validators.required,
    ]));

    const descripcionControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)
    ]));

    const modoControl = new FormControl('', Validators.compose([
      Validators.required,

    ]));
    const direccionControl = new FormControl('', Validators.compose([
      Validators.minLength(0),
      Validators.maxLength(50)
    ]));
    
    this.formGroup = this.formBuilder.group({fechaControl,tiendaControl,estadoControl,descripcionControl, modoControl,direccionControl });
  }



  //Crear la donacion
  async crearDonacion(){
      this.donacionService.addDonacion(this.donacion).then(() => {
        this.notificaciones.idusuario=this.donacion.iddonante;
        this.notificaciones.idtienda=this.donacion.idtienda;
        
        this.Service.addNotificacion(this.notificaciones);
        this.nav.navigateForward('/donacion');
        this.mensaje="Se envió correctamente su formulario de donación.";
        this.mensajeconfirmacion();
        
      
      });
    

  }

  //Cambio de fecha
  cambiofecha(event){
    this.donacion.fechadonacion=new Date(event.detail.value);  
  }

  //Cancelar donacion
  cancelarDonacion(){
    this.nav.navigateForward('/menu');
  }

}
