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

@Component({
  selector: 'app-formulario-donacion',
  templateUrl: './formulario-donacion.page.html',
  styleUrls: ['./formulario-donacion.page.scss'],
})
export class FormularioDonacionPage implements OnInit {
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
    public Service:NotificaciontiendaService
     ) {
      var user = firebase.auth().currentUser.uid;
      this.donanteid = user;
      this.crearvalidaciones();
      }



  ngOnInit() {
    this.donacion.iddonante=this.donanteid;
    this.donacion.fechadonacion=this.fechaactual;
    this.donacionService.getTiendas().subscribe((tiendas) =>{
      this.tiendas = tiendas;
      for(let i in this.tiendas){

        if(this.tiendas[i].estado=="Inactivo"){
          var l = this.tiendas.indexOf( this.tiendas[i] );
          this.tiendas.splice(l,1); 
        }
      }
    })
    
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



  //Crear la donacion
  async crearDonacion(){
      this.donacionService.addDonacion(this.donacion).then(() => {
        this.notificaciones.idusuario=this.donacion.iddonante;
        this.notificaciones.idtienda=this.donacion.idtienda; 
        this.Service.addNotificacion(this.notificaciones);
          this.nav.navigateForward('/profile');
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

