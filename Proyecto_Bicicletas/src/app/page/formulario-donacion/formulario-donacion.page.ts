import { Component, OnInit } from '@angular/core';
import {datosDonacion} from '../../model/donacion.interface';
import {DonacionService} from '../../service/donacion.service';

import { datosTiendas } from '../../model/tienda.interface';

import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

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
  
  
  constructor(private route: ActivatedRoute, private nav: NavController,
    private donacionService: DonacionService, private loadingController: LoadingController,
     ) { }



  ngOnInit() {
    
    this.donanteid= this.route.snapshot.params['id'];

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

}
