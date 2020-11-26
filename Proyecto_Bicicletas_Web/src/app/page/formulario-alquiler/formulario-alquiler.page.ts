import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { datosAlquiler } from '../../modelm/alquiler.interface';
import { AlquilerService } from '../../service/alquiler.service';
import { datosTiendas } from '../../modelm/tienda.interface';
import { datosBicicleta } from '../../modelm/bicicleta.interface';
import { ModalController } from '@ionic/angular';
import {UsuarioService} from '../../service/usuario.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalAlquilerPage } from 'src/app/modal/modal-alquiler/modal-alquiler.page';
import { NotificacionesTienda } from '../../modelm/notificaciones.interface';
import { NotificaciontiendaService} from '../../service/notificaciontienda.service';
import * as firebase from 'firebase';
@Component({
  selector: 'app-formulario-alquiler',
  templateUrl: './formulario-alquiler.page.html',
  styleUrls: ['./formulario-alquiler.page.scss'],
})
export class FormularioAlquilerPage implements OnInit {
  usuarioid= null;
  tiendas: datosTiendas[];
  bicicletas:datosBicicleta;
  bicicletas2:datosBicicleta[];
  fechaactual: Date = new Date();
  idbicicleta=null;
  idtienda=null;
  notificaciones:NotificacionesTienda= {
    visualizar: 'No',
    fecha: this.fechaactual,
    tipo:'Alquiler',
    idusuario:'',
    idtienda:''
  };
  hora:any;
  minutos:any;
  
  //disableSelector:boolean;

  alquiler: datosAlquiler ={

    idusuario :'',
    idtienda: '',
    fechadevolucion: this.fechaactual,
    fechaalquiler: this.fechaactual,
    bicicleta: '',
    fecha: this.fechaactual,
    aprobacion: false,
    anular: false,
    horaalquiler:'',
    horadevolucion:''
   

  }
  desabilitarboton:boolean;
  formGroup: FormGroup; 

  constructor(private route: ActivatedRoute, private nav: NavController, private UsuarioService: UsuarioService,public Service:NotificaciontiendaService,
    private alquilerService: AlquilerService, private loadingController: LoadingController,public modalController: ModalController,public formBuilder: FormBuilder) { 
      //this.disableSelector = false;
      var user = firebase.auth().currentUser.uid;
      this.usuarioid = user;
      console.log(this.usuarioid);
      this.desabilitarboton = true;
      this.crearvalidaciones();
    
     
    }

  ngOnInit() {
    this.UsuarioService.$getObjeto.subscribe(data=>{
      this.idtienda=data;
    });
    
    if (this.usuarioid){
      this.loadTodo();
    }
    
    this.alquiler.idusuario=this.usuarioid;

    this.alquilerService.getTiendas().subscribe((tiendas) =>{
    
      this.tiendas = tiendas;

      for(let i in this.tiendas){
        this.alquilerService.getBicicletas(this.tiendas[i].id).subscribe((bicicletas) =>{
          this.bicicletas2=bicicletas;
         if(bicicletas.length==0){
          
          var l = this.tiendas.indexOf( this.tiendas[i] );
          this.tiendas.splice(l,1); 
         }else{
        
          var cont=0;
          for(let m in this.bicicletas2){
            if(this.bicicletas2[m].disponible=="Si"){
              cont=cont+1;
            }
          }
          if(cont==0){
            var l = this.tiendas.indexOf( this.tiendas[i] );
            this.tiendas.splice(l,1); 
          }
         }
  
        })
      }
    })
  }


  //Crear validaciones para el form 
  crearvalidaciones(){
    const fechaAlquiler = new FormControl('', Validators.compose([
        Validators.required,
    ]));
    const fechaDevolucion = new FormControl('', Validators.compose([
      Validators.required,
    ]));
    const tindaSeleccion = new FormControl('', Validators.compose([
      Validators.required,
    ]));
    const horaAlquiler = new FormControl('', Validators.compose([
      Validators.required,
    ]));
    const horaDonacion = new FormControl('', Validators.compose([
      Validators.required,
    ]));
  
    
    this.formGroup = this.formBuilder.group({fechaAlquiler,fechaDevolucion,tindaSeleccion,horaAlquiler,horaDonacion});
  }

  async onSelectChange(){
    this.desabilitarboton = false;
    this.abrirmodal();
  }


  async abrirmodal(){
    const modal = await this.modalController.create({
      component: ModalAlquilerPage,
      componentProps: {
        'idtienda': this.alquiler.idtienda,
   
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.idbicicleta = data.bici;
    this.alquilerService.getBicicleta(this.idbicicleta).subscribe((bicicletas) =>{
      this.bicicletas = bicicletas;
      this.bicicletas.disponible="No";
    

    })
  }

  /*async onSelectChange() : Promise<void> {
    console.log(this.alquiler.idtienda);
    this.alquilerService.getBicicletas(this.alquiler.idtienda).subscribe((bicicletas) =>{
      this.bicicletas = bicicletas;
      
  
    })
  }*/

  async loadTodo(){
    const loading = await this.loadingController.create({
      message: 'Loading....'
    });
    
  }

  async crearAlquiler(){

    this.alquiler.idusuario=this.usuarioid;
    this.alquiler.idtienda=this.alquiler.idtienda;
    this.alquiler.aprobacion= false;
    this.alquiler.fecha= this.fechaactual;
    this.alquiler.bicicleta=this.idbicicleta;
    this.alquilerService.addAlquiler(this.alquiler).then(() => {
      this.alquilerService.updateBicicletas(this.bicicletas, this.idbicicleta).then(() => {});
      this.notificaciones.idusuario=this.alquiler.idusuario;
      this.notificaciones.idtienda=this.alquiler.idtienda;
      this.Service.addNotificacion(this.notificaciones);
      this.nav.navigateForward('/menu'); 
    });
  }

  cambiofecha(event){
    this.alquiler.fechaalquiler= new Date(event.detail.value);
  }

  seleccionarhora(event){
    
    this.hora= new Date(event.detail.value).getHours();
    this.minutos= new Date(event.detail.value).getMinutes();
    var horaalquiler= this.hora+':'+this.minutos;
    this.alquiler.horaalquiler=horaalquiler;
  }

  seleccionarhoradev(event){
    
    this.hora= new Date(event.detail.value).getHours();
    this.minutos= new Date(event.detail.value).getMinutes();
    var horadev= this.hora+':'+this.minutos;
    this.alquiler.horadevolucion=horadev;

  }

  cambiofecha2(event){
    this.alquiler.fechadevolucion= new Date(event.detail.value);
  }
  cancelarAlquiler(){
    this.nav.navigateForward('/menu-cliente'); 
    this.idbicicleta=null;
  }
  
}
