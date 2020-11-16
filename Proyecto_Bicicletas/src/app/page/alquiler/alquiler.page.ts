import { Component, OnInit, VERSION  } from '@angular/core';
import { AlquilerService } from '../../service/alquiler.service';
import { datosAlquiler } from '../../model/alquiler.interface';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute} from '@angular/router';

import { Routes } from '@angular/router';
import { datosTiendas } from 'src/app/model/tienda.interface';
import { datosBicicleta } from 'src/app/model/bicicleta.interface';
import { NavController, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-alquiler',
  templateUrl: './alquiler.page.html',
  styleUrls: ['./alquiler.page.scss'],
})
export class AlquilerPage implements OnInit {
  tiendas:  datosTiendas[];
  alquileres: datosAlquiler;
  alquileres2: datosAlquiler[];
  idalquiler= null;
  idbici=null;
  bicicleta:datosBicicleta;
  fecha:any;
  fechaalquiler:any;
  fechadevolucion:any;
  constructor(private Servicio:AlquilerService,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private nav: NavController,
    private alertCtrl: AlertController
    ) {
      this.idalquiler=this.route.snapshot.params['id'];
      /*if (this.idalquiler){
        this.loadTodo();
      }*/
    
      this.Servicio.getAlquileres(this.idalquiler).subscribe((alquileres) =>{
        this.alquileres = alquileres;
        this.fecha= new Date(this.alquileres.fecha['seconds']*1000);
        this.fechaalquiler= new Date(this.alquileres.fechaalquiler['seconds']*1000);
        this.fechadevolucion= new Date(this.alquileres.fechadevolucion['seconds']*1000);

        
        
        //var uno = this.Servicio.formtDate(this.alquileres.fecha);
        //console.log(this.Servicio.formtDate(this.alquileres.fecha));
      
     
      
        this.idbici=this.alquileres.bicicleta;
        this.Servicio.getBicicleta(this.idbici).subscribe((bicicletas) =>{
          this.bicicleta = bicicletas;
        })
 
        
      })
  
      this.Servicio.getTiendas().subscribe((tiendas) =>{
        this.tiendas = tiendas;

      })
      

      
   }

  ngOnInit() {
  }

  /*async loadTodo(){
    const loading = await this.loadingController.create({
      message: 'Loading....'
    });
    await loading.present();

    this.Servicio.getodosAlquileres().subscribe(todo => {
      loading.dismiss();
      this.alquileres2 = todo;
      console.log(this.alquileres2);
    });
  }*/

  async mensajeconfirmacion() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      message: 'Esta seguro de anular el alquiler.',
      buttons: [
       {
          text: 'Aceptar',
          handler: () => {
            this.cancelaralquilar();
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

  async cancelar(){
    this.mensajeconfirmacion();
  }

  async cancelaralquilar() {
    this.alquileres.anular=true;
    const loading = await this.loadingController.create({
      message: 'Saving....'
    });
    await loading.present();
 
    if (this.idalquiler) {
      this.Servicio.updateAlquileres(this.alquileres, this.idalquiler).then(() => {
        this.bicicleta.disponible="Si";
        this.Servicio.updateBicicletas(this.bicicleta,this.idbici);
        loading.dismiss();
        this.nav.navigateForward('/alquiler-donacion');
      });
    } 
  }

  

}
