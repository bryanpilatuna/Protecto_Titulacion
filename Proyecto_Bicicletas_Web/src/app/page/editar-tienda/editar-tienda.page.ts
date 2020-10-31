import { Component, OnInit } from '@angular/core';
import {Tienda}from '../../model/tienda.interface';
import {TiendaService} from '../../services/tienda.service';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';



@Component({
  selector: 'app-editar-tienda',
  templateUrl: './editar-tienda.page.html',
  styleUrls: ['./editar-tienda.page.scss'],
})
export class EditarTiendaPage implements OnInit {
  formGroup: FormGroup;
  tienda:Tienda={
  uid:'',
  nombre:'',
  direccion:'',
  correo:'',
  telefono:'',
  estado:'',
  logo:'',
  position:{latitude:0,longitude:0}
  }
  public image: any;
  tiendaid=null;

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private nav: NavController, 
    private tiendaservice:TiendaService,
    private loadingController: LoadingController,
    public formBuilder: FormBuilder,
    private geolocation: Geolocation) { 
      
  
      this.crearvalidaciones();
    }

  ngOnInit() {
    this.tiendaid=this.route.snapshot.params['id'];
    console.log('Mi tienda',this.tiendaid);
    if (this.tiendaid){
      this.cargarTienda();
     
    } 
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

  //Cargar tienda
  async cargarTienda(){
    const loading = await this.loadingController.create({
      message: 'Cargando....'
    });
    await loading.present();

    this.tiendaservice.getTienda(this.tiendaid).subscribe(tienda =>
      {
        loading.dismiss();
        this.tienda =tienda;
        console.log('mi ubicacion anterior',this.tienda)
      
      });
      
  }

  guardartienda(){
    this.tiendaservice.updateTienda(this.tienda, this.tiendaid).then(() => {
      this.nav.navigateForward('menu-tienda');
      
    });
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
    this.nav.navigateForward('menu-tienda');
    
  });

  }



}
