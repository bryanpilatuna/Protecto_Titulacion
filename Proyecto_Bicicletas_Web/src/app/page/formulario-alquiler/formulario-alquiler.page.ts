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
import { NgbModalConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
@Component({
  selector: 'app-formulario-alquiler',
  templateUrl: './formulario-alquiler.page.html',
  styleUrls: ['./formulario-alquiler.page.scss'],
})
export class FormularioAlquilerPage implements OnInit {
  imgbici:string;
  direc:string;
  mensaje:string;
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
  alquilerid: datosAlquiler[];
  id: any;
  fechacom:any;
  fechaac:any;
  contador=0;
  limite=false;
  constructor(
    private router: Router, 
    private Serviceau: AuthService,
    private alertCtrl: AlertController,private route: ActivatedRoute, private nav: NavController, private UsuarioService: UsuarioService,public Service:NotificaciontiendaService,
    private alquilerService: AlquilerService, private loadingController: LoadingController,public modalController: ModalController,public formBuilder: FormBuilder,private Servicio:AlquilerService) { 
      //this.disableSelector = false;
      this.id = firebase.auth().currentUser.uid;
      this.fechaac = new Date(this.fechaactual).toDateString();
      this.Servicio.getAlquiler2(this.id).subscribe((alquileres) =>{
        this.alquilerid = alquileres;
        for(let i in this.alquilerid){
          //console.log(this.contador);
          this.fechacom = new Date(this.alquilerid[i].fecha['seconds']*1000).toDateString();
          if(this.fechaac==this.fechacom){
            this.contador=this.contador+1;
          }
        }
        console.log(this.contador);
        if(this.contador<2){
          this.limite=false;
        }else{
          this.limite=true;
        }
        //console.log(this.limite)
        //console.log(new Date(this.alquilerid[0].fecha['seconds']*1000).toDateString());
  
      })

      this.desabilitarboton = true;
      this.crearvalidaciones();
      //console.log(new Date());
    
     
    }

  ngOnInit() {
    this.UsuarioService.$getObjeto.subscribe(data=>{
      this.idtienda=data;
    });
    
    this.usuarioid=this.route.snapshot.params['id'];
    this.alquiler.idusuario=this.usuarioid;

    this.alquilerService.getbustieact().subscribe((tiendas) =>{
    
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
    const dirDonacion = new FormControl('', Validators.compose([
      Validators.required,
    ]));
    
    this.formGroup = this.formBuilder.group({fechaAlquiler,fechaDevolucion,tindaSeleccion,horaAlquiler,horaDonacion,dirDonacion});
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
    if(data.bici){
      this.alquilerService.getTienda(this.alquiler.idtienda).subscribe((tienda) =>{
        this.direc=tienda.direccion;
      })
      this.idbicicleta = data.bici;
      this.alquilerService.getBicicleta(this.idbicicleta).subscribe((bicicletas) =>{
        this.bicicletas = bicicletas;
        this.bicicletas.disponible="No";
        this.imgbici=bicicletas.imagen;
  
      })
    }else{
      this.direc="";
    }
    
  }




  async crearAlquiler(){
    if(this.limite==true){
      //alert("Ya paso su limite");
      this.mensaje="El limite de alquileres realizados en un día son 2.";
      this.mensajeconfirmacion();
    }else{
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
        this.nav.navigateForward('alquiler-donacion');
        this.mensaje="Se envió correctamente su formulario de alquiler.";
        this.mensajeconfirmacion();
      
      });
    }

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
    this.nav.navigateForward('/menu'); 
    this.idbicicleta=null;
  }




    //NAV
    async mensajeconfirmacionmapa() {
      const alert = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header: 'Mensaje',
        message: 'Se necesita activar la ubicación de su dispositivo para visualizar las tiendas.',
        buttons: [
         {
            text: 'Aceptar',
            handler: () => {
              this.irmapa()
            }
          },
          {
            text: 'Cancelar',
            handler: () => {
              console.log();
            }
          }
        ]
      });
      await alert.present();
    }
  
    rediperfil(){
      this.router.navigate(['profile']);
    }
  
    alquileresnav(){
      this.router.navigate(['formulario-alquiler']);
    }
  
    donacionnav(){
      this.router.navigate(['formulario-donacion']);
    }
  
    actividadesnav(){
      this.router.navigate(['alquiler-donacion']);
  
    }
    irmapa(){
      this.router.navigate(['/ubicar-tienda',this.usuarioid]);
    }
  
    notifinav(){
      this.router.navigate(['/notificacion']);
    }
    salir(){
      this.Serviceau.logout();
    }
  
}
