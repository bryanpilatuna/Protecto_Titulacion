import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { datosAlquiler } from '../../model/alquiler.interface';
import { AlquilerService } from '../../service/alquiler.service';
import { datosTiendas } from '../../model/tienda.interface';
import { datosBicicleta } from '../../model/bicicleta.interface';
import { ModalController } from '@ionic/angular';
import {UsuarioService} from '../../service/usuario.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
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
  idtienda=null;
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
  desabilitarboton:boolean;
  formGroup: FormGroup; 

  constructor(private route: ActivatedRoute, private nav: NavController, private UsuarioService: UsuarioService,
    private alquilerService: AlquilerService, private loadingController: LoadingController,public modalController: ModalController,public formBuilder: FormBuilder) { 
      //this.disableSelector = false;
      this.desabilitarboton = true;
      this.crearvalidaciones();
      
    }

  ngOnInit() {
    this.UsuarioService.$getObjeto.subscribe(data=>{
      console.log('id de  tienda',data)
      this.idtienda=data;
    });
    
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
  
    
    this.formGroup = this.formBuilder.group({fechaAlquiler,fechaDevolucion,tindaSeleccion});
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
    this.idbicicleta=null;
  }
  
}
