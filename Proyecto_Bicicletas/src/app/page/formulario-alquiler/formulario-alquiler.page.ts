import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { datosAlquiler } from '../../model/alquiler.interface';
import { AlquilerService } from '../../service/alquiler.service';
import { datosTiendas } from '../../model/tienda.interface';
import { datosBicicleta } from '../../model/bicicleta.interface';
import { ModalController } from '@ionic/angular';

import { ModalAlquilerPage } from 'src/app/modal/modal-alquiler/modal-alquiler.page';

@Component({
  selector: 'app-formulario-alquiler',
  templateUrl: './formulario-alquiler.page.html',
  styleUrls: ['./formulario-alquiler.page.scss'],
})
export class FormularioAlquilerPage implements OnInit {

  usuarioid= null;
  tiendas: datosTiendas[];
  bicicletas:datosBicicleta;
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

  constructor(private route: ActivatedRoute, private nav: NavController,
    private alquilerService: AlquilerService, private loadingController: LoadingController,public modalController: ModalController) { 
      //this.disableSelector = false;
      
    }

  ngOnInit() {
    this.usuarioid=this.route.snapshot.params['id'];
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
      console.log('Tiendas', tiendas);
      this.tiendas = tiendas;
      console.log(this.tiendas[0].id);
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
    this.alquilerService.getBicicleta(this.idbicicleta).subscribe((bicicletas) =>{
      this.bicicletas = bicicletas;
      this.bicicletas.disponible="No";
      console.log(bicicletas.disponible);

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
    const loading = await this.loadingController.create({
      message: 'Guardando....'
    });


   this.alquilerService.addAlquiler(this.alquiler).then(() => {
      this.alquilerService.updateBicicletas(this.bicicletas, this.idbicicleta).then(() => {});
      loading.dismiss();
      this.nav.navigateForward('/menu'); 
    });
  }

  cambiofecha(event){
    this.alquiler.fechaalquiler= new Date(event.detail.value);
  }

  cambiofecha2(event){
    this.alquiler.fechadevolucion= new Date(event.detail.value);
  }
  cancelarAlquiler(){
    this.nav.navigateForward('/menu'); 

  }
  
}
