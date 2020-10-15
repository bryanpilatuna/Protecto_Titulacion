import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { datosAlquiler } from '../../model/alquiler.interface';
import { AlquilerService } from '../../service/alquiler.service';
import { datosTiendas } from '../../model/tienda.interface';
import { UsuarioService } from '../../service/usuario.service';
import { datosBicicleta } from '../../model/bicicleta.interface';
<<<<<<< HEAD
import { ModalController } from '@ionic/angular';

import { ModalAlquilerPage } from 'src/app/modal/modal-alquiler/modal-alquiler.page';

=======
import * as firebase from 'firebase';
>>>>>>> 2e44f87b2b81c11253ea7b5dd54f54aebfaf4f3a
@Component({
  selector: 'app-formulario-alquiler',
  templateUrl: './formulario-alquiler.page.html',
  styleUrls: ['./formulario-alquiler.page.scss'],
})
export class FormularioAlquilerPage implements OnInit {

  usuarioid= null;
  tiendas: datosTiendas[];
  bicicletas:datosBicicleta[];
  fechaactual: Date = new Date();
  idbicicleta=null;
  //disableSelector:boolean;

  alquiler: datosAlquiler ={

    idusuario :'',
    idtienda: '',
    fechadevolucion: this.fechaactual,
    fechaalquiler: this.fechaactual,
    bicicleta: '',
    fecha: this.fechaactual,
    aprobacion: false,
    anular: false
   

  }

<<<<<<< HEAD
  constructor(private route: ActivatedRoute, private nav: NavController,
    private alquilerService: AlquilerService, private loadingController: LoadingController,public modalController: ModalController) { 
=======
  constructor(private nav: NavController,
    private route: ActivatedRoute,
    private alquilerService: AlquilerService, 
    private usuarioService:UsuarioService,
    private loadingController: LoadingController) { 

     

>>>>>>> 2e44f87b2b81c11253ea7b5dd54f54aebfaf4f3a
      //this.disableSelector = false;
      
    }

  ngOnInit() {
    this.usuarioService.$getObjeto.subscribe(data=> 
     {
       this.usuarioid=data;
     }).unsubscribe();
      //this.user = firebase.auth().currentUser.uid;
      //this.usuarioid = this.user;  
      //this.usuarioid=this.route.snapshot.params['id'];
    console.log('id pasado',this.usuarioid)
    
   
    if (this.usuarioid){
      this.loadTodo();
    }
    this.alquiler={

      idusuario :this.usuarioid,
      idtienda: '',
      fechadevolucion:this.fechaactual,
      fechaalquiler: this.fechaactual,
      bicicleta: '',
      fecha: this.fechaactual,
      aprobacion: false,
      anular: false
     
    };

    

    this.alquilerService.getTiendas().subscribe((tiendas) =>{
      this.tiendas = tiendas;
    })

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
    console.log(this.idbicicleta);
  }

  async onSelectChange() : Promise<void> {
    this.alquilerService.getBicicletas(this.alquiler.idtienda).subscribe((bicicletas) =>{
      this.bicicletas = bicicletas;
      
     
     
    })
  }

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
    const loading = await this.loadingController.create({
      message: 'Guardando....'
    });


   this.alquilerService.addAlquiler(this.alquiler).then(() => {
      loading.dismiss();
      this.nav.navigateForward('/menu'); 
    });
  }

  async cancelarAlquiler(){

     this.nav.navigateForward('/menu');

  }

  cambiofecha(event){
    this.alquiler.fechaalquiler= new Date(event.detail.value);
  }

  cambiofecha2(event){
    this.alquiler.fechadevolucion= new Date(event.detail.value);
  }
  
}
