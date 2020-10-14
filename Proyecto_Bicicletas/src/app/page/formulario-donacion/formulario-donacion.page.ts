import { Component, OnInit } from '@angular/core';
import {datosDonacion} from '../../model/donacion.interface';
import {DonacionService} from '../../service/donacion.service';
import { datosTiendas } from '../../model/tienda.interface';
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

  donacion: datosDonacion = {
    iddonante: '',
    fechadonacion: this.fechaactual,
    estado: '',
    descripcion: '',
    aprobacion: false,
    idtienda: '',
    anular:false
  };
  formGroup: FormGroup; // declare it here
  
  
  constructor(private route: ActivatedRoute, private nav: NavController,
    private donacionService: DonacionService, private loadingController: LoadingController,public formBuilder: FormBuilder,
     ) {
      var user = firebase.auth().currentUser.uid;
      this.donanteid = user;
      this.crearvalidaciones();
      }



  ngOnInit() {
    
   // this.donanteid= this.route.snapshot.params['id'];
   console.log("id donante",this.donanteid);
    this.donacion= {
    iddonante: this.donanteid,
    fechadonacion: this.fechaactual,
    estado: '',
    descripcion: '',
    aprobacion: false,
    idtienda: '',
    anular:false
     };

    this.donacionService.getTiendas().subscribe((tiendas) =>{
      console.log('Tiendas', tiendas);
      this.tiendas = tiendas;
    })
    
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
      Validators.maxLength(30)
    ]));
    
    this.formGroup = this.formBuilder.group({fechaControl,tiendaControl,estadoControl,descripcionControl });
  }

  async crearDonacion(){
    const loading = await this.loadingController.create({
      message: 'Guardando....'
    });

   this.donacionService.addDonacion(this.donacion).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/menu');
      });
    

  }

  cambiofecha(event){
    
   // this.donacion.fechadonacion.setDate= event.detail.value;

    this.donacion= {
      iddonante: this.donanteid,
      fechadonacion: new Date(event.detail.value),
      estado: '',
      descripcion: '',
      aprobacion: false,
      idtienda: '',
      anular:false
      };   

  }
  cancelarDonacion(){

    this.nav.navigateForward('/menu');
  }

}
