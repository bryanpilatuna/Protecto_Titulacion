import { Component, OnInit } from '@angular/core';
import { datosDonacion } from '../../modelm/donacion.interface';
import { DonacionService } from '../../service/donacion.service';
import { NotificaciontiendaService} from '../../service/notificaciontienda.service';
import { datosTiendas } from '../../modelm/tienda.interface';
import { NotificacionesTienda } from '../../modelm/notificaciones.interface';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';
import { NgbModalConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
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
  modal : NgbModalRef;
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
    private router: Router,
    private route: ActivatedRoute, 
    private nav: NavController,
    private donacionService: DonacionService, 
    private loadingController: LoadingController,
    public formBuilder: FormBuilder,
    public Service:NotificaciontiendaService,
    private alertCtrl: AlertController,
    config: NgbModalConfig, private modalService: NgbModal,
     ) {
      config.backdrop = 'static';
      config.keyboard = false;
      var user = firebase.auth().currentUser.uid;
      this.donanteid = user;
      this.crearvalidaciones();
      }
      



  ngOnInit() {
    this.donacion.iddonante=this.donanteid;
    this.donacion.fechadonacion=this.fechaactual;
    this.donacionService.getbustieact().subscribe((tiendas) =>{
      this.tiendas = tiendas;
    })


    
  }

  close() {
    this.modal.close();
    
  }


  onSelectChange(){

    var element = <HTMLInputElement> document.getElementById("dir");
    if(this.donacion.modo=="Retirar"){
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
      Validators.maxLength(50)
    ]));
    
    this.formGroup = this.formBuilder.group({fechaControl,tiendaControl,estadoControl,descripcionControl, modoControl,direccionControl });
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
            //this.nav.navigateForward('alquiler-donacion');
          }
        }
      ]
    });
    await alert.present();
  }

  //Crear la donacion
  async crearDonacion(content){
      this.donacionService.addDonacion(this.donacion).then(() => {
        this.notificaciones.idusuario=this.donacion.iddonante;
        this.notificaciones.idtienda=this.donacion.idtienda; 
        this.Service.addNotificacion(this.notificaciones);
        this.nav.navigateForward('alquiler-donacion');
        //this.router.navigate(['alquiler-donacion']);
        //this.modal =this.modalService.open(content,{centered:true});
        this.mensaje="Se envió correctamente su formulario de donación.";
        this.mensajeconfirmacion();
        this.donacion.modo='';   
        this.donacion.idtienda='';
        this.donacion.descripcion='';     
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

