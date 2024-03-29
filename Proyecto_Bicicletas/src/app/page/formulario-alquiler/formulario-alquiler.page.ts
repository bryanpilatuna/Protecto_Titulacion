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
import { NotificacionesTienda } from '../../model/notificaciones.interface';
import { NotificaciontiendaService} from '../../service/notificaciontienda.service';
import * as firebase from 'firebase';
import { NgbModalConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-formulario-alquiler',
  templateUrl: './formulario-alquiler.page.html',
  styleUrls: ['./formulario-alquiler.page.scss'],
})
export class FormularioAlquilerPage implements OnInit {
  pageActual: number= 1;
  validacion1:boolean=true;
  usuarioid= null;
  modal : NgbModalRef;
  modal2 : NgbModalRef;
  tiendas: datosTiendas[];
  tiendas2: datosTiendas[];
  bicicletas:datosBicicleta;
  
  bicicletas2:datosBicicleta[];
  bicicletas4:datosBicicleta[];
  fechaactual: Date = new Date();
  fechahoralq:string;
  fechahoradev:string;
  fechaalqutem:string;
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
  mensaje:string;
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
  fechacom:any;
  fechaac:any;
  contador=0;
  limite=false;
  alquilerid: datosAlquiler[];

  fecal:string;
  horal:string;
  fecdev:string;
  hordev:string;
  tien:string;
  direc:string;
  imgbici:string;
  
  constructor(private Serviceau: AuthService,private router: Router, config: NgbModalConfig, private modalService: NgbModal,private route: ActivatedRoute, private nav: NavController, private UsuarioService: UsuarioService,public Service:NotificaciontiendaService,
    private alquilerService: AlquilerService, private loadingController: LoadingController,public modalController: ModalController,public formBuilder: FormBuilder,private alertCtrl: AlertController) { 
      //this.disableSelector = false;
     
      var user = firebase.auth().currentUser.uid;
      this.usuarioid = user;
      this.fechaac = new Date(this.fechaactual).toDateString();
      //console.log(this.fechaac);
      this.alquilerService.getAlquiler2(this.usuarioid).subscribe((alquileres) =>{
        this.alquilerid = alquileres;
        //console.log(this.alquilerid);
        for(let i in this.alquilerid){

          this.fechacom = new Date(this.alquilerid[i].fecha['seconds']*1000).toDateString();
          //console.log(this.fechacom);
          if(this.fechaac==this.fechacom){
            this.contador=this.contador+1;
          }
        }
      //console.log(this.contador);
        if(this.contador<4){
          this.limite=false;
        }else{
          this.limite=true;
        }
 
      })
      this.desabilitarboton = true;
      this.crearvalidaciones();
      config.backdrop = 'static';
      config.keyboard = false;
     
     
    }

  ngOnInit() {
    this.alquiler.idusuario=this.usuarioid;
    
    this.alquilerService.getbustieact().subscribe((tiendas) =>{
      this.tiendas = tiendas;
      for(let i in this.tiendas){
        this.alquilerService.getBicicletas(this.tiendas[i].id).subscribe((bicicletas) =>{
          if(bicicletas.length==0){    
            this.tiendas[i].bicidispo="ninguna";
            this.alquilerService.updateTienda(this.tiendas[i],this.tiendas[i].id);
           }else{
            this.tiendas[i].bicidispo="disponible";
            this.alquilerService.updateTienda(this.tiendas[i],this.tiendas[i].id);
           }
        })
      }
      this.alquilerService.getbustieact2().subscribe((tiendas2) =>{
        this.tiendas2 = tiendas2;
      })
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

  async onSelectChange(content){
    this.alquilerService.getTienda(this.alquiler.idtienda).subscribe((tienda) =>{
      this.direc=tienda.direccion;
    })
    this.desabilitarboton = false;
    //console.log(this.alquiler.idtienda);
    this.alquilerService.getBicicletas(this.alquiler.idtienda).subscribe((bicicletas) =>{
      this.bicicletas4 = bicicletas;
      //console.log(this.bicicletas4);
     
    })
    this.modal =this.modalService.open(content,{centered:true});
    
    //this.abrirmodal();
  }

  cerrarmodal(){
    console.log("entra cerrar");
    this.modal.close();
    this.alquiler.idtienda=null;
    this.direc=null;
    this.imgbici=null;
   
  }
  
 
  seleccionarbici(idbici:string){
   this.modal.close();

   this.idbicicleta =idbici;
   this.alquilerService.getBicicleta(this.idbicicleta).subscribe((bicicletas) =>{
    this.bicicletas = bicicletas;
    //console.log(this.bicicletas);
    this.bicicletas.disponible="No";
    this.imgbici=bicicletas.imagen;
  })
 
   
 
  }

  /*async abrirmodal(){
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
  }*/

  /*async onSelectChange() : Promise<void> {
    console.log(this.alquiler.idtienda);
    this.alquilerService.getBicicletas(this.alquiler.idtienda).subscribe((bicicletas) =>{
      this.bicicletas = bicicletas;
      
  
    })
  }*/
  close() {
    this.modal.close();
    window.location.href = 'formulario-alquiler' ;
  }
  async crearAlquiler(content2){
    if(this.limite==true){
      //alert("Ya paso su limite");
      this.mensaje="El limite de alquileres realizados en un día son 4.";
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
        //this.modal2 =this.modalService.open(content2,{centered:true});
        
        this.nav.navigateForward('alquiler-donacion'); 

        //window.location.href = 'alquiler-donacion' ;
        this.mensaje="Se envió correctamente su formulario de alquiler.";
        this.mensajeconfirmacion();
      });
    }
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

  cambiofecha(event){
    var horas = new Date().getHours().toString();
    if(horas=="8"||horas=="9"){
      horas="0"+horas;
    }
    var minutos:string = new Date().getMinutes().toString();
    if(minutos=="1"||minutos=="2"||minutos=="3"||minutos=="4"||minutos=="5"||minutos=="6"||minutos=="7"||minutos=="8"||minutos=="9"||minutos=="0"){
      minutos="0"+minutos;
    }
    this.alquiler.fechaalquiler= new Date(event.detail.value);
    this.fechaalqutem=new Date(event.detail.value).toDateString();
    console.log(this.fechaalqutem);
    //console.log(new Date(event.detail.value).toDateString());
    var actual = new Date().toDateString();
    var seleccionada = new Date(event.detail.value).toDateString();
    if(actual==seleccionada){
      this.fechahoralq=horas+":"+minutos;
    }else{
      this.fechahoralq="08"+":"+"00";
    }
    this.formGroup.controls['horaAlquiler'].setValue(null);
    this.formGroup.controls['fechaDevolucion'].setValue(null);
    this.formGroup.controls['horaDonacion'].setValue(null);
    this.fechahoradev=null;
    this.validacion1=true;
  }

  seleccionarhora(event){
    
    //this.hora= new Date(event.detail.value).getHours();
    var horas = new Date(event.detail.value).getHours().toString();
    if(horas=="8"||horas=="9"){
      horas="0"+horas;
    }
    var minutos= new Date(event.detail.value).getMinutes().toString();
    //var minutos:string = new Date().getMinutes().toString();
    if(minutos=="1"||minutos=="2"||minutos=="3"||minutos=="4"||minutos=="5"||minutos=="6"||minutos=="7"||minutos=="8"||minutos=="9"||minutos=="0"){
      minutos="0"+minutos;
    }
    var horaalquiler= horas+':'+minutos;
    this.alquiler.horaalquiler=horaalquiler;
    console.log(this.alquiler.horaalquiler);
    this.validacion1=false;
    this.formGroup.controls['horaDonacion'].setValue(null);
  }

  seleccionarhoradev(event){
    
    var horas = new Date(event.detail.value).getHours().toString();
    if(horas=="8"||horas=="9"){
      horas="0"+horas;
    }
    var minutos= new Date(event.detail.value).getMinutes().toString();
    //var minutos:string = new Date().getMinutes().toString();
    if(minutos=="1"||minutos=="2"||minutos=="3"||minutos=="4"||minutos=="5"||minutos=="6"||minutos=="7"||minutos=="8"||minutos=="9"||minutos=="0"){
      minutos="0"+minutos;
    }
    //this.hora= new Date(event.detail.value).getHours();
    //this.minutos= new Date(event.detail.value).getMinutes();
    var horadev= horas+':'+minutos;
    this.alquiler.horadevolucion=horadev;
    console.log(this.alquiler.horadevolucion);

  }

  cambiofecha2(event){
    this.alquiler.fechadevolucion= new Date(event.detail.value);
    var seleccionada = new Date(event.detail.value).toDateString();
    if(this.fechaalqutem==seleccionada){
      this.fechahoradev=this.alquiler.horaalquiler;
    }else{
      this.fechahoradev="08:00";
    }
  }


    
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
    async mensajeconfirmacionsalir() {
      const alert = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header: 'Mensaje',
        message: '¿Seguro de cerrar sesión?',
        buttons: [
         {
            text: 'Aceptar',
            handler: () => {
              this.salir();
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
  
}
