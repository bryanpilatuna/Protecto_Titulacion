import { Component, OnInit } from '@angular/core';
import {Tienda}from '../../model/tienda.interface';
import {TiendaService} from '../../services/tienda.service';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {UbicacionService}from '../../services/ubicacion.service';
import {datosUbicacion}from '../../model/ubicacion.interface';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

declare var google;
import * as firebase from 'firebase';


@Component({
  selector: 'app-editar-tienda',
  templateUrl: './editar-tienda.page.html',
  styleUrls: ['./editar-tienda.page.scss'],
})
export class EditarTiendaPage implements OnInit {
  mensaje:string;
  formGroup: FormGroup;
  map = null;
  tienda:Tienda={
  uid:'',
  nombre:'',
  direccion:'',
  correo:'',
  telefono:'',
  estado:'',
  logo:'',
  auxilio:'',
  position:{latitude:0,longitude:0}
  }
  public image: any;
  tiendaid=null;
  ubicaciones: datosUbicacion[];
  
  infowindow = new google.maps.InfoWindow();
  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private nav: NavController, 
    public alertController: AlertController,
    private tiendaservice:TiendaService,
    private loadingController: LoadingController,
    public formBuilder: FormBuilder,
    private geolocation: Geolocation,
    private Service: AuthService,
    private alertCtrl: AlertController,
    private UbicacionService: UbicacionService) { 
      var user = firebase.auth().currentUser.uid;
      this.tiendaid = user;      
  
      this.crearvalidaciones();
    }

  ngOnInit() {
    //this.tiendaid=this.route.snapshot.params['id'];
    this.loadmap();
    if (this.tiendaid){
      this.cargarTienda();
    } 
  }
   //Cargar tienda
   async cargarTienda(){

    this.tiendaservice.getTienda(this.tiendaid).subscribe(tienda =>
      {

        this.tienda =tienda;
        this.addMarker(this.tienda.position.latitude,this.tienda.position.longitude,this.tienda.nombre);
     
      });
      
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
      Validators.pattern("(?=[^A-Z]*[A-Z])[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*"),
    ]));

    const direccionControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(40),

    ]));

    const emailControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.email,
      Validators.minLength(10),
      Validators.maxLength(40)

  ]));

    const telefonoControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(10),
      Validators.pattern("[0-9]*"),
    ]));
    
    this.formGroup = this.formBuilder.group({nombreControl,direccionControl,telefonoControl,emailControl });
    
  }

 

  guardartienda(){
    this.tiendaservice.updateTienda(this.tienda, this.tiendaid).then(() => {
      //this.nav.navigateForward('menu-tienda');
      this.mensaje='Guardado con éxito'
     this.presentAlert(this.mensaje);
     this.router.navigate(['/editar-tienda']);
    
      
    });
  }

  redireccion(){
    this.nav.navigateForward('menu-tienda');

  }

  async subirImagen(event: any): Promise<void> {
    this.image = event.target.files[0];

    this.tiendaservice.updateImagen(this.tienda,this.tiendaid,this.image);
    this.cargarTienda();
    
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


}
