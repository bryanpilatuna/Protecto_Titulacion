import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Tienda } from '../../model/tienda.interface';
import {TiendaService} from '../../services/tienda.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {UbicacionService}from '../../services/ubicacion.service';
import {datosUbicacion}from '../../model/ubicacion.interface';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

declare var google;
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-tienda',
  templateUrl: './edit-tienda.page.html',
  styleUrls: ['./edit-tienda.page.scss'],
})
export class EditTiendaPage implements OnInit {
  
  iduser= null;
  mensaje:string;
  formGroup: FormGroup;
  map = null;
  tiendaid=null;
  tienda:Tienda={
    uid:'',
    nombre:'',
    direccion:'',
    correo:'',
    telefono:'',
    bicidispo:'',
    documento:'',
    estado:'',
    logo:'',
    auxilio:'',
    position:{latitude:0,longitude:0}
    }
  infowindow = new google.maps.InfoWindow();
  constructor(
    private route: ActivatedRoute,
    private nav: NavController, 
    private tiendaservice:TiendaService,
     private loadingController: LoadingController,
     private router: Router,  
     public alertController: AlertController,
     public formBuilder: FormBuilder,
     private geolocation: Geolocation,
     private Service: AuthService,
     private alertCtrl: AlertController,) {
      this.crearvalidaciones();
      }

  ngOnInit() {
    this.iduser = this.route.snapshot.params['id'];
    if (this.iduser){
      this.loadTodo();
    }
  }
  async loadTodo(){
    this.tiendaservice.getTienda(this.iduser).subscribe(tienda => {

      this.tienda = tienda;
      this.addMarker(this.tienda.position.latitude,this.tienda.position.longitude,this.tienda.nombre);
     
    });
  }
  

  async saveTodo() {
    if (this.iduser) {
      this.tiendaservice.updateTienda(this.tienda, this.iduser).then(() => {
        this.nav.navigateForward('/tienda-administrador');
      });
    } 
  }


  
  async loadmap(){
    const myLatLng= {lat: -0.225219, lng: -78.5248};
    const mapEle: HTMLElement = document.getElementById('map');
    
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom:10
    });
    google.maps.event.addListenerOnce(this.map, 'idle', () => {   
  
      mapEle.classList.add('show-map');
     //this.renderMarker();
    
    });
    
    }



    addMarker(lati:number,longi:number,nombre:string) {
      const puntos= new google.maps.Marker({
        position: { lat: lati, lng: longi },
        map: this.map,
        animation: google.maps.Animation.DROP,
      });
      const detallemarker = 
    '<h3>Nombre: '+nombre+'</h3>';
    
    puntos.addListener("click", () => {
     this.infowindow.setContent(detallemarker);
      this.infowindow.open(this.map, puntos);
    // console.log(marker.nombre);
    });
    }    
  crearvalidaciones(){

    const nombreControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(40),
    ]));

    const direccionControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),

    ]));

    const tipoControl = new FormControl('', Validators.compose([
      Validators.required,
  ]));
  const auxilioControl = new FormControl('', Validators.compose([
    Validators.required,
]));

    const telefonoControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(10),
      Validators.pattern("[0-9]*"),
    ]));
    

    this.formGroup = this.formBuilder.group({nombreControl,direccionControl,telefonoControl,tipoControl,auxilioControl });
    
  }

 

  guardartienda(){
    this.tiendaservice.updateTienda(this.tienda, this.iduser).then(() => {
      //this.nav.navigateForward('menu-tienda');
      this.mensaje='Se editó la tienda correctamente.'
     this.presentAlert(this.mensaje);
     this.router.navigate(['/tienda-administrador']);
    
      
    });
  }

  redireccion(){
    this.nav.navigateForward('menu-tienda');

  }

  
  async cambiarUbicacion(){
  const rta= await this.geolocation.getCurrentPosition();
  const myLatLng= {lat: rta.coords.latitude, lng: rta.coords.longitude};
  this.tienda.position.latitude= myLatLng.lat;
  this.tienda.position.longitude= myLatLng.lng;
  this.tiendaservice.updateTienda(this.tienda, this.tiendaid).then(() => {
   this.mensaje='Cambio de ubicación exitosa'
   this.presentAlert(this.mensaje);
    this.router.navigate(['/editar-tienda']);
   
    
  });

  }

  async cambiarcontra(){

    this.Service.resetPassword(this.tienda.correo).then(() => {
      this.mensaje="Se envió un correo para cambiar la contraseña. ";
      this.mensajeerror();
    });
  }

  //Mostrar mensaje de alerta
  async mensajeerror() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      message: this.mensaje,
      buttons: [
       {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }
  async presentAlert(mensaje:string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atención',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  irtiendas(){
    this.nav.navigateForward('tienda-administrador');
  }

  
}
